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
 * Cada caso necesita datos reales y autorizados: línea de base, período de
 * medición y entre una y tres métricas verificables. Un proyecto sin línea de
 * base ni período de medición se presenta como proyecto, no como caso.
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

export const CASES: CaseStudy[] = []
