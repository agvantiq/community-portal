"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageBanner } from "@/components/page-banner";
import { Button } from "@/components/ui/button";
import { useSavedItems, SAVED_ITEM_ICONS } from "@/lib/saved-items";
import { Bookmark, ChevronUp, ChevronDown, X } from "lucide-react";

export default function SavedItemsPage() {
  const { items, remove, moveUp, moveDown } = useSavedItems();

  return (
    <div className="space-y-6">
      <PageBanner
        eyebrow="Manage"
        title="Saved Items"
        description="Reorder, remove, or add pages here. The first six show on your Dashboard's Saved Items module, in this order — bookmark any hub page to add more."
      />

      <Card className="shadow-card p-6">
        <h2 className="mb-4 text-sm font-medium text-foreground">
          Your Saved Items ({items.length})
        </h2>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 p-10 text-center">
            <Bookmark className="size-6 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">No saved items yet</p>
            <p className="max-w-xs text-xs text-muted-foreground">
              Click the bookmark icon on any hub page to pin it here for quick access.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item, index) => {
              const Icon = SAVED_ITEM_ICONS[item.iconKey] ?? Bookmark;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-md border border-border p-3"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={item.href}
                      className="truncate text-sm font-medium text-foreground hover:text-primary hover:underline"
                    >
                      {item.label}
                    </Link>
                    <p className="truncate text-xs text-muted-foreground">
                      {index < 6 ? "Shown on Dashboard" : "Not shown on Dashboard (past top 6)"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      size="icon-sm"
                      variant="outline"
                      onClick={() => moveUp(item.id)}
                      disabled={index === 0}
                      aria-label={`Move ${item.label} up`}
                    >
                      <ChevronUp className="size-4" />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="outline"
                      onClick={() => moveDown(item.id)}
                      disabled={index === items.length - 1}
                      aria-label={`Move ${item.label} down`}
                    >
                      <ChevronDown className="size-4" />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="outline"
                      onClick={() => remove(item.id)}
                      aria-label={`Remove ${item.label} from saved items`}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
