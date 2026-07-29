import Link from "next/link";
import { Card } from "@/components/ui/card";
import { EventRow } from "@/components/event-row";
import { EventRowAction } from "@/components/event-row-action";
import { getUpcomingEvents, getCurrentTopicOfMonth } from "@/lib/community-data";

function formatEventDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** The full upcoming events list. Topic of the Month renders as a short description
 * under the heading rather than its own standalone card. */
export function UpcomingEventsSection() {
  const upcomingEvents = getUpcomingEvents();
  const topic = getCurrentTopicOfMonth();

  return (
    <Card className="shadow-card p-5">
      <h2 className="text-sm font-medium text-foreground">Upcoming Events</h2>
      {topic && (
        <p className="mt-1 mb-4 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Topic of the Month — {topic.category}:</span>{" "}
          {topic.title}. {topic.summary}
          {topic.relatedEventId && (
            <>
              {" "}
              <Link
                href={`/forum/events/${topic.relatedEventId}`}
                className="font-medium text-primary hover:underline"
              >
                View session
              </Link>
            </>
          )}
        </p>
      )}
      <div className={topic ? "space-y-2" : "mt-4 space-y-2"}>
        {upcomingEvents.map((ev) => (
          <EventRow
            key={ev.id}
            event={ev}
            dateLabel={formatEventDate(ev.date)}
            action={<EventRowAction event={ev} />}
          />
        ))}
      </div>
    </Card>
  );
}
