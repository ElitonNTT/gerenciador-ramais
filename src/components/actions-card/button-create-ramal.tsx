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
import { TRamal } from "@/types/zod-schema";
import { z } from "zod";

type TRamal = z.infer<typeof TRamal>;

type TButtonModalAction = {
  cardID: number;
  setor: string | "não definido";
};

export default function ButtonCreateRamal({
  cardID,
  setor,
}: TButtonModalAction) {
  const {
    register,
    handleSubmit,
    // formState: { errors, isLoading },
  } = useForm({
    resolver: zodResolver(TRamal),
    defaultValues: {
      nome: "",
      funcao: "",
      numero: "",
      cardID: cardID,
      plublished: true,
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="p-0 w-6 h-6 border-0">
          <FaPlus size={22} color="#004e4c" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar novo ramal ({setor})</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(() => console.log("Enviado"))}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Nome
            </Label>
            <Input {...register("nome")} className="col-span-3" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Número
            </Label>
            <Input {...register("numero")} className="col-span-3" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="username" className="text-left">
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
