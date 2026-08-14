import { dictionaries, localizePath, type Lang } from "@/i18n"
import { getPosts, postPath } from "@/lib/blog"

const SITE = "https://vantalogics.com"

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

/**
 * Feed por idioma.
 *
 * El `description` de cada ítem lleva la respuesta corta y no la bajada: los
 * agregadores y los lectores que sólo consumen el feed se quedan con eso, y la
 * respuesta es la unidad que tiene sentido leer suelta.
 */
export async function renderFeed(lang: Lang): Promise<Response> {
  // `dictionaries` en vez de `useTranslations`: el nombre `use…` hace que la
  // regla de hooks de React trate a esta función como componente.
  const t = dictionaries[lang]
  const posts = await getPosts(lang)
  const feedPath = localizePath(lang, "/rss.xml")
  const blogPath = localizePath(lang, "/blog/")

  const items = posts
    .map((post) => {
      const url = new URL(postPath(post), SITE).href
      return `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.data.answer)}</description>
      <category>${escape(t.blog.clusters[post.data.cluster])}</category>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
    </item>`
    })
    .join("\n")

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vantalogics — ${escape(t.blog.rssTitle)}</title>
    <link>${new URL(blogPath, SITE).href}</link>
    <description>${escape(t.blog.meta.description)}</description>
    <language>${lang}</language>
    <atom:link href="${new URL(feedPath, SITE).href}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
