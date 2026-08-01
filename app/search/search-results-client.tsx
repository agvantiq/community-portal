"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PageHero } from "@/components/page-hero";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FORUM_POSTS, COURSE_CATALOG } from "@/lib/sample-data";
import { COMMUNITY_EVENTS } from "@/lib/community-data";
import { useEventComments } from "@/lib/event-comments";
import { Plus } from "lucide-react";

type Category = "posts" | "comments" | "lessons" | "events";
type SortKey = "relevance" | "latest" | "oldest" | "alphabetical";

interface ResultItem {
  id: string;
  title: string;
  snippet: string;
  href: string;
  tags: string[];
  meta: string;
  sortDate?: number;
}

const CATEGORY_LABEL: Record<Category, string> = {
  posts: "Posts",
  comments: "Comments",
  lessons: "Lessons",
  events: "Events",
};

const SORT_LABEL: Record<SortKey, string> = {
  relevance: "Relevance",
  latest: "Latest",
  oldest: "Oldest",
  alphabetical: "Alphabetical",
};

// FORUM_POSTS' timeAgo is a relative string ("2h ago") rather than a real
// timestamp — approximate it to an epoch offset so "Latest"/"Oldest" sort
// still does something sensible.
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
          <mark key={i} className="rounded-sm bg-warning/30 px-0.5 text-foreground">
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
  } else if (sort === "oldest") {
    copy.sort((a, b) => (a.sortDate ?? Infinity) - (b.sortDate ?? Infinity));
  } else if (sort === "alphabetical") {
    copy.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Relevance: title matches outrank snippet/tag-only matches; ties keep source order.
    copy.sort((a, b) => {
      const aScore = a.title.toLowerCase().includes(q) ? 1 : 0;
      const bScore = b.title.toLowerCase().includes(q) ? 1 : 0;
      return bScore - aScore;
    });
  }
  return copy;
}

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const { comments: eventComments } = useEventComments();

  const [tab, setTab] = React.useState<Category>("posts");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [sort, setSort] = React.useState<SortKey>("relevance");

  React.useEffect(() => {
    setSelectedTags([]);
  }, [tab]);

  const itemsByCategory = React.useMemo<Record<Category, ResultItem[]>>(() => {
    const posts: ResultItem[] = FORUM_POSTS.map((p) => ({
      id: p.id,
      title: p.title,
      snippet: p.description,
      href: `/forum/${p.id}`,
      tags: p.tags,
      meta: `${p.author} · ${p.timeAgo}`,
      sortDate: parseTimeAgo(p.timeAgo),
    }));

    const comments: ResultItem[] = eventComments.map((c) => {
      const event = COMMUNITY_EVENTS.find((e) => e.id === c.eventId);
      return {
        id: c.id,
        title: event ? event.title : "Event discussion",
        snippet: c.body,
        href: `/forum/events/${c.eventId}`,
        tags: event ? [event.type] : [],
        meta: `${c.authorName} · ${new Date(c.createdAt).toLocaleDateString()}`,
        sortDate: new Date(c.createdAt).getTime(),
      };
    });

    const lessons: ResultItem[] = COURSE_CATALOG.map((c) => ({
      id: c.id,
      title: c.title,
      snippet: c.description,
      href: "/academy/courses",
      tags: c.tags,
      meta: `${c.level} · ${c.duration}`,
    }));

    const events: ResultItem[] = COMMUNITY_EVENTS.map((e) => ({
      id: e.id,
      title: e.title,
      snippet: e.description,
      href: `/forum/events/${e.id}`,
      tags: [e.type],
      meta: `${e.type} · ${new Date(e.date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`,
      sortDate: new Date(e.date).getTime(),
    }));

    return { posts, comments, lessons, events };
  }, [eventComments]);

  const matchesByCategory = React.useMemo(() => {
    const entries = Object.entries(itemsByCategory) as [Category, ResultItem[]][];
    return Object.fromEntries(
      entries.map(([category, items]) => [category, items.filter((item) => matchesQuery(item, query))])
    ) as Record<Category, ResultItem[]>;
  }, [itemsByCategory, query]);

  const activeMatches = matchesByCategory[tab];
  const availableTags = Array.from(new Set(activeMatches.flatMap((item) => item.tags))).sort();
  const tagFiltered =
    selectedTags.length === 0
      ? activeMatches
      : activeMatches.filter((item) => selectedTags.every((tag) => item.tags.includes(tag)));
  const results = sortItems(tagFiltered, sort, query);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  const totalMatches = (Object.keys(CATEGORY_LABEL) as Category[]).reduce(
    (sum, category) => sum + matchesByCategory[category].length,
    0
  );

  return (
    <div className="space-y-6">
      <PageHero
        title={
          query.trim() ? (
            <>Search results for &ldquo;{query.trim()}&rdquo;</>
          ) : (
            "Search"
          )
        }
        description={
          query.trim()
            ? `${totalMatches} result${totalMatches === 1 ? "" : "s"} across posts, comments, lessons, and events.`
            : "Use the search bar above to search posts, comments, lessons, and events across the portal."
        }
      />

      {query.trim() && (
        <>
          <Tabs value={tab} onValueChange={(v) => setTab(v as Category)}>
            <TabsList className="h-auto w-full justify-start gap-6 rounded-none border-b border-border bg-transparent p-0">
              {(Object.keys(CATEGORY_LABEL) as Category[]).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  {CATEGORY_LABEL[category]}{" "}
                  <span className="ml-1 text-xs">{matchesByCategory[category].length}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 rounded-full">
                  <Plus className="size-3.5" />
                  Tags
                  {selectedTags.length > 0 && ` (${selectedTags.length})`}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-56 p-2">
                {availableTags.length === 0 ? (
                  <p className="p-2 text-xs text-muted-foreground">No tags for this category.</p>
                ) : (
                  <div className="space-y-1">
                    {availableTags.map((tag) => (
                      <label
                        key={tag}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                      >
                        <Checkbox
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => toggleTag(tag)}
                        />
                        {tag}
                      </label>
                    ))}
                  </div>
                )}
              </PopoverContent>
            </Popover>

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

          <div className="divide-y divide-border">
            {results.map((item) => (
              <Link key={item.id} href={item.href} className="block py-5 first:pt-0">
                <p className="text-base font-semibold text-foreground">
                  <Highlight text={item.title} query={query} />
                </p>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                  <Highlight text={item.snippet} query={query} />
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  <span className="ml-auto text-xs text-muted-foreground">{item.meta}</span>
                </div>
              </Link>
            ))}
            {results.length === 0 && (
              <Card className="shadow-card p-10 text-center text-sm text-muted-foreground">
                No {CATEGORY_LABEL[tab].toLowerCase()} match &ldquo;{query.trim()}&rdquo;.
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}
