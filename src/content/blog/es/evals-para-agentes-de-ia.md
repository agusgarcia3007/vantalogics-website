---
title: "Evals para agentes de IA en educación: cómo saber si funciona antes de que te lo diga un alumno"
seoTitle: "Evals para agentes de IA en educación: guía práctica — Vantalogics"
description: "Qué es un set de evaluación para un tutor, un asistente o un corrector con IA, cómo se arma con preguntas reales de alumnos y cómo se usa para detectar que la calidad bajó antes de que se queje una cohorte."
answer: "Un eval es un conjunto de casos reales —preguntas de alumnos, entregas, consultas— con su respuesta correcta escrita al lado, que se corre automáticamente en cada cambio del agente. Con treinta a cien casos alcanza para empezar. Es lo único que convierte «parece que anda mejor» en un número comparable, y sin eso cada cambio de prompt es una apuesta a ciegas."
date: 2026-07-22
updated: 2026-10-14
cluster: confiabilidad
industry: edtech-y-plataformas-educativas
useCases:
  - correccion-asistida
  - tutor-de-ia
tags:
  - edtech
  - evals
  - evaluación de agentes
  - calidad
  - LLM
translationOf: evals-for-ai-agents
faq:
  - question: "¿Cuántos casos necesito para empezar?"
    answer: "Treinta alcanzan para detectar regresiones grandes; cien dan una señal estable. Importa más la distribución que el número: si el 40% de las preguntas reales de los alumnos son sobre fechas de entrega y acceso a las clases, ese 40% tiene que estar representado. Un set de doscientos casos mal distribuidos mide peor que uno de cuarenta bien armado."
  - question: "¿Se puede usar un modelo para evaluar al agente?"
    answer: "Sí, y es la práctica habitual para criterios difíciles de codificar, como el tono o si la respuesta contestó la pregunta. Pero el juez hay que calibrarlo contra juicio humano sobre una muestra antes de confiar en él: un juez no calibrado tiene sus propios sesgos y te da un número que se mueve sin que el agente haya cambiado."
  - question: "¿Cada cuánto hay que actualizar el set?"
    answer: "Cada vez que aparece un caso que el agente falló en producción. Ese es el ciclo: el caso fallado entra al set con su respuesta correcta, se corrige el sistema, el caso queda para siempre como prueba de regresión. En un despliegue activo son entre dos y diez casos nuevos por mes."
---

Hay un momento predecible en todo proyecto de agentes. Alguien cambia una línea del prompt del tutor, prueba tres preguntas a mano, ve que responde mejor y despliega. Dos semanas después un alumno se queja por una pregunta que antes se contestaba bien.

Eso pasa porque no había forma de saber que el cambio había roto otra cosa. Un eval es exactamente eso: la forma de saberlo.

## Qué es, sin vueltas

Un set de evaluación es una lista de casos. Cada caso tiene una entrada —una pregunta real de un alumno, una entrega real— y un criterio de qué significa haberlo resuelto bien. Se corre entero contra el agente y devuelve un número: cuántos pasaron.

Eso es todo. La sofisticación viene después; el 80% del valor está en tener el número.

Sin el número, la conversación sobre calidad es: «lo probé y anda mejor». Con el número: «pasó de 71 sobre 100 a 84, y los trece que sumó son todos de preguntas sobre la unidad 3». La segunda conversación se puede tener con la institución o con el equipo docente. La primera no.

## Por qué el software normal no necesita esto

Una función que suma dos números se prueba con un test: entra 2 y 3, tiene que salir 5. Sale 5 o no sale, y si sale, sale siempre.

Un tutor al que un alumno le pregunta «¿por qué en este ejercicio se despeja x antes que y?» puede responder de infinitas formas correctas y de infinitas formas incorrectas, y ante la misma pregunta dos veces puede dar dos respuestas distintas que sean ambas buenas. No hay igualdad que comparar.

Entonces se cambia la pregunta. En vez de «¿la salida es exactamente esta?», se pregunta:

- ¿Llamó a la herramienta correcta con los parámetros correctos?
- ¿La fecha o la nota que informó coincide con la de la plataforma?
- ¿Derivó al docente cuando tenía que derivar?
- ¿Se abstuvo de inventar cuando la respuesta no estaba en el material del curso?

Las tres primeras se verifican con código. La cuarta necesita criterio, y ahí entra el juez.

## Cómo se arma en la práctica

### Los casos salen de la operación, no de la imaginación

Este es el error que más veces vemos. Alguien se sienta a escribir casos de prueba y produce cincuenta preguntas prolijas, gramaticalmente correctas, con toda la información necesaria en el primer mensaje.

