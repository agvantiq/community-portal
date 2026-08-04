"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { FOUNDATION_COURSE_IDS, type CatalogCourse } from "@/lib/sample-data";
import { useRole } from "@/components/shell/role-provider";
import { GuestRegisterLock } from "@/components/guest-register-lock";
import { Clock, PlayCircle, Circle } from "lucide-react";
import { FoundationCourseContent } from "./foundation-course-content";

// No per-lesson curriculum data exists per course in this prototype, so the
// content outline is a generic placeholder shape — same four steps for every
// course — rather than fabricated lesson-by-lesson specifics.
const CONTENT_OUTLINE = ["Introduction", "Core Concepts", "Hands-On Lab", "Assessment"];

export function CourseDetailClient({ course }: { course: CatalogCourse }) {
  const { isRegistered, register } = useRegisteredCourses();
  const registered = isRegistered(course.id);
  const { role } = useRole();
  const isLockedForGuest = role === "guest" && !FOUNDATION_COURSE_IDS.includes(course.id);

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/academy/courses" className="hover:text-foreground">
            &larr; Courses
          </Link>
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

      <Card className="shadow-card grid grid-cols-1 divide-y divide-border p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="flex flex-col items-center justify-center gap-1.5 p-5 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</p>
          <Badge
            variant="secondary"
            className={registered ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}
          >
            {registered ? "Registered" : "Not Registered"}
          </Badge>
        </div>
        <div className="flex flex-col items-center justify-center gap-1.5 p-5 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Duration</p>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Clock className="size-4 text-primary" />
            {course.duration}
          </p>
        </div>
        {course.id === "foundation-course" ? (
          <div className="flex flex-col justify-center gap-1 p-5">
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>26 Video Lectures</li>
              <li>26 Quizzes</li>
              <li>11 Hands-On Labs</li>
            </ul>
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

      {course.id === "foundation-course" ? (
        <FoundationCourseContent />
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
