"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const MESSAGE = "Upgrade from Guest Access. Sign in with your company email.";

// Replaces a "Register" action for Guests, everywhere except the Technical
// Foundations courses (see FOUNDATION_COURSE_IDS) — Guests can browse the
// full catalog, but registering for anything else requires signing in with
// a recognized partner company email. Links to /register rather than being
// inert, so it's an actual next step and not a dead end.
export function GuestRegisterLock({ compact = false }: { compact?: boolean }) {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      title={MESSAGE}
      className="h-auto gap-1.5 whitespace-normal text-left text-muted-foreground"
    >
      <Link href="/register">
        <Lock className="size-3.5 shrink-0" />
        {compact ? "Upgrade" : MESSAGE}
      </Link>
    </Button>
  );
}
