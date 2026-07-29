import { useRegisteredCourses } from "@/lib/registered-courses";
import type { CatalogCourse } from "@/lib/sample-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, GraduationCap } from "lucide-react";

// Pastel tints of the portal's own palette (primary/emphasis/info/warning at
// low opacity over secondary/accent) so every card reads on-brand rather than
// like a stock gradient set, and stays legible under dark-teal foreground text.
export const COURSE_CARD_GRADIENTS = [
  "from-primary/25 via-secondary to-accent",
  "from-emphasis/20 via-accent to-secondary",
  "from-info/20 via-secondary to-accent",
  "from-warning/20 via-accent to-secondary",
  "from-critical/15 via-secondary to-accent",
];

export function CourseCard({
  course,
  gradient,
  showBadge = true,
}: {
  course: CatalogCourse;
  gradient: string;
  /** The "Vantiq Academy" eyebrow badge — omit for compact preview contexts. */
  showBadge?: boolean;
}) {
  const { isRegistered, register } = useRegisteredCourses();
  const registered = isRegistered(course.id);

  return (
    <Card
      id={`course-${course.id}`}
      className="shadow-card scroll-mt-6 h-full overflow-hidden border-none p-0"
    >
      <div className={`flex h-36 flex-col justify-end bg-linear-to-br ${gradient} p-5`}>
        {showBadge && (
          <span className="flex w-fit items-center gap-1.5 rounded-md bg-card/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground">
            <GraduationCap className="size-3" />
            Vantiq Academy
          </span>
        )}
        <h3
          className={`line-clamp-2 border-b-2 border-foreground/20 pb-2 text-lg leading-tight font-bold text-foreground ${
            showBadge ? "mt-3" : ""
          }`}
        >
          {course.title}
        </h3>
      </div>
      <div className="p-4">
        <p className="line-clamp-2 text-xs text-muted-foreground">{course.description}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {course.duration}
          </span>
          <Button
            size="sm"
            variant={registered ? "secondary" : "default"}
            disabled={registered}
            onClick={() => register(course)}
          >
            {registered ? "Registered" : "Register"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
