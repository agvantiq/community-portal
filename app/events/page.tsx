"use client";

import * as React from "react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventCalendar } from "@/components/event-calendar";
import { useRegisteredEvents } from "@/lib/registered-events";
import {
  EVENTS,
  EVENT_CATEGORY_BADGE_CLASS,
  type CommunityEvent,
} from "@/lib/events-data";
import { CalendarCheck, CalendarClock, History, Clock, MapPin } from "lucide-react";

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseEventDate(dateKey: string) {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function DateBadge({ dateKey }: { dateKey: string }) {
  const date = parseEventDate(dateKey);
  return (
    <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-md border border-border bg-muted py-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {MONTH_ABBR[date.getMonth()]}
      </span>
      <span className="text-lg font-semibold text-foreground">{date.getDate()}</span>
    </div>
  );
}

function EventRow({
  event,
  action,
}: {
  event: CommunityEvent;
  action: React.ReactNode;
}) {
  return (
    <div
      id={event.id}
      className="flex flex-wrap items-center gap-4 p-3.5 transition-colors hover:bg-muted sm:flex-nowrap"
    >
      <DateBadge dateKey={event.date} />
      <div className="min-w-0 flex-1">
        <Link href={`/events/${event.id}`} className="text-sm font-medium text-foreground hover:underline">
          {event.title}
        </Link>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {event.time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" />
            {event.location}
          </span>
        </div>
      </div>
      <Badge variant="secondary" className={EVENT_CATEGORY_BADGE_CLASS[event.category]}>
        {event.category}
      </Badge>
      {action}
    </div>
  );
}

export default function EventsPage() {
  const { isRegistered, register, deregister } = useRegisteredEvents();

  const todayKey = React.useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);

  const upcoming = React.useMemo(
    () => EVENTS.filter((e) => e.date >= todayKey).sort((a, b) => a.date.localeCompare(b.date)),
    [todayKey]
  );
  const past = React.useMemo(
    () => EVENTS.filter((e) => e.date < todayKey).sort((a, b) => b.date.localeCompare(a.date)),
    [todayKey]
  );
  const registered = React.useMemo(
    () => upcoming.filter((e) => isRegistered(e.id)),
    [upcoming, isRegistered]
  );

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow="Events"
        title="Events"
        description="Office hours, workshops, webinars, and partner gatherings across the community."
      />

      <div id="registered">
        <SectionHeading icon={<CalendarCheck className="size-4 text-primary-vivid" />}>
          Registered Events
        </SectionHeading>
        {registered.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            You haven&apos;t registered for any upcoming events yet — browse what&apos;s coming up below.
          </p>
        ) : (
          <Card className="shadow-card mt-4 gap-0 divide-y divide-border p-2">
            {registered.map((event) => (
              <EventRow
                key={event.id}
                event={event}
                action={
                  <Button variant="outline" size="sm" onClick={() => deregister(event)}>
                    Registered
                  </Button>
                }
              />
            ))}
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div id="upcoming" className="flex flex-col">
          <SectionHeading className="mb-0 min-h-8" icon={<CalendarClock className="size-4 text-primary-vivid" />}>
            Upcoming Events
          </SectionHeading>
          <Card className="shadow-card mt-4 flex flex-1 flex-col justify-center gap-0 divide-y divide-border p-2">
            {upcoming.map((event) => (
              <EventRow
                key={event.id}
                event={event}
                action={
                  isRegistered(event.id) ? (
                    <Button variant="outline" size="sm" onClick={() => deregister(event)}>
                      Registered
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => register(event)}>
                      Register
                    </Button>
                  )
                }
              />
            ))}
          </Card>
        </div>

        <EventCalendar events={EVENTS} />
      </div>

      <div id="past">
        <SectionHeading
          icon={<History className="size-4 text-primary-vivid" />}
          description="Recordings, notes, and attendee info from sessions that already happened."
        >
          Past Events
        </SectionHeading>
        <Card className="shadow-card mt-4 gap-0 divide-y divide-border p-2">
          {past.map((event) => (
            <EventRow
              key={event.id}
              event={event}
              action={
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/events/${event.id}`}>View Recap</Link>
                </Button>
              }
            />
          ))}
        </Card>
      </div>
    </div>
  );
}
