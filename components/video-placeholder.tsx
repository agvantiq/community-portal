"use client";

import { Play } from "lucide-react";
import { toast } from "sonner";

/**
 * Generic placeholder frame for the real embed — deliberately not a stock
 * graphic. Shared by any course/step/event surface that needs a video slot
 * but has no real recording wired up yet.
 */
export function VideoPlaceholder({ title }: { title: string }) {
  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-primary to-emphasis">
      <button
        type="button"
        onClick={() => toast.message("Video playback isn't available in this preview.")}
        aria-label={`Play: ${title}`}
        className="group flex size-16 items-center justify-center rounded-full bg-card/90 shadow-card transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Play className="size-6 translate-x-0.5 fill-primary text-primary" />
      </button>
      <p className="absolute inset-x-0 bottom-0 truncate bg-linear-to-t from-black/70 via-black/30 to-transparent px-5 pb-4 pt-12 text-sm font-medium text-white">
        {title}
      </p>
    </div>
  );
}
