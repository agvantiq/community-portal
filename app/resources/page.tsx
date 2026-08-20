"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { ResourceCard } from "@/components/resource-card";
import { useRole } from "@/components/shell/role-provider";
import { RESOURCE_CENTER_ITEMS, SALES_CATEGORIES, type SalesCategory } from "@/lib/developer-data";
import { Search, BookOpen, ChevronRight } from "lucide-react";

type SortOption = "featured" | "newest" | "oldest" | "az" | "za";

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  newest: "Date (newest first)",
  oldest: "Date (oldest first)",
  az: "Alphabetical (A–Z)",
  za: "Alphabetical (Z–A)",
};

export default function ResourcesPage() {
  const { role } = useRole();
  const [query, setQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<SalesCategory | "all">("all");
  const [sort, setSort] = React.useState<SortOption>("featured");

  const filtered = RESOURCE_CENTER_ITEMS.filter((r) => {
    const matchesQuery = `${r.title} ${r.description}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryFilter === "all" || r.salesCategory === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  if (sort === "newest") filtered.sort((a, b) => b.date.localeCompare(a.date));
  if (sort === "oldest") filtered.sort((a, b) => a.date.localeCompare(b.date));
  if (sort === "az") filtered.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "za") filtered.sort((a, b) => b.title.localeCompare(a.title));

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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources..."
              className="pl-9"
            />
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-full sm:w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                <SelectItem key={option} value={option}>
                  {SORT_LABELS[option]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge asChild variant={categoryFilter === "all" ? "default" : "secondary"}>
            <button type="button" onClick={() => setCategoryFilter("all")}>
              All
            </button>
          </Badge>
          {SALES_CATEGORIES.map((category) => (
            <Badge key={category} asChild variant={categoryFilter === category ? "default" : "secondary"}>
              <button type="button" onClick={() => setCategoryFilter(category)}>
                {category}
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
