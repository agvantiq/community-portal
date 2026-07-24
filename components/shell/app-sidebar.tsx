"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRole } from "@/components/shell/role-provider";
import type { Role } from "@/lib/roles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LayoutDashboard,
  GraduationCap,
  Code2,
  Handshake,
  MessagesSquare,
  Library,
  LifeBuoy,
  Mail,
  Building2,
} from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  roles?: Role[];
}

interface NavSubGroup {
  label: string;
  roles?: Role[];
  children: NavLink[];
}

type NavEntry = NavLink | NavSubGroup;

function isSubGroup(entry: NavEntry): entry is NavSubGroup {
  return "children" in entry;
}

interface NavGroup {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Roles that can see this group. Omit to show to every role (including guest). */
  roles?: Role[];
  children: NavEntry[];
}

const ALL_PARTNER_ROLES: Role[] = [
  "technical-partner",
  "sales-partner",
  "first-time-partner",
  "employee",
  "admin",
  "exec",
];

const NAV_GROUPS: NavGroup[] = [
  {
    id: "learning",
    label: "Learning Hub",
    icon: GraduationCap,
    roles: ALL_PARTNER_ROLES,
    children: [
      { label: "Roadmap", href: "/academy" },
      { label: "Courses", href: "/academy#courses" },
    ],
  },
  {
    id: "developer",
    label: "Developer Hub",
    icon: Code2,
    roles: ["technical-partner", "first-time-partner", "employee", "admin", "exec"],
    children: [
      {
        label: "Technical Documents",
        children: [
          { label: "Getting Started", href: "/developer-center#documentation" },
          { label: "Platform Architecture", href: "/developer-center#architecture" },
          { label: "VAIL Reference Guide", href: "/developer-center#vail-reference" },
          { label: "Extension Sources", href: "/developer-center#extension-sources" },
          { label: "Deployment & Operations", href: "/developer-center#deployment-operations" },
          { label: "Security & Authentication", href: "/developer-center#security-authentication" },
        ],
      },
      { label: "API References", href: "/developer-center#api-references" },
      { label: "Code Recipes / Reusable Templates", href: "/developer-center#code-recipes" },
      { label: "Claude Prompt Gallery", href: "/developer-center#prompt-gallery" },
      { label: "Flagship Demo", href: "/developer-center#flagship-demo", roles: ["technical-partner"] },
    ],
  },
  {
    id: "sales",
    label: "Sales Hub",
    icon: Handshake,
    roles: ["sales-partner", "first-time-partner", "employee", "admin", "exec"],
    children: [
      { label: "Deal Pipeline", href: "/sales-center" },
      { label: "Vantiq Spark", href: "/sales-center#vantiq-spark" },
      { label: "Vantiq Flagship Demos", href: "/sales-center#flagship-demos" },
      { label: "Deal Teaming Hub", href: "/sales-center#teaming-hub" },
      { label: "Deal Registration", href: "/sales-center#deal-registration" },
      { label: "Marketing Collateral", href: "/sales-center#marketing-collateral" },
    ],
  },
  {
    id: "community",
    label: "Community Dashboard",
    icon: MessagesSquare,
    children: [
      { label: "Q&A Forum", href: "/forum" },
      { label: "Community Showcase", href: "/forum#showcase" },
      { label: "Events", href: "/forum#events" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    icon: Library,
    children: [
      { label: "Library", href: "/resources" },
      { label: "Documentation", href: "/resources#documentation" },
      { label: "Release Notes", href: "/resources#release-notes" },
    ],
  },
];

function NavLinkItem({ entry, pathname }: { entry: NavLink; pathname: string }) {
  return (
    <Link
      href={entry.href}
      className={cn(
        "rounded-md px-2 py-1.5 text-sm transition-colors",
        pathname === entry.href.split("#")[0]
          ? "font-medium text-primary"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      {entry.label}
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { info, role } = useRole();

  const navGroups = NAV_GROUPS.filter((group) => !group.roles || group.roles.includes(role)).map(
    (group) => ({
      ...group,
      children: group.children.filter((entry) => !entry.roles || entry.roles.includes(role)),
    })
  );

  const defaultExpanded = role === "admin" || role === "exec" ? [] : navGroups.map((g) => g.id);

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-border bg-sidebar">
      <nav data-tour="nav" className="flex-1 overflow-y-auto px-3 py-3">
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
          defaultValue={defaultExpanded}
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
                  {group.children.map((entry) =>
                    isSubGroup(entry) ? (
                      <div key={entry.label} className="mt-1 first:mt-0">
                        <p className="px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
                          {entry.label}
                        </p>
                        <div className="flex flex-col gap-0.5 pl-2">
                          {entry.children.map((child) => (
                            <NavLinkItem key={child.label} entry={child} pathname={pathname} />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <NavLinkItem key={entry.label} entry={entry} pathname={pathname} />
                    )
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </nav>

      <div className="space-y-2 border-t border-border p-3">
        <div className="flex items-center gap-2.5 rounded-md bg-sidebar-accent px-3 py-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-emphasis/10 text-emphasis">
            <Building2 className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider text-emphasis">
              My Organization
            </p>
            <p className="mt-0.5 truncate text-sm font-medium text-sidebar-foreground">
              {info.user.org ?? "Not signed in"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="px-2 text-[11px] uppercase tracking-wider text-emphasis">Need Help?</p>
          <Link
            href="/support"
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              pathname === "/support"
                ? "font-medium text-primary"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <LifeBuoy className="size-4 text-emphasis" />
            Contact Support
          </Link>
          <Link
            href="/custom-request"
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              pathname === "/custom-request"
                ? "font-medium text-primary"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <Mail className="size-4 text-emphasis" />
            Custom Request
          </Link>
        </div>
      </div>
    </aside>
  );
}
