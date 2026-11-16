import blusa from "../imgs/blusa.png";
import sapato from "../imgs/sapato.png";
import fone from "../imgs/fone.png";

import type { DestaqueProductProps } from "../types/DestaqueProductProps";

export const DestaqueDados: DestaqueProductProps[] = [
  {
    id: 1,
    desconto: 30,
    img: blusa,
    alt: "blusa supreme",
    categoria: "Novo drop Supreme",
  },
  {
    id: 2,
    desconto: 30,
    img: sapato,
    alt: "sapato de corredor adidas",
    categoria: "Coleção Adidas",
  },
  {
    id: 3,
    desconto: 30,
    img: fone,
    alt: "Fone headset preto",
    categoria: "Novo Beats Bass",
  },
];
