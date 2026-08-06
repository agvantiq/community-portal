"use client";

import * as React from "react";

const COLORS = [
  "var(--primary)",
  "var(--emphasis)",
  "var(--info)",
  "var(--success)",
  "var(--critical)",
];

interface Piece {
  id: number;
  leftPercent: number;
  durationS: number;
  delayS: number;
  color: string;
  widthPx: number;
}

function makePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    leftPercent: Math.random() * 100,
    durationS: 3 + Math.random() * 2,
    // Staggered across most of the window (not just the first ~1s) so the
    // burst reads as a sustained celebration for the full duration rather
    // than one wave that finishes early and leaves the overlay empty.
    delayS: Math.random() * 5,
    color: COLORS[i % COLORS.length],
    widthPx: 6 + Math.random() * 6,
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
    setPieces(makePieces(150));
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
          className="animate-confetti-fall absolute top-0 rounded-xs"
          style={{
            left: `${piece.leftPercent}%`,
            width: piece.widthPx,
            height: piece.widthPx * 0.4,
            backgroundColor: piece.color,
            animationDuration: `${piece.durationS}s`,
            animationDelay: `${piece.delayS}s`,
          }}
        />
      ))}
    </div>
  );
}
