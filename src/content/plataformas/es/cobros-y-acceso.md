---
title: "Cómo cobrar los cursos de una academia online y dar acceso automático: Mercado Pago, transferencias y PayPal"
seoTitle: "Cobrar cursos online y dar acceso automático | Vantalogics"
description: "Webhooks, conciliación, pagos repetidos y transferencias que se acreditan solas. Con datos de dos academias reales: 16 de 205 pagos no se acreditaban solos."
answer: "Para que el alumno tenga su curso apenas paga y nadie revise comprobantes, el acceso se habilita cuando el procesador de pagos avisa que el pago se aprobó, nunca cuando el alumno vuelve a la pantalla de gracias. Cada aviso se procesa una sola vez, un proceso de conciliación recupera cada pocos minutos los avisos que se pierden y el acceso se guarda como un permiso con fecha de vencimiento, separado del pago. En una academia real, 16 de 205 pagos aprobados en cuatro días no se acreditaban solos hasta que sumamos esa conciliación."
nav: "Cobros y acceso"
order: 3
serviceType: "Cobros y acceso automático para academias online"
updated: 2026-10-20
cases:
  - apoyo-escolar-rv
  - lu-apuntes
faq:
  - question: "¿Se puede dar acceso automático a un curso pagado por transferencia bancaria?"
    answer: "Sí. En Argentina, un proveedor como Talo genera una cuenta virtual (CVU) y un alias para cada orden y avisa a la plataforma cuando entra el dinero. La plataforma confirma que el monto y la moneda coinciden con la orden y habilita el curso sin que nadie mire un comprobante. Apoyo Escolar RV y Lu Apuntes cobran las transferencias así."
  - question: "¿Cuánto tarda el alumno en tener el curso después de pagar?"
    answer: "Lo que tarda en llegar el aviso del procesador. En Lu Apuntes la pantalla de la orden se actualiza cada 3 segundos mientras el pago está pendiente, así que el alumno ve el curso habilitado sin recargar. Si el aviso se pierde, la conciliación lo recupera: en Apoyo Escolar RV corre cada 10 minutos."
  - question: "¿Qué pasa si un alumno paga dos veces el mismo curso?"
    answer: "Si los dos pagos son de órdenes distintas y el curso ya se había acreditado en las últimas 24 horas, el segundo se devuelve solo a través de la API del procesador y queda registrado. Si los dos pagos son de la misma orden, es un pago dividido en dos medios y se acreditan los dos. Además, el carrito no deja volver a comprar el mismo curso con el mismo plan mientras al acceso le queden más de 15 días."
  - question: "¿Y si el alumno transfiere de menos o de más?"
    answer: "Si transfiere de menos, la orden queda pendiente: el proveedor suma los depósitos a la misma cuenta virtual y, cuando se completa el monto, llega el aviso de pago completo. Si transfiere de más, el curso se habilita igual y la diferencia se devuelve desde el panel del proveedor. Si el monto o la moneda no coinciden con la orden, el acceso no se habilita y el caso queda registrado para revisarlo."
  - question: "¿Cómo se manejan los planes con vencimiento y las renovaciones?"
    answer: "El acceso vence en la fecha de aprobación del pago más la duración del plan. Una tarea programada cierra cada acceso al vencer y un barrido cada hora revisa que no quede ninguno abierto. Para renovar, el alumno puede volver a comprar cuando le quedan 15 días o menos, y si pasa a un plan superior paga solo la diferencia y conserva su fecha de vencimiento."
  - question: "¿Puedo cobrarles a alumnos de otros países?"
    answer: "Sí. Los medios de pago se eligen según dónde están los alumnos. En Apoyo Escolar RV, quien está fuera de Argentina paga por PayPal y ve el monto en dólares convertido a la cotización oficial del momento. Para cobrar con tarjeta en otros países se suma Stripe u otro procesador local con el mismo esquema de aviso, conciliación y permisos."
---

Una academia que vende por su cuenta suele empezar igual: el alumno transfiere, manda la foto del comprobante por WhatsApp y alguien le da el acceso cuando lo ve. Funciona con diez ventas por mes. Con cien, son horas por semana, comprobantes falsos y alumnos que pagaron un viernes a la noche y escriben "no me llegó el curso" el sábado.

Automatizarlo no es solo conectar Mercado Pago. Lo difícil viene después del botón de pago: avisos que no llegan, avisos que llegan dos veces, transferencias por un monto distinto, planes que vencen, alumnos que pagan dos veces. Acá está lo que aprendimos cobrando en dos academias en producción, [Apoyo Escolar RV](/casos/apoyo-escolar-rv/) y [Lu Apuntes](/casos/lu-apuntes/), con los errores que encontramos y cómo los resolvimos.

## Del pago al acceso: qué tiene que pasar

| Momento | Qué hace la plataforma | Qué no hacer |
| --- | --- | --- |
| El alumno elige el curso | Crea la orden con el monto, la moneda y los cursos, antes de mandarlo a pagar | Calcular el precio en el navegador del alumno |
| El alumno paga | Lo manda al procesador con una referencia que identifica la orden | Dar acceso porque volvió a la pantalla de gracias |
| El procesador avisa | Vuelve a consultar el pago a la API del procesador, compara monto y moneda con la orden y registra el aviso | Confiar en lo que dice el cuerpo del aviso |
| El aviso no llega | La conciliación consulta los pagos aprobados recientes y acredita los que falten | Esperar a que el alumno escriba |
| El aviso llega de nuevo | Lo reconoce y no hace nada | Crear una segunda compra, otro email de bienvenida, otra invitación |
| Se habilita el curso | Guarda un permiso con fecha de vencimiento, separado del pago | Calcular el acceso leyendo los pagos |
| Vence el plan | Cierra el acceso y lo saca de los grupos del curso | Dejarlo abierto hasta que alguien lo note |

## El aviso del procesador, no la pantalla de gracias

Cuando el alumno termina de pagar, el procesador lo devuelve a la plataforma. Esa vuelta no prueba nada: se puede abrir a mano, se puede cerrar la pestaña antes de que cargue y el pago puede seguir pendiente. Lo que vale es el aviso que el procesador manda por su cuenta a la plataforma, el webhook, cuando el pago cambia de estado.

Y aun así el aviso no se toma al pie de la letra. En Lu Apuntes el aviso trae solo el identificador del pago. La plataforma lo vuelve a pedir a la API del proveedor, compara el monto y la moneda contra la orden, en centavos enteros, y recién ahí marca la orden como pagada y crea el permiso, todo en una misma transacción. Si algo falla en el medio, responde con error y el proveedor reintenta.

Mientras tanto, la pantalla de la orden consulta su estado cada 3 segundos. El alumno ve el curso habilitado sin recargar, y si el aviso se demora, la propia pantalla le pide al proveedor el estado del pago, como mucho una vez cada 15 segundos por orden.

## Los avisos se pierden: la conciliación

Un webhook es un pedido por internet entre dos servidores, y a veces no llega: un corte, una demora, un reinicio en el peor momento. En junio de 2026 revisamos los pagos de Mercado Pago de Apoyo Escolar RV contra la API del procesador: **16 de 205 pagos aprobados en cuatro días no tenían su compra**. Eran alumnos que habían pagado y no tenían el curso, y el equipo los resolvía a mano a medida que escribían.

La solución no fue arreglar el webhook, que funcionaba. Fue sumarle una red de seguridad: cada 10 minutos, un proceso le pide a Mercado Pago los pagos aprobados de las últimas tres horas y acredita los que no tengan compra. Usa exactamente la misma lógica que el webhook, así que da igual cuál de los dos llegue primero. Ignora los pagos que entran por otros canales del procesador, como cobros con posnet o links de pago, y no toca los cursos que un administrador ya dio a mano.

Desde entonces, un aviso perdido se corrige solo en minutos, antes de que el alumno lo note.

## Los avisos se repiten: procesar cada uno una sola vez

El problema contrario es igual de común. Los procesadores reintentan cuando no reciben respuesta a tiempo, y además vuelven a avisar cada vez que el pago cambia de estado. Un mismo pago puede generar varios avisos.

En Apoyo Escolar RV lo vimos con un caso que no figura en ninguna documentación. Mercado Pago retiene el dinero unos 35 días y, al liberarlo, actualiza el pago y vuelve a avisar. La plataforma buscaba si ese pago ya tenía una compra activa, pero en los planes de un mes la compra original ya había vencido, así que no la encontraba y acreditaba el pago otra vez. Cada duplicado disparaba el flujo entero: email de "gracias por tu compra", invitación al grupo de WhatsApp y vaciado del carrito. **Entre mayo y julio de 2026 encontramos 358 compras duplicadas**, y el número crecía.

Lo que resolvió el problema:

