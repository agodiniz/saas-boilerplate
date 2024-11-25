"use server";

import { db } from "@/_lib/prisma";

export default async function findUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}
