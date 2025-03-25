"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { z } from "zod";

const CardSchema = z.object({
  setor: z.string().min(1, "Setor é obrigatório"),
  mensagem: z.string().min(1, "Mensagem é obrigatória"),
  unidade: z.string().min(1, "Unidade é obrigatória"),
  subtitle: z.string().optional(),
  published: z.boolean().optional(),
});

const RamalSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  funcao: z.string().min(1, "Função é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
});

export type TCreateCard = {
  setor: string;
  subtitle: string;
  mensagem: string;
  published: boolean;
  unidade: string;
};
export async function CreateCard({ data }: { data: TCreateCard }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Você não está autenticado.");
    }

    const validatedData = CardSchema.parse(data);

    const created = await prisma.card.create({
      data: {
        setor: validatedData.unidade,
        mensagem: validatedData.mensagem,
        unidade: "FAMA",
        subtitle: validatedData.subtitle || "Pequeno titulo",
        published: validatedData.published || true,
      },
    });
    return created;
  } catch (error) {
    throw new Error(`Erro ao criar o CARD: `, { cause: error });
  }
}

type TUpdateCard = {
  id?: number;
  setor: string;
  subtitle: string;
  mensagem: string;
  published: boolean;
  unidade: string;
};

export async function UpdateCard({ data }: { data: TUpdateCard }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Você não está autenticado.");
    }

    const validatedData = CardSchema.parse(data);

    const updated = await prisma.card.update({
      where: { id: data.id },
      data: {
        setor: validatedData.unidade,
        mensagem: validatedData.mensagem,
        unidade: "FAMA",
        subtitle: validatedData.subtitle,
        published: validatedData.published,
      },
    });
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar o CARD: `, { cause: error });
  }
}

export async function DeleteCard({ id }: { id: number }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Você não está autenticado.");
    }

    const deleted = await prisma.card.delete({ where: { id } });
    return deleted;
  } catch (error) {
    throw new Error(`Erro ao deletar o CARD: `, { cause: error });
  }
}

export async function GetCardsByUnidade({ unidade }: { unidade: string }) {
  try {
    const cards = await prisma.card.findMany({
      where: { unidade },
    });
    return cards;
  } catch (error) {
    throw new Error(`Erro ao buscar os Cards por unidade: `, { cause: error });
  }
}

export async function GetPublishedCards() {
  try {
    const cards = await prisma.card.findMany({
      where: { published: true },
      include: {
        ramais: true,
      },
    });
    return cards;
  } catch (error) {
    throw new Error(`Erro ao buscar os publicados: `, { cause: error });
  }
}

export async function AddRamalToCard({
  CardId,
  ramalData,
}: {
  CardId: number;
  ramalData: { nome: string; funcao: string; numero: string };
}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Você não está autenticado.");
    }

    const validatedRamalData = RamalSchema.parse(ramalData);

    const cardExists = await prisma.card.findUnique({ where: { id: CardId } });
    if (!cardExists) {
      throw new Error("Card não encontrado.");
    }

    const updatedCard = await prisma.card.update({
      where: { id: CardId },
      data: {
        ramais: {
          create: validatedRamalData,
        },
      },
      include: { ramais: true },
    });
    return updatedCard;
  } catch (error) {
    throw new Error(`Erro ao adicionar ramal ao CARD:`, { cause: error });
  }
}

export async function RemoveRamalFromCard({ ramalId }: { ramalId: number }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Você não está autenticado.");
    }

    // Verifica se o ramal existe
    const ramalExists = await prisma.ramal.findUnique({
      where: { id: ramalId },
    });
    if (!ramalExists) {
      throw new Error("Ramal não encontrado.");
    }

    const deletedRamal = await prisma.ramal.delete({
      where: { id: ramalId },
    });
    return deletedRamal;
  } catch (error) {
    throw new Error(`Erro ao remover ramal do CARD:`, { cause: error });
  }
}
