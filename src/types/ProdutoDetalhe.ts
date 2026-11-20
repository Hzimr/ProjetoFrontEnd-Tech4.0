// src/types/ProdutoDetalhe.ts
import type { ProdutoListagemProps } from "./ProdutoListagemProps";

export interface ImagemProduto {
  src: string;
  alt: string;
  fundo: string; // cor de fundo da imagem, ex: "#E2E3FF"
}

export interface CorProduto {
  nome: string;
  hex: string;
}

export interface ProdutoDetalhe extends ProdutoListagemProps {
  referencia: string;
  descricao: string;
  nota: number;
  avaliacoes: number;
  valorAntigo?: number;
  tamanhos: number[];
  cores: CorProduto[];
  imagens: ImagemProduto[];
}
