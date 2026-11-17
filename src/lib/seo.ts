/** Builds per-route head() meta. Each content route must call this with unique copy. */
export function seo({ title, description }: { title: string; description: string }) {
  const full = title.includes("CONVERSAAI") ? title : `${title} · CONVERSAAI`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: full },
      { name: "twitter:description", content: description },
    ],
  };
}
