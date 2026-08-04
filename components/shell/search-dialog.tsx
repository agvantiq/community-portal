"use client";

import * as React from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FORUM_POSTS, COURSE_CATALOG } from "@/lib/sample-data";
import { RESOURCE_CENTER_ITEMS } from "@/lib/developer-data";
import { ArrowRight, BookOpen, FileText, MessagesSquare, Search } from "lucide-react";

type Category = "documentation" | "resources" | "articles" | "lessons";
type SortKey = "relevant" | "latest" | "alphabetical";

interface ResultItem {
  id: string;
  category: Category;
  title: string;
  snippet: string;
  href: string;
  tags: string[];
  meta: string;
  sortDate?: number;
}

const CATEGORY_LABEL: Record<Category, string> = {
  documentation: "Documentation",
  resources: "Resources",
  articles: "Articles",
  lessons: "Lessons",
};

const CATEGORY_ICON: Record<Category, React.ComponentType<{ className?: string }>> = {
  documentation: FileText,
  resources: FileText,
  articles: MessagesSquare,
  lessons: BookOpen,
};

const SORT_LABEL: Record<SortKey, string> = {
  relevant: "Relevant",
  latest: "Latest",
  alphabetical: "Alphabetical",
};

// FORUM_POSTS' timeAgo is a relative string ("2h ago") rather than a real
// timestamp — approximate it to an epoch offset so "Latest" sort still does
// something sensible.
function parseTimeAgo(timeAgo: string): number {
  const now = Date.now();
  const hours = timeAgo.match(/(\d+)h/);
  const days = timeAgo.match(/(\d+)d/);
  if (hours) return now - parseInt(hours[1], 10) * 60 * 60 * 1000;
  if (days) return now - parseInt(days[1], 10) * 24 * 60 * 60 * 1000;
  return now;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, query }: { text: string; query: string }) {
  const trimmed = query.trim();
  if (!trimmed) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegExp(trimmed)})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === trimmed.toLowerCase() ? (
          <mark key={i} className="rounded-sm bg-emphasis/30 px-0.5 text-foreground">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

function matchesQuery(item: ResultItem, query: string) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;
  const haystack = `${item.title} ${item.snippet} ${item.tags.join(" ")}`.toLowerCase();
  return haystack.includes(trimmed);
}

function sortItems(items: ResultItem[], sort: SortKey, query: string) {
  const q = query.trim().toLowerCase();
  const copy = [...items];
  if (sort === "latest") {
    copy.sort((a, b) => (b.sortDate ?? 0) - (a.sortDate ?? 0));
  } else if (sort === "alphabetical") {
    copy.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Relevant: title matches outrank snippet/tag-only matches; ties keep source order.
    copy.sort((a, b) => {
      const aScore = a.title.toLowerCase().includes(q) ? 1 : 0;
      const bScore = b.title.toLowerCase().includes(q) ? 1 : 0;
      return bScore - aScore;
    });
  }
  return copy;
}

function buildItems(): Record<Category, ResultItem[]> {
  const documentation: ResultItem[] = RESOURCE_CENTER_ITEMS.filter(
    (r) => r.category === "Documentation"
  ).map((r) => ({
    id: r.id,
    category: "documentation",
    title: r.title,
    snippet: r.description,
    href: r.href,
    tags: [r.type],
    meta: r.type,
  }));

  const resources: ResultItem[] = RESOURCE_CENTER_ITEMS.filter(
    (r) => r.category !== "Documentation"
  ).map((r) => ({
    id: r.id,
    category: "resources",
    title: r.title,
    snippet: r.description,
    href: r.href,
    tags: [r.type],
    meta: r.category,
  }));

  const articles: ResultItem[] = FORUM_POSTS.map((p) => ({
    id: p.id,
    category: "articles",
    title: p.title,
    snippet: p.description,
    href: `/forum/${p.id}`,
    tags: p.tags,
    meta: `${p.author} · ${p.timeAgo}`,
    sortDate: parseTimeAgo(p.timeAgo),
  }));

  const lessons: ResultItem[] = COURSE_CATALOG.map((c) => ({
    id: c.id,
    category: "lessons",
    title: c.title,
    snippet: c.description,
    href: "/academy/courses",
    tags: c.tags,
    meta: `${c.level} · ${c.duration}`,
  }));

  return {
    documentation,
    resources,
    articles,
    lessons,
  };
}

