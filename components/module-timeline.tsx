"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEMO_LESSON_PROGRESS,
  clampSequentialStatuses,
  completedSteps,
  lessonStatus,
  stepSlug,
  type CourseContent,
  type StepStatus,
} from "@/lib/course-content";
import { TopicRows, lessonDisplayTitle } from "@/components/lesson-accordion";
import { cn } from "@/lib/utils";

/** Vertical rail that threads through every node's center, so the cards below read as one sequence. */
export function ModuleTimeline({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 space-y-3">{children}</div>;
}

// Same dot language as the dashboard's horizontal path roadmap
// (CourseDot in tracking-path-card.tsx) — small filled dot for done, a
// pulsing ring for the current one, hollow for upcoming — so a partner
// reads "where am I" the same way whether the roadmap runs across or down.
function TimelineNode({ status }: { status: StepStatus }) {
  if (status === "current") {
    return (
      <span className="relative z-10 flex size-9 shrink-0 items-center justify-center">
        <span className="absolute inline-flex size-3.5 animate-ping rounded-full bg-primary/50 motion-reduce:animate-none" />
        <span className="relative size-3.5 rounded-full border-2 border-primary bg-card ring-[3px] ring-primary/20" />
      </span>
    );
  }
  return (
    <span className="relative z-10 flex size-9 shrink-0 items-center justify-center">
      <span
        className={cn(
          "rounded-full border-2 transition-all",
          status === "done" ? "size-2.5 border-primary bg-primary" : "size-2.5 border-border bg-card"
        )}
      />
    </span>
  );
}

/**
 * One module card in the outline — a course, or a lesson when lessons are
 * the outermost level. Status, a single-integer label ("COURSE 2", not
 * "1.2"), and a rail node on the left; nested content (if any) opens inside
 * this same card rather than adding another one, so depth never stacks
 * boxes.
 */
export function ModuleTimelineItem({
  status,
  eyebrow,
  isLast,
  title,
  titleHref,
  meta,
  isOpen,
  onToggle,
  progressPercent,
  progressLabel,
  children,
}: {
  status: StepStatus;
  eyebrow: string;
  isLast: boolean;
  title: string;
  titleHref?: string;
  meta?: string;
  isOpen: boolean;
  onToggle: () => void;
  /** Only rendered as a progress bar when status is "current". */
  progressPercent?: number;
  progressLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative flex gap-4">
      {!isLast && (
        // Fills through a "done" node's own segment, same as the horizontal
        // roadmap's line stopping exactly at the current dot's center rather
        // than carrying on past it.
        <span
          className={cn(
            "absolute left-[17px] top-9 bottom-[-12px] w-px",
            status === "done" ? "bg-primary" : "bg-border"
          )}
        />
      )}
      <TimelineNode status={status} />
      <div
        className={cn(
          "min-w-0 flex-1 rounded-xl border p-4",
          status === "current" ? "border-primary/30 bg-primary/[0.03]" : "border-border bg-card"
        )}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle();
            }
          }}
          className="flex w-full cursor-pointer items-start justify-between gap-3"
        >
          <span className="min-w-0">
            <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {eyebrow}
              {status === "current" && <span className="text-primary"> &middot; In Progress</span>}
            </span>
            {titleHref ? (
              <Link
                href={titleHref}
                onClick={(e) => e.stopPropagation()}
                className="mt-0.5 block font-semibold text-foreground hover:text-primary hover:underline"
              >
                {title}
              </Link>
            ) : (
              <span className="mt-0.5 block font-semibold text-foreground">{title}</span>
            )}
            {meta && <span className="mt-1 block text-xs text-muted-foreground">{meta}</span>}
          </span>
          {isOpen ? (
            <ChevronUp className="mt-1 size-4 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronDown className="mt-1 size-4 shrink-0 text-muted-foreground" />
          )}
        </div>

        {status === "current" && progressPercent !== undefined && (
          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {progressLabel && (
              <span className="shrink-0 text-xs text-muted-foreground">{progressLabel}</span>
            )}
            <Button size="sm" className="shrink-0" onClick={onToggle}>
              Continue
            </Button>
          </div>
        )}
        {isOpen && children && (
          <div className="mt-4 border-t border-border pt-3">{children}</div>
        )}
      </div>
    </div>
  );
}

