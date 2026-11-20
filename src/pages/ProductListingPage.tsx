// src/pages/ProductListingPage.tsx
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import FiltrosProdutos from "../components/FilterGroup";
import Paginacao from "../components/Paginacao";
import { ProdutosListagemDados } from "../data/ProdutosListagemDados";
import type { ChaveMultipla, Filtros } from "../types/ProdutoListagemProps";
import SemProdutos from "../imgs/SemProdutos.png";
import { PiFunnel } from "react-icons/pi";

const POR_PAGINA = 9;

const ORDENACOES = [
  { valor: "relevantes", rotulo: "mais relevantes" },
  { valor: "menor-preco", rotulo: "menor preço" },
  { valor: "maior-preco", rotulo: "maior preço" },
  { valor: "nome", rotulo: "nome (A-Z)" },
];

const precoFinal = (p: {
  valor: number;
  oferta?: boolean;
  desconto?: number;
}) => (p.oferta ? p.valor * (1 - (p.desconto ?? 0) / 100) : p.valor);

export const ProductListingPage = () => {
  const [params, setParams] = useSearchParams();
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  // ---------- Estado lido da URL ----------
  const busca = params.get("filter") ?? "";
  const ordem = params.get("ordem") ?? "relevantes";
  const paginaPedida = Math.max(1, Number(params.get("pagina")) || 1);

  const filtros: Filtros = {
    marca: params.getAll("marca"),
    uso: params.getAll("uso"),
    genero: params.getAll("genero"),
    estado: params.get("estado"),
  };

  // ---------- Atualizadores (sempre voltam para a página 1) ----------
  const atualizar = (fn: (p: URLSearchParams) => void) => {
    const novo = new URLSearchParams(params);
    fn(novo);
    novo.delete("pagina");
    setParams(novo);
  };

  const alternar = (chave: ChaveMultipla, valor: string) =>
    atualizar((p) => {
      const atuais = p.getAll(chave);
      p.delete(chave);
      const lista = atuais.includes(valor)
        ? atuais.filter((v) => v !== valor)
        : [...atuais, valor];
      lista.forEach((v) => p.append(chave, v));
    });

  const definirEstado = (valor: string | null) =>
    atualizar((p) => (valor ? p.set("estado", valor) : p.delete("estado")));

  const definirOrdem = (valor: string) =>
    atualizar((p) => p.set("ordem", valor));

  const limpar = () => {
    const novo = new URLSearchParams();
    if (busca) novo.set("filter", busca); // mantém a busca do Header
    setParams(novo);
  };

  const mudarPagina = (pagina: number) => {
    const novo = new URLSearchParams(params);
    novo.set("pagina", String(pagina));
    setParams(novo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- Filtrar + ordenar ----------
  const query = params.toString();

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    const lista = ProdutosListagemDados.filter((p) => {
      if (
        termo &&
        !`${p.nome} ${p.categoria} ${p.marca}`.toLowerCase().includes(termo)
      )
        return false;
      if (filtros.marca.length && !filtros.marca.includes(p.marca))
        return false;
      if (filtros.uso.length && !filtros.uso.includes(p.uso)) return false;
      if (filtros.genero.length && !filtros.genero.includes(p.genero))
        return false;
      if (filtros.estado && p.estado !== filtros.estado) return false;
      return true;
    });

    switch (ordem) {
      case "menor-preco":
        return [...lista].sort((a, b) => precoFinal(a) - precoFinal(b));
      case "maior-preco":
        return [...lista].sort((a, b) => precoFinal(b) - precoFinal(a));
      case "nome":
        return [...lista].sort((a, b) => a.nome.localeCompare(b.nome));
      default:
        return lista;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  // ---------- Paginação ----------
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaAtual = Math.min(paginaPedida, totalPaginas);
  const visiveis = filtrados.slice(
    (paginaAtual - 1) * POR_PAGINA,
    paginaAtual * POR_PAGINA,
  );

  return (
    <main className="flex flex-col gap-6 px-6 py-8 bg-gray-light-4 lg:px-24">
      {/* Cabeçalho */}
      <section className="flex flex-col-reverse gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">
            Resultados para "{busca || "Todos os produtos"}"
          </span>{" "}
          - {filtrados.length} produtos
        </p>

        <div className="flex items-center gap-3">
          <label className="flex h-12 flex-1 items-center gap-2 rounded-md border border-gray-400 px-4 text-sm lg:flex-none">
            <span className="font-bold">Ordenar por:</span>
            <select
              value={ordem}
              onChange={(e) => definirOrdem(e.target.value)}
              className="min-w-0 flex-1 cursor-pointer bg-transparent outline-none"
            >
              {ORDENACOES.map((o) => (
                <option key={o.valor} value={o.valor}>
                  {o.rotulo}
                </option>
              ))}
            </select>
          </label>

          {/* Botão do funil (só mobile) */}
          <button
            type="button"
            onClick={() => setFiltrosAbertos(true)}
            aria-label="Abrir filtros"
            className="cursor-pointer flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary text-white lg:hidden duration-200 hover:bg-gray-light hover:border hover:border-primary hover:text-primary"
          >
            <PiFunnel size={22} />
          </button>
        </div>
      </section>

      {/* Filtros + grid */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <FiltrosProdutos
          filtros={filtros}
          aberto={filtrosAbertos}
          onFechar={() => setFiltrosAbertos(false)}
          onAlternar={alternar}
          onEstado={definirEstado}
          onLimpar={limpar}
        />

        <section className="flex-1">
          {visiveis.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-6">
                {visiveis.map((produto) => (
                  <CardProduct key={produto.id} {...produto} />
                ))}
              </div>

              <Paginacao
                paginaAtual={paginaAtual}
                totalPaginas={totalPaginas}
                onMudar={mudarPagina}
              />
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-16">
              <img src={SemProdutos} alt="Nenhum produto encontrado" />
              <p className="text-gray-500">
                Nenhum produto encontrado com esses filtros.
              </p>
              <button
                type="button"
                onClick={limpar}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductListingPage;
