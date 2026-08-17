import type { APIRoute } from "astro"

import { DEFAULT_LANG, LANGS, localizePath } from "@/i18n"
import { getAllPosts, getTranslations, postLang, postPath } from "@/lib/blog"
import { SOLUTIONS, solutionPath, solutionsIndexPath } from "@/data/solutions"
import { USE_CASE_ROUTES, casePath } from "@/data/use-cases"

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
  const homes = Object.fromEntries(
    LANGS.map((lang) => [lang, localizePath(lang)])
  )
  for (const lang of LANGS) {
    entries.push({
      path: localizePath(lang),
      priority: lang === DEFAULT_LANG ? "1.0" : "0.9",
      changefreq: "weekly",
      alternates: homes,
    })
  }

  // Índices del blog y de soluciones.
  for (const lang of LANGS) {
    entries.push({
      path: localizePath(lang, "/blog/"),
      priority: lang === DEFAULT_LANG ? "0.8" : "0.7",
      changefreq: "weekly",
      alternates: Object.fromEntries(
        LANGS.map((code) => [code, localizePath(code, "/blog/")])
      ),
    })
    entries.push({
      path: solutionsIndexPath(lang),
      priority: lang === DEFAULT_LANG ? "0.8" : "0.7",
      changefreq: "monthly",
      alternates: Object.fromEntries(
        LANGS.map((code) => [code, solutionsIndexPath(code)])
      ),
    })
  }

  // Páginas de solución por sector.
  for (const solution of SOLUTIONS) {
    for (const lang of LANGS) {
      entries.push({
        path: solutionPath(lang, solution),
        priority: solution.focus ? "0.9" : "0.7",
        changefreq: "monthly",
        alternates: Object.fromEntries(
          LANGS.map((code) => [code, solutionPath(code, solution)])
        ),
      })
    }
  }

  // Casos de uso de las industrias foco.
  //
  // Prioridad más alta que el resto de las páginas de solución, y no más baja
  // por estar un nivel más abajo en la ruta: son las páginas con intención
  // comercial del sitio y las que la agencia quiere que se indexen primero.
  for (const { solution, useCase } of USE_CASE_ROUTES) {
    for (const lang of LANGS) {
      entries.push({
        path: casePath(lang, solution, useCase),
        priority: "0.8",
        changefreq: "monthly",
        alternates: Object.fromEntries(
          LANGS.map((code) => [code, casePath(code, solution, useCase)])
        ),
      })
    }
  }

  // Notas.
  const posts = await getAllPosts()
  for (const post of posts) {
    const translations = await getTranslations(post)
    const lang = postLang(post)
    entries.push({
      path: postPath(post),
      priority: "0.6",
      changefreq: "monthly",
      lastmod: (post.data.updated ?? post.data.date).toISOString(),
      alternates: translations.length
        ? {
            [lang]: postPath(post),
            ...Object.fromEntries(
              translations.map((other) => [postLang(other), postPath(other)])
            ),
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
    const xDefault = entry.alternates[DEFAULT_LANG] ?? entry.alternates.en
    const defaultLink = xDefault
      ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(new URL(xDefault, SITE).href)}" />`
      : ""
    const lastmod = entry.lastmod
      ? `\n    <lastmod>${entry.lastmod}</lastmod>`
      : ""

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
