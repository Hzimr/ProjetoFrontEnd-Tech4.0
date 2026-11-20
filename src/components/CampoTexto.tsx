// src/components/CampoTexto.tsx
import type { ChangeEventHandler, InputHTMLAttributes } from "react";

interface Props extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "value" | "onChange"
> {
  id: string;
  label: string;
  valor: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  erro?: string;
  obrigatorio?: boolean;
}

const CampoTexto = ({
  id,
  label,
  valor,
  onChange,
  erro,
  obrigatorio,
  ...resto
}: Props) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-xs font-bold text-gray-700">
      {label}
      {obrigatorio && " *"}
    </label>
    <input
      id={id}
      name={id}
      value={valor}
      onChange={onChange}
      aria-invalid={!!erro}
      aria-describedby={erro ? `${id}-erro` : undefined}
      className={`h-12 w-full rounded-md border-2 bg-gray-light px-4 text-sm outline-none transition-colors focus:border-primary ${
        erro ? "border-red-400" : "border-transparent"
      }`}
      {...resto}
    />
    {erro && (
      <p id={`${id}-erro`} className="text-xs text-red-500">
        {erro}
      </p>
    )}
  </div>
);

export default CampoTexto;
