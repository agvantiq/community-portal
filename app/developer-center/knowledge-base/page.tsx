import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { KB_SECTIONS } from "@/lib/developer-data";
import { ChevronRight } from "lucide-react";

export default function KnowledgeBasePage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/developer-center" className="hover:text-foreground">
            &larr; Developer Hub
          </Link>
        }
        title="Knowledge Base"
        description="Getting-started material, product documentation, and articles — organized to match the Vantiq Knowledge Base."
      >
        <BookmarkButton
          item={{
            id: "/developer-center/knowledge-base",
            label: "Knowledge Base",
            href: "/developer-center/knowledge-base",
            iconKey: "Code2",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KB_SECTIONS.map((section) => (
          <Card key={section.title} className="shadow-card p-6">
            <h2 className="text-sm font-medium text-foreground">{section.title}</h2>
            <div className="mt-4 space-y-1">
              {section.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                >
                  <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                  {link.label}
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