export function SearchDialog({
  open,
  onOpenChange,
  initialQuery = "",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialQuery?: string;
}) {
  const [query, setQuery] = React.useState(initialQuery);
  const [tab, setTab] = React.useState<"all" | Category>("all");
  const [sort, setSort] = React.useState<SortKey>("relevant");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      setQuery(initialQuery);
      setTab("all");
      setSort("relevant");
      // Focus after the open animation mounts the input.
      const id = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }
  }, [open, initialQuery]);

  const itemsByCategory = React.useMemo(buildItems, []);

  const allItems = React.useMemo(
    () => (Object.keys(itemsByCategory) as Category[]).flatMap((c) => itemsByCategory[c]),
    [itemsByCategory]
  );

  const matchesByCategory = React.useMemo(() => {
    const entries = (Object.keys(itemsByCategory) as Category[]).map(
      (category) => [category, itemsByCategory[category].filter((item) => matchesQuery(item, query))] as const
    );
    return Object.fromEntries(entries) as Record<Category, ResultItem[]>;
  }, [itemsByCategory, query]);

  const activeMatches = tab === "all" ? allItems.filter((item) => matchesQuery(item, query)) : matchesByCategory[tab];
  const results = sortItems(activeMatches, sort, query);

  const totalMatches = (Object.keys(CATEGORY_LABEL) as Category[]).reduce(
    (sum, category) => sum + matchesByCategory[category].length,
    0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="top-[10%] flex max-h-[78vh] w-full max-w-2xl translate-y-0 flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl"
      >
        <DialogTitle className="sr-only">Search the community portal</DialogTitle>
        <div className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the community portal..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xs text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none"
          >
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="shrink-0 border-b border-border px-4 py-2.5">
          <Tabs value={tab} onValueChange={(v) => setTab(v as "all" | Category)}>
            <TabsList
              className="h-auto w-full justify-start gap-1.5 overflow-x-auto rounded-none bg-transparent p-0 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              <TabsTrigger
                value="all"
                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-none transition-colors hover:bg-primary/10 hover:text-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
              >
                All
              </TabsTrigger>
              {(Object.keys(CATEGORY_LABEL) as Category[]).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-none transition-colors hover:bg-primary/10 hover:text-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                >
                  {CATEGORY_LABEL[category]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {query.trim() && (
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-2.5">
            <span className="text-xs text-muted-foreground">
              {totalMatches} result{totalMatches === 1 ? "" : "s"}
            </span>

            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="w-fit gap-1.5 border-none bg-transparent px-1 shadow-none font-semibold text-foreground hover:bg-accent focus-visible:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {(Object.keys(SORT_LABEL) as SortKey[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {SORT_LABEL[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {!query.trim() ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              Search documentation, resources, articles, and lessons across the portal.
            </p>
          ) : results.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              No results match &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : (
            <div className="divide-y divide-border px-4">
              {results.map((item) => {
                const Icon = CATEGORY_ICON[item.category];
                return (
                  <Link
                    key={`${item.category}-${item.id}`}
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className="flex items-start gap-3 py-3.5 first:pt-3 hover:bg-accent/50"
                  >
                    <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Highlight text={item.title} query={query} />
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {CATEGORY_LABEL[item.category]}
                        {item.meta && ` · ${item.meta}`}
                      </p>
                      {item.snippet && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          <Highlight text={item.snippet} query={query} />
                        </p>
                      )}
                      {item.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-[10px]">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
