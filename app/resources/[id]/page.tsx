import { RESOURCE_CENTER_ITEMS, WELCOME_TO_VANTIQ_ITEM, getResourceById } from "@/lib/developer-data";
import { ResourceDetailClient } from "./resource-detail-client";

export function generateStaticParams() {
  return [...RESOURCE_CENTER_ITEMS, WELCOME_TO_VANTIQ_ITEM].map((r) => ({ id: r.id }));
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resource = getResourceById(id) ?? RESOURCE_CENTER_ITEMS[0];
  return <ResourceDetailClient resource={resource} />;
}
