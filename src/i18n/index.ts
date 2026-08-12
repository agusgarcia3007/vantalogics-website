import { es } from "./es"
import { en } from "./en"
import type { Dictionary } from "./es"

export type { Dictionary }

export type Lang = "es" | "en"

/**
 * i18n estático: cada idioma es una ruta prerenderizada (`/` y `/en/`), sin
 * JavaScript de cliente, sin diccionarios en el bundle y sin redirecciones.
 * El selector es un enlace entre ambas rutas.
 */
export const DEFAULT_LANG: Lang = "es"

export const LANGS: Lang[] = ["es", "en"]

export const dictionaries: Record<Lang, Dictionary> = { es, en }

export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang]
}

/** Ruta de una página en un idioma dado. El idioma por defecto vive en la raíz. */
export function localizePath(lang: Lang, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`
  return lang === DEFAULT_LANG ? clean : `/${lang}${clean === "/" ? "/" : clean}`
}

export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es"
}
