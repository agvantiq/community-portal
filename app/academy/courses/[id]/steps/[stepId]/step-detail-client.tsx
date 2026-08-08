"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { QuizView } from "@/components/quiz-view";
import {
  COURSE_CONTENT,
  STEP_CONTENT,
  STEP_COMMENTS,
  QUIZ_CONTENT,
  courseSteps,
  type CourseStep,
  type StepComment,
} from "@/lib/course-content";
import type { CatalogCourse } from "@/lib/sample-data";
import { initials } from "@/lib/org-roster";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, CircleCheck, FileText, Play } from "lucide-react";

export function StepDetailClient({ course, stepId }: { course: CatalogCourse; stepId: string }) {
  const router = useRouter();
  const content = COURSE_CONTENT[course.id];
  const steps: CourseStep[] = content ? courseSteps(course.id, content) : [];
  const index = steps.findIndex((s) => s.slug === stepId);
  const step = index >= 0 ? steps[index] : undefined;
  const prev = index > 0 ? steps[index - 1] : undefined;
  const next = index >= 0 && index < steps.length - 1 ? steps[index + 1] : undefined;
  const stepContent = STEP_CONTENT[`${course.id}/${stepId}`];
  // A final exam is a quiz too — same taking UI, just reached via kind "exam" instead of "quiz".
  const quizContent =
    step?.kind === "quiz" || step?.kind === "exam" ? QUIZ_CONTENT[`${course.id}/${stepId}`] : undefined;

  // No real per-step progress store exists yet (see DEMO_LESSON_PROGRESS), so
  // completing a step is local to this page and announced the same way every
  // other prototype write in the portal is — a toast, not a fake sync.
  const [completed, setCompleted] = React.useState(step?.status === "done");

  function handleComplete() {
    setCompleted(true);
    toast.success(`"${step?.label}" marked complete.`);
  }

  // Same local-only pattern as completion: no real comments backend, so a
  // posted comment is appended client-side and announced with a toast. Seeded
  // with whatever real discussion this step actually has (see STEP_COMMENTS).
  const [comments, setComments] = React.useState<StepComment[]>(
    () => STEP_COMMENTS[`${course.id}/${stepId}`] ?? []
  );
  const [commentDraft, setCommentDraft] = React.useState("");

  function handlePostComment() {
    const body = commentDraft.trim();
    if (!body) return;
    setComments((prev) => [...prev, { author: "You", timestamp: "Just now", body }]);
    setCommentDraft("");
    toast.success("Your comment has been posted.");
  }

  if (!step) {
    return (
      <div className="space-y-6">
        <PageHero
          eyebrow={
            // Browser "back" rather than a hardcoded destination — a step can
            // be reached from the Learning Hub, a course page, or another
            // step, and this should always return wherever the partner
            // actually came from. See CourseDetailClient for the same pattern.
            <button type="button" onClick={() => router.back()} className="hover:text-foreground">
              &larr; {course.title}
            </button>
          }
          title="Step not found"
          description="This step isn't part of the course outline. It may have been renamed or removed."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          // Browser "back" rather than a hardcoded destination — a step can
          // be reached from the Learning Hub, a course page, or another
          // step, and this should always return wherever the partner
          // actually came from. See CourseDetailClient for the same pattern.
          <button type="button" onClick={() => router.back()} className="hover:text-foreground">
            &larr; {course.title}
          </button>
        }
        // A quiz's own card already states what it's testing via its
        // questions — the page title just needs to say what kind of step
        // this is, not repeat the course/lesson name.
        title={quizContent ? (step.kind === "exam" ? "Final Exam" : "Quiz") : step.label}
        description={quizContent ? undefined : step.lessonTitle}
      />

      {quizContent ? (
        <QuizView content={quizContent} onFinish={handleComplete} />
      ) : stepContent ? (
        <>
          {stepContent.video && (
            <Card className="shadow-card gap-0 overflow-hidden p-0">
              {/* Placeholder frame for the real embed — deliberately not a stock graphic. */}
              <div className="relative flex aspect-video items-center justify-center bg-linear-to-br from-primary to-emphasis">
                <button
                  type="button"
                  onClick={() => toast.message("Video playback isn't available in this preview.")}
                  aria-label={`Play: ${stepContent.video.title}`}
                  className="group flex size-16 items-center justify-center rounded-full bg-card/90 shadow-card transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <Play className="size-6 translate-x-0.5 fill-primary text-primary" />
                </button>
                <p className="absolute inset-x-0 bottom-0 truncate bg-linear-to-t from-black/70 via-black/30 to-transparent px-5 pb-4 pt-12 text-sm font-medium text-white">
                  {stepContent.video.title}
                </p>
              </div>
            </Card>
          )}
        </>
      ) : (
        <Card className="flex flex-col items-center justify-center gap-2 p-10 text-center">
          <FileText className="size-6 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">This step isn&apos;t published yet</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            Its video and notes will appear here once they&apos;re added to the course.
          </p>
        </Card>
      )}

      {/* Completion and hand-off, grouped so "finish this" and "go next" read
          as one decision — and ranked, unlike the original's two identical
          buttons. */}
      <Card className="flex flex-row flex-wrap items-center justify-between gap-4 p-5">
        {completed ? (
          <span className="flex items-center gap-2 text-sm font-medium text-success">
            <CircleCheck className="size-4" />
            Completed
          </span>
        ) : quizContent ? (
          // Finish Quiz above already marks this step complete — a second
          // button here would just be the same action twice.
          <p className="text-xs text-muted-foreground">Answer every question above to finish.</p>
        ) : (
          <Button onClick={handleComplete}>
            <Check className="size-4" />
            Mark complete
          </Button>
        )}

        <div className="flex items-center gap-2">
          {prev && (
            <Button asChild variant="outline" size="sm">
              <Link href={`/academy/courses/${course.id}/steps/${prev.slug}`}>
                <ArrowLeft className="size-4" />
                Previous
              </Link>
            </Button>
          )}
          {next ? (
            <Button asChild variant="secondary" size="sm">
              <Link href={`/academy/courses/${course.id}/steps/${next.slug}`}>
                Next
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="secondary" size="sm">
              <Link href={`/academy/courses/${course.id}`}>Back to course</Link>
            </Button>
          )}
        </div>
      </Card>

      <div className="flex flex-col">
        <SectionHeading>Discussion</SectionHeading>
        <Card className="p-6">
          {comments.length > 0 && (
            <div className="mb-6 space-y-5">
              {comments.map((comment, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {initials(comment.author)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-sm font-medium text-foreground">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-foreground">{comment.body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Textarea
            aria-label="Add a comment"
            placeholder="Add a comment…"
            rows={4}
            value={commentDraft}
            onChange={(e) => setCommentDraft(e.target.value)}
          />
          <div className="mt-3 flex items-center justify-end">
            <Button size="sm" onClick={handlePostComment} disabled={!commentDraft.trim()}>
              Post comment
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
