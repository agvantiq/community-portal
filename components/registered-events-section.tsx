import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EventRow } from "@/components/event-row";
import { useRegisteredEvents } from "@/lib/registered-events";
import { isPastEvent } from "@/lib/community-data";
import { CalendarCheck } from "lucide-react";

export function RegisteredEventsSection() {
  const { events } = useRegisteredEvents();
  const upcoming = [...events].filter((e) => !isPastEvent(e)).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <Card className="shadow-card p-5">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-emphasis">
        <CalendarCheck className="size-4 text-primary" />
        Registered Events
      </h2>
      {upcoming.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You haven&apos;t registered for any upcoming events yet — browse what&apos;s coming up below.
        </p>
      ) : (
        <div className="space-y-2">
          {upcoming.map((ev) => (
            <EventRow
              key={ev.id}
              event={ev}
              action={
                <Button asChild size="sm" variant="outline">
                  <Link href={`/forum/events/${ev.id}`}>View</Link>
                </Button>
              }
            />
          ))}
        </div>
      )}
    </Card>
  );
}
