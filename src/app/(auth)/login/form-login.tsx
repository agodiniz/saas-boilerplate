"use client"

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { InputPass } from "@/_components/input-pass/input-pass";
import { Button } from "@/_components/ui/button";
import { Label } from "@/_components/ui/label";
import { Input } from "@/_components/ui/input";


export default function FormLogin() {
  const [error, setError] = useState<string | null>(null);

  const router = useRouter()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        console.log(result)
        return
      }

      router.refresh()

    } catch (err) {
      setError("Credenciais inválidas. Por favor, tente novamente.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="mx-auto grid w-[350px] gap-6">
      <div className="flex flex-col gap-2 text-center items-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">Insira suas informações para acessar a plataforma.</p>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" placeholder="email@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">Esqueceu sua senha?</Link>
          </div>
          <InputPass id="password" name="password" required />
        </div>
        <Button type="submit" className="w-full">Entrar</Button>
      </div>
    </form>
  )
}