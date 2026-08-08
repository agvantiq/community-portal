"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { LessonAccordion } from "@/components/lesson-accordion";
import { ModuleTimeline, ModuleTimelineItem, LessonTimeline } from "@/components/module-timeline";
import { COURSE_CONTENT, clampSequentialStatuses, courseCompletion } from "@/lib/course-content";
import { getCourseById, type CatalogCourse, type TechnicalPath } from "@/lib/sample-data";

/** Everyone is auto-enrolled in this one and it gets its own Learning Hub tab. */
export const FOUNDATION_STANDALONE_COURSE_ID = "foundation-course";

/**
 * A path's courses as the outermost, card-level list — each a module in a
 * single rail, its own status node and CTA. A course's lessons open inside
 * that same card as a flat list (LessonAccordion) rather than as their own
 * nested cards, so depth never stacks box inside box.
 */
export function PathCourseList({ path, squareTopLeft = false }: { path: TechnicalPath; squareTopLeft?: boolean }) {
  const courses = path.modules
    // The Foundations course opens every path, but it has its own standalone
    // tab in the Learning Hub — listing it inside each path as well would
    // just repeat the same outline under every tab.
    .filter((m) => m.courseId !== FOUNDATION_STANDALONE_COURSE_ID)
    .map((m) => getCourseById(m.courseId))
    .filter((c): c is NonNullable<typeof c> => !!c);

  // The first course opens by default, so landing on a path shows its
  // lessons rather than a wall of collapsed rows you have to click into.
  const [openCourses, setOpenCourses] = React.useState<string[]>(() => courses.slice(0, 1).map((c) => c.id));

  function toggle(id: string) {
    setOpenCourses(openCourses.includes(id) ? openCourses.filter((x) => x !== id) : [...openCourses, id]);
  }

  const completions = courses.map((c) => {
    const content = COURSE_CONTENT[c.id];
    return content ? courseCompletion(c.id, content) : null;
  });
  // Clamped so a course that's technically 100% out of curriculum order
  // never shows "done" while an earlier course in this same path hasn't
  // been started — the rail always reads done-then-current-then-upcoming.
  const statuses = clampSequentialStatuses(completions.map((c) => c?.status ?? "upcoming"));

  return (
    <Card className={squareTopLeft ? "shadow-card rounded-tl-none p-6" : "shadow-card p-6"}>
      <h2 className="text-sm font-medium text-foreground">Courses</h2>

      <ModuleTimeline>
        {courses.map((course, ci) => {
          const content = COURSE_CONTENT[course.id];
          const completion = completions[ci];
          const status = statuses[ci];
          const percent = completion?.total ? Math.round((completion.done / completion.total) * 100) : 0;

          return (
            <ModuleTimelineItem
              key={course.id}
              isLast={ci === courses.length - 1}
              status={status}
              eyebrow={`Course ${ci + 1}`}
              title={course.title}
              titleHref={`/academy/courses/${course.id}`}
              meta={course.description}
              isOpen={openCourses.includes(course.id)}
              onToggle={() => toggle(course.id)}
              progressPercent={status === "current" ? percent : undefined}
              progressLabel={
                status === "current" && completion ? `${completion.done}/${completion.total} Steps` : undefined
              }
            >
              {content ? (
                <LessonAccordion content={content} courseId={course.id} />
              ) : (
                <p className="text-xs text-muted-foreground">Course content is coming soon.</p>
              )}
            </ModuleTimelineItem>
          );
        })}
      </ModuleTimeline>
    </Card>
  );
}

/**
 * A single course's outline, lessons as the outermost card-level list since
 * there's no course level above them — used where the tab already names the
 * course (the standalone Foundations tab in the Learning Hub).
 */
export function CourseOutlineCard({
  course,
  squareTopLeft = false,
}: {
  course: CatalogCourse;
  squareTopLeft?: boolean;
}) {
  const content = COURSE_CONTENT[course.id];

  return (
    <Card className={squareTopLeft ? "shadow-card rounded-tl-none p-6" : "shadow-card p-6"}>
      <h2 className="text-sm font-medium text-foreground">Lessons</h2>

      {content ? (
        <LessonTimeline content={content} courseId={course.id} />
      ) : (
        <p className="mt-4 text-xs text-muted-foreground">Course content is coming soon.</p>
      )}
    </Card>
  );
}
