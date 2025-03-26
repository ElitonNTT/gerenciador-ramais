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
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRamalZod } from "@/types/zod-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateRamal } from "@/actions/ramais/action";
import toast from "react-hot-toast";
import { useState } from "react";

export type TRamal = {
  published: boolean;
  nome: string;
  funcao: string;
  numero: string;
  id: number;
};

export default function ButtonEditRamal({
  id,
  funcao,
  nome,
  numero,
  published,
}: TRamal) {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(TRamalZod),
    defaultValues: {
      id: id,
      nome: nome,
      funcao: funcao,
      numero: numero,
      published: published,
    },
  });
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationKey: ["update-ramal"],
    mutationFn: (data: TRamal) => UpdateRamal({ data: data }),
    onSuccess: () => {
      toast.success("Ramal atualizado com sucesso!");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["get-ramais"] });
    },
    onError: () => {
      toast.error(`Erro ao tentar atualizar o ramal`);
    },
  });

  function onSubmit(data: TRamal) {
    mutation.mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="p-0 w-6 h-6 border-0">
          <FaEdit size={22} color="#004e4c" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar ramal ({numero})</DialogTitle>
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
