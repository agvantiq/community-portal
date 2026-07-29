"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EventCommentsThread } from "@/components/event-comments-thread";
import { useRegisteredEvents } from "@/lib/registered-events";
import { initials } from "@/lib/org-roster";
import { EVENT_TYPE_STYLE, isPastEvent, type CommunityEvent } from "@/lib/community-data";
import { ArrowLeft, CheckCircle2, Clock, MapPin, PlayCircle, StickyNote, Users } from "lucide-react";

export function EventHubClient({ event }: { event: CommunityEvent }) {
  const { isRegistered, register, unregister } = useRegisteredEvents();
  const registered = isRegistered(event.id);
  const past = isPastEvent(event);
  const style = EVENT_TYPE_STYLE[event.type];

  return (
    <div className="space-y-6">
      <Link
        href="/forum/events"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to Events
      </Link>

      <Card className="shadow-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className={style.chip}>
                {event.type}
              </Badge>
              {past && <Badge variant="secondary">Past Event</Badge>}
            </div>
            <h1 className="mt-2 text-xl font-semibold text-foreground">{event.title}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {new Date(`${event.date}T00:00:00`).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                &middot; {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" />
                {event.location}
              </span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground">{event.description}</p>
          </div>
          {!past && (
            <Button
              variant={registered ? "secondary" : "default"}
              onClick={() => (registered ? unregister(event.id) : register(event))}
            >
              {registered && <CheckCircle2 className="size-4" />}
              {registered ? "Registered" : "Register"}
            </Button>
          )}
        </div>
      </Card>

      {past && (
        <>
          <Card className="shadow-card p-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <PlayCircle className="size-4 text-primary" />
              Recording
            </h2>
            {event.recording ? (
              <a
                href={event.recording.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Watch recording ({event.recording.durationMinutes} min)
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">No recording available for this session.</p>
            )}
          </Card>

          <Card className="shadow-card p-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <StickyNote className="size-4 text-primary" />
              Notes
            </h2>
            <p className="text-sm text-muted-foreground">
              {event.notes ?? "No notes were posted for this session."}
            </p>
          </Card>

          <Card className="shadow-card p-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <Users className="size-4 text-primary" />
              Attendees
              {event.attendeeCount !== undefined && (
                <span className="text-xs font-normal text-muted-foreground">({event.attendeeCount} total)</span>
              )}
            </h2>
            {event.attendees && event.attendees.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {event.attendees.map((a) => (
                  <div key={a.name} className="flex items-center gap-2 rounded-md border border-border p-2 pr-3">
                    <Avatar className="size-7">
                      <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                        {initials(a.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-foreground">{a.name}</p>
                      <p className="truncate text-[11px] text-muted-foreground">{a.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No attendee list available for this session.</p>
            )}
          </Card>
        </>
      )}

      <EventCommentsThread event={event} heading={past ? "Comments" : "Discussion"} />
    </div>
  );
}
