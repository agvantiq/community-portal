// Real, per-course lesson/lab/quiz curriculum — deliberately opt-in per
// course id rather than a fabricated shape applied to every course. A course
// with no entry here just shows "content coming soon" wherever it's
// rendered (LessonAccordion, CourseProgressPanel) instead of invented
// lesson names. Sourced from the real community.vantiq.com course pages
// (PDF exports), course by course, as they're provided — not fabricated.

export interface LessonItem {
  label: string;
  kind: "topic" | "lab" | "quiz";
}

export interface Lesson {
  id: string;
  title: string;
  topics: number;
  quizzes: number;
  /** Only populated where the real curriculum is known; otherwise the
   * lesson still expands, just without fabricated topic names. */
  items?: LessonItem[];
}

export interface CourseContent {
  totalSteps: number;
  introTitle?: string;
  finalExamTitle?: string;
  lessons: Lesson[];
}

export type StepStatus = "done" | "current" | "upcoming";

export interface DemoProgress {
  /** The standalone intro row, on courses that have one. */
  introDone?: boolean;
  /** Lesson id -> how many of that lesson's items are finished. */
  lessons: Record<string, number>;
}

/**
 * PROTOTYPE-ONLY demo progress — NOT real completion data, and deliberately
 * kept out of COURSE_CONTENT above so the two are never confused. The
 * lessons and items there are real (scraped from community.vantiq.com);
 * these numbers are invented purely so the UI can demonstrate its
 * done / in-progress / not-started states. Delete this map (and the
 * `progress` prop threading it through) once real per-user progress exists.
 */
export const DEMO_LESSON_PROGRESS: Record<string, DemoProgress> = {
  "foundation-course": {
    introDone: true,
    // Lesson 1 finished; Lesson 2 partway through (3 of its 8 items).
    lessons: { "lesson-1": 4, "lesson-2": 3 },
  },
  "system-administration": {
    lessons: { "lesson-1": 2 },
  },
  // Finished end to end, so the "completed course" treatment has somewhere
  // to show itself.
  "vantiq-cli": {
    lessons: { "lesson-1": 6 },
  },
};

/** Status of the item at `index`, given how many items in that lesson are done. */
export function stepStatus(doneCount: number, index: number): StepStatus {
  if (index < doneCount) return "done";
  if (index === doneCount && doneCount > 0) return "current";
  return "upcoming";
}

/** A lesson is done when every item is, in progress when some are. */
export function lessonStatus(doneCount: number, totalItems: number): StepStatus {
  if (totalItems > 0 && doneCount >= totalItems) return "done";
  return doneCount > 0 ? "current" : "upcoming";
}

/**
 * Each course/lesson's status is computed independently from its own demo
 * progress, so nothing stops a later item from showing "done" while an
 * earlier one in the same list hasn't been started — e.g. a path where
 * course 4 is 100% but course 3 is untouched. On a progress rail that reads
 * as broken (a completed item stranded below an incomplete one), so any
 * "done" that appears after the first not-done item in display order is
 * clamped back to "upcoming". Genuine done/current/upcoming items before
 * that point are left exactly as computed.
 */
export function clampSequentialStatuses(statuses: StepStatus[]): StepStatus[] {
  let sawIncomplete = false;
  return statuses.map((status) => {
    const clamped = status === "done" && sawIncomplete ? "upcoming" : status;
    if (clamped !== "done") sawIncomplete = true;
    return clamped;
  });
}

/**
 * Steps, the way the real course pages count them: topics and labs count,
 * quizzes don't (e.g. a lesson listed as "4 Topics | 3 Quizzes" shows
 * "0/4 Steps"), so the denominator is the lesson's own `topics` figure.
 */
export function completedSteps(lesson: Lesson, doneCount: number): number {
  if (!lesson.items) return 0;
  return lesson.items.slice(0, doneCount).filter((i) => i.kind !== "quiz").length;
}


