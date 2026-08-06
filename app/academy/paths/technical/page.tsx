"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { ChevronRight } from "lucide-react";
import { GuestRegisterLock } from "@/components/guest-register-lock";
import { COURSE_CATALOG, getCourseById } from "@/lib/sample-data";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { useRole } from "@/components/shell/role-provider";
import { markFirstTimeCourseEnrolled } from "@/lib/first-time-checklist";

interface RoleCourse {
  id: string;
  blurb?: string;
}

interface RoleSection {
  id: string;
  navLabel: string;
  role: string;
  oneLiner: string;
  intro: string;
  responsibilities: string[];
  pathwayIntro: string;
  courses: RoleCourse[];
}

const SECTIONS: RoleSection[] = [
  {
    id: "architect",
    navLabel: "Architect",
    role: "Architect",
    oneLiner: "Designs the application system to meet business requirements in the most performant and scalable way possible",
    intro: 'Architects are the "Project Directors." In their role, they have the following responsibilities:',
    responsibilities: [
      "Work with all project stakeholders to establish exactly what the business requirements of the system are",
      "Define the overall structure of the application system",
      "Make sure the system is designed for performance and future scalability",
      "Coordinate developers to work independently on their parts of the system",
      "Integrate all of the developers' efforts to build the cohesive whole",
      "Design and build regression tests to run throughout the Development through Operations phases of the project",
    ],
    pathwayIntro: "Courses in the Architect Training Pathway:",
    courses: [
      { id: "design-model" },
      { id: "system-modeler" },
      { id: "server-dev-best-practices" },
      { id: "software-development-lifecycle" },
    ],
  },
  {
    id: "server-developer",
    navLabel: "Server Developer",
    role: "Server Developer",
    oneLiner: "Builds and optimizes program logic",
    intro:
      "Server Developers take the project vision and build the backbone for it! This role requires a wide variety of abilities in order to carry out the following tasks:",
    responsibilities: [
      "Organize project resources by functionality in Services",
      "Manage application state",
      "Handle event processing, either visually or programmatically",
      "Develop using the best performance and scalability strategies for the needs of the project",
      "Build and run unit and integration test suites",
      "Make program functionality as modular, reusable and shareable as possible",
      "Deploy applications to other installations and system platform architectures",
    ],
    pathwayIntro: "Courses in the Server Developer Training Pathway:",
    courses: [
      { id: "vantiq-on-edge" },
      { id: "assemblies" },
      { id: "vantiq-catalog" },
      { id: "app-and-genai-comp" },
      { id: "dev-best-practices" },
      { id: "vail-rules" },
      { id: "vail-dml" },
      { id: "vantiq-integration" },
      { id: "vail-procedures" },
      { id: "testing" },
      { id: "version-control-system" },
      { id: "distributed-deployment" },
    ],
  },
  {
    id: "ai-developer",
    navLabel: "AI Developer",
    role: "AI Developer",
    oneLiner: "Builds Generative AI capabilities into applications",
    intro:
      "AI Developers build sophisticated Generative AI into Vantiq applications. This role requires a wide variety of abilities in order to carry out the following tasks:",
    responsibilities: [
      "Be able to configure Large Language Models to the exacting needs of the project",
      "Comfortably navigate both the App and GenAI Builder environments",
      "Work with the three App activity tasks that use Generative AI",
      "Build complex GenAI procedures",
      "Inform LLMs correctly with Semantic Index data",
      "Build Tools, either as VAIL or Python procedures",
      "Create GenAI Components for modular use",
    ],
    pathwayIntro: "Courses in the AI Developer Training Pathway:",
    courses: [
      { id: "intro-to-genai-apps" },
      { id: "advanced-genai-apps" },
      { id: "multi-agent-orchestration" },
      { id: "trust-and-governance" },
      { id: "version-control-system" },
    ],
  },
  {
    id: "ui-developer",
    navLabel: "UI Developer",
    role: "UI Developer",
    oneLiner: "Creates interactive front-end user interfaces for the application system",
    intro:
      "UI Developers work primarily with the Client portion of a Vantiq application system, to create interactive, informative browser-based dashboards. First impressions are important, and application users take theirs from your work! Working in the Client requires some familiarity with JavaScript, CSS and HTML. UI Developer responsibilities:",
    responsibilities: [
      "Design browser-based application interfaces in the Vantiq Client to inform users of relevant program functions",
      "Build those interfaces for clean layouts, accessibility, page size changes and other dynamic considerations",
      "Retrieve relevant program information from sources, topics, database queries and service events to bind to Client pages and widgets",
      "Write appropriate logic to display information, allow user interaction, convey user inputs to reach application event handlers and all other needed Client functionality",
    ],
    pathwayIntro: "Courses in the UI Developer Training Pathway:",
    courses: [
      { id: "client-developer-best-practices" },
      { id: "assemblies" },
      { id: "vantiq-catalog" },
      { id: "launchable-clients" },
      { id: "client-layouts-templates-and-components" },
      { id: "vantiq-integration" },
      { id: "version-control-system" },
    ],
  },
  {
    id: "administrator",
    navLabel: "Administrator",
    role: "Administrator",
    oneLiner: "Manages system resources at the System, Organization and Namespace levels",
    intro:
      "Administrators bring the team together, manage Vantiq resources, and make sure that developers' collective efforts don't overwhelm system resource allocations. Administrator responsibilities:",
    responsibilities: [
      "Deploy the Vantiq server to Kubernetes cluster(s)",
      "Create Organizations",
      "Manage Quota needs for Organizations",
      "Add developers to the system",
      "Conduct System, Organization and Namespace performance monitoring",
      "Manage project resources and backups",
      "Coordinate with the System Administrator to modify Organization quotas and credits as needed",
    ],
    pathwayIntro: "Courses in the Administrator Training Pathway:",
    courses: [
      { id: "namespace-and-org-admin" },
      { id: "vantiq-cli" },
      { id: "system-administration" },
      { id: "vantiq-server-deployment" },
    ],
  },
];

