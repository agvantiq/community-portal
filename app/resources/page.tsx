"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { ResourceCard } from "@/components/resource-card";
import { useRole } from "@/components/shell/role-provider";
import { RESOURCE_CENTER_ITEMS, RESOURCE_TYPES, type ResourceType } from "@/lib/developer-data";
import { Search, BookOpen, ChevronRight } from "lucide-react";

export default function ResourcesPage() {
  const { role } = useRole();
  const [query, setQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<ResourceType | "all">("all");

  const filtered = RESOURCE_CENTER_ITEMS.filter((r) => {
    const matchesQuery = `${r.title} ${r.description}`.toLowerCase().includes(query.toLowerCase());
    const matchesType = typeFilter === "all" || r.type === typeFilter;
    return matchesQuery && matchesType;
  });

  return (
    <div className="space-y-6">
      <PageHero
        title="Resources"
        description="Every knowledge base article, guide, reference, video, and template for building on Vantiq, in one comprehensive, searchable catalog."
      >
        {role !== "onboarding" && (
          <BookmarkButton
            item={{ id: "/resources", label: "Resources", href: "/resources", iconKey: "Library" }}
            className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          />
        )}
      </PageHero>

      <Link href="/resources/reference" className="inline-flex">
        <Card className="shadow-card flex-row items-center gap-3 py-3 pr-4 pl-3 transition-colors hover:border-primary">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-emphasis/10 text-emphasis">
            <BookOpen className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">Glossary</p>
            <p className="text-xs text-muted-foreground">Quick definitions for core platform concepts.</p>
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
            placeholder="Search resources..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge asChild variant={typeFilter === "all" ? "default" : "secondary"}>
            <button type="button" onClick={() => setTypeFilter("all")}>
              All
            </button>
          </Badge>
          {RESOURCE_TYPES.map((type) => (
            <Badge key={type} asChild variant={typeFilter === type ? "default" : "secondary"}>
              <button type="button" onClick={() => setTypeFilter(type)}>
                {type}
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
            // The top row (first 3 — one full row at the lg:grid-cols-3
            // breakpoint) opens its own dedicated page at /resources/[id]
            // instead of the shared category page every other card still
            // uses — a design-template pilot for a per-item detail page
            // pattern other engineers can extend to the rest of the catalog.
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
