import type { Lang } from "@/i18n"

type Localized = Partial<Record<Lang, string>> & { es: string; en: string }

/**
 * Casos de éxito publicables.
 *
 * Mientras esta lista esté vacía, la portada no muestra la sección «Casos» ni
 * su enlace en la navegación, y el botón secundario del hero lleva a las
 * capacidades (copywriting.md: «Si todavía no hay casos publicables, la
 * sección no debe mostrarse»).
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
  /** Entre una y tres métricas verificables. */
  metrics: { value: string; label: Localized }[]
  integrations: string[]
  /** Período de medición, p. ej. «mar–jun 2026». */
  period: Localized
  /** Enlace al caso completo, si existe. */
  href?: Localized
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
        value: "1 año",
        label: {
          es: "de acceso según el plan",
          en: "of access depending on plan",
        },
      },
    ],
    integrations: ["Catálogo", "Cursos", "Progreso", "Evaluaciones"],
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
    integrations: ["Catálogo", "Pagos", "Biblioteca", "Visor"],
    period: {
      es: "Producto revisado en sep. 2026",
      en: "Product reviewed Sep 2026",
    },
    href: {
      es: "https://luapuntes.com/",
      en: "https://luapuntes.com/",
    },
  },
]
