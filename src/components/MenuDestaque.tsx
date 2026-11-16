import type { DestaqueProductProps } from "../types/DestaqueProductProps";
import CardDestaque from "./CardDestaque";
import SemProdutos from "../imgs/SemProdutos.png";

interface MenuDestaqueProps {
  destaques: DestaqueProductProps[];
}

const MenuDestaque = ({ destaques }: MenuDestaqueProps) => {
  return (
    <div className="flex flex-col max-w-full h-100 bg-gray-light-4 py-10 px-24 gap-5">
      <section className="flex flex-row justify-between items-center">
        <h3 className="text-2xl font-bold">Coleções em destaque</h3>
      </section>

      {destaques.length > 0 ? (
        <div className="flex flex-wrap gap-6 w-full h-full justify-center">
          {destaques.map((destaque) => (
            <CardDestaque key={destaque.id} {...destaque} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center  gap-4 py-10">
          <img
            src={SemProdutos}
            alt="Nenhum destaque encontrado"
            className="w-50"
          />
          <p className="text-gray-500">Nenhum destaque encontrado.</p>
        </div>
      )}
    </div>
  );
};

export default MenuDestaque;
