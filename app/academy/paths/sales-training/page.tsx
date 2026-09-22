"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { ChevronRight, Circle } from "lucide-react";
import { SALES_ENABLEMENT_TRACKS, getCourseById, type TechnicalPath } from "@/lib/sample-data";
import { useRole } from "@/components/shell/role-provider";

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
              className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-opacity hover:opacity-90"
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
              &ndash; {course.description}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function TrackCard({ track, intro }: { track: TechnicalPath; intro?: string }) {
  const { role } = useRole();
  const trackCourses = track.modules
    .map((m) => getCourseById(m.courseId))
    .filter((c): c is NonNullable<typeof c> => !!c)
    .filter((c) => !c.roles || c.roles.includes(role));
  const courseIds = trackCourses.map((c) => c.id);

  return (
    <Card id={track.id} className="shadow-card scroll-mt-6 p-6">
      <h2 className="text-lg font-semibold text-foreground">{track.label}</h2>
      {intro && <p className="mt-3 text-sm text-muted-foreground">{intro}</p>}

      <p className="mt-5 text-sm font-medium text-foreground">Courses in this track:</p>
      {/* CourseFlow (the pill/chevron chain) is hidden for now, per request —
          the component below is kept intact so it's a one-line change to
          bring back. */}
      <CourseList courseIds={courseIds} />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-4">
        <p className="text-sm text-foreground">
          Register for all {trackCourses.length} courses in {track.label}
        </p>
        <Button size="sm" variant="secondary" disabled>
          Coming Soon
        </Button>
      </div>
    </Card>
  );
}

export default function SalesTrainingPage() {
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

      <div>
        <h2 className="mb-4 text-sm font-medium text-emphasis">Sales Enablement Tracks</h2>
        <div className="space-y-6">
          {SALES_ENABLEMENT_TRACKS.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}
