---
title: "Cómo migrar una academia online de Hotmart, Tiendup o WordPress a una plataforma propia"
seoTitle: "Migrar tu academia de Hotmart, Tiendup o WordPress | Vantalogics"
description: "Qué se puede exportar de Hotmart, Tiendup y WooCommerce, cómo se mueven alumnos y compras sin perder accesos, y el proceso que usamos en una academia real."
answer: "Migrar una academia no es copiar videos: es mover alumnos, compras y accesos sin que nadie pierda un curso. Ninguna plataforma lo hace automático. Se exportan ventas e inscriptos, se normalizan, se asigna cada producto viejo a un curso nuevo, se ensaya sin tocar nada y se importa en una sola operación, avisándole a cada alumno."
nav: "Migración"
order: 1
serviceType: "Migración de academias online a una plataforma propia"
updated: 2026-11-16
cases:
  - apoyo-escolar-rv
faq:
  - question: "¿Los alumnos tienen que volver a pagar?"
    answer: "No. Cada compra de la plataforma anterior se importa como un acceso al curso equivalente en la nueva, con su fecha original. El alumno entra con su email y encuentra los mismos cursos que tenía."
  - question: "¿Se pierde el progreso de los alumnos?"
    answer: "Depende de lo que exporte la plataforma de origen. El avance clase por clase casi nunca sale en los exports. Tiendup sí incluye el porcentaje completado por curso, que sirve para mostrarle al alumno dónde estaba. Conviene decidir antes de la migración qué se conserva y avisarlo, en vez de que el alumno lo descubra."
  - question: "¿Qué pasa con las suscripciones activas?"
    answer: "No se mudan solas. La tarjeta del suscriptor queda guardada en el procesador de la plataforma anterior y no se puede transferir. Hay dos caminos: dejar que las suscripciones vigentes terminen allá y cobrar las nuevas en la plataforma propia, o pedirle a cada suscriptor que se vuelva a suscribir, idealmente con un incentivo."
  - question: "¿Se puede migrar sin cerrar la academia un fin de semana?"
    answer: "Sí. Se migra por etapas, con los alumnos usando la plataforma todo el tiempo: las compras se importan con su fecha original, que también fija cuándo vence cada acceso; las funciones nuevas se prenden con un solo interruptor sin que cambie la dirección del curso; y las ventas que entraron mientras tanto se suman en una segunda pasada sin duplicar nada. La plataforma anterior queda unas semanas en solo lectura."
  - question: "¿Se puede migrar desde Moodle?"
    answer: "Sí. Moodle exporta usuarios en CSV y cursos como copias de seguridad, y al tener acceso a la base de datos también se pueden extraer inscripciones y calificaciones. Es la migración con más datos disponibles; el trabajo está en adaptar la estructura de Moodle al recorrido de la plataforma nueva."
  - question: "¿Qué pasa con los enlaces y el posicionamiento de la plataforma anterior?"
    answer: "Si los cursos estaban en tu dominio (WordPress), cada URL vieja se redirige con un 301 a su curso nuevo y se conserva casi todo lo ganado en buscadores. Si estaban en un subdominio de Hotmart o Tiendup, no hay forma de redirigir: hay que actualizar los enlaces en redes, anuncios, emails y la biografía antes de la fecha de corte."
---

Una academia que se muda no pierde su contenido, que suele estar en los archivos originales del docente. Lo que se pone en riesgo son las personas: alumnos que compraron un curso y el lunes no lo encuentran, compras duplicadas, cuentas que quedan huérfanas porque alguien se registró con otro email. Una migración está bien hecha cuando ningún alumno se entera de que existió, salvo por el email que le avisa que sus cursos ya están en la plataforma nueva.

## Qué se puede sacar de cada plataforma

Ninguna plataforma de cursos ofrece una mudanza automática hacia afuera. Cada una exporta algo distinto, con su formato y sus errores:

