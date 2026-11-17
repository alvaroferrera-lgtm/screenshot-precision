import { Fragment } from "react";
import { Check, Minus } from "lucide-react";
import { formatEur, formatNumber, formatPrice, type Plan } from "@/lib/plans";
import { cn } from "@/lib/utils";

type Row = { label: string; get: (p: Plan) => React.ReactNode; group: string };

const yes = <Check className="mx-auto size-4 text-primary" aria-label="Incluido" />;
const no = <Minus className="mx-auto size-4 text-border-strong" aria-label="No incluido" />;
const big = (n: number, custom: boolean) => (custom ? "A medida" : formatNumber(n));

const rows: Row[] = [
  { group: "Precio", label: "Precio mensual", get: (p) => formatPrice(p) },
  { group: "Precio", label: "Precio anual", get: (p) => (p.is_custom ? "A medida" : formatEur(p.price_yearly)) },
  { group: "Capacidad", label: "Asistentes", get: (p) => big(p.max_assistants, p.is_custom) },
  { group: "Capacidad", label: "Mensajes de IA / mes", get: (p) => big(p.max_ai_messages_month, p.is_custom) },
  { group: "Capacidad", label: "Conocimiento (caracteres)", get: (p) => big(p.max_knowledge_chars, p.is_custom) },
  { group: "Capacidad", label: "Fragmentos de contexto por respuesta", get: (p) => p.context_chunks },
  { group: "Capacidad", label: "Miembros del equipo", get: (p) => big(p.max_members, p.is_custom) },
  { group: "Canales", label: "Chatbot web", get: (p) => (p.web_enabled ? yes : no) },
  { group: "Canales", label: "WhatsApp", get: (p) => (p.whatsapp_enabled ? (p.is_custom ? "A medida" : `${p.whatsapp_numbers} número${p.whatsapp_numbers > 1 ? "s" : ""}`) : no) },
  { group: "Canales", label: "Asistentes telefónicos", get: (p) => (p.voice_enabled ? (p.is_custom ? "A medida" : `${p.voice_minutes_month} min/mes`) : no) },
  { group: "Personalización", label: "Sin marca CONVERSAAI", get: (p) => (p.remove_branding ? yes : no) },
  { group: "Personalización", label: "Personalización avanzada", get: (p) => (p.advanced_customization ? yes : no) },
  { group: "Personalización", label: "Historial de estadísticas", get: (p) => (p.analytics_days >= 365 ? `${Math.round(p.analytics_days / 30)} meses` : `${p.analytics_days} días`) },
  { group: "Uso adicional", label: "1.000 mensajes extra", get: (p) => (p.overage_per_1000_messages ? formatEur(p.overage_per_1000_messages) : p.is_custom ? "A medida" : no) },
  { group: "Uso adicional", label: "Minuto de voz extra", get: (p) => (p.overage_per_voice_minute ? formatEur(p.overage_per_voice_minute) : p.is_custom ? "A medida" : no) },
];

export function PlanComparison({ plans }: { plans: Plan[] }) {
  const groups = Array.from(new Set(rows.map((r) => r.group)));
  return (
    <div className="overflow-x-auto rounded-2xl border bg-card shadow-soft">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="sticky left-0 bg-card p-4 text-left font-medium text-muted-foreground">Plan</th>
            {plans.map((p) => (
              <th key={p.id} className={cn("p-4 text-center font-display text-[15px] font-semibold", p.is_highlighted && "bg-primary-soft/60")}>
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <Fragment key={g}>
              <tr className="bg-secondary/60">
                <td colSpan={plans.length + 1} className="px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  {g}
                </td>
              </tr>
              {rows
                .filter((r) => r.group === g)
                .map((r) => (
                  <tr key={r.label} className="border-t">
                    <td className="sticky left-0 bg-card p-4 text-foreground">{r.label}</td>
                    {plans.map((p) => (
                      <td key={p.id} className={cn("p-4 text-center tabular-nums", p.is_highlighted && "bg-primary-soft/40")}>
                        {r.get(p)}
                      </td>
                    ))}
                  </tr>
                ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
