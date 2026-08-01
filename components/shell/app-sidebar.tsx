"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRole } from "@/components/shell/role-provider";
import type { Role } from "@/lib/roles";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  GraduationCap,
  Code2,
  Handshake,
  CalendarDays,
  LifeBuoy,
  Mail,
  Building2,
  ChevronDown,
} from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  roles?: Role[];
}

interface NavSubGroup {
  /** Stable key for expand/collapse state — must be unique across the whole sidebar. */
  id: string;
  label: string;
  /** If present, the label itself is a link to its own page (e.g. Demos). */
  href?: string;
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
  /** The group's own landing page — clicking the header navigates here. */
  landingHref: string;
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

// Dashboard > Analytics > section anchors. Admin-only, always expanded (no
// accordion toggle) — clicking a link scrolls the dashboard body to that
// section instead of navigating to a new page.
const ADMIN_ANALYTICS_LINKS: NavLink[] = [
  { label: "Overview", href: "/#platform-analytics" },
  { label: "Frequently Visited Pages", href: "/#frequently-visited-pages" },
  { label: "Learning & Enablement", href: "/#learning-enablement" },
  { label: "Partner Outreach", href: "/#partner-outreach" },
  { label: "Help Requests", href: "/#help-requests" },
  { label: "Content Requests", href: "/#content-requests" },
  { label: "Recently Added Content", href: "/#recently-added-content" },
  { label: "Activity Log", href: "/#activity-log" },
  { label: "Community Contribution", href: "/#community-contribution" },
];

const NAV_GROUPS: NavGroup[] = [
  {
    id: "learning",
    label: "Learning Hub",
    icon: GraduationCap,
    landingHref: "/academy",
    roles: ALL_PARTNER_ROLES,
    children: [
      { label: "Paths", href: "/academy/paths" },
      { label: "Courses", href: "/academy/courses" },
    ],
  },
  {
    id: "developer",
    label: "Developer Hub",
    icon: Code2,
    landingHref: "/developer-center",
    roles: ALL_PARTNER_ROLES,
    children: [
      { label: "Resources", href: "/developer-center/resources" },
      { label: "Knowledge Base", href: "/developer-center/knowledge-base" },
      // Phase 2: API References, Code Recipes / Reusable Templates, the
      // Claude Prompt Gallery, and Solutions Showcasing are built but
      // intentionally unlinked for now.
      { label: "Q&A Forum", href: "/forum/qa" },
    ],
  },
  {
    id: "sales",
    label: "Sales Hub",
    icon: Handshake,
    landingHref: "/sales-center",
    roles: ALL_PARTNER_ROLES,
    children: [
      {
        id: "demos",
        label: "Demos",
        children: [
          { label: "Interactive Demos", href: "/sales-center/flagship-demos" },
          { label: "Demo Videos", href: "/sales-center/marketing-demos" },
        ],
      },
      { label: "Vantiq Spark", href: "/sales-center/vantiq-spark" },
      { label: "Marketing Collateral", href: "/sales-center/marketing-collateral" },
      { label: "Deal Registration", href: "/sales-center/deal-registration" },
      // Phase 2: Customer Pitch Collateral and Project Sizing & Pricing are
      // built but intentionally unlinked for now.
    ],
  },
  {
    id: "events",
    label: "Events",
    icon: CalendarDays,
    landingHref: "/forum/events",
    children: [
      { label: "Registered Events", href: "/forum/events#registered-events" },
      { label: "Upcoming Events", href: "/forum/events#upcoming-events" },
      { label: "Past Events", href: "/forum/events#past-events" },
    ],
  },
];

const ALL_SUBGROUP_IDS = NAV_GROUPS.flatMap((g) => g.children.filter(isSubGroup).map((e) => e.id));

// Reactive current URL hash (without the leading '#'). Re-reads on client-side
// navigation (pathname dep) and on in-page anchor changes (hashchange event).
function useHash(pathname: string) {
  const [hash, setHash] = React.useState("");
  React.useEffect(() => {
    const read = () => setHash(window.location.hash.replace(/^#/, ""));
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [pathname]);
  return hash;
}

function NavLinkItem({
  entry,
  pathname,
  currentHash,
}: {
  entry: NavLink;
  pathname: string;
  currentHash: string;
}) {
  const [path, hash] = entry.href.split("#");
  // Only the exact page (or the exact in-page section) the user is on is bold —
  // never every sibling that happens to share a base path.
  const isActive = pathname === path && (hash ? currentHash === hash : currentHash === "");
  return (
    <Link
      href={entry.href}
      className={cn(
        "rounded-md px-2 py-1.5 text-sm transition-colors",
        isActive
          ? "font-medium text-primary"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      {entry.label}
    </Link>
  );
}

// Section labels ("Analytics", "Demos", "My Organization", "Need Help?")
// share one definition so they stay pixel-identical wherever they appear.
// "muted" matches the same size/weight/color as the regular (inactive)
// sidebar links around it — no eyebrow treatment, no uppercase.
function SidebarSectionLabel({
  tone = "muted",
  className,
  children,
}: {
  tone?: "muted" | "emphasis";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        tone === "muted"
          ? "text-sm text-sidebar-foreground/70"
          : "text-[11px] leading-[1.5] font-medium uppercase tracking-wider text-emphasis",
        className
      )}
    >
      {children}
    </p>
  );
}

// Same-page hash links (Dashboard > Analytics > section). Every entry shares
// the "/" pathname, so NavLinkItem's active-state check can't distinguish
// between them — render plain, hover-only styling instead.
function AnalyticsAnchorLink({ entry }: { entry: NavLink }) {
  return (
    <Link
      href={entry.href}
      className="rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    >
      {entry.label}
    </Link>
  );
}

function NavGroupHeader({
  group,
  isActive,
  isOpen,
  onNavigate,
  onToggle,
}: {
  group: NavGroup;
  isActive: boolean;
  isOpen: boolean;
  onNavigate: () => void;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center rounded-md transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Link
        href={group.landingHref}
        onClick={onNavigate}
        className={cn("flex flex-1 items-center gap-3 px-3 py-2.5 text-sm", isActive && "font-medium")}
      >
        <group.icon className="size-[18px] shrink-0" />
        {group.label}
      </Link>
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? `Collapse ${group.label}` : `Expand ${group.label}`}
        className="rounded-md p-2.5"
      >
        <ChevronDown className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
    </div>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const currentHash = useHash(pathname);
  const { info, role } = useRole();

  function handleSubscribeNewsletter() {
    toast.success("You're subscribed to the Portal Newsletter", {
      description: `Enrolled with ${info.user.email} — no further action needed.`,
    });
  }

  const navGroups = NAV_GROUPS.filter((group) => !group.roles || group.roles.includes(role)).map(
    (group) => ({
      ...group,
      children: group.children.filter((entry) => !entry.roles || entry.roles.includes(role)),
    })
  );

  const [expandedGroups, setExpandedGroups] = React.useState<string[]>(() => NAV_GROUPS.map((g) => g.id));

  // Reset to fully expanded whenever the previewed role changes.
  React.useEffect(() => {
    setExpandedGroups(NAV_GROUPS.map((g) => g.id));
  }, [role]);

  // Whichever hub owns the current page stays expanded, even after a manual collapse.
  React.useEffect(() => {
    const activeGroup = NAV_GROUPS.find((g) => g.landingHref === pathname);
    if (!activeGroup) return;
    setExpandedGroups((prev) => (prev.includes(activeGroup.id) ? prev : [...prev, activeGroup.id]));
  }, [pathname]);

  // Sub-groups default to expanded, same as the top-level hubs — the nested
  // indentation and smaller chevron are what carry the hierarchy, not a
  // collapsed-by-default state. Manual collapse is still respected, but
  // whichever sub-group owns the current page is forced back open.
  const [expandedSubgroups, setExpandedSubgroups] = React.useState<string[]>(ALL_SUBGROUP_IDS);

  // Reset to fully expanded whenever the previewed role changes.
  React.useEffect(() => {
    setExpandedSubgroups(ALL_SUBGROUP_IDS);
  }, [role]);

  React.useEffect(() => {
    setExpandedSubgroups((prev) => {
      let next = prev;
      for (const group of NAV_GROUPS) {
        for (const entry of group.children) {
          if (!isSubGroup(entry)) continue;
          const hrefs = [entry.href, ...entry.children.map((c) => c.href)].filter(Boolean) as string[];
          const isActive = hrefs.some((href) => href.split("#")[0] === pathname);
          if (isActive && !next.includes(entry.id)) {
            next = [...next, entry.id];
          }
        }
      }
      return next;
    });
  }, [pathname]);

  function toggleSubgroup(id: string) {
    setExpandedSubgroups((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
  }

  function expandSubgroup(id: string) {
    setExpandedSubgroups((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function toggleGroup(id: string) {
    setExpandedGroups((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
  }

  function expandGroup(id: string) {
    setExpandedGroups((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

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

        {role === "admin" && (
          <div className="mb-1 pl-[30px]">
            <div className="flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
              <SidebarSectionLabel className="px-2 py-1.5">Analytics</SidebarSectionLabel>
              <div className="flex flex-col gap-0.5 pl-2">
                {ADMIN_ANALYTICS_LINKS.map((link) => (
                  <AnalyticsAnchorLink key={link.label} entry={link} />
                ))}
              </div>
            </div>
          </div>
        )}

        <Accordion type="multiple" value={expandedGroups} className="space-y-0.5">
          {navGroups.map((group) => (
            <AccordionItem key={group.id} value={group.id} className="border-none">
              <NavGroupHeader
                group={group}
                isActive={pathname === group.landingHref}
                isOpen={expandedGroups.includes(group.id)}
                onNavigate={() => expandGroup(group.id)}
                onToggle={() => toggleGroup(group.id)}
              />
              <AccordionContent className="pb-0 pl-[30px]">
                <div className="flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
                  {group.children.map((entry) =>
                    isSubGroup(entry) ? (
                      <div key={entry.id} className="mt-1 first:mt-0">
                        <div className="flex items-center rounded-md">
                          {entry.href ? (
                            <Link
                              href={entry.href}
                              onClick={() => expandSubgroup(entry.id)}
                              className={cn(
                                "flex-1 truncate rounded-md px-2 py-1.5 text-sm transition-colors",
                                pathname === entry.href
                                  ? "font-medium text-primary"
                                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                              )}
                            >
                              {entry.label}
                            </Link>
                          ) : (
                            <SidebarSectionLabel className="flex-1 truncate px-2 py-1.5">
                              {entry.label}
                            </SidebarSectionLabel>
                          )}
                          <button
                            type="button"
                            onClick={() => toggleSubgroup(entry.id)}
                            aria-label={
                              expandedSubgroups.includes(entry.id)
                                ? `Collapse ${entry.label}`
                                : `Expand ${entry.label}`
                            }
                            className="shrink-0 rounded-md p-1.5 text-sidebar-foreground/40 hover:text-sidebar-foreground/70"
                          >
                            <ChevronDown
                              className={cn(
                                "size-3 transition-transform duration-200",
                                expandedSubgroups.includes(entry.id) && "rotate-180"
                              )}
                            />
                          </button>
                        </div>
                        {expandedSubgroups.includes(entry.id) && (
                          <div className="flex flex-col gap-0.5 pl-2">
                            {entry.children.map((child) => (
                              <NavLinkItem
                                key={child.label}
                                entry={child}
                                pathname={pathname}
                                currentHash={currentHash}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <NavLinkItem
                        key={entry.label}
                        entry={entry}
                        pathname={pathname}
                        currentHash={currentHash}
                      />
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
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-linear-to-br from-emphasis/20 via-accent to-secondary text-foreground">
            <Building2 className="size-4" />
          </span>
          <div className="min-w-0">
            <SidebarSectionLabel tone="emphasis">My Organization</SidebarSectionLabel>
            <p className="mt-0.5 truncate text-sm font-medium text-sidebar-foreground">
              {info.user.org ?? "No company org"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <SidebarSectionLabel tone="emphasis" className="px-2">
            Need Help?
          </SidebarSectionLabel>
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
        </div>
        <Button
          size="sm"
          onClick={handleSubscribeNewsletter}
          className="h-auto w-full whitespace-normal py-2 text-center leading-snug"
        >
          <Mail className="size-4 shrink-0" />
          Subscribe to Portal Newsletter
        </Button>
      </div>
    </aside>
  );
}
