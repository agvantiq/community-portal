"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { PageBanner } from "@/components/page-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Mail,
  Wrench,
  Compass,
  TrendingUp,
  Bug,
  Shield,
  ShieldAlert,
  MoreHorizontal,
  Cloud,
  Server,
  Router,
} from "lucide-react";
import { toast } from "sonner";
import { BookmarkButton } from "@/components/bookmark-button";
import {
  ChoiceCard,
  DEPLOYMENTS,
  ISSUE_REASONS,
  SECURITY,
  SupportAttachments,
  SupportIssueSections,
  SupportSecuritySections,
  type DeploymentId,
} from "@/components/support-issue-fields";
import { useRole } from "@/components/shell/role-provider";
import SUPPORT_FORM from "@/lib/support-form.json";

// One office card, matching the live site: headquarters address and the
// general inbox (no phone line, no London office).
const HEADQUARTERS = {
  name: "Vantiq Headquarter",
  addressLine1: "1990 N California Blvd, Suite 640",
  addressLine2: "Walnut Creek, CA 94596",
  email: "info@vantiq.com",
};

// Reasons and their mailboxes live in lib/support-form.json (shared with the
// WordPress handover form). Technical Support, Bug Report and Security Issue
// go to support@vantiq.com; everything else goes to Partner Enablement.
const SUPPORT_EMAIL = "support@vantiq.com";
const ENABLEMENT_EMAIL = "enablement@vantiq.com";

const REASON_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  wrench: Wrench,
  compass: Compass,
  "trending-up": TrendingUp,
  bug: Bug,
  shield: Shield,
  "shield-alert": ShieldAlert,
  ellipsis: MoreHorizontal,
};
const DEPLOYMENT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  cloud: Cloud,
  server: Server,
  router: Router,
};
type Reason = { value: string; label: string; icon: string; email: string; roles?: string[] };
const REASONS = (SUPPORT_FORM.reasons as Reason[]).map((r) => ({
  ...r,
  icon: REASON_ICONS[r.icon] ?? MoreHorizontal,
}));

