"use client";

import * as React from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { useSavedItems, type SavedItem } from "@/lib/saved-items";
import { cn } from "@/lib/utils";

export function BookmarkButton({ item, className }: { item: SavedItem; className?: string }) {
  const { isSaved, toggle } = useSavedItems();
  const saved = isSaved(item.id);

  return (
    <button
      type="button"
      onClick={() => {
        toggle(item);
        toast.success(
          saved ? `Removed "${item.label}" from Saved Items.` : `Saved "${item.label}" to your dashboard.`
        );
      }}
      aria-label={saved ? `Remove ${item.label} from saved items` : `Save ${item.label} to your dashboard`}
      aria-pressed={saved}
      className={cn(
        "flex items-center justify-center rounded-md p-2 text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-primary-foreground",
        className
      )}
    >
      <Bookmark className={cn("size-5", saved && "fill-current")} />
    </button>
  );
}
