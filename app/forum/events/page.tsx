"use client";

import Link from "next/link";
import { CommunityCalendar } from "@/components/community-calendar";
import { PageHero } from "@/components/page-hero";

export default function CommunityEventsPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          <Link href="/forum" className="hover:text-foreground">
            &larr; Community Dashboard
          </Link>
        }
        title="Events"
        description="Office hours, workshops, webinars, and partner gatherings across the community."
      />

      <CommunityCalendar />
    </div>
  );
}
