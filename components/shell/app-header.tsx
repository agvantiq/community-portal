"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { NotificationPanel } from "@/components/shell/notification-panel";
import { RoleSwitcher } from "@/components/shell/role-switcher";
import { CommandPalette } from "@/components/shell/command-palette";

export function AppHeader() {
  const [paletteOpen, setPaletteOpen] = React.useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card px-6">
      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        className="flex w-full max-w-sm items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-ring"
      >
        <Search className="size-4" />
        <span className="flex-1 text-left">Search the community portal...</span>
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px]">
          &#8984;K
        </kbd>
      </button>
      <div className="ml-auto flex items-center gap-1">
        <NotificationPanel />
        <RoleSwitcher />
      </div>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </header>
  );
}
