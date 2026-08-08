"use client";

import * as React from "react";
import Link from "next/link";
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
import { useDismissedPaths } from "@/lib/dismissed-paths";
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
  // The current step is the one thing on the timeline you should look at
  // first — it's the only dot that grows and pulses, so "you are here, click
  // here" reads at a glance instead of every step competing at the same size.
  // It's also now the roadmap's one interactive "resume" affordance (the
  // footer button it replaced), so it earns being the single animated moment
  // on this timeline.
  if (status === "current") {
    return (
      <span className="relative flex size-4 shrink-0 items-center justify-center">
        <span className="absolute inline-flex size-4 animate-ping rounded-full bg-primary/50 motion-reduce:animate-none" />
        <span className="relative size-4 rounded-full border-2 border-primary bg-card ring-4 ring-primary/20" />
      </span>
    );
  }
  return (
    <div
      className={cn(
        "shrink-0 rounded-full border-2 transition-all",
        status === "done" ? "size-3 border-primary bg-primary" : "size-3 border-border bg-card"
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
  bordered = true,
  squareTopLeft = false,
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
  /** The "{path} path" label above the card — off when a parent already shows the path name (e.g. Learning Hub's own tab switcher, or TrackingPathSwitcher's own tab row). */
  showHeader?: boolean;
  /**
   * Whether the current-step dot acts as this card's "resume" affordance,
   * linking to the Learning Hub instead of straight to its own course page.
   * Off where that would be circular — embedded in the Learning Hub itself,
   * which *is* the place to browse/resume.
   */
  showFooter?: boolean;
  /** The card chrome (border/shadow/bg) around the timeline — independent of showHeader, since TrackingPathSwitcher wants the card but supplies its own header. Off where a parent already supplies its own card (the Learning Hub). */
  bordered?: boolean;
  /** Square off the card's own top-left corner — on when a folder tab sits flush against that exact edge (TrackingPathSwitcher), so the card doesn't show its own rounded corner peeking out from behind the tab. */
  squareTopLeft?: boolean;
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
  // Celebration roles get an exuberant finish (PartyPopper); everyone else
  // gets a calm, dignified one (BadgeCheck) — the icon alone carries it now.
  const FinishIcon = celebrateOnComplete ? PartyPopper : BadgeCheck;

  // Where the current-step dot sends you now that there's no footer Resume
  // button to do it — the Learning Hub is where that course is front and
  // center, so "click where you are" lands you exactly where "Resume" used
  // to. Only applies where this card stands alone (showFooter); embedded
  // inside the Learning Hub itself (showFooter=false), the dot still links to
  // its own course page, since sending it back to the page it's already on
  // would be circular.
  const continueHref = showCompleteState ? "/academy/courses" : "/academy";

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

  return (
    <div data-tour={showFooter ? "journey" : undefined}>
      {showHeader && (
        <div className="mb-3">
          <span className="text-sm font-semibold text-primary">{path.label} Path</span>
        </div>
      )}

      <div
        className={
          bordered
            ? cn("rounded-xl border border-border bg-card p-6 shadow-card", squareTopLeft && "rounded-tl-none")
            : ""
        }
      >
        <ConfettiOverlay active={celebrate} onDone={() => setCelebrate(false)} />

        {/* Mobile: vertical list — dot, course title, then the finish marker. */}
        <div className="divide-y divide-border sm:hidden">
          {courses.map((course, i) => {
            const isCurrent = statuses[i] === "current";
            const href = isCurrent && showFooter ? continueHref : `/academy/courses/${course.id}`;
            return (
              <Link key={course.id} href={href} className="flex w-full items-start gap-3 py-4 text-left">
                <CourseDot status={statuses[i]} />
                <p className={stepLabelClass(statuses[i])}>{course.title}</p>
              </Link>
            );
          })}
          <div className="flex w-full items-center gap-3 py-4">
            <FinishIcon
              className={cn("size-4 shrink-0", showCompleteState ? "text-primary" : "text-muted-foreground/50")}
            />
          </div>
        </div>

        {/* Desktop: dot-and-line timeline. Each dot and its title live in the
            same grid column so they stay aligned; the connecting line is drawn
            separately behind them, ending exactly at each dot's center. */}
        <div className="hidden sm:block">
          <div className="relative grid gap-4" style={{ gridTemplateColumns: `repeat(${nodeCount}, minmax(0, 1fr))` }}>
            <div
              className="pointer-events-none absolute top-1.5 h-px bg-border"
              style={{ left: `${lineInsetPercent}%`, width: `${lineSpanPercent}%` }}
            />
            <div
              className="pointer-events-none absolute top-1.5 h-px bg-primary"
              style={{ left: `${lineInsetPercent}%`, width: `${lineFilledPercent}%` }}
            />
            {courses.map((course, i) => {
              const isCurrent = statuses[i] === "current";
              const href = isCurrent && showFooter ? continueHref : `/academy/courses/${course.id}`;
              return (
                <Link key={course.id} href={href} className="relative flex flex-col items-center gap-1.5 text-center">
                  <CourseDot status={statuses[i]} />
                  <p className={cn("line-clamp-2", stepLabelClass(statuses[i]))}>{course.title}</p>
                </Link>
              );
            })}
            <div className="relative flex flex-col items-center gap-1.5 text-center">
              <FinishIcon
                className={cn("size-3.5 shrink-0", showCompleteState ? "text-primary" : "text-muted-foreground/50")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Partners who've registered courses across more than one technical path
// (e.g. picked up a Server Developer course alongside AI Developer) get a
// tab row instead of a single static label, so they can flip between each
// path's own roadmap in place rather than the dashboard only ever showing
// the one default path. Collapses back to the plain single-label header the
// moment there's zero or one path with any registration in it — the common
// case — so most partners never see a tab row with nothing to switch to.
export function TrackingPathSwitcher({
  paths,
  celebrateOnComplete = true,
}: {
  paths: TechnicalPath[];
  celebrateOnComplete?: boolean;
}) {
  const { isRegistered } = useRegisteredCourses();
  const { dismissed } = useDismissedPaths();

  // "foundation-course" opens every technical path (it's the mandatory
  // "all paths start here" first step — see academy/paths/technical), so
  // registering it alone says nothing about which specialization a partner
  // has actually picked. Only a course specific to that path counts as real
  // enrollment in it, or literally everyone would see all five tabs. A path
  // left via the Learning Hub's Leave Path stays hidden here too, even if a
  // course it shares with another enrolled path is still registered — see
  // useDismissedPaths.
  const enrolledPaths = paths.filter(
    (p) => !dismissed.includes(p.id) && p.modules.some((m) => m.courseId !== "foundation-course" && isRegistered(m.courseId))
  );
  const displayPaths = enrolledPaths.length > 0 ? enrolledPaths : [paths[0]];
  const displayPathIds = displayPaths.map((p) => p.id).join(",");

  const [selectedId, setSelectedId] = React.useState(displayPaths[0]?.id);
  // If the enrolled set changes shape (e.g. registering a first course in a
  // new path promotes it into the tab row) and the current selection no
  // longer exists in it, fall back to the first tab rather than pointing at
  // a path that's no longer displayed.
  React.useEffect(() => {
    if (!displayPaths.some((p) => p.id === selectedId)) {
      setSelectedId(displayPaths[0]?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayPathIds]);

  const selectedPath = displayPaths.find((p) => p.id === selectedId) ?? displayPaths[0];
  if (!selectedPath) return null;

  return (
    <div>
      {displayPaths.length > 1 ? (
        // Folder tabs: each enrolled path is its own folder, flap left-anchored
        // like a physical file tab. The active folder's flap sits flush against
        // the card below it (shared border color, no seam) so switching reads
        // as opening a different folder, not picking a segment off a control.
        <div className="flex items-end gap-1">
          {displayPaths.map((p) => {
            const isActive = p.id === selectedPath.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedId(p.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-t-lg border px-4 py-2 text-sm transition-colors",
                  isActive
                    ? "z-10 -mb-px border-border border-b-card bg-card font-semibold text-primary"
                    : "translate-y-px border-border bg-muted/60 font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {p.label} Path
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mb-3">
          <span className="text-sm font-semibold text-primary">{selectedPath.label} Path</span>
        </div>
      )}
      <TrackingPathCard
        path={selectedPath}
        celebrateOnComplete={celebrateOnComplete}
        showHeader={false}
        squareTopLeft={displayPaths.length > 1}
      />
    </div>
  );
}
