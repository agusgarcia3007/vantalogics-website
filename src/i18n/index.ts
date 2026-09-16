import { es } from "./es"
import { en } from "./en"
import type { Dictionary } from "./es"

export type { Dictionary }

export type Lang = "es" | "en"

/**
 * i18n estático: cada idioma es una ruta prerenderizada (`/`, `/en/`),
 * sin JavaScript de cliente, sin diccionarios en el bundle y sin
 * redirecciones. El selector son enlaces entre las rutas.
 */
export const DEFAULT_LANG: Lang = "es"

export const LANGS: Lang[] = ["es", "en"]

export const dictionaries: Record<Lang, Dictionary> = { es, en }

export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang]
}

/**
 * Dirección de escritura.
 *
 * Hoy los dos idiomas publicados se escriben de izquierda a derecha, pero el
 * layout sigue apoyado en propiedades lógicas (`ps-`, `me-`, `text-start`) y el
 * atributo sigue saliendo de acá: la versión en árabe existió y va a volver, y
 * con esto puesto vuelve cambiando una línea en vez de auditando el sitio.
 */
export function langDir(lang: Lang): "ltr" | "rtl" {
  switch (lang) {
    case "es":
    case "en":
      return "ltr"
  }
}

/** Ruta de una página en un idioma dado. El idioma por defecto vive en la raíz. */
export function localizePath(lang: Lang, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`
  return lang === DEFAULT_LANG
    ? clean
    : `/${lang}${clean === "/" ? "/" : clean}`
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

/** Los demás idiomas, en el orden de `LANGS`. Para el selector. */
export function otherLangs(lang: Lang): Lang[] {
  return LANGS.filter((candidate) => candidate !== lang)
}

/** Imagen de Open Graph del idioma. */
export function ogImage(lang: Lang): string {
  return `/og-${lang}.png`
}
