---
title: "Los cinco errores que comete un agente de IA en un real estate developer"
seoTitle: "Errores de un agente de IA en un real estate developer y cómo evitarlos — Vantalogics"
description: "Los cinco fallos que aparecen cuando un agente de IA atiende consultas reales de un real estate developer, por qué ninguno se detecta en la demo y qué límite corrige cada uno."
answer: "Los cinco errores de un agente de un real estate developer en producción son: ofrecer unidades ya reservadas, inventar datos de la ficha del proyecto, negociar precio o plan de pago, agendar visitas imposibles y perder el hilo entre canales. Ninguno aparece en la demo. Los cinco se corrigen con límites explícitos y un set de evaluación armado con conversaciones reales."
date: 2026-08-15
cluster: confiabilidad
industry: real-estate-developers
tags:
  - real estate developers
  - confiabilidad
  - evals
  - agentes de IA
faq:
  - question: "¿Cómo se prueba el agente antes de abrirlo?"
    answer: "Con un set de evaluación armado a partir de conversaciones reales exportadas del canal, no con casos inventados. Se incluyen los casos raros que ya pasaron: el que pregunta por una unidad reservada, el que pide descuento en el primer mensaje, el broker externo que quiere la lista de precios completa, el comprador que pregunta si la obra va atrasada. Si el set no tiene esos casos, no está probando nada."
  - question: "¿Qué pasa si el agente se equivoca con un interesado?"
    answer: "Depende del error, y por eso se clasifican antes de salir. Informar mal un horario es recuperable con un mensaje. Informar mal un precio, una cuota o una fecha de entrega no lo es. La arquitectura se diseña para que los errores caros sean imposibles por construcción, no improbables por entrenamiento."
  - question: "¿Cada cuánto hay que revisar las conversaciones?"
    answer: "Semanalmente al principio, y siempre con una muestra leída por una persona del equipo comercial, no sólo con métricas agregadas. Los problemas que importan —un tono que no es el del proyecto, una respuesta técnicamente correcta que igual pierde al interesado— no aparecen en ningún tablero."
---

En una demo, el agente de un developer funciona siempre. Le preguntás por un dos ambientes en la torre norte, te responde con opciones, te ofrece un horario en el showroom. Impecable.

Los problemas empiezan la primera semana con consultas reales, y son siempre los mismos cinco. Van en orden de cuánto cuestan.

## 1. Ofrece una unidad que ya está reservada

Es el error más caro y el más frecuente, y casi nunca es culpa del agente: es culpa del dato. Si la planilla dice que la unidad está disponible, el agente la ofrece. Si se reservó el viernes en el showroom y nadie actualizó la planilla hasta el lunes, el agente coordina una visita para mostrar algo que ya tiene dueño.

El costo no es la consulta perdida. Es que el interesado le cuenta a alguien que le hicieron perder el sábado, y en un lanzamiento eso circula rápido.

**El límite:** el agente consulta el estado en el momento de ofrecer y otra vez en el momento de confirmar la visita. Y si la fuente de verdad es una planilla que se actualiza a mano una vez por día, no ofrece unidades específicas: precalifica y pasa al asesor.

## 2. Inventa un dato de la ficha del proyecto

El interesado pregunta por la expensa estimada, por los metros del balcón, si la cochera está incluida, si el edificio acepta mascotas, en qué mes entrega. Si el dato no está cargado, un modelo sin límites lo completa con lo que resulta plausible para un proyecto de esas características. Suena razonable y es falso.

Es más peligroso que el error obvio, porque nadie lo detecta: el comprador se entera en la reserva, y para entonces la conversación ya está envenenada. En preventa el problema se agrava, porque el interesado está comprando algo que todavía no puede ver: lo único que tiene es lo que le dijeron.

**El límite:** el agente responde únicamente con campos que existen en la ficha oficial del proyecto. Si el campo está vacío, dice que lo consulta y deriva. Esto se prueba explícitamente con un set de fichas incompletas a propósito, que es el caso que ninguna demo incluye.

