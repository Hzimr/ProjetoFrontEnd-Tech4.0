// src/data/ProdutosDetalheDados.ts
import { ProdutosListagemDados } from "./ProdutosListagemDados";
import type { ProdutoDetalhe } from "../types/ProdutoDetalhe";
import tenis from "../imgs/SapatoCardAlta.png";

const fundos = ["#E2E3FF", "#FFE8BD", "#FFC0BC", "#DEC699", "#E8DFCF"];

export const ProdutosDetalhadoDados: ProdutoDetalhe[] =
  ProdutosListagemDados.map((produto) => ({
    ...produto,
    referencia: `REF:${38416700 + produto.id}`,
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    nota: 4.7,
    avaliacoes: 90,
    valorAntigo: produto.oferta ? produto.valor : undefined,
    tamanhos: [39, 40, 41, 42, 43],
    cores: [
      { nome: "Azul", hex: "#6FEEFF" },
      { nome: "Vermelho", hex: "#FF6B6B" },
      { nome: "Cinza", hex: "#555555" },
      { nome: "Roxo", hex: "#6C6CC4" },
    ],
    imagens: fundos.map((fundo, i) => ({
      src: tenis,
      alt: `${produto.nome} - foto ${i + 1}`,
      fundo,
    })),
  }));
