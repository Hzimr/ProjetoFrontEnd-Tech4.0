// src/pages/OrderSuccessPage.tsx
import type { ReactNode } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import type { Pedido } from "../types/PedidoProps";
import { FormatPrice } from "../utils/FormatPrice";

const Secao = ({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) => (
  <section className="flex flex-col gap-3 border-b border-gray-200 py-5">
    <h2 className="text-sm font-bold text-gray-700">{titulo}</h2>
    {children}
  </section>
);

const Dado = ({ rotulo, valor }: { rotulo: string; valor: string }) => (
  <p className="text-xs">
    <span className="text-gray-500">{rotulo}</span>{" "}
    <span className="font-medium text-gray-900">{valor}</span>
  </p>
);

const OrderSuccessPage = () => {
  const { state } = useLocation();
  const pedido = (state as { pedido?: Pedido } | null)?.pedido;

  // Acesso direto à URL, sem ter feito uma compra
  if (!pedido) return <Navigate to="/" replace />;

  const { pessoal, entrega, pagamento, itens, total } = pedido;

  return (
    <main className="flex flex-col gap-6 px-4 py-8 lg:px-0">
      <article className="mx-auto flex w-full max-w-2xl flex-col rounded-md bg-white p-6 sm:p-8">
        <header className="flex flex-col items-center gap-3 border-b border-gray-200 pb-6 text-center">
          <span className="text-6xl" aria-hidden>
            🎉
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Compra Realizada
            <br />
            com sucesso!
          </h1>
        </header>

        <Secao titulo="Informações Pessoais">
          <Dado rotulo="Nome:" valor={pessoal.nome} />
          <Dado rotulo="CPF:" valor={pessoal.cpf} />
          <Dado rotulo="Email" valor={pessoal.email} />
          <Dado rotulo="Celular" valor={pessoal.celular} />
        </Secao>

        <Secao titulo="Informações de Entrega">
          <Dado rotulo="Endereço:" valor={entrega.endereco} />
          <Dado rotulo="Bairro:" valor={entrega.bairro} />
          <Dado rotulo="Cidade:" valor={entrega.cidade} />
          <Dado rotulo="CEP:" valor={entrega.cep} />
          {entrega.complemento && (
            <Dado rotulo="Complemento:" valor={entrega.complemento} />
          )}
        </Secao>

        <Secao titulo="Informações de Pagamento">
          {pagamento.forma === "cartao" ? (
            <>
              <Dado
                rotulo="Titular do Cartão:"
                valor={pagamento.titular ?? ""}
              />
              <Dado
                rotulo="Final"
                valor={`************${pagamento.finalCartao}`}
              />
            </>
          ) : (
            <Dado rotulo="Forma de pagamento:" valor="Boleto Bancário" />
          )}
        </Secao>

        <Secao titulo="Resumo da compra">
          <ul className="flex flex-col gap-4">
            {itens.map((item) => (
              <li key={item.chave} className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="h-12 w-16 shrink-0 rounded bg-[#E2E3FF] object-contain"
                />
                <p className="text-xs font-bold text-gray-900">
                  {item.nome}
                  {item.quantidade > 1 && (
                    <span className="font-normal text-gray-500">
                      {" "}
                      × {item.quantidade}
                    </span>
                  )}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-2 rounded-md bg-amber-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                {FormatPrice(total)}
              </span>
            </div>
            <p className="mt-1 text-right text-xs text-gray-500">
              ou 10x de {FormatPrice(total / 10)} sem juros
            </p>
          </div>
        </Secao>

        <button
          type="button"
          onClick={() => window.print()}
          className="mx-auto mt-6 text-sm text-gray-700 underline hover:text-primary print:hidden"
        >
          Imprimir Recibo
        </button>
      </article>

      <Link
        to="/"
        className="mx-auto flex h-11 w-full max-w-2xl items-center justify-center rounded-md bg-amber-400 text-sm font-bold text-white hover:brightness-105 print:hidden"
      >
        Voltar para Home
      </Link>
    </main>
  );
};

export default OrderSuccessPage;
