// src/pages/CartPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import CampoAcao from "../components/CampoAcao";
import ResumoPedido from "../components/ResumoPedido";
import ProdutosRelacionados from "../components/ProdutosRelacionados";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { ProdutosDetalhadoDados } from "../data/ProdutosDetalhadoDados";
import { FormatPrice } from "../utils/FormatPrice";

type Mensagem = { texto: string; erro?: boolean } | null;

// Cupons de exemplo: troque por uma chamada à API depois
const CUPONS: Record<string, number> = { DESCONTO10: 0.1, BEMVINDO: 0.05 };
const FRETE_GRATIS_ACIMA_DE = 200;
const FRETE_PADRAO = 19.9;

const CartPage = () => {
  const { itens } = useCarrinho();
  const [percentual, setPercentual] = useState(0);
  const [frete, setFrete] = useState(0);
  const [msgCupom, setMsgCupom] = useState<Mensagem>(null);
  const [msgFrete, setMsgFrete] = useState<Mensagem>(null);

  const subtotal = itens.reduce((s, i) => s + i.preco * i.quantidade, 0);
  const desconto = subtotal * percentual;
  const total = subtotal - desconto + frete;

  const aplicarCupom = (codigo: string) => {
    const valor = CUPONS[codigo.trim().toUpperCase()];
    setPercentual(valor ?? 0);
    setMsgCupom(
      valor
        ? { texto: `Cupom aplicado: ${valor * 100}% de desconto.` }
        : { texto: "Cupom inválido.", erro: true },
    );
  };

  const calcularFrete = (cep: string) => {
    if (cep.replace(/\D/g, "").length !== 8) {
      setFrete(0);
      setMsgFrete({ texto: "Digite um CEP com 8 números.", erro: true });
      return;
    }
    const valor = subtotal >= FRETE_GRATIS_ACIMA_DE ? 0 : FRETE_PADRAO;
    setFrete(valor);
    setMsgFrete({
      texto: valor === 0 ? "Frete grátis!" : `Frete: ${FormatPrice(valor)}`,
    });
  };

  const relacionados = ProdutosDetalhadoDados.slice(0, 4);

  if (itens.length === 0) {
    return (
      <main className="flex flex-col items-center gap-4 px-6 py-24">
        <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
        <Link
          to="/produtos"
          className="rounded-md bg-primary px-6 py-3 font-semibold text-white"
        >
          Ver produtos
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-12 px-6 pb-40 pt-8 lg:px-24 lg:pb-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Coluna principal */}
        <div className="flex flex-1 flex-col gap-6">
          <section className="rounded-md bg-white p-6">
            <div className="hidden grid-cols-[minmax(0,1fr)_120px_100px_100px] border-b border-gray-200 pb-3 text-xs font-bold uppercase text-gray-700 lg:grid">
              <h2>Meu carrinho</h2>
              <span className="text-center">Quantidade</span>
              <span className="text-center">Unitário</span>
              <span className="text-center">Total</span>
            </div>
            <h2 className="mb-4 border-b border-gray-200 pb-3 text-xs font-bold uppercase text-gray-700 lg:hidden">
              Meu carrinho
            </h2>

            <ul className="flex flex-col gap-6 lg:py-6">
              {itens.map((item) => (
                <CartItem key={item.chave} item={item} />
              ))}
            </ul>

            <div className="hidden gap-6 border-t border-gray-200 pt-6 lg:flex">
              <CampoAcao
                titulo="Cupom de desconto"
                placeholder="Insira seu código"
                mensagem={msgCupom}
                onConfirmar={aplicarCupom}
              />
              <CampoAcao
                titulo="Calcular frete"
                placeholder="Insira seu CEP"
                mensagem={msgFrete}
                onConfirmar={calcularFrete}
              />
            </div>
          </section>

          {/* Mobile: cada campo em seu próprio cartão */}
          <section className="rounded-md bg-white p-6 lg:hidden">
            <CampoAcao
              titulo="Cupom de desconto"
              placeholder="Insira seu código"
              mensagem={msgCupom}
              onConfirmar={aplicarCupom}
            />
          </section>
          <section className="rounded-md bg-white p-6 lg:hidden">
            <CampoAcao
              titulo="Calcular frete"
              placeholder="Insira seu CEP"
              mensagem={msgFrete}
              onConfirmar={calcularFrete}
            />
          </section>
        </div>

        <ResumoPedido
          subtotal={subtotal}
          frete={frete}
          desconto={desconto}
          total={total}
        />
      </div>

      <ProdutosRelacionados produtos={relacionados} linkVerTodos="/produtos" />

      {/* Barra fixa (só mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex flex-col gap-3 rounded-t-2xl bg-white p-6 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="flex items-center justify-between">
          <span className="font-bold">Total</span>
          <span className="text-xl font-bold text-primary">
            {FormatPrice(total)}
          </span>
        </div>
        <p className="text-center text-xs text-gray-500">
          ou 10x de {FormatPrice(total / 10)} sem juros
        </p>
        <Link
          to="/checkout"
          className="flex h-11 items-center justify-center rounded-md bg-amber-400 font-bold text-white"
        >
          Continuar
        </Link>
      </div>
    </main>
  );
};

export default CartPage;
