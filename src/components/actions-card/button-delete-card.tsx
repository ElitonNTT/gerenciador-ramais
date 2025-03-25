"use client";
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
import { DeleteCard } from "@/actions/cards/action";

type TButtonDeleteCard = {
  cardID: number;
};

export default function ButtonDeleteCard({ cardID }: TButtonDeleteCard) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const mutate = useMutation({
    mutationKey: ["delete-card"],
    mutationFn: () => DeleteCard({ id: cardID }),
    onSuccess: () => {
      toast.success("Cartão deletado com sucesso!");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["get-ramais"] });
    },
    onError: () => {
      toast.error(`Erro ao deletar o cartão`);
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className="flex gap-4 p-2 border-0 bg-red-500 w-full font-semibold text-white hover:bg-red-400"
        >
          Deletar Cartão
          <FaTrash size={22} color="white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar Cartão</DialogTitle>
          <DialogDescription className="text-red-400">
            Tem certeza que deseja excluir este cartão? <br />
            Esta ação não pode ser desfeita.
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
