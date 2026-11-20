// src/pages/MyOrdersPage.tsx
import { Link } from "react-router-dom";
import { PedidosDados } from "../data/PedidosDados";
import type { StatusPedido } from "../types/PedidoResumo";
import MenuPerfil from "../components/MenuPerfil";

const STATUS: Record<StatusPedido, { rotulo: string; cor: string }> = {
  "em-transito": { rotulo: "Produto em trânsito", cor: "text-amber-500" },
  finalizado: { rotulo: "Finalizado", cor: "text-gray-500" },
  cancelado: { rotulo: "Cancelado", cor: "text-red-500" },
};

const MyOrdersPage = () => {
  const pedidos = PedidosDados;

  return (
    <main className="bg-gray-light px-4 py-8 lg:px-24 lg:py-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
        <MenuPerfil />

        <section className="rounded-md bg-white p-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 text-xs font-bold text-gray-700">
            <h1>Meus Pedidos</h1>
            <span className="hidden uppercase lg:block">Status</span>
          </div>

          {pedidos.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-12">
              <p className="text-gray-500">Você ainda não fez nenhum pedido.</p>
              <Link
                to="/produtos"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white"
              >
                Ver produtos
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {pedidos.map((pedido) => {
                const { rotulo, cor } = STATUS[pedido.status];

                return (
                  <li
                    key={pedido.numero}
                    className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/produtos/${pedido.produtoId}`}
                        className="h-12 w-16 shrink-0 rounded bg-[#E2E3FF]"
                      >
                        <img
                          src={pedido.img}
                          alt={pedido.alt}
                          className="h-full w-full object-contain"
                        />
                      </Link>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] tracking-wide text-gray-500">
                          Pedido nº {pedido.numero}
                        </span>
                        <h2 className="text-xs font-bold text-gray-900">
                          {pedido.nome}
                        </h2>
                      </div>
                    </div>

                    {/* Mobile: linha própria com o rótulo "STATUS" */}
                    <div className="flex items-center justify-between border-t border-gray-200 pt-3 lg:border-0 lg:pt-0">
                      <span className="text-xs uppercase text-gray-600 lg:hidden">
                        Status
                      </span>
                      <span className={`text-xs font-bold ${cor}`}>
                        {rotulo}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default MyOrdersPage;
