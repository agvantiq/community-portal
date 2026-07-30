"use client";

import { CommunityCalendar } from "@/components/community-calendar";
import { RegisteredEventsSection } from "@/components/registered-events-section";
import { UpcomingEventsSection } from "@/components/upcoming-events-section";
import { PastEventsList } from "@/components/past-events-list";
import { PageHero } from "@/components/page-hero";

export default function CommunityEventsPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Events"
        title="Events"
        description="Office hours, workshops, webinars, and partner gatherings across the community."
      />

      <div id="calendar">
        <CommunityCalendar />
      </div>
      <div id="registered-events">
        <RegisteredEventsSection />
      </div>
      <div id="upcoming-events">
        <UpcomingEventsSection />
      </div>
      <div id="past-events">
        <PastEventsList />
      </div>
    </div>
  );
}
