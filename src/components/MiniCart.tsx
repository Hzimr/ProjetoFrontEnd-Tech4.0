// src/components/MiniCarrinho.tsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../assets/cart.png";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { FormatPrice } from "../utils/FormatPrice";

const MiniCarrinho = () => {
  const { itens, totalItens, esvaziar } = useCarrinho();
  const [aberto, setAberto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const fechar = () => setAberto(false);

  const total = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);

  // Fecha ao clicar fora ou apertar Esc
  useEffect(() => {
    if (!aberto) return;

    const aoClicar = (e: MouseEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAberto(false);
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };

    document.addEventListener("mousedown", aoClicar);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("mousedown", aoClicar);
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto]);

  return (
    <div ref={raiz} className="relative">
      <button
        type="button"
        onClick={() => setAberto((a) => !a)}
        aria-label={`Carrinho, ${totalItens} itens`}
        aria-expanded={aberto}
        className="relative block"
      >
        <img src={Cart} alt="" />
        {totalItens > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-white">
            {totalItens}
          </span>
        )}
      </button>

      {aberto && (
        <div className="fixed inset-x-4 top-24 z-50 rounded-md bg-white p-6 shadow-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-4 sm:w-96">
          <h2 className="border-b border-gray-200 pb-3 text-base font-semibold text-gray-700">
            Meu Carrinho
          </h2>

          {itens.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">
              Seu carrinho está vazio.
            </p>
          ) : (
            <>
              <ul className="flex max-h-72 flex-col gap-5 overflow-y-auto py-5">
                {itens.map((item) => (
                  <li key={item.chave} className="flex gap-4">
                    <Link
                      to={`/produtos/${item.id}`}
                      onClick={fechar}
                      className="h-16 w-20 shrink-0 rounded bg-[#E2E3FF]"
                    >
                      <img
                        src={item.img}
                        alt={item.alt}
                        className="h-full w-full object-contain"
                      />
                    </Link>

                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-bold leading-snug text-gray-900">
                        {item.nome}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">
                          {FormatPrice(item.preco * item.quantidade)}
                        </span>
                        {item.precoAntigo && item.precoAntigo > item.preco && (
                          <span className="text-xs text-gray-400 line-through">
                            {FormatPrice(item.precoAntigo * item.quantidade)}
                          </span>
                        )}
                      </div>
                      {item.quantidade > 1 && (
                        <span className="text-xs text-gray-500">
                          Qtd: {item.quantidade}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="text-sm font-bold text-gray-700">
                  Valor total:
                </span>
                <span className="font-bold text-primary">
                  {FormatPrice(total)}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={esvaziar}
                  className="text-sm text-gray-600 underline hover:text-primary"
                >
                  Esvaziar
                </button>

                <Link
                  to="/carrinho"
                  onClick={fechar}
                  className="flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-white hover:opacity-90"
                >
                  Ver Carrinho
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniCarrinho;
