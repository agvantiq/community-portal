"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero } from "@/components/page-hero";
import { RESOURCE_FOLDERS } from "@/lib/sample-data";
import { FileText, Presentation, File, Star, BookOpen, ExternalLink, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = { pdf: FileText, deck: Presentation, doc: File } as const;

const RECENT_UPLOADS = [
  { title: "2026 Price List (Partners)", date: "Jul 18" },
  { title: "Federated AI vs. Cloud AI", date: "Jul 12" },
  { title: "Smart City Implementation Deck", date: "Jul 3" },
];

const DOCUMENTATION_LINKS = [
  { title: "Platform Overview", detail: "Core concepts: namespaces, types, procedures, rules." },
  { title: "Admin Guide", detail: "User management, roles, and namespace configuration." },
  { title: "Deployment Guide", detail: "Moving from dev to staging to production." },
];

const RELEASE_NOTES = [
  { version: "1.40", date: "Jul 18", summary: "Native GenAI orchestration on the Edge." },
  { version: "1.39", date: "Jun 25", summary: "Improved WebSocket reconnection handling." },
  { version: "1.38", date: "Jun 2", summary: "New OPC-UA source connector, bug fixes." },
];

function findTargetFolder(hash: string) {
  return RESOURCE_FOLDERS.find((f) => f.files.some((file) => `file-${file.id}` === hash));
}

function getInitialOpenFolders(): string[] {
  const base = [RESOURCE_FOLDERS[0].label];
  if (typeof window === "undefined") return base;
  const hash = window.location.hash.replace("#", "");
  if (!hash) return base;
  const folder = findTargetFolder(hash);
  if (folder && !base.includes(folder.label)) return [...base, folder.label];
  return base;
}

function getInitialHighlight(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace("#", "");
  return hash && findTargetFolder(hash) ? hash : null;
}

export default function ResourcesPage() {
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());
  const [openFolders, setOpenFolders] = React.useState<string[]>(getInitialOpenFolders);
  const [highlightedFileId] = React.useState<string | null>(getInitialHighlight);

  function toggleFavorite(title: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  }

  React.useEffect(() => {
    if (!highlightedFileId) return;
    requestAnimationFrame(() => {
      document.getElementById(highlightedFileId)?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }, [highlightedFileId]);

  return (
    <div className="space-y-6">
      <PageHero
        title="Resource Library"
        description="Analyst reports, case studies, pricing, and technical whitepapers."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="shadow-card p-2 lg:col-span-2">
          <Accordion type="multiple" value={openFolders} onValueChange={setOpenFolders}>
            {RESOURCE_FOLDERS.map((folder) => (
              <AccordionItem key={folder.label} value={folder.label} className="border-b-0 px-4">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  {folder.label}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {folder.files.length}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 pb-2">
                    {folder.files.map((file) => {
                      const Icon = ICONS[file.type];
                      const isFav = favorites.has(file.title);
                      const isHighlighted = highlightedFileId === `file-${file.id}`;
                      return (
                        <div
                          key={file.id}
                          id={`file-${file.id}`}
                          className={cn(
                            "scroll-mt-6 flex items-center gap-3 rounded-md px-2 py-2 hover:bg-muted",
                            isHighlighted && "bg-primary/5 ring-1 ring-primary"
                          )}
                        >
                          <Icon className="size-4 shrink-0 text-muted-foreground" />
                          <span className="flex-1 text-sm text-foreground">{file.title}</span>
                          <button
                            type="button"
                            onClick={() => toggleFavorite(file.title)}
                            aria-label="Toggle favorite"
                          >
                            <Star
                              className={cn(
                                "size-4 text-muted-foreground transition-colors",
                                isFav && "fill-warning text-warning"
                              )}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <Card className="shadow-card p-5">
          <h2 className="mb-3 text-sm font-medium text-foreground">Recent Uploads</h2>
          <div className="space-y-3">
            {RECENT_UPLOADS.map((u) => (
              <div key={u.title} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{u.title}</span>
                <span className="text-xs text-muted-foreground">{u.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card id="documentation" className="shadow-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <BookOpen className="size-4 text-primary" />
            Documentation
          </h2>
          <div className="space-y-2">
            {DOCUMENTATION_LINKS.map((doc) => (
              <div
                key={doc.title}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{doc.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{doc.detail}</p>
                </div>
                <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        <Card id="release-notes" className="shadow-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <Rocket className="size-4 text-primary" />
            Release Notes
          </h2>
          <div className="space-y-2">
            {RELEASE_NOTES.map((note) => (
              <div key={note.version} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Release {note.version}</p>
                  <span className="text-xs text-muted-foreground">{note.date}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{note.summary}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
