import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { DocsShell } from "@/components/site/DocsShell";
import { getDoc } from "@/content/docs";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/docs/$slug")({
  loader: ({ params }) => {
    const doc = getDoc(params.slug);
    if (!doc) throw notFound();
    return { doc };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo({ title: `${loaderData.doc.title} — Documentación`, description: loaderData.doc.summary })
      : { meta: [{ title: "Página no encontrada · CONVERSAAI" }, { name: "robots", content: "noindex" }] },
  component: DocPage,
});

function DocPage() {
  const { doc } = Route.useLoaderData();
  return (
    <SiteLayout>
      <DocsShell active={doc.slug}>
        <article className="max-w-3xl">
          <p className="eyebrow">{doc.section}</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{doc.title}</h1>
          <p className="mt-3 text-[17px] text-muted-foreground">{doc.summary}</p>
          <div className="prose-content mt-8" dangerouslySetInnerHTML={{ __html: doc.html }} />
        </article>
      </DocsShell>
    </SiteLayout>
  );
}
