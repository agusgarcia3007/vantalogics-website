---
title: "Cómo proteger los videos y PDFs de una academia online contra la descarga y la reventa"
seoTitle: "Proteger videos y PDFs de tus cursos online | Vantalogics"
description: "Qué se puede impedir y qué no: enlaces que vencen, una sesión por cuenta y PDFs con el email del comprador. Con datos de una academia real que frenó la reventa."
answer: "Ninguna plataforma impide una grabación de pantalla, así que proteger un curso no es bloquear: es que nadie sin compra obtenga un enlace al material, que el video se sirva por streaming con enlaces que vencen en minutos, que una cuenta no se pueda usar en dos lugares a la vez y que cada PDF lleve estampado el email de quien lo compró. La copia casual desaparece y la que circula identifica a su origen."
nav: "Protección de contenido"
order: 2
serviceType: "Protección de contenido para academias online"
updated: 2026-10-06
cases:
  - apoyo-escolar-rv
  - lu-apuntes
faq:
  - question: "¿Se puede impedir que graben la pantalla?"
    answer: "En una computadora, no. El navegador no puede detectar un grabador externo ni un celular filmando el monitor. Solo el DRM por hardware vuelve negra la captura, y únicamente en Safari, iOS y Android con Widevine L1; en Chrome de escritorio no la bloquea. Por eso la defensa contra la grabación es la trazabilidad, no el bloqueo."
  - question: "¿Sirve bloquear el clic derecho o las herramientas de desarrollador?"
    answer: "No. Se saltea en segundos y molesta al alumno que pagó. Tampoco sirve detectar la captura desde el navegador, porque solo ve la captura del propio navegador y no OBS ni cualquier grabador externo. Da una falsa sensación de seguridad."
  - question: "¿Conviene poner una marca de agua sobre el video?"
    answer: "En Apoyo Escolar RV la probamos en agosto de 2026 y la sacamos. Un sello sobre el reproductor se recorta fácil y tapa la clase. La marca personal quedó en los PDFs, donde sí funciona: va estampada en el archivo y sobrevive a cualquier copia."
  - question: "¿Qué pasa con el alumno que estudia en la computadora y en el celular?"
    answer: "Depende de qué se limite. Con una sesión única por cuenta, como en Lu Apuntes, al entrar desde otro dispositivo el anterior vuelve al inicio de sesión. Si lo que se limita es la reproducción simultánea, como en Apoyo Escolar RV, el alumno puede tener las dos sesiones abiertas y solo se lo frena si reproduce video en las dos al mismo tiempo."
  - question: "¿Necesito DRM?"
    answer: "Casi nunca al principio. Cuesta todos los meses, complica el reproductor y suele fallar en televisores y navegadores viejos. Con enlaces solo para quien compró, streaming con enlaces que vencen, control de sesiones y PDFs con marca personal se resuelve la mayor parte del problema. DRM tiene sentido si, con todo eso andando, el contenido sigue saliendo por descarga del stream."
  - question: "¿Qué hago cuando encuentro mi curso revendido?"
    answer: "Si los PDFs llevan la marca personal, la copia dice de qué cuenta salió. Con eso se suspende la cuenta, y como todos los enlaces pasan por la plataforma, el corte es inmediato. Después se pide la baja de la publicación en el sitio o grupo donde se revende. Conviene que los términos de uso digan que la licencia es personal y que el material lleva los datos del comprador."
---

Una academia que descubre su curso revendido suele pensar en lo mismo: alguien grabó la pantalla. Casi nunca es así. La grabación existe y no se puede impedir, pero lleva horas por curso. La reventa a escala sale de lugares más baratos: un enlace que no vence, un archivo que se descarga sin iniciar sesión, una cuenta que usan diez personas.

## Lo que se puede frenar y lo que no

| Medida | Qué frena | Qué no frena | Costo para el alumno que pagó |
| --- | --- | --- | --- |
| Enlaces al material solo para quien compró | Descarga sin pagar, enlaces compartidos en grupos | Lo que haga un comprador con su propio acceso | Ninguno |
| Video por streaming con enlaces que vencen | Bajar el video con un clic, pasar la URL a otros | Un comprador técnico con un descargador de streaming | Ninguno |
| Control de sesiones o de reproducción simultánea | Cuentas compartidas | Que el dueño de la cuenta descargue o grabe | Molesta a quien usa dos dispositivos a la vez |
| Email del comprador estampado en cada PDF | Reventa anónima del PDF | Que se copie, pero la copia lo identifica | Ninguno |
| DRM por hardware | Captura en Safari, iOS y Android con Widevine L1 | Captura en Chrome de escritorio | Costo mensual y fallas en dispositivos viejos |
| Bloquear clic derecho o detectar herramientas de desarrollador | Nada | Todo | Molesta |

Las cuatro primeras se suman entre sí y no le cambian nada al alumno legítimo. Esa es la base. DRM se evalúa después, si hace falta.

## Primero, encontrar por dónde se va el contenido

En agosto de 2026 Apoyo Escolar RV detectó que circulaban PDFs y videos de sus cursos. La auditoría encontró que la fuga no venía de grabaciones. Una ruta pública de la API devolvía, a cualquiera que la consultara sin iniciar sesión, los enlaces de reproducción de todas las clases y los enlaces permanentes de todos los materiales. No hacía falta comprar ni grabar nada.

Antes de gastar en cualquier tecnología de protección, conviene hacer tres pruebas con una ventana de incógnito:

1. Abrir la página de un curso sin iniciar sesión y mirar qué devuelve el servidor. Si aparecen direcciones de videos o de PDFs de clases que no son de muestra, el contenido ya está regalado.
2. Copiar el enlace de un PDF desde una cuenta que compró y abrirlo días después en otro navegador. Si abre, ese enlace circula para siempre.
3. Pedir un archivo de descarga sin sesión. Si llega, cualquier visitante puede bajarse el curso.

