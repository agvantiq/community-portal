"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { type ResourceItem } from "@/lib/developer-data";
import { KNOWLEDGE_BASE_DOCS } from "@/lib/knowledge-base-data";
import {
  Search,
  ArrowLeft,
  Sparkles,
  Settings,
  Plug,
  Braces,
  LayoutTemplate,
  Layers,
  Workflow,
  ClipboardCheck,
  Tag,
  Palette,
  Boxes,
  Shapes,
  BarChart3,
  Rocket,
  Compass,
  Users,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

// --- Topic-first structure (2026-08-12, backfilled 2026-08-14) --------
// Replaces the old content-type grouping (Getting Started / Product
// Documentation / Articles) with a topic-first one: every item is grouped by
// what a developer is working on (AI, Client Development, Testing, ...)
// rather than by document type. This came out of a full audit of the real
// community.vantiq.com/docs/ tree: the old split couldn't hold a
// 14-subcategory Reference tree or a 23-item Tutorials list without the
// category cards visibly breaking, and a majority of items already share a
// topic across Tutorials/Reference/Best Practices (e.g. the "Assemblies"
// tutorial and the "Assemblies" reference guide).
//
// KNOWLEDGE_BASE_DOCS (lib/knowledge-base-data.ts) is the full 128-item
// backfill of that live audit — every title, href, and description fetched
// from the real page, already carrying its correct topic in `category`, so
// no title-matching table is needed here anymore (compare the older 48-item
// version of this file, which used a TOPIC_BY_TITLE lookup for a smaller,
// earlier-vintage subset).
const TOPICS = [
  "Get Started",
  "Client Development",
  "Concepts & Architecture",
  "AI & GenAI",
  "Collaboration",
  "Core Platform",
  "Assemblies",
  "Operations, Deployment & Admin",
  "External Sources & Integrations",
  "Service Development",
  "Catalog",
  "Design Modeler",
  "Analytics",
  "Testing",
  "Branding & White-Labeling",
] as const;

function topicFor(item: ResourceItem): string {
  return item.category;
}

function topicOrder(item: ResourceItem): number {
  const idx = TOPICS.indexOf(topicFor(item) as (typeof TOPICS)[number]);
  return idx === -1 ? TOPICS.length : idx;
}

// Inside a single topic (or a search result set), items are grouped by content
// type under their own headings. This is a *second-level* sort beneath the
// topic-first structure documented above — the topic cards stay topic-based;
// only the list you land on after picking one is split by type. The 2026-08-12
// note rejected type as the *top-level* grouping, because the category cards
// couldn't hold a 14-subcategory Reference tree or a 23-item Tutorials list.
// That objection doesn't apply here: within one topic the groups are small
// (the largest topic is 25 items across five types), and the topic cards are
// untouched.
//
// Ordering is learn -> do -> look up -> read -> watch, not alphabetical and
// not by count, so the sequence is stable as content is added. Unknown types
// sort last and fall back to their raw name as the heading.
const TYPE_ORDER = ["Tutorial", "Guide", "Reference", "Article", "Video"] as const;

const TYPE_HEADING: Record<string, string> = {
  Tutorial: "Tutorials",
  Guide: "Guides",
  Reference: "References",
  Article: "Articles",
  Video: "Videos",
};

function typeRank(type: string): number {
  const idx = TYPE_ORDER.indexOf(type as (typeof TYPE_ORDER)[number]);
  return idx === -1 ? TYPE_ORDER.length : idx;
}

function groupByType(items: ResourceItem[]): [string, ResourceItem[]][] {
  const groups = new Map<string, ResourceItem[]>();
  for (const item of items) {
    const bucket = groups.get(item.type);
    if (bucket) bucket.push(item);
    else groups.set(item.type, [item]);
  }
  return [...groups.entries()].sort((a, b) => typeRank(a[0]) - typeRank(b[0]));
}

// One icon + one-line description per topic — the real Echo KB template's
// card shape (icon, title, description, count). Icons are drawn from the
// same lucide-react set used everywhere else in the portal, chosen for what
// each topic actually covers rather than decoration.
const TOPIC_META: Record<(typeof TOPICS)[number], { icon: LucideIcon; description: string }> = {
  "Get Started": { icon: Compass, description: "New to Vantiq? Start with these two tutorials." },
  "Client Development": { icon: LayoutTemplate, description: "Building front-end clients with Client Builder." },
  "Concepts & Architecture": { icon: Layers, description: "Platform-wide guides and architectural thinking." },
  "AI & GenAI": { icon: Sparkles, description: "Agents, LLMs, semantic search, and generative AI features." },
  Collaboration: { icon: Users, description: "Coordinating people and AI in real-time collaborative apps." },
  "Core Platform": { icon: Braces, description: "The API, IDE, and VAIL rules language." },
  Assemblies: { icon: Boxes, description: "Packaging and reusing Vantiq resource bundles." },
  "Operations, Deployment & Admin": { icon: Settings, description: "Deploying, monitoring, and administering namespaces." },
  "External Sources & Integrations": { icon: Plug, description: "Connecting Vantiq to external systems and data." },
  "Service Development": { icon: Workflow, description: "Building backend services and event handlers." },
  Catalog: { icon: Tag, description: "Publishing and securing reusable Catalog resources." },
  "Design Modeler": { icon: Shapes, description: "Visual modeling of application design." },
  Analytics: { icon: BarChart3, description: "Computing statistics over event data." },
  Testing: { icon: ClipboardCheck, description: "Writing and running tests for Vantiq applications." },
  "Branding & White-Labeling": { icon: Palette, description: "Customizing mobile and IDE branding." },
};

// Analytics has a real, written-up detail page (see resource-detail-client.tsx)
// — surfaced first so it's easy to find. Everything else in the "All" view
// clusters by topic rather than sitting in raw category-push order.
const KNOWLEDGE_BASE_ITEMS: ResourceItem[] = [
  ...KNOWLEDGE_BASE_DOCS.filter((r) => r.id === "tutorials-analytics"),
  ...KNOWLEDGE_BASE_DOCS.filter((r) => r.id !== "tutorials-analytics").sort(
    (a, b) => topicOrder(a) - topicOrder(b)
  ),
];

// This route renders outside the portal shell (see AppShell) to simulate
// landing on the real, separately-run Echo KB site, but reuses the portal's
// own PageHero + Input for the header and search so it still reads as one
// product rather than a bolted-on skin. Below the hero: a topic card grid —
// icon, title, one-line description, resource count — matching Echo KB's
// actual fixed template shape (confirmed against the vendor's own template
// screenshot). Selecting a topic or typing a search query swaps the grid
// for that topic/query's item list in place, since Echo KB has no separate
// detail-page route for this prototype to link out to.
export default function KnowledgeBasePage() {
  const [query, setQuery] = React.useState("");
  const [selectedTopic, setSelectedTopic] = React.useState<string | null>(null);

  const showingList = Boolean(query || selectedTopic);
  const listItems = query
    ? KNOWLEDGE_BASE_ITEMS.filter((r) =>
        `${r.title} ${r.description}`.toLowerCase().includes(query.toLowerCase())
      )
    : KNOWLEDGE_BASE_ITEMS.filter((r) => topicFor(r) === selectedTopic);

  function resetToTopics() {
    setQuery("");
    setSelectedTopic(null);
  }

  // "Get Started" renders ahead of Release Notes in a fixed position rather
  // than in its TOPICS array slot, so it's pulled out of the generic map
  // and rendered through this shared helper instead.
  function renderTopicCard(topic: (typeof TOPICS)[number]) {
    const items = KNOWLEDGE_BASE_ITEMS.filter((r) => topicFor(r) === topic);
    if (items.length === 0) return null;
    const { icon: Icon, description } = TOPIC_META[topic];
    return (
      <button
        key={topic}
        type="button"
        onClick={() => setSelectedTopic(topic)}
        className="shadow-card rounded-xl border border-border bg-card p-6 text-left transition-shadow hover:shadow-lg"
      >
        <div className="flex items-center gap-3">
          <Icon className="size-6 shrink-0 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">{topic}</h3>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
        <p className="mt-3 text-sm font-semibold text-foreground">
          {items.length} {items.length === 1 ? "resource" : "resources"}
        </p>
      </button>
    );
  }

  return (
    <div className="space-y-8">
      <PageHero
        title="How can we help you build?"
        description="Search the documentation, or browse by what you're working on below."
        align="center"
        actions={
          // Overrides live on this instance, not on components/ui/input.tsx:
          // the shared Input is bg-transparent with h-9, which reads as a faint
          // outline against the hero's gradient. Search is this page's primary
          // action, so here it gets a solid card surface, more height, and a
          // real shadow to sit on top of the gradient rather than in it.
          <div className="relative mx-auto w-full max-w-xl">
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedTopic(null);
              }}
              placeholder="Search the documentation…"
              className="shadow-card h-12 rounded-xl border-border bg-card pl-12 text-base md:text-base"
            />
          </div>
        }
      />

      <div>
        {showingList ? (
          <>
            <button
              type="button"
              onClick={resetToTopics}
              className="mb-4 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to topics
            </button>
            <h2 className="mb-1 text-lg font-semibold text-foreground">
              {query ? `Results for “${query}”` : selectedTopic}
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              {listItems.length} {listItems.length === 1 ? "resource" : "resources"}
            </p>
            {listItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">Hmm, no matches here — try a different search.</p>
            ) : (
              <div className="space-y-8">
                {groupByType(listItems).map(([type, items]) => (
                  <section key={type}>
                    <SectionHeading
                      description={`${items.length} ${items.length === 1 ? "resource" : "resources"}`}
                    >
                      {TYPE_HEADING[type] ?? type}
                    </SectionHeading>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((r) => (
                        <div key={r.id} className="shadow-card rounded-xl border border-border bg-card p-5">
                          {/* Title only in a topic view — the group heading above
                              states the type, the h2 states the topic, and the
                              blurb was dropped 2026-08-18 to match the resource
                              and course catalogs. A search result set does span
                              topics, so the topic still earns its line there; the
                              title's top margin comes with it, so a title-only
                              card keeps the card's own padding symmetrical. */}
                          {!selectedTopic && (
                            <p className="mb-2 text-[11px] text-muted-foreground">{r.category}</p>
                          )}
                          <p className="text-sm font-medium text-foreground">{r.title}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {renderTopicCard("Get Started")}
            <Link
              href="/developer-center/release-notes"
              className="shadow-card rounded-xl border border-border bg-card p-6 text-left transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <Rocket className="size-6 shrink-0 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Release Notes</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Version-by-version changes, fixes, and new capabilities.
              </p>
              <p className="mt-3 flex items-center gap-1 text-sm font-semibold text-primary">
                View release notes
                <ChevronRight className="size-4" />
              </p>
            </Link>
            {TOPICS.filter((topic) => topic !== "Get Started").map(renderTopicCard)}
          </div>
        )}
      </div>
    </div>
  );
}
