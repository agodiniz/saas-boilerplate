import { GetSession } from "@/_actions/auth/session";
import { redirect } from "next/navigation";

export default async function CheckSession() {
  const session = await GetSession();
  if (!session) {
    redirect(`/login`);
  }
  return session;
}