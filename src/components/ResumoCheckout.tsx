// src/components/ResumoCheckout.tsx
import type { ItemCarrinhoProps } from "../types/ItemCarrinhoProps";
import { FormatPrice } from "../utils/FormatPrice";

interface Props {
  itens: ItemCarrinhoProps[];
  subtotal: number;
  frete: number;
  desconto: number;
  total: number;
}

const Linha = ({ rotulo, valor }: { rotulo: string; valor: string }) => (
  <div className="flex justify-between text-xs">
    <span className="text-gray-600">{rotulo}</span>
    <span className="text-gray-900">{valor}</span>
  </div>
);

const ResumoCheckout = ({ itens, subtotal, frete, desconto, total }: Props) => (
  <aside className="sticky top-6 hidden h-fit rounded-md bg-white p-6 lg:block">
    <h2 className="mb-4 border-b border-gray-200 pb-3 text-lg font-bold text-gray-700">
      RESUMO
    </h2>

    <ul className="flex flex-col gap-4 border-b border-gray-200 pb-4">
      {itens.map((item) => (
        <li key={item.chave} className="flex items-center gap-3">
          <img
            src={item.img}
            alt={item.alt}
            className="h-10 w-14 shrink-0 rounded bg-[#E2E3FF] object-contain"
          />
          <div className="text-xs font-bold text-gray-900">
            {item.nome}
            {item.quantidade > 1 && (
              <span className="font-normal text-gray-500">
                {" "}
                × {item.quantidade}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>

    <div className="flex flex-col gap-3 py-4">
      <Linha rotulo="Subtotal:" valor={FormatPrice(subtotal)} />
      <Linha rotulo="Frete:" valor={FormatPrice(frete)} />
      <Linha rotulo="Desconto:" valor={FormatPrice(desconto)} />
    </div>

    <div className="rounded-md bg-amber-50 p-4">
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-900">Total</span>
        <span className="text-xl font-bold text-primary">
          {FormatPrice(total)}
        </span>
      </div>
      <p className="mt-1 text-right text-xs text-gray-500">
        ou 10x de {FormatPrice(total / 10)} sem juros
      </p>
    </div>

    {/* Fica fora do <form>, então usa o atributo form para enviá-lo */}
    <button
      type="submit"
      form="checkout-form"
      className="mt-4 h-11 w-full rounded-md bg-amber-400 text-sm font-bold text-white hover:brightness-105"
    >
      Realizar Pagamento
    </button>
  </aside>
);

export default ResumoCheckout;
