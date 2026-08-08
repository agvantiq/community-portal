"use client";

import * as React from "react";

// On-brand instead of generic-festive: a spread of purple shades (light
// lilac pop through the emphasis violet down to a deep grape) plus dark-teal
// stops (a bright energetic pop teal down through the portal's own ink), so
// the burst still reads as lively rather than flat — the energy comes from
// the VALUE range within each hue family, not from reaching outside them.
const COLORS = [
  "#E0AAFF", // pale lilac — sparkle
  "#C77DFF", // bright light purple
  "#9D4EDD", // vivid medium purple
  "#7B2CBF", // rich violet
  "#5A189A", // deep grape
  "#2EC4B6", // bright teal pop
  "#0F5A5B", // stormy teal (brand primary)
  "#0D3D3D", // dark ink teal
];

interface Piece {
  id: number;
  leftPercent: number;
  durationS: number;
  delayS: number;
  color: string;
  widthPx: number;
  /** Circles read as sequins/dots; rectangles read as streamers — mixing both is what makes a burst look full. */
  shape: "circle" | "rect";
  /** Horizontal sway distance in px, signed — how far the piece swings as it falls, not just straight down. */
  driftPx: number;
  /** Total rotation in degrees, signed — varies per piece so the burst doesn't tumble in lockstep. */
  spinDeg: number;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function makePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    leftPercent: Math.random() * 100,
    durationS: 3 + Math.random() * 2.5,
    // Staggered across most of the 10s window (not just the first couple of
    // seconds) so the burst reads as a sustained celebration rather than one
    // wave that finishes early and leaves the overlay empty toward the end.
    delayS: Math.random() * 6,
    color: COLORS[i % COLORS.length],
    widthPx: 6 + Math.random() * 7,
    shape: Math.random() < 0.5 ? "circle" : "rect",
    driftPx: (Math.random() * 2 - 1) * 60,
    spinDeg: (Math.random() < 0.5 ? -1 : 1) * (480 + Math.random() * 720),
  }));
}

/**
 * Full-viewport confetti burst, shown for `durationMs` whenever `active`
 * flips true — used to celebrate a partner finishing every course in a
 * tracked path (see components/tracking-path-card.tsx). Renders nothing
 * outside that window, so it costs nothing at rest.
 */
export function ConfettiOverlay({
  active,
  durationMs = 10000,
  onDone,
}: {
  active: boolean;
  durationMs?: number;
  onDone?: () => void;
}) {
  const [pieces, setPieces] = React.useState<Piece[] | null>(null);

  React.useEffect(() => {
    if (!active) return;
    // Respect reduced-motion. The completion state already reads in the card
    // (TrackingPathCard's "All done!" / "Path complete" finish dot), so this
    // full-viewport fall is purely decorative — skip it entirely rather than
    // run a 190-piece animation for someone who asked for less motion.
    if (prefersReducedMotion()) {
      onDone?.();
      return;
    }
    setPieces(makePieces(190));
    const timer = setTimeout(() => {
      setPieces(null);
      onDone?.();
    }, durationMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, durationMs]);

  if (!pieces) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={`animate-confetti-fall absolute top-0 ${piece.shape === "circle" ? "rounded-full" : "rounded-xs"}`}
          style={{
            left: `${piece.leftPercent}%`,
            width: piece.widthPx,
            height: piece.shape === "circle" ? piece.widthPx : piece.widthPx * 0.4,
            backgroundColor: piece.color,
            animationDuration: `${piece.durationS}s`,
            animationDelay: `${piece.delayS}s`,
            // Read by the confetti-fall keyframes in globals.css — sway and
            // spin amount, per piece, so the burst tumbles rather than
            // marching straight down in lockstep.
            ["--drift" as string]: `${piece.driftPx}px`,
            ["--spin" as string]: `${piece.spinDeg}deg`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
