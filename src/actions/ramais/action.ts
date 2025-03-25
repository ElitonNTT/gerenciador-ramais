"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

export async function DeleteRamal(id: number) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Você não está autenticado.");
    }
    await prisma.ramal.delete({ where: { id } });
    return { message: "Ramal deletado com sucesso." };
  } catch (error) {
    throw new Error(`Erro ao deletar o ramal: ${error}`);
  }
}

export type TCreateRamal = {
  published: boolean;
  nome: string;
  funcao: string;
  numero: string;
  cardID: number;
};
export async function CreateRamal({ data }: { data: TCreateRamal }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Você não está autenticado.");
    }
    const created = await prisma.ramal.create({
      data: {
        nome: data.nome,
        funcao: data.funcao,
        numero: data.numero,
        cardID: data.cardID,
      },
    });
    return created;
  } catch (error) {
    throw new Error(`Erro ao criar o ramal: ${error}`);
  }
}
type TEditRamal = {
  nome: string;
  funcao: string;
  numero: string;
  published: boolean;
  id: number;
};
export async function UpdateRamal({ data }: { data: TEditRamal }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Você não está autenticado.");
    }
    const updated = await prisma.ramal.update({
      where: { id: data.id },
      data: {
        nome: data.nome,
        funcao: data.funcao,
        numero: data.numero,
      },
    });
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar o ramal: ${error}`);
  }
}
