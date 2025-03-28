import { z } from "zod";

export const TLogin = z.object({
  email: z.string().email({ message: "Insira um e-mail válido!" }),
  password: z.string().min(1, { message: "Ops! Não digitou sua senha!" }),
});
export type TLogin = z.infer<typeof TLogin>;

export const TCard_Ramal = z.object({
  id: z.number().optional(),
  setor: z.string(),
  subtitle: z.string(),
  mensagem: z.string(),
  published: z.boolean(),
  unidade: z.string(),
  ramais: z
    .array(
      z.object({
        id: z.number(),
        cardID: z.number().optional(),
        published: z.boolean(),
        nome: z
          .string()
          .min(3, { message: "Insira o primeiro e último nome!" }),
        funcao: z.string().min(1, { message: "Insira a função/cargo!" }),
        numero: z.string().min(4, { message: "Número inválido!" }),
      })
    )
    .optional(),
});

export const TRamalZod = z.object({
  id: z.number().optional(),
  cardID: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  funcao: z.string().min(1, "Função é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
  published: z.boolean(),
});
