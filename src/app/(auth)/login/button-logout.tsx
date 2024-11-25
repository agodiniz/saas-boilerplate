"use client"

import { signOut } from "next-auth/react";

export default function ButtonLogout() {
  const handleSignOutSumbit = () => {
    signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <button onClick={handleSignOutSumbit}>Sair</button>
  )
}