export default function SupportPage() {
  const { role } = useRole();
  // Security Issue is for Vantiq staff only (employee, admin). On WordPress
  // that's decided server-side; here the role switcher stands in for it.
  const reasons = REASONS.filter((r) => !r.roles || r.roles.includes(role));
  const [reason, setReason] = React.useState("technical");
  const [deployment, setDeployment] = React.useState<DeploymentId | null>(null);
  // Bumped after a send so the attachments list and issue fields remount empty.
  const [formKey, setFormKey] = React.useState(0);
  const isIssue = ISSUE_REASONS.includes(reason);
  const isSecurity = reason === SECURITY.reason;

  // Switching to a role that can't see the current reason falls back to the
  // default rather than leaving a hidden choice selected.
  React.useEffect(() => {
    if (!reasons.some((r) => r.value === reason)) setReason("technical");
  }, [reasons, reason]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const destination = REASONS.find((r) => r.value === reason)?.email ?? SUPPORT_EMAIL;
    e.currentTarget.reset();
    setReason("technical");
    setDeployment(null);
    setFormKey((k) => k + 1);
    toast.success(`Your message has been sent to ${destination}.`, {
      description: "Our team will respond within one business day.",
    });
  }

  return (
    <div className="space-y-6">
      <PageBanner
        eyebrow="Get in Touch"
        title="Contact Support"
        description="Whether you need technical help, have a partnership question, or need direct access to your account team, we're ready to help."
      >
        <BookmarkButton
          item={{ id: "/support", label: "Contact Support", href: "/support", iconKey: "LifeBuoy" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageBanner>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="flex flex-col gap-6 lg:col-span-3">
          <Card className="shadow-card p-6">
            <h2 className="mb-5 text-sm font-semibold text-foreground">Send us a Message</h2>
            {/* multipart/form-data: the form carries file uploads. */}
            <form key={formKey} onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
              <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="support-first_name">
                    <span>
                      First name <span className="text-destructive" aria-hidden>*</span>
                    </span>
                  </Label>
                  <Input id="support-first_name" name="first_name" autoComplete="given-name" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="support-last_name">
                    <span>
                      Last name <span className="text-destructive" aria-hidden>*</span>
                    </span>
                  </Label>
                  <Input id="support-last_name" name="last_name" autoComplete="family-name" required />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="support-email">
                    <span>
                      Email <span className="text-destructive" aria-hidden>*</span>
                    </span>
                  </Label>
                  <Input
                    id="support-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <fieldset className="min-w-0 space-y-2">
                <legend className="mb-2 text-sm font-medium text-foreground">Reason for inquiry</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {reasons.map((r) => (
                    <ChoiceCard
                      key={r.value}
                      name="reason"
                      value={r.value}
                      checked={reason === r.value}
                      onChange={() => setReason(r.value)}
                      icon={r.icon}
                      title={r.label}
                    />
                  ))}
                </div>
              </fieldset>

              {isIssue && (
                <>
                  {/* Deployment picker: decides which of the fields below
                      apply. Required, with no default, so nobody files an
                      Edge issue on the Public Cloud form by accident. */}
                  <fieldset className="min-w-0 space-y-2">
                    <legend className="mb-2 text-sm font-medium text-foreground">
                      Deployment <span className="text-destructive" aria-hidden>*</span>
                    </legend>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {DEPLOYMENTS.map((d) => (
                        <ChoiceCard
                          key={d.id}
                          name="deployment"
                          value={d.id}
                          checked={deployment === d.id}
                          onChange={() => setDeployment(d.id)}
                          icon={DEPLOYMENT_ICONS[d.icon] ?? Cloud}
                          title={d.label}
                          hint={d.hint}
                          required
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{SUPPORT_FORM.deploymentHelp}</p>
                  </fieldset>

                  {deployment === null && (
                    <p className="rounded-lg border border-dashed border-border px-4 py-5 text-center text-sm text-muted-foreground">
                      Choose a deployment to see the questions for it.
                    </p>
                  )}
                  <SupportIssueSections deployment={deployment} />
                </>
              )}

              {isSecurity && (
                <>
                  <p className="rounded-lg bg-muted px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                    {SECURITY.intro}
                  </p>
                  <SupportSecuritySections />
                </>
              )}

              {!isIssue && !isSecurity && (
                <div className="space-y-1.5">
                  <Label htmlFor="support-message">
                    <span>
                      Message <span className="text-destructive" aria-hidden>*</span>
                    </span>
                  </Label>
                  <Textarea id="support-message" name="message" placeholder="Type a message" rows={5} required />
                </div>
              )}

              {(!isIssue || deployment !== null) && (
                <SupportAttachments
                  deployment={deployment}
                  showChecklist={isIssue}
                  secretsWarning={isSecurity ? SECURITY.secretsWarning : undefined}
                />
              )}

              <Button type="submit" className="w-full sm:w-fit">
                Send Message
              </Button>
            </form>
          </Card>

        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="shadow-card p-6">
            <h2 className="mb-1 text-sm font-medium text-foreground">Direct Escalation</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Need urgent assistance with an active enterprise deal? Reach the Partner Enablement
              team directly.
            </p>
            <div className="flex items-center gap-3 rounded-md border border-border bg-muted/40 p-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-vivid">
                <Mail className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">Partner Enablement</p>
                <a
                  href={`mailto:${ENABLEMENT_EMAIL}`}
                  className="flex items-center gap-1 text-xs font-medium text-primary-vivid hover:underline"
                >
                  <Mail className="size-3" />
                  {ENABLEMENT_EMAIL}
                </a>
              </div>
            </div>
          </Card>

          <Card className="shadow-card p-6">
            <div className="flex gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary-vivid" aria-hidden />
              <address className="min-w-0 not-italic">
                <p className="text-base font-medium text-foreground">{HEADQUARTERS.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{HEADQUARTERS.addressLine1}</p>
                <p className="text-sm text-muted-foreground">{HEADQUARTERS.addressLine2}</p>
                <a
                  href={`mailto:${HEADQUARTERS.email}`}
                  className="mt-2 inline-block text-sm font-medium text-primary-vivid hover:underline"
                >
                  {HEADQUARTERS.email}
                </a>
              </address>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
