// Sales Hub content. Key Collaterals, Customer Pitch Collateral, and Project
// Sizing & Pricing below back pages that exist but are intentionally unlinked
// from navigation (see components/shell/app-sidebar.tsx's Phase 2 note) — the
// data stays here so those pages keep working directly by URL. Deal data
// itself (DEALS, Deal, DealStage) stays in sample-data.ts since it's also used
// by the Partner Admin dashboard — deal-stage visibility ("the pipeline") is
// exec-only; everyone else only gets Deal Registration.

// --- Key Collaterals (/sales-center/key-collaterals) ---
export const DATASHEETS_AND_WHITEPAPERS = [
  { title: "Vantiq Platform Datasheet", detail: "A one-page technical summary of the platform." },
  { title: "Vantiq Solution Overview", detail: "How Vantiq's capabilities map to a customer's problem." },
  { title: "Vantiq Agentic AI", detail: "Positioning and capabilities for agentic AI use cases." },
];

export const INDUSTRY_SOLUTION_BRIEFS = [
  { title: "Healthcare", detail: "Reference architecture and positioning for healthcare deployments." },
  { title: "Public Safety", detail: "Reference architecture and positioning for public safety deployments." },
  { title: "Defense", detail: "Reference architecture and positioning for defense deployments." },
  { title: "Smart Cities", detail: "Reference architecture and positioning for smart city deployments." },
];

export interface DemoVideo {
  title: string;
  detail: string;
  category: string;
  href: string;
  thumbnail: string;
}

// Mirrors Vantiq's public demo library (vantiq.com/demos) — pre-recorded reels for
// outbound/campaigns, distinct from the interactive Flagship Demos, which are live,
// industry-specific walkthroughs a partner runs themselves in front of a prospect.
// Each entry opens the real hosted video on vantiq.com in a new tab.
export const MARKETING_DEMOS: DemoVideo[] = [
  {
    title: "Agentic AI in Manufacturing Demo",
    category: "Manufacturing",
    detail: "Event-driven AI monitors the factory floor and coordinates automated responses to anomalies.",
    href: "https://vantiq.com/demos/agentic-ai-in-manufacturing-demo/",
    thumbnail: "/images/demo-videos/agentic-ai-in-manufacturing-demo.jpg",
  },
  {
    title: "Remote Patient Monitoring Demo",
    category: "Healthcare",
    detail: "Real-time home health monitoring that surfaces alerts and AI guidance for care teams.",
    href: "https://vantiq.com/demos/remote-patient-monitoring-demo/",
    thumbnail: "/images/demo-videos/remote-patient-monitoring-demo.jpg",
  },
  {
    title: "Heatstroke Monitoring and Prevention for Field Operations",
    category: "Public Safety",
    detail: "Wearable and weather data flag heat-stress risk and trigger safety responses for field crews.",
    href: "https://vantiq.com/demos/heatstroke-monitoring-and-prevention-for-field-operations/",
    thumbnail: "/images/demo-videos/heatstroke-monitoring-and-prevention-for-field-operations.jpg",
  },
  {
    title: "Real-Time Disaster Response Monitoring Application",
    category: "Public Safety",
    detail: "Multi-sensor monitoring that detects, tracks, and coordinates response to emergency scenarios live.",
    href: "https://vantiq.com/demos/real-time-disaster-response-monitoring-application/",
    thumbnail: "/images/demo-videos/real-time-disaster-response-monitoring-application.jpg",
  },
  {
    title: "Building an Automated PDF Ingestion and Monitoring App",
    category: "Healthcare",
    detail: "Automatically scrapes, tracks changes in, and stores documents pulled from multiple websites.",
    href: "https://vantiq.com/demos/building-an-automated-pdf-ingestion-and-monitoring-app/",
    thumbnail: "/images/demo-videos/building-an-automated-pdf-ingestion-and-monitoring-app.jpg",
  },
  {
    title: "Firefighter Safety Monitoring Application",
    category: "Public Safety",
    detail: "Wearables, drone feeds, and weather combine into one dashboard with automated safety alerts.",
    href: "https://vantiq.com/demos/firefighter-safety-monitoring-application/",
    thumbnail: "/images/demo-videos/firefighter-safety-monitoring-application.jpg",
  },
  {
    title: "Agentic AI for Home Health Care Planning",
    category: "Agentic AI",
    detail: "Agentic AI drafts personalized home care plans that managers review and adjust in real time.",
    href: "https://vantiq.com/demos/agentic-ai-for-home-health-care-planning/",
    thumbnail: "/images/demo-videos/agentic-ai-for-home-health-care-planning.jpg",
  },
  {
    title: "Building Agentic AI Applications Demo",
    category: "Healthcare",
    detail: "Live device data, EHRs, and AI combine to auto-detect clinical issues and alert care teams.",
    href: "https://vantiq.com/demos/building-agentic-ai-applications-demo/",
    thumbnail: "/images/demo-videos/building-agentic-ai-applications-demo.jpg",
  },
  {
    title: "Smart City Demo",
    category: "Smart City",
    detail: "Citywide infrastructure, utilities, and public safety data unified into one real-time operational view.",
    href: "https://vantiq.com/demos/smart-city-demo/",
    thumbnail: "/images/demo-videos/smart-city-demo.jpg",
  },
  {
    title: "Transaction Monitoring Demo",
    category: "Finance",
    detail: "AI-driven monitoring flags anomalous transactions instantly so compliance teams can act before risk escalates.",
    href: "https://vantiq.com/demos/transaction-monitoring-demo/",
    thumbnail: "/images/demo-videos/transaction-monitoring-demo.jpg",
  },
  {
    title: "Disaster Management Demo",
    category: "Public Safety",
    detail: "Live data, AI, and operational workflows coordinate disaster response and guide citizens to safety.",
    href: "https://vantiq.com/demos/disaster-management-demo/",
    thumbnail: "/images/demo-videos/disaster-management-demo.jpg",
  },
  {
    title: "Coordinating Ambulance Transport in Real Time",
    category: "Healthcare",
    detail: "Live coordination between ambulances, hospitals, and care teams for faster emergency response.",
    href: "https://vantiq.com/demos/coordinating-ambulance-transport-in-real-time/",
    thumbnail: "/images/demo-videos/coordinating-ambulance-transport-in-real-time.jpg",
  },
  {
    title: "Multi AI-Agent Demo",
    category: "Manufacturing",
    detail: "Multiple specialized AI agents work together to monitor, diagnose, and act on the factory floor.",
    href: "https://vantiq.com/demos/multi-ai-agent-demo/",
    thumbnail: "/images/demo-videos/multi-ai-agent-demo.jpg",
  },
];

export const CUSTOMER_PITCH_COLLATERAL = [
  "Executive Overview Deck",
  "ROI Calculator",
  "Reference Architecture One-Pager",
];

export const PROJECT_SIZING_PRICING = ["2026 Price List (Partners)", "Sizing Worksheet", "SOW Template"];