## 3. Negocia el precio o el plan de pago

Alguien escribe «¿aceptan un diez por ciento abajo si pago todo de contado?» y el agente, que fue construido para ser útil, responde algo. Cualquier cosa que responda es un problema: si dice que sí, comprometió al developer; si dice que no, cerró una negociación que el asesor podía haber trabajado; y si improvisa una cuota, generó una expectativa que después hay que desarmar en la reserva.

Este es el error donde la línea es más nítida y donde más seguido se cruza, porque la pregunta llega envuelta en una conversación normal. Y en un developer aparece más que en cualquier otro rubro, porque el plan de pago es la mitad del producto.

**El límite:** cualquier mención de precio distinto al de la lista vigente, descuento, condición de financiación o anticipo escala inmediatamente, con el resumen de la conversación. El agente no dice que no puede: dice que eso lo ve el asesor y lo pasa.

## 4. Agenda visitas imposibles

Dos visitas a proyectos en puntas opuestas de la ciudad con veinte minutos de diferencia. Una visita a obra un día sin permiso de ingreso. Cuatro grupos en el showroom en la misma franja de media hora. Todas son técnicamente huecos libres en el calendario y ninguna es realizable.

Esto no se percibe como error de IA; se percibe como que el sistema le complicó el día al asesor, y es la forma más rápida de que el equipo deje de confiar en él.

**El límite:** reglas explícitas de tiempo mínimo entre visitas, cupo del showroom por franja, proyectos compatibles el mismo día y antelación requerida para el ingreso a obra. El agente puede llenar el calendario, no puede romperlo.

## 5. Pierde el hilo entre canales

El interesado escribe por el formulario del sitio, después por WhatsApp, después responde un anuncio de Instagram del mismo proyecto. Para el agente son tres personas distintas, así que lo precalifica tres veces y le hace las mismas cuatro preguntas.

Del lado del interesado la lectura es inmediata: no me están escuchando.

**El límite:** identidad unificada por teléfono y correo, y memoria de la conversación anterior. Es trabajo de arquitectura, no de modelo, y es de las cosas que más se subestiman al presupuestar. En un developer pesa el doble, porque las campañas de lanzamiento traen a la misma persona por tres canales en la misma semana.

## Lo que tienen en común

Ninguno de los cinco se arregla con un modelo mejor. Los cinco son problemas de límites y de datos, y los cinco se detectan antes de salir a producción si el set de evaluación está armado con conversaciones reales en vez de con casos inventados.

Eso significa exportar tres meses del canal, elegir los casos raros que ya pasaron —el broker que pide la lista completa, el que pregunta por una unidad ya vendida, el que pide descuento en el primer mensaje, el comprador que pregunta si la obra va atrasada— y probar contra eso en cada cambio.

Es la parte del proyecto que menos se ve en una propuesta y la que decide si el sistema sigue funcionando en el mes seis.

## La clasificación que hacemos antes de salir

Cada error posible se ubica en una de tres categorías, y la categoría define la arquitectura:

**Imposible por construcción.** Informar un precio que no está en la lista vigente, comprometer una cuota, confirmar una reserva, afirmar una fecha de entrega distinta a la publicada. No se mitigan con instrucciones: el agente literalmente no tiene la capacidad.

**Recuperable con un mensaje.** Confundir dos tipologías parecidas, proponer un horario que el asesor rechaza. Se aceptan, se registran y se miden.

**Escalación inmediata.** Reclamos, preguntas sobre atrasos de obra, cualquier cosa que suene a conflicto. No se intenta resolver: se pasa con contexto y se avisa que se pasó.

Esa tabla se escribe con el equipo comercial antes de la primera línea de código. Es media hora de reunión y es lo que separa un agente que sostiene la marca del proyecto de uno que la gasta.