- **Cualquier compra con ese identificador de pago prueba que el pago ya se acreditó**, esté vigente, vencida o dada de baja. El estado de la compra no importa.
- **Las bajas no borran.** Cuando un administrador quita un acceso, la compra queda vencida y conserva el identificador del pago, para que un aviso viejo no la vuelva a crear.
- **Un pago aprobado hace más de 24 horas no se acredita automáticamente.** Un aviso tardío de un pago viejo no puede devolver un acceso que alguien cambió a mano.
- **Los avisos se procesan de a uno por alumno**, así que el webhook, la conciliación y un reintento no pueden acreditar lo mismo al mismo tiempo.

En Lu Apuntes cada aviso se registra con el identificador del pago y su estado. Si ese par ya se procesó, se ignora. Si se registró pero el proceso se cortó a la mitad, se vuelve a correr. El permiso no se puede duplicar y el email de compra se manda con una clave que el servicio de correo usa para no enviarlo dos veces.

## Cuando el alumno paga dos veces

Pasa más de lo que parece: el pago tarda, el alumno no está seguro de si salió y vuelve a pagar. En octubre de 2026 un alumno de Apoyo Escolar RV pagó dos veces el mismo carrito con cinco minutos de diferencia. Se devolvió uno de los pagos a mano y, al quitar el acceso duplicado, se vencieron también las compras del pago bueno.

Ahora la plataforma lo resuelve sola. Si todos los cursos de un pago ya se acreditaron en las últimas 24 horas con otro pago aprobado de otra orden, el pago nuevo se devuelve automáticamente a través de la API de Mercado Pago y queda en el registro de auditoría. Si los dos pagos son de la misma orden, no es un duplicado: es un alumno que dividió el pago en dos medios, y se acreditan los dos.

Para que no llegue a pasar, el carrito tampoco deja comprar el mismo curso con el mismo plan si al acceso le quedan más de 15 días. Las renovaciones dentro de esa ventana, los cambios de plan y los accesos dados a mano siguen pasando.

## Transferencias que se acreditan solas

La transferencia es el medio que más usan los alumnos en Argentina y el que más trabajo daba. En Apoyo Escolar RV, antes de automatizarla, cada transferencia era un comprobante que alguien tenía que revisar contra el banco, con comprobantes falsos y alumnos esperando la aprobación. Con varios cursos en el carrito, un error de ese flujo manual asignaba solo el primero al aprobar el comprobante.

Desde abril de 2026 las transferencias entran por Talo. Para cada orden se genera una cuenta virtual (CVU) y un alias; el alumno transfiere desde su banco y el proveedor avisa cuando entra el dinero. Lu Apuntes cobra solo por transferencia, con el mismo esquema, y estos son los estados que maneja:

| Estado del pago | Qué hace la plataforma |
| --- | --- |
| Pendiente | La orden espera. La pantalla sigue consultando. |
| Pago incompleto | La orden sigue pendiente: los depósitos se suman en la misma cuenta virtual y, cuando se completa el monto, llega el aviso de pago completo |
| Pago completo | Verifica monto y moneda contra la orden y habilita el curso |
| Pago de más | Habilita el curso y registra la diferencia para devolverla desde el panel del proveedor |
| Vencido | La orden pasa a fallida |
| Monto o moneda distintos a la orden | No habilita nada y lo registra para revisarlo |

Que un pago pueda pasar por "incompleto" y después por "completo" es la razón para registrar cada aviso con su estado. Si se descartara el segundo aviso por repetido, el alumno que completó la transferencia se quedaría sin su curso.

Un dato sobre cuánto se usa la vía manual cuando la automática anda bien. En agosto de 2026 Lu Apuntes sumó un formulario para que los alumnos mandaran el comprobante de compras hechas fuera de la plataforma. Al día siguiente lo sacamos: no había entrado ninguna solicitud.

## Mercado Pago, transferencias y PayPal

| Medio | Cómo se confirma | Dónde está en producción |
| --- | --- | --- |
| Mercado Pago (tarjeta, dinero en cuenta) | Aviso del procesador, nueva consulta a su API y conciliación cada 10 minutos | Apoyo Escolar RV |
| Transferencia bancaria con cuenta virtual por orden | Aviso del proveedor con el estado del pago; verificación de monto y moneda | Apoyo Escolar RV y Lu Apuntes |
| PayPal para alumnos fuera de Argentina | Monto en dólares a la cotización oficial del momento, comprobante y aprobación de un administrador | Apoyo Escolar RV |

