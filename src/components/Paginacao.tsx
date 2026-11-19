// src/components/Paginacao.tsx
interface Props {
  paginaAtual: number;
  totalPaginas: number;
  onMudar: (pagina: number) => void;
}

// Gera algo como: 1 ... 4 5 6 ... 12
const gerarPaginas = (atual: number, total: number): (number | "...")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const paginas: (number | "...")[] = [1];
  const inicio = Math.max(2, atual - 1);
  const fim = Math.min(total - 1, atual + 1);

  if (inicio > 2) paginas.push("...");
  for (let i = inicio; i <= fim; i++) paginas.push(i);
  if (fim < total - 1) paginas.push("...");

  paginas.push(total);
  return paginas;
};

const base =
  "flex h-10 min-w-10 items-center justify-center rounded-md text-sm transition-colors";

const Paginacao = ({ paginaAtual, totalPaginas, onMudar }: Props) => {
  if (totalPaginas <= 1) return null;

  return (
    <nav
      aria-label="Paginação"
      className="mt-10 flex flex-wrap items-center justify-center gap-3.5"
    >
      <button
        type="button"
        disabled={paginaAtual === 1}
        onClick={() => onMudar(paginaAtual - 1)}
        className={`${base} px-4 bg-white text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        Anterior
      </button>

      {gerarPaginas(paginaAtual, totalPaginas).map((p, i) =>
        p === "..." ? (
          <span key={`e${i}`} className="text-gray-400">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onMudar(p)}
            aria-current={p === paginaAtual ? "page" : undefined}
            className={`${base} ${
              p === paginaAtual
                ? "bg-primary font-bold text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={paginaAtual === totalPaginas}
        onClick={() => onMudar(paginaAtual + 1)}
        className={`${base} px-4 bg-white text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        Próxima
      </button>
    </nav>
  );
};

export default Paginacao;
