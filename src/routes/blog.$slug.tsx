import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaBand } from "@/components/site/blocks";
import { getPost } from "@/content/blog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo({ title: loaderData.post.title, description: loaderData.post.excerpt })
      : { meta: [{ title: "Artículo no encontrado · CONVERSAAI" }, { name: "robots", content: "noindex" }] },
  component: PostPage,
});

const fmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" });

function PostPage() {
  const { post } = Route.useLoaderData();
  return (
    <SiteLayout>
      <article className="container-page max-w-3xl py-14 md:py-20">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Blog
        </Link>
        <p className="eyebrow mt-8">{post.category}</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-[2.6rem]">{post.title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {fmt.format(new Date(post.date))} · {post.readingMinutes} min de lectura
        </p>
        <div className="prose-content mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <CtaBand />
    </SiteLayout>
  );
}
