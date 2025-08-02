"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/_components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { InputPass } from "@/_components/input-pass/input-pass";
import { useToast } from "@/_hooks/use-toast";
import Spinner from "@/_components/spinner";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export default function FormLogin() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        toast({
          title: "Erro ao fazer login",
          description: "E-mail ou senha inválidos. Por favor, tente novamente.",
          variant: "destructive",
        });
      } else {
        router.refresh(); // Redireciona para o dashboard após login bem-sucedido
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um problema. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto grid w-[350px] gap-6">
        <div className="flex flex-col gap-2 text-center items-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">Insira suas informações para acessar a plataforma.</p>
        </div>
        <div className="grid gap-4">
          {/* Campo de E-mail */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Senha */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Senha</FormLabel>
                  {/* <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                    Esqueceu sua senha?
                  </Link> */}
                </div>
                <FormControl>
                  <InputPass {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Botão de Login */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (<Spinner />) : "Entrar"}
          </Button>
        </div>

        <div className="mt-4 text-center text-sm">
          Ainda não tem uma conta? <Link href="/register" className="underline">Cadastre-se</Link>
        </div>
      </form>
    </Form>
  );
}