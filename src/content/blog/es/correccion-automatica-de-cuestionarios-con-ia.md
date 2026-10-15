---
title: "Corrección automática de cuestionarios con IA: lo que medimos en 5.563 respuestas reales"
seoTitle: "Corrección automática de cuestionarios con IA: caso real — Vantalogics"
description: "Medimos dónde se equivoca la IA al corregir las respuestas de una academia real y por qué la nota la pone una clave verificada, no el modelo."
answer: "En una academia con 5.563 respuestas de desarrollo sin corregir, el 99,4 % se puede corregir sin IA en el momento de corregir: comparando contra una clave verificada. Cuando la IA dictaminaba respuesta por respuesta, 80 de 185 alumnos (43 %) recibieron un veredicto opuesto al de otro alumno con la misma respuesta. La IA sirve para construir la clave y para redactar la devolución, no para poner la nota."
date: 2026-10-15
cluster: casos
industry: edtech-y-plataformas-educativas
useCases:
  - correccion-asistida
  - generacion-de-evaluaciones
tags:
  - edtech
  - corrección automática
  - evaluaciones
  - cuestionarios
  - LLM
faq:
  - question: "¿Se puede corregir un cuestionario con ChatGPT u otro modelo de lenguaje?"
    answer: "Se puede usar el modelo para resolver el ejercicio, y lo hace bien: en nuestra medición resolvió el mismo ejercicio correctamente 24 de 25 veces. Lo que no conviene es que dictamine respuesta por respuesta. Sobre 185 respuestas reales, el veredicto cambió entre llamadas para respuestas idénticas y afectó al 43 % de los alumnos. El modelo sirve para construir una clave una vez; la corrección después es una comparación determinística."
  - question: "¿Qué pasa con las respuestas que necesitan criterio?"
    answer: "Quedan pendientes para el docente. En una cátedra de física y química fueron el 0,6 % de las respuestas de desarrollo. Para preguntas abiertas en prosa, donde el criterio es la mayor parte del trabajo, el enfoque es otro: rúbrica explícita, borrador con evidencia citada y un docente que firma la nota."
  - question: "¿Hay que cargar las claves a mano?"
    answer: "No necesariamente. La clave se construye con fuentes independientes: el consenso de los alumnos, la resolución del ejercicio por varios métodos distintos y la refutación de la respuesta candidata. Se activa solo si al menos dos fuentes coinciden. Las que no convergen quedan visibles para que alguien las destrabe, y mientras tanto esas respuestas siguen pendientes."
  - question: "¿Sirve para preguntas de opción múltiple?"
    answer: "La opción múltiple ya se corrige sola contra la opción marcada como correcta. Lo que aporta este enfoque ahí es detectar claves mal cargadas: en 581 preguntas, la opción más votada por los alumnos coincidió con la clave en el 97,8 % de los casos, y en al menos 4 de los 13 desacuerdos la clave guardada era la equivocada."
---

[Apoyo Escolar RV](/casos/apoyo-escolar-rv/) prepara alumnos para materias de cinco universidades y tiene más de 22.000 estudiantes en su plataforma. Sus cuestionarios mezclan opción múltiple con preguntas de desarrollo, y en agosto de 2026 había 5.563 respuestas de desarrollo esperando corrección: el 97,8 % de todas las que habían entrado. Una sola docente no llega, y cada día que pasa sin corrección es un alumno que estudia sin saber si entendió.

El pedido parecía obvio: que la IA corrija. Lo medimos antes de construirlo, y la conclusión fue la contraria a la que esperábamos. La IA no tiene que poner la nota. Tiene que ayudar a construir la clave con la que se pone.

## Primero: qué forma tienen las respuestas

Antes de elegir una técnica hay que mirar el corpus. Los ejercicios con más respuestas eran de física (difusión, dinámica, hidrostática, cinemática, gases, ósmosis) y de química (nomenclatura). En una materia de ciencias, la «pregunta de desarrollo» casi nunca es un ensayo: es un número con unidad, una fórmula, a veces dos resultados en la misma respuesta.

Clasificamos las respuestas pendientes según lo que hace falta para corregirlas:

| Forma de la respuesta | % |
|---|---|
| Valor comparable (número, fórmula o símbolo, con o sin texto alrededor) | 90,8 % |
| Multiparte, comparable tramo por tramo | 4,2 % |
| Relleno que se rechaza sin discusión («.», «nose», «xxx») | 4,4 % |
| **Corregible sin juicio humano** | **99,4 %** |
| Requiere criterio (prosa, razonamiento abierto) | 0,6 % |

El 99,4 % no necesita que nadie interprete nada. Necesita saber cuál es la respuesta correcta y compararla bien.

## Lo que pasó cuando la IA ponía la nota

Igual probamos el camino que parece obvio: el modelo lee cada respuesta y decide si está bien. Tomamos 185 respuestas pendientes reales de 12 ejercicios y le dimos la mejor chance posible, con el razonamiento antes del veredicto.

