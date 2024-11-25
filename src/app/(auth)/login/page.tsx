import { GetSession } from "@/_actions/auth/session";
import Image from "next/image";
import Link from "next/link";
import FormLogin from "./form-login";

import { redirect } from "next/navigation";
import { Coffee } from "lucide-react";

export default async function LoginPage() {
  const session = await GetSession();
  if (session?.user) {
    const userId = session.user.id;
    redirect(`/${userId}`);
  }

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

      <div className="flex flex-col items-center justify-center py-12">
        <Coffee width={28} height={28} className="hidden lg:block lg:absolute lg:top-6 lg:left-6" />
        <div className="flex flex-col w-[350px] gap-6">
          <FormLogin />
          <div className="mt-4 text-center text-sm">
            Ainda não tem uma conta?{" "}
            <Link href="/register" className="underline">Criar conta</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
