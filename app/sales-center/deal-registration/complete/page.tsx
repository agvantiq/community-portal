"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Check, Mail } from "lucide-react";

// Confirmation after a Deal Registration submit (the form routes here — see
// ../page.tsx). Mirrors community.vantiq.com/deal-registration-complete/ for
// content: the four review stages, the two-business-day promise, and
// partners@vantiq.com are the live site's own words, not invented here.
//
// One difference from the live page: it stays inside the portal shell
// (sidebar, header) like every other Sales Hub page, instead of a standalone
// centered card. "What happens next" is a plain numbered list (1–4) — no
// progress state, since the page can't know where a given deal is.

const PARTNER_DESK_EMAIL = "partners@vantiq.com";

const NEXT_STEPS: { title: string; detail: string }[] = [
  { title: "Received", detail: "Your registration is logged against your partner organization." },
  { title: "Conflict check", detail: "We review the opportunity against existing Vantiq pipeline." },
  { title: "Decision within two business days", detail: "You'll hear back either way." },
  { title: "Joint plan", detail: "Approved deals get a named Vantiq contact to work it with you." },
];

export default function DealRegistrationCompletePage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/sales-center" className="hover:text-foreground">
            &larr; Sales Hub
          </Link>
        }
        title={
          <span className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success/12 text-success"
            >
              <Check className="size-5 animate-in zoom-in-50 fade-in duration-300 ease-out motion-reduce:animate-none" strokeWidth={2.5} />
            </span>
            Your deal is registered
          </span>
        }
        description="Thanks — your submission is with the Vantiq partner desk. Here's what happens from here."
      />

      <Card className="max-w-2xl shadow-card gap-0 p-6">
        <SectionHeading className="mb-2">What happens next</SectionHeading>

        <ol className="space-y-4">
          {NEXT_STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span
                aria-hidden
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-vivid/15 text-xs font-semibold text-primary-vivid"
              >
                {i + 1}
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/sales-center/deal-registration">Register another deal</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to Dashboard</Link>
          </Button>
        </div>

        <p className="mt-6 flex items-start gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
          <Mail className="mt-px size-3.5 shrink-0" />
          <span>
            Need to change something you just submitted, or haven&apos;t heard back? Email{" "}
            <a
              href={`mailto:${PARTNER_DESK_EMAIL}`}
              className="font-medium text-primary-vivid underline underline-offset-2 hover:no-underline"
            >
              {PARTNER_DESK_EMAIL}
            </a>
            .
          </span>
        </p>
      </Card>
    </div>
  );
}
