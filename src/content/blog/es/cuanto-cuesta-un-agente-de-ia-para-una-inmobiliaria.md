---
title: "Cuánto cuesta un agente de IA para una inmobiliaria"
seoTitle: "Cuánto cuesta un agente de IA para una inmobiliaria — Vantalogics"
description: "Las cuatro partidas de costo de un agente de IA en una inmobiliaria: WhatsApp API, modelo por conversación, integración con el CRM y operación. Con el cálculo del punto de equilibrio."
answer: "Un agente de IA para una inmobiliaria tiene cuatro costos: la línea de WhatsApp Business API, el modelo por conversación, la integración con el CRM y la operación mensual. El costo variable por consulta atendida es de centavos; lo que mueve el presupuesto es la integración, y depende casi por completo de si tu CRM tiene API."
date: 2026-08-08
cluster: costos
industry: inmobiliarias
tags:
  - inmobiliarias
  - WhatsApp
  - costos
  - agentes de IA
faq:
  - question: "¿Se puede empezar con un presupuesto chico?"
    answer: "Sí, si se recorta el alcance y no la calidad. Un agente que sólo responde y califica consultas entrantes, sin escribir en el CRM ni tocar la agenda, es una fracción del proyecto completo y ya mueve el número que más importa, que es el tiempo de respuesta. Escribir en el CRM se suma después, cuando el ahorro ya está demostrado."
  - question: "¿Cuánto cuesta mantenerlo por mes?"
    answer: "Tres partidas: la línea de WhatsApp Business API, el consumo de modelo por conversación y el mantenimiento del sistema. Las dos primeras se pagan a proveedores y escalan con el volumen; la tercera es fija y cubre monitoreo, ajustes y las roturas que provoca cualquier cambio en el CRM o en los portales."
  - question: "¿Conviene un agente o contratar a alguien para contestar?"
    answer: "Depende del horario. Una persona cubre cuarenta horas semanales y las consultas inmobiliarias entran las ciento sesenta y ocho. Si el problema es volumen dentro del horario comercial, contratar puede ser más barato y más simple. Si el problema es que nadie contesta a las diez de la noche ni el domingo, no hay contratación que lo resuelva a ese costo."
---

La pregunta llega siempre igual: «¿cuánto sale poner un agente de IA que conteste las consultas?». Y la respuesta honesta es que depende de una sola cosa que casi nadie menciona en la primera llamada: si tu CRM tiene API.

Lo que sigue son las cuatro partidas de costo, en orden de cuánto mueven el presupuesto.

## Las cuatro partidas

| Partida | Tipo | Qué la mueve |
|---|---|---|
| Línea de WhatsApp Business API | Mensual + por conversación | Volumen y país |
| Modelo de lenguaje | Por conversación | Largo del contexto y del historial |
| Integración con CRM y agenda | Proyecto, una vez | Si hay API o no |
| Operación y mantenimiento | Mensual | Cantidad de integraciones vivas |

Las dos primeras son costos de proveedor: se pagan a Meta y a quien provea el modelo, y son predecibles. Las dos últimas son el proyecto, y ahí está la varianza.

## El costo variable es más chico de lo que la gente cree

Una consulta inmobiliaria atendida de punta a punta —saludo, calificación, dos o tres propiedades ofrecidas, coordinación de una visita— son entre diez y veinte intercambios. Con los modelos actuales y un contexto acotado a la ficha de las propiedades relevantes, eso cuesta centavos de dólar por conversación.

Ese número sorprende a mucha gente porque el debate público sobre costos de IA está anclado en el uso intensivo: agentes que razonan durante minutos, o sistemas que procesan documentos largos. Una conversación de WhatsApp no se parece a eso.

Lo que sí encarece el variable es una decisión de diseño: meter el catálogo entero en el contexto de cada mensaje en vez de recuperar sólo las propiedades pertinentes. Es la forma más rápida de construirlo y multiplica el costo por diez sin mejorar la respuesta.

