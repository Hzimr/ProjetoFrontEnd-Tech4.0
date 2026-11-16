import React from 'react';

export interface OfertaEspecialProps {
  /** Texto pequeno exibido acima do título principal */
  etiqueta?: string;
  /** Título em destaque da oferta */
  titulo?: string;
  /** Parágrafo descritivo do produto */
  descricao?: string;
  /** Rótulo do botão de chamada para ação */
  textoBotao?: string;
  /** URL de destino ao clicar no botão */
  linkOferta?: string;
  /** Caminho ou importação da imagem PNG com fundo transparente do tênis */
  imagemUrl?: string;
  /** Texto alternativo descritivo para leitores de tela */
  imagemAlt?: string;
  /** Callback opcional caso prefira navegação programática (ex: useNavigate) */
  onVerOferta?: () => void;
}

export const OfertaEspecial: React.FC<OfertaEspecialProps> = ({
  etiqueta = 'Oferta especial',
  titulo = 'Air Jordan edição de colecionador',
  descricao = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  textoBotao = 'Ver Oferta',
  linkOferta = '/produtos/air-jordan-edicao-colecionador',
  imagemUrl = 'https://res.cloudinary.com/dow7jprz4/image/upload/v1794774918/Gemini_Generated_Image_pz9q3pz9q3pz9q3p-removebg-preview_vxsyzl.png',
  imagemAlt = 'Par de tênis Air Jordan edição de colecionador nas cores creme, preto e amarelo',
  onVerOferta,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onVerOferta) {
      event.preventDefault();
      onVerOferta();
    }
  };

  return (
    <section
      aria-labelledby="titulo-oferta-especial"
      className="w-full bg-white py-14 md:py-24 overflow-hidden"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-12 px-6 md:flex-row md:gap-16 lg:px-10">
        {/* Coluna Esquerda: Círculo com gradiente lavanda + Imagem do Tênis */}
        <div className="relative flex w-full max-w-[466px] items-center justify-center md:w-1/2">
          {/* Círculo de fundo com gradiente que desaparece na base */}
          <div
            aria-hidden="true"
            className="h-[320px] w-[320px] rounded-full sm:h-[400px] sm:w-[400px] lg:h-[466px] lg:w-[466px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(66, 0, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%)',
            }}
          />

          {/* Imagem do produto sobreposta e levemente expandida */}
          <img
            src={imagemUrl}
            alt={imagemAlt}
            loading="lazy"
            className="pointer-events-none absolute z-10 w-[112%] max-w-[540px] object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out hover:scale-[1.02]"
          />
        </div>

        {/* Coluna Direita: Textos e Botão CTA */}
        <div className="flex w-full flex-col items-start text-left md:w-1/2 md:max-w-[540px]">
          <span className="mb-3 text-sm font-bold tracking-[0.75px] text-[#C92071]">
            {etiqueta}
          </span>

          <h2
            id="titulo-oferta-especial"
            className="mb-5 text-3xl font-bold leading-[1.15] tracking-[1px] text-[#474747] sm:text-4xl lg:text-[48px]"
          >
            {titulo}
          </h2>

          <p className="mb-8 text-sm font-normal leading-[1.75] tracking-[0.25px] text-[#474747] sm:text-base">
            {descricao}
          </p>

          <a
            href={linkOferta}
            onClick={handleClick}
            className="inline-flex h-[48px] min-w-[200px] items-center justify-center rounded-[8px] bg-[#C92071] px-8 text-sm font-bold tracking-[0.75px] text-white transition-colors duration-200 hover:bg-[#991956] focus:outline-none focus:ring-2 focus:ring-[#C92071] focus:ring-offset-2"
          >
            {textoBotao}
          </a>
        </div>
      </div>
    </section>
  );
};

export default OfertaEspecial;