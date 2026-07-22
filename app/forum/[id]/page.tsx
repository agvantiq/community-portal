"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FORUM_POSTS } from "@/lib/sample-data";
import { ArrowUp, ArrowDown, ArrowLeft, CheckCircle2 } from "lucide-react";

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

export default function ForumThreadPage() {
  const params = useParams<{ id: string }>();
  const post = FORUM_POSTS.find((p) => p.id === params.id) ?? FORUM_POSTS[0];

  return (
    <div className="space-y-6">
      <Link href="/forum" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to Questions
      </Link>

      <Card className="shadow-card p-6">
        <div className="flex gap-5">
          <VoteControl initial={post.votes} />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-semibold text-foreground">{post.title}</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Asked {post.timeAgo} &middot; viewed 214 times
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground">{post.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-info/10 text-info">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
              asked by <span className="font-medium text-foreground">{post.author}</span>
            </div>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="mb-3 text-sm font-medium text-foreground">2 Answers</h2>
        <div className="space-y-4">
          <Card className="shadow-card border-success/40 p-6">
            <div className="flex gap-5">
              <VoteControl initial={31} />
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    <CheckCircle2 className="mr-1 size-3.5" /> Accepted answer
                  </Badge>
                  <Badge variant="secondary">Top 10% Contributor</Badge>
                </div>
                <ol className="list-decimal space-y-1 pl-5 text-sm text-foreground">
                  <li>Add the CA and client cert paths under the source&apos;s TLS config block.</li>
                  <li>Set <code className="rounded bg-muted px-1 py-0.5 text-xs">verifyServer: true</code> to enforce chain validation.</li>
                  <li>Reference the private key via a Secret, never inline.</li>
                </ol>
                <pre className="mt-3 overflow-x-auto rounded-md bg-foreground p-4 font-mono text-xs text-background">
{`SOURCE MqttSecure CONFIG {
  uri: "ssl://broker.internal:8883",
  tls: {
    ca: Secret.mqttCa,
    cert: Secret.mqttClientCert,
    key: Secret.mqttClientKey,
    verifyServer: true
  }
}`}
                </pre>
                <p className="mt-4 text-xs text-muted-foreground">answered by SoftServe</p>
              </div>
            </div>
          </Card>

          <Card className="shadow-card p-6">
            <div className="flex gap-5">
              <VoteControl initial={6} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">
                  Adding to the accepted answer &mdash; if you&apos;re on a self-signed broker in a dev
                  environment, you can drop <code className="rounded bg-muted px-1 py-0.5 text-xs">verifyServer</code>{" "}
                  to false, just don&apos;t ship that to production.
                </p>
                <p className="mt-4 text-xs text-muted-foreground">answered by Infosys Cloud</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="shadow-card p-6">
        <h2 className="mb-3 text-sm font-medium text-foreground">Your Answer</h2>
        <Textarea placeholder="Share what worked for you..." rows={5} />
        <Button className="mt-3">Post Answer</Button>
      </Card>
    </div>
  );
}
