import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { SectionHeading } from "@/components/section-heading";
import { asset } from "@/lib/utils";
import {
  EXTENSION_SOURCES_INTRO,
  EXTENSION_SOURCES_SECTIONS,
  type Block,
  type Inline,
} from "@/lib/extension-sources-page";

// Content mirrors community.vantiq.com/devcenter/extension-sources/
// (see lib/extension-sources-page.ts). Every link opens the real page in a new tab.

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="break-words text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
    >
      {children}
    </a>
  );
}

function Parts({ parts }: { parts: Inline[] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <React.Fragment key={i}>{part}</React.Fragment>
        ) : (
          <Ext key={i} href={part.href}>
            {part.text}
          </Ext>
        ),
      )}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.kind === "p") return <p><Parts parts={block.parts} /></p>;
  if (block.kind === "ul") {
    return (
      <ul className="list-disc space-y-1.5 pl-5">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(block.src)}
      alt={block.alt}
      width={block.width}
      height={block.height}
      className="h-auto w-full max-w-xl rounded-md border border-border bg-white"
    />
  );
}

export default function ExtensionSourcesPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/developer-center" className="hover:text-foreground">
            &larr; Developer Hub
          </Link>
        }
        title="Extension Sources"
        description={EXTENSION_SOURCES_INTRO}
      >
        <BookmarkButton
          item={{
            id: "/developer-center/extension-sources",
            label: "Extension Sources",
            href: "/developer-center/extension-sources",
            iconKey: "Code2",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <div className="max-w-3xl space-y-8">
        <nav aria-label="On this page" className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm font-medium">
          {EXTENSION_SOURCES_SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-primary hover:underline">
              {s.title}
            </a>
          ))}
        </nav>

        {EXTENSION_SOURCES_SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-6">
            <SectionHeading>{s.title}</SectionHeading>
            <Card className="shadow-card gap-0 p-6 text-sm text-muted-foreground">
              <h4 className="text-sm font-semibold text-foreground">{s.subtitle}</h4>
              <div className="mt-2 space-y-3">
                {s.blocks.map((b, i) => (
                  <BlockView key={i} block={b} />
                ))}
              </div>
            </Card>
          </section>
        ))}
      </div>
    </div>
  );
}
