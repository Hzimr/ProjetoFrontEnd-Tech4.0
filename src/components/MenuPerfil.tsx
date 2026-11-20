// src/components/MenuPerfil.tsx
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/meuspedidos", rotulo: "Meus Pedidos" },
  { to: "/minhas-informacoes", rotulo: "Minhas Informações" },
  { to: "/metodos-pagamento", rotulo: "Métodos de Pagamento" },
];

const MenuPerfil = () => (
  <aside className="hidden h-fit rounded-md bg-white p-6 lg:block">
    <h2 className="border-b border-gray-200 pb-3 text-xs font-bold text-gray-700">
      Meu Perfil
    </h2>

    <nav aria-label="Perfil">
      <ul className="divide-y divide-gray-200">
        {LINKS.map(({ to, rotulo }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `block py-3 text-xs ${
                  isActive
                    ? "font-bold text-primary"
                    : "text-gray-700 hover:text-primary"
                }`
              }
            >
              {rotulo}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default MenuPerfil;
