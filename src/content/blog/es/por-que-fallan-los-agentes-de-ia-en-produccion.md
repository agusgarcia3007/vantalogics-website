---
title: "Por qué fallan los agentes de IA en producción"
seoTitle: "Por qué fallan los agentes de IA en producción — Vantalogics"
description: "Las seis fallas que aparecen cuando un agente de IA deja la demo y empieza a atender clientes reales, por qué ninguna se ve en la prueba y cómo se previene cada una."
answer: "Los agentes de IA rara vez fallan por el modelo. Fallan por seis motivos: contexto que se degrada, herramientas que devuelven errores que el agente no sabe leer, ausencia de límites de acción, falta de un set de evaluación, deriva silenciosa de calidad y estado compartido entre pasos. Todos se ven en producción y ninguno en la demo."
date: 2026-07-08
cluster: confiabilidad
tags:
  - agentes de IA
  - producción
  - confiabilidad
  - observabilidad
translationOf: why-ai-agents-fail-in-production
faq:
  - question: "¿El problema se arregla cambiando a un modelo mejor?"
    answer: "Casi nunca. Un modelo más capaz mejora el margen, pero las seis fallas de esta nota son de arquitectura: contexto, herramientas, límites, evaluación, monitoreo y estado. Un modelo mejor sobre un sistema mal armado falla menos seguido y de formas más difíciles de detectar, que es peor."
  - question: "¿Cuánto tarda en aparecer la degradación de calidad?"
    answer: "Entre seis y doce semanas en la mayoría de los despliegues. No aparece como un error sino como un corrimiento: el agente empieza a resolver un porcentaje menor de casos sin que nada se rompa. Sin una métrica corriendo sobre casos reales, se detecta recién cuando lo comenta alguien de atención al cliente."
  - question: "¿Qué es lo primero que hay que instrumentar?"
    answer: "La traza completa de cada ejecución: entrada, cada llamada a herramienta con su respuesta, y la salida. Sin eso, un caso que salió mal es irreproducible y la corrección se vuelve adivinanza. Es lo primero que instalamos, antes incluso de que el agente tome su primera decisión sola."
---

Un agente que funciona en la demo y falla en producción no es mala suerte ni un modelo insuficiente. Es un patrón, y es tan repetible que se puede enumerar.

Esta es la lista de lo que vemos romperse cuando un agente pasa de la sala de reuniones a atender gente de verdad. Ninguna de las seis es un problema del modelo. Todas se previenen, pero hay que decidir prevenirlas antes, porque una vez en producción cada una cuesta cinco veces más de arreglar.

## 1. El contexto se degrada

En la demo el agente responde tres mensajes. En producción, una conversación de atención al cliente llega a cuarenta, con archivos adjuntos, con el cliente cambiando de tema y volviendo, con un traspaso a un humano y de vuelta.

Lo que pasa a partir del mensaje quince es que la información importante —el número de pedido que el cliente dio al principio— queda enterrada bajo veinte intercambios de logística, y el modelo empieza a razonar sobre lo último que leyó en vez de sobre lo relevante. No alucina: prioriza mal.

**Cómo se previene:** no mandar la conversación entera. El agente tiene que trabajar sobre un estado explícito —pedido, cliente, etapa, decisiones ya tomadas— que se actualiza en cada turno, más una ventana corta de los últimos mensajes. El historial completo se guarda para auditar, no para razonar.

## 2. Las herramientas fallan y el agente no sabe leerlo

Todo el trabajo de diseño se va en el camino feliz. Después, en producción, la API del ERP devuelve un 500 a las tres de la mañana durante el batch nocturno, o responde `200 OK` con un cuerpo vacío, o tarda cuarenta segundos.

Un agente al que no le enseñaron qué significan esos casos hace lo peor posible: interpreta el error como un dato. «No encontré el pedido» se convierte en «tu pedido no existe» dicho a un cliente que sí tiene el pedido.