No hizo falta conocer la respuesta correcta para descartarlo. Cuatro alumnos escribieron exactamente «6,125». El modelo derivó 6,125 kW las cuatro veces. Rechazó tres y a esos les escribió «el valor es correcto pero no incluyó la unidad», y al cuarto, que había escrito exactamente lo mismo, lo aprobó.

| Medición sobre 185 respuestas | Resultado |
|---|---|
| Ejercicios donde el modelo se contradice sobre cuál es la respuesta | 9 de 12 |
| Grupos de alumnos con respuesta idéntica y veredicto opuesto | 8 |
| **Alumnos afectados** | **80 de 185 (43 %)** |
| Veces que el modelo resolvió bien el ejercicio de referencia | 24 de 25 |

La última fila es la importante. El modelo sabe resolver. Lo que no se sostiene es el veredicto: no se sigue de su propia resolución y el criterio se mueve entre una llamada y la siguiente. Aplicado 154 veces al mismo ejercicio, cada llamada es una tirada de dado independiente que nadie puede auditar.

## El cambio de enfoque: no son 5.563 correcciones, son 95 claves

Si el problema es que el criterio se mueve, la solución es fijarlo una vez. Para los ejercicios con respuestas pendientes alcanzaban 95 claves. Con la clave escrita, corregir es una comparación matemática: determinística, testeable y auditable, sin IA en el momento de corregir.

Y cambia la forma del riesgo. Un error de clave afecta a unos 50 alumnos, pero se detecta con una sola observación y se revierte en bloque. Un error de IA por respuesta son miles de errores independientes que solo aparecen cuando un alumno reclama.

La comparación no es trivial, y ahí está casi todo el trabajo de ingeniería:

- **Unidades con conversión.** `463 cm/s` es lo mismo que `4,63 m/s`, `30 °C` que `303,15 K`, `6,125 kW` que `6125 W`.
- **Formatos numéricos.** Fracciones (`-1/18` y `-0,0556`), notación científica escrita a mano (`2,4x10-3`), coma o punto decimal, subíndices y superíndices.
- **Multiparte.** «a) 0,4 m/s² b) 6,32 m/s» se parte y se compara tramo por tramo, emparejando por etiqueta: contestar «b)» antes que «a)» no es un error.
- **Número dentro de prosa.** De «la masa de cada pesa es de 4158,67 gramos» se extrae el valor. Si hay dos números distintos, se abstiene, porque elegir cuál es el resultado ya es interpretar.

El motor tiene tres salidas, no dos: coincide, no coincide y **no soportado**. La tercera es la que da seguridad: una respuesta que el motor no sabe leer queda pendiente para una persona. Nunca se aprueba ni se rechaza a ciegas.

Lo validamos contra 115 correcciones manuales que ya existían. Decidió 110 y se abstuvo en 5. En las 110 que decidió acertó todas, y las 4 diferencias con la corrección manual resultaron ser errores de la corrección manual. Los tests también cazaron dos errores propios antes de producción: `0,188 m` leído como 188 metros y `Rta: -3` perdiendo el signo.

## Cómo se construye la clave sin que nadie la cargue

Las claves no se escriben a mano. Se arman con fuentes de evidencia **independientes**, y la independencia importa más que la cantidad:

1. **Consenso de los alumnos**: la respuesta más frecuente, normalizada.
2. **Resolución del modelo a ciegas**, por métodos distintos: desde la imagen del enunciado, desde su transcripción y traducida a cálculo simbólico. Repetir el mismo método no sirve: en una prueba, 8 de 8 muestras con el mismo método coincidieron en la respuesta equivocada.
3. **Refutación inversa**: dada una candidata, se le pide al modelo que la refute (reemplazar, revisar unidades, signo y orden de magnitud). Refutar es más fácil que resolver.
4. **Correcciones humanas** previas, cuando hay varias que concuerdan.
5. **Coherencia**: la clave tiene que explicar la distribución de respuestas que se observó.

Una clave se activa solo si al menos dos fuentes independientes coinciden y ninguna de peso la contradice. Si no, queda como candidata y esas respuestas siguen pendientes, igual que antes. La abstención es gratis; el error no.

El consenso de los alumnos solo no alcanza, y lo medimos con un experimento natural: 581 preguntas de opción múltiple que ya tenían la respuesta correcta cargada. La opción más votada coincidió con la clave en el 97,8 % de los casos (568 de 581). Exigir que la mayoría supere el 80 % sube el acierto al 99,1 %, pero deja afuera un tercio de las preguntas. Y los fallos no son dudosos: en una pregunta el 92 % de los alumnos votó una opción y la marcada como correcta sacó el 2 %.

Al revisar esos 13 desacuerdos apareció lo otro: **en al menos 4 los alumnos tenían razón y la clave guardada estaba mal**. El ion cianuro marcado como incorrecto cuando la respuesta era CN⁻, el número de oxidación del azufre en Na₂SO₄ marcado mal, dos preguntas con opciones duplicadas. Un banco de preguntas con estadística por ítem encuentra sus propias claves rotas, y es una de las razones por las que la [generación de evaluaciones](/soluciones/edtech-y-plataformas-educativas/generacion-de-evaluaciones/) tiene que incluir calibración con uso.

