"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
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
import { FORUM_POSTS } from "@/lib/sample-data";
import { ArrowUp, Search } from "lucide-react";
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

        <div className="space-y-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/forum/${post.id}`} className="block">
              <Card className="shadow-card p-4 transition-colors hover:border-primary/40">
                <div className="flex gap-4">
                  <div className="flex w-14 shrink-0 flex-col items-center gap-1 text-center">
                    <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                      <ArrowUp className="size-3.5 text-muted-foreground" />
                      {post.votes}
                    </div>
                    <div className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-muted-foreground">
                      {post.answers}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{post.title}</p>
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{post.description}</p>
                    <div className="mt-2 flex items-center">
                      <span className="ml-auto text-xs text-muted-foreground">
                        {post.author} &middot; {post.timeAgo}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
          {posts.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">No questions match.</p>
          )}
        </div>
      </div>
    </div>
  );
}
