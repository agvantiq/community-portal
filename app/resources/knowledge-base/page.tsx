"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/page-hero";
import {
  RESOURCE_CENTER_ITEMS,
  type ResourceItem,
  type ResourceType,
} from "@/lib/developer-data";
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
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

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

// --- Topic-first structure (2026-08-12) -------------------------------
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
// This dataset is a smaller, earlier-vintage confirmed-real set than that
// live audit (48 items here vs. 129 found live) — items below are regrouped
// as-is; nothing from the fuller audit was added. Ask before backfilling.
const TOPICS = [
  "Client Development",
  "Concepts & Architecture",
  "AI, GenAI & Collaborations",
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

const TOPIC_BY_TITLE: Record<string, (typeof TOPICS)[number]> = {
  // Client Development
  "Client Builder": "Client Development",
  "Client Components": "Client Development",
  "Client Development": "Client Development",
  "Client Builder Development Standards": "Client Development",
  "Client to Component Conversion": "Client Development",
  "Dynamic Client Content": "Client Development",
  "Dynamic Map View Widget": "Client Development",
  "How To Video Shorts: Client Layouts": "Client Development",
  "How To Video Shorts: Client CSS": "Client Development",
  // Concepts & Architecture
  "Domain and Multi-Domain Integration with Vantiq": "Concepts & Architecture",
  "Event Driven Integration": "Concepts & Architecture",
  "Event Driven Thinking": "Concepts & Architecture",
  "VANTIQ Developers Guide - Introduction to Intelligence in VANTIQ Applications": "Concepts & Architecture",
  "VANTIQ Developers Guide Series - Designing VANTIQ Applications": "Concepts & Architecture",
  "VANTIQ Developers Guide Series - Introduction to VANTIQ Development": "Concepts & Architecture",
  "Server Development Standards": "Concepts & Architecture",
  "Build Your Own Tools": "Concepts & Architecture",
  // AI, GenAI & Collaborations
  "Advanced Collaborations": "AI, GenAI & Collaborations",
  Conversation: "AI, GenAI & Collaborations",
  AI: "AI, GenAI & Collaborations",
  "Supporting Semantic Search": "AI, GenAI & Collaborations",
  "Create a MCP Server in a Vantiq Project": "AI, GenAI & Collaborations",
  "How To Video Shorts - LLM Playground": "AI, GenAI & Collaborations",
  "How To Video Shorts: AI Tools (Functions)": "AI, GenAI & Collaborations",
  // Core Platform
  "Storage Managers": "Core Platform",
  "Core Platform": "Core Platform",
  "Cache Services": "Core Platform",
  "How To Video - The Join Activity Pattern": "Core Platform",
  "How To Video Shorts: Calling Procedures by Properties": "Core Platform",
  // Assemblies
  Assemblies: "Assemblies",
  "Camel Assemblies": "Assemblies",
  // Operations, Deployment & Admin
  "Operations & Management": "Operations, Deployment & Admin",
  "Discovering Current Session Information": "Operations, Deployment & Admin",
  "Diagnosing Faults and Scalability Issues In Vantiq Applications": "Operations, Deployment & Admin",
  // External Sources & Integrations
  "Image Processing": "External Sources & Integrations",
  "External Sources": "External Sources & Integrations",
  "How To Video Shorts: How to Create a Built-In Source": "External Sources & Integrations",
  // Service Development
  "App Components": "Service Development",
  "Service Development": "Service Development",
  // Catalog
  Catalogs: "Catalog",
  Catalog: "Catalog",
  // Design Modeler
  "Design Modeler": "Design Modeler",
  "Vantiq Modeler": "Design Modeler",
  // Analytics
  Analytics: "Analytics",
  "How To Video Shorts: Analytics and ComputeStatistics": "Analytics",
  // Testing
  Testing: "Testing",
  // Branding & White-Labeling
  Branding: "Branding & White-Labeling",
};

function topicFor(item: ResourceItem): string {
  return TOPIC_BY_TITLE[item.title] ?? item.category;
}

function topicOrder(item: ResourceItem): number {
  const idx = TOPICS.indexOf(topicFor(item) as (typeof TOPICS)[number]);
  return idx === -1 ? TOPICS.length : idx;
}

// One icon + one-line description per topic — the real Echo KB template's
// card shape (icon, title, description, count). Icons are drawn from the
// same lucide-react set used everywhere else in the portal, chosen for what
// each topic actually covers rather than decoration.
const TOPIC_META: Record<(typeof TOPICS)[number], { icon: LucideIcon; description: string }> = {
  "Client Development": { icon: LayoutTemplate, description: "Building front-end clients with Client Builder." },
  "Concepts & Architecture": { icon: Layers, description: "Platform-wide guides and architectural thinking." },
  "AI, GenAI & Collaborations": { icon: Sparkles, description: "Agents, LLMs, semantic search, and generative AI features." },
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
  ...KNOWLEDGE_BASE_ITEMS_BASE.filter((r) => r.id === "tutorials-analytics"),
  ...KNOWLEDGE_BASE_ITEMS_BASE.filter((r) => r.id !== "tutorials-analytics").sort(
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

  return (
    <div className="space-y-8">
      <PageHero
        title="How can we help you build?"
        description="Search the documentation, or browse by what you're working on below."
        align="center"
        actions={
          <div className="relative w-full">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedTopic(null);
              }}
              placeholder="Search…"
              className="pl-9"
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listItems.map((r) => (
                  <div key={r.id} className="shadow-card rounded-xl border border-border bg-card p-5">
                    <p className="text-[11px] text-muted-foreground">
                      {r.type} · {r.category}
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">{r.title}</p>
                    {r.description && (
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            {TOPICS.map((topic) => {
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
            })}
          </div>
        )}
      </div>
    </div>
  );
}
