// src/types/ColecaoProps.ts
import type { IconType } from "react-icons";

export interface ColecaoProps {
  id: string; // mesmo valor usado em "colecao" nos destaques
  nome: string;
  icone: IconType;
}
