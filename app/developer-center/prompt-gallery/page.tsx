import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { PROMPT_GALLERY } from "@/lib/developer-data";

export default function PromptGalleryPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/developer-center" className="hover:text-foreground">
            &larr; Developer Hub
          </Link>
        }
        title="Claude Prompt Gallery"
        description="Curated prompts for scaffolding, explaining, and testing VAIL code."
      >
        <BookmarkButton
          item={{
            id: "/developer-center/prompt-gallery",
            label: "Claude Prompt Gallery",
            href: "/developer-center/prompt-gallery",
            iconKey: "Code2",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <Card className="shadow-card p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PROMPT_GALLERY.map((prompt) => (
            <div
              key={prompt.title}
              className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
            >
              <p className="truncate text-sm font-medium text-foreground">{prompt.title}</p>
              <Badge variant="secondary" className="shrink-0 bg-emphasis/10 text-emphasis">
                {prompt.tag}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
