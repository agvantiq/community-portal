import Link from "next/link";
import { Card } from "@/components/ui/card";
import { BookmarkButton } from "@/components/bookmark-button";
import { ContentRequestDialog } from "@/components/content-request-dialog";
import { PageBanner } from "@/components/page-banner";
import { SectionHeading } from "@/components/section-heading";
import {
  Lightbulb,
  Library,
  ChevronRight,
  PlayCircle,
  Puzzle,
  Boxes,
  Hammer,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";

interface HubLink {
  href: string;
  icon: LucideIcon;
  label: string;
  description: string;
}

// Mirrors the Sales Hub landing dashboard: covers exactly what the sidebar
// links to under Developer Hub — no Quick Links (that section only ever showed
// a partner's own saved items, not the hub's content) and no flat Knowledge
// Base category grid (that's what the Knowledge Base page itself is for).
// Developer Resources (the renamed Reuse Library) and the Developer Forum
// (the renamed Q&A Forum) sit under Build. API References, Code Recipes,
// Prompt Gallery, and Tips & Tricks are unlinked (see app-sidebar.tsx). Q&A Forum lives under Community Hub now, not
// here — see app-sidebar.tsx.
const REFERENCE_LINKS: HubLink[] = [
  {
    href: "/resources/knowledge-base",
    icon: Lightbulb,
    label: "Knowledge Base",
    description: "Searchable articles, tutorials, and how-tos.",
  },
  {
    href: "/developer-center/how-to-videos",
    icon: PlayCircle,
    label: "Developer How To's",
    description: "Short screen-capture walkthroughs of common tasks.",
  },
  {
    href: "/developer-center/extension-sources",
    icon: Puzzle,
    label: "Extension Sources",
    description: "SDKs and reference connectors for building custom sources.",
  },
];

const BUILD_LINKS: HubLink[] = [
  {
    href: "/developer-center/reusability-catalog",
    icon: Boxes,
    label: "Developer Resources",
    description: "Code snippets, integration patterns, and reusable components.",
  },
  {
    href: "/forum/qa",
    icon: MessagesSquare,
    label: "Developer Forum",
    description: "Ask questions, share answers, and see how other developers solve real integration problems.",
  },
];

function LinkList({ items }: { items: HubLink[] }) {
  return (
    <Card className="shadow-card gap-0 divide-y divide-border p-2">
      {items.map(({ href, icon: Icon, label, description }) => (
        <Link key={href} href={href} className="flex items-center gap-4 p-3.5 transition-colors hover:bg-muted">
          <Icon className="size-5 shrink-0 text-primary-vivid" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          </div>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </Link>
      ))}
    </Card>
  );
}

export default function DeveloperCenterPage() {
  return (
    <div className="space-y-8">
      <PageBanner
        eyebrow="Developer Hub"
        title="Developer Hub"
        description="Everything you need to build on Vantiq — documentation, how-tos, reusable code, and a forum to ask other developers. Pick a module to dive in."
      >
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <ContentRequestDialog
            source="Developer Hub"
            dialogDescription="Product ideas, enhancement requests, or new developer content for the Developer Hub."
            requestTypes={["Product Idea", "Enhancement Request", "New Content", "Bug Report", "Other"]}
          />
          <BookmarkButton
            item={{ id: "/developer-center", label: "Developer Hub", href: "/developer-center", iconKey: "Code2" }}
            className="text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          />
        </div>
      </PageBanner>

      <div>
        <SectionHeading icon={<Library className="size-4 text-primary-vivid" />}>Reference</SectionHeading>
        <LinkList items={REFERENCE_LINKS} />
      </div>

      <div>
        <SectionHeading icon={<Hammer className="size-4 text-primary-vivid" />}>Build</SectionHeading>
        <LinkList items={BUILD_LINKS} />
      </div>
    </div>
  );
}
