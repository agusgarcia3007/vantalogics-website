---
title: "Cómo evaluar un tutor de IA antes de abrirlo a los alumnos"
seoTitle: "Cómo evaluar un tutor de IA antes de lanzarlo — Vantalogics"
description: "El set de evaluación de un tutor educativo: los cinco tipos de caso que tiene que incluir, cómo se mide la abstención correcta y qué umbral se acuerda antes de abrir la función."
answer: "Un tutor de IA se evalúa con cinco tipos de caso: preguntas con respuesta en el material, preguntas cuya respuesta correcta es «no está en el curso», la consigna evaluada textual, preguntas de una unidad no habilitada y preguntas con vocabulario de alumno. El caso que casi nadie prueba —la abstención correcta— es el que decide si el tutor es confiable."
date: 2026-08-16
cluster: confiabilidad
industry: edtech-y-plataformas-educativas
tags:
  - edtech
  - evals
  - tutor de IA
  - confiabilidad
faq:
  - question: "¿Cuántos casos hace falta para que el set sirva?"
    answer: "Menos de los que la gente supone, si están bien elegidos. Un set de unos cien casos reales bien distribuidos entre los cinco tipos detecta casi todos los problemas que aparecerían en producción. Mil casos generados automáticamente a partir del material detectan bastante menos, porque comparten los supuestos del sistema que están probando."
  - question: "¿Quién arma el set de evaluación?"
    answer: "Un docente del curso, no el equipo técnico. La pregunta que decide cada caso —¿esta respuesta es correcta para un alumno de esta unidad?— es pedagógica. El equipo técnico arma la infraestructura para correrlo en cada cambio, que es la otra mitad del trabajo."
  - question: "¿Con qué frecuencia se vuelve a correr?"
    answer: "En cada cambio del sistema, y además cada vez que se publica contenido nuevo del curso. Lo segundo se olvida seguido: una unidad reescrita puede romper respuestas que antes eran correctas, y sin correr el set eso se descubre por un reclamo de un alumno."
---

Un tutor de IA sobre el contenido de un curso funciona bien en las pruebas que hace el equipo que lo construyó, porque el equipo prueba lo que espera que pase. Los problemas están en lo que no se espera, y en educación esos casos son bastante específicos.

Lo que sigue son los cinco tipos de caso que incluimos en el set de evaluación, y por qué el segundo es el que más importa.

## Tipo 1: la respuesta está en el material

El caso obvio. Preguntas sobre contenido del curso, con el pasaje correcto anotado a mano.

Se mide en dos niveles, y separarlos es importante: primero, si el pasaje correcto apareció entre los recuperados; segundo, si la respuesta generada es correcta dado ese pasaje. Sin esa separación, un fallo es ilegible: no se sabe si el sistema no encontró el material o si lo encontró y respondió mal, y son dos arreglos distintos.

## Tipo 2: la respuesta correcta es «no está en el curso»

Este es el caso que casi ningún equipo prueba y el que decide si el tutor es confiable.

Preguntas razonables, del mismo tema, que el material simplemente no cubre. La respuesta correcta no es una explicación: es decir que eso no está en la unidad, y ofrecer lo que sí está.

Un tutor que responde bien el tipo 1 y falla el tipo 2 es peor que no tener tutor, porque produce respuestas plausibles sobre contenido que el curso no enseñó, dirigidas a alguien que por definición no puede detectarlo. Y como el resto de las respuestas fueron buenas, el alumno tiene todas las razones para creerle.

La métrica es la tasa de abstención correcta, y se acuerda un umbral antes de abrir la función. Es el número que más discusión genera con el equipo de producto, porque abstenerse se siente como una respuesta peor.

## Tipo 3: la consigna evaluada, textual

Copiar y pegar el enunciado de cada trabajo práctico del curso y ver qué hace el tutor.

La respuesta correcta es cambiar de modo: explicar el concepto que la consigna evalúa, proponer un ejercicio análogo, y no entregar la solución. Y tiene que funcionar también con la consigna parafraseada, que es como llega en la práctica: el alumno rara vez pega el texto exacto.

Este caso no se puede generar automáticamente de forma útil. Hay que tomar las consignas reales del curso, una por una.

## Tipo 4: contenido de una unidad no habilitada

Preguntas cuya respuesta está en el material, pero en una unidad que ese alumno todavía no abrió, o en un curso de un plan que no compró.

La respuesta correcta vuelve a ser una negativa, por dos motivos distintos: uno pedagógico —el curso está secuenciado a propósito— y uno de producto —la búsqueda no puede filtrar contenido pago—. El segundo motivo hace que este caso sea, además, una prueba de seguridad.

## Tipo 5: el vocabulario del alumno

Las mismas preguntas del tipo 1, pero escritas como las escribe alguien que todavía no aprendió el tema. Con la palabra imprecisa, con la descripción del gráfico en vez del nombre del concepto, con el error de tipeo.

Esta es la asimetría del dominio: el que pregunta es exactamente el que no domina el vocabulario del material. Un set escrito por el docente en el lenguaje del docente mide un sistema distinto del que van a usar los alumnos.

La fuente de estos casos no hay que inventarla: está en el foro del curso y en los tickets de soporte de las cohortes anteriores.

## Qué se acuerda antes de abrir

Tres cosas, por escrito, con producto y con el docente:

**El umbral de abstención correcta.** Debajo de ese número, la función no se abre, aunque el resto esté bien.

**Qué es un error grave.** Nuestra definición para tutores: afirmar como del curso algo que el curso no dice, y resolver una entrega evaluada. Cualquiera de las dos se trata como bloqueante, no como métrica a mejorar.

**El plan de degradación.** Qué hace el sistema cuando la recuperación no encuentra nada bueno. La respuesta correcta es decirlo y ofrecer contactar al docente, no intentarlo igual.

## El caso más incómodo

Vale la pena nombrarlo porque aparece siempre y no tiene solución técnica: el material del curso está desactualizado o tiene un error.

El tutor lo repite, porque responde con la fuente. Suena a defecto y es una función: la cita hace visible el error y lo vuelve corregible. Un tutor que respondiera de memoria lo taparía con una respuesta correcta que contradice el material, y nadie se enteraría de que la unidad tres está mal desde hace dos años.

En la práctica, la primera corrida del set de evaluación de un curso encuentra errores del curso. Es incómodo, y es de las cosas más útiles que produce el proyecto.