export const COURSE_CONTENT: Record<string, CourseContent> = {
  "foundation-course": {
    totalSteps: 42,
    introTitle: "Introduction to Vantiq's Technical Certification Program",
    finalExamTitle: "Final Exam: Applications Developer Level 1",
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Introduction to the Vantiq Platform",
        topics: 2,
        quizzes: 2,
        items: [
          { label: "Vantiq Applications", kind: "topic" },
          { label: "Quiz: Vantiq Applications", kind: "quiz" },
          { label: "Vantiq Application Architecture", kind: "topic" },
          { label: "Quiz: Vantiq Application Architecture", kind: "quiz" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: Vantiq Project Resources",
        topics: 5,
        quizzes: 3,
        items: [
          { label: "Service Sources", kind: "topic" },
          { label: "Lab: Services & Sources", kind: "lab" },
          { label: "Quiz: Service Sources", kind: "quiz" },
          { label: "Schema & Standard Types", kind: "topic" },
          { label: "Quiz: Schema & Standard Types", kind: "quiz" },
          { label: "Simulating Events", kind: "topic" },
          { label: "Lab: Simulating Events", kind: "lab" },
          { label: "Quiz: Simulating Events", kind: "quiz" },
        ],
      },
      {
        id: "lesson-3",
        title: "Lesson 3: Services & Event Handlers",
        topics: 5,
        quizzes: 3,
        items: [
          { label: "Service Event Handlers", kind: "topic" },
          { label: "Quiz: Service Event Handlers", kind: "quiz" },
          { label: "Visual Event Handler Activity Patterns", kind: "topic" },
          { label: "Lab: Service & Visual Event Handler", kind: "lab" },
          { label: "Quiz: Visual Event Handler Activity Patterns", kind: "quiz" },
          { label: "Design Model", kind: "topic" },
          { label: "Lab: Design Model", kind: "lab" },
          { label: "Quiz: Design Model", kind: "quiz" },
        ],
      },
      {
        id: "lesson-4",
        title: "Lesson 4: VAIL",
        topics: 3,
        quizzes: 2,
        items: [
          { label: "VAIL Features", kind: "topic" },
          { label: "Quiz: VAIL Features", kind: "quiz" },
          { label: "App Builder VAIL", kind: "topic" },
          { label: "Quiz: App Builder VAIL", kind: "quiz" },
          { label: "Lab: VAIL Procedures", kind: "lab" },
        ],
      },
      {
        id: "lesson-5",
        title: "Lesson 5: Stateful Services",
        topics: 2,
        quizzes: 1,
        items: [
          { label: "State in Activity Patterns", kind: "topic" },
          { label: "Lab: Maintaining Statistics With State", kind: "lab" },
          { label: "Quiz: Service State", kind: "quiz" },
        ],
      },
      {
        id: "lesson-6",
        title: "Lesson 6: Client Builder",
        topics: 3,
        quizzes: 2,
        items: [
          { label: "The Vantiq Client", kind: "topic" },
          { label: "Quiz: The Vantiq Client", kind: "quiz" },
          { label: "Client Builder Widgets", kind: "topic" },
          { label: "Quiz: Client Builder Widgets", kind: "quiz" },
          { label: "Lab: Building a Real Time Dashboard", kind: "lab" },
        ],
      },
      {
        id: "lesson-7",
        title: "Lesson 7: System Distribution & Collaboration",
        topics: 6,
        quizzes: 3,
        items: [
          { label: "Application System Catalog Architecture", kind: "topic" },
          { label: "Quiz: Application System Catalog Architecture", kind: "quiz" },
          { label: "Lab: The Service Catalog", kind: "lab" },
          { label: "Service Collaborations", kind: "topic" },
          { label: "Quiz: Service Collaborations", kind: "quiz" },
          { label: "Lab: Service Collaborations", kind: "lab" },
          { label: "Vantiq Mobile App Clients", kind: "topic" },
          { label: "Quiz: Vantiq Mobile App Clients", kind: "quiz" },
          { label: "Lab: Vantiq Mobile App Clients", kind: "lab" },
        ],
      },
      {
        id: "lesson-8",
        title: "Lesson 8: Orchestrating AI & Where to Go From Here",
        topics: 6,
        quizzes: 4,
        items: [
          { label: "AI Orchestration", kind: "topic" },
          { label: "Quiz: AI Orchestration", kind: "quiz" },
          { label: "Generative Large Language Models", kind: "topic" },
          { label: "Quiz: Generative Large Language Models", kind: "quiz" },
          { label: "GenAI Builder", kind: "topic" },
          { label: "Quiz: GenAI Builder", kind: "quiz" },
          { label: "LLM Playground", kind: "topic" },
          { label: "Lab: Building an AI Chat Window", kind: "lab" },
          { label: "Quiz: LLM Playground", kind: "quiz" },
          { label: "Continuing Your Learning Journey", kind: "topic" },
        ],
      },
    ],
  },

  // --- Administration Training Path ---

  "vantiq-server-deployment": {
    totalSteps: 8,
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Pre-Deployment Tasks",
        topics: 3,
        quizzes: 0,
        items: [
          { label: "Provisioning Resources", kind: "topic" },
          { label: "Cluster Access Configurations", kind: "topic" },
          { label: "Deployment Configurations", kind: "topic" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: Deployment Steps",
        topics: 3,
        quizzes: 0,
        items: [
          { label: "Vantiq Platform Deployment", kind: "topic" },
          { label: "Vantiq Platform Users", kind: "topic" },
          { label: "Integrated Software Set Up", kind: "topic" },
        ],
      },
    ],
  },

  "system-administration": {
    totalSteps: 8,
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: New Orgs & Users",
        topics: 1,
        quizzes: 1,
        items: [
          { label: "Creating New Orgs & Setting Quotas", kind: "topic" },
          { label: "Quiz: Creating New Orgs & Setting Quotas", kind: "quiz" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: Quotas & Credits",
        topics: 2,
        quizzes: 2,
        items: [
          { label: "Limit & Execution Quotas", kind: "topic" },
          { label: "Quiz: Execution Quotas", kind: "quiz" },
          { label: "Limit & Frequency Quotas", kind: "topic" },
          { label: "Quiz: Limit & Frequency Quotas", kind: "quiz" },
        ],
      },
      {
        id: "lesson-3",
        title: "Lesson 3: Ensuring System Health",
        topics: 2,
        quizzes: 2,
        items: [
          { label: "System Maintenance", kind: "topic" },
          { label: "Quiz: System Maintenance", kind: "quiz" },
          { label: "System Monitoring with Grafana", kind: "topic" },
          { label: "Quiz: System Monitoring with Grafana", kind: "quiz" },
        ],
      },
    ],
  },

  "namespace-and-org-admin": {
    totalSteps: 8,
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Administration Tasks",
        topics: 2,
        quizzes: 2,
        items: [
          { label: "Organization Administration", kind: "topic" },
          { label: "Quiz: Organization Administration", kind: "quiz" },
          { label: "Namespace Administration", kind: "topic" },
          { label: "Quiz: Namespace Administration", kind: "quiz" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: Grafana",
        topics: 4,
        quizzes: 3,
        items: [
          { label: "Grafana", kind: "topic" },
          { label: "Quiz: Grafana", kind: "quiz" },
          { label: "Grafana for Namespaces", kind: "topic" },
          { label: "Lab: Grafana for Namespaces", kind: "lab" },
          { label: "Quiz: Grafana for Namespaces", kind: "quiz" },
          { label: "Grafana for Organizations", kind: "topic" },
          { label: "Quiz: Grafana for Organizations", kind: "quiz" },
        ],
      },
    ],
  },

  "vantiq-cli": {
    totalSteps: 4,
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: The CLI",
        topics: 3,
        quizzes: 3,
        items: [
          { label: "Command Line Interface Installation", kind: "topic" },
          { label: "Quiz: Command Line Interface Installation", kind: "quiz" },
          { label: "CLI DML", kind: "topic" },
          { label: "Quiz: CLI DML", kind: "quiz" },
          { label: "CLI Maintenance Commands", kind: "topic" },
          { label: "Quiz: CLI Maintenance Commands", kind: "quiz" },
        ],
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Step pages
// ---------------------------------------------------------------------------

export type StepKind = "intro" | "topic" | "lab" | "quiz" | "exam";

export interface CourseStep {
  slug: string;
  label: string;
  kind: StepKind;
  status: StepStatus;
  /** The lesson this step belongs to — absent for the intro and final exam. */
  lessonTitle?: string;
}

/** URL-safe id for a step, derived from its label so no hand-written ids drift. */
export function stepSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * A course flattened into the exact order a learner moves through it —
 * intro, then every lesson's items in sequence, then the final exam — so a
 * step page can say "step N of M" and hand off to the next one without
 * re-deriving the ordering at every call site.
 */
export function courseSteps(courseId: string, content: CourseContent): CourseStep[] {
  const progress = DEMO_LESSON_PROGRESS[courseId];
  const steps: CourseStep[] = [];

  if (content.introTitle) {
    steps.push({
      slug: stepSlug(content.introTitle),
      label: content.introTitle,
      kind: "intro",
      status: progress?.introDone ? "done" : "upcoming",
    });
  }

  for (const lesson of content.lessons) {
    const doneCount = progress?.lessons[lesson.id] ?? 0;
    lesson.items?.forEach((item, i) => {
      steps.push({
        slug: stepSlug(item.label),
        label: item.label,
        kind: item.kind,
        status: stepStatus(doneCount, i),
        lessonTitle: lesson.title,
      });
    });
  }

  if (content.finalExamTitle) {
    steps.push({
      slug: stepSlug(content.finalExamTitle),
      label: content.finalExamTitle,
      kind: "exam",
      status: "upcoming",
    });
  }

  return steps;
}

export interface StepContent {
  video?: {
    title: string;
  };
}

/**
 * Per-step page content, keyed `${courseId}/${stepSlug}`. Same opt-in rule as
 * COURSE_CONTENT: only steps whose real material has actually been provided
 * appear here, and everything else renders an honest "not published yet"
 * state rather than invented lesson copy.
 */
export const STEP_CONTENT: Record<string, StepContent> = {
  "foundation-course/introduction-to-vantiq-s-technical-certification-program": {
    video: {
      title: "Introduction — Applications Developer Level 1",
    },
  },
  "foundation-course/vantiq-applications": {
    video: {
      title: "Vantiq Applications — Applications Developer Level 1",
    },
  },
};

export interface StepComment {
  author: string;
  timestamp: string;
  body: string;
}

/**
 * Real discussion comments, keyed the same way as STEP_CONTENT — opt-in
 * only. Sourced verbatim from the real community.vantiq.com thread on this
 * step (the source page showed "3 thoughts", but only one was captured in
 * the reference export, so only that one is reused here rather than
 * inventing the other two).
 */
export const STEP_COMMENTS: Record<string, StepComment[]> = {
  "foundation-course/vantiq-applications": [
    {
      author: "Brett Rudenstein",
      timestamp: "February 8, 2023 at 9:38 PM",
      body: 'You mention an event-driven architecture is designed to facilitate applications that ingest and react to applications very rapidly. While this is something they do it leaves out a core concept of event-driven. For example, "In an event-driven architecture, events are loosely coupled from the systems that produce them and the systems that consume them. This means that changes to one part of the system do not impact other parts, making the system more resilient to change. Additionally, the event-driven architecture enables parallel processing of events, making it well-suited for use in large-scale, high-performance systems."',
    },
  ],
};

export interface QuizQuestion {
  prompt: string;
  options: string[];
  /** "single" (radio, the default) or "multi" for a "check all that apply" question. */
  type?: "single" | "multi";
  /**
   * Indices of the correct option(s). ASSUMED, not sourced from an official
   * answer key — the real community.vantiq.com pages never exposed one.
   * Filled in from domain knowledge of event-driven architecture and the
   * Vantiq platform so the grading UI has something real to demonstrate.
   * Verify against the actual course answer key before this reaches a real
   * learner; a wrong guess here would teach the wrong thing.
   */
  correctAnswers?: number[];
}

export interface QuizContent {
  questions: QuizQuestion[];
}

/**
 * Real per-quiz questions, keyed the same way as STEP_CONTENT — opt-in only,
 * two quizzes populated so far from the real community.vantiq.com pages.
 * `correctAnswers` on each question is a best-effort guess (see its own
 * comment) rather than a verified key, since the source pages didn't publish
 * one and this prototype has no real grading backend.
 */
export const QUIZ_CONTENT: Record<string, QuizContent> = {
  "foundation-course/quiz-vantiq-applications": {
    questions: [
      {
        prompt: 'What best describes an "Event-Driven Application?"',
        options: [
          "One that reacts to important status changes in real-time",
          "One that reacts to anything that happens, important or not",
          "One that sends processing requests, and waits for a response",
        ],
        correctAnswers: [0],
      },
      {
        prompt: "(T/F): One event may be processed multiple times within an event-driven application",
        options: ["True", "False"],
        correctAnswers: [0],
      },
      {
        prompt: "(T/F): Some events may be ignored completely within an event-driven application",
        options: ["True", "False"],
        correctAnswers: [0],
      },
    ],
  },
  "foundation-course/final-exam-applications-developer-level-1": {
    questions: [
      {
        prompt: "What is an event?",
        options: [
          "A request to the system",
          "A change in status",
          "Something that will happen, that the system needs to anticipate",
          "Something the system must always process",
        ],
        correctAnswers: [1],
      },
      {
        prompt: "(T/F) An event-driven application must react to every event it ingests.",
        options: ["True", "False"],
        correctAnswers: [1],
      },
      {
        prompt: "(T/F): Event-driven apps should interact as little as possible with a database",
        options: ["True", "False"],
        correctAnswers: [0],
      },
      {
        prompt: "What is the Vantiq IDE?",
        options: [
          "This is the visual development interface within a Namespace.",
          "Any company that partners with Vantiq",
          "An organized application system on the Vantiq platform",
          "A tenant on the Vantiq platform, with authority to manage users and namespaces",
        ],
        correctAnswers: [0],
      },
      {
        prompt: "What is a Namespace?",
        options: [
          "An isolated workspace for projects in Vantiq",
          "A location in Vantiq to register user names for the system",
          "It's the same thing as a Project",
          "A Vantiq installation is known as a Namespace",
        ],
        correctAnswers: [0],
      },
      {
        prompt: "Check all the ways a Namespace can be created in Vantiq from the IDE:",
        type: "multi",
        options: [
          "Go to Show -> Catalogs, choose New, to create a Catalog Namespace",
          "Go to Projects -> New Project, and the pop up will include an option to create a new Namespace",
          'Go to Add -> Namespace, and choose "+ New"',
          'Go to Administer -> Namespaces, and choose "+ New"',
        ],
        correctAnswers: [1, 3],
      },
    ],
  },
};

/**
 * A whole course's standing, rolled up from the same demo progress its
 * lessons use — so a course row, its lessons, and its steps can never
 * disagree about how far along the learner is.
 */
export function courseCompletion(
  courseId: string,
  content: CourseContent
): { done: number; total: number; status: StepStatus } {
  const progress = DEMO_LESSON_PROGRESS[courseId];

  // A course's step total counts topics and labs, *plus* each lesson itself,
  // plus the intro and final exam — verified against the source course pages
  // (e.g. Foundations: 32 topics + 8 lessons + intro + exam = its stated 42).
  // Completion has to count the same units or a finished course could never
  // reach 100%.
  let done = content.introTitle && progress?.introDone ? 1 : 0;
  for (const lesson of content.lessons) {
    const doneCount = progress?.lessons[lesson.id] ?? 0;
    done += completedSteps(lesson, doneCount);
    if (lessonStatus(doneCount, lesson.items?.length ?? 0) === "done") done += 1;
  }

  return {
    done,
    total: content.totalSteps,
    status: lessonStatus(done, content.totalSteps),
  };
}
