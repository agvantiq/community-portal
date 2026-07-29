"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";

export interface RoadmapStep {
  id: string;
  label: string;
  /** Recommended order, not enforced — nothing is ever locked/unavailable. */
  status: "done" | "current" | "upcoming";
}

export function RoadmapStepper({ steps }: { steps: RoadmapStep[] }) {
  return (
    <div className="flex items-start">
      {steps.map((step, i) => (
        <React.Fragment key={step.id}>
          <button
            type="button"
            onClick={() => toast(`${step.label} details`)}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                step.status === "done"
                  ? "bg-primary text-primary-foreground"
                  : step.status === "current"
                    ? "border-[3px] border-primary bg-card text-primary"
                    : "border-2 border-border bg-card text-muted-foreground"
              }`}
            >
              {step.status === "done" ? <Check className="size-4" /> : i + 1}
            </div>
            <span
              className={`max-w-[100px] text-xs font-medium leading-tight text-balance ${
                step.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
              }`}
            >
              {step.label}
            </span>
          </button>
          {i < steps.length - 1 && (
            <div
              className={`mt-[17px] h-0.5 flex-1 ${
                step.status === "done" ? "bg-foreground" : "bg-border"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
