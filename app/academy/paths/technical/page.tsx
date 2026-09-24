"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { ChevronRight } from "lucide-react";
import { GuestRegisterLock } from "@/components/guest-register-lock";
import { COURSE_CATALOG, getCourseById } from "@/lib/sample-data";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { useDismissedPaths } from "@/lib/dismissed-paths";
import { useRole } from "@/components/shell/role-provider";
import { markFirstTimeCourseEnrolled } from "@/lib/first-time-checklist";

interface RoleCourse {
  id: string;
  blurb?: string;
}

interface RoleSection {
  id: string;
  role: string;
  oneLiner: string;
  courses: RoleCourse[];
}

const SECTIONS: RoleSection[] = [
  {
    id: "architect",
    role: "Architect",
    oneLiner: "Designs the application system to meet business requirements in the most performant and scalable way possible",
    courses: [
      { id: "system-modeler-2" },
      { id: "server-developer-best-practices" },
    ],
  },
  {
    id: "server-developer",
    role: "Server Developer",
    oneLiner: "Builds and optimizes program logic",
    courses: [
      { id: "vantiq-version-control-system" },
      { id: "vantiqs-testing-tools" },
      { id: "ai-in-event-driven-applications" },
      { id: "vail-procedures" },
      { id: "vantiq-integration" },
      { id: "vail-dml" },
      { id: "vail-rules" },
      { id: "server-developer-best-practices" },
      { id: "app-components" },
      { id: "the-vantiq-catalog" },
      { id: "1-34-vantiq-assemblies" },
      { id: "distributed-deployment" },
      { id: "vantiq-edge-2" },
    ],
  },
  {
    id: "ai-developer",
    role: "AI Developer",
    oneLiner: "Builds Generative AI capabilities into applications",
    courses: [
      { id: "vantiq-version-control-system" },
      { id: "advanced-genai-applications" },
      { id: "app-components" },
      { id: "vail-procedures" },
      { id: "vail-ai" },
      { id: "ai-multi-agent-architecture" },
      { id: "visual-event-handler-ai-features" },
    ],
  },
  {
    id: "ui-developer",
    role: "UI Developer",
    oneLiner: "Creates interactive front-end user interfaces for the application system",
    courses: [
      { id: "vantiq-version-control-system" },
      { id: "vantiq-integration" },
      { id: "client-developer-best-practices" },
      { id: "client-layouts-templates-components" },
      { id: "launchable-clients" },
      { id: "dynamic-client-content" },
      { id: "the-vantiq-catalog" },
      { id: "1-34-vantiq-assemblies" },
    ],
  },
  {
    id: "administrator",
    role: "Administrator",
    oneLiner: "Manages system resources at the System, Organization and Namespace levels",
    courses: [
      { id: "vantiq-deployment-system-administration" },
      { id: "vantiq-system-administration" },
      { id: "organization-namespace-administration" },
      { id: "vantiq-command-line-interface-2" },
    ],
  },
];

// On-brand replacement for the reference site's gray 3D-bevel star boxes —
// a wrapping row of course chips connected by arrows, reusing this app's own
// card/border/primary tokens instead of the reference's imagery.
function CourseFlow({ courses }: { courses: RoleCourse[] }) {
  const nodes = [{ id: "applications-developer-level-1" }, ...courses];
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {nodes.map((node, i) => {
        const course = getCourseById(node.id);
        if (!course) return null;
        return (
          <div key={node.id} className="flex items-center gap-2">
            <Link
              href={`/academy/courses/${course.id}`}
              className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              {course.title}
            </Link>
            {i < nodes.length - 1 && <ChevronRight className="size-4 shrink-0 text-primary/50" />}
          </div>
        );
      })}
    </div>
  );
}

// Each course links to where it actually lives on community.vantiq.com
// (CatalogCourse.liveUrl). The On Demand landing page is only the fallback for
// a course that has no URL of its own.
const ON_DEMAND_CATALOG_URL = "https://community.vantiq.com/ondemand/";

