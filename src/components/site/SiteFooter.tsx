import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

const cols = [
  {
    title: "Producto",
    links: [
      { to: "/funcionalidades", label: "Funcionalidades" },
      { to: "/chatbots-web", label: "Chatbots web" },
      { to: "/whatsapp", label: "WhatsApp" },
      { to: "/asistentes-telefonicos", label: "Asistentes telefónicos" },
    ],
  },
  {
    title: "Planes",
    links: [
      { to: "/precios", label: "Precios" },
      { to: "/comparativa", label: "Comparativa de planes" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { to: "/docs", label: "Documentación" },
      { to: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { to: "/sobre-nosotros", label: "Sobre nosotros" },
      { to: "/contacto", label: "Contacto" },
    ],
  },
] as const;

const legal = [
  { slug: "aviso-legal", label: "Aviso legal" },
  { slug: "privacidad", label: "Privacidad" },
  { slug: "cookies", label: "Cookies" },
  { slug: "terminos", label: "Términos" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="max-w-xs">
          <Logo inverted />
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Asistentes de inteligencia artificial para web, WhatsApp y teléfono. Sin programar.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-ink-foreground/85 transition-colors hover:text-ink-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink-border">
        <div className="container-page flex flex-col gap-4 py-6 text-[13px] text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} CONVERSAAI. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((l) => (
              <li key={l.slug}>
                <Link to="/legal/$slug" params={{ slug: l.slug }} className="hover:text-ink-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
