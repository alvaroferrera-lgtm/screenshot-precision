import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Globe, Menu, MessageCircle, PhoneCall, X, LayoutGrid } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";


const productLinks = [
  { to: "/funcionalidades", label: "Funcionalidades", desc: "Todo lo que incluye la plataforma", icon: LayoutGrid },
  { to: "/chatbots-web", label: "Chatbots web", desc: "Un asistente en tu web en minutos", icon: Globe },
  { to: "/whatsapp", label: "WhatsApp", desc: "Atiende donde ya están tus clientes", icon: MessageCircle },
  { to: "/asistentes-telefonicos", label: "Asistentes telefónicos", desc: "Llamadas atendidas por IA", icon: PhoneCall },
] as const;

const mainLinks = [
  { to: "/precios", label: "Precios" },
  { to: "/docs", label: "Documentación" },
  { to: "/blog", label: "Blog" },
] as const;

export function SiteHeader() {
  const { session, ready } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="shrink-0" aria-label="CONVERSAAI, inicio">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          <div className="group relative">
            <button className="inline-flex h-9 items-center gap-1 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:text-foreground group-focus-within:text-foreground">
              Producto <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="surface-card w-[22rem] p-2 shadow-lift">
                {productLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-secondary"
                  >
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md border bg-surface text-primary-strong">
                      <l.icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-foreground">{l.label}</span>
                      <span className="block text-[13px] text-muted-foreground">{l.desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {mainLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="inline-flex h-9 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {ready && session ? (
            <Button asChild variant="ink" size="sm">
              <Link to="/app">Ir al panel</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth" search={{ mode: "login" }}>Iniciar sesión</Link>
              </Button>
              <Button asChild variant="ink" size="sm">
                <Link to="/auth" search={{ mode: "signup" }}>Empezar gratis</Link>
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <div className={cn("border-t bg-background md:hidden", open ? "block" : "hidden")}>
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Móvil">
          {[...productLinks, ...mainLinks].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[15px] text-foreground hover:bg-secondary"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {ready && session ? (
              <Button asChild variant="ink" className="col-span-2">
                <Link to="/app">Ir al panel</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/auth" search={{ mode: "login" }}>Iniciar sesión</Link>
                </Button>
                <Button asChild variant="ink">
                  <Link to="/auth" search={{ mode: "signup" }}>Empezar gratis</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
