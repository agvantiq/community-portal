import { DevDocListPage } from "@/components/dev-doc-list-page";
import { WHITEPAPERS } from "@/lib/developer-data";
import { FileText } from "lucide-react";

export default function WhitepapersPage() {
  return (
    <DevDocListPage
      title="Whitepapers"
      description="In-depth technical write-ups on architecture, scale, and AI deployment models."
      icon={FileText}
      items={WHITEPAPERS}
      backHref="/resources"
      backLabel="Resource Hub"
      bookmarkHref="/resources/whitepapers"
    />
  );
}
