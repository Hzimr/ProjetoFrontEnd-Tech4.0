// src/components/InfoProduto.tsx
import { useState } from "react";
import { PiStar, PiStarFill } from "react-icons/pi";
import type { ProdutoDetalhe } from "../types/ProdutoDetalhe";
import { FormatPrice } from "../utils/FormatPrice";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../contexts/CarrinhoContext";

const Estrelas = ({ nota }: { nota: number }) => (
  <span className="flex text-amber-400" aria-hidden>
    {[1, 2, 3, 4, 5].map((n) =>
      n <= Math.round(nota) ? <PiStarFill key={n} /> : <PiStar key={n} />,
    )}
  </span>
);

const InfoProduto = ({ produto }: { produto: ProdutoDetalhe }) => {
  const [tamanho, setTamanho] = useState<number | null>(null);
  const [cor, setCor] = useState(produto.cores[0]?.hex ?? null);

  const navigate = useNavigate();
  const { adicionar } = useCarrinho();

  const comprar = () => {
    if (tamanho === null) return;

    adicionar({
      id: produto.id,
      nome: produto.nome,
      img: produto.imagens[0].src,
      alt: produto.alt,
      tamanho,
      cor: produto.cores.find((c) => c.hex === cor)?.nome ?? "",
      preco,
      precoAntigo: produto.valorAntigo,
    });

    navigate("/carrinho");
  };

  const preco = produto.oferta
    ? produto.valor * (1 - (produto.desconto ?? 0) / 100)
    : produto.valor;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-extrabold leading-tight text-gray-900">
        {produto.nome}
      </h1>

      <div className="flex flex-col gap-2 text-xs text-gray-600">
        <p>
          {produto.uso} | {produto.marca} | {produto.referencia}
        </p>
        <div className="flex items-center gap-2">
          <Estrelas nota={produto.nota} />
          <span className="rounded bg-amber-400 px-2 py-0.5 font-bold text-white">
            {produto.nota} ★
          </span>
          <span>({produto.avaliacoes} avaliações)</span>
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-gray-900">
          {FormatPrice(preco)}
        </span>
        {produto.valorAntigo && (
          <span className="text-sm text-gray-400 line-through">
            {FormatPrice(produto.valorAntigo)}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-xs font-bold text-gray-600">
          Descrição do produto
        </h2>
        <p className="text-sm text-gray-700">{produto.descricao}</p>
      </div>

      {/* Tamanho */}
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-xs font-bold text-gray-600">
          Tamanho
        </legend>
        <div className="flex flex-wrap gap-3">
          {produto.tamanhos.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={t === tamanho}
              onClick={() => setTamanho(t)}
              className={`h-12 w-12 rounded-md border text-sm font-bold transition-colors ${
                t === tamanho
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Cor */}
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-xs font-bold text-gray-600">Cor</legend>
        <div className="flex gap-3">
          {produto.cores.map((c) => (
            <button
              key={c.hex}
              type="button"
              aria-label={c.nome}
              aria-pressed={c.hex === cor}
              onClick={() => setCor(c.hex)}
              className={`h-8 w-8 rounded-full ring-offset-2 transition ${
                c.hex === cor
                  ? "ring-2 ring-primary"
                  : "hover:ring-2 hover:ring-gray-300"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={comprar}
          disabled={tamanho === null}
          className="h-12 w-full max-w-60 rounded-md bg-amber-400 font-bold uppercase text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Comprar
        </button>
        {tamanho === null && (
          <p className="text-xs text-gray-500">
            Selecione um tamanho para comprar.
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoProduto;
