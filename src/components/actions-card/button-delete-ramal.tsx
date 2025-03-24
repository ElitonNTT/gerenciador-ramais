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
import { FaTrash } from "react-icons/fa";

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
  console.log(ramalID);
  return (
    <Dialog>
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
          <Button type="button" variant={"destructive"}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
