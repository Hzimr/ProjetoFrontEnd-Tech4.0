import type { HeroSlide } from "../types/HeroSlideProps";
import tenis1 from "../imgs/sneakers.png";
import tenis2 from "../imgs/sneakers.png";
import tenis3 from "../imgs/sneakers.png";
import tenis4 from "../imgs/sneakers.png";

export const HeroDados: HeroSlide[] = [
  {
    id: 1,
    tag: "Melhores ofertas personalizadas",
    titulo: "Queima de stoque Nike 🔥",
    descricao:
      "Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur.",
    img: tenis1,
    alt: "Tênis Nike Air Force branco e vermelho",
    textoBotao: "Ver Ofertas",
    link: "/produtos",
  },
  {
    id: 2,
    tag: "Novidades da temporada",
    titulo: "Coleção corrida 2026",
    descricao:
      "Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur.",
    img: tenis2,
    alt: "Tênis de corrida",
    textoBotao: "Ver Produtos",
    link: "/produtos",
  },
  {
    id: 3,
    tag: "Só este mês",
    titulo: "Até 30% de desconto",
    descricao:
      "Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur.",
    img: tenis3,
    alt: "Tênis casual",
    textoBotao: "Aproveitar",
    link: "/produtos",
  },
  {
    id: 4,
    tag: "Lançamento",
    titulo: "Estilo para o dia a dia",
    descricao:
      "Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur.",
    img: tenis4,
    alt: "Tênis urbano",
    textoBotao: "Conferir",
    link: "/produtos",
  },
];
