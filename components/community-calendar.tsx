"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  COMMUNITY_EVENTS,
  EVENT_TYPE_STYLE,
  EVENT_TYPES,
  type CommunityEvent,
} from "@/lib/community-data";
import { ChevronLeft, ChevronRight, Clock, MapPin, X } from "lucide-react";
import { toast } from "sonner";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABEL = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function buildMonthGrid(year: number, month: number) {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay(); // 0=Sun
  const gridStart = new Date(year, month, 1 - startOffset);
  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    return date;
  });
}

export function CommunityCalendar() {
  // Anchor the visible month to the earliest upcoming event so the grid opens
  // already populated, rather than defaulting to "today" and looking empty.
  const initial = React.useMemo(() => {
    const sorted = [...COMMUNITY_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
    const d = sorted.length ? new Date(`${sorted[0].date}T00:00:00`) : new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  }, []);

  const [year, setYear] = React.useState(initial.year);
  const [month, setMonth] = React.useState(initial.month);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  const eventsByDate = React.useMemo(() => {
    const map = new Map<string, CommunityEvent[]>();
    for (const ev of COMMUNITY_EVENTS) {
      const list = map.get(ev.date) ?? [];
      list.push(ev);
      map.set(ev.date, list);
    }
    return map;
  }, []);

  const days = React.useMemo(() => buildMonthGrid(year, month), [year, month]);

  function changeMonth(delta: number) {
    const next = new Date(year, month + delta, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
    setSelectedDate(null);
  }

  const selectedEvents = selectedDate ? (eventsByDate.get(selectedDate) ?? []) : [];

  const upcomingEvents = React.useMemo(
    () => [...COMMUNITY_EVENTS].sort((a, b) => a.date.localeCompare(b.date)),
    []
  );

  function formatEventDate(iso: string) {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">{MONTH_LABEL.format(new Date(year, month, 1))}</h2>
          <div className="flex items-center gap-1">
            <Button size="icon-sm" variant="outline" aria-label="Previous month" onClick={() => changeMonth(-1)}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button size="icon-sm" variant="outline" aria-label="Next month" onClick={() => changeMonth(1)}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-3">
          {EVENT_TYPES.map((type) => (
            <span key={type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className={`size-2 rounded-full ${EVENT_TYPE_STYLE[type].dot}`} />
              {type}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-md border border-border bg-border">
          {WEEKDAY_LABELS.map((d) => (
            <div key={d} className="bg-muted px-2 py-1.5 text-center text-xs font-medium text-muted-foreground">
              {d}
            </div>
          ))}
          {days.map((date) => {
            const key = toDateKey(date);
            const dayEvents = eventsByDate.get(key) ?? [];
            const inMonth = date.getMonth() === month;
            const isSelected = selectedDate === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => dayEvents.length > 0 && setSelectedDate(isSelected ? null : key)}
                className={`flex min-h-[76px] flex-col items-start gap-1 bg-card p-1.5 text-left transition-colors ${
                  !inMonth ? "opacity-40" : ""
                } ${isSelected ? "ring-2 ring-inset ring-primary" : dayEvents.length > 0 ? "hover:bg-accent" : ""}`}
              >
                <span
                  className={`text-xs font-medium ${
                    dayEvents.length > 0 ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {date.getDate()}
                </span>
                <div className="flex flex-wrap gap-1">
                  {dayEvents.slice(0, 3).map((ev) => (
                    <span
                      key={ev.id}
                      className={`size-1.5 rounded-full ${EVENT_TYPE_STYLE[ev.type].dot}`}
                      title={ev.title}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[10px] text-muted-foreground">+{dayEvents.length - 3}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {selectedDate && selectedEvents.length > 0 && (
          <div className="mt-4 rounded-md border border-primary/30 bg-primary/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">
                {new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <button
                type="button"
                onClick={() => setSelectedDate(null)}
                aria-label="Close"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="space-y-2">
              {selectedEvents.map((ev) => (
                <EventRow key={ev.id} event={ev} />
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card className="shadow-card p-5">
        <h2 className="mb-4 text-sm font-medium text-foreground">Upcoming Events</h2>
        <div className="space-y-2">
          {upcomingEvents.map((ev) => (
            <EventRow key={ev.id} event={ev} dateLabel={formatEventDate(ev.date)} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function EventRow({ event, dateLabel }: { event: CommunityEvent; dateLabel?: string }) {
  const style = EVENT_TYPE_STYLE[event.type];
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border p-3">
      <div className="flex min-w-0 items-center gap-3">
        {dateLabel && (
          <div className="flex w-12 shrink-0 flex-col items-center rounded-md bg-muted py-1.5 text-center">
            <span className="text-[10px] uppercase text-muted-foreground">{dateLabel.split(" ")[0]}</span>
            <span className="text-sm font-semibold text-foreground">{dateLabel.split(" ")[1]}</span>
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{event.title}</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5" />
              {event.location}
            </span>
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Badge variant="secondary" className={style.chip}>
          {event.type}
        </Badge>
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast.success(`Registered for ${event.title}.`)}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
