// src/pages/LoginPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import CampoTexto from "../components/CampoTexto";
import Logo from "../components/Logo";
import imgTenis from "../imgs/login-tenis.png";

type Erros = { login?: string; senha?: string; geral?: string };

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState<Erros>({});

  const enviar = (e: FormEvent) => {
    e.preventDefault();

    const novos: Erros = {};
    if (!login.trim()) novos.login = "Informe seu login ou e-mail.";
    if (!senha) novos.senha = "Informe sua senha.";

    setErros(novos);
    if (Object.keys(novos).length > 0) return;

    // Aqui entraria a chamada à API de autenticação
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white px-4 py-4 lg:px-24">
        <div className="flex justify-center lg:justify-start">
          <Logo />
        </div>
      </header>

      <main className="flex flex-1 items-center bg-linear-to-b from-[#B9BAF2] to-[#E2E3FF] px-4 py-10 lg:px-24">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
          <section className="mx-auto w-full max-w-md rounded-md bg-white p-6 sm:p-8">
            <h1 className="text-center text-2xl font-extrabold tracking-wide text-gray-900 lg:text-left lg:text-3xl">
              Acesse sua conta
            </h1>
            <p className="mb-6 mt-2 text-center text-sm text-gray-700 lg:text-left">
              Novo cliente? Então registre-se{" "}
              <Link to="/cadastro" className="underline hover:text-primary">
                aqui
              </Link>
              .
            </p>

            <form onSubmit={enviar} noValidate className="flex flex-col gap-5">
              <CampoTexto
                id="login"
                label="Login"
                obrigatorio
                valor={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                  setErros((er) => ({ ...er, login: undefined }));
                }}
                erro={erros.login}
                placeholder="Insira seu login ou email"
                autoComplete="username"
              />

              <CampoTexto
                id="senha"
                label="Senha"
                obrigatorio
                type="password"
                valor={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setErros((er) => ({ ...er, senha: undefined }));
                }}
                erro={erros.senha}
                placeholder="Insira sua senha"
                autoComplete="current-password"
              />

              <Link
                to="/recuperar-senha"
                className="w-fit text-xs text-gray-700 underline hover:text-primary"
              >
                Esqueci minha senha
              </Link>

              <button
                type="submit"
                className="h-12 rounded-md bg-primary font-bold text-white transition hover:opacity-90"
              >
                Acessar Conta
              </button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-3 text-sm text-gray-600 sm:flex-row sm:justify-center">
              <span>Ou faça login com</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Entrar com Gmail"
                  className="hover:opacity-80"
                >
                  <SiGmail size={20} className="text-[#EA4335]" />
                </button>
                <button
                  type="button"
                  aria-label="Entrar com Facebook"
                  className="hover:opacity-80"
                >
                  <FaFacebook size={20} className="text-[#1877F2]" />
                </button>
              </div>
            </div>
          </section>

          {/* Imagem decorativa (só desktop) */}
          <img
            src={imgTenis}
            alt=""
            aria-hidden
            className="hidden w-full max-w-xl justify-self-center object-contain lg:block"
          />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
