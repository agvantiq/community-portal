import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROMPT_GALLERY } from "@/lib/developer-data";
import { Sparkles } from "lucide-react";

export default function PromptGalleryPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/developer-center" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Developer Hub
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <Sparkles className="size-5 text-primary" />
          Claude Prompt Gallery
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Curated prompts for scaffolding, explaining, and testing VAIL code.
        </p>
      </div>

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
