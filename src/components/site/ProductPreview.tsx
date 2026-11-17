import { BookOpen, Globe, MessageCircle, PhoneCall, Send } from "lucide-react";

/** Illustrative composition of the builder UI for marketing pages (static, not live data). */
export function ProductPreview() {
  return (
    <div className="relative" aria-label="Vista ilustrativa del editor de asistentes" role="img">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-grid opacity-60" aria-hidden />
      <div className="surface-card relative overflow-hidden shadow-lift">
        <div className="flex items-center gap-2 border-b bg-secondary/60 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="ml-3 font-mono text-[11px] text-muted-foreground">app.conversaai · Asistente de reservas</span>
        </div>
        <div className="grid md:grid-cols-[1fr_1.05fr]">
          <div className="space-y-4 border-b p-5 md:border-b-0 md:border-r">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Canal</p>
              <div className="mt-2 flex gap-1.5">
                {[
                  { i: Globe, l: "Web", on: true },
                  { i: MessageCircle, l: "WhatsApp" },
                  { i: PhoneCall, l: "Voz" },
                ].map(({ i: I, l, on }) => (
                  <span
                    key={l}
                    className={
                      on
                        ? "inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary-strong"
                        : "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs text-muted-foreground"
                    }
                  >
                    <I className="size-3.5" /> {l}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Instrucciones</p>
              <div className="mt-2 rounded-lg border bg-surface p-3 text-[13px] leading-relaxed text-foreground">
                Eres el asistente de un restaurante. Responde con amabilidad, informa del horario y ayuda a reservar
                mesa. Si no sabes algo, ofrece contactar con el equipo.
              </div>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Conocimiento</p>
              <ul className="mt-2 space-y-1.5">
                {["Carta y alérgenos", "Horarios y ubicación", "Política de reservas"].map((d) => (
                  <li key={d} className="flex items-center gap-2 rounded-md border bg-surface px-2.5 py-1.5 text-[13px]">
                    <BookOpen className="size-3.5 text-primary-strong" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col bg-background/60 p-5">
            <div className="flex-1 space-y-3">
              <div className="max-w-[85%] rounded-2xl rounded-tl-md border bg-surface px-3.5 py-2.5 text-[13px]">
                ¡Hola! Soy el asistente de Casa Lumbre. ¿En qué puedo ayudarte?
              </div>
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-ink px-3.5 py-2.5 text-[13px] text-ink-foreground">
                ¿Tenéis mesa para cuatro el sábado por la noche?
              </div>
              <div className="max-w-[88%] rounded-2xl rounded-tl-md border bg-surface px-3.5 py-2.5 text-[13px]">
                El sábado abrimos de 20:00 a 23:30. Puedo tomar nota de tu reserva: ¿a qué hora y a qué nombre?
              </div>
              <div className="flex items-center gap-1 pl-1" aria-hidden>
                <span className="size-1.5 animate-pulse-dot rounded-full bg-muted-foreground" />
                <span className="size-1.5 animate-pulse-dot rounded-full bg-muted-foreground [animation-delay:150ms]" />
                <span className="size-1.5 animate-pulse-dot rounded-full bg-muted-foreground [animation-delay:300ms]" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border bg-surface px-3 py-2">
              <span className="flex-1 text-[13px] text-muted-foreground">Escribe un mensaje…</span>
              <span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Send className="size-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
