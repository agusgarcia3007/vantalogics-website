import type { Lang } from "@/i18n"

export type Localized = Partial<Record<Lang, string>> & {
  es: string
  en: string
}

export interface CaseStudy {
  slug: string
  client: Localized
  kind: Localized
  title: Localized
  start: Localized
  built: Localized
  students: number
  metrics: { value: string | Localized; label: Localized }[]
  integrations: Localized[]
  period: Localized
  href: Localized
  summary: Localized
  highlight: Localized
  updated: string
  guides?: string[]
  reading?: string[]
}

export function caseStudyPath(lang: Lang, slug: string): string {
  const root =
    lang === "es" ? "/casos" : lang === "en" ? "/en/cases" : "/ar/cases"
  return `${root}/${slug}/`
}

export function casesIndexPath(lang: Lang): string | null {
  return lang === "es" ? "/casos/" : lang === "en" ? "/en/cases/" : null
}

export function formatStudents(lang: Lang, count: number): string {
  return `${new Intl.NumberFormat(lang).format(count)}+`
}

export const CASES: CaseStudy[] = [
  {
    slug: "apoyo-escolar-rv",
    client: {
      es: "Apoyo Escolar RV",
      en: "Apoyo Escolar RV",
    },
    kind: {
      es: "plataforma de cursos para estudiantes universitarios",
      en: "course platform for university students",
    },
    title: {
      es: "Una plataforma de aprendizaje que reúne cursos, progreso y acompañamiento en un solo lugar.",
      en: "A learning platform that brings courses, progress and academic support into one place.",
    },
    start: {
      es: "Una oferta que cruza universidades, materias y modalidades necesita que cada estudiante encuentre exactamente el curso y el acompañamiento que le corresponde.",
      en: "An offering spanning universities, subjects and learning formats needs every student to find the exact course and level of support they need.",
    },
    built: {
      es: "Diseñamos y desarrollamos una experiencia completa para explorar cursos, acceder a videos y materiales, seguir el progreso, resolver evaluaciones y consultar directamente con la docente.",
      en: "We designed and built a complete experience for exploring courses, accessing videos and study materials, tracking progress, taking assessments and contacting the instructor directly.",
    },
    students: 22000,
    metrics: [
      {
        value: "5",
        label: {
          es: "universidades y trayectos publicados",
          en: "published university pathways",
        },
      },
      {
        value: "9",
        label: {
          es: "áreas de estudio disponibles",
          en: "subject areas available",
        },
      },
      {
        value: { es: "1 año", en: "1 year" },
        label: {
          es: "de acceso según el plan",
          en: "of access depending on plan",
        },
      },
    ],
    integrations: [
      { es: "Catálogo", en: "Catalog" },
      { es: "Cursos", en: "Courses" },
      { es: "Progreso", en: "Progress" },
      { es: "Evaluaciones", en: "Assessments" },
    ],
    summary: {
      es: "Plataforma de cursos para 22.000+ estudiantes de 5 universidades: catálogo, videos, progreso, evaluaciones y consultas con la docente. Caso de Vantalogics.",
      en: "Course platform for 22,000+ students across 5 university pathways: catalog, video lessons, progress, assessments and instructor Q&A. A Vantalogics case.",
    },
    highlight: {
      es: "Migramos sus ventas de Tiendup y WooCommerce a la plataforma propia, cobramos con Mercado Pago, transferencias y PayPal, y corregimos sus cuestionarios contra una clave verificada: el 99,4 % de 5.563 respuestas se puede corregir sin IA. En desarrollo continuo desde diciembre de 2024.",
      en: "We migrated its sales from Tiendup and WooCommerce to its own platform, take payments through Mercado Pago, bank transfers and PayPal, and grade its quizzes against a verified answer key: 99.4% of 5,563 answers can be graded without AI. In continuous development since December 2024.",
    },
    updated: "2026-10-19",
    guides: ["migracion", "proteccion-de-contenido"],
    reading: ["correccion-automatica-de-cuestionarios-con-ia"],
    period: {
      es: "Producto revisado en sep. 2026",
      en: "Product reviewed Sep 2026",
    },
    href: {
      es: "https://app.apoyoescolarrv.com/",
      en: "https://app.apoyoescolarrv.com/",
    },
  },
  {
    slug: "lu-apuntes",
    client: {
      es: "Lu Apuntes",
      en: "Lu Apuntes",
    },
    kind: {
      es: "venta y entrega automática de apuntes digitales",
      en: "automated sale and delivery of digital study notes",
    },
    title: {
      es: "Una biblioteca digital que automatiza la venta y entrega de apuntes universitarios.",
      en: "A digital library that automates the sale and delivery of university study notes.",
    },
    start: {
      es: "Vender apuntes digitales exige mostrar con claridad qué incluye cada material y eliminar la coordinación manual entre el pago y el acceso.",
      en: "Selling digital study notes requires showing exactly what each product includes and removing manual coordination between payment and access.",
    },
    built: {
      es: "Construimos el catálogo, el flujo de compra por transferencia, la acreditación automática, una biblioteca personal y un visor propio pensado para estudiar desde el celular.",
      en: "We built the catalog, bank-transfer checkout, automatic payment confirmation, a personal library and a mobile-first reading experience.",
    },
    students: 600,
    metrics: [
      {
        value: "3",
        label: {
          es: "materias publicadas",
          en: "subjects published",
        },
      },
      {
        value: "6",
        label: {
          es: "apuntes disponibles",
          en: "study-note products available",
        },
      },
      {
        value: { es: "1.147", en: "1,147" },
        label: {
          es: "páginas de contenido",
          en: "pages of study content",
        },
      },
    ],
    integrations: [
      { es: "Catálogo", en: "Catalog" },
      { es: "Pagos", en: "Payments" },
      { es: "Biblioteca", en: "Library" },
      { es: "Visor", en: "Reader" },
    ],
    summary: {
      es: "Venta y entrega automática de apuntes para 600+ estudiantes: transferencias que se acreditan solas, biblioteca personal y visor móvil. Caso de Vantalogics.",
      en: "Automated sale and delivery of study notes for 600+ students: self-confirming bank transfers, a personal library and a mobile reader. A Vantalogics case.",
    },
    highlight: {
      es: "Cobra solo por transferencia: cada orden tiene su propia cuenta virtual y el apunte se habilita cuando entra el dinero, sin revisar comprobantes. Cada cuenta tiene una sola sesión activa, para que no se comparta.",
      en: "It only takes bank transfers: every order gets its own virtual account and the notes unlock when the money arrives, with no receipts to check. Each account has a single active session so it cannot be shared.",
    },
    updated: "2026-10-19",
    guides: ["proteccion-de-contenido"],
    period: {
      es: "Producto revisado en sep. 2026",
      en: "Product reviewed Sep 2026",
    },
    href: {
      es: "https://luapuntes.com/",
      en: "https://luapuntes.com/",
    },
  },
  {
    slug: "academia-dr-la-rosa",
    client: {
      es: "Academia Dr. La Rosa",
      en: "Dr. La Rosa Academy",
    },
    kind: {
      es: "academia online de salud a medida",
      en: "custom online health academy",
    },
    title: {
      es: "Una academia digital que convierte conocimiento sobre salud en una experiencia de aprendizaje estructurada.",
      en: "A digital academy that turns health expertise into a structured learning experience.",
    },
    start: {
      es: "Una audiencia que busca mejorar su salud necesita algo más que contenido disperso: un recorrido claro, materiales prácticos y herramientas para comprobar lo aprendido.",
      en: "An audience looking to improve its health needs more than scattered content: a clear learning path, practical materials and ways to check understanding.",
    },
    built: {
      es: "Construimos una academia con catálogo de cursos, lecciones en video, materiales complementarios, autoevaluaciones, seguimiento del progreso y acceso desde dispositivos móviles y TV.",
      en: "We built an academy with a course catalog, video lessons, supplementary materials, self-assessments, progress tracking, and mobile and TV access.",
    },
    students: 600,
    metrics: [
      {
        value: "154",
        label: {
          es: "clases en el curso principal",
          en: "lessons in the flagship course",
        },
      },
      {
        value: "14",
        label: {
          es: "autoevaluaciones incluidas",
          en: "self-assessments included",
        },
      },
      {
        value: "3",
        label: {
          es: "cursos publicados",
          en: "published courses",
        },
      },
    ],
    integrations: [
      { es: "Cursos", en: "Courses" },
      { es: "Video", en: "Video" },
      { es: "Evaluaciones", en: "Assessments" },
      { es: "Progreso", en: "Progress" },
    ],
    summary: {
      es: "Academia online de salud con 600+ alumnos, 154 clases en video y 14 autoevaluaciones, con acceso desde el celular y la TV. Caso de Vantalogics.",
      en: "Online health academy with 600+ students, 154 video lessons and 14 self-assessments, on mobile and TV. A Vantalogics case.",
    },
    highlight: {
      es: "154 clases en video en el curso principal, 14 autoevaluaciones y la misma cuenta y el mismo progreso en el celular, la computadora y la TV.",
      en: "154 video lessons in the flagship course, 14 self-assessments, and the same account and progress on phone, computer and TV.",
    },
    updated: "2026-10-19",
    period: {
      es: "Producto revisado en sep. 2026",
      en: "Product reviewed Sep 2026",
    },
    href: {
      es: "https://curso.pulso.health/",
      en: "https://curso.pulso.health/",
    },
  },
  {
    slug: "academia-sied",
    client: {
      es: "Academia SIED",
      en: "SIED Academy",
    },
    kind: {
      es: "plataforma de educación médica continua",
      en: "continuing medical education platform",
    },
    title: {
      es: "Educación médica continua para endoscopistas de toda Latinoamérica desde una sola plataforma.",
      en: "Continuing medical education for endoscopists across Latin America on a single platform.",
    },
    start: {
      es: "La formación médica regional reúne docentes internacionales, contenidos especializados y programas de certificación que necesitan una experiencia académica común.",
      en: "Regional medical education brings together international faculty, specialized content and certification programs that need a shared academic experience.",
    },
    built: {
      es: "Desarrollamos una academia para publicar y vender cursos, organizar clases y materiales, acompañar programas asincrónicos, evaluar conocimientos y emitir certificaciones oficiales.",
      en: "We developed an academy to publish and sell courses, organize lessons and materials, support asynchronous programs, assess knowledge and issue official certificates.",
    },
    students: 850,
    metrics: [
      {
        value: "51",
        label: {
          es: "clases en la formación principal",
          en: "lessons in the main program",
        },
      },
      {
        value: "33 h",
        label: {
          es: "de formación especializada",
          en: "of specialized training",
        },
      },
      {
        value: "3",
        label: {
          es: "programas publicados",
          en: "published programs",
        },
      },
    ],
    integrations: [
      { es: "Cursos", en: "Courses" },
      { es: "Pagos", en: "Payments" },
      { es: "Evaluaciones", en: "Assessments" },
      { es: "Certificados", en: "Certificates" },
    ],
    summary: {
      es: "Educación médica continua para endoscopistas de Latinoamérica: 850+ alumnos, 51 clases, 33 h de formación y certificados oficiales. Caso de Vantalogics.",
      en: "Continuing medical education for endoscopists across Latin America: 850+ students, 51 lessons, 33 h of training, official certificates. A Vantalogics case.",
    },
    highlight: {
      es: "Forma a endoscopistas de toda Latinoamérica con docentes internacionales, programas asincrónicos, evaluaciones y certificados oficiales al terminar.",
      en: "Trains endoscopists across Latin America with international faculty, asynchronous programs, assessments and official certificates on completion.",
    },
    updated: "2026-10-19",
    period: {
      es: "Producto revisado en sep. 2026",
      en: "Product reviewed Sep 2026",
    },
    href: {
      es: "https://platform.siedonline.org/",
      en: "https://platform.siedonline.org/",
    },
  },
]

