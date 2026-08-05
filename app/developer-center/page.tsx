"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { BookmarkButton } from "@/components/bookmark-button";
import { ContentRequestDialog } from "@/components/content-request-dialog";
import { PageBanner } from "@/components/page-banner";
import { ModuleCard } from "@/components/module-card";
import { useSavedItems, SAVED_ITEM_ICONS } from "@/lib/saved-items";
import { Bookmark } from "lucide-react";
import { TECHNICAL_DOC_MODULES, DEVELOPER_GUIDE_MODULES } from "@/lib/developer-data";

// A saved item "belongs" to Developer Hub if its href lives under this hub's
// own routes, or is the one forum page this hub's nav links out to (Q&A Forum).
function isDeveloperHubItem(href: string) {
  return href.startsWith("/developer-center") || href === "/forum/qa";
}

export default function DeveloperCenterPage() {
  const { items: savedItems } = useSavedItems();
  const quickLinks = savedItems.filter((item) => isDeveloperHubItem(item.href));

  return (
    <div className="space-y-6">
      <PageBanner
        eyebrow="Developer Hub"
        title="Developer Hub"
        description="Everything you need to build on Vantiq — architecture guidance, references, reusable code, and demos. Pick a module to dive in."
        actions={
          <ContentRequestDialog
            source="Developer Hub"
            dialogDescription="Product ideas, enhancement requests, or new developer content for the Developer Hub."
            requestTypes={["Product Idea", "Enhancement Request", "New Content", "Bug Report", "Other"]}
          />
        }
      >
        <BookmarkButton
          item={{ id: "/developer-center", label: "Developer Hub", href: "/developer-center", iconKey: "Code2" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <div>
        <h2 className="mb-4 text-sm font-medium text-emphasis">Quick Links</h2>
        {quickLinks.length === 0 ? (
          <Card className="shadow-card flex flex-col items-center justify-center gap-2 border border-border p-8 text-center">
            <Bookmark className="size-6 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">No quick links yet</p>
            <p className="max-w-sm text-xs text-muted-foreground">
              Click the bookmark icon on any Developer Hub page to pin it here for quick access.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = SAVED_ITEM_ICONS[item.iconKey] ?? Bookmark;
              return (
                <Link key={item.id} href={item.href}>
                  <Card className="shadow-card flex h-full flex-col justify-center border border-border p-4 transition-colors hover:border-primary">
                    <div className="flex size-9 items-center justify-center text-primary">
                      <Icon className="size-5" />
                    </div>
                    <p className="mt-3 text-sm font-medium leading-snug">{item.label}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-emphasis">Knowledge Base</h2>
          <Link href="/resources/knowledge-base" className="text-xs text-emphasis hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...TECHNICAL_DOC_MODULES, ...DEVELOPER_GUIDE_MODULES].map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}
