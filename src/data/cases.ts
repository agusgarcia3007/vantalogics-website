import type { Lang } from "@/i18n"

export type Localized = Partial<Record<Lang, string>> & {
  es: string
  en: string
}

/**
 * Casos de éxito publicables.
 *
 * La portada sólo presenta los clientes y su cantidad de estudiantes. Cada
 * entrada de esta lista genera una página individual con el desglose completo.
 * Si la lista queda vacía, la navegación y el CTA del hero vuelven a apuntar a
 * las capacidades.
 *
 * Cada caso necesita datos reales y autorizados. Cuando todavía no existe una
 * línea de base de negocio publicable, las métricas describen el alcance real
 * del producto en producción y nunca se presentan como impacto.
 */
export interface CaseStudy {
  slug: string
  /** Nombre del cliente o descripción anónima autorizada. */
  client: Localized
  /** Producto construido y resultado principal. */
  title: Localized
  start: Localized
  built: Localized
  /** Cantidad actual de estudiantes o cuentas de alumno, autorizada. */
  students: number
  /** Entre una y tres métricas verificables. */
  metrics: { value: string | Localized; label: Localized }[]
  integrations: Localized[]
  /** Período de medición, p. ej. «mar–jun 2026». */
  period: Localized
  /** Enlace al producto en producción. */
  href: Localized
}

export function caseStudyPath(lang: Lang, slug: string): string {
  const root =
    lang === "es" ? "/casos" : lang === "en" ? "/en/cases" : "/ar/cases"
  return `${root}/${slug}/`
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
        value: "1.147",
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

/**
 * Estudiantes alcanzados por todos los productos en producción.
 *
 * Se deriva de la lista en vez de escribirse a mano: el número de la portada y
 * el de cada caso salen de la misma fuente, así que no pueden contradecirse.
 */
export const TOTAL_STUDENTS: number = CASES.reduce(
  (total, study) => total + study.students,
  0
)

/**
 * El total, redondeado hacia abajo al millar y con un «+».
 *
 * Hacia abajo a propósito: el sufijo ya declara que hay más, y un número
 * redondeado hacia arriba sería una cifra que todavía no se alcanzó.
 */
export function formatTotalStudents(lang: Lang): string {
  const floor = Math.floor(TOTAL_STUDENTS / 1000) * 1000
  return `${new Intl.NumberFormat(lang).format(floor)}+`
}