PayPal es el único medio que hoy pasa por una persona en Apoyo Escolar RV. No es un límite técnico: la plataforma cobró con PayPal de forma automática durante un año, y hoy la academia lo maneja con comprobante. Para cobrar con tarjeta en otros países se suma Stripe u otro procesador local, con el mismo esquema de aviso, conciliación y permisos.

## El acceso es un permiso, no un pago

Un alumno puede tener un curso porque lo compró, porque venía de la plataforma anterior, porque un administrador se lo dio o porque pasó a un plan superior. Si el acceso se calcula leyendo los pagos, cada uno de esos casos termina en una orden inventada. Por eso en las dos plataformas el acceso se resuelve en un solo lugar:

- **Lu Apuntes** guarda los accesos en una tabla de permisos: un alumno, un apunte, y opcionalmente la orden que lo originó. El pago es una de las formas de crear un permiso; el administrador también puede darlo o quitarlo, y al quitarlo el alumno lo pierde en la sesión que tiene abierta. Bloquear una cuenta borra todos sus permisos en la misma operación.
- **Apoyo Escolar RV** guarda cada compra con una foto del plan (nombre y duración) y una fecha de vencimiento, y un único servicio decide qué tiene habilitado cada alumno. Si hay varias compras vigentes del mismo curso, gana la que incluye consultas con el docente y, si empatan, la que vence más tarde.

Con el acceso separado del pago, cada situación tiene su lugar:

- **Alumnos migrados**: cada compra de la plataforma anterior entra con 12 meses de acceso desde la fecha de inscripción original. Los detalles están en [cómo migrar una academia](/plataformas-educativas/migracion/).
- **Accesos dados a mano**: el administrador elige la fecha de vencimiento y queda registrado que no vino de un pago.
- **Pasar a un plan superior**: el alumno paga solo la diferencia y la compra nueva hereda la fecha de vencimiento de la original.
- **Contenido con fecha de baja**: en Lu Apuntes, cuando un apunte deja de venderse, deja de mostrarse también a quien lo tenía.

## Vencimientos y renovaciones

En Apoyo Escolar RV cada plan dura una cantidad de meses, y el acceso vence en la fecha de aprobación del pago más esa duración. Cada vencimiento se programa como una tarea al momento de la compra, con tres reintentos si falla. Además, un barrido cada hora busca compras vencidas que hayan quedado abiertas. Al vencer, el alumno pierde el curso y sale del grupo de WhatsApp del curso.

La renovación se habilita cuando al acceso le quedan 15 días o menos. Antes de eso, el carrito no deja volver a comprar el mismo plan, que es la forma más común de pagar dos veces sin querer.

## Antes de abrir la venta: seis pruebas

Estas pruebas se hacen en el entorno de prueba del procesador, que simula pagos y transferencias sin dinero real:

1. **Pagar y cerrar la pestaña antes de volver a la plataforma.** El curso tiene que aparecer igual.
2. **Mandar dos veces el mismo aviso.** Tiene que haber una sola compra, un solo email y una sola invitación.
3. **Apagar el webhook, pagar y esperar la conciliación.** El curso tiene que aparecer solo, sin que nadie intervenga.
4. **Transferir menos que el precio y después completar.** La orden tiene que quedar pendiente y habilitarse recién con el segundo depósito.
5. **Pagar dos veces el mismo carrito.** Tiene que quedar un acceso, y el segundo pago tiene que volver o quedar marcado para devolver.
6. **Quitar un acceso a mano y reenviar un aviso viejo de ese pago.** El acceso tiene que seguir quitado.

Si alguna falla, ese es el mensaje de "no me llegó el curso" que vas a recibir el primer fin de semana de ventas.

## Cómo lo encaramos

En una plataforma propia, el cobro y el acceso son lo primero que se construye, porque una plataforma que todavía no cobra no puede reemplazar a la anterior. Elegimos los medios de pago según dónde están los alumnos y cada medio entra con aviso, conciliación y permisos desde el primer día. Las pruebas de arriba se corren antes de abrir la venta. Lo que hace una plataforma completa, desde el catálogo hasta la IA sobre el material, está en [desarrollo de plataformas educativas a medida](/plataformas-educativas/). Y si ya vendés en otra plataforma, la mudanza de alumnos y compras está en [cómo migrar una academia](/plataformas-educativas/migracion/).
