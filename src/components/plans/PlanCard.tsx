import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice, type Plan } from "@/lib/plans";

export function PlanCard({ plan, action, current }: { plan: Plan; action: ReactNode; current?: boolean }) {
  const highlighted = plan.is_highlighted;
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card p-6 shadow-soft transition-shadow",
        highlighted && "border-ink shadow-lift ring-1 ring-ink",
        current && "border-primary ring-1 ring-primary",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">{plan.name}</h3>
        {current ? <Badge>Plan actual</Badge> : highlighted ? <Badge variant="ink">Más elegido</Badge> : null}
      </div>
      <p className="mt-1.5 min-h-10 text-sm text-muted-foreground">{plan.tagline}</p>
      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="font-display text-[2.1rem] font-semibold tracking-tight">{formatPrice(plan)}</span>
        {!plan.is_custom && Number(plan.price_monthly) > 0 && <span className="text-sm text-muted-foreground">/ mes</span>}
      </div>
      <p className="mt-1 h-4 text-xs text-muted-foreground">
        {!plan.is_custom && Number(plan.price_monthly) > 0 ? "IVA no incluido" : plan.is_custom ? "Según volumen" : "Para siempre"}
      </p>
      <div className="mt-6">{action}</div>
      <ul className="mt-6 space-y-2.5 border-t pt-6">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
