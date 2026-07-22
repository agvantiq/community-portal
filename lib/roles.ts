export type Role = "partner" | "customer" | "employee" | "admin" | "exec" | "guest";

export interface RoleInfo {
  id: Role;
  label: string;
  description: string;
  user: { name: string; title: string; org: string | null };
}

export const ROLES: Record<Role, RoleInfo> = {
  partner: {
    id: "partner",
    label: "Partner",
    description: "Systems integrator or ISV building on Vantiq",
    user: { name: "Alex Rivera", title: "Partner Solutions Engineer", org: "Radenta Tech" },
  },
  customer: {
    id: "customer",
    label: "Customer",
    description: "Enterprise customer running Vantiq in production",
    user: { name: "Jordan Lee", title: "IT Director", org: "Globex Manufacturing" },
  },
  employee: {
    id: "employee",
    label: "Vantiq Employee",
    description: "Internal Vantiq team member",
    user: { name: "Sam Chen", title: "Solutions Engineer", org: "Vantiq" },
  },
  admin: {
    id: "admin",
    label: "Vantiq Admin",
    description: "Internal admin with portal analytics access",
    user: { name: "Morgan Blake", title: "Program Administrator", org: "Vantiq" },
  },
  exec: {
    id: "exec",
    label: "Partner Exec",
    description: "Partner-side executive tracking org readiness",
    user: { name: "Taylor Brooks", title: "VP, Partnerships", org: "Radenta Tech" },
  },
  guest: {
    id: "guest",
    label: "Guest",
    description: "Not yet signed in or registered",
    user: { name: "Guest", title: "Exploring Vantiq", org: null },
  },
};

export const ROLE_LIST: RoleInfo[] = Object.values(ROLES);

export const DEFAULT_ROLE: Role = "partner";

export const ROLE_STORAGE_KEY = "community-portal-role";
