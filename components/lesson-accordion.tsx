"use client";

import * as React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Circle, CircleCheck, FileCheck } from "lucide-react";
import {
  DEMO_LESSON_PROGRESS,
  clampSequentialStatuses,
  lessonStatus,
  stepStatus,
  stepSlug,
  type CourseContent,
  type Lesson,
  type LessonItem,
  type StepStatus,
} from "@/lib/course-content";
import { cn } from "@/lib/utils";

/**
 * One consistent radio-style marker for every row — lesson, topic, lab,
 * quiz — so completion reads the same everywhere: filled check for done,
 * ringed dot for the one in progress, hollow circle for not yet started.
 */
export function StatusMarker({ status, className }: { status: StepStatus; className?: string }) {
  if (status === "done") {
    return <CircleCheck className={cn("size-4 shrink-0 text-primary", className)} />;
  }
  if (status === "current") {
    return (
      <span className={cn("flex size-4 shrink-0 items-center justify-center", className)}>
        <span className="size-3 rounded-full border-2 border-primary bg-card ring-4 ring-primary/20" />
      </span>
    );
  }
  return <Circle className={cn("size-4 shrink-0 text-muted-foreground/60", className)} />;
}

// Weight carries progress: finished and in-progress rows are both bold so how
// far you've got reads at a glance, and colour separates the two. Untouched
// rows stay at normal weight rather than muted, so nothing looks disabled.
export function rowLabelClass(status: StepStatus) {
  return cn(
    "text-sm",
    status === "current"
      ? "font-semibold text-primary"
      : status === "done"
        ? "font-semibold text-foreground"
        : "text-foreground"
  );
}

/**
 * The source titles already carry their own "Lesson 3:" prefix. Everywhere
 * we display a lesson title ourselves (as a card title or a flat row) we
 * strip it, since the surrounding UI supplies its own "Lesson N" label.
 */
export function lessonDisplayTitle(title: string) {
  return title.replace(/^Lesson\s+\d+:\s*/i, "");
}

/**
 * Every quiz label is "Quiz: {the topic it tests}" and every lab label is
 * "Lab: {the topic it practices}" — both always sitting directly under that
 * topic's own row, so repeating the topic name back reads as redundant.
 * Quizzes and labs display as just "Quiz" / "Lab"; topics keep their real
 * name, since that's the only place it's actually said.
 */
function itemDisplayLabel(item: LessonItem) {
  if (item.kind === "quiz") return "Quiz";
  if (item.kind === "lab") return "Lab";
  return item.label;
}

/**
 * A lesson's topics/labs/quizzes as plain, unnumbered content rows — no
 * card, no border, no kind icon (the status marker already leads every
 * row, and "Quiz"/"Lab" now says what it is in text). This is the
 * innermost level of the outline, so it stays flat regardless of what's
 * wrapping it above.
 */
export function TopicRows({
  lesson,
  doneCount,
  courseId,
}: {
  lesson: Lesson;
  doneCount: number;
  courseId?: string;
}) {
  if (!lesson.items) {
    return <p className="text-xs text-muted-foreground">Lesson content for this section is coming soon.</p>;
  }
  return (
    <div className="space-y-0.5">
      {lesson.items.map((item, i) => {
        const itemState = stepStatus(doneCount, i);
        const row = (
          <>
            <StatusMarker status={itemState} />
            <span className={rowLabelClass(itemState)}>{itemDisplayLabel(item)}</span>
          </>
        );
        const rowClass = cn(
          "flex items-center gap-3 rounded-md px-2 py-2 transition-colors",
          itemState === "current" && "bg-primary/5"
        );
        return courseId ? (
          <Link
            key={`${item.kind}-${item.label}`}
            href={`/academy/courses/${courseId}/steps/${stepSlug(item.label)}`}
            className={cn(rowClass, "hover:bg-muted/60")}
          >
            {row}
          </Link>
        ) : (
          <div key={`${item.kind}-${item.label}`} className={rowClass}>
            {row}
          </div>
        );
      })}
    </div>
  );
}

/**
 * A course's lessons as a flat, borderless list — used when a course itself
 * already has a card around it (nested inside a course's module card in
 * PathCourseList), so this level stays plain content rather than stacking
 * another card inside that one. The first two lessons open by default so a
 * course reads as "in progress" rather than a wall of collapsed rows.
 */
export function LessonAccordion({ content, courseId }: { content: CourseContent; courseId?: string }) {
  const [openLessons, setOpenLessons] = React.useState<string[]>(() =>
    content.lessons.slice(0, 2).map((l) => l.id)
  );
  const progress = courseId ? DEMO_LESSON_PROGRESS[courseId] : undefined;

  const bookendRow = "flex items-center gap-3 rounded-md px-2 py-2.5 transition-colors";

  // Clamped so a lesson finished out of curriculum order never shows "done"
  // above one that hasn't been reached yet — see clampSequentialStatuses.
  const statuses = clampSequentialStatuses(
    content.lessons.map((lesson) => lessonStatus(progress?.lessons[lesson.id] ?? 0, lesson.items?.length ?? 0))
  );

  return (
    <div>
      {content.introTitle &&
        (courseId ? (
          <Link
            href={`/academy/courses/${courseId}/steps/${stepSlug(content.introTitle)}`}
            className={cn(bookendRow, "hover:bg-muted/60")}
          >
            <StatusMarker status={progress?.introDone ? "done" : "upcoming"} />
            <span className={cn("text-sm", progress?.introDone ? "font-semibold" : "font-medium")}>
              {content.introTitle}
            </span>
          </Link>
        ) : (
          <div className={bookendRow}>
            <StatusMarker status={progress?.introDone ? "done" : "upcoming"} />
            <span className="text-sm font-medium">{content.introTitle}</span>
          </div>
        ))}

      <Accordion type="multiple" value={openLessons} onValueChange={setOpenLessons}>
        {content.lessons.map((lesson, li) => {
          const doneCount = progress?.lessons[lesson.id] ?? 0;
          const status = statuses[li];

          return (
            <AccordionItem key={lesson.id} value={lesson.id} className="border-b-0">
              <AccordionTrigger className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted/60 hover:no-underline">
                <span className="flex flex-1 items-center gap-3">
                  <StatusMarker status={status} />
                  <span
                    className={cn(
                      "flex-1 text-left",
                      status === "current"
                        ? "font-semibold text-primary"
                        : status === "done" && "font-semibold text-foreground"
                    )}
                  >
                    {lessonDisplayTitle(lesson.title)}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                <div className="pl-7">
                  <TopicRows lesson={lesson} doneCount={doneCount} courseId={courseId} />
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {content.finalExamTitle &&
        (courseId ? (
          <Link
            href={`/academy/courses/${courseId}/steps/${stepSlug(content.finalExamTitle)}`}
            className={cn(bookendRow, "hover:bg-muted/60")}
          >
            <StatusMarker status="upcoming" />
            <FileCheck className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{content.finalExamTitle}</span>
          </Link>
        ) : (
          <div className={bookendRow}>
            <StatusMarker status="upcoming" />
            <FileCheck className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{content.finalExamTitle}</span>
          </div>
        ))}
    </div>
  );
}
