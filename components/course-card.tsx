import Image from "next/image";
import Link from "next/link";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { FOUNDATION_COURSE_IDS, type CatalogCourse } from "@/lib/sample-data";
import { useRole } from "@/components/shell/role-provider";
import { GuestRegisterLock } from "@/components/guest-register-lock";
import { asset, cn } from "@/lib/utils";
import { courseImage } from "@/components/course-images";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

/**
 * @deprecated Vestigial now that the banner is a real photograph (looked up
 * per-course in components/course-images.ts) rather than a cycled gradient.
 * Kept exported only because the call sites in app/academy/page.tsx and
 * app/academy/courses/page.tsx still pass it in; the `gradient` prop below
 * accepts and ignores it so those keep compiling unchanged.
 */
export const COURSE_CARD_GRADIENTS = [
  "from-primary/25 via-secondary to-accent",
  "from-emphasis/20 via-accent to-secondary",
  "from-info/20 via-secondary to-accent",
  "from-emphasis/12 via-accent to-secondary",
  "from-critical/15 via-secondary to-accent",
];

export function CourseCard({
  course,
  showBadge = true,
  showDescription = true,
  showTags = true,
}: {
  course: CatalogCourse;
  /** @deprecated Ignored — see COURSE_CARD_GRADIENTS above. */
  gradient?: string;
  /** The "Vantiq Academy" eyebrow badge — omit for compact preview contexts. */
  showBadge?: boolean;
  /**
   * The course blurb under the banner. Off on the All Courses catalog
   * (app/academy/courses/page.tsx) as of 2026-08-18, where the grid is dense
   * enough that title + tags carry the card on their own. On by default
   * everywhere else: LearnDash supplies a course description, so unlike the
   * blurb-free resource cards this is a layout choice, not a missing field.
   */
  showDescription?: boolean;
  /**
   * The tag chips under the blurb. Off on the All Courses catalog as of
   * 2026-08-18: at that grid's density a dozen pale lozenges read as clutter
   * rather than as information, and the tags are already reachable — the Tags
   * filter builds its list from the same `course.tags` (ALL_TAGS in
   * app/academy/courses/page.tsx), and an active tag shows as a removable chip
   * in the toolbar. Hiding them here costs no filtering behaviour at all.
   */
  showTags?: boolean;
}) {
  const { isRegistered, register } = useRegisteredCourses();
  const registered = isRegistered(course.id);
  const { role } = useRole();
  const isLockedForGuest = role === "guest" && !FOUNDATION_COURSE_IDS.includes(course.id);
  const image = courseImage(course);
  const hasBodyContent = showDescription || (showTags && course.tags.length > 0);

  return (
    <Card
      id={`course-${course.id}`}
      className={cn(
        "shadow-card scroll-mt-6 h-full overflow-hidden border-none p-0",
        hasBodyContent ? "gap-6" : "gap-0"
      )}
    >
      <Link
        href={`/academy/courses/${course.id}`}
        className="relative flex h-28 flex-col justify-end overflow-hidden p-4"
      >
        <Image
          src={asset(image.src)}
          // Decorative: sits inside the link, so alt text would be read out
          // ahead of the course title in the link's accessible name. The
          // photograph carries no information the title doesn't already.
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover saturate-[0.55] contrast-[1.1] brightness-[0.92]"
        />
        {/* Brand duotone, matching the flagship industry tiles: a full-coverage
            teal multiply unifies photographs from many different sources, then
            a bottom-weighted pass plus a neutral darken keep the badge and
            title legible over whatever is underneath. */}
        <div aria-hidden className="absolute inset-0 bg-primary/22 mix-blend-multiply" />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-primary/75 via-primary/20 to-transparent mix-blend-multiply"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent"
        />
        {showBadge && (
          <span className="relative flex w-fit items-center gap-1.5 rounded-md bg-card/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground">
            <GraduationCap className="size-3" />
            Vantiq Academy
          </span>
        )}
        <h3
          className={`relative line-clamp-2 border-b-2 border-white/30 pb-1.5 text-base leading-tight font-bold text-white hover:underline ${
            showBadge ? "mt-2" : ""
          }`}
        >
          {course.title}
        </h3>
      </Link>
      <div className="p-3.5">
        {showDescription && (
          <p className="line-clamp-2 text-xs text-muted-foreground">{course.description}</p>
        )}
        {showTags && course.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {/* Right-aligned while the body has text to sit under. Action-only,
            the card is narrow enough on desktop for that to still read, but at
            mobile width the card goes full-bleed and a lone right-aligned
            button leaves the row lopsided — so it stretches below sm. */}
        <div
          className={cn(
            "mt-2.5 flex items-center justify-end gap-2",
            !hasBodyContent && "max-sm:[&>*]:w-full"
          )}
        >
          {isLockedForGuest ? (
            <GuestRegisterLock compact />
          ) : (
            <Button
              size="sm"
              variant={registered ? "secondary" : "default"}
              disabled={registered}
              onClick={() => register(course)}
            >
              {registered ? "Registered" : "Register"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
