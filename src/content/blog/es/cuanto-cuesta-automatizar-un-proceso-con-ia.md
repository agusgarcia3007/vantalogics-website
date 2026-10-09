---
title: "Cuánto cuesta automatizar un proceso con IA"
seoTitle: "Cuánto cuesta automatizar un proceso con IA: qué mueve el costo — Vantalogics"
description: "Qué define el costo de automatizar un proceso con IA en 2026, los tres tamaños de proyecto que existen, cuánto pesa mantenerlo después del primer mes y cómo calcular el repago antes de pedir presupuesto."
answer: "El costo de automatizar un proceso con IA lo definen las integraciones, no el modelo. Los proyectos caen en tres tamaños —flujo acotado, agente integrado y sistema multiproceso— y el salto entre uno y otro no es gradual. A la construcción hay que sumarle la operación mensual: modelos, infraestructura y un mantenimiento de entre el 15 % y el 25 % anual de la inversión inicial."
date: 2026-06-24
updated: 2026-10-09
cluster: costos
tags:
  - costos
  - automatización de procesos
  - agentes de IA
  - presupuesto
translationOf: how-much-does-it-cost-to-automate-a-process-with-ai
faq:
  - question: "¿Cuánto cuesta el modelo de IA por mes?"
    answer: "Para la mayoría de los procesos internos es la partida más chica de la operación mensual, se paga por uso y baja cada año. Pesa más la infraestructura y, sobre todo, el mantenimiento. Por eso conviene preguntar cuánto cuesta mantener el sistema, no cuánto cuesta el modelo."
  - question: "¿Conviene pagar por hora o por proyecto?"
    answer: "Por proyecto con alcance cerrado. La hora abierta traslada al cliente todo el riesgo de estimación en un tipo de trabajo donde la incertidumbre está en las integraciones, no en el desarrollo. Si el proveedor no puede cerrar un alcance después del diagnóstico, es que todavía no entendió el proceso."
  - question: "¿Cuánto tarda en pagarse una automatización?"
    answer: "Se calcula con tres datos: las horas que consume hoy el proceso, el costo hora cargado de quien lo hace y la parte que se va a automatizar, que en una buena primera versión está entre el 60 % y el 80 % de los casos. Si el repago da más de 18 meses, casi siempre conviene automatizar otra cosa primero."
---

Casi todas las respuestas que hay dando vueltas a esta pregunta son inservibles por el mismo motivo: dan un rango que va de unos cientos a decenas de miles y te dicen que «depende». Depende, sí. Pero depende de cosas concretas y enumerables, y una vez que las conocés podés estimar tu propio caso con bastante precisión antes de pedir un solo presupuesto.

Esta nota es el desglose que usamos internamente para presupuestar. No es una lista de precios: es el mapa de qué mueve el número.

## Los tres rangos que existen de verdad

En la práctica los proyectos caen en tres cajones bastante nítidos, y el salto entre uno y otro no es gradual.

| Tipo | Qué es | Qué define el costo | Operación mensual |
|---|---|---|---|
| Flujo acotado | Un proceso, reglas claras | La integración con uno o dos sistemas | Baja: modelo e infraestructura mínimos |
| Agente integrado | Decide y pide aprobación | Integraciones, límites de decisión y set de evaluación | Media: suma monitoreo y mantenimiento |
| Sistema multiproceso | Agentes coordinados | La coordinación entre agentes y sistemas | Alta: es una plataforma propia |

El primer cajón es un lector de facturas que las carga al ERP y avisa cuando algo no cierra. El segundo es un agente que atiende pedidos por WhatsApp, consulta stock, arma la orden y escala al vendedor cuando hay un descuento fuera de política. El tercero ya es una plataforma, y en general aparece después de que el segundo funcionó.

Si un proveedor te cotiza algo del segundo cajón al precio del primero, no está cotizando lo mismo que vos estás pidiendo.

## Qué mueve el costo (en orden de peso real)

### 1. Las integraciones, siempre

Esta es la partida que se lleva la mitad del presupuesto y la que nadie menciona en la primera reunión. Conectarse a HubSpot es medio día. Conectarse a un ERP local sin documentación, al que se accede por una base SQL Server que alguien configuró en 2014, es entre dos y tres semanas de trabajo antes de escribir una línea de lógica del agente.

La pregunta que más mueve tu presupuesto no es «¿qué modelo van a usar?». Es: **¿tus sistemas tienen API documentada y un ambiente de prueba?** Si la respuesta es sí a los dos, el proyecto es entre un 30% y un 50% más barato.

### 2. Cuántas decisiones tiene que tomar el sistema

