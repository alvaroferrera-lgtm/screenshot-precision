import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Code2, Gauge, MessagesSquare, Palette, ShieldCheck } from "lucide-react";
import { ChannelPage } from "@/components/site/ChannelPage";
import { ProductPreview } from "@/components/site/ProductPreview";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/chatbots-web")({
  head: () =>
    seo({
      title: "Chatbots web con IA",
      description:
        "Crea un chatbot web con inteligencia artificial entrenado con tu información e instálalo en tu web con una línea de código.",
    }),
  component: () => (
    <ChannelPage
      eyebrow="Chatbots web"
      title="Un chatbot en tu web que conoce tu negocio"
      lead="Configura instrucciones y conocimiento, pruébalo en el editor y añádelo a tu web pegando un fragmento de código."
      plan="Disponible desde el plan Free"
      visual={<ProductPreview />}
      benefitsTitle="Atención inmediata, a cualquier hora"
      benefits={[
        "Responde dudas frecuentes con información de tu propia base de conocimiento.",
        "Se instala en cualquier web: WordPress, Shopify, Webflow o código propio.",
        "Guarda cada conversación para que tu equipo pueda revisarla.",
        "Consumo de IA medido y limitado según tu plan: sin sorpresas en la factura.",
      ]}
      features={[
        { icon: Code2, title: "Instalación con un script", text: "Copia el fragmento desde Integraciones y pégalo antes de </body>." },
        { icon: Palette, title: "Color y bienvenida", text: "Personaliza color, mensaje de bienvenida y nombre del asistente." },
        { icon: BookOpen, title: "Respuestas con contexto", text: "El asistente consulta los fragmentos más relevantes de tu conocimiento." },
        { icon: MessagesSquare, title: "Historial completo", text: "Todas las conversaciones del widget quedan registradas en tu panel." },
        { icon: Gauge, title: "Límites por plan", text: "Mensajes de IA mensuales incluidos y aviso cuando te acercas al límite." },
        { icon: ShieldCheck, title: "Solo lo publicado", text: "El widget solo responde cuando el asistente está activo." },
      ]}
      useCases={[
        { title: "Comercio electrónico", text: "Envíos, devoluciones, tallas y disponibilidad respondidos al momento." },
        { title: "Servicios profesionales", text: "Explica servicios y tarifas y recoge datos de contacto de clientes potenciales." },
        { title: "Hostelería y turismo", text: "Horarios, reservas, ubicación y preguntas frecuentes de huéspedes." },
      ]}
    />
  ),
});
