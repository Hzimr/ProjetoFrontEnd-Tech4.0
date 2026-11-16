import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer.tsx";

const PageLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PageLayout;