A esto se suma el costo de la línea de WhatsApp Business API, que Meta cobra por conversación iniciada y varía bastante por país. En la mayoría de los mercados de LATAM es del mismo orden de magnitud que el modelo; en algunos, más caro.

## El costo que decide el presupuesto: la integración

Acá está la varianza real, y se explica con una sola pregunta.

**Si tu CRM tiene API documentada** —los CRM inmobiliarios modernos, o un CRM general tipo HubSpot o Pipedrive adaptado al rubro— la integración es trabajo conocido: leer la cartera, escribir el contacto calificado, consultar disponibilidad. Se estima con precisión razonable durante el diagnóstico.

**Si tu CRM no tiene API** hay tres caminos, todos peores:

- Exportación periódica a una planilla, que deja al agente trabajando con datos de hace horas. Barato, y con el riesgo de ofrecer propiedades vendidas.
- Automatización de la interfaz, que se rompe cada vez que el proveedor cambia un botón. Frágil y caro de mantener.
- Cambiar de CRM, que es un proyecto en sí mismo y no se debería mezclar con este.

Es la conversación incómoda del diagnóstico, y conviene tenerla antes de firmar nada. Un presupuesto cerrado sin saber la respuesta a esa pregunta es un presupuesto que se va a revisar.

## Cómo calcular si se paga

El cálculo que hacemos en el diagnóstico tiene tres números, todos tuyos:

**Uno.** Cuántas consultas entran por mes, contando todos los canales. Casi siempre es más de lo que el equipo cree, porque las de Instagram y las llamadas perdidas no están en ningún reporte.

**Dos.** Qué porcentaje termina hoy en visita agendada. Este es el número que el agente mueve, y se mueve por una razón mecánica: contestar en dos minutos en vez de en cuatro horas.

**Tres.** Cuánto vale una operación cerrada para la inmobiliaria, y cuántas visitas hacen falta en promedio para cerrar una.

Con eso se calcula cuántas operaciones adicionales por año necesita generar el sistema para pagarse. En carteras con volumen el número suele ser incómodamente chico —una o dos operaciones— y eso es lo que hace que el proyecto se decida rápido.

En carteras chicas el número no da, y lo decimos en la misma llamada. Con menos de treinta consultas por mes el asesor contesta más rápido y mejor que cualquier sistema, y no hay forma de que la aritmética cierre.

## Lo que no entra en el presupuesto y aparece igual

Tres costos reales que rara vez están en la propuesta y conviene anticipar:

**La migración del número de WhatsApp.** Pasar tu línea a la API la desconecta de la app. Si hoy tres asesores contestan desde ese número con el teléfono, hay que moverlos a una bandeja compartida. No es un costo de software: es un costo de cambio de hábito, y es el que más resistencia genera.

**Ordenar la cartera del CRM.** Si hay propiedades vendidas sin marcar y precios desactualizados, eso se limpia antes o el agente va a ofrecerlas. Es trabajo de alguien del equipo durante algunas semanas.

**El tiempo de quien conoce el proceso.** Hace falta una persona del lado de la inmobiliaria que responda preguntas, valide las conversaciones de prueba y decida los límites. No son muchas horas, pero son de alguien que ya está ocupado.

## El orden que recomendamos

Primero, responder y calificar consultas entrantes sin escribir en ningún sistema. Es la parte barata, es donde está el efecto inmediato sobre visitas agendadas, y no requiere resolver la integración con el CRM.

Después, coordinación de visitas contra la agenda real, que ya sí necesita integración pero contra un calendario, que es más simple que un CRM.

Al final, escritura en el CRM y reactivación de la base histórica, que es donde está el volumen dormido y también la integración más delicada.

Ese orden no es sólo prudencia técnica: es la forma de que el proyecto se pague a sí mismo antes de gastar la parte cara.
