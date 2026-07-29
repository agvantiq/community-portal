import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EventRow } from "@/components/event-row";
import { getPastEvents } from "@/lib/community-data";
import { History } from "lucide-react";

export function PastEventsList() {
  const past = getPastEvents();
  if (past.length === 0) return null;

  function formatEventDate(iso: string) {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return (
    <Card className="shadow-card p-5">
      <h2 className="mb-1 flex items-center gap-2 text-sm font-medium text-emphasis">
        <History className="size-4 text-primary" />
        Past Events
      </h2>
      <p className="mb-4 text-xs text-muted-foreground">
        Recordings, notes, and attendee info from sessions that already happened.
      </p>
      <div className="space-y-2">
        {past.map((ev) => (
          <EventRow
            key={ev.id}
            event={ev}
            dateLabel={formatEventDate(ev.date)}
            action={
              <Button asChild size="sm" variant="outline">
                <Link href={`/forum/events/${ev.id}`}>View Recap</Link>
              </Button>
            }
          />
        ))}
      </div>
    </Card>
  );
}
