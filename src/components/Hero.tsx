// src/components/Hero.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { HeroSlide } from "../types/HeroSlideProps";

interface HeroProps {
  slides: HeroSlide[];
  intervalo?: number; // em ms
}

const Hero = ({ slides, intervalo = 5000 }: HeroProps) => {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || slides.length <= 1) return;

    const timer = setInterval(() => {
      setAtual((i) => (i + 1) % slides.length);
    }, intervalo);

    return () => clearInterval(timer);
  }, [pausado, slides.length, intervalo]);

  if (slides.length === 0) return null;

  return (
    <section
      className="relative bg-gray-light overflow-hidden"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carousel"
    >
      {/* Padrão de bolinhas decorativo */}
      <div
        aria-hidden
        className="absolute right-16 top-10 h-32 w-48 opacity-60
                   bg-[radial-gradient(#fbbf24_2px,transparent_2px)] bg-size-[16px_16px]"
      />

      {/* Todos os slides empilhados na mesma célula do grid */}
      <div className="grid">
        {slides.map((slide, i) => {
          const ativo = i === atual;

          return (
            <article
              key={slide.id}
              aria-hidden={!ativo}
              className={`col-start-1 row-start-1 flex items-center justify-between gap-10
                          px-24 py-16 transition-opacity duration-700
                          ${ativo ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <div className="flex max-w-md flex-col gap-6">
                <span className="text-sm font-bold text-amber-500">
                  {slide.tag}
                </span>

                <h2 className="text-5xl font-extrabold leading-tight text-gray-900">
                  {slide.titulo}
                </h2>

                <p className="text-gray-600">{slide.descricao}</p>

                <Link
                  to={slide.link}
                  tabIndex={ativo ? 0 : -1}
                  className="flex h-12 w-40 items-center justify-center rounded-md
                             bg-primary font-semibold text-white
                             transition hover:brightness-110"
                >
                  {slide.textoBotao}
                </Link>
              </div>

              <img
                src={slide.img}
                alt={slide.alt}
                className="w-full max-w-xl object-contain"
              />
            </article>
          );
        })}
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setAtual(i)}
            aria-label={`Ir para o slide ${i + 1}`}
            aria-current={i === atual}
            className={`h-2.5 w-2.5 rounded-full transition-colors
                        ${i === atual ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
