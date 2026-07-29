import type * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EVENT_TYPE_STYLE, type CommunityEvent } from "@/lib/community-data";
import { Clock, MapPin } from "lucide-react";

/** One event row shared by the calendar, "Your Upcoming Events", and "Past Events" —
 * only the trailing `action` differs per context (Register, View Recap, or nothing). */
export function EventRow({
  event,
  dateLabel,
  action,
}: {
  event: CommunityEvent;
  dateLabel?: string;
  action?: React.ReactNode;
}) {
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
          <Link
            href={`/forum/events/${event.id}`}
            className="truncate text-sm font-medium text-foreground hover:text-primary hover:underline"
          >
            {event.title}
          </Link>
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
        {action}
      </div>
    </div>
  );
}
