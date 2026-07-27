import { DevDocListPage } from "@/components/dev-doc-list-page";
import { EXTENSION_SOURCES } from "@/lib/developer-data";
import { Puzzle } from "lucide-react";

export default function ExtensionSourcesPage() {
  return (
    <DevDocListPage
      title="Extension Sources"
      description="SDKs and reference connectors for building custom sources."
      icon={Puzzle}
      items={EXTENSION_SOURCES}
      backHref="/developer-center/technical-documents"
      backLabel="Technical Documents"
    />
  );
}
