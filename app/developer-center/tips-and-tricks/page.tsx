"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { useRole } from "@/components/shell/role-provider";
import { TIP_CATEGORIES, TIPS_AND_TRICKS, type Tip, type TipCategory } from "@/lib/developer-data";
import { Search, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

export default function TipsAndTricksPage() {
  const { info } = useRole();
  const [tips, setTips] = React.useState<Tip[]>(TIPS_AND_TRICKS);
  const [tipQuery, setTipQuery] = React.useState("");
  const [activeTipCategory, setActiveTipCategory] = React.useState<TipCategory | "all">("all");
  const [submitTipOpen, setSubmitTipOpen] = React.useState(false);
  const [newTipCategory, setNewTipCategory] = React.useState<TipCategory>("VAIL");
  const [upvotedTips, setUpvotedTips] = React.useState<Set<string>>(new Set());

  const filteredTips = React.useMemo(() => {
    let list = tips;
    if (activeTipCategory !== "all") {
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
        title="Tips & Tricks"
        description="Practical lessons partners have learned building on Vantiq."
      >
        <BookmarkButton
          item={{
            id: "/developer-center/tips-and-tricks",
            label: "Tips & Tricks",
            href: "/developer-center/tips-and-tricks",
            iconKey: "Code2",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tips..."
              value={tipQuery}
              onChange={(e) => setTipQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={activeTipCategory} onValueChange={(v) => setActiveTipCategory(v as TipCategory | "all")}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {TIP_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

        <div className="space-y-3">
          {filteredTips.map((tip) => (
            <Card key={tip.id} className="shadow-card p-4">
              <div className="flex gap-4">
                <div className="flex w-14 shrink-0 flex-col items-center gap-1 text-center">
                  <button
                    type="button"
                    onClick={() => handleUpvoteTip(tip.id)}
                    disabled={upvotedTips.has(tip.id)}
                    aria-label="Upvote"
                    className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-sm font-medium transition-colors ${
                      upvotedTips.has(tip.id)
                        ? "text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <ThumbsUp className="size-3.5" />
                    {tip.upvotes}
                  </button>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{tip.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{tip.body}</p>
                  <div className="mt-2 flex items-center">
                    <span className="ml-auto text-xs text-muted-foreground">{tip.author}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {filteredTips.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">No tips match.</p>
          )}
        </div>
      </div>
    </div>
  );
}
