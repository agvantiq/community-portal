"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRole } from "@/components/shell/role-provider";
import { toast } from "sonner";
import { CheckCircle2, GraduationCap, Code2, Handshake } from "lucide-react";

const EXPLORE_INCLUDES = ["Search knowledge articles", "Browse public resources"];

const GUEST_INCLUDES = [
  "Everything in Browse",
  "Access to Intro courses",
  "Additional portal experiences",
  "Limited community participation",
];

const PARTNER_INCLUDES = [
  "Exclusive partner resources",
  "Advanced training and certifications",
  "Personalized recommendations",
  "Access to partner-only programs",
  "Community engagement opportunities",
];

// What's actually inside the portal for this first phase — the three real
// top-level hubs from the sidebar nav. This row gives the hero's left column
// enough mass to balance the sign-in card, so the title isn't hanging alone
// in open gradient space.
const HERO_PILLARS = [
  { icon: GraduationCap, label: "Learning Hub", detail: "Paths & courses catalog" },
  { icon: Code2, label: "Developer Hub", detail: "Q&A forum, docs & resources" },
  { icon: Handshake, label: "Sales Hub", detail: "Demos & deal registration" },
];

function IncludesList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-sm text-foreground">
          <CheckCircle2 className="size-4 shrink-0 text-success" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function OnboardingLanding() {
  const router = useRouter();
  const { setRole } = useRole();

  function handleSignIn() {
    toast.success("Signed in", {
      description: "Welcome! Taking you to your onboarding checklist.",
    });
    setRole("first-time-partner");
  }

  function handleSignInSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSignIn();
  }

  function handleRegisterNow() {
    router.push("/register");
  }

  function handleContinueAsGuest() {
    toast.success("Browsing as a guest", {
      description: "You can register anytime to unlock full partner access.",
    });
    setRole("guest");
  }

  function handleLostPassword() {
    toast.message("Password reset isn't available in this preview.");
  }

  return (
    <div>
      <div
        className="relative -mt-8 overflow-hidden border-b border-border pt-16 pb-16 md:-mt-10 md:pt-20"
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          background: "linear-gradient(to bottom, var(--secondary) 0%, white 100%)",
        }}
      >
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="flex max-w-xl flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Welcome to Vantiq Partner Community
            </h1>
            <p className="text-sm text-muted-foreground">
              Access training, resources, best practices, and partner-exclusive content to grow your
              business.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3">
              {HERO_PILLARS.map(({ icon: Icon, label, detail }) => (
                <div key={label} className="flex flex-col gap-2">
                  <Icon className="size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="shadow-card w-full max-w-sm justify-self-center gap-0 p-5 lg:justify-self-end">
            <h2 className="text-base font-semibold text-foreground">Returning partner? Sign in</h2>
            <form onSubmit={handleSignInSubmit} className="mt-2.5 space-y-2.5">
              <div className="space-y-1.5">
                <Label htmlFor="onboarding-email">Email</Label>
                <Input id="onboarding-email" type="email" placeholder="you@partner.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="onboarding-password">Password</Label>
                <Input id="onboarding-password" type="password" placeholder="••••••••" />
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                <Checkbox defaultChecked />
                Remember Me
              </label>
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>
            <Button
              type="button"
              variant="link"
              onClick={handleLostPassword}
              className="mt-1.5 h-auto w-full justify-center p-0 text-xs font-normal leading-none text-muted-foreground hover:text-primary"
            >
              Lost your password?
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={handleRegisterNow}
              className="mt-4 h-auto w-full justify-center p-0 text-sm font-medium"
            >
              New here? Create an account →
            </Button>
          </Card>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="mb-6 text-lg font-semibold text-emphasis">Choose how you&apos;ll explore</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="shadow-card flex flex-col p-6">
            <p className="text-sm font-semibold text-foreground">Browse</p>
            <p className="mt-1.5 text-sm text-muted-foreground">No account needed.</p>
            <div className="flex-1">
              <IncludesList items={EXPLORE_INCLUDES} />
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <Button
                type="button"
                variant="link"
                onClick={() => router.push("/resources/knowledge-base")}
                className="h-auto justify-center p-0 text-sm font-medium"
              >
                Search the knowledge base →
              </Button>
              <Button variant="secondary" className="w-full" onClick={() => router.push("/resources")}>
                Explore resources
              </Button>
            </div>
          </Card>

          <Card className="shadow-card flex flex-col p-6">
            <p className="text-sm font-semibold text-foreground">Guest</p>
            <p className="mt-1.5 text-sm text-muted-foreground">A free account, a little more access.</p>
            <div className="flex-1">
              <IncludesList items={GUEST_INCLUDES} />
            </div>
            <div className="mt-4">
              <Button variant="secondary" className="w-full" onClick={handleContinueAsGuest}>
                Continue as a guest
              </Button>
            </div>
          </Card>

          <Card className="relative flex flex-col p-6 shadow-card ring-2 ring-primary">
            <span className="absolute -top-2.5 right-4 rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
              Full access
            </span>
            <p className="text-sm font-semibold text-foreground">Registered Partner</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              The complete Partner Enablement Community.
            </p>
            <div className="flex-1">
              <IncludesList items={PARTNER_INCLUDES} />
            </div>
            <div className="mt-4">
              <Button className="w-full" onClick={handleRegisterNow}>
                Register for partner access
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
