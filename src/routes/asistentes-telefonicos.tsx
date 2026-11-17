import { createFileRoute } from "@tanstack/react-router";
import { AudioLines, BookOpen, Clock, PhoneCall, PhoneForwarded, Timer } from "lucide-react";
import { ChannelPage, StatusNote } from "@/components/site/ChannelPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/asistentes-telefonicos")({
  head: () =>
    seo({
      title: "Asistentes telefónicos con IA",
      description:
        "Asistentes de voz con inteligencia artificial que atienden llamadas, informan y toman datos de tus clientes.",
    }),
  component: PhonePage,
});

function PhonePage() {
  return (
    <ChannelPage
      eyebrow="Asistentes telefónicos"
      title="Llamadas atendidas por una voz que conoce tu negocio"
      lead="Un asistente de voz que responde preguntas frecuentes, filtra llamadas y recoge datos para tu equipo."
      plan="Disponible desde el plan Business"
      status={
        <StatusNote>
          <strong>Estado actual:</strong> puedes crear y probar en texto el comportamiento de tus asistentes telefónicos.
          La conexión con líneas telefónicas reales (proveedor de telefonía y voz en tiempo real) está en desarrollo y
          aparecerá en Integraciones cuando esté disponible.
        </StatusNote>
      }
      visual={
        <div className="surface-card mx-auto max-w-md p-6 shadow-lift">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-ink text-primary">
                <PhoneCall className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium">Llamada entrante</p>
                <p className="text-xs text-muted-foreground">Asistente de recepción</p>
              </div>
            </div>
            <span className="font-mono text-xs text-muted-foreground">01:24</span>
          </div>
          <div className="mt-6 flex h-14 items-center gap-[3px]" aria-hidden>
            {Array.from({ length: 48 }).map((_, i) => (
              <span
                key={i}
                className="w-full rounded-full bg-primary/70"
                style={{ height: `${18 + Math.abs(Math.sin(i * 0.7)) * 70}%` }}
              />
            ))}
          </div>
          <div className="mt-6 space-y-2 text-[13.5px]">
            <p><span className="text-muted-foreground">Cliente:</span> Quería saber si hacéis revisiones el sábado.</p>
            <p><span className="text-primary-strong">Asistente:</span> Sí, los sábados de 9 a 13. ¿Te tomo los datos para una cita?</p>
          </div>
          <p className="mt-5 border-t pt-3 text-center text-[11px] text-muted-foreground">Transcripción ilustrativa</p>
        </div>
      }
      benefitsTitle="Ninguna llamada sin respuesta"
      benefits={[
        "Atiende llamadas en horas punta y fuera de horario.",
        "Respuestas basadas en tu propia base de conocimiento.",
        "Minutos de voz incluidos en Business y precio por minuto adicional publicado.",
        "Transcripciones guardadas junto al resto de conversaciones.",
      ]}
      features={[
        { icon: AudioLines, title: "Voz natural", text: "Conversación fluida en español con interrupciones naturales." },
        { icon: BookOpen, title: "Mismo conocimiento", text: "Reutiliza las fuentes de tus asistentes web y de WhatsApp." },
        { icon: PhoneForwarded, title: "Derivación", text: "Mensaje de derivación al equipo cuando la consulta lo requiere." },
        { icon: Timer, title: "150 min/mes en Business", text: "Minutos adicionales con tarifa transparente por minuto." },
        { icon: Clock, title: "Siempre disponible", text: "Sin colas ni horarios para las preguntas más habituales." },
        { icon: PhoneCall, title: "Pruebas en texto", text: "Valida guion e instrucciones en el editor antes de conectar la línea." },
      ]}
      useCases={[
        { title: "Talleres y servicios técnicos", text: "Horarios, presupuestos orientativos y toma de datos." },
        { title: "Restauración", text: "Reservas, horarios y preguntas sobre la carta." },
        { title: "Inmobiliarias", text: "Primer filtro de interesados y recogida de datos de contacto." },
      ]}
    />
  );
}
