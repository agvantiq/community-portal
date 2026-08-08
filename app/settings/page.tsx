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
  qaReplies: boolean;
  productAnnouncements: boolean;
  timezone: string;
}

const DEFAULTS: PortalSettings = {
  qaReplies: true,
  productAnnouncements: false,
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
  key: keyof Pick<PortalSettings, "qaReplies" | "productAnnouncements">;
  label: string;
  description: string;
}[] = [
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
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

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

  function handleUpdatePassword() {
    if (!newPassword || newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password updated.");
  }

  return (
    <div className="space-y-8">
      <PageHero className="mb-12" title="Settings" />

      <SettingsSection title="Profile">
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
              <SelectTrigger id="settings-timezone">
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
        <div className="mt-6">
          <Button onClick={() => toast.success("Profile updated.")}>Save changes</Button>
        </div>
      </SettingsSection>

      <SettingsSection title="Password">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="settings-new-password">New password</Label>
            <Input
              id="settings-new-password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="settings-confirm-password">Confirm password</Label>
            <Input
              id="settings-confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Must be at least 8 characters.</p>
        <div className="mt-6">
          <Button onClick={handleUpdatePassword}>Update password</Button>
        </div>
      </SettingsSection>

      <SettingsSection title="Notifications">
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

      <SettingsSection title="Reset">
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
