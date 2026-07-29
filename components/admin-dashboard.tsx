"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Activity, Briefcase, Download, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  ACTIVITY_LOG,
  COMMUNITY_CONTRIBUTION_BY_USER,
  FREQUENTLY_VISITED_PAGES,
  HELP_REQUESTS_BY_TOPIC,
  LEARNING_ENABLEMENT,
  PARTNER_OUTREACH,
  PLATFORM_ANALYTICS,
  type ActivityKind,
} from "@/lib/sample-data";

const activityIcon: Record<ActivityKind, React.ElementType> = {
  "Deal Registered": Briefcase,
  "Content Added": FileText,
};

const activityTone: Record<ActivityKind, string> = {
  "Deal Registered": "bg-primary/10 text-primary",
  "Content Added": "bg-info/10 text-info",
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function ActivityRow({
  entry,
}: {
  entry: (typeof ACTIVITY_LOG)[number];
}) {
  const Icon = activityIcon[entry.kind];
  return (
    <div className="flex items-start gap-3 rounded-md border border-border p-3">
      <div className={`flex size-8 shrink-0 items-center justify-center rounded-md ${activityTone[entry.kind]}`}>
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{entry.title}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{entry.detail}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-xs whitespace-nowrap text-muted-foreground">{formatDate(entry.date)}</span>
        <Badge
          variant="secondary"
          className={entry.source === "Vantiq" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"}
        >
          {entry.actor}
        </Badge>
      </div>
    </div>
  );
}

export function AdminDashboard({ firstName }: { firstName: string }) {
  const contentAdded = ACTIVITY_LOG.filter((a) => a.kind === "Content Added");

  function handleDownloadReport() {
    toast.success("Analytics report is being prepared — you'll get an email when it's ready.");
  }

  return (
    <div className="space-y-6">
      <PageHero
        title={`Welcome back, ${firstName}`}
        description="Track ecosystem health and manage the partner community."
      />

      <div id="platform-analytics" className="flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-emphasis">Platform Analytics</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Full user activity across the partner ecosystem, updated daily.
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={handleDownloadReport}>
            <Download className="size-4" />
            Download Report
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card className="shadow-card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Monthly Active Users
            </p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {PLATFORM_ANALYTICS.monthlyActiveUsers.toLocaleString()}
            </p>
          </Card>
          <Card className="shadow-card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Weekly Active Users
            </p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {PLATFORM_ANALYTICS.weeklyActiveUsers.toLocaleString()}
            </p>
          </Card>
          <Card className="shadow-card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Daily Active Users
            </p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {PLATFORM_ANALYTICS.dailyActiveUsers.toLocaleString()}
            </p>
          </Card>
          <Card className="shadow-card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Search Success Rate
            </p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {PLATFORM_ANALYTICS.searchSuccessRate}%
            </p>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div id="frequently-visited-pages" className="flex flex-col">
          <div className="mb-4">
            <h2 className="text-sm font-medium text-emphasis">Frequently Visited Pages</h2>
          </div>
          <Card className="shadow-card flex-1 overflow-hidden p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Visits (30d)</TableHead>
                  <TableHead>Avg. Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FREQUENTLY_VISITED_PAGES.map((row) => (
                  <TableRow key={row.page}>
                    <TableCell className="font-medium text-foreground">{row.page}</TableCell>
                    <TableCell className="text-muted-foreground">{row.visits30d.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">{row.avgTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <div id="learning-enablement" className="flex flex-col">
          <div className="mb-4">
            <h2 className="text-sm font-medium text-emphasis">Learning & Enablement</h2>
          </div>
          <Card className="shadow-card flex-1 justify-center gap-3 p-5">
            {LEARNING_ENABLEMENT.map((row, i) => (
              <div key={row.label}>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-semibold text-foreground">{row.value}</span>
                </div>
                {i < LEARNING_ENABLEMENT.length - 1 && <div className="border-t border-border" />}
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div id="partner-outreach" className="flex flex-col">
          <div className="mb-4">
            <h2 className="text-sm font-medium text-emphasis">Partner Outreach — This Week</h2>
          </div>
          <Card className="shadow-card flex-1 overflow-hidden p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner Org</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Contacts (7d)</TableHead>
                  <TableHead>Primary Topic</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PARTNER_OUTREACH.map((row) => (
                  <TableRow key={row.org}>
                    <TableCell className="font-medium text-foreground">{row.org}</TableCell>
                    <TableCell className="text-muted-foreground">{row.lastContact}</TableCell>
                    <TableCell className="text-muted-foreground">{row.contacts7d}</TableCell>
                    <TableCell className="text-muted-foreground">{row.primaryTopic}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <div id="help-requests" className="flex flex-col">
          <div className="mb-4">
            <h2 className="text-sm font-medium text-emphasis">Help Requests by Topic</h2>
          </div>
          <Card className="shadow-card flex-1 justify-center gap-3 p-5">
            {HELP_REQUESTS_BY_TOPIC.map((row, i) => (
              <div key={row.topic}>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-muted-foreground">{row.topic}</span>
                  <span className="text-sm font-semibold text-foreground">{row.count}</span>
                </div>
                {i < HELP_REQUESTS_BY_TOPIC.length - 1 && <div className="border-t border-border" />}
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div id="recently-added-content" className="flex flex-col">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="flex items-center gap-2 text-sm font-medium text-emphasis">
            <FileText className="size-4 text-primary" />
            Recently Added Content
          </h2>
          <Badge variant="secondary">{contentAdded.length}</Badge>
        </div>
        <Card className="shadow-card space-y-2 p-5">
          {contentAdded.map((entry) => (
            <ActivityRow key={entry.id} entry={entry} />
          ))}
        </Card>
      </div>

      <div id="activity-log" className="flex flex-col">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="flex items-center gap-2 text-sm font-medium text-emphasis">
            <Activity className="size-4 text-primary" />
            Portal Activity Log
          </h2>
          <p className="text-xs text-muted-foreground">
            Every deal and piece of content entering the portal, newest first.
          </p>
        </div>
        <Card className="shadow-card space-y-2 p-5">
          {ACTIVITY_LOG.map((entry) => (
            <ActivityRow key={entry.id} entry={entry} />
          ))}
        </Card>
      </div>

      <div id="community-contribution" className="flex flex-col">
        <div className="mb-4">
          <h2 className="text-sm font-medium text-emphasis">Community Contribution by User</h2>
        </div>
        <Card className="shadow-card overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Org</TableHead>
                <TableHead>Discussions Created</TableHead>
                <TableHead>Event RSVPs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMMUNITY_CONTRIBUTION_BY_USER.map((row) => (
                <TableRow key={row.user}>
                  <TableCell className="font-medium text-foreground">{row.user}</TableCell>
                  <TableCell className="text-muted-foreground">{row.org}</TableCell>
                  <TableCell className="text-muted-foreground">{row.discussionsCreated}</TableCell>
                  <TableCell className="text-muted-foreground">{row.eventRsvps}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
