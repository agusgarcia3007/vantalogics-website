import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"

import sharp from "sharp"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const WIDTH = 1200
const HEIGHT = 630

const content = {
  es: {
    eyebrow: "PRODUCTO · IA · INGENIERÍA PARA EDUCACIÓN",
    title: [
      "Construimos la inteligencia",
      "detrás de los productos",
      "educativos.",
    ],
    lead: [
      "Estrategia de producto, IA e ingeniería de software",
      "en un mismo equipo.",
    ],
    agent: "AGENTE DE TUTORÍA",
    status: "EN PRODUCCIÓN",
    metrics: [
      ["FUENTE", "Validada"],
      ["LATENCIA", "1.4 s"],
      ["REVISIÓN", "Bajo control"],
    ],
  },
  en: {
    eyebrow: "AI PRODUCT · ENGINEERING · EDUCATION",
    title: ["We build the intelligence", "behind education", "products."],
    lead: [
      "Product strategy, applied AI and software engineering",
      "in one team.",
    ],
    agent: "TUTORING AGENT",
    status: "IN PRODUCTION",
    metrics: [
      ["SOURCE", "Validated"],
      ["LATENCY", "1.4 s"],
      ["REVIEW", "Controlled"],
    ],
  },
}

const escapeXml = (value) =>
  value.replace(/[<>&'\"]/g, (character) => {
    const entities = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '\"': "&quot;",
    }
    return entities[character]
  })

const logo = await readFile(path.join(ROOT, "public/logo-va.png"))
const logoData = `data:image/png;base64,${logo.toString("base64")}`
const inter = await readFile(
  path.join(
    ROOT,
    "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"
  )
)
const mono = await readFile(
  path.join(
    ROOT,
    "node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2"
  )
)

const interData = `data:font/woff2;base64,${inter.toString("base64")}`
const monoData = `data:font/woff2;base64,${mono.toString("base64")}`

function titleLines(lines) {
  return lines
    .map(
      (line, index) =>
        `<tspan x="52" dy="${index === 0 ? 0 : 70}">${escapeXml(line)}</tspan>`
    )
    .join("")
}

function leadLines(lines) {
  return lines
    .map(
      (line, index) =>
        `<tspan x="54" dy="${index === 0 ? 0 : 29}">${escapeXml(line)}</tspan>`
    )
    .join("")
}

function metricColumns(metrics) {
  return metrics
    .map(([label, value], index) => {
      const x = 26 + index * 105
      return `
        <text x="${x}" y="70" class="micro">${escapeXml(label)}</text>
        <text x="${x}" y="94" class="metric">${escapeXml(value)}</text>
      `
    })
    .join("")
}

