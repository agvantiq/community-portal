// Storage for the 1st-Time Partner dashboard's "Get Started Checklist"
// progress. Deliberately separate from `registered-courses.tsx` (which is
// global, shared across every role/persona in this prototype) — the
// checklist's "enroll" step must only complete from an explicit enrollment
// made through this flow, never inferred from courses registered elsewhere,
// or stale ones left over from earlier testing would make the roadmap appear
// before the partner ever clicked anything.
export const CHECKLIST_STORAGE_KEY = "community-portal-first-time-checklist";

export interface StoredChecklistState {
  checked: Record<string, boolean>;
  profileRole: string | null;
  profileIndustry: string | null;
  /** Whether the "Congratulations" banner (shown once all 3 steps are done) has been closed for good. */
  dismissed: boolean;
}

// Called from the training path pages (Overview, Sales Training) right when
// a first-time partner registers for a path — marks step 2 done without
// this component needing to know anything about the dashboard's other state.
export function markFirstTimeCourseEnrolled() {
  if (typeof window === "undefined") return;
  const stored = window.localStorage.getItem(CHECKLIST_STORAGE_KEY);
  let parsed: Partial<StoredChecklistState> = {};
  try {
    if (stored) parsed = JSON.parse(stored);
  } catch {
    parsed = {};
  }
  const next: StoredChecklistState = {
    checked: { ...parsed.checked, enroll: true },
    profileRole: parsed.profileRole ?? null,
    profileIndustry: parsed.profileIndustry ?? null,
    dismissed: parsed.dismissed ?? false,
  };
  window.localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(next));
}
