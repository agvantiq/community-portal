"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEventComments } from "@/lib/event-comments";
import { useRole } from "@/components/shell/role-provider";
import { useRegisteredEvents } from "@/lib/registered-events";
import { initials } from "@/lib/org-roster";
import type { CommunityEvent } from "@/lib/community-data";

function formatCommentTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

/** Shared by both the upcoming-event ("Discussion") and past-event ("Comments") hub
 * views. Reading is open to everyone; posting is gated on event registration. */
export function EventCommentsThread({ event, heading }: { event: CommunityEvent; heading: string }) {
  const { getComments, addComment } = useEventComments();
  const { info } = useRole();
  const { isRegistered, register } = useRegisteredEvents();
  const [draft, setDraft] = React.useState("");

  const comments = getComments(event.id);
  const canPost = isRegistered(event.id);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    addComment(event.id, draft, info.user);
    setDraft("");
  }

  return (
    <Card className="shadow-card p-6">
      <h2 className="mb-4 text-sm font-medium text-foreground">
        {heading} {comments.length > 0 && <span className="text-muted-foreground">({comments.length})</span>}
      </h2>

      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments yet — be the first to weigh in.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                  {initials(c.authorName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-sm font-medium text-foreground">{c.authorName}</span>
                  <span className="text-xs text-muted-foreground">
                    {c.authorTitle}
                    {c.authorOrg ? ` · ${c.authorOrg}` : ""}
                  </span>
                  <span className="text-xs text-muted-foreground">&middot; {formatCommentTime(c.createdAt)}</span>
                </div>
                <p className="mt-1 text-sm text-foreground">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 border-t border-border pt-4">
        {canPost ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Share a question, note, or update..."
              rows={3}
            />
            <Button type="submit" size="sm" disabled={!draft.trim()}>
              Post Comment
            </Button>
          </form>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-muted/50 p-3">
            <p className="text-sm text-muted-foreground">Register for this event to join the discussion.</p>
            <Button size="sm" onClick={() => register(event)}>
              Register
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
