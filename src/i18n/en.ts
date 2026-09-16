import type { Dictionary } from "./es"

export const en: Dictionary = {
  htmlLang: "en",
  ogLocale: "en_US",

  meta: {
    title: "Vantalogics — AI product and engineering for education",
    description:
      "We design specialized agents, assessment systems and complete education platforms. Product strategy, applied AI and software engineering in one team.",
    imageAlt: "Vantalogics — AI product and engineering studio for education",
  },

  a11y: {
    skip: "Skip to content",
    home: "Vantalogics, go to home",
    mainNav: "Main",
    mobileNav: "Main, mobile",
    logoAlt: "Vantalogics logo",
  },

  nav: {
    items: [
      { href: "#casos", label: "Work", section: "cases" },
      { href: "#capacidades", label: "Capabilities" },
      { href: "#proceso", label: "Approach" },
      { href: "#perspectivas", label: "Insights" },
    ],
    cta: "Discuss your product",
    menu: "Menu",
    close: "Close",
    tagline: "AI product and engineering for education",
  },

  language: {
    label: "Language",
    name: "English",
    switchTo: "View in English",
  },

  hero: {
    eyebrow: "Vantalogics · AI product and engineering studio for education",
    title: "We build the intelligence behind education products.",
    lead: "We design specialized agents, assessment systems and complete learning platforms—from the user experience to the models, integrations and infrastructure that keep them running.",
    ctaPrimary: "Discuss your product",
    ctaSecondary: "View our work",
    ctaSecondaryFallback: "See what we build",
    note: "Product strategy, applied AI and software engineering in one team.",
    trace: {
      badge: "Illustrative example",
      title: "Tutoring agent",
      context: "Physics II · Unit 4",
      tabs: ["Trace", "Sources"],
      status: "In production",
      askLabel: "Student",
      question:
        "Why doesn't the work done by a conservative force depend on the path?",
      steps: [
        {
          label: "Context",
          detail: "Cohort 2026-B · Unit 4 unlocked",
        },
        {
          label: "Search",
          detail: "3 course sources · Energy and work",
        },
        {
          label: "Rule",
          detail: "Open assessment: guide without solving exercise 7",
        },
        {
          label: "Answer",
          detail: "Cites U4 §2.3 and suggests a practice problem",
        },
      ],
      metrics: [
        { label: "Source", value: "Validated" },
        { label: "Latency", value: "1.4 s" },
        { label: "Review", value: "Not required" },
      ],
    },
  },

  ecosystem: {
    title: "Built for the education ecosystem.",
    body: "We work across proprietary platforms, learning management systems and education operations. A good answer is not enough: the product must also respect permissions, learning sequences, assessment rules, student privacy and cost per learner.",
    label: "Integrations and standards",
    items: [
      "Moodle",
      "Canvas",
      "Open edX",
      "Google Classroom",
      "LTI 1.3",
      "xAPI",
      "SCORM",
      "SIS",
      "Proprietary platforms",
    ],
  },

  clients: {
    title: "Clients with products in production",
    visit: "Visit",
  },

  cases: {
    eyebrow: "Selected work",
    title: "Education products in production.",
    intro:
      "Each case explains the challenge, the product we built and its verifiable scope today. Measured outcomes where they exist; real product scope where a publishable baseline does not yet exist.",
    labels: {
      client: "Client",
      start: "Starting point",
      built: "What we built",
      impact: "Impact",
      integrations: "Product areas",
      read: "View the product",
    },
  },

  thesis: {
    eyebrow: "Our perspective",
    title: "Adding AI is easy. Building a product people can trust is not.",
    body: [
      "A demo only needs to answer ten questions well. An education product must answer thousands, stay grounded in the content, recognize what it does not know, protect student data and maintain sustainable unit economics.",
      "That is why we do not begin by choosing a model. We begin by defining the product: the problem it solves, what it may do, where it must stop and how success will be measured. Then we design the experience and build the technology beneath it.",
    ],
    contrast: {
      demo: "A demo",
      demoValue: "10 perfect questions",
      product: "A product",
      productValue: "Thousands, every day",
    },
  },

  capabilities: {
    eyebrow: "What we build",
    title: "From product thesis to production software.",
    items: [
      {
        index: "01",
        title: "Specialized agents",
        summary:
          "Not generic chats with access to documents. These are agents integrated into the product, able to interpret context, consult sources, use tools and take action within explicit boundaries.",
        points: [
          "Built around proprietary content and data.",
          "Aware of users, permissions and learning stages.",
          "Connected to APIs and internal tools.",
          "Able to escalate sensitive decisions to a person.",
          "Every source and action recorded.",
        ],
      },
      {
        index: "02",
        title: "AI learning experiences",
        summary:
          "We design new ways to search, practise, receive feedback and make progress inside an education product.",
        points: [
          "Contextual assistance.",
          "Search with sources and references.",
          "Interactive practice and simulations.",
          "Recommendations based on progress.",
          "Immediate, personalized feedback.",
        ],
      },
      {
        index: "03",
        title: "Assessment and academic operations",
        summary:
          "We build systems that assist academic work without hiding the criteria or automating sensitive decisions.",
        points: [
          "Rubric-based assisted grading.",
          "Assessment generation and validation.",
          "Analysis of answers and learning difficulties.",
          "Tools for educators and academic teams.",
          "Human review and full traceability.",
        ],
      },
      {
        index: "04",
        title: "Education platforms and software",
        summary:
          "When the product needs more than an AI feature, we build the software around it too.",
        points: [
          "Complete learning platforms.",
          "Student and educator portals.",
          "Authoring and administration tools.",
          "LMS, SIS and proprietary-system integrations.",
          "Infrastructure, observability and operations.",
        ],
      },
    ],
    visuals: {
      example: "Example",
      agents: {
        title: "Agent system",
        request: "Student request",
        orchestrator: "Course agent",
        tools: ["Course content", "Academic calendar", "SIS · record"],
        guard: "Exam date change",
        human: "Coordinator approval",
        log: [
          "permission: student · read",
          "source: calendar 2026-B",
          "action: request created",
          "escalated: coordination",
        ],
      },
      learning: {
        title: "Guided study",
        question: "I don't get when to use integration by parts.",
        answer:
          "Use it when the integrand is a product and one factor gets simpler when you differentiate it. Your notes include a rule for choosing it.",
        sources: ["Unit 3 · p. 42", "Lecture 11 · 18:20"],
        practice: "Practise with 3 problems",
        progress: "Unit progress",
      },
      assessment: {
        title: "Assisted grading",
        submission: "Submission 14 of 62 · Lab report",
        criteria: [
          { name: "Problem framing", score: 4, max: 4 },
          { name: "Data analysis", score: 2, max: 4 },
          { name: "Conclusions", score: 3, max: 4 },
        ],
        note: "The analysis omits measurement uncertainty (rubric 2.b).",
        suggested: "Suggested",
        decision: "The educator decides",
        approve: "Approve",
        adjust: "Adjust",
      },
      platform: {
        title: "Product architecture",
        layers: [
          {
            name: "Experience",
            items: ["Student portal", "Educator portal", "Authoring"],
          },
          {
            name: "Intelligence",
            items: ["Agents", "Assessment", "Search"],
          },
          {
            name: "Platform",
            items: ["APIs", "Permissions", "Data"],
          },
          {
            name: "Integrations",
            items: ["LTI 1.3", "xAPI", "SIS"],
          },
          {
            name: "Operations",
            items: ["Observability", "Costs", "Evals"],
          },
        ],
      },
    },
  },

  difference: {
    eyebrow: "One team",
    title: "We are not a software factory with an AI API.",
    body: [
      "The education product, its experience and its architecture are designed together. The same team defining how the system should behave builds the interface, integrations, evaluations and infrastructure required to operate it.",
      "Fewer handoffs mean fewer disconnected decisions—and a shorter path to something real users can test.",
    ],
    usual: {
      label: "The usual setup",
      steps: ["Consultancy", "Design agency", "Software factory", "AI vendor"],
      handoff: "handoff",
    },
    ours: {
      label: "Vantalogics",
      disciplines: [
        "Product",
        "Experience",
        "Applied AI",
        "Engineering",
        "Infrastructure",
      ],
      caption: "One team, from product criteria to operations",
    },
  },

  process: {
    eyebrow: "Our process",
    title: "From a concrete opportunity to a product that can scale.",
    steps: [
      {
        step: "01",
        title: "Define the opportunity",
        body: "We understand the product, its users, its content and its operation. Together, we choose a problem capable of producing an observable result.",
      },
      {
        step: "02",
        title: "Design the system",
        body: "We define the experience, constraints, architecture and success metrics before development begins.",
      },
      {
        step: "03",
        title: "Build a real version",
        body: "The first version runs on real content and real integrations. It is not a disposable mock-up.",
      },
      {
        step: "04",
        title: "Test it with users",
        body: "We release within a controlled scope: one cohort, one subject, one team or one part of the catalogue.",
      },
      {
        step: "05",
        title: "Measure and scale",
        body: "We expand the product when quality, adoption and unit economics support the decision.",
      },
    ],
  },

  principles: {
    eyebrow: "Principles",
    title: "Education software people can trust.",
    items: [
      {
        title: "Content is authoritative",
        body: "The system answers from the institution's material and rules, not from the model's general memory.",
      },
      {
        title: "Sensitive decisions remain human",
        body: "Final grades, academic-integrity cases and decisions affecting a student remain the responsibility of a person.",
      },
      {
        title: "Everything can be measured",
        body: "Quality, adoption, cost, latency and human corrections are recorded.",
      },
      {
        title: "The client owns the product",
        body: "Code, infrastructure, accounts and documentation are delivered so the product can grow with or without us.",
      },
    ],
    measures: ["Quality", "Adoption", "Cost", "Latency", "Corrections"],
  },

  insights: {
    eyebrow: "What we are learning",
    title: "Notes from the intersection of education, product and AI.",
    body: "We publish design criteria, real costs and the problems that appear when an AI feature leaves the demo and starts serving an entire cohort.",
    cta: "Read our insights",
  },

  cta: {
    label: "Next step",
    title: "What education product should exist next?",
    body: "Tell us what you are building, what is not working yet or which AI opportunity you want to evaluate. In the first conversation, we will tell you where we would start, what it requires and what we would not build.",
    primary: "Discuss your product",
    secondary: "Email hello@vantalogics.com",
    emailLabel: "Email",
    responseLabel: "Response",
    response: "Within one business day",
  },

  footer: {
    tagline:
      "Vantalogics is an AI product and engineering studio for education. We build specialized agents and the software required to turn them into real products.",
    columns: [
      {
        title: "Studio",
        links: [
          { href: "#capacidades", label: "Capabilities" },
          { href: "#proceso", label: "Approach" },
          { href: "#principios", label: "Principles" },
          { href: "#contacto", label: "Contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { href: "/blog/", label: "Notes" },
          { href: "/solutions/", label: "Solutions by sector" },
          { href: "/rss.xml", label: "RSS" },
        ],
      },
    ],
    contactTitle: "Contact",
    socialTitle: "Follow us",
    tags: "Product · Applied AI · Software engineering",
  },

  blog: {
    label: "Notes",
    rssTitle: "Notes",
    meta: {
      title: "Notes — Vantalogics",
      description:
        "Real costs, decision criteria and the production failures we keep running into on AI automation projects. Working notes, not lead-gen articles.",
    },
    titleMuted: "What we learned",
    titleBright: "shipping agents to production.",
    intro:
      "Real costs, criteria for deciding, and the failures that only show up once the agent is handling actual customers. We publish what we wish we had read first.",
    empty: "No notes published yet.",
    readMore: "Read the note",
    backToIndex: "All notes",
    updatedOn: "Updated",
    publishedOn: "Published",
    readingTime: "min read",
    tocLabel: "In this note",
    answerLabel: "Short answer",
    faqLabel: "Related questions",
    relatedLabel: "Keep reading",
    shareLabel: "Share",
    authorLabel: "Written by",
    author: "The Vantalogics team",
    authorBio:
      "An AI product and engineering studio for education. We build specialized agents and the software required to turn them into real products.",
    ctaTitle: "Sound like your operation?",
    ctaBody:
      "Thirty minutes, free. You leave with a map of your process and an estimate of what is worth automating first.",
    ctaButton: "Book a free diagnostic",
    clusters: {
      costos: "Costs",
      decision: "How to decide",
      confiabilidad: "Reliability",
      casos: "Use cases",
    },
  },

  solutions: {
    label: "Solutions",
    breadcrumb: "Solutions",
    indexTitle: "AI automation, by industry",
    indexDescription:
      "How AI automation works in each industry: which processes to attack first, what it integrates with, and what stays under human approval.",
    indexIntro:
      "The process changes with the industry. These pages are the starting point for each one: what we automate first, which systems we talk to, and where a person stays in the loop.",
    focusLabel: "Focus industries",
    othersLabel: "Other industries",
    processesLabel: "What we automate first",
    stackLabel: "What it integrates with",
    humanLabel: "What stays under human approval",
    startLabel: "Where to start",
    notThisLabel: "When it isn't worth it",
    useCasesLabel: "Use cases in this industry",
    useCasesIntro:
      "Each one explains a concrete implementation: how it works end to end, which number moves, and what has to exist on your side before starting.",
    stepsLabel: "How it works",
    measuresLabel: "What gets measured",
    requiresLabel: "What's needed on your side",
    backToSector: "See the whole industry",
    notesLabel: "Notes on this industry",
  },

  agent: {
    open: "Try a sample agent",
  },

  whatsapp: {
    label: "Message us on WhatsApp",
    aria: "Message us on WhatsApp, opens in a new tab",
    prefill: "Hi Vantalogics, I would like to talk about an education product.",
  },
}
