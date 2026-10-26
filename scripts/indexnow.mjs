import { readFile } from "node:fs/promises"

const HOST = "vantalogics.com"
const KEY = "cac0d560eacf83ba4cdfa6a63b810e9d"

const entries = (xml) =>
  new Map(
    [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => [
      block.match(/<loc>([^<]+)<\/loc>/)[1],
      block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? "",
    ])
  )

const current = entries(
  await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8")
)

const previousPath = process.argv[2]
const previous = previousPath
  ? entries(await readFile(previousPath, "utf8").catch(() => ""))
  : new Map()

const urlList =
  previous.size === 0
    ? [...current.keys()]
    : [
        ...[...current].filter(([url, lastmod]) => previous.get(url) !== lastmod),
        ...[...previous].filter(([url]) => !current.has(url)),
      ].map(([url]) => url)

if (urlList.length === 0) {
  console.log("IndexNow: no URL changed, nothing sent")
  process.exit(0)
}

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
console.log(urlList.join("\n"))
if (!response.ok && response.status !== 202) {
  console.log(await response.text())
}
