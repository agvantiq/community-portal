import { COURSE_CATALOG } from "@/lib/sample-data";
import { CourseDetailClient } from "./course-detail-client";

export function generateStaticParams() {
  return COURSE_CATALOG.map((course) => ({ id: course.id }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = COURSE_CATALOG.find((c) => c.id === id) ?? COURSE_CATALOG[0];
  return <CourseDetailClient course={course} />;
}
