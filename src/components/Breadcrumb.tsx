// src/components/Breadcrumb.tsx
import { Link } from "react-router-dom";

export interface Migalha {
  rotulo: string;
  to?: string; // o último item não precisa de link
}

const Breadcrumb = ({ itens }: { itens: Migalha[] }) => (
  <nav aria-label="Você está aqui">
    <ol className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
      {itens.map((item, i) => {
        const ultimo = i === itens.length - 1;

        return (
          <li key={item.rotulo} className="flex items-center gap-2">
            {item.to && !ultimo ? (
              <Link to={item.to} className="hover:text-primary hover:underline">
                {item.rotulo}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-gray-900">
                {item.rotulo}
              </span>
            )}
            {!ultimo && <span aria-hidden>/</span>}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumb;
