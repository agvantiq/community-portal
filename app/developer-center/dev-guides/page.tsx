import { DevDocListPage } from "@/components/dev-doc-list-page";
import { DEV_GUIDES } from "@/lib/developer-data";
import { Compass } from "lucide-react";

export default function DevGuidesPage() {
  return (
    <DevDocListPage
      title="Dev Guides"
      description="Deeper conceptual guides for designing systems on Vantiq."
      icon={Compass}
      items={DEV_GUIDES}
      backHref="/resources"
      backLabel="Resources"
      bookmarkHref="/developer-center/dev-guides"
    />
  );
}
