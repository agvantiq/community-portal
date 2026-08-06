"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { asset, cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { FlagshipIndustry } from "@/lib/flagship-industries";

/* Motion: one idea, "the shot is a single object at two sizes".
 *
 * Opening does not cut to a modal, it takes the thumbnail you clicked and
 * grows it into place, so the expanded view is visibly the same object rather
 * than a second copy of it that happened to appear in the middle of the
 * screen. Paging carries the same idea sideways: the next shot enters from the
 * side you paged toward, so a rail of screenshots keeps its left-to-right
 * order instead of hard-cutting and losing your place in the set.
 *
 * Both run on the compositor (transform and opacity), both are short, and
 * neither is load-bearing: the figure's resting state is the finished state,
 * so if the animation never runs the shot is simply there.
 */

/** Confident arrival: quick off the mark, long settle. */
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EXPAND_MS = 420;
const PAGE_MS = 260;
/** How far the incoming shot is offset, in the direction you paged from. */
const PAGE_OFFSET_PX = 32;

/* The dialog's own zoom is switched off, its fade is kept. The expand below is
   then the only scale in play, and an untransformed content box is what makes
   the figure's target rect measurable in the first place. */
const NO_DIALOG_ZOOM = {
  "--tw-enter-scale": "1",
  "--tw-exit-scale": "1",
} as React.CSSProperties;

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Screenshots of the demo's own interface.
 *
 * A horizontal rail of thumbnails, each opening full-size over a dimmed
 * backdrop. These are dense operational UIs, and a thumbnail is only ever an
 * index to the real thing, so the expanded view is where the detail lives.
 *
 * Renders nothing when a demo has no captures yet, rather than showing an
 * apologetic placeholder.
 */
export function DemoGallery({ industry }: { industry: FlagshipIndustry }) {
  const shots = industry.gallery ?? [];
  const [openAt, setOpenAt] = React.useState<number | null>(null);

  const figureRef = React.useRef<HTMLElement | null>(null);
  const runningRef = React.useRef<Animation | null>(null);
  // Where the lightbox should look like it came from: the rect of the
  // thumbnail frame that was clicked, read at click time. Consumed once, by
  // the expand, then cleared, so paging never re-triggers it.
  const originRef = React.useRef<DOMRect | null>(null);
  // Which way the last page went, so the incoming shot knows which side to
  // enter from. 0 means this was an open, not a page.
  const stepRef = React.useRef(0);

  const show = (i: number) => setOpenAt(((i % shots.length) + shots.length) % shots.length);

  const openFrom = (i: number, button: HTMLButtonElement) => {
    const frame = button.querySelector("[data-frame]");
    originRef.current = frame ? frame.getBoundingClientRect() : null;
    stepRef.current = 0;
    show(i);
  };

  const page = (delta: number) => {
    if (openAt === null) return;
    stepRef.current = delta;
    show(openAt + delta);
  };

  // Arrow keys page through the set while the lightbox is open. Escape is
  // already handled by the dialog primitive.
  React.useEffect(() => {
    if (openAt === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); page(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); page(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openAt, shots.length]);

  // Layout effect, so the figure is moved onto the thumbnail before the browser
  // paints it at full size. Both branches end at the figure's resting state, so
  // a skipped run costs nothing but the movement.
  useIsomorphicLayoutEffect(() => {
    const el = figureRef.current;
    const origin = originRef.current;
    originRef.current = null;

    if (openAt === null || !el || typeof el.animate !== "function") return;
    if (prefersReducedMotion()) return;

    runningRef.current?.cancel();

    if (origin) {
      const to = el.getBoundingClientRect();
      if (to.width === 0) return;
      // One uniform scale taken off the width, anchored top left: the figure's
      // image lands exactly on the thumbnail's image, and the caption bar below
      // it is a few scaled pixels that read as part of the same frame.
      const scale = origin.width / to.width;
      runningRef.current = el.animate(
        [
          {
            transformOrigin: "top left",
            transform: `translate(${origin.left - to.left}px, ${origin.top - to.top}px) scale(${scale})`,
          },
          { transformOrigin: "top left", transform: "translate(0px, 0px) scale(1)" },
        ],
        { duration: EXPAND_MS, easing: EASE_OUT }
      );
      return;
    }

    const step = stepRef.current;
    if (step === 0) return;
    runningRef.current = el.animate(
      [
        { transform: `translateX(${step * PAGE_OFFSET_PX}px)`, opacity: 0 },
        { transform: "translateX(0px)", opacity: 1 },
      ],
      { duration: PAGE_MS, easing: EASE_OUT }
    );
  }, [openAt]);

  if (shots.length === 0) return null;
  const current = openAt === null ? null : shots[openAt];

  return (
    <>
      {/* Rail. Scrolls horizontally; snaps so a part-scrolled thumbnail doesn't
          sit half-clipped at the edge. */}
      {/* p-1 not px-1: the rail had horizontal breathing room but none at the
          top, so overflow-x-auto clipped the top 4px of each thumbnail's focus
          ring. -mt-1 keeps the rail sitting where it did. */}
      <div className="-mx-1 -mt-1 flex snap-x snap-mandatory gap-4 overflow-x-auto p-1 pb-3">
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={(e) => openFrom(i, e.currentTarget)}
            aria-label={`Expand screenshot ${i + 1} of ${shots.length}: ${shot.caption}`}
            className="group w-[260px] shrink-0 snap-start text-left sm:w-[300px]"
          >
            {/* data-frame: the rect the expanded view grows out of. */}
            <span
              data-frame
              className="block overflow-hidden rounded-lg border border-border bg-surface-sunken transition-colors group-hover:border-primary group-focus-visible:border-primary"
            >
              <Image
                src={asset(shot.src)}
                alt=""
                width={1600}
                height={1000}
                sizes="300px"
                loading={i === 0 ? "eager" : "lazy"}
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </span>
            {/* No `block` here: it overrides the display:-webkit-box that
                line-clamp needs, and the captions run ragged. */}
            <span className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground group-hover:text-foreground">
              {shot.caption}
            </span>
          </button>
        ))}
      </div>

      <Dialog open={openAt !== null} onOpenChange={(o) => !o && setOpenAt(null)}>
        <DialogContent
          className="max-w-[min(1500px,95vw)] gap-0 border-none bg-transparent p-0 shadow-none sm:max-w-[min(1500px,95vw)]"
          style={NO_DIALOG_ZOOM}
          showCloseButton
        >
          <DialogTitle className="sr-only">
            {current ? current.caption : "Demo screenshot"}
          </DialogTitle>

          {current && (
            <figure ref={figureRef} className="overflow-hidden rounded-xl border border-border bg-card">
              <Image
                src={asset(current.src)}
                alt={current.caption}
                width={1600}
                height={1000}
                sizes="95vw"
                priority
                className="h-auto w-full"
              />
              <figcaption className="flex items-center justify-between gap-4 border-t border-border px-5 py-3.5">
                <p className="text-xs leading-relaxed text-muted-foreground">{current.caption}</p>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {(openAt ?? 0) + 1}/{shots.length}
                </span>
              </figcaption>
            </figure>
          )}

          {shots.length > 1 && (
            <>
              <NavButton side="left" onClick={() => page(-1)} />
              <NavButton side="right" onClick={() => page(1)} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous screenshot" : "Next screenshot"}
      className={cn(
        "absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:border-primary hover:text-primary",
        side === "left" ? "left-2 sm:-left-5" : "right-2 sm:-right-5"
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
