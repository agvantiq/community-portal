"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRole } from "@/components/shell/role-provider";
import type { Role } from "@/lib/roles";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
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
  ChevronDown,
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
  { label: "Registered Deals", href: "/#registered-deals" },
  { label: "Deal Teaming", href: "/#deal-teaming" },
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
      { label: "Roadmap", href: "/academy" },
      { label: "Courses", href: "/academy#courses" },
    ],
  },
  {
    id: "developer",
    label: "Developer Hub",
    icon: Code2,
    landingHref: "/developer-center",
    roles: ["technical-partner", "first-time-partner", "employee", "admin", "exec"],
    children: [
      {
        label: "Technical Documents",
        children: [
          { label: "Getting Started", href: "/developer-center/documentation" },
          { label: "Platform Architecture", href: "/developer-center/architecture" },
          { label: "VAIL Reference Guide", href: "/developer-center/vail-reference" },
          { label: "Extension Sources", href: "/developer-center/extension-sources" },
          { label: "Deployment & Operations", href: "/developer-center/deployment-operations" },
          { label: "Security & Authentication", href: "/developer-center/security-authentication" },
        ],
      },
      { label: "API References", href: "/developer-center/api-references" },
      { label: "Code Recipes / Reusable Templates", href: "/developer-center/code-recipes" },
      { label: "Claude Prompt Gallery", href: "/developer-center/prompt-gallery" },
      { label: "Flagship Demo", href: "/developer-center/flagship-demo", roles: ["technical-partner"] },
    ],
  },
  {
    id: "sales",
    label: "Sales Hub",
    icon: Handshake,
    landingHref: "/sales-center",
    roles: ["sales-partner", "first-time-partner", "employee", "admin", "exec"],
    children: [
      { label: "Deal Pipeline", href: "/sales-center/pipeline" },
      { label: "Deal Registration", href: "/sales-center/deal-registration" },
      { label: "Vantiq Spark", href: "/sales-center/vantiq-spark" },
      { label: "Vantiq Flagship Demos", href: "/sales-center/flagship-demos" },
      { label: "Deal Teaming Hub", href: "/sales-center/teaming-hub" },
      { label: "Marketing Collateral", href: "/sales-center/marketing-collateral" },
      { label: "Customer Pitch Collateral", href: "/sales-center/customer-pitch" },
      { label: "Project Sizing & Pricing", href: "/sales-center/project-sizing" },
    ],
  },
  {
    id: "community",
    label: "Community Dashboard",
    icon: MessagesSquare,
    landingHref: "/forum",
    children: [
      { label: "Q&A Forum", href: "/forum/qa" },
      { label: "Community Showcase", href: "/forum/showcase" },
      { label: "Events", href: "/forum/events" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    icon: Library,
    landingHref: "/resources",
    children: [
      { label: "Library", href: "/resources" },
      { label: "Documentation", href: "/resources#documentation" },
      { label: "Release Notes", href: "/resources#release-notes" },
    ],
  },
];

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

  const navGroups = NAV_GROUPS.filter((group) => !group.roles || group.roles.includes(role)).map(
    (group) => ({
      ...group,
      children: group.children.filter((entry) => !entry.roles || entry.roles.includes(role)),
    })
  );

  const [expandedGroups, setExpandedGroups] = React.useState<string[]>(() =>
    role === "admin" || role === "exec" ? [] : NAV_GROUPS.map((g) => g.id)
  );

  // Reset to each role's default whenever the previewed role changes.
  React.useEffect(() => {
    setExpandedGroups(role === "admin" || role === "exec" ? [] : NAV_GROUPS.map((g) => g.id));
  }, [role]);

  // Whichever hub owns the current page stays expanded, even after a manual collapse.
  React.useEffect(() => {
    const activeGroup = NAV_GROUPS.find((g) => g.landingHref === pathname);
    if (!activeGroup) return;
    setExpandedGroups((prev) => (prev.includes(activeGroup.id) ? prev : [...prev, activeGroup.id]));
  }, [pathname]);

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
              <p className="px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
                Analytics
              </p>
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
                      <div key={entry.label} className="mt-1 first:mt-0">
                        <p className="px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
                          {entry.label}
                        </p>
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
