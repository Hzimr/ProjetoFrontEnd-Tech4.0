// src/components/ProdutosRelacionados.tsx
import { Link } from "react-router-dom";
import CardProduct from "./CardProduct";
import type { CardProductProps } from "../types/CardProductProps";

interface Props {
  produtos: CardProductProps[];
  linkVerTodos: string;
}

const ProdutosRelacionados = ({ produtos, linkVerTodos }: Props) => {
  if (produtos.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">
          Produtos Relacionados
        </h2>
        <Link
          to={linkVerTodos}
          className="text-sm text-primary hover:underline"
        >
          Ver todos →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {produtos.map((produto) => (
          <CardProduct key={produto.id} {...produto} />
        ))}
      </div>
    </section>
  );
};

export default ProdutosRelacionados;
