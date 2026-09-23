/**
 * El sitio es estático: lo único que justifica código de servidor es el
 * redirect de www al apex y el mapa de URLs viejas.
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
 * Dos capas de historia en el mismo mapa. Primero «inmobiliarias» pasó a ser
 * «real estate developers»; después el rubro entero salió del sitio para dejar
 * una sola industria foco, EdTech. Las dos generaciones de URL estuvieron
 * indexadas, así que las dos apuntan con 301 —permanente— al índice del nivel
 * que les corresponde: las páginas de sector y de caso de uso al índice de
 * soluciones, las notas al índice del blog. Un 301 al índice transfiere parte
 * de la autoridad y deja al visitante en algo útil; un 404 pierde las dos.
 *
 * El mapa es literal y no un patrón: un `replace("inmobiliarias", …)` mandaría
 * a 301 cualquier URL futura que contenga la palabra, incluida una que sí
 * exista. Las claves llevan la barra final porque el sitio usa
 * `trailingSlash: "always"`.
 */
const SOLUTIONS_INDEX = {
  es: "/soluciones/",
  en: "/en/solutions/",
  ar: "/ar/solutions/",
}
const BLOG_INDEX = { es: "/blog/", en: "/en/blog/", ar: "/ar/blog/" }

const REDIRECTS: Record<string, string> = {
  // ── Páginas de sector y casos de uso ───────────────────────────────────
  // Sectores fuera de educación, retirados del sitio.
  "/soluciones/clinicas-y-consultorios/": SOLUTIONS_INDEX.es,
  "/en/solutions/clinics-and-medical-practices/": SOLUTIONS_INDEX.en,
  "/ar/solutions/clinics-and-medical-practices/": SOLUTIONS_INDEX.ar,
  "/soluciones/estudios-contables/": SOLUTIONS_INDEX.es,
  "/en/solutions/accounting-firms/": SOLUTIONS_INDEX.en,
  "/ar/solutions/accounting-firms/": SOLUTIONS_INDEX.ar,
  "/soluciones/distribuidoras-y-mayoristas/": SOLUTIONS_INDEX.es,
  "/en/solutions/distributors-and-wholesalers/": SOLUTIONS_INDEX.en,
  "/ar/solutions/distributors-and-wholesalers/": SOLUTIONS_INDEX.ar,
  "/soluciones/ecommerce/": SOLUTIONS_INDEX.es,
  "/en/solutions/ecommerce/": SOLUTIONS_INDEX.en,
  "/ar/solutions/ecommerce/": SOLUTIONS_INDEX.ar,
  "/soluciones/estudios-juridicos/": SOLUTIONS_INDEX.es,
  "/en/solutions/law-firms/": SOLUTIONS_INDEX.en,
  "/ar/solutions/law-firms/": SOLUTIONS_INDEX.ar,

  // Generación actual (real estate developers), la que acaba de salir.
  "/soluciones/real-estate-developers/": SOLUTIONS_INDEX.es,
  "/en/solutions/real-estate-developers/": SOLUTIONS_INDEX.en,
  "/ar/solutions/real-estate-developers/": SOLUTIONS_INDEX.ar,
  "/soluciones/real-estate-developers/agente-de-whatsapp/": SOLUTIONS_INDEX.es,
  "/en/solutions/real-estate-developers/whatsapp-agent/": SOLUTIONS_INDEX.en,
  "/ar/solutions/real-estate-developers/whatsapp-agent/": SOLUTIONS_INDEX.ar,
  "/soluciones/real-estate-developers/calificacion-de-leads/":
    SOLUTIONS_INDEX.es,
  "/en/solutions/real-estate-developers/lead-qualification/":
    SOLUTIONS_INDEX.en,
  "/ar/solutions/real-estate-developers/lead-qualification/":
    SOLUTIONS_INDEX.ar,
  "/soluciones/real-estate-developers/coordinacion-de-visitas/":
    SOLUTIONS_INDEX.es,
  "/en/solutions/real-estate-developers/unit-visit-coordination/":
    SOLUTIONS_INDEX.en,
  "/ar/solutions/real-estate-developers/unit-visit-coordination/":
    SOLUTIONS_INDEX.ar,
  "/soluciones/real-estate-developers/centralizacion-de-datos/":
    SOLUTIONS_INDEX.es,
  "/en/solutions/real-estate-developers/data-centralization/":
    SOLUTIONS_INDEX.en,
  "/ar/solutions/real-estate-developers/data-centralization/":
    SOLUTIONS_INDEX.ar,

  // Generación anterior (inmobiliarias). Antes saltaban al slug nuevo; ahora
  // van directo al índice para no encadenar dos 301.
  "/soluciones/inmobiliarias/": SOLUTIONS_INDEX.es,
  "/en/solutions/real-estate-agencies/": SOLUTIONS_INDEX.en,
  "/ar/solutions/real-estate-agencies/": SOLUTIONS_INDEX.ar,
  "/soluciones/inmobiliarias/agente-de-whatsapp/": SOLUTIONS_INDEX.es,
  "/en/solutions/real-estate-agencies/whatsapp-agent/": SOLUTIONS_INDEX.en,
  "/ar/solutions/real-estate-agencies/whatsapp-agent/": SOLUTIONS_INDEX.ar,
  "/soluciones/inmobiliarias/calificacion-de-leads/": SOLUTIONS_INDEX.es,
  "/en/solutions/real-estate-agencies/lead-qualification/": SOLUTIONS_INDEX.en,
  "/ar/solutions/real-estate-agencies/lead-qualification/": SOLUTIONS_INDEX.ar,
  "/soluciones/inmobiliarias/coordinacion-de-visitas/": SOLUTIONS_INDEX.es,
  "/en/solutions/real-estate-agencies/viewing-coordination/":
    SOLUTIONS_INDEX.en,
  "/ar/solutions/real-estate-agencies/viewing-coordination/":
    SOLUTIONS_INDEX.ar,
  "/soluciones/inmobiliarias/reactivacion-de-base-de-datos/":
    SOLUTIONS_INDEX.es,
  "/en/solutions/real-estate-agencies/database-reactivation/":
    SOLUTIONS_INDEX.en,
  "/ar/solutions/real-estate-agencies/database-reactivation/":
    SOLUTIONS_INDEX.ar,

  // ── Notas del silo ─────────────────────────────────────────────────────
  // Generación actual.
  "/blog/cuanto-cuesta-un-agente-de-ia-para-un-real-estate-developer/":
    BLOG_INDEX.es,
  "/en/blog/how-much-does-an-ai-agent-for-a-real-estate-developer-cost/":
    BLOG_INDEX.en,
  "/ar/blog/how-much-does-an-ai-agent-for-a-real-estate-developer-cost/":
    BLOG_INDEX.ar,
  "/blog/errores-de-un-agente-de-ia-en-un-real-estate-developer/":
    BLOG_INDEX.es,
  "/en/blog/mistakes-an-ai-agent-makes-at-a-real-estate-developer/":
    BLOG_INDEX.en,
  "/ar/blog/mistakes-an-ai-agent-makes-at-a-real-estate-developer/":
    BLOG_INDEX.ar,
  "/blog/tiempo-de-respuesta-en-un-real-estate-developer/": BLOG_INDEX.es,
  "/en/blog/response-time-at-a-real-estate-developer/": BLOG_INDEX.en,
  "/ar/blog/response-time-at-a-real-estate-developer/": BLOG_INDEX.ar,
  "/blog/centralizar-los-datos-antes-de-automatizar/": BLOG_INDEX.es,
  "/en/blog/centralize-your-data-before-automating/": BLOG_INDEX.en,
  "/ar/blog/centralize-your-data-before-automating/": BLOG_INDEX.ar,

  // Generación anterior.
  "/blog/cuanto-cuesta-un-agente-de-ia-para-una-inmobiliaria/": BLOG_INDEX.es,
  "/en/blog/how-much-does-an-ai-agent-for-a-real-estate-agency-cost/":
    BLOG_INDEX.en,
  "/ar/blog/how-much-does-an-ai-agent-for-a-real-estate-agency-cost/":
    BLOG_INDEX.ar,
  "/blog/errores-de-un-agente-de-ia-en-una-inmobiliaria/": BLOG_INDEX.es,
  "/en/blog/mistakes-an-ai-agent-makes-in-real-estate/": BLOG_INDEX.en,
  "/ar/blog/mistakes-an-ai-agent-makes-in-real-estate/": BLOG_INDEX.ar,
  "/blog/tiempo-de-respuesta-en-una-inmobiliaria/": BLOG_INDEX.es,
  "/en/blog/response-time-in-a-real-estate-agency/": BLOG_INDEX.en,
  "/ar/blog/response-time-in-a-real-estate-agency/": BLOG_INDEX.ar,
  "/blog/crm-inmobiliario-antes-de-automatizar/": BLOG_INDEX.es,
  "/en/blog/real-estate-crm-before-automating/": BLOG_INDEX.en,
  "/ar/blog/real-estate-crm-before-automating/": BLOG_INDEX.ar,
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
    const target = REDIRECTS[path]
    if (target) {
      url.pathname = target
      return Response.redirect(url.toString(), 301)
    }

    return env.ASSETS.fetch(request)
  },
}