Las preguntas reales de los alumnos no se parecen en nada a eso. Tienen faltas de ortografía, audios transcriptos, tres preguntas en un mismo mensaje, un «hola?» suelto a las once de la noche antes de un examen, la foto del ejercicio en vez del enunciado.

Los casos se sacan del historial real: exportá seis meses de consultas al docente, del foro del curso o de tickets de soporte y muestreá de ahí. Si todavía no hay historial digital, se hace con las primeras dos semanas de uso real y el set se arma sobre la marcha.

### La distribución importa más que el volumen

Si el 40% de las preguntas reales son de fechas de entrega y acceso, el set tiene que tener ese 40%. Un set con doscientos casos donde los raros están sobrerrepresentados mide peor que uno de cuarenta bien distribuido, porque te muestra mejoras en casos que casi no ocurren.

Aparte de la distribución natural, conviene reservar una porción para lo que rompe:

- **Casos ambiguos.** El alumno no dijo de qué curso habla y está inscripto en tres.
- **Casos sin respuesta posible.** La respuesta no está en el material ni en la plataforma. Lo correcto es decirlo, no inventar.
- **Casos que tienen que derivar.** Un reclamo por una nota, un pedido de prórroga fuera del reglamento.
- **Casos hostiles.** Un alumno que le pide al tutor la respuesta de la evaluación, o que ignore sus instrucciones.

Esa última categoría es la que más veces falta y la que más rápido se vuelve un problema público.

En un tutor, esa lista se concreta en cinco tipos de caso, con la abstención correcta como el que decide si se puede abrir: están detallados en [cómo evaluar un tutor de IA antes de abrirlo a los alumnos](/blog/evaluar-un-tutor-de-ia-antes-de-abrirlo/).

### El juez, cuando hace falta

Para criterios que no se pueden verificar con código —¿el tono es adecuado?, ¿contestó lo que le preguntaron?— se usa un modelo como evaluador.

Funciona, pero hay una condición: hay que calibrarlo. Tomá veinte casos, que los evalúe una persona, que los evalúe el juez, y comparalos. Si coinciden en dieciocho, el juez sirve. Si coinciden en trece, el número que te da no mide la calidad del agente, mide el humor del juez.

Un juez no calibrado es peor que no tener juez, porque da una cifra que parece objetiva.

La [corrección asistida por IA](/soluciones/edtech-y-plataformas-educativas/correccion-asistida/) es el mismo problema visto desde el otro lado: ahí el modelo es el juez y lo que se evalúa es la entrega del alumno. Se calibra igual, contra la nota del docente, criterio por criterio de la rúbrica, y la distancia entre el borrador y la nota final es la métrica que dice si se puede ampliar a otra materia.

## Cómo se usa

El set corre solo, en cada cambio, antes de desplegar. Si el resultado baja, no se despliega.

Después de eso, hay tres números que importan y conviene mirarlos separados:

| Métrica | Qué mide | Contra qué corre |
|---|---|---|
| Tasa de acierto | Casos resueltos correctamente | El set de evaluación |
| Tasa de derivación | Cuántos pasan al docente | Tráfico real |
| Deriva | Variación semana a semana | Tráfico real, muestreado |

La primera te dice si el sistema mejoró. La segunda es la que le importa a la institución: un tutor con 95% de acierto que deriva al docente el 60% de las preguntas no le está ahorrando casi nada a nadie. La tercera es la que detecta que algo se corrió —un modelo actualizado por el proveedor, un curso que cambió de versión— sin que nadie haya tocado nada.

## El ciclo que hace que esto sirva

El set no es un entregable. Es un organismo:

1. Un caso falla en producción.
2. Ese caso entra al set con su respuesta correcta escrita al lado.
3. Se corrige el sistema hasta que el caso pasa.
4. El caso se queda para siempre como prueba de regresión.

A los seis meses el set tiene los ciento cincuenta casos que efectivamente rompieron ese agente en esa plataforma. Es el activo más valioso del proyecto y es el que no se puede copiar: no existe en ningún repositorio público, no se compra, sólo se acumula operando.

Es también, dicho de otro modo, la razón por la que la segunda versión de un agente es mucho mejor que la primera, y por la que reemplazar al proveedor a mitad de camino es más caro de lo que parece.

## Lo mínimo, si sólo vas a hacer una cosa

Sacá treinta preguntas reales de alumnos del último mes. Escribí al lado de cada una qué tendría que haber pasado. Corré eso contra tu agente y anotá el número.

Ese número, comparado consigo mismo dentro de un mes, te va a decir más sobre tu sistema que cualquier panel de métricas que te muestre un proveedor.
