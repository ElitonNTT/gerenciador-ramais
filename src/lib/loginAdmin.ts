import { compare } from "bcrypt";
import { TLogin } from "@/types/zod-schema";
import { prisma } from "./prismaClient";

export async function loginAdmin({ email, password }: TLogin) {
  const admin = await prisma.user.findUnique({ where: { email } });

  if (!admin || admin.password == null) {
    throw new Error("Invalid email");
  }

  const isValid = await compare(password, admin.password);

  if (!isValid) {
    throw new Error("Invalid password");
  }

  return admin;
}
