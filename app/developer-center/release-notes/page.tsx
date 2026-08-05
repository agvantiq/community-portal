import { DevDocListPage } from "@/components/dev-doc-list-page";
import { RELEASE_NOTES_DOCS } from "@/lib/developer-data";
import { Rocket } from "lucide-react";

export default function ReleaseNotesPage() {
  return (
    <DevDocListPage
      title="Release Notes"
      description="Version-by-version changes, fixes, and new capabilities."
      icon={Rocket}
      items={RELEASE_NOTES_DOCS}
      backHref="/resources"
      backLabel="Resources"
      bookmarkHref="/developer-center/release-notes"
    />
  );
}
