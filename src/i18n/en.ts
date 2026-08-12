export const en = {
  htmlLang: "en",
  ogLocale: "en_US",

  meta: {
    title: "Vantalogics — AI systems agency for process automation",
    description:
      "We automate company processes and build custom AI agents: evaluated, monitored and under human control. Systems that survive production, not demos.",
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
      { href: "#servicios", label: "Services" },
      { href: "#proceso", label: "Process" },
      { href: "#resultados", label: "Results" },
      { href: "#faq", label: "FAQ" },
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
    switchTo: "Ver en español",
  },

  hero: {
    eyebrow: "AI systems agency",
    tagline: "Automation · Agents · AI Solutions",
    title: "We design systems that do more with less.",
    lead: "We automate processes and build AI agents that survive production: measured, monitored and under human control where it counts.",
    ctaPrimary: "Book a free diagnostic",
    ctaSecondary: "See what we build",
    note: "30 minutes, free. You leave with a plan.",
    trace: {
      caption: "One customer complaint, solved step by step",
      runLabel: "Case",
      runId: "Billing complaint",
      agent: "Customer support",
      status: "Working right now",
      columns: { time: "Time", step: "Step", detail: "Detail" },
      steps: [
        {
          time: "0.4 s",
          kind: "A customer writes",
          detail: "“I never got my March invoice”",
          meta: "",
        },
        {
          time: "1.1 s",
          kind: "It recognises them",
          detail: "Finds them in your system, with their history",
          meta: "",
        },
        {
          time: "2.0 s",
          kind: "Looks up the invoice",
          detail: "March, issued on the 3rd",
          meta: "",
        },
        {
          time: "3.2 s",
          kind: "Double-checks it",
          detail: "The numbers match what they bought",
          meta: "",
        },
        {
          time: "4.9 s",
          kind: "Asks your permission",
          detail: "Amount is over the limit · you approve it",
          meta: "",
        },
        {
          time: "5.6 s",
          kind: "Solves it",
          detail: "Invoice sent and case closed",
          meta: "",
        },
      ],
      summary: [
        { value: "6", label: "steps, all in plain sight" },
        { value: "5.6 s", label: "to solve the case" },
        { value: "1", label: "decision that stays yours" },
      ],
    },
    stats: [
      { value: "24/7", label: "It works at night too" },
      { value: "100%", label: "The system stays in your name" },
      { value: "0", label: "Nothing ties you to us" },
      { value: "EN · ES", label: "We work in two languages" },
    ],
  },

  services: {
    label: "Services",
    title: "Four ways to put AI to work",
    items: [
      {
        index: "01",
        title: "Process automation",
        summary:
          "Repetitive work moves to a system that runs on its own and logs every step.",
        items: [
          "Customer and vendor onboarding",
          "Document extraction and validation",
          "Reconciliations and system-to-system loads",
          "Ticket triage and replies",
        ],
      },
      {
        index: "02",
        title: "Custom AI agents",
        summary:
          "Agents that use your real tools, with scoped permissions and a human where mistakes get expensive.",
        items: [
          "Support and sales with your own context",
          "Internal copilots over your data",
          "Multi-step orchestration with approvals",
          "Slack, WhatsApp, email or your product",
        ],
      },
      {
        index: "03",
        title: "Reliable, measurable agents",
        summary:
          "We define what working well means for your agent and measure it on every release.",
        items: [
          "Evaluation sets from your real operation",
          "Guardrails, action limits and fallbacks",
          "Traces, cost and latency per run",
          "Alerts when quality degrades",
        ],
      },
      {
        index: "04",
        title: "AI Solutions and integration",
        summary:
          "When AI has to live inside your product, we own the whole architecture.",
        items: [
          "Semantic search and RAG over your data",
          "AI features embedded in your product",
          "Model selection and cost control",
          "Handover to your internal team",
        ],
      },
    ],
    principlesTitle: "Engineering, not enthusiasm",
    principles: [
      {
        title: "Measured or not shipped",
        body: "Every automation starts with a metric: hours, response time or error rate.",
      },
      {
        title: "Process first, model second",
        body: "Most of the gain comes from redesigning the flow. The model is just one part.",
      },
      {
        title: "Human in the loop where it counts",
        body: "High-risk cases go through explicit approval and are logged in full.",
      },
      {
        title: "No vendor lock-in",
        body: "The code, the prompts and the infrastructure stay in your repos and your accounts.",
      },
    ],
  },

  process: {
    label: "Process",
    title: "From the conversation to a working system",
    steps: [
      {
        step: "Phase 01",
        title: "Diagnostic",
        body: "Half an hour with whoever knows the process. You leave with a flow map and what's worth automating.",
      },
      {
        step: "Phase 02",
        title: "Design and test",
        body: "We define the success metric and build the smallest version that solves the whole problem.",
      },
      {
        step: "Phase 03",
        title: "Production",
        body: "Integration, permissions, guardrails and observability. It opens to more users once the numbers hold.",
      },
      {
        step: "Ongoing",
        title: "Operation and handover",
        body: "Monitoring and cost control. We document and train so your team can carry on without us.",
      },
    ],
  },

  proof: {
    clientsLabel: "Already running on our systems",
    clientsAria: "Vantalogics clients",
    label: "Results",
    title: "What changes in production",
    intro:
      "In all three, the metric was agreed before we started and measured on the real operation.",
    results: [
      {
        metric: "−72%",
        metricLabel: "Response time",
        sector: "B2B SaaS",
        body: "Automatic triage and drafts a human approves, across a 9-person support team.",
      },
      {
        metric: "310 h/mo",
        metricLabel: "Manual work removed",
        sector: "Logistics",
        body: "Delivery note and invoice extraction against the ERP, with review only on unclear cases.",
      },
      {
        metric: "3×",
        metricLabel: "Onboarding capacity",
        sector: "Financial services",
        body: "Customer onboarding with document verification, no extra headcount and a full audit trail.",
      },
    ],
    testimonialsTitle: "Testimonials",
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
          "It's the first AI project we've taken to production. The difference was having quality metrics from day one.",
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
  },

  /**
   * Six questions, 40–60 word answers. FAQ rich results were deprecated in
   * May 2026, so length is no longer tuned for the SERP but for extraction:
   * that range fits in a single retrieval chunk, which is what answer
   * engines actually cite.
   */
  faq: {
    label: "Frequently asked questions",
    title: "What people ask before hiring us",
    indexLabel: "Index",
    entries: [
      {
        question: "What exactly does Vantalogics do?",
        answer:
          "Vantalogics is an AI systems agency. We automate repetitive company processes and build AI agents connected to your systems — CRM, ERP, databases and internal APIs — with evaluation and observability so they work reliably in production, not just in a demo.",
      },
      {
        question: "How long does an AI automation project take?",
        answer:
          "It depends on the process and the integrations involved, so the timeline is closed during the diagnostic. We work in short cycles: instead of a single deliverable at the end, there is something usable and measurable in every delivery, usually within the first few weeks.",
      },
      {
        question: "How much does it cost to automate a process with AI?",
        answer:
          "The budget is built after the diagnostic, with a fixed scope and a per-project price instead of open-ended hours. The initial 30-minute diagnostic is free and ends with a written scope and investment range, before you commit to anything.",
      },
      {
        question: "What happens to my company's data?",
        answer:
          "Your data stays in your infrastructure and your provider accounts: we deploy to your cloud or whichever one you choose, under an NDA and with least-privilege access. We never use customer data to train models and work with zero-retention providers when the case requires it.",
      },
      {
        question: "What happens if the AI agent gets it wrong?",
        answer:
          "Every agent ships with explicit limits on what it can do alone and what needs a person's approval. High-impact actions always go through human review, everything is logged with its full trace, and automatic alerts fire when quality drops below the agreed threshold.",
      },
      {
        question: "Do I need an in-house technical team to work with you?",
        answer:
          "No. We handle the architecture, the development and the full deployment. We do need one person on the business side who knows the process well and can validate results. If you have a technical team, we hand over the documented system so they can run and extend it.",
      },
    ],
  },

  cta: {
    label: "Next step",
    title: "Tell us which process is eating your month.",
    body: "Thirty minutes, no commitment. You leave with a map of the process and an estimate of how much can be automated. If we don't see a case, we'll say so on the call.",
    primary: "Book a free diagnostic",
    secondary: "Email us",
    emailLabel: "Email",
    responseLabel: "Response",
    response: "Within 24 business hours",
    modeLabel: "Mode",
    mode: "Remote · LATAM, Spain and the United States",
    languagesLabel: "Languages",
    languages: "English and Spanish",
  },

  footer: {
    tagline:
      "We automate processes and build AI agents that survive production.",
    columns: [
      {
        title: "Services",
        links: [
          { href: "#servicios", label: "Process automation" },
          { href: "#servicios", label: "Custom AI agents" },
          { href: "#servicios", label: "Evaluation and observability" },
          { href: "#servicios", label: "AI Solutions" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "#proceso", label: "Process" },
          { href: "#resultados", label: "Results" },
          { href: "#faq", label: "FAQ" },
          { href: "#contacto", label: "Contact" },
        ],
      },
    ],
    tags: "Automation · AI agents · AI Solutions",
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
