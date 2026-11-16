// src/data/ColecaoDados.ts
import {
  PiTShirt,
  PiPants,
  PiBaseballCap,
  PiHeadphones,
  PiSneaker,
} from "react-icons/pi";
import type { ColecaoProps } from "../types/ColecaoProps";

export const ColecaoDados: ColecaoProps[] = [
  { id: "camisetas", nome: "Camisetas", icone: PiTShirt },
  { id: "calcas", nome: "Calças", icone: PiPants },
  { id: "bones", nome: "Bonés", icone: PiBaseballCap },
  { id: "headphones", nome: "Headphones", icone: PiHeadphones },
  { id: "tenis", nome: "Tênis", icone: PiSneaker },
];
