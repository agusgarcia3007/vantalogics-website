# SEO / GEO log — vantalogics.com

Propiedad GSC: `sc-domain:vantalogics.com`. Deploy: push a `main` → GitHub Actions → Cloudflare (wrangler) → IndexNow.
Reglas de contenido vigentes: sin precios de Vantalogics, sin mencionar LearnBase, nunca recomendar competidores, EN espeja a ES.

---

## 2026-10-05 — Corrida 1 (línea de base)

### Métricas generales (GSC, datos hasta ~2026-10-04)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| 90 días (07-07 → 10-05) | 6 | 183 | 3,3 % | 29,5 |
| Últimos 28 días (09-07 → 10-05) | 4 | ~85 | ~4,7 % | ~7 |

- La primera impresión es del 2026-08-13. El sitio tiene menos de 2 meses en el índice.
- Desde el 2026-09-22 (pivot a EdTech y redirects de los sectores retirados) la posición media pasó de 30–80 a 3–12: Google ya posiciona el sitio por el tema correcto, pero con volumen mínimo.
- Solo 16 queries visibles; el resto está anonimizado. Casi todas las visibles son de páginas retiradas (inmobiliarias, clínicas AR), que ya redirigen con 301.
- Países: USA desktop (48 imp, pos 31), Arabia Saudita (15, todas de la página AR retirada), Argentina (18 imp, 5 de los 6 clics), España, México, Colombia.
- Páginas con impresiones en posiciones buenas y 0 clics (28 d): `/soluciones/edtech-y-plataformas-educativas/busqueda-semantica/` (10 imp, pos 3,4), `/casos/academia-sied/` (8, pos 8,9), `/blog/` (7, pos 3), `/en/solutions/edtech-and-learning-platforms/assessment-generation/` (7, pos 8,1), `/plataformas-educativas/` (5, pos 4,6), `/plataformas-educativas/migracion/` (4, pos 7,2).
- Query con más impresiones: "cuánto cuesta automatizar procesos" → `/blog/cuanto-cuesta-automatizar-un-proceso-con-ia/` (15 imp, pos 45,5; último rastreo 2026-08-17).

### Indexación

- Sitemap `https://vantalogics.com/sitemap.xml`: 46 URLs, 0 errores, último download 2026-10-01.
- URL Inspection sobre 20 URLs clave: todas "Submitted and indexed" salvo `/en/privacy/` ("URL is unknown to Google", publicada el 2026-10-04). Rich results detectados: solo Breadcrumbs (FAQPage ya no da rich result a sitios no gubernamentales/salud; el schema queda para motores de IA).

### Auditoría técnica (crawl del sitio en producción)

- 46/46 URLs del sitemap con 200, canonical self, `index, follow`, hreflang es/en/x-default correcto. Árabe en noindex y fuera del sitemap.
- robots.txt permite GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended. llms.txt generado en build y al día con plataformas, casos, soluciones y notas.
- Blog y plataformas: BlogPosting/Service + FAQPage + Speakable + `answer` como respuesta directa en las primeras líneas. Bien.
- Problemas encontrados:
  1. **Bing / motores de IA**: una búsqueda de "vantalogics" en un buscador que no es Google no devuelve el sitio. No había IndexNow ni señal a Bing (ChatGPT search y Copilot dependen de ese índice).
  2. **Organization**: `audienceType` tenía el eyebrow de la marca en vez de la audiencia real; sin `knowsAbout`; `logo` como string. Los casos declaraban un `Organization` creador sin `@id`, desconectado de la entidad.
  3. **Casos**: title genérico "Cliente — Caso de producto" y meta description de 80–107 caracteres sin datos. Son páginas que ya aparecen en posiciones 1–9 sin clics.
  4. Dos notas solo en ES (`agente-de-ia-para-whatsapp-que-carga-pedidos`, `n8n-make-o-agente-a-medida`) sin gemelo EN. No se tocan hoy: no tienen impresiones y son temas fuera del foco EdTech.
  5. **Conflicto con una regla del negocio**: `/blog/cuanto-cuesta-automatizar-un-proceso-con-ia/` (y su EN) publica rangos en USD. Es la página con más impresiones visibles. No se toca sin decisión del dueño (ver Pendientes).

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 1 | Todo el sitio | IndexNow: clave `public/cac0d560eacf83ba4cdfa6a63b810e9d.txt`, `scripts/indexnow.mjs` (envía todas las `<loc>` de `dist/sitemap.xml`) y un paso al final del deploy en CI (`continue-on-error`). | La marca no aparece en un buscador no-Google; no había ninguna señal a Bing. | En 1–3 semanas Bing indexa las 46 URLs y la marca aparece en Bing/ChatGPT search. | `site:vantalogics.com` en Bing; búsqueda de "vantalogics" vía web search; respuesta 200/202 del paso IndexNow en Actions. | 2026-10-19 |
| 2 | `/` y `/en/` | Organization: `@type` `["Organization","ProfessionalService"]`, `logo` como ImageObject, `audienceType` real (academias online, instituciones, empresas de educación), `knowsAbout` con los temas del sitio. | Entidad débil y con un dato erróneo; el sitio depende de ser reconocido como entidad para que lo citen. | Entidad más clara para Google (Knowledge Graph) y para LLMs; sin efecto visible en GSC a corto plazo. | Validación en Rich Results Test / schema.org validator; aparición de un panel o descripción de marca en búsquedas de "vantalogics". | 2026-10-19 |
| 3 | `/casos/*` y `/en/cases/*` (8 URLs) | Title `Cliente: qué es | Vantalogics` (p. ej. "Academia SIED: plataforma de educación médica continua | Vantalogics"); meta = resultado + estudiantes + qué construimos; `creator` enlazado a `#organization`. Nuevo campo `kind` en `src/data/cases.ts`. | 28 d: SIED 8 imp pos 8,9, Dr. La Rosa 4 imp pos 3,2, Apoyo Escolar RV 2 imp pos 1, Lu Apuntes 2 imp pos 5, todas con 0 clics. | Más CTR en búsquedas de marca de cliente y relevancia temática ("plataforma educativa", "academia online") para empujar al hub. | CTR e impresiones por URL de `/casos/` (28 d vs línea de base de arriba). | 2026-10-19 |

### Envíos
- Sitemap reenviado a GSC después del deploy.
- IndexNow enviado con las 46 URLs (desde CI).

### Pendientes / hipótesis para próximas corridas
- **Decisión del dueño**: la nota de costos de automatización publica rangos en USD, y la regla del 2026-09-23 es no publicar precios. Opciones: (a) dejarla como referencia de mercado, (b) sacar los números y orientarla a "qué mueve el costo". Hasta que haya decisión no se toca.
- Mirar la query "cuánto cuesta automatizar procesos" (pos 45). Si la nota se queda, conviene un refresh real (fecha `updated` + contenido) para que Google la vuelva a rastrear (último rastreo 2026-08-17).
- `/soluciones/` (índice) y `/soluciones/edtech-y-plataformas-educativas/` cubren casi lo mismo desde que el índice tiene una sola solución. Riesgo de canibalización: revisar cuando haya queries visibles para las dos.
- Traducir al EN las dos notas que solo están en ES si empiezan a recibir impresiones o si el dueño lo prioriza (regla EN = ES).
- Con más volumen, buscar queries en posición 4–20 para el hub `/plataformas-educativas/` y la guía de migración. Hoy no hay ninguna query visible para esas URLs.
- Autor/Person: las notas no tienen autor con nombre. Para E-E-A-T conviene un autor real con perfil (falta confirmar con el dueño quién firma y qué perfiles públicos usar).

---

## 2026-10-06 — Corrida 2

La MCP de GSC no conectó (timeout). Los datos salieron directo de la API de Search Console con la misma cuenta de servicio (`/root/.config/mcp-gsc/service_account.json`), así que no se perdió señal.

### Métricas generales (GSC, datos hasta 2026-10-04)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 7 d (09-29 → 10-05) | 0 | 22 | 0 % | 15,0 |
| 7 d anteriores (09-22 → 09-28) | 2 | 29 | 6,9 % | 7,8 |
| Últimos 28 d (09-08 → 10-05) | 4 | 77 | 5,2 % | 15,1 |
| 28 d anteriores (08-11 → 09-07) | 2 | 106 | 1,9 % | 39,9 |

- Volumen todavía mínimo: de 2 a 13 impresiones por día. Las variaciones semana a semana son ruido; la tendencia de 28 d sigue siendo buena (posición 39,9 → 15,1).
- Solo 5 queries visibles en 28 d. Dos son de la página inmobiliaria retirada (pos 81–95, ya redirige con 301) y una es "luapuntes" → `/en/cases/lu-apuntes/` (pos 8).
- Por página (28 d): `/en/` 22 imp, pos 5,1, 2 clics; `/` 8 imp, pos 3,2, 2 clics. El cluster de plataformas sigue en primera página sin clics: `/plataformas-educativas/` 5 imp, pos 4,6; `/plataformas-educativas/migracion/` 4 imp, pos 7,2; `/en/education-platforms/` 2 imp, pos 3,5.
- `/soluciones/real-estate-developers/` y `/soluciones/clinicas-y-consultorios/` siguen sumando impresiones, pero URL Inspection ya las da como "Page with redirect" → `/soluciones/`. Se van a ir solas.
- Países: USA 24 imp (pos 27), Argentina 8 (3 clics), Colombia 8, México 5 (pos 3,2), España 5.

