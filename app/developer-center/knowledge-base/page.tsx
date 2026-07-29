import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { ChevronRight } from "lucide-react";

interface KBLink {
  label: string;
  href: string;
}

interface KBSection {
  title: string;
  links: KBLink[];
}

// Mirrors the structure of the Knowledge Base Vantiq manages externally on
// WordPress (Echo) — same three categories, same grouping — so partners find
// the same organization here as on the external KB, just pointed at the
// portal's own pages instead of a second, separately-maintained copy.
const KB_SECTIONS: KBSection[] = [
  {
    title: "Getting Started",
    links: [
      { label: "Welcome to Vantiq!", href: "/developer-center/documentation" },
      { label: "Tutorials", href: "/developer-center/tutorials" },
    ],
  },
  {
    title: "Product Documentation",
    links: [
      { label: "Reference", href: "/developer-center/vail-reference" },
      { label: "Release Notes", href: "/resources#release-notes" },
      { label: "Glossary", href: "/resources/reference" },
    ],
  },
  {
    title: "Articles",
    links: [
      { label: "Architecture", href: "/developer-center/architecture" },
      { label: "Developer Guides", href: "/developer-center/dev-guides" },
      { label: "Style Guides", href: "/developer-center/style-guides" },
      { label: "Best Practices", href: "/developer-center/best-practices" },
      { label: "Performance", href: "/developer-center/performance" },
      { label: "How To Videos", href: "/developer-center/how-to-videos" },
    ],
  },
];

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
      />

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
