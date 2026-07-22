"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";

export interface RoadmapStep {
  id: string;
  label: string;
  status: "done" | "current" | "locked";
}

export function RoadmapStepper({ steps }: { steps: RoadmapStep[] }) {
  return (
    <div className="flex items-center">
      {steps.map((step, i) => (
        <React.Fragment key={step.id}>
          <button
            type="button"
            onClick={() =>
              step.status === "locked"
                ? toast("Complete the previous phase to unlock this step.")
                : toast(`${step.label} details`)
            }
            className="flex flex-col items-center gap-2 text-center"
          >
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                step.status === "done"
                  ? "bg-success text-success-foreground"
                  : step.status === "current"
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-foreground bg-card text-muted-foreground"
              }`}
            >
              {step.status === "done" ? <Check className="size-4" /> : i + 1}
            </div>
            <span
              className={`max-w-[100px] text-xs font-medium leading-tight text-balance ${
                step.status === "locked" ? "text-muted-foreground" : "text-foreground"
              }`}
            >
              {step.label}
            </span>
          </button>
          {i < steps.length - 1 && <div className="mx-2 h-0.5 flex-1 bg-foreground" />}
        </React.Fragment>
      ))}
    </div>
  );
}
