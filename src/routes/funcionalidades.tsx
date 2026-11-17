import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Code2,
  CreditCard,
  Globe,
  Languages,
  Lock,
  MessageCircle,
  MessagesSquare,
  PhoneCall,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaBand, FeatureCard, PageHero, Section } from "@/components/site/blocks";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/funcionalidades")({
  head: () =>
    seo({
      title: "Funcionalidades",
      description:
        "Editor de asistentes, base de conocimiento, conversaciones, estadísticas, equipos e integraciones: todo lo que incluye CONVERSAAI.",
    }),
  component: Features,
});

const groups = [
  {
    eyebrow: "Crear",
    title: "Un editor pensado para personas, no para programadores",
    items: [
      { icon: SlidersHorizontal, t: "Instrucciones y tono", d: "Define qué hace el asistente, cómo habla y qué debe evitar." },
      { icon: Languages, t: "Idioma", d: "Respuestas en español, inglés, catalán, francés o portugués." },
      { icon: MessagesSquare, t: "Prueba en vivo", d: "Conversa con tu asistente en el propio editor antes de publicarlo." },
    ],
  },
  {
    eyebrow: "Conocimiento",
    title: "Respuestas basadas en tu información",
    items: [
      { icon: BookOpen, t: "Textos propios", d: "Pega preguntas frecuentes, políticas, catálogos o guiones." },
      { icon: Globe, t: "Importar desde URL", d: "Extrae el texto de una página pública de tu web." },
      { icon: Code2, t: "Fragmentos relevantes", d: "Para cada pregunta se envían al modelo solo los fragmentos más útiles, controlando el coste." },
    ],
  },
  {
    eyebrow: "Canales",
    title: "Publica donde están tus clientes",
    items: [
      { icon: Globe, t: "Widget web", d: "Script de instalación y página de chat lista para usar." },
      { icon: MessageCircle, t: "WhatsApp", d: "Configuración y pruebas disponibles; conexión con Meta en desarrollo." },
      { icon: PhoneCall, t: "Teléfono", d: "Configuración y pruebas en texto; conexión con telefonía en desarrollo." },
    ],
  },
  {
    eyebrow: "Gestionar",
    title: "Control para todo el equipo",
    items: [
      { icon: Users, t: "Equipos y roles", d: "Propietario, administrador y miembro, con invitaciones por email." },
      { icon: BarChart3, t: "Estadísticas", d: "Conversaciones y mensajes por día, y consumo frente al límite." },
      { icon: CreditCard, t: "Planes y límites", d: "Uso del mes visible en todo momento en Suscripción." },
      { icon: Lock, t: "Aislamiento de datos", d: "Cada equipo accede únicamente a su propia información." },
    ],
  },
];

function Features() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Funcionalidades"
        title="Todo lo que necesitas para lanzar asistentes de IA"
        lead="Desde el primer borrador hasta el seguimiento diario de conversaciones, en una plataforma clara y sin código."
      />
      {groups.map((g, i) => (
        <Section key={g.eyebrow} eyebrow={g.eyebrow} title={g.title} className={i % 2 ? "border-y border-border/70 bg-surface" : ""}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((it) => (
              <FeatureCard key={it.t} icon={it.icon} title={it.t}>
                {it.d}
              </FeatureCard>
            ))}
          </div>
        </Section>
      ))}
      <CtaBand />
    </SiteLayout>
  );
}
