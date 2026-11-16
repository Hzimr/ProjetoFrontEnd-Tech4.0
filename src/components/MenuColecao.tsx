// src/components/MenuColecao.tsx
import type { ColecaoProps } from "../types/ColecaoProps";

interface MenuColecaoProps {
  colecoes: ColecaoProps[];
  selecionada: string | null;
  onSelecionar: (id: string | null) => void;
}

const MenuColecao = ({
  colecoes,
  selecionada,
  onSelecionar,
}: MenuColecaoProps) => {
  return (
    <div className="flex flex-col bg-gray-light-4 items-center gap-8 pt-8 pb-16 px-24">
      <h3 className="text-2xl font-bold text-gray-700">Coleções em destaque</h3>

      <ul className="flex flex-row flex-wrap justify-center gap-8">
        {colecoes.map(({ id, nome, icone: Icone }) => {
          const ativa = id === selecionada;

          return (
            <li key={id}>
              <button
                type="button"
                aria-pressed={ativa}
                // clicar na coleção ativa de novo remove o filtro
                onClick={() => onSelecionar(ativa ? null : id)}
                className="group flex flex-col items-center gap-3 cursor-pointer"
              >
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-full bg-white
                              transition-shadow group-hover:shadow-md
                              ${ativa ? "shadow-lg" : ""}`}
                >
                  <Icone
                    size={32}
                    className={`transition-colors ${
                      ativa
                        ? "text-primary"
                        : "text-gray-500 group-hover:text-primary"
                    }`}
                  />
                </span>

                <span
                  className={`text-xs font-bold ${
                    ativa ? "text-primary" : "text-gray-700"
                  }`}
                >
                  {nome}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuColecao;
