import type { APIRoute } from "astro"

import { LANGS, localizePath } from "@/i18n"
import { getAllPosts, getTranslation, postLang, postPath } from "@/lib/blog"
import { SOLUTIONS, solutionPath, solutionsIndexPath } from "@/data/solutions"

const SITE = "https://vantalogics.com"

interface Entry {
  path: string
  priority: string
  changefreq: string
  lastmod?: string
  /** Pares por idioma. Sólo se emiten los que existen de verdad. */
  alternates: Partial<Record<string, string>>
}

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

/**
 * Sitemap generado, no escrito a mano.
 *
 * El anterior era un archivo estático en `public/` con las dos URLs de la
 * portada. Con notas y páginas de solución que se agregan solas, un sitemap a
 * mano se desactualiza en la primera publicación y deja de servir justo para
 * lo que existe: avisar que hay contenido nuevo.
 */
export const GET: APIRoute = async () => {
  const entries: Entry[] = []

  // Portadas.
  entries.push({
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
    alternates: { es: "/", en: "/en/" },
  })
  entries.push({
    path: "/en/",
    priority: "0.9",
    changefreq: "weekly",
    alternates: { es: "/", en: "/en/" },
  })

  // Índices del blog y de soluciones.
  for (const lang of LANGS) {
    entries.push({
      path: localizePath(lang, "/blog/"),
      priority: lang === "es" ? "0.8" : "0.7",
      changefreq: "weekly",
      alternates: { es: "/blog/", en: "/en/blog/" },
    })
    entries.push({
      path: solutionsIndexPath(lang),
      priority: lang === "es" ? "0.8" : "0.7",
      changefreq: "monthly",
      alternates: {
        es: solutionsIndexPath("es"),
        en: solutionsIndexPath("en"),
      },
    })
  }

  // Páginas de solución por sector.
  for (const solution of SOLUTIONS) {
    for (const lang of LANGS) {
      entries.push({
        path: solutionPath(lang, solution),
        priority: "0.7",
        changefreq: "monthly",
        alternates: {
          es: solutionPath("es", solution),
          en: solutionPath("en", solution),
        },
      })
    }
  }

  // Notas.
  const posts = await getAllPosts()
  for (const post of posts) {
    const translation = await getTranslation(post)
    const lang = postLang(post)
    entries.push({
      path: postPath(post),
      priority: "0.6",
      changefreq: "monthly",
      lastmod: (post.data.updated ?? post.data.date).toISOString(),
      alternates: translation
        ? {
            [lang]: postPath(post),
            [postLang(translation)]: postPath(translation),
          }
        : {},
    })
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${entries
  .map((entry) => {
    const alternates = Object.entries(entry.alternates)
    const links = alternates
      .map(
        ([code, href]) =>
          `    <xhtml:link rel="alternate" hreflang="${code}" href="${escape(new URL(href!, SITE).href)}" />`
      )
      .join("\n")
    const xDefault = entry.alternates.es ?? entry.alternates.en
    const defaultLink = xDefault
      ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(new URL(xDefault, SITE).href)}" />`
      : ""
    const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ""

    return `  <url>
    <loc>${escape(new URL(entry.path, SITE).href)}</loc>${links ? `\n${links}${defaultLink}` : ""}${lastmod}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  })
  .join("\n")}
</urlset>
`

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
