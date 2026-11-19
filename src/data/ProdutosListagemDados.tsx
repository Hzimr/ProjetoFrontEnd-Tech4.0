// src/data/ProdutosListagemDados.ts
import img from "../imgs/SapatoCardAlta.png";
import type { ProdutoListagemProps } from "../types/ProdutoListagemProps";

export const OPCOES = {
  marca: ["Adidas", "Calenciaga", "K-Swiss", "Nike", "Puma"],
  uso: ["Esporte e lazer", "Casual", "Utilitário", "Corrida"],
  genero: ["Masculino", "Feminino", "Unissex"],
  estado: ["Novo", "Usado"],
};

export const ProdutosListagemDados: ProdutoListagemProps[] = Array.from(
  { length: 40 },
  (_, i) => {
    const oferta = i % 4 === 0;
    return {
      id: i + 1,
      oferta,
      desconto: oferta ? 30 : 0,
      img,
      alt: "tênis esportivo",
      categoria: "Tênis",
      nome: `K-Swiss V${i + 1} - Masculino`,
      valor: 100 + (i % 7) * 50,
      marca: OPCOES.marca[i % 5],
      uso: OPCOES.uso[i % 4],
      genero: OPCOES.genero[i % 3],
      estado: OPCOES.estado[i % 2],
    };
  },
);
