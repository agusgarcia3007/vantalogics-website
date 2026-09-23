import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { satteri } from "@astrojs/markdown-satteri"
import react from "@astrojs/react"

const scrollableTables = {
  name: "vantalogics-scrollable-tables",
  element: {
    filter: ["table"],
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
