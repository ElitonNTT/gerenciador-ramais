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
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TLogin } from "@/types/zod-schema";
import { useState } from "react";
import { signIn } from "next-auth/react";

type TLoginForm = z.infer<typeof TLogin>;

export function ModalLogin() {
  const [isOpen, setIsOpen] = useState<boolean>();
  const form = useForm<TLoginForm>({
    resolver: zodResolver(TLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: TLoginForm) => {
    const resp = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (resp == null) throw new Error("SignIn returned undefined");
    if (resp.ok) setIsOpen(false);

    switch (resp.error) {
      case "Invalid email":
        form.setError("email", { message: "E-mail incorreto ou não existe!" });
        console.log(form.formState.errors.password?.message);
        break;
      case "Invalid password":
        form.setError("password", { message: "Senha incorreta!" });
        console.log(form.formState.errors.password?.message);
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text:md lg:text-lg">
          Entrar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-unimed-primary">Entrar</DialogTitle>
          <DialogDescription>
            Identifique-se para adicionar/editar os registros!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="grid gap-4 py-4"
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="example@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="coxinha@123"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Entrar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
