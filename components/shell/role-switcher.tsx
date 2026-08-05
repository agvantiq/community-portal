"use client";

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
import { CHECKLIST_STORAGE_KEY } from "@/lib/first-time-checklist";
import { ChevronDown } from "lucide-react";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function RoleSwitcher() {
  const { role, info, setRole } = useRole();
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
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md py-1.5 pl-1.5 pr-2 text-left transition-colors hover:bg-muted"
        >
          <Avatar className="size-8">
            <AvatarFallback className="bg-linear-to-br from-emphasis/20 via-accent to-secondary text-xs font-medium text-foreground">
              {initials(info.user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="truncate text-sm font-medium text-foreground">{info.user.name}</span>
            <span className="truncate text-xs text-muted-foreground">{info.user.org ?? "No company org"}</span>
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
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
