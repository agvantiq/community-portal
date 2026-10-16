"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { EVENT_CATEGORY_COLOR, type CommunityEvent } from "@/lib/events-data";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toDateKey(year: number, month: number, day: number) {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

interface DayCell {
  day: number;
  dateKey: string;
  inCurrentMonth: boolean;
  isToday: boolean;
}

/** Six full weeks (42 cells), the way most month-grid calendars render — leading/trailing days from the adjacent months fill out the first and last rows. */
function buildMonthGrid(year: number, month: number, todayKey: string): DayCell[] {
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: DayCell[] = [];

  for (let i = startWeekday - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    cells.push({ day, dateKey: toDateKey(prevYear, prevMonth, day), inCurrentMonth: false, isToday: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = toDateKey(year, month, day);
    cells.push({ day, dateKey, inCurrentMonth: true, isToday: dateKey === todayKey });
  }

  let nextDay = 1;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  while (cells.length < 42) {
    cells.push({
      day: nextDay,
      dateKey: toDateKey(nextYear, nextMonth, nextDay),
      inCurrentMonth: false,
      isToday: false,
    });
    nextDay++;
  }

  return cells;
}

export function EventCalendar({ events }: { events: CommunityEvent[] }) {
  const today = React.useMemo(() => new Date(), []);
  const todayKey = React.useMemo(
    () => toDateKey(today.getFullYear(), today.getMonth(), today.getDate()),
    [today]
  );
  const [viewDate, setViewDate] = React.useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const cells = React.useMemo(() => buildMonthGrid(year, month, todayKey), [year, month, todayKey]);

  const eventsByDate = React.useMemo(() => {
    const map = new Map<string, CommunityEvent[]>();
    for (const event of events) {
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    }
    return map;
  }, [events]);

  return (
    <div className="flex flex-col">
      <SectionHeading
        className="mb-0 min-h-8"
        icon={<CalendarDays className="size-4 text-primary-vivid" />}
        action={
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Previous month"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Next month"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        }
      >
        {MONTH_LABELS[month]} {year}
      </SectionHeading>

      <Card className="shadow-card mt-4 flex flex-1 flex-col justify-center p-6">
        {/* Dots carry only two tones (see lib/events-data.ts) — specific
            category names live on the badges in the lists below, so the
            legend explains what the two colors mean rather than repeating
            a 5-way key that would mostly repeat the same dot. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn("size-2 shrink-0 rounded-full", EVENT_CATEGORY_COLOR["Office Hours"])} />
            Regular session
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn("size-2 shrink-0 rounded-full", EVENT_CATEGORY_COLOR.Summit)} />
            Summit
          </span>
        </div>

        <div className="mt-4 grid grid-cols-7 overflow-hidden rounded-md border border-border">
          {WEEKDAY_LABELS.map((label) => (
            <div
              key={label}
              className="border-b border-border bg-muted px-2 py-1.5 text-center text-xs font-medium text-muted-foreground"
            >
              {label}
            </div>
          ))}
          {cells.map((cell, i) => {
            const dayEvents = eventsByDate.get(cell.dateKey) ?? [];
            return (
              <div
                key={cell.dateKey + i}
                className={cn(
                  "min-h-11 border-b border-r border-border p-1 last:border-r-0 [&:nth-child(7n)]:border-r-0",
                  !cell.inCurrentMonth && "bg-muted/40"
                )}
              >
                <span
                  className={cn(
                    "flex size-4.5 items-center justify-center rounded-full text-xs",
                    cell.isToday
                      ? "bg-primary font-semibold text-primary-foreground"
                      : cell.inCurrentMonth
                        ? "text-foreground"
                        : "text-muted-foreground/50"
                  )}
                >
                  {cell.day}
                </span>
                {dayEvents.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-0.5">
                    {dayEvents.map((event) => (
                      <span
                        key={event.id}
                        title={event.title}
                        className={cn("size-1.5 rounded-full", EVENT_CATEGORY_COLOR[event.category])}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
