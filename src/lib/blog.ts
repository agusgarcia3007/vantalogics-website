import { getCollection, type CollectionEntry } from "astro:content"

import { LANGS, localizePath, type Lang } from "@/i18n"

export type Post = CollectionEntry<"blog">

/** El `id` que genera el loader es `<idioma>/<slug>`. */
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
 * Las traducciones publicadas de una nota, en los demás idiomas.
 *
 * Se busca por `translationOf` en cualquiera de las direcciones: alcanza con
 * declararlo de un lado. Devuelve sólo las que existen de verdad —una nota
 * puede estar en español y árabe pero no en inglés—, porque un `hreflang` que
 * apunta a un 404 hace que Google descarte el grupo entero.
 */
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

/**
 * Los nombres con los que una nota participa del grupo de traducciones: el
 * suyo propio y el que declara apuntando a otra.
 *
 * Comparar los dos conjuntos —y no sólo `translationOf` contra el slug— es lo
 * que hace que el grupo funcione con más de dos idiomas. La nota en árabe
 * apunta al slug en español, la inglesa también, y así las tres se encuentran
 * entre sí sin que ninguna tenga que enumerar a las demás.
 */
function identifiers(post: Post): string[] {
  const own = [postSlug(post)]
  if (post.data.translationOf) own.push(post.data.translationOf)
  return own
}

/**
 * Las notas de una industria foco, en un idioma.
 *
 * Alimenta el bloque «notas sobre este sector» de la página de solución. Es el
 * enlace que faltaba: sin él, las notas de rubro dependen de que alguien llegue
 * al índice del blog y las reconozca, y la página de sector —que es la que se
 * quiere posicionar— no recibe nada del contenido que se escribe para
 * sostenerla.
 */
export async function getPostsByIndustry(
  lang: Lang,
  industry: string
): Promise<Post[]> {
  return (await getPosts(lang)).filter(
    (post) => post.data.industry === industry
  )
}

/**
 * Notas relacionadas, ordenadas por cercanía: misma industria y mismo cluster,
 * después misma industria, después mismo cluster, y el resto por fecha.
 *
 * Siempre devuelve `limit` mientras haya con qué llenar, porque un bloque de
 * relacionadas a medio llenar se lee como un error de la página.
 */
export async function getRelated(post: Post, limit = 3): Promise<Post[]> {
  const pool = (await getPosts(postLang(post))).filter((p) => p.id !== post.id)

  /**
   * La industria pesa más que el cluster.
   *
   * Antes el orden era sólo por cluster, que es lo correcto cuando todas las
   * notas hablan de lo mismo. Con notas de rubro no: alguien que está leyendo
   * sobre costos de un tutor de IA tiene mucho más que ganar con otra nota de
   * EdTech que con otra nota de costos de un rubro que no es el suyo. El
   * cluster sigue desempatando dentro de la industria.
   */
  const score = (other: Post) =>
    (other.data.industry && other.data.industry === post.data.industry
      ? 2
      : 0) + (other.data.cluster === post.data.cluster ? 1 : 0)

  return [...pool].sort((a, b) => score(b) - score(a)).slice(0, limit)
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

/**
 * `ar-AE-u-nu-latn` y no `ar-AE` a secas: por defecto el árabe formatea con
 * dígitos índicos orientales (٢٠٢٦) y el resto del sitio —métricas, precios,
 * porcentajes— está escrito en dígitos occidentales. Mezclar los dos sistemas
 * en la misma página se lee como un error de codificación.
 */
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
