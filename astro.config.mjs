// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { satteri } from "@astrojs/markdown-satteri"
import react from "@astrojs/react"

/**
 * Envuelve cada `<table>` del markdown en `.typeset-scroll`.
 *
 * Es el contenedor que shadcn/typeset ya trae para tablas anchas, pero hay que
 * ponerlo a mano: el markdown emite la tabla pelada. Las notas usan tablas
 * comparativas seguido —es el formato que mejor extraen los motores de
 * respuesta— y una de cuatro columnas desborda cualquier teléfono; sin el
 * contenedor el que scrollea es el `<body>` y la página entera queda corrida.
 *
 * Va sobre la API nativa de Sätteri, el procesador por defecto de Astro, y no
 * como plugin de rehype: `markdown.rehypePlugins` quedó deprecado y usarlo
 * obliga a cambiar el procesador entero por el pipeline unified, que es mucho
 * más lento para lo único que hace falta acá.
 */
const scrollableTables = {
  name: "vantalogics-scrollable-tables",
  element: {
    filter: ["table"],
    /**
     * @param {Readonly<import("hast").Element>} node
     * @param {{ wrapNode: (node: Readonly<import("hast").Element>, parent: any) => void }} ctx
     */
    visit(node, ctx) {
      ctx.wrapNode(node, {
        type: "element",
        tagName: "div",
        properties: { className: ["typeset-scroll"] },
        children: [],
      })
    },
  },
}

// https://astro.build/config
export default defineConfig({
  site: "https://vantalogics.com",
  trailingSlash: "always",
  markdown: {
    processor: satteri({ hastPlugins: [scrollableTables] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
})
