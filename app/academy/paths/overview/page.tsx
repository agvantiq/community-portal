"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { ChevronRight } from "lucide-react";
import { COURSE_CATALOG, getCourseById } from "@/lib/sample-data";
import { useRegisteredCourses } from "@/lib/registered-courses";

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
            &ndash; ({course.duration}) &ndash; {entry.blurb ?? course.description}
          </li>
        );
      })}
    </ul>
  );
}

export default function TrainingPathsOverviewPage() {
  const { isRegistered, registerMany } = useRegisteredCourses();

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/academy/paths" className="hover:text-foreground">
            &larr; Paths
          </Link>
        }
        title="Overview of Training Paths"
        description="Decide where you want to concentrate your efforts to best serve the needs of your group."
      >
        <BookmarkButton
          item={{
            id: "/academy/paths/overview",
            label: "Overview of Training Paths",
            href: "/academy/paths/overview",
            iconKey: "GraduationCap",
          }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-64 lg:shrink-0">
          <Card className="shadow-card sticky top-6 p-2">
            <nav className="flex flex-col">
              <a
                href="#overview"
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
              >
                Overview of Training Paths
              </a>
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
                >
                  {s.navLabel}
                </a>
              ))}
            </nav>
          </Card>
        </div>

        <div className="min-w-0 flex-1 space-y-6">
          <Card id="overview" className="shadow-card scroll-mt-6 p-6">
            <h2 className="text-lg font-semibold text-foreground">Overview of Training Paths</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Building a cutting edge, real-time, event-driven application system on the Vantiq Platform is
              a team effort, bringing in several specializations. In the Applications Developer Foundations
              Course, you gained broad familiarity with a spectrum of Vantiq&apos;s distributed application
              building tools and resources; now it&apos;s time to decide where you want to concentrate your
              efforts to best serve the needs of your group:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="font-semibold text-primary hover:underline">
                    {s.role}
                  </a>{" "}
                  &ndash; {s.oneLiner}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Vantiq provides a training pathway that greatly accelerates gaining the technical knowledge
              and skills needed to fulfill your project role. Simply choose your path, and take the courses
              listed there. The order shown is suggested, but not mandatory.
            </p>
          </Card>

          {SECTIONS.map((s) => {
            const pathCourses = COURSE_CATALOG.filter((c) => c.pathIds.includes(s.id));
            const pathFullyRegistered = pathCourses.length > 0 && pathCourses.every((c) => isRegistered(c.id));

            return (
              <Card key={s.id} id={s.id} className="shadow-card scroll-mt-6 p-6">
                <h2 className="text-lg font-semibold text-foreground">{s.role}</h2>
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
                  <Button
                    size="sm"
                    variant={pathFullyRegistered ? "secondary" : "default"}
                    disabled={pathFullyRegistered}
                    onClick={() =>
                      registerMany(
                        pathCourses,
                        `Registered for all ${pathCourses.length} courses in the ${s.role} Path.`
                      )
                    }
                  >
                    {pathFullyRegistered ? "Registered" : "Register"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
