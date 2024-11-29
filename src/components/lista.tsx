"use client";
import { useQuery } from "@tanstack/react-query";
import CardRamal from "./card-lista";
import { getCards } from "@/actions/actions";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Unidades } from "@/lib/unidades";

export const revalidate = 30;

export default function Lista() {
  const [filter, setFilter] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const { data, status, error } = useQuery({
    queryKey: ["ramais"],
    queryFn: getCards,
  });

  //skeletons
  if (status === "pending") {
    return (
      <div className="min-h-dvh">
        <div className="flex flex-col gap-4 w-4/12 mx-auto">
          <Card>
            <Input
              className="focus-visible:ring-0"
              placeholder="Pesquise pelo nome..."
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            />
          </Card>
          <ul className="flex gap-4 w-full justify-center">
            <Button
              variant={"secondary"}
              className="hover:bg-slate-800 hover:text-white"
              onClick={() => setSelectedUnit("")}
            >
              TODOS
            </Button>{" "}
            {Unidades.map((item, index) => (
              <Button
                variant={"secondary"}
                className={[
                  "hover:bg-slate-800 hover:text-white",
                  item.unidade === selectedUnit
                    ? "bg-slate-800 text-white"
                    : " ",
                ].join(" ")}
                key={index}
                onClick={() => setSelectedUnit(item.unidade)}
              >
                {item.unidade}
              </Button>
            ))}
          </ul>
        </div>
        <div className="mx-auto pt-8 w-[80%] columns-1 md:columns-3 gap-3 space-y-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="w-full h-52 bg-slate-300" />
          ))}
        </div>
      </div>
    );
  }
  if (status === "error") {
    console.log(error);
    return (
      <div className="flex mx-auto items-center h-[80vh]">
        Erro ao carregar os dados!
      </div>
    );
  }
  const filteredData = data?.filter((item) => {
    const matchesFilter = item.ramais?.some((ramal) =>
      ramal.nome?.toLowerCase().includes(filter.toLowerCase())
    );
    const matchesUnit = selectedUnit ? item.unidade === selectedUnit : true;
    return matchesFilter && matchesUnit;
  });
  console.log("Data aqui", filteredData);

  return (
    <div className="min-h-dvh">
      <div className="flex flex-col gap-4 w-4/12 mx-auto">
        <Card>
          <Input
            className="focus-visible:ring-0"
            placeholder="Pesquise pelo nome..."
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
        </Card>
        <ul className="flex gap-4 w-full justify-center">
          <Button
            variant={"secondary"}
            className="hover:bg-slate-800 hover:text-white"
            onClick={() => setSelectedUnit("")}
          >
            TODOS
          </Button>{" "}
          {Unidades.map((item, index) => (
            <Button
              variant={"secondary"}
              className={[
                "hover:bg-slate-800 hover:text-white",
                item.unidade === selectedUnit ? "bg-slate-800 text-white" : " ",
              ].join(" ")}
              key={index}
              onClick={() => setSelectedUnit(item.unidade)}
            >
              {item.unidade}
            </Button>
          ))}
        </ul>
      </div>
      <div className="mx-auto pt-8 w-[80%] columns-1 md:columns-3 gap-3 space-y-3">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <CardRamal
              key={item.id}
              id={item.id}
              setor={item.setor}
              mensagem={item.mensagem}
              subtitle={item.subtitle}
              unidade={item.unidade}
              published={item.published}
              ramais={item.ramais}
            />
          ))
        ) : (
          <div className="text-center place-items-center text-zinc-400">
            Nenhum resultado encontrado...
          </div>
        )}
      </div>
    </div>
  );
}