### Indexación

- Sitemap: 46 URLs, 0 errores, último download 2026-10-05 12:33 (después del deploy de ayer). La API devuelve `indexed: 0`, que es un campo que Google ya no completa; no es un error.
- URL Inspection: `/en/privacy/` pasó de "unknown" a "Submitted and indexed" (rastreada el 2026-10-06). Home, `/en/`, hub de plataformas, EN de plataformas, caso SIED y las dos notas solo-ES están indexadas. Los casos todavía no se volvieron a rastrear desde el cambio de títulos (SIED: último rastreo 2026-09-16).

### Evaluación de cambios anteriores

- Los cambios 1–3 de la corrida 1 tienen 1 día. No hay nada que evaluar todavía: la revisión sigue en 2026-10-19.
- IndexNow: el archivo de la clave responde 200. No se pudo leer el log del paso en Actions (timeout de la API de logs). Se envió de nuevo a mano después del deploy de hoy (ver Envíos).
- Bing / motores de IA: "vantalogics" en un buscador no-Google sigue sin devolver el sitio (devuelve Vantage Logistics, Virage Logic, etc.). Era esperable con IndexNow de 1 día.

### Auditoría técnica (crawl de producción)

- 46/46 URLs con 200, canonical self, un solo H1, JSON-LD válido en todas, 0 links internos rotos ni redirigidos (55 destinos chequeados).
- Detalles menores, sin cambios: algunas descriptions pasan 160 caracteres (casos, 230–307) y unas pocas imágenes sin `alt` (2 en home, 2 en hubs de plataformas, 1 en casos con logo). No se tocan los casos hasta el 2026-10-19 para no pisar el cambio de títulos.

### GEO / SERP

- "desarrollo de plataformas educativas a medida": citados appmaster, cleveroad, dataart, innowise y PDFs académicos. Contenido genérico de agencias grandes, ninguno con casos reales en LatAm. Nosotros no aparecemos (el buscador usado no es Google).
- "cómo proteger los videos de mis cursos online para que no los descarguen": la SERP la dominan vendedores de DRM (vdocipher con 6 de 9 resultados, SendPulse, HeroSpark, Red Points). Nadie publica datos de una academia real ni dice qué no funciona. Es un hueco que podemos cubrir con evidencia propia.
- "migrar academia online de Hotmart a plataforma propia": resultados débiles (Workana, Capterra, comparadores). La guía de migración ya cubre la intención; hay que esperar indexación y autoridad.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 4 | `/plataformas-educativas/proteccion-de-contenido/` + `/en/education-platforms/content-protection/` (nuevas) | Página del cluster de plataformas: respuesta directa arriba, tabla "qué frena / qué no / costo para el alumno", tres pruebas de auditoría con ventana de incógnito, video con enlaces que vencen, sesión única vs reproducción simultánea, PDFs con marca personal, por qué no marca en el video, cuándo DRM, qué no hacer. 6 FAQ. Todos los datos salen del repo de Apoyo Escolar RV (`docs/proteccion-contenido.md`, commits de ago–sep 2026) y del caso Lu Apuntes: TTL del enlace de 6 h a 30 min; 6 de cada 10 errores de carga eran enlaces vencidos; 1.248 alertas en 60 días con 7 + 21 falsos positivos; 23 de 2.239 PDFs cifrados; la marca en el video duró un día. Sin precios, sin LearnBase, sin recomendar competidores. | El hub ya rankea en pos 4,6 y toca el tema en un párrafo y una FAQ. La SERP del tema la dominan vendedores de DRM sin datos de casos reales. Es la objeción típica de una academia antes de dejar Hotmart/Tiendup. No hay dato de GSC propio (no tenemos página), así que es una hipótesis basada en la SERP. | Indexación en 1–2 semanas; impresiones para queries de protección de cursos, compartir cuenta y marca de agua en PDF; cita en motores de IA por los datos concretos. | Estado en URL Inspection; impresiones y queries de las 2 URLs nuevas; búsqueda con web search de "cómo proteger los videos de un curso online" y "evitar que compartan la cuenta curso online". | 2026-10-20 |
| 5 | `/plataformas-educativas/` y `/en/education-platforms/` | Una oración con link contextual al final de la sección "Protección de contenido" hacia la página nueva. Sin cambio de `updated` (no cambia el contenido del hub). | Darle a la página nueva el link interno más fuerte del cluster desde la página que ya rankea en primera página. | La página nueva se descubre y rastrea rápido; el hub queda como pilar del subtema. | Rastreo de la página nueva; posición del hub sin cambios (no debería moverse). | 2026-10-20 |

### Envíos
- Deploy por push a `main`.
- Sitemap reenviado a GSC y URL Inspection de las URLs nuevas.
- IndexNow a mano: `200 for 48 URLs` (confirma que la clave y el endpoint funcionan).
- Sitemap reenviado (48 URLs). URL Inspection de las dos URLs nuevas: "URL is unknown to Google" a minutos del deploy, como era de esperar. La API no permite pedir indexación de páginas comunes: queda en manos del sitemap y del link desde el hub.
- Validación con la MCP de GSC (mismo servidor, levantado a mano por stdio porque la sesión no la reconectó): Google bajó el sitemap a las 12:39, media hora después del deploy, con 48 URLs válidas y 0 errores. Las dos páginas nuevas pasaron a "Discovered - currently not indexed": ya están en la cola de rastreo. Hub ES/EN, home, `/en/` y caso SIED siguen indexados con Breadcrumbs válidos. Las métricas de 28 d coinciden con las de la API (4 clics, 77 impresiones, posición 15,1).
- El timeout de la MCP al iniciar la sesión era `uvx` resolviendo el paquete. Con el caché caliente arranca en ~3 s.

### Pendientes / hipótesis para próximas corridas
- Siguen abiertos los pendientes de la corrida 1: decisión del dueño sobre la nota de costos con rangos en USD, autor con nombre para E-E-A-T y las dos notas solo en ES.
- **Las dos notas solo-ES** (`agente-de-ia-para-whatsapp-que-carga-pedidos`, `n8n-make-o-agente-a-medida`) están indexadas y sin impresiones en 28 d. Son temas fuera del foco EdTech y violan la regla EN = ES. Opciones a decidir con el dueño: traducirlas o despublicarlas con 301 a `/blog/`. No se tocan sin esa decisión.
- Próximos huecos del cluster de plataformas con evidencia propia: cobro y acceso (Mercado Pago, transferencias vía Talo y acceso por permisos, en el repo de `luapuntes`) y certificados/evaluaciones. Solo hacerlos si la página de protección indexa y muestra impresiones.
- 2026-10-19: revisar CTR de casos, entidad y Bing (`site:vantalogics.com`).

---

## 2026-10-07 — Corrida 3

### Métricas generales (GSC, datos hasta 2026-10-05)

| Ventana | Clics | Impresiones | Posición |
|---|---|---|---|
| Últimos 28 d (09-10 → 10-07) por página | 3 | ~85 | — |
| Días 10-01 → 10-05 | 0 | 13 | 1,7–11,6 por día |

- Sin datos nuevos relevantes respecto de ayer: el último día con datos es el 10-05 y el 10-06 sale en 0. Volumen de 0 a 6 impresiones por día.
- Por página (28 d vs 28 d anteriores): `/en/` 20 imp, pos 11,6 → 5,2, 2 clics. `/` 7 imp, pos 3,6, 1 clic. El blog sigue en primera página sin clics: `/blog/` 6 imp, pos 3,3; `/en/blog/` 4 imp, pos 4,8. `/soluciones/.../busqueda-semantica/` 10 imp, pos 3,4, 0 clics.
- Las notas de automatización genérica (`por-que-fallan-los-agentes...`, `cuanto-cuesta-automatizar...`) pasaron de 15–16 imp a 0: Google ya no las muestra para esas queries desde el pivot. Las notas EdTech empiezan a sumar (RAG educativo 4 imp, pos 7,2; tutor o búsqueda 4 imp, pos 7,2; tutor por alumno 2 imp, pos 6,5).
- Query nueva: "how much does it cost to add ai tutoring to our university?" → `/en/blog/how-much-does-an-ai-tutor-cost-per-student/` (1 imp, pos 10). Una sola impresión: se anota, no se actúa.

### Indexación

- **Las dos páginas de protección de contenido ya están indexadas** ("Submitted and indexed"; ES rastreada el 10-07, EN el 10-06). Pasaron de "Discovered" a indexadas en ~1 día.
- `/casos/academia-dr-la-rosa/` se volvió a rastrear el 10-07 (ya con el título nuevo). SIED sigue con último rastreo del 09-16.
- Sitemap: 48 URLs, 0 errores. Reenviado hoy a las 12:03.

### Evaluación de cambios anteriores

- Cambios 1–5 con 1–2 días: sin evaluación todavía (revisiones 10-19 y 10-20).
- IndexNow en CI confirmado: el paso del deploy de hoy devolvió `IndexNow: 200 for 48 URLs`.
- Bing / motores de IA: "vantalogics plataformas educativas" en un buscador no-Google sigue sin devolver el sitio. "Cómo proteger los videos de mis cursos online" sigue dominada por vdocipher (6 de 9), SendPulse y Red Points; nuestra página todavía no aparece (tiene 1 día).

