"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PartyPopper, BadgeCheck } from "lucide-react";
import {
  TECHNICAL_PATHS,
  DEFAULT_TECHNICAL_PATH_ID,
  SALES_ENABLEMENT_TRACKS,
  SALES_FOUNDATIONS_TRACK,
  getCourseById,
  type TechnicalPath,
} from "@/lib/sample-data";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { ConfettiOverlay } from "@/components/confetti-overlay";
import { cn } from "@/lib/utils";

type DotStatus = "done" | "current" | "upcoming";

/**
 * Which path a role's tracker follows. Technical always tracks the same
 * default path. Sales has three tracks with no single default — show
 * whichever one the partner has actually registered a course in, falling
 * back to Foundations if none yet. Shared by every TrackingPathCard caller
 * that only knows "sales or not" rather than a specific path (the main
 * dashboard, the first-time-partner dashboard).
 */
export function resolveTrackedPath(isSales: boolean, isRegistered: (courseId: string) => boolean): TechnicalPath {
  if (!isSales) return TECHNICAL_PATHS.find((p) => p.id === DEFAULT_TECHNICAL_PATH_ID)!;
  return (
    SALES_ENABLEMENT_TRACKS.find((t) => t.modules.some((m) => isRegistered(m.courseId))) ??
    SALES_FOUNDATIONS_TRACK
  );
}

function CourseDot({ status }: { status: DotStatus }) {
  return (
    <div
      className={cn(
        "shrink-0 rounded-full border-2 transition-all",
        // The current step is the one thing on the timeline you should look
        // at first — it's the only dot that grows, so "you are here" reads
        // at a glance instead of every step competing at the same size.
        status === "current"
          ? "size-4 border-primary bg-card ring-4 ring-primary/20"
          : status === "done"
            ? "size-3 border-primary bg-primary"
            : "size-3 border-border bg-card"
      )}
    />
  );
}

// Three real weights instead of one repeated bold — current leads (bold,
// primary), done follows (medium, ink), upcoming recedes (normal, muted).
function stepLabelClass(status: DotStatus) {
  return cn(
    "text-sm",
    status === "current"
      ? "font-semibold text-primary"
      : status === "done"
        ? "font-medium text-foreground"
        : "font-normal text-muted-foreground"
  );
}

