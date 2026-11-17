import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/blocks";
import { Badge } from "@/components/ui/badge";
import { posts } from "@/content/blog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seo({
      title: "Blog",
      description: "Guías prácticas para crear asistentes de IA útiles en web, WhatsApp y teléfono.",
    }),
  component: BlogIndex,
});

const fmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" });

function BlogIndex() {
  const [first, ...rest] = posts;
  return (
    <SiteLayout>
      <PageHero eyebrow="Blog" title="Guías para crear mejores asistentes" lead="Ideas prácticas sobre instrucciones, conocimiento y canales." />
      <section className="py-14 md:py-20">
        <div className="container-page space-y-6">
          <Link to="/blog/$slug" params={{ slug: first.slug }} className="surface-card interactive-lift group block p-8 md:p-10">
            <div className="flex items-center gap-3 text-[13px] text-muted-foreground">
              <Badge>{first.category}</Badge>
              <span>{fmt.format(new Date(first.date))}</span>
              <span>· {first.readingMinutes} min</span>
            </div>
            <h2 className="mt-5 max-w-3xl text-2xl font-semibold leading-tight md:text-3xl">{first.title}</h2>
            <p className="mt-3 max-w-2xl text-[16px] text-muted-foreground">{first.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary-strong">
              Leer artículo <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="surface-card interactive-lift group flex flex-col p-7">
                <div className="flex items-center gap-3 text-[13px] text-muted-foreground">
                  <Badge variant="secondary">{p.category}</Badge>
                  <span>{fmt.format(new Date(p.date))}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 flex-1 text-[15px] text-muted-foreground">{p.excerpt}</p>
                <span className="mt-5 text-[13px] text-muted-foreground">{p.readingMinutes} min de lectura</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
