"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { useRole } from "@/components/shell/role-provider";
import {
  FEATURED_COUNT,
  RESOURCE_FOLDERS,
  SALES_RESOURCES,
  type ResourceFolder,
  type SalesResource,
} from "@/lib/sales-resources";
import { Search } from "lucide-react";

// Mirrors the library at community.vantiq.com/resources (see lib/sales-resources.ts):
// its nine folders, its Featured Content tab and its four sort orders. Cards show
// the folder and title only (size and date stay in the data — dates still drive
// the Newest / Oldest sort). Every card opens that file's page on the live site
// in a new tab.

type SortOption = "newest" | "oldest" | "az" | "za";
type Filter = "all" | "featured" | ResourceFolder;

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  oldest: "Oldest",
  az: "Name A–Z",
  za: "Name Z–A",
};

const PAGE_SIZE = 30;

const FOLDER_COUNTS = Object.fromEntries(
  RESOURCE_FOLDERS.map((f) => [f, SALES_RESOURCES.filter((r) => r.folder === f).length]),
) as Record<ResourceFolder, number>;

function ResourceTile({ resource }: { resource: SalesResource }) {
  return (
    <a href={resource.href} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="shadow-card h-full gap-0 p-5 transition-colors hover:border-primary">
        {resource.folder && (
          <Badge variant="secondary" className="mb-3 self-start bg-primary/10 text-primary">
            {resource.folder}
          </Badge>
        )}
        <p className="text-sm font-medium text-foreground">{resource.title}</p>
      </Card>
    </a>
  );
}

export default function SalesResourcesPage() {
  const { role } = useRole();
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<Filter>("all");
  const [sort, setSort] = React.useState<SortOption>("newest");
  const [visible, setVisible] = React.useState(PAGE_SIZE);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = SALES_RESOURCES.filter((r) => {
      const matchesQuery = !q || r.title.toLowerCase().includes(q);
      const matchesFilter = filter === "all" || (filter === "featured" ? r.featured : r.folder === filter);
      return matchesQuery && matchesFilter;
    });
    if (sort === "newest") list.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === "oldest") list.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") list.sort((a, b) => b.title.localeCompare(a.title));
    return list;
  }, [query, filter, sort]);

  const chooseFilter = (next: Filter) => {
    setFilter(next);
    setVisible(PAGE_SIZE);
  };

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: SALES_RESOURCES.length },
    { id: "featured", label: "Featured", count: FEATURED_COUNT },
    ...RESOURCE_FOLDERS.map((f) => ({ id: f as Filter, label: f, count: FOLDER_COUNTS[f] })),
  ];

  return (
    <div className="space-y-6">
      <PageHero
        title="Sales Resources"
        description="Data sheets, white papers, use cases, presentations, demo videos and competitive analysis — the materials you need to talk about Vantiq."
      >
        {role !== "onboarding" && (
          <BookmarkButton
            item={{ id: "/resources", label: "Sales Resources", href: "/resources", iconKey: "Library" }}
            className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          />
        )}
      </PageHero>

      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              placeholder="Search sales resources..."
              className="pl-9"
            />
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-full sm:w-44">
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
          {chips.map((chip) => (
            <Badge key={chip.id} asChild variant={filter === chip.id ? "default" : "secondary"}>
              <button type="button" onClick={() => chooseFilter(chip.id)}>
                {chip.label} ({chip.count})
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Hmm, no matches here — try a different search or filter.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, visible).map((r) => (
              <ResourceTile key={r.href} resource={r} />
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground">
              Showing {Math.min(visible, filtered.length)} of {filtered.length}
            </p>
            {visible < filtered.length && (
              <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                Show more
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
