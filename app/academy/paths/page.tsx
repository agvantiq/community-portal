"use client";

import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { ChevronRight, Code2, Handshake } from "lucide-react";

export default function PathsPage() {
  return (
    <div className="space-y-6">
      <PageHero
        title="Start Your Vantiq Journey"
        description="Welcome to the Vantiq On Demand Courses Site. Below you will find all of our technical and sales training offerings, which can be taken as part of a Training Pathway, or individually as desired."
      >
        <BookmarkButton
          item={{ id: "/academy/paths", label: "Training Paths", href: "/academy/paths", iconKey: "GraduationCap" }}
          className="absolute right-4 top-4 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        />
      </PageHero>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link
          href="/academy/paths/technical"
          className="block rounded-xl bg-linear-to-br from-emphasis/20 via-accent to-secondary p-6 shadow-card transition-opacity hover:opacity-90"
        >
          <Code2 className="size-6 text-foreground/70" />
          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-foreground">Technical Training Paths</h2>
              <p className="mt-2 text-sm text-foreground/70">
                Start with Foundations, then choose the role-based path that fits your work.
              </p>
            </div>
            <ChevronRight className="size-5 shrink-0 text-foreground/70" />
          </div>
        </Link>

        <Link
          href="/academy/paths/sales-training"
          className="block rounded-xl bg-linear-to-br from-emphasis/20 via-accent to-secondary p-6 shadow-card transition-opacity hover:opacity-90"
        >
          <Handshake className="size-6 text-foreground/70" />
          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-foreground">Sales Training Paths</h2>
              <p className="mt-2 text-sm text-foreground/70">
                Equip yourself to pitch, position, and close Vantiq deals with confidence.
              </p>
            </div>
            <ChevronRight className="size-5 shrink-0 text-foreground/70" />
          </div>
        </Link>
      </div>
    </div>
  );
}
