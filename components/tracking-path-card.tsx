"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SALES_SPRINT, TECHNICAL_SPRINT, TECHNICAL_PATHS, DEFAULT_TECHNICAL_PATH_ID, getCourseById } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

function StepDot({ status }: { status: "done" | "current" | "upcoming" }) {
  return (
    <div
      className={cn(
        "size-3 shrink-0 rounded-full border-2",
        status === "done"
          ? "border-primary bg-primary"
          : status === "current"
            ? "border-primary bg-card ring-4 ring-primary/20"
            : "border-border bg-card"
      )}
    />
  );
}

function StepPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground">
      {children}
    </span>
  );
}

// Shared "Tracking <Path>" progress module — the same roadmap partners see
// on the default dashboard, reused wherever a partner should see their
// enrollment progress (e.g. once a first-time partner registers for a path).
export function TrackingPathCard({ isSales }: { isSales: boolean }) {
  const sprint = isSales ? SALES_SPRINT : TECHNICAL_SPRINT;
  const currentPhase = sprint.find((p) => p.status === "current") ?? sprint[0];
  const activeTechnicalPath = TECHNICAL_PATHS.find((p) => p.id === DEFAULT_TECHNICAL_PATH_ID);
  const currentModule = activeTechnicalPath?.modules.find((m) => m.status === "current");
  const currentEnrollment = isSales
    ? currentPhase.tasks[0]
    : (getCourseById(currentModule?.courseId ?? "")?.title ?? currentPhase.tasks[0]);

  const badgesEarned = sprint.filter((p) => p.status === "done").length;
  const modulesComplete = isSales
    ? sprint.filter((p) => p.status === "done").reduce((sum, p) => sum + p.tasks.length, 0)
    : (activeTechnicalPath?.modules.filter((m) => m.status === "done").length ?? 0);
  const modulesTotal = isSales
    ? sprint.reduce((sum, p) => sum + p.tasks.length, 0)
    : (activeTechnicalPath?.modules.length ?? 0);
  const modulesLabel = isSales ? "Tasks Complete" : "Courses Complete";

  // Dots sit centered in their grid column, same as the step content below
  // them, so the connecting line has to end at each dot's actual center —
  // not at the 0%/100% edges of the card — to stay aligned with the grid.
  const dotCenterPercent = (i: number) => ((i + 0.5) / sprint.length) * 100;
  const lineInsetPercent = dotCenterPercent(0);
  const lineSpanPercent = dotCenterPercent(sprint.length - 1) - lineInsetPercent;
  const currentIndex = sprint.findIndex((p) => p.status === "current");
  const lastDoneIndex = sprint.reduce((acc, p, i) => (p.status === "done" ? i : acc), -1);
  const filledIndex = currentIndex >= 0 ? currentIndex : Math.max(lastDoneIndex, 0);
  const lineFilledPercent = dotCenterPercent(filledIndex) - lineInsetPercent;

  return (
    <div data-tour="journey" className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3.5">
        <div className="flex items-baseline gap-2">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Tracking
          </h2>
          {!isSales && (
            <span className="text-sm font-semibold text-primary">{activeTechnicalPath?.label} Path</span>
          )}
        </div>
        <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
          <span>
            {modulesComplete}/{modulesTotal} <span className="text-muted-foreground/70">{modulesLabel}</span>
          </span>
          <span className="text-emphasis">
            {badgesEarned} {badgesEarned === 1 ? "Badge" : "Badges"}
          </span>
        </div>
      </div>

      {/* Mobile: vertical step list — dot, "Step N" pill, phase label, timeframe. */}
      <div className="divide-y divide-border sm:hidden">
        {sprint.map((phase, i) => (
          <button
            key={phase.id}
            type="button"
            onClick={() => toast(`${phase.label} details`)}
            className="flex w-full items-start gap-3 px-5 py-4 text-left"
          >
            <StepDot status={phase.status} />
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
              <StepPill>Step {i + 1}</StepPill>
              <p
                className={`text-sm font-semibold ${
                  phase.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                }`}
              >
                {phase.label}
              </p>
              <p className="text-xs text-muted-foreground">{phase.timeframe}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Desktop: dot-and-line timeline. The dot and its "Step N" pill + phase
          label + timeframe live in the same grid column, so they're always
          aligned — the connecting line is drawn separately behind them,
          ending exactly at each dot's center. */}
      <div className="hidden px-6 pb-6 pt-8 sm:block">
        <div className="relative grid gap-4" style={{ gridTemplateColumns: `repeat(${sprint.length}, minmax(0, 1fr))` }}>
          <div
            className="pointer-events-none absolute top-1.5 h-px bg-border"
            style={{ left: `${lineInsetPercent}%`, width: `${lineSpanPercent}%` }}
          />
          <div
            className="pointer-events-none absolute top-1.5 h-px bg-primary"
            style={{ left: `${lineInsetPercent}%`, width: `${lineFilledPercent}%` }}
          />
          {sprint.map((phase, i) => (
            <button
              key={phase.id}
              type="button"
              onClick={() => toast(`${phase.label} details`)}
              className="relative flex flex-col items-center gap-1.5 text-center"
            >
              <StepDot status={phase.status} />
              <StepPill>Step {i + 1}</StepPill>
              <p
                className={`text-sm font-semibold ${
                  phase.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                }`}
              >
                {phase.label}
              </p>
              <p className="text-xs text-muted-foreground">{phase.timeframe}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4">
        <div className="min-w-0">
          <p className="font-mono text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Currently Tracking
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-primary">{currentEnrollment}</p>
        </div>
        <Link href="/academy">
          <Button size="sm">Resume</Button>
        </Link>
      </div>
    </div>
  );
}
