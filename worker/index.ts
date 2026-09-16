/**
 * El sitio es estático: lo único que justifica código de servidor es el
 * redirect de www al apex y el mapa de URLs que salieron del sitio.
 *
 * `www` es un custom domain del mismo Worker, así que sin esto el sitio se
 * serviría duplicado en dos hostnames y Google elegiría el canónico por su
 * cuenta.
 *
 * Corre antes que los assets (`run_worker_first`), porque si no la request a
 * `www.vantalogics.com/` matchearía `index.html` y nunca llegaría acá.
 */
interface Env {
  // El binding se tipa a mano en vez de usar `Fetcher`: los tipos del runtime
  // de Workers no están cargados (el tsconfig es el de Astro, con lib DOM) y
  // meterlos acá choca con `Request`/`Response` del DOM en el resto del sitio.
  ASSETS: { fetch(request: Request): Promise<Response> }
}

/**
 * URLs que existieron y ya no.
 *
 * Vantalogics pasó de agencia generalista a agencia de IA para EdTech. Las
 * páginas de los otros sectores —real estate developers, clínicas, estudios
 * contables, distribuidoras, ecommerce y estudios jurídicos—, sus casos de uso
 * y las notas escritas para ellos salieron del sitio. Estaban indexadas, así
 * que van con 301 a lo más cercano que sigue existiendo: las páginas de sector
 * a la portada del idioma, las notas al índice de notas.
 *
 * Los sectores se resuelven por prefijo porque cada uno arrastra sus casos de
 * uso debajo; el prefijo es un slug de sector completo con barra final, así que
 * no puede capturar una URL que exista. Las notas van literales.
 */
const REMOVED_SECTORS: [prefix: string, target: string][] = [
  ...[
    "inmobiliarias",
    "real-estate-developers",
    "clinicas-y-consultorios",
    "estudios-contables",
    "distribuidoras-y-mayoristas",
    "ecommerce",
    "estudios-juridicos",
  ].map((slug): [string, string] => [`/soluciones/${slug}/`, "/"]),
  ...[
    "real-estate-agencies",
    "real-estate-developers",
    "clinics-and-medical-practices",
    "accounting-firms",
    "distributors-and-wholesalers",
    "ecommerce",
    "law-firms",
  ].flatMap((slug): [string, string][] => [
    [`/en/solutions/${slug}/`, "/en/"],
    [`/solutions/${slug}/`, "/en/"],
  ]),
]

const REMOVED_POSTS: Record<string, string> = Object.fromEntries([
  ...[
    "cuanto-cuesta-un-agente-de-ia-para-una-inmobiliaria",
    "cuanto-cuesta-un-agente-de-ia-para-un-real-estate-developer",
    "errores-de-un-agente-de-ia-en-una-inmobiliaria",
    "errores-de-un-agente-de-ia-en-un-real-estate-developer",
    "tiempo-de-respuesta-en-una-inmobiliaria",
    "tiempo-de-respuesta-en-un-real-estate-developer",
    "crm-inmobiliario-antes-de-automatizar",
    "centralizar-los-datos-antes-de-automatizar",
    "agente-de-ia-para-whatsapp-que-carga-pedidos",
  ].map((slug) => [`/blog/${slug}/`, "/blog/"]),
  ...[
    "how-much-does-an-ai-agent-for-a-real-estate-agency-cost",
    "how-much-does-an-ai-agent-for-a-real-estate-developer-cost",
    "mistakes-an-ai-agent-makes-in-real-estate",
    "mistakes-an-ai-agent-makes-at-a-real-estate-developer",
    "response-time-in-a-real-estate-agency",
    "response-time-at-a-real-estate-developer",
    "real-estate-crm-before-automating",
    "centralize-your-data-before-automating",
  ].map((slug) => [`/en/blog/${slug}/`, "/en/blog/"]),
])

/**
 * La versión en árabe salió del sitio mientras se rehace la marca.
 *
 * Sus URLs estaban indexadas, así que cada `/ar/…` va a su equivalente en
 * inglés —la misma página, el idioma más cercano de los dos que quedan— y
 * desde ahí, si esa página tampoco existe ya, sigue la regla que corresponda.
 */
function withoutArabic(path: string): string {
  return path.startsWith("/ar/") ? `/en/${path.slice(4)}` : path
}

function redirectTarget(path: string): string | undefined {
  if (REMOVED_POSTS[path]) return REMOVED_POSTS[path]
  return REMOVED_SECTORS.find(([prefix]) => path.startsWith(prefix))?.[1]
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.hostname === "www.vantalogics.com") {
      url.hostname = "vantalogics.com"
      // A https directo: si no, `http://www` encadena dos saltos (el segundo lo
      // haría el upgrade a HTTPS ya sobre el apex).
      url.protocol = "https:"
      return Response.redirect(url.toString(), 301)
    }

    // La barra final se normaliza antes de buscar: una request sin ella nunca
    // matchearía el mapa y caería en el 404 del sitio.
    const path = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`
    const latin = withoutArabic(path)
    const target = redirectTarget(latin) ?? (latin !== path ? latin : undefined)
    if (target) {
      url.pathname = target
      return Response.redirect(url.toString(), 301)
    }

    return env.ASSETS.fetch(request)
  },
}
