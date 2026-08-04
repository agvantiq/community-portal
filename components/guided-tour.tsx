"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface TourStep {
  /** CSS selector for the element to spotlight, e.g. '[data-tour="search"]'. */
  target: string;
  title: string;
  description: string;
}

const TOOLTIP_WIDTH = 320;
const TOOLTIP_EST_HEIGHT = 210;
const GAP = 14;
const PAD = 8;

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function GuidedTour({
  steps,
  open,
  onClose,
  onComplete,
}: {
  steps: TourStep[];
  open: boolean;
  onClose: () => void;
  /** Called when the partner finishes the last step — not when they skip or press Escape. */
  onComplete?: () => void;
}) {
  const [index, setIndex] = React.useState(0);
  const [box, setBox] = React.useState<Box | null>(null);

  // Reset to the first step whenever the tour (re)opens.
  React.useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  const step = steps[index];

  React.useLayoutEffect(() => {
    if (!open || !step) return;

    let raf = 0;
    function measure() {
      const el = document.querySelector(step.target) as HTMLElement | null;
      if (!el) {
        setBox(null);
        return;
      }
      const r = el.getBoundingClientRect();
      setBox({ top: r.top, left: r.left, width: r.width, height: r.height });
    }

    const el = document.querySelector(step.target) as HTMLElement | null;
    if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });

    measure();
    // Re-measure after the smooth scroll settles.
    const t = window.setTimeout(measure, 360);
    const onScrollResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScrollResize, true);
    window.addEventListener("resize", onScrollResize);
    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollResize, true);
      window.removeEventListener("resize", onScrollResize);
    };
  }, [open, step]);

  React.useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" || e.key === "ArrowRight") {
        setIndex((i) => (i < steps.length - 1 ? i + 1 : i));
      }
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, steps.length]);

  if (!open || !step) return null;

  const spotlight: Box | null = box
    ? {
        top: box.top - PAD,
        left: box.left - PAD,
        width: box.width + PAD * 2,
        height: box.height + PAD * 2,
      }
    : null;

  // Tooltip placement: below the target if it fits, otherwise above; centered when no target.
  let tooltipStyle: React.CSSProperties;
  if (spotlight) {
    const belowTop = spotlight.top + spotlight.height + GAP;
    const fitsBelow = belowTop + TOOLTIP_EST_HEIGHT < window.innerHeight;
    const top = fitsBelow
      ? belowTop
      : Math.max(GAP, spotlight.top - GAP - TOOLTIP_EST_HEIGHT);
    let left = spotlight.left;
    left = Math.min(left, window.innerWidth - TOOLTIP_WIDTH - GAP);
    left = Math.max(GAP, left);
    tooltipStyle = { top, left, width: TOOLTIP_WIDTH };
  } else {
    tooltipStyle = {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: TOOLTIP_WIDTH,
    };
  }

  const isLast = index === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Click blocker — keeps the page inert during the tour without touching body pointer-events. */}
      <div
        className={cn(
          "absolute inset-0",
          spotlight ? "" : "bg-[rgba(13,61,61,0.55)] transition-colors"
        )}
      />

      {/* Spotlight: a box positioned over the target whose huge box-shadow dims everything else. */}
      {spotlight && (
        <div
          className="pointer-events-none absolute rounded-lg transition-all duration-300 ease-out"
          style={{
            top: spotlight.top,
            left: spotlight.left,
            width: spotlight.width,
            height: spotlight.height,
            boxShadow:
              "0 0 0 3px var(--primary), 0 0 0 9999px rgba(13, 61, 61, 0.55)",
          }}
        />
      )}

      {/* Tooltip card */}
      <div
        className="absolute rounded-xl border border-border bg-card p-5 shadow-lg transition-all duration-300 ease-out"
        style={tooltipStyle}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Step {index + 1} of {steps.length}
        </p>
        <h3 className="mt-1.5 text-lg font-semibold text-emphasis">{step.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{step.description}</p>

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Skip tour
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-4 bg-primary" : "w-1.5 bg-border"
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              {index > 0 && (
                <Button size="sm" variant="outline" onClick={() => setIndex((i) => i - 1)}>
                  Back
                </Button>
              )}
              <Button
                size="sm"
                onClick={() => {
                  if (isLast) {
                    onComplete?.();
                    onClose();
                  } else {
                    setIndex((i) => i + 1);
                  }
                }}
              >
                {isLast ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
