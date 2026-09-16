import type { Lang } from "@/i18n"

/**
 * Los casos.
 *
 * Reglas de la casa para esta lista, que son las que la hacen valer algo:
 *
 * 1. Sólo entra un caso con permiso del cliente para publicarlo. Si el nombre
 *    no se puede decir, se publica la descripción del cliente («plataforma de
 *    formación corporativa, 40 000 alumnos») y se deja `client` sin nombre.
 * 2. Los números son del cliente y están medidos contra la línea de base que
 *    se acordó antes de construir. Nada de porcentajes redondos sin fuente.
 * 3. `context` dice de dónde se partía, incluido lo que estaba mal. Un caso
 *    sin punto de partida no se puede verificar y se lee como folleto.
 *
 * Mientras el array esté vacío la sección entera no se imprime: una grilla de
 * «próximamente» resta más de lo que una sección faltante.
 */

export type Text = Record<Lang, string>

export interface CaseResult {
  /** La cifra, tal cual se muestra: «−38 %», «4,1×», «12 min». */
  value: string
  /** Qué mide esa cifra, en una línea corta. */
  label: Text
}

export interface CaseStudy {
  slug: string
  /** Nombre del cliente, o su descripción si no se puede nombrar. */
  client: Text
  /** Qué se construyó, en una línea. */
  headline: Text
  /** De dónde se partía. */
  context: Text
  /** Qué se construyó, en dos o tres frases. */
  work: Text
  /** Hasta tres cifras. Menos es más creíble que más. */
  results: CaseResult[]
  /** Sistemas con los que se integró. Nombres reales. */
  stack: string[]
}

export const CASES: CaseStudy[] = []

/**
 * Ejemplo de entrada, para cuando haya el primero con permiso:
 *
 * {
 *   slug: "plataforma-formacion-corporativa",
 *   client: {
 *     es: "Plataforma de formación corporativa · LatAm",
 *     en: "Corporate training platform · LatAm",
 *   },
 *   headline: {
 *     es: "Tutor acotado al curso sobre 400 horas de video",
 *     en: "Course-scoped tutor over 400 hours of video",
 *   },
 *   context: { es: "…", en: "…" },
 *   work: { es: "…", en: "…" },
 *   results: [
 *     { value: "−38 %", label: { es: "tickets de soporte", en: "support tickets" } },
 *   ],
 *   stack: ["Moodle", "LTI 1.3", "Postgres + pgvector"],
 * }
 */
