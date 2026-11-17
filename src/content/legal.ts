export type LegalPage = { slug: string; title: string; updated: string; html: string };

const owner = `<p><em>Nota: este texto es una plantilla base. Sustituye los datos entre corchetes y revísalo con un profesional antes de publicar.</em></p>`;

export const legalPages: LegalPage[] = [
  {
    slug: "aviso-legal",
    title: "Aviso legal",
    updated: "2026-11-17",
    html: `${owner}
<h2>Titular del sitio web</h2>
<p>[Razón social], con NIF [NIF] y domicilio en [Dirección]. Correo de contacto: [email].</p>
<h2>Objeto</h2>
<p>Este sitio web ofrece información sobre CONVERSAAI, plataforma de software como servicio para crear asistentes de inteligencia artificial, y da acceso a la aplicación.</p>
<h2>Propiedad intelectual</h2>
<p>Los contenidos, la marca y el software son titularidad de [Razón social] o de sus licenciantes. No se permite su reproducción sin autorización.</p>
<h2>Responsabilidad</h2>
<p>Las respuestas generadas por inteligencia artificial pueden contener errores. El cliente es responsable de revisar la configuración y el conocimiento de sus asistentes.</p>`,
  },
  {
    slug: "privacidad",
    title: "Política de privacidad",
    updated: "2026-11-17",
    html: `${owner}
<h2>Responsable del tratamiento</h2>
<p>[Razón social], [NIF], [Dirección], [email].</p>
<h2>Datos que tratamos</h2>
<ul><li>Datos de cuenta: nombre, email y empresa.</li><li>Contenido que subes: instrucciones y base de conocimiento.</li><li>Conversaciones de tus asistentes con tus clientes, por cuenta tuya como encargado del tratamiento.</li><li>Mensajes enviados desde el formulario de contacto.</li></ul>
<h2>Finalidades y base legal</h2>
<p>Prestar el servicio contratado (ejecución del contrato), atender solicitudes (consentimiento) y cumplir obligaciones legales.</p>
<h2>Proveedores</h2>
<p>Utilizamos proveedores de alojamiento y de modelos de inteligencia artificial para generar las respuestas. [Detalla proveedores y transferencias internacionales].</p>
<h2>Derechos</h2>
<p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a [email], y reclamar ante la AEPD.</p>`,
  },
  {
    slug: "cookies",
    title: "Política de cookies",
    updated: "2026-11-17",
    html: `${owner}
<p>Este sitio utiliza almacenamiento local técnico, necesario para mantener tu sesión iniciada y para que el widget de chat recuerde la conversación en curso.</p>
<p>No utilizamos cookies publicitarias. Si en el futuro se añaden herramientas de analítica, se solicitará tu consentimiento previo.</p>`,
  },
  {
    slug: "terminos",
    title: "Términos y condiciones",
    updated: "2026-11-17",
    html: `${owner}
<h2>Servicio</h2>
<p>CONVERSAAI permite crear y gestionar asistentes de IA para web, WhatsApp y teléfono. Algunas integraciones se encuentran en desarrollo y así se indica en la plataforma.</p>
<h2>Planes y límites</h2>
<p>Cada plan incluye límites mensuales de uso. Al superarlos, el servicio puede quedar limitado hasta el siguiente periodo o hasta contratar un plan superior.</p>
<h2>Uso aceptable</h2>
<p>No está permitido usar la plataforma para actividades ilícitas, spam, suplantación o contenido que vulnere derechos de terceros.</p>
<h2>Contenido del cliente</h2>
<p>El cliente conserva la titularidad de su contenido y es responsable de su legalidad y de informar a sus usuarios del uso de un asistente automatizado.</p>
<h2>Pagos</h2>
<p>Los pagos en línea aún no están activos. Las condiciones de facturación se publicarán antes de su activación.</p>`,
  },
];

export function getLegal(slug: string) {
  return legalPages.find((p) => p.slug === slug);
}
