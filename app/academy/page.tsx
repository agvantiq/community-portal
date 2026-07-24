"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RoadmapStepper } from "@/components/roadmap-stepper";
import { BookmarkButton } from "@/components/bookmark-button";
import { useRole } from "@/components/shell/role-provider";
import {
  SALES_SPRINT,
  TECHNICAL_SPRINT,
  TECHNICAL_PATHS,
  DEFAULT_TECHNICAL_PATH_ID,
} from "@/lib/sample-data";
import { CheckCircle2, Circle, Clock, Lock, PlayCircle, Users2 } from "lucide-react";
import { toast } from "sonner";

const COURSES = {
  technical: [
    { id: "vail-fundamentals", title: "VAIL Fundamentals", duration: "2h 30m", level: "Beginner" },
    { id: "edge-ai-architecture", title: "Edge AI Architecture Deep Dive", duration: "2h 15m", level: "Intermediate" },
    { id: "edge-deployment-patterns", title: "Edge Deployment Patterns", duration: "1h 45m", level: "Intermediate" },
    { id: "real-time-event-orchestration", title: "Real-Time Event Orchestration", duration: "3h", level: "Advanced" },
    { id: "building-custom-connectors", title: "Building Custom Connectors", duration: "2h", level: "Intermediate" },
  ],
  sales: [
    { id: "vantiq-value-proposition", title: "Vantiq Value Proposition", duration: "1h", level: "Beginner" },
    { id: "discovery-call-playbook", title: "Discovery Call Playbook", duration: "1h 30m", level: "Beginner" },
    { id: "competitive-positioning", title: "Competitive Positioning", duration: "1h 15m", level: "Intermediate" },
    { id: "closing-enterprise-deals", title: "Closing Enterprise Deals", duration: "2h", level: "Advanced" },
  ],
};

const SHADOW_SESSIONS = [
  { title: "Shadow a Discovery Call", host: "Priya Nandakumar", time: "Jul 28, 10:00 AM" },
  { title: "Shadow a Solution Architecture Review", host: "Marcus Ide", time: "Jul 30, 2:00 PM" },
  { title: "Shadow a Go-Live Deployment", host: "Sofia Reyes", time: "Aug 4, 9:00 AM" },
];

const OFFICE_HOUR_SLOTS = [
  { title: "Technical Q&A", time: "Every Tuesday, 11:00 AM" },
  { title: "Certification Blockers Clinic", time: "Every Thursday, 3:00 PM" },
];

export default function AcademyPage() {
  const { role } = useRole();
  const isSales = role === "sales-partner";
  const [pathId, setPathId] = React.useState(DEFAULT_TECHNICAL_PATH_ID);

  const activePath = TECHNICAL_PATHS.find((p) => p.id === pathId) ?? TECHNICAL_PATHS[0];
  const sprint = isSales ? SALES_SPRINT : TECHNICAL_SPRINT;
  const currentPhase = sprint.find((p) => p.status === "current") ?? sprint[0];
  const courses = isSales ? COURSES.sales : COURSES.technical;

  return (
    <div className="space-y-6">
      <Card className="shadow-card relative border-none bg-primary p-8 text-primary-foreground">
        <BookmarkButton
          item={{ id: "/academy", label: "Certification Roadmap", href: "/academy", iconKey: "GraduationCap" }}
          className="absolute right-4 top-4"
        />
        <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
          Learning Hub
        </p>
        <h1 className="mt-2 text-2xl font-semibold">
          {isSales ? "Sales Enablement Track" : "Technical Enablement Track"}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
          {isSales
            ? "The 90-day sprint from foundation to revenue — enabling you to sell, scope, and create repeatable solutions independently."
            : "The 90-day sprint from ideation to launch — building toward Vantiq Certified Partner status."}
        </p>
      </Card>

      <Card className="shadow-card p-6">
        <h2 className="mb-5 text-sm font-medium text-foreground">90-Day Sprint</h2>
        <RoadmapStepper steps={sprint} />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="shadow-card p-6 lg:col-span-2">
          {!isSales && (
            <div className="mb-4 flex flex-wrap gap-2">
              {TECHNICAL_PATHS.map((p) => (
                <Button
                  key={p.id}
                  type="button"
                  size="sm"
                  variant={p.id === pathId ? "default" : "outline"}
                  onClick={() => setPathId(p.id)}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          )}
          <h2 className="mb-4 text-sm font-medium text-foreground">
            {isSales
              ? `${currentPhase.label} — ${currentPhase.timeframe}`
              : `${activePath.label} Path — ${currentPhase.label}`}
          </h2>
          <div className="space-y-3">
            {isSales
              ? currentPhase.tasks.map((task) => (
                  <div
                    key={task}
                    className="flex items-center gap-2 rounded-md border border-border p-3 text-sm text-foreground"
                  >
                    <Circle className="size-4 shrink-0 text-muted-foreground" />
                    {task}
                  </div>
                ))
              : activePath.modules.map((mod) => (
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
                      {mod.status === "done" && (
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          Complete
                        </Badge>
                      )}
                      {mod.status === "current" && (
                        <Badge variant="secondary" className="bg-info/10 text-info">
                          In progress
                        </Badge>
                      )}
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
            <h2 className="text-sm font-medium text-foreground">
              {isSales ? "Goal" : "Certification Goal"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSales
                ? "Enable partner to sell, scope, and create repeatable solutions independently."
                : "Become a Vantiq Certified Partner with company-level certification."}
            </p>
          </Card>
          <Card id="office-hours" className="shadow-card p-6">
            <h2 className="text-sm font-medium text-foreground">Office Hour Registration</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Join a weekly session with Vantiq solutions engineers to work through
              {isSales ? " GTM and pipeline blockers." : " certification blockers."}
            </p>
            <div className="mt-4 space-y-2">
              {OFFICE_HOUR_SLOTS.map((slot) => (
                <div
                  key={slot.title}
                  className="flex items-center justify-between gap-3 rounded-md border border-border p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{slot.title}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3.5" />
                      {slot.time}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.success(`Registered for ${slot.title}.`)}
                  >
                    Register
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card id="courses" className="shadow-card p-6">
          <h2 className="mb-4 text-sm font-medium text-foreground">
            {isSales ? "Sales Courses" : "Technical Courses"}
          </h2>
          <div className="space-y-2">
            {courses.map((course) => (
              <div
                key={course.id}
                id={`course-${course.id}`}
                className="scroll-mt-6 flex items-center justify-between gap-3 rounded-md border border-border p-3 target:border-primary target:bg-primary/5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{course.title}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    {course.duration}
                  </p>
                </div>
                <Badge variant="secondary">{course.level}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card id="shadowing" className="shadow-card p-6">
          <h2 className="mb-4 text-sm font-medium text-foreground">Schedule Shadowing</h2>
          <div className="space-y-2">
            {SHADOW_SESSIONS.map((session) => (
              <div
                key={session.title}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{session.title}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Users2 className="size-3.5" />
                    {session.host} &middot; {session.time}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.success(`Reserved a spot for "${session.title}".`)}
                >
                  Reserve
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
