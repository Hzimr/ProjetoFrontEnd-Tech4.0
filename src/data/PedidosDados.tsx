import type { PedidoResumo } from "../types/PedidoResumo";
import tenis from "../imgs/SapatoCardAlta.png";

const base = {
  produtoId: 1,
  nome: "Tênis Nike Revolution 6 Next Nature Masculino",
  img: tenis,
  alt: "Tênis Nike Revolution 6",
};

export const PedidosDados: PedidoResumo[] = [
  { ...base, numero: "2234981932", status: "em-transito" },
  { ...base, numero: "4495810492", status: "finalizado" },
  { ...base, numero: "4495810493", status: "cancelado" },
  { ...base, numero: "4495810494", status: "finalizado" },
  { ...base, numero: "4495810495", status: "finalizado" },
];
