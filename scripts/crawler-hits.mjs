import { readFile } from "node:fs/promises"
import { homedir } from "node:os"

const ZONE = "d1fa1955dd2d6b6d21289c75d981c54e"
const BOTS = [
  "bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
  "Googlebot",
]

const days = Number(process.argv[2] ?? 7)
const only = process.argv[3]

const findToken = (node) => {
  if (!node || typeof node !== "object") return null
  for (const [key, value] of Object.entries(node)) {
    if (
      ["access_token", "oauth_token", "api_token", "token"].includes(key) &&
      typeof value === "string" &&
      value.length > 20
    )
      return value
    const nested = findToken(value)
    if (nested) return nested
  }
  return null
}

const token =
  process.env.CLOUDFLARE_API_TOKEN ??
  findToken(
    JSON.parse(
      await readFile(
        `${homedir()}/.config/cloudflare/config/default.json`,
        "utf8"
      )
    )
  )

const end = new Date()
const start = new Date(end.getTime() - days * 86400000)
const bots = only ? BOTS.filter((bot) => bot === only) : BOTS
const or = bots.map((bot) => `{userAgent_like:"%${bot}%"}`).join(",")

const query = `{ viewer { zones(filter:{zoneTag:"${ZONE}"}) {
  httpRequestsAdaptiveGroups(limit:5000, filter:{datetime_geq:"${start.toISOString()}", datetime_lt:"${end.toISOString()}", clientRequestHTTPHost:"vantalogics.com", OR:[${or}]}, orderBy:[date_ASC]) {
    count dimensions { date clientRequestPath edgeResponseStatus userAgent }
  } } } }`

const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query }),
})
const { data, errors } = await response.json()
if (errors?.length) {
  console.error(errors.map((error) => error.message).join("\n"))
  process.exit(1)
}

const rows = data.viewer.zones[0].httpRequestsAdaptiveGroups
const isPage = (path) =>
  !/\.(css|js|png|jpg|webp|svg|ico|woff2|xml|txt|webmanifest)$/.test(path)
const byBot = new Map()
for (const { count, dimensions } of rows) {
  const bot = bots.find((name) => dimensions.userAgent.includes(name))
  if (!bot) continue
  const entry = byBot.get(bot) ?? { hits: 0, pages: new Map() }
  entry.hits += count
  if (isPage(dimensions.clientRequestPath)) {
    const key = `${dimensions.clientRequestPath} ${dimensions.edgeResponseStatus}`
    const page = entry.pages.get(key) ?? { count: 0, last: "" }
    page.count += count
    page.last = dimensions.date > page.last ? dimensions.date : page.last
    entry.pages.set(key, page)
  }
  byBot.set(bot, entry)
}

console.log(`${start.toISOString().slice(0, 10)} → ${end.toISOString().slice(0, 10)}`)
for (const bot of bots) {
  const entry = byBot.get(bot)
  if (!entry) {
    console.log(`\n${bot}: 0`)
    continue
  }
  console.log(`\n${bot}: ${entry.hits} requests, ${entry.pages.size} pages`)
  for (const [key, page] of [...entry.pages].sort(
    (a, b) => b[1].count - a[1].count
  ))
    console.log(`  ${String(page.count).padStart(3)}  ${page.last}  ${key}`)
}
