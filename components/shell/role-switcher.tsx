"use client";

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
            <span className="truncate text-xs text-muted-foreground">{info.label}</span>
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
            onClick={() => setRole(r.id)}
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