function svg(lang) {
  const copy = content[lang]

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
      <defs>
        <style>
          @font-face {
            font-family: "Inter OG";
            src: url("${interData}") format("woff2");
            font-weight: 100 900;
          }
          @font-face {
            font-family: "JetBrains OG";
            src: url("${monoData}") format("woff2");
            font-weight: 100 800;
          }
          .sans { font-family: "Inter OG", "Liberation Sans", sans-serif; }
          .mono { font-family: "JetBrains OG", "Liberation Mono", monospace; }
          .headline { font-family: "Inter OG", "Liberation Sans", sans-serif; font-size: 63px; font-weight: 500; letter-spacing: -2.7px; fill: #fff; }
          .eyebrow { font-family: "JetBrains OG", "Liberation Mono", monospace; font-size: 12px; font-weight: 400; letter-spacing: 1.05px; fill: #a7a7a7; }
          .lead { font-family: "Inter OG", "Liberation Sans", sans-serif; font-size: 20px; font-weight: 400; letter-spacing: -0.25px; fill: #a7a7a7; }
          .micro { font-family: "JetBrains OG", "Liberation Mono", monospace; font-size: 9px; letter-spacing: .55px; fill: #7c7c7c; }
          .metric { font-family: "Inter OG", "Liberation Sans", sans-serif; font-size: 12px; font-weight: 500; fill: #fff; }
        </style>

        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="#96aadc" stroke-opacity=".08" stroke-width="1"/>
        </pattern>
        <radialGradient id="grid-mask" cx="76%" cy="42%" r="72%">
          <stop offset="0" stop-color="#fff"/>
          <stop offset=".72" stop-color="#fff" stop-opacity=".55"/>
          <stop offset="1" stop-color="#fff" stop-opacity="0"/>
        </radialGradient>
        <mask id="grid-fade"><rect width="1200" height="630" fill="url(#grid-mask)"/></mask>

        <radialGradient id="moon-fill" cx="75%" cy="20%" r="82%">
          <stop offset="0" stop-color="#292d39"/>
          <stop offset=".28" stop-color="#171920"/>
          <stop offset=".7" stop-color="#0a0b0e"/>
          <stop offset="1" stop-color="#020203"/>
        </radialGradient>
        <linearGradient id="moon-rim" x1="0" y1="1" x2="1" y2="0">
          <stop offset=".18" stop-color="#6798ff" stop-opacity="0"/>
          <stop offset=".62" stop-color="#6798ff" stop-opacity=".16"/>
          <stop offset=".9" stop-color="#6798ff" stop-opacity=".95"/>
          <stop offset="1" stop-color="#fff" stop-opacity=".8"/>
        </linearGradient>
        <radialGradient id="halo">
          <stop offset=".62" stop-color="#6798ff" stop-opacity="0"/>
          <stop offset=".75" stop-color="#6798ff" stop-opacity=".09"/>
          <stop offset="1" stop-color="#6798ff" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="copy-shield" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#0a0a0a"/>
          <stop offset=".7" stop-color="#0a0a0a" stop-opacity=".96"/>
          <stop offset="1" stop-color="#0a0a0a" stop-opacity="0"/>
        </linearGradient>
        <clipPath id="moon-clip"><circle cx="930" cy="292" r="208"/></clipPath>
        <filter id="white-logo" color-interpolation-filters="sRGB">
          <feComponentTransfer>
            <feFuncR type="linear" slope="0" intercept="1"/>
            <feFuncG type="linear" slope="0" intercept="1"/>
            <feFuncB type="linear" slope="0" intercept="1"/>
            <feFuncA type="identity"/>
          </feComponentTransfer>
        </filter>
      </defs>

      <rect width="1200" height="630" fill="#0a0a0a"/>
      <rect width="1200" height="630" fill="url(#grid)" mask="url(#grid-fade)"/>

      <circle cx="930" cy="292" r="306" fill="url(#halo)"/>
      <ellipse cx="930" cy="292" rx="270" ry="226" fill="none" stroke="#6798ff" stroke-opacity=".13" stroke-width="1" transform="rotate(-18 930 292)"/>
      <ellipse cx="930" cy="292" rx="264" ry="218" fill="none" stroke="#313131" stroke-width="1" stroke-dasharray="2 12" transform="rotate(22 930 292)"/>
      <circle cx="930" cy="292" r="208" fill="url(#moon-fill)" stroke="url(#moon-rim)" stroke-width="3"/>

      <g clip-path="url(#moon-clip)" fill="none">
        <ellipse cx="930" cy="292" rx="160" ry="208" stroke="#9eb1e3" stroke-opacity=".12"/>
        <ellipse cx="930" cy="292" rx="82" ry="208" stroke="#9eb1e3" stroke-opacity=".1"/>
        <path d="M722 238 Q930 306 1138 238" stroke="#9eb1e3" stroke-opacity=".11"/>
        <path d="M722 328 Q930 260 1138 328" stroke="#9eb1e3" stroke-opacity=".11"/>
        <path d="M742 396 Q930 354 1118 396" stroke="#9eb1e3" stroke-opacity=".08"/>
        <path d="M738 182 Q930 226 1122 182" stroke="#9eb1e3" stroke-opacity=".08"/>
        <path d="M803 165 C855 131 930 135 976 172 S1068 240 1110 202" stroke="#6798ff" stroke-opacity=".34" stroke-width="1.2"/>
        <path d="M790 350 C840 320 880 344 914 322 S1008 278 1078 304" stroke="#6798ff" stroke-opacity=".2"/>
        <g fill="#6798ff">
          <circle cx="803" cy="165" r="2.5"/>
          <circle cx="914" cy="322" r="2.5"/>
          <circle cx="976" cy="172" r="3"/>
          <circle cx="1078" cy="304" r="2"/>
        </g>
        <g fill="#fff" opacity=".6">
          <circle cx="835" cy="212" r="1.3"/>
          <circle cx="1008" cy="278" r="1.4"/>
          <circle cx="1042" cy="198" r="1.1"/>
          <circle cx="872" cy="386" r="1.2"/>
        </g>
      </g>

      <rect x="0" y="0" width="795" height="630" fill="url(#copy-shield)"/>

      <g>
        <image href="${logoData}" x="52" y="44" width="42" height="32" preserveAspectRatio="xMidYMid meet" filter="url(#white-logo)"/>
        <text x="107" y="69" class="sans" font-size="20" font-weight="500" letter-spacing="-.4" fill="#fff">Vantalogics</text>
        <text x="1148" y="67" class="eyebrow" text-anchor="end">EDU · AI · ENG</text>
      </g>

      <g>
        <line x1="52" y1="111" x2="78" y2="111" stroke="#6798ff" stroke-width="2"/>
        <text x="92" y="115" class="eyebrow">${escapeXml(copy.eyebrow)}</text>
        <text x="52" y="185" class="headline">${titleLines(copy.title)}</text>
        <text x="54" y="399" class="lead">${leadLines(copy.lead)}</text>
      </g>

      <g transform="translate(802 449)">
        <rect width="346" height="114" rx="8" fill="#141414" fill-opacity=".94" stroke="#313131"/>
        <rect x="14" y="13" width="22" height="22" rx="5" fill="#1e1e1e" stroke="#313131"/>
        <circle cx="25" cy="24" r="3" fill="#6798ff"/>
        <text x="47" y="28" class="micro" fill="#fff">${escapeXml(copy.agent)}</text>
        <circle cx="250" cy="23" r="3" fill="#6798ff"/>
        <text x="261" y="27" class="micro">${escapeXml(copy.status)}</text>
        <line x1="0" y1="45" x2="346" y2="45" stroke="#1e1e1e"/>
        ${metricColumns(copy.metrics)}
      </g>

      <line x1="52" y1="578" x2="1148" y2="578" stroke="#1e1e1e"/>
      <text x="52" y="606" class="mono" font-size="11" fill="#a7a7a7">vantalogics.com</text>
      <text x="1148" y="606" class="mono" font-size="10" letter-spacing=".5" fill="#7c7c7c" text-anchor="end">PRODUCT STRATEGY · APPLIED AI · SOFTWARE</text>
    </svg>
  `
}

for (const lang of Object.keys(content)) {
  const output = path.join(ROOT, `public/og-${lang}.png`)
  await sharp(Buffer.from(svg(lang)))
    .png({ compressionLevel: 9, palette: true, quality: 100 })
    .toFile(output)
  console.log(`Generated ${path.relative(ROOT, output)}`)
}
