"use client";

import * as React from "react";
import { Check, X, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QuizContent } from "@/lib/course-content";

function sameSet(a: number[], b: number[]) {
  if (a.length !== b.length) return false;
  const sorted = [...a].sort();
  return [...b].sort().every((v, i) => v === sorted[i]);
}

/**
 * The quiz-taking surface for a "quiz" step — question cards with
 * selectable options, standing in for the source site's plain radio-button
 * form. Grading only runs where a question actually has `correctAnswers`
 * (see the field's own comment: these are assumed, not a verified answer
 * key) — a quiz with none just records completion on Submit, same as before.
 */
export function QuizView({ content, onFinish }: { content: QuizContent; onFinish: () => void }) {
  const [selected, setSelected] = React.useState<number[][]>(() => content.questions.map(() => []));
  const [submitted, setSubmitted] = React.useState(false);
  const allAnswered = selected.every((s) => s.length > 0);
  const graded = content.questions.every((q) => q.correctAnswers);

  function choose(questionIndex: number, optionIndex: number) {
    if (submitted) return;
    const isMulti = content.questions[questionIndex].type === "multi";
    setSelected((prev) =>
      prev.map((sel, i) => {
        if (i !== questionIndex) return sel;
        if (isMulti) {
          return sel.includes(optionIndex) ? sel.filter((o) => o !== optionIndex) : [...sel, optionIndex];
        }
        return [optionIndex];
      })
    );
  }

  function handleSubmit() {
    setSubmitted(true);
    onFinish();
  }

  function handleRetake() {
    setSelected(content.questions.map(() => []));
    setSubmitted(false);
  }

  const correctCount = content.questions.filter(
    (q, qi) => q.correctAnswers && sameSet(q.correctAnswers, selected[qi])
  ).length;

  return (
    <Card className="shadow-card space-y-6 p-6">
      {submitted && graded && (
        <div
          className={cn(
            "flex items-center justify-between rounded-lg border p-4",
            correctCount === content.questions.length
              ? "border-success/30 bg-success/5"
              : "border-border bg-muted/40"
          )}
        >
          <p className="text-sm font-medium text-foreground">
            {correctCount}/{content.questions.length} correct
          </p>
          <Button size="sm" variant="outline" onClick={handleRetake}>
            <RotateCcw className="size-3.5" />
            Retake Quiz
          </Button>
        </div>
      )}

      {content.questions.map((question, qi) => {
        const isMulti = question.type === "multi";
        const questionGraded = submitted && !!question.correctAnswers;
        const isCorrect = questionGraded && sameSet(question.correctAnswers!, selected[qi]);

        return (
          <fieldset key={question.prompt} className="space-y-3">
            <legend className="flex items-center gap-2 text-sm font-medium text-foreground">
              {question.prompt}
              {questionGraded &&
                (isCorrect ? (
                  <Check className="size-4 shrink-0 text-success" />
                ) : (
                  <X className="size-4 shrink-0 text-destructive" />
                ))}
            </legend>
            <div className="flex flex-col gap-2">
              {question.options.map((option, oi) => {
                const isSelected = selected[qi]?.includes(oi);
                const isRightOption = questionGraded && question.correctAnswers!.includes(oi);
                const missedCorrect = questionGraded && !isSelected && isRightOption;
                const wrongPick = questionGraded && isSelected && !isRightOption;

                return (
                  <button
                    key={option}
                    type="button"
                    role={isMulti ? "checkbox" : "radio"}
                    aria-checked={isSelected}
                    disabled={submitted}
                    onClick={() => choose(qi, oi)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3.5 text-left transition-colors",
                      !submitted && "hover:border-primary/50",
                      questionGraded
                        ? wrongPick
                          ? "border-destructive/40 bg-destructive/5"
                          : isRightOption
                            ? "border-success/40 bg-success/5"
                            : "border-border"
                        : isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center border-2",
                        isMulti ? "rounded-[4px]" : "rounded-full",
                        questionGraded
                          ? wrongPick
                            ? "border-destructive bg-destructive"
                            : isRightOption
                              ? "border-success bg-success"
                              : "border-border"
                          : isSelected
                            ? isMulti
                              ? "border-primary bg-primary"
                              : "border-primary"
                            : "border-border"
                      )}
                    >
                      {questionGraded ? (
                        wrongPick ? (
                          <X className="size-3 text-destructive-foreground" />
                        ) : isRightOption ? (
                          <Check className="size-3 text-success-foreground" />
                        ) : null
                      ) : (
                        isSelected &&
                        (isMulti ? (
                          <Check className="size-3 text-primary-foreground" />
                        ) : (
                          <span className="size-2 rounded-full bg-primary" />
                        ))
                      )}
                    </span>
                    <span className="text-sm font-medium text-foreground">{option}</span>
                    {missedCorrect && (
                      <span className="ml-auto shrink-0 text-xs font-medium text-success">Correct answer</span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      {!submitted && (
        <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
          <p className="text-xs text-muted-foreground">
            {allAnswered
              ? "All questions answered."
              : `${selected.filter((s) => s.length > 0).length}/${content.questions.length} answered`}
          </p>
          <Button onClick={handleSubmit} disabled={!allAnswered}>
            Submit
          </Button>
        </div>
      )}
    </Card>
  );
}
