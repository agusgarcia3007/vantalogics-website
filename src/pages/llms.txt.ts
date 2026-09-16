import type { APIRoute } from "astro"

import { getPosts, postPath } from "@/lib/blog"
import { EDTECH, solutionPath, solutionsIndexPath } from "@/data/solutions"
import { casePath, casesFor } from "@/data/use-cases"

const SITE = "https://vantalogics.com"

const url = (path: string) => new URL(path, SITE).href

/**
 * `llms.txt` generado.
 *
 * Es un índice, y un índice escrito a mano queda desactualizado en la primera
 * publicación. La parte de arriba —qué hace la empresa, cómo trabaja, los
 * datos duros— sigue siendo prosa fija y curada, porque eso no se deriva de
 * ningún dato. Lo que se genera es el listado de contenido, y cada nota entra
 * con su respuesta corta: un modelo que lee este archivo y no llega a visitar
 * la página igual se lleva la afirmación citable.
 *
 * Lo primero que tiene que quedar claro para el que resume esta empresa es la
 * especialización. Por eso el archivo abre diciendo «agencia de IA para
 * EdTech» y no enumera rubros: el posicionamiento es no atender otros.
 */
export const GET: APIRoute = async () => {
  const postsEs = await getPosts("es")
  const postsEn = await getPosts("en")
  const useCases = casesFor(EDTECH)

  const preamble = `# Vantalogics

> Agencia de IA especializada en EdTech. Construimos tutores acotados al curso,
> corrección asistida con rúbrica y búsqueda con citas adentro de plataformas
> educativas: evaluados con casos reales, con control humano sobre la nota y
> con el costo por alumno calculado antes de construir.

- Sitio (ES): ${SITE}
- Site (EN): ${url("/en/")}
- Contacto: hello@vantalogics.com
- Idiomas de trabajo: español e inglés
- Cobertura: América Latina, España y Estados Unidos (remoto)
- Especialización: una sola vertical, educación. No trabajamos otros rubros.

## Qué construimos

- **Tutor acotado al curso**: responde con el material de la unidad, dice que algo no está en el curso en vez de completar, y no resuelve la entrega evaluada.
- **Corrección asistida con rúbrica**: borrador de nota y devolución criterio por criterio con evidencia citada del texto del alumno; el docente ajusta y firma.
- **Búsqueda con cita sobre contenido propio**: recuperación sobre cursos, transcripciones y materiales, citando módulo y minuto del video.
- **Evaluación, costo y operación**: sets de evaluación con casos reales —incluidas las preguntas cuya respuesta correcta es «no está en el material»—, alertas de degradación, y costo y latencia por respuesta.

## Cómo trabajamos

1. **Diagnóstico**: 30 minutos sin costo; inventario del contenido, primer sistema recomendado y costo estimado por alumno activo.
2. **Evidencia antes que código**: set de evaluación con casos reales y métrica de éxito acordada antes de construir.
3. **Producción acotada**: salida con alumnos reales sobre una materia, un curso o una cohorte; se amplía cuando los números aguantan.
4. **Operación y traspaso**: monitoreo de calidad, control de costo por alumno, documentación y capacitación del equipo interno.

## Datos clave

- La nota que queda en el legajo y los casos de integridad académica los firma siempre un docente.
- Los datos de alumnos quedan en la infraestructura y las cuentas del cliente; no se usan para entrenar modelos.
- Con audiencia de menores, el marco legal (COPPA, FERPA, GDPR) define la arquitectura antes que el modelo.
- Presupuesto por proyecto con alcance cerrado, definido después del diagnóstico.
- Agnósticos de proveedor de modelos: la elección se hace por costo, latencia y precisión en cada caso.`

  const sector = `## Sector

[${EDTECH.title.es}](${url(solutionPath("es", EDTECH))}) · [EN](${url(solutionPath("en", EDTECH))})

${EDTECH.answer.es}

### Implementaciones

${useCases
  .map(
    (useCase) =>
      `- [${useCase.title.es}](${url(casePath("es", EDTECH, useCase))}) · [EN](${url(casePath("en", EDTECH, useCase))})\n  ${useCase.answer.es}`
  )
  .join("\n")}

Índice: ${url(solutionsIndexPath("es"))} · ${url(solutionsIndexPath("en"))}`

  const notes = `## Notas

Apuntes de trabajo sobre costo por alumno, criterios de decisión y fallas de
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
- [Cómo trabajamos](${url("/#proceso")})
- [Compromisos](${url("/#compromisos")})
- [Preguntas frecuentes](${url("/#faq")})
- [Contacto](${url("/#contacto")})
- [Notas](${url("/blog/")}) · [Notes](${url("/en/blog/")})
- [IA para EdTech](${url(solutionsIndexPath("es"))}) · [AI for EdTech](${url(solutionsIndexPath("en"))})
- RSS: ${url("/rss.xml")} · ${url("/en/rss.xml")}`

  const body = [preamble, sector, notes, links].join("\n\n") + "\n"

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
