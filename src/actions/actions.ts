"use server";
import { prisma } from "@/lib/prismaClient";
import { TCardRamal } from "@/components/card-lista";
// import { NextResponse } from "next/server";

export async function getCards() {
  const card_data = await prisma.card.findMany({
    include: {
      ramais: true,
    },
  });
  return card_data;
}

export async function updateCard({ formData }: { formData: TCardRamal }) {
  console.log(formData);
}

// export async function updateCard(formData: FormData) {
//   const update = await prisma.card.update({
//     where: {
//       id: id,
//     },
//   });

//   return NextResponse();
// }
