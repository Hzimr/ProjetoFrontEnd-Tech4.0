import { ProdutosDados } from "../data/ProdutosDados";
import { DestaqueDados } from "../data/DestaqueDados";
import ProductHigh from "../components/ProductHigh";
import OfertaEspecial from "../components/OfertaEspecial";
import MenuDestaque from "../components/MenuDestaque";

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <MenuDestaque destaques={DestaqueDados} />
      <ProductHigh produtos={ProdutosDados} />
      <OfertaEspecial />
    </>
  );
};

export default HomePage;
