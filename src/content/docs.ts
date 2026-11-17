export type Doc = { slug: string; title: string; summary: string; section: string; html: string };

export const docs: Doc[] = [
  {
    slug: "primeros-pasos",
    section: "Empezar",
    title: "Primeros pasos",
    summary: "Crea tu cuenta, tu espacio de trabajo y tu primer asistente.",
    html: `
<p>Al registrarte se crea automáticamente un <strong>espacio de trabajo</strong> en el plan Free, del que eres propietario. Todo lo que crees (asistentes, conocimiento y conversaciones) pertenece a ese espacio.</p>
<ol><li>Entra en <strong>Mis asistentes</strong> y pulsa <strong>Crear asistente</strong>.</li><li>Elige el canal, ponle nombre y escribe sus instrucciones.</li><li>Añade fuentes en <strong>Base de conocimiento</strong> y asígnalas al asistente.</li><li>Pruébalo en la pestaña <strong>Probar</strong> del editor.</li><li>Cámbialo a <strong>Activo</strong> e instala el widget desde <strong>Integraciones</strong>.</li></ol>`,
  },
  {
    slug: "crear-un-asistente",
    section: "Asistentes",
    title: "Crear y configurar un asistente",
    summary: "Canal, instrucciones, tono, idioma, bienvenida y mensaje alternativo.",
    html: `
<h2>Campos principales</h2>
<ul><li><strong>Canal</strong>: web (todos los planes), WhatsApp (desde Pro) o teléfono (desde Business).</li><li><strong>Instrucciones</strong>: el rol y las reglas del asistente.</li><li><strong>Tono e idioma</strong>: cómo y en qué idioma responde.</li><li><strong>Mensaje de bienvenida</strong>: el primer mensaje que ve el visitante.</li><li><strong>Mensaje alternativo</strong>: qué decir cuando no tiene la información.</li></ul>
<h2>Estados</h2>
<p><strong>Borrador</strong> y <strong>Pausado</strong>: solo se puede probar en el editor. <strong>Activo</strong>: el widget público responde.</p>`,
  },
  {
    slug: "base-de-conocimiento",
    section: "Asistentes",
    title: "Base de conocimiento",
    summary: "Añade textos o importa páginas web y asígnalos a tus asistentes.",
    html: `
<p>Cada fuente puede ser un texto pegado o el contenido de una página web pública (se extrae el texto visible). El total de caracteres está limitado por tu plan.</p>
<p>Para responder, el asistente divide las fuentes asignadas en fragmentos y selecciona los más relacionados con la pregunta. El número de fragmentos por respuesta depende del plan.</p>
<h2>Recomendaciones</h2>
<ul><li>Una fuente por tema.</li><li>Párrafos cortos y concretos.</li><li>Actualiza las fuentes cuando cambien precios u horarios.</li></ul>`,
  },
  {
    slug: "instalar-widget-web",
    section: "Canales",
    title: "Instalar el chatbot en tu web",
    summary: "Añade el script del widget a cualquier página.",
    html: `
<p>En <strong>Integraciones → Chatbot web</strong> elige el asistente y copia el fragmento. Pégalo justo antes de la etiqueta <code>&lt;/body&gt;</code> de tu web:</p>
<pre><code>&lt;script src="https://TU-DOMINIO/widget.js" data-assistant="ID_DEL_ASISTENTE" async&gt;&lt;/script&gt;</code></pre>
<p>El script añade un botón flotante que abre el chat. El asistente debe estar en estado <strong>Activo</strong>.</p>
<p>También puedes enlazar directamente la página de chat del asistente o incrustarla en un <code>iframe</code>.</p>`,
  },
  {
    slug: "whatsapp",
    section: "Canales",
    title: "WhatsApp",
    summary: "Estado de la integración y qué puedes hacer ya.",
    html: `
<p>Desde el plan Pro puedes crear asistentes de canal WhatsApp, configurarlos y probarlos en el editor.</p>
<p><strong>Estado:</strong> la conexión con la API oficial de WhatsApp Business (Meta) está en desarrollo. Cuando esté disponible, podrás vincular tu número desde Integraciones.</p>`,
  },
  {
    slug: "asistentes-telefonicos",
    section: "Canales",
    title: "Asistentes telefónicos",
    summary: "Estado de la integración de voz y telefonía.",
    html: `
<p>Desde el plan Business puedes crear asistentes de canal teléfono y probar su comportamiento en texto en el editor.</p>
<p><strong>Estado:</strong> la conexión con líneas telefónicas y voz en tiempo real está en desarrollo.</p>`,
  },
  {
    slug: "equipos-y-roles",
    section: "Cuenta",
    title: "Equipos y roles",
    summary: "Invita a tu equipo y gestiona permisos.",
    html: `
<ul><li><strong>Propietario</strong>: control total del espacio de trabajo.</li><li><strong>Administrador</strong>: gestiona miembros, invitaciones y elimina asistentes.</li><li><strong>Miembro</strong>: crea y edita asistentes y conocimiento.</li></ul>
<p>Para invitar, ve a <strong>Configuración → Equipo</strong> e introduce el email. La persona verá la invitación al registrarse o iniciar sesión con ese email, en Configuración. Por ahora no se envía un correo automático: avísale tú.</p>`,
  },
  {
    slug: "planes-y-limites",
    section: "Cuenta",
    title: "Planes y límites",
    summary: "Cómo se miden los mensajes de IA y qué pasa al llegar al límite.",
    html: `
<p>Cada respuesta generada cuenta como un <strong>mensaje de IA</strong>. El contador se reinicia el día 1 de cada mes. Puedes ver el consumo en <strong>Suscripción y facturación</strong>.</p>
<p>Al alcanzar el límite, el asistente deja de responder hasta el mes siguiente. También se limitan el número de asistentes, los caracteres de conocimiento y los miembros del equipo.</p>`,
  },
];

export function getDoc(slug: string) {
  return docs.find((d) => d.slug === slug);
}
