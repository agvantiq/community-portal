"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { useCourseCompletion } from "@/lib/course-completion";
import { COURSE_CONTENT, courseCompletion } from "@/lib/course-content";
import { ChevronRight, GraduationCap } from "lucide-react";

/**
 * Dashboard "Your courses": every course the learner is registered in, with
 * its progress. Replaces the single-path roadmap (TrackingPathSwitcher) on the
 * main dashboard so a learner sees all of their courses, not one path's.
 *
 * Progress uses the same rollup as the course page itself (courseCompletion),
 * so the two never disagree. Courses without outline content yet fall back to
 * 0% / 100% from the completion store.
 *
 * Empty state: Foundations is auto-registered for everyone (see
 * lib/registered-courses.tsx), so in this mockup the list is never empty in
 * practice — but the WordPress build will see real users with zero
 * enrollments, so the prompt to pick a path is designed here, not left to be
 * invented later.
 */
export function YourCoursesCard() {
  const { courses } = useRegisteredCourses();
  const { isCompleted } = useCourseCompletion();

  function percentFor(courseId: string) {
    if (isCompleted(courseId)) return 100;
    const content = COURSE_CONTENT[courseId];
    if (!content) return 0;
    const { done, total } = courseCompletion(courseId, content);
    return total ? Math.round((done / total) * 100) : 0;
  }

  return (
    // data-tour="journey" keeps the guided tour's "Resume where you left off"
    // step pointing here (see app/page.tsx ESTABLISHED_TOUR_STEPS).
    <div data-tour="journey" className="flex flex-col">
      <SectionHeading>Your courses</SectionHeading>
      {courses.length === 0 ? (
        <Card className="shadow-card flex flex-col items-center gap-3 p-8 text-center">
          <GraduationCap className="size-6 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">You&apos;re not enrolled in any courses yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a learning path to get started — enrolling adds its courses here.
            </p>
          </div>
          <Button asChild size="sm">
            <Link href="/academy/paths">Browse learning paths</Link>
          </Button>
        </Card>
      ) : (
        <Card className="shadow-card gap-0 p-2">
          <p className="px-3.5 pb-1 pt-3 text-sm text-muted-foreground">
            Please go{" "}
            <Link href="/academy/courses" className="font-medium text-primary-vivid hover:underline">
              here
            </Link>{" "}
            to see available courses.
          </p>
          <div className="divide-y divide-border">
            {courses.map((course) => {
              const percent = percentFor(course.id);
              return (
                <Link
                  key={course.id}
                  href={`/academy/courses/${course.id}`}
                  className="flex items-center gap-4 rounded-md p-3.5 transition-colors hover:bg-muted"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{course.title}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-[width]"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">{percent}% complete</span>
                    </div>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </Link>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
