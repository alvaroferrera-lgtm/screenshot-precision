import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { DocsShell } from "@/components/site/DocsShell";
import { docs } from "@/content/docs";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/docs/")({
  head: () =>
    seo({
      title: "Documentación",
      description: "Aprende a crear asistentes, preparar la base de conocimiento, instalar el widget y gestionar tu equipo.",
    }),
  component: DocsIndex,
});

function DocsIndex() {
  return (
    <SiteLayout>
      <DocsShell>
        <p className="eyebrow">Documentación</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Aprende a usar CONVERSAAI</h1>
        <p className="mt-3 max-w-2xl text-[17px] text-muted-foreground">
          Guías breves para configurar tus asistentes y ponerlos en marcha.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {docs.map((d) => (
            <Link key={d.slug} to="/docs/$slug" params={{ slug: d.slug }} className="surface-card interactive-lift p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{d.section}</p>
              <h2 className="mt-2 text-[17px] font-semibold">{d.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{d.summary}</p>
            </Link>
          ))}
        </div>
      </DocsShell>
    </SiteLayout>
  );
}
