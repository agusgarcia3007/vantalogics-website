import { getCollection, type CollectionEntry } from "astro:content"

import { LANGS, type Lang } from "@/i18n"

export type PlatformPage = CollectionEntry<"plataformas">

const ROOTS: Partial<Record<Lang, string>> = {
  es: "/plataformas-educativas/",
  en: "/en/education-platforms/",
}

export function platformsRoot(lang: Lang): string | undefined {
  return ROOTS[lang]
}

export function platformLang(page: PlatformPage): Lang {
  const prefix = page.id.split("/")[0]
  return LANGS.includes(prefix as Lang) ? (prefix as Lang) : "es"
}

export function platformSlug(page: PlatformPage): string {
  const slug = page.id.replace(/^(es|en|ar)(\/|$)/, "")
  return slug || "index"
}

export function platformKey(page: PlatformPage): string {
  return page.data.translationOf ?? platformSlug(page)
}

export function isPlatformsHub(page: PlatformPage): boolean {
  return platformSlug(page) === "index"
}

export function platformPath(page: PlatformPage): string {
  const root = platformsRoot(platformLang(page))!
  return isPlatformsHub(page) ? root : `${root}${platformSlug(page)}/`
}

export async function getPlatformPages(lang?: Lang): Promise<PlatformPage[]> {
  const pages = await getCollection(
    "plataformas",
    (page) => !lang || platformLang(page) === lang
  )
  return pages.sort((a, b) => a.data.order - b.data.order)
}

export async function platformAlternates(
  page: PlatformPage
): Promise<Partial<Record<Lang, string>>> {
  const key = platformKey(page)
  const pages = await getPlatformPages()
  return Object.fromEntries(
    pages
      .filter((other) => platformKey(other) === key)
      .map((other) => [platformLang(other), platformPath(other)])
  )
}

export async function findPlatformPage(
  lang: Lang,
  key: string
): Promise<PlatformPage | undefined> {
  const pages = await getPlatformPages(lang)
  return pages.find((page) => platformKey(page) === key)
}
