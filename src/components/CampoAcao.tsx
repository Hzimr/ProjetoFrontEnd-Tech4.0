// src/components/CampoAcao.tsx
import { useState } from "react";

interface Props {
  titulo: string;
  placeholder: string;
  mensagem?: { texto: string; erro?: boolean } | null;
  onConfirmar: (valor: string) => void;
}

const CampoAcao = ({ titulo, placeholder, mensagem, onConfirmar }: Props) => {
  const [valor, setValor] = useState("");

  return (
    <form
      className="flex flex-1 flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onConfirmar(valor);
      }}
    >
      <label htmlFor={titulo} className="text-xs font-bold text-gray-700">
        {titulo}
      </label>
      <div className="flex flex-col gap-3 lg:flex-row lg:gap-2">
        <input
          id={titulo}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder={placeholder}
          className="h-12 min-w-0 flex-1 rounded-md border-2 border-transparent bg-gray-light px-4 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="h-12 rounded-md bg-gray-light px-8 text-sm font-bold text-primary hover:opacity-80 lg:w-24"
        >
          OK
        </button>
      </div>
      {mensagem && (
        <p
          className={`text-xs ${mensagem.erro ? "text-red-500" : "text-green-600"}`}
        >
          {mensagem.texto}
        </p>
      )}
    </form>
  );
};

export default CampoAcao;
