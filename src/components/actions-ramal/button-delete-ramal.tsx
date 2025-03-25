"use client";
import { DeleteRamal } from "@/actions/ramais/action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";

type TButtonModalAction = {
  ramalID: number;
  numero: string;
  setor: string | "não definido";
};

export default function ButtonDeleteRamal({
  ramalID,
  setor,
  numero,
}: TButtonModalAction) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const mutate = useMutation({
    mutationKey: ["delete-ramal"],
    mutationFn: () => DeleteRamal(ramalID),
    onSuccess: () => {
      toast.success("Ramal deletado com sucesso!");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["get-ramais"] });
    },
    onError: () => {
      toast.error(`Erro ao deletar o ramal`);
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="p-0 w-6 h-6 border-0">
          <FaTrash size={22} color="#004e4c" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar ramal ({setor})</DialogTitle>
          <DialogDescription className="text-gray-400">
            Tem certeza que deseja excluir este ramal? Esta ação não pode ser
            desfeita.
            <br />
            <span className="text-red-500">{numero}</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => mutate.mutate()}
            type="button"
            variant={"destructive"}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
