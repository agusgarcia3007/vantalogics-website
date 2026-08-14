import type { Dictionary } from "./es"

export const en: Dictionary = {
  htmlLang: "en",
  ogLocale: "en_US",

  meta: {
    title: "Vantalogics — We automate the repetitive work in your company",
    description:
      "We build AI agents that answer customers, file data and close cases inside the tools you already use. With a human in charge where money is on the line.",
    imageAlt: "Vantalogics — AI systems agency",
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
      { href: "#que-hacemos", label: "What we do" },
      { href: "#proceso", label: "How we work" },
      { href: "/blog/", label: "Notes" },
      { href: "#faq", label: "Questions" },
    ],
    cta: "Book a diagnostic",
    menu: "Menu",
    close: "Close",
    tagline: "AI systems in production",
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
    eyebrow: "AI systems agency",
    title: "Let a system do the repetitive work.",
    lead: "We build AI agents that answer customers, file data and close cases inside the tools you already use. You keep deciding where money is on the line.",
    ctaPrimary: "Book a free diagnostic",
    ctaSecondary: "Try an agent right now",
    note: "30 minutes, free. You leave with a map of your process and an estimate.",
    flow: {
      caption: "An order that comes in over WhatsApp, handled on its own",
      label: "Example flow",
      status: "Working right now",
      trigger: {
        title: "A message arrives",
        detail: "“Hi, I need 20 boxes for Thursday”",
      },
      agent: {
        title: "Your agent",
        detail: "Reads it, understands it and decides what to do",
      },
      outputs: [
        {
          title: "It answers the customer",
          detail: "Confirms stock and delivery date",
        },
        {
          title: "It files the order",
          detail: "Lands in your system, nobody types it in",
        },
        {
          title: "It asks when there is a call to make",
          detail: "An unusual discount: you approve it",
        },
      ],
      footnote: "Six seconds end to end. Every step is on the record.",
    },
  },

  tools: {
    title: "It works inside what you already use",
    note: "And anything else with an API. You don't switch systems — we add hands to them.",
    items: [
      "WhatsApp",
      "Email",
      "Spreadsheets",
      "Slack",
      "Notion",
      "Your ERP",
      "Your CRM",
      "Your site",
    ],
  },

  problem: {
    label: "The problem",
    titleMuted: "Your team doesn't hate the work.",
    titleBright: "It hates doing it twice.",
    body: [
      "Most companies don't have a people problem. They have tasks done by hand three times a week because nobody ever turned them into a system.",
      "That's exactly what we do. We look at the real process, not the slide about the process, and automate the part that repeats.",
    ],
    items: [
      {
        title: "Orders over chat.",
        detail:
          "Someone retypes them into the system, and now and then one slips.",
      },
      {
        title: "Invoices and delivery notes.",
        detail: "Read, filed and double-checked one by one, every single day.",
      },
      {
        title: "The same questions.",
        detail: "The same message answered twenty times a day, forever.",
      },
      {
        title: "Monday's report.",
        detail: "Half a morning rebuilding what was built last week.",
      },
    ],
  },

  services: {
    label: "What we do",
    titleMuted: "Four ways to put AI to work.",
    titleBright: "All of them end in something running.",
    items: [
      {
        index: "01",
        title: "Automate a process",
        summary:
          "Work someone does today by copying and pasting moves to a system that runs on its own and logs every step it takes.",
        items: [
          "Customer and vendor onboarding",
          "Reading and filing documents",
          "System-to-system checks that are manual today",
          "Ticket triage and replies",
        ],
      },
      {
        index: "02",
        title: "A custom agent",
        summary:
          "It answers, looks up your real data and takes concrete actions. With scoped permissions and a human wherever a mistake gets expensive.",
        items: [
          "Support and sales with your own information",
          "Internal copilots for your team",
          "Multi-step tasks with approval",
          "On WhatsApp, email, Slack or your product",
        ],
      },
      {
        index: "03",
        title: "Make it behave every time",
        summary:
          "We agree what working well means and measure it on every change. If quality drops, an alert fires before a customer tells you.",
        items: [
          "Tests built from your real cases",
          "Explicit limits on what it may do alone",
          "Log, cost and time for every run",
          "Alerts when something degrades",
        ],
      },
      {
        index: "04",
        title: "AI inside your product",
        summary:
          "If you sell software and AI has to live inside it, we own the whole architecture and hand it over running to your team.",
        items: [
          "Search over your own data",
          "AI features embedded in your product",
          "Model choice and cost control",
          "Documented handover to your team",
        ],
      },
    ],
  },

  agentDemo: {
    label: "Try it now",
    titleMuted: "This site has an agent inside it.",
    titleBright: "Tell it your case and answer two questions.",
    body: "It's the same kind of agent we build for clients: it looks up real information, takes notes on what you tell it and asks permission before passing your contact to a person. Not a video, not a recorded demo.",
    points: [
      "Every step it takes is written in the chat",
      "It sends nothing without your approval",
      "If it doesn't understand, it says so instead of inventing",
    ],
  },

  process: {
    label: "How we work",
    titleMuted: "From the first conversation",
    titleBright: "to a system that runs.",
    steps: [
      {
        step: "01",
        title: "Diagnostic",
        body: "Half an hour with whoever really knows the process. You leave with a map of the flow and what's worth automating first.",
        meta: "30 minutes · free",
      },
      {
        step: "02",
        title: "Design and test",
        body: "We set the success metric and build the smallest version that solves the whole problem — not a mockup.",
        meta: "First few weeks",
      },
      {
        step: "03",
        title: "Production",
        body: "Integration, permissions, limits and monitoring. It opens to more people once the numbers hold, not before.",
        meta: "On your real data",
      },
      {
        step: "04",
        title: "Running it and handing it over",
        body: "We monitor, control cost and document. If you have a technical team, they end up able to carry on without us.",
        meta: "Ongoing",
      },
    ],
  },

  proof: {
    label: "Results",
    titleMuted: "What changes",
    titleBright: "once the system is in production.",
    intro:
      "In all three, the metric was agreed before we started and measured on the real operation, not on a lab test.",
    headline: {
      value: "310 h",
      unit: "a month",
      title: "of manual work that stopped happening",
      body: "A distributor with three people filing delivery notes by hand. Today the system reads them, files them and only raises the unclear ones.",
      chartLabel: "Manual hours per month",
      chartFrom: "Before",
      chartTo: "Today",
    },
    results: [
      {
        metric: "−72%",
        metricLabel: "Response time",
        sector: "B2B software",
        body: "Automatic triage and drafts a person approves, across a nine-person support team.",
      },
      {
        metric: "310 h/mo",
        metricLabel: "Manual work removed",
        sector: "Logistics",
        body: "Delivery notes read and checked against the ERP, with review only on unclear cases.",
      },
      {
        metric: "3×",
        metricLabel: "Onboarding capacity",
        sector: "Financial services",
        body: "Document verification with no extra headcount and a record of every decision.",
      },
    ],
    testimonialsTitle: "What they say",
    testimonials: [
      {
        quote:
          "They looked at the process before talking about technology. That conversation saved us months of building the wrong thing.",
        name: "María Fernanda Ruiz",
        role: "Head of Operations",
        company: "Altamar Logística",
      },
      {
        quote:
          "It's the first AI project we've taken to production. The difference was having metrics from day one.",
        name: "Diego Salgado",
        role: "CTO",
        company: "Quantia Seguros",
      },
      {
        quote:
          "They left everything in our repos. Today my team extends the agent without depending on anyone.",
        name: "Laura Benítez",
        role: "Head of Engineering",
        company: "Belfor Retail",
      },
    ],
    stats: [
      { value: "24/7", label: "It works at night too" },
      { value: "100%", label: "The system stays in your name" },
      { value: "0", label: "Nothing ties you to us" },
      { value: "EN · ES · AR", label: "We work in three languages" },
    ],
  },

  faq: {
    label: "Questions",
    titleMuted: "What people ask",
    titleBright: "before hiring us.",
    indexLabel: "Index",
    entries: [
      {
        question: "What exactly does Vantalogics do?",
        answer:
          "We automate repetitive company work and build AI agents connected to your systems — CRM, ERP, databases and internal APIs. We measure them against real cases from your operation so they work every day in production, not just on demo day.",
      },
      {
        question: "How long does an AI automation project take?",
        answer:
          "It depends on the process and which systems it has to talk to, so the timeline is set during the diagnostic. We work in short cycles: instead of one delivery at the end, something usable and measurable ships each round, usually within the first few weeks.",
      },
      {
        question: "How much does it cost to automate a process with AI?",
        answer:
          "Pricing is built after the diagnostic, with a closed scope and a per-project price instead of open-ended hours. The initial 30-minute diagnostic is free and ends with a written scope and investment range, before you commit to anything.",
      },
      {
        question: "What happens to my company's data?",
        answer:
          "Your data stays in your infrastructure and your provider accounts: we deploy to your cloud or whichever you choose, under NDA and with least-privilege access. We don't use customer information to train models and we work with zero retention when the case requires it.",
      },
      {
        question: "What if the agent gets something wrong?",
        answer:
          "Every agent ships with explicit limits on what it can do alone and what needs a person's approval. High-impact actions always go through human review, everything is logged step by step, and automatic alerts fire when quality drops below the agreed threshold.",
      },
      {
        question: "Do I need an internal technical team to work with you?",
        answer:
          "No. We own the architecture, the development and the full deployment. We do need someone on the business side who knows the process deeply and can validate results. If you have a technical team, we hand over the documented system so they can run and extend it.",
      },
    ],
  },

  cta: {
    label: "Next step",
    title: "Tell us which process is eating your month.",
    body: "Thirty minutes, no commitment. You leave with a map of the process and an estimate of how much can be automated. If we don't see a case, we say so on the same call.",
    primary: "Book a free diagnostic",
    secondary: "Email us",
    emailLabel: "Email",
    responseLabel: "Response",
    response: "Under 24 business hours",
    modeLabel: "Mode",
    mode: "Remote · LATAM, Spain, the United States and the Gulf",
    languagesLabel: "Languages",
    languages: "Spanish, English and Arabic",
  },

  footer: {
    tagline:
      "We automate repetitive work and build AI agents that survive production.",
    columns: [
      {
        title: "What we do",
        links: [
          { href: "#que-hacemos", label: "Automate a process" },
          { href: "#que-hacemos", label: "Custom agents" },
          { href: "#que-hacemos", label: "Evaluation and monitoring" },
          { href: "/solutions/", label: "Solutions by industry" },
        ],
      },
      {
        title: "The agency",
        links: [
          { href: "/blog/", label: "Notes" },
          { href: "#proceso", label: "How we work" },
          { href: "#faq", label: "FAQ" },
          { href: "#contacto", label: "Contact" },
        ],
      },
    ],
    socialTitle: "Follow us",
    tags: "Automation · AI agents · AI Solutions",
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
      "An AI systems agency. We automate processes and build evaluated, monitored agents for companies across Latin America, Spain, the United States and the Gulf.",
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
    processesLabel: "What we automate first",
    stackLabel: "What it integrates with",
    humanLabel: "What stays under human approval",
    startLabel: "Where to start",
    notThisLabel: "When it isn't worth it",
  },

  agent: {
    open: "Try a sample agent",
  },

  whatsapp: {
    label: "Message us on WhatsApp",
    aria: "Message us on WhatsApp, opens in a new tab",
    prefill:
      "Hi Vantalogics, I want to automate a process at my company. Can we talk?",
  },
}
