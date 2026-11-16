import { Link } from "react-router-dom";
import type { CardProductProps } from "../types/CardProductProps";
import CardProduct from "./CardProduct";
import SemProdutos from "../imgs/SemProdutos.png";
import { FaArrowRightLong } from "react-icons/fa6";

interface ProductHighProps {
  produtos: CardProductProps[];
}
const ProductHigh = ({ produtos }: ProductHighProps) => {
  return (
    <div className="flex flex-col gap-5 bg-gray-light-4 py-16 max-w-full px-24">
      <section className="flex flex-row justify-between items-center">
        <h3 className="text-2xl font-bold">Produtos em alta</h3>
        <Link
          to="/produtos"
          className="text-primary hover:border-b-primary border-b-2 border-b-transparent hover:border-b-2 flex justify-center items-center gap-2.5"
        >
          Ver todos <FaArrowRightLong size={14} />
        </Link>
      </section>

      {produtos.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {produtos.map((produto) => (
            <CardProduct key={produto.id} {...produto} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-10">
          <img src={SemProdutos} alt="Nenhum produto encontrado" />
          <p className="text-gray-500">Nenhum produto encontrado.</p>
        </div>
      )}
    </div>
  );
};

export default ProductHigh;
