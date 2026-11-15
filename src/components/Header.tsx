import { Link, NavLink } from "react-router-dom";
import Cart from "../assets/cart.png";
import { CiSearch } from "react-icons/ci";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="flex flex-col gap-10 bg-white max-w-full py-8 px-24 ">
      <section className="flex flew-row justify-between items-center gap-10 w-full">
        <Logo />
        <div className="relative w-full min-w-80 max-w-200">
          <input
            type="text"
            placeholder="Pesquisar Produto..."
            className="peer bg-gray-light h-16 w-full pl-6 pr-14 py-4 rounded-md border-2 border-transparent outline-none focus:border-primary"
          />
          <CiSearch
            size={24}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none peer-focus:text-primary"
          />
        </div>
        <ul className="flex flex-row items-center gap-8">
          <li className="flex justify-center items-center underline">
            <Link to={"/"}>Cadastre-se</Link>
          </li>
          <li className="flex justify-center rounded-lg items-center w-28 h-10 bg-primary text-white">
            <Link to={"/"}>Entrar</Link>
          </li>
          <li className="ml-16">
            <Link to={"/"}>
              <img src={Cart} alt="" />
            </Link>
          </li>
        </ul>
      </section>
      <nav className="">
        <ul className="flex flex-row gap-8">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold border-b-primary border-b-2"
                  : "text-gray-700"
              }
              to={"/"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold border-b-primary border-b-2"
                  : "text-gray-700"
              }
              to={"/produtos"}
            >
              Produtos
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold border-b-primary border-b-2"
                  : "text-gray-700"
              }
              to={"/categorias"}
            >
              Categorias
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold border-b-primary border-b-2"
                  : "text-gray-700"
              }
              to={"/meuspedidos"}
            >
              Meus pedidos
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