### Auditoría técnica

- Producción: home, `/en/`, blog ES/EN, casos y hub con 200, JSON-LD válido.
- **El logo de Apoyo Escolar RV era un SVG de 609 KB** (un PNG de 4096×1411 embebido en base64) que se cargaba en home, `/en/`, hubs de plataformas y páginas que listan casos. Tres de los cuatro logos de clientes venían de dominios externos, y dos de `cdn.uselearnbase.com`, lo que dejaba el nombre de LearnBase en el HTML de cada página con casos (regla: no mencionar LearnBase).
- Las `img` sin `alt` que marcó la corrida 2 son logos decorativos con el nombre del cliente al lado (`alt=""`): es lo correcto, no se cambian.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 6 | Home, `/en/`, hubs de plataformas, casos, protección de contenido | Logos de clientes servidos desde `/clients/` en el propio dominio. Apoyo Escolar RV pasa de SVG de 609 KB a WebP de 610×210 de 27 KB. Ningún HTML del sitio referencia ya `uselearnbase`. | 609 KB de imagen en la home y en el hub que rankea en pos 4,6; dependencia de 3 hosts externos; nombre de LearnBase visible para crawlers y LLMs. | Menos peso y menos conexiones externas en las páginas clave; sin efecto directo en ranking a corto plazo, pero mejor LCP/peso en mobile. | Peso de la home; Core Web Vitals en GSC cuando haya datos de CrUX (hoy no hay volumen). | 2026-10-21 |
| 7 | `/blog/` y `/en/blog/` | Title "Notas — Vantalogics" → "Notas sobre IA en educación y agentes en producción — Vantalogics" (EN: "Notes on AI in education and agents in production — Vantalogics"). Meta con los cuatro temas reales (costo de tutor por alumno, evaluar antes de abrir, RAG sobre un curso, agentes en producción). H1 "Lo que aprendimos poniendo IA en productos educativos" e intro alineada al foco EdTech. Afecta también la descripción del RSS y el schema `Blog`. | `/blog/` 6 imp pos 3,3 y `/en/blog/` 4 imp pos 4,8, 0 clics en 28 d. El title no decía nada del contenido y la meta hablaba de "automatización con IA", que es el foco anterior al pivot (las notas de ese tema ya no reciben impresiones). | Más CTR del índice del blog cuando aparece en primera página y señal temática coherente con la entidad (IA para educación). | CTR e impresiones de `/blog/` y `/en/blog/` (28 d). | 2026-10-21 |

### Envíos
- Deploy por push a `main` (run 37618241954, ok). IndexNow desde CI: 200 para 48 URLs.
- Sitemap reenviado a GSC.

### Pendientes / hipótesis para próximas corridas
- Siguen abiertos: decisión del dueño sobre la nota de costos con rangos en USD, autor con nombre para E-E-A-T y las dos notas solo en ES. Dato nuevo para esa decisión: la nota de costos de automatización bajó de 15 imp (pos 45) a 0 en los últimos 28 d, igual que "por qué fallan los agentes"; el sitio ya no rankea para automatización genérica.
- `/soluciones/edtech-y-plataformas-educativas/busqueda-semantica/`: 10 imp, pos 3,4, 0 clics, pero las queries están anonimizadas. Con 10 impresiones, 0 clics en pos 3 no es concluyente. Si llega a ~30 imp sin clics, reescribir title/meta.
- Página de protección de contenido indexada: mirar impresiones y queries desde el 10-10. Si aparecen, encarar el siguiente hueco del cluster (cobro y acceso).
- No tocar casos (10-19), hub y protección (10-20) ni blog index (10-21) antes de su revisión.

---

## 2026-10-08 — Corrida 4

### Métricas generales (GSC, datos hasta 2026-10-06)

| Ventana | Clics | Impresiones | Posición |
|---|---|---|---|
| Últimos 28 d (09-10 → 10-08) por página | 4 | ~150 sumadas por URL | — |
| Día 10-06 | 1 | 3 | 7,0 |

- Volumen sigue en 0–6 impresiones por día. Entró el clic del 10-06 (`/en/`, que ya suma 3 clics en 28 d, pos 5,1).
- Solo 5 queries visibles. La única que crece es **"how much does it cost to add ai tutoring to our university?"** → `/en/blog/how-much-does-an-ai-tutor-cost-per-student/`: pasó de 1 a 3 imp (2 de ellas el 10-06), pos 9,7. Es una pregunta conversacional típica de un decisor de una institución.
- Países (28 d): USA desktop 24 imp pos 27,5; Colombia 7 (pos 5,3); Argentina 7 (2 clics); México 5 (pos 3,8); Brasil 4.
- `/ar/*` sigue sumando alguna impresión suelta (`/ar/`, `/ar/blog/...`): responde con `noindex, follow` y `/ar/solutions/ecommerce/` hace 301. Se van a caer solas; no hay nada que hacer.

### Indexación
- Protección de contenido ES/EN, blog ES/EN, hub de plataformas y las dos notas de costo de tutor: "Submitted and indexed", Breadcrumbs válidos.
- `/blog/` y `/en/blog/` no se volvieron a rastrear desde el cambio de title de ayer (último rastreo 10-03).
- SIED sigue con último rastreo 09-16.

### Evaluación de cambios anteriores
- Cambios 1–7 tienen entre 1 y 3 días: sin evaluación (revisiones 10-19, 10-20 y 10-21).
- IndexNow desde CI: `200 for 48 URLs` en el deploy de hoy.
- Bing / motores de IA: "vantalogics" en un buscador no-Google sigue sin devolver el sitio (Vantage Logistics, Vanteon, Virage Logic).

### GEO / SERP
- "how much does it cost to add AI tutoring to a university per student": la respuesta la arman ibl.ai (vendedor de plataforma self-hosted, con supuestos de 1.000 tokens de entrada + 1.500 de salida por sesión y Sonnet 4.6), openeducat (calculadora de ROI) y liveinthefuture. Todos dan una cifra. Nuestra nota no tenía ningún número, solo el método: por eso no compite para la intención "cuánto cuesta" ni es citable.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 8 | `/blog/cuanto-cuesta-un-tutor-de-ia-por-alumno/` + `/en/blog/how-much-does-an-ai-tutor-cost-per-student/` | Nueva sección "Un ejemplo con números" con tabla de 4 arquitecturas (unidad entera + historial completo con modelo grande → recuperación acotada + historial resumido → ruteo 80/20 → todo en modelo chico): costo por mensaje, por alumno activo al mes y para 3.000 alumnos activos (US$ 9.984 → US$ 79 al mes; 126 veces de diferencia). Supuestos explícitos (40 mensajes/alumno/mes, tokens por mensaje) y precios públicos de la API de Anthropic verificados en claude.com/pricing el 2026-10-08 (Haiku 5.5 US$ 0,10/0,50; Sonnet 5.5 US$ 2/10 por MTok). Aclaración de que es costo de modelo, no de proyecto. `answer` con la cifra de referencia; FAQ nueva "¿Cuánto cuesta sumar un tutor de IA a una universidad?"; title "¿Cuánto cuesta un tutor de IA por alumno? Ejemplo con números"; meta con el rango; `updated: 2026-10-08`. Sin precios de Vantalogics. | Query "how much does it cost to add ai tutoring to our university?" 3 imp pos 9,7, creciendo; la página 5 imp pos 8,8 y 0 clics en 28 d. La SERP la ganan páginas con cifras y la nuestra no tenía ninguna. | La página pasa de pos ~10 a primera mitad de la página 1 para queries de costo de tutor IA (EN/ES) y empieza a ser citada por motores de IA por la tabla. | Posición e impresiones de las 2 URLs y de queries con "cost"/"cuesta" + "tutor"; CTR; aparición en web search para "AI tutor cost per student". | 2026-10-22 |

La versión árabe de la nota (`/ar/blog/...`) no se tocó: está en noindex.

### Envíos
- Deploy por push a `main` (run 37774307053, ok). IndexNow desde CI: 200 para 48 URLs.
- Sitemap reenviado a GSC (12:05).
- Verificado en producción: title nuevo y tabla en ES y EN, `dateModified` y `lastmod` 2026-10-08.

### Pendientes / hipótesis para próximas corridas
- Siguen abiertos: decisión del dueño sobre la nota de costos de automatización con rangos en USD, autor con nombre para E-E-A-T y las dos notas solo en ES.
- **Links internos hacia la nota de costo**: las páginas de solución (`/soluciones/edtech-y-plataformas-educativas/tutor-de-ia/`, 4 imp pos 9) no enlazan a ninguna nota del blog; `UseCasePage.astro` solo lista otros casos de uso. Sumar un bloque de "notas relacionadas" por caso de uso (campo nuevo en `src/data/use-cases.ts`) es el próximo cambio de enlazado si la nota de costo empieza a subir.
- Revisar cada 2–3 meses los precios de modelos citados en la nota de costo: si cambian, actualizar la tabla y `updated`.
- Protección de contenido indexada: mirar queries desde el 10-10.
- No tocar casos (10-19), hub y protección (10-20), blog index (10-21) ni la nota de costo de tutor (10-22) antes de su revisión.

---

## 2026-10-09 — Corrida 5

