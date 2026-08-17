---
title: "Cuánto cuesta un tutor de IA por alumno, y por qué el cálculo va antes del prototipo"
seoTitle: "Costo por alumno de un tutor de IA en EdTech — Vantalogics"
description: "Cómo se calcula el costo de modelo por alumno activo en una plataforma educativa, qué lo dispara y las cuatro palancas que lo bajan sin degradar la respuesta."
answer: "El costo de un tutor de IA se mide por alumno activo por mes, no por consulta. Depende de tres variables: mensajes por alumno, contexto recuperado por mensaje y modelo elegido. En EdTech la unidad económica es ajustada, así que el cálculo se hace antes del prototipo: si supera el margen del plan que vende la función, no hay producto."
date: 2026-08-09
cluster: costos
industry: edtech-y-plataformas-educativas
tags:
  - edtech
  - costos
  - tutor de IA
  - RAG
faq:
  - question: "¿Se puede estimar el costo sin haber construido nada?"
    answer: "Con una precisión suficiente para decidir, sí. Hacen falta tres números que la plataforma ya tiene: alumnos activos por mes, una estimación de mensajes por alumno tomada del uso del foro o del soporte, y el largo típico del material que habría que recuperar. Con eso se acota el rango, y el rango alcanza para saber si el proyecto cierra."
  - question: "¿Conviene un modelo grande o uno chico?"
    answer: "Los dos, ruteados. La mayoría de las consultas de un curso son de comprensión sobre material ya recuperado, y un modelo chico las resuelve igual de bien a una fracción del costo. El modelo grande se reserva para lo que lo necesita: razonamiento sobre varios pasajes, ejercicios de varios pasos, código."
  - question: "¿Cómo se evita que un alumno dispare el costo?"
    answer: "Con un techo por alumno y por período, comunicado en la interfaz antes de alcanzarlo. Es una decisión de producto, no técnica: sin techo, un puñado de usuarios intensivos define el costo de toda la base, y ese costo aparece recién en la factura del mes siguiente."
---

En casi todos los sectores donde trabajamos, la pregunta de costo llega al final: primero se decide qué construir y después cuánto sale. En EdTech ese orden no funciona, y es la diferencia que más proyectos hunde.

La razón es la unidad económica. Un plan de alumno cuesta lo que cuesta, el uso es alto y sostenido durante el ciclo lectivo, y una función de IA con costo variable por alumno se resta directamente de un margen que ya era finito.

## La unidad correcta es el alumno activo por mes

No el token, no la consulta, no el curso. El costo se mide por alumno activo por mes, porque es la unidad en la que está expresado el ingreso.

El cálculo tiene tres variables:

**Mensajes por alumno activo por mes.** Es el número más difícil de estimar antes de lanzar y el que más varía. Un proxy razonable es el volumen actual del foro y del soporte multiplicado por un factor: un tutor disponible recibe bastantes más preguntas que un foro donde hay que esperar respuesta.

**Contexto recuperado por mensaje.** Cuántos pasajes del material entran en cada respuesta, y de qué largo. Es la variable que el equipo controla y la que más se subestima.

**Modelo elegido.** Con una diferencia de un orden de magnitud entre los modelos chicos y los grandes de la misma familia.

Multiplicadas, dan el número que hay que comparar contra el margen del plan.

## Lo que dispara el costo

Casi siempre es la segunda variable, y casi siempre por la misma decisión de arquitectura.

La forma más rápida de construir un tutor es meter mucho contexto: la unidad entera, el historial completo de la conversación, el material relacionado por las dudas. Funciona bien, se construye en días y multiplica el costo por varias veces sin mejorar la respuesta de forma proporcional.

La segunda causa es el historial. Una conversación de tutoría larga arrastra todos los mensajes anteriores en cada turno, así que el costo del mensaje número veinte es varias veces el del primero. Sin una estrategia de resumen, las conversaciones largas son las caras y son justamente las de los alumnos más comprometidos.

## Las cuatro palancas que bajan el costo

Van en orden de cuánto rinden por esfuerzo.

**Recuperación acotada.** Traer los pasajes que responden la pregunta, no la unidad entera. Requiere que el material esté partido por unidad conceptual y bien indexado, que es trabajo previo y es el mismo trabajo que hace buena la respuesta. Es la única palanca que baja el costo y mejora la calidad al mismo tiempo.

**Ruteo por modelo.** La mayoría de las preguntas de un curso son de comprensión sobre material que ya se recuperó, y no requieren el modelo más caro. Un clasificador barato al frente decide, y la diferencia en la factura es grande.

**Caché de lo repetido.** En un curso, las preguntas se concentran fuertemente: las mismas veinte dudas cubren una porción alta del volumen, sobre todo alrededor de las entregas. Reconocer eso y responder desde caché es directo y muy rentable.

**Resumen del historial.** Comprimir los turnos viejos de la conversación en vez de arrastrarlos enteros. Es la palanca que evita que las conversaciones largas dominen la factura.

## El cálculo que decide si hay producto

Es aritmética, y por eso conviene hacerla antes y no después.

Del lado del ingreso: cuánto deja el plan por alumno por mes, después de todo lo demás. Del lado del costo: el número que salió arriba.

Si el costo estimado del tutor es una fracción chica del margen, hay producto y la conversación pasa a ser sobre calidad. Si es una fracción grande, la función tiene que ir en un plan superior, tener un techo de uso o directamente no ir.

Y si el costo estimado supera el precio del plan, lo que hay no es un producto sino una promoción con pérdida disfrazada de innovación. Pasa más seguido de lo que parece, porque el prototipo se construye con veinte usuarios internos y nadie multiplica por la base entera.

## Lo que recomendamos hacer primero

Antes del prototipo del tutor, la búsqueda semántica sobre el mismo contenido. Cuesta un orden de magnitud menos, se mide sin tocar la evaluación, y produce exactamente el dato que falta: qué preguntan los alumnos, con qué palabras y con qué frecuencia.

Con ese dato, la estimación de mensajes por alumno deja de ser una suposición. Y como la búsqueda necesita el mismo contenido transcripto, partido e indexado que el tutor, el trabajo no se tira: es la primera mitad del mismo proyecto.
