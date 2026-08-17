---
title: "Cuánto cuesta un agente de IA para un real estate developer"
seoTitle: "Cuánto cuesta un agente de IA para un real estate developer — Vantalogics"
description: "Las cuatro partidas de costo de un agente de IA en un real estate developer: WhatsApp API, modelo por conversación, integración con el CRM y la planilla de unidades, y operación."
answer: "Un agente de IA para un real estate developer tiene cuatro costos: la línea de WhatsApp Business API, el modelo por conversación, la integración con el CRM y la planilla de unidades, y la operación mensual. El costo variable por consulta atendida es de centavos; lo que mueve el presupuesto es la integración, y depende casi por completo de dónde vive hoy tu disponibilidad."
date: 2026-08-08
cluster: costos
industry: real-estate-developers
tags:
  - real estate developers
  - WhatsApp
  - costos
  - agentes de IA
faq:
  - question: "¿Se puede empezar con un presupuesto chico?"
    answer: "Sí, si se recorta el alcance y no la calidad. Un agente que sólo responde y precalifica consultas entrantes, sin escribir en el CRM ni tocar la agenda del showroom, es una fracción del proyecto completo y ya mueve el número que más importa, que es el tiempo de respuesta. Escribir en el CRM se suma después, cuando el ahorro ya está demostrado."
  - question: "¿Cuánto cuesta mantenerlo por mes?"
    answer: "Tres partidas: la línea de WhatsApp Business API, el consumo de modelo por conversación y el mantenimiento del sistema. Las dos primeras se pagan a proveedores y escalan con el volumen; la tercera es fija y cubre monitoreo, ajustes y las roturas que provoca cualquier cambio en el CRM, en la planilla de unidades o en los portales."
  - question: "¿Conviene un agente o contratar a alguien para contestar?"
    answer: "Depende del horario y del pico. Una persona cubre cuarenta horas semanales y las consultas de un lanzamiento entran las ciento sesenta y ocho. Si el problema es volumen dentro del horario comercial y sostenido todo el año, contratar puede ser más barato y más simple. Si el problema es que el pico dura dos semanas y nadie contesta a las diez de la noche, no hay contratación que lo resuelva a ese costo."
---

La pregunta llega siempre igual: «¿cuánto sale poner un agente de IA que conteste las consultas?». Y la respuesta honesta es que depende de una sola cosa que casi nadie menciona en la primera llamada: dónde vive hoy la disponibilidad de tus unidades y si ese lugar se puede consultar por API.

Lo que sigue son las cuatro partidas de costo, en orden de cuánto mueven el presupuesto.

## Las cuatro partidas

| Partida | Tipo | Qué la mueve |
|---|---|---|
| Línea de WhatsApp Business API | Mensual + por conversación | Volumen y país |
| Modelo de lenguaje | Por conversación | Largo del contexto y del historial |
| Integración con CRM, planilla y agenda | Proyecto, una vez | Dónde vive el dato y si tiene API |
| Operación y mantenimiento | Mensual | Cantidad de integraciones vivas |

Las dos primeras son costos de proveedor: se pagan a Meta y a quien provea el modelo, y son predecibles. Las dos últimas son el proyecto, y ahí está la varianza.

## El costo variable es más chico de lo que la gente cree

Una consulta atendida de punta a punta —saludo, precalificación, dos o tres tipologías ofrecidas, coordinación de una visita al showroom— son entre diez y veinte intercambios. Con los modelos actuales y un contexto acotado a las unidades relevantes, eso cuesta centavos de dólar por conversación.

Ese número sorprende a mucha gente porque el debate público sobre costos de IA está anclado en el uso intensivo: agentes que razonan durante minutos, o sistemas que procesan documentos largos. Una conversación de WhatsApp no se parece a eso.

Lo que sí encarece el variable es una decisión de diseño: meter la lista de precios entera y las cuatro torres del proyecto en el contexto de cada mensaje, en vez de recuperar sólo las unidades pertinentes. Es la forma más rápida de construirlo y multiplica el costo por diez sin mejorar la respuesta.

A esto se suma el costo de la línea de WhatsApp Business API, que Meta cobra por conversación iniciada y varía bastante por país. En la mayoría de los mercados de LATAM es del mismo orden de magnitud que el modelo; en algunos, más caro.

