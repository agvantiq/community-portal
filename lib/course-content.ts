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
  /** The course page's own description, verbatim from community.vantiq.com: a string is a paragraph, a string[] a bullet list. */
  intro?: (string | string[])[];
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
  "applications-developer-level-1": {
    introDone: true,
    // Lesson 1 finished; Lesson 2 partway through (3 of its 8 items).
    lessons: { "lesson-1": 4, "lesson-2": 3 },
  },
  "vantiq-system-administration": {
    lessons: { "lesson-1": 2 },
  },
  // Finished end to end, so the "completed course" treatment has somewhere
  // to show itself.
  "vantiq-command-line-interface-2": {
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
  "applications-developer-level-1": {
    totalSteps: 42,
    intro: [
      "This is the Vantiq Application Developer Foundations Course!",
      "Here is where you will go from complete novice to experienced developer of a basic but wide-ranging, practical, distributed event-driven application. Course is composed of 1.5 hours of videos and around 8.5 hours of lab work.",
      "This class consists of:",
      ["25 Video Lectures (all under 6 minutes long!)", "25 Quizzes", "12 Hands-On Labs"],
    ],
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





  // --- Generated from the live community.vantiq.com course pages (2026-09-24): real lessons, topics, labs and
  // quizzes, and each course's own description. Labels drop the source's numbering, matching the entries above.
  "vantiq-edge-2": {
    totalSteps: 8,
    intro: [
      "Vantiq servers can run in the Cloud, but they can also run on inexpensive microcontroller devices. This is Vantiq on the Edge, and the advantages are many:",
      ["Ingest and process events near their sources, avoiding network latency", "Bring up extra computing power only as needed, saving time and expense", "Run applications completely off-line, or where network access is spotty", "Distribute applications between the Edge and Cloud, taking advantage of the strengths of both"],
      "This class consists of:",
      ["3 Video Lectures", "3 Lecture Quizzes", "2 Hands-On Labs"],
      "After completing the class, students will have the knowledge and experience needed to install, run and bootstrap projects on Edge devices, as well as to distribute projects across Edge and Cloud installations.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Vantiq at the Edge",
        topics: 2,
        quizzes: 1,
        items: [
          { label: "Vantiq at the Edge", kind: "topic" },
          { label: "Lab: Vantiq at the Edge", kind: "lab" },
          { label: "Quiz: Vantiq at the Edge", kind: "quiz" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: Bootstrapping Edge Nodes",
        topics: 1,
        quizzes: 1,
        items: [
          { label: "Bootstrapping Edge Nodes", kind: "topic" },
          { label: "Quiz: Bootstrapping Edge Nodes", kind: "quiz" },
        ],
      },
      {
        id: "lesson-3",
        title: "Lesson 3: Edge Tools",
        topics: 2,
        quizzes: 1,
        items: [
          { label: "Edge Tools", kind: "topic" },
          { label: "Lab: Bootstrapping and Edge Tools", kind: "lab" },
          { label: "Quiz: Edge Tools", kind: "quiz" },
        ],
      }
    ],
  },
  "the-via-and-kb-mcp-servers": {
    totalSteps: 0,
    intro: [
      "Caution: It is highly recommended that developers take the Vantiq Application Developer Foundations Course before using these MCP servers. This free Vantiq Academy class gives a strong and sweeping overview of the whole platform, as well as hands-on lab experience in building practical event-driven, AI-integrated application. This knowledge will allow the developer to give informed feedback to the AI Assistant during development.",
      "Vantiq’s new VIA MCP server is designed to greatly reduce application development time on the Vantiq platform. Developers work in tandem with an AI Assistant using this server (generally Claude Code) and VIA provides the means to build most parts of the project.",
      "Vantiq’s KB server is designed to answer developer questions about application design and how to work in the IDE.",
      "Together, these two servers facilitate development success and developer understanding of what they are building.",
    ],
    lessons: [
    ],
  },
  "vantiq-version-control-system": {
    totalSteps: 2,
    intro: [
      "Vantiq’s VCS allows developers to save their projects in files that can be versioned by the versioning software of choice. Prior knowledge and installation of Vantiq’s CLI tool is required.",
      "This class consists of:",
      ["One video lecture", "One quiz", "One hands on lab"],
      "These will give students the knowledge and skills they need to use the VCS effectively, even for merging projects in a namespace.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: The Vantiq VCS",
        topics: 1,
        quizzes: 1,
        items: [
          { label: "Lab: Using Vantiq’s VCS", kind: "lab" },
          { label: "Quiz: The Vantiq VCS", kind: "quiz" },
        ],
      }
    ],
  },
  "advanced-genai-applications": {
    totalSteps: 15,
    intro: [
      "Generative AI’s capabilities continue to evolve, and Vantiq’s capabilities evolve, too.",
      "Class Prerequisites:",
      ["AI Vantiq Developer Foundations Course", "VAIL AI"],
      "Software Requirements:",
      ["Subscription to a supported generative LLM, preferably OpenAI ChatGPT4.x", "Vantiq installation login with Developer privileges", "API Key from Tavily"],
      "In this elective, students will deepen their Vantiq application skills by learning how to:",
      ["Construct sophisticated Generative AI functionality in the GenAI Builder", "Learn how to call GenAI procedures from Visual Event Handler tasks, from the Client, or from a Client Conversation widget"],
      "This class consists of:",
      ["7 Video Lectures", "7 Quizzes", "3 Hands-On Labs (which can be done all at once if desired)"],
      "All told, students should expect to spend about 6 hours to complete all of the work.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: GenAI Builder Basics",
        topics: 4,
        quizzes: 4,
        items: [
          { label: "GenAI Builder", kind: "topic" },
          { label: "Quiz: GenAI Builder", kind: "quiz" },
          { label: "GenAI Resource Components", kind: "topic" },
          { label: "Quiz: GenAI Resource Components", kind: "quiz" },
          { label: "GenAI Code Components", kind: "topic" },
          { label: "Quiz: GenAI Code Components", kind: "quiz" },
          { label: "GenAI Iteration Components", kind: "topic" },
          { label: "Quiz: GenAI Iteration Components", kind: "quiz" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: RAG Management",
        topics: 3,
        quizzes: 2,
        items: [
          { label: "Document Management Components", kind: "topic" },
          { label: "Quiz: Document Management Components", kind: "quiz" },
          { label: "Document Retrieval Components", kind: "topic" },
          { label: "Quiz: Document Retrieval Components", kind: "quiz" },
          { label: "Lab: Using the GenAI Builder", kind: "lab" },
        ],
      },
      {
        id: "lesson-3",
        title: "Lesson 3: Guardrails",
        topics: 1,
        quizzes: 1,
        items: [
          { label: "Guardrails", kind: "topic" },
          { label: "Quiz: Guardrails", kind: "quiz" },
        ],
      },
      {
        id: "lesson-4",
        title: "Lesson 4: Conversation Management",
        topics: 3,
        quizzes: 2,
        items: [
          { label: "Collaborations", kind: "topic" },
          { label: "Quiz: Collaborations", kind: "quiz" },
          { label: "Conversations in the Client", kind: "topic" },
          { label: "Lab: Manage a Contextual Conversation", kind: "lab" },
          { label: "Quiz: Conversation Widget", kind: "quiz" },
        ],
      }
    ],
  },
  "app-components": {
    totalSteps: 6,
    intro: [
      "Components allow developers to modularize functionality to make it repeatable and simpler for others to use.",
      "This short course will explain how to:",
      ["Identify good use cases for Components", "How to author App and GenAI Components", "How to make Components more flexible without making them too complex for Consumers to use", "How to use Components as a consumer"],
      "In all, the course entails:",
      ["4 video lectures", "4 quizzes", "1 hands-on lab"],
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Components",
        topics: 5,
        quizzes: 4,
        items: [
          { label: "Components", kind: "topic" },
          { label: "Quiz: Creating App Components", kind: "quiz" },
          { label: "Creating App Components", kind: "topic" },
          { label: "Quiz: Quiz: Creating App Components", kind: "quiz" },
          { label: "Configuring & Consuming App Components", kind: "topic" },
          { label: "Quiz: Configuring App Components", kind: "quiz" },
          { label: "GenAI Custom Components", kind: "topic" },
          { label: "Quiz: GenAI Custom Components", kind: "quiz" },
          { label: "Lab: Create and Consume an App Component", kind: "lab" },
        ],
      }
    ],
  },
  "vail-procedures": {
    totalSteps: 8,
    finalExamTitle: "Final Exam",
    intro: [
      "VAIL, which stands for the the Vantiq Application Integration Language, is Vantiq’s proprietary platform language, designed to meet event-driven, multi-tenancy and asynchronous processing needs in applications.",
      "Developers write two kinds of logic in VAIL.",
      "One is a Rule, which is code that execute when triggered by a certain event condition. The other is a Procedure, which is invoked by name or property, and returns something to the caller.",
      "In this class, you’ll learn how to write effective Procedures and learn much about how they behave in Vantiq’s event driven platform.",
      "This elective consists of:",
      ["4 video lectures", "4 quizzes", "Final Exam"],
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: VAIL Procedure Language",
        topics: 6,
        quizzes: 6,
        items: [
          { label: "Procedures, Tools & Skills", kind: "topic" },
          { label: "Quiz: Procedures, Tools & Skills", kind: "quiz" },
          { label: "Procedure Declarations", kind: "topic" },
          { label: "Quiz: Procedure Declarations", kind: "quiz" },
          { label: "The WITH Clause & Dynamic Procedure Calls", kind: "topic" },
          { label: "Quiz: The WITH Clause & Dynamic Procedure Calls", kind: "quiz" },
          { label: "Stateful Service Procedures", kind: "topic" },
          { label: "Quiz: Stateful Service Procedures", kind: "quiz" },
          { label: "Remote Processing", kind: "topic" },
          { label: "Quiz: Remote Processing", kind: "quiz" },
          { label: "Tracing & Autopsies", kind: "topic" },
          { label: "Quiz: Tracing & Autopsies", kind: "quiz" },
        ],
      }
    ],
  },
  "vail-ai": {
    totalSteps: 15,
    intro: [
      "This class is for students who want to learn how to use AI in VAIL code.",
      "Prerequisites:",
      ["AI Application Developers Foundations Course", "VAIL Procedures Class"],
      "Purpose:",
      "VAIL is Vantiq’s proprietary platform language. In this class, we will explore",
      ["how VAIL procedures are evaluated and executed by large language models as Tools", "built-in Service types and procedures used in VAIL code that facilitate critical AI functionality"],
      "Objectives:",
      ["Learn how to create Tools that LLMs can evaluate and call automatically for run-time conditions", "Gain exposure to the many Vantiq Services that cater to AI needs in VAIL code", "Gain experience working with some of the Service features that cater to AI needs in VAIL code"],
      "Class Contents (Estimated 6 hours to complete):",
      ["6 Video Lectures", "6 Quizzes", "5 Hands-On Labs"],
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Tools",
        topics: 3,
        quizzes: 2,
        items: [
          { label: "AI Tools", kind: "topic" },
          { label: "Quiz: AI Tools", kind: "quiz" },
          { label: "LLM Service", kind: "topic" },
          { label: "Lab: Build Your Own AI Tools", kind: "lab" },
          { label: "Quiz: LLM Service", kind: "quiz" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: Prompt Management",
        topics: 2,
        quizzes: 1,
        items: [
          { label: "Template Service", kind: "topic" },
          { label: "Lab: Building & Using a Prompt Template", kind: "lab" },
          { label: "Quiz: Template Service", kind: "quiz" },
        ],
      },
      {
        id: "lesson-3",
        title: "Lesson 3: VAIL Conversation Management",
        topics: 4,
        quizzes: 2,
        items: [
          { label: "ChatMessage and ConversationMemory Services", kind: "topic" },
          { label: "Lab: VAIL Conversation Management", kind: "lab" },
          { label: "Quiz: ChatMessage and ConversationMemory Services", kind: "quiz" },
          { label: "Callback Service", kind: "topic" },
          { label: "Lab: Adding a Callback to a Conversation", kind: "lab" },
          { label: "Quiz: Callback Service", kind: "quiz" },
        ],
      },
      {
        id: "lesson-4",
        title: "Lesson 4: Retrieval-Augmented Generative AI",
        topics: 2,
        quizzes: 1,
        items: [
          { label: "SemanticSearch Service", kind: "topic" },
          { label: "Lab: Performing Semantic Searches", kind: "lab" },
          { label: "Quiz: SemanticSearch Service", kind: "quiz" },
        ],
      }
    ],
  },
  "ai-multi-agent-architecture": {
    totalSteps: 10,
    intro: [
      "This class contains:",
      ["5 video lectures", "5 quizzes", "4 hands-on labs"],
      "By the end of this class, students should feel comfortable:",
      ["Understanding how Agents work in Vantiq applications", "Creating and configuring Agents on the platform, complete with Skills", "Utilizing a LLM Planning Pattern for an Orchestrating Agent", "Working in the Vantiq Client with Agents", "Using A2A and Agent Service types and procedures to get the most out of your Agents"],
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Multi-Agent Architecture",
        topics: 9,
        quizzes: 5,
        items: [
          { label: "Agents", kind: "topic" },
          { label: "Lab: Create Agents and Skills", kind: "lab" },
          { label: "Quiz: Agents", kind: "quiz" },
          { label: "LLM Planning Patterns", kind: "topic" },
          { label: "Lab: LLM Planning Patterns", kind: "lab" },
          { label: "Quiz: LLM Planning Patterns", kind: "quiz" },
          { label: "Discussions", kind: "topic" },
          { label: "Lab: Create and Use a Discussion Widget", kind: "lab" },
          { label: "Quiz: Discussions", kind: "quiz" },
          { label: "A2A Protocol and Features", kind: "topic" },
          { label: "Quiz: A2A Protocol and Features", kind: "quiz" },
          { label: "The Agent Service", kind: "topic" },
          { label: "Lab: Using A2A Protocol and Agent Service Features", kind: "lab" },
          { label: "Quiz: The Agent Service", kind: "quiz" },
        ],
      }
    ],
  },
  "visual-event-handler-ai-features": {
    totalSteps: 8,
    intro: [
      "This course is designed for students who:",
      ["Have already taken the Vantiq Application Developer Foundations class", "Intend to integrate AI into their Services, primarily through Visual Event Handlers"],
      "Within this (estimated 3 hours) Course:",
      ["4 Video Lectures", "4 Video Quizzes", "2 Hands-On Labs"],
      "Students who successfully complete the lectures and labs should feel very comfortable adding AI, semantic search results, and Collaboration AI conversation management to their Event-Driven Architected projects.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: AI Activity Patterns",
        topics: 4,
        quizzes: 3,
        items: [
          { label: "SubmitPrompt", kind: "topic" },
          { label: "Quiz: SubmitPrompt", kind: "quiz" },
          { label: "AnswerQuestion", kind: "topic" },
          { label: "Lab: Build Your Own RAG Application", kind: "lab" },
          { label: "Quiz: AnswerQuestion", kind: "quiz" },
          { label: "GenAIFlow", kind: "topic" },
          { label: "Quiz: GenAIFlow", kind: "quiz" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: Conversation Management in VEH Collaborations",
        topics: 2,
        quizzes: 1,
        items: [
          { label: "Conversation Management with Collaboration Activity Patterns", kind: "topic" },
          { label: "Lab: Manage a Conversation with a VEH Collaboration", kind: "lab" },
          { label: "Quiz: Collaboration Activity Patterns", kind: "quiz" },
        ],
      }
    ],
  },
  "vantiqs-testing-tools": {
    totalSteps: 6,
    intro: [
      "Testing is hugely important for validating data, making sure your applications can handle unexpected input, and making sure regressions don’t sneak into the application system over time.",
      "Vantiq’s testing tools make building and automating tests a very straightforward process.",
      "This elective consists of:",
      ["4 Lecture Videos", "4 Quizzes", "1 Hands-On Lab"],
      "Once you’ve completed the course, you should be sufficiently adept at creating Unit and Integration tests, so that you can transfer those skills to your own projects.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Vantiq’s Testing Tools",
        topics: 5,
        quizzes: 4,
        items: [
          { label: "The Testing Process", kind: "topic" },
          { label: "Quiz: The Testing Process", kind: "quiz" },
          { label: "Unit Testing", kind: "topic" },
          { label: "Quiz: Unit Testing", kind: "quiz" },
          { label: "Imitating Source Events & Migrating Data", kind: "topic" },
          { label: "Quiz: Imitating Source Events & Migrating Data", kind: "quiz" },
          { label: "Integration Tests", kind: "topic" },
          { label: "Lab: Integration Tests", kind: "lab" },
          { label: "Quiz: Integration Tests", kind: "quiz" },
        ],
      }
    ],
  },
  "ai-in-event-driven-applications": {
    totalSteps: 8,
    intro: [
      "This course is designed for students who:",
      ["Already know how to build real-time event-driven applications in Vantiq", "Intend to integrate AI into their projects", "Want to learn more about AI-related activity patterns in the Visual Event Handler (AppBuilder) environment"],
      "Within this (estimated 2 hours) Course:",
      ["4 Video Lectures", "4 Video Quizzes", "2 Hands-On Labs"],
      "Students who successfully complete the lectures and labs should feel very comfortable adding AI, semantic search results, and Collaboration AI conversation management to their Event-Driven Architected projects.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: AI Fundamentals",
        topics: 4,
        quizzes: 3,
        items: [
          { label: "Generative Large Language Models", kind: "topic" },
          { label: "Quiz: Generative Large Language Models", kind: "quiz" },
          { label: "Semantic Searches", kind: "topic" },
          { label: "Lab: Building a RAG Application", kind: "lab" },
          { label: "Quiz: Semantic Searches", kind: "quiz" },
          { label: "LLM Playground", kind: "topic" },
          { label: "Quiz: LLM Playground", kind: "quiz" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: AI Conversations",
        topics: 2,
        quizzes: 1,
        items: [
          { label: "Collaboration Activity Patterns", kind: "topic" },
          { label: "Lab: Building a Collaboration-Managed AI Conversation", kind: "lab" },
          { label: "Quiz: Collaboration Activity Patterns", kind: "quiz" },
        ],
      }
    ],
  },
  "vantiq-integration": {
    totalSteps: 11,
    intro: [
      "Vantiq connects seamlessly with everything and anything on the Internet.",
      "This is accomplished with many features and tools available on the platform. You’ve already worked with some when you took the Application Developers Foundations Course, such as:",
      ["External Sources", "The Vantiq Mobile App"],
      "Some of these tools are so extensive, they have their own elective classes devoted to them, such as:",
      ["Generative AI Applications in Vantiq", "Vantiq Command Line Interface"],
      "…and we’ll be covering even more in this class, especially Vantiq’s own Application Programming Interface.",
      "This class consists of:",
      ["4 Video Lectures", "4 Quizzes", "2 Hands-On Labs"],
      "After students successfully complete the class, they will be able to confidently",
      ["Know of the various Vantiq integration features available", "Be able to work with the Vantiq API using REST/HTTPS, WSS and at least one SDK"],
      "The class will require about 2-3 hours to complete.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Integration Tools and Concepts",
        topics: 1,
        quizzes: 1,
        items: [
          { label: "Vantiq Integration", kind: "topic" },
          { label: "Quiz: Vantiq Integration", kind: "quiz" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: The Vantiq API",
        topics: 5,
        quizzes: 3,
        items: [
          { label: "REST/HTTPS & The Vantiq API", kind: "topic" },
          { label: "Lab: REST/HTTPS & The Vantiq API", kind: "lab" },
          { label: "Quiz: REST/HTTPS & The Vantiq API", kind: "quiz" },
          { label: "Websockets, VAIL & The Vantiq API", kind: "topic" },
          { label: "Lab: Websockets, VAIL & The Vantiq API", kind: "lab" },
          { label: "Quiz: Websockets, VAIL & The Vantiq API", kind: "quiz" },
          { label: "Vantiq SDKs", kind: "topic" },
          { label: "Quiz: Vantiq SDKs", kind: "quiz" },
        ],
      },
      {
        id: "lesson-3",
        title: "Lesson 3: Camel Assemblies",
        topics: 2,
        quizzes: 1,
        items: [
          { label: "Camel Assemblies", kind: "topic" },
          { label: "Quiz: Camel Assemblies", kind: "quiz" },
          { label: "Using a Camel Assembly (Demonstration)", kind: "topic" },
        ],
      }
    ],
  },
  "vail-dml": {
    totalSteps: 6,
    intro: [
      "NOTE: It is recommended that you take the VAIL Procedures Class before this one.",
      "VAIL’s Data Manipulation Language is a lot like SQL, but there are features specific to Vantiq’s event driven platform.",
      "By the end of this class, you should feel confident in working with persistent data both in the IDE and programmatically through VAIL logic.",
      "This class consists of:",
      ["4 video lectures", "4 quizzes", "1 hands-on lab"],
      "Upon completion of this course, you should have all the tools you need to confidently use VAIL in all persistent data situations.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "VAIL DML",
        topics: 5,
        quizzes: 4,
        items: [
          { label: "Vantiq & Persistent Data", kind: "topic" },
          { label: "Quiz: Vantiq & Persistent Data", kind: "quiz" },
          { label: "The VAIL SELECT Query", kind: "topic" },
          { label: "Quiz: The VAIL SELECT Query", kind: "quiz" },
          { label: "Database Writes in VAIL", kind: "topic" },
          { label: "Quiz: Database Write in VAIL", kind: "quiz" },
          { label: "CREATE, ALTER & DROP", kind: "topic" },
          { label: "Quiz: CREATE, ALTER & DROP", kind: "quiz" },
          { label: "VAIL DML Lab", kind: "lab" },
        ],
      }
    ],
  },
  "vail-rules": {
    totalSteps: 5,
    finalExamTitle: "Final Exam",
    intro: [
      "The Vantiq Application and Integration Language is a multi-faceted, multi-purpose proprietary language specifically designed for the needs of an event driven platform.",
      "Developers can build their own, very targeted and performant event-listeners using Rules, written in VAIL.",
      "This course consists of:",
      ["3 video lectures", "3 quizzes to facilitate concept comprehension", "1 Final Exam"],
      "After completing this elective, developers should be able to confidently write nimble, real-time VAIL Rules for their own projects.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: VAIL Rules",
        topics: 3,
        quizzes: 4,
        items: [
          { label: "VAIL Rules", kind: "topic" },
          { label: "Quiz: VAIL Rules", kind: "quiz" },
          { label: "Event Binding", kind: "topic" },
          { label: "Quiz: Event Binding", kind: "quiz" },
          { label: "Rule Versioning, Expected Events, Merging, Activation", kind: "topic" },
          { label: "Quiz: Rule Versioning, Expected Events, Merging, Activation", kind: "quiz" },
        ],
      }
    ],
  },
  "server-developer-best-practices": {
    totalSteps: 4,
    intro: [
      "There are a lot of ways to do things in Vantiq, but some are better than others, for",
      ["Performance", "Scalability", "Usability", "Maintenance"],
      "and more. In this class, students should be able to easily absorb the recommended standards for optimal Vantiq server development, thereby saving time and effort in their own projects.",
      "This class should take no more than an hour and consists of:",
      ["3 Video Lectures", "3 Quizzes"],
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Server Development Best Practices",
        topics: 3,
        quizzes: 3,
        items: [
          { label: "Development Conventions", kind: "topic" },
          { label: "Quiz: Development Conventions", kind: "quiz" },
          { label: "Optimal Service Architecture", kind: "topic" },
          { label: "Quiz: Optimal Service Architecture", kind: "quiz" },
          { label: "Platform Resources Best Practices", kind: "topic" },
          { label: "Quiz: Platform Resources Best Practices", kind: "quiz" },
        ],
      }
    ],
  },
  "the-vantiq-catalog": {
    totalSteps: 8,
    intro: [
      "The Vantiq Catalog is a no-code tool for making the most of distributed systems, which allows Namespaces to securely send Events, Service interfaces and Assemblies to each other. This elective consists of:",
      ["Four video lectures", "Four quizzes", "One lab"],
      "It’s a short, easy class that explains what’s important about the Catalog, then allows students to gain first-hand experience with them. By the end of this class, you’ll be comfortable with connecting multiple Namespaces to a Catalog, registering both Publishers and Subscribers, and using what comes through the Catalog in your projects.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: The Vantiq Catalog",
        topics: 1,
        quizzes: 1,
        items: [
          { label: "The Vantiq Catalog (Introduction)", kind: "topic" },
          { label: "Quiz: The Vantiq Catalog (Introduction)", kind: "quiz" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: Publishing & Subscribing",
        topics: 3,
        quizzes: 3,
        items: [
          { label: "Non-Service Events & The Catalog", kind: "topic" },
          { label: "Quiz: Non-Service Events & The Catalog", kind: "quiz" },
          { label: "Services & the Catalog", kind: "topic" },
          { label: "Quiz: Service & the Catalog", kind: "quiz" },
          { label: "Semantic Indexes & the Catalog", kind: "topic" },
          { label: "Quiz: Semantic Indexes & the Catalog", kind: "quiz" },
        ],
      },
      {
        id: "lesson-3",
        title: "Lesson 3: Public Catalogs",
        topics: 1,
        quizzes: 1,
        items: [
          { label: "Public Catalogs", kind: "topic" },
          { label: "Quiz: Public Catalogs", kind: "quiz" },
        ],
      }
    ],
  },
  "1-34-vantiq-assemblies": {
    totalSteps: 6,
    intro: [
      "Assemblies are:",
      ["Modularized and reusable projects", "Consumable without revealing unnecessary complexity", "Flexible, as authored by the Assembly creator"],
      "In this class, students will learn:",
      ["What Vantiq Assemblies are", "How to create Vantiq Assemblies", "How to make their Assemblies flexible for alternative uses", "How to make Assemblies available through a Catalog", "How to download and consume and Assembly"],
      "This course consists of:",
      ["4 Video Lectures", "4 Quizzes", "1 Comprehensive Lab"],
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Vantiq Assemblies",
        topics: 5,
        quizzes: 4,
        items: [
          { label: "Creating Assemblies", kind: "topic" },
          { label: "Quiz: Creating Assemblies", kind: "quiz" },
          { label: "Resource Visibility & Interface", kind: "topic" },
          { label: "Quiz: Resource Visibility & Interface", kind: "quiz" },
          { label: "Assembly Configuration", kind: "topic" },
          { label: "Quiz: Configuring Assemblies", kind: "quiz" },
          { label: "Consuming Assemblies", kind: "topic" },
          { label: "Lab: Creating and Consuming Assemblies", kind: "lab" },
          { label: "Quiz: Consuming Assemblies", kind: "quiz" },
        ],
      }
    ],
  },
  "distributed-deployment": {
    totalSteps: 6,
    intro: [
      "Vantiq provides multiple tools to facilitate distributing application systems across multiple namespaces.",
      "These could span servers, platforms and far-reaching geographic locations.",
      "In this short course, there are:",
      ["4 Lecture videos", "3 Quizzes"],
      "After taking the course, developers should be comfortable with using Vantiq’s Deployment tools to set up their own distributed application systems.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Distributed Deployment",
        topics: 5,
        quizzes: 4,
        items: [
          { label: "Terminology & Concepts", kind: "topic" },
          { label: "Quiz: Terminology & Concepts", kind: "quiz" },
          { label: "Nodes", kind: "topic" },
          { label: "Quiz: Nodes", kind: "quiz" },
          { label: "Deployment Steps", kind: "topic" },
          { label: "Quiz: Deployment Steps", kind: "quiz" },
          { label: "Deployment", kind: "topic" },
          { label: "Quiz: Deployment", kind: "quiz" },
          { label: "Deployment Lab", kind: "lab" },
        ],
      }
    ],
  },
  "client-developer-best-practices": {
    totalSteps: 3,
    intro: [
      "In this class, students will learn the standards and conventions that make Client projects more easy to understand and maintain.",
      "This class should take no more than forty-five minutes and consists of:",
      ["2 Video Lectures", "2 Quizzes"],
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Client Development Best Practices",
        topics: 2,
        quizzes: 2,
        items: [
          { label: "Naming Conventions", kind: "topic" },
          { label: "Quiz: Naming Conventions", kind: "quiz" },
          { label: "Coding Standards", kind: "topic" },
          { label: "Quiz: Coding Standards", kind: "quiz" },
        ],
      }
    ],
  },
  "client-layouts-templates-components": {
    totalSteps: 14,
    intro: [
      "Individually, Client widgets are useful. As a coordinated group, they’re powerful.",
      "Client Layout Widgets encompass other widgets, to control the visibility, appearance and other characteristics of the group. Templates carry that mass-control concept forward by creating a pre-established “starting point” for future developers, cutting their workload, and maintaining look-and-feel guidelines. Finally, Components behave like self-contained custom compound widgets, already designed for purpose, and can be more flexible through exposed configurations.",
      "Overall the class is expected to take about 5 hours, and consists of:",
      ["8 Video Lectures", "8 Quizzes", "3 Comprehensive Hands-On Labs"],
      "By the end of which the student should have robust knowledge and experience in these three vital features of the Client Builder environment.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Client Layouts",
        topics: 4,
        quizzes: 3,
        items: [
          { label: "Widget Containers", kind: "topic" },
          { label: "Quiz: Widget Containers", kind: "quiz" },
          { label: "Directional Layout Widgets", kind: "topic" },
          { label: "Quiz: Directional Layout Widgets", kind: "quiz" },
          { label: "General Layout Widgets", kind: "topic" },
          { label: "Lab: Build Your Own Client Page", kind: "lab" },
          { label: "Quiz: General Layout Widgets", kind: "quiz" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: Theme & Templates",
        topics: 4,
        quizzes: 3,
        items: [
          { label: "Theme", kind: "topic" },
          { label: "Quiz: Theme", kind: "quiz" },
          { label: "Client Templates", kind: "topic" },
          { label: "Quiz: Client Templates", kind: "quiz" },
          { label: "Page Templates", kind: "topic" },
          { label: "Lab: Build Your Own Client Template", kind: "lab" },
          { label: "Quiz: Page Templates", kind: "quiz" },
        ],
      },
      {
        id: "lesson-3",
        title: "Lesson 3: Client Components",
        topics: 3,
        quizzes: 2,
        items: [
          { label: "Client Components", kind: "topic" },
          { label: "Quiz: Client Components", kind: "quiz" },
          { label: "Configuring Client Components", kind: "topic" },
          { label: "Lab: Create Your Own Client Component", kind: "lab" },
          { label: "Quiz: Configuring Client Components", kind: "quiz" },
        ],
      }
    ],
  },
  "launchable-clients": {
    totalSteps: 8,
    intro: [
      "Launchable Clients can be run from the Vantiq Mobile App or Web browser windows, and they come with a multitude of other interesting features. This estimated two-hour class consists of:",
      ["4 Video Lectures", "4 Quizzes", "2 Hands-on Labs"],
      "A student who completes this course will come away fully-versed in what makes a Launchable Client, and how to use the important features associated with them.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Types of Launchable Clients",
        topics: 3,
        quizzes: 2,
        items: [
          { label: "Public Client Features", kind: "topic" },
          { label: "Lab: Make A Client Public", kind: "lab" },
          { label: "Quiz: Public Client Features", kind: "quiz" },
          { label: "Non-Public Client Features", kind: "topic" },
          { label: "Quiz: Non-Public Client Features", kind: "quiz" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: Launchable Client Features",
        topics: 3,
        quizzes: 2,
        items: [
          { label: "Localization", kind: "topic" },
          { label: "Quiz: Localization", kind: "quiz" },
          { label: "Request Parameters & Localization Demonstration", kind: "topic" },
          { label: "Lab: Localization & Request Parameters", kind: "lab" },
          { label: "Quiz: Request Parameters & Localization Demonstration", kind: "quiz" },
        ],
      }
    ],
  },
  "dynamic-client-content": {
    totalSteps: 12,
    intro: [
      "Dynamic content is what can be created in code for run-time needs. These include layouts, widgets, event handlers, data objects and datastreams; all of these can be built in code, without the manual use of the Client Builder.",
      "This class, estimated to take around 3 hours to complete, consists of the following content:",
      ["6 video lectures", "6 quizzes", "2 hands-on labs"],
      "Students who complete this course will come away with the knowledge and skills to easily create dynamic Client content for their own projects.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: Dynamic Appearance",
        topics: 2,
        quizzes: 2,
        items: [
          { label: "Widget Visibility & Appearance", kind: "topic" },
          { label: "Quiz: Widget Visibility & Appearance", kind: "quiz" },
          { label: "Widget Sizing & Position", kind: "topic" },
          { label: "Quiz: Widget Sizing & Position", kind: "quiz" },
        ],
      },
      {
        id: "lesson-2",
        title: "Lesson 2: Dynamic Widgets & Events",
        topics: 3,
        quizzes: 2,
        items: [
          { label: "Dynamic Widgets", kind: "topic" },
          { label: "Lab: Dynamic Widgets", kind: "lab" },
          { label: "Quiz: Dynamic WIdgets", kind: "quiz" },
          { label: "Coding Event Handlers", kind: "topic" },
          { label: "Quiz: Coding Event Handlers", kind: "quiz" },
        ],
      },
      {
        id: "lesson-3",
        title: "Lesson 3: Dynamic Data",
        topics: 4,
        quizzes: 3,
        items: [
          { label: "Data Objects", kind: "topic" },
          { label: "Quiz: Data Objects", kind: "quiz" },
          { label: "Datastreams", kind: "topic" },
          { label: "Lab: Dynamic Event Handling & Datastreams", kind: "lab" },
          { label: "Quiz: Datastreams", kind: "quiz" },
          { label: "DynamicMapViewer", kind: "topic" },
          { label: "Quiz: DynamicMapViewer", kind: "quiz" },
        ],
      }
    ],
  },
  "system-modeler-2": {
    totalSteps: 3,
    intro: [
      "Development begins even before you create your first Service. It’s important to first determine how your application will solve real business problems, and to get buy-in from those experts who will benefit most from the project.",
      "All of this is handily accomplished with the Vantiq tool called the System Modeler. In this short class, you’ll learn everything you need to effectively capture all the business requirements for your project, in the readable and comprehensive tool.",
      "This class consists of:",
      ["Two Lectures", "Two Quizzes"],
      "After this short elective, Vantiq application architects should feel comfortable navigating the System Modeler tool to draft business requirements for application systems.",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: The Vantiq System Model Tool",
        topics: 2,
        quizzes: 2,
        items: [
          { label: "Capturing Business Requirements", kind: "topic" },
          { label: "Quiz: Capturing Business Requirements", kind: "quiz" },
          { label: "System Model", kind: "topic" },
          { label: "Quiz: System Model", kind: "quiz" },
        ],
      }
    ],
  },
  "vantiq-deployment-system-administration": {
    totalSteps: 8,
    intro: [
      "Here’s where you will gain a comprehensive understanding of how to install the Vantiq server and related software onto Cloud infrastructure, then perform infrequent",
      "The elective consists of:",
      ["6 Video Lectures"],
      "Prerequisites: This class is intended for System Administrators who already have a strong understanding of",
      ["Cloud Infrastructure", "Kubernetes", "Helm", "and related expertise as detailed in the k8sdeploy_tools repository ."],
    ],
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
      }
    ],
  },
  "vantiq-system-administration": {
    totalSteps: 8,
    intro: [
      "As the System Administrator for a multi-tenanted, cloud-based Vantiq server installation, you have a wide set of responsibilities, including:",
      ["Constantly surveying the overall health of the cluster(s)", "Making other System Administrators, as needed", "Adding new Orgs and Org Administrators", "Changing default quotas for Orgs", "Continuously monitoring system resource usage"],
      "This class consists of:",
      ["5 Video lectures", "5 Quizzes"],
      "A student who takes this class should take away a solid understanding of System Administrator roles and responsibilities, and how to perform them.",
    ],
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
      }
    ],
  },
  "organization-namespace-administration": {
    totalSteps: 8,
    intro: [
      "There are three tiers to Vantiq Administration: the system level, the Org level and the Namespace level. This class covers the duties carried out by Org and Namespace admins, as well as the tools on the platform that facilitate this important work. (For System Administration information, please take the Vantiq Deployment & System Administration class elective.)",
      "This 3-hour class consists of :",
      ["5 video lectures", "5 quizzes", "1 hands-on lab"],
      "Students who complete the entire class can be expected to be able to assume the responsibilities of either a Organization or Namespace Administrator.",
    ],
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
      }
    ],
  },
  "vantiq-command-line-interface-2": {
    totalSteps: 4,
    intro: [
      "The Vantiq Command Line Interface is a terminal-window based tool useful for creating shell scripts to perform basic maintenance tasks on Vantiq resources. This elective is comprised of:",
      ["3 Video Lectures", "3 Quizzes"],
      "At the end of this short course, students should be able to install and use the CLI as befits their own maintenance needs.",
    ],
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
      }
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
  "applications-developer-level-1/introduction-to-vantiq-s-technical-certification-program": {
    video: {
      title: "Introduction — Applications Developer Level 1",
    },
  },
  "applications-developer-level-1/vantiq-applications": {
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
  "applications-developer-level-1/vantiq-applications": [
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
  "applications-developer-level-1/quiz-vantiq-applications": {
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
  "applications-developer-level-1/final-exam-applications-developer-level-1": {
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
