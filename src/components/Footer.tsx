import type { SVGProps } from "react";

type SocialIconProps = SVGProps<SVGSVGElement>;

function TerminalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 28"
      className="h-7 w-7 shrink-0"
      fill="none"
    >
      <rect x="1" y="1" width="26" height="26" rx="5" fill="currentColor" />
      <path
        d="m7 9 5 5-5 5m8 0h6"
        stroke="#1f1f1f"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" />
    </svg>
  );
}

function InstagramIcon(props: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.8" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 5.9a8 8 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.7 1 4.2 4.2 0 0 0-7.2 3.8 11.9 11.9 0 0 1-8.6-4.4 4.2 4.2 0 0 0 1.3 5.6 4.1 4.1 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2.5 19a11.8 11.8 0 0 0 6.4 1.9c7.7 0 11.9-6.4 11.9-11.9v-.5A8.5 8.5 0 0 0 22 5.9Z" />
    </svg>
  );
}

const informationLinks = [
  { label: "Sobre a Digital Store", href: "#sobre" },
  { label: "Segurança", href: "#seguranca" },
  { label: "Wishlist", href: "#wishlist" },
  { label: "Blog", href: "#blog" },
  { label: "Trabalhe conosco", href: "#trabalhe-conosco" },
  { label: "Meus pedidos", href: "#pedidos" },
];

const categoryLinks = [
  { label: "Camisetas", href: "#camisetas" },
  { label: "Calças", href: "#calcas" },
  { label: "Bonés", href: "#bones" },
  { label: "Headphones", href: "#headphones" },
  { label: "Tênis", href: "#tenis" },
];

const linkClass =
  "text-sm text-white/90 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-dark text-white">
      <div className="mx-auto max-w-300 px-6 pb-5 pt-14 sm:px-10 lg:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_0.8fr_0.8fr_1fr] lg:gap-12">
          {/* Apresentação da loja */}
          <div className="max-w-75">
            <a
              href="/"
              aria-label="Digital Store - página inicial"
              className="mb-7 inline-flex items-center gap-2 text-[27px] font-bold tracking-tight text-white"
            >
              <TerminalIcon />
              <span>Digital Store</span>
            </a>

            <p className="mb-7 text-sm leading-[1.55rem] text-white/90">
              Encontre os produtos que combinam com você. Qualidade, estilo e
              tecnologia em um só lugar.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-white transition-opacity hover:opacity-70"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-white transition-opacity hover:opacity-70"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="text-white transition-opacity hover:opacity-70"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links institucionais */}
          <nav aria-label="Informações">
            <h2 className="mb-7 text-base font-semibold">Informação</h2>
            <ul className="space-y-3">
              {informationLinks.map((link) => (
                <li key={link.label}>
                  <a className={linkClass} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categorias */}
          <nav aria-label="Categorias">
            <h2 className="mb-7 text-base font-semibold">Categorias</h2>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <a className={linkClass} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <address className="not-italic">
            <h2 className="mb-7 text-base font-semibold">Contato</h2>
            <p className="max-w-57.5 text-sm leading-[1.55rem] text-white/90">
              Av. Santos Dumont, 1510 - 1º andar - Aldeota, Fortaleza - CE,
              60150-161
            </p>
            <a
              href="tel:+558530513411"
              className={`${linkClass} mt-3 inline-block`}
            >
              (85) 3051-3411
            </a>
          </address>
        </div>

        <div className="mt-9 border-t border-white/30 pt-5 text-center">
          <p className="text-xs text-white/90">
            © {new Date().getFullYear()} Digital Store. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
