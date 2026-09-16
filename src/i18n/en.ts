import type { Dictionary } from "./es"

/** Same shape as `es`. See that file for the two writing conventions. */
export const en: Dictionary = {
  htmlLang: "en",
  ogLocale: "en_US",

  meta: {
    title: "Vantalogics — The AI agency for EdTech",
    description:
      "We build tutors, assisted grading and cited search inside learning platforms. Evaluated against your own cases, with cost per active student calculated before we build.",
    imageAlt: "Vantalogics — the AI agency for EdTech",
  },

  a11y: {
    skip: "Skip to content",
    home: "Vantalogics, go to homepage",
    mainNav: "Main",
    mobileNav: "Main, mobile",
    logoAlt: "Vantalogics logo",
  },

  nav: {
    items: [
      { href: "#capacidades", label: "What we build" },
      { href: "#proceso", label: "How we work" },
      { href: "/solutions/edtech-and-learning-platforms/", label: "EdTech" },
      { href: "/blog/", label: "Notes" },
    ],
    cta: "Book a diagnostic",
    menu: "Menu",
    close: "Close",
    tagline: "AI for learning platforms",
  },

  theme: {
    label: "Theme",
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
  },

  language: {
    label: "Language",
    name: "English",
    switchTo: "View in English",
  },

  hero: {
    eyebrow: "The AI agency for EdTech",
    title: "We put AI inside your learning platform",
    titleMark: "without inventing.",
    lead: "Course-scoped tutors, rubric-based grading and search that cites the module and the timestamp in the video. Tested against your own cases before a student ever sees them.",
    ctaPrimary: "Book a diagnostic",
    ctaSecondary: "Try the agent",
    note: "30 minutes, free. You leave with an inventory of your content, the scope of the first system and an estimated cost per active student.",
    annotation: "One vertical only: education.",
    field: {
      label: "A student's question",
      question: '"Why did exercise 3 give me an R² of 0.84?"',
      steps: [
        {
          title: "Searches the course material",
          detail: "Unit 4, video 2 — minute 12:40",
        },
        {
          title: "Answers by quoting the passage",
          detail: "Linking to the exact moment in the lecture",
        },
        {
          title: "Stops short of the assignment",
          detail:
            "It won't solve the graded exercise: it walks up to the step before",
        },
      ],
      footnote:
        "If the material doesn't cover the question, it says so. That answer is evaluated too.",
    },
  },

  signals: {
    title: "It plugs into what you already run",
    note: "Through an API or through the sector's standards. If your platform is your own, it still plugs in — that's the most common case.",
    items: [
      "Moodle",
      "Canvas",
      "Open edX",
      "Google Classroom",
      "LTI 1.3",
      "xAPI and SCORM",
      "Your SIS",
      "Your own app",
    ],
  },

  thesis: {
    label: "The problem",
    titleMuted: "A chatbot on top of your content",
    titleBright: "is not a tutor.",
    body: [
      "Bolting a generic model onto a course takes an afternoon, which is why most of the sector has already tried it. What shows up next is always the same: it answers well about the world and badly about the subject, and nobody can say whether the last change made it better or worse.",
      "What we build starts from the other end: what it must retrieve, what it may never answer, what each answer costs and how all of that gets tested before anyone opens it. The model is chosen after that.",
    ],
    annotation: "The expensive part isn't the model. It's what the model gets wrong.",
    items: [
      {
        title: "It answers what isn't in the course.",
        detail:
          "When the material doesn't cover the question, the model fills the gap from what it remembers of the internet. In a paid course, that's a complaint ticket.",
      },
      {
        title: "It does the graded assignment.",
        detail:
          "The student pastes the prompt and the tutor completes it. The platform just automated the cheating it claims to fight.",
      },
      {
        title: "It costs more than it charges.",
        detail:
          "High usage, low revenue per student: without a cost per active student calculated up front, the feature eats the margin of the plan that sells it.",
      },
      {
        title: "Nobody can prove it improved.",
        detail:
          "Without your own evaluation set there's no way to compare two versions of the tutor. Every change becomes a bet.",
      },
    ],
  },

  capabilities: {
    label: "What we build",
    titleMuted: "Four systems.",
    titleBright: "All four end up in production.",
    intro:
      "We don't hand over a report or a demo prototype. Each of these ships with your data, is measured against real cases and keeps running on your infrastructure.",
    items: [
      {
        index: "01",
        title: "Course-scoped tutor",
        summary:
          "Answers from the unit's material, says \"that isn't in this course\" instead of filling in the blank, and won't do the graded assignment: it walks the student to the step before and stops there.",
        items: [
          "Scope tied to what the student is enrolled in",
          "An explicit boundary around assessment",
          "The course's voice and level, not the model's",
          "Escalation to a teacher when it's needed",
        ],
      },
      {
        index: "02",
        title: "Rubric-based assisted grading",
        summary:
          "A draft grade and criterion-by-criterion feedback, quoting evidence from the student's own text. The teacher adjusts and signs. This is where the lost hours actually are.",
        items: [
          "The rubric becomes explicit and checkable",
          "One criterion at a time, not a grade in one shot",
          "A review screen with the diff in plain sight",
          "The gap between draft and final grade, measured",
        ],
      },
      {
        index: "03",
        title: "Cited search over your content",
        summary:
          "Retrieval over your courses, transcripts and materials, citing the module and the timestamp in the video. It's the foundation for everything else: without it, any tutor answers from memory.",
        items: [
          "Transcription and indexing of existing video",
          "Your domain's vocabulary, not a generic one",
          "It returns the passage, not the whole course",
          "It respects permissions and enrolment",
        ],
      },
      {
        index: "04",
        title: "Evaluation, cost and operations",
        summary:
          "An evaluation set built from your real cases — including the questions whose correct answer is \"that isn't in the material\" — and cost per active student under control from day one.",
        items: [
          "Evals that run on every change, not once",
          "An alert when quality drops below the threshold",
          "Cost and latency per answer, in plain sight",
          "A full trace of what it cited and why",
        ],
      },
    ],
  },

  cases: {
    label: "Case studies",
    titleMuted: "What we left",
    titleBright: "running.",
    intro:
      "Each case states what was built, which number it was measured against and what had to be sorted out before starting. The numbers are the client's, published with their permission.",
    contextLabel: "Starting point",
    workLabel: "What we built",
    resultLabel: "What moved",
    stackLabel: "What it plugged into",
  },

  agentDemo: {
    label: "Try it now",
    titleMuted: "This site has",
    titleBright: "an agent inside it.",
    body: "It's the same kind of system we build for learning platforms, running in production: it queries real information, notes down what you tell it and asks permission before passing your contact to a person. Not a video, not a recorded demo.",
    annotation: "Ask it something that isn't on the site and watch what it does.",
    points: [
      "Every step it takes is written into the chat",
      "It sends nothing without your approval",
      "If it doesn't know, it says so instead of inventing",
    ],
  },

  process: {
    label: "How we work",
    titleMuted: "From your content",
    titleBright: "to a system with students inside it.",
    steps: [
      {
        step: "01",
        title: "Diagnostic",
        body: "Half an hour with whoever knows the content and the product. You leave with an inventory of the material, the recommended first system and an estimated cost per active student.",
        meta: "30 minutes · free",
      },
      {
        step: "02",
        title: "Evidence before code",
        body: "We build the evaluation set from your real cases and agree on the number that has to move. It's what later makes it possible to say the system improved — and what almost nobody builds.",
        meta: "First weeks",
      },
      {
        step: "03",
        title: "Bounded production",
        body: "It ships to real students, but in a small scope: one subject, one course, one cohort. It opens up to the rest when the numbers hold, not before.",
        meta: "With real students",
      },
      {
        step: "04",
        title: "Operations and handover",
        body: "Quality monitoring, cost per student under control and documentation. If you have a technical team, they're left able to carry on without us.",
        meta: "Ongoing",
      },
    ],
  },

  principles: {
    label: "Commitments",
    titleMuted: "We're not asking you to trust us.",
    titleBright: "We're leaving you the means to check.",
    intro:
      "Anyone can show you a demo that goes well. We'd rather be measured on what you can verify yourself, from the first week.",
    items: [
      {
        title: "A teacher signs the grade",
        body: "Grading proposes and a person decides. No mark that lands on a student's record, no academic-integrity case and no withdrawal is ever resolved on its own.",
      },
      {
        title: "Student data doesn't move",
        body: "We deploy in your cloud and your provider accounts. We don't use student data to train models, and if your audience includes minors the legal framework shapes the architecture before the model does.",
      },
      {
        title: "The metric is agreed up front",
        body: "Before a line is written we define which number has to move and how it's measured. If it doesn't move, it's on record that it didn't.",
      },
      {
        title: "The system is in your name",
        body: "Repositories, accounts and infrastructure yours from day one, and every answer with its citation, its cost and its trace. If you want to fire us, it keeps running without us.",
      },
    ],
  },

  insights: {
    label: "Notes",
    titleMuted: "What we learned",
    titleBright: "putting this into production.",
    cta: "Read all the notes",
  },

  faq: {
    label: "Questions",
    titleMuted: "What people ask",
    titleBright: "before hiring us.",
    indexLabel: "Index",
    entries: [
      {
        question: "How do you keep the tutor from making things up?",
        answer:
          'By scoping retrieval to the course material and requiring a citation: if no passage supports the answer, the tutor says so instead of filling in. We test it with a set of questions whose correct answer is "it isn\'t in the material" — precisely the case almost nobody evaluates.',
      },
      {
        question: "What does the feature cost per active student?",
        answer:
          "It depends on message volume and context length, and it's estimated before building against the platform's real traffic. In production it's controlled with caching, tight retrieval and a small model for most queries, reserving the large one for what genuinely needs it.",
      },
      {
        question: "Our content is untranscribed video and scanned PDFs. Does this still work?",
        answer:
          "It does, but the first project is normalization, not AI: transcription, splitting by unit and metadata. We say so in the diagnostic because it changes the timeline and the budget, and because a tutor on top of messy material answers badly no matter how good the model is.",
      },
      {
        question: "Do you work on our LMS or on our own product?",
        answer:
          "Both. With Moodle, Canvas, Open edX or Google Classroom we come in through LTI 1.3, xAPI or their API; with your own product we integrate against your backend and your permission model. The most frequent case is an in-house platform with an LMS beside it.",
      },
      {
        question: "Won't the tutor end up helping students cheat?",
        answer:
          "It's the first constraint we write: the tutor knows which submissions are graded and stops at the step before, explaining the method without producing the deliverable answer. That boundary is defined with your teaching team and tested with real attempts to cross it.",
      },
      {
        question: "How long until it's live with students?",
        answer:
          "The timeline is set in the diagnostic because it depends on the state of the content and the integrations. We work in short cycles: first the evaluation set and cited search, which already change the experience, then the tutor or grading over a bounded scope.",
      },
    ],
  },

  cta: {
    label: "Next step",
    title: "Show us your content and we'll tell you what can be built on it.",
    body: "Thirty minutes with the person who would build it, not with a salesperson. You leave with an inventory of the material, the recommended first system and a cost estimate per student. If we don't see a case, we say so on the call.",
    primary: "Book a diagnostic",
    secondary: "Email us",
    emailLabel: "Email",
    responseLabel: "Response",
    response: "Within 24 business hours",
  },

  footer: {
    tagline:
      "The AI agency for EdTech. Tutors, assisted grading and cited search that survive production.",
    columns: [
      {
        title: "What we build",
        links: [
          {
            href: "/solutions/edtech-and-learning-platforms/ai-tutor/",
            label: "AI tutor",
          },
          {
            href: "/solutions/edtech-and-learning-platforms/assisted-grading/",
            label: "Assisted grading",
          },
          {
            href: "/solutions/edtech-and-learning-platforms/assessment-generation/",
            label: "Assessment generation",
          },
          {
            href: "/solutions/edtech-and-learning-platforms/semantic-search/",
            label: "Semantic search",
          },
        ],
      },
      {
        title: "The agency",
        links: [
          { href: "/solutions/", label: "AI for EdTech" },
          { href: "/blog/", label: "Notes" },
          { href: "#proceso", label: "How we work" },
          { href: "#contacto", label: "Contact" },
        ],
      },
    ],
    socialTitle: "Follow us",
    tags: "AI tutors · Assisted grading · Educational RAG",
  },

  blog: {
    label: "Notes",
    rssTitle: "Notes",
    meta: {
      title: "Notes — Vantalogics",
      description:
        "Cost per student, decision criteria and production failures in AI projects for learning platforms. Working notes, not lead-generation articles.",
    },
    titleMuted: "What we learned",
    titleBright: "putting AI into learning platforms.",
    intro:
      "Real costs per student, criteria for deciding, and the failures that only show up once the tutor is serving a whole cohort. We publish what we'd have wanted to read before starting.",
    empty: "No notes published yet.",
    readMore: "Read the note",
    backToIndex: "All notes",
    updatedOn: "Updated on",
    publishedOn: "Published on",
    readingTime: "min read",
    tocLabel: "In this note",
    answerLabel: "Short answer",
    faqLabel: "Related questions",
    relatedLabel: "Keep reading",
    shareLabel: "Share",
    authorLabel: "Written by",
    author: "The Vantalogics team",
    authorBio:
      "The AI agency for EdTech. We build tutors, assisted grading and cited search — evaluated and monitored — inside learning platforms.",
    ctaTitle: "Sound like your platform?",
    ctaBody:
      "Thirty minutes, free. You leave with an inventory of your content and an estimate of what's worth building first.",
    ctaButton: "Book a diagnostic",
    clusters: {
      costos: "Costs",
      decision: "How to decide",
      confiabilidad: "Reliability",
      casos: "Use cases",
    },
  },

  solutions: {
    label: "EdTech",
    breadcrumb: "AI for EdTech",
    indexTitle: "AI for learning platforms",
    indexDescription:
      "How AI is integrated into a learning platform: cited search over your own content, a course-scoped tutor and assisted grading, with the grade signed by a teacher.",
    indexIntro:
      "This is the sector's parent page: what gets integrated first, which systems we talk to, what always stays with a teacher deciding, and when it's better not to do it at all. Below, each implementation on its own.",
    focusLabel: "Use cases",
    othersLabel: "Notes from the sector",
    processesLabel: "What we integrate first",
    stackLabel: "What it integrates with",
    humanLabel: "What stays with human approval",
    startLabel: "Where to start",
    notThisLabel: "When not to do it",
    useCasesLabel: "Use cases",
    useCasesIntro:
      "Each one explains a concrete implementation: how it works end to end, which number moves and what has to exist on your side before starting.",
    stepsLabel: "How it works",
    measuresLabel: "What gets measured",
    requiresLabel: "What's needed on your side",
    backToSector: "See the whole sector",
    notesLabel: "Notes about this",
  },

  agent: {
    open: "Try the agent",
  },

  whatsapp: {
    label: "Message us on WhatsApp",
    aria: "Message us on WhatsApp, opens in a new tab",
    prefill:
      "Hi Vantalogics, we run a learning platform and want to integrate AI. Can we talk?",
  },
}
