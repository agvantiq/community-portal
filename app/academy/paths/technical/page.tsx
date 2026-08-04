"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Circle, ChevronRight } from "lucide-react";
import { TECHNICAL_PATHS, COURSE_CATALOG, getCourseById, type TechnicalPath } from "@/lib/sample-data";

// Vantiq's own On Demand Courses site groups training into a Foundations
// course, one path per role, and a shared Electives list — this mirrors that
// structure using this portal's own course data.
const PATH_DESCRIPTIONS: Record<string, string> = {
  "ai-developer":
    "AI Developers take full advantage of Vantiq's AI integrations and tools in order to build sophisticated generative AI and AI agency into their projects.",
  "server-developer":
    "Server Developers build the backend services, integrations, and business logic that power a Vantiq application.",
  "ui-developer":
    "End-users need to be able to easily understand and engage with your Vantiq application. UI Developers provide that critical interface.",
  architect:
    "Architects design projects to adhere to stakeholder needs while ensuring good practices for ongoing performance and scalability.",
  administrator: "Administrators monitor server health and resource allocations at the tenant and system levels.",
};

const FOUNDATIONS_COURSE_IDS = ["foundation-course", "the-via-and-kb-mcp-servers"];

function CourseRow({ id, title }: { id: string; title: string }) {
  return (
    <Link
      href={`/academy/courses/${id}`}
      className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-primary"
    >
      <span className="flex items-center gap-3">
        <Circle className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">{title}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}

function PathCard({ path }: { path: TechnicalPath }) {
  return (
    <Card id={path.id} className="shadow-card scroll-mt-6 p-6">
      <h2 className="text-base font-semibold text-foreground">{path.label} Training Path</h2>
      <p className="mt-2 text-sm text-muted-foreground">{PATH_DESCRIPTIONS[path.id]}</p>
      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value={path.id} className="rounded-md border border-border px-4">
          <AccordionTrigger className="text-sm font-medium text-primary">View courses</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {path.modules.map((mod) => {
                const course = getCourseById(mod.courseId);
                return course ? <CourseRow key={mod.courseId} id={course.id} title={course.title} /> : null;
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

export default function TechnicalTrainingPathsPage() {
  const foundationCourses = FOUNDATIONS_COURSE_IDS.map(getCourseById).filter((c) => !!c);
  const electiveCourses = COURSE_CATALOG.filter((c) => !FOUNDATIONS_COURSE_IDS.includes(c.id));

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/academy/paths" className="hover:text-foreground">
            &larr; Paths
          </Link>
        }
        title="Technical Training Paths"
        description="Foundations, role-based paths, and electives for building on Vantiq."
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

      <Link
        href="/academy/paths/overview"
        className="block rounded-xl bg-linear-to-br from-emphasis/20 via-accent to-secondary p-6 shadow-card transition-opacity hover:opacity-90"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">Overview of Training Paths</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Decide where you want to concentrate your efforts to best serve the needs of your group.
            </p>
          </div>
          <ChevronRight className="size-5 shrink-0 text-foreground/70" />
        </div>
      </Link>

      <div className="space-y-6">
        {foundationCourses.length > 0 && (
          <Card className="shadow-card p-6">
            <h2 className="text-base font-semibold text-foreground">
              Applications Developer Foundations Course
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              ALL PATHS START HERE! Either course is intended for everyone new to the Vantiq platform.
              Developers of event-driven, real-time applications, (as well as Architects, Administrators
              and Service Developers) should take the EVENT-DRIVEN Application Developer Foundations
              Course. Developers focused just on projects that leverage AI without events should start
              with the AI Application Developer Foundations Course.
            </p>
            <div className="mt-4 space-y-2">
              {foundationCourses.map((course) => (
                <CourseRow key={course.id} id={course.id} title={course.title} />
              ))}
            </div>
          </Card>
        )}

        {TECHNICAL_PATHS.map((path) => (
          <PathCard key={path.id} path={path} />
        ))}

        <Card className="shadow-card p-6">
          <h2 className="text-base font-semibold text-foreground">Electives</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Every course in the catalog, available to take individually regardless of which path
            you&apos;re on.
          </p>
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="electives" className="rounded-md border border-border px-4">
              <AccordionTrigger className="text-sm font-medium text-primary">View courses</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {electiveCourses.map((course) => (
                    <CourseRow key={course.id} id={course.id} title={course.title} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </div>
  );
}
