"use client";

import * as React from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRole } from "@/components/shell/role-provider";

const SETTINGS_STORAGE_KEY = "community-portal-settings";

interface PortalSettings {
  emailDigest: boolean;
  eventReminders: boolean;
  qaReplies: boolean;
  productAnnouncements: boolean;
  visibleInDirectory: boolean;
  timezone: string;
}

const DEFAULTS: PortalSettings = {
  emailDigest: true,
  eventReminders: true,
  qaReplies: true,
  productAnnouncements: false,
  visibleInDirectory: true,
  timezone: "America/Los_Angeles",
};

const TIMEZONES = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Singapore",
  "Asia/Tokyo",
];

const NOTIFICATION_ROWS: {
  key: keyof Pick<
    PortalSettings,
    "emailDigest" | "eventReminders" | "qaReplies" | "productAnnouncements"
  >;
  label: string;
  description: string;
}[] = [
  {
    key: "emailDigest",
    label: "Weekly digest",
    description: "A Monday summary of new content, events, and community activity.",
  },
  {
    key: "eventReminders",
    label: "Event reminders",
    description: "A reminder the day before any event you've registered for.",
  },
  {
    key: "qaReplies",
    label: "Q&A replies",
    description: "When someone answers or comments on a question you posted.",
  },
  {
    key: "productAnnouncements",
    label: "Product announcements",
    description: "Release notes and platform changes that affect what you build.",
  },
];

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-sm font-medium text-emphasis">{title}</h2>
      {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      <Card className="mt-4 border border-border p-6 shadow-none">{children}</Card>
    </section>
  );
}

export default function SettingsPage() {
  const { info } = useRole();
  const [settings, setSettings] = React.useState<PortalSettings>(DEFAULTS);
  const [loaded, setLoaded] = React.useState(false);

  // Same persistence approach as the portal's other client-side state
  // (saved items, registered courses): there is no backend in this prototype.
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) setSettings({ ...DEFAULTS, ...JSON.parse(stored) });
    } catch {
      // ignore malformed storage
    }
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings, loaded]);

  function set<K extends keyof PortalSettings>(key: K, value: PortalSettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  // Four peer settings groups run at the tight end of the dense range; only
  // the hero break above them is opened to 48px.
  return (
    <div className="space-y-8">
      <PageHero
        className="mb-12"
        title="Settings"
        description="Preferences apply to this browser only. This is a prototype with no account backend."
      />

      <SettingsSection title="Profile" description="How your name appears across the portal.">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="settings-name">Full name</Label>
            <Input id="settings-name" defaultValue={info.user.name} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="settings-title">Job title</Label>
            <Input id="settings-title" defaultValue={info.user.title} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="settings-email">Email</Label>
            <Input
              id="settings-email"
              type="email"
              defaultValue={info.user.email}
              readOnly
              aria-describedby="settings-email-hint"
              className="bg-muted text-muted-foreground"
            />
            <p id="settings-email-hint" className="text-xs text-muted-foreground">
              Your email determines your access level and can&apos;t be changed here.
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="settings-timezone">Time zone</Label>
            <Select value={settings.timezone} onValueChange={(v) => set("timezone", v)}>
              <SelectTrigger id="settings-timezone" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Event times are shown in this zone.</p>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Button onClick={() => toast.success("Profile updated.")}>Save changes</Button>
          <span className="text-xs text-muted-foreground">
            Notification and visibility changes below save automatically.
          </span>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Notifications"
        description="Choose what the portal emails you about."
      >
        <div className="divide-y divide-border">
          {NOTIFICATION_ROWS.map((row) => (
            <div key={row.key} className="flex items-start justify-between gap-6 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <Label htmlFor={`setting-${row.key}`} className="text-sm font-medium text-foreground">
                  {row.label}
                </Label>
                <p className="mt-0.5 text-xs text-muted-foreground">{row.description}</p>
              </div>
              <Switch
                id={`setting-${row.key}`}
                checked={settings[row.key]}
                onCheckedChange={(v) => set(row.key, v)}
                className="mt-0.5 shrink-0"
              />
            </div>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection title="Visibility" description="How other partners can find you.">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <Label
              htmlFor="setting-directory"
              className="text-sm font-medium text-foreground"
            >
              Show me in the partner directory
            </Label>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Other partners can see your name, title, and organization. Your email is never shown.
            </p>
          </div>
          <Switch
            id="setting-directory"
            checked={settings.visibleInDirectory}
            onCheckedChange={(v) => set("visibleInDirectory", v)}
            className="mt-0.5 shrink-0"
          />
        </div>
      </SettingsSection>

      <SettingsSection title="Reset" description="Clear everything this browser has stored.">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-md text-xs text-muted-foreground">
            Removes your saved items, course and event registrations, onboarding progress, and the
            preferences above. This can&apos;t be undone.
          </p>
          <Button
            variant="outline"
            className="border-destructive/40 text-destructive hover:bg-destructive/5"
            onClick={() => {
              window.localStorage.clear();
              setSettings(DEFAULTS);
              toast.success("Local portal data cleared.", {
                description: "Reload the page to see the portal in its initial state.",
              });
            }}
          >
            Clear local data
          </Button>
        </div>
      </SettingsSection>
    </div>
  );
}
