import type { APIRoute } from "astro"

import {
  DEFAULT_LANG,
  PUBLIC_LANGS as LANGS,
  isPublicLang,
  localizePath,
} from "@/i18n"
import { getAllPosts, getTranslations, postLang, postPath } from "@/lib/blog"
import { SOLUTIONS, solutionPath, solutionsIndexPath } from "@/data/solutions"
import { USE_CASE_ROUTES, casePath } from "@/data/use-cases"
import { CASES, caseStudyPath } from "@/data/cases"
import { getPlatformPages, platformPath } from "@/lib/plataformas"

const SITE = "https://vantalogics.com"

interface Entry {
  path: string
  priority: string
  changefreq: string
  lastmod?: string
  alternates: Partial<Record<string, string>>
}

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

export const GET: APIRoute = async () => {
  const entries: Entry[] = []

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

  for (const page of await getPlatformPages()) {
    const path = platformPath(page)
    entries.push({
      path,
      priority: page.data.order === 0 ? "0.9" : "0.8",
      changefreq: "monthly",
      lastmod: page.data.updated.toISOString(),
      alternates: {},
    })
  }

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

  for (const study of CASES) {
    for (const lang of LANGS) {
      entries.push({
        path: caseStudyPath(lang, study.slug),
        priority: "0.8",
        changefreq: "monthly",
        alternates: Object.fromEntries(
          LANGS.map((code) => [code, caseStudyPath(code, study.slug)])
        ),
      })
    }
  }

  const posts = await getAllPosts()
  for (const post of posts) {
    const lang = postLang(post)
    if (!isPublicLang(lang)) continue
    const translations = (await getTranslations(post)).filter((other) =>
      isPublicLang(postLang(other))
    )
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
