"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { PageBanner } from "@/components/page-banner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RoadmapStepper } from "@/components/roadmap-stepper";
import { BookmarkButton } from "@/components/bookmark-button";
import { useRole } from "@/components/shell/role-provider";
import { useRegisteredCourses } from "@/lib/registered-courses";
import Link from "next/link";
import {
  SALES_SPRINT,
  TECHNICAL_SPRINT,
  TECHNICAL_PATHS,
  DEFAULT_TECHNICAL_PATH_ID,
  COURSES,
  type TechnicalPath,
} from "@/lib/sample-data";
import { CheckCircle2, Circle, Clock, Lock, PlayCircle, Users2 } from "lucide-react";
import { toast } from "sonner";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";

// Synthetic 6th path, shown only to Vantiq employees so they can see the
// sales track's progress alongside the five technical paths without those
// two audiences' tabs bleeding into each other's views.
const SALES_PATH: TechnicalPath = {
  id: "sales-path",
  label: "Sales Path",
  modules: [
    { title: "Vantiq Value Proposition", status: "done" },
    { title: "Discovery Call Playbook", status: "done" },
    { title: "Competitive Positioning", status: "current", progress: 50 },
    { title: "Closing Enterprise Deals", status: "locked" },
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

// Prototype's "today" — kept fixed to line up with the mock dates used across
// this page and the dashboard (Announcements, SHADOW_SESSIONS) rather than
// drifting with the real system clock.
const TODAY = new Date(2026, 6, 27);
const CALENDAR_MONTH = startOfMonth(TODAY);
const CALENDAR_DAYS = eachDayOfInterval({
  start: startOfWeek(CALENDAR_MONTH),
  end: endOfWeek(endOfMonth(CALENDAR_MONTH)),
});
// Office Hours recur every Tuesday (2) and Thursday (4).
const OFFICE_HOUR_DAYS = CALENDAR_DAYS.filter(
  (day) => isSameMonth(day, CALENDAR_MONTH) && [2, 4].includes(getDay(day))
);

function parseYMD(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  return format(new Date(2000, 0, 1, h, m), "h:mm a");
}

function formatReservationRange(r: { date: string; days?: number }) {
  const start = parseYMD(r.date);
  if (!r.days || r.days <= 1) return format(start, "MMM d");
  const end = addDays(start, r.days - 1);
  return `${format(start, "MMM d")}–${format(end, "d")}`;
}

function MiniCalendar({ events }: { events: { date: Date; className: string }[] }) {
  return (
    <div>
      <p className="mb-3 text-center text-sm font-medium text-foreground">
        {format(CALENDAR_MONTH, "MMMM yyyy")}
      </p>
      <div className="grid grid-cols-7 gap-y-1.5 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((label, i) => (
          <span key={i} className="text-[11px] font-medium text-muted-foreground">
            {label}
          </span>
        ))}
        {CALENDAR_DAYS.map((day) => {
          const dayEvents = events.filter((e) => isSameDay(e.date, day));
          const inMonth = isSameMonth(day, CALENDAR_MONTH);
          const isToday = isSameDay(day, TODAY);
          return (
            <div
              key={day.toISOString()}
              className={`flex flex-col items-center gap-0.5 rounded-md py-1 text-xs ${
                !inMonth ? "text-muted-foreground/30" : "text-foreground"
              } ${isToday ? "bg-primary/10 font-semibold text-primary" : ""}`}
            >
              <span>{format(day, "d")}</span>
              <div className="flex h-1.5 gap-0.5">
                {dayEvents.map((e, i) => (
                  <span key={i} className={`size-1.5 rounded-full ${e.className}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-primary" />
          Scheduled
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-info" />
          Office hours
        </span>
      </div>
    </div>
  );
}

export default function AcademyPage() {
  const { role } = useRole();
  const { courses: registeredCourses } = useRegisteredCourses();
  const isSales = role === "sales-partner";
  const isEmployee = role === "employee";

  // RoleProvider resolves the persisted role from localStorage only after the
  // first render (it starts from a hardcoded default), so anything seeded
  // from `isSales` at useState-init time would freeze on that first, often
  // wrong, value. Defaulting to null and falling back to a value computed
  // fresh on every render keeps these in sync once the real role settles.
  const [selectedTabIdOverride, setSelectedTabIdOverride] = React.useState<string | null>(null);
  const selectedTabId = selectedTabIdOverride ?? (isSales ? "sprint" : DEFAULT_TECHNICAL_PATH_ID);

  const [reserveSession, setReserveSession] = React.useState<(typeof SHADOW_SESSIONS)[number] | null>(
    null
  );
  const [reserveDate, setReserveDate] = React.useState("");
  const [reserveTime, setReserveTime] = React.useState("");

  const seedReservation = isSales
    ? { title: "3-Day Workshop", host: "Souhail Meftah", date: "2026-07-29", time: "09:00", days: 3 }
    : { title: "Shadow a Data Pipeline Review", host: "Elena Cho", date: "2026-07-31", time: "13:00" };
  const [addedReservations, setAddedReservations] = React.useState<(typeof seedReservation)[]>([]);
  const reservations = [seedReservation, ...addedReservations];

  const sprint = isSales ? SALES_SPRINT : TECHNICAL_SPRINT;
  const currentPhase = sprint.find((p) => p.status === "current") ?? sprint[0];
  const courses = isEmployee
    ? [...COURSES.technical, ...COURSES.sales]
    : isSales
      ? COURSES.sales
      : COURSES.technical;

  // Only courses that belong to this role's catalog — registering a course
  // while viewing one track shouldn't leak a tab into the other track's view.
  const registeredForRole = registeredCourses.filter((rc) => courses.some((c) => c.id === rc.id));
  const registeredTabs = registeredForRole.map((c) => ({ id: `course-${c.id}`, label: c.title }));
  const allPaths = isEmployee ? [...TECHNICAL_PATHS, SALES_PATH] : TECHNICAL_PATHS;
  const baseTabs = isSales
    ? [{ id: "sprint", label: currentPhase.label }]
    : allPaths.map((p) => ({ id: p.id, label: p.label }));
  const tabs = [...baseTabs, ...registeredTabs];

  const selectedRegisteredCourse = registeredForRole.find(
    (c) => `course-${c.id}` === selectedTabId
  );
  const activePath = allPaths.find((p) => p.id === selectedTabId) ?? allPaths[0];
  const isSalesPathSelected = activePath.id === SALES_PATH.id;

  const calendarEvents = [
    ...reservations
      .flatMap((r) => {
        const start = parseYMD(r.date);
        return Array.from({ length: r.days ?? 1 }, (_, i) => addDays(start, i));
      })
      .filter((d) => isSameMonth(d, CALENDAR_MONTH))
      .map((d) => ({ date: d, className: "bg-primary" })),
    ...OFFICE_HOUR_DAYS.map((day) => ({ date: day, className: "bg-info" })),
  ];

  function handleConfirmReserve() {
    if (!reserveSession || !reserveDate || !reserveTime) return;
    setAddedReservations((prev) => [
      ...prev,
      { title: reserveSession.title, host: reserveSession.host, date: reserveDate, time: reserveTime },
    ]);
    toast.success(
      `Successfully reserved your spot for "${reserveSession.title}". A confirmation email has been sent.`
    );
    setReserveSession(null);
    setReserveDate("");
    setReserveTime("");
  }

  return (
    <div className="space-y-6">
      <PageBanner
        eyebrow="Learning Hub"
        title={isSales ? "Sales Enablement Track" : "Technical Enablement Track"}
        description={
          isSales
            ? "The 90-day sprint from foundation to revenue — enabling you to sell, scope, and create repeatable solutions independently."
            : "The 90-day sprint from ideation to launch — building toward Vantiq Certified Partner status."
        }
      >
        <BookmarkButton
          item={{ id: "/academy", label: "Certification Roadmap", href: "/academy", iconKey: "GraduationCap" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <Card className="shadow-card p-6">
        <h2 className="mb-5 text-sm font-medium text-foreground">90-Day Sprint</h2>
        <RoadmapStepper steps={sprint} />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="shadow-card p-6 lg:col-span-2">
          {(!isSales || registeredTabs.length > 0) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {tabs.map((t) => (
                <Button
                  key={t.id}
                  type="button"
                  size="sm"
                  variant={t.id === selectedTabId ? "default" : "outline"}
                  onClick={() => setSelectedTabIdOverride(t.id)}
                >
                  {t.label}
                </Button>
              ))}
            </div>
          )}
          <h2 className="mb-4 text-sm font-medium text-foreground">
            {selectedRegisteredCourse
              ? selectedRegisteredCourse.title
              : isSales
                ? `${currentPhase.label} — ${currentPhase.timeframe}`
                : isSalesPathSelected
                  ? SALES_PATH.label
                  : `${activePath.label} Path — ${currentPhase.label}`}
          </h2>
          <div className="space-y-3">
            {selectedRegisteredCourse ? (
              <div className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <PlayCircle className="size-4 text-primary" />
                    {selectedRegisteredCourse.title}
                  </span>
                  <Badge variant="secondary" className="bg-info/10 text-info">
                    Just registered
                  </Badge>
                </div>
                <Progress value={0} className="mt-3 h-1.5" />
              </div>
            ) : isSales ? (
              currentPhase.tasks.map((task) => (
                  <div
                    key={task}
                    className="flex items-center gap-2 rounded-md border border-border p-3 text-sm text-foreground"
                  >
                    <Circle className="size-4 shrink-0 text-muted-foreground" />
                    {task}
                  </div>
                ))
              ) : (
                activePath.modules.map((mod) => (
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
                ))
              )}
          </div>

          {!isSales && (
            <>
              <Separator className="my-6" />

              <h3 className="text-sm font-medium text-foreground">Schedule Shadowing</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                The next step after Coaching &amp; Shadow — pair with a Vantiq expert on a live
                engagement.
              </p>
              <div className="mt-4 space-y-2">
                {SHADOW_SESSIONS.map((session) => {
                  const isReserved = reservations.some((r) => r.title === session.title);
                  return (
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
                        variant={isReserved ? "secondary" : "outline"}
                        disabled={isReserved}
                        onClick={() => setReserveSession(session)}
                      >
                        {isReserved ? "Reserved" : "Reserve"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Card>

        <div className="space-y-6">
          <Card className="shadow-card p-6">
            <h2 className="mb-4 text-sm font-medium text-foreground">Your Schedule</h2>
            <MiniCalendar events={calendarEvents} />

            <Separator className="my-4" />

            <h3 className="mb-2 text-sm font-medium text-foreground">Reserved</h3>
            {reservations.length === 0 ? (
              <p className="text-xs text-muted-foreground">No sessions reserved yet.</p>
            ) : (
              <div className="space-y-2">
                {reservations
                  .slice()
                  .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
                  .map((r, i) => (
                    <div key={i} className="rounded-md border border-border p-2.5">
                      <p className="text-xs font-medium text-foreground">
                        {formatReservationRange(r)} &middot; {formatTime(r.time)}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {r.title} with {r.host}
                      </p>
                    </div>
                  ))}
              </div>
            )}
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

      <Card id="courses" className="shadow-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground">
            {isEmployee ? "All Courses" : isSales ? "Sales Courses" : "Technical Courses"}
          </h2>
          <Link href="/academy/courses" className="text-xs text-emphasis hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className="flex flex-col rounded-md border border-border p-4 transition-colors hover:border-primary"
            >
              <Badge variant="secondary" className="w-fit">
                {course.level}
              </Badge>
              <p className="mt-3 text-sm font-medium text-foreground">{course.title}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                {course.duration}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Dialog
        open={!!reserveSession}
        onOpenChange={(open) => {
          if (!open) {
            setReserveSession(null);
            setReserveDate("");
            setReserveTime("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reserve: {reserveSession?.title}</DialogTitle>
            <DialogDescription>
              Pick a date and time that works for you. {reserveSession?.host} will confirm by
              email.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="reserve-date">Date</Label>
              <Input
                id="reserve-date"
                type="date"
                value={reserveDate}
                onChange={(e) => setReserveDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reserve-time">Time</Label>
              <Input
                id="reserve-time"
                type="time"
                value={reserveTime}
                onChange={(e) => setReserveTime(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReserveSession(null)}>
              Cancel
            </Button>
            <Button disabled={!reserveDate || !reserveTime} onClick={handleConfirmReserve}>
              Confirm Reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
