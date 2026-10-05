import { readFile } from "node:fs/promises"

const HOST = "vantalogics.com"
const KEY = "cac0d560eacf83ba4cdfa6a63b810e9d"

const sitemap = await readFile(
  new URL("../dist/sitemap.xml", import.meta.url),
  "utf8"
)
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1]
)

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
})

console.log(`IndexNow: ${response.status} for ${urlList.length} URLs`)
if (!response.ok && response.status !== 202) {
  console.log(await response.text())
}
