"use client";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { ModalLogin } from "./modal-login";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function Header() {
  const session = useSession();
  return (
    <header className="w-full h-[10dvh] bg-unimed-primary">
      <div className="w-[90%] h-full m-auto flex justify-between items-center">
        <Image src={logo} alt="LOGO UNIMED" width={140} />

        {session.status === "authenticated" ? (
          <Button variant={"outline"} onClick={() => signOut()}>
            Sair
          </Button>
        ) : (
          <nav>
            <ul className="flex gap-20 text-white underline">
              <ModalLogin />
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
