import type { APIRoute } from "astro"

import { getPosts, postPath } from "@/lib/blog"
import {
  FOCUS_SOLUTIONS,
  OTHER_SOLUTIONS,
  solutionPath,
  solutionsIndexPath,
} from "@/data/solutions"
import { casePath, casesFor } from "@/data/use-cases"
import { CASES, caseStudyPath, formatStudents } from "@/data/cases"

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

  const preamble = `# Vantalogics

> Estudio de producto e ingeniería de IA para educación. Construimos agentes
> especializados y el software necesario para convertirlos en productos reales.

- Sitio (ES): ${SITE}
- Site (EN): ${url("/en/")}
- Contacto: hello@vantalogics.com
- Idiomas de trabajo: español e inglés
- Cobertura: América Latina, España y Estados Unidos (remoto)

## Para quién

Fundadores y líderes de producto de empresas EdTech, plataformas educativas con
producto propio, universidades, empresas de formación profesional o corporativa
y compañías de software que entran al sector educativo.

## Qué construimos

- **Agentes especializados**: integrados al producto, trabajan sobre contenido y datos propios, respetan usuarios, permisos y etapas, se conectan con APIs y herramientas internas, escalan decisiones sensibles a una persona y registran sus fuentes y acciones.
- **Experiencias de aprendizaje con IA**: acompañamiento contextual, búsqueda con fuentes, práctica y simulaciones, recomendaciones según progreso y feedback inmediato.
- **Evaluación y operaciones académicas**: corrección asistida con rúbricas, generación y validación de evaluaciones, análisis de respuestas, herramientas para docentes, revisión humana y trazabilidad.
- **Plataformas y software educativo**: plataformas completas, portales para alumnos y docentes, herramientas de autor, integraciones con LMS y SIS, infraestructura y operación.

Integraciones y estándares: Moodle, Canvas, Open edX, Google Classroom, LTI 1.3,
xAPI, SCORM, SIS y plataformas propias.

## Cómo trabajamos

1. **Definimos la oportunidad**: producto, usuarios, contenido y operación; un problema con resultado observable.
2. **Diseñamos el sistema**: experiencia, restricciones, arquitectura y métricas antes de desarrollar.
3. **Construimos una versión real**: con contenido e integraciones reales, no una maqueta.
4. **Probamos con usuarios**: alcance controlado (una cohorte, una materia, un equipo).
5. **Medimos y escalamos**: cuando calidad, adopción y economía unitaria lo justifican.

## Principios

- El sistema responde desde el material y las reglas de la institución.
- Calificaciones definitivas, integridad académica y decisiones sobre un alumno quedan en manos de una persona.
- Calidad, adopción, costo, latencia y correcciones humanas quedan registrados.
- Código, infraestructura, cuentas y documentación quedan en manos del cliente.`

  /**
   * La industria foco va primero y con sus casos de uso desplegados.
   *
   * Un modelo que resume esta empresa a partir del archivo tiene que salir
   * sabiendo dos cosas en este orden: que es una agencia especializada en
   * EdTech y producto educativo, y que además trabaja otros rubros. Una lista
   * plana de cinco sectores produce el resumen contrario —«agencia generalista
   * de automatización»— que es exactamente el posicionamiento del que se está
   * saliendo.
   */
  const focus = `## Páginas por sector

Sectores con página propia. Cada página describe qué
se automatiza primero, con qué sistemas se integra, qué queda con aprobación
humana y —explícitamente— cuándo no conviene automatizar.

${FOCUS_SOLUTIONS.map((solution) => {
  const cases = casesFor(solution)
    .map(
      (useCase) =>
        `  - [${useCase.title.es}](${url(casePath("es", solution, useCase))}) · [EN](${url(casePath("en", solution, useCase))})\n    ${useCase.answer.es}`
    )
    .join("\n")
  return `### ${solution.sector.es}\n\n[${solution.title.es}](${url(solutionPath("es", solution))}) · [EN](${url(solutionPath("en", solution))})\n\n${solution.answer.es}\n\nCasos de uso:\n\n${cases}`
}).join("\n\n")}`

  const solutions = `## Otros sectores

Mismo formato, sin la capa de casos de uso.

${OTHER_SOLUTIONS.map(
  (solution) =>
    `- [${solution.title.es}](${url(solutionPath("es", solution))}) · [EN](${url(solutionPath("en", solution))})\n  ${solution.answer.es}`
).join("\n")}

Índice: ${url(solutionsIndexPath("es"))} · ${url(solutionsIndexPath("en"))}`

  const studies = `## Productos construidos

Casos de productos educativos en producción, con alcance verificable.

${CASES.map(
  (study) =>
    `- [${study.client.es}](${url(caseStudyPath("es", study.slug))}) · [EN](${url(caseStudyPath("en", study.slug))}) — ${formatStudents("es", study.students)} estudiantes\n  ${study.title.es}`
).join("\n")}`

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
  .join("\n")}`

  const links = `## Enlaces

- [Qué construimos](${url("/#capacidades")})
- [Proceso](${url("/#proceso")})
- [Principios](${url("/#principios")})
- [Contacto](${url("/#contacto")})
- [Notas](${url("/blog/")}) · [Notes](${url("/en/blog/")})
- [Soluciones](${url(solutionsIndexPath("es"))}) · [Solutions](${url(solutionsIndexPath("en"))})
- RSS: ${url("/rss.xml")} · ${url("/en/rss.xml")}`

  const body =
    [preamble, studies, focus, solutions, notes, links].join("\n\n") + "\n"

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
