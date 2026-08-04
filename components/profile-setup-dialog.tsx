"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRole } from "@/components/shell/role-provider";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const ROLE_OPTIONS = [
  {
    value: "build",
    label: "I build & implement",
    description: "Solution development, technical delivery, architecture.",
  },
  {
    value: "sell",
    label: "I sell & position",
    description: "Opportunity development, customer conversations, positioning.",
  },
  {
    value: "lead",
    label: "I lead the practice",
    description: "Strategy, resourcing, partnership performance.",
  },
];

const INDUSTRY_OPTIONS = ["Manufacturing", "Energy", "Healthcare", "Public Sector", "Retail", "Transportation"];

const REGION_OPTIONS = ["AMER", "LATAM", "APAC", "Europe", "Middle East", "Japan"];

const STEP_LABELS = ["Role", "Organization", "Region"];

export function ProfileSetupDialog({
  open,
  onOpenChange,
  onComplete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (role: string | null, industry: string) => void;
}) {
  const { info } = useRole();
  const [step, setStep] = React.useState(0);
  const [role, setRole] = React.useState<string | null>(null);
  const [organization, setOrganization] = React.useState("");
  const [industry, setIndustry] = React.useState("");
  const [region, setRegion] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setStep(0);
    setRole(null);
    setRegion(null);
    // Prepopulated from what the user gave us at sign-in.
    setOrganization(info.user.org ?? "");
    setIndustry("");
  }, [open, info.user.org]);

  function selectRole(value: string) {
    setRole(value);
    setStep(1);
  }

  function selectRegion(value: string) {
    setRegion(value);
    onComplete(role, industry);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">Complete your profile</DialogTitle>

        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              aria-label="Back"
              className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
            </button>
          ) : (
            <span className="size-4 shrink-0" />
          )}
          <Breadcrumb>
            <BreadcrumbList>
              {STEP_LABELS.map((label, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {i === step ? (
                      <BreadcrumbPage className="font-medium text-primary">{label}</BreadcrumbPage>
                    ) : i < step ? (
                      <BreadcrumbLink asChild>
                        <button type="button" onClick={() => setStep(i)}>
                          {label}
                        </button>
                      </BreadcrumbLink>
                    ) : (
                      <span className="text-muted-foreground/50">{label}</span>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="p-6">
          {step === 0 && (
            <>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Full name</p>
                <p className="text-sm font-medium text-foreground">{info.user.name}</p>
              </div>

              <h2 className="mt-5 text-lg font-semibold text-foreground">What best describes your role?</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                This tailors your dashboard, learning path, and recommended resources — you can preview any
                of these anytime with the role switcher in the header.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                {ROLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectRole(opt.value)}
                    className={cn(
                      "flex flex-col items-start gap-0.5 rounded-lg border p-4 text-left transition-colors hover:border-primary",
                      role === opt.value ? "border-primary ring-1 ring-primary" : "border-border"
                    )}
                  >
                    <span className="text-sm font-semibold text-foreground">{opt.label}</span>
                    <span className="text-xs text-muted-foreground">{opt.description}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold text-foreground">Tell us about your organization</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Helps us surface relevant industry content and regional programs.
              </p>
              <div className="mt-5 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="profile-org">Organization</Label>
                  <Input
                    id="profile-org"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="profile-industry">Primary industry focus</Label>
                  <Select
                    value={industry}
                    onValueChange={(value) => {
                      setIndustry(value);
                      setStep(2);
                    }}
                  >
                    <SelectTrigger id="profile-industry" className="w-full">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRY_OPTIONS.map((i) => (
                        <SelectItem key={i} value={i}>
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold text-foreground">Where are you based?</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Helps us route you to the right regional programs and events.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                {REGION_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => selectRegion(opt)}
                    className={cn(
                      "rounded-lg border p-4 text-left text-sm font-semibold text-foreground transition-colors hover:border-primary",
                      region === opt ? "border-primary ring-1 ring-primary" : "border-border"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
