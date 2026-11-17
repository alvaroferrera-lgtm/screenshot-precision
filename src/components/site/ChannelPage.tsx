import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "./SiteLayout";
import { CheckList, CtaBand, FeatureCard, PageHero, Section, StatusNote } from "./blocks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ChannelPage({
  eyebrow,
  title,
  lead,
  plan,
  status,
  visual,
  benefitsTitle,
  benefits,
  features,
  useCases,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  plan: string;
  status?: ReactNode;
  visual: ReactNode;
  benefitsTitle: string;
  benefits: string[];
  features: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }[];
  useCases: { title: string; text: string }[];
}) {
  return (
    <SiteLayout>
      <PageHero eyebrow={eyebrow} title={title} lead={lead}>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg" variant="ink">
            <Link to="/auth" search={{ mode: "signup" }}>
              Empezar gratis <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/precios">Ver planes</Link>
          </Button>
          <Badge variant="secondary" className="ml-1">{plan}</Badge>
        </div>
        {status && <div className="mt-8 max-w-2xl">{status}</div>}
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Por qué</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">{benefitsTitle}</h2>
            <CheckList items={benefits} className="mt-8" />
          </div>
          <div>{visual}</div>
        </div>
      </section>

      <Section eyebrow="Funcionalidades" title="Lo que incluye" className="border-t border-border/70 bg-surface">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title}>
              {f.text}
            </FeatureCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Casos de uso" title="Dónde encaja">
        <div className="grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
          {useCases.map((u) => (
            <div key={u.title} className="bg-surface p-7">
              <h3 className="text-lg font-semibold">{u.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{u.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}

export { StatusNote };
