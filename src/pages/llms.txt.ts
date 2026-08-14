import type { APIRoute } from "astro"

import { getPosts, postPath } from "@/lib/blog"
import { SOLUTIONS, solutionPath, solutionsIndexPath } from "@/data/solutions"

const SITE = "https://vantalogics.com"

const url = (path: string) => new URL(path, SITE).href

/**
 * `llms.txt` generado.
 *
 * Antes era un archivo estático en `public/`. Se pasó a ruta por el mismo
 * motivo que el sitemap: es un índice, y un índice escrito a mano queda
 * desactualizado en la primera publicación.
 *
 * La parte de arriba —qué hace la empresa, cómo trabaja, los datos duros— sigue
 * siendo prosa fija y curada, porque eso no se deriva de ningún dato. Lo que se
 * genera es el listado de contenido, y cada nota entra con su respuesta corta:
 * un modelo que lee este archivo y no llega a visitar la página igual se lleva
 * la afirmación citable.
 */
export const GET: APIRoute = async () => {
  const postsEs = await getPosts("es")
  const postsEn = await getPosts("en")
  const postsAr = await getPosts("ar")

  const preamble = `# Vantalogics

> Agencia de sistemas de IA. Automatizamos procesos de empresas y construimos
> agentes de IA a medida —evaluados, monitoreados y con control humano— que
> aguantan producción.

- Sitio (ES): ${SITE}
- Site (EN): ${url("/en/")}
- الموقع (AR): ${url("/ar/")}
- Contacto: hello@vantalogics.com
- Idiomas: español, inglés, árabe
- Cobertura: América Latina, España, Estados Unidos y el Golfo (remoto)

## Servicios

- **Automatización de procesos**: onboarding de clientes, extracción y validación de documentos, conciliaciones y reportes, triage de tickets y correo.
- **Agentes de IA a medida**: agentes conectados a CRM, ERP, bases de datos y APIs internas, con permisos acotados, aprobaciones humanas e integración con Slack, WhatsApp, correo o el producto del cliente.
- **Agentes robustos y medibles**: sets de evaluación con casos reales, guardrails, límites de acción, trazas de ejecución, control de costos y alertas de degradación de calidad.
- **AI Solutions e integración**: búsqueda semántica y RAG sobre datos propios, features de IA embebidas en el producto, selección de modelos y traspaso al equipo interno.

## Cómo trabajamos

1. **Diagnóstico**: 30 minutos sin costo; mapa del proceso actual y estimación de qué conviene automatizar.
2. **Diseño y prueba**: métrica de éxito acordada, set de evaluación con casos reales y primera versión funcional.
3. **Producción**: integración, permisos, guardrails y observabilidad; salida gradual a producción.
4. **Operación y traspaso**: monitoreo, ajuste de calidad, control de costos, documentación y capacitación del equipo interno.

El alcance, el ritmo y los plazos se definen con cada cliente durante el
diagnóstico: dependen del proceso y de las integraciones involucradas.

## Datos clave

- Trabajo por ciclos cortos: hay algo usable y medible en cada entrega.
- Presupuesto por proyecto con alcance cerrado, definido después del diagnóstico.
- Los datos y el código quedan en la infraestructura y las cuentas del cliente; no se usan datos de clientes para entrenar modelos.
- Agnósticos de proveedor de modelos: la elección se hace por costo, latencia y precisión en cada caso.
- Las acciones de alto impacto siempre pasan por revisión humana y quedan registradas.`

  const solutions = `## Soluciones por sector

Cada página describe qué se automatiza primero en ese rubro, con qué sistemas
se integra, qué queda con aprobación humana y —explícitamente— cuándo no
conviene automatizar.

${SOLUTIONS.map(
  (solution) =>
    `- [${solution.title.es}](${url(solutionPath("es", solution))}) · [EN](${url(solutionPath("en", solution))}) · [AR](${url(solutionPath("ar", solution))})\n  ${solution.answer.es}`
).join("\n")}

Índice: ${url(solutionsIndexPath("es"))} · ${url(solutionsIndexPath("en"))} · ${url(solutionsIndexPath("ar"))}`

  const notes = `## Notas

Apuntes de trabajo sobre costos reales, criterios de decisión y fallas de
producción. Cada entrada incluye su respuesta corta.

${postsEs
  .map(
    (post) =>
      `- [${post.data.title}](${url(postPath(post))}) — ${post.data.date.toISOString().slice(0, 10)}\n  ${post.data.answer}`
  )
  .join("\n")}

### Notes (EN)

${postsEn
  .map(
    (post) =>
      `- [${post.data.title}](${url(postPath(post))}) — ${post.data.date.toISOString().slice(0, 10)}\n  ${post.data.answer}`
  )
  .join("\n")}

### ملاحظات (AR)

${postsAr
  .map(
    (post) =>
      `- [${post.data.title}](${url(postPath(post))}) — ${post.data.date.toISOString().slice(0, 10)}\n  ${post.data.answer}`
  )
  .join("\n")}`

  const links = `## Enlaces

- [Servicios](${url("/#servicios")})
- [Proceso](${url("/#proceso")})
- [Resultados](${url("/#resultados")})
- [Preguntas frecuentes](${url("/#faq")})
- [Contacto](${url("/#contacto")})
- [Notas](${url("/blog/")}) · [Notes](${url("/en/blog/")}) · [ملاحظات](${url("/ar/blog/")})
- [Soluciones](${url(solutionsIndexPath("es"))}) · [Solutions](${url(solutionsIndexPath("en"))}) · [الحلول](${url(solutionsIndexPath("ar"))})
- RSS: ${url("/rss.xml")} · ${url("/en/rss.xml")} · ${url("/ar/rss.xml")}`

  const body = [preamble, solutions, notes, links].join("\n\n") + "\n"

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
