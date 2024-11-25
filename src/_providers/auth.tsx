"use client";

import { SessionProvider } from "next-auth/react";

export interface AuthProviderProps {
  children: React.ReactNode;
  session?: any;
}

const AuthProvider = ({ children, session }: Readonly<AuthProviderProps>) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
