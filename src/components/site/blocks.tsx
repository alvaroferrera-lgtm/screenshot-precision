import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="border-b border-border/70">
      <div
        className={cn(
          "container-page animate-fade-up py-16 md:py-24",
          align === "center" && "text-center",
        )}
      >
        <p className="eyebrow">{eyebrow}</p>
        <h1
          className={cn(
            "mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] text-foreground md:text-[3.4rem]",
            align === "center" && "mx-auto",
          )}
        >
          {title}
        </h1>
        {lead && (
          <p
            className={cn(
              "mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        )}
        {children && <div className={cn("mt-8", align === "center" && "flex justify-center")}>{children}</div>}
      </div>
    </section>
  );
}

export function Section({
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container-page">
        {(eyebrow || title) && (
          <div className="mb-10 max-w-2xl md:mb-14">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>}
            {lead && <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{lead}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="surface-card interactive-lift p-6">
      <span className="grid size-9 place-items-center rounded-lg bg-primary-soft text-primary-strong">
        <Icon className="size-[18px]" />
      </span>
      <h3 className="mt-5 text-[17px] font-semibold">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

export function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-[15px] text-foreground">
          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function StatusNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-warning/40 bg-warning-soft p-4 text-sm text-foreground">
      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-warning" aria-hidden />
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

export function CtaBand({
  title = "Crea tu primer asistente hoy",
  lead = "Empieza gratis con un chatbot web. Cambia de plan cuando lo necesites.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-ink-foreground md:px-14">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.15]" aria-hidden />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
              <p className="mt-3 text-[17px] text-ink-muted">{lead}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/auth" search={{ mode: "signup" }}>
                  Empezar gratis <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline-ink">
                <Link to="/precios">Ver precios</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