**Cómo se previene:** cada herramienta devuelve estados tipados y distinguibles: encontrado, no encontrado, error temporal, sin permiso. El agente tiene una instrucción explícita por cada uno, y la respuesta correcta a «error temporal» casi siempre es reintentar una vez y después escalar a una persona, nunca improvisar.

## 3. No hay límites de acción

Este es el que asusta a los clientes, y con razón. Un agente con acceso de escritura al CRM y sin restricciones puede, con una sola instrucción mal interpretada, actualizar cuatrocientos registros.

La discusión suele plantearse como «cuánta autonomía le damos», que es la pregunta equivocada. La buena es: **qué acciones son reversibles y cuáles no.** Mandar un mensaje de WhatsApp no se puede deshacer. Crear un borrador de pedido sí.

**Cómo se previene:** los permisos se acotan al mínimo necesario, las acciones irreversibles pasan por aprobación humana desde el día uno, y hay límites duros —de monto, de cantidad de registros por ejecución, de frecuencia— que viven en el código y no en el prompt. Un límite escrito en el prompt es una sugerencia; uno escrito en el código es un límite.

## 4. No hay set de evaluación

Es la falla más común y la más cara, porque hace invisibles a todas las demás.

Sin un conjunto de casos reales contra el cual medir, no hay forma de saber si el cambio de prompt del martes mejoró o empeoró el sistema. Se prueba a mano con cuatro ejemplos, parece que anda mejor, se despliega, y dos semanas después hay una queja por un caso que antes funcionaba.

**Cómo se previene:** treinta a cien casos reales sacados de la operación del cliente, con la respuesta correcta escrita al lado, corriendo automáticamente en cada cambio. No hace falta más para empezar. Está desarrollado en [evals para agentes de IA](/blog/evals-para-agentes-de-ia/).

## 5. La calidad se corre sin que nada se rompa

Un sistema tradicional falla ruidosamente: tira una excepción, alguien ve la alerta. Un agente falla en silencio. Sigue respondiendo, sigue pareciendo razonable, y el porcentaje de casos que resuelve bien baja del 82% al 71% a lo largo de dos meses.

Las causas son varias y todas normales: el proveedor actualiza el modelo por debajo, el catálogo del cliente cambia, empieza a entrar un tipo de consulta que no existía cuando se construyó el sistema.

**Cómo se previene:** una métrica de calidad corriendo sobre tráfico real —no sobre el set de evaluación— y una alerta cuando cae del umbral acordado. Sin eso, el primero en enterarse de que el agente empeoró es un cliente.

## 6. El estado compartido entre pasos

Aparece recién cuando hay más de un agente o más de un paso escribiendo sobre lo mismo. Un paso actualiza el estado del pedido, otro leyó el valor anterior y actúa sobre información vieja. En un sistema determinista esto se detecta en la primera prueba de carga; acá, como cada ejecución toma un camino distinto, la condición de carrera aparece una vez cada trescientas ejecuciones.

**Cómo se previene:** un único dueño de escritura por entidad, operaciones idempotentes —que se puedan repetir sin duplicar el efecto— y una clave de idempotencia por ejecución. Es aburrido y es lo que evita el pedido cargado dos veces.

## El patrón atrás de las seis

Ninguna de estas fallas es sobre inteligencia artificial. Son las fallas de cualquier sistema distribuido que trabaja contra APIs de terceros, agravadas por dos propiedades que los agentes agregan: la salida no es determinista y el sistema falla verosímilmente en vez de fallar fuerte.

Eso cambia una sola cosa respecto de construir software normal, pero la cambia entera: **no se puede confiar en la ausencia de errores como señal de que anda bien.** Hay que medir la calidad activamente, todo el tiempo, contra casos que importan. Un agente sin medición no es un agente funcionando; es un agente cuyas fallas todavía no encontraste.

Es también, dicho sin vueltas, la diferencia entre una demo que impresiona en una reunión y un sistema que sigue andando en el mes dieciocho.