## Un detalle que cambia la respuesta: el orden de los campos

Un modelo genera su salida de a un fragmento por vez. Si en la estructura de salida el campo de la respuesta va antes que el razonamiento, el modelo está adivinando, y lo que razona después no corrige lo que ya escribió.

Lo vimos en este corpus. El modelo derivó bien que la asíntota vertical era `x=2`, escribió en su razonamiento «la opción 2 coincide con nuestro hallazgo» y en el campo de respuesta puso `3`, porque ese campo se había emitido primero. El razonamiento va primero y la respuesta al final, siempre. Es posible que una prueba anterior que concluía «la IA no sabe resolver estos ejercicios» estuviera midiendo este artefacto y no la capacidad del modelo.

## Las unidades: el dato se aprende una vez, no se interpreta al corregir

Cada cátedra escribe las unidades a su manera (`kwatt`, `dinas/cm2`, `mmH₂O`), y cada forma que el motor no conoce lo hace abstenerse por ortografía, no por criterio. Mantener la lista a mano no escala.

La solución no es que el modelo interprete la unidad al corregir, que es justo lo que falla. Es preguntarle una vez un dato verificable («¿cuántos watts tiene un kilowatt?»), exigir que dos muestras independientes coincidan en la magnitud y el factor, y que el dato no contradiga ninguna unidad ya conocida. Sobre 8 unidades nuevas aprendió 7 con el factor correcto. La octava, energía específica en kJ/kg, no convergió y el motor se abstuvo: no inventó un factor.

También hay una regla de cátedra que el sistema respeta: la unidad se exige, salvo cuando el enunciado ya la imprime (`Respuesta: ____ km/s`). Si la lectura del enunciado dice «exigir» pero menos del 25 % de los alumnos la escribió, no se exige. Reprobar a un curso entero por una lectura equivocada es el peor error posible, y es silencioso.

## Dónde sí entra la IA

La IA no desapareció del sistema; cambió de lugar:

| Tarea | Quién la hace |
|---|---|
| Resolver el ejercicio para construir la clave | El modelo, por varios métodos, una vez por pregunta |
| Activar la clave | Una regla: al menos dos fuentes independientes de acuerdo |
| Poner la nota | La comparación contra la clave, sin IA |
| Rechazar relleno («no sé», «asdasd») | Reglas, y el modelo para lo que no es un intento de respuesta |
| Redactar la devolución al alumno | El modelo, después del veredicto, sin poder cambiarlo |
| Respuestas que requieren criterio | La docente |

La devolución pedagógica es el lugar natural del modelo: recibe el veredicto ya fijo, la clave y la respuesta del alumno, y explica. El veredicto no forma parte de lo que puede devolver.

La red de seguridad es lo que hace defendible todo lo anterior. Cada corrección automática guarda con qué clave y con qué versión se hizo. Si la docente contradice una clave, la clave se rechaza y todas las correcciones hechas con ella se revierten en bloque. Antes de corregir nada, el sistema corrió en modo sombra contra las correcciones manuales existentes. El corrector anterior, que dejaba a la IA escribir el veredicto final cuando había una rúbrica aprobada, se eliminó por completo.

Desde agosto de 2026 la corrección corre al momento de la entrega. Lo que no tiene clave dispara un proceso que intenta construirla y corregir, y a la administración solo le llega un aviso si al final quedó algo que necesita a una persona. Desde septiembre, las preguntas abiertas tienen además un botón «No lo sé», porque los alumnos que no sabían resolver tipeaban letras al azar para poder enviar.

## Qué se lleva otra plataforma de esto

- **Mirá la forma de las respuestas antes de elegir la técnica.** Si la mayoría es comparable, el problema es de claves, no de juicio.
- **No dejes que el modelo dictamine respuesta por respuesta.** Que resuelva una vez, con evidencia independiente, y que la corrección sea determinística.
- **Diseñá la abstención.** Un sistema que puede decir «no sé» es el único al que se le puede delegar la corrección.
- **Guardá con qué se corrigió cada respuesta.** Sin eso no hay reversión en bloque, y sin reversión cada error de clave es un reclamo por alumno.
- **Medí antes de construir.** Medir 185 respuestas evitó poner en producción un corrector que se contradecía con el 43 % de los alumnos.

Para preguntas abiertas en prosa, donde el criterio es casi todo el trabajo, el enfoque es el de la [corrección asistida](/soluciones/edtech-y-plataformas-educativas/correccion-asistida/): rúbrica explícita, borrador con evidencia y un docente que firma. Y si en algún punto un modelo actúa como juez, hay que [calibrarlo contra juicio humano](/blog/evals-para-agentes-de-ia/) antes de confiar en el número que devuelve.