// Shared "Path" progress module — the same roadmap partners see on the
// default dashboard, reused wherever a partner should see their enrollment
// progress (e.g. once a first-time partner registers for a path, or embedded
// header/footer-less into the Learning Hub's own path card). Dots are the
// path's actual lessons, in order — no offline/shadowing activities, no
// abstract "step" framing. A course counts as done once the partner has
// actually registered for it (see lib/registered-courses.tsx), so the
// roadmap is genuinely completable, not a static illustration.
export function TrackingPathCard({
  path,
  celebrateOnComplete = true,
  showHeader = true,
  showFooter = true,
}: {
  path: TechnicalPath;
  /**
   * Whether finishing every course fires the full celebration — confetti and
   * the exuberant "All done!" finish dot. Defaults on for every caller (the
   * dashboard's Partner and Vantiq Employee roles both earn it); pass false
   * only where a dignified, confetti-free "Path complete" reads better (e.g.
   * an embedded/secondary rendering of the same path).
   */
  celebrateOnComplete?: boolean;
  /** The "Path" header bar — off when a parent already shows the path name (e.g. Learning Hub's own tab switcher). */
  showHeader?: boolean;
  /** The "Current course" + Resume/Browse footer bar — off where a resume action doesn't make sense (e.g. embedded in the Learning Hub, which *is* the place to browse/resume). */
  showFooter?: boolean;
}) {
  const { isRegistered } = useRegisteredCourses();

  const courses = path.modules
    .map((m) => getCourseById(m.courseId))
    .filter((c): c is NonNullable<typeof c> => !!c);

  const doneFlags = courses.map((c) => isRegistered(c.id));
  const completedCount = doneFlags.filter(Boolean).length;
  const totalCount = courses.length;
  const allComplete = totalCount > 0 && completedCount === totalCount;
  const firstIncompleteIndex = doneFlags.findIndex((done) => !done);

  const statuses: DotStatus[] = courses.map((_, i) =>
    doneFlags[i] ? "done" : i === firstIncompleteIndex ? "current" : "upcoming"
  );

  // Everyone who actually finishes the path sees the "finished" treatment; the
  // roadmap is no longer perpetually in-progress for non-celebration roles.
  // It's the confetti that stays role-gated (see the effect below), not the
  // sense of completion itself.
  const showCompleteState = allComplete;
  // Celebration roles get an exuberant finish (PartyPopper + "All done!");
  // everyone else gets a calm, dignified one (BadgeCheck + "Path complete").
  const FinishIcon = celebrateOnComplete ? PartyPopper : BadgeCheck;
  const finishLabel = celebrateOnComplete ? "All done!" : "Path complete";

  const currentEnrollment = showCompleteState
    ? "All courses complete!"
    : (courses[firstIncompleteIndex]?.title ?? courses[courses.length - 1]?.title ?? "");

  // Nodes = every course dot plus one trailing "finish" dot, so the line and
  // grid math below treat the celebration marker as just one more stop on
  // the same timeline rather than a special case.
  const nodeCount = totalCount + 1;
  const dotCenterPercent = (i: number) => ((i + 0.5) / nodeCount) * 100;
  const lineInsetPercent = dotCenterPercent(0);
  const lineSpanPercent = dotCenterPercent(nodeCount - 1) - lineInsetPercent;
  const filledIndex = showCompleteState ? nodeCount - 1 : Math.max(firstIncompleteIndex, 0);
  const lineFilledPercent = dotCenterPercent(filledIndex) - lineInsetPercent;

  // Fire the confetti the first time this path is found complete, then never
  // again — persisted per path rather than watched as a live state
  // transition, because registering the final course happens on a different
  // page (Courses Catalog or a path page) than this card lives on, so
  // whichever page the partner visits first afterward (Dashboard or Learning
  // Hub, both render this component) is the one that catches it.
  const celebratedKey = `community-portal-celebrated-${path.id}`;
  const [celebrate, setCelebrate] = React.useState(false);
  React.useEffect(() => {
    if (!celebrateOnComplete || !allComplete) return;
    if (window.localStorage.getItem(celebratedKey)) return;
    window.localStorage.setItem(celebratedKey, "true");
    setCelebrate(true);
  }, [celebrateOnComplete, allComplete, celebratedKey]);

  const wrapped = showHeader || showFooter;

  return (
    <div
      data-tour={showFooter ? "journey" : undefined}
      className={wrapped ? "overflow-hidden rounded-xl border border-border bg-card shadow-card" : ""}
    >
      <ConfettiOverlay active={celebrate} onDone={() => setCelebrate(false)} />

      {showHeader && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/25 px-5 py-3.5">
          <div className="flex items-baseline gap-2">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Path
            </h2>
            <span className="text-sm font-semibold text-primary">{path.label}</span>
          </div>
        </div>
      )}

      {/* Mobile: vertical list — dot, course title, then the finish marker. */}
      <div className="divide-y divide-border sm:hidden">
        {courses.map((course, i) => (
          <Link
            key={course.id}
            href={`/academy/courses/${course.id}`}
            className="flex w-full items-start gap-3 px-5 py-4 text-left"
          >
            <CourseDot status={statuses[i]} />
            <p className={stepLabelClass(statuses[i])}>{course.title}</p>
          </Link>
        ))}
        <div className="flex w-full items-center gap-3 px-5 py-4">
          <FinishIcon
            className={cn("size-4 shrink-0", showCompleteState ? "text-primary" : "text-muted-foreground/50")}
          />
          <p className={showCompleteState ? "text-sm font-semibold text-foreground" : "text-sm font-normal text-muted-foreground"}>
            {showCompleteState ? finishLabel : "Finish"}
          </p>
        </div>
      </div>

      {/* Desktop: dot-and-line timeline. Each dot and its title live in the
          same grid column so they stay aligned; the connecting line is drawn
          separately behind them, ending exactly at each dot's center. */}
      <div className="hidden px-6 pb-6 pt-8 sm:block">
        <div className="relative grid gap-4" style={{ gridTemplateColumns: `repeat(${nodeCount}, minmax(0, 1fr))` }}>
          <div
            className="pointer-events-none absolute top-1.5 h-px bg-border"
            style={{ left: `${lineInsetPercent}%`, width: `${lineSpanPercent}%` }}
          />
          <div
            className="pointer-events-none absolute top-1.5 h-px bg-primary"
            style={{ left: `${lineInsetPercent}%`, width: `${lineFilledPercent}%` }}
          />
          {courses.map((course, i) => (
            <Link
              key={course.id}
              href={`/academy/courses/${course.id}`}
              className="relative flex flex-col items-center gap-1.5 text-center"
            >
              <CourseDot status={statuses[i]} />
              <p className={cn("line-clamp-2", stepLabelClass(statuses[i]))}>{course.title}</p>
            </Link>
          ))}
          <div className="relative flex flex-col items-center gap-1.5 text-center">
            <FinishIcon
              className={cn("size-3.5 shrink-0", showCompleteState ? "text-primary" : "text-muted-foreground/50")}
            />
            <p className={showCompleteState ? "text-sm font-semibold text-foreground" : "text-sm font-normal text-muted-foreground"}>
              {showCompleteState ? finishLabel : "Finish"}
            </p>
          </div>
        </div>
      </div>

      {showFooter && (
        // Tinted as one contained strip (not a bare justify-between split) so
        // the course name and its Resume button read as one grouped unit —
        // the CTA for THIS text — instead of the button floating apart at the
        // far edge of a wide card.
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-secondary/25 px-5 py-4">
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Current course
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-primary">{currentEnrollment}</p>
          </div>
          <Link href={showCompleteState ? "/academy/courses" : "/academy"}>
            <Button size="sm">{showCompleteState ? "Browse more courses" : "Resume"}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
