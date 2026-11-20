// src/components/FiltrosProdutos.tsx
import { useEffect } from "react";
import { PiX } from "react-icons/pi";
import { OPCOES } from "../data/ProdutosListagemDados";
import type { ChaveMultipla, Filtros } from "../types/ProdutoListagemProps";

interface Props {
  filtros: Filtros;
  aberto: boolean;
  onFechar: () => void;
  onAlternar: (chave: ChaveMultipla, valor: string) => void;
  onEstado: (valor: string | null) => void;
  onLimpar: () => void;
}

const GRUPOS: { chave: ChaveMultipla; titulo: string }[] = [
  { chave: "marca", titulo: "Marca" },
  { chave: "uso", titulo: "Categoria" },
  { chave: "genero", titulo: "Gênero" },
];

const FiltrosProdutos = ({
  filtros,
  aberto,
  onFechar,
  onAlternar,
  onEstado,
  onLimpar,
}: Props) => {
  // Trava o scroll da página e fecha com Esc enquanto a gaveta está aberta
  useEffect(() => {
    if (!aberto) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
    };
    window.addEventListener("keydown", aoTeclar);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto, onFechar]);

  return (
    <>
      {/* Fundo escuro (só mobile) */}
      {aberto && (
        <div
          aria-hidden
          onClick={onFechar}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col overflow-y-auto
          bg-white p-6 transition-transform duration-300
          ${aberto ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:z-auto lg:h-fit lg:w-56 lg:shrink-0 lg:translate-x-0
          lg:overflow-visible lg:rounded-md
        `}
      >
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-sm font-semibold text-gray-700">Filtrar por</h3>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onLimpar}
              className="text-xs text-primary hover:underline"
            >
              Limpar
            </button>

            <button
              type="button"
              onClick={onFechar}
              aria-label="Fechar filtros"
              className="text-gray-600 lg:hidden"
            >
              <PiX size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {GRUPOS.map(({ chave, titulo }) => (
            <fieldset key={chave} className="flex flex-col gap-2">
              <legend className="mb-2 text-xs font-bold text-gray-700">
                {titulo}
              </legend>
              {OPCOES[chave].map((opcao) => (
                <label
                  key={opcao}
                  className="flex cursor-pointer items-center gap-2 text-xs text-gray-600"
                >
                  <input
                    type="checkbox"
                    checked={filtros[chave].includes(opcao)}
                    onChange={() => onAlternar(chave, opcao)}
                    className="h-4 w-4 cursor-pointer accent-primary"
                  />
                  {opcao}
                </label>
              ))}
            </fieldset>
          ))}

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-xs font-bold text-gray-700">
              Estado
            </legend>
            {OPCOES.estado.map((opcao) => (
              <label
                key={opcao}
                className="flex cursor-pointer items-center gap-2 text-xs text-gray-600"
              >
                <input
                  type="radio"
                  name="estado"
                  checked={filtros.estado === opcao}
                  onChange={() => {}}
                  onClick={() =>
                    onEstado(filtros.estado === opcao ? null : opcao)
                  }
                  className="h-4 w-4 cursor-pointer accent-primary"
                />
                {opcao}
              </label>
            ))}
          </fieldset>
        </div>

        {/* Botão de aplicar (só mobile) */}
        <button
          type="button"
          onClick={onFechar}
          className="mt-8 h-12 rounded-md bg-primary font-semibold text-white lg:hidden"
        >
          Ver resultados
        </button>
      </aside>
    </>
  );
};

export default FiltrosProdutos;
