"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { ChevronRight, Circle } from "lucide-react";
import { COURSE_CATALOG, SALES_PATH, getCourseById } from "@/lib/sample-data";
import { useRegisteredCourses } from "@/lib/registered-courses";

const RESPONSIBILITIES = [
  "Deliver Vantiq's core value proposition and tailor it to a prospect's use case",
  "Run structured discovery calls that surface a real, qualifiable opportunity",
  "Position Vantiq confidently against the platforms you're up against in competitive deals",
  "Navigate procurement, security review, and multi-stakeholder signoff to close enterprise deals",
];

function CourseFlow({ courseIds }: { courseIds: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {courseIds.map((id, i) => {
        const course = getCourseById(id);
        if (!course) return null;
        return (
          <div key={id} className="flex items-center gap-2">
            <Link
              href={`/academy/courses/${course.id}`}
              className="rounded-full bg-linear-to-br from-emphasis/20 via-accent to-secondary px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              {course.title}
            </Link>
            {i < courseIds.length - 1 && <ChevronRight className="size-4 shrink-0 text-primary/50" />}
          </div>
        );
      })}
    </div>
  );
}

function CourseList({ courseIds }: { courseIds: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
      {courseIds.map((id) => {
        const course = getCourseById(id);
        if (!course) return null;
        return (
          <li key={id} className="flex items-start gap-2.5">
            <Circle className="mt-1.5 size-2 shrink-0 fill-current text-muted-foreground/50" />
            <span>
              <Link href={`/academy/courses/${course.id}`} className="font-semibold text-primary hover:underline">
                {course.title}
              </Link>{" "}
              ({course.duration}) &ndash; {course.description}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default function SalesTrainingPage() {
  const { isRegistered, registerMany } = useRegisteredCourses();
  const salesCourses = COURSE_CATALOG.filter((c) => c.pathIds.includes(SALES_PATH.id));
  const courseIds = salesCourses.map((c) => c.id);
  const fullyRegistered = salesCourses.length > 0 && salesCourses.every((c) => isRegistered(c.id));

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/academy/paths" className="hover:text-foreground">
            &larr; Paths
          </Link>
        }
        title="Sales Training"
        description="Equip yourself to pitch, position, and close Vantiq deals with confidence."
      >
        <BookmarkButton
          item={{
            id: "/academy/paths/sales-training",
            label: "Sales Training",
            href: "/academy/paths/sales-training",
            iconKey: "GraduationCap",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <Card className="shadow-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Sales Rep</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Sales Reps are the front line of the partner ecosystem — the first Vantiq conversation most
          prospects have. This path builds the pitch, discovery, and closing skills needed to source and
          close Vantiq deals:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
          {RESPONSIBILITIES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="mt-5 text-sm font-medium text-foreground">Courses in the Sales Training Path:</p>
        <CourseFlow courseIds={courseIds} />
        <CourseList courseIds={courseIds} />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-4">
          <p className="text-sm text-foreground">
            Register for all {salesCourses.length} courses in the Sales Training Path
          </p>
          <Button
            size="sm"
            variant={fullyRegistered ? "secondary" : "default"}
            disabled={fullyRegistered}
            onClick={() =>
              registerMany(salesCourses, `Registered for all ${salesCourses.length} courses in the Sales Training Path.`)
            }
          >
            {fullyRegistered ? "Registered" : "Register"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
