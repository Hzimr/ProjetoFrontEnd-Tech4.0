// src/types/ItemCarrinho.ts
export interface ItemCarrinhoProps {
  chave: string; // id + tamanho + cor: o mesmo tênis em outro tamanho é outro item
  id: number;
  nome: string;
  img: string;
  alt: string;
  tamanho: number;
  cor: string;
  preco: number; // preço unitário já com desconto
  precoAntigo?: number;
  quantidade: number;
}
