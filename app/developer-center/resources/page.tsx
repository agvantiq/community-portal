"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/page-hero";
import {
  RESOURCE_CENTER_ITEMS,
  RESOURCE_TYPES,
  RESOURCE_TYPE_STYLE,
  FEATURED_RESOURCE_IDS,
  type ResourceItem,
  type ResourceType,
} from "@/lib/developer-data";
import { Search } from "lucide-react";

const BROWSE_TYPES: ResourceType[] = ["Guide", "Video", "Tutorial", "Reference"];

function ResourceCard({ resource, featured = false }: { resource: ResourceItem; featured?: boolean }) {
  return (
    <Link href={resource.href}>
      <Card className="shadow-card h-full p-5 transition-colors hover:border-primary">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className={RESOURCE_TYPE_STYLE[resource.type]}>
            {resource.type}
          </Badge>
          {!featured && <span className="text-[11px] text-muted-foreground">{resource.category}</span>}
        </div>
        <p className={`mt-3 font-medium text-foreground ${featured ? "text-sm font-semibold" : "text-sm"}`}>
          {resource.title}
        </p>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{resource.description}</p>
      </Card>
    </Link>
  );
}

export default function ResourceCenterPage() {
  const [query, setQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<ResourceType | "all">("all");

  const featured = FEATURED_RESOURCE_IDS.map((id) => RESOURCE_CENTER_ITEMS.find((r) => r.id === id)).filter(
    (r): r is ResourceItem => !!r
  );

  const filtered = RESOURCE_CENTER_ITEMS.filter((r) => {
    const matchesQuery = `${r.title} ${r.description}`.toLowerCase().includes(query.toLowerCase());
    const matchesType = typeFilter === "all" || r.type === typeFilter;
    return matchesQuery && matchesType;
  });

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow={
          <Link href="/developer-center" className="hover:text-foreground">
            &larr; Developer Hub
          </Link>
        }
        title="Resource Center"
        description="Guides, references, videos, and templates for building on Vantiq — all in one place."
      />

      <div>
        <h2 className="mb-3 text-sm font-medium text-foreground">Featured Resources</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((r) => (
            <ResourceCard key={r.id} resource={r} featured />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-foreground">Browse by Type</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {BROWSE_TYPES.map((type) => {
            const count = RESOURCE_CENTER_ITEMS.filter((r) => r.type === type).length;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setTypeFilter(type)}
                className={`rounded-md border p-4 text-left transition-colors ${
                  typeFilter === type ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                }`}
              >
                <p className="text-sm font-medium text-foreground">{type}s</p>
                <p className="mt-1 text-xs text-muted-foreground">{count} resources</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:w-72">
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
            {filtered.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
