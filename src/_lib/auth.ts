import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { db } from "./prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@exemplo.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Buscando o usuário pelo email
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        // Verificando se o usuário existe e a senha corresponde
        if (user && user.password) {
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (passwordMatch) {
            // Retornando os dados relevantes para o NextAuth
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          } else {
            throw new Error("Credenciais inválidas.");
          }
        }

        return null; // Retorna null se não encontrou o usuário ou se a senha não bater
      },
    }),

    // Google OAuth Provider
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
  ],

  events: {},

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as any;
        return {
          ...token,
          id: u.id || u.email,
        };
        // token.id = user.id;
        // token.name = user.name || "";
        // token.email = user.email;
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
        },
      };
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
