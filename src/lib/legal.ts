import { getCollection, getEntry, type CollectionEntry } from "astro:content"

import { LANGS, type Lang } from "@/i18n"

export type LegalPage = CollectionEntry<"legal">

export function legalLang(page: LegalPage): Lang {
  const prefix = page.id.split("/")[0]
  return LANGS.includes(prefix as Lang) ? (prefix as Lang) : "es"
}

function legalKey(page: LegalPage): string {
  return page.data.translationOf ?? page.id.replace(/^(es|en|ar)\//, "")
}

export async function findLegalPage(id: string): Promise<LegalPage> {
  const page = await getEntry("legal", id)
  if (!page) throw new Error(`Falta src/content/legal/${id}.md`)
  return page
}

export async function getLegalPages(): Promise<LegalPage[]> {
  return getCollection("legal")
}

export async function legalAlternates(
  page: LegalPage
): Promise<Partial<Record<Lang, string>>> {
  const key = legalKey(page)
  const pages = await getLegalPages()
  return Object.fromEntries(
    pages
      .filter((other) => legalKey(other) === key)
      .map((other) => [legalLang(other), other.data.path])
  )
}
