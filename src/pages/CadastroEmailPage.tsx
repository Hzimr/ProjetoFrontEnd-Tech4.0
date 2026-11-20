// src/pages/CadastroEmailPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import CampoTexto from "../components/CampoTexto";
import imgTenis from "../imgs/sneakers.png";

const CadastroEmailPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState<string>();

  const enviar = (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return setErro("Informe seu e-mail.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErro("E-mail inválido.");

    navigate("/cadastro/dados", { state: { email: email.trim() } });
  };

  return (
    <main className="flex flex-1 items-center bg-linear-to-b from-[#B9BAF2] to-[#E2E3FF] px-4 py-10 lg:px-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        <section className="mx-auto w-full max-w-md rounded-md bg-white p-6 sm:p-8">
          <h1 className="text-center text-2xl font-extrabold tracking-wide text-gray-900 lg:text-left lg:text-3xl">
            Crie sua conta
          </h1>
          <p className="mb-6 mt-2 text-center text-sm text-gray-700 lg:text-left">
            Já possui uma conta? Entre{" "}
            <Link to="/login" className="underline hover:text-primary">
              aqui
            </Link>
            .
          </p>

          <form onSubmit={enviar} noValidate className="flex flex-col gap-5">
            <CampoTexto
              id="email"
              label="Email"
              obrigatorio
              type="email"
              valor={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErro(undefined);
              }}
              erro={erro}
              placeholder="Insira seu email"
              autoComplete="email"
            />

            <button
              type="submit"
              className="h-12 rounded-md bg-primary font-bold text-white transition hover:opacity-90"
            >
              Criar Conta
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

        <img
          src={imgTenis}
          alt=""
          aria-hidden
          className="hidden w-full max-w-xl justify-self-center object-contain lg:block"
        />
      </div>
    </main>
  );
};

export default CadastroEmailPage;
