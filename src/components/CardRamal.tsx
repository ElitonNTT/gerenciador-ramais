import {
  Card,
  CardContent,
  CardDescription,
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
import { TCard_Ramal } from "@/types/zod-schema";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "./ui/button";
import { useState } from "react";
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
import ButtonCreateRamal from "./actions-card/button-create-ramal";
import ButtonEditRamal from "./actions-card/button-edit-ramal";
import ButtonDeleteRamal from "./actions-card/button-delete-ramal";

export type TCardRamal = z.infer<typeof TCard_Ramal>;

export default function CardRamal({
  id,
  setor,
  mensagem,
  subtitle,
  ramais,
}: TCardRamal) {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const { data: session } = useSession();

  const form = useForm<TCardRamal>({
    resolver: zodResolver(TCard_Ramal),
  });

  return (
    <Card className="shadow-lg drop-shadow-md break-inside-avoid rounded-md relative">
      {session ? (
        <>
          <Form {...form}>
            <form>
              <CardHeader>
                <div className="absolute  right-4 top-4 flex justify-end gap-2">
                  <ButtonCreateRamal cardID={id!} setor={setor} />
                  <Button
                    variant={"secondary"}
                    className="p-0 w-6 h-6 border-0"
                    onClick={() => setIsEditable(!isEditable)}
                  >
                    <FaEdit size={22} color="#004e4c" />
                  </Button>
                </div>
                {!isEditable && <h2>Editar</h2>}
                <FormField
                  control={form.control}
                  name="setor"
                  defaultValue={setor}
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
                      <TableHead className="w-3/12 text-right">Ramal</TableHead>
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
                          <ButtonEditRamal />
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
