// src/components/SecaoCheckout.tsx
import type { ReactNode } from "react";

const SecaoCheckout = ({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) => (
  <section className="rounded-md bg-white p-6">
    <h2 className="mb-6 border-b border-gray-200 pb-3 text-xs font-bold text-gray-700">
      {titulo}
    </h2>
    <div className="flex flex-col gap-5">{children}</div>
  </section>
);

export default SecaoCheckout;
