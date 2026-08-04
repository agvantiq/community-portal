"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  SALES_SPRINT,
  TECHNICAL_SPRINT,
  TECHNICAL_PATHS,
  DEFAULT_TECHNICAL_PATH_ID,
  getCourseById,
} from "@/lib/sample-data";
import { Award, ChevronRight } from "lucide-react";

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
  const progressPercent = isSales
    ? Math.round((modulesComplete / modulesTotal) * 100)
    : (activeTechnicalPath?.modules.find((m) => m.status === "current")?.progress ??
      Math.round((modulesComplete / modulesTotal) * 100));
  const nextMilestoneLabel = `${currentPhase.label} Badge`;

  const timelinePercent = (i: number) => (sprint.length > 1 ? (i / (sprint.length - 1)) * 100 : 0);
  const currentIndex = sprint.findIndex((p) => p.status === "current");
  const lastDoneIndex = sprint.reduce((acc, p, i) => (p.status === "done" ? i : acc), -1);
  const lineEndPercent = timelinePercent(currentIndex >= 0 ? currentIndex : Math.max(lastDoneIndex, 0));

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

      <div className="divide-y divide-border sm:hidden">
        {sprint.map((phase) => (
          <button
            key={phase.id}
            type="button"
            onClick={() => toast(`${phase.label} details`)}
            className="flex w-full items-center gap-3 px-5 py-3 text-left"
          >
            <div
              className={`size-2.5 shrink-0 rotate-45 border-2 ${
                phase.status === "done"
                  ? "border-primary bg-primary"
                  : phase.status === "current"
                    ? "border-primary bg-card ring-4 ring-primary/20"
                    : "border-border bg-card"
              }`}
            />
            <div className="min-w-0 flex-1">
              <p
                className={`font-mono text-[11px] font-semibold uppercase tracking-wide ${
                  phase.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                }`}
              >
                {phase.label}
              </p>
              <p className="text-[10px] text-muted-foreground/70">{phase.timeframe}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="hidden px-6 py-10 sm:block">
        <div className="relative h-4">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
          <div
            className="absolute top-1/2 left-0 h-px -translate-y-1/2 bg-primary"
            style={{ width: `${lineEndPercent}%` }}
          />
          {sprint.map((phase, i) => (
            <button
              key={phase.id}
              type="button"
              onClick={() => toast(`${phase.label} details`)}
              className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${timelinePercent(i)}%` }}
            >
              <div
                className={`absolute ${i % 2 === 0 ? "-top-11" : "top-5"} flex w-max max-w-[9rem] flex-col gap-0.5 ${
                  i === 0
                    ? "left-0 items-start text-left"
                    : i === sprint.length - 1
                      ? "right-0 items-end text-right"
                      : "left-1/2 -translate-x-1/2 items-center text-center"
                }`}
              >
                <span
                  className={`font-mono text-[10px] font-semibold uppercase tracking-wide ${
                    phase.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {phase.label}
                </span>
                <span className="text-[10px] text-muted-foreground/70">{phase.timeframe}</span>
              </div>
              <div
                className={`size-3 rotate-45 border-2 ${
                  phase.status === "done"
                    ? "border-primary bg-primary"
                    : phase.status === "current"
                      ? "border-primary bg-card ring-4 ring-primary/20"
                      : "border-border bg-card"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="flex items-center justify-between gap-3 px-5 py-4">
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
        <Link
          href="/academy"
          className="flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-muted/40"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center text-primary">
              <Award className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Next Milestone
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-primary">
                {nextMilestoneLabel} · {progressPercent}% complete
              </p>
            </div>
          </div>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
