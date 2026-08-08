"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { ResourceCard } from "@/components/resource-card";
import { useRole } from "@/components/shell/role-provider";
import {
  RESOURCE_CENTER_ITEMS,
  type ResourceItem,
  type ResourceType,
} from "@/lib/developer-data";
import { Search, Rocket, ChevronRight } from "lucide-react";

// Only the categories that were confirmed present in the real Knowledge Base
// (Tutorials, Reference, Developer Guides, Style Guides, Best Practices,
// Performance, How-to Videos) plus a couple of standalone entries with no
// other home (Getting Started, Architecture articles). Each of those
// categories' arrays in lib/developer-data.ts leads with a couple of
// representative, unconfirmed entries before the confirmed-real ones — sliced
// off here so this page shows only what was actually seen, nothing invented.
// Release Notes is its own single link out (see below), not part of this grid.
const KNOWLEDGE_BASE_ITEMS_BASE: ResourceItem[] = [
  ...RESOURCE_CENTER_ITEMS.filter((r) => r.category === "Tutorials").slice(4),
  ...RESOURCE_CENTER_ITEMS.filter((r) => r.category === "VAIL Reference").slice(3),
  ...["Domain and Multi-Domain Integration with Vantiq", "Event Driven Integration", "Event Driven Thinking", "Supporting Semantic Search"].map(
    (title) => ({
      id: `architecture-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
      title,
      description: "",
      type: "Article" as ResourceType,
      category: "Architecture",
      href: "/developer-center/architecture",
    })
  ),
  ...RESOURCE_CENTER_ITEMS.filter((r) => r.category === "Dev Guides").slice(3),
  ...RESOURCE_CENTER_ITEMS.filter((r) => r.category === "Style Guides").slice(3),
  ...RESOURCE_CENTER_ITEMS.filter((r) => r.category === "Best Practices").slice(3),
  ...RESOURCE_CENTER_ITEMS.filter((r) => r.category === "Performance").slice(3),
  ...RESOURCE_CENTER_ITEMS.filter((r) => r.category === "How-to Videos").slice(4),
];

// Analytics has a real, written-up detail page (see resource-detail-client.tsx)
// — surfaced first so it's easy to find rather than buried wherever it fell
// in the Tutorials category order.
const KNOWLEDGE_BASE_ITEMS: ResourceItem[] = [
  ...KNOWLEDGE_BASE_ITEMS_BASE.filter((r) => r.id === "tutorials-analytics"),
  ...KNOWLEDGE_BASE_ITEMS_BASE.filter((r) => r.id !== "tutorials-analytics"),
];

// Tab label vs. the underlying category value — kept separate so the tab can
// read friendlier ("Reference") than the fuller category name on each card
// ("VAIL Reference").
const KB_TABS: { label: string; category: string }[] = [
  { label: "Getting Started", category: "Getting Started" },
  { label: "Tutorials", category: "Tutorials" },
  { label: "Reference", category: "VAIL Reference" },
  { label: "Architecture", category: "Architecture" },
  { label: "Developer Guides", category: "Dev Guides" },
  { label: "Style Guides", category: "Style Guides" },
  { label: "Best Practices", category: "Best Practices" },
  { label: "Performance", category: "Performance" },
  { label: "How to Videos", category: "How-to Videos" },
];

export default function KnowledgeBasePage() {
  const { role } = useRole();
  const [query, setQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");

  const filtered = KNOWLEDGE_BASE_ITEMS.filter((r) => {
    const matchesQuery = `${r.title} ${r.description}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryFilter === "all" || r.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/developer-center" className="hover:text-foreground">
            &larr; Developer Hub
          </Link>
        }
        title="Knowledge Base"
        description="Getting-started tutorials, product documentation, and technical articles for building on Vantiq."
      >
        {role !== "onboarding" && (
          <BookmarkButton
            item={{
              id: "/resources/knowledge-base",
              label: "Knowledge Base",
              href: "/resources/knowledge-base",
              iconKey: "Library",
            }}
            className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          />
        )}
      </PageHero>

      <Link href="/developer-center/release-notes" className="inline-flex">
        <Card className="shadow-card flex-row items-center gap-3 py-3 pr-4 pl-3 transition-colors hover:border-primary">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-emphasis/10 text-emphasis">
            <Rocket className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">Release Notes</p>
            <p className="text-xs text-muted-foreground">Version-by-version changes, fixes, and new capabilities.</p>
          </div>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </Card>
      </Link>

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the knowledge base..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge asChild variant={categoryFilter === "all" ? "default" : "secondary"}>
            <button type="button" onClick={() => setCategoryFilter("all")}>
              All
            </button>
          </Badge>
          {KB_TABS.map((tab) => (
            <Badge key={tab.category} asChild variant={categoryFilter === tab.category ? "default" : "secondary"}>
              <button type="button" onClick={() => setCategoryFilter(tab.category)}>
                {tab.label}
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Hmm, no matches here — try a different search or filter.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r, i) => (
            // Same top-row-opens-its-own-page pilot as /resources — see the
            // comment there.
            <ResourceCard
              key={r.id}
              resource={i < 3 ? { ...r, href: `/resources/${r.id}` } : r}
            />
          ))}
        </div>
      )}
    </div>
  );
}
