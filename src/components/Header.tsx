// src/components/Header.tsx
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { PiList, PiX } from "react-icons/pi";
import Logo from "./Logo";
import MiniCarrinho from "./MiniCart";

const LINKS = [
  { to: "/", rotulo: "Home", end: true },
  { to: "/produtos", rotulo: "Produtos" },
  { to: "/categorias", rotulo: "Categorias" },
  { to: "/meuspedidos", rotulo: "Meus pedidos" },
];

const ROTAS_SO_LOGO = ["/cadastro", "/login"];

const classeLink =
  (mobile: boolean) =>
  ({ isActive }: { isActive: boolean }) =>
    [
      mobile ? "block py-3 text-base" : "",
      isActive
        ? "text-primary font-semibold border-b-primary border-b-2"
        : "text-gray-700",
    ].join(" ");

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const { pathname } = useLocation();

  const fecharMenu = () => setMenuAberto(false);

  const soLogo = ROTAS_SO_LOGO.some((rota) => pathname.startsWith(rota));

  // Trava o scroll e fecha com Esc enquanto o menu está aberto
  useEffect(() => {
    if (!menuAberto) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [menuAberto]);

  if (soLogo) {
    return (
      <header className="bg-white px-4 py-4 lg:px-24">
        <div className="flex justify-center lg:justify-start">
          <Logo />
        </div>
      </header>
    );
  }

  return (
    <header className="flex max-w-full flex-col gap-10 bg-white px-4 py-4 lg:px-24 lg:py-8">
      <section className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-3 lg:flex-nowrap lg:gap-10">
        {/* Hambúrguer (só mobile) */}
        <button
          type="button"
          onClick={() => setMenuAberto(true)}
          aria-label="Abrir menu"
          className="text-gray-700 lg:hidden"
        >
          <PiList size={28} />
        </button>

        {/* Logo: centralizada no mobile */}
        <div className="flex flex-1 justify-center lg:flex-none">
          <Logo />
        </div>

        {/* Busca: linha própria no mobile (abaixo), inline no desktop */}
        <div
          className={`relative order-last w-full lg:order-0 lg:block lg:min-w-80 lg:max-w-200 ${
            buscaAberta ? "block" : "hidden"
          }`}
        >
          <input
            type="text"
            placeholder="Pesquisar Produto..."
            className="peer h-12 w-full rounded-md border-2 border-transparent bg-gray-light py-4 pl-6 pr-14 outline-none focus:border-primary lg:h-16"
          />
          <CiSearch
            size={24}
            className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-primary"
          />
        </div>

        {/* Ações */}
        <div className="flex items-center gap-4 lg:gap-8">
          <button
            type="button"
            onClick={() => setBuscaAberta((a) => !a)}
            aria-label="Pesquisar"
            aria-expanded={buscaAberta}
            className="text-gray-500 lg:hidden"
          >
            <CiSearch size={24} />
          </button>

          <Link to="/cadastro" className="hidden underline lg:block">
            Cadastre-se
          </Link>

          <Link
            to="/login"
            className="hidden h-10 w-28 items-center justify-center rounded-lg bg-primary text-white lg:flex"
          >
            Entrar
          </Link>

          <div className="lg:ml-8">
            <MiniCarrinho />
          </div>
        </div>
      </section>

      {/* Navegação desktop */}
      <nav className="hidden lg:block" aria-label="Principal">
        <ul className="flex flex-row gap-8">
          {LINKS.map(({ to, rotulo, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={classeLink(false)}>
                {rotulo}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Gaveta mobile */}
      {menuAberto && (
        <div
          aria-hidden
          onClick={fecharMenu}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        aria-label="Menu"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col gap-6 overflow-y-auto bg-white p-6 transition-[transform,visibility] duration-300 lg:hidden ${
          menuAberto ? "translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <Logo />
          <button
            type="button"
            onClick={fecharMenu}
            aria-label="Fechar menu"
            className="text-gray-600"
          >
            <PiX size={24} />
          </button>
        </div>

        <nav aria-label="Principal (mobile)">
          <ul className="flex flex-col">
            {LINKS.map(({ to, rotulo, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={fecharMenu}
                  className={classeLink(true)}
                >
                  {rotulo}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <Link
            to="/"
            onClick={fecharMenu}
            className="flex h-11 items-center justify-center rounded-lg bg-primary font-semibold text-white"
          >
            Entrar
          </Link>
          <Link
            to="/cadastro"
            onClick={fecharMenu}
            className="py-2 text-center text-sm underline"
          >
            Cadastre-se
          </Link>
        </div>
      </aside>
    </header>
  );
};

export default Header;
