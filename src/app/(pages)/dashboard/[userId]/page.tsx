import checkSession from "@/_actions/auth/check-session";
import { Container } from "@/_components/container";
import ButtonLogout from "@/app/(auth)/login/button-logout";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type DashboardPageProps = {
    params: {
        userId: string;
    };
};

export default async function DashboardPage({ params }: DashboardPageProps) {
    const session = await checkSession();
    const userId = params.userId;

    if (session && session.user.id === userId) {
        return (
            <Container>
                <Suspense>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Dahsboard</h1>
                            <p className="text-sm text-muted-foreground">Usuário logado: {userId}</p>
                        </div>
                        <ButtonLogout />
                    </div>
                </Suspense>
            </Container>
        );
    }

    return notFound();
}