export const TOTAL_STUDENTS: number = CASES.reduce(
  (total, study) => total + study.students,
  0
)

export function formatTotalStudents(lang: Lang): string {
  const floor = Math.floor(TOTAL_STUDENTS / 1000) * 1000
  return `${new Intl.NumberFormat(lang).format(floor)}+`
}

export const CASES_INDEX_UPDATED = "2026-10-23"

export const CASES_INDEX = {
  es: {
    nav: "Casos",
    metaTitle:
      "Casos de plataformas educativas a medida en producción | Vantalogics",
    title: "Plataformas educativas que construimos y siguen en producción",
    answer: (count: number, total: string, list: string) =>
      `Vantalogics tiene ${count} plataformas educativas a medida en producción, con más de ${total} estudiantes en total: ${list}.`,
    item: (client: string, students: string, kind: string) =>
      `${client} (${students} estudiantes, ${kind})`,
    description: (count: number, total: string) =>
      `${count} plataformas educativas a medida en producción y más de ${total} estudiantes: cursos universitarios, apuntes, una academia de salud y educación médica continua.`,
    tableTitle: "Los casos, uno al lado del otro",
    columns: ["Caso", "Estudiantes", "Alcance"],
    solvedTitle: "Qué resolvimos en cada caso",
    readingLabel: "Guías y notas con datos de este caso",
    caseLink: "Ver el caso completo",
  },
  en: {
    nav: "Case studies",
    metaTitle:
      "Custom education platform case studies in production | Vantalogics",
    title: "Education platforms we built that are still in production",
    answer: (count: number, total: string, list: string) =>
      `Vantalogics has ${count} custom education platforms in production, with more than ${total} students in total: ${list}.`,
    item: (client: string, students: string, kind: string) =>
      `${client} (${students} students, ${kind})`,
    description: (count: number, total: string) =>
      `${count} custom education platforms in production and more than ${total} students: university courses, study notes, a health academy and continuing medical education.`,
    tableTitle: "The cases side by side",
    columns: ["Case", "Students", "Scope"],
    solvedTitle: "What we solved in each case",
    readingLabel: "Guides and notes with data from this case",
    caseLink: "Read the full case",
  },
}
