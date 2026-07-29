"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  GraduationCap,
  Code2,
  Handshake,
  MessagesSquare,
  Library,
} from "lucide-react";

interface SearchEntry {
  label: string;
  group: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SEARCH_INDEX: SearchEntry[] = [
  { label: "Dashboard", group: "Navigate", href: "/", icon: LayoutDashboard },
  { label: "Certification Roadmap", group: "Learning Hub", href: "/academy", icon: GraduationCap },
  { label: "Architecture Overview", group: "Developer Hub", href: "/developer-center/architecture", icon: Code2 },
  { label: "Deal Registration", group: "Sales Hub", href: "/sales-center/deal-registration", icon: Handshake },
  { label: "Q&A Forum", group: "Community", href: "/forum/qa", icon: MessagesSquare },
  { label: "Resource Library", group: "Resources", href: "/resources", icon: Library },
];

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const groups = Array.from(new Set(SEARCH_INDEX.map((e) => e.group)));

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search the community portal..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map((group, i) => (
          <React.Fragment key={group}>
            {i > 0 && <CommandSeparator />}
            <CommandGroup heading={group}>
              {SEARCH_INDEX.filter((e) => e.group === group).map((entry) => (
                <CommandItem
                  key={entry.href}
                  onSelect={() => {
                    onOpenChange(false);
                    router.push(entry.href);
                  }}
                >
                  <entry.icon className="size-4" />
                  {entry.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
