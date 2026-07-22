"use client";

import Link from "next/link";
import { useRole } from "@/components/shell/role-provider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEALS } from "@/lib/sample-data";
import {
  GraduationCap,
  Code2,
  Handshake,
  MessagesSquare,
  Library,
  LifeBuoy,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";

const QUICK_ACCESS = {
  builder: [
    { label: "Continue Certification", href: "/academy", icon: GraduationCap },
    { label: "Architecture Docs", href: "/developer-center", icon: Code2 },
    { label: "Q&A Forum", href: "/forum", icon: MessagesSquare },
    { label: "Resource Library", href: "/resources", icon: Library },
  ],
  sales: [
    { label: "Deal Pipeline", href: "/sales-center", icon: Handshake },
    { label: "Q&A Forum", href: "/forum", icon: MessagesSquare },
    { label: "Resource Library", href: "/resources", icon: Library },
    { label: "Certification Roadmap", href: "/academy", icon: GraduationCap },
  ],
  customer: [
    { label: "Resource Library", href: "/resources", icon: Library },
    { label: "Q&A Forum", href: "/forum", icon: MessagesSquare },
    { label: "Contact Support", href: "/resources", icon: LifeBuoy },
  ],
};

const stageTone: Record<string, string> = {
  Discovery: "bg-info/10 text-info",
  "Technical Validation": "bg-info/10 text-info",
  Proposal: "bg-warning/10 text-warning",
  Negotiation: "bg-warning/10 text-warning",
  "Closed Won": "bg-success/10 text-success",
};

export default function DashboardPage() {
  const { role, info } = useRole();
  const firstName = info.user.name.split(" ")[0];

  if (role === "guest") {
    return (
      <div className="space-y-6">
        <Card className="shadow-card border-none bg-primary p-8 text-primary-foreground">
          <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
            Welcome
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Explore the Vantiq Community</h1>
          <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
            Create an account to track certifications, post in the Q&A forum, and unlock partner
            sales tools.
          </p>
          <Button variant="secondary" className="mt-5">
            Create your account
          </Button>
        </Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link href="/forum">
            <Card className="shadow-card h-full p-5 transition-colors hover:border-primary">
              <MessagesSquare className="size-5 text-primary" />
              <p className="mt-3 text-sm font-medium">Browse the Q&A forum</p>
              <p className="mt-1 text-xs text-muted-foreground">
                See how the community solves real integration problems.
              </p>
            </Card>
          </Link>
          <Link href="/resources">
            <Card className="shadow-card h-full p-5 transition-colors hover:border-primary">
              <Library className="size-5 text-primary" />
              <p className="mt-3 text-sm font-medium">Browse resources</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Whitepapers, case studies, and product documentation.
              </p>
            </Card>
          </Link>
        </div>
      </div>
    );
  }

  const quickAccess =
    role === "customer" ? QUICK_ACCESS.customer : role === "partner" || role === "employee" ? QUICK_ACCESS.builder : QUICK_ACCESS.sales;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">
          Welcome back,
        </p>
        <h1 className="text-2xl font-semibold text-foreground">{firstName}</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {quickAccess.map((item) => (
          <Link key={item.label} href={item.href}>
            <Card className="shadow-card h-full p-4 transition-colors hover:border-primary">
              <item.icon className="size-5 text-primary" />
              <p className="mt-3 text-sm font-medium leading-snug">{item.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {role !== "customer" && (
            <Card className="shadow-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-medium text-foreground">Deal Pipeline</h2>
                <Link href="/sales-center" className="text-xs text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-2">
                {DEALS.slice(0, 4).map((deal) => (
                  <div
                    key={deal.id}
                    className="flex items-center justify-between rounded-md border border-border px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{deal.client}</p>
                      <p className="truncate text-xs text-muted-foreground">{deal.useCase}</p>
                    </div>
                    <Badge variant="secondary" className={stageTone[deal.stage]}>
                      {deal.stage}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="shadow-card p-5">
            <h2 className="mb-4 text-sm font-medium text-foreground">Recommended for you</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-border p-3">
                <Badge variant="secondary" className="bg-info/10 text-info">Course</Badge>
                <p className="mt-2 text-sm font-medium">Orchestrating GenAI at the Edge</p>
              </div>
              <div className="rounded-md border border-border p-3">
                <Badge variant="secondary" className="bg-warning/10 text-warning">Forum</Badge>
                <p className="mt-2 text-sm font-medium">Best pattern for Kafka fan-out</p>
              </div>
              <div className="rounded-md border border-border p-3">
                <Badge variant="secondary" className="bg-success/10 text-success">Doc</Badge>
                <p className="mt-2 text-sm font-medium">State Management at the Edge</p>
              </div>
            </div>
          </Card>

          {role === "exec" && (
            <Card className="shadow-card p-5">
              <h2 className="mb-4 text-sm font-medium text-foreground">Organization Activity</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Seats used</p>
                  <p className="text-lg font-semibold">5 / 10</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Certified users</p>
                  <p className="text-lg font-semibold">3 / 5</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Org readiness</p>
                  <p className="text-lg font-semibold text-success">80%</p>
                </div>
              </div>
            </Card>
          )}

          {role === "admin" && (
            <Card className="shadow-card p-5">
              <div className="mb-4 flex items-center gap-2">
                <h2 className="text-sm font-medium text-foreground">Platform Analytics</h2>
                <Badge variant="secondary" className="text-[10px]">Admin only</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly active users</p>
                  <p className="text-lg font-semibold">3,842</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Path completion</p>
                  <p className="text-lg font-semibold">68%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Self-service resolution</p>
                  <p className="text-lg font-semibold">74%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Deal registrations</p>
                  <p className="text-lg font-semibold">126</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="shadow-card p-5">
            <h2 className="mb-4 text-sm font-medium text-foreground">My Progress</h2>
            <div className="flex items-center gap-4">
              <div
                className="flex size-16 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(var(--primary) 60%, var(--muted) 0)`,
                }}
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-card text-sm font-semibold">
                  60%
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Professional Developer</p>
                <p className="text-xs text-muted-foreground">2 of 4 modules complete</p>
              </div>
            </div>
          </Card>

          <Card className="shadow-card p-5">
            <h2 className="mb-4 text-sm font-medium text-foreground">Announcements</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                Complete your profile
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                Start a learning path
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Circle className="mt-0.5 size-4 shrink-0" />
                Introduce yourself in the forum
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Circle className="mt-0.5 size-4 shrink-0" />
                Request sandbox access
              </li>
            </ul>
            <Button variant="ghost" size="sm" className="mt-3 gap-1 px-0 text-primary hover:bg-transparent">
              View all <ArrowRight className="size-3.5" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
