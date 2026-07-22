"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CERTIFICATION_MODULES } from "@/lib/sample-data";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import { toast } from "sonner";

const ROADMAP = [
  { label: "Associate Developer", status: "done" as const },
  { label: "Professional Developer", status: "current" as const },
  { label: "Solution Architect", status: "locked" as const },
  { label: "Industry Specialist", status: "locked" as const },
];

export default function AcademyPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-card border-none bg-primary p-8 text-primary-foreground">
        <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
          Learning Hub
        </p>
        <h1 className="mt-2 text-2xl font-semibold">Academy Pathway</h1>
        <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
          Certifications map directly to what you&apos;ll build on the Vantiq platform &mdash;
          from your first VAIL rule to production edge-AI architecture.
        </p>
      </Card>

      <Card className="shadow-card p-6">
        <h2 className="mb-5 text-sm font-medium text-foreground">Certification Roadmap</h2>
        <div className="flex items-center">
          {ROADMAP.map((step, i) => (
            <React.Fragment key={step.label}>
              <button
                type="button"
                onClick={() =>
                  step.status === "locked"
                    ? toast("Complete the previous certification to unlock this step.")
                    : toast(`${step.label} details`)
                }
                className="flex flex-col items-center gap-2 text-center"
              >
                <div
                  className={`flex size-10 items-center justify-center rounded-full border-2 ${
                    step.status === "done"
                      ? "border-success bg-success/10 text-success"
                      : step.status === "current"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {step.status === "done" ? (
                    <CheckCircle2 className="size-5" />
                  ) : step.status === "current" ? (
                    <PlayCircle className="size-5" />
                  ) : (
                    <Lock className="size-4" />
                  )}
                </div>
                <span className="max-w-[110px] text-xs font-medium text-foreground">{step.label}</span>
              </button>
              {i < ROADMAP.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 ${
                    ROADMAP[i + 1].status !== "locked" || step.status === "done" ? "bg-success/40" : "bg-border"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="shadow-card p-6 lg:col-span-2">
          <h2 className="mb-4 text-sm font-medium text-foreground">
            Your Progress &mdash; Professional Developer
          </h2>
          <div className="space-y-3">
            {CERTIFICATION_MODULES.map((mod) => (
              <div
                key={mod.title}
                className={`rounded-md border p-3 ${
                  mod.status === "locked" ? "border-border opacity-60" : "border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    {mod.status === "done" && <CheckCircle2 className="size-4 text-success" />}
                    {mod.status === "current" && <PlayCircle className="size-4 text-primary" />}
                    {mod.status === "locked" && <Lock className="size-3.5 text-muted-foreground" />}
                    {mod.title}
                  </span>
                  {mod.status === "done" && <Badge variant="secondary" className="bg-success/10 text-success">Complete</Badge>}
                  {mod.status === "current" && <Badge variant="secondary" className="bg-info/10 text-info">In progress</Badge>}
                  {mod.status === "locked" && <Badge variant="secondary">Locked</Badge>}
                </div>
                {mod.status === "current" && mod.progress && (
                  <Progress value={mod.progress} className="mt-3 h-1.5" />
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-card p-6">
            <h2 className="text-sm font-medium text-foreground">Certificate</h2>
            <div className="mt-3 flex flex-col items-center rounded-md border border-dashed border-border p-6">
              <p className="text-3xl font-semibold text-primary">75%</p>
              <p className="mt-1 text-xs text-muted-foreground">Completed</p>
            </div>
          </Card>
          <Card className="shadow-card p-6">
            <h2 className="text-sm font-medium text-foreground">Office Hours</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Join a weekly session with Vantiq solutions engineers to work through certification
              blockers.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