## El costo que decide el presupuesto: la integración

Acá está la varianza real, y en un developer se explica con una pregunta distinta a la de una agencia: no es sólo «¿tu CRM tiene API?», es «¿cuántos lugares distintos tienen que ponerse de acuerdo para responder una consulta?».

Responder bien exige tres datos que casi nunca viven juntos: qué unidades quedan, a qué precio y con qué plan de pago, y cuándo puede recibir el asesor. En la mayoría de los developers eso son una planilla, un CRM y un calendario, más el sistema de la constructora para cualquier cosa que toque avance de obra.

**Si la disponibilidad vive en un sistema con API documentada**, la integración es trabajo conocido: leer unidades y estados, escribir el prospecto precalificado, consultar el calendario. Se estima con precisión razonable durante el diagnóstico.

**Si la disponibilidad vive en una planilla**, que es el caso más común, hay dos caminos:

- Leer la planilla directamente, con un lector propio y reglas de validación. Es más barato de lo que parece y funciona bien si la planilla tiene una estructura estable.
- Consolidar primero disponibilidad y precios en una fuente única, y recién después conectar el agente. Cuesta más al principio y es lo único que escala a más de un proyecto.

**Si la disponibilidad vive en tres planillas que no coinciden**, ese es un proyecto de ordenamiento de datos, no de automatización, y hay que presupuestarlo como lo que es. Es la conversación incómoda del diagnóstico, y conviene tenerla antes de firmar nada.

## Cómo calcular si se paga

El cálculo que hacemos en el diagnóstico tiene tres números, todos tuyos:

**Uno.** Cuántas consultas entran por mes, contando todos los canales y separando el mes de lanzamiento del resto. Casi siempre es más de lo que el equipo cree, porque las de Instagram y las llamadas perdidas no están en ningún reporte.

**Dos.** Qué porcentaje termina hoy en visita al showroom agendada. Este es el número que el agente mueve, y se mueve por una razón mecánica: contestar en dos minutos en vez de en cuatro horas.

**Tres.** Cuánto vale una unidad vendida y cuántas visitas hacen falta en promedio para colocar una.

Con eso se calcula cuántas unidades adicionales por año necesita colocar el sistema para pagarse. En un developer el número suele ser incómodamente chico —una unidad, a veces menos— y eso es lo que hace que el proyecto se decida rápido.

En proyectos de veinte unidades con un lanzamiento cada tres años el número no da, y lo decimos en la misma llamada. Ahí el equipo comercial contesta más rápido y mejor que cualquier sistema, y no hay forma de que la aritmética cierre.

## Lo que no entra en el presupuesto y aparece igual

Tres costos reales que rara vez están en la propuesta y conviene anticipar:

**La migración del número de WhatsApp.** Pasar tu línea a la API la desconecta de la app. Si hoy tres asesores contestan desde ese número con el teléfono, hay que moverlos a una bandeja compartida. No es un costo de software: es un costo de cambio de hábito, y es el que más resistencia genera.

**Ordenar la disponibilidad.** Si hay unidades reservadas sin marcar y precios de la lista anterior, eso se limpia antes o el agente va a ofrecerlas. Es trabajo de alguien del equipo durante algunas semanas, y no lo puede hacer el proveedor.

**El tiempo de quien conoce el proceso.** Hace falta una persona del lado del developer que responda preguntas, valide las conversaciones de prueba y decida los límites: hasta dónde llega el agente con el plan de pago, qué se contesta sobre fecha de entrega. No son muchas horas, pero son de alguien que ya está ocupado.

## El orden que recomendamos

Primero, responder y precalificar consultas entrantes leyendo la disponibilidad, sin escribir en ningún sistema. Es la parte barata, es donde está el efecto inmediato sobre visitas agendadas, y no requiere resolver la integración de escritura.

Después, coordinación de visitas contra la agenda real del showroom, que ya sí necesita integración pero contra un calendario, que es más simple que un CRM.

Al final, escritura en el CRM, correos de rutina y seguimiento del ciclo largo, que es donde está el volumen dormido y también la integración más delicada.

Ese orden no es sólo prudencia técnica: es la forma de que el proyecto se pague a sí mismo antes de gastar la parte cara.
