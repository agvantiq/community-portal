"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lock } from "lucide-react";

// Replaces a "Register" action for Guests, everywhere except the Technical
// Foundations courses (see FOUNDATION_COURSE_IDS) — Guests can browse the
// full catalog, but registering for anything else requires a partner
// agreement. Opens an explanatory dialog rather than linking straight to
// /register, since Guest access itself doesn't grant that — the dialog
// points them to Contact Support instead.
export function GuestRegisterLock({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-auto gap-1.5 whitespace-normal text-left text-muted-foreground"
      >
        <Lock className="size-3.5 shrink-0" />
        {compact ? "Get Access" : "Get Access to Full Training"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You currently have Guest Access</DialogTitle>
            <DialogDescription>
              Full access to this course requires a partner agreement with Vantiq. If your
              company already has a partner agreement, contact us for support to get set up.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button asChild>
              <Link href="/support">Contact Support</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
