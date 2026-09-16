---
title: "Un agente de IA para WhatsApp que carga pedidos: cómo se arma de verdad"
seoTitle: "Agente de IA para WhatsApp que carga pedidos en tu sistema — Vantalogics"
description: "Qué hace falta para que un agente de WhatsApp entienda un pedido, verifique stock y lo cargue en tu ERP: la arquitectura real, los cinco puntos donde se rompe y qué queda con aprobación humana."
answer: "Un agente de WhatsApp que carga pedidos necesita cuatro piezas: la API oficial de WhatsApp Business, un normalizador que convierta el mensaje en un pedido estructurado, integración de lectura y escritura con el sistema de stock, y una regla explícita de qué escala a una persona. Lo difícil no es entender el mensaje: es que el pedido quede bien cargado."
date: 2026-08-11
cluster: casos
tags:
  - WhatsApp
  - agentes de IA
  - pedidos
  - ERP
  - integración
faq:
  - question: "¿Sirve WhatsApp Business normal o hace falta la API?"
    answer: "Hace falta la API de WhatsApp Business (Cloud API). La aplicación común no permite que un sistema lea y responda mensajes de forma soportada; las soluciones que la automatizan usan vías no oficiales y arriesgan el bloqueo del número, que en una operación que vende por WhatsApp es un incidente grave."
  - question: "¿Qué porcentaje de pedidos puede cargar solo?"
    answer: "Entre el 60% y el 85% en las operaciones que vimos, según qué tan repetitivo sea el catálogo y qué tan habituales sean los clientes. Un cliente que pide siempre lo mismo se resuelve casi siempre solo; uno nuevo que describe el producto con sus palabras necesita más confirmación. El resto escala, que es el comportamiento correcto."
  - question: "¿El cliente se da cuenta de que habla con un sistema?"
    answer: "Sí, y conviene que lo sepa. Lo declaramos siempre en el primer mensaje. Ocultarlo no mejora la experiencia y en varias jurisdicciones genera un problema legal; además, un cliente que sabe que habla con un sistema pide pasar a una persona cuando lo necesita en vez de frustrarse dos mensajes antes."
---

De todas las automatizaciones que nos piden, esta es la más frecuente en Argentina y la que más seguido está mal presupuestada. La demo es fácil: un modelo lee «quiero 20 cajas para el jueves» y devuelve un JSON con producto, cantidad y fecha. Cualquiera arma eso en una tarde.

Lo difícil empieza después, y es donde se va el 90% del trabajo.

## Qué hace el sistema, paso por paso

Un pedido real recorre esto:

1. **Entra el mensaje.** Texto, audio, foto de una lista escrita a mano, o las tres cosas en mensajes separados con dos minutos de diferencia.
2. **Se identifica al cliente.** Por número de teléfono contra el CRM. Si es nuevo, es otro flujo.
3. **Se normaliza el pedido.** «Las cajas chicas de siempre» tiene que convertirse en un código de producto. Esto es lo que parece magia y no lo es: es una búsqueda contra el catálogo más el historial de ese cliente.
4. **Se verifica.** Stock, precio vigente para ese cliente, condiciones de pago, si tiene deuda.
5. **Se confirma con el cliente.** En sus términos, no en códigos internos.
6. **Se carga.** Como pedido en el ERP, con todos los campos que el ERP exige.
7. **Se avisa.** Al cliente que quedó, y al vendedor si hay algo que decidir.

Los pasos 1, 3 y 5 son los que la gente asocia con IA. Los pasos 2, 4 y 6 son los que hacen que el proyecto dure ocho semanas en vez de dos.

## Los cinco lugares donde se rompe

### El catálogo no se parece a cómo habla el cliente

En el ERP el producto se llama `CAJ-CORR-30X20-K5`. El cliente escribe «las cajas de 30 por 20». Un cliente distinto escribe «las medianas». Otro manda una foto del producto anterior.

