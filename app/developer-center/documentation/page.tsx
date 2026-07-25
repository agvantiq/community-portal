import { DevDocListPage } from "@/components/dev-doc-list-page";
import { TECHNICAL_DOCS } from "@/lib/developer-data";
import { FileText } from "lucide-react";

export default function DocumentationPage() {
  return (
    <DevDocListPage
      title="Documentation"
      description="Language basics, walkthroughs, and integration guidance to go from zero to your first app."
      icon={FileText}
      items={TECHNICAL_DOCS}
      idPrefix="doc"
    />
  );
}
