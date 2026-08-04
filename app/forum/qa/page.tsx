"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { FORUM_POSTS, FORUM_TAGS } from "@/lib/sample-data";
import { useRole } from "@/components/shell/role-provider";
import {
  ArrowUp,
  CheckCircle2,
  Plus,
  Search,
  ThumbsUp,
  X,
  Zap,
  Gauge,
  Rocket,
  Bug,
  Plug,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

const TIP_CATEGORIES = ["VAIL", "Performance", "Deployment", "Debugging", "Integrations"] as const;
type TipCategory = (typeof TIP_CATEGORIES)[number];

interface Tip {
  id: string;
  title: string;
  body: string;
  author: string;
  org: string;
  category: TipCategory;
  upvotes: number;
}

const TIPS: Tip[] = [
  {
    id: "vail-early-return",
    title: "Use early returns to keep procedures flat",
    body: "Guard clauses at the top of a VAIL procedure avoid deep nesting and make error paths obvious at a glance.",
    author: "Priya Nair",
    org: "Radenta Tech",
    category: "VAIL",
    upvotes: 42,
  },
  {
    id: "index-hot-fields",
    title: "Index any field you filter events on",
    body: "Unindexed event-type queries scan the full collection. Add an index on every field used in a WHERE clause before you go to load testing.",
    author: "Derek Osei",
    org: "SoftServe",
    category: "Performance",
    upvotes: 37,
  },
  {
    id: "staged-rollouts",
    title: "Ship rule changes to a canary namespace first",
    body: "Clone the target namespace, deploy there, and watch the event log for a day before promoting to production.",
    author: "Naomi Wallace",
    org: "NTT Data",
    category: "Deployment",
    upvotes: 29,
  },
  {
    id: "replay-event-log",
    title: "Replay the event log to reproduce timing bugs",
    body: "Most \"only happens sometimes\" issues are event-ordering races. Export the log and replay it locally instead of guessing.",
    author: "Ravi Patel",
    org: "Wipro Mfg",
    category: "Debugging",
    upvotes: 51,
  },
  {
    id: "webhook-retries",
    title: "Set idempotency keys on outbound webhooks",
    body: "Vantiq retries failed webhook deliveries. Without an idempotency key on the receiving end, retries duplicate side effects.",
    author: "Maya Chen",
    org: "Cognizant Tech",
    category: "Integrations",
    upvotes: 33,
  },
  {
    id: "vail-type-checks",
    title: "Validate incoming payloads before mapping to a type",
    body: "A single malformed event can crash a whole rule chain. Validate shape first, then map — don't let the type system find out at runtime.",
    author: "Lucia Fernandez",
    org: "Infosys Cloud",
    category: "VAIL",
    upvotes: 24,
  },
];

const CATEGORY_STYLE: Record<TipCategory, { icon: LucideIcon; bg: string; text: string }> = {
  VAIL: { icon: Zap, bg: "bg-emphasis/10", text: "text-emphasis" },
  Performance: { icon: Gauge, bg: "bg-emphasis/10", text: "text-emphasis" },
  Deployment: { icon: Rocket, bg: "bg-primary/10", text: "text-primary" },
  Debugging: { icon: Bug, bg: "bg-destructive/10", text: "text-destructive" },
  Integrations: { icon: Plug, bg: "bg-info/10", text: "text-info" },
};

export default function QAForumPage() {
  const { info } = useRole();
  const [sort, setSort] = React.useState("top");
  const [query, setQuery] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const posts = React.useMemo(() => {
    let list = [...FORUM_POSTS];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedTags.length > 0) {
      list = list.filter((p) => selectedTags.every((tag) => p.tags.includes(tag)));
    }
    if (sort === "top") list.sort((a, b) => b.votes - a.votes);
    if (sort === "unanswered") list = list.filter((p) => p.answers === 0);
    return list;
  }, [sort, query, selectedTags]);

  const [tips, setTips] = React.useState<Tip[]>(TIPS);
  const [tipQuery, setTipQuery] = React.useState("");
  const [activeTipCategory, setActiveTipCategory] = React.useState<TipCategory | "All">("All");
  const [submitTipOpen, setSubmitTipOpen] = React.useState(false);
  const [newTipCategory, setNewTipCategory] = React.useState<TipCategory>("VAIL");
  const [upvotedTips, setUpvotedTips] = React.useState<Set<string>>(new Set());

  const filteredTips = React.useMemo(() => {
    let list = tips;
    if (activeTipCategory !== "All") {
      list = list.filter((t) => t.category === activeTipCategory);
    }
    if (tipQuery.trim()) {
      const q = tipQuery.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q));
    }
    return [...list].sort((a, b) => b.upvotes - a.upvotes);
  }, [tips, activeTipCategory, tipQuery]);

  function handleUpvoteTip(id: string) {
    if (upvotedTips.has(id)) return;
    setTips((prev) => prev.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t)));
    setUpvotedTips((prev) => new Set(prev).add(id));
  }

  function handleSubmitTip(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement)?.value.trim();
    const body = (form.elements.namedItem("body") as HTMLTextAreaElement)?.value.trim();
    if (!title || !body) return;
    setTips((prev) => [
      {
        id: `tip-${Date.now()}`,
        title,
        body,
        author: info.user.name,
        org: info.user.org ?? "Vantiq",
        category: newTipCategory,
        upvotes: 0,
      },
      ...prev,
    ]);
    form.reset();
    setNewTipCategory("VAIL");
    setSubmitTipOpen(false);
    toast.success(`${title} was added to Tips & Tricks.`);
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/developer-center" className="hover:text-foreground">
            &larr; Developer Hub
          </Link>
        }
        title="Q&A Forum"
        description="Ask questions, share fixes, and learn from the partner ecosystem."
      >
        <BookmarkButton
          item={{ id: "/forum/qa", label: "Q&A Forum", href: "/forum/qa", iconKey: "MessagesSquare" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="shrink-0">Ask a Question</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ask a question</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Title" />
                <Textarea placeholder="Describe what you're trying to do..." rows={5} />
                <Input placeholder="Tags (comma separated)" />
              </div>
              <DialogFooter>
                <Button onClick={() => toast.success("Your question is live in the forum.")}>
                  Post question
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Plus className="size-3.5" />
                  Tags
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Filter by tag</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {FORUM_TAGS.map((tag) => (
                  <DropdownMenuCheckboxItem
                    key={tag.label}
                    checked={selectedTags.includes(tag.label)}
                    onCheckedChange={(checked) =>
                      setSelectedTags((prev) =>
                        checked ? [...prev, tag.label] : prev.filter((t) => t !== tag.label)
                      )
                    }
                  >
                    {tag.label} <span className="ml-1 text-muted-foreground">{tag.count}</span>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1 pr-1.5">
                {tag}
                <button
                  type="button"
                  onClick={() => setSelectedTags((prev) => prev.filter((t) => t !== tag))}
                  className="rounded-full p-0.5 hover:bg-foreground/10"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top">Top Questions</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="unanswered">Unanswered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
            {posts.map((post) => (
              <Card key={post.id} className="shadow-card p-4">
                <div className="flex gap-4">
                  <div className="flex w-14 shrink-0 flex-col items-center gap-1 text-center">
                    <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                      <ArrowUp className="size-3.5 text-muted-foreground" />
                      {post.votes}
                    </div>
                    <div
                      className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs ${
                        post.accepted ? "bg-success/10 text-success" : "text-muted-foreground"
                      }`}
                    >
                      {post.accepted && <CheckCircle2 className="size-3" />}
                      {post.answers}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/forum/${post.id}`}
                      className="text-sm font-medium text-foreground hover:text-primary hover:underline"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{post.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-info/10 text-info">
                          {tag}
                        </Badge>
                      ))}
                      {post.bounty && (
                        <Badge variant="secondary" className="bg-emphasis/10 text-emphasis">
                          +{post.bounty} pts Bounty
                        </Badge>
                      )}
                      <span className="ml-auto text-xs text-muted-foreground">
                        {post.author} &middot; {post.timeAgo}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {posts.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">No questions match.</p>
            )}
          </div>
        </div>

      <div className="border-t border-border pt-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Tips & Tricks</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Practical lessons partners have learned building on Vantiq.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tips..."
              value={tipQuery}
              onChange={(e) => setTipQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Dialog open={submitTipOpen} onOpenChange={setSubmitTipOpen}>
            <DialogTrigger asChild>
              <Button className="shrink-0">Share a Tip</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share a tip</DialogTitle>
                <DialogDescription>
                  Pass along something you&apos;ve learned building on Vantiq.
                </DialogDescription>
              </DialogHeader>
              <form id="submit-tip-form" onSubmit={handleSubmitTip} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="tip-title">Title</Label>
                  <Input id="tip-title" name="title" placeholder="Index any field you filter events on" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tip-category">Category</Label>
                  <Select value={newTipCategory} onValueChange={(v) => setNewTipCategory(v as TipCategory)}>
                    <SelectTrigger id="tip-category" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIP_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tip-body">Tip</Label>
                  <Textarea id="tip-body" name="body" placeholder="What's the lesson?" rows={4} required />
                </div>
              </form>
              <DialogFooter>
                <Button type="submit" form="submit-tip-form">
                  Share Tip
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["All", ...TIP_CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTipCategory(cat)}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTipCategory === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTips.map((tip) => {
            const style = CATEGORY_STYLE[tip.category];
            const Icon = style.icon;
            return (
              <Card key={tip.id} className="shadow-card gap-0 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${style.bg}`}>
                    <Icon className={`size-4 ${style.text}`} />
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {tip.category}
                  </Badge>
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{tip.title}</p>
                <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{tip.body}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {tip.author} &middot; {tip.org}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleUpvoteTip(tip.id)}
                    disabled={upvotedTips.has(tip.id)}
                    className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                      upvotedTips.has(tip.id)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <ThumbsUp className="size-3.5" />
                    {tip.upvotes}
                  </button>
                </div>
              </Card>
            );
          })}
          {filteredTips.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-muted-foreground">No tips match.</p>
          )}
        </div>
      </div>
    </div>
  );
}
