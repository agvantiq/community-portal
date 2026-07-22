"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RESOURCE_FOLDERS } from "@/lib/sample-data";
import { FileText, Presentation, File, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = { pdf: FileText, deck: Presentation, doc: File } as const;

const RECENT_UPLOADS = [
  { title: "2026 Price List (Partners)", date: "Jul 18" },
  { title: "Federated AI vs. Cloud AI", date: "Jul 12" },
  { title: "Smart City Implementation Deck", date: "Jul 3" },
];

export default function ResourcesPage() {
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());

  function toggleFavorite(title: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Resource Library</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Analyst reports, case studies, pricing, and technical whitepapers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="shadow-card p-2 lg:col-span-2">
          <Accordion type="multiple" defaultValue={[RESOURCE_FOLDERS[0].label]}>
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
                      return (
                        <div
                          key={file.title}
                          className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-muted"
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
    </div>
  );
}
