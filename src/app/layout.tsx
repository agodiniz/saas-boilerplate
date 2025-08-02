import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/_providers/auth";
import { GetSession } from "@/_actions/auth/session";
import { Toaster } from "@/_components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saas Boilerplate",
  description: "Boilerplate para criação de aplicativos SaaS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await GetSession();
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
