interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> }
}

const SOLUTIONS_INDEX = {
  es: "/soluciones/",
  en: "/en/solutions/",
  ar: "/ar/solutions/",
}
const BLOG_INDEX = { es: "/blog/", en: "/en/blog/", ar: "/ar/blog/" }

const REDIRECTS: Record<string, string> = {
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
      url.protocol = "https:"
      return Response.redirect(url.toString(), 301)
    }

    const path = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`
    const target = REDIRECTS[path]
    if (target) {
      url.pathname = target
      return Response.redirect(url.toString(), 301)
    }

    return env.ASSETS.fetch(request)
  },
}
