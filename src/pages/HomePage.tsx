import { ProdutosDados } from "../data/ProdutosDados";
import { DestaqueDados } from "../data/DestaqueDados";
import ProductHigh from "../components/ProductHigh";
import OfertaEspecial from "../components/OfertaEspecial";
import MenuDestaque from "../components/MenuDestaque";
import Hero from "../components/Hero";
import { HeroDados } from "../data/HeroDados";

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <Hero slides={HeroDados} />
      <MenuDestaque destaques={DestaqueDados} />
      <ProductHigh produtos={ProdutosDados} />
      <OfertaEspecial />
    </>
  );
};

export default HomePage;
