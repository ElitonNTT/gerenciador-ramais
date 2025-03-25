"use client";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { ModalLogin } from "./modal-login";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import ButtonCreateCard from "../actions-card/button-create-card";

export default function Header() {
  const session = useSession();
  return (
    <header className="w-full h-[10dvh] bg-zinc-50">
      <div className="w-[90%] h-full m-auto flex justify-between items-center">
        <Image src={logo} alt="LOGO UNIMED" width={140} />

        {session.status === "authenticated" ? (
          <nav>
            <ul className="flex gap-4">
              <li>
                <ButtonCreateCard />
              </li>
              <li>
                <Button variant={"destructive"} onClick={() => signOut()}>
                  Sair
                </Button>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul className="flex gap-20">
              <ModalLogin />
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