Esto no se resuelve con un prompt mejor. Se resuelve con búsqueda semántica sobre el catálogo, más un peso fuerte al historial de compras de ese cliente en particular: si Pérez compró el mismo artículo doce veces, «las de siempre» tiene una única interpretación razonable.

Y cuando quedan dos candidatos con probabilidad parecida, la respuesta correcta no es elegir. Es preguntar: «¿las de 30×20 o las de 40×30?». Un agente que adivina genera devoluciones, y una devolución cuesta más que veinte preguntas.

### Un mensaje casi nunca es un pedido completo

En la demo el mensaje trae producto, cantidad y fecha. En la realidad llega «hola», después «necesito reponer», después un audio de cuarenta segundos, y a la media hora «ah, y sumame 10 de las otras».

El agente tiene que sostener un pedido en construcción a lo largo del tiempo, saber que ese último mensaje modifica el pedido anterior y no arranca uno nuevo, y decidir cuándo está completo. Eso es estado, no conversación, y es exactamente donde falla el agente que sólo recibe el historial de mensajes.

### El ERP pide campos que el cliente nunca dijo

Depósito de origen, lista de precios, condición de pago, centro de costos. El cliente no dijo ninguno y no tiene por qué.

Cada campo obligatorio del ERP necesita una regla explícita: se deduce del cliente, se toma un valor por defecto, o se pregunta. Descubrir esas reglas es una conversación con la persona que hoy carga los pedidos a mano, y es la parte del proyecto que más veces se subestima. Suele llevar más tiempo que construir el agente.

### Los audios

Una parte grande de los pedidos entra por audio, sobre todo si el que compra está en un depósito o manejando. Se transcriben bien, pero con dos salvedades que importan: los nombres de producto propios de la empresa se transcriben mal, y los números se transcriben mal («cuarenta y cinco» puede salir como «45» o como «40 y 5»).

La transcripción se corrige contra el catálogo, y las cantidades sacadas de un audio se confirman siempre con el cliente antes de cargar. Siempre.

### Lo que no puede hacer solo

Esto se define antes de escribir una línea. En la mayoría de las operaciones queda así:

| Acción | Quién |
|---|---|
| Responder consultas de stock y precio | Agente |
| Armar el pedido y confirmarlo con el cliente | Agente |
| Cargarlo al ERP dentro de la política vigente | Agente |
| Descuento fuera de política | Vendedor |
| Cliente con deuda vencida | Administración |
| Cliente nuevo sin cuenta | Vendedor |
| Reclamo o cliente enojado | Persona, de inmediato |

La última fila no es negociable. Un agente insistiendo con un cliente molesto es peor que no tener agente.

## Lo que realmente cambia en la operación

El resultado no es «se automatizó la atención». Es más concreto que eso y vale la pena decirlo con precisión:

- Los pedidos entran al sistema en el momento, no a la noche cuando alguien se sienta a cargarlos.
- Deja de perderse el pedido que llegó a las nueve de la noche de un viernes.
- La persona que cargaba pedidos pasa a revisar excepciones, que son entre el 15% y el 40%.
- Queda registro de qué se pidió y cuándo, que antes vivía disperso en el WhatsApp personal de tres vendedores.

Ese último punto suele importar más de lo que el cliente anticipa. En varias operaciones el pedido vivía en el teléfono de una persona, y si esa persona se iba de vacaciones, el historial se iba con ella.

## Plazos y costo, sin adornos

Para una operación con un ERP que tiene API y un catálogo de hasta unos miles de artículos: entre seis y diez semanas hasta producción, y una inversión que cae en el segundo cajón de [los rangos de costo](/blog/cuanto-cuesta-automatizar-un-proceso-con-ia/).

Si el ERP no tiene API, sumá entre dos y cuatro semanas y averiguá eso antes que cualquier otra cosa: es el único dato que puede duplicar el presupuesto.
