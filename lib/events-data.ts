export type EventCategory = "Office Hours" | "Workshop" | "Webinar" | "Summit" | "Networking";

// Originally reached for the chart-2/chart-4 tokens (blue/orange) plus
// success (green) to give all 5 categories their own hue — off the
// portal's teal-anchored, duotone-disciplined palette (DESIGN.md), and two
// of those four also failed contrast as small solid dots (chart-1 in dark
// mode: 2.37:1 against --card; chart-3/Lavender-Grey in light mode: 2.76:1
// against --background — both under the 3:1 UI-component floor). Calendar
// dots now carry only two verified-safe tones: primary-vivid for every
// routine category, emphasis-vivid reserved for Summit — matching the One
// Violet Rule (a partner summit is genuinely the one rare, high-weight
// event type here). Category identity itself lives in the text-labeled
// badges below, which have room for real distinction without relying on
// hue alone.
export const EVENT_CATEGORY_COLOR: Record<EventCategory, string> = {
  "Office Hours": "bg-primary-vivid",
  Workshop: "bg-primary-vivid",
  Webinar: "bg-primary-vivid",
  Summit: "bg-emphasis-vivid",
  Networking: "bg-primary-vivid",
};

// Each of these pairs is a token combination already used elsewhere in the
// portal (secondary/Azure Mist on buttons, muted+foreground on cards,
// accent on chips) — verified ≥7:1 in both themes — rather than new hues.
export const EVENT_CATEGORY_BADGE_CLASS: Record<EventCategory, string> = {
  "Office Hours": "bg-primary/10 text-primary-vivid",
  Workshop: "bg-secondary text-foreground",
  Webinar: "bg-muted text-foreground",
  Summit: "bg-emphasis/10 text-emphasis-vivid",
  Networking: "bg-accent text-accent-foreground",
};

export const EVENT_CATEGORIES: EventCategory[] = [
  "Office Hours",
  "Workshop",
  "Webinar",
  "Summit",
  "Networking",
];

export interface EventComment {
  id: string;
  author: string;
  timeAgo: string;
  body: string;
}

export interface EventRecap {
  /** Omitted for informal/drop-in formats (Office Hours, Networking) that realistically don't get recorded. */
  recordingMinutes?: number;
  notes?: string[];
  attendees?: { name: string; org: string }[];
  comments?: EventComment[];
}

export interface EventAgendaItem {
  time: string;
  title: string;
}

/** The pre-event counterpart to EventRecap — an upcoming event has an agenda and who's registered so far, not notes or attendees (nothing has happened yet to take notes on or attend). */
export interface EventPreview {
  agenda?: EventAgendaItem[];
  details?: string[];
  registeredSoFar?: { name: string; org: string }[];
  comments?: EventComment[];
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  /** ISO date (YYYY-MM-DD), local — matches the date fields already used in lib/sample-data.ts ANNOUNCEMENTS. */
  date: string;
  time: string;
  location: string;
  /** Populated for past events only — an upcoming event has no recap yet. */
  recap?: EventRecap;
  /** Populated for upcoming events only — see EventPreview. */
  preview?: EventPreview;
}

