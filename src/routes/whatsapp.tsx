import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Clock, MessageCircle, Repeat, Smartphone, Users } from "lucide-react";
import { ChannelPage, StatusNote } from "@/components/site/ChannelPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/whatsapp")({
  head: () =>
    seo({
      title: "Asistentes de WhatsApp con IA",
      description:
        "Asistentes de inteligencia artificial para WhatsApp Business que responden a tus clientes con tu información y tu tono.",
    }),
  component: WhatsAppPage,
});

function Bubble({ me, children }: { me?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={
        me
          ? "ml-auto max-w-[78%] rounded-2xl rounded-tr-md bg-primary-soft px-3.5 py-2.5 text-[13.5px]"
          : "max-w-[82%] rounded-2xl rounded-tl-md bg-surface px-3.5 py-2.5 text-[13.5px] shadow-xs"
      }
    >
      {children}
    </div>
  );
}

function WhatsAppPage() {
  return (
    <ChannelPage
      eyebrow="WhatsApp"
      title="Atiende en WhatsApp sin estar pendiente del móvil"
      lead="Reutiliza el conocimiento de tus asistentes para responder en el canal que tus clientes ya usan cada día."
      plan="Disponible desde el plan Pro"
      status={
        <StatusNote>
          <strong>Estado actual:</strong> ya puedes crear, configurar y probar asistentes de WhatsApp en el editor. La
          conexión directa con la API oficial de WhatsApp Business de Meta está en desarrollo y se activará en tu panel de
          Integraciones cuando esté disponible.
        </StatusNote>
      }
      visual={
        <div className="surface-card mx-auto max-w-sm overflow-hidden shadow-lift">
          <div className="flex items-center gap-3 bg-ink px-4 py-3 text-ink-foreground">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">CL</span>
            <div>
              <p className="text-sm font-medium">Clínica Lumen</p>
              <p className="text-[11px] text-ink-muted">Asistente automático</p>
            </div>
          </div>
          <div className="space-y-2.5 bg-secondary p-4">
            <Bubble me>Hola, ¿qué horario tenéis mañana?</Bubble>
            <Bubble>Mañana abrimos de 9:00 a 14:00 y de 16:00 a 20:00. ¿Quieres pedir cita?</Bubble>
            <Bubble me>Sí, por la tarde</Bubble>
            <Bubble>Perfecto. ¿Me indicas tu nombre y el motivo de la consulta? Un compañero confirmará la hora.</Bubble>
          </div>
          <p className="border-t px-4 py-2 text-center text-[11px] text-muted-foreground">Conversación ilustrativa</p>
        </div>
      }
      benefitsTitle="El canal con mayor tasa de respuesta"
      benefits={[
        "Respuestas coherentes con tu web: el mismo conocimiento para todos los canales.",
        "Disponible fuera de horario, con derivación al equipo cuando hace falta.",
        "Conversaciones registradas junto al resto de canales en tu panel.",
        "Costes de Meta transparentes: las plantillas de marketing se facturan aparte según la tarifa oficial.",
      ]}
      features={[
        { icon: Smartphone, title: "Número de WhatsApp Business", text: "Pro incluye 1 número y Business hasta 3 números conectados." },
        { icon: BookOpen, title: "Conocimiento compartido", text: "Asigna las mismas fuentes que usas en tu chatbot web." },
        { icon: MessageCircle, title: "Tono de marca", text: "Mensajes breves y naturales, adaptados al formato de chat." },
        { icon: Users, title: "Derivación humana", text: "Mensaje alternativo cuando el asistente no tiene la respuesta." },
        { icon: Clock, title: "24/7", text: "Atiende consultas fuera de horario sin ampliar el equipo." },
        { icon: Repeat, title: "Prueba antes de publicar", text: "Conversa con el asistente en el editor antes de conectarlo." },
      ]}
      useCases={[
        { title: "Clínicas y centros", text: "Horarios, preparación de citas y preguntas frecuentes de pacientes." },
        { title: "Tiendas locales", text: "Disponibilidad de productos, pedidos y recogida en tienda." },
        { title: "Academias", text: "Información de cursos, matrículas y calendario." },
      ]}
    />
  );
}
