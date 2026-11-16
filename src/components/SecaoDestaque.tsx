// src/components/SecaoDestaque.tsx
import { useState } from "react";
import MenuDestaque from "./MenuDestaque";
import MenuColecao from "./MenuColecao";
import { DestaqueDados } from "../data/DestaqueDados";
import { ColecaoDados } from "../data/ColecaoDados";

const SecaoDestaque = () => {
  const [colecao, setColecao] = useState<string | null>(null);

  const destaquesFiltrados = colecao
    ? DestaqueDados.filter((d) => d.colecao === colecao)
    : DestaqueDados;

  return (
    <section>
      <MenuDestaque destaques={destaquesFiltrados} />
      <MenuColecao
        colecoes={ColecaoDados}
        selecionada={colecao}
        onSelecionar={setColecao}
      />
    </section>
  );
};

export default SecaoDestaque;
