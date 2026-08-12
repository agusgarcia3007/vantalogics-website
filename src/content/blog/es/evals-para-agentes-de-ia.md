---
title: "Evals para agentes de IA: cómo saber si funciona antes de que te lo diga un cliente"
seoTitle: "Evals para agentes de IA: guía práctica — Vantalogics"
description: "Qué es un set de evaluación para un agente de IA, cómo se arma con casos reales de tu operación y cómo se usa para detectar que la calidad bajó antes de que se queje un cliente."
answer: "Un eval es un conjunto de casos reales con su respuesta correcta escrita al lado, que se corre automáticamente en cada cambio del agente. Con treinta a cien casos alcanza para empezar. Es lo único que convierte «parece que anda mejor» en un número comparable, y sin eso cada cambio de prompt es una apuesta a ciegas."
date: 2026-07-22
cluster: confiabilidad
tags:
  - evals
  - evaluación de agentes
  - calidad
  - LLM
translationOf: evals-for-ai-agents
faq:
  - question: "¿Cuántos casos necesito para empezar?"
    answer: "Treinta alcanzan para detectar regresiones grandes; cien dan una señal estable. Importa más la distribución que el número: si el 40% de tus consultas reales son sobre estado de pedido, ese 40% tiene que estar representado. Un set de doscientos casos mal distribuidos mide peor que uno de cuarenta bien armado."
  - question: "¿Se puede usar un modelo para evaluar al agente?"
    answer: "Sí, y es la práctica habitual para criterios difíciles de codificar, como el tono o si la respuesta contestó la pregunta. Pero el juez hay que calibrarlo contra juicio humano sobre una muestra antes de confiar en él: un juez no calibrado tiene sus propios sesgos y te da un número que se mueve sin que el agente haya cambiado."
  - question: "¿Cada cuánto hay que actualizar el set?"
    answer: "Cada vez que aparece un caso que el agente falló en producción. Ese es el ciclo: el caso fallado entra al set con su respuesta correcta, se corrige el sistema, el caso queda para siempre como prueba de regresión. En un despliegue activo son entre dos y diez casos nuevos por mes."
---

Hay un momento predecible en todo proyecto de agentes. Alguien cambia una línea del prompt, prueba tres ejemplos a mano, ve que responden mejor y despliega. Dos semanas después llega una queja por un caso que antes funcionaba bien.

Eso pasa porque no había forma de saber que el cambio había roto otra cosa. Un eval es exactamente eso: la forma de saberlo.

## Qué es, sin vueltas

Un set de evaluación es una lista de casos. Cada caso tiene una entrada —un mensaje real de un cliente, un documento real— y un criterio de qué significa haberlo resuelto bien. Se corre entero contra el agente y devuelve un número: cuántos pasaron.

Eso es todo. La sofisticación viene después; el 80% del valor está en tener el número.

Sin el número, la conversación sobre calidad es: «lo probé y anda mejor». Con el número: «pasó de 71 sobre 100 a 84, y los trece que sumó son todos de consultas de facturación». La segunda conversación se puede tener con el cliente. La primera no.

## Por qué el software normal no necesita esto

Una función que suma dos números se prueba con un test: entra 2 y 3, tiene que salir 5. Sale 5 o no sale, y si sale, sale siempre.

Un agente al que le preguntan «¿me llegó el pedido de las cajas?» puede responder de infinitas formas correctas y de infinitas formas incorrectas, y ante la misma pregunta dos veces puede dar dos respuestas distintas que sean ambas buenas. No hay igualdad que comparar.

Entonces se cambia la pregunta. En vez de «¿la salida es exactamente esta?», se pregunta:

- ¿Llamó a la herramienta correcta con los parámetros correctos?
- ¿El dato que informó coincide con el del sistema?
- ¿Escaló a una persona cuando tenía que escalar?
- ¿Se abstuvo de inventar cuando no tenía la información?

Las tres primeras se verifican con código. La cuarta necesita criterio, y ahí entra el juez.

## Cómo se arma en la práctica

### Los casos salen de la operación, no de la imaginación

