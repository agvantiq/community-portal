// Content of community.vantiq.com/devcenter/technical-documents-content/, copied
// as it is on the live page (read 2026-09-24): wording, order, month labels and
// link targets. The Developer How To's page (app/developer-center/how-to-videos)
// renders this and nothing else.
//
// One deliberate difference: the live July 2023 entry links to a WordPress
// *preview* URL (?sfwd-courses&sfwd-lessons=july-2023-…&preview=true) that
// returns 404 for everyone. The same article — "Developer How To: How to Make
// Dynamic Client Content" — lives at the forum topic used below.

export interface HowToEntry {
  /** Month label exactly as the live page prints it, e.g. "July:" or "January 2024:". */
  when: string;
  title: string;
  href: string;
}

export interface HowToYear {
  /** e.g. "2026:" */
  year: string;
  entries: HowToEntry[];
}

const FORUM = "https://community.vantiq.com/forums/topic/";

export const DEVELOPER_HOW_TOS_INTRO =
  "The Developer How to Series is a collection of how-to articles for developers who want to get the most out of their projects. New How To’s come out every once in a while, and cover subjects across the wide spectrum of the Vantiq Development Platform.";

export const DEVELOPER_HOW_TOS: HowToYear[] = [
  {
    year: "2026:",
    entries: [
      { when: "July:", title: "How to Create a MCP Server in a Vantiq Project", href: `${FORUM}developer-how-to-create-mcp-servers-in-vantiq/` },
      { when: "June:", title: "The Join Activity Pattern", href: `${FORUM}developer-how-to-series-the-join-activity-pattern/` },
      { when: "March:", title: "Camel Connectors", href: `${FORUM}developer-tiqs-tricks-using-a-camelconnector-with-vantiq/` },
    ],
  },
  {
    year: "2025:",
    entries: [
      { when: "May:", title: "Cache Services", href: `${FORUM}developer-tiqs-tricks-cache-services/` },
      { when: "April:", title: "Discovering Current Session Information", href: `${FORUM}developer-tiqs-tricks-discovering-current-session-information/` },
      { when: "March:", title: "Public Clients", href: `${FORUM}developer-tiqs-tricks-public-clients/` },
      { when: "February:", title: "Using the Video Source", href: `${FORUM}developer-tiqs-tricks-using-the-video-source/` },
      { when: "January:", title: "Sharing Resources", href: `${FORUM}developer-tiqs-tricks-sharing-resources/` },
    ],
  },
  {
    year: "2024:",
    entries: [
      { when: "December:", title: "Client-to-Component Conversion", href: `${FORUM}developer-tiqs-tricks/` },
      { when: "November:", title: "Working with HTML Widgets", href: `${FORUM}developer-tiqs-tricks-working-with-html-widgets/` },
      { when: "October:", title: "Streaming AI Output", href: `${FORUM}developer-tiqs-tricks-streaming-ai-output/` },
      { when: "September:", title: "Filters for Fun & Profit", href: `${FORUM}developer-tiqs-tricks-filters-for-fun-profit/` },
      { when: "August:", title: "Vantiq Deployment Options", href: `${FORUM}developer-tiqs-tricks-vantiq-deployment-options/` },
      { when: "July:", title: "Using the GenAI Builder", href: `${FORUM}41540/` },
      { when: "June:", title: "The DynamicMapView Client Widget", href: `${FORUM}developer-tiqs-tricks-the-dynamicmapview-widget/` },
      { when: "May:", title: "Building Your Own Tools with Components and Assemblies", href: `${FORUM}developer-tiqs-and-tricks-building-your-own-tools/` },
      { when: "April:", title: "Camel Assemblies for Integration", href: `${FORUM}developer-tiqs-and-tricks-camel-assemblies-for-integration/` },
      { when: "March:", title: "Service Event Handlers", href: `${FORUM}developer-tiqs-tricks-service-event-handlers/` },
      { when: "February:", title: "AI Functions", href: `${FORUM}developer-tiqs-tricks-generative-ai-functions/` },
      { when: "January 2024:", title: "Managing AI Conversation Memory with Service Procedures", href: `${FORUM}developer-tiqs-tricks-managing-ai-conversation-memory-w-service-procedure/` },
    ],
  },
  {
    year: "2023:",
    entries: [
      { when: "December:", title: "Generative AI with Collaborations", href: `${FORUM}developer-tiqs-tricks-generative-ai-with-collaborations/` },
      { when: "November:", title: "Transformations", href: `${FORUM}developer-tiqs-tricks-transformations/` },
      { when: "October:", title: "Integrating Vantiq with Web-Based API’s", href: `${FORUM}developer-tiqs-tricks-integrating-vantiq-with-web-based-apis/` },
      { when: "August:", title: "Security & Secrets", href: `${FORUM}developer-tiqs-tricks-security-secrets/` },
      { when: "July:", title: "How to Make Dynamic Client Content", href: `${FORUM}new-developer-tiqs-tricks/` },
    ],
  },
];

