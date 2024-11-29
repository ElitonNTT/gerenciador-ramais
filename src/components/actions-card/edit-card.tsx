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
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { getCardbyId } from "@/actions/actions";
import { TCard_Ramal } from "@/types/zod-schema";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
// import { useMutation } from "@tanstack/react-query";

type TYPECard_Ramal = z.infer<typeof TCard_Ramal>;

export default function EditCard({ cardID }: { cardID: number }) {
  if (!cardID) throw new Error("No Id Provided");

  const [dataCard, setDataCard] = useState<TYPECard_Ramal | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  const form = useForm<TYPECard_Ramal>({
    resolver: zodResolver(TCard_Ramal),
  });

  const fetchData = async () => {
    try {
      const data = await getCardbyId(cardID);
      setDataCard(data);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  const handleUpdate = async (values: TYPECard_Ramal) => {
    console.log("Aqui values", values);
  };

  return (
    <>
      {session && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              onClick={fetchData}
              className="text-unimed-primary right-0 absolute"
            >
              <FaEdit />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-unimed-primary">Editar</DialogTitle>
            </DialogHeader>
            {dataCard ? (
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(handleUpdate)}
                >
                  <FormField
                    control={form.control}
                    name="setor"
                    defaultValue={dataCard.setor}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Setor</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    defaultValue={dataCard.subtitle}
                    name="subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mensagem"
                    defaultValue={dataCard.mensagem}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="unidade"
                    defaultValue={dataCard.unidade}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unidade</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {dataCard.ramais && dataCard.ramais.length > 0 && (
                    <div>
                      <ul className="flex flex-col gap-2">
                        {dataCard.ramais.map((ramal, index) => (
                          <li key={index} className="flex gap-2">
                            <FormField
                              control={form.control}
                              name={`ramais.${index}.nome`}
                              defaultValue={ramal.nome}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nome</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`ramais.${index}.funcao`}
                              defaultValue={ramal.funcao}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Funcao</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`ramais.${index}.numero`}
                              defaultValue={ramal.numero}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Número</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <DialogFooter>
                    <Button type="submit">Salvar</Button>
                  </DialogFooter>
                </form>
              </Form>
            ) : (
              <p>Carregando...</p>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