Este es el error que más veces vemos. Alguien se sienta a escribir casos de prueba y produce cincuenta preguntas prolijas, gramaticalmente correctas, con toda la información necesaria en el primer mensaje.

Los mensajes reales no se parecen en nada a eso. Tienen faltas de ortografía, audios transcriptos, tres preguntas en un mismo mensaje, un «hola?» suelto a las once de la noche, capturas de pantalla en vez de números de pedido.

Los casos se sacan del historial real: exportá seis meses de conversaciones o de tickets y muestreá de ahí. Si el proceso todavía no existe en digital, se hace con las primeras dos semanas de operación real y el set se arma sobre la marcha.

### La distribución importa más que el volumen

Si el 40% de las consultas reales son de estado de pedido, el set tiene que tener ese 40%. Un set con doscientos casos donde los raros están sobrerrepresentados mide peor que uno de cuarenta bien distribuido, porque te muestra mejoras en casos que casi no ocurren.

Aparte de la distribución natural, conviene reservar una porción para lo que rompe:

- **Casos ambiguos.** El cliente no dijo de qué pedido habla y tiene tres abiertos.
- **Casos sin respuesta posible.** La información no está en ningún sistema. La respuesta correcta es decirlo, no inventar.
- **Casos que tienen que escalar.** Un reclamo enojado, un pedido de descuento fuera de política.
- **Casos hostiles.** Alguien intentando que el agente diga algo que no debe, o pidiéndole que ignore sus instrucciones.

Esa última categoría es la que más veces falta y la que más rápido se vuelve un problema público.

### El juez, cuando hace falta

Para criterios que no se pueden verificar con código —¿el tono es adecuado?, ¿contestó lo que le preguntaron?— se usa un modelo como evaluador.

Funciona, pero hay una condición: hay que calibrarlo. Tomá veinte casos, que los evalúe una persona, que los evalúe el juez, y comparalos. Si coinciden en dieciocho, el juez sirve. Si coinciden en trece, el número que te da no mide la calidad del agente, mide el humor del juez.

Un juez no calibrado es peor que no tener juez, porque da una cifra que parece objetiva.

## Cómo se usa

El set corre solo, en cada cambio, antes de desplegar. Si el resultado baja, no se despliega.

Después de eso, hay tres números que importan y conviene mirarlos separados:

| Métrica | Qué mide | Contra qué corre |
|---|---|---|
| Tasa de acierto | Casos resueltos correctamente | El set de evaluación |
| Tasa de escalamiento | Cuántos pasan a una persona | Tráfico real |
| Deriva | Variación semana a semana | Tráfico real, muestreado |

La primera te dice si el sistema mejoró. La segunda es la que le importa al negocio: un agente con 95% de acierto que escala el 60% de los casos no está resolviendo casi nada. La tercera es la que detecta que algo se corrió —un modelo actualizado por el proveedor, un catálogo que cambió— sin que nadie haya tocado nada.

## El ciclo que hace que esto sirva

El set no es un entregable. Es un organismo:

1. Un caso falla en producción.
2. Ese caso entra al set con su respuesta correcta escrita al lado.
3. Se corrige el sistema hasta que el caso pasa.
4. El caso se queda para siempre como prueba de regresión.

A los seis meses el set tiene los ciento cincuenta casos que efectivamente rompieron ese agente en esa operación. Es el activo más valioso del proyecto y es el que no se puede copiar: no existe en ningún repositorio público, no se compra, sólo se acumula operando.

Es también, dicho de otro modo, la razón por la que la segunda versión de un agente es mucho mejor que la primera, y por la que reemplazar al proveedor a mitad de camino es más caro de lo que parece.

## Lo mínimo, si sólo vas a hacer una cosa

Sacá treinta conversaciones reales del último mes. Escribí al lado de cada una qué tendría que haber pasado. Corré eso contra tu agente y anotá el número.

Ese número, comparado consigo mismo dentro de un mes, te va a decir más sobre tu sistema que cualquier panel de métricas que te muestre un proveedor.
