import { DevDocListPage } from "@/components/dev-doc-list-page";
import { HOW_TO_VIDEOS } from "@/lib/developer-data";
import { PlayCircle } from "lucide-react";

export default function HowToVideosPage() {
  return (
    <DevDocListPage
      title="How-to Videos"
      description="Short screen-capture walkthroughs of common tasks."
      icon={PlayCircle}
      items={HOW_TO_VIDEOS}
      backHref="/resources"
      backLabel="Resources"
      bookmarkHref="/developer-center/how-to-videos"
    />
  );
}