| Plataforma | Qué se puede exportar | Qué no sale | Cuidado con |
| --- | --- | --- | --- |
| Hotmart | Reportes de ventas en CSV o XLS y la lista de usuarios del área de miembros | Contraseñas, tarjetas de suscriptores, avance clase por clase | Las suscripciones activas siguen cobrándose en Hotmart hasta que se cancelen |
| Tiendup | Pedidos en CSV e inscriptos por curso con su porcentaje completado | Contraseñas y avance clase por clase | Pedidos e inscriptos salen en archivos separados, y los inscriptos vienen en un archivo por curso |
| WordPress con WooCommerce | Pedidos en CSV, filtrables por estado | Contraseñas | Filtrar pedidos pendientes y cancelados; si el LMS es un plugin (LearnDash, Tutor LMS), el progreso está en la base de datos de WordPress |
| Moodle | Usuarios en CSV, cursos como copias de seguridad, inscripciones y calificaciones desde la base | Nada crítico, si hay acceso a la base | Adaptar la estructura de Moodle al recorrido nuevo lleva más trabajo que exportar |

Ninguna exporta contraseñas, y está bien que así sea. Cada alumno recibe un acceso nuevo por email, así que la comunicación es parte de la migración, no un detalle al final.

## El caso: Apoyo Escolar RV, de Tiendup y WooCommerce a una plataforma propia

[Apoyo Escolar RV](/casos/apoyo-escolar-rv/) prepara a estudiantes para materias de cinco universidades y hoy tiene más de 22.000 estudiantes en su plataforma. Sus ventas históricas estaban repartidas en dos lugares, una tienda en Tiendup y otra en WordPress con WooCommerce, y cada alumno que había comprado en cualquiera de las dos tenía que encontrar sus cursos en la plataforma propia. Cada tienda tenía su propio export, su formato de fechas, su forma de escribir los teléfonos y sus nombres de producto. Estos fueron los pasos.

### 1. Un solo archivo maestro con un formato común

Los dos orígenes se llevaron a las mismas columnas: número de pedido, fecha, nombre, apellido, email, teléfono, producto y de qué plataforma venía. Guardar el origen de cada fila parece un detalle, pero es lo que después permite rastrear cualquier reclamo hasta el pedido original.

### 2. Normalizar antes de importar

- **Fechas.** Un origen las escribía `11/11/2025 00:49:17` y el otro `2025-11-21 00:00`. Todas se llevaron al mismo formato.
- **Emails.** En minúsculas y sin espacios. Es la clave con la que se identifica a cada alumno, y `Maria@` y `maria@` no pueden ser dos personas.
- **Teléfonos.** Sin espacios ni guiones y con el código de país.
- **Acentos.** Uno de los exports llegó con los caracteres rotos por un problema de codificación: "QuÃ­mica" en lugar de "Química". Si no se corrige, el nombre del producto no coincide con ningún curso.
- **Estados.** Solo entran los pedidos completados. Un pedido pendiente importado es un acceso regalado.

### 3. Una tabla que traduce cada producto viejo a un curso nuevo

Es el paso que más decisiones requiere, y las toma la academia, no el equipo técnico. Cada producto de la plataforma anterior se anotó con su identificador, cuántos pedidos y cuántos alumnos únicos tenía, y a qué curso nuevo corresponde. Algunos productos viejos se unificaron en un solo curso nuevo, así que la tabla admite que varios apunten al mismo destino. Todo producto sin correspondencia aparece en un reporte antes de importar, no después.

### 4. Una persona, una cuenta

Un alumno se busca primero por email, sin distinguir mayúsculas ni acentos. Si no aparece, se busca por teléfono, porque la misma persona pudo haber comprado con dos emails distintos en dos tiendas. Solo si no aparece por ninguna de las dos se crea una cuenta nueva.

### 5. Ensayo en seco

La migración completa se corre primero en modo de prueba, sin escribir nada. Devuelve cuántas cuentas se crearían, cuántas ya existían, cuántas compras se agregarían y qué productos quedaron sin curso. Se corre, se corrige la tabla, se vuelve a correr, hasta que el reporte no tenga sorpresas.

### 6. Importar por partes y avisar sin saturar

La importación real procesa los pedidos de a 100. Los emails salen en tandas de 10 cada 600 milisegundos, por debajo del límite de pedidos por segundo del proveedor de envíos: disparar miles de emails juntos hace que el proveedor los rechace, y un alumno que no recibió el aviso escribe a soporte. Hay dos mensajes distintos: quien no tenía cuenta recibe su acceso, y quien ya la tenía recibe el aviso de que sus cursos de la plataforma anterior ya están disponibles. Cada email que falla queda registrado para reenviarlo.

### 7. Una segunda pasada para lo que entró durante la transición

