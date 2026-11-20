// src/pages/CadastroPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CampoTexto from "../components/CampoTexto";
import SecaoCheckout from "../components/SecaoCheckout";
import {
  apenasDigitos,
  cpfValido,
  mascaraCelular,
  mascaraCep,
  mascaraCpf,
} from "../utils/Checkout";

interface Dados {
  nome: string;
  cpf: string;
  email: string;
  celular: string;
  endereco: string;
  bairro: string;
  cidade: string;
  cep: string;
  complemento: string;
}

type Erros = Partial<Record<keyof Dados, string>>;

const MASCARAS: Partial<Record<keyof Dados, (v: string) => string>> = {
  cpf: mascaraCpf,
  celular: mascaraCelular,
  cep: mascaraCep,
};

const validar = (d: Dados): Erros => {
  const e: Erros = {};
  const obrigatorio = "Campo obrigatório.";

  if (d.nome.trim().length < 3) e.nome = "Informe o nome completo.";
  if (!d.cpf) e.cpf = obrigatorio;
  else if (!cpfValido(d.cpf)) e.cpf = "CPF inválido.";
  if (!d.email) e.email = obrigatorio;
  else if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "E-mail inválido.";
  if (apenasDigitos(d.celular).length < 10) e.celular = "Celular inválido.";
  if (!d.endereco.trim()) e.endereco = obrigatorio;
  if (!d.bairro.trim()) e.bairro = obrigatorio;
  if (!d.cidade.trim()) e.cidade = obrigatorio;
  if (apenasDigitos(d.cep).length !== 8) e.cep = "CEP inválido.";

  return e;
};

const CadastroPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const emailInicial = (state as { email?: string } | null)?.email;

  const [dados, setDados] = useState<Dados>({
    nome: "",
    cpf: "",
    email: emailInicial ?? "",
    celular: "",
    endereco: "",
    bairro: "",
    cidade: "",
    cep: "",
    complemento: "",
  });
  const [erros, setErros] = useState<Erros>({});
  const [novidades, setNovidades] = useState(true);

  // Acesso direto à URL, sem ter passado pela etapa do e-mail
  if (!emailInicial) return <Navigate to="/cadastro" replace />;

  const alterar =
    (campo: keyof Dados) => (e: { target: { value: string } }) => {
      const valor = (MASCARAS[campo] ?? ((v: string) => v))(e.target.value);
      setDados((d) => ({ ...d, [campo]: valor }));
      setErros((er) => ({ ...er, [campo]: undefined }));
    };

  const campo = (id: keyof Dados) => ({
    id,
    valor: dados[id],
    onChange: alterar(id),
    erro: erros[id],
  });

  const enviar = (e: FormEvent) => {
    e.preventDefault();

    const encontrados = validar(dados);
    setErros(encontrados);

    const primeiro = Object.keys(encontrados)[0];
    if (primeiro) {
      document.getElementById(primeiro)?.focus();
      return;
    }

    // Aqui entraria a chamada à API de cadastro (enviando `novidades` também)
    navigate("/login", { replace: true });
  };

  return (
    <main className="flex-1 bg-gray-light px-4 py-8">
      <form
        onSubmit={enviar}
        noValidate
        className="mx-auto flex w-full max-w-xl flex-col gap-6"
      >
        <h1 className="text-center text-2xl font-bold tracking-wide text-gray-900 lg:text-left">
          Criar Conta
        </h1>

        <SecaoCheckout titulo="Informações Pessoais">
          <CampoTexto
            {...campo("nome")}
            label="Nome Completo"
            obrigatorio
            placeholder="Insira seu nome"
            autoComplete="name"
          />
          <CampoTexto
            {...campo("cpf")}
            label="CPF"
            obrigatorio
            placeholder="Insira seu CPF"
            inputMode="numeric"
          />
          <CampoTexto
            {...campo("email")}
            label="E-mail"
            obrigatorio
            type="email"
            placeholder="Insira seu email"
            autoComplete="email"
          />
          <CampoTexto
            {...campo("celular")}
            label="Celular"
            obrigatorio
            placeholder="Insira seu celular"
            inputMode="tel"
            autoComplete="tel"
          />
        </SecaoCheckout>

        <SecaoCheckout titulo="Informações de Entrega">
          <CampoTexto
            {...campo("endereco")}
            label="Endereço"
            obrigatorio
            placeholder="Insira seu endereço"
            autoComplete="street-address"
          />
          <CampoTexto
            {...campo("bairro")}
            label="Bairro"
            obrigatorio
            placeholder="Insira seu bairro"
          />
          <CampoTexto
            {...campo("cidade")}
            label="Cidade"
            obrigatorio
            placeholder="Insira sua cidade"
            autoComplete="address-level2"
          />
          <CampoTexto
            {...campo("cep")}
            label="CEP"
            obrigatorio
            placeholder="Insira seu CEP"
            inputMode="numeric"
            autoComplete="postal-code"
          />
          <CampoTexto
            {...campo("complemento")}
            label="Complemento"
            placeholder="Insira complemento"
          />
        </SecaoCheckout>

        <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-700">
          <input
            type="checkbox"
            checked={novidades}
            onChange={(e) => setNovidades(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
          />
          Quero receber por email ofertas e novidades das lojas da Digital
          Store. A frequência de envios pode variar de acordo com a interação do
          cliente.
        </label>

        <button
          type="submit"
          className="h-12 rounded-md bg-primary font-bold text-white transition hover:opacity-90"
        >
          Criar Conta
        </button>
      </form>
    </main>
  );
};

export default CadastroPage;
