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
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  nav: {
    items: [
      { href: "#casos", label: "Clients", section: "cases" },
      { href: "/education-platforms/", label: "What we build" },
      { href: "#proceso", label: "How we work" },
      { href: "/blog/", label: "Insights" },
    ],
    cta: "Discuss your product",
    menu: "Menu",
  },

  hero: {
    eyebrow: "Vantalogics · AI product and engineering studio for education",
    title: "We build the intelligence behind education products.",
    badge: "Product · Applied AI · Engineering",
    headline: {
      first: "We build the intelligence behind",
      second: "",
      emphasis: "education products.",
    },
    lead: "We design specialized agents, assessment systems and complete learning platforms. Product, experience, AI and engineering in one team.",
    ctaPrimary: "Discuss your product",
    ctaSecondary: "View our work",
    stats: {
      students: "students",
      products: "Education products in production",
      response: "Reply within 24 business hours",
    },
  },

  cases: {
    eyebrow: "Selected work",
    title: "Education products in production.",
    intro:
      "Each case explains the challenge, the product we built and its verifiable scope today. Measured outcomes where they exist; real product scope where a publishable baseline does not yet exist.",
    detail: {
      breadcrumb: "Case studies",
      students: "students",
      scope: "Current scope",
      challenge: "The challenge",
      built: "What we built",
      components: "Product components",
      visit: "View live product",
      back: "Back to all clients",
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

  cta: {
    label: "Next step",
    title: "What education product should exist next?",
    body: "Tell us what you are building, what is not working yet or which AI opportunity you want to evaluate. In the first conversation, we will tell you where we would start, what it requires and what we would not build.",
    primary: "Discuss your product",
  },

  footer: {
    tagline:
      "Vantalogics is an AI product and engineering studio for education. We build specialized agents and the software required to turn them into real products.",
    columns: [
      {
        title: "Studio",
        links: [
          { href: "/education-platforms/", label: "Education platforms" },
          {
            href: "/education-platforms/migration/",
            label: "Migrate your academy",
          },
          { href: "#casos", label: "Case studies" },
          { href: "#proceso", label: "How we work" },
        ],
      },
      {
        title: "Resources",
        links: [
          { href: "/blog/", label: "Notes" },
          { href: "/solutions/", label: "AI for learning platforms" },
          { href: "/rss.xml", label: "RSS" },
        ],
      },
    ],
    contactTitle: "Contact",
    tags: "Product · Applied AI · Software engineering",
    privacy: { href: "/en/privacy/", label: "Privacy policy" },
  },

  blog: {
    label: "Notes",
    rssTitle: "Notes",
    meta: {
      title: "Notes on AI in education and agents in production — Vantalogics",
      description:
        "What an AI tutor costs per student, how to evaluate it before launch, why RAG fails on course content and what breaks an AI agent in production.",
    },
    titleMuted: "What we learned",
    titleBright: "putting AI into education products.",
    intro:
      "Per-student costs, criteria for deciding what to build first, and the failures that only show up once a tutor or an agent is handling real users. We publish what we wish we had read first.",
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
    indexTitle: "AI for learning platforms",
    indexDescription:
      "How we integrate AI into learning platforms and EdTech: tutors, assisted grading, assessments and semantic search, with human approval where it matters.",
    indexIntro:
      "What we build first in a learning platform, which systems it integrates with, and where a person stays in the loop.",
    focusLabel: "Education",
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

  knowsAbout: [
    "Custom education platform development",
    "Online academies",
    "Migration from Hotmart, Tiendup and WordPress",
    "AI tutors",
    "AI assisted grading",
    "AI assessment generation",
    "Semantic search",
    "RAG over educational content",
    "AI agent evaluation",
    "EdTech",
  ],

  platforms: {
    label: "Education platforms",
    audience:
      "Online academies, educational institutions and education companies",
    answerLabel: "The short answer",
    tocLabel: "On this page",
    casesEyebrow: "In production",
    casesTitleHub: "Platforms we built",
    casesTitlePage: "The case behind this page",
    faqTitle: "Frequently asked questions",
    aiEyebrow: "AI on the platform",
    nextLabel: "Next step",
    nextTitle: "Tell us what you have today and what is holding you back",
    nextBody:
      "In a 30-minute call we review where your academy stands, how you take payments and what you want to change, and we propose the platform that fits your stage.",
    nextButton: "Book a call",
    hubLink: "How we build custom education platforms",
    migrationLink:
      "How we migrated their students from Tiendup and WooCommerce",
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
