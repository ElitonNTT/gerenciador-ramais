"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRamalZod } from "@/types/zod-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateRamal, TCreateRamal } from "@/actions/ramais/action";
import toast from "react-hot-toast";
import { useState } from "react";

type TButtonModalAction = {
  cardID: number;
  setor: string | "não definido";
};

export default function ButtonCreateRamal({
  cardID,
  setor,
}: TButtonModalAction) {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(TRamalZod),
    defaultValues: {
      nome: "",
      funcao: "",
      numero: "",
      cardID: cardID,
      published: true,
    },
  });
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationKey: ["create-ramal"],
    mutationFn: (data: TCreateRamal) => CreateRamal({ data: data }),
    onSuccess: () => {
      toast.success("Ramal criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["get-ramais"] });
      setOpen(false);
    },
    onError: () => {
      toast.error(`Erro ao tentar criar o ramal`);
    },
  });

  function onSubmit(data: TCreateRamal) {
    mutation.mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="p-0 w-6 h-6 border-0">
          <FaPlus size={22} color="#004e4c" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar novo ramal ({setor})</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="nome" className="text-left">
              Nome
            </Label>
            <Input {...register("nome")} className="col-span-3" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="numero" className="text-left">
              Número
            </Label>
            <Input {...register("numero")} className="col-span-3" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="funcao" className="text-left">
              Função
            </Label>
            <Input {...register("funcao")} className="col-span-3" />
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
