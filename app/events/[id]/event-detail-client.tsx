"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { VideoPlaceholder } from "@/components/video-placeholder";
import { useRole } from "@/components/shell/role-provider";
import { useRegisteredEvents } from "@/lib/registered-events";
import {
  EVENT_CATEGORY_BADGE_CLASS,
  type CommunityEvent,
  type EventComment,
} from "@/lib/events-data";
import { initials } from "@/lib/org-roster";
import {
  PlayCircle,
  FileText,
  Users,
  Clock,
  MapPin,
  ArrowLeft,
  ListChecks,
  Info,
} from "lucide-react";
import { toast } from "sonner";

function parseEventDate(dateKey: string) {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatFullDate(dateKey: string) {
  return parseEventDate(dateKey).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function PanelHeader({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Icon className="size-4 text-primary-vivid" />
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
    </div>
  );
}

function PersonChip({ name, org }: { name: string; org: string }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-7 shrink-0">
        <AvatarFallback className="bg-primary/10 text-[11px] font-medium text-primary-vivid">
          {initials(name)}
        </AvatarFallback>
      </Avatar>
      <div className="leading-tight">
        <p className="text-xs font-medium text-foreground">{name}</p>
        <p className="text-[11px] text-muted-foreground">{org}</p>
      </div>
    </div>
  );
}

function CommentsPanel({
  comments,
  registered,
  signedOut,
  onRegister,
}: {
  comments: EventComment[] | undefined;
  registered: boolean;
  /** Logged-out visitors read the discussion but can't post or register. */
  signedOut: boolean;
  onRegister: () => void;
}) {
  const [comment, setComment] = React.useState("");

  return (
    <Card className="shadow-card p-6">
      <h2 className="mb-3 text-sm font-semibold text-foreground">Comments</h2>
      {comments?.length ? (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-2.5">
              <Avatar className="size-6 shrink-0">
                <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary-vivid">
                  {initials(c.author)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-xs font-medium text-foreground">
                  {c.author}
                  <span className="font-normal text-muted-foreground">{c.timeAgo}</span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No comments yet — be the first to weigh in.</p>
      )}

      {signedOut ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">Sign in to register and join the discussion.</p>
          <Button asChild size="sm" variant="outline">
            <Link href="/">Sign in</Link>
          </Button>
        </div>
      ) : registered ? (
        <div className="mt-4 space-y-2 border-t border-border pt-4">
          <Textarea
            placeholder="Add a comment..."
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            size="sm"
            disabled={!comment.trim()}
            onClick={() => {
              toast.success("Comment posted.");
              setComment("");
            }}
          >
            Post
          </Button>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">Register for this event to join the discussion.</p>
          <Button size="sm" onClick={onRegister}>
            Register
          </Button>
        </div>
      )}
    </Card>
  );
}

export function EventDetailClient({ event }: { event: CommunityEvent }) {
  const { isRegistered, register } = useRegisteredEvents();
  const { role } = useRole();
  const signedOut = role === "onboarding";

  const todayKey = React.useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);
  const isPast = event.date < todayKey;
  const registered = isRegistered(event.id);
  const recap = event.recap;
  const preview = event.preview;

  return (
    <div className="space-y-6">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Events
      </Link>

      <Card className="shadow-card p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className={EVENT_CATEGORY_BADGE_CLASS[event.category]}>
            {event.category}
          </Badge>
          <Badge variant="secondary">{isPast ? "Past Event" : "Upcoming"}</Badge>
          {registered && (
            <Badge variant="secondary" className="bg-success/10 text-success">
              Registered
            </Badge>
          )}
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {event.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {formatFullDate(event.date)} · {event.time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            {event.location}
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-foreground">{event.description}</p>
      </Card>

      {isPast ? (
        <>
          <Card className="shadow-card p-6">
            <PanelHeader icon={PlayCircle} title="Recording" />
            {recap?.recordingMinutes ? (
              <div className="space-y-2">
                <VideoPlaceholder title={`${event.title} — full session`} />
                <p className="text-xs text-muted-foreground">{recap.recordingMinutes} min</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recording available for this session.</p>
            )}
          </Card>

          <Card className="shadow-card p-6">
            <PanelHeader icon={FileText} title="Notes" />
            {recap?.notes?.length ? (
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-foreground">
                {recap.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No notes were posted for this session.</p>
            )}
          </Card>

          <Card className="shadow-card p-6">
            <PanelHeader icon={Users} title="Attendees" />
            {recap?.attendees?.length ? (
              <div>
                <p className="mb-3 text-xs text-muted-foreground">{recap.attendees.length} attended</p>
                <div className="flex flex-wrap gap-3">
                  {recap.attendees.map((a) => (
                    <PersonChip key={a.name} name={a.name} org={a.org} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No attendee list available for this session.</p>
            )}
          </Card>

          <CommentsPanel
            comments={recap?.comments}
            registered={registered}
            signedOut={signedOut}
            onRegister={() => register(event)}
          />
        </>
      ) : (
        <>
          <Card className="shadow-card p-6">
            <PanelHeader icon={ListChecks} title="Agenda" />
            {preview?.agenda?.length ? (
              <div className="space-y-3">
                {preview.agenda.map((item) => (
                  <div key={item.time + item.title} className="flex gap-4">
                    <span className="w-20 shrink-0 text-xs font-medium text-muted-foreground">
                      {item.time}
                    </span>
                    <span className="text-sm text-foreground">{item.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">The agenda hasn&apos;t been published yet.</p>
            )}
          </Card>

          <Card className="shadow-card p-6">
            <PanelHeader icon={Info} title="What to Expect" />
            {preview?.details?.length ? (
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-foreground">
                {preview.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No additional details posted yet.</p>
            )}
          </Card>

          <Card className="shadow-card p-6">
            <PanelHeader icon={Users} title="Who's Registered" />
            {preview?.registeredSoFar?.length || registered ? (
              <div>
                <p className="mb-3 text-xs text-muted-foreground">
                  {(preview?.registeredSoFar?.length ?? 0) + (registered ? 1 : 0)} registered so far
                </p>
                <div className="flex flex-wrap gap-3">
                  {registered && <PersonChip name="You" org="Registered" />}
                  {preview?.registeredSoFar?.map((a) => (
                    <PersonChip key={a.name} name={a.name} org={a.org} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Be the first to register for this event.</p>
            )}
          </Card>

          <CommentsPanel
            comments={preview?.comments}
            registered={registered}
            signedOut={signedOut}
            onRegister={() => register(event)}
          />
        </>
      )}
    </div>
  );
}
