export type CourseKey =
  | "vail-fundamentals"
  | "edge-ai-architecture"
  | "edge-deployment-patterns"
  | "real-time-event-orchestration"
  | "building-custom-connectors"
  | "sales-training";

export interface CourseColumn {
  key: CourseKey;
  label: string;
  shortLabel: string;
  track: "technical" | "sales";
}

export const COURSE_COLUMNS: CourseColumn[] = [
  { key: "vail-fundamentals", label: "VAIL Fundamentals", shortLabel: "VAIL Fund.", track: "technical" },
  { key: "edge-ai-architecture", label: "Edge AI Architecture Deep Dive", shortLabel: "Edge AI", track: "technical" },
  { key: "edge-deployment-patterns", label: "Edge Deployment Patterns", shortLabel: "Edge Deploy.", track: "technical" },
  {
    key: "real-time-event-orchestration",
    label: "Real-Time Event Orchestration",
    shortLabel: "Event Orch.",
    track: "technical",
  },
  { key: "building-custom-connectors", label: "Building Custom Connectors", shortLabel: "Connectors", track: "technical" },
  { key: "sales-training", label: "Sales Training", shortLabel: "Sales", track: "sales" },
];

const TECH_COURSE_KEYS = COURSE_COLUMNS.filter((c) => c.track === "technical").map((c) => c.key);

export interface Employee {
  id: string;
  name: string;
  track: "technical" | "sales";
  progress: Partial<Record<CourseKey, number>>;
}

const TECH_NAMES = [
  "Alex Rivera",
  "Maya Chen",
  "Derek Osei",
  "Lucia Fernandez",
  "Ravi Patel",
  "Naomi Wallace",
  "Tomás Ibarra",
  "Grace Kim",
  "Ethan Brooks",
  "Aisha Bello",
  "Noah Kessler",
  "Priya Deshmukh",
  "Liam O'Connell",
  "Sofia Marchetti",
  "Kwame Owusu",
  "Elena Petrova",
  "Marcus Bennett",
  "Yuki Tanaka",
  "Isabella Rossi",
  "Omar Haddad",
];

const SALES_NAMES = [
  "Priya Nair",
  "Connor Walsh",
  "Fatima Al-Sayed",
  "Ben Whitfield",
  "Camila Souza",
  "Tyler Grant",
  "Ingrid Solberg",
  "Devon Marsh",
  "Renee Dupont",
  "Hassan Malik",
];

// Deterministic seeded PRNG so the roster is stable across server/client renders.
function seededRandom(seed: number) {
  let t = seed;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seededRandom(42);

function buildTechEmployee(name: string, index: number): Employee {
  const courseCount = 1 + Math.floor(rand() * 3); // 1-3 assigned courses
  const shuffled = [...TECH_COURSE_KEYS].sort(() => rand() - 0.5);
  const assigned = shuffled.slice(0, courseCount);
  const progress: Partial<Record<CourseKey, number>> = {};
  assigned.forEach((key) => {
    progress[key] = rand() < 0.4 ? 100 : Math.round(20 + rand() * 70);
  });
  return { id: `emp-tech-${index}`, name, track: "technical", progress };
}

function buildSalesEmployee(name: string, index: number): Employee {
  const value = rand() < 0.4 ? 100 : Math.round(15 + rand() * 75);
  return { id: `emp-sales-${index}`, name, track: "sales", progress: { "sales-training": value } };
}

export const INITIAL_EMPLOYEES: Employee[] = [
  ...TECH_NAMES.map((name, i) => buildTechEmployee(name, i)),
  ...SALES_NAMES.map((name, i) => buildSalesEmployee(name, i)),
];

/** Total course completions the partner org and Vantiq have agreed unlock org certification. */
export const CERTIFICATION_THRESHOLD = 25;

export function countCompletions(employees: Employee[]): number {
  return employees.reduce((sum, emp) => sum + Object.values(emp.progress).filter((v) => v === 100).length, 0);
}

export function courseStats(employees: Employee[], key: CourseKey) {
  const enrolled = employees.filter((e) => e.progress[key] !== undefined);
  const completed = enrolled.filter((e) => e.progress[key] === 100);
  return { enrolled: enrolled.length, completed: completed.length };
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
