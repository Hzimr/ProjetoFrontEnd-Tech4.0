import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer.tsx";
import OfertaEspecial from "../components/OfertaEspecial.tsx";


const PageLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <OfertaEspecial />
      <Footer />
    </>
  );
};

export default PageLayout;