Mientras se preparaba la migración, las tiendas anteriores siguieron vendiendo. Esas ventas se exportaron después y se agregaron con el mismo proceso. Como el script reconoce las compras que ya existen, correrlo dos veces no duplica nada.

## Migrar por etapas sin cortar el acceso

No hace falta elegir un fin de semana y cambiar todo de golpe. En Apoyo Escolar RV la mudanza se hizo por partes, con los alumnos usando la plataforma todo el tiempo. Lo hicieron posible tres decisiones.

### El vencimiento se cuenta desde la compra original

Si el acceso a un curso dura un tiempo fijo, el acceso migrado vence contando desde el día en que el alumno compró en la plataforma anterior, no desde el día de la migración. En Apoyo Escolar RV cada compra importada vence 12 meses después de su fecha de compra original. Contarlo desde el día de la importación le regalaría a cada alumno el tiempo que ya había usado. Por eso el archivo maestro conserva la fecha de cada pedido (paso 1) y las fechas se normalizan con cuidado (paso 2): un error de formato acá cambia cuándo pierde el acceso cada persona.

### La experiencia nueva se prende con un solo interruptor

El portal del curso, el progreso, la comunidad, el chat del curso y la gamificación se prenden y se apagan juntos, con un único interruptor que se cambia sin volver a publicar la plataforma. Con el interruptor apagado, la dirección del curso que el alumno tiene guardada lo lleva al mismo reproductor de siempre, así que no nota nada. Mientras tanto, las funciones nuevas no existen en ese entorno: sus 38 puntos de acceso responden como si no estuvieran, y nada a medio terminar queda a la vista. La misma versión corre en el entorno de pruebas con todo prendido y en producción con todo apagado, hasta el día del cambio.

### Los accesos se restituyen por derecho, no por lo que se observó

Cuando hay que mover a un grupo de alumnos a un lugar nuevo, la lista sale de las compras completadas y vigentes, no de registros de quién estaba. En Apoyo Escolar RV hubo que abrir un grupo de consultas nuevo y la base no sabía quién había entrado al anterior: 10.184 de 10.709 eventos registrados decían que se había enviado el enlace por email, no que la persona se hubiera unido. La audiencia se armó desde las compras con consultoría vigente. El envío no se habilita hasta que se corre una simulación con esa lista, y cualquier cambio en la lista obliga a simular de nuevo. Los avisos salen a 30 por minuto y cada uno lleva un identificador fijo por grupo y por alumno, así que apretar enviar dos veces no manda dos emails.

## Video: dos formatos conviviendo por un tiempo

El contenido es la parte fácil si se tienen los originales, y la única que no se puede reconstruir si no. Conseguí los archivos originales antes de dar de baja cualquier cuenta.

Mover video entre proveedores también es una migración. En Apoyo Escolar RV el video pasó por más de un servicio de streaming, y durante esos cambios convivieron clases ya convertidas con MP4 del sistema anterior. El reproductor tiene que soportar los dos formatos, con enlaces que vencen en ambos casos, hasta que la conversión termine.

## Checklist antes de la fecha de corte

1. Originales de todos los videos y materiales descargados y verificados.
2. Exports de ventas e inscriptos de cada plataforma, con fecha y hora de corte anotada.
3. Tabla producto viejo → curso nuevo revisada y aprobada por la academia.
4. Vencimientos calculados desde la fecha de compra original, no desde el día de la migración.
5. Ensayo en seco sin productos huérfanos ni errores sin explicar.
6. Emails de acceso redactados, probados y con el remitente autenticado para no caer en spam.
7. Enlaces de compra en redes, anuncios, emails y biografía listos para cambiar.
8. Redirecciones 301 de las URLs viejas, si estaban en tu dominio.
9. Plan para las suscripciones activas: dejarlas vencer o pedir que se vuelvan a suscribir.
10. Soporte reforzado la primera semana: van a llegar consultas aunque todo salga bien.
11. La plataforma anterior activa unas semanas más, en solo lectura, por si hace falta rescatar un dato.

## Después de migrar

Mudarse es la excusa para resolver lo que la plataforma anterior no dejaba: medios de pago locales, recorridos por institución y materia, entregas corregidas por docentes, un asistente de IA sobre el material. Lo que se puede construir y cuándo conviene está en [desarrollo de plataformas educativas a medida](/plataformas-educativas/).
