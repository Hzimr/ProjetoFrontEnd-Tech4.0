// src/components/GaleriaProduto.tsx
import { useState } from "react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import type { ImagemProduto } from "../types/ProdutoDetalhe";

const GaleriaProduto = ({ imagens }: { imagens: ImagemProduto[] }) => {
  const [atual, setAtual] = useState(0);
  const total = imagens.length;

  const anterior = () => setAtual((i) => (i - 1 + total) % total);
  const proxima = () => setAtual((i) => (i + 1) % total);

  const imagem = imagens[atual];

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative flex aspect-4/3 items-center justify-center rounded-md"
        style={{ backgroundColor: imagem.fundo }}
      >
        <button
          type="button"
          onClick={anterior}
          aria-label="Imagem anterior"
          className="absolute left-4 p-2 text-gray-700 hover:text-primary"
        >
          <PiCaretLeft size={24} />
        </button>

        <img
          src={imagem.src}
          alt={imagem.alt}
          className="w-4/5 object-contain"
        />

        <button
          type="button"
          onClick={proxima}
          aria-label="Próxima imagem"
          className="absolute right-4 p-2 text-gray-700 hover:text-primary"
        >
          <PiCaretRight size={24} />
        </button>
      </div>

      <ul className="grid grid-cols-5 gap-4">
        {imagens.map((img, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === atual}
              className={`flex aspect-4/3 w-full items-center justify-center rounded-md border-2 transition-colors ${
                i === atual ? "border-primary" : "border-transparent"
              }`}
              style={{ backgroundColor: img.fundo }}
            >
              <img src={img.src} alt="" className="w-4/5 object-contain" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GaleriaProduto;
