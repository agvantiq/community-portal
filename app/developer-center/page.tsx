import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/bookmark-button";
import { ContentRequestDialog } from "@/components/content-request-dialog";
import { PageBanner } from "@/components/page-banner";
import { SectionHeading } from "@/components/section-heading";
import { FORUM_POSTS } from "@/lib/sample-data";
import { TIPS_AND_TRICKS, RESOURCE_CENTER_ITEMS } from "@/lib/developer-data";
import {
  MessagesSquare,
  Lightbulb,
  Layers,
  Library,
  BookOpen,
  ThumbsUp,
  ChevronRight,
  ArrowUp,
} from "lucide-react";

// Mirrors the Sales Hub landing dashboard: covers exactly what the sidebar
// links to under Developer Hub (Q&A Forum, Tips & Tricks, Reusability
// Catalog, Resources, Knowledge Base) — no Quick Links (that section only
// ever showed a partner's own saved items, not the hub's content) and no
// flat Knowledge Base category grid (that's what the Knowledge Base page
// itself is for). Q&A Forum and Tips & Tricks get a richer preview since
// they're the two genuinely alive, updating surfaces in this hub.
const TOP_TIP = [...TIPS_AND_TRICKS].sort((a, b) => b.upvotes - a.upvotes)[0];
const RECENT_THREADS = FORUM_POSTS.slice(0, 3);

export default function DeveloperCenterPage() {
  return (
    <div className="space-y-8">
      <PageBanner
        eyebrow="Developer Hub"
        title="Developer Hub"
        description="Everything you need to build on Vantiq — architecture guidance, references, reusable code, and demos. Pick a module to dive in."
        actions={
          <ContentRequestDialog
            source="Developer Hub"
            dialogDescription="Product ideas, enhancement requests, or new developer content for the Developer Hub."
            requestTypes={["Product Idea", "Enhancement Request", "New Content", "Bug Report", "Other"]}
          />
        }
      >
        <BookmarkButton
          item={{ id: "/developer-center", label: "Developer Hub", href: "/developer-center", iconKey: "Code2" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <div>
        <SectionHeading icon={<MessagesSquare className="size-4 text-primary" />}>Community</SectionHeading>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Link href="/forum/qa" className="lg:col-span-2">
            <Card className="shadow-card h-full p-6 transition-shadow hover:shadow-lg">
              <div className="flex h-full flex-col justify-between gap-6 sm:flex-row sm:items-start">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold text-foreground">Q&amp;A Forum</p>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  </div>
                  <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                    Ask questions, share answers, and see how other partners solve real integration
                    problems.
                  </p>
                  <Badge variant="secondary" className="mt-4">
                    {FORUM_POSTS.length} open threads
                  </Badge>
                </div>
                <div className="w-full shrink-0 divide-y divide-border rounded-lg border border-border sm:w-64">
                  {RECENT_THREADS.map((post) => (
                    <div key={post.id} className="flex items-start gap-2 p-3">
                      <ArrowUp className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-xs font-medium text-foreground">{post.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{post.votes} votes</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/developer-center/tips-and-tricks">
            <Card className="shadow-card flex h-full flex-col p-6 transition-shadow hover:shadow-lg">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">Tips &amp; Tricks</p>
                <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Practical lessons partners have learned building on Vantiq.
              </p>
              {TOP_TIP && (
                <div className="mt-4 flex-1 rounded-lg border border-border bg-secondary/25 p-3">
                  <p className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    <ThumbsUp className="size-3 text-primary" />
                    Top tip
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-xs font-medium text-foreground">{TOP_TIP.title}</p>
                </div>
              )}
              <Badge variant="secondary" className="mt-4 self-start">
                {TIPS_AND_TRICKS.length} tips
              </Badge>
            </Card>
          </Link>
        </div>
      </div>

      <div>
        <SectionHeading icon={<Library className="size-4 text-primary" />}>Reference</SectionHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link href="/developer-center/reusability-catalog">
            <Card className="shadow-card flex h-full items-center gap-4 p-5 transition-colors hover:border-primary">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Layers className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-1 text-sm font-medium text-foreground">
                  Reuse Library
                  <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Reusable assemblies, templates, and components.
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/resources">
            <Card className="shadow-card flex h-full items-center gap-4 p-5 transition-colors hover:border-primary">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <BookOpen className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-1 text-sm font-medium text-foreground">
                  Resources
                  <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {RESOURCE_CENTER_ITEMS.length}+ docs, guides, and reference material.
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/resources/knowledge-base">
            <Card className="shadow-card flex h-full items-center gap-4 p-5 transition-colors hover:border-primary">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Lightbulb className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-1 text-sm font-medium text-foreground">
                  Knowledge Base
                  <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Searchable articles, tutorials, and how-tos.
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
