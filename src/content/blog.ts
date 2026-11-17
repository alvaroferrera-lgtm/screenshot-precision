export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingMinutes: number;
  category: string;
  html: string;
};

export const posts: Post[] = [
  {
    slug: "como-escribir-instrucciones-para-un-asistente",
    title: "Cómo escribir instrucciones que tu asistente de IA siga de verdad",
    excerpt: "Una estructura sencilla para definir rol, límites y tono, con ejemplos que puedes copiar.",
    date: "2026-11-10",
    readingMinutes: 6,
    category: "Guías",
    html: `
<p>Las instrucciones son el texto que el asistente lee antes de cada conversación. Unas buenas instrucciones marcan la diferencia entre un asistente que improvisa y uno que responde como lo haría tu mejor empleado.</p>
<h2>1. Empieza por el rol</h2>
<p>Explica quién es el asistente y para quién trabaja en una o dos frases.</p>
<pre><code>Eres el asistente de atención al cliente de Óptica Norte, una óptica de barrio en Valencia.</code></pre>
<h2>2. Define qué debe hacer</h2>
<ul><li>Responder dudas sobre horarios, precios y servicios.</li><li>Ayudar a pedir cita recogiendo nombre, teléfono y franja preferida.</li><li>Recomendar acudir a la tienda para graduaciones.</li></ul>
<h2>3. Marca los límites</h2>
<p>Indica explícitamente lo que no debe hacer: dar diagnósticos médicos, prometer descuentos o inventar disponibilidad. Los modelos de lenguaje respetan mucho mejor un límite escrito que uno implícito.</p>
<h2>4. Ajusta el tono</h2>
<p>Elige el tono en el editor (profesional, cercano o formal) y, si hace falta, añade matices: «tutea al cliente», «respuestas de menos de 80 palabras».</p>
<h2>5. Qué hacer cuando no sabe algo</h2>
<p>Configura el <strong>mensaje alternativo</strong>. Es preferible que el asistente diga «no tengo esa información» a que invente una respuesta.</p>
<blockquote>Consejo: prueba cada cambio en el editor con las cinco preguntas que más te hacen tus clientes.</blockquote>`,
  },
  {
    slug: "preparar-una-base-de-conocimiento",
    title: "Preparar una base de conocimiento que dé respuestas precisas",
    excerpt: "Qué información incluir, cómo organizarla y por qué los textos cortos y concretos funcionan mejor.",
    date: "2026-11-03",
    readingMinutes: 5,
    category: "Guías",
    html: `
<p>Tu asistente solo puede ser tan preciso como la información que le das. En CONVERSAAI, cada fuente se divide en fragmentos y, para cada pregunta, se envían al modelo los fragmentos más relevantes.</p>
<h2>Qué incluir primero</h2>
<ul><li>Preguntas frecuentes con sus respuestas.</li><li>Horarios, ubicación y formas de contacto.</li><li>Precios, condiciones y políticas (envíos, devoluciones, cancelaciones).</li><li>Descripción de productos o servicios principales.</li></ul>
<h2>Escribe como responderías</h2>
<p>Las fuentes funcionan mejor cuando cada párrafo trata un único tema y usa las palabras que usan tus clientes. «¿Hacéis envíos a Canarias?» es más fácil de encontrar que «Logística insular».</p>
<h2>Una fuente por tema</h2>
<p>Separa en fuentes distintas la política de devoluciones, la carta o el catálogo. Así puedes asignar a cada asistente solo lo que necesita.</p>
<h2>Revisa las conversaciones</h2>
<p>Las preguntas que el asistente no supo responder son la mejor lista de tareas para ampliar tu conocimiento.</p>`,
  },
  {
    slug: "whatsapp-business-api-antes-de-automatizar",
    title: "WhatsApp Business API: lo que conviene saber antes de automatizar",
    excerpt: "Diferencias con la app de WhatsApp Business, tipos de conversación y cómo se facturan.",
    date: "2026-10-27",
    readingMinutes: 7,
    category: "Canales",
    html: `
<p>Para conectar un asistente de IA a WhatsApp se utiliza la <strong>API oficial de WhatsApp Business</strong> (plataforma de Meta), no la aplicación móvil de WhatsApp Business.</p>
<h2>Requisitos habituales</h2>
<ul><li>Una cuenta de Meta Business verificada.</li><li>Un número de teléfono que no esté registrado en otra cuenta de WhatsApp.</li><li>Un nombre visible que cumpla las políticas de Meta.</li></ul>
<h2>Ventana de servicio de 24 horas</h2>
<p>Cuando un cliente te escribe, se abre una ventana de 24 horas en la que puedes responder libremente. Fuera de esa ventana solo puedes iniciar conversaciones con <strong>plantillas aprobadas</strong>.</p>
<h2>Cómo factura Meta</h2>
<p>Meta cobra determinados mensajes de plantilla (marketing, utilidad, autenticación) con tarifas que varían por país. Las respuestas dentro de la ventana de servicio tienen un tratamiento distinto. Consulta siempre la tarifa oficial vigente de Meta para tu país.</p>
<h2>Buenas prácticas</h2>
<ul><li>Respuestas breves: WhatsApp es conversación, no correo electrónico.</li><li>Ofrece siempre la opción de hablar con una persona.</li><li>No envíes mensajes promocionales sin consentimiento explícito.</li></ul>
<p>En CONVERSAAI puedes crear y probar ya tus asistentes de WhatsApp desde el plan Pro; la conexión directa con la API de Meta está en desarrollo.</p>`,
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
