import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
// zod directamente y no el `z` reexportado por `astro:content`, que quedó
// deprecado: el proyecto ya trae zod 4 como dependencia.
import { z } from "zod"

/**
 * El blog.
 *
 * Una sola colección con los dos idiomas adentro (`es/…`, `en/…`) en vez de
 * dos colecciones paralelas: así el `id` que genera el loader ya trae el
 * idioma y el par traducido se resuelve por `slug` compartido, sin tener que
 * mantener un mapa aparte.
 *
 * `translationOf` sólo se completa cuando el post existe en los dos idiomas.
 * Sin eso, el `hreflang` apuntaría a una URL 404 y Google descarta el par
 * entero, así que se prefiere no declararlo antes que declararlo mal.
 */
const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    /** El `<title>` del documento, si conviene que difieran. */
    seoTitle: z.string().optional(),
    /** Meta description. 140–160 caracteres. */
    description: z.string(),
    /**
     * Respuesta directa de 40–60 palabras a la pregunta del título. Va arriba
     * de todo y es lo que extraen los motores de respuesta: si no está, el
     * modelo cita el primer párrafo que encuentre, que casi nunca es el bueno.
     */
    answer: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** Cluster temático: agrupa el silo y arma los enlaces internos. */
    cluster: z.enum(["costos", "decision", "confiabilidad", "casos"]),
    /**
     * Industria foco a la que pertenece la nota, si pertenece a alguna.
     *
     * El cluster agrupa por tipo de pregunta —costos, decisión, confiabilidad—
     * y sirve para el lector que ya está leyendo. Esto agrupa por rubro y sirve
     * para otra cosa: es lo que ata cada nota a su página de sector en las dos
     * direcciones, que es la estructura que hace que un conjunto de notas
     * sueltas se lea como autoridad sobre una industria y no como un blog.
     *
     * El valor es el slug español del sector en `src/data/solutions.ts`. Las
     * notas generales no lo declaran y siguen funcionando igual.
     */
    industry: z
      .enum(["inmobiliarias", "edtech-y-plataformas-educativas"])
      .optional(),
    tags: z.array(z.string()).default([]),
    /** Slug compartido con la traducción, si existe. */
    translationOf: z.string().optional(),
    /** Preguntas y respuestas al pie — alimentan el FAQPage del post. */
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }
