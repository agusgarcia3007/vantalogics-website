import type { CaseStudy } from "@/data/cases"
import type { Lang } from "@/i18n"
import { getPosts, postPath, postSlug } from "@/lib/blog"
import { findPlatformPage, platformPath } from "@/lib/plataformas"

const SITE = "https://vantalogics.com"

export interface CaseReading {
  href: string
  title: string
  description: string
  id: string
}

export async function caseReading(
  lang: Lang,
  study: CaseStudy
): Promise<CaseReading[]> {
  const guides = (
    await Promise.all(
      (study.guides ?? []).map(async (key) => {
        const page = await findPlatformPage(lang, key)
        if (!page && lang !== "ar") {
          throw new Error(
            `El caso «${study.slug}» apunta a la guía «${key}», que no existe en ${lang}.`
          )
        }
        return page
      })
    )
  ).flatMap((page) =>
    page
      ? [
          {
            href: platformPath(page),
            title: page.data.title,
            description: page.data.description,
            id: `${new URL(platformPath(page), SITE).href}#webpage`,
          },
        ]
      : []
  )

  const posts = await getPosts(lang)
  const notes = (study.reading ?? []).flatMap((slug) => {
    const post = posts.find(
      (entry) => postSlug(entry) === slug || entry.data.translationOf === slug
    )
    if (!post && lang !== "ar") {
      throw new Error(
        `El caso «${study.slug}» apunta a la nota «${slug}», que no existe en ${lang}.`
      )
    }
    return post
      ? [
          {
            href: postPath(post),
            title: post.data.title,
            description: post.data.description,
            id: `${new URL(postPath(post), SITE).href}#article`,
          },
        ]
      : []
  })

  return [...guides, ...notes]
}