Cerrar eso no le cambia nada al alumno que pagó, y suele ser la mayor parte del problema.

## Video: streaming con enlaces que vencen

El archivo de video original no tiene que ser accesible desde afuera. Se sirve por streaming y cada reproducción arranca con un enlace firmado que vence. En Apoyo Escolar RV ese enlace duraba seis horas y lo bajamos a 30 minutos: solo tiene que servir para empezar a reproducir, y a partir de ahí la reproducción se sostiene sola. Seis horas eran seis horas para pasar la URL por un grupo.

Un enlace corto exige que la aplicación lo renueve a tiempo. Cuando la plataforma reutilizaba enlaces sin fecha de renovación, 6 de cada 10 errores de carga de video en producción eran enlaces ya vencidos: el alumno veía la pantalla en negro. Acortar el enlace y renovarlo son el mismo cambio.

Lo que no conviene hacer es atar el enlace a la IP del alumno. Las redes móviles cambian de IP en medio de una clase y el que termina bloqueado es el alumno, no el revendedor.

## Cuentas compartidas: sesión única o reproducción simultánea

Compartir la cuenta es la forma más común de pérdida en una academia. Hay dos maneras de frenarlo y tenemos las dos en producción:

- **Sesión única por cuenta.** En Lu Apuntes cada usuario tiene una sola sesión activa. Si entra desde otro dispositivo, el anterior se entera en unos 30 segundos y vuelve al inicio de sesión. Es lo más estricto y molesta a quien estudia en la computadora y en el celular a la vez.
- **Reproducción simultánea.** En Apoyo Escolar RV lo que no se permite es reproducir video en dos lugares al mismo tiempo. El reproductor avisa cada 15 segundos que sigue activo, y si otra conexión reproduce dentro de esa ventana, se cierra la sesión.

La segunda necesita ajuste con datos reales. De 1.248 alertas en 60 días, 7 eran el mismo navegador con dos inicios de sesión y 21 eran un dispositivo que ya había dejado de reproducir cuando arrancó el otro. Las dos situaciones son de un alumno legítimo y dejaron de contar como conflicto. Sin esa revisión, la protección termina echando a quien pagó.

## PDFs: el email del comprador en cada página

El PDF es lo más fácil de revender porque es un archivo completo. Ahí la defensa es la trazabilidad: en Apoyo Escolar RV cada PDF se estampa en el servidor en el momento en que el alumno lo abre o lo descarga, con su email en diagonal en cada página y una línea al pie que dice que es material de uso personal y que está prohibida su distribución. La marca queda en el visor y en la copia descargada, así que cualquier PDF que aparezca en venta dice de qué cuenta salió.

Un detalle que aparece solo en producción: de 2.239 PDFs de los cursos, 23 venían cifrados con contraseña de propietario. Abrían sin pedir nada, pero al estamparles la marca sin descifrarlos el archivo resultante pedía una contraseña que no existía. Ahora se descifran antes de estampar y se verificó, uno por uno, que todos conservan sus páginas y su texto.

Cada material tiene además su propia configuración de descarga. Lo que se marca como no descargable se ve dentro de la plataforma y el servidor rechaza el pedido de descarga.

## Por qué no ponemos marca de agua sobre el video

La probamos. En Apoyo Escolar RV el reproductor mostró el email del alumno sobre el video y al día siguiente la sacamos. Un sello encima del reproductor se recorta en cualquier editor, y para que no se recorte tiene que estar en el medio de la imagen, tapando la clase. El alumno que pagó lo sufre todos los días y el revendedor lo saca una vez.

## DRM: cuándo tiene sentido

El DRM por hardware (FairPlay en Apple, Widevine L1 en Android) hace mucho más difícil bajar el video y vuelve negra la grabación de pantalla en esos dispositivos. En Chrome de escritorio no bloquea la captura. A cambio cuesta todos los meses, agrega complejidad al reproductor y suele romper casos como televisores o navegadores viejos.

Por eso en Apoyo Escolar RV quedó diferido a propósito. Tiene sentido cuando, con todo lo anterior funcionando, el contenido sigue saliendo por descarga del streaming. Si ese es tu caso, lo implementamos sobre la misma plataforma.

## Qué no hacer

- **Bloquear el clic derecho, la tecla de captura o las herramientas de desarrollador.** Se saltea en segundos y molesta a todos.
- **Detectar la captura desde el navegador.** Solo ve la captura del propio navegador, no un programa externo.
- **Atar el acceso a la IP.** Castiga al alumno que estudia desde el celular.
- **Confiar en un enlace "secreto".** Un enlace sin vencimiento es público en cuanto alguien lo comparte.

## Cómo lo encaramos

1. **Auditoría.** Qué devuelve la plataforma a un visitante sin compra, qué enlaces son permanentes y por dónde se descarga. Es lo primero porque suele ser lo que más pierde.
2. **Cerrar lo fácil.** Enlaces solo con compra, streaming con enlaces que vencen y archivos originales fuera del alcance público.
3. **Sesiones.** Sesión única o control de reproducción simultánea, según cómo estudian tus alumnos, con revisión de las alertas reales.
4. **Trazabilidad.** Email del comprador en cada PDF y registro de quién pidió cada enlace.
5. **Respuesta.** Suspensión inmediata de la cuenta identificada y términos de uso que respalden el reclamo.

Todo esto se construye sobre una [plataforma propia](/plataformas-educativas/), donde cada enlace pasa por tu servidor. Si tu academia hoy vive en otra plataforma, el primer paso es [migrarla sin que ningún alumno pierda su acceso](/plataformas-educativas/migracion/).
