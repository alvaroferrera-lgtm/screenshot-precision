import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { docs } from "@/content/docs";
import { cn } from "@/lib/utils";

export function DocsShell({ active, children }: { active?: string; children: ReactNode }) {
  const sections = Array.from(new Set(docs.map((d) => d.section)));
  return (
    <div className="container-page grid gap-10 py-12 md:grid-cols-[220px_1fr] md:py-16">
      <aside className="md:sticky md:top-24 md:self-start">
        <Link to="/docs" className="font-display text-sm font-semibold">Documentación</Link>
        <nav className="mt-5 space-y-6">
          {sections.map((s) => (
            <div key={s}>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{s}</p>
              <ul className="mt-2 space-y-0.5">
                {docs
                  .filter((d) => d.section === s)
                  .map((d) => (
                    <li key={d.slug}>
                      <Link
                        to="/docs/$slug"
                        params={{ slug: d.slug }}
                        className={cn(
                          "block rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                          active === d.slug && "bg-secondary font-medium text-foreground",
                        )}
                      >
                        {d.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
