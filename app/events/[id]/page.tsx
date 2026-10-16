import { EVENTS } from "@/lib/events-data";
import { EventDetailClient } from "./event-detail-client";

export function generateStaticParams() {
  return EVENTS.map((event) => ({ id: event.id }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === id) ?? EVENTS[0];

  return <EventDetailClient event={event} />;
}
