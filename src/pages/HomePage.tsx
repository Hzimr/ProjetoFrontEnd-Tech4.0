import { ProdutosDados } from "../data/ProdutosDados";
import ProductHigh from "../components/ProductHigh";

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <ProductHigh produtos={ProdutosDados} />
    </>
  );
};

export default HomePage;