function CourseList({ courses }: { courses: RoleCourse[] }) {
  return (
    <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
      {courses.map((entry) => {
        const course = getCourseById(entry.id);
        if (!course) return null;
        return (
          <li key={entry.id}>
            <a
              href={course.liveUrl ?? ON_DEMAND_CATALOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              {course.title}
            </a>{" "}
            &ndash; {entry.blurb ?? course.description}
          </li>
        );
      })}
    </ul>
  );
}

export default function TechnicalTrainingPathsPage() {
  const router = useRouter();
  const { role } = useRole();
  const { isRegistered, register, registerMany } = useRegisteredCourses();
  const { undismiss } = useDismissedPaths();
  // Foundations card links to this specific course, independent of
  // FOUNDATION_COURSE_IDS (which also drives guest registration eligibility
  // elsewhere and includes "The VIA and KB MCP Servers" — a different,
  // unrelated course that doesn't belong under this "all paths start here" card).
  const foundationCourse = getCourseById("applications-developer-level-1");

  // Registering completes step 2 of the first-time partner's onboarding
  // checklist — send them back to the dashboard so they see it land.
  function handlePathRegister(pathId: string, pathCourses: (typeof COURSE_CATALOG)[number][], roleLabel: string) {
    const listedCount = pathCourses.filter((c) => c.id !== foundationCourse?.id).length;
    registerMany(pathCourses, `Registered for the Foundations course and all ${listedCount} courses in the ${roleLabel} Path.`);
    // Registering is an explicit "I'm back in" — clears a path left earlier
    // via Vantiq Academy's Leave Path so its tab can reappear.
    undismiss(pathId);
    if (role === "first-time-partner") {
      markFirstTimeCourseEnrolled();
      router.push("/");
    }
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/academy/paths" className="hover:text-foreground">
            &larr; Paths
          </Link>
        }
        title="Technical Training Paths"
        description="Start with the Foundations course, then choose the role-based path that fits where you want to concentrate your efforts."
      >
        <BookmarkButton
          item={{
            id: "/academy/paths/technical",
            label: "Technical Training Paths",
            href: "/academy/paths/technical",
            iconKey: "GraduationCap",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      {foundationCourse && (
        <Card className="shadow-card gap-0 p-6">
          <h2 className="text-lg font-semibold leading-tight text-foreground">
            <a
              href={foundationCourse.liveUrl ?? ON_DEMAND_CATALOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Applications Developer Foundations Course
            </a>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This course is intended for everyone new to the Vantiq platform. Course covers platform
            orientation and the core concepts every partner needs before specializing.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <p className="text-sm text-foreground">Register for the Foundations course</p>
            {role === "guest" ? (
              <GuestRegisterLock compact />
            ) : (
              <Button
                size="sm"
                variant={isRegistered(foundationCourse.id) ? "secondary" : "default"}
                disabled={isRegistered(foundationCourse.id)}
                onClick={() => register(foundationCourse)}
              >
                {isRegistered(foundationCourse.id) ? "Registered" : "Register"}
              </Button>
            )}
          </div>
        </Card>
      )}

      <div className="space-y-6">
        {SECTIONS.map((s) => {
          // The courses shown in the list (live order) are the path. Foundations
          // is the shared first step every path starts from, so registering a
          // path still registers it — but it isn't counted as one of the path's
          // own courses.
          const listedCourses = s.courses
            .map((c) => getCourseById(c.id))
            .filter((c): c is (typeof COURSE_CATALOG)[number] => Boolean(c));
          const pathCourses = foundationCourse ? [foundationCourse, ...listedCourses] : listedCourses;
          const pathFullyRegistered = pathCourses.length > 0 && pathCourses.every((c) => isRegistered(c.id));

          return (
            <Card key={s.id} id={s.id} className="shadow-card scroll-mt-6 gap-0 p-6">
              <h2 className="text-lg font-semibold leading-tight text-foreground">{s.role}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.oneLiner}</p>

              {/* CourseFlow (the pill/chevron chain) is hidden for now, per
                  request — the component above is kept intact so it's a
                  one-line change to bring back. */}
              <CourseList courses={s.courses} />

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <p className="text-sm text-foreground">
                  Register for all {listedCourses.length} courses in the {s.role} Path
                </p>
                {role === "guest" ? (
                  <GuestRegisterLock compact />
                ) : (
                  <Button
                    size="sm"
                    variant={pathFullyRegistered ? "secondary" : "default"}
                    disabled={pathFullyRegistered && role !== "first-time-partner"}
                    onClick={() => handlePathRegister(s.id, pathCourses, s.role)}
                  >
                    {pathFullyRegistered && role !== "first-time-partner" ? "Registered" : "Register"}
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