Un flujo que mueve datos de A a B sin decidir nada es barato y se comporta igual todos los días. Un agente que tiene que interpretar un mensaje ambiguo, elegir entre cinco acciones posibles y saber cuándo no hacer nada es otro trabajo: hay que definir los límites, construir el set de evaluación, medir y corregir. Ver [por qué fallan los agentes en producción](/blog/por-que-fallan-los-agentes-de-ia-en-produccion/) para el detalle de qué se rompe cuando ese trabajo no se hace.

### 3. Qué pasa si se equivoca

Un agente que redacta borradores de respuesta para que una persona los revise tiene un costo de error cercano a cero, y se puede desplegar rápido. Uno que emite notas de crédito solo necesita guardrails, registro de cada acción, límites de monto, reversibilidad y alertas. Eso es entre el 20% y el 40% de horas extra sobre el mismo proyecto.

No es negociable, pero sí es una decisión de alcance: en la primera versión conviene casi siempre dejar la acción irreversible del lado de una persona y automatizarla después, cuando ya hay tres meses de datos que muestran cuánto se equivoca.

### 4. El volumen, mucho menos de lo que parece

La intuición dice que diez veces más volumen cuesta diez veces más. En estos sistemas casi nunca es así: la diferencia entre procesar 500 y 5.000 documentos por mes es una diferencia marginal de modelo y, eventualmente, una cola de trabajos. El volumen empieza a importar en serio recién arriba de las decenas de miles de operaciones mensuales.

## La partida que casi nadie presupuesta

El costo de construir es el que se discute. El de mantener es el que sorprende.

Un agente en producción necesita, mes a mes:

- **Modelos.** Se paga por uso, es la partida más chica en la mayoría de los casos y baja cada año.
- **Infraestructura.** Base de datos, colas, hosting y observabilidad.
- **Mantenimiento real.** Acá está el número grande. Los sistemas del cliente cambian, los proveedores actualizan modelos y deprecan versiones, aparecen casos que el set de evaluación no cubría. Presupuestá entre el 15% y el 25% anual de la inversión inicial.

Ese último punto es el que separa un proyecto que sigue andando a los dos años de uno que se apagó en silencio en el mes cuatro. Un agente sin nadie mirándolo no falla con un error: falla degradándose, respondiendo cada vez un poco peor, hasta que alguien de atención al cliente comenta al pasar que «últimamente el bot contesta cualquier cosa».

## Cómo estimar tu caso en diez minutos

Antes de pedir presupuestos, hacé este cálculo. Si el resultado no cierra, ningún proveedor lo va a arreglar.

1. **Contá las horas.** Cuántas horas por semana consume hoy el proceso, sumando a todas las personas que lo tocan.
2. **Pasalo a plata.** Multiplicá por el costo hora cargado, no por el salario neto.
3. **Descontá lo que no se va a automatizar.** Nunca es el 100%. Un buen resultado en la primera versión es entre el 60% y el 80% de los casos resueltos sin intervención.
4. **Compará contra 12 meses.** Si el ahorro anual estimado no supera holgadamente la inversión inicial, ese no es el proceso por donde empezar.

Un ejemplo de la forma que suele tener: 22 horas semanales de carga de pedidos, 70% automatizable. Son unas 15 horas por semana, unas 800 al año, que vuelven al equipo. Multiplicadas por el costo hora cargado, ese es el ahorro que se compara contra la inversión inicial más doce meses de operación. Cuando cierra en el año uno, a partir del segundo el proceso es prácticamente gratis.

## Las señales de que un presupuesto está mal armado

Después de bastantes propuestas leídas —propias y de la competencia—, estas son las que más veces predijeron un proyecto que iba a salir mal:

- **No hay diagnóstico previo.** Un presupuesto escrito sin haber mirado los sistemas es una adivinanza con membrete.
- **El precio no distingue construcción de operación.** Si el número mensual no aparece, va a aparecer igual, más tarde y sin haberlo acordado.
- **No dice qué pasa si el agente se equivoca.** La propuesta tiene que decir explícitamente qué acciones son automáticas, cuáles requieren aprobación y cómo se revierten.
- **No hay criterio de éxito medible.** «Mejorar la atención» no es una métrica. «Resolver el 70% de las consultas de estado de pedido sin intervención humana, medido sobre 200 casos reales» sí lo es.
- **El código y los datos quedan del lado del proveedor.** Si no podés llevarte el sistema, no compraste una automatización: alquilaste una dependencia.

## Lo que te tendría que quedar

El costo de un proceso empresarial real lo define casi enteramente el estado de tus sistemas, no la sofisticación de la IA. Antes de comparar propuestas, andá y averiguá si tu ERP tiene API y ambiente de prueba: esa sola respuesta mueve el número más que cualquier otra decisión técnica que tomes después.

Y si el cálculo de los diez minutos te da un repago a más de 18 meses, la conclusión correcta no es «la IA es cara». Es que ese no es el proceso por donde empezar.
