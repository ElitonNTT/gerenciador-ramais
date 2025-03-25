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
                <div className="w-full flex justify-between gap-2">
                  <CardTitle className="font-semibold text-lg">
                    EDITAR
                  </CardTitle>
                  <ButtonCreateRamal cardID={id!} setor={setor} />
                </div>
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
                            numero={item.numero}
                            funcao={item.funcao}
                            nome={item.nome}
                            cardID={id}
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
