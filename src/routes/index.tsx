import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Globe,
  Lock,
  MessageCircle,
  PhoneCall,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaBand, FeatureCard, Section } from "@/components/site/blocks";
import { ProductPreview } from "@/components/site/ProductPreview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "CONVERSAAI — Crea asistentes de IA para web, WhatsApp y teléfono",
      description:
        "Plataforma para crear chatbots web, asistentes de WhatsApp y asistentes telefónicos con inteligencia artificial, sin programar.",
    }),
  component: Home,
});

const channels = [
  {
    to: "/chatbots-web" as const,
    icon: Globe,
    title: "Chatbots web",
    text: "Un asistente entrenado con tu información, instalado en tu web con una línea de código.",
    plan: "Desde Free",
  },
  {
    to: "/whatsapp" as const,
    icon: MessageCircle,
    title: "WhatsApp",
    text: "Responde a tus clientes en WhatsApp con el mismo conocimiento y tono de marca.",
    plan: "Desde Pro",
  },
  {
    to: "/asistentes-telefonicos" as const,
    icon: PhoneCall,
    title: "Asistentes telefónicos",
    text: "Llamadas atendidas por voz con IA: información, filtrado y toma de datos.",
    plan: "Desde Business",
  },
];

const steps = [
  { n: "01", t: "Describe tu asistente", d: "Elige canal, tono e instrucciones. Sin código ni diagramas." },
  { n: "02", t: "Dale conocimiento", d: "Pega textos o importa páginas de tu web: precios, horarios, políticas." },
  { n: "03", t: "Pruébalo y publícalo", d: "Conversa con él en el editor y publícalo en tu web cuando esté listo." },
];

function Home() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border/70">
        <div className="container-page grid items-center gap-14 pb-20 pt-16 md:pt-24 lg:grid-cols-[1fr_1.1fr]">
          <div className="animate-fade-up">
            <Badge variant="outline" className="bg-surface py-1 pl-1.5 pr-3">
              <span className="rounded-full bg-primary px-1.5 py-px text-[10px] font-semibold text-primary-foreground">
                NUEVO
              </span>
              Web, WhatsApp y voz en una sola plataforma
            </Badge>
            <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.04] md:text-[4rem]">
              Asistentes de IA que hablan como tu negocio.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              CONVERSAAI te permite crear chatbots web, asistentes de WhatsApp y asistentes telefónicos entrenados con tu
              información. Sin programar, con control total del tono y de los costes.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="ink">
                <Link to="/auth" search={{ mode: "signup" }}>
                  Crear asistente gratis <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/funcionalidades">Ver cómo funciona</Link>
              </Button>
            </div>
            <p className="mt-5 text-[13px] text-muted-foreground">Plan Free sin tarjeta · 100 mensajes de IA al mes</p>
          </div>
          <div className="animate-fade-up [animation-delay:120ms]">
            <ProductPreview />
          </div>
        </div>
      </section>

      <Section
        eyebrow="Canales"
        title="Un mismo cerebro, tres formas de atender"
        lead="Configura el conocimiento una vez y reutilízalo en cada canal. Cada plan desbloquea nuevos canales."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {channels.map((c) => (
            <Link key={c.to} to={c.to} className="surface-card interactive-lift group flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-lg bg-ink text-primary">
                  <c.icon className="size-5" />
                </span>
                <Badge variant="secondary">{c.plan}</Badge>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">{c.text}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary-strong">
                Saber más <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <section className="border-y border-border/70 bg-surface py-16 md:py-24">
        <div className="container-page">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow">Cómo funciona</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">De la idea a un asistente en producción</h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="bg-surface p-7">
                <span className="font-mono text-sm text-primary-strong">{s.n}</span>
                <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section
        eyebrow="Plataforma"
        title="Pensada para equipos que atienden a clientes"
        lead="Todo lo necesario para crear, medir y mejorar tus asistentes, con límites claros en cada plan."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={BookOpen} title="Base de conocimiento">
            Textos y páginas web que el asistente consulta para responder con datos reales de tu negocio.
          </FeatureCard>
          <FeatureCard icon={SlidersHorizontal} title="Control del comportamiento">
            Instrucciones, tono, idioma y mensaje alternativo cuando no conoce la respuesta.
          </FeatureCard>
          <FeatureCard icon={MessageCircle} title="Historial de conversaciones">
            Lee cada conversación para detectar dudas frecuentes y mejorar el conocimiento.
          </FeatureCard>
          <FeatureCard icon={BarChart3} title="Estadísticas">
            Conversaciones, mensajes y consumo mensual de IA frente al límite de tu plan.
          </FeatureCard>
          <FeatureCard icon={Users} title="Trabajo en equipo">
            Invita a tu equipo con roles de propietario, administrador o miembro.
          </FeatureCard>
          <FeatureCard icon={Lock} title="Datos aislados por equipo">
            Cada espacio de trabajo solo ve sus asistentes, su conocimiento y sus conversaciones.
          </FeatureCard>
        </div>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}
