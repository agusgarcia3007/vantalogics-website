import { es } from "./es"
import { en } from "./en"
import { ar } from "./ar"
import type { Dictionary } from "./es"

export type { Dictionary }

export type Lang = "es" | "en" | "ar"

export const DEFAULT_LANG: Lang = "es"

export const LANGS: Lang[] = ["es", "en", "ar"]

export const PUBLIC_LANGS: Lang[] = ["es", "en"]

export function isPublicLang(lang: Lang): boolean {
  return PUBLIC_LANGS.includes(lang)
}

export const dictionaries: Record<Lang, Dictionary> = { es, en, ar }

export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang]
}

export function langDir(lang: Lang): "ltr" | "rtl" {
  return lang === "ar" ? "rtl" : "ltr"
}

export function localizePath(lang: Lang, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`
  return lang === DEFAULT_LANG
    ? clean
    : `/${lang}${clean === "/" ? "/" : clean}`
}

export function navHref(lang: Lang, href: string): string {
  if (/^(https?:|mailto:|tel:)/.test(href)) return href
  if (href.startsWith("#")) return `${localizePath(lang)}${href}`
  return localizePath(lang, href)
}

export function otherLangs(lang: Lang): Lang[] {
  return PUBLIC_LANGS.filter((candidate) => candidate !== lang)
}

export function ogImage(lang: Lang): string {
  return lang === "ar" ? "/og-en.png" : `/og-${lang}.png`
}
