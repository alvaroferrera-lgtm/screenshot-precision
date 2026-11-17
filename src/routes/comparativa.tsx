import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaBand, PageHero } from "@/components/site/blocks";
import { PlanComparison } from "@/components/plans/PlanComparison";
import { plansQuery } from "@/lib/plans.functions";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/comparativa")({
  head: () =>
    seo({
      title: "Comparativa de planes",
      description: "Compara límites, canales, personalización y precios de uso adicional de todos los planes de CONVERSAAI.",
    }),
  loader: ({ context }) => context.queryClient.ensureQueryData(plansQuery),
  component: Compare,
});

function Compare() {
  const { data: plans } = useSuspenseQuery(plansQuery);
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Comparativa"
        title="Todos los planes, punto por punto"
        lead="Límites mensuales, canales incluidos y precio del uso adicional. Precios sin IVA."
      />
      <section className="py-14 md:py-20">
        <div className="container-page">
          <PlanComparison plans={plans} />
          <p className="mt-4 text-[13px] text-muted-foreground">
            El uso adicional se facturará cuando se activen los pagos en línea. Las tarifas de Meta para plantillas de
            WhatsApp se repercuten aparte.
          </p>
        </div>
      </section>
      <CtaBand />
    </SiteLayout>
  );
}
