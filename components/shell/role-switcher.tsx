"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ROLE_LIST } from "@/lib/roles";
import { useRole } from "@/components/shell/role-provider";
import { useRegisteredCourses } from "@/lib/registered-courses";
import { CHECKLIST_STORAGE_KEY } from "@/lib/first-time-checklist";
import { TECHNICAL_PATHS, DEFAULT_TECHNICAL_PATH_ID, getCourseById } from "@/lib/sample-data";
import { ChevronDown, Settings } from "lucide-react";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// The dashboard's tracked path (see app/page.tsx, tracking-path-card.tsx) is
// driven entirely by real course registration, not a static "progress" field —
// so previewing Partner vs Vantiq Employee at different points along it means
// seeding that registration state deterministically on every switch, rather
// than leaving it to whatever was last registered in this browser.
const AI_DEVELOPER_PATH = TECHNICAL_PATHS.find((p) => p.id === DEFAULT_TECHNICAL_PATH_ID)!;
const AI_DEVELOPER_COURSES = AI_DEVELOPER_PATH.modules
  .map((m) => getCourseById(m.courseId))
  .filter((c): c is NonNullable<typeof c> => !!c);
const AI_DEVELOPER_COURSE_IDS = AI_DEVELOPER_COURSES.map((c) => c.id);
const AI_DEVELOPER_CELEBRATED_KEY = `community-portal-celebrated-${AI_DEVELOPER_PATH.id}`;

export function RoleSwitcher() {
  const { role, info, setRole } = useRole();
  const { setPathProgress } = useRegisteredCourses();
  const router = useRouter();

  function handleSelectRole(next: typeof role) {
    setRole(next);
    if (next === "onboarding") router.push("/");
    if (next === "first-time-partner") {
      // Restart the demo from a blank checklist every time it's (re-)selected,
      // rather than reopening wherever a previous run-through left off. A
      // hard navigation (not router.push) is required here: if the dashboard
      // is already mounted, its checklist state lives in memory and a route
      // push alone wouldn't re-read the now-cleared storage.
      window.localStorage.removeItem(CHECKLIST_STORAGE_KEY);
      window.location.href = "/community-portal/";
      return;
    }
    if (next === "technical-partner") {
      // Partner previews mid-path: half the AI Developer courses done, so the
      // dashboard shows a live "Resume" state instead of a finished one.
      setPathProgress(AI_DEVELOPER_COURSES, AI_DEVELOPER_COURSE_IDS.slice(0, 3));
    }
    if (next === "employee") {
      setPathProgress(AI_DEVELOPER_COURSES, AI_DEVELOPER_COURSE_IDS);
      // Clear the one-time celebration flag so the finish confetti fires again
      // every time Employee is (re-)selected — a repeatable demo beat, not a
      // once-ever real-user celebration.
      window.localStorage.removeItem(AI_DEVELOPER_CELEBRATED_KEY);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className="flex items-center gap-0.5 rounded-md pl-1.5 pr-1 text-left transition-colors hover:bg-muted"
        >
          <span className="flex items-center gap-2 py-1.5">
            <Avatar className="size-8">
              <AvatarFallback className="bg-linear-to-br from-emphasis/20 via-accent to-secondary text-xs font-medium text-foreground">
                {initials(info.user.name)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden min-w-0 flex-col sm:flex">
              <span className="truncate text-sm font-medium text-foreground">{info.user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {info.user.org ?? (role === "onboarding" ? "" : "No company org")}
              </span>
            </span>
          </span>
          <span className="flex items-center self-stretch rounded-md px-1.5 text-muted-foreground">
            <ChevronDown className="size-3.5" />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <Settings />
            Profile and Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Preview as role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ROLE_LIST.map((r) => (
          <DropdownMenuItem
            key={r.id}
            onClick={() => handleSelectRole(r.id)}
            className="flex flex-col items-start gap-0.5"
            data-active={r.id === role}
          >
            <span className="text-sm font-medium">
              {r.label}
              {r.id === role && <span className="ml-2 text-xs text-primary">Current</span>}
            </span>
            <span className="text-xs text-muted-foreground">{r.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
