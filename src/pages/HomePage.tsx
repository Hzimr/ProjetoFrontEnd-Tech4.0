import { ProdutosDados } from "../data/ProdutosDados";
import ProductHigh from "../components/ProductHigh";
import OfertaEspecial from "../components/OfertaEspecial";

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <ProductHigh produtos={ProdutosDados} />
      <OfertaEspecial />
    </>
  );
};

export default HomePage;
