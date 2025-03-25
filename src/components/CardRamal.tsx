import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TCard_Ramal } from "@/types/zod-schema";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import ButtonCreateRamal from "./actions-ramal/button-create-ramal";
import ButtonEditRamal from "./actions-ramal/button-edit-ramal";
import ButtonDeleteRamal from "./actions-ramal/button-delete-ramal";
import { Unidades } from "@/lib/unidades";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateCard } from "@/actions/cards/action";
import toast from "react-hot-toast";

export type TCardRamal = z.infer<typeof TCard_Ramal>;

export default function CardRamal({
  id,
  setor,
  mensagem,
  subtitle,
  ramais,
  published,
  unidade,
}: TCardRamal) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const form = useForm<TCardRamal>({
    resolver: zodResolver(TCard_Ramal),
    defaultValues: {
      id: id,
      setor,
      mensagem: mensagem,
      published,
      subtitle: subtitle,
      ramais: ramais,
      unidade: unidade,
    },
  });

  const mutation = useMutation({
    mutationKey: ["update-card"],
    mutationFn: (data: TCardRamal) => UpdateCard({ data: data }),
    onSuccess: () => {
      toast.success("Cartão atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["get-ramais"] });
    },
    onError: () => {
      toast.error(`Erro ao atualizar o cartão`);
    },
  });

  function onSubmit(values: TCardRamal) {
    console.log(values);
    mutation.mutate(values);
  }

  return (
    <Card className="shadow-lg drop-shadow-md break-inside-avoid rounded-md relative">
      {session ? (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <div className="w-full flex justify-between gap-2">
                  <CardTitle className="font-semibold text-lg">
                    EDITAR
                  </CardTitle>
                  <ButtonCreateRamal cardID={id!} setor={setor} />
                </div>
                <FormField
                  control={form.control}
                  name="setor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Setor</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder={setor} />
                          </SelectTrigger>
                          <SelectContent>
                            {Unidades.map((item, index) => (
                              <SelectItem key={index} value={item.unidade}>
                                {item.unidade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subtitle"
                  defaultValue={subtitle}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtítulo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardHeader>
              <CardContent className="overflow-x-hidden px-4">
                <Table>
                  <TableCaption>
                    <FormField
                      control={form.control}
                      name="mensagem"
                      defaultValue={mensagem}
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
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-3/12">Nome</TableHead>
                      <TableHead className="w-3/12">Função</TableHead>
                      <TableHead className="w-3/12">Ramal</TableHead>
                      <TableHead className="w-3/12 text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ramais?.map((item, index: number) => (
                      <TableRow key={index} className="w-full">
                        <TableCell className="w-3/12">{item.nome}</TableCell>
                        <TableCell className="w-3/12">{item.funcao}</TableCell>
                        <TableCell className="w-3/12">{item.numero}</TableCell>
                        <TableCell className="w-full flex gap-2 justify-end">
                          <ButtonEditRamal
                            id={item.id}
                            numero={item.numero}
                            funcao={item.funcao}
                            nome={item.nome}
                            published={item.published}
                          />
                          <ButtonDeleteRamal
                            ramalID={item.id!}
                            numero={item.numero}
                            setor={setor}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t border-gray-200 py-4 text-xs">
                <Button
                  variant={"default"}
                  type="submit"
                  className="flex w-full"
                >
                  Salvar alterações
                </Button>
              </CardFooter>
            </form>
          </Form>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="text-unimed-primary">{setor}</CardTitle>
            <CardDescription className="ml-1 text-xs">
              {subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-hidden px-4">
            <Table>
              <TableCaption>{mensagem}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-6/12">Nome</TableHead>
                  <TableHead className="w-3/12">Função</TableHead>
                  <TableHead className="w-3/12 text-right">Ramal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ramais?.map((item, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="w-6/12 font-medium">
                      {item.nome}
                    </TableCell>
                    <TableCell className="w-3/12">{item.funcao}</TableCell>
                    <TableCell className="w-3/12 text-right">
                      {item.numero}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </>
      )}
    </Card>
  );
}
