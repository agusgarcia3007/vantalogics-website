import type { Dictionary } from "./es"

export const en: Dictionary = {
  htmlLang: "en",
  ogLocale: "en_US",

  meta: {
    title: "Vantalogics — AI systems agency for business process automation",
    description:
      "We automate business processes and build custom AI agents: evaluated, monitored and kept under human control. Systems that survive production, not demos.",
    imageAlt: "Vantalogics — AI systems agency",
  },

  a11y: {
    skip: "Skip to content",
    home: "Vantalogics, back to top",
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
    title: "AI systems that do the work, not the demo.",
    lead: "We automate processes end to end and build custom AI agents for companies. Measured, monitored and kept under human control where it counts — so AI stops being an experiment and becomes infrastructure.",
    ctaPrimary: "Book a free diagnostic",
    ctaSecondary: "See what we build",
    note: "30-minute diagnostic · Free · You leave with a plan, not a pitch",
    trace: {
      caption: "Trace of an agent run, step by step",
      runLabel: "Run",
      runId: "4d21f",
      agent: "Support agent",
      status: "In production",
      columns: { time: "Time", step: "Step", detail: "Detail" },
      steps: [
        {
          time: "00.4",
          kind: "Input",
          detail: "Email: “I never got my March invoice”",
          meta: "",
        },
        {
          time: "01.1",
          kind: "Context",
          detail: "CRM · 3 customer records",
          meta: "120 ms",
        },
        {
          time: "02.0",
          kind: "Tool",
          detail: "find_invoice(customer, period)",
          meta: "340 ms",
        },
        {
          time: "03.2",
          kind: "Evaluation",
          detail: "Matches the expected case",
          meta: "0.98",
        },
        {
          time: "04.0",
          kind: "Guardrail",
          detail: "Amount over the limit → human review",
          meta: "",
        },
        {
          time: "05.1",
          kind: "Human",
          detail: "Approved by a person on the team",
          meta: "",
        },
        {
          time: "05.6",
          kind: "Action",
          detail: "Invoice resent and ticket closed",
          meta: "",
        },
      ],
      summary: [
        { value: "7", label: "logged steps" },
        { value: "5.6 s", label: "end to end" },
        { value: "1", label: "human approval" },
      ],
    },
    stats: [
      { value: "24/7", label: "Agent monitoring" },
      { value: "100%", label: "Code and data in your accounts" },
      { value: "0", label: "Vendor lock-in" },
      { value: "EN · ES", label: "Bilingual team" },
    ],
  },

  services: {
    label: "Services",
    title: "Four ways to put AI to work",
    intro:
      "We start with the process, not the model. First we measure where time and money leak; then we build the smallest thing that fixes it and leave it running in production.",
    items: [
      {
        index: "01",
        title: "Process automation",
        summary:
          "We find the repetitive work eating your team's hours and move it to a system that runs on its own, with clear rules and a trace for every step.",
        items: [
          "Customer onboarding and vendor setup",
          "Document extraction and validation",
          "Reconciliations, reports and cross-system data entry",
          "Ticket and email triage and response",
        ],
      },
      {
        index: "02",
        title: "Custom AI agents",
        summary:
          "Agents that use your real tools — CRM, ERP, databases, internal APIs — with scoped permissions and a human in the loop wherever mistakes are expensive.",
        items: [
          "Support and sales agents with your own context",
          "Internal copilots over documentation and data",
          "Multi-step orchestration with tools and approvals",
          "Integration with Slack, WhatsApp, email or your product",
        ],
      },
      {
        index: "03",
        title: "Robust, measurable agents",
        summary:
          "Evaluation is what separates a demo from a production system. We define what 'working well' means for your agent and measure it on every release.",
        items: [
          "Evaluation sets built from real cases in your operation",
          "Guardrails, action limits and fallback plans",
          "Traces, cost and latency per run",
          "Alerts when quality degrades",
        ],
      },
      {
        index: "04",
        title: "AI Solutions and integration",
        summary:
          "When AI has to live inside your product or your stack, we own the full architecture and hand it over documented and transferable.",
        items: [
          "Semantic search and RAG over your own data",
          "AI features embedded in your product",
          "Model selection and cost control",
          "Handover to your internal team, no lock-in",
        ],
      },
    ],
  },

  benefits: {
    label: "Why Vantalogics",
    title: "Engineering, not enthusiasm",
    intro:
      "Most AI pilots die at the demo: they work on five examples and break on the thousand edge cases of real operations. We work the other way around.",
    items: [
      {
        title: "If it isn't measured, it doesn't ship",
        body: "Every automation gets a metric before a line of code: hours saved, response time or error rate. If it doesn't move the number, it doesn't launch.",
      },
      {
        title: "Process first, model second",
        body: "Most of the gain comes from redesigning the flow. The model is just another component — chosen for cost and accuracy, not for hype.",
      },
      {
        title: "Human in the loop where it matters",
        body: "We define what the agent decides alone and what goes through a person. High-risk cases always require explicit approval, and every one is logged.",
      },
      {
        title: "Observability from day one",
        body: "Traces, cost and quality per run. You know what the agent did, what it cost and why it failed — without opening a ticket with us.",
      },
      {
        title: "No vendor lock-in",
        body: "Code, prompts and infrastructure live in your repos and your accounts. We document and train your team so they can carry on without us.",
      },
      {
        title: "Short deliveries that work",
        body: "We work in short cycles with something usable in every delivery. Scope and pace are agreed with each client, based on their operation.",
      },
    ],
  },

  process: {
    label: "Process",
    title: "From conversation to a working system",
    intro:
      "One team end to end: whoever runs the diagnostic is who builds it and hands it over working. Scope and timelines are defined with each client during the diagnostic.",
    steps: [
      {
        step: "Phase 01",
        title: "Diagnostic",
        body: "Half an hour with whoever knows the process. We leave with a map of the current flow, the friction points and an honest estimate of what is worth automating and what isn't.",
      },
      {
        step: "Phase 02",
        title: "Design and test",
        body: "We agree on the success metric, build the evaluation set from real cases and ship the smallest version that solves the whole problem.",
      },
      {
        step: "Phase 03",
        title: "Production",
        body: "Integration with your systems, permissions, guardrails and observability. It goes live with a limited group and widens as the numbers hold.",
      },
      {
        step: "Ongoing",
        title: "Operation and handover",
        body: "Monitoring, quality tuning and cost control. We document and train your team so they can run and extend the system without us.",
      },
    ],
  },

  proof: {
    clientsLabel: "Teams already running on our systems",
    clientsAria: "Vantalogics clients",
    label: "Results",
    title: "What changes once the system is in production",
    intro:
      "Three representative projects. In every one, the metric was agreed before we started and measured against real operations, not a lab test.",
    results: [
      {
        metric: "−72%",
        metricLabel: "Response time",
        sector: "B2B SaaS",
        body: "A nine-person support team cut its first-response time with automatic triage and drafts written by an agent and approved by a human.",
      },
      {
        metric: "310 h/mo",
        metricLabel: "Manual work removed",
        sector: "Logistics",
        body: "Extraction and validation of delivery notes and invoices against the ERP. What three people keyed in by hand now runs on its own, with review only on uncertain cases.",
      },
      {
        metric: "3×",
        metricLabel: "Onboarding capacity",
        sector: "Financial services",
        body: "Customer onboarding with document verification tripled its capacity without adding headcount, and with a full audit trail for every decision.",
      },
    ],
    testimonialsTitle: "Testimonials",
    testimonials: [
      {
        quote:
          "They looked at the process before talking about technology. That single conversation saved us months of building the wrong thing.",
        name: "María Fernanda Ruiz",
        role: "COO",
        company: "Altamar Logística",
      },
      {
        quote:
          "It's the first AI project we've actually taken to production. The difference was having quality metrics from the start instead of opinions.",
        name: "Diego Salgado",
        role: "CTO",
        company: "Quantia Seguros",
      },
      {
        quote:
          "They left everything documented and in our own repos. My team now adds features to the agent without depending on anyone outside.",
        name: "Laura Benítez",
        role: "Head of Engineering",
        company: "Belfor Retail",
      },
    ],
  },

  faq: {
    label: "Frequently asked questions",
    title: "What people ask before hiring us",
    intro:
      "Direct answers on scope, timelines, pricing and data handling. If yours is missing, write to us and we'll add it.",
    indexLabel: "Index",
    entries: [
      {
        question: "What exactly does Vantalogics do?",
        answer:
          "Vantalogics is an AI systems agency that automates business processes and builds custom AI agents. We work on four fronts: automating repetitive tasks, agents connected to your systems, evaluation and observability so those agents are reliable in production, and integrating AI features into your product or stack.",
      },
      {
        question: "How long does a project take?",
        answer:
          "It depends on the process and the integrations involved, so the timeline is defined with each client during the diagnostic. We work in short cycles: instead of a single deliverable at the end, there is something usable and measurable in every delivery.",
      },
      {
        question: "How much does it cost to automate a process with AI?",
        answer:
          "The budget is built after the diagnostic, with fixed scope and a per-project price instead of open-ended hours. The initial 30-minute diagnostic is free and ends with a written scope and investment range, before you commit to anything.",
      },
      {
        question: "What happens to my company's data?",
        answer:
          "Data stays in your infrastructure and your provider accounts: we deploy to your cloud or whichever one you choose, under confidentiality agreements and least-privilege access. We never use client information to train models, and we work with providers that offer zero data retention when the case requires it.",
      },
      {
        question: "What happens if the agent gets something wrong?",
        answer:
          "Every agent ships with explicit limits on what it can do alone and what needs a person's approval. High-impact actions always go through human review, everything is logged with its full trace, and there are fallback plans and automatic alerts when quality drops below the agreed threshold.",
      },
      {
        question: "Do I need an internal technical team to work with you?",
        answer:
          "No. We take care of the architecture, development and full deployment. What we do need is someone on the business side who knows the process deeply and can validate results. If you have a technical team, we train them and hand the system over so they can run and extend it without us.",
      },
      {
        question: "Which models and tools do you work with?",
        answer:
          "We are provider-agnostic: we pick the model on cost, latency and accuracy for your specific case, and design the system so it can be swapped without a rewrite. We integrate with the tools you already use — CRM, ERP, databases, Slack, WhatsApp, email and internal APIs — instead of asking you to migrate to a new platform.",
      },
      {
        question: "Do you work with small companies or only large accounts?",
        answer:
          "We work with companies from 10 people up to large corporations. What decides whether a project makes sense isn't size, but whether there's a repetitive process with enough volume and a clear owner willing to change it. We determine that in the initial diagnostic, at no cost.",
      },
    ],
  },

  cta: {
    label: "Next step",
    title: "Tell us which process is eating your month.",
    body: "Thirty minutes, no strings attached. You leave with a map of the process, an estimate of how much can be automated and what is better left alone. If we don't see a case, we'll tell you on the call.",
    primary: "Book a free diagnostic",
    secondary: "Email us",
    emailLabel: "Email",
    responseLabel: "Response",
    response: "Within 24 business hours",
    modeLabel: "Setup",
    mode: "Remote · LATAM, Spain and the United States",
    languagesLabel: "Languages",
    languages: "English and Spanish",
  },

  footer: {
    tagline:
      "AI systems agency. We automate processes and build agents that survive production.",
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
}
