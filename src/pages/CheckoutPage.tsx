// src/pages/CheckoutPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import CampoTexto from "../components/CampoTexto";
import ResumoCheckout from "../components/ResumoCheckout";
import SecaoCheckout from "../components/SecaoCheckout";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { FormatPrice } from "../utils/FormatPrice";
import {
  apenasDigitos,
  cpfValido,
  mascaraCartao,
  mascaraCelular,
  mascaraCep,
  mascaraCpf,
  mascaraCvv,
  mascaraValidade,
  validadeValida,
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
  pagamento: "cartao" | "boleto";
  nomeCartao: string;
  numeroCartao: string;
  validade: string;
  cvv: string;
}

type Erros = Partial<Record<keyof Dados, string>>;

const INICIAL: Dados = {
  nome: "",
  cpf: "",
  email: "",
  celular: "",
  endereco: "",
  bairro: "",
  cidade: "",
  cep: "",
  complemento: "",
  pagamento: "cartao",
  nomeCartao: "",
  numeroCartao: "",
  validade: "",
  cvv: "",
};

const MASCARAS: Partial<Record<keyof Dados, (v: string) => string>> = {
  cpf: mascaraCpf,
  celular: mascaraCelular,
  cep: mascaraCep,
  numeroCartao: mascaraCartao,
  validade: mascaraValidade,
  cvv: mascaraCvv,
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

  if (d.pagamento === "cartao") {
    if (!d.nomeCartao.trim()) e.nomeCartao = obrigatorio;
    if (apenasDigitos(d.numeroCartao).length < 13)
      e.numeroCartao = "Número inválido.";
    if (!validadeValida(d.validade)) e.validade = "Validade inválida.";
    if (apenasDigitos(d.cvv).length < 3) e.cvv = "CVV inválido.";
  }

  return e;
};

const CheckoutPage = () => {
  const { itens, esvaziar } = useCarrinho();
  const location = useLocation();
  const [dados, setDados] = useState<Dados>(INICIAL);
  const [erros, setErros] = useState<Erros>({});
  const [concluido, setConcluido] = useState(false);

  // Frete e desconto vêm da página do carrinho (via state do Link)
  const extras = (location.state ?? {}) as {
    frete?: number;
    desconto?: number;
  };
  const frete = extras.frete ?? 0;
  const desconto = extras.desconto ?? 0;

  const subtotal = itens.reduce((s, i) => s + i.preco * i.quantidade, 0);
  const total = subtotal - desconto + frete;

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

    // Aqui entraria a chamada ao gateway de pagamento
    setConcluido(true);
    esvaziar();
  };

  if (concluido) {
    return (
      <main className="flex flex-col items-center gap-4 px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Pedido realizado! 🎉
        </h1>
        <p className="text-gray-600">
          {dados.pagamento === "boleto"
            ? "Enviamos o boleto para o seu e-mail."
            : "Seu pagamento foi aprovado."}
        </p>
        <Link
          to="/produtos"
          className="rounded-md bg-primary px-6 py-3 font-semibold text-white"
        >
          Continuar comprando
        </Link>
      </main>
    );
  }

  if (itens.length === 0) {
    return (
      <main className="flex flex-col items-center gap-4 px-6 py-24">
        <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
        <Link
          to="/produtos"
          className="rounded-md bg-primary px-6 py-3 font-semibold text-white"
        >
          Ver produtos
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-6 px-4 py-6 lg:px-24 lg:py-8">
      <h1 className="text-2xl font-bold text-gray-900">Finalizar Compra</h1>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <form
          id="checkout-form"
          onSubmit={enviar}
          noValidate
          className="flex flex-col gap-6"
        >
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

          <SecaoCheckout titulo="Informações de Pagamento">
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-1 text-xs font-bold text-gray-700">
                Forma de Pagamento
              </legend>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {(
                  [
                    ["cartao", "Cartão de Crédito"],
                    ["boleto", "Boleto Bancário"],
                  ] as const
                ).map(([valor, rotulo]) => (
                  <label
                    key={valor}
                    className="flex cursor-pointer items-center gap-2 text-xs text-gray-700"
                  >
                    <input
                      type="radio"
                      name="pagamento"
                      checked={dados.pagamento === valor}
                      onChange={() =>
                        setDados((d) => ({ ...d, pagamento: valor }))
                      }
                      className="h-4 w-4 cursor-pointer accent-primary"
                    />
                    {rotulo}
                  </label>
                ))}
              </div>
            </fieldset>

            {dados.pagamento === "cartao" ? (
              <>
                <CampoTexto
                  {...campo("nomeCartao")}
                  label="Nome do Cartão"
                  obrigatorio
                  placeholder="Insira o nome do cartão"
                  autoComplete="cc-name"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <CampoTexto
                    {...campo("numeroCartao")}
                    label="Número do Cartão"
                    obrigatorio
                    placeholder="Insira número do Cartão"
                    inputMode="numeric"
                    autoComplete="cc-number"
                  />
                  <CampoTexto
                    {...campo("validade")}
                    label="Data de validade do Cartão"
                    obrigatorio
                    placeholder="MM/AA"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                  />
                </div>

                <div className="sm:w-1/2 sm:pr-2.5">
                  <CampoTexto
                    {...campo("cvv")}
                    label="CVV"
                    obrigatorio
                    placeholder="CVV *"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                  />
                </div>
              </>
            ) : (
              <p className="rounded-md bg-gray-light p-4 text-sm text-gray-600">
                O boleto será gerado ao finalizar e enviado para o seu e-mail. O
                prazo de compensação é de até 3 dias úteis.
              </p>
            )}
          </SecaoCheckout>

          {/* Cartão final (só mobile): no desktop o resumo lateral assume */}
          <section className="rounded-md bg-white p-6 lg:hidden">
            <h2 className="mb-4 border-b border-gray-200 pb-3 text-xs font-bold text-gray-700">
              Finalizar Compra
            </h2>
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-primary">
                {FormatPrice(total)}
              </span>
            </div>
            <p className="mb-4 mt-1 text-right text-xs text-gray-500">
              ou 10x de {FormatPrice(total / 10)} sem juros
            </p>
            <button
              type="submit"
              className="h-11 w-full rounded-md bg-amber-400 text-sm font-bold text-white hover:brightness-105"
            >
              Realizar Pagamento
            </button>
          </section>
        </form>

        <ResumoCheckout
          itens={itens}
          subtotal={subtotal}
          frete={frete}
          desconto={desconto}
          total={total}
        />
      </div>
    </main>
  );
};

export default CheckoutPage;
