import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaBand, PageHero, Section } from "@/components/site/blocks";
import { PlanCard } from "@/components/plans/PlanCard";
import { Button } from "@/components/ui/button";
import { plansQuery } from "@/lib/plans.functions";
import { seo } from "@/lib/seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/precios")({
  head: () =>
    seo({
      title: "Precios",
      description:
        "Planes Free, Starter, Pro, Business y Enterprise. Empieza gratis con un chatbot web y añade WhatsApp y teléfono cuando los necesites.",
    }),
  loader: ({ context }) => context.queryClient.ensureQueryData(plansQuery),
  component: Pricing,
});

const faqs = [
  {
    q: "¿Qué cuenta como mensaje de IA?",
    a: "Cada respuesta generada por tu asistente cuenta como un mensaje de IA, tanto en el widget como en las pruebas del editor. Los mensajes de tus clientes no cuentan.",
  },
  {
    q: "¿Qué pasa si llego al límite de mensajes?",
    a: "El asistente deja de generar respuestas hasta el mes siguiente y muestra un aviso. Puedes cambiar de plan en cualquier momento. La compra de mensajes adicionales se activará junto con los pagos.",
  },
  {
    q: "¿Los costes de WhatsApp están incluidos?",
    a: "La cuota del plan incluye la plataforma y la IA. Meta factura algunas conversaciones (por ejemplo, plantillas de marketing) según su tarifa oficial; esos importes se repercuten sin margen.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. Los planes son mensuales o anuales y no tienen permanencia. El plan Free es gratuito para siempre.",
  },
  {
    q: "¿Ya puedo pagar un plan?",
    a: "Los pagos en línea se activarán próximamente. Mientras tanto, si necesitas un plan superior, escríbenos desde Contacto.",
  },
];

function Pricing() {
  const { data: plans } = useSuspenseQuery(plansQuery);
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Precios"
        title="Planes que crecen con tus canales"
        lead="Empieza gratis con un chatbot web. Añade WhatsApp con Pro y llamadas telefónicas con Business."
      />
      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {plans.map((p) => (
              <PlanCard
                key={p.id}
                plan={p}
                action={
                  p.is_custom ? (
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/contacto">Hablar con ventas</Link>
                    </Button>
                  ) : (
                    <Button asChild variant={p.is_highlighted ? "ink" : "outline"} className="w-full">
                      <Link to="/auth" search={{ mode: "signup" }}>
                        {Number(p.price_monthly) === 0 ? "Empezar gratis" : `Elegir ${p.name}`}
                      </Link>
                    </Button>
                  )
                }
              />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border bg-surface p-6 md:flex-row md:items-center">
            <p className="text-[15px] text-muted-foreground">
              ¿Quieres ver cada límite y canal en detalle? Consulta la tabla completa.
            </p>
            <Button asChild variant="ghost">
              <Link to="/comparativa">
                Comparativa de planes <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Section eyebrow="Preguntas frecuentes" title="Dudas sobre los planes" className="border-t border-border/70 bg-surface">
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-[16px]">{f.q}</AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
      <CtaBand />
    </SiteLayout>
  );
}
