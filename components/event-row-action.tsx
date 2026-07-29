"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRegisteredEvents } from "@/lib/registered-events";
import { isPastEvent, type CommunityEvent } from "@/lib/community-data";

/** Register button for an upcoming event, or a "View Recap" link once it's past —
 * shared by the calendar's day popover and the Upcoming Events / Past Events lists. */
export function EventRowAction({ event }: { event: CommunityEvent }) {
  const { isRegistered, register } = useRegisteredEvents();

  if (isPastEvent(event)) {
    return (
      <Button asChild size="sm" variant="outline">
        <Link href={`/forum/events/${event.id}`}>View Recap</Link>
      </Button>
    );
  }

  const registered = isRegistered(event.id);
  return (
    <Button
      size="sm"
      variant={registered ? "secondary" : "outline"}
      disabled={registered}
      onClick={() => register(event)}
    >
      {registered ? "Registered" : "Register"}
    </Button>
  );
}
