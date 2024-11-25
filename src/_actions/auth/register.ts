"use server";

import { db } from "@/_lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "PLAYER";
}

export default async function registerUser(data: RegisterData) {
  const { name, email, password, role } = data;

  if (!name || !email || !password || !role) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Este e-mail já está em uso.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "PLAYER",
    },
  });

  //TODO: Remover o redirecionamento
  redirect(`/login`);
}
