import { getCollection, type CollectionEntry } from "astro:content"

import { LANGS, localizePath, type Lang } from "@/i18n"

export type Post = CollectionEntry<"blog">

export function postLang(post: Post): Lang {
  const prefix = post.id.split("/")[0]
  return LANGS.includes(prefix as Lang) ? (prefix as Lang) : "es"
}

export function postSlug(post: Post): string {
  return post.id.replace(/^(es|en|ar)\//, "")
}

export function postPath(post: Post): string {
  return localizePath(postLang(post), `/blog/${postSlug(post)}/`)
}

export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts = await getCollection(
    "blog",
    ({ data, id }) =>
      id.startsWith(`${lang}/`) && (import.meta.env.DEV || !data.draft)
  )
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection(
    "blog",
    ({ data }) => import.meta.env.DEV || !data.draft
  )
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export async function getTranslations(post: Post): Promise<Post[]> {
  const lang = postLang(post)
  const own = identifiers(post)
  const found: Post[] = []

  for (const other of LANGS) {
    if (other === lang) continue
    const candidate = (await getPosts(other)).find((c) =>
      identifiers(c).some((id) => own.includes(id))
    )
    if (candidate) found.push(candidate)
  }

  return found
}

function identifiers(post: Post): string[] {
  const own = [postSlug(post)]
  if (post.data.translationOf) own.push(post.data.translationOf)
  return own
}

export async function getPostsByIndustry(
  lang: Lang,
  industry: string
): Promise<Post[]> {
  return (await getPosts(lang)).filter(
    (post) => post.data.industry === industry
  )
}

export async function getRelated(post: Post, limit = 3): Promise<Post[]> {
  const pool = (await getPosts(postLang(post))).filter((p) => p.id !== post.id)

  const score = (other: Post) =>
    (other.data.industry && other.data.industry === post.data.industry
      ? 2
      : 0) + (other.data.cluster === post.data.cluster ? 1 : 0)

  return [...pool].sort((a, b) => score(b) - score(a)).slice(0, limit)
}

export function readingTime(body: string | undefined): number {
  const words = (body ?? "").trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

const LOCALES: Record<Lang, string> = {
  es: "es-AR",
  en: "en-US",
  ar: "ar-AE-u-nu-latn",
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(LOCALES[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}
