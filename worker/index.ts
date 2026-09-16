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
 * El sector «inmobiliarias» pasó a ser «real estate developers», que no es un
 * cambio de nombre sino de público: cambiaron los slugs de la página de sector,
 * los de sus casos de uso y los de las cuatro notas del silo. Las viejas
 * estaban indexadas, así que van con 301 —permanente— para que el enlace y la
 * autoridad se transfieran en vez de perderse en un 404.
 *
 * El mapa es literal y no un patrón: un `replace("inmobiliarias", …)` mandaría
 * a 301 cualquier URL futura que contenga la palabra, incluida una que sí
 * exista. Las claves llevan la barra final porque el sitio usa
 * `trailingSlash: "always"`.
 */
const REDIRECTS: Record<string, string> = {
  // Página de sector.
  "/soluciones/inmobiliarias/": "/soluciones/real-estate-developers/",
  "/solutions/real-estate-agencies/": "/solutions/real-estate-developers/",
  "/ar/solutions/real-estate-agencies/":
    "/ar/solutions/real-estate-developers/",

  // Casos de uso: los dos primeros conservan el slug, los otros dos cambiaron.
  "/soluciones/inmobiliarias/agente-de-whatsapp/":
    "/soluciones/real-estate-developers/agente-de-whatsapp/",
  "/solutions/real-estate-agencies/whatsapp-agent/":
    "/solutions/real-estate-developers/whatsapp-agent/",
  "/ar/solutions/real-estate-agencies/whatsapp-agent/":
    "/ar/solutions/real-estate-developers/whatsapp-agent/",
  "/soluciones/inmobiliarias/calificacion-de-leads/":
    "/soluciones/real-estate-developers/calificacion-de-leads/",
  "/solutions/real-estate-agencies/lead-qualification/":
    "/solutions/real-estate-developers/lead-qualification/",
  "/ar/solutions/real-estate-agencies/lead-qualification/":
    "/ar/solutions/real-estate-developers/lead-qualification/",
  "/soluciones/inmobiliarias/coordinacion-de-visitas/":
    "/soluciones/real-estate-developers/coordinacion-de-visitas/",
  "/solutions/real-estate-agencies/viewing-coordination/":
    "/solutions/real-estate-developers/unit-visit-coordination/",
  "/ar/solutions/real-estate-agencies/viewing-coordination/":
    "/ar/solutions/real-estate-developers/unit-visit-coordination/",
  // La reactivación de base salió y la reemplazó la centralización de datos:
  // es el caso más cercano de la nueva grilla, no una traducción del anterior.
  "/soluciones/inmobiliarias/reactivacion-de-base-de-datos/":
    "/soluciones/real-estate-developers/centralizacion-de-datos/",
  "/solutions/real-estate-agencies/database-reactivation/":
    "/solutions/real-estate-developers/data-centralization/",
  "/ar/solutions/real-estate-agencies/database-reactivation/":
    "/ar/solutions/real-estate-developers/data-centralization/",

  // Notas del silo.
  "/blog/cuanto-cuesta-un-agente-de-ia-para-una-inmobiliaria/":
    "/blog/cuanto-cuesta-un-agente-de-ia-para-un-real-estate-developer/",
  "/en/blog/how-much-does-an-ai-agent-for-a-real-estate-agency-cost/":
    "/en/blog/how-much-does-an-ai-agent-for-a-real-estate-developer-cost/",
  "/ar/blog/how-much-does-an-ai-agent-for-a-real-estate-agency-cost/":
    "/ar/blog/how-much-does-an-ai-agent-for-a-real-estate-developer-cost/",
  "/blog/errores-de-un-agente-de-ia-en-una-inmobiliaria/":
    "/blog/errores-de-un-agente-de-ia-en-un-real-estate-developer/",
  "/en/blog/mistakes-an-ai-agent-makes-in-real-estate/":
    "/en/blog/mistakes-an-ai-agent-makes-at-a-real-estate-developer/",
  "/ar/blog/mistakes-an-ai-agent-makes-in-real-estate/":
    "/ar/blog/mistakes-an-ai-agent-makes-at-a-real-estate-developer/",
  "/blog/tiempo-de-respuesta-en-una-inmobiliaria/":
    "/blog/tiempo-de-respuesta-en-un-real-estate-developer/",
  "/en/blog/response-time-in-a-real-estate-agency/":
    "/en/blog/response-time-at-a-real-estate-developer/",
  "/ar/blog/response-time-in-a-real-estate-agency/":
    "/ar/blog/response-time-at-a-real-estate-developer/",
  "/blog/crm-inmobiliario-antes-de-automatizar/":
    "/blog/centralizar-los-datos-antes-de-automatizar/",
  "/en/blog/real-estate-crm-before-automating/":
    "/en/blog/centralize-your-data-before-automating/",
  "/ar/blog/real-estate-crm-before-automating/":
    "/ar/blog/centralize-your-data-before-automating/",
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
