// src/context/CarrinhoContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ItemCarrinhoProps } from "../types/ItemCarrinhoProps";

interface CarrinhoContextProps {
  itens: ItemCarrinhoProps[];
  totalItens: number;
  adicionar: (item: Omit<ItemCarrinhoProps, "chave" | "quantidade">) => void;
  alterarQuantidade: (chave: string, delta: number) => void;
  remover: (chave: string) => void;
  esvaziar: () => void;
}

const CarrinhoContext = createContext<CarrinhoContextProps | null>(null);
const STORAGE_KEY = "carrinho";

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
  const [itens, setItens] = useState<ItemCarrinhoProps[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
      return [];
    }
  });
  const esvaziar = () => setItens([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
  }, [itens]);

  const adicionar: CarrinhoContextProps["adicionar"] = (novo) => {
    const chave = `${novo.id}-${novo.tamanho}-${novo.cor}`;

    setItens((atuais) => {
      const existe = atuais.some((i) => i.chave === chave);
      return existe
        ? atuais.map((i) =>
            i.chave === chave ? { ...i, quantidade: i.quantidade + 1 } : i,
          )
        : [...atuais, { ...novo, chave, quantidade: 1 }];
    });
  };

  const alterarQuantidade = (chave: string, delta: number) =>
    setItens((atuais) =>
      atuais.map((i) =>
        i.chave === chave
          ? { ...i, quantidade: Math.max(1, i.quantidade + delta) }
          : i,
      ),
    );

  const remover = (chave: string) =>
    setItens((atuais) => atuais.filter((i) => i.chave !== chave));

  const totalItens = itens.reduce((soma, i) => soma + i.quantidade, 0);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        totalItens,
        adicionar,
        alterarQuantidade,
        remover,
        esvaziar,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCarrinho = () => {
  const ctx = useContext(CarrinhoContext);
  if (!ctx)
    throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvider");
  return ctx;
};
