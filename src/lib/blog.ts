import { getCollection, type CollectionEntry } from "astro:content"

import { localizePath, type Lang } from "@/i18n"

export type Post = CollectionEntry<"blog">

/** El `id` que genera el loader es `<idioma>/<slug>`. */
export function postLang(post: Post): Lang {
  return post.id.startsWith("en/") ? "en" : "es"
}

export function postSlug(post: Post): string {
  return post.id.replace(/^(es|en)\//, "")
}

export function postPath(post: Post): string {
  return localizePath(postLang(post), `/blog/${postSlug(post)}/`)
}

/**
 * Posts de un idioma, del más nuevo al más viejo.
 *
 * Los borradores se filtran acá y no en la plantilla: si la exclusión vive en
 * la vista, tarde o temprano un borrador se cuela por el sitemap o el RSS, que
 * son las dos rutas que nadie mira hasta que Google ya lo indexó.
 */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts = await getCollection(
    "blog",
    ({ data, id }) =>
      id.startsWith(`${lang}/`) && (import.meta.env.DEV || !data.draft)
  )
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

/** Todos los posts publicados, en los dos idiomas. Para sitemap y llms.txt. */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection(
    "blog",
    ({ data }) => import.meta.env.DEV || !data.draft
  )
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

/**
 * El par traducido, si existe y está publicado.
 *
 * Se busca por `translationOf` en cualquiera de las dos direcciones: alcanza
 * con declararlo de un lado. Devuelve `undefined` cuando no hay par, y ahí la
 * página no emite `hreflang` en vez de emitir uno roto.
 */
export async function getTranslation(post: Post): Promise<Post | undefined> {
  const key = post.data.translationOf
  if (!key) return undefined

  const other = postLang(post) === "es" ? "en" : "es"
  const candidates = await getPosts(other)

  return candidates.find(
    (candidate) =>
      postSlug(candidate) === key || candidate.data.translationOf === postSlug(post)
  )
}

/**
 * Notas relacionadas: primero las del mismo cluster, después las más nuevas
 * del idioma. Nunca menos de `limit` mientras haya con qué llenar, porque un
 * bloque de relacionadas a medio llenar se lee como un error de la página.
 */
export async function getRelated(post: Post, limit = 3): Promise<Post[]> {
  const pool = (await getPosts(postLang(post))).filter((p) => p.id !== post.id)
  const sameCluster = pool.filter((p) => p.data.cluster === post.data.cluster)
  const rest = pool.filter((p) => p.data.cluster !== post.data.cluster)
  return [...sameCluster, ...rest].slice(0, limit)
}

/**
 * Tiempo de lectura en minutos, a 200 palabras por minuto.
 *
 * Cuenta sobre el markdown crudo, así que sobrestima un poco por la sintaxis.
 * Es la aproximación aceptable: la alternativa es renderizar el post dos veces
 * sólo para contar palabras.
 */
export function readingTime(body: string | undefined): number {
  const words = (body ?? "").trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "es" ? "es-AR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}
