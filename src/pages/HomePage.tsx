import { ProdutosDados } from "../data/ProdutosDados";
import ProductHigh from "../components/ProductHigh";
import OfertaEspecial from "../components/OfertaEspecial";
import Hero from "../components/Hero";
import { HeroDados } from "../data/HeroDados";
import SecaoDestaque from "../components/SecaoDestaque";

const HomePage = () => {
  return (
    <>
      <Hero slides={HeroDados} />
      <SecaoDestaque />
      <ProductHigh produtos={ProdutosDados} />
      <OfertaEspecial />
    </>
  );
};

export default HomePage;
