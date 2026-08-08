"use client";

/**
 * DESIGN TEMPLATE — per-item resource detail page.
 *
 * Only the top row of /resources and /resources/knowledge-base (the first 3
 * cards in the grid) link here instead of to their shared category listing
 * page (e.g. /developer-center/documentation) — a pilot for a "one page per
 * catalog item" pattern. To extend it to more cards, give the item its own
 * href of `/resources/${item.id}` at the call site (see app/resources/page.tsx
 * and app/resources/knowledge-base/page.tsx) — this template already resolves
 * any id in RESOURCE_CENTER_ITEMS via lib/developer-data.ts#getResourceById,
 * no further wiring needed here.
 */

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { useRole } from "@/components/shell/role-provider";
import { RESOURCE_CENTER_ITEMS, RESOURCE_TYPE_STYLE, type ResourceItem } from "@/lib/developer-data";
import { RESOURCE_ARTICLES } from "@/lib/resource-articles";
import { ChevronRight, Github } from "lucide-react";

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;
const TRAILING_PUNCTUATION = /[.,;:!?)]+$/;

/** Turns bare URLs in plain-text article copy into real links, nothing else. */
function Linkified({ text }: { text: string }) {
  const parts = text.split(URL_PATTERN);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return <React.Fragment key={i}>{part}</React.Fragment>;
        // Odd indices are the captured URLs — trim any sentence punctuation
        // that got swept in (e.g. the period ending "...analysis-3.").
        const trailingMatch = part.match(TRAILING_PUNCTUATION);
        const trailing = trailingMatch ? trailingMatch[0] : "";
        const url = trailing ? part.slice(0, -trailing.length) : part;
        return (
          <React.Fragment key={i}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
              {url}
            </a>
            {trailing}
          </React.Fragment>
        );
      })}
    </>
  );
}

// One-off for the Extension Sources overview — recreated from the source
// article's architecture diagram in the portal's own tokens rather than the
// original's raw red/green screenshot.
function EnterpriseConnectorDiagram() {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-md border border-border bg-muted p-6">
      <div className="rounded-md bg-secondary px-3 py-2 text-center text-xs font-semibold text-foreground">
        Front Data
        <br />
        Source
      </div>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
      <div className="rounded-md border-1.5 border-primary bg-card px-3 py-2 text-center">
        <p className="text-xs font-semibold text-primary">Enterprise Connector</p>
        <p className="mt-0.5 max-w-[140px] text-[10px] font-normal text-muted-foreground">
          Running on-premise or separate domain
        </p>
      </div>
      <div className="flex flex-col items-center px-1">
        <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">WebSocket</span>
      </div>
      <div className="flex flex-col items-center gap-1.5 rounded-md border border-dashed border-primary p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">VANTIQ (e.g. dev.vantiq.com)</p>
        <div className="flex gap-1.5">
          <div className="rounded bg-accent px-2.5 py-1.5 text-[11px] font-medium text-foreground">Source</div>
          <div className="rounded bg-accent px-2.5 py-1.5 text-center text-[11px] font-medium text-foreground">
            Rules /<br />
            Procedures
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResourceDetailClient({ resource }: { resource: ResourceItem }) {
  const router = useRouter();
  const { role } = useRole();
  const article = RESOURCE_ARTICLES[resource.id];

  // A handful of other items in the same category — real catalog data, not
  // fabricated related-content. They still go to the shared category page,
  // since only this item has its own detail page for now.
  const related = RESOURCE_CENTER_ITEMS.filter(
    (r) => r.category === resource.category && r.id !== resource.id
  ).slice(0, 4);

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          // Context-aware back nav, not a hardcoded destination — this
          // template is reached from both /resources and
          // /resources/knowledge-base, and should return wherever the
          // partner actually came from. Same pattern as the course step
          // detail page. The label names whichever grid actually links here
          // (see ResourceArticle.backLabel) rather than assuming Resources.
          <button type="button" onClick={() => router.back()} className="hover:text-foreground">
            &larr; {article?.backLabel ?? "Resources"}
          </button>
        }
        title={resource.title}
        description={article?.subtitle ?? resource.description ?? undefined}
      >
        {role !== "onboarding" && (
          <BookmarkButton
            item={{
              id: `/resources/${resource.id}`,
              label: resource.title,
              href: `/resources/${resource.id}`,
              iconKey: "Library",
            }}
            className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          />
        )}
      </PageHero>

      {article ? (
        <Card className="shadow-card p-6 sm:p-8">
          {article.sections.map((section, i) => (
            <div key={section.heading} className={i > 0 ? "mt-8 border-t border-border pt-8" : undefined}>
              <h2 className="text-base font-semibold text-foreground">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>
                    <Linkified text={p} />
                  </p>
                ))}
              </div>
              {section.list && (
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                  {section.list.map((item) => (
                    <li key={item.term}>
                      <span className="font-medium text-foreground">{item.term}</span> &mdash; {item.detail}
                    </li>
                  ))}
                </ul>
              )}
              {resource.id === "extension-sources" && section.heading === "Enterprise Connectors Overview" && (
                <EnterpriseConnectorDiagram />
              )}
              {section.code && (
                <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-muted p-4 font-mono text-xs text-foreground">
                  {section.code}
                </pre>
              )}
              {section.link && (
                <a
                  href={section.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  <Github className="size-4 shrink-0" />
                  {section.link.label}
                </a>
              )}
            </div>
          ))}
        </Card>
      ) : (
        <>
          <Card className="shadow-card grid grid-cols-1 divide-y divide-border p-0 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="flex flex-col items-center justify-center gap-1.5 p-5 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Type</p>
              <Badge variant="secondary" className={RESOURCE_TYPE_STYLE[resource.type]}>
                {resource.type}
              </Badge>
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5 p-5 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Category</p>
              <Badge variant="secondary">{resource.category}</Badge>
            </div>
          </Card>

          {related.length > 0 && (
            <Card className="shadow-card p-6">
              <h2 className="mb-4 text-sm font-medium text-foreground">More in {resource.category}</h2>
              <div className="space-y-2">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={r.href}
                    className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
                  >
                    <span className="min-w-0 truncate text-sm font-medium text-foreground">{r.title}</span>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
