const DadoPerfil = ({ rotulo, valor }: { rotulo: string; valor: string }) => (
  <p className="text-xs">
    <span className="text-gray-500">{rotulo}</span>{" "}
    <span className="font-medium text-gray-900">{valor || "-"}</span>
  </p>
);

export default DadoPerfil;
