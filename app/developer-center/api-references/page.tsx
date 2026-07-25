import { DevDocListPage } from "@/components/dev-doc-list-page";
import { API_REFERENCES } from "@/lib/developer-data";
import { Link2 } from "lucide-react";

export default function ApiReferencesPage() {
  return (
    <DevDocListPage
      title="API References"
      description="REST, WebSocket, and GraphQL interfaces into the platform."
      icon={Link2}
      items={API_REFERENCES}
    />
  );
}
