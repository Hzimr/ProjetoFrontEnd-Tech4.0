// src/types/ProdutoListagem.ts
import type { CardProductProps } from "./CardProductProps";

export interface ProdutoListagemProps extends CardProductProps {
  marca: string;
  uso: string; // "Esporte e lazer", "Casual"... (filtro "Categoria")
  genero: string;
  estado: string;
}

export interface Filtros {
  marca: string[];
  uso: string[];
  genero: string[];
  estado: string | null;
}

export type ChaveMultipla = "marca" | "uso" | "genero";
