"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { ChevronRight, Circle } from "lucide-react";
import { GuestRegisterLock } from "@/components/guest-register-lock";
import { SALES_ENABLEMENT_TRACKS, getCourseById, type TechnicalPath } from "@/lib/sample-data";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { useRole } from "@/components/shell/role-provider";
import { markFirstTimeCourseEnrolled } from "@/lib/first-time-checklist";

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

function TrackCard({
  track,
  intro,
  onEnrolled,
}: {
  track: TechnicalPath;
  intro?: string;
  onEnrolled: () => void;
}) {
  const { isRegistered, registerMany } = useRegisteredCourses();
  const { role } = useRole();
  const trackCourses = track.modules
    .map((m) => getCourseById(m.courseId))
    .filter((c): c is NonNullable<typeof c> => !!c);
  const courseIds = trackCourses.map((c) => c.id);
  const fullyRegistered = trackCourses.length > 0 && trackCourses.every((c) => isRegistered(c.id));

  function handleRegister() {
    registerMany(trackCourses, `Registered for all ${trackCourses.length} courses in the ${track.label} track.`);
    onEnrolled();
  }

  return (
    <Card id={track.id} className="shadow-card scroll-mt-6 p-6">
      <h2 className="text-lg font-semibold text-foreground">{track.label}</h2>
      {intro && <p className="mt-3 text-sm text-muted-foreground">{intro}</p>}

      <p className="mt-5 text-sm font-medium text-foreground">Courses in this track:</p>
      <CourseFlow courseIds={courseIds} />
      <CourseList courseIds={courseIds} />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-4">
        <p className="text-sm text-foreground">
          Register for all {trackCourses.length} courses in {track.label}
        </p>
        {role === "guest" ? (
          <GuestRegisterLock compact />
        ) : (
          <Button
            size="sm"
            variant={fullyRegistered ? "secondary" : "default"}
            disabled={fullyRegistered}
            onClick={handleRegister}
          >
            {fullyRegistered ? "Registered" : "Register"}
          </Button>
        )}
      </div>
    </Card>
  );
}

export default function SalesTrainingPage() {
  const router = useRouter();
  const { role } = useRole();
  const [activeTrack, setActiveTrack] = React.useState(SALES_ENABLEMENT_TRACKS[0].id);

  // Registering completes step 2 of the first-time partner's onboarding
  // checklist — send them back to the dashboard so they see it land.
  function handleFirstTimeEnrollment() {
    if (role === "first-time-partner") {
      markFirstTimeCourseEnrolled();
      router.push("/");
    }
  }

  function handleTrackChange(id: string) {
    setActiveTrack(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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

      <div className="sticky top-0 z-10 -mx-6 bg-white px-6 py-3 md:-mx-10 md:px-10">
        <Tabs value={activeTrack} onValueChange={handleTrackChange}>
          <TabsList className="h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
            {SALES_ENABLEMENT_TRACKS.map((track) => (
              <TabsTrigger
                key={track.id}
                value={track.id}
                className="rounded-full shadow-sm data-[state=inactive]:bg-linear-to-br data-[state=inactive]:from-emphasis/20 data-[state=inactive]:via-accent data-[state=inactive]:to-secondary"
              >
                {track.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-medium text-emphasis">Sales Enablement Tracks</h2>
        <div className="space-y-6">
          {SALES_ENABLEMENT_TRACKS.map((track) => (
            <TrackCard key={track.id} track={track} onEnrolled={handleFirstTimeEnrollment} />
          ))}
        </div>
      </div>
    </div>
  );
}
