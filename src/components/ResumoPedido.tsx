// src/components/ResumoPedido.tsx
import { Link } from "react-router-dom";
import { FormatPrice } from "../utils/FormatPrice";

interface Props {
  subtotal: number;
  frete: number;
  desconto: number;
  total: number;
}

const Linha = ({ rotulo, valor }: { rotulo: string; valor: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{rotulo}</span>
    <span className="text-gray-900">{valor}</span>
  </div>
);

const ResumoPedido = ({ subtotal, frete, desconto, total }: Props) => (
  <aside className="h-fit rounded-md bg-white p-6 lg:w-72">
    <h2 className="mb-4 border-b border-gray-200 pb-3 text-xs font-bold uppercase text-gray-700">
      Resumo
    </h2>

    <div className="flex flex-col gap-3">
      <Linha rotulo="Subtotal:" valor={FormatPrice(subtotal)} />
      <Linha rotulo="Frete:" valor={FormatPrice(frete)} />
      <Linha rotulo="Desconto:" valor={FormatPrice(desconto)} />
    </div>

    <div className="mt-6 flex items-center justify-between">
      <span className="font-bold text-gray-900">Total</span>
      <span className="text-xl font-bold text-primary">
        {FormatPrice(total)}
      </span>
    </div>
    <p className="mb-6 mt-1 text-right text-xs text-gray-500">
      ou 10x de {FormatPrice(total / 10)} sem juros
    </p>

    {/* No mobile, o botão fica na barra fixa */}
    <Link
      to="/checkout"
      state={{ frete, desconto }}
      className="hidden h-11 items-center justify-center rounded-md bg-amber-400 text-sm font-bold text-white hover:brightness-105 lg:flex"
    >
      Continuar
    </Link>
  </aside>
);

export default ResumoPedido;