// "Partner Field Day: Edge AI" (Jul 29) matches the same event already
// referenced in lib/sample-data.ts ANNOUNCEMENTS (UPCOMING_EVENT) — same
// title, date, and description, so the two surfaces agree with each other
// rather than describing the same event two different ways.
export const EVENTS: CommunityEvent[] = [
  // Past
  {
    id: "edge-ai-office-hours-jul8",
    title: "Edge AI Office Hours",
    description: "Drop-in Q&A on edge deployment patterns with the Vantiq solutions team.",
    category: "Office Hours",
    date: "2026-07-08",
    time: "11:00 AM",
    location: "Virtual",
    // Drop-in office hours aren't recorded — see EventRecap's recordingMinutes doc.
    recap: {
      notes: [
        "Most questions centered on provisioning edge nodes behind restrictive corporate firewalls.",
        "Team walked through the offline-cache behavior for Sources when connectivity drops mid-session.",
        "Reminder: the Edge Deployment Patterns doc in the Knowledge Base now covers the NAT traversal case raised twice today.",
      ],
      attendees: [
        { name: "Arjun Mehta", org: "Wipro Mfg" },
        { name: "Haruto Tanaka", org: "Cognizant Tech" },
        { name: "Daniela Ferreira", org: "NTT Data" },
      ],
      comments: [
        {
          id: "c1",
          author: "Arjun Mehta",
          timeAgo: "5d ago",
          body: "The offline-cache walkthrough was exactly what I needed — thanks for staying late to cover it.",
        },
      ],
    },
  },
  {
    id: "vail-deep-dive-jul15",
    title: "VAIL Deep Dive Workshop",
    description: "Hands-on session covering advanced VAIL rule patterns and debugging.",
    category: "Workshop",
    date: "2026-07-15",
    time: "2:00 PM",
    location: "Virtual",
    recap: {
      recordingMinutes: 51,
      notes: [
        "Covered WHEN/DO rule ordering and the common double-fire bug when a rule watches its own side effects.",
        "Live-debugged a partner's rule using the VAIL Reference's trace-log walkthrough.",
        "Closed with a Q&A on procedure-vs-rule tradeoffs for multi-step workflows.",
      ],
      attendees: [
        { name: "Marek Kowalski", org: "Radenta Tech" },
        { name: "Priya Nandakumar", org: "SoftServe" },
        { name: "Grace Odhiambo", org: "Softura" },
        { name: "Elena Popescu", org: "Capgemini" },
      ],
      comments: [
        {
          id: "c1",
          author: "Priya Nandakumar",
          timeAgo: "2w ago",
          body: "The double-fire debugging section alone was worth the hour — fixed a bug I'd been chasing for days.",
        },
        {
          id: "c2",
          author: "Marek Kowalski",
          timeAgo: "2w ago",
          body: "Would love a follow-up session that goes deeper on procedure composition patterns.",
        },
      ],
    },
  },
  {
    id: "community-office-hours-jul22",
    title: "Community Office Hours",
    description: "Open floor for questions on anything in the partner portal or platform.",
    category: "Office Hours",
    date: "2026-07-22",
    time: "11:00 AM",
    location: "Virtual",
    recap: {
      notes: [
        "Walked through the new Community Hub — reputation points, badges, and the leaderboard's company-visibility toggle.",
        "Several partners asked how course completions roll up to certification progress; pointed them to the Learning Hub's tracked-path card.",
      ],
      attendees: [
        { name: "Daniela Ferreira", org: "NTT Data" },
        { name: "Grace Odhiambo", org: "Softura" },
      ],
      comments: [
        {
          id: "c1",
          author: "Daniela Ferreira",
          timeAgo: "3w ago",
          body: "Didn't realize the leaderboard let you hide your company — that answers a question our team had.",
        },
      ],
    },
  },
  {
    id: "partner-networking-mixer-jul24",
    title: "Partner Networking Mixer",
    description: "Informal virtual meetup to connect with other partners in your region.",
    category: "Networking",
    date: "2026-07-24",
    time: "4:00 PM",
    location: "Virtual",
    // Informal social meetup — no recording or session notes, just who showed up and what they said.
    recap: {
      attendees: [
        { name: "Marek Kowalski", org: "Radenta Tech" },
        { name: "Haruto Tanaka", org: "Cognizant Tech" },
        { name: "Elena Popescu", org: "Capgemini" },
        { name: "Arjun Mehta", org: "Wipro Mfg" },
      ],
      comments: [
        {
          id: "c1",
          author: "Elena Popescu",
          timeAgo: "3w ago",
          body: "Good turnout for a virtual mixer — hoping the next one lands somewhere in EMEA hours too.",
        },
      ],
    },
  },
  {
    id: "partner-field-day-jul29",
    title: "Partner Field Day: Edge AI",
    description: "Live workshop and networking for certified partners.",
    category: "Workshop",
    date: "2026-07-29",
    time: "10:00 AM",
    location: "Virtual",
    recap: {
      recordingMinutes: 68,
      notes: [
        "Three partners presented real edge AI projects shipped on Vantiq — architecture, gotchas, and results.",
        "Radenta Tech's cold-chain monitoring build sparked the most questions, particularly around offline buffering.",
        "Vantiq team previewed the upcoming Edge AI Architecture Deep Dive course, launching next quarter.",
        "Closed with an open networking block — no formal agenda, just partners comparing notes.",
      ],
      attendees: [
        { name: "Marek Kowalski", org: "Radenta Tech" },
        { name: "Priya Nandakumar", org: "SoftServe" },
        { name: "Haruto Tanaka", org: "Cognizant Tech" },
        { name: "Daniela Ferreira", org: "NTT Data" },
        { name: "Arjun Mehta", org: "Wipro Mfg" },
        { name: "Grace Odhiambo", org: "Softura" },
        { name: "Elena Popescu", org: "Capgemini" },
        { name: "Sam Chen", org: "Vantiq" },
      ],
      comments: [
        {
          id: "c1",
          author: "Haruto Tanaka",
          timeAgo: "1w ago",
          body: "The cold-chain monitoring walkthrough was the highlight — genuinely useful to see a production architecture, not just a demo.",
        },
        {
          id: "c2",
          author: "Sam Chen",
          timeAgo: "1w ago",
          body: "Great turnout from the field. The Edge AI Architecture Deep Dive course is on track for next quarter — will post here when registration opens.",
        },
        {
          id: "c3",
          author: "Grace Odhiambo",
          timeAgo: "6d ago",
          body: "Following up on the offline-buffering question — posted a fuller writeup in the Q&A Forum if anyone wants the details.",
        },
      ],
    },
  },
  // Upcoming
  {
    id: "partner-summit-aug12",
    title: "Vantiq Certified Partner Summit",
    description: "The annual in-person gathering for certified partners — roadmap, training, and networking.",
    category: "Summit",
    date: "2026-08-12",
    time: "9:00 AM",
    location: "Austin, TX",
    preview: {
      agenda: [
        { time: "9:00 AM", title: "Welcome & product roadmap" },
        { time: "10:30 AM", title: "Breakout: vertical solutions (Manufacturing, Healthcare, Logistics)" },
        { time: "12:00 PM", title: "Lunch & partner awards" },
        { time: "1:30 PM", title: "Hands-on workshop: Edge AI orchestration" },
        { time: "4:00 PM", title: "Closing networking reception" },
      ],
      details: [
        "In-person, full day — bring your partner badge for check-in at the venue.",
        "Venue and hotel block details are in your registration confirmation email.",
        "Business casual. Laptops recommended for the 1:30 PM workshop block.",
      ],
      registeredSoFar: [
        { name: "Marek Kowalski", org: "Radenta Tech" },
        { name: "Priya Nandakumar", org: "SoftServe" },
        { name: "Haruto Tanaka", org: "Cognizant Tech" },
        { name: "Elena Popescu", org: "Capgemini" },
        { name: "Sam Chen", org: "Vantiq" },
      ],
      comments: [
        {
          id: "c1",
          author: "Marek Kowalski",
          timeAgo: "4d ago",
          body: "Is the Edge AI workshop hands-on with our own hardware, or will devices be provided on-site?",
        },
        {
          id: "c2",
          author: "Sam Chen",
          timeAgo: "3d ago",
          body: "Devices will be provided — no need to bring your own edge hardware. Bring a laptop to connect to the demo rig.",
        },
      ],
    },
  },
  {
    id: "ama-solutions-architects-aug19",
    title: "AMA: Solutions Architects",
    description: "Ask Vantiq's solutions architecture team anything — bring your hardest questions.",
    category: "Webinar",
    date: "2026-08-19",
    time: "12:00 PM",
    location: "Virtual",
    preview: {
      agenda: [
        { time: "12:00 PM", title: "Opening remarks" },
        { time: "12:10 PM", title: "Live Q&A — submitted and live questions" },
        { time: "12:55 PM", title: "Closing & resources" },
      ],
      details: [
        "Submit questions in advance via the registration form, or ask live in the chat.",
        "No prep required — this is an open floor, not a structured demo.",
        "Join link goes out to registered partners 1 hour before start.",
      ],
      registeredSoFar: [
        { name: "Daniela Ferreira", org: "NTT Data" },
        { name: "Grace Odhiambo", org: "Softura" },
        { name: "Arjun Mehta", org: "Wipro Mfg" },
      ],
    },
  },
  {
    id: "genai-orchestration-webinar-aug26",
    title: "GenAI Orchestration Webinar",
    description: "What's New in GenAI Orchestration — walking through the latest multi-agent features and how to start using them today.",
    category: "Webinar",
    date: "2026-08-26",
    time: "1:00 PM",
    location: "Virtual",
    preview: {
      agenda: [
        { time: "1:00 PM", title: "What's new in multi-agent orchestration" },
        { time: "1:20 PM", title: "Live demo: coordinating agents across an edge deployment" },
        { time: "1:45 PM", title: "Q&A" },
      ],
      details: [
        "Familiarity with basic VAIL rules is helpful but not required.",
        "Slides and the recording will be posted here after the session.",
        "Join link goes out to registered partners 1 hour before start.",
      ],
      registeredSoFar: [
        { name: "Priya Nandakumar", org: "SoftServe" },
        { name: "Haruto Tanaka", org: "Cognizant Tech" },
      ],
    },
  },
];
