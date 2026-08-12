---
title: "n8n, Make o un agente a medida: cómo elegir sin gastar de más"
seoTitle: "n8n vs Make vs agente a medida: cuándo conviene cada uno — Vantalogics"
description: "Criterios concretos para decidir entre una herramienta no-code, n8n autoalojado o un agente de IA a medida, según integraciones, volumen, decisiones y costo de error."
answer: "Make y Zapier convienen para flujos lineales entre servicios con conector oficial. n8n conviene cuando hay datos sensibles, alto volumen o lógica que un conector no cubre. Un agente a medida se justifica cuando el sistema tiene que decidir entre varias acciones, integrarse con sistemas internos y responder por sus errores. La pregunta no es cuál es mejor, es cuántas decisiones toma tu proceso."
date: 2026-08-05
cluster: decision
tags:
  - n8n
  - Make
  - Zapier
  - automatización
  - agentes de IA
faq:
  - question: "¿n8n reemplaza a un agente de IA a medida?"
    answer: "No, resuelven capas distintas. n8n orquesta pasos: cuando pasa esto, hacé aquello. Un agente decide qué paso corresponde ante una entrada ambigua. Muchos sistemas buenos usan las dos cosas: el agente decide y n8n ejecuta la parte determinista. El problema aparece cuando se le pide a n8n que tome las decisiones."
  - question: "¿Se puede empezar en no-code y migrar después?"
    answer: "Sí, y suele ser la ruta correcta. Un prototipo en Make durante un mes te dice si el proceso vale la pena automatizarlo, con una inversión mínima. Lo que no conviene es dejarlo ahí cuando el volumen creció: a partir de cierto punto el costo por operación y la fragilidad de los conectores superan lo que costaba hacerlo bien."
  - question: "¿Cuándo el costo de la herramienta no-code se vuelve un problema?"
    answer: "Cuando el precio por operación empieza a pesar más que el desarrollo. Con volúmenes de decenas de miles de ejecuciones mensuales, los planes por operación de Make o Zapier pueden superar los USD 500 al mes, cifra a la que el mismo flujo autoalojado en n8n cuesta el hosting y poco más."
---

La pregunta llega siempre de la misma forma: «vi que con n8n se puede hacer esto mismo, ¿por qué necesitaría algo a medida?». Es una buena pregunta y muchas veces la respuesta es que no lo necesitás.

Lo que sigue son los criterios que usamos para decidirlo, en el orden en que conviene aplicarlos.

## Primero, qué es cada cosa

Las tres opciones se confunden porque todas se venden como «automatización», pero resuelven capas distintas.

| | Make / Zapier | n8n | Agente a medida |
|---|---|---|---|
| Modelo | Nube, por operación | Autoalojado | Software propio |
| Integraciones | Conectores oficiales | Conectores y código | Cualquier cosa |
| Datos | En el proveedor | Donde vos decidas | Donde vos decidas |
| Buena para | Flujos lineales | Flujos complejos | Decisiones |
| Costo típico | USD 20–500/mes | Hosting | Proyecto + operación |

La distinción que más importa está en las dos últimas filas. Make y n8n ejecutan un camino que vos definiste de antemano: cuando llega X, hacé A, después B, después C. Un agente elige el camino.

## El criterio que decide casi todo: cuántas decisiones hay

Poné el proceso en palabras y contá los «depende».

«Cuando entra una factura por mail, extraela y cargala al ERP» tiene cero decisiones. Es un flujo, y hacerlo con un agente a medida es pagar de más.

«Cuando entra un mensaje de un cliente, entendé si es un pedido, una consulta de estado o un reclamo; si es pedido, fijate si el producto tiene stock; si no tiene, ofrecé la alternativa más parecida; si pide descuento fuera de política, pasáselo al vendedor» tiene cinco. Cada «depende» es un punto donde alguien tiene que interpretar algo ambiguo, y esos son caros de expresar como diagrama de flujo.

La regla práctica: **hasta dos o tres decisiones binarias, una herramienta de flujos lo resuelve bien y más barato. A partir de ahí, el diagrama empieza a tener treinta ramas y cada caso nuevo agrega dos más.**

Ese momento —cuando el flujo se vuelve inmantenible— es visible desde afuera: nadie del equipo se anima a tocarlo.

## Los otros cuatro criterios

### Dónde tienen que vivir los datos

Si el proceso toca historias clínicas, legajos, datos de tarjetas o información sujeta a un acuerdo de confidencialidad con un cliente grande, el flujo no puede pasar por la nube de un tercero que no firmó ese acuerdo. Ahí Make y Zapier quedan afuera por una razón que no es técnica, y la conversación es entre n8n autoalojado y desarrollo propio.

### Qué tan raros son tus sistemas

Si todo lo que tocás tiene conector oficial —Gmail, Sheets, HubSpot, Shopify— cualquiera de las tres opciones anda. Si tenés que hablar con un ERP local por una base SQL Server, con un sistema propio sin API o con un servicio que devuelve XML, los conectores no alcanzan y vas a terminar escribiendo código igual. La diferencia es si lo escribís dentro de un nodo de n8n o en un sistema propio.

### Cuánto volumen

Los planes por operación se ven baratos hasta que dejan de serlo. Diez mil ejecuciones al mes en Make es una cifra razonable; cien mil, con varios pasos cada una, ya es un renglón que se discute en una reunión de costos. n8n autoalojado tiene costo prácticamente fijo, y ese cruce suele estar entre las veinte y las cincuenta mil operaciones mensuales.

### Qué pasa si se equivoca

Este es el que casi nunca se pondera y el que más caro sale. Un flujo que copia datos de un lado a otro y falla se reintenta y listo. Un sistema que le contesta a un cliente, emite una nota de crédito o modifica un pedido necesita registro de cada acción, límites duros, reversibilidad y aprobación humana en los pasos irreversibles.

Nada de eso viene incluido en una herramienta de flujos. Se puede construir arriba, pero a esa altura ya estás construyendo el sistema a medida, sólo que sobre una base que no fue pensada para eso. El detalle de por qué importa está en [por qué fallan los agentes en producción](/blog/por-que-fallan-los-agentes-de-ia-en-produccion/).

## La respuesta corta, por escenario

- **Un proceso lineal, sistemas con conector, poco volumen, error barato.** Make o Zapier. Lo armás en una tarde y no llames a nadie.
- **Lo mismo pero con datos sensibles, volumen alto o un sistema raro.** n8n autoalojado.
- **El sistema tiene que decidir entre varias acciones, hablar con sistemas internos y responder por sus errores.** Agente a medida.
- **Todo lo anterior junto.** Las dos cosas: el agente decide, n8n ejecuta los tramos deterministas. Es la arquitectura más común de las que ponemos en producción y la que menos se menciona en las comparativas.

## El error de empezar por la herramienta

La discusión sobre herramientas es entretenida y casi siempre prematura. Lo que define el resultado es otra cosa: si mapeaste el proceso real —no el que está en el manual— y si sabés qué porcentaje de casos podés resolver sin intervención humana.

Un flujo de Make sobre un proceso bien entendido le gana a un agente sofisticado sobre uno mal entendido, todas las veces. Y si el proceso está bien entendido, la herramienta correcta se vuelve obvia sola.

Si estás en la duda, la ruta más barata es casi siempre la misma: prototipá en no-code durante un mes, medí cuántos casos resuelve, y recién con ese número decidí si vale la pena construir algo. Cuesta poco y te ahorra la decisión que sale cara.
