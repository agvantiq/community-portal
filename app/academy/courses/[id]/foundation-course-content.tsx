"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Circle, FileCheck } from "lucide-react";

interface LessonItem {
  label: string;
  kind: "topic" | "quiz";
}

interface Lesson {
  id: string;
  title: string;
  topics: number;
  quizzes: number;
  /** Only populated where the real curriculum is known; otherwise the
   * lesson still expands, just without fabricated topic names. */
  items?: LessonItem[];
}

const LESSONS: Lesson[] = [
  {
    id: "lesson-1",
    title: "Lesson 1: Introduction to the Vantiq Platform",
    topics: 2,
    quizzes: 2,
    items: [
      { label: "1.1 Vantiq Applications", kind: "topic" },
      { label: "Quiz 1.1: Vantiq Applications", kind: "quiz" },
      { label: "1.2 Vantiq Application Architecture", kind: "topic" },
      { label: "Quiz 1.2: Vantiq Application Architecture", kind: "quiz" },
    ],
  },
  {
    id: "lesson-2",
    title: "Lesson 2: Vantiq Project Resources",
    topics: 5,
    quizzes: 3,
    items: [
      { label: "2.1 Service Sources", kind: "topic" },
      { label: "Lab 2.1: Services & Sources", kind: "topic" },
      { label: "Quiz 2.1: Service Sources", kind: "quiz" },
      { label: "Schema & Standard Types", kind: "topic" },
      { label: "Quiz: Schema & Standard Types", kind: "quiz" },
      { label: "2.3 Simulating Events", kind: "topic" },
      { label: "Lab 2.3: Simulating Events", kind: "topic" },
      { label: "Quiz 2.3: Simulating Events", kind: "quiz" },
    ],
  },
  { id: "lesson-3", title: "Lesson 3: Services & Event Handlers", topics: 5, quizzes: 3 },
  { id: "lesson-4", title: "Lesson 4: VAIL", topics: 3, quizzes: 2 },
  { id: "lesson-5", title: "Lesson 5: Stateful Services", topics: 2, quizzes: 1 },
  { id: "lesson-6", title: "Lesson 6: Client Builder", topics: 3, quizzes: 2 },
  { id: "lesson-7", title: "Lesson 7: System Distribution & Collaboration", topics: 6, quizzes: 3 },
  { id: "lesson-8", title: "Lesson 8: Orchestrating AI & Where to Go From Here", topics: 6, quizzes: 4 },
];

const TOTAL_STEPS = 42;

export function FoundationCourseContent() {
  const [openLessons, setOpenLessons] = React.useState<string[]>([]);
  const allIds = LESSONS.map((l) => l.id);
  const allOpen = openLessons.length === allIds.length;

  return (
    <>
      <Card className="shadow-card p-6">
        <div className="flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-0 rounded-full bg-primary" />
          </div>
          <span className="shrink-0 text-xs font-semibold text-primary">0% COMPLETE</span>
          <span className="shrink-0 text-xs text-muted-foreground">0/{TOTAL_STEPS} Steps</span>
        </div>
      </Card>

      <Card className="shadow-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground">Course Content</h2>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            onClick={() => setOpenLessons(allOpen ? [] : allIds)}
          >
            {allOpen ? "Collapse All" : "Expand All"}
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-3 rounded-md border border-border p-3">
            <Circle className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              Introduction to Vantiq&apos;s Technical Certification Program
            </span>
          </div>

          <Accordion type="multiple" value={openLessons} onValueChange={setOpenLessons}>
            {LESSONS.map((lesson) => (
              <AccordionItem
                key={lesson.id}
                value={lesson.id}
                className="mb-2 rounded-md border border-border px-4 last:mb-0"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline [&>svg]:hidden">
                  <span className="flex flex-1 items-center gap-3">
                    <Circle className="size-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1">
                      {lesson.title}
                      <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                        {lesson.topics} Topics &middot; {lesson.quizzes} {lesson.quizzes === 1 ? "Quiz" : "Quizzes"}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs font-medium text-primary">
                      {openLessons.includes(lesson.id) ? "Collapse" : "Expand"}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {lesson.items ? (
                    <div className="space-y-2 pb-2">
                      <div className="flex items-center justify-between rounded-md bg-primary px-4 py-2.5 text-primary-foreground">
                        <span className="text-sm font-semibold">Lesson Content</span>
                        <span className="text-xs">0% COMPLETE &middot; 0/{lesson.items.length} Steps</span>
                      </div>
                      {lesson.items.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-3 rounded-md border border-border p-2.5"
                        >
                          {item.kind === "quiz" ? (
                            <FileCheck className="size-4 shrink-0 text-muted-foreground" />
                          ) : (
                            <Circle className="size-4 shrink-0 text-muted-foreground" />
                          )}
                          <span className="text-sm text-foreground">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="pb-2 text-xs text-muted-foreground">
                      Lesson content for this section is coming soon.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex items-center gap-3 rounded-md border border-border p-3">
            <FileCheck className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              FINAL EXAM: Applications Developer Level 1 Course
            </span>
          </div>
        </div>
      </Card>
    </>
  );
}
