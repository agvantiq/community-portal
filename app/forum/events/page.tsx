"use client";

import Link from "next/link";
import { CommunityCalendar } from "@/components/community-calendar";

export default function CommunityEventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/forum" className="text-xs text-muted-foreground hover:text-foreground">
          &larr; Community Dashboard
        </Link>
        <h1 className="mt-1 text-2xl font-semibold text-foreground">Events</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Office hours, workshops, webinars, and partner gatherings across the community.
        </p>
      </div>

      <CommunityCalendar />
    </div>
  );
}
