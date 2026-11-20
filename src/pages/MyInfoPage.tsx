// src/pages/MyInfoPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import DadoPerfil from "../components/DadoPerfil";
import MenuPerfil from "../components/MenuPerfil";
import { UsuarioDados } from "../data/UsuarioDados";
import {
  apenasDigitos,
  cpfValido,
  mascaraCelular,
  mascaraCep,
  mascaraCpf,
} from "../utils/Checkout";
import type { UsuarioProps } from "../types/UsuarioProps";
import CampoTexto from "../components/CampoTexto";

type Erros = Partial<Record<keyof UsuarioProps, string>>;

const MASCARAS: Partial<Record<keyof UsuarioProps, (v: string) => string>> = {
  cpf: mascaraCpf,
  celular: mascaraCelular,
  cep: mascaraCep,
};

const validar = (d: UsuarioProps): Erros => {
  const e: Erros = {};
  const obrigatorio = "Campo obrigatório.";

  if (d.nome.trim().length < 3) e.nome = "Informe o nome completo.";
  if (!cpfValido(d.cpf)) e.cpf = "CPF inválido.";
  if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "E-mail inválido.";
  if (apenasDigitos(d.celular).length < 10) e.celular = "Celular inválido.";
  if (!d.endereco.trim()) e.endereco = obrigatorio;
  if (!d.bairro.trim()) e.bairro = obrigatorio;
  if (!d.cidade.trim()) e.cidade = obrigatorio;
  if (apenasDigitos(d.cep).length !== 8) e.cep = "CEP inválido.";

  return e;
};

const MyInfoPage = () => {
  const [usuario, setUsuario] = useState<UsuarioProps>(UsuarioDados);
  const [rascunho, setRascunho] = useState<UsuarioProps>(UsuarioDados);
  const [editando, setEditando] = useState(false);
  const [erros, setErros] = useState<Erros>({});

  const iniciarEdicao = () => {
    setRascunho(usuario);
    setErros({});
    setEditando(true);
  };

  const alterar =
    (campo: keyof UsuarioProps) => (e: { target: { value: string } }) => {
      const valor = (MASCARAS[campo] ?? ((v: string) => v))(e.target.value);
      setRascunho((d) => ({ ...d, [campo]: valor }));
      setErros((er) => ({ ...er, [campo]: undefined }));
    };

  const campo = (id: keyof UsuarioProps) => ({
    id,
    valor: rascunho[id],
    onChange: alterar(id),
    erro: erros[id],
  });

  const salvar = (e: FormEvent) => {
    e.preventDefault();

    const encontrados = validar(rascunho);
    setErros(encontrados);

    const primeiro = Object.keys(encontrados)[0];
    if (primeiro) {
      document.getElementById(primeiro)?.focus();
      return;
    }

    // Aqui entraria a chamada à API para salvar
    setUsuario(rascunho);
    setEditando(false);
  };

  return (
    <main className="bg-gray-light px-4 py-8 lg:px-24 lg:py-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
        <MenuPerfil />

        <section className="rounded-md bg-white p-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h1 className="text-xs font-bold text-gray-700">
              Minhas Informações
            </h1>
            {!editando && (
              <button
                type="button"
                onClick={iniciarEdicao}
                className="text-xs text-primary underline hover:opacity-80"
              >
                Editar
              </button>
            )}
          </div>

          {editando ? (
            <form
              onSubmit={salvar}
              noValidate
              className="flex flex-col gap-8 pt-6"
            >
              <fieldset className="flex flex-col gap-5">
                <legend className="mb-4 text-sm font-bold text-gray-700">
                  Informações Pessoais
                </legend>
                <CampoTexto
                  {...campo("nome")}
                  label="Nome Completo"
                  obrigatorio
                  autoComplete="name"
                />
                <CampoTexto
                  {...campo("cpf")}
                  label="CPF"
                  obrigatorio
                  inputMode="numeric"
                />
                <CampoTexto
                  {...campo("email")}
                  label="E-mail"
                  obrigatorio
                  type="email"
                  autoComplete="email"
                />
                <CampoTexto
                  {...campo("celular")}
                  label="Celular"
                  obrigatorio
                  inputMode="tel"
                  autoComplete="tel"
                />
              </fieldset>

              <fieldset className="flex flex-col gap-5">
                <legend className="mb-4 text-sm font-bold text-gray-700">
                  Informações de Entrega
                </legend>
                <CampoTexto
                  {...campo("endereco")}
                  label="Endereço"
                  obrigatorio
                  autoComplete="street-address"
                />
                <CampoTexto {...campo("bairro")} label="Bairro" obrigatorio />
                <CampoTexto
                  {...campo("cidade")}
                  label="Cidade"
                  obrigatorio
                  autoComplete="address-level2"
                />
                <CampoTexto
                  {...campo("cep")}
                  label="CEP"
                  obrigatorio
                  inputMode="numeric"
                  autoComplete="postal-code"
                />
                <CampoTexto {...campo("complemento")} label="Complemento" />
              </fieldset>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditando(false)}
                  className="h-12 rounded-md bg-gray-light px-8 text-sm font-bold text-gray-700 hover:opacity-80"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-12 rounded-md bg-primary px-8 text-sm font-bold text-white hover:opacity-90"
                >
                  Salvar
                </button>
              </div>
            </form>
          ) : (
            <>
              <section className="flex flex-col gap-3 border-b border-gray-200 py-5">
                <h2 className="text-base font-bold text-gray-700">
                  Informações Pessoais
                </h2>
                <DadoPerfil rotulo="Nome:" valor={usuario.nome} />
                <DadoPerfil rotulo="CPF:" valor={usuario.cpf} />
                <DadoPerfil rotulo="Email" valor={usuario.email} />
                <DadoPerfil rotulo="Celular" valor={usuario.celular} />
              </section>

              <section className="flex flex-col gap-3 py-5">
                <h2 className="text-base font-bold text-gray-700">
                  Informações de Entrega
                </h2>
                <DadoPerfil rotulo="Endereço:" valor={usuario.endereco} />
                <DadoPerfil rotulo="Bairro:" valor={usuario.bairro} />
                <DadoPerfil rotulo="Cidade:" valor={usuario.cidade} />
                <DadoPerfil rotulo="CEP:" valor={usuario.cep} />
                {usuario.complemento && (
                  <DadoPerfil
                    rotulo="Complemento:"
                    valor={usuario.complemento}
                  />
                )}
              </section>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default MyInfoPage;
