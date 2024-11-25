// app/register/page.tsx
import Link from "next/link";

import Image from "next/image";

import RegisterUser from "./register-user";
import { Coffee } from "lucide-react";

export default async function RegisterPage() {
  return (
    <main className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-6 py-12">
        <Link href={`/login`}>
          <Coffee width={28} height={28} className="hidden lg:block lg:absolute lg:top-6 lg:left-6" />
        </Link>
        <div className="flex flex-col gap-2 text-center items-center w-[350px]">
          <h1 className="text-3xl font-bold">Criar Conta</h1>
          <p className="text-muted-foreground">
            Insira as informações para criar uma nova conta.
          </p>
        </div>
        <RegisterUser />
      </div>
    </main>
  );
}