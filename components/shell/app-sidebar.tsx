"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRole } from "@/components/shell/role-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  GraduationCap,
  Code2,
  Handshake,
  MessagesSquare,
  Library,
  LifeBuoy,
  Mail,
} from "lucide-react";

interface NavChild {
  label: string;
  href?: string;
}

interface NavGroup {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: NavChild[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: "learning",
    label: "Learning Hub",
    icon: GraduationCap,
    children: [
      { label: "Certification Roadmap", href: "/academy" },
      { label: "Technical Courses" },
      { label: "Sales Courses" },
      { label: "Schedule Shadowing" },
      { label: "Office Hour Registration" },
    ],
  },
  {
    id: "developer",
    label: "Developer Hub",
    icon: Code2,
    children: [
      { label: "Architecture", href: "/developer-center" },
      { label: "Technical Documentation" },
      { label: "Extension Sources" },
      { label: "API References" },
      { label: "Code Recipes" },
      { label: "Claude Prompt Gallery" },
    ],
  },
  {
    id: "sales",
    label: "Sales Hub",
    icon: Handshake,
    children: [
      { label: "Deal Pipeline", href: "/sales-center" },
      { label: "Deal Teaming Hub", href: "/sales-center#teaming-hub" },
      { label: "Deal Registration", href: "/sales-center#deal-registration" },
      { label: "Marketing Collateral" },
    ],
  },
  {
    id: "community",
    label: "Community Dashboard",
    icon: MessagesSquare,
    children: [
      { label: "Q&A Forum", href: "/forum" },
      { label: "Community Showcase" },
      { label: "Events" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    icon: Library,
    children: [
      { label: "Library", href: "/resources" },
      { label: "Documentation" },
      { label: "Release Notes" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { info, role } = useRole();
  const navGroups = NAV_GROUPS.filter((group) => {
    if (role === "guest" && ["learning", "sales", "developer"].includes(group.id)) return false;
    if (role === "sales-partner" && group.id === "developer") return false;
    if (role === "technical-partner" && group.id === "sales") return false;
    return true;
  }).map((group) => {
    if (group.id !== "learning") return group;
    return {
      ...group,
      children: group.children.filter((child) => {
        if (role === "sales-partner" && child.label === "Technical Courses") return false;
        if (role === "technical-partner" && child.label === "Sales Courses") return false;
        return true;
      }),
    };
  });

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-border bg-sidebar">
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <Link
          href="/"
          className={cn(
            "mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
            pathname === "/"
              ? "bg-primary text-primary-foreground font-medium"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          <LayoutDashboard className="size-[18px] shrink-0" />
          Dashboard
        </Link>

        <Accordion
          key={role}
          type="multiple"
          defaultValue={navGroups.map((group) => group.id)}
          className="space-y-0.5"
        >
          {navGroups.map((group) => (
            <AccordionItem key={group.id} value={group.id} className="border-none">
              <AccordionTrigger className="rounded-md px-3 py-2.5 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline [&>svg]:size-4">
                <span className="flex items-center gap-3">
                  <group.icon className="size-[18px] shrink-0" />
                  {group.label}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pl-[30px]">
                <div className="flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
                  {group.children.map((child) =>
                    child.href ? (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={cn(
                          "rounded-md px-2 py-1.5 text-sm transition-colors",
                          pathname === child.href.split("#")[0]
                            ? "font-medium text-primary"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        {child.label}
                      </Link>
                    ) : (
                      <div
                        key={child.label}
                        className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/40"
                      >
                        {child.label}
                        <Badge variant="secondary" className="text-[10px] font-normal">
                          Soon
                        </Badge>
                      </div>
                    )
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </nav>

      <div className="space-y-2 border-t border-border p-3">
        <div className="rounded-md bg-sidebar-accent px-3 py-2.5">
          <p className="text-[11px] uppercase tracking-wider text-sidebar-foreground/50">
            My Organization
          </p>
          <p className="mt-0.5 text-sm font-medium text-sidebar-foreground">
            {info.user.org ?? "Not signed in"}
          </p>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/60">
            <LifeBuoy className="size-4" />
            Contact Support
          </span>
          <span className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/60">
            <Mail className="size-4" />
            Custom Request
          </span>
        </div>
      </div>
    </aside>
  );
}
