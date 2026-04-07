export const featureItems = [
  {
    icon: "AI",
    title: "Symptom-aware intake",
    description:
      "The assistant understands natural language symptoms and keeps the intake conversation calm, clear, and structured.",
  },
  {
    icon: "WG",
    title: "Ward classification",
    description:
      "Patients are routed to General, Emergency, or Mental Health pathways through a reliable triage workflow.",
  },
  {
    icon: "DB",
    title: "Live patient summary",
    description:
      "Every response updates a structured patient card so hospital staff can review readiness at a glance.",
  },
  {
    icon: "WB",
    title: "Automation-ready handoff",
    description:
      "Final submissions save to Supabase and can trigger a webhook for downstream dashboards and operations.",
  },
];

export const workflowSteps = [
  {
    title: "Patient describes the issue",
    description:
      "The user starts with symptoms in plain language instead of selecting rigid forms.",
  },
  {
    title: "Workflow classifies urgency",
    description:
      "LangGraph routes the case into the most relevant ward while checking for critical signals.",
  },
  {
    title: "Missing fields are collected",
    description:
      "The chatbot asks for name, age, and issue details one question at a time for a smoother intake.",
  },
  {
    title: "Submission completes the intake",
    description:
      "Validated data is saved, surfaced to staff, and ready to trigger external hospital automation.",
  },
];

export const wardCards = [
  {
    title: "General Ward",
    tone: "Routine care",
    symptoms: ["Fever", "Cough", "Cold", "Headache", "Weakness", "Body pain"],
  },
  {
    title: "Emergency Ward",
    tone: "Immediate attention",
    symptoms: [
      "Chest pain",
      "Bleeding",
      "Breathing difficulty",
      "Unconsciousness",
      "Accident",
      "Severe injury",
    ],
  },
  {
    title: "Mental Health Ward",
    tone: "Sensitive support",
    symptoms: ["Anxiety", "Depression", "Stress", "Panic attack", "Emotional distress"],
  },
];

export const benefits = [
  "Reduces front-desk bottlenecks during busy hospital intake periods.",
  "Creates a presentation-ready AI workflow with visible business value.",
  "Improves patient confidence with calm, one-question-at-a-time conversations.",
  "Keeps the architecture modular for future voice, analytics, and deployment upgrades.",
];

export const techStack = [
  "React + Vite",
  "Tailwind CSS",
  "FastAPI",
  "LangGraph",
  "Supabase",
  "Webhook automation",
];

export const architectureLayers = [
  {
    title: "Frontend experience",
    description:
      "Marketing homepage, patient chat console, and optional admin dashboard deliver a demo-friendly interface.",
  },
  {
    title: "FastAPI orchestration",
    description:
      "API routes validate requests, manage session state, coordinate workflow execution, and return structured responses.",
  },
  {
    title: "LangGraph intake engine",
    description:
      "A node-based flow extracts details, classifies wards, asks clarifying questions, and marks a patient ready for submission.",
  },
  {
    title: "Persistence and automation",
    description:
      "Supabase stores final records while the webhook service sends completed intake payloads to external systems.",
  },
];

export const projectHighlights = [
  "Premium healthcare UI with glass panels, gradients, and responsive sections.",
  "Chat-first triage flow designed for demos, classrooms, and portfolio presentations.",
  "Graceful backend fallbacks when Supabase or webhook credentials are not configured.",
];

export const faqs = [
  {
    question: "Is the ward detection AI-based or rule-based?",
    answer:
      "This version uses a stable rule-based classifier inside a LangGraph workflow so demos stay predictable and easy to explain.",
  },
  {
    question: "Can the project run without Supabase during development?",
    answer:
      "Yes. The backend is built to fall back to an in-memory store if Supabase credentials are not supplied.",
  },
  {
    question: "How does the system keep track of the conversation?",
    answer:
      "Each chat session receives a session ID and the backend keeps patient intake state across messages until submission.",
  },
];

export const teamContacts = [
  { label: "Project theme", value: "IBM SkillsBuild healthcare AI demo" },
  { label: "Suggested audience", value: "Faculty, judges, recruiters, and demo visitors" },
  { label: "Demo storyline", value: "From symptom intake to ward recommendation to final handoff" },
];

