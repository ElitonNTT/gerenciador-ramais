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
import { FaEdit } from "react-icons/fa";
import { Button } from "./ui/button";
// import { updateCard } from "@/actions/actions";
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

export type TCardRamal = z.infer<typeof TCard_Ramal>;

export default function CardRamal({
  id,
  setor,
  mensagem,
  subtitle,
  ramais,
}: TCardRamal) {
  const [dataCard, setDataCard] = useState<TCardRamal | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const { data: session } = useSession();

  const form = useForm<TCardRamal>({
    resolver: zodResolver(TCard_Ramal),
  });

  const handleUpdate = async (formData: TCardRamal) => {
    try {
      setDataCard(formData);
      console.log(dataCard);
      // await updateCard(dataCard);
    } catch (error) {
      console.error("Error Updating card data:", error);
    }
  };

  return (
    <Card className="shadow-lg drop-shadow-md break-inside-avoid rounded-md relative">
      {session ? (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)}>
              <CardHeader>
                <Button
                  variant={"secondary"}
                  className="absolute right-0 top-0 m-2 p-0 w-6 h-6 border-0"
                  onClick={() => setIsEditable(!isEditable)}
                >
                  <FaEdit size={22} color="#004e4c" />
                </Button>
                {!isEditable && <h2>Editar</h2>}
                <FormField
                  control={form.control}
                  name="setor"
                  defaultValue={setor}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Setor</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={isEditable} />
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
                        <Input {...field} readOnly={isEditable} />
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
                            <Input {...field} readOnly={isEditable} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCaption>
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