// On-brand replacement for the reference site's gray 3D-bevel star boxes —
// a wrapping row of course chips connected by arrows, reusing this app's own
// card/border/primary tokens instead of the reference's imagery.
function CourseFlow({ courses }: { courses: RoleCourse[] }) {
  const nodes = [{ id: "foundation-course" }, ...courses];
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {nodes.map((node, i) => {
        const course = getCourseById(node.id);
        if (!course) return null;
        return (
          <div key={node.id} className="flex items-center gap-2">
            <Link
              href={`/academy/courses/${course.id}`}
              className="rounded-full bg-linear-to-br from-emphasis/20 via-accent to-secondary px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-opacity hover:opacity-90"
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

function CourseList({ courses }: { courses: RoleCourse[] }) {
  return (
    <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
      {courses.map((entry) => {
        const course = getCourseById(entry.id);
        if (!course) return null;
        return (
          <li key={entry.id}>
            <Link href={`/academy/courses/${course.id}`} className="font-semibold text-primary hover:underline">
              {course.title}
            </Link>{" "}
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
  const { isRegistered, registerMany } = useRegisteredCourses();
  const [activeSection, setActiveSection] = React.useState(SECTIONS[0].id);
  // Foundations card links to this specific course, independent of
  // FOUNDATION_COURSE_IDS (which also drives guest registration eligibility
  // elsewhere and includes "The VIA and KB MCP Servers" — a different,
  // unrelated course that doesn't belong under this "all paths start here" card).
  const foundationCourse = getCourseById("foundation-course");

  // Registering completes step 2 of the first-time partner's onboarding
  // checklist — send them back to the dashboard so they see it land.
  function handlePathRegister(pathCourses: (typeof COURSE_CATALOG)[number][], roleLabel: string) {
    registerMany(pathCourses, `Registered for all ${pathCourses.length} courses in the ${roleLabel} Path.`);
    if (role === "first-time-partner") {
      markFirstTimeCourseEnrolled();
      router.push("/");
    }
  }

  function handleSectionChange(id: string) {
    setActiveSection(id);
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
        title="Technical Training Paths"
        description="Start with the Foundations course, then choose the role-based path that fits where you want to concentrate your efforts. The order shown is suggested, but not mandatory."
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
        <Card className="shadow-card p-6">
          <h2 className="text-base font-semibold text-foreground">Applications Developer Foundations Course</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            ALL PATHS START HERE! This course is intended for everyone new to the Vantiq platform —
            platform orientation and the core concepts every partner needs before specializing.
          </p>
          <Button asChild className="mt-4">
            <Link href={`/academy/courses/${foundationCourse.id}`}>
              Start the Foundations Course
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        </Card>
      )}

      <div className="sticky top-0 z-10 -mx-6 bg-background px-6 py-3 md:-mx-10 md:px-10">
        <Tabs value={activeSection} onValueChange={handleSectionChange}>
          <TabsList className="h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
            {SECTIONS.map((s) => (
              <TabsTrigger
                key={s.id}
                value={s.id}
                className="rounded-full shadow-sm data-[state=inactive]:bg-linear-to-br data-[state=inactive]:from-emphasis/20 data-[state=inactive]:via-accent data-[state=inactive]:to-secondary"
              >
                {s.navLabel}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-6">
        {SECTIONS.map((s) => {
          const pathCourses = COURSE_CATALOG.filter((c) => c.pathIds.includes(s.id));
          const pathFullyRegistered = pathCourses.length > 0 && pathCourses.every((c) => isRegistered(c.id));

          return (
            <Card key={s.id} id={s.id} className="shadow-card scroll-mt-6 p-6">
              <h2 className="text-lg font-semibold text-foreground">{s.role}</h2>
              <p className="mt-1 text-sm font-medium text-primary">{s.oneLiner}</p>
              <p className="mt-3 text-sm text-muted-foreground">{s.intro}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {s.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="mt-5 text-sm font-medium text-foreground">{s.pathwayIntro}</p>
              <CourseFlow courses={s.courses} />
              <CourseList courses={s.courses} />

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-4">
                <p className="text-sm text-foreground">
                  Register for all {pathCourses.length} courses in the {s.role} Path
                </p>
                {role === "guest" ? (
                  <GuestRegisterLock compact />
                ) : (
                  <Button
                    size="sm"
                    variant={pathFullyRegistered ? "secondary" : "default"}
                    disabled={pathFullyRegistered && role !== "first-time-partner"}
                    onClick={() => handlePathRegister(pathCourses, s.role)}
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
