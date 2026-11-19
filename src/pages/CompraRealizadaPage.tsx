// src/pages/CompraRealizadaPage.tsx
import { Link, useLocation } from "react-router-dom";
import { FormatPrice } from "../utils/FormatPrice";

export interface DadosCompraRealizada {
  pessoal: {
    nome: string;
    cpf: string;
    email: string;
    celular: string;
  };
  entrega: {
    endereco: string;
    bairro: string;
    cidade: string;
    cep: string;
  };
  pagamento: {
    titular: string;
    finalCartao: string;
  };
  itens: {
    id?: string | number;
    nome: string;
    imagem: string;
    quantidade?: number;
  }[];
  total: number;
}

// Dados padrão (fallback) caso a página seja acessada diretamente sem state
const DADOS_EXEMPLO: DadosCompraRealizada = {
  pessoal: {
    nome: "Francisco Antonio Pereira",
    cpf: "123485913-35",
    email: "francisco@gmail.com",
    celular: "(85) 5555-5555",
  },
  entrega: {
    endereco: "Rua João Pessoa, 333",
    bairro: "Centro",
    cidade: "Fortaleza, Ceará",
    cep: "433-8800",
  },
  pagamento: {
    titular: "FRANCISCO A P",
    finalCartao: "2020",
  },
  itens: [
    {
      id: 1,
      nome: "Tênis Nike Revolution 6 Next Nature Masculino",
      imagem: "/produc-image-1.jpeg", // ajuste para o caminho da sua imagem padrão
    },
  ],
  total: 219,
};

const CompraRealizadaPage = () => {
  const location = useLocation();
  const pedido: DadosCompraRealizada = location.state?.pedido ?? DADOS_EXEMPLO;

  const handleImprimir = () => {
    window.print();
  };

  return (
    <main className="flex flex-col items-center bg-gray-light-4 px-6 py-10 lg:py-16">
      <div className="flex w-full max-w-190 flex-col gap-6">
        {/* Cartão Principal do Recibo */}
        <section className="rounded-md bg-white p-6 shadow-xs sm:p-10">
          {/* Cabeçalho com Ícone e Título */}
          <div className="flex flex-col items-center border-b border-gray-200 pb-6 text-center">
            <span className="mb-3 text-5xl" role="img" aria-label="Festa">
              🎉
            </span>
            <h1 className="max-w-65 text-2xl font-bold leading-tight text-gray-900 sm:max-w-none sm:text-3xl">
              Compra Realizada com sucesso!
            </h1>
          </div>

          {/* Informações Pessoais */}
          <div className="border-b border-gray-200 py-5">
            <h2 className="mb-3 text-sm font-bold text-gray-700">
              Informações Pessoais
            </h2>
            <dl className="flex flex-col gap-2 text-xs sm:text-sm">
              <div className="flex gap-2">
                <dt className="text-gray-400">Nome:</dt>
                <dd className="font-medium text-gray-800">
                  {pedido.pessoal.nome}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400">CPF:</dt>
                <dd className="font-medium text-gray-800">
                  {pedido.pessoal.cpf}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400">Email:</dt>
                <dd className="font-medium text-gray-800">
                  {pedido.pessoal.email}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400">Celular:</dt>
                <dd className="font-medium text-gray-800">
                  {pedido.pessoal.celular}
                </dd>
              </div>
            </dl>
          </div>

          {/* Informações de Entrega */}
          <div className="border-b border-gray-200 py-5">
            <h2 className="mb-3 text-sm font-bold text-gray-700">
              Informações de Entrega
            </h2>
            <dl className="flex flex-col gap-2 text-xs sm:text-sm">
              <div className="flex gap-2">
                <dt className="text-gray-400">Endereço:</dt>
                <dd className="font-medium text-gray-800">
                  {pedido.entrega.endereco}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400">Bairro:</dt>
                <dd className="font-medium text-gray-800">
                  {pedido.entrega.bairro}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400">Cidade:</dt>
                <dd className="font-medium text-gray-800">
                  {pedido.entrega.cidade}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400">CEP:</dt>
                <dd className="font-medium text-gray-800">
                  {pedido.entrega.cep}
                </dd>
              </div>
            </dl>
          </div>

          {/* Informações de Pagamento */}
          <div className="border-b border-gray-200 py-5">
            <h2 className="mb-3 text-sm font-bold text-gray-700">
              Informações de Pagamento
            </h2>
            <dl className="flex flex-col gap-2 text-xs sm:text-sm">
              <div className="flex gap-2">
                <dt className="text-gray-400">Titular do Cartão:</dt>
                <dd className="font-medium uppercase text-gray-800">
                  {pedido.pagamento.titular}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400">Final:</dt>
                <dd className="font-medium text-gray-800">
                  ************{pedido.pagamento.finalCartao}
                </dd>
              </div>
            </dl>
          </div>

          {/* Resumo da Compra */}
          <div className="pt-5">
            <h2 className="mb-4 text-sm font-bold text-gray-700">
              Resumo da compra
            </h2>

            <ul className="mb-6 flex flex-col gap-4">
              {pedido.itens.map((item, idx) => (
                <li key={item.id ?? idx} className="flex items-center gap-4">
                  <div className="flex h-14 w-16 shrink-0 items-center justify-center rounded bg-[#E2E3FF] p-2">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold leading-snug text-gray-800 sm:text-sm">
                      {item.nome}
                    </span>
                    {item.quantidade && item.quantidade > 1 && (
                      <span className="text-xs text-gray-500">
                        Quantidade: {item.quantidade}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Caixa de Destaque do Total */}
            <div className="flex items-start justify-between rounded-md border border-amber-200/70 bg-[#FFF8EB] p-5">
              <span className="text-lg font-bold text-gray-900 sm:text-xl">
                Total
              </span>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-gray-900 sm:text-xl">
                  {FormatPrice(pedido.total)}
                </span>
                <span className="mt-0.5 text-[11px] text-gray-400">
                  ou 10x de {FormatPrice(pedido.total / 10)} sem juros
                </span>
              </div>
            </div>

            {/* Botão Imprimir Recibo */}
            <div className="mt-6 flex justify-center print:hidden">
              <button
                type="button"
                onClick={handleImprimir}
                className="cursor-pointer text-sm text-gray-600 underline underline-offset-4 transition-colors hover:text-gray-900"
              >
                Imprimir Recibo
              </button>
            </div>
          </div>
        </section>

        {/* Botão Voltar para Home */}
        <Link
          to="/"
          className="flex h-12 w-full items-center justify-center rounded-md bg-amber-400 font-bold text-white transition-colors hover:bg-amber-500 print:hidden"
        >
          Voltar para Home
        </Link>
      </div>
    </main>
  );
};

export default CompraRealizadaPage;
