import type { CardProductProps } from "../types/CardProductProps";
import { FormatPrice } from "../utils/FormatPrice";

const CardProduct = ({
  oferta = false,
  desconto = 0,
  img,
  alt,
  categoria,
  nome,
  valor,
}: CardProductProps) => {
  const temDesconto = oferta && desconto > 0;
  const valorFinal = temDesconto ? valor * (1 - desconto / 100) : valor;

  return (
    <div className="flex h-80 w-72 flex-col gap-3 bg-white rounded-lg p-4">
      <section className="relative">
        {temDesconto && (
          <span className="rounded-4xl text-center w-24 absolute top-2 left-2 bg-offer text-black text-sm font-bold px-2 py-1">
            {desconto}% OFF
          </span>
        )}
        <img src={img} alt={alt} />
      </section>
      <section>
        <p className="text-sm text-gray-500 capitalize">{categoria}</p>
        <h3 className="font-semibold capitalize">{nome}</h3>

        <div className="flex flex-row items-center gap-2">
          {temDesconto && (
            <span className="text-gray-400 line-through text-sm">
              {FormatPrice(valor)}
            </span>
          )}
          <span className="font-bold">{FormatPrice(valorFinal)}</span>
        </div>
      </section>
    </div>
  );
};

export default CardProduct;
