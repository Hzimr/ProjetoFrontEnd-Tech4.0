// src/pages/ProductViewPage.tsx
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import GaleriaProduto from "../components/GaleriaProduto";
import InfoProduto from "../components/InfoProduto";
import ProdutosRelacionados from "../components/ProdutosRelacionados";
import { ProdutosDetalhadoDados } from "../data/ProdutosDetalhadoDados";
import type { ProdutoDetalhe } from "../types/ProdutoDetalhe";

const Detalhe = ({ produto }: { produto: ProdutoDetalhe }) => {
  // volta ao topo ao abrir outro produto (ex.: clicando em um relacionado)
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const relacionados = ProdutosDetalhadoDados.filter(
    (p) => p.id !== produto.id && p.marca === produto.marca,
  ).slice(0, 4);

  const migalhas = [
    { rotulo: "Home", to: "/" },
    { rotulo: "Produtos", to: "/produtos" },
    {
      rotulo: produto.categoria,
      to: `/produtos?filter=${encodeURIComponent(produto.categoria)}`,
    },
    {
      rotulo: produto.marca,
      to: `/produtos?marca=${encodeURIComponent(produto.marca)}`,
    },
    { rotulo: produto.nome },
  ];

  return (
    <main className="flex flex-col gap-12 px-6 py-8 lg:px-24">
      <Breadcrumb itens={migalhas} />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <GaleriaProduto imagens={produto.imagens} />
        <InfoProduto produto={produto} />
      </div>

      <ProdutosRelacionados
        produtos={relacionados}
        linkVerTodos={`/produtos?marca=${encodeURIComponent(produto.marca)}`}
      />
    </main>
  );
};

const ProductViewPage = () => {
  const { id } = useParams();
  const produto = ProdutosDetalhadoDados.find((p) => p.id === Number(id));

  if (!produto) {
    return (
      <main className="flex flex-col items-center gap-4 py-24">
        <h1 className="text-2xl font-bold">Produto não encontrado</h1>
        <Link to="/produtos" className="text-primary underline">
          Voltar para os produtos
        </Link>
      </main>
    );
  }

  // o key reinicia tamanho, cor e foto selecionados quando o id muda
  return <Detalhe key={produto.id} produto={produto} />;
};

export default ProductViewPage;
