import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "zod"

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    answer: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    cluster: z.enum(["costos", "decision", "confiabilidad", "casos"]),
    industry: z.enum(["edtech-y-plataformas-educativas"]).optional(),
    tags: z.array(z.string()).default([]),
    translationOf: z.string().optional(),
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    draft: z.boolean().default(false),
  }),
})

const plataformas = defineCollection({
  loader: glob({ base: "./src/content/plataformas", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    answer: z.string(),
    nav: z.string(),
    order: z.number(),
    serviceType: z.string(),
    updated: z.coerce.date(),
    cases: z.array(z.string()).default([]),
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
  }),
})

export const collections = { blog, plataformas }
