// Content of community.vantiq.com/resources/ (the "Resources Library"), copied as it
// is on the live site (read 2026-09-24): the nine top-level folders and every file
// inside them, with the titles, dates and sizes the library prints. Nothing else feeds
// the Sales Resources page (app/resources) — no sample or placeholder entries.
//
// Each item links to its own page on the live community site
// (https://community.vantiq.com/resourcefiles/<slug>/). The library's per-user
// "Download" links carry a member token, so they are not reproduced here.
//
// Two library facts worth knowing:
//  - "Vantiq Technical Support Policy" is not in any folder on the live site; it is
//    only reachable from the library's Recent Files list. It is kept, with no folder.
//  - "Sales Cloud Documentation and Instructions for Sales Team" is tagged "for Vantiq
//    employees only" on the live site. It stays in the list on purpose: WordPress
//    already hides it from anyone who isn't Vantiq staff, so the mockup mirrors the
//    library as staff see it.
//  - "Your Favorites" and "Vantiq Only" (the live tabs next to All Content /
//    Featured Content) are per-user / staff-only views, so they are not mirrored.

export const RESOURCE_LIBRARY_URL = "https://community.vantiq.com/resources/";

const FILE_BASE = "https://community.vantiq.com/resourcefiles/";

export const RESOURCE_FOLDERS = [
  "Competitive Analysis",
  "Corporate Assets",
  "Data Sheets",
  "Presentations",
  "Reports",
  "Sales Resources",
  "Use Cases",
  "Videos",
  "White Papers",
] as const;

export type ResourceFolder = (typeof RESOURCE_FOLDERS)[number];

export interface SalesResource {
  title: string;
  /** Page on community.vantiq.com for this file. */
  href: string;
  /** ISO date (the live library prints it as e.g. "September 3, 2026"). */
  date: string;
  /** File size as the live library prints it; absent for videos. */
  size?: string;
  /** Absent only for the one file that sits outside every folder. */
  folder?: ResourceFolder;
  /** In the live library's Featured Content tab. */
  featured: boolean;
}

// [title, slug, date, size?]
type Row = [string, string, string, string?];

const FEATURED = new Set([
  "use-cases-1-pager",
  "platform-data-sheet-vantiq-situational-awareness-for-generative-ai",
  "eda-landscape",
  "vantiq-smile-digital-health-partner-solution",
  "vantiq-etevers-joint-profile-english-version",
  "gai-insights-article-the-rise-of-ai-orchestration",
  "gai-insights-research-article-the-rise-of-second-generation-ai-orchestration",
  "navigating-the-edge-how-to-successfully-build-distributed-solutions",
  "vantiq-intelligent-applications-platform-datasheet",
  "agentic-ai-whitepaper",
  "agentic-ai-2-pager",
  "whitepaper-domain-and-multi-domain-integration",
]);

