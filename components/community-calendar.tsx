"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COMMUNITY_EVENTS, EVENT_TYPE_STYLE, EVENT_TYPES, getUpcomingEvents, type CommunityEvent } from "@/lib/community-data";
import { EventRow } from "@/components/event-row";
import { EventRowAction } from "@/components/event-row-action";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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

/** Just the month grid + day picker — the flat "Upcoming Events" list lives in its
 * own section further down the page. */
export function CommunityCalendar() {
  // Anchor the visible month to the earliest upcoming event so the grid opens
  // already populated, rather than defaulting to "today" and looking empty.
  const initial = React.useMemo(() => {
    const upcoming = getUpcomingEvents();
    const d = upcoming.length ? new Date(`${upcoming[0].date}T00:00:00`) : new Date();
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

  return (
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
              <EventRow key={ev.id} event={ev} action={<EventRowAction event={ev} />} />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
