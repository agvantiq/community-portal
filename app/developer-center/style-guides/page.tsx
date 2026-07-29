import { DevDocListPage } from "@/components/dev-doc-list-page";
import { STYLE_GUIDES } from "@/lib/developer-data";
import { Palette } from "lucide-react";

export default function StyleGuidesPage() {
  return (
    <DevDocListPage
      title="Style Guides"
      description="Naming, structure, and documentation conventions for VAIL code."
      icon={Palette}
      items={STYLE_GUIDES}
      backHref="/developer-center/knowledge-base"
      backLabel="Knowledge Base"
    />
  );
}
