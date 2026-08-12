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

/**
 * Resuelve un enlace del menú a una URL absoluta dentro del sitio.
 *
 * Los ítems del diccionario se escriben relativos a la portada (`#faq`,
 * `/blog/`) porque es como se leen. Pero el mismo encabezado se renderiza en
 * el blog y en las páginas de solución, y ahí un `#faq` suelto no lleva a
 * ningún lado: apunta a un ancla que no existe en ese documento. Prefijar
 * siempre con la portada del idioma arregla las dos situaciones —desde la
 * portada sigue siendo navegación dentro del documento, sin recarga— y evita
 * tener que pasar el contexto por props.
 */
export function navHref(lang: Lang, href: string): string {
  if (/^(https?:|mailto:|tel:)/.test(href)) return href
  if (href.startsWith("#")) return `${localizePath(lang)}${href}`
  return localizePath(lang, href)
}

export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es"
}
