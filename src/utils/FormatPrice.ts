export function FormatPrice(valor: number) {
  const formattedValue = valor;
  return formattedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