### Métricas generales (GSC, datos hasta 2026-10-08)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-11 → 10-09) | 4 | 82 | 4,9 % | 14,7 |
| 10-01 → 10-08 | 1 | 20 | 5 % | — |

- Volumen igual que ayer: de 1 a 3 impresiones por día. Entraron el 10-07 (3 imp, pos 2,3) y el 10-08 (1 imp, pos 10).
- Queries visibles en 28 d: las mismas 5. "how much does it cost to add ai tutoring to our university?" sigue en 3 imp, pos 9,7 (sin datos nuevos desde el cambio #8).
- **Primera impresión de la página de protección de contenido**: `/en/education-platforms/content-protection/` 1 imp, pos 10, entre el 10-01 y el 10-08. La ES todavía no tiene impresiones.
- 7 d vs 7 d anteriores por página: sin movimientos fuera del ruido (ninguna URL pasa de 4 impresiones por semana).
- Países (28 d): USA desktop 27 imp pos 24,7; Colombia 7 (pos 5,3); Argentina 7 (2 clics); México 5 (pos 3,8); Brasil 4.

### Indexación
- Protección de contenido ES (rastreada 10-07) y EN (10-06), hub y migración (09-30), nota de costo de tutor EN (10-06), Dr. La Rosa (10-07): "Submitted and indexed", Breadcrumbs válidos.
- SIED sigue con último rastreo 09-16 (todavía sin el título nuevo).
- `/en/solutions/accounting-firms/` figura "Submitted and indexed" con último rastreo 08-19, pero en producción responde 301 a `/en/solutions/`. Google todavía no lo volvió a rastrear; no hay nada que corregir. `/ar/solutions/ecommerce/` ya figura como excluida por noindex.

### Evaluación de cambios anteriores
- Cambios 1–8 tienen entre 1 y 4 días: sin evaluación (revisiones 10-19 a 10-22).
- **Bing (cambio #1)**: primera señal positiva. Una búsqueda `site:vantalogics.com` en DuckDuckGo (usa el índice de Bing) devolvió URLs del sitio: `/`, `/en/`, `/en/blog/`, `/en/solutions/`, la solución EdTech EN, `ai-tutor` y `assessment-generation` en EN, el caso Apoyo Escolar RV y una URL vieja de real estate (ya con 301). La búsqueda de marca "vantalogics" en web search todavía no devuelve el sitio.

### Error de proceso de esta corrida
- Arranqué con la copia local atrasada 4 commits (sin las corridas del 10-07 y del 10-08) y llegué a rehacer el cambio #8 en la nota de costo de tutor. Lo detecté al ir a pushear, descarté esos cambios y la nota queda como la dejó la corrida 4. **Antes de leer el log: `git fetch` y `git merge --ff-only origin/main`.**

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 9 | `/soluciones/edtech-y-plataformas-educativas/tutor-de-ia/`, `/busqueda-semantica/` y sus EN (`ai-tutor`, `semantic-search`); AR también, pero en noindex | Bloque "Seguí por acá" / "Keep reading" en `UseCasePage.astro` con las notas relacionadas de cada caso de uso (campo nuevo `reading` en `src/data/use-cases.ts`, con los slugs ES; el idioma se resuelve por `translationOf`). Tutor de IA → costo por alumno, evaluar antes de abrir, por qué falla el RAG. Búsqueda semántica → tutor o búsqueda, por qué falla el RAG. Corrección asistida y generación de evaluaciones quedan sin bloque: no hay notas que les correspondan. | Pendiente que dejó la corrida 4. Las páginas de caso de uso no enlazaban a ninguna nota: búsqueda semántica tiene 10 imp en pos 3,4 y tutor de IA 4 imp en pos 9, y la nota de costo actualizada el 10-08 (query de universidad en pos 9,7) solo recibía links desde el hub de plataformas y el blog. | Las notas se rastrean y se reevalúan antes, y Google y los LLMs ven el cluster tutor → costo → evaluación → RAG como una unidad temática. Se mezcla con el cambio #8 en la nota de costo: con 3 impresiones por semana no se puede separar el efecto de cada uno, y no vale la pena esperar para eso. | Último rastreo de las 5 notas enlazadas; impresiones y posición de la nota de costo y de las notas de evaluación y RAG; clics internos si alguna vez hay analytics. | 2026-10-22 |

### Cambio pedido por el dueño durante la corrida: fuera todos los precios

El dueño pidió sacar los precios ("SÁCALE ESOS PRECIOS"). Se resuelve así el pendiente abierto desde la corrida 1 y se revierte la parte en dólares del cambio #8.

| # | URL | Qué cambió | Por qué | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 10 | `/blog/cuanto-cuesta-un-tutor-de-ia-por-alumno/` + EN | Se sacaron todos los montos en dólares y los precios de la API de Anthropic. La tabla del ejemplo queda con los mismos supuestos en tokens y una columna de **costo relativo por alumno** (126×, 20×, 4,8×, 1×); el modelo grande se describe como "token unas 20 veces más caro que el chico". `answer`, FAQ de universidad, title ("Cómo calcularlo") y meta sin cifras de moneda. `updated: 2026-10-09`. | Decisión del dueño: el sitio no publica precios, tampoco de terceros ni estimaciones en dólares. | La nota pierde la cifra puntual que buscaba la query de universidad, pero conserva el método, los supuestos y la proporción de 126 veces, que también es citable. | Posición e impresiones de "how much does it cost to add ai tutoring to our university?" y de queries de costo de tutor. | 2026-10-22 |
| 11 | `/blog/cuanto-cuesta-automatizar-un-proceso-con-ia/` + EN + AR (noindex) | Fuera todos los rangos en USD (inversión, operación mensual, costo hora, ejemplo de repago). La tabla de tres cajones pasa a "qué es / qué define el costo / operación mensual" en términos cualitativos; el ejemplo de repago queda en horas (22 h/semana, 70 % automatizable ≈ 800 h/año). Se mantienen los porcentajes (30–50 % más barato con API y sandbox, 20–40 % de horas extra por guardrails, 15–25 % anual de mantenimiento, 60–80 % de casos resueltos, repago a 18 meses). Title "qué mueve el costo". `updated: 2026-10-09`. | Pendiente de la corrida 1 resuelto por el dueño. La nota ya no tenía impresiones (bajó de 15 imp en pos 45 a 0 desde el pivot), así que el riesgo de perder tráfico es nulo. | Sin efecto medible en tráfico; elimina el conflicto con la regla de no publicar precios. | Impresiones de la nota (esperado: siguen en ~0). | 2026-10-23 |
| 12 | `/blog/n8n-make-o-agente-a-medida/` | Fuera "USD 500 al mes" y "USD 20–500/mes" de Make/Zapier; queda "crece con cada operación". | Misma decisión. | Ninguna sobre tráfico. | — | — |

Queda una sola mención de montos en todo el sitio: la comparativa de comisiones de Hotmart en el pilar `/plataformas-educativas/` y su EN (9,9 % + USD 0,50 por venta; ejemplo de USD 12.480 por año). La memoria del proyecto dice que comparar lo que cobra la competencia está permitido, y el pilar está bloqueado hasta su revisión del 10-20, así que no se tocó. **Confirmar con el dueño si eso también sale.**

### Envíos
- Dos deploys por push a `main` (runs 37940474824 y el de `d0bfce7`, ambos ok). IndexNow desde CI: `200 for 48 URLs`.
- Verificado en producción: 0 montos en las notas de tutor, automatización (ES/EN) y n8n; bloque de notas relacionadas visible en el caso de uso tutor de IA.
- Sitemap reenviado a GSC (14:00).

### Cambio pedido por el dueño: fuera las notas de automatización genérica

El dueño mostró cómo describe a Vantalogics una herramienta de investigación de empresas: "AI automation agency building production-ready chatbots… WhatsApp and CRMs… transparent execution logs", con keywords ai automation, chatbot development, whatsapp bot, crm integration, erp automation, document processing. Ese texto coincide con la portada EN anterior al 2026-09-16 (commit `ed3f8c7`): la herramienta usa una foto vieja del sitio. El sitio en vivo estaba bien (title, meta, Organization, `knowsAbout` y llms.txt dicen IA para educación), pero seguían publicadas 4 notas sin una sola mención de educación y con ~30 menciones de WhatsApp, ERP y CRM. El dueño eligió despublicarlas con 301.

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 13 | `/blog/agente-de-ia-para-whatsapp-que-carga-pedidos/`, `/blog/n8n-make-o-agente-a-medida/` | Borradas. 301 a `/blog/`. | Solo en ES (violaban EN = ES), 0 impresiones en 28 d, temas del posicionamiento anterior. | Menos señales de "agencia de chatbots" para crawlers y LLMs. | Que Google y Bing pasen las URLs a "Page with redirect". | 2026-10-23 |
| 14 | `/blog/cuanto-cuesta-automatizar-un-proceso-con-ia/` + EN + AR | Borradas (anula los cambios #11). 301 a la nota de costo de tutor de IA en cada idioma. | 0 impresiones desde el pivot (antes 15 en pos 45); fuente de "erp automation" y "document processing". | Lo poco que quede de señal pasa a la nota de costo EdTech. | Ídem; impresiones de la nota de tutor. | 2026-10-23 |
| 15 | `/blog/por-que-fallan-los-agentes-de-ia-en-produccion/` + EN + AR | Borradas. 301 a la nota de evals en cada idioma (mismo cluster de confiabilidad). | 0 impresiones en 28 d; ejemplos de pedidos, ERP y CRM. | Ídem. | Ídem. | 2026-10-23 |
| 16 | `/blog/`, `/en/blog/`, `/ar/blog/`, páginas de solución, llms.txt | Title y meta del índice del blog sin "agentes en producción" (la nota ya no existe): "Notas sobre IA en educación: costos, evaluación y RAG". AR: meta, título e intro del índice sin "proyectos de automatización". Etiqueta de solución "Qué automatizamos primero" → "Qué construimos primero" (ES/EN/AR). llms.txt: "qué se construye primero". | El índice del blog citaba una nota borrada; los textos de "automatizar" refuerzan el posicionamiento viejo. Se toca el índice del blog antes de su revisión del 10-21 porque nombraba contenido que ya no existe. | Entidad coherente en todas las páginas. | CTR de `/blog/` (se mezcla con el cambio #7). | 2026-10-21 |

El blog queda con 5 notas por idioma, todas de educación o evaluación, y ES = EN = AR. Sitemap: 42 URLs.

Envíos: deploy `2e76804` ok, IndexNow desde CI con las 42 URLs del sitemap. Además se mandaron a IndexNow una sola vez las 77 URLs que redirigen según `worker/index.ts` (sectores retirados, real estate y las notas de hoy): `200`, para que Bing pase de la copia vieja al 301. Sitemap reenviado a GSC (14:38).

Lo que no se puede arreglar desde el repo: herramientas que usan una foto vieja del sitio (Common Crawl, cachés propios) y perfiles externos (LinkedIn, Instagram, directorios) que todavía digan "automatización". Esos los tiene que revisar el dueño.

### Pendientes / hipótesis para próximas corridas
- Siguen abiertos: autor con nombre para E-E-A-T. Las dos notas solo en ES ya no existen (cambio #13).
- Protección de contenido: ya tiene su primera impresión (EN, pos 10). Mirar queries desde el 10-10 y, si aparecen, encarar el siguiente hueco del cluster (cobro y acceso).
- Bing: confirmar la marca en web search y `site:` el 10-19.
- No tocar casos (10-19), hub y protección (10-20), blog index (10-21), nota de costo de tutor y bloques de notas relacionadas (10-22) antes de su revisión.

---

## 2026-10-12 — Corrida 6

### Métricas generales (GSC, datos hasta 2026-10-11)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-14 → 10-11) | 5 | 89 | 5,6 % | 12,3 |
| 28 d anteriores (08-17 → 09-13, suma diaria) | 2 | ~88 | ~2,3 % | ~45 |
| Últimos 7 d (10-05 → 10-11) | 2 | 21 | 9,5 % | ~5,6 |
| 7 d anteriores (09-28 → 10-04) | 0 | 22 | 0 % | ~15 |

- Mismo volumen que hace 28 d, pero con posición 45 → 12,3 y el doble de clics: Google ya ubica al sitio en el tema correcto. Los dos clics de la semana son de marca (`/` pos 1 y `/en/` pos 2,5).
- Queries visibles en 28 d: 6. La única que crece es **"how much does it cost to add ai tutoring to our university?"** → nota de costo EN: 3 → 5 imp, pos 9,7 → 9,0. La nota EN suma 7 imp en 28 d, pos 8,6 (4 de ellas en los últimos 7 d).
- Protección de contenido: ES 1 imp en pos 1, EN 2 imp en pos 5,5 (los primeros 5 días indexada). Queries anonimizadas.
- `/en/solutions/` 8 imp pos 4,4 y `/soluciones/.../busqueda-semantica/` 8 imp pos 3,2, ambas sin clics; todavía lejos del umbral de ~30 imp para reescribir metadata.
- Países (28 d): USA desktop 26 imp pos 18,9; Argentina 11 imp (3 clics); Colombia 8; Brasil 4; México 4. Clics sueltos desde Países Bajos y Sudáfrica (marca).

### Indexación
- Sitemap: 42 URLs, 0 errores, último download 10-09 14:38. Reenviado hoy 12:06.
- URL Inspection (20 URLs): todas "Submitted and indexed". **Lo importante: Google no volvió a rastrear las páginas que cambiamos.** Nota de costo ES último rastreo 09-29 y EN 10-06, o sea que todavía indexa la versión anterior a los cambios #8 y #10; páginas de caso de uso tutor (09-26) y búsqueda semántica (09-22), sin el bloque de notas del cambio #9; blog index 10-03; SIED 09-16. La home es la URL con el rastreo más reciente (10-11).
- Las notas despublicadas el 10-09 (`cuanto-cuesta-automatizar...` último rastreo 08-17, `n8n-make...` 09-29) y `/en/blog/how-much-does-an-ai-agent-for-a-real-estate-developer-cost/` (08-18) siguen "indexed" porque Google no las volvió a pedir. Las tres responden 301 al destino correcto.

### Evaluación de cambios anteriores
- Cambios 1–16 tienen entre 3 y 7 días. Nada llega a su fecha de revisión (10-19 a 10-23).
- Cambio #8/#10 (nota de costo): la query de universidad sube de impresiones, pero Google todavía no rastreó la versión nueva, así que el aumento no se le puede atribuir.
- Bing / IA (#1): la búsqueda de marca "vantalogics" en web search sigue sin devolver el sitio (Racelogic, Vantage Logistics, Vanteon). IndexNow desde CI: `200 for 42 URLs` hoy.

### Auditoría técnica (crawl de producción)
- 42/42 URLs del sitemap con 200, canonical self, un H1, JSON-LD presente. robots.txt con los crawlers de IA permitidos, llms.txt al día. Redirects de las notas y sectores retirados con 301 al destino correcto.
- **Hueco de enlazado**: la home, que es la página que Google rastrea más seguido, no enlazaba a ninguna nota del blog ni a protección de contenido. Las notas solo se alcanzaban vía `/blog/` (sin rastrear desde el 10-03) y protección solo desde el hub (sin rastrear desde el 09-30).
- **Restos del posicionamiento anterior**: el saludo del agente de chat decía "Contame qué proceso te está comiendo el mes y vemos si tiene sentido automatizarlo" (ES/EN/AR). Se renderiza del lado del cliente, así que no lo ven los crawlers, pero sí cada visitante que abre el chat. Además quedan strings sin uso en el diccionario (`blog.ctaBody`, "qué conviene automatizar primero") que no se renderizan en ningún lado; no se tocaron.

### GEO / SERP
- "how much does it cost to add AI tutoring to a university": la siguen armando ibl.ai (3 notas de costo para universidades: per-seat vs usage, "cost math CFOs love"), quadc.io y liveinthefuture. Todas con montos. Nosotros no publicamos montos (decisión del dueño); la carta que nos queda es la proporción de 126× y el método.
- "cómo cobrar cursos online con Mercado Pago y dar acceso automático": la SERP es débil (ayuda de Tiendanube y páginas programáticas de openeducat). Hueco real para el cluster de plataformas, con evidencia propia (Lu Apuntes, Apoyo Escolar RV). El hub ya lo cubre en dos subsecciones, así que una página dedicada se decide después de la revisión del hub (10-20) para no canibalizarlo.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 17 | `/` y `/en/` (también `/ar/`, en noindex) | Sección "Notas para decidir antes de construir" antes del footer, con las 4 notas actualizadas más recientemente (costo de tutor, evaluar antes de abrir, tutor o búsqueda, RAG) y link a todas las notas. Reusa `PostCard` y los estilos de `.posts`. | La home es la URL con el rastreo más reciente (10-11) y no enlazaba a ninguna nota. La nota de costo tiene la única query que crece (5 imp, pos 9) y Google no la volvió a rastrear desde el 09-29 (ES) y el 10-06 (EN), antes de los cambios #8 y #10. | Google rastrea las notas en los próximos días (en particular la de costo con la versión nueva) y les pasa más autoridad interna. Se mezcla con el cambio #9; no hay volumen para separar los efectos. | Último rastreo de las 4 notas en URL Inspection (esperado: antes del 10-19); impresiones y posición de la nota de costo y de la query de universidad. | 2026-10-19 |
| 18 | Footer de todo el sitio (ES/EN) | Link "Proteger tus cursos" / "Protect your courses" a la página de protección de contenido, en la columna Estudio. AR no tiene páginas de plataformas. | La página tiene sus primeras impresiones (ES pos 1, EN pos 5,5) y solo la enlazaba el hub, que Google no rastrea desde el 09-30. | Más señal interna para la página nueva desde las 42 URLs. | Impresiones y queries de las 2 URLs de protección. | 2026-10-20 |
| 19 | Agente de chat (todas las páginas, ES/EN/AR) | Saludo nuevo: "Contame qué querés construir para tu plataforma o academia y vemos por dónde conviene empezar". | Era el último texto visible con el posicionamiento de automatización de procesos (ver corrida 5, cambio #16). | Coherencia de marca para quien abre el chat; sin efecto en buscadores (render del cliente). | — | — |

### Envíos
- Deploy por push a `main` (commit `592341f`, run 38246838758, ok). IndexNow desde CI: `200 for 42 URLs`.
- Verificado en producción: `id="notas"` en `/` y `/en/`, link a protección en el footer de una nota del blog.
- Sitemap reenviado a GSC (12:06).

### Pendientes / hipótesis para próximas corridas
- **10-19**: revisar casos (#3), entidad (#2), Bing (#1) y si Google rastreó las notas desde la home (#17). Si la nota de costo se rastreó, ver si la query de universidad sube de la pos 9.
- **10-20**: hub y protección (#4, #5, #18). Si la protección sigue sumando impresiones, decidir la página de cobro y acceso (Mercado Pago, PayPal, Talo, permisos) sabiendo que el hub ya cubre el tema en dos subsecciones: la página nueva tiene que ir más hondo (webhooks, pagos repetidos, transferencias que se acreditan solas) y el hub tiene que quedar como resumen con link.
- Para el dueño: Bing sigue sin devolver la marca. Conviene verificar el sitio en Bing Webmaster Tools (se puede importar desde GSC) para ver cobertura y errores; IndexNow solo no da visibilidad. También sumar a `sameAs` los perfiles reales que existan (LinkedIn de la empresa, perfil del fundador): hoy solo están GitHub e Instagram.
- Siguen abiertos: autor con nombre para E-E-A-T y la confirmación del dueño sobre los montos de comisión de Hotmart en el pilar.
- No tocar casos (10-19), hub y protección (10-20), blog index (10-21), nota de costo y bloques de notas relacionadas (10-22) antes de su revisión.

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |

---

## 2026-10-13 — Corrida 7

### Métricas generales (GSC, datos hasta 2026-10-12)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-15 → 10-12) | 5 | 90 | 5,6 % | 12,2 |
| Últimos 7 d (10-06 → 10-12) | 2 | 20 | 10 % | ~5,8 |
| 7 d anteriores (09-29 → 10-05) | 0 | 24 | 0 % | ~15 |

- Sin cambios fuera del ruido respecto de ayer: entró un solo día nuevo (10-12, 1 impresión en pos 6).
- Queries visibles en 28 d: las mismas 6. "how much does it cost to add ai tutoring to our university?" sigue en 5 imp, pos 9. Las impresiones de la semana en la nota de costo EN vienen de Rusia, Brasil y Alemania, todas desktop.
- Por página (7 d): `/en/` 5 imp pos 3,2 (1 clic), nota de costo EN 4 imp pos 8,8, `/en/blog/` 3 imp, `/en/solutions/` 3 imp pos 4,3, RAG EN 2 imp pos 3, protección EN 2 imp pos 5,5 y ES 1 imp pos 1.

### Indexación
- URL Inspection (20 URLs): todas "Submitted and indexed", Breadcrumbs válidos. **Google sigue sin volver a rastrear lo que cambiamos**: nota de costo ES 09-29 y EN 10-06, notas de evaluación, tutor o búsqueda y RAG 09-16, `/blog/` y `/en/blog/` 10-03, `/en/` 09-30, SIED 09-16, caso de uso tutor 09-26 y búsqueda semántica 09-22. La home (10-11) se rastreó antes del cambio #17 (10-12).
- Causa probable que sí podemos corregir: **22 de las 42 URLs del sitemap no tenían `<lastmod>`**, justo las que más cambiamos (home ES/EN, índices del blog y de soluciones, 8 casos, solución EdTech y sus 8 casos de uso). Google no tenía forma de saber que esas páginas cambiaron.

### Evaluación de cambios anteriores
- Cambios 1–19 con 1–8 días: ninguno llega a su fecha de revisión (10-19 a 10-23). Sin rastreo de las páginas cambiadas no hay nada que atribuir.
- Bing / IA (#1): "vantalogics" en web search sigue sin devolver el sitio (Racelogic, Vantage Logistics, Vanteon). IndexNow desde CI: `200 for 42 URLs`.

### GEO / SERP
- "how much does it cost to add AI tutoring to a university per student": igual que ayer (ibl.ai con 3 notas, quadc.io, liveinthefuture, getmonetizely). Todas con montos.
- "cómo evitar que compartan la cuenta de un curso online": cside, vdocipher, learnybox y rupt.dev (vendedores de anti-sharing, en inglés o traducidos). Ninguno con datos de una academia real. Nuestra página de protección cubre el tema (sesión única, reproducción simultánea, 1.248 alertas en 60 días) pero todavía no aparece; tiene 7 días.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 20 | `sitemap.xml` (42 URLs) y `/casos/*` + `/en/cases/*` | `<lastmod>` en todas las URLs con la fecha real del último cambio de contenido: home = máx(2026-10-12, nota más reciente del idioma); índice del blog = máx(2026-10-09, nota más reciente); casos 2026-10-05; solución EdTech e índice de soluciones 2026-10-09; casos de uso tutor y búsqueda semántica 2026-10-09, corrección asistida y generación de evaluaciones 2026-08-16 (fechas sacadas de `git blame`). Campo `updated` nuevo en `src/data/{cases,solutions,use-cases}.ts` y constantes `HOME_UPDATED` / `BLOG_INDEX_UPDATED` en `src/site.ts`. Los casos publican `dateModified` en su `CreativeWork`. **Cada vez que se cambie el contenido de una de esas páginas hay que actualizar su fecha**, si no el `lastmod` deja de ser confiable y Google lo ignora. | 22/42 URLs sin `lastmod`; las páginas cambiadas entre el 10-05 y el 10-12 siguen con rastreos del 09-16 al 10-06. | Google usa `lastmod` cuando es consistente: rastrea home, `/en/`, índices, casos y casos de uso en los próximos 3–7 días, y con eso entran en el índice los cambios #3, #7, #9, #16 y #17. | `last_crawled` en URL Inspection de `/en/`, `/blog/`, SIED, caso de uso tutor y nota de costo ES (esperado: posterior al 10-13 antes del 10-19). | 2026-10-19 |

### Envíos
- Deploy por push a `main` (commit `50362b1`, run 38394514320, ok). IndexNow desde CI: `200 for 42 URLs`.
- Verificado en producción: 42 `<lastmod>` en el sitemap, `dateModified` en el caso SIED, 200 en las URLs clave, 301 en la nota despublicada.
- Sitemap reenviado a GSC (12:04).

### Pendientes / hipótesis para próximas corridas
- **10-19**: además de lo ya agendado (casos #3, entidad #2, Bing #1, notas desde la home #17), mirar si el `lastmod` (#20) destrabó el rastreo. Si las páginas siguen sin rastrearse, el cuello es la demanda de rastreo de un dominio nuevo con poco volumen, y la palanca pasa a ser externa (links y menciones), no técnica.
- **10-20**: hub y protección (#4, #5, #18) y decisión sobre la página de cobro y acceso.
- Para el dueño: verificar el sitio en Bing Webmaster Tools (importando desde GSC) y sumar a `sameAs` los perfiles reales (LinkedIn de la empresa, perfil del fundador). La marca sigue sin aparecer en Bing a 8 días de IndexNow. Siguen abiertos el autor con nombre para E-E-A-T y los montos de comisión de Hotmart en el pilar.
- No tocar casos (10-19), hub y protección (10-20), blog index (10-21), nota de costo y bloques de notas relacionadas (10-22) antes de su revisión.

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 7 (10-13) | 09-15 → 10-12 | 5 | 90 | 12,2 |

---

## 2026-10-14 — Corrida 8

### Métricas generales (GSC, datos hasta 2026-10-13)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-16 → 10-13) | 5 | 93 | 5,4 % | 12,1 |
| Últimos 7 d (10-07 → 10-13) | 2 | 24 | 8,3 % | ~5,7 |
| 7 d anteriores (09-30 → 10-06) | 1 | 21 | 4,8 % | ~15,8 |

- El 10-13 es el mejor día desde el pivot: 7 impresiones, 1 clic (marca, `/` en pos 1). Dr. La Rosa sumó 5 impresiones ese día (ES 3 en pos 8,3, EN 2 en pos 4), `/soluciones/` 1 en pos 1, protección ES 1 en pos 1.
- Queries visibles en 28 d: 6, las mismas. "how much does it cost to add ai tutoring to our university?" sigue en 5 imp, pos 9; no hay impresiones nuevas desde el 10-11.
- Casos de uso de evaluación, sin clics y sin links desde ninguna nota: generación de evaluaciones EN 6 imp pos 8,8 y ES 5 imp pos 6,8; corrección asistida EN 5 imp pos 6. Sumados, son el grupo de casos de uso con más impresiones después de búsqueda semántica (8 imp, pos 3,2).

### Indexación
- URL Inspection (20 URLs): todas "Submitted and indexed", Breadcrumbs válidos. **El `lastmod` del 10-13 (#20) todavía no destrabó el rastreo**: Google bajó el sitemap el 10-13 a las 12:04, pero las páginas cambiadas siguen con los rastreos de antes (home 10-11, `/en/` 09-30, `/blog/` 10-03, nota de costo ES 09-29 y EN 10-06, SIED 09-16, casos de uso tutor 09-26 y búsqueda 09-22). La única URL rastreada después es `/en/solutions/` (10-14). Es pronto: el plazo que se fijó para ver el efecto es el 10-19.
- Sitemap: 42 URLs, 0 errores. Las notas despublicadas el 10-09 siguen "indexed" con rastreos de agosto y septiembre; responden 301.

### Evaluación de cambios anteriores
- Cambios 1–20 con 1–9 días: ninguno llega a su fecha de revisión (10-19 a 10-23).
- **Bing (#1): primera vez que la marca devuelve el sitio.** La búsqueda "vantalogics" en DuckDuckGo (índice de Bing) devuelve `vantalogics.com`, `/en/`, `/en/blog/`, `/en/solutions/` y la solución EdTech EN. El web search de la sesión (otro índice) sigue sin devolverlo (Racelogic, Vantage Logistics, Vanteon). IndexNow desde CI: `200 for 42 URLs`.

### Auditoría técnica (crawl de producción)
- 42/42 URLs del sitemap con 200, canonical self, un H1, JSON-LD presente. robots.txt con los crawlers de IA permitidos y llms.txt con 200.
- **Hueco de enlazado**: las 5 notas tenían **0 links dentro del contenido** y ninguna enlazaba a la página de caso de uso que corresponde a lo que explica. Solo enlazaban a la solución EdTech en general (en la línea de metadatos). Las páginas de servicio recibían links solo desde el índice de soluciones, la solución EdTech y el hub. El cambio #9 había hecho solo la mitad del camino (caso de uso → nota).
- **Último resto del posicionamiento anterior en el blog**: la nota de evals (`/blog/evals-para-agentes-de-ia/` + EN + AR) tenía 0 menciones de educación y todos sus ejemplos eran de pedidos, clientes y facturación ("¿me llegó el pedido de las cajas?", "estado de pedido", "pedido de descuento fuera de política"). Es el mismo problema que llevó a despublicar 4 notas el 10-09, pero esta sí recibe tráfico (2 imp pos 4 en 28 d) y es destino del 301 de "por qué fallan los agentes", así que se reorienta en vez de borrarla.
- **EN ≠ ES**: la versión EN de la nota de evals no tenía la sección "El juez, cuando hace falta" que sí tiene la ES (calibrar el juez contra juicio humano). La AR tampoco.

### GEO / SERP
- "generar preguntas de evaluación con IA a partir del material del curso": educaciontrespuntocero, smallpdf, memberpress, guías de universidades (UV, UChile, UCA). Listas de herramientas y tutoriales de prompts; nadie habla de objetivos de aprendizaje, distractores sacados de errores reales ni calibración por estadística de ítem, que es lo que cubre nuestra página de generación de evaluaciones.
- "AI assisted grading with rubrics": papers (arXiv, ASEE), UZH, Gradescope y 8allocate. Coinciden con nuestra página de corrección asistida (rúbrica explícita, borrador con evidencia, docente que firma); a ninguno lo publica un estudio que construye el sistema.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 21 | Las 5 notas × ES/EN/AR (15 URLs, 10 indexables) | Bloque "Dónde lo construimos" / "Where we build this" antes del autor, con las páginas de caso de uso que corresponden a la nota (campo nuevo `useCases` en el frontmatter, se valida en build). Costo y evaluar tutor → tutor de IA; tutor o búsqueda y RAG → búsqueda semántica + tutor; evals → corrección asistida + tutor. El `BlogPosting` suma `mentions` con el `@id` del `Service` de cada caso de uso. No cambia el texto de las notas, así que su `updated` no se toca (salvo evals, ver #22). | Las notas rankean en pos 2–9 (evaluar tutor 4 imp pos 2, RAG EN 2 imp pos 3, nota de costo EN 7 imp pos 8,6) y no pasaban ningún link a las páginas de servicio, que tienen impresiones en pos 3–9 sin clics. Era la mitad que faltaba del cambio #9. | Cluster nota ↔ caso de uso cerrado en los dos sentidos: Google y los LLMs asocian cada nota con el servicio que la respalda, y los casos de uso ganan autoridad interna. Efecto visible recién cuando Google rastree las notas (hoy: rastreos del 09-16 al 10-06). | Último rastreo de las notas y de los casos de uso tutor, búsqueda y corrección asistida; impresiones y posición de esos 3 casos de uso (28 d). | 2026-10-28 |
| 22 | `/blog/evals-para-agentes-de-ia/` + `/en/blog/evals-for-ai-agents/` (+ AR, noindex) | Reorientada a educación sin cambiar estructura, cifras ni FAQ: ejemplos de alumnos, tutor y docente en lugar de pedidos y clientes ("derivar al docente" en vez de "escalar a una persona", casos ambiguos de alumnos inscriptos en varios cursos, casos hostiles de alumnos que piden la respuesta de la evaluación). Title "Evals para agentes de IA en educación…" (la URL no cambia). Dos links en el contenido: a "cómo evaluar un tutor antes de abrirlo" (los 5 tipos de caso) y a corrección asistida (el juez calibrado contra el docente es el mismo problema). EN y AR suman la sección del juez que solo tenía la ES. `industry: edtech`, `updated: 2026-10-14`. | 0 menciones de educación y 6 de "pedido" en una nota que aparece en pos 4 y es destino de un 301; EN sin una sección de la ES. | Entidad coherente en todo el blog (las 5 notas pasan a hablar de educación) y la nota pasa a competir por "evals para IA en educación" en vez de "evals para agentes" genérico. Riesgo bajo: tenía 2 impresiones en 28 d. | Impresiones, queries y posición de la nota ES/EN; clics internos a corrección asistida si alguna vez hay analytics. | 2026-10-28 |
| 23 | `/soluciones/edtech-y-plataformas-educativas/correccion-asistida/` + EN (`assisted-grading`) + AR | Bloque "Seguí por acá" con la nota de evals (campo `reading`); `updated: 2026-10-14`. | Corrección asistida EN 5 imp pos 6, sin links desde notas; la nota de evals ahora explica la calibración del corrector. | Ídem #21. | Ídem #21. | 2026-10-28 |
| 24 | `/` y `/en/` (también `/ar/`) | La sección de notas de la home muestra las 5 notas en lugar de las 4 más recientes (la primera, destacada, para que la grilla cierre). `HOME_UPDATED = 2026-10-14`. | Con la nota de evals actualizada hoy, la home iba a dejar de enlazar a la de RAG (ES 4 imp pos 7,2, EN 2 imp pos 3), en medio de la prueba del cambio #17. El blog tiene solo 5 notas. | Ninguna nota pierde el link desde la página más rastreada. | Ídem #17. | 2026-10-19 |

Generación de evaluaciones queda sin bloque de notas: ninguna nota le corresponde y escribir una ahora canibalizaría la propia página de caso de uso.

### Envíos
- Deploy por push a `main` (commit `8372f07`, run 38561517912, ok). IndexNow desde CI: `200 for 42 URLs`.
- Verificado en producción: bloque "Dónde lo construimos" en las notas de evals y de costo, bloque de notas en corrección asistida, 5 notas en `/` y `/en/`, 8 URLs con `lastmod` 2026-10-14 en el sitemap, 0 links rotos en la nota de evals. `astro check` sin errores.
- Sitemap reenviado a GSC (12:09).

### Pendientes / hipótesis para próximas corridas
- **10-19**: casos (#3), entidad (#2), Bing (#1, hoy con primera señal en el buscador que usa su índice), notas desde la home (#17, #24) y si el `lastmod` (#20) destrabó el rastreo. Si para el 10-19 Google sigue sin rastrear las páginas cambiadas, el cuello es la demanda de rastreo de un dominio nuevo y la palanca es externa: links y menciones, perfiles con `sameAs`, Bing Webmaster Tools.
- **10-20**: hub y protección (#4, #5, #18) y decisión sobre la página de cobro y acceso.
- **Regla nueva para notas futuras**: toda nota declara `useCases` (el build falla si el slug no existe) y, si corresponde, el caso de uso la suma en `reading`.
- Para el dueño, siguen abiertos: Bing Webmaster Tools, `sameAs` con perfiles reales, autor con nombre para E-E-A-T y los montos de comisión de Hotmart en el pilar.
- No tocar casos (10-19), hub y protección (10-20), blog index (10-21), nota de costo y bloques de notas relacionadas (10-22) ni las notas y casos de uso de hoy (10-28) antes de su revisión.

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 7 (10-13) | 09-15 → 10-12 | 5 | 90 | 12,2 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |

---

## 2026-10-15 — Corrida 9

### Métricas generales (GSC, datos hasta 2026-10-14)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-17 → 10-14) | 5 | 90 | 5,6 % | 12,3 |
| Últimos 7 d (10-08 → 10-14) | 2 | 23 | 8,7 % | 5,8 |
| 7 d anteriores (10-01 → 10-07) | 1 | 19 | 5,3 % | 14,7 |

- Entró un solo día nuevo (10-14: 2 imp, pos 2). Los últimos tres días suman impresiones en páginas del cluster que antes no aparecían juntas: migración EN 3 imp (pos 6–8), Dr. La Rosa ES/EN 5, `/en/blog/` 2 (pos 4), búsqueda semántica EN 1 (pos 2).
- Queries visibles en 28 d: las mismas 6. "how much does it cost to add ai tutoring to our university?" sigue en 5 imp, pos 9, sin impresiones nuevas desde el 10-11.
- Países (28 d): Argentina desktop 7 imp, 3 clics (pos 4,4); Colombia 7 (pos 5,3); Argentina mobile 5 (1 clic); Brasil 4. Sin movimientos fuera del ruido.

### Indexación
- **El `lastmod` (#20) empezó a destrabar el rastreo.** Google rastreó después de los cambios `/en/` (10-15, antes 09-30), `/blog/` (10-14, antes 10-03), `/en/blog/` (10-15), el hub `/plataformas-educativas/` (10-15, antes 09-30) y `/en/solutions/` (10-14). Todavía sin rastreo nuevo: home ES (10-11), nota de costo ES 09-29 y EN 10-06, notas de evals ES 10-01 y EN 09-27, RAG y evaluar tutor 09-16, SIED 09-16, casos de uso tutor 09-26, búsqueda semántica 09-22 y generación de evaluaciones 09-25. Primero entran los índices; las páginas hoja vienen detrás.
- Sitemap: 42 URLs válidas, último download 10-14 12:09. Reenviado hoy (12:09) con 44.

### Evaluación de cambios anteriores
- Cambios 1–24 con 1–10 días: ninguno llega a su fecha de revisión (10-19 a 10-28).
- **Bing (#1): confirmado.** "vantalogics" en DuckDuckGo (índice de Bing) devuelve `/en/` y `/` como primeros resultados, más el GitHub de la empresa. IndexNow desde CI: `200 for 44 URLs`.

### Auditoría técnica (crawl de producción)
- 42/42 URLs con 200, canonical self, un H1, JSON-LD que parsea en todas. 51 destinos de links internos, 0 rotos ni redirigidos. robots.txt con los crawlers de IA permitidos, llms.txt 200, clave de IndexNow 200.
- Pendientes menores ya conocidos y bloqueados por revisión: descriptions de casos de 232–307 caracteres (revisión 10-19) y title de la nota de costo EN de 77 caracteres (10-22).

### GEO / SERP
- "corrección automática de cuestionarios con IA": vendedores de herramientas (OpExams, Corrector Web), PDFs de universidades españolas y un material de CATEDU sobre corrección automática vs asistida. Nadie publica mediciones de un caso real.
- "LLM grading inconsistency same answer different grade": papers (Grade Guard en arXiv, BMC Medical Education, "Grade Like a Human"). Describen la inconsistencia en general. Ninguno la cuantifica sobre las respuestas de una academia en producción ni propone sacar a la IA del veredicto.
- "migrate online academy from Hotmart to own platform": LearnWorlds, Mentortools, Academy of Mine, Scenes, ayuda de Hotmart. Todos venden su plataforma. Nuestra guía de migración no aparece en el buscador que usa la sesión, aunque en Google suma 9 imp en pos 6–8. No se toca: no hay dato que justifique reescribirla.

### Evidencia nueva encontrada
El repo de Apoyo Escolar RV tiene `docs/propuestas/correccion-automatica.md`, un documento de diseño con mediciones propias de ago/2026: 5.563 respuestas de desarrollo pendientes (97,8 % del total), 99,4 % corregibles sin juicio humano, la IA como juez sobre 185 respuestas reales (se contradice en 9 de 12 ejercicios, 43 % de alumnos afectados, resuelve bien 24 de 25 veces), consenso de alumnos en 581 preguntas de opción múltiple (97,8 %; en al menos 4 de 13 desacuerdos la clave estaba mal), validación del motor contra 115 correcciones manuales (110/110 donde decide) y el hallazgo del orden de campos en la salida. Además, el commit `73327ade` (2026-09-28) suma el botón «No lo sé» y el rechazo de respuestas de relleno.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 25 | `/blog/correccion-automatica-de-cuestionarios-con-ia/` + `/en/blog/automatic-quiz-grading-with-ai/` (nuevas) | Nota del cluster `casos`, answer-first. Arranca con el dato (99,4 % sin IA al corregir; 43 % de alumnos con veredicto opuesto cuando la IA dictaminaba) y sigue con tabla de forma de las respuestas, tabla de la IA como juez, "95 claves en vez de 5.563 correcciones", motor de comparación (unidades, fracciones, multiparte, abstención), validación contra 115 correcciones, construcción de la clave con fuentes independientes, experimento de las 581 preguntas, orden de campos, unidades aprendidas (7 de 8), tabla "quién hace qué" y red de seguridad. 4 FAQ. Links en el contenido al caso Apoyo Escolar RV, a generación de evaluaciones, a corrección asistida y a la nota de evals. `useCases`: corrección asistida + generación de evaluaciones. Sin nombres de personas, sin nombres internos de herramientas o modelos, sin montos, sin LearnBase. AR no se creó (noindex). | Los casos de uso de evaluación son el grupo con más impresiones sin clics después de búsqueda semántica (generación de evaluaciones ES 4 imp pos 7,8 y EN 5 imp pos 9,4; corrección asistida EN 4 imp pos 6,8) y generación de evaluaciones no tenía ninguna nota que la respaldara. La SERP del tema son vendedores y papers, sin datos de un caso real. Sin dato de GSC propio para la query (no había página): hipótesis basada en la SERP, como el cambio #4. | Indexación en 1–2 semanas (las hojas tardan más que los índices, ver Indexación). Impresiones para "corrección automática", "AI grading", "LLM as grader". Cita en motores de IA por las cifras (43 %, 99,4 %, 24 de 25, orden de campos). Más señal para los dos casos de uso. | Estado en URL Inspection; impresiones y queries de las 2 URLs; impresiones y posición de generación de evaluaciones y corrección asistida (28 d); web search de "corrección automática de cuestionarios con IA" y "LLM grading inconsistency". | 2026-10-29 |
| 26 | `/soluciones/edtech-y-plataformas-educativas/generacion-de-evaluaciones/` + EN (`assessment-generation`) | Primer bloque "Seguí por acá" (campo `reading`) con la nota nueva; `updated: 2026-10-15`. | Página con 9 imp en 28 d (pos 7,8–9,4), sin links desde ninguna nota y sin rastreo desde el 09-25. Corrida 8: "Generación de evaluaciones queda sin bloque de notas: ninguna nota le corresponde". Ahora sí hay una, y no canibaliza: la nota es un caso de corrección y la página es el servicio de generación. | El `lastmod` nuevo provoca el rastreo y el cluster evaluación queda cerrado nota ↔ caso de uso. | Último rastreo; impresiones y posición (28 d). | 2026-10-29 |
| 27 | `/soluciones/edtech-y-plataformas-educativas/correccion-asistida/` + EN | La nota nueva se suma primera al bloque de lecturas, antes de la de evals; `updated: 2026-10-15`. | Es la página de servicio que más se parece al tema de la nota. Cambio aditivo sobre el #23 (bloque de lecturas, revisión 10-28): no cambia el texto de la página. | Ídem #26. Se mezcla con el #23. | Ídem #26. | 2026-10-28 |
| 28 | `/` y `/en/` | La sección de notas muestra hasta 6 (antes 5): con 6 notas la grilla cierra sin destacada. | Con `slice(0, 5)`, la nota nueva hubiera sacado de la home a la de RAG, que es justo lo que el #24 evitó. | Ninguna nota pierde el link desde la home. Las fechas de la home y de los índices del blog pasan solas a 10-15 por la nota nueva. | Ídem #17. | 2026-10-19 |

### Envíos
- Deploy por push a `main` (commit `6ce459f`, run 38732446452, ok). IndexNow desde CI: `200 for 44 URLs`.
- Verificado en producción: las 2 notas responden 200 con BlogPosting + BreadcrumbList + FAQPage válidos, hreflang es/en/x-default, canonical self, 0 links internos rotos, bloque "Dónde lo construimos" presente. Generación de evaluaciones, `/` y `/en/` ya enlazan a la nota. `astro check`: 0 errores. Sitemap con 44 URLs y `lastmod` 2026-10-15 en las páginas tocadas.
- Sitemap reenviado a GSC (12:09).

### Error de proceso
- El commit `6ce459f` salió con una línea `Co-Authored-By` de atribución, y la regla global del dueño lo prohíbe. Está pusheado a `main`. No se reescribió el historial con force push sin confirmación del dueño. En los commits siguientes, nada de atribución.

### Pendientes / hipótesis para próximas corridas
- **10-19**: casos (#3), entidad (#2), Bing (#1, confirmado hoy), notas desde la home (#17, #24, #28) y cuánto avanzó el rastreo de las páginas hoja después del `lastmod` (#20). Si la home ES y las notas siguen sin rastreo nuevo para el 10-19, la palanca pasa a ser externa.
- **10-20**: hub y protección (#4, #5, #18) y decisión sobre la página de cobro y acceso.
- La evidencia de corrección automática da para más: el motor de unidades, el modo sombra y la reversión en bloque. No escribir otra nota del tema hasta ver si la #25 indexa y recibe impresiones.
- Para el dueño, siguen abiertos: Bing Webmaster Tools, `sameAs` con perfiles reales, autor con nombre para E-E-A-T, los montos de comisión de Hotmart en el pilar y si quiere reescribir el commit `6ce459f` para sacarle la atribución.
- No tocar casos (10-19), hub y protección (10-20), blog index (10-21), nota de costo y bloques de notas relacionadas (10-22), notas, evals y corrección asistida (10-28) ni la nota nueva y generación de evaluaciones (10-29) antes de su revisión.

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 7 (10-13) | 09-15 → 10-12 | 5 | 90 | 12,2 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |
| 9 (10-15) | 09-17 → 10-14 | 5 | 90 | 12,3 |
