"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ForumPost } from "@/lib/sample-data";
import { initials } from "@/lib/org-roster";
import { ArrowUp, ArrowDown, ArrowLeft, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

// Demo thread content only — mirrors the same two answers this page has
// always shown, reshaped into a nested comment tree so the Reddit-style
// threading (collapse, reply, indentation) has something real to render.
// Not sourced from any per-post data model; every post currently renders
// this same thread. Authors are placeholder people, not the partner orgs
// used elsewhere in the app (PARTNER_ORGS) — a forum answer is asked/
// answered by a person, not a company.
interface ForumComment {
  id: string;
  author: string;
  timeAgo: string;
  votes: number;
  body?: string;
  steps?: string[];
  code?: string;
  replies?: ForumComment[];
}

const DEMO_COMMENTS: ForumComment[] = [
  {
    id: "c1",
    author: "Marek Kowalski",
    timeAgo: "1h ago",
    votes: 31,
    steps: [
      "Add the CA and client cert paths under the source's TLS config block.",
      "Set verifyServer: true to enforce chain validation.",
      "Reference the private key via a Secret, never inline.",
    ],
    code: `SOURCE MqttSecure CONFIG {
  uri: "ssl://broker.internal:8883",
  tls: {
    ca: Secret.mqttCa,
    cert: Secret.mqttClientCert,
    key: Secret.mqttClientKey,
    verifyServer: true
  }
}`,
    replies: [
      {
        id: "c1-r1",
        author: "Priya Nandakumar",
        timeAgo: "40m ago",
        votes: 4,
        body: "This worked — the missing piece for me was the Secret reference syntax, thanks!",
      },
    ],
  },
  {
    id: "c2",
    author: "Grace Odhiambo",
    timeAgo: "50m ago",
    votes: 6,
    body: "Adding to the accepted answer — if you're on a self-signed broker in a dev environment, you can drop verifyServer to false, just don't ship that to production.",
    replies: [
      {
        id: "c2-r1",
        author: "Daniela Ferreira",
        timeAgo: "20m ago",
        votes: 2,
        body: "Good callout — burned by that exact thing in a demo environment once.",
      },
    ],
  },
];

function VoteControl({ initial }: { initial: number }) {
  const [votes, setVotes] = React.useState(initial);
  const [voted, setVoted] = React.useState<"up" | "down" | null>(null);

  return (
    <div className="flex w-12 shrink-0 flex-col items-center gap-1">
      <button
        type="button"
        onClick={() => setVoted(voted === "up" ? null : "up")}
        className={`rounded-md p-1 transition-colors hover:bg-muted ${voted === "up" ? "text-primary" : "text-muted-foreground"}`}
        aria-label="Upvote"
      >
        <ArrowUp className="size-5" />
      </button>
      <span className="text-sm font-semibold text-foreground">
        {votes + (voted === "up" ? 1 : voted === "down" ? -1 : 0)}
      </span>
      <button
        type="button"
        onClick={() => setVoted(voted === "down" ? null : "down")}
        className={`rounded-md p-1 transition-colors hover:bg-muted ${voted === "down" ? "text-destructive" : "text-muted-foreground"}`}
        aria-label="Downvote"
      >
        <ArrowDown className="size-5" />
      </button>
    </div>
  );
}

function CommentVotes({ initial }: { initial: number }) {
  const [voted, setVoted] = React.useState<"up" | "down" | null>(null);
  const votes = initial + (voted === "up" ? 1 : voted === "down" ? -1 : 0);

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border px-1 py-0.5">
      <button
        type="button"
        onClick={() => setVoted(voted === "up" ? null : "up")}
        className={`rounded-full p-0.5 transition-colors hover:bg-muted ${voted === "up" ? "text-primary" : "text-muted-foreground"}`}
        aria-label="Upvote"
      >
        <ArrowUp className="size-3.5" />
      </button>
      <span className="min-w-[1.5ch] text-center text-xs font-medium text-foreground">{votes}</span>
      <button
        type="button"
        onClick={() => setVoted(voted === "down" ? null : "down")}
        className={`rounded-full p-0.5 transition-colors hover:bg-muted ${voted === "down" ? "text-destructive" : "text-muted-foreground"}`}
        aria-label="Downvote"
      >
        <ArrowDown className="size-3.5" />
      </button>
    </div>
  );
}