/**
 * A single, non-expanding stop on the rail — the intro or final exam. Same
 * node, same connecting line, same card as a lesson, just no chevron/toggle:
 * the whole card is a direct link to its one step. Sharing the rail (rather
 * than sitting above/below it as an un-connected bookend) is what makes the
 * intro read as step one of the course instead of a standalone banner.
 */
function ModuleTimelineLeaf({
  status,
  eyebrow,
  isLast,
  title,
  href,
}: {
  status: StepStatus;
  eyebrow: string;
  isLast: boolean;
  title: string;
  href?: string;
}) {
  const card = (
    <div
      className={cn(
        "min-w-0 flex-1 rounded-xl border p-4 transition-colors",
        status === "current" ? "border-primary/30 bg-primary/[0.03]" : "border-border bg-card",
        href && "hover:border-primary/40"
      )}
    >
      <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">{eyebrow}</span>
      <span className="mt-0.5 block font-semibold text-foreground">{title}</span>
    </div>
  );

  return (
    <div className="relative flex gap-4">
      {!isLast && (
        <span
          className={cn(
            "absolute left-[17px] top-9 bottom-[-12px] w-px",
            status === "done" ? "bg-primary" : "bg-border"
          )}
        />
      )}
      <TimelineNode status={status} />
      {href ? (
        <Link href={href} className="min-w-0 flex-1">
          {card}
        </Link>
      ) : (
        card
      )}
    </div>
  );
}

/**
 * A course's lessons as the outermost, card-level list — used wherever
 * lessons are the top thing on the page (a single course's own outline),
 * as opposed to being nested one level inside a course's own module card.
 */
export function LessonTimeline({ content, courseId }: { content: CourseContent; courseId?: string }) {
  // First two lessons open by default, so landing here shows real content
  // rather than a wall of collapsed rows.
  const [openLessons, setOpenLessons] = React.useState<string[]>(() =>
    content.lessons.slice(0, 2).map((l) => l.id)
  );
  const progress = courseId ? DEMO_LESSON_PROGRESS[courseId] : undefined;

  function toggle(id: string) {
    setOpenLessons(openLessons.includes(id) ? openLessons.filter((x) => x !== id) : [...openLessons, id]);
  }

  // Clamped so a lesson finished out of curriculum order never shows "done"
  // above one that hasn't been reached yet — see clampSequentialStatuses.
  const statuses = clampSequentialStatuses(
    content.lessons.map((lesson) => lessonStatus(progress?.lessons[lesson.id] ?? 0, lesson.items?.length ?? 0))
  );

  // The intro and final exam are stops on the same rail as the lessons —
  // not separate bookends above/below it — so the connecting line runs
  // through everything and "isLast" only ever applies to the true last stop.
  const lastLessonIndex = content.lessons.length - 1;

  return (
    <ModuleTimeline>
      {content.introTitle && (
        <ModuleTimelineLeaf
          status={progress?.introDone ? "done" : "upcoming"}
          eyebrow="Introduction"
          title={content.introTitle}
          isLast={content.lessons.length === 0 && !content.finalExamTitle}
          href={courseId ? `/academy/courses/${courseId}/steps/${stepSlug(content.introTitle)}` : undefined}
        />
      )}

      {content.lessons.map((lesson, li) => {
        const doneCount = progress?.lessons[lesson.id] ?? 0;
        const status = statuses[li];
        const doneSteps = completedSteps(lesson, doneCount);
        const percent = lesson.topics > 0 ? Math.round((doneSteps / lesson.topics) * 100) : 0;

        return (
          <ModuleTimelineItem
            key={lesson.id}
            isLast={li === lastLessonIndex && !content.finalExamTitle}
            status={status}
            eyebrow={`Lesson ${li + 1}`}
            title={lessonDisplayTitle(lesson.title)}
            isOpen={openLessons.includes(lesson.id)}
            onToggle={() => toggle(lesson.id)}
            progressPercent={status === "current" ? percent : undefined}
            progressLabel={status === "current" ? `${doneSteps}/${lesson.topics} Topics` : undefined}
          >
            <TopicRows lesson={lesson} doneCount={doneCount} courseId={courseId} />
          </ModuleTimelineItem>
        );
      })}

      {content.finalExamTitle && (
        <ModuleTimelineLeaf
          status="upcoming"
          eyebrow="Final Exam"
          title={content.finalExamTitle}
          isLast
          href={courseId ? `/academy/courses/${courseId}/steps/${stepSlug(content.finalExamTitle)}` : undefined}
        />
      )}
    </ModuleTimeline>
  );
}
