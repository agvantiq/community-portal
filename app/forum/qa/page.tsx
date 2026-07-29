"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/page-hero";
import { FORUM_POSTS, FORUM_TAGS } from "@/lib/sample-data";
import { ArrowUp, CheckCircle2, Search } from "lucide-react";
import { toast } from "sonner";

export default function QAForumPage() {
  const [sort, setSort] = React.useState("top");
  const [query, setQuery] = React.useState("");

  const posts = React.useMemo(() => {
    let list = [...FORUM_POSTS];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sort === "top") list.sort((a, b) => b.votes - a.votes);
    if (sort === "unanswered") list = list.filter((p) => p.answers === 0);
    return list;
  }, [sort, query]);

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/forum" className="hover:text-foreground">
            &larr; Community Dashboard
          </Link>
        }
        title="Q&A Forum"
        description="Ask questions, share fixes, and learn from the partner ecosystem."
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button>Ask a Question</Button>
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
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Tabs value={sort} onValueChange={setSort}>
              <TabsList>
                <TabsTrigger value="top">Top Questions</TabsTrigger>
                <TabsTrigger value="newest">Newest</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8"
              />
            </div>
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
                        <Badge variant="secondary" className="bg-warning/10 text-warning">
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

        <div className="space-y-6">
          <Card className="shadow-card p-5">
            <h2 className="text-sm font-medium text-foreground">Help the Community</h2>
            <p className="mt-1 text-2xl font-semibold text-primary">3,200 pts</p>
            <p className="mt-1 text-xs text-muted-foreground">Your reputation this quarter</p>
          </Card>

          <Card className="shadow-card p-5">
            <h2 className="mb-3 text-sm font-medium text-foreground">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {FORUM_TAGS.map((tag) => (
                <Badge key={tag.label} variant="secondary">
                  {tag.label} <span className="ml-1 text-muted-foreground">{tag.count}</span>
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
