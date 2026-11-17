import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getLegal, legalPages } from "@/content/legal";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/legal/$slug")({
  loader: ({ params }) => {
    const page = getLegal(params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo({ title: loaderData.page.title, description: `${loaderData.page.title} de CONVERSAAI.` })
      : { meta: [{ title: "Página no encontrada · CONVERSAAI" }, { name: "robots", content: "noindex" }] },
  component: LegalView,
});

const fmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" });

function LegalView() {
  const { page } = Route.useLoaderData();
  return (
    <SiteLayout>
      <div className="container-page grid gap-10 py-14 md:grid-cols-[200px_1fr] md:py-20">
        <nav className="space-y-0.5 md:sticky md:top-24 md:self-start">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Legal</p>
          {legalPages.map((l) => (
            <Link
              key={l.slug}
              to="/legal/$slug"
              params={{ slug: l.slug }}
              className={cn(
                "block rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground",
                l.slug === page.slug && "bg-secondary font-medium text-foreground",
              )}
            >
              {l.title}
            </Link>
          ))}
        </nav>
        <article className="max-w-3xl">
          <h1 className="text-3xl font-semibold md:text-4xl">{page.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Última actualización: {fmt.format(new Date(page.updated))}</p>
          <div className="prose-content mt-8" dangerouslySetInnerHTML={{ __html: page.html }} />
        </article>
      </div>
    </SiteLayout>
  );
}