export interface ReleaseEntry {
  label: string;
  linkText: string;
  href: string;
}

export const RELEASE_NOTES_HREF = "https://dev.vantiq.com/docs/system/releasenotes/index.html";

const PRESENTATIONS = "https://community.vantiq.com/wp-content/uploads/2020/08/";

export const PRODUCT_RELEASES: ReleaseEntry[] = [
  { label: "1.42 Release (May 2025)", linkText: "1.42 Release", href: `${PRESENTATIONS}VANTIQ-1.42-Update-Presentation-V1.0.pdf` },
  { label: "1.41 Release (February 2025)", linkText: "1.41 Release", href: `${PRESENTATIONS}VANTIQ-1.41-Update-Presentation-V1.0.pdf` },
  { label: "1.40 Release (September 2024)", linkText: "1.40 Release", href: `${PRESENTATIONS}VANTIQ-1.40-Update-Presentation-V0.2.pdf` },
  { label: "1.39 Release (June 2024)", linkText: "1.39 Release", href: `${PRESENTATIONS}VANTIQ-1.39-Update-Presentation-V0.1.pdf` },
  { label: "1.38 Release (February 2024)", linkText: "1.38 Release", href: "https://community.vantiq.com/resourcefiles/vantiq-1-38-release/" },
  { label: "1.37 Release (October 2023)", linkText: "1.37 Release", href: "https://community.vantiq.com/forums/topic/1-37-release-notes/" },
];

export interface VideoShortGroup {
  heading: string;
  items: { title: string; href: string }[];
}

const DOCS = "https://community.vantiq.com/docs/";

export const VIDEO_SHORTS_INTRO = "How-To Video Shorts highlight a way to accomplish something interesting in Vantiq, in less than 90 seconds!";

export const VIDEO_SHORTS: VideoShortGroup[] = [
  {
    heading: "IDE",
    items: [
      { title: "The Vantiq Integrated Development Environment", href: `${DOCS}the-vantiq-ide/` },
      { title: "Invite Other Users to Your Namespace", href: `${DOCS}how-to-video-shorts-invite-other-users-to-your-namespace/` },
      { title: "The Vantiq Version Control System", href: `${DOCS}how-to-video-shorts-the-vantiq-version-control-system/` },
    ],
  },
  { heading: "API", items: [{ title: "The Vantiq API", href: `${DOCS}how-to-video-shorts-the-vantiq-api/` }] },
  {
    heading: "AI",
    items: [
      { title: "AI Documentation Search", href: `${DOCS}how-to-videos-ai/` },
      { title: "AI Design Model Assistant", href: `${DOCS}how-to-videos-ai-design-model-assistant/` },
      { title: "Managing AI Conversations", href: `${DOCS}how-to-video-shorts-managing-ai-conversations/` },
      { title: "Using Generative AI in Applications", href: `${DOCS}how-to-video-shorts-using-generative-ai-in-applications/` },
      { title: "AI Functions", href: `${DOCS}how-to-video-shorts-ai-functions/` },
    ],
  },
  { heading: "Design Model", items: [{ title: "The Design Model AI assistant", href: "https://youtu.be/EZGD9cWsn08" }] },
  {
    heading: "Client",
    items: [
      { title: "Client Layouts", href: `${DOCS}how-to-video-shorts-client-layouts/` },
      { title: "Client CSS", href: `${DOCS}how-to-video-shorts-client-css/` },
    ],
  },
  {
    heading: "Apps",
    items: [
      { title: "Analytics and ComputStatistics", href: `${DOCS}how-to-video-shorts-analytics-and-computestatistics/` },
      { title: "SplitByGroup", href: `${DOCS}how-to-video-shorts-splitbygroup/` },
    ],
  },
  { heading: "VAIL", items: [{ title: "Calling Procedures by Properties", href: `${DOCS}how-to-video-shorts-calling-procedures-by-properties/` }] },
];
