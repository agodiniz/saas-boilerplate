"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";


import { Check, X } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { InputPass } from "@/_components/input-pass/input-pass";
import { Button } from "@/_components/ui/button";
import { useToast } from "@/_hooks/use-toast";
import Spinner from "@/_components/spinner";


import { calculatePasswordStrength } from "@/_utils/password-strength";
import registerUser from "@/_actions/auth/register";


const RegisterUserSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome não pode ter mais que 100 caracteres'),
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres'),
  role: z.string(),
  //   confirmPassword: z.string(),
  // }).refine((data) => data.password === data.confirmPassword, {
  //   message: "As senhas não coincidem",
  //   path: ["confirmPassword"],
});

const passwordCriteria = [
  { label: "Pelo menos 8 caracteres", regex: /.{8,}/ },
  { label: "Pelo menos uma letra maiúscula", regex: /[A-Z]/ },
  { label: "Pelo menos uma letra minúscula", regex: /[a-z]/ },
  { label: "Pelo menos um número", regex: /[0-9]/ },
  { label: "Pelo menos um caractere especial", regex: /[^A-Za-z0-9]/ },
]

export default function RegisterUser() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
  })
  const [criteriaStatus, setCriteriaStatus] = useState<boolean[]>(
    passwordCriteria.map(() => false)
  );

  const form = useForm<z.infer<typeof RegisterUserSchema>>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "PLAYER",
      // confirmPassword: "",
    },
  });



  const updateCriteriaStatus = (password: string) => {
    const newStatus = passwordCriteria.map((criterion) =>
      criterion.regex.test(password)
    );
    setCriteriaStatus(newStatus);
  };

  const onSubmit = async (data: z.infer<typeof RegisterUserSchema>) => {
    setIsLoading(true);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: "PLAYER",
      })
    } catch (error) {
      console.error(error);
      toast({
        title: "Falha ao tentar cadastrar",
        description: "Verifique todos os campos e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto mt-6 grid w-[350px] gap-6">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <InputPass
                    {...field}
                    onChange={(e) => {
                      field.onChange(e); // Atualiza o valor do React Hook Form
                      setPasswordStrength(calculatePasswordStrength(e.target.value)); // Calcula a força da senha
                      updateCriteriaStatus(e.target.value); // Atualiza o estado dos critérios
                    }}
                  />
                </FormControl>
                <ul className="space-y-1">
                  {passwordStrength.message && (
                    <div className="flex mt-2 mb-4 gap-1">
                      <p className="text-xs">Força da senha:</p>
                      <p
                        className={`text-xs font-medium ${passwordStrength.score <= 2
                          ? "text-destructive"
                          : passwordStrength.score === 3
                            ? "text-yellow-400"
                            : "text-primary"
                          }`}
                      >
                        {passwordStrength.message}
                      </p>
                    </div>

                  )}

                  {passwordCriteria.map((criterion, index) => (
                    <li key={index} className="flex items-center text-sm">
                      {/* Ícone de check ou X */}
                      <div className="mr-2 flex h-4 w-4 items-center justify-center">
                        {criteriaStatus[index] ? (
                          <Check className="text-primary" size={16} /> // Ícone de check (critério atendido)
                        ) : (
                          <X className="text-destructive" size={16} /> // Ícone de X (critério não atendido)
                        )}
                      </div>
                      <p className="text-xs">{criterion.label}</p>
                    </li>
                  ))}
                </ul>
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <InputPass {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? (<Spinner />) : ("Criar conta")}
          </Button>

        </div>
        <div className="mt-4 text-center text-sm">
          Já tem uma conta? <Link href="/login" className="underline">Entrar</Link>
        </div>
      </form>
    </Form>
  )
}