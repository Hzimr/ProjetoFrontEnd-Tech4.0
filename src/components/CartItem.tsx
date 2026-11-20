// src/components/CartItem.tsx
import { PiMinus, PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useCarrinho } from "../contexts/CarrinhoContext";
import type { ItemCarrinhoProps } from "../types/ItemCarrinhoProps";
import { FormatPrice } from "../utils/FormatPrice";

const Precos = ({ valor, antigo }: { valor: number; antigo?: number }) => (
  <div className="flex items-center gap-2 lg:flex-col lg:gap-0">
    {antigo && antigo > valor && (
      <span className="text-xs text-gray-400 line-through">
        {FormatPrice(antigo)}
      </span>
    )}
    <span className="font-bold text-gray-900">{FormatPrice(valor)}</span>
  </div>
);

const CartItem = ({ item }: { item: ItemCarrinhoProps }) => {
  const { alterarQuantidade, remover } = useCarrinho();
  const botao =
    "flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:border-primary disabled:opacity-40 lg:h-6 lg:w-6";

  return (
    <li className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_120px_100px_100px] lg:items-center">
      {/* Produto */}
      <div className="flex gap-4">
        <Link
          to={`/produtos/${item.id}`}
          className="h-20 w-28 shrink-0 rounded bg-[#E2E3FF]"
        >
          <img
            src={item.img}
            alt={item.alt}
            className="h-full w-full object-contain"
          />
        </Link>
        <div className="flex flex-col gap-1 text-xs text-gray-600">
          <h3 className="text-sm font-bold text-gray-900">{item.nome}</h3>
          <p>
            Cor: <span className="text-gray-900">{item.cor}</span>
          </p>
          <p>
            Tamanho: <span className="text-gray-900">{item.tamanho}</span>
          </p>
        </div>
      </div>

      {/* Quantidade */}
      <div className="flex flex-col items-start gap-2 lg:items-center">
        <span className="text-xs uppercase text-gray-600 lg:hidden">
          Quantidade
        </span>
        <div className="flex w-full items-center justify-between gap-3 lg:w-auto">
          <button
            type="button"
            aria-label="Diminuir"
            disabled={item.quantidade === 1}
            onClick={() => alterarQuantidade(item.chave, -1)}
            className={botao}
          >
            <PiMinus size={12} />
          </button>
          <span className="text-sm">{item.quantidade}</span>
          <button
            type="button"
            aria-label="Aumentar"
            onClick={() => alterarQuantidade(item.chave, 1)}
            className={botao}
          >
            <PiPlus size={12} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => remover(item.chave)}
          className="self-center text-xs text-gray-600 underline hover:text-primary"
        >
          Remover item
        </button>
      </div>

      {/* Unitário */}
      <div className="flex items-center justify-between lg:justify-center">
        <span className="text-xs uppercase text-gray-600 lg:hidden">
          Unitário
        </span>
        <Precos valor={item.preco} antigo={item.precoAntigo} />
      </div>

      {/* Total */}
      <div className="flex items-center justify-between lg:justify-center">
        <span className="text-xs uppercase text-gray-600 lg:hidden">Total</span>
        <Precos
          valor={item.preco * item.quantidade}
          antigo={item.precoAntigo && item.precoAntigo * item.quantidade}
        />
      </div>
    </li>
  );
};

export default CartItem;