const FOLDER_ROWS: Record<ResourceFolder, Row[]> = {
  "Competitive Analysis": [
    ["Competitive Cheat Sheet", "competitive-cheat-sheet", "2026-09-03", "2 MB"],
    ["Vantiq vs. Solace Deep Dive", "vantiq-vs-solace-deep-dive", "2026-09-03", "188 KB"],
    ["Vantiq vs. RPA Vendors Deep Dive", "vantiq-vs-rpa-vendors-deep-dive", "2026-09-03", "215 KB"],
    ["Vantiq vs. Palantir Deep Dive", "vantiq-vs-palantir-deep-dive", "2026-09-03", "847 KB"],
    ["Vantiq vs. n8n Deep Dive", "vantiq-vs-n8n-deep-dive", "2026-09-03", "240 KB"],
    ["Vantiq vs. Modern Data Platforms Deep Dive", "vantiq-vs-modern-data-platforms-deep-dive", "2026-09-03", "221 KB"],
    ["Vantiq vs. Hyperscalers Deep Dive", "vantiq-vs-hyperscalers-deep-dive", "2026-09-03", "164 KB"],
    ["Vantiq vs. Dataiku Deep Dive", "vantiq-vs-dataiku-deep-dive", "2026-09-03", "168 KB"],
    ["Vantiq vs. Confluent Deep Dive", "vantiq-vs-confluent-deep-dive", "2026-09-03", "179 KB"],
    ["Competitive Overview & Battlecards", "competitive-overview-battlecards", "2026-09-03", "372 KB"],
    ["Vantiq vs Others Document", "vantiq-vs-others-document", "2025-09-16", "7 MB"],
  ],
  "Corporate Assets": [
    ["Vantiq Partner Day Agenda Oct 2025", "vantiq-partner-day-agenda-oct-2025", "2026-09-03", "359 KB"],
    ["State of the AI Industry and Art of the Possible with Vantiq", "state-of-the-ai-industry-and-art-of-the-possible-with-vantiq", "2026-09-03", "6 MB"],
    ["Future of AI in Healthcare", "future-of-ai-in-healthcare", "2026-09-03", "8 MB"],
    ["Vantiq AI Use Case Assistant and Frameworks", "vantiq-ai-use-case-assistant-and-frameworks", "2026-09-03", "3 MB"],
    ["Partnering for Success", "partnering-for-success", "2026-09-03", "3 MB"],
    ["Vantiq AI Summit DC Agenda", "vantiq-ai-summit-dc-agenda", "2026-09-03", "2 MB"],
    ["Vantiq Partner Day Flyer", "vantiq-partner-day-flyer", "2026-09-03", "2 MB"],
    ["Vantiq AI Summit Prospectus", "vantiq-ai-summit-prospectus-25", "2026-09-03", "2 MB"],
    ["Hotel recommendations for Vantiq AI Summit DC", "hotel-recommendations-for-vantiq-ai-summit-dc", "2026-09-03", "788 KB"],
    ["Vantiq House at Davos 2025 Agenda", "vantiq-house-at-davos-2025-agenda", "2026-09-03", "955 KB"],
    ["Vantiq Brand Guidelines", "vantiq-brand-guide", "2026-09-03", "19 MB"],
  ],
  "Data Sheets": [
    ["Vantiq_Telemedicine (WoundRounds)", "vantiq_telemedicine-woundrounds", "2026-09-03", "2 MB"],
    ["Vantiq Trellis Joint Profile", "vantiq-trellis-joint-profile", "2026-09-03", "9 MB"],
    ["Vantiq TransformativeMed", "vantiq-transformativemed", "2026-09-03", "2 MB"],
    ["Vantiq Smile Digital Health Partner Solution", "vantiq-smile-digital-health-partner-solution-2", "2026-09-03", "10 MB"],
    ["Vantiq Radenta", "vantiq-radenta", "2026-09-03", "2 MB"],
    ["Vantiq HP1T Partner Solution", "vantiq-hp1t-partner-solution", "2026-09-03", "2 MB"],
    ["Vantiq HITSS Joint Profile", "vantiq-hitss-joint-profile", "2026-09-03", "2 MB"],
    ["Vantiq Etevers Joint Profile", "vantiq-etevers-joint-profile", "2026-09-03", "17 MB"],
    ["TrackableHealth.AI Case Study Datasheet", "trackablehealth-ai-case-study-datasheet", "2026-09-03", "3 MB"],
    ["T4M Case Study Datasheet", "t4m-case-study-datasheet", "2026-09-03", "4 MB"],
    ["NTT ExC Case Study Datasheet", "ntt-exc-case-study-datasheet", "2026-09-03", "3 MB"],
    ["Neurosync Case Study Datasheet", "neurosync-case-study-datasheet", "2026-09-03", "4 MB"],
    ["LS TT Case Study Datasheet", "ls-tt-case-study-datasheet", "2026-09-03", "4 MB"],
    ["D-Resilio Case Study for Japan Datasheet", "d-resilio-case-study-for-japan-datasheet", "2026-09-03", "2 MB"],
    ["Vantiq Smart Cities 2-pager (Updated)", "vantiq-smart-cities-2-pager-updated", "2026-08-21"],
    ["Vantiq Distribution Operations (Eagle Rock) 2-Pager", "vantiq-distribution-operations-eagle-rock-2-pager", "2026-08-21"],
    ["Vantiq Smart Stadium 2-Pager (Spanish)", "vantiq-smart-stadium-2-pager-spanish", "2026-08-21"],
    ["Vantiq Healthcare 2-Pager (Udated)", "vantiq-healthcare-2-pager-udated", "2026-08-21"],
    ["Vantiq Public Safety 2-Pager (Updated)", "public-safety-2-pager-updated", "2026-08-21"],
    ["Vantiq D-Resilio 2-Pager", "vantiq-d-resilio-2-pager", "2026-08-21"],
    ["Vantiq Manufacturing 2-pager", "vantiq-manufacturing-2-pager", "2026-08-21"],
    ["Vantiq Intelligent Border 2-pager", "vantiq-intelligent-border-2-pager", "2026-08-21"],
    ["Vantiq Defense 2-pager", "vantiq-defense-2-pager", "2026-08-21"],
    ["Vantiq Smart Distribution 2-pager (Japanese)", "vantiq-smart-distribution-2-pager-japanese", "2026-09-03"],
    ["Vantiq Telecom 2-pager", "vantiq-telecom-2-pager", "2026-08-21"],
    ["Vantiq Energy 2-pager", "vantiq-energy-2-pager", "2026-08-21"],
    ["Healthcare FHIR 2 Pager", "healthcare-fhir-2-pager", "2025-09-12", "2 MB"],
    ["Vantiq Solution Overview", "vantiq-solution-overview", "2025-09-15", "2 MB"],
    ["Smart Cities 2-Pager", "smart-cities-2-pager", "2025-09-12", "2 MB"],
    ["Public Safety 2-Pager", "public-safety-2-pager", "2025-09-12", "11 MB"],
    ["Wound Management 2-Pager", "wound-management-2-pager", "2025-09-12", "2 MB"],
    ["Mining 2-Pager", "mining-2-pager", "2025-09-12", "540 KB"],
    ["Healthcare 2-Pager", "healthcare-2-pager", "2025-09-12", "7 MB"],
    ["Defense 2-Pager", "defense-2-pager", "2025-01-09", "2 MB"],
    ["Agentic AI 2-Pager", "agentic-ai-2-pager", "2025-04-01", "2 MB"],
    ["Vantiq Intelligent Applications Platform Datasheet", "vantiq-intelligent-applications-platform-datasheet", "2025-09-16", "714 KB"],
    ["Healthcare 1-pager", "healthcare-1-pager", "2026-09-03", "2 MB"],
    ["Platform Data Sheet - Vantiq Situational Awareness for Generative AI", "platform-data-sheet-vantiq-situational-awareness-for-generative-ai", "2026-09-03", "842 KB"],
  ],
  Presentations: [
    ["Vantiq Platform Technology Overview", "vantiq-platform-technology-overview", "2025-12-09", "4 MB"],
    ["Vantiq Security Architecture Deck", "vantiq-security-architecture-deck", "2025-11-26", "433 KB"],
    ["1.43 - Update Presentation V0.1 (10/14/2025)", "1-43-update-presentation-v0-1-10-14-2025", "2025-10-15", "2 MB"],
    ["Vantiq 1.38 Release", "vantiq-1-38-release", "2026-09-03", "7 MB"],
    ["[日本語] Vantiqプレゼンテーション", "%e6%97%a5%e6%9c%ac%e8%aa%9e-vantiq%e3%83%97%e3%83%ac%e3%82%bc%e3%83%b3%e3%83%86%e3%83%bc%e3%82%b7%e3%83%a7%e3%83%b3", "2026-09-03", "8 MB"],
    ["Sales Presentation - Strategic Transformations with Vantiq", "sales-presentation-strategic-transformations-with-vantiq", "2026-09-03", "27 MB"],
    ["Vantiq for Telecoms Sales Presentation", "vantiq-for-telecoms-sales-presentation", "2026-09-03", "84 MB"],
  ],
  Reports: [
    ["GAI Insights Article - The Rise of AI Orchestration", "gai-insights-article-the-rise-of-ai-orchestration", "2026-05-22", "2 MB"],
    ["GAI Insights research article: The rise of second-generation AI orchestration", "gai-insights-research-article-the-rise-of-second-generation-ai-orchestration", "2025-09-18", "2 MB"],
    ["Frost & Sullivan Enabling Technology Leadership Award for Vantiq 2022", "frost-sullivan-enabling-technology-leadership-award-for-vantiq-2022", "2023-03-29", "5 MB"],
    ["RT Insights Report: Why Smart Cities Need an Event-Driven Architecture", "rt-insights-report-why-smart-cities-need-an-event-driven-architecture", "2021-06-14", "17 MB"],
    ["IDC Perspective: Waterbit and Vantiq", "idc-perspective-waterbit-and-vantiq", "2021-06-14", "637 KB"],
  ],
  "Sales Resources": [
    ["Vantiq Key Patents", "vantiq-key-patents", "2026-09-03", "6 MB"],
    ["Sales Cloud Documentation and Instructions for Sales Team", "sales-cloud-documentation-and-instructions-for-sales-team", "2026-09-03", "837 KB"],
    ["Vantiq & TransformativeMed Partnership 2-Pager", "vantiq-transformativemed-partnership-2-pager", "2026-09-03", "2 MB"],
    ["Radenta & Vantiq Partnership 2-pager", "radenta-vantiq-partner-2pager", "2026-09-03", "2 MB"],
    ["Vantiq Sales Intro Email (June,2025)", "vantiq-sales-intro-email-june2025", "2025-09-12", "28 KB"],
    ["Vantiq Product Positioning Statement (06/01/2025)", "vantiq-product-positioning-statement-06-01-2025", "2025-09-12", "181 KB"],
    ["Vantiq Etevers Joint Profile (Korean version)", "vantiq-etevers-joint-profile-korean-version", "2026-09-03", "17 MB"],
    ["Vantiq Etevers Joint Profile (English version)", "vantiq-etevers-joint-profile-english-version", "2026-09-03", "17 MB"],
    ["Vantiq Smile Digital Health Partner Solution", "vantiq-smile-digital-health-partner-solution", "2026-09-03", "10 MB"],
    ["Virtual Hospitals Whitepaper (Saudi Arabia Specific)", "virtual-hospitals-whitepaper", "2026-09-03", "1 MB"],
    ["Flyer - Vantiq Resources for Federal And Defense", "flyer-vantiq-resources-for-federal-and-defense", "2026-09-03", "3 MB"],
    ["Vantiq + NEC: Fiber Sensing Perimeter Security Solution Datasheet", "vantiq-nec-fiber-sensing-perimeter-security-solution-datasheet", "2026-09-03", "2 MB"],
    ["Vantiq Training Overview", "vantiq-training-overview", "2026-09-03", "178 KB"],
  ],
  "Use Cases": [
    ["Defence Use Case", "defence-use-case", "2026-08-21"],
    ["Anonymous Use Cases (Nov 2025)", "anonymous-use-cases-nov-2025", "2025-11-03", "16 MB"],
    ["Vantiq Use Cases Flyer", "vantiq-use-cases", "2025-09-17", "3 MB"],
    ["Use Cases 1 Pager", "use-cases-1-pager", "2026-09-03", "766 KB"],
    ["Mitsuiwa Case Study", "mitsuiwa-case-study", "2026-09-03", "1 MB"],
    ["SoftBank Case Study", "softbank-case-study", "2026-09-03", "1 MB"],
    ["Cust2Mate Case Study", "cust2mate-case-study", "2026-09-03", "2 MB"],
    ["Electra Case Study", "electra-case-study", "2026-09-03", "3 MB"],
    ["Teneo Case Study", "teneo-case-study", "2026-09-03", "480 KB"],
    ["Total Case Study", "total-case-study", "2026-09-03", "2 MB"],
    ["Waterbit Case Study", "waterbit-case-study", "2026-09-03", "634 KB"],
  ],
  Videos: [
    ["Drone Based Threat Detection and Situational Awareness", "drone-based-threat-detection-and-situational-awareness", "2026-08-21"],
    ["Heatstroke Monitoring and Prevention for Field Operations", "heatstroke-monitoring-and-prevention-for-field-operations-2", "2026-08-21"],
    ["Real-Time Disaster Response Monitoring Application", "real-time-disaster-response-monitoring-application-2", "2026-08-21"],
    ["Firefighter Safety Monitoring Application", "firefighter-safety-monitoring-application-2", "2026-08-21"],
    ["Remote Patient Monitoring Demo", "remote-patient-monitoring-demo-2", "2026-08-21"],
    ["Building Agentic Biosurveillance System", "building-agentic-biosurveillance-system", "2026-08-21"],
    ["Air, Sea, and Information Domain Monitoring Application for Defense", "air-sea-and-information-domain-monitoring-application-for-defense", "2026-08-21"],
    ["Transaction Monitoring Demo", "transaction-monitoring-demo-2", "2026-08-21"],
    ["Building Agentic AI Applications Demo", "building-agentic-ai-applications-demo-2", "2026-08-21"],
    ["Smart City Demo", "smart-city-demo-2", "2026-08-21"],
    ["Coordinating Ambulance Transport in Real Time", "coordinating-ambulance-transport-in-real-time-2", "2026-08-21"],
    ["Real-Time City Incident Monitoring and Response Application", "real-time-city-incident-monitoring-and-response-application", "2026-08-21"],
    ["Retail Security and Analytics Monitoring Application", "retail-security-and-analytics-monitoring-application", "2026-08-21"],
    ["Real-time Traffic Monitoring with AI", "real-time-traffic-monitoring-with-ai", "2026-08-21"],
    ["Multi AI-Agent Demo", "multi-ai-agent-demo-2", "2026-08-21"],
    ["Police Real-Time Command and Control System Demo", "police-real-time-command-and-control-system-demo", "2026-08-21"],
    ["Real-Time Tollway License Plate Recognition and Traffic Operations Application", "real-time-tollway-license-plate-recognition-and-traffic-operations-application", "2026-08-21"],
    ["Agentic AI for Home Health Care Planning", "agentic-ai-for-home-health-care-planning", "2026-08-21"],
    ["Team Readiness and Health Monitoring with Wearables", "team-readiness-and-health-monitoring-with-wearables", "2026-08-21"],
    ["AI-Powered Companion for Seniors Application", "ai-powered-companion-for-seniors-application", "2026-08-21"],
    ["Patient Discharge Management", "patient-discharge-management", "2026-08-21"],
    ["Structured Data Extraction from Clinical PDF Reports", "structured-data-extraction-from-clinical-pdf-reports", "2026-08-21"],
    ["Agentic Clinical Workflow Automation for Physicians", "agentic-clinical-workflow-automation-for-physicians", "2026-08-21"],
    ["AI-Powered Nursing Home Monitoring application", "ai-powered-nursing-home-monitoring-application", "2026-08-21"],
    ["Building an Automated PDF Ingestion and Monitoring App", "building-an-automated-pdf-ingestion-and-monitoring-app-2", "2026-08-21"],
    ["Disaster Management Demo", "disaster-management-demo-3", "2026-08-21"],
    ["Multi-Drone and UGV Coordination with AI Orchestration Demo", "multi-drone-and-ugv-coordination-with-ai-orchestration-demo", "2026-08-21"],
    ["Agentic AI in Manufacturing Demo", "agentic-ai-in-manufacturing-demo-2", "2026-08-21"],
    ["Smart Oil Rig Monitoring System", "smart-oil-rig-monitoring-system", "2026-08-21"],
    ["Building a Real-Time AI Drive Alert Demo", "building-a-real-time-ai-drive-alert-demo", "2026-09-03"],
    ["Intelligent Data Center Command Center Demo", "intelligent-data-center-command-center-demo", "2026-08-21"],
    ["How Hospitals Are Leveraging AI to Improve Discharge and Patient Flow in 2026 | Webinar Recording", "how-hospitals-are-leveraging-ai-to-improve-discharge-and-patient-flow-in-2026-webinar-recording", "2026-09-03"],
    ["Disaster Management Demo", "disaster-management-demo-2", "2026-08-21"],
    ["【Vantiq マルチAIエージェント基盤】複数のAIがまるで人間のように業務をこなす！", "%e3%80%90vantiq-%e3%83%9e%e3%83%ab%e3%83%81ai%e3%82%a8%e3%83%bc%e3%82%b8%e3%82%a7%e3%83%b3%e3%83%88%e5%9f%ba%e7%9b%a4%e3%80%91%e8%a4%87%e6%95%b0%e3%81%aeai%e3%81%8c%e3%81%be%e3%82%8b%e3%81%a7%e4%ba%ba", "2026-08-21"],
    ["Multi AI-Agent Demo", "multi-ai-agent-demo", "2026-08-19"],
    ["Transaction Monitoring Demo", "transaction-monitoring-demo", "2026-08-19"],
    ["Disaster Management Demo", "disaster-management-demo", "2026-08-19"],
    ["Coordinating Ambulance Transport in Real Time", "coordinating-ambulance-transport-in-real-time", "2026-08-19"],
    ["Smart City Demo", "smart-city-demo", "2026-08-19"],
    ["Building Agentic AI Applications Demo", "building-agentic-ai-applications-demo", "2026-08-19"],
    ["Home Health Care Planning Application", "home-health-care-planning-application", "2026-08-19"],
    ["Real-Time Disaster Response Monitoring Application", "real-time-disaster-response-monitoring-application", "2026-08-19"],
    ["Building an Automated PDF Ingestion and Monitoring App", "building-an-automated-pdf-ingestion-and-monitoring-app", "2026-08-19"],
    ["Firefighter Safety Monitoring Application", "firefighter-safety-monitoring-application", "2026-08-19"],
    ["Heatstroke Monitoring and Prevention for Field Operations", "heatstroke-monitoring-and-prevention-for-field-operations", "2026-08-19"],
    ["Remote Patient Monitoring Demo", "remote-patient-monitoring-demo", "2026-08-19"],
    ["Agentic AI in Manufacturing Demo", "agentic-ai-in-manufacturing-demo", "2026-08-19"],
    ["Vantiq Demo Library Presentation (Nov, 2025)", "vantiq-demo-descriptions-april-2025", "2025-10-23", "5 MB"],
  ],
  "White Papers": [
    ["Healthcare WP", "healthcare-wp", "2026-09-03", "3 MB"],
    ["VANTIQMulti Domain Integration WP", "vantiq-agentic-ai-wp", "2026-09-03", "20 MB"],
    ["Manufacturing White Paper", "manufacturing-white-paper", "2026-08-19", "3 MB"],
    ["Vantiq Virtual Hospital Whitepaper", "vantiq-virtual-hospital-whitepaper", "2026-09-03", "2 MB"],
    ["Agentic AI Whitepaper", "agentic-ai-whitepaper", "2025-09-12", "1 MB"],
    ["Whitepaper - Orchestrating the Future of Healthcare", "whitepaper-orchestrating-the-future-of-healthcare", "2023-08-01", "3 MB"],
    ["Management Summary - Multi-Domain Integration", "management-summary-multi-domain-integration", "2023-05-10", "1 MB"],
    ["Whitepaper - Domain and Multi-Domain Integration", "whitepaper-domain-and-multi-domain-integration", "2023-08-17", "3 MB"],
    ["Navigating the edge: How to successfully build distributed solutions", "navigating-the-edge-how-to-successfully-build-distributed-solutions", "2025-09-17", "1 MB"],
    ["Enterprise Guide to Edge-Native Applications", "enterprise-guide-to-edge-native-applications", "2026-09-03", "7 MB"],
    ["White Paper - Distributed (MEC) applications with Vantiq", "distributed-mec-applications-with-vantiq", "2020-12-22", "17 MB"],
    ["White Paper - The Connected Industries Integration Platform", "the-connected-industries-integration-platform-whitepaper", "2020-12-22", "1 MB"],
    ["Vantiq Development Model Whitepaper", "vantiq-development-model-whitepaper", "2026-09-03", "348 KB"],
    ["White Paper - Event Driven Systems", "event-driven-systems-2", "2020-12-22", "1 MB"],
    ["White Paper - The Modern EDA Landscape", "eda-landscape", "2026-09-03", "442 KB"],
  ],
};

function toResource(row: Row, folder?: ResourceFolder): SalesResource {
  const [title, slug, date, size] = row;
  return { title, href: `${FILE_BASE}${slug}/`, date, size, folder, featured: FEATURED.has(slug) };
}

export const SALES_RESOURCES: SalesResource[] = [
  // Outside every folder on the live site — only listed under Recent Files there.
  toResource(["Vantiq Technical Support Policy", "vantiq-technical-support-policy", "2026-09-16", "342 KB"]),
  ...RESOURCE_FOLDERS.flatMap((folder) => FOLDER_ROWS[folder].map((row) => toResource(row, folder))),
];

export const FEATURED_COUNT = SALES_RESOURCES.filter((r) => r.featured).length;

export function formatResourceDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
