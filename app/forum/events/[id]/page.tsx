import { COMMUNITY_EVENTS } from "@/lib/community-data";
import { EventHubClient } from "./event-hub-client";

export function generateStaticParams() {
  return COMMUNITY_EVENTS.map((event) => ({ id: event.id }));
}

export default async function EventHubPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = COMMUNITY_EVENTS.find((e) => e.id === id) ?? COMMUNITY_EVENTS[0];

  return <EventHubClient event={event} />;
}
