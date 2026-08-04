"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRole } from "@/components/shell/role-provider";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const EXPLORE_INCLUDES = ["Search knowledge articles", "Browse public resources"];

const GUEST_INCLUDES = [
  "Everything in Explore",
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

  function handleLostPassword() {
    toast.message("Password reset isn't available in this preview.");
  }

  return (
    <div className="space-y-10">
      <div
        className="relative -mx-6 -mt-8 overflow-hidden px-6 pt-10 pb-10 md:-mx-10 md:-mt-10 md:px-10 md:pt-12"
        style={{ background: "linear-gradient(to bottom, var(--secondary) 0%, white 100%)" }}
      >
        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex max-w-xl flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Welcome to Vantiq Partner Community
            </h1>
            <p className="text-sm text-muted-foreground">
              Access training, resources, best practices, and partner-exclusive content to grow your
              business.
            </p>
          </div>

          <Card className="shadow-card w-full max-w-sm justify-self-center p-5 lg:justify-self-end">
            <h2 className="text-base font-semibold text-foreground">Sign In</h2>
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
            <button
              type="button"
              onClick={handleLostPassword}
              className="mt-1.5 block w-full text-center text-xs font-normal leading-none text-muted-foreground hover:text-primary hover:underline"
            >
              Lost Your Password?
            </button>
            <p className="mt-5 text-center text-xs leading-none text-muted-foreground">
              Don&apos;t have a VANTIQ Community account?
            </p>
            <button
              type="button"
              onClick={handleRegisterNow}
              className="mt-1 block w-full text-center text-lg font-bold leading-tight text-primary hover:underline"
            >
              Register now
            </button>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="mb-1.5 text-sm font-medium text-emphasis">Access Options</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          You can use the portal without signing in. Guest access gives you more. Registered Partner access
          unlocks everything.
        </p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="shadow-card flex flex-col p-6">
            <p className="text-sm font-semibold text-foreground">You can use the portal without signing in</p>
            <div className="mt-1.5 flex-1">
              <IncludesList items={EXPLORE_INCLUDES} />
            </div>
          </Card>

          <Card className="shadow-card flex flex-col p-6">
            <p className="text-sm font-semibold text-foreground">Continue as a Guest</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Get access to additional portal experiences while you explore.
            </p>
            <div className="flex-1">
              <IncludesList items={GUEST_INCLUDES} />
            </div>
          </Card>

          <Card className="shadow-card flex flex-col p-6 ring-2 ring-primary">
            <p className="text-sm font-semibold text-foreground">Registered Partner Access</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Unlock the full Partner Enablement Community with your company email.
            </p>
            <div className="flex-1">
              <IncludesList items={PARTNER_INCLUDES} />
            </div>
          </Card>
        </div>
      </div>

      <div className="relative -mx-6 -mb-8 h-64 overflow-hidden sm:h-80 md:-mx-10 md:-mb-10 md:h-96">
        {/* images.unoptimized skips next/image's automatic basePath prefixing, so it's applied by hand here. */}
        <Image src="/community-portal/visual1.png" alt="" fill className="object-cover object-bottom" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, white 0%, transparent 35%)" }}
        />
      </div>
    </div>
  );
}
