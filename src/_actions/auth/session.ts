"use server";

import { authOptions } from "@/_lib/auth";
import type { SessionProps } from "@/_types/session";
import { getServerSession } from "next-auth";

export async function GetSession(): Promise<SessionProps | null> {
  const session = await getServerSession(authOptions);
  return session as SessionProps | null;
}
