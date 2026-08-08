"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { FOUNDATION_COURSE_IDS, type CatalogCourse } from "@/lib/sample-data";
import { COURSE_CONTENT, courseCompletion } from "@/lib/course-content";
import { useRole } from "@/components/shell/role-provider";
import { GuestRegisterLock } from "@/components/guest-register-lock";
import { markFirstTimeCourseEnrolled } from "@/lib/first-time-checklist";
import { LessonTimeline } from "@/components/module-timeline";
import { PlayCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// No per-lesson curriculum data exists yet for a course without a
// COURSE_CONTENT entry, so the content outline is a generic placeholder
// shape — same four steps for every such course — rather than fabricated
// lesson-by-lesson specifics.
const CONTENT_OUTLINE = ["Introduction", "Core Concepts", "Hands-On Lab", "Assessment"];

export function CourseDetailClient({ course }: { course: CatalogCourse }) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          // Browser "back" rather than a hardcoded destination — a course can
          // be reached from the Learning Hub, the Courses Catalog, a Path
          // page, or search, and this should always return wherever the
          // partner actually came from, not force them back to Courses.
          <button type="button" onClick={() => router.back()} className="hover:text-foreground">
            &larr; Back
          </button>
        }
        title={course.title}
        description={course.description}
      >
        <BookmarkButton
          item={{
            id: `/academy/courses/${course.id}`,
            label: course.title,
            href: `/academy/courses/${course.id}`,
            iconKey: "GraduationCap",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <CourseProgressPanel course={course} />
    </div>
  );
}

/**
 * The status/stats/register card plus the course-content section — everything
 * from CourseDetailClient except the page-level PageHero, so a course's own
 * progress can be embedded inline elsewhere (the Learning Hub's active-path
 * panel) without a second, out-of-place page hero mid-page.
 */
export function CourseProgressPanel({
  course,
  squareTopLeft = false,
}: {
  course: CatalogCourse;
  /** Square the status card's own top-left corner — on when a folder tab sits flush against that exact edge above it. */
  squareTopLeft?: boolean;
}) {
  const router = useRouter();
  const { isRegistered, register } = useRegisteredCourses();
  const registered = isRegistered(course.id);
  const { role } = useRole();
  const isLockedForGuest = role === "guest" && !FOUNDATION_COURSE_IDS.includes(course.id);
  const content = COURSE_CONTENT[course.id];

  // One shared rollup (courseCompletion) so this bar, the lessons below it,
  // and the course rows in the Learning Hub can never disagree.
  const completion = content ? courseCompletion(course.id, content) : null;
  const courseDoneSteps = completion?.done ?? 0;
  const coursePercent = completion?.total
    ? Math.round((completion.done / completion.total) * 100)
    : 0;

  // "All paths start here" — the Foundations Course is the canonical first
  // course, so registering here completes step 2 of the first-time partner's
  // onboarding checklist the same way the pathway page's bulk-register does
  // (see handlePathRegister in academy/paths/technical/page.tsx).
  function handleRegister() {
    register(course);
    if (role === "first-time-partner") {
      markFirstTimeCourseEnrolled();
      router.push("/");
    }
  }

  return (
    <div className="space-y-6">
      <Card
        className={cn(
          "shadow-card grid grid-cols-1 divide-y divide-border p-0 sm:grid-cols-2 sm:divide-x sm:divide-y-0",
          squareTopLeft && "rounded-tl-none"
        )}
      >
        <div className="flex flex-col items-center justify-center gap-1.5 p-5 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</p>
          <Badge
            variant="secondary"
            className={registered ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}
          >
            {registered ? "Registered" : "Not Registered"}
          </Badge>
        </div>
        {course.id === "foundation-course" ? (
          <div className="flex flex-col justify-center gap-3 p-5">
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>26 Video Lectures</li>
              <li>26 Quizzes</li>
              <li>11 Hands-On Labs</li>
            </ul>
            {isLockedForGuest ? (
              <GuestRegisterLock />
            ) : (
              <Button
                size="sm"
                variant={registered ? "secondary" : "default"}
                disabled={registered}
                onClick={handleRegister}
                className="self-start"
              >
                {registered ? "Registered" : "Register"}
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-5 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Get Started</p>
            {isLockedForGuest ? (
              <GuestRegisterLock />
            ) : (
              <Button
                size="sm"
                variant={registered ? "secondary" : "default"}
                disabled={registered}
                onClick={() => register(course)}
              >
                {registered ? "Registered" : "Register"}
              </Button>
            )}
          </div>
        )}
      </Card>

      {content ? (
        <>
          <Card className="shadow-card p-6">
            <div className="flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-[width]"
                  style={{ width: `${coursePercent}%` }}
                />
              </div>
              <span className="shrink-0 text-xs font-semibold text-primary">
                {coursePercent}% COMPLETE
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {courseDoneSteps}/{content.totalSteps} Steps
              </span>
            </div>
          </Card>

          <Card className="shadow-card p-6">
            <h2 className="text-sm font-medium text-foreground">Course Content</h2>
            <LessonTimeline content={content} courseId={course.id} />
          </Card>
        </>
      ) : (
        <Card className="shadow-card p-6">
          <h2 className="mb-4 text-sm font-medium text-foreground">Course Content</h2>
          <div className="space-y-2">
            {CONTENT_OUTLINE.map((step, i) => (
              <div key={step} className="flex items-center gap-3 rounded-md border border-border p-3">
                {registered && i === 0 ? (
                  <PlayCircle className="size-4 shrink-0 text-primary" />
                ) : (
                  <Circle className="size-4 shrink-0 text-muted-foreground" />
                )}
                <span className="text-sm font-medium text-foreground">{step}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