function CommentItem({ comment, depth = 0 }: { comment: ForumComment; depth?: number }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [replyOpen, setReplyOpen] = React.useState(false);

  // Toggle (16px) + gap (10px) + avatar (24px) + gap (10px) = 60px — the
  // content below is indented to that exact width so it lines up under the
  // author name, while the toggle/avatar/name/timestamp stay one true flex
  // row (not just visually close) so they share a single baseline instead
  // of each aligning to the top of a taller sibling.
  return (
    <div className={depth > 0 ? "mt-3 border-l border-border pl-4" : "mt-5 first:mt-0"}>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand comment" : "Collapse comment"}
          className="flex size-4 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"
        >
          {collapsed ? <Plus className="size-2.5" /> : <Minus className="size-2.5" />}
        </button>
        <Avatar className="size-6 shrink-0">
          <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary">
            {initials(comment.author)}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs font-medium text-foreground">{comment.author}</span>
        <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
      </div>

      {collapsed ? (
        <p className="mt-1 pl-[60px] text-xs italic text-muted-foreground">Comment collapsed</p>
      ) : (
        <div className="pl-[60px]">
          {comment.steps ? (
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-foreground">
              {comment.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-foreground">{comment.body}</p>
          )}
          {comment.code && (
            <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-muted p-4 font-mono text-xs text-foreground">
              {comment.code}
            </pre>
          )}

          <div className="mt-2 flex items-center gap-3">
            <CommentVotes initial={comment.votes} />
            <button
              type="button"
              onClick={() => setReplyOpen((o) => !o)}
              className="text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Reply
            </button>
          </div>

          {replyOpen && (
            <div className="mt-3 space-y-2">
              <Textarea placeholder={`Reply to ${comment.author}...`} rows={2} />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    toast.success("Reply posted.");
                    setReplyOpen(false);
                  }}
                >
                  Reply
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setReplyOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {comment.replies?.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function AnswerComposer({
  open,
  onOpen,
  onCancel,
  onPost,
}: {
  open: boolean;
  onOpen: () => void;
  onCancel: () => void;
  onPost: () => void;
}) {
  if (!open) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="w-full rounded-md border border-input px-4 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:border-ring"
      >
        Join the conversation
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <Textarea placeholder="Share what worked for you..." rows={4} />
      <div className="flex gap-2">
        <Button onClick={onPost}>Post Answer</Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export function ForumThreadClient({ post }: { post: ForumPost }) {
  const [composerOpen, setComposerOpen] = React.useState(false);
  const hasAnswers = DEMO_COMMENTS.length > 0;

  function handlePostAnswer() {
    toast.success("Your answer has been posted.");
    setComposerOpen(false);
  }

  const composer = (
    <AnswerComposer
      open={composerOpen}
      onOpen={() => setComposerOpen(true)}
      onCancel={() => setComposerOpen(false)}
      onPost={handlePostAnswer}
    />
  );

  return (
    <div className="space-y-6">
      <Link href="/forum/qa" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to Questions
      </Link>

      <Card className="shadow-card p-6">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-6 shrink-0">
            <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary">
              {initials(post.author)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-foreground">{post.author}</span>
            <span className="text-xs text-muted-foreground">Asked {post.timeAgo}</span>
          </div>
        </div>

        <h1 className="mt-4 text-xl font-semibold text-foreground">{post.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-foreground">{post.description}</p>
      </Card>

      {hasAnswers ? (
        <Card className="shadow-card p-6">
          {DEMO_COMMENTS.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
          <div className="mt-5 border-t border-border pt-5">{composer}</div>
        </Card>
      ) : (
        <Card className="shadow-card p-4">{composer}</Card>
      )}
    </div>
  );
}
