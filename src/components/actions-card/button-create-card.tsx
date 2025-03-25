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
import { TCard_Ramal } from "@/types/zod-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import { CreateCard, TCreateCard } from "@/actions/cards/action";

export default function ButtonCreateCard() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(TCard_Ramal),
    defaultValues: {
      setor: "",
      subtitle: "",
      mensagem: "",
      published: true,
      unidade: "FAMA",
    },
  });
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationKey: ["create-card"],
    mutationFn: (data: TCreateCard) => CreateCard({ data: data }),
    onSuccess: () => {
      toast.success("Cartão criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["get-ramais"] });
      setOpen(false);
    },
    onError: () => {
      toast.error(`Erro ao tentar criar o cartão.`);
    },
  });

  function onSubmit(data: TCreateCard) {
    console.log(data);
    mutation.mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className="p-2 flex gap-2 border-0 bg-gray-900 text-white hover:bg-gray-700"
        >
          Cartão
          <FaPlus size={22} color="white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar novo Cartão</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="setor" className="text-left">
              Setor
            </Label>
            <Input {...register("setor")} className="col-span-3" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="subtitle" className="text-left">
              Subtítulo
            </Label>
            <Input {...register("subtitle")} className="col-span-3" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="mensagem" className="text-left">
              Mensagem
            </Label>
            <Input {...register("mensagem")} className="col-span-3" />
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
