import { Link } from "react-router-dom";
import type { DestaqueProductProps } from "../types/DestaqueProductProps";

const CardDestaque = ({
  alt,
  categoria,
  desconto,
  img,
}: DestaqueProductProps) => {
  return (
    <div
      className="bg-card z-1 grid grid-cols-7 w-100 min-w-80 
    "
    >
      <section className="px-8 z-1 py-8 col-span-3">
        <span className="rounded-4xl text-center w-24 top-2 left-2 bg-offer text-black text-sm font-bold px-2 py-1">
          {desconto}% OFF
        </span>
        <h3 className="font-bold text-[32px] capitalize">{categoria}</h3>
        <Link
          to={"/"}
          className="z-1 flex items-center justify-center rounded-sm hover:opacity-80 text-primary font-bold text-[16px] w-38 h-12 bg-gray-light-3"
        >
          Comprar
        </Link>
        <div className="flex flex-row items-center gap-2"></div>
      </section>
      <section className="col-span-4 h-full z-0">
        <img src={img} alt={alt} className="h-full" />
      </section>
    </div>
  );
};

export default CardDestaque;
