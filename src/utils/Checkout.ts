// src/utils/checkout.ts
const so = (v: string) => v.replace(/\D/g, "");

export const mascaraCpf = (v: string) =>
  so(v)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

export const mascaraCelular = (v: string) =>
  so(v)
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");

export const mascaraCep = (v: string) =>
  so(v)
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");

export const mascaraCartao = (v: string) =>
  so(v)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

export const mascaraValidade = (v: string) =>
  so(v)
    .slice(0, 4)
    .replace(/(\d{2})(?=\d)/, "$1/");

export const mascaraCvv = (v: string) => so(v).slice(0, 4);

export const cpfValido = (cpf: string) => {
  const n = so(cpf);
  if (n.length !== 11 || /^(\d)\1+$/.test(n)) return false;

  const digito = (tamanho: number) => {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(n[i]) * (tamanho + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return digito(9) === Number(n[9]) && digito(10) === Number(n[10]);
};

export const validadeValida = (v: string) => {
  const [mm, aa] = v.split("/").map(Number);
  if (!mm || mm < 1 || mm > 12 || aa === undefined || v.length !== 5)
    return false;
  const hoje = new Date();
  const anoAtual = hoje.getFullYear() % 100;
  return aa > anoAtual || (aa === anoAtual && mm >= hoje.getMonth() + 1);
};

export const apenasDigitos = so;
