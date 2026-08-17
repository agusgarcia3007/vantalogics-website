---
title: "Los cinco errores que comete un agente de IA en una inmobiliaria"
seoTitle: "Errores de un agente de IA en una inmobiliaria y cómo evitarlos — Vantalogics"
description: "Los cinco fallos que aparecen cuando un agente de IA atiende consultas inmobiliarias reales, por qué ninguno se detecta en la demo y qué límite corrige cada uno."
answer: "Los cinco errores de un agente inmobiliario en producción son: ofrecer propiedades ya vendidas, inventar datos de la ficha, negociar precio, agendar visitas imposibles y perder el hilo entre canales. Ninguno aparece en la demo. Los cinco se corrigen con límites explícitos y un set de evaluación armado con conversaciones reales."
date: 2026-08-15
cluster: confiabilidad
industry: inmobiliarias
tags:
  - inmobiliarias
  - confiabilidad
  - evals
  - agentes de IA
faq:
  - question: "¿Cómo se prueba un agente inmobiliario antes de abrirlo?"
    answer: "Con un set de evaluación armado a partir de conversaciones reales exportadas del canal, no con casos inventados. Se incluyen los casos raros que ya pasaron: el que pregunta por una propiedad vendida, el que pide descuento en el primer mensaje, el propietario que escribe por su propia propiedad. Si el set no tiene esos casos, no está probando nada."
  - question: "¿Qué pasa si el agente se equivoca con un interesado?"
    answer: "Depende del error, y por eso se clasifican antes de salir. Informar mal un horario es recuperable con un mensaje. Informar mal un precio no lo es. La arquitectura se diseña para que los errores caros sean imposibles por construcción, no improbables por entrenamiento."
  - question: "¿Cada cuánto hay que revisar las conversaciones?"
    answer: "Semanalmente al principio, y siempre con una muestra leída por una persona del equipo comercial, no sólo con métricas agregadas. Los problemas que importan —un tono que no es el de la inmobiliaria, una respuesta técnicamente correcta que igual pierde al interesado— no aparecen en ningún tablero."
---

En una demo, un agente inmobiliario funciona siempre. Le preguntás por un departamento de dos ambientes en tal zona, te responde con opciones, te ofrece un horario. Impecable.

Los problemas empiezan la primera semana con consultas reales, y son siempre los mismos cinco. Van en orden de cuánto cuestan.

## 1. Ofrece una propiedad que ya no está

Es el error más caro y el más frecuente, y casi nunca es culpa del agente: es culpa del dato. Si el CRM dice que la propiedad está disponible, el agente la ofrece. Si se reservó el viernes y nadie lo cargó, el agente coordina una visita a una propiedad que ya tiene dueño.

El costo no es la consulta perdida. Es que el interesado le cuenta a alguien que la inmobiliaria le hizo perder el sábado.

**El límite:** el agente consulta el estado en el momento de ofrecer y otra vez en el momento de confirmar la visita. Y si la fuente de verdad es una exportación con horas de retraso, no ofrece propiedades específicas: califica y pasa al asesor.

## 2. Inventa un dato de la ficha

El interesado pregunta por las expensas, por el año de construcción, si acepta mascotas, si tiene cochera cubierta. Si el dato no está en el CRM, un modelo sin límites lo completa con lo que resulta plausible para una propiedad de esas características. Suena razonable y es falso.

Es más peligroso que el error obvio, porque nadie lo detecta: el interesado se entera en la visita, y para entonces la conversación ya está envenenada.

**El límite:** el agente responde únicamente con campos que existen en la ficha. Si el campo está vacío, dice que lo consulta y deriva. Esto se prueba explícitamente con un set de fichas incompletas a propósito, que es el caso que ninguna demo incluye.

## 3. Negocia

Alguien escribe «¿aceptan una oferta un diez por ciento abajo?» y el agente, que fue construido para ser útil, responde algo. Cualquier cosa que responda es un problema: si dice que sí, comprometió a la inmobiliaria y al propietario; si dice que no, cerró una negociación que el asesor podía haber trabajado.

Este es el error donde la línea es más nítida y donde más seguido se cruza, porque la pregunta llega envuelta en una conversación normal.

**El límite:** cualquier mención de precio distinto al publicado, condiciones de pago o plazos de posesión escala inmediatamente, con el resumen de la conversación. El agente no dice que no puede: dice que eso lo ve el asesor y lo pasa.

## 4. Agenda visitas imposibles

Dos visitas en barrios opuestos con veinte minutos de diferencia. Una visita a un inmueble alquilado sin avisar al inquilino. Una visita el feriado. Todas son técnicamente huecos libres en el calendario y ninguna es realizable.

Esto no se percibe como error de IA; se percibe como que el sistema le complicó el día al asesor, y es la forma más rápida de que el equipo deje de confiar en él.

**El límite:** reglas explícitas de tiempo mínimo entre visitas, zonas compatibles el mismo día y antelación requerida para avisar al ocupante. El agente puede llenar el calendario, no puede romperlo.

## 5. Pierde el hilo entre canales

El interesado escribe por el formulario del sitio, después por WhatsApp, después responde un anuncio de Instagram. Para el agente son tres personas distintas, así que lo califica tres veces y le hace las mismas cuatro preguntas.

Del lado del interesado la lectura es inmediata: no me están escuchando.

**El límite:** identidad unificada por teléfono y correo, y memoria de la conversación anterior. Es trabajo de arquitectura, no de modelo, y es de las cosas que más se subestiman al presupuestar.

## Lo que tienen en común

Ninguno de los cinco se arregla con un modelo mejor. Los cinco son problemas de límites y de datos, y los cinco se detectan antes de salir a producción si el set de evaluación está armado con conversaciones reales en vez de con casos inventados.

Eso significa exportar tres meses del canal, elegir los casos raros que ya pasaron —el propietario que escribe por su propia propiedad, el que pregunta por una que se vendió, el que pide descuento en el primer mensaje— y probar contra eso en cada cambio.

Es la parte del proyecto que menos se ve en una propuesta y la que decide si el sistema sigue funcionando en el mes seis.

## La clasificación que hacemos antes de salir

Cada error posible se ubica en una de tres categorías, y la categoría define la arquitectura:

**Imposible por construcción.** Informar un precio que no está en el CRM, confirmar una operación, prometer una condición de pago. No se mitigan con instrucciones: el agente literalmente no tiene la capacidad.

**Recuperable con un mensaje.** Confundir dos propiedades parecidas, proponer un horario que el asesor rechaza. Se aceptan, se registran y se miden.

**Escalación inmediata.** Reclamos, propietarios, cualquier cosa que suene a conflicto. No se intenta resolver: se pasa con contexto y se avisa que se pasó.

Esa tabla se escribe con el equipo comercial antes de la primera línea de código. Es media hora de reunión y es lo que separa un agente que sostiene la marca de uno que la gasta.
