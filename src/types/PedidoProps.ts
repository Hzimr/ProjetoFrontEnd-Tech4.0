// src/types/Pedido.ts
import type { ItemCarrinhoProps } from "./ItemCarrinhoProps";

export interface Pedido {
  numero: string;
  pessoal: { nome: string; cpf: string; email: string; celular: string };
  entrega: {
    endereco: string;
    bairro: string;
    cidade: string;
    cep: string;
    complemento: string;
  };
  pagamento: {
    forma: "cartao" | "boleto";
    titular?: string;
    finalCartao?: string; // só os 4 últimos dígitos
  };
  itens: ItemCarrinhoProps[];
  subtotal: number;
  frete: number;
  desconto: number;
  total: number;
}
