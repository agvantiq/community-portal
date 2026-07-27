// Sales Hub content. The hub landing page (app/sales-center/page.tsx) renders
// one module block per section here; each block links to its own dedicated
// page rather than an in-page anchor. Deal data itself (DEALS, Deal, DealStage)
// stays in sample-data.ts since it's also used by the admin dashboard.

import {
  ClipboardList,
  FilePlus2,
  Zap,
  Presentation,
  Users2,
  Megaphone,
  FileText,
  Calculator,
  type LucideIcon,
} from "lucide-react";
import { FLAGSHIP_INDUSTRIES } from "@/lib/flagship-industries";

export const VANTIQ_SPARK_ITEMS = [
  { title: "Rapid Prototype Builder", detail: "Spin up a branded proof-of-concept in under an hour." },
  { title: "Discovery Question Bank", detail: "Qualifying questions mapped to Vantiq use cases." },
  { title: "Solution Sizing Estimator", detail: "Quick-turn scoping numbers for a first customer call." },
];

export const TEAMING_REQUESTS = [
  { label: "Looking for a Systems Integrator", detail: "Multi-site manufacturing rollout" },
  { label: "Looking for a Hardware Partner", detail: "Edge compute nodes for cold-chain sensors" },
  { label: "Looking for a Domain Expert", detail: "Healthcare compliance (HIPAA) review" },
  { label: "Looking for an App Developer", detail: "Custom dashboard for logistics client" },
];

export const MARKETING_COLLATERAL = [
  { title: "Vantiq Brand Guidelines", type: "PDF" },
  { title: "Co-Branded Email Templates", type: "ZIP" },
  { title: "Social Media Asset Pack", type: "ZIP" },
  { title: "Partner Logo Kit", type: "ZIP" },
];

export const CUSTOMER_PITCH_COLLATERAL = [
  "Executive Overview Deck",
  "ROI Calculator",
  "Reference Architecture One-Pager",
];

export const PROJECT_SIZING_PRICING = ["2026 Price List (Partners)", "Sizing Worksheet", "SOW Template"];

export interface SalesHubModule {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  /** Item count shown as a badge. Omit for action-oriented modules (e.g. a form) with no list to count. */
  count?: number;
}

export const SALES_HUB_MODULES: SalesHubModule[] = [
  {
    id: "pipeline",
    title: "Deal Pipeline",
    description: "Every deal in flight across the partner ecosystem, by stage.",
    icon: ClipboardList,
    href: "/sales-center/pipeline",
    // count is filled in on the landing page from the live DEALS array
  },
  {
    id: "deal-registration",
    title: "Deal Registration",
    description: "Register a new lead and get it into the pipeline.",
    icon: FilePlus2,
    href: "/sales-center/deal-registration",
  },
  {
    id: "vantiq-spark",
    title: "Vantiq Spark",
    description: "Quick-turn tools for the first customer conversation.",
    icon: Zap,
    href: "/sales-center/vantiq-spark",
    count: VANTIQ_SPARK_ITEMS.length,
  },
  {
    id: "flagship-demos",
    title: "Vantiq Flagship Demos",
    description: "End-to-end demos ready for customer meetings.",
    icon: Presentation,
    href: "/sales-center/flagship-demos",
    count: FLAGSHIP_INDUSTRIES.length,
  },
  {
    id: "teaming-hub",
    title: "Deal Teaming Hub",
    description: "Find a partner to team up with on an active opportunity.",
    icon: Users2,
    href: "/sales-center/teaming-hub",
    count: TEAMING_REQUESTS.length,
  },
  {
    id: "marketing-collateral",
    title: "Marketing Collateral",
    description: "Brand assets, templates, and co-marketing materials.",
    icon: Megaphone,
    href: "/sales-center/marketing-collateral",
    count: MARKETING_COLLATERAL.length,
  },
  {
    id: "customer-pitch",
    title: "Customer Pitch Collateral",
    description: "Decks and calculators for the customer-facing pitch.",
    icon: FileText,
    href: "/sales-center/customer-pitch",
    count: CUSTOMER_PITCH_COLLATERAL.length,
  },
  {
    id: "project-sizing",
    title: "Project Sizing & Pricing",
    description: "Worksheets and templates for scoping and pricing a deal.",
    icon: Calculator,
    href: "/sales-center/project-sizing",
    count: PROJECT_SIZING_PRICING.length,
  },
];
