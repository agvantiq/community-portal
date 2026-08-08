import { COURSE_CATALOG } from "@/lib/sample-data";
import { COURSE_CONTENT, courseSteps } from "@/lib/course-content";
import { StepDetailClient } from "./step-detail-client";

export function generateStaticParams() {
  return Object.entries(COURSE_CONTENT).flatMap(([courseId, content]) =>
    courseSteps(courseId, content).map((step) => ({ id: courseId, stepId: step.slug }))
  );
}

export default async function StepDetailPage({
  params,
}: {
  params: Promise<{ id: string; stepId: string }>;
}) {
  const { id, stepId } = await params;
  const course = COURSE_CATALOG.find((c) => c.id === id) ?? COURSE_CATALOG[0];
  return <StepDetailClient course={course} stepId={stepId} />;
}
