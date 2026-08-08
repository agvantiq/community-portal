export type Role =
  | "onboarding"
  | "technical-partner"
  | "first-time-partner"
  | "customer"
  | "employee"
  | "admin"
  | "exec"
  | "guest";

export interface RoleInfo {
  id: Role;
  label: string;
  description: string;
  user: { name: string; title: string; org: string | null; email: string };
}

export const ROLES: Record<Role, RoleInfo> = {
  onboarding: {
    id: "onboarding",
    label: "Onboarding Experience",
    description: "Preview of what a signed-out visitor sees before joining the portal",
    user: {
      name: "Visitor",
      title: "Not Signed In",
      org: null,
      email: "",
    },
  },
  "technical-partner": {
    id: "technical-partner",
    label: "Partner",
    description: "Systems integrator or ISV engineer building on Vantiq",
    user: {
      name: "Alex Rivera",
      title: "Partner Solutions Engineer",
      org: "Radenta Tech",
      email: "alex.rivera@radentatech.com",
    },
  },
  "first-time-partner": {
    id: "first-time-partner",
    label: "1st Time Partner Flow",
    description: "Demo of a brand-new partner's first landing on the community portal",
    user: {
      name: "Jordan Lee",
      title: "New Partner",
      org: "Northbridge Solutions",
      email: "jordan.lee@northbridgesolutions.com",
    },
  },
  customer: {
    id: "customer",
    label: "Customer",
    description: "Vantiq customer — same access as a Partner, minus Sales Hub and course-progress tracking",
    user: {
      name: "Priya Nair",
      title: "Platform Lead",
      org: "Meridian Logistics",
      email: "priya.nair@meridianlogistics.com",
    },
  },
  employee: {
    id: "employee",
    label: "Vantiq Employee",
    description: "Internal Vantiq team member",
    user: { name: "Sam Chen", title: "Solutions Engineer", org: "Vantiq", email: "sam.chen@vantiq.com" },
  },
  admin: {
    id: "admin",
    label: "Vantiq Admin",
    description: "Internal admin with portal analytics access",
    user: {
      name: "Morgan Blake",
      title: "Program Administrator",
      org: "Vantiq",
      email: "morgan.blake@vantiq.com",
    },
  },
  exec: {
    id: "exec",
    label: "Partner Admin",
    description: "Partner-side executive tracking org readiness",
    user: {
      name: "Taylor Brooks",
      title: "VP, Partnerships",
      org: "Radenta Tech",
      email: "taylor.brooks@radentatech.com",
    },
  },
  guest: {
    id: "guest",
    label: "Guest",
    description: "Signed in with a personal email, not a recognized partner company domain",
    user: { name: "Guest", title: "Exploring Vantiq", org: null, email: "guest@gmail.com" },
  },
};

export const ROLE_LIST: RoleInfo[] = Object.values(ROLES);

export const DEFAULT_ROLE: Role = "onboarding";

export const ROLE_STORAGE_KEY = "community-portal-role";

// The name a visitor enters on the registration form (see app/register/page.tsx),
// carried over to the "onboarding" persona's display name so the account chip
// reflects who actually signed up instead of the generic "Visitor" placeholder.
export const VISITOR_NAME_STORAGE_KEY = "community-portal-visitor-name";
