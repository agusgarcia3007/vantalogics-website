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

---

## 2026-10-16 — Corrida 10

### Métricas generales (GSC, datos hasta 2026-10-15)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-18 → 10-15) | 5 | 95 | 5,3 % | 11,9 |
| Últimos 7 d (10-09 → 10-15) | 2 | 23 | 8,7 % | 5,3 |
| 7 d anteriores (10-02 → 10-08) | 1 | 21 | 4,8 % | 13,8 |

- Entró el 10-15: 5 impresiones en pos 3,8. La nota de RAG ES sumó 2 en pos 2 (rastreada por última vez el 09-16), el hub `/plataformas-educativas/` 2 en pos 7 y `/en/` 1 en pos 1.
- Queries visibles en 28 d: las mismas 6. "how much does it cost to add ai tutoring to our university?" sigue en 5 imp, pos 9, sin impresiones nuevas desde el 10-11.
- Por página (28 d), las que tienen impresiones en primera página sin clics: `/en/solutions/` 8 imp pos 3,9; búsqueda semántica 8 pos 3,2; hub 8 pos 4,9; SIED 8 pos 8,9; Dr. La Rosa ES 7 pos 5,4 + EN 2 pos 4; nota de costo EN 7 pos 8,6; RAG ES 6 pos 5,5. Los 4 casos suman 25 impresiones y 0 clics.

### Indexación
- **Las dos notas de corrección automática (#25) ya están indexadas**, rastreadas el 10-15, un día después de publicarlas. Como la protección de contenido (#4): lo que se enlaza desde la home y el índice del blog entra en 1 día.
- **Se rastrearon páginas que esperaban**: home ES 10-16 (antes 10-11; ya con la sección de notas #17/#24/#28), `/en/` 10-15 y **nota de costo EN 10-16** (antes 10-06): Google ya indexa la versión de los cambios #8/#10.
- Siguen sin rastreo nuevo: nota de costo ES (09-29), evals ES 10-01 y EN 09-27, RAG y evaluar tutor 09-16, SIED 09-16, casos de uso tutor 09-26, búsqueda semántica 09-22, generación de evaluaciones 09-25, migración ES/EN 09-30. Lo que tarda son las páginas hoja que solo se enlazan desde otras hojas.
- Sitemap: 44 URLs, todas con `lastmod`. Reenviado 12:05.

### Evaluación de cambios anteriores
- Cambios 1–28 con 1–11 días: ninguno llega a su fecha de revisión (10-19 a 10-29).
- `lastmod` (#20): confirmado que funciona para índices y home; las hojas siguen lentas.
- Bing / IA (#1): el web search de la sesión (otro índice) sigue sin devolver la marca. En el índice de Bing ya aparecía desde el 10-14. IndexNow desde CI: `200 for 44 URLs`.

### Auditoría técnica (crawl de producción)
- 44/44 URLs del sitemap con 200, canonical self, un H1, JSON-LD que parsea, hreflang es/en/x-default en todas. 53 destinos de links internos, 0 rotos ni redirigidos.
- **Hueco de enlazado y de contenido en los casos**: las 4 páginas de caso tenían solo métricas y dos párrafos, y ninguna enlazaba a las notas y guías que usan sus datos. Apoyo Escolar RV es la fuente de la guía de migración, de la de protección de contenido y de la nota de corrección automática, y Lu Apuntes de la parte de sesión única. Solo existía el link a migración, cableado en el componente para Apoyo Escolar RV.

### GEO / SERP
- "por qué falla el RAG sobre contenido educativo": papers en arXiv (EduGuard, RAG en CS), un survey y un newsletter de educative.io. Nadie lo cuenta desde un producto en producción. La nota ES ya aparece en pos 2 en Google con 2 impresiones del 10-15.
- "corrección automática de respuestas abiertas con IA": papers académicos (UMA con ChatGPT, G-Rubric de la UNED, Tecnura). Ninguno con datos de una academia en producción. La nota nueva tiene 1 día indexada.
- "migrar cursos de Hotmart a plataforma propia": Hotmart (blog y ayuda), guiadesoftware, Capterra y Scribd. Una de las respuestas recomienda pasarse a Teachable/Thinkific. La guía de migración no aparece en este índice.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 29 | `/casos/apoyo-escolar-rv/`, `/casos/lu-apuntes/` y sus EN (AR sin bloque: no tiene guías ni la nota nueva) | Bloque "Lo que aprendimos en este proyecto" / "What we learned on this project" con tarjetas (título + descripción) hacia las guías y notas que usan los datos del caso. Apoyo Escolar RV → migración, protección de contenido y corrección automática. Lu Apuntes → protección de contenido. Campos nuevos `guides` y `reading` en `src/data/cases.ts` (el build falla si un slug no existe en ES/EN). El `CreativeWork` del caso suma `subjectOf` con el `@id` de cada página. Sale el link a migración cableado para un solo caso y el string `migrationLink`, que queda sin uso. `updated: 2026-10-16` en los dos casos. **No cambian title ni meta**, así que la prueba del #3 (CTR de casos, revisión 10-19) no se contamina. SIED y Dr. La Rosa quedan sin bloque: ninguna nota usa sus datos todavía. | Los 4 casos suman 25 impresiones en pos 4–9 y 0 clics en 28 d, y eran páginas finas sin salida hacia el contenido que respaldan. La nota #25 y las guías de migración y protección solo recibían links desde notas, hubs y footer, y migración no se rastrea desde el 09-30. | Evidencia conectada en los dos sentidos (nota → caso ya existía, ahora caso → nota): Google y los LLMs ven el caso como fuente de las cifras que citan las notas, y las guías ganan un link contextual más. El `lastmod` nuevo hace que Google rastree los dos casos (Apoyo Escolar RV y Lu Apuntes no tienen rastreo desde el 10-05). | Último rastreo de los 2 casos y de migración ES/EN; impresiones y posición de migración, protección y corrección automática (28 d). | 2026-10-30 |

### Envíos
- Deploy por push a `main` (commit `c08f255`, run 38897993514, ok). IndexNow desde CI: `200 for 44 URLs`.
- Verificado en producción: bloque presente en `/casos/apoyo-escolar-rv/` y `/en/cases/lu-apuntes/`, `subjectOf` en el JSON-LD, `lastmod` 2026-10-16 en los dos casos, 0 links rotos en el crawl posterior. `astro check`: 0 errores.
- Sitemap reenviado a GSC (12:05).

### Pendientes / hipótesis para próximas corridas
- **10-19**: casos (#3: CTR por title/meta; el #29 no los toca), entidad (#2), Bing (#1), notas desde la home (#17, #24, #28; la home ES ya se rastreó con la sección) y cuánto avanzó el rastreo de hojas. Si la nota de costo EN (rastreada hoy) mueve la query de universidad, se ve desde el 10-19.
- **10-20**: hub y protección (#4, #5, #18) y decisión sobre la página de cobro y acceso.
- Las hojas que solo reciben links desde otras hojas (migración, evals, RAG, evaluar tutor, SIED) siguen sin rastrearse. Si el 10-19 siguen igual, considerar que la home o el índice del blog enlacen también a las guías de plataformas (hoy solo el footer enlaza a protección).
- Para el dueño, siguen abiertos: Bing Webmaster Tools, `sameAs` con perfiles reales, autor con nombre para E-E-A-T, los montos de comisión de Hotmart en el pilar y el commit `6ce459f` con atribución.
- No tocar casos (title/meta hasta 10-19; bloque nuevo hasta 10-30), hub y protección (10-20), blog index (10-21), nota de costo y bloques de notas relacionadas (10-22), notas, evals y corrección asistida (10-28) ni la nota de corrección y generación de evaluaciones (10-29).

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
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |

---

## 2026-10-19 — Corrida 11

### Métricas generales (GSC, datos hasta 2026-10-18)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-21 → 10-18) | 6 | 103 | 5,8 % | 8,6 |
| Últimos 7 d (10-12 → 10-18) | 2 | 28 | 7,1 % | 6,6 |
| 7 d anteriores (10-05 → 10-11) | 2 | 21 | 9,5 % | 6,0 |

- Primera vez que el sitio pasa las 100 impresiones en 28 d y la posición media baja de 10 (11,9 → 8,6). Parte de la mejora es que el 09-20 (pos 175) salió de la ventana.
- **Primer clic no de marca**: `/plataformas-educativas/proteccion-de-contenido/` el 10-17 en pos 1. La página suma 5 imp en pos 1,4 y 1 clic en 28 d (la EN 2 imp, pos 5,5).
- **La nota de costo EN sube después del rastreo del 10-16**: 10 imp en 28 d (antes 7), pos 7,3. Los días 10-17 y 10-18 aparece en pos 4–4,5 (antes promediaba 8,6). La query "how much does it cost to add ai tutoring to our university?" pasa de 5 imp en pos 9 a 6 imp en pos 7,7.
- Corrección automática (#25), primeras impresiones: ES 1 en pos 9 y EN 2 en pos 6 y 21.
- Query nueva visible: "apoyo escolar rv" → `/casos/apoyo-escolar-rv/`, 4 imp, pos 18,8 (24 el 10-17 y el 10-18). Es la marca del cliente, con intención de ir a su sitio. Que su producto quede arriba es lo esperable. No se actúa.
- Países (28 d vs 28 d anteriores): Argentina 18 imp y 5 clics (antes 2 imp y 1 clic), con la posición de 50 a 7,6. México 4 imp en pos 3. USA ya no aparece entre los primeros: casi todas sus impresiones eran de páginas retiradas.

### Indexación
- URL Inspection (20 URLs): todas "Submitted and indexed", Breadcrumbs válidos.
- Rastreadas desde la corrida anterior: home ES 10-16, nota de costo ES y EN 10-16, Apoyo Escolar RV y Lu Apuntes 10-17 (un día después del `updated` del #29), `/blog/` 10-18, RAG ES 10-19 y migración ES 10-19.
- Siguen sin rastreo nuevo: **SIED ES 09-16** (EN 09-30), evaluar tutor 09-16, casos de uso tutor 09-26, búsqueda semántica 09-22 y generación de evaluaciones 09-25, evals ES 10-01, migración EN 09-30 y protección ES 10-07.
- Crawl de links internos: SIED y Dr. La Rosa tenían 4 páginas de origen cada uno, el mínimo del sitio (los casos no se enlazaban entre sí y `/casos/` no existe). Apoyo Escolar RV tenía 7 y Lu Apuntes 5, y son los que se rastrearon.

### Evaluación de cambios anteriores (revisión 10-19)
- **#1 IndexNow / Bing: funcionó, se consolida.** "vantalogics" en DuckDuckGo (índice de Bing) devuelve `/en/`, `/`, GitHub, Instagram, `/en/solutions/`, la solución EdTech EN y `/en/blog/`. El web search de la sesión usa otro índice y todavía no devuelve la marca. IndexNow desde CI: `200 for 44 URLs` en cada deploy.
- **#2 Organization: correcto, se mantiene.** El JSON-LD parsea y tiene `audience`, `knowsAbout`, logo ImageObject y `@id` enlazado desde casos y notas. No hay panel de marca en Google ni queries de marca visibles (están anonimizadas). El límite es externo: `sameAs` solo tiene GitHub e Instagram.
- **#3 Títulos de casos: no concluyente.** Del 10-06 al 10-18 los casos tuvieron 11 impresiones (Dr. La Rosa 5, Apoyo Escolar RV 5, Lu Apuntes 1) y 0 clics. Antes habían sido 18 impresiones y 0 clics. SIED, el caso con más impresiones, nunca se volvió a rastrear, así que su título nuevo no llegó al índice. Los títulos se quedan. Lo que sí se corrige es la meta description: medía 232–307 caracteres y Google la cortaba (ver #30).
- **#17/#24/#28 Notas en la home: funcionó en parte.** La home se rastreó el 10-16 con la sección, y ese mismo día entraron la nota de costo ES y EN, y el 10-19 la de RAG. Evaluar tutor (09-16) y evals (10-01) siguen sin rastreo nuevo, aunque también están enlazadas desde la home. La única señal en ranking es la nota de costo EN (pos 4–4,5 los días 10-17 y 10-18).
- **#20 `lastmod`: funcionó, se consolida.** Las páginas con `updated` nuevo y más de 5 links internos se rastrean en 1–3 días: casos #29 (1 día), notas #25 (1 día), índices. Las hojas con pocos links entrantes siguen sin rastreo nuevo. El cuello ahora es el enlazado interno, no la señal de cambio.

### GEO / SERP
- "how much does it cost to add AI tutoring to a university per student": quadc.io, ibl.ai (3 notas), fabric.so y liveinthefuture. Todos con montos. Nuestra nota sube en Google sin montos (ver Métricas). No se toca hasta el 10-22.
- "vantalogics" en el web search de la sesión: sigue sin devolver el sitio (Racelogic, Vantage Logistics, Vanteon).

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 30 | `/casos/*` y `/en/cases/*` (8 URLs; AR usa el texto EN y está en noindex) | Meta description propia por caso (campo nuevo `summary` en `src/data/cases.ts`), de 122 a 155 caracteres, que arranca por lo que es y sigue con los datos del caso. Ej.: "Educación médica continua para endoscopistas de Latinoamérica: 850+ alumnos, 51 clases, 33 h de formación y certificados oficiales. Caso de Vantalogics." Antes se armaba con título + alumnos + "lo que construimos" (232–307 caracteres). llms.txt usa el mismo `summary` debajo del título de cada caso. Títulos sin cambios. | Revisión del #3: 0 clics en 28 d con 29 impresiones de casos en pos 4–9, y descriptions de casi el doble de lo que muestra Google. | El snippet completo y con cifras mejora el CTR de los casos cuando aparecen en primera página, y los LLMs tienen un resumen citable por caso. | CTR e impresiones de los 8 casos (28 d); que el snippet muestre la description nueva. | 2026-11-02 |
| 31 | Los 4 casos × ES/EN/AR | Bloque "Otros casos" / "Other cases" al final, con los otros 3 casos (título `Cliente: tipo` + `summary`). Reusa `LinkCard` y la grilla `.posts`. `updated: 2026-10-19` en los 4 casos, así que el sitemap pasa a `lastmod` 2026-10-19 en las 8 URLs. | SIED ES sin rastreo desde el 09-16 y Dr. La Rosa con solo 4 páginas de origen. Los dos casos que tienen más links y `updated` nuevo (Apoyo Escolar RV, Lu Apuntes) se rastrearon al día siguiente. | Google llega a SIED y a Dr. La Rosa desde los casos que ya rastrea seguido, y por fin indexa el título del #3 para SIED. Cada caso pasa de 4–7 a 7–10 páginas de origen. | Último rastreo de SIED ES/EN y Dr. La Rosa ES/EN (esperado: antes del 10-23); impresiones de SIED. | 2026-10-26 |

### Envíos
- Deploy por push a `main` (commit `22acd78`, ok). IndexNow desde CI: `200 for 44 URLs`.
- Verificado en producción: description nueva y bloque `#otros-casos` en `/casos/academia-sied/`. Crawl posterior: 44/44 con 200, 53 destinos internos, 0 rotos, 0 issues. `astro check` sin errores.
- Sitemap reenviado a GSC (12:05).

### Pendientes / hipótesis para próximas corridas
- **10-20**: hub y protección (#4, #5, #18). Protección ya tiene el primer clic no de marca (pos 1–2), y con eso está la señal que se pedía para decidir la página de cobro y acceso. Antes de escribirla, mirar qué queries tiene el hub y escribir la página para que vaya más hondo que el hub sin canibalizarlo.
- **Hojas que no se rastrean** (evaluar tutor, casos de uso tutor, búsqueda semántica, generación de evaluaciones, migración EN): si el 10-23 siguen igual, sumarles links desde páginas que Google rastrea seguido (índice del blog, home, casos).
- **10-22**: nota de costo. Si la posición 4–5 se sostiene, no tocar nada. Corregir el title EN de 77 caracteres solo si hace falta.
- Para el dueño, siguen abiertos: Bing Webmaster Tools, `sameAs` con perfiles reales (LinkedIn de la empresa, perfil del fundador), autor con nombre para E-E-A-T, los montos de comisión de Hotmart en el pilar y el commit `6ce459f` con atribución.
- No tocar hub y protección (10-20), blog index (10-21), nota de costo y bloques de notas relacionadas (10-22), bloque "Otros casos" (10-26), notas, evals y corrección asistida (10-28), nota de corrección y generación de evaluaciones (10-29), bloque de aprendizajes de casos (10-30) ni metas de casos (11-02) antes de su revisión.

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
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |

---

## 2026-10-20 — Corrida 12

### Métricas generales (GSC, datos hasta 2026-10-19)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-22 → 10-19) | 6 | 103 | 5,8 % | 8,5 |
| Últimos 7 d (10-13 → 10-19) | 2 | 30 | 6,7 % | ~6,6 |
| 7 d anteriores (10-06 → 10-12) | 2 | 20 | 10 % | ~5,8 |

- La semana tuvo 30 impresiones, un 50 % más que la anterior. Es la mejor semana desde el pivot, aunque el volumen sigue siendo chico. El 10-19 entró con 3 impresiones en pos 4,3.
- **Migración ES apareció en pos 1 el 10-19**, el mismo día que Google la volvió a rastrear. Suma 6 imp en pos 6,2 en 28 d, y la EN 5 en pos 7,2.
- Nota de costo EN: 11 imp en pos 7,3 en 28 d. En 7 d pasó de pos 8,8 a pos 5 con las mismas 4 imp. Se sostiene desde el rastreo del 10-16.
- Queries visibles: las mismas 6. "how much does it cost to add ai tutoring to our university?" tiene 6 imp en pos 7,7.
- Países (28 d): Argentina desktop 12 imp y 4 clics (pos 6,5); Colombia desktop 9 (pos 4,6); Argentina mobile 6 (1 clic); Brasil 5; Uruguay mobile 4.

### Indexación
- URL Inspection (20 URLs): todas "Submitted and indexed", Breadcrumbs válidos.
- Rastreos nuevos: **SIED EN 10-20** (el bloque "Otros casos" #31 se publicó ayer), `/en/` 10-20, migración ES 10-19, `/blog/` 10-18, Dr. La Rosa ES 10-15, hub 10-15.
- Siguen sin rastreo nuevo: SIED ES 09-16, evaluar tutor 09-16, casos de uso tutor 09-26, búsqueda semántica 09-22 y generación de evaluaciones 09-25, evals ES 10-01, migración EN 09-30, hub EN 09-29 y protección ES 10-07 y EN 10-06.

### Evaluación de cambios anteriores (revisión 10-20)
- **#4 Protección de contenido: funcionó, se consolida.** Se indexó en 1 día. La ES suma 5 imp en pos 1,4 y 1 clic (10-17), que es el **primer clic no de marca del sitio**; la EN suma 2 imp en pos 5,5. Las queries están anonimizadas. La SERP del tema siguen siendo vendedores de DRM. No se toca.
- **#5 Link desde el hub: cumplió su objetivo** (la página se descubrió y se indexó en 1 día). El hub no se movió: 8 imp, pos 4,9. Era lo esperado.
- **#18 Link en el footer: sin efecto medible.** Protección no se volvió a rastrear desde el 10-07, a pesar de tener el link en las 44 páginas. Se deja, porque no cuesta nada.
- **Decisión pendiente desde la corrida 6: página de cobro y acceso.** La condición era que protección sumara impresiones y clics, y se cumplió. Ver #32.
- Bing (#1): "vantalogics" en DuckDuckGo devuelve `/en/` y `/` primero. El web search de la sesión sigue sin devolver la marca.

### Auditoría técnica (crawl de producción)
- 44/44 URLs con 200, canonical self, un H1, JSON-LD que parsea y 0 links internos rotos (45 destinos). robots.txt con los crawlers de IA permitidos y llms.txt con 200.
- Hay titles de 66–84 caracteres y descriptions de 164–206 en notas y casos de uso. No se tocan: las notas están bloqueadas hasta el 10-22/10-28 y no hay dato de CTR que lo justifique.

### GEO / SERP
- "cómo cobrar cursos online con Mercado Pago y dar acceso automático": ayuda de Tiendanube sobre pagos recurrentes y 7 páginas programáticas de openeducat. Nadie explica qué pasa después del pago.
- "vender cursos online transferencia bancaria acreditación automática": FAQs de academias que dicen que la transferencia tarda de 1 a 3 días y pide comprobante, y SendPulse con "marcá el pago a mano".
- "webhook Mercado Pago pago aprobado habilitar acceso curso idempotencia": la documentación de Mercado Pago, un proyecto en mintlify y un blog de desarrollo. Hablan de buenas prácticas sin datos de producción.

### Evidencia nueva
Repos de Apoyo Escolar RV y Lu Apuntes, verificada contra los commits:
- `2ede3b51` (2026-06-17): 16 de 205 pagos aprobados de MP en 4 días sin compra; conciliación cada 10 min sobre los últimos 180 min.
- `1b389781` (2026-07-27): MP vuelve a notificar al liberar los fondos (~35 días) y eso generó 358 compras duplicadas desde mayo.
- `5f09f78a` (2026-09-08): las bajas ya no borran la compra y no se acreditan solos los pagos de más de 24 h.
- `a6dd9fb3` (2026-10-13): devolución automática del pago doble y ventana de renovación de 15 días.
- Talo desde abril de 2026, con un CVU por orden. Estados UNDERPAID, OVERPAID y EXPIRED en Lu Apuntes. La pantalla de la orden consulta cada 3 s y la reconciliación corre como mucho cada 15 s.
- `5ad288f` (2026-08-12): el formulario de comprobantes de Lu Apuntes se borró al día siguiente con 0 solicitudes.
- PayPal manual desde `0492adb0` (2026-06-04).

**Criterio aplicado**: no se publican huecos de seguridad de los sistemas de los clientes (verificación de firma de webhooks, chequeos que faltan), solo errores ya resueltos. Tampoco se publica la comisión del proveedor de transferencias, porque es un precio.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 32 | `/plataformas-educativas/cobros-y-acceso/` + `/en/education-platforms/payments-and-access/` (nuevas, `order: 3`) | Página del cluster de plataformas, answer-first con el dato de 16 de 205. Tabla "del pago al acceso" (momento / qué hace / qué no hacer). Secciones: webhook y no pantalla de gracias; conciliación; avisos repetidos (358 duplicados y las 4 reglas que lo resolvieron); pago doble; transferencias con CVU por orden y tabla de estados; tabla de medios de pago; acceso como permiso (migrados, manual, upgrade, contenido con fecha de baja); vencimientos y renovaciones; 6 pruebas antes de abrir la venta. 6 FAQ. Service + WebPage + BreadcrumbList + FAQPage. Sin montos, sin LearnBase, sin nombres de personas, sin recomendar competidores. | Condición fijada en la corrida 6 y cumplida: protección (#4) tiene 5 imp en pos 1,4 y el primer clic no de marca. La SERP del tema son ayudas de SaaS y páginas programáticas sin datos de producción. El hub cubre el tema en dos párrafos, y la página nueva va más hondo (conciliación, duplicados, estados de transferencia, renovaciones) sin repetirlo. Sin dato de GSC propio para la query: hipótesis basada en la SERP, como #4 y #25. | Indexación en 1–2 días (como #4 y #25, que entraron por el link desde el hub). Impresiones para "cobrar cursos online", "acceso automático", "Mercado Pago webhook curso" y "transferencia acreditación automática". Que los motores de IA citen el 16 de 205 y los 358 duplicados. | Estado en URL Inspection; impresiones, queries y posición de las 2 URLs (28 d); web search de "cómo cobrar cursos online con Mercado Pago y dar acceso automático". | 2026-11-03 |
| 33 | `/plataformas-educativas/` + `/en/education-platforms/` | Una oración con link contextual al final de "El pago lo confirma el proveedor". La sección de páginas relacionadas suma sola la página nueva (también en migración y protección). `updated: 2026-10-20` en el hub, porque cambia su contenido. | El mismo patrón que #5, que hizo indexar protección en 1 día. El hub EN no se rastrea desde el 09-29, y el `lastmod` nuevo es la palanca que funcionó con los índices (#20). | La página nueva se descubre rápido y el hub EN se vuelve a rastrear. El hub no debería moverse de pos ~5. | Último rastreo del hub ES/EN y de las 2 URLs nuevas; posición del hub. | 2026-11-03 |

La AR no se creó: no tiene páginas de plataformas y está en noindex.

### Envíos
- Deploy por push a `main` (commit `90ef42a`, run 39420202805, ok). IndexNow desde CI: `200 for 46 URLs`.
- Verificado en producción: las 2 páginas responden 200 con canonical self, hreflang es/en/x-default y JSON-LD válido. El hub y migración ya enlazan a la página nueva. El crawl posterior da 46 URLs en el sitemap, 47 destinos internos y 0 rotos. `astro check`: 0 errores.
- Sitemap reenviado a GSC (12:11). URL Inspection de las 2 URLs nuevas: "URL is unknown to Google", lo esperable a minutos del deploy.

### Pendientes / hipótesis para próximas corridas
- **10-21**: índice del blog (#7, #16).
- **10-22**: nota de costo (#8, #10) y bloques de notas en los casos de uso (#9). Si la nota EN sigue en pos 4–5, no tocar nada. Corregir el title EN de 77 caracteres solo si el CTR sigue en 0 con más impresiones.
- **10-23**: hojas sin rastreo (evaluar tutor, casos de uso tutor, búsqueda semántica, generación de evaluaciones, migración EN, SIED ES). Si siguen igual, sumarles links desde páginas que se rastrean seguido.
- **10-30** (revisión del bloque de aprendizajes de casos, #29): sumar `cobros-y-acceso` a `guides` de Apoyo Escolar RV y Lu Apuntes. Hoy no se hizo para no tocar los casos por tercera vez en 5 días.
- La evidencia de pagos todavía da para más: el motor de vencimientos y el registro de auditoría. No escribir otra página del tema hasta ver si la #32 recibe impresiones.
- Para el dueño, siguen abiertos: Bing Webmaster Tools, `sameAs` con perfiles reales, autor con nombre para E-E-A-T y el commit `6ce459f` con atribución. **Los montos de comisión de Hotmart en el pilar** (9,9 % + USD 0,50; ejemplo de USD 12.480 por año) siguen ahí. La regla de "ningún monto en moneda" del 10-09 choca con eso, y hace falta la decisión del dueño.
- No tocar blog index (10-21), nota de costo y bloques de notas (10-22), "Otros casos" (10-26), notas, evals y corrección asistida (10-28), nota de corrección y generación de evaluaciones (10-29), bloque de aprendizajes de casos (10-30), metas de casos (11-02) ni cobros y acceso con el hub (11-03).

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
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 12 (10-20) | 09-22 → 10-19 | 6 | 103 | 8,5 |

---

## 2026-10-21 — Corrida 13

### Métricas generales (GSC, datos hasta 2026-10-20)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-23 → 10-20) | 8 | 107 | 7,5 % | 8,8 |
| Últimos 7 d (10-14 → 10-20) | 3 | 34 | 8,8 % | ~7,1 |
| 7 d anteriores (10-07 → 10-13) | 2 | 24 | 8,3 % | ~5,7 |

- El 10-20 es el mejor día desde el pivot: 9 impresiones y 2 clics (los dos en `/`, pos 1, de marca). La semana suma 34 impresiones, un 40 % más que la anterior. La posición media empeora porque entran impresiones de la nota de corrección EN en pos 21–43 para "automatic grading", que es un término genérico.
- **Corrección automática EN (#25) es la nota que más crece**: 6 imp en 5 días, y el 10-20 sumó 3 en pos 5,3. Query visible: "automatic grading" en pos 43.
- **Cobros y acceso (#32) tuvo su primera impresión el mismo día que se publicó** (10-20, pos 2).
- Nota de costo EN: 12 imp en pos 7,1 en 28 d. "how much does it cost to add ai tutoring to our university?" tiene 6 imp en pos 7,7.
- Por país (28 d): Argentina desktop tiene 14 imp y 6 de los 8 clics. Le siguen Colombia desktop (9, pos 4,7), Argentina mobile (5, 1 clic), Brasil (5) y España (4).

### Indexación
- URL Inspection (20 URLs): todas "Submitted and indexed", con Breadcrumbs válidos.
- **Cobros y acceso ES/EN se indexó el mismo día del deploy** (rastreada el 10-20). Es la tercera página del cluster que entra en ≤1 día por el link desde el hub.
- Rastreos nuevos: los casos de uso **tutor de IA y búsqueda semántica el 10-21** (antes 09-26 y 09-22; ya con el bloque de notas #9) y Dr. La Rosa ES el 10-21.
- Siguen sin rastreo nuevo: SIED ES (09-16), evaluar tutor (09-16), generación de evaluaciones (09-25), hub EN (09-29), migración EN y Dr. La Rosa EN (09-30), evals ES (10-01) y protección ES (10-07).

### Evaluación de cambios anteriores (revisión 10-21)
- **#7/#16, índice del blog: no concluyente, se mantiene.** Antes del cambio (09-10 → 10-07) `/blog/` tuvo 6 imp en pos 2–9 y `/en/blog/` 5 en pos 2–6. Después (10-08 → 10-20) `/blog/` tuvo 1 imp (pos 4) y `/en/blog/` 5 (pos 4–7,5). En los dos períodos hubo 0 clics. Con 1–5 impresiones por período no se puede medir CTR. El title nuevo describe lo que hay en el índice y está alineado con la entidad, así que no hay motivo para revertirlo. Los índices se rastrearon el 10-17 y el 10-18.
- **#6, logos locales: funcionó, se consolida.** La home pesa 36 KB de HTML y los 4 logos se sirven desde `/clients/` (entre 0,6 y 41 KB). Ningún HTML referencia `uselearnbase`.
- Bing (#1): el web search de la sesión sigue sin devolver la marca (Racelogic, Vantage Logistics, Vanteon). En el índice de Bing (DuckDuckGo) aparece desde el 10-14.

### Auditoría técnica (crawl de producción)
- 46/46 URLs del sitemap con 200, canonical self, un H1 y JSON-LD que parsea. 47 destinos de links internos, 0 rotos ni redirigidos. robots.txt sigue permitiendo los crawlers de IA y llms.txt ya incluye cobros y acceso.
- **Las páginas con menos links entrantes del sitio son cobros y acceso ES/EN: 3 páginas de origen cada una** (el hub, migración y protección). Migración y protección están en el footer de las 46 URLs y cobros no.

### GEO / SERP
- "cómo cobrar cursos online con Mercado Pago y dar acceso automático": siguen la ayuda de Tiendanube, 4 páginas programáticas de openeducat, yo-facturo y global66. La respuesta generada dice que "los detalles de cómo configurar el acceso automático requerirían información adicional". Es justo lo que cubre la página #32, que tiene 1 día.
- "automatic quiz grading with AI real case": todo son papers (GAOKAO-Eval, Grade Guard, Texas A&M con GPT-4o, Fobizz). No aparece ningún caso en producción. La nota #25 ya aparece en Google en pos 5 en algunos días.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 34 | Footer de todo el sitio (ES/EN; AR no tiene páginas de plataformas) | Link "Cobrar y dar acceso" / "Payments and access" a la guía de cobros, en la columna Estudio, después de "Proteger tus cursos". No cambia el contenido de ninguna página, así que no se toca ningún `updated`. | Cobros y acceso ES/EN tiene 3 páginas de origen, el mínimo del sitio. Tuvo impresión en pos 2 el día que se publicó. Migración y protección ya están en el footer. | La guía pasa de 3 a 46 páginas de origen y se consolida como parte del cluster. El #18 no aceleró el rastreo de protección, pero esta página ya está indexada y lo que se busca es autoridad interna, no descubrimiento. | Impresiones y posición de las 2 URLs de cobros (28 d). | 2026-11-03 (junto con #32) |

No se hizo nada más a propósito. El resto de las páginas con señal está bloqueado hasta su revisión: la nota de corrección hasta el 10-29, la nota de costo hasta el 10-22, los casos hasta el 10-26/10-30/11-02 y el hub y cobros hasta el 11-03. Busqué evidencia nueva en el repo de Apoyo Escolar RV para otra guía (foro por módulo, gamificación, portal del curso), pero son planes sin implementar ni medir, así que no alcanzan para una página con datos propios.

### Envíos
- Deploy por push a `main` (commit `96a93de`, ok). IndexNow desde CI: `200 for 46 URLs`.
- Verificado en producción: el link a cobros aparece en el footer de `/blog/`. `astro check` sin errores.
- Sitemap reenviado a GSC (12:05).

### Pendientes / hipótesis para próximas corridas
- **10-22**: nota de costo (#8, #10) y bloques de notas en casos de uso (#9). Tutor de IA y búsqueda semántica se rastrearon el 10-21 con el bloque, así que el efecto se puede empezar a ver desde el 10-24. Si la nota EN se sostiene en pos 4–7, no tocar nada. El title EN de 77 caracteres se corrige solo si el CTR sigue en 0 con más impresiones.
- **10-23**: hojas sin rastreo (SIED ES, evaluar tutor, generación de evaluaciones, hub EN, migración EN, Dr. La Rosa EN).
- **10-29**: si la nota de corrección EN sigue sumando impresiones en "automatic grading", evaluar si conviene darle más peso al ángulo "AI grading" en EN (title, H2) sin perder la intención de caso real.
- Para el dueño, siguen abiertos: Bing Webmaster Tools, `sameAs` con perfiles reales, autor con nombre para E-E-A-T, el commit `6ce459f` con atribución y **los montos de comisión de Hotmart en el pilar** (9,9 % + USD 0,50; USD 12.480 por año), que chocan con la regla de ningún monto en moneda.
- No tocar la nota de costo y los bloques de notas (10-22), "Otros casos" (10-26), las notas, evals y corrección asistida (10-28), la nota de corrección y generación de evaluaciones (10-29), el bloque de aprendizajes de casos (10-30), las metas de casos (11-02) ni cobros, el hub y el footer de cobros (11-03).

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
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 12 (10-20) | 09-22 → 10-19 | 6 | 103 | 8,5 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |

---

## 2026-10-22 — Corrida 14

### Métricas generales (GSC, datos hasta 2026-10-21)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-24 → 10-21) | 7 | 100 | 7 % | ~9,8 |
| Últimos 7 d (10-15 → 10-21) | 3 | 38 | 7,9 % | ~8,4 |
| 7 d anteriores (10-08 → 10-14) | 2 | 23 | 8,7 % | ~5,8 |

- **La semana tuvo 38 impresiones, un 65 % más que la anterior** y la mejor desde el pivot. La posición media empeora porque entran impresiones genéricas de la nota de corrección EN ("automatic grading", pos 43–48 los días 10-19 y 10-21). Sin esas, la semana queda en pos ~6.
- La ventana de 28 d pierde el 09-23 (1 clic), por eso baja de 8 a 7 clics aunque la semana creció.
- Por página (28 d): `/en/` 17 imp y 2 clics; nota de costo EN 11 imp en pos 6,8; hub 9 imp en pos 4,6; `/` 8 imp y 4 clics; corrección EN 7 imp en pos 19,1; protección ES 6 imp en pos 2,5 con 1 clic; migración ES 6 en pos 5,5.
- Queries visibles: las mismas de siempre. "how much does it cost to add ai tutoring to our university?" tiene 6 imp en pos 7,7 en 28 d, y **el 10-17 apareció en pos 1**.

### Indexación
- URL Inspection (30 URLs): todas las del sitemap "Submitted and indexed" con Breadcrumbs válidos.
- Rastreos nuevos: tutor de IA y búsqueda semántica ES el 10-21, cobros ES/EN el 10-20, `/en/` el 10-20, tutor o búsqueda y RAG ES el 10-19, evaluar tutor EN el 10-17.
- Sin rastreo desde cambios que Google todavía no vio: SIED ES (09-16; títulos #3, meta #30, "Otros casos" #31), evaluar tutor ES (09-16; bloque #21), generación de evaluaciones ES (09-25; #26), hub EN (09-29; #33), migración EN y Dr. La Rosa EN (09-30), evals ES (10-01; **la reorientación a educación #22 sigue sin llegar al índice**), tutor de IA EN (10-06; #9) y protección ES (10-07).
- Notas borradas (#13–#15): `cuanto-cuesta-automatizar` y la nota inmobiliaria EN ya figuran como "Page with redirect". `n8n-make-o-agente-a-medida` sigue "Submitted and indexed" con último rastreo 09-29 (antes del 301 del 10-09), y tuvo 1 imp el 10-08. Se va a resolver sola cuando Google la vuelva a rastrear. El 301 responde bien.

### Evaluación de cambios anteriores (revisión 10-22)
- **#8/#10, nota de costo: funcionó, se consolida.** Google la rastreó el 10-16 (ES y EN). Antes del rastreo la EN tenía 6 imp en pos 5–10 (promedio ~8,3). Después tuvo 5 imp en pos 4–6 (promedio ~4,9), y la query de universidad salió en pos 1 el 10-17. Sacar los montos (#10) no le hizo perder posición: el método, los supuestos y la proporción de 126 veces alcanzaron. La SERP de la query sigue siendo ibl.ai, quadc y liveinthefuture con montos en dólares, que nosotros no vamos a publicar.
- **Title EN de 77 caracteres: no se toca.** Tiene 0 clics, pero son 5 impresiones desde que mejoró la posición, y con eso no se puede medir CTR. Cambiar el title ahora mezclaría dos variables justo cuando la página está subiendo. Se vuelve a mirar el 11-05.
- **#9, bloques de notas en los casos de uso: no concluyente, se mantiene.** Tutor de IA y búsqueda semántica ES se rastrearon con el bloque recién el 10-21. Las notas que enlazan ya se habían rastreado por la home (#17). No hay forma de separar el efecto y no cuesta nada dejarlo.

### Auditoría técnica (crawl de producción)
- 46/46 URLs con 200, canonical self, un H1, JSON-LD que parsea, 0 links internos rotos. robots.txt y llms.txt sin cambios.
- **La nota de costo era la menos enlazada del sitio entre las notas: 5 páginas de origen por idioma, y ninguna era otra nota.** El bloque "Notas relacionadas" muestra 3 notas: elige primero las de la misma industria (las 6 lo son) y después las del mismo cluster, y desempata por fecha de publicación. La nota de costo es la única del cluster `costos` y es de las más viejas, así que no salía en el bloque de ninguna otra nota. Encima, ninguna nota la enlazaba en el texto. Es la única página con una query no de marca que llegó a pos 1.
- Cuatro notas por idioma no tienen ningún link en el cuerpo del texto (costo, evaluar tutor, RAG, tutor o búsqueda).

### GEO / SERP
- "how much does it cost to add AI tutoring to a university per student": ibl.ai (3 notas), quadc, liveinthefuture y getmonetizely, todos con montos por alumno. No cambió desde el 10-19.
- "cuánto cuesta un tutor de IA por alumno": no hay ningún resultado en español que responda la pregunta. Aparecen vendedores de tutores en inglés, TechCrunch y un hackathon. La respuesta generada dice que "no hay detalles de precios". Nuestra nota ES responde exactamente esto, pero tiene 1 impresión en 28 d. Falta autoridad, no contenido.
- "vantalogics" en el web search de la sesión: sigue sin devolver el sitio.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 35 | Las 6 notas ES/EN y las 5 AR (`getRelated` en `src/lib/blog.ts`) | "Notas relacionadas" muestra 4 notas en vez de 3. No cambia el criterio de orden. La grilla es de 2 columnas, así que pasa de una fila de 2 más una tarjeta suelta a 2×2. Ninguna nota pierde links. La de costo pasa de 0 a 2 notas que la enlazan en cada idioma (corrección y tutor o búsqueda). No se toca ningún `updated`, porque no cambia el texto de ninguna nota (mismo criterio que #21). | La nota de costo EN llegó a pos 1 en su query el 10-17, pero tenía 5 páginas de origen y ninguna era otra nota. | Más autoridad interna para la única página que rankea por una query no de marca. Ayuda a sostener el top 5 y a subir la ES, que hoy tiene 1 impresión. | Posición e impresiones de la nota de costo ES/EN y de la query de universidad (28 d). | 2026-11-05 |
| 36 | `/blog/tutor-de-ia-o-busqueda-semantica/` + `/en/blog/ai-tutor-or-semantic-search/` | Link contextual en el tercer argumento ("de eso depende todo el **cálculo de costo por alumno**"), hacia la nota de costo. Es la oración donde la nota ya hablaba del costo. Sin `updated`, porque es un link, no contenido nuevo (mismo criterio que #5). AR no se tocó (noindex). | Igual que #35. Un link dentro del texto, con anchor descriptivo, pesa más que una tarjeta. La nota de tutor o búsqueda se rastrea seguido (última vez el 10-19). | Igual que #35. Se mezcla con #35 a propósito: con 1–2 impresiones por día no se pueden separar los efectos. | Igual que #35. | 2026-11-05 |

No se tocó la nota de costo: está subiendo y no hay que pisar el cambio.

### Envíos
- Deploy por push a `main` (commit `55c3f3f`, ok). IndexNow desde CI: `200 for 46 URLs`.
- Verificado en producción: tutor o búsqueda ES/EN enlaza 2 veces a la nota de costo (texto + tarjeta) y corrección ES una vez (tarjeta). `astro check` sin errores; el crawl previo dio 46/46 con 200 y 0 links rotos.
- Sitemap reenviado a GSC (12:06).

### Pendientes / hipótesis para próximas corridas
- **10-23**: hojas sin rastreo con cambios que Google no vio (lista en Indexación). La prioridad es evals ES (#22) y SIED ES (#3/#30/#31). Si siguen igual, sumarles links desde las páginas que Google rastrea seguido (casos de uso tutor/búsqueda ES, migración ES, tutor o búsqueda y RAG ES, `/en/`). Las notas borradas (#13–#15) se revisan el mismo día; solo falta n8n.
- **10-29**: nota de corrección EN. "automatic grading" sigue en pos 43–48 y tira para abajo la posición media. Si no se acerca a la página 1, no perseguir el término genérico.
- **11-05**: nota de costo (title EN de 77 caracteres, CTR) y los cambios #35/#36.
- Para el dueño, siguen abiertos: Bing Webmaster Tools, `sameAs` con perfiles reales, autor con nombre para E-E-A-T, el commit `6ce459f` con atribución y los montos de comisión de Hotmart en el pilar.
- No tocar: "Otros casos" (10-26), notas, evals y corrección asistida (10-28), nota de corrección y generación de evaluaciones (10-29), aprendizajes de casos (10-30), metas de casos (11-02), cobros, hub y footer de cobros (11-03), ni la nota de costo y las notas relacionadas (11-05).

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
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 12 (10-20) | 09-22 → 10-19 | 6 | 103 | 8,5 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 14 (10-22) | 09-24 → 10-21 | 7 | 100 | ~9,8 |

---

## 2026-10-23 — Corrida 15

### Métricas generales (GSC, datos hasta 2026-10-22)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-25 → 10-22) | 7 | 108 | 6,5 % | 10,0 |
| Últimos 7 d (10-16 → 10-22) | 3 | 40 | 7,5 % | ~9,7 |
| 7 d anteriores (10-09 → 10-15) | 2 | 24 | 8,3 % | ~5,5 |

- **Segunda semana seguida de récord: 40 impresiones, un 67 % más que la anterior.** El 10-22 sumó 8. La posición media empeora por el mismo motivo que ayer: entran impresiones de páginas nuevas en posiciones bajas, como "automatic grading" (pos 45–48) y protección ES en pos 30 el 10-22.
- Nota de costo EN: 14 imp en 28 d, pos 7,7. En 7 d pasó de 2 a 8 imp, pero el 10-22 salió 3 veces en pos 11, cuando el promedio venía en 4–6. Es un solo día. Se revisa el 11-05, como estaba previsto.
- Corrección automática ES: el 10-22 tuvo 2 imp en pos 9, el mismo día que Google la volvió a rastrear. La EN suma 7 imp en pos 19,1.
- Queries visibles: las mismas 7. "how much does it cost to add ai tutoring to our university?" sigue con 6 imp en pos 7,7, y "apoyo escolar rv" con 5 imp en pos 16,6.
- Los casos suman 20 de las 108 impresiones (18 %) y 0 clics: Apoyo Escolar RV 6, Dr. La Rosa ES 4 y EN 2, Lu Apuntes ES 4 y EN 1, SIED ES 3 y EN 1.
- Por país (28 d): Argentina desktop tiene 15 imp y 5 clics (pos 6,1). Le siguen Colombia desktop (7, pos 4,9), Brasil (5), España desktop y mobile (4 + 4) y Argentina mobile (4, 1 clic).

### Indexación
- URL Inspection (32 URLs): todas las del sitemap siguen "Submitted and indexed" con Breadcrumbs válidos.
- Rastreos nuevos: generación de evaluaciones ES y corrección automática ES el 10-22, Dr. La Rosa ES el 10-21 y SIED EN el 10-20.
- **Siguen sin rastreo nuevo:** corrección asistida ES (**08-18**, la más vieja del sitio), SIED ES y evaluar tutor ES (09-16), evals EN (09-27), hub EN (09-29), migración EN y Dr. La Rosa EN (09-30), evals ES (10-01), generación de evaluaciones EN (10-02), tutor de IA EN (10-06) y protección ES (10-07) y EN (10-06).
- n8n (#13): sigue "Submitted and indexed" con último rastreo 09-29 y 1 imp el 10-08. El 301 a `/blog/` responde bien. La nota inmobiliaria EN figura "Page with redirect" (rastreada el 10-17).

### Evaluación de cambios anteriores (revisión 10-23)
- **Hojas sin rastreo: más links internos no las destraban.** Conté las páginas de origen en producción. Todas tienen entre 6 y 12, y las enlazan páginas que Google rastreó esta semana: la nota de corrección ES (10-22) enlaza a evals ES y a corrección asistida ES, y Dr. La Rosa ES (10-21) enlaza a SIED ES. El hub EN tiene 23 páginas de origen (está en el footer) y tampoco se rastrea desde el 09-29. El cuello es la demanda de rastreo de un dominio chico y nuevo. Más enlazado interno sería ruido. **No se suman links a las hojas.** La palanca que queda es autoridad externa (Bing Webmaster Tools, perfiles y menciones), que depende del dueño.
- **#13–#15 notas borradas: funcionó.** Costo de automatización, la nota inmobiliaria EN y agentes en producción ya figuran "Page with redirect". n8n se va a resolver sola en el próximo rastreo: no tiene sentido tocarla.

### Auditoría técnica (crawl de producción antes del cambio)
- 46/46 URLs con 200, canonical self, un H1 y JSON-LD que parsea. 0 links internos rotos.
- **`/casos/` y `/en/cases/` daban 404.** El breadcrumb visible de cada caso decía "Casos" y llevaba a `/#casos`, y el BreadcrumbList saltaba de Vantalogics al cliente. No había ninguna página que juntara los cuatro casos, cuando son el 18 % de las impresiones.
- **Lu Apuntes EN mostraba "1.147 pages"** con el separador de miles del español.

### GEO / SERP
- "casos de éxito plataforma educativa a medida academia online Latinoamérica": un PDF de beecrowd, una presentación de Zalvadora, notas de prensa sobre Platzi y un informe del BID. Nadie presenta casos de academias con cifras comparables una al lado de la otra.
- "custom online academy platform case study migrated from Hotmart students results": un caso de Academy of Mine (ahorro de costos, sin cifras de alumnos), FreshLearn y comparadores. La respuesta generada dice que "no hay un caso de migración de Hotmart a una plataforma propia con resultados de alumnos".
- "vantalogics" en el web search de la sesión sigue sin devolver el sitio.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 37 | `/casos/` + `/en/cases/` (nuevas). También el breadcrumb y el footer de todo el sitio | Índice de casos, answer-first: "Vantalogics tiene 4 plataformas educativas a medida en producción, con más de 24.000 estudiantes en total: …" con cada caso, su cantidad de alumnos y qué es. Después vienen las tarjetas de los 4 casos, la tabla "Los casos, uno al lado del otro" (caso, estudiantes y alcance) y "Qué resolvimos en cada caso": un párrafo por caso (campo nuevo `highlight` en `src/data/cases.ts`, con datos ya publicados en las guías y notas, sin cifras nuevas) y sus guías y notas. Schema `CollectionPage` + `ItemList` que apunta al `#case-study` de cada caso + `BreadcrumbList`. El BreadcrumbList de los 8 casos pasa a tres niveles (Vantalogics › Casos › cliente). El breadcrumb visible, el link "Ver todos los casos" y "Casos" en el footer ahora llevan al índice, no a `/#casos`. La resolución de guías y notas de cada caso pasó a `src/lib/cases.ts`, sin cambiar el HTML de los casos. llms.txt suma el índice y el `highlight` de cada caso. Sitemap: 48 URLs. Sin `updated` nuevo en los casos. AR no tiene índice (noindex) y su breadcrumb sigue igual. | Los casos son el 18 % de las impresiones (20 de 108) y tienen 0 clics. La URL madre daba 404. En la SERP de casos no hay ninguna página que compare casos de academias con cifras. | El índice se indexa en 1–3 días, como las páginas del cluster de plataformas que se enlazan desde el footer. Recibe impresiones para búsquedas de casos y portfolio ("casos plataformas educativas", "custom education platform case studies"). Los motores de IA tienen una sola página citable con los 4 casos y sus cifras. | Estado en URL Inspection; impresiones y queries de las 2 URLs (28 d); que el snippet de los casos muestre "Casos" en el breadcrumb; impresiones de los 8 casos. | 2026-11-06 |
| 38 | `/en/cases/lu-apuntes/` y `/en/cases/` | "1.147 pages" → "1,147 pages" (el valor de la métrica ahora se traduce). | Era un error de formato en la versión EN. | Ninguna sobre tráfico. Es una corrección. | — | — |

No se tocó ninguna página bloqueada. El texto de los casos no cambió (salvo el #38), así que no se mezcla con "Otros casos" (#31, 10-26), los aprendizajes (#29, 10-30) ni las metas (#30, 11-02).

### Envíos
- Deploy por push a `main` (commit `384902a`, run 39951452749, ok). IndexNow desde CI: `200 for 48 URLs`.
- Antes del push se verificó el build local: 48/48 URLs con 200, canonical self, un H1, JSON-LD válido, 57 destinos internos y 0 rotos. `astro check` sin errores. `bun run lint` tiene los mismos 5 errores que antes, en `agent/` y `ui/`, ningún archivo tocado hoy. La página se revisó renderizada en desktop y mobile (en mobile la tabla scrollea horizontal, igual que las demás del sitio).
- Verificado en producción: `/casos/` y `/en/cases/` responden 200, SIED tiene el BreadcrumbList de tres niveles, el footer de `/blog/` enlaza a `/casos/` y llms.txt incluye el índice.
- Sitemap reenviado a GSC (12:12). URL Inspection de las 2 URLs nuevas: "URL is unknown to Google", lo esperable a minutos del deploy.

### Pendientes / hipótesis para próximas corridas
- **10-24/10-25**: ver si el índice de casos se indexó. Si después de 3 días sigue "unknown", es otra señal de que el problema es la demanda de rastreo y no la estructura.
- **10-26**: "Otros casos" (#31). Con el índice publicado, el criterio pasa a ser si SIED ES se rastrea. Ya no hace falta sumarle más links.
- **10-29**: nota de corrección EN. Si "automatic grading" no se acerca a la página 1, no perseguir el término genérico.
- **10-30**: sumar `cobros-y-acceso` a `guides` de Apoyo Escolar RV y Lu Apuntes. Va a aparecer también en el índice de casos.
- **11-05**: nota de costo (title EN de 77 caracteres, CTR, la caída a pos 11 del 10-22) y los cambios #35/#36.
- **Para el dueño (es la palanca que queda para el rastreo):** dar de alta Bing Webmaster Tools, sumar a `sameAs` perfiles reales (LinkedIn de la empresa, perfil del fundador) y conseguir menciones o links desde los sitios de los clientes (por ejemplo, un "desarrollado por Vantalogics" en el footer de las 4 plataformas). Siguen abiertos el autor con nombre para E-E-A-T, el commit `6ce459f` con atribución y los montos de comisión de Hotmart en el pilar.
- No tocar: "Otros casos" (10-26), notas, evals y corrección asistida (10-28), nota de corrección y generación de evaluaciones (10-29), aprendizajes de casos (10-30), metas de casos (11-02), cobros, hub y footer de cobros (11-03), nota de costo y notas relacionadas (11-05) ni el índice de casos (11-06).

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
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 12 (10-20) | 09-22 → 10-19 | 6 | 103 | 8,5 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 14 (10-22) | 09-24 → 10-21 | 7 | 100 | ~9,8 |
| 15 (10-23) | 09-25 → 10-22 | 7 | 108 | 10,0 |

---

## 2026-10-26 — Corrida 16

### Métricas generales (GSC, datos hasta 2026-10-25)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-28 → 10-25) | 6 | 119 | 5 % | 9,3 |
| Últimos 7 d (10-19 → 10-25) | 2 | 48 | 4,2 % | 9,7 |
| 7 d anteriores (10-12 → 10-18) | 2 | 28 | 7,1 % | 6,6 |

- **Tercera semana seguida de récord: 48 impresiones, un 71 % más que la anterior.** Es también el máximo de 28 d (119). La posición media empeora por lo mismo que en las corridas 14 y 15: entran páginas nuevas en posiciones bajas ("automatic grading" en pos 43–48 y protección ES en pos 30 el 10-22).
- **Corrección automática ES es la página que más sube.** Tuvo 7 impresiones en 4 días (10-22 → 10-25), en pos 8,7–11, desde el rastreo del 10-22. Está en la parte de abajo de la página 1, pero bloqueada hasta el 10-29.
- Nota de costo EN: 14 imp en pos 6,9 en 28 d. El 10-25 tuvo 2 imp en pos 2. La caída a pos 11 del 10-22 fue un solo día. Queda bloqueada hasta el 11-05.
- Migración ES: 9 imp en pos 6,7, con 5 días seguidos de impresiones en pos 1–11. La EN suma 6 en pos 6,2 y el 10-25 salió en pos 1. Son 15 impresiones sin clics: con ese volumen, el CTR todavía no dice nada.
- Queries visibles (9): "apoyo escolar rv" tiene 8 imp en pos 17,1 hacia el caso ES. Es la marca del cliente y su propio sitio va primero, así que no se persigue. La de universidad sigue con 6 imp en pos 6,2.
- Por país (28 d vs 28 d anteriores): Argentina desktop pasa de 4 a 20 imp y de 2 a 5 clics, y su posición mejora de 25,5 a 8,1. España mobile tiene 4 imp en pos 5,5 y antes no tenía ninguna.

### Indexación
- URL Inspection (20 URLs): todas "Submitted and indexed" con Breadcrumbs válidos.
- **El índice de casos (#37) se indexó el mismo día que se publicó.** `/casos/` y `/en/cases/` figuran rastreadas el 10-23. Es la página que más rápido entró de todo el sitio.
- Casos: Apoyo Escolar RV ES 10-22 y EN 10-21, Lu Apuntes ES 10-20 y EN 10-23, Dr. La Rosa ES 10-21 y SIED EN 10-20. **SIED ES sigue en 09-16.** La inspección detallada no muestra nada raro: canonical de Google = el declarado, fetch ok, robots ok. Como única página de referencia muestra el hub.
- Sin rastreo nuevo desde la corrida 15: corrección asistida ES (08-18), hub EN (09-29), evals ES (10-01) y Dr. La Rosa EN (09-30). n8n sigue indexada con el rastreo del 09-29, y el 301 responde bien.

### Evaluación de cambios anteriores
- **#31 "Otros casos" (revisión 10-26): funcionó a medias y se consolida sin cambios.** En la semana siguiente se volvieron a rastrear 7 de los 8 casos: Dr. La Rosa ES por primera vez desde el cambio (10-21), los dos de Apoyo Escolar RV, los dos de Lu Apuntes y SIED EN. El que quedó afuera es SIED ES, justo el que buscaba destrabar. Los 8 casos sumaron 22 impresiones en 28 d (antes 20). No se le suman más links a SIED ES: ya la enlazan el índice de casos, los otros 3 casos y el hub, y el criterio del 10-23 era que el cuello está en la demanda de rastreo.
- **#37 índice de casos:** se indexó en 0 días. No tiene impresiones todavía. La revisión sigue en el 11-06.

### Auditoría técnica (crawl de producción)
- 48/48 URLs con 200, canonical self, un H1 y JSON-LD que parsea. 57 destinos internos, 0 rotos y 0 redirigidos. robots.txt sin cambios (permite los 8 bots de IA). llms.txt responde 200 e incluye los casos.
- Detalle conocido sin tocar: el title de Apoyo Escolar RV ES tiene 84 caracteres. Los títulos de los casos no cambian mientras corran el #29 y el #30.

### GEO / Bing
- **Bing ya indexa el sitio, pero solo una foto vieja.** Por primera vez desde el 10-05, `site:vantalogics.com` en DuckDuckGo (usa el índice de Bing) devuelve 10 URLs: `/`, `/en/`, `/soluciones/`, `/en/solutions/`, la solución EdTech EN, los 4 casos de uso EN, `/en/blog/` y Lu Apuntes EN. Los títulos tienen el formato viejo ("— Vantalogics"), y el índice del blog EN muestra la descripción anterior al pivot ("AI automation projects"). **No figura ninguna página del cluster de plataformas, ninguna nota ni el índice de casos.** El buscador de la sesión tampoco encuentra la guía de migración para "cómo migrar una academia online de Hotmart a plataforma propia". Su respuesta dice que nadie explica cómo exportar alumnos y accesos, que es justo lo que cubre nuestra guía.
- **Causa probable (inferida):** cada deploy le mandaba a IndexNow las 48 URLs, cambiaran o no. Eso pasaba unas 2 veces por día, porque el commit del log también desplegaba: alrededor de 40 envíos completos desde el 10-05, casi todos de URLs sin cambios. La guía de IndexNow pide avisar solo URLs agregadas, cambiadas o borradas.
- "corrección automática de cuestionarios con IA en una academia online": tesis y material docente (CATEDU, UB, Ecuador). La respuesta generada cierra con "si necesitás casos de academias privadas, esta búsqueda no los cubrió". Es el hueco que llena nuestra nota, pero solo si Bing la indexa.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 39 | Todo el sitio (CI: `scripts/indexnow.mjs`, `.github/workflows/deploy.yml`) | Antes del deploy, CI baja el sitemap en producción. Después compara `<loc>` + `<lastmod>` con el del build y le avisa a IndexNow solo las URLs nuevas, las que cambiaron de `lastmod` y las borradas. Si no hay sitemap anterior, manda todas, como antes. Si nada cambió, no manda nada. Además, un push que solo toca `SEO_LOG.md` ya no dispara un deploy (`paths-ignore`). Probado en local (1 cambio → 1 URL; una URL borrada → se avisa; sin archivo anterior → 48) y en CI: "no URL changed, nothing sent". | Bing indexó 10 URLs de una foto vieja y ninguna de las páginas que más impresiones tienen en Google (cluster de plataformas, notas, casos), después de ~40 envíos completos de 46–48 URLs. ChatGPT search y Copilot dependen de ese índice. | Cada aviso a Bing pasa a ser una señal real de cambio. En 2–4 semanas, Bing indexa las páginas nuevas o actualizadas que se publiquen de acá en adelante, y refresca los títulos viejos cuando esas URLs cambien. | `site:vantalogics.com` vía DuckDuckGo (cantidad de URLs, si aparecen plataformas o notas, títulos actualizados); salida del paso IndexNow en cada deploy. | 2026-11-09 |

No se tocó contenido: todas las páginas con señal están bloqueadas por revisiones en curso, y la única libre con impresiones (migración) entró en página 1 hace una semana.

### Envíos
- Deploy por push a `main` (commit `18a793b`, run 40319883582, ok). IndexNow: "no URL changed, nothing sent", lo correcto porque no cambió ninguna página. El sitemap no se reenvió, por el mismo motivo.

### Pendientes / hipótesis para próximas corridas
- **10-28**: notas, evals y corrección asistida (#21–#23, #27).
- **10-29**: nota de corrección EN ("automatic grading" sigue en pos 43–48, así que no conviene perseguirla) y **corrección ES, la que más sube** (pos 9–11). Si se sostiene en página 1, es la candidata a recibir un link contextual desde la nota de evals o desde corrección asistida.
- **Migración (sin bloqueo, sin tocar desde el 09-23):** si sigue en pos 5–7 con más de 25 impresiones y 0 clics al 11-02, probar el title y la meta. Hueco de contenido posible: la migración por etapas (seguir vendiendo en la plataforma anterior mientras la nueva entrega el acceso), que las respuestas generadas mencionan y nuestra guía solo trata en el paso 7. Solo con evidencia del caso, sin recomendar quedarse en Hotmart.
- **11-09**: Bing (#39). Si a esa fecha sigue sin aparecer ninguna página del cluster, la palanca que queda es Bing Webmaster Tools (lo tiene que hacer el dueño), con envío manual de URLs y del sitemap.
- Para el dueño, siguen abiertos: Bing Webmaster Tools, `sameAs` con perfiles reales, autor con nombre, links desde los sitios de los clientes, el commit `6ce459f` con atribución y los montos de comisión de Hotmart en el pilar.
- No tocar: notas, evals y corrección asistida (10-28), nota de corrección y generación de evaluaciones (10-29), aprendizajes de casos (10-30), metas de casos (11-02), cobros, hub y footer de cobros (11-03), nota de costo y notas relacionadas (11-05), índice de casos (11-06) ni IndexNow (11-09).

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 14 (10-22) | 09-24 → 10-21 | 7 | 100 | ~9,8 |
| 15 (10-23) | 09-25 → 10-22 | 7 | 108 | 10,0 |
| 16 (10-26) | 09-28 → 10-25 | 6 | 119 | 9,3 |

---

## 2026-10-27 — Corrida 17

### Métricas generales (GSC, datos hasta 2026-10-26)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-29 → 10-26) | 7 | 125 | 5,6 % | ~9,2 |
| Últimos 7 d (10-20 → 10-26) | 3 | 49 | 6,1 % | ~9,1 |
| 7 d anteriores (10-13 → 10-19) | 2 | 32 | 6,3 % | ~7,5 |

- **Cuarta semana seguida de récord: 49 impresiones, un 53 % más que la anterior.** Los 28 d también son máximo (125). La posición sigue en ~9 por el mismo motivo que en las corridas 14 a 16: entran páginas nuevas en posiciones bajas ("automatic grading" en pos 45, el caso Apoyo Escolar RV en pos 15–22 por la marca del cliente).
- **Segundo clic no de marca del sitio: migración ES el 10-26, en pos 4.** La guía suma 10 imp en pos 6,4 y 1 clic. La EN suma 7 imp en pos 5,9, y salió en pos 1 el 10-25 y en pos 4 el 10-26. Entre las dos son 17 impresiones en 28 d.
- Corrección automática ES: 10 imp en pos 9,2 en 28 d. Tuvo impresiones 5 días seguidos (10-22 → 10-26), siempre en pos 8,7–11. Se sostiene en la parte de abajo de la página 1.
- Nota de costo EN: 14 imp en pos 6,9. "how much does it cost to add ai tutoring to our university?" tiene 6 imp en pos 6,2.
- Queries visibles (9): aparecen "sied" (2 imp en pos 22 hacia el caso EN) y "proviamo" (1 imp en pos 3, sin relación con el sitio). Las demás son las de siempre.
- Por país (28 d): Argentina desktop tiene 20 imp y 5 de los 7 clics (pos 8,1). Le siguen Colombia desktop (7, pos 4,9), España desktop (7, pos 8,1), Brasil (6) y España mobile (4, pos 5,5).

### Indexación
- URL Inspection (20 URLs): todas "Submitted and indexed" con Breadcrumbs válidos.
- Rastreos nuevos desde la corrida 16: **migración EN 10-24** (antes 09-30), **protección ES 10-24** (antes 10-07) y corrección automática EN 10-23.
- Siguen sin rastreo nuevo: corrección asistida ES (08-18), SIED ES (09-16), evals EN (09-27), hub EN (09-29), Dr. La Rosa EN (09-30) y evals ES (10-01). La inspección detallada de corrección asistida ES no muestra nada raro: fetch ok, canonical de Google = el declarado, robots ok. Es demanda de rastreo, como se concluyó el 10-23.
- n8n (#13) sigue "indexed" con el rastreo del 09-29. El 301 responde bien.

### Evaluación de cambios anteriores
- Ningún cambio llega hoy a su fecha de revisión. La próxima es mañana (10-28: #21–#23, #27).
- Migración no tiene bloqueo, pero no se toca. El criterio de la corrida 16 era probar title y meta si al 11-02 seguía con más de 25 impresiones y 0 clics. Ya tuvo su primer clic con el title actual y está subiendo. Cambiarla ahora mezclaría variables justo cuando empieza a rendir.

### Auditoría técnica (crawl de producción)
- 48/48 URLs del sitemap con 200 y `lastmod`, canonical self, un H1, JSON-LD que parsea y sin `noindex`. 49 destinos de links internos, 0 rotos y 0 redirigidos.
- robots.txt sin cambios (permite los 8 bots de IA). llms.txt responde 200 e incluye el índice de casos, migración y cobros.
- Titles largos ya conocidos y bloqueados: Apoyo Escolar RV ES (84 caracteres, metas de casos hasta el 11-02) y la nota de costo EN (77 caracteres, hasta el 11-05).

### GEO / Bing
- `site:vantalogics.com` en DuckDuckGo (índice de Bing): la misma foto vieja del 10-26, con 9 URLs (home EN, índices, solución EdTech y 3 casos de uso EN, `/soluciones/` y una URL de real estate retirada). No aparece nada del cluster de plataformas, ninguna nota ni los casos. Es lo esperable: el #39 tiene 1 día y desde entonces no se publicó ninguna página nueva que IndexNow pudiera avisar.
- "vantalogics" en el web search de la sesión sigue sin devolver el sitio (Virage Logic, Vanteon, Vantage Logistics).
- "migrar academia online de Hotmart a plataforma propia alumnos y accesos": aparecen la ayuda de Hotmart (que explica la migración inversa, hacia Hotmart Club), guiadesoftware, Capterra y b2bstack. La respuesta generada dice que "no hubo resultados sobre el proceso concreto de trasladar alumnos y sus accesos (cuentas, contraseñas, progreso y certificados)". Eso es justo lo que cubre nuestra guía, que ya gana clics en Google. El hueco no es de contenido sino de índice: ese buscador no tiene la página.
- "migrate online course students from Tiendup WooCommerce to own platform": servicios de migración de carritos (Thinkific/Teachable → WooCommerce), Tutor LMS y LearnDash. No aparece nadie que hable de Tiendup ni un caso real.

### Cambios
Ninguno. Todas las páginas con señal están bloqueadas por revisiones en curso. La única libre con impresiones, migración, acaba de dar su primer clic y no se toca. Las hojas que no se rastrean tienen entre 6 y 23 páginas de origen: sumarles links no las destrabó el 10-23 y no hay dato nuevo que cambie esa conclusión. Hacer un cambio solo para tener algo que deployar iría contra la regla de darle tiempo a Google.

### Envíos
- No hubo deploy ni cambio de URLs, así que no se mandó nada a IndexNow ni se reenvió el sitemap.

### Pendientes / hipótesis para próximas corridas
- **10-28**: notas, evals y corrección asistida (#21–#23, #27). Evals ES/EN y corrección asistida ES nunca se volvieron a rastrear después de sus cambios, así que lo más probable es que la revisión dé "no concluyente por falta de rastreo".
- **10-29**: nota de corrección. La ES se sostiene en pos 9–11 hace 5 días. Si sigue así, es la candidata a un empujón en la propia página (title o el H2 que coincida con la query, cuando aparezca una visible). La EN no persigue "automatic grading".
- **Migración**: si al 11-02 suma otro clic o sube a pos 1–3, se consolida y no se toca. Si se estanca en pos 5–7, primero el title EN y después el hueco de la migración por etapas, siempre con evidencia del caso.
- **11-09**: Bing (#39). Si a esa fecha sigue sin aparecer nada del cluster, la palanca es Bing Webmaster Tools (lo tiene que hacer el dueño).
- Para el dueño, siguen abiertos: Bing Webmaster Tools, `sameAs` con perfiles reales, autor con nombre, links desde los sitios de los clientes, el commit `6ce459f` con atribución y los montos de comisión de Hotmart en el pilar.
- No tocar: notas, evals y corrección asistida (10-28), nota de corrección y generación de evaluaciones (10-29), aprendizajes de casos (10-30), metas de casos (11-02), cobros, hub y footer de cobros (11-03), nota de costo y notas relacionadas (11-05), índice de casos (11-06) ni IndexNow (11-09).

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 15 (10-23) | 09-25 → 10-22 | 7 | 108 | 10,0 |
| 16 (10-26) | 09-28 → 10-25 | 6 | 119 | 9,3 |
| 17 (10-27) | 09-29 → 10-26 | 7 | 125 | ~9,2 |

---

## 2026-10-28 — Corrida 18

### Métricas generales (GSC, datos hasta 2026-10-27; el 10-27 es preliminar)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (09-30 → 10-27) | 7 | 137 | 5,1 % | 8,6 |
| Últimos 7 d (10-21 → 10-27) | 1 | 58 | 1,7 % | 8,2 |
| 7 d anteriores (10-14 → 10-20) | 3 | 34 | 8,8 % | 7,0 |

- **Quinta semana seguida de récord: 58 impresiones, un 71 % más que la anterior.** Los 28 d también son máximo (137). La posición media de 28 d mejora de ~9,2 a 8,6.
- **El 10-27 es el mejor día del sitio: 18 impresiones en pos 3,8**, pero el dato es preliminar (por página/país/dispositivo solo devuelve una fila). Por página: `/en/` 9 imp en pos 3,6, `/en/privacy/` 6 en pos 1,7, `/privacidad/` 3, `/en/solutions/` 3. Home más privacidad y soluciones juntas, en pos 1–5, es el patrón de sitelinks en una búsqueda de marca. Se confirma cuando el dato quede firme.
- Corrección automática ES: 12 imp en pos 8,5 en 28 d (11 en los últimos 7 d). El 10-27 salió en pos 5. La EN tuvo 2 imp en pos 2,5 ese día, la primera vez que sale en página 1 (en 28 d sigue en pos 14,5 por "automatic grading").
- Nota de costo EN: 16 imp en pos 6,5. La query de universidad sube a 7 imp en pos 5,4 (antes 6 en pos 6,2). Google la volvió a rastrear hoy.
- Migración: ES 10 imp en pos 6,6 con 1 clic. EN 9 imp en pos 5,4 (4 en los últimos 7 d, en pos 3,2).
- **Protección ES baja:** del 10-10 al 10-18 salió 5 veces en pos 1–2 (1 clic). Desde el 10-21, 4 veces en pos 8–30. Google la rastreó el 10-24. Con una impresión por día y las queries ocultas, puede ser otra query y no una caída. No se toca. Se vigila hasta el 11-04.
- Por país (28 d): USA desktop 29 imp, pos 12,1. Argentina desktop 20, pos 8,1, con 5 de los 7 clics. Brasil 7, Colombia 6 (pos 4,5) y España desktop 6. Sudáfrica tuvo 1 clic.

### Indexación
- URL Inspection (20 URLs): todas "Submitted and indexed" con Breadcrumbs válidos.
- Rastreos nuevos: nota de costo EN 10-28, tutor de IA EN 10-24, migración EN 10-24, corrección asistida EN 10-23, corrección automática ES 10-22 y EN 10-23, RAG ES 10-22, tutor de IA ES 10-21 y búsqueda semántica ES 10-21.
- Siguen sin rastreo nuevo: corrección asistida ES (08-18), evaluar tutor ES (09-16), RAG EN (09-26), evals EN (09-27), tutor o búsqueda EN (09-28) y evals ES (10-01).

### Evaluación de cambios anteriores (revisión 10-28)
- **#21 (bloque "Dónde lo construimos" en las notas): no movió los casos de uso. Se deja como está.** Desde el 10-14 Google rastreó 5 de las 10 notas indexables y 5 de los 6 casos de uso de destino, así que los links ya los vio. Aun así, los 8 casos de uso suman 5 impresiones en 28 d (assisted grading EN 3, semantic search EN 1, assessment generation EN 1). Los 4 ES tienen 0 desde el 09-23. En el período anterior parecían tener ~30, pero 17 eran de un pico de dos días (09-22 y 09-23, el día del pivot). La señal de fondo era de ~13 y ahora es 5. Las notas se quedan con esos temas: corrección automática ES suma 12 imp, mientras que corrección asistida ES no tiene ninguna. **Aprendizaje:** el link interno no genera demanda. Los casos de uso son páginas de servicio sin datos propios, y la página que tiene evidencia es la que gana. No se revierte nada: los links sirven para el usuario y para los LLMs, y no hacen daño.
- **#22 (nota de evals reorientada a educación): no concluyente.** Google no volvió a rastrear ninguna de las dos (ES 10-01, EN 09-27), así que todavía indexa la versión anterior. Tuvo 1 impresión en 28 d (ES, pos 3). Se vuelve a mirar cuando se rastree.
- **#23 y #27 (lecturas en corrección asistida): no concluyente en ES y neutral en EN.** La ES no se rastrea desde el 08-18. La EN se rastreó el 10-23 y tiene 3 imp en pos 7,3 (antes 4 en pos 5). No hay efecto medible.
- **Consecuencia para próximas corridas:** si se quiere que los casos de uso rankeen, la palanca es la evidencia y no más links. Corrección asistida y generación de evaluaciones pueden apoyarse en el caso Apoyo Escolar RV. Tutor de IA y búsqueda semántica no tienen ningún caso en producción que los respalde. No se hace hoy: los casos están bloqueados hasta el 10-30 y el 11-02, y el tema se cruza con la nota de corrección, que se revisa mañana.

### Auditoría técnica (crawl de producción)
- 48/48 URLs del sitemap con 200, canonical self, `index, follow`, un H1 y JSON-LD que parsea. robots.txt permite los 8 bots de IA y llms.txt responde 200.
- **Error encontrado: el H1 de la home pegaba dos palabras en el HTML.** Las dos líneas del titular son `<span>` que el CSS pasa a bloque, y Astro no dejaba espacio entre ellas. En el HTML crudo, que es lo que leen GPTBot, ClaudeBot, PerplexityBot y cualquier parser que no aplica CSS, quedaba "Construimos la inteligencia **detrásde** los productos educativos" y "We build the intelligence **behindeducation** products". Es la frase principal de la entidad, en la página más rastreada. Se revisaron los H1 y H2 de las 66 páginas del build y no hay otro caso.

### GEO / Bing
- No hubo lectura del índice de Bing. DuckDuckGo pidió captcha, y Bing en headless devolvió resultados que no tenían nada que ver con la búsqueda (anti-bot). No se puede comparar con el 10-27. El #39 se sigue revisando el 11-09.
- **Primer aviso real del #39:** el deploy de hoy le mandó a IndexNow solo las 2 URLs que cambiaron (`IndexNow: 200 for 2 URLs`: `/` y `/en/`). Las dos son de la foto vieja que Bing tiene del sitio, así que es la primera prueba de si un aviso puntual hace que Bing refresque una URL.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 40 | `/` y `/en/` (también `/ar/`, en noindex) | Espacio entre las dos líneas del H1 en `src/components/home/Portada.astro`. El texto visible no cambia. `HOME_UPDATED = 2026-10-28`, porque cambia el texto que ven los crawlers que no renderizan. Por eso el sitemap y el aviso a IndexNow incluyen las dos homes. | El H1 crudo decía "detrásde" y "behindeducation". La home EN es la página con más impresiones del sitio (26 en 28 d) y la que Bing tiene con un título viejo. | Los LLMs y Bing leen bien la frase de la entidad. Bing vuelve a rastrear la home por el aviso puntual y actualiza el título y la descripción. En Google no debería verse nada (renderiza con CSS). | Título y descripción de la home en Bing (`site:vantalogics.com`, cuando se pueda leer sin captcha); la salida de IndexNow ya dio 200. | 2026-11-09 (junto con #39) |

### Envíos
- Deploy por push a `main` (commit `94e6640`, run 40684965397, ok). En producción, los dos H1 ya salen con espacio.
- IndexNow: 200 para 2 URLs (`/`, `/en/`).
- Sitemap reenviado a GSC (12:06).

### Pendientes / hipótesis para próximas corridas
- **10-29**: nota de corrección (#25) y generación de evaluaciones (#26). La ES suma 12 imp en pos 8,5 y salió en pos 5 el 10-27. Si se sostiene en página 1, el siguiente paso es la propia página (title o el H2 de la query visible). Por ahora el link desde corrección asistida ES no sirve, porque esa página no se rastrea desde el 08-18.
- **Confirmar el 10-27** cuando el dato quede firme: si las 18 impresiones de home, privacidad y soluciones son sitelinks de una búsqueda de marca.
- **Protección ES**: si al 11-04 sigue en pos 8–30, mirar las queries con impresiones de la página y si cobros y acceso (publicada el 10-20) le está sacando alguna.
- **Migración**: mismo criterio del 10-27 (decisión el 11-02).
- **11-09**: Bing (#39 y #40). Si a esa fecha sigue sin aparecer nada del cluster, la palanca es Bing Webmaster Tools (lo tiene que hacer el dueño).
- Para el dueño, siguen abiertos: Bing Webmaster Tools, `sameAs` con perfiles reales, autor con nombre, links desde los sitios de los clientes, el commit `6ce459f` con atribución y los montos de comisión de Hotmart en el pilar.
- No tocar: nota de corrección y generación de evaluaciones (10-29), aprendizajes de casos (10-30), metas de casos (11-02), cobros, hub y footer de cobros (11-03), nota de costo y notas relacionadas (11-05), índice de casos (11-06), IndexNow y H1 de la home (11-09).

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 15 (10-23) | 09-25 → 10-22 | 7 | 108 | 10,0 |
| 16 (10-26) | 09-28 → 10-25 | 6 | 119 | 9,3 |
| 17 (10-27) | 09-29 → 10-26 | 7 | 125 | ~9,2 |
| 18 (10-28) | 09-30 → 10-27 | 7 | 137 | 8,6 |

---

## 2026-10-29 — Corrida 19

### Métricas generales (GSC, datos hasta 2026-10-28; el 10-28 es preliminar)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (10-01 → 10-28) | 7 | 142 | 4,9 % | 8,3 |
| Últimos 7 d (10-22 → 10-28) | 1 | 62 | 1,6 % | 7,1 |
| 7 d anteriores (10-15 → 10-21) | 3 | 38 | 7,9 % | 8,4 |

- **Sexta semana seguida de récord: 62 impresiones, un 63 % más que la anterior**, y con mejor posición (7,1 contra 8,4). Los 28 d también son máximo (142). El 10-28 trae 10 impresiones en pos 5,1 aunque todavía es preliminar.
- **Los clics no acompañan: 1 en la última semana.** Las impresiones nuevas son de páginas en pos 5–10 con 1–3 impresiones por día. Con un CTR esperable de 2–5 % en esas posiciones, 62 impresiones dan 1–3 clics. Todavía no es una señal de CTR bajo.
- **El 10-27 quedó firme en 18 impresiones.** Por página suman ~45 (`/en/` 9, `/en/privacy/` 6, `/privacidad/` 3, `/en/solutions/` 3 y 15 URLs más con 1–2 cada una). Muchas URLs propias sobre pocas búsquedas es un patrón de búsqueda de marca. La privacidad EN en pos 1,7, por encima de la home en pos 3,6, apunta a alguien que buscó la política de privacidad del sitio, por ejemplo una revisión de app de Meta o Google. Sin clics. No pide ninguna acción.
- Por página (28 d): `/en/` 28 imp en pos 4,2. Nota de costo EN 17 en pos 6,3. **Corrección ES 13 en pos 8,4 y corrección EN 13 en pos 12,8.** Protección ES 12 en pos 6,5. `/` 11 con 4 clics. Migración EN 10 en pos 5,6 y ES 9 en pos 6,6 con 1 clic.
- Queries visibles (7): "apoyo escolar rv" 8 imp en pos 17 hacia el caso ES (es la marca del cliente, y su propio sitio va primero). La query de universidad tiene 7 imp en pos 5,4. "automatic grading" 2 en pos 45,5 y "sied" 2 en pos 22.
- Por país (28 d): USA desktop 27 imp en pos 12,7. Argentina desktop 22 en pos 7,7, con 5 de los 7 clics. Brasil 7, Colombia 6 (pos 4,5), España 10 entre desktop y mobile.

### Indexación
- URL Inspection (20 URLs): todas "Submitted and indexed" con Breadcrumbs válidos.
- Rastreos nuevos: **home ES el 10-28**, el mismo día del arreglo del H1 (#40). **Generación de evaluaciones ES el 10-22** (antes 09-25), por el `lastmod` del #26.
- Siguen sin rastreo nuevo: corrección asistida ES (08-18), generación de evaluaciones EN (10-02), evals ES (10-01) y hub EN (09-29).

### Evaluación de cambios anteriores (revisión 10-29)
- **#25 (nota de corrección automática ES/EN): funcionó. Se consolida.** Las dos indexaron en 1–2 días y suman 26 impresiones en 28 d. Es el segundo grupo de impresiones no de marca, detrás de la nota de costo. La ES tuvo impresiones 7 días seguidos (10-22 → 10-28) en pos 5–11 y viene mejorando: pos 9 el 10-22, pos 5 el 10-27, pos 7 el 10-28. La EN cae a pos 12,8 por "automatic grading" (2 imp en pos 45). Sin esa query, sus otras 11 impresiones promedian pos ~6,9, con pos 2,5 el 10-27. Tiene 0 clics, que con 26 impresiones en pos 7–8 todavía no es una señal (lo esperable es 0,5–1 clic).
- **#26 (bloque de lecturas en generación de evaluaciones): no movió la página.** El `lastmod` provocó el rastreo de la ES (10-22), pero la página tiene 0 impresiones en ES y 1 en EN (pos 20) en 28 d. Antes tenía 9. Confirma el aprendizaje del 10-28: un link no crea demanda, y la página de servicio no tenía ningún dato propio. Se itera con evidencia (#41).
- GEO: "corrección automática de cuestionarios con IA academia online" en el buscador de la sesión sigue devolviendo material académico (UC3M, CATEDU, UMA, UOC). La respuesta generada cierra con "no encontré datos sobre precisión de la calificación de respuestas de desarrollo en entornos reales ni sobre academias online concretas". Es exactamente lo que publica nuestra nota, pero ese índice no tiene el sitio (`site:vantalogics.com` devuelve Vantage Logistics). En la query de costo de tutor IA para universidades, los citados siguen siendo ibl.ai, quadc y liveinthefuture, todos vendedores con cifras.

### Auditoría técnica (crawl de producción)
- 48/48 URLs del sitemap con 200 y `lastmod`, canonical self, un H1, JSON-LD que parsea y sin `noindex`. 49 destinos de links internos, 0 rotos y 0 redirigidos. robots.txt permite los 8 bots de IA. llms.txt y la clave de IndexNow responden 200.
- Ya conocidos, sin cambio hoy: titles de casos de 71–84 caracteres (bloqueados hasta el 11-02), nota de costo EN de 77 (hasta el 11-05) y descriptions de 166–206 caracteres en 9 páginas (notas, solución EdTech y generación de evaluaciones). Se van a corregir cuando cada página se toque por otro motivo, no como cambio aislado.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 41 | `/soluciones/edtech-y-plataformas-educativas/generacion-de-evaluaciones/` y `/correccion-asistida/` + EN (AR también, en noindex) | Una FAQ nueva en cada página, con datos del caso Apoyo Escolar RV ya publicados en la nota #25 (sin cifras nuevas). Generación: "¿Cómo se detecta una pregunta con la respuesta correcta mal cargada?", con 581 preguntas, 97,8 % de coincidencia y al menos 4 de 13 desacuerdos con la clave mal. Corrección asistida: "¿Y si las respuestas de desarrollo son números o fórmulas?", con el 99,4 % de 5.563 que se corrige contra una clave y el 0,6 % que queda para la docente. Esta segunda FAQ además delimita para qué sirve la rúbrica, sin competir con la nota. El texto entra al FAQPage. `updated: 2026-10-29` en las dos. | Revisión de #26: generación tiene 1 imp en 28 d (antes 9) aunque la ES se rastreó. Corrección asistida tiene 3 imp (EN, pos 7,3) y la ES no se rastrea desde el 08-18. Aprendizaje del 10-28: ganan las páginas que tienen evidencia propia, no las que tienen más links. Eran las dos páginas de servicio sin un solo dato. | El `lastmod` hace que Google rastree las 4 URLs (sobre todo corrección asistida ES y generación EN, que llevan semanas sin rastreo). Las páginas pasan a tener un dato citable y vuelven a recibir impresiones en temas de evaluación. La nota no debería perder posición, porque las FAQ responden a otra pregunta. | Último rastreo de las 4 URLs; impresiones y posición de las dos páginas de servicio y de la nota de corrección ES/EN (28 d). | 2026-11-12 |
| 42 | `/blog/correccion-automatica-de-cuestionarios-con-ia/` + EN | Solo la meta description. Antes no tenía cifras ("Medimos dónde se equivoca la IA…"). Ahora: "5.563 respuestas reales: el 99,4 % se corrige contra una clave verificada. Cuando la IA ponía la nota, el 43 % de los alumnos tuvo un veredicto inconsistente." (158 caracteres; EN 159). No cambian title, contenido ni `lastmod`, porque el texto de la nota es el mismo y Google la rastrea cada semana (10-22 y 10-23). | 26 impresiones en pos 7–8 y 0 clics en 28 d. Era la única página con impresiones cuya meta no tenía ningún dato, después del #30 en casos. Es la variable más liviana: el title, que pesa en el ranking, no se toca mientras la ES sube. | Más CTR cuando la nota aparece en página 1, y un snippet citable para motores de IA. | CTR e impresiones de la nota ES/EN; que el snippet de Google muestre la meta nueva. | 2026-11-12 |

### Envíos
- Deploy por push a `main` (commit `cfac7c5`, run 40870487918, ok). En producción ya salen las dos FAQ y las metas nuevas.
- IndexNow: 200 para 4 URLs (las 4 páginas de servicio). La nota no se avisó porque su `lastmod` no cambió.
- Sitemap reenviado a GSC (12:06).

### Pendientes / hipótesis para próximas corridas
- **10-30**: aprendizajes de casos (#29).
- **11-02**: metas de casos (#30) y migración. Mismo criterio que el 10-27: si suma otro clic o sube a pos 1–3, se consolida y no se toca. Si se estanca en pos 5–7, primero el title EN.
- **11-04**: protección ES. Si sigue en pos 8–30, mirar sus queries y si cobros le saca alguna.
- **Nota de corrección**: si la ES llega a pos 1–5 sostenida y aparece una query visible, el siguiente paso es el title o el H2 de esa query. La EN no persigue "automatic grading".
- **11-09**: Bing (#39 y #40). Si a esa fecha sigue sin aparecer nada del cluster, la palanca es Bing Webmaster Tools, y lo tiene que hacer el dueño. Hoy el bloqueo de GEO es claramente de índice: el buscador de la sesión no tiene el sitio, y su respuesta dice que falta justo lo que publicamos.
- Para el dueño, siguen abiertos: Bing Webmaster Tools, `sameAs` con perfiles reales, autor con nombre, links desde los sitios de los clientes, el commit `6ce459f` con atribución y los montos de comisión de Hotmart en el pilar.
- No tocar: aprendizajes de casos (10-30), metas de casos (11-02), cobros, hub y footer de cobros (11-03), nota de costo y notas relacionadas (11-05), índice de casos (11-06), IndexNow y H1 de la home (11-09), páginas de servicio de evaluación y meta de la nota de corrección (11-12).

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 15 (10-23) | 09-25 → 10-22 | 7 | 108 | 10,0 |
| 16 (10-26) | 09-28 → 10-25 | 6 | 119 | 9,3 |
| 17 (10-27) | 09-29 → 10-26 | 7 | 125 | ~9,2 |
| 18 (10-28) | 09-30 → 10-27 | 7 | 137 | 8,6 |
| 19 (10-29) | 10-01 → 10-28 | 7 | 142 | 8,3 |

---

## 2026-10-30 — Corrida 20

### Métricas generales (GSC, datos hasta 2026-10-29; el 10-29 es preliminar)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (10-02 → 10-29) | 7 | 158 | 4,4 % | 7,9 |
| Últimos 7 d (10-23 → 10-29) | 1 | 72 | 1,4 % | ~6,1 |
| 7 d anteriores (10-16 → 10-22) | 3 | 41 | 7,3 % | ~9,5 |

- **Séptima semana seguida de récord: 72 impresiones, un 76 % más que la anterior, y la posición mejora de ~9,5 a ~6,1.** Los 28 d también son máximo (158, posición 7,9). El 10-29 trae 19 impresiones en pos 5,1, el mejor día junto con el 10-27, aunque todavía es preliminar.
- **La nota de costo EN es la página que más crece.** Suma 25 impresiones en 28 d (antes 17) en pos 5,1. En la última semana tuvo 13 en pos 2,6, contra 8 en pos 7,2 la semana anterior, y el 10-29 sacó 8 en pos 2,5. La query de universidad ("how much does it cost to add ai tutoring to our university?") llega a 9 impresiones en pos 4,7, y salió en pos 1–2 el 10-25, 10-27 y 10-29. **0 clics.** Con 13 impresiones en pos ~2,6, lo esperable es 1–2 clics, y la probabilidad de que salgan 0 por azar es de ~20 %. Hay que mirarlo, pero todavía no alcanza para afirmar que el CTR es bajo. Sigue bloqueada hasta el 11-05 (ver Decisiones).
- Corrección automática: ES 17 imp en pos 8,5 y EN 17 en pos 11,6. El 10-29 tuvieron 4 cada una, en pos 8,8 y 7,8. Sin "automatic grading" (2 imp en pos 45,5), la EN promedia pos ~8,1.
- Migración: ES 9 imp en pos 6,3 con 1 clic. EN 10 en pos 5,6 (5 en la última semana, en pos 4). Protección ES: 12 imp en pos 6,5. En la última semana tuvo 5 en pos 6,6, mejor que la anterior (8,6). Los 3 días del 10-28 salieron en pos 4,7.
- Queries visibles (8): universidad 9 imp, "apoyo escolar rv" 8 hacia el caso ES en pos 17,1 (y 1 hacia el EN en pos 6), "automatic grading" 2, "sied" 2 en pos 22. El resto tiene 1 cada una.
- Países (28 d): USA 32 imp en pos 11,6 y sin clics. Argentina 25 en pos 8,2, con 6 de los 7 clics. Brasil 7, Sudáfrica 5 (1 clic), Canadá 4 y Chile 4. Dispositivos: desktop 109 imp con 6 clics, mobile 45 con 1 clic (pos 6,2).

### Indexación
- URL Inspection (20 URLs): todas "Submitted and indexed" con Breadcrumbs válidos. Sitemap: 48 URLs, 0 errores, descargado el 10-29 a las 12:06.
- Rastreos nuevos: **caso Apoyo Escolar RV ES el 10-29 y EN el 10-30** (#29), **home EN el 10-30**, nota de costo ES el 10-29.
- **Corrección asistida ES no se rastrea desde el 08-18.** Tuvo dos cambios de `lastmod` (10-15 y 10-29) y 8 links internos desde páginas que Google sí rastrea (nota de corrección, hub, solución EdTech, otras 3 páginas de servicio). Inspección detallada: el canonical de Google es el propio, el fetch es "SUCCESSFUL", y `referring_urls` está vacío. No es un problema técnico, es la prioridad de rastreo que Google le da a una página sin impresiones desde el 09-23. Siguen sin rastrear su versión actual, además: generación de evaluaciones EN (10-02), hub EN (09-29, actualizado el 10-20) y protección EN (10-06, esta sí está al día).
- La API no permite pedir indexación. La única palanca que queda es "Solicitar indexación" desde la UI de GSC, y no hay sesión de Google en `playwright-cli`: pasa al dueño (ver Pendientes).

### Evaluación de cambios anteriores (revisión 10-30)
- **#29 (bloque "Lo que aprendimos en este proyecto" en Apoyo Escolar RV y Lu Apuntes): cumplió la parte de rastreo. Se consolida.** Google rastreó los 4 casos después del cambio (Lu Apuntes ES el 10-20 y EN el 10-23, Apoyo Escolar RV ES el 10-29 y EN el 10-30), cuando antes ninguno se rastreaba desde el 10-05. Migración ES se rastreó el 10-19 y la EN el 10-24 (antes, el 09-30). Las guías de destino suben o se sostienen: migración EN de ~6 a 10 imp en 28 d, migración ES estable en 9 con 1 clic, protección ES estable en 12 con mejor posición en la última semana, y corrección ES/EN de 13 a 17 cada una. No se puede atribuir la suba solo al bloque, porque cada página tiene sus propios cambios (#25, #41, #42), pero no hay ninguna señal negativa. El bloque queda. Que SIED y Dr. La Rosa sigan sin bloque es correcto: no hay ninguna nota con datos suyos.

### Auditoría técnica (crawl de producción)
- 48/48 URLs del sitemap con 200, canonical self, un H1, JSON-LD que parsea y sin `noindex`. 57 destinos de links internos, 0 rotos y 0 redirigidos. Ninguna URL indexable tiene menos de 6 links internos de entrada. robots.txt permite los 8 bots de IA y llms.txt responde 200.
- Sin cambios respecto del 10-29: titles de casos de 71–84 caracteres (bloqueados hasta el 11-02), nota de costo EN de 77 (hasta el 11-05) y descriptions de 164–206 caracteres en 12 páginas, casi todas con 0–3 impresiones. Mismo criterio: se corrigen cuando la página se toque por otra razón.

### GEO
- "how much does it cost to add AI tutoring to our university per student" (buscador de la sesión): citan a ibl.ai (3 posts: "what AI tutoring actually costs", "per seat vs usage"), quadc, liveinthefuture, callsphere y la Western University. La respuesta generada se apoya en dos ideas que nuestra nota ya trabaja: usuarios activos contra matriculados ("solo el 10–15 % usa la tutoría") y costo por uso contra licencia por asiento. Todos los citados publican precios en USD, que es justo lo que este sitio no hace (regla del dueño). Nuestra ventaja es el método y el ratio de 126×. Ese índice todavía no tiene el sitio (`site:vantalogics.com` vuelve a dar Vantage Logistics y similares). Es el mismo bloqueo de índice del 10-29, y se revisa el 11-09.
- Para el 11-05, la nota EN puede sumar una sección "active vs enrolled" y "per seat vs usage", explicadas con ratios y sin montos. Es lo que la respuesta generada cita de otros y la query de universidad pide.

### Cambios
- **Ninguno en el sitio.** Las páginas con señal están bloqueadas por revisiones en curso: nota de costo (11-05), casos (11-02), hub y cobros (11-03), páginas de evaluación y nota de corrección (11-12). La auditoría no encontró errores. Las páginas sin bloqueo tienen 0–3 impresiones, así que cualquier cambio sería una suposición, no un dato. Cambiar el title de la nota de costo hoy mezclaría esa variable con #35/#36 justo cuando la página pasó de pos 7 a pos 2–3.

### Decisiones para la nota de costo EN (11-05)
- Si llega a 20 o más impresiones en pos ≤ 3 sin clics, se cambia el title a uno de ≤ 60 caracteres que hable de la query de universidad (hoy tiene 77 y Google lo corta) y la meta a ≤ 155. Mismo cambio en la ES, que debe espejar.
- Si suma un clic o más, se deja el title y se evalúa la sección de activos contra matriculados (ver GEO).
- En los dos casos, el cambio de contenido va con `updated` nuevo y el de title/meta solo, sin `updated`.

### Envíos
- Sin deploy (no hubo cambios en el sitio). No se mandó IndexNow ni se reenvió el sitemap: Google ya lo bajó el 10-29 y no cambió nada.

### Pendientes / hipótesis para próximas corridas
- **11-02**: metas de casos (#30) y migración. Si migración suma otro clic o sube a pos 1–3, se consolida. Si se estanca en pos 5–7, primero el title EN.
- **11-03**: cobros, hub y footer de cobros.
- **11-04**: protección ES. En la última semana mejoró (pos 6,6). Si se sostiene, no se toca.
- **11-05**: nota de costo y #35/#36, con los criterios de arriba.
- **11-09**: Bing (#39 y #40).
- **Para el dueño (nuevo)**: en GSC → Inspección de URLs → "Solicitar indexación" de `/soluciones/edtech-y-plataformas-educativas/correccion-asistida/` (sin rastreo desde el 08-18 a pesar de dos `lastmod`), `/en/solutions/edtech-and-learning-platforms/assessment-generation/` y `/en/education-platforms/`. Así Google ve las FAQ del #41 y el link a cobros del hub EN. Son 2 minutos, y la API no lo permite.
- Para el dueño, siguen abiertos: Bing Webmaster Tools, `sameAs` con perfiles reales, autor con nombre, links desde los sitios de los clientes, el commit `6ce459f` con atribución y los montos de comisión de Hotmart en el pilar.
- No tocar: metas de casos (11-02), cobros, hub y footer de cobros (11-03), nota de costo y notas relacionadas (11-05), índice de casos (11-06), IndexNow y H1 de la home (11-09), páginas de servicio de evaluación y meta de la nota de corrección (11-12).

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 15 (10-23) | 09-25 → 10-22 | 7 | 108 | 10,0 |
| 16 (10-26) | 09-28 → 10-25 | 6 | 119 | 9,3 |
| 17 (10-27) | 09-29 → 10-26 | 7 | 125 | ~9,2 |
| 18 (10-28) | 09-30 → 10-27 | 7 | 137 | 8,6 |
| 19 (10-29) | 10-01 → 10-28 | 7 | 142 | 8,3 |
| 20 (10-30) | 10-02 → 10-29 | 7 | 158 | 7,9 |

---

## 2026-11-02 — Corrida 21

### Métricas generales (GSC, datos hasta 2026-11-01; el 11-01 es preliminar)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (10-05 → 11-01) | 7 | 167 | 4,2 % | ~6,9 |
| Últimos 7 d (10-26 → 11-01) | 1 | 70 | 1,4 % | ~5,3 |
| 7 d anteriores (10-19 → 10-25) | 2 | 48 | 4,2 % | ~9,7 |

- **Octava semana seguida de récord en 28 d (167 impresiones, posición ~6,9).** La semana es casi igual a la del 10-23 → 10-29 (72), con mejor posición. Los últimos tres días bajan a 6, 8 y 3 impresiones (fin de semana, y el 11-01 todavía es preliminar). No se lee como caída hasta ver el dato firme.
- **Clics planos: 7 en 28 d, igual que en las últimas 5 corridas, y 1 en la última semana.** Las impresiones crecen en páginas en pos 4–8 con 1–3 impresiones por día, sobre todo en EN y en desktop USA, que no ha dado un clic desde el inicio del log.
- **Nota de costo EN: 31 imp en pos 4,8, 0 clics** (25 hace 3 días). La query de universidad tiene 11 imp en pos 4,1. Se decide el 11-05 con el criterio de la corrida 20.
- Corrección automática ES 21 imp en pos 8,4, EN 17 en pos 11,6, las dos sin clics. Protección ES 12 en pos 6,5 con 1 clic. Hub ES 9 en pos 4,4.
- Queries visibles (7): universidad 11, "apoyo escolar rv" 8 hacia el caso ES en pos 17,1, "automatic grading" 2 en pos 45,5, "sied" 2 en pos 22 y tres con 1 impresión ("graded quiz: model development", "proviamo").

### Indexación
- URL Inspection (20 URLs): todas "Submitted and indexed" con Breadcrumbs válidos. Sitemap: 48 URLs, todas con `lastmod`.
- Rastreos nuevos: **generación de evaluaciones EN el 10-31** (sin rastreo desde el 10-02; ya incluye la FAQ del #41), caso SIED EN el 10-31, home ES el 10-31, home EN y hub ES el 10-30, nota de costo EN el 10-30.
- Siguen sin rastreo de su versión actual: **corrección asistida ES (08-18)**, **SIED ES (09-16)** y hub EN (09-29). Las tres siguen en la lista para que el dueño pida indexación desde la UI.

### Evaluación de cambios anteriores (revisión 11-02)
- **#30 (meta propia por caso): neutral. Se consolida, sin más cambios.** Desde el 10-19 los casos suman ~18 impresiones en 14 días (antes ~11 en los 14 anteriores), pero con 0 clics. Casi todas son búsquedas de la marca del cliente: "apoyo escolar rv" en pos 15–24, donde el sitio propio del cliente va primero, y "sied" en pos 22. Para una búsqueda de navegación en pos 15–22 no hay snippet que dé clics, así que el CTR de los casos no sirve para medir la meta. La meta queda porque es la que leen llms.txt y los LLMs. **Aprendizaje:** los casos no van a traer clics desde Google por sí solos. Su papel es dar evidencia a las guías y a las notas (#29), que es donde están las impresiones no de marca.
- **Migración: estancada, se aplica el criterio del 10-27.** No sumó otro clic desde el del 10-26 ni llegó a pos 1–3. En 28 d, ES tiene 11 imp en pos 7,9 con 1 clic (la última semana bajó a pos ~9,8, con 2 imp en pos 15 el 10-31) y EN 11 imp en pos 5,4 con 0 clics (la última semana, 5 en pos ~4,4). El paso fijado era "primero el title EN" (#43).

### Auditoría técnica (crawl de producción)
- 48/48 URLs del sitemap con 200, canonical self, un H1, JSON-LD que parsea y sin `noindex`. 57 destinos de links internos, 0 rotos y 0 redirigidos. robots.txt permite los 8 bots de IA y llms.txt responde 200.
- El commit `c09e201` (Astro 7.3.8, sharp, zod por CVE) entró hoy en producción sin cambios en el HTML: el build da las mismas 66 páginas.

### GEO / SERP
- "how to migrate online courses from Hotmart to your own platform without losing students" (buscador de la sesión): el resultado lo dominan las ayudas de Hotmart para migrar **hacia** Hotmart Club, Fiverr, y guías de migración de vendedores (Teachery, Ruzuku, Circle, SchoolMaker, Heights) entre plataformas SaaS. La respuesta generada cierra con que no encontró "un método para exportar desde Hotmart ni si los datos de ventas se pueden exportar". La ES ("migrar academia online de Hotmart a plataforma propia") dice lo mismo: "no encontré guías sobre cómo exportar alumnos o contenido desde Hotmart". Es justo la primera sección de nuestra guía ("Qué se puede sacar de cada plataforma"), pero ese índice no tiene el sitio. Se sigue el 11-09 con Bing.
- Las dos respuestas citan el "solapamiento de 2 a 4 semanas" entre plataformas. Nuestra guía lo trata en el paso 7 y en el punto 10 del checklist, sin un nombre propio. Es el hueco que ya anotó la corrida 16 (migración por etapas). Queda para después de medir el #43.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 43 | `/en/education-platforms/migration/` | Solo title y meta. Title: "Migrate your academy from Hotmart, Tiendup or WordPress \| Vantalogics" (70 caracteres, Google lo corta) → "Migrate your academy off Hotmart or WordPress \| Vantalogics" (59). Tiendup sale del title EN porque es una plataforma argentina que el público en inglés no busca. Sigue en el H1, la meta y el cuerpo. Meta sin ningún dato → "What Hotmart, Tiendup and WooCommerce let you export, how purchases become course access, and the 7 steps we used with an academy of 22,000+ students." (150). El dato es el que ya está publicado en el caso. Sin `updated`, porque el contenido no cambia (mismo criterio que #42). **La ES no se toca:** tiene el único clic de la guía con el title actual, y el criterio del 10-27 era probar primero en EN para no mezclar variables. Si el EN mejora, se espeja el 11-16. | EN: 11 imp en pos 5,4 y 0 clics en 28 d, estancada en pos 4–7 desde el 10-08. El title superaba el ancho que muestra Google y la meta era la única del cluster de plataformas sin una cifra (protección y cobros tienen). | Title completo en el snippet y meta con un dato concreto: el CTR de la guía EN pasa de 0 a algún clic cuando sale en pos 3–5. La posición no debería moverse, porque el title conserva "migrate", "academy", "Hotmart" y "WordPress". | CTR, impresiones y posición de la guía EN (28 d); que el snippet muestre el title nuevo. | 2026-11-16 |

### Envíos
- Deploy por push a `main` (commit `cf613ee`, run 41441741069, ok). En producción ya salen el title y la meta nuevos.
- IndexNow desde CI: "no URL changed, nothing sent", como se esperaba, porque el `lastmod` no cambió. Se mandó a mano la URL de la guía EN: 200.
- Sitemap reenviado a GSC (12:05).
- **Error de proceso:** el primer commit de la corrida (`da35d17`) llevaba la línea `Co-Authored-By`, que las reglas globales del dueño prohíben. Se corrigió con `--amend` y `--force-with-lease` a los segundos de pushearlo, antes de que nadie lo bajara. El deploy de ese commit quedó cancelado. Ningún commit de esta corrida lleva atribución.

### Pendientes / hipótesis para próximas corridas
- **11-03**: cobros, hub y footer de cobros (#32–#34). Cobros ES tiene 2 imp en pos 6 y EN 1 en pos 2 en 28 d, y el hub EN no se rastrea desde el 09-29.
- **11-04**: protección ES. Sigue en 12 imp en pos 6,5 con 1 clic. Si se sostiene, no se toca.
- **11-05**: nota de costo (#35/#36), con los criterios de la corrida 20. Ya pasó las 20 impresiones (31), pero en pos 4,8. Hay que mirar cuántas salieron en pos ≤ 3.
- **11-09**: Bing (#39 y #40).
- **11-12**: páginas de servicio de evaluación (#41) y meta de la nota de corrección (#42). Generación de evaluaciones EN ya se rastreó (10-31).
- **11-16**: title y meta de migración EN (#43). Si mejora, se espeja en la ES. Si no, la siguiente palanca es la sección de migración por etapas (ver GEO).
- **Indexación pedida (11-02, después de la corrida):** el MCP `gsc` ahora tiene `request_indexing`, que maneja el botón "Solicitar indexación" de GSC desde el Chrome del VPS. Se pidió para corrección asistida ES (sin rastreo desde el 08-18), SIED ES (desde el 09-16) y el hub EN (desde el 09-29; ya tenía un pedido anterior). Las tres respondieron "Indexing requested". **Revisar el 11-05 si se rastrearon.** Desde ahora la indexación la pide cada corrida, con un cupo de ~10 por día, y deja de ser tarea del dueño.
- Para el dueño, siguen abiertos: Bing Webmaster Tools; `sameAs` con perfiles reales; autor con nombre; links desde los sitios de los clientes; el commit `6ce459f` con atribución, y los montos de comisión de Hotmart en el pilar.
- No tocar: cobros, hub y footer de cobros (11-03), nota de costo y notas relacionadas (11-05), índice de casos (11-06), IndexNow y H1 de la home (11-09), páginas de servicio de evaluación y meta de la nota de corrección (11-12), migración EN (11-16).

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 15 (10-23) | 09-25 → 10-22 | 7 | 108 | 10,0 |
| 16 (10-26) | 09-28 → 10-25 | 6 | 119 | 9,3 |
| 17 (10-27) | 09-29 → 10-26 | 7 | 125 | ~9,2 |
| 18 (10-28) | 09-30 → 10-27 | 7 | 137 | 8,6 |
| 19 (10-29) | 10-01 → 10-28 | 7 | 142 | 8,3 |
| 20 (10-30) | 10-02 → 10-29 | 7 | 158 | 7,9 |
| 21 (11-02) | 10-05 → 11-01 | 7 | 167 | ~6,9 |

---

## 2026-11-03 — Corrida 22

### Métricas generales (GSC, datos hasta 2026-11-02; el 11-02 es preliminar)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (10-06 → 11-02) | 7 | 182 | 3,8 % | ~7,0 |
| Últimos 7 d (10-27 → 11-02) | 0 | 81 | 0 % | ~5,7 |
| 7 d anteriores (10-20 → 10-26) | 3 | 49 | 6,1 % | ~9,1 |

- **Novena semana seguida de récord en 28 d: 182 impresiones (167 ayer).** La semana suma 81 impresiones, un 65 % más que la anterior, con mejor posición (9,1 → 5,7). El 11-02 trae 17 impresiones aunque es preliminar: la baja del fin de semana (6, 8 y 3) no era una caída.
- **0 clics en la última semana, por primera vez desde que hay volumen.** Los 7 clics de 28 d son los mismos de siempre: 6 de Argentina y 1 de Sudáfrica, casi todos a la home ES (4 de 9 impresiones, pos 1,8). Las impresiones nuevas son EN, desktop y fuera de LatAm: USA ya tiene 37 en pos 7,4 y **ningún clic desde el inicio del log**.
- **Nota de costo EN: 37 imp en pos 5,3 (23 en la última semana, en pos 4,3), 0 clics.** Por día: pos 2,5 el 10-29 (8 imp), 3 el 10-31 (4) y 8 el 11-02 (6). La query de universidad está en 11 imp en pos 4,1. Se decide el 11-05.
- Corrección automática: **la EN mejora** (20 imp en 28 d; en la última semana 12 en pos 6,5, antes promediaba 11,6) y la ES está en 21 en pos 8,4 (11 en pos 7,7 la última semana). Sin clics.
- Migración ES sube a 15 imp en pos 8 (11 hace un día), con 4 el 11-02 en pos 8,2. EN 11 en pos 5,4.
- Queries visibles (9): universidad 11, "apoyo escolar rv" 8 + 1, "automatic grading" 2, "sied" 2 y cuatro con 1 ("graded quiz: model development", "lu apuntes", "luapuntes", "proviamo").
- Dispositivos (28 d): desktop 123 imp con 6 clics, mobile 54 con 1, tablet 5.
- Nota técnica: `get_advanced_search_analytics` ordena por impresiones solo dentro de la página que devuelve, así que con `row_limit` bajo un país grande (USA) puede no salir primero. Hay que pedir todas las filas.

### Indexación
- URL Inspection (20 URLs): todas "Submitted and indexed" con Breadcrumbs válidos. La API cortó por timeouts y errores SSL varias veces; se completó reintentando de a una.
- **Los tres pedidos de indexación del 11-02 funcionaron:** corrección asistida ES se rastreó el 11-02 (no se rastreaba desde el 08-18, a pesar de dos `lastmod` y 8 links internos), SIED ES el 11-02 (desde el 09-16) y el hub EN el 11-03 (desde el 09-29). **Aprendizaje:** para páginas sin impresiones que Google no prioriza, "Solicitar indexación" logra en 1 día lo que `lastmod` + links no lograron en 2 meses. Desde ahora es la primera palanca cuando una página cambiada no se rastrea en una semana.
- Otros rastreos nuevos: generación de evaluaciones ES el 11-01, corrección asistida EN el 11-03, nota de evaluar un tutor EN el 11-01.
- Cambiaron y Google todavía no los releyó: **migración EN** (title y meta del #43, 11-02; último rastreo 10-24) y **nota de corrección ES/EN** (meta del #42, 10-29; últimos rastreos 10-22 y 10-23). Se pidió indexación y respondió `quota_exceeded` en la cuenta `/u/0` (la `/u/1` no tiene acceso a la propiedad). El cupo de ayer todavía no se liberó. Se reintenta mañana.
- Cobros ES/EN: indexadas desde el 10-20 (día de publicación) y sin rastreo nuevo, que es correcto porque el contenido no cambió.

### Evaluación de cambios anteriores (revisión 11-03)
- **#32 (guía de cobros y acceso ES/EN): indexó, pero todavía no tiene demanda. Se consolida sin cambios.** Las dos URLs se indexaron el mismo día de la publicación (10-20), como #4 y #25. En 14 días tienen 3 impresiones: ES 2 en pos 6 (una en pos 10 la última semana) y EN 1 en pos 2 (10-27). La guía de migración y la de protección tardaron 3–4 semanas en pasar de 1–2 impresiones a 10 o más, así que 3 impresiones a los 14 días están dentro de lo esperable. El contenido ya responde lo que la SERP no responde (ver GEO). Cambiarlo ahora sería mover una página sin ningún dato. Se vuelve a mirar el 11-17.
- **#33 (link desde el hub ES/EN): cumplió.** La guía nueva se descubrió en el día. El hub EN no se rastreó por el `lastmod` (lo logró el pedido de indexación del 11-02, ver arriba). El hub ES sigue en pos ~5 (7 imp en 28 d, antes 9 en pos 4,4): no se movió, que era la hipótesis.
- **#34 (cobros en el footer): neutral.** Ninguna señal medible con 3 impresiones. Queda, porque es coherente con migración y protección, que también están en el footer.

### Auditoría técnica (crawl de producción)
- 48/48 URLs del sitemap con 200, canonical self, un H1, JSON-LD que parsea y sin `noindex`. 48 destinos de links internos, 0 rotos y 0 redirigidos. La página con menos links internos de entrada tiene 6. robots.txt permite los 8 bots de IA y llms.txt responde 200.
- Sin cambios: titles de 66–84 caracteres y descriptions de 164–206 en las páginas ya conocidas. Mismo criterio: se corrigen cuando la página se toque por otra razón.

### GEO
- "cómo cobrar cursos online con Mercado Pago y dar acceso automático al alumno" (buscador de la sesión): la SERP la llenan ~12 páginas programáticas de OpenEduCat ("integrations/mercado-pago/boarding-school", "high-school", etc.), el plugin de Moodle `enrol_mpcheckoutpro`, un post de Shopify sobre medios de pago y un reglamento de la UTN. La respuesta generada abre con "no encontró una guía paso a paso específica para vender cursos con Mercado Pago y dar acceso automático" y termina recomendando "una plataforma que reciba la notificación de pago (webhook/IPN)". Es justo el centro de nuestra guía (webhook, conciliación, avisos repetidos). Es el mismo patrón de migración y corrección: el hueco existe y lo cubrimos, pero ese índice no tiene el sitio.
- "vantalogics plataformas educativas": 0 resultados del sitio. El bloqueo sigue siendo de índice (Bing), y se revisa el 11-09.
- IndexNow manual de la nota de corrección ES/EN (el cambio de meta del #42 no se había avisado porque el `lastmod` no cambió): 200.

### Cambios
- **Ninguno en el sitio.** La revisión de hoy (cobros) pide esperar, no cambiar. Las páginas con señal están bloqueadas por revisiones en curso: nota de costo (11-05), páginas de evaluación y meta de la nota de corrección (11-12), migración EN (11-16). Las páginas sin bloqueo tienen 0–9 impresiones, casi todas de marca. Lo útil de hoy era de índice: confirmar que el pedido de indexación funciona y avisar a Bing del cambio de meta.

### Envíos
- Sin deploy. IndexNow: 200 para las 2 URLs de la nota de corrección.
- Pedido de indexación de migración EN y nota de corrección ES/EN: `quota_exceeded`. Pasa a mañana.

### Pendientes / hipótesis para próximas corridas
- **11-04**: reintentar el pedido de indexación de migración EN y nota de corrección ES/EN, primero. Después, protección ES: sigue en 12 imp en pos 6,5 con 1 clic (4 en pos 5,8 la última semana). Si se sostiene, no se toca.
- **11-05**: nota de costo (#35/#36). Criterio de la corrida 20. En la última semana salió 23 veces en pos 4,3; hay que contar cuántas impresiones salieron en pos ≤ 3 (por día: 10-27 2 en 3,5; 10-28 1 en 3; 10-29 8 en 2,5; 10-31 4 en 3, o sea ~15) y si sigue sin clics.
- **11-09**: Bing (#39 y #40).
- **11-12**: páginas de servicio de evaluación (#41) y meta de la nota de corrección (#42). La meta solo cuenta desde que Google relea la nota.
- **11-16**: migración EN (#43). Igual: cuenta desde el rastreo.
- **11-17**: cobros ES/EN (#32). Si sigue con menos de 5 impresiones, mirar si el title ES compite con el hub por "cobrar cursos online" y si conviene un link desde la nota o el caso con más rastreo.
- **USA, 37 impresiones y 0 clics desde el inicio**: no es una página sino un público. Si el 11-05 la nota de costo EN pasa a title nuevo y sigue en 0, es la próxima línea de análisis (intención informacional pura de universidades que no buscan proveedor).
- Para el dueño, siguen abiertos: Bing Webmaster Tools; `sameAs` con perfiles reales; autor con nombre; links desde los sitios de los clientes; el commit `6ce459f` con atribución, y los montos de comisión de Hotmart en el pilar.
- No tocar: nota de costo y notas relacionadas (11-05), índice de casos (11-06), IndexNow y H1 de la home (11-09), páginas de servicio de evaluación y meta de la nota de corrección (11-12), migración EN (11-16), cobros (11-17).

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 15 (10-23) | 09-25 → 10-22 | 7 | 108 | 10,0 |
| 16 (10-26) | 09-28 → 10-25 | 6 | 119 | 9,3 |
| 17 (10-27) | 09-29 → 10-26 | 7 | 125 | ~9,2 |
| 18 (10-28) | 09-30 → 10-27 | 7 | 137 | 8,6 |
| 19 (10-29) | 10-01 → 10-28 | 7 | 142 | 8,3 |
| 20 (10-30) | 10-02 → 10-29 | 7 | 158 | 7,9 |
| 21 (11-02) | 10-05 → 11-01 | 7 | 167 | ~6,9 |
| 22 (11-03) | 10-06 → 11-02 | 7 | 182 | ~7,0 |

---

## 2026-11-04 — Corrida 23

### Métricas generales (GSC, datos hasta 2026-11-03; el 11-03 es preliminar)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (10-07 → 11-03) | 6 | 195 | 3,1 % | ~6,8 |
| Últimos 7 d (10-28 → 11-03) | 0 | 79 | 0 % | ~6,1 |
| 7 d anteriores (10-21 → 10-27) | 1 | 58 | 1,7 % | ~8,2 |

- **Décima semana seguida de récord en 28 d: 195 impresiones (182 ayer).** El 11-02 cerró en 18 y el 11-03 ya trae 15 siendo preliminar. La posición de la semana mejora de 8,2 a 6,1.
- **Clics: 6 en 28 d, uno menos que ayer, solo porque el clic del 10-06 salió de la ventana.** Van 8 días seguidos sin clics (el último fue migración ES el 10-26). Los 6 clics son de Argentina (5 desktop y 1 mobile), y 4 son de la home ES (9 imp, pos 1,8).
- **Nota de costo EN: 40 imp en pos 5,0, 0 clics** (26 en la última semana, en pos 4,5). La query de universidad tiene 9 imp en pos 2,9 en esta ventana.
- Corrección automática ES 23 imp en pos 8,0, EN 21 en pos 10,9 (en la última semana, 11 en pos 7,6, antes 4 en pos 14,8). Migración ES 16 en pos 7,6 con 1 clic, EN 11 en pos 5,4. Protección ES 15 en pos 6,4 con 1 clic. `/en/` 26 en pos 3,8 sin clics.
- Queries visibles (9), las mismas de ayer: universidad 9, "apoyo escolar rv" 8 + 1, "automatic grading" 2 (pos 45,5), "sied" 2 y cuatro con 1.
- Países (28 d): USA desktop 34 imp en pos 7,5 y USA mobile 6, los dos sin clics. Argentina desktop 24 con 5 clics, Argentina mobile 10 con 1. Después vienen España (14), Colombia (8) y Canadá (6).

### Indexación
- **Pedidos de indexación reintentados, los tres con respuesta "requested":** migración EN (title y meta del #43, último rastreo 10-24), nota de corrección ES (ya era un pedido repetido) y nota de corrección EN. El cupo de `/u/0` se había liberado.
- **La nota de corrección ya se releyó con la meta del #42:** ES el 11-03 y EN el 11-02. La revisión del 11-12 cuenta desde esas fechas.
- Otros rastreos nuevos: corrección asistida EN el 11-03, caso SIED ES y `/casos/` el 11-02, corrección asistida ES el 11-02 (por el pedido del 11-02).
- Sin rastreo nuevo y sin cambios pendientes: protección ES (10-24), protección EN (10-06), cobros EN (10-20) y nota de costo EN (10-30). Todas tienen la versión actual indexada.
- URL Inspection: las 16 URLs que respondieron están "Submitted and indexed" con Breadcrumbs válidos. Home ES/EN, hub EN, migración ES y cobros ES no respondieron por timeouts de la API. No cambiaron desde su último rastreo, así que no se reintentó.
- Sitemap: 48 URLs válidas, 0 errores, último download 11-02.

### Evaluación de cambios anteriores (revisión 11-04)
- **Protección ES: se sostiene y mejora. Se consolida sin cambios.** En 28 d tiene 15 imp en pos 6,4 y 1 clic (12 en pos 6,5 el 11-02). En la última semana tuvo 6 imp en pos 5,3, contra 4 en pos 14,2 la semana anterior. Las impresiones son de 1 a 3 por día, con posiciones de 1 a 10 y una suelta en 30. El criterio era "si se sostiene, no se toca".
- **Protección EN: 2 imp en 28 d (pos 5,5) contra 15 de la ES**, sin rastreo desde el 10-06. El contenido indexado es el actual, así que un pedido de indexación no cambiaría nada. La SERP en inglés (ver GEO) la ocupan universidades, LMS y vendedores de DRM, con más autoridad que este sitio. No es algo que se arregle con title o meta: hace falta que Bing y los LLMs tengan el sitio (11-09).

### Auditoría técnica (crawl de producción)
- 48/48 URLs del sitemap con 200, todas con `lastmod`, canonical self, un H1, JSON-LD que parsea y sin `noindex`. 49 destinos de links internos, 0 rotos y 0 redirigidos. robots.txt permite los 8 bots de IA y llms.txt responde 200.
- `/en/solutions/` (índice con una sola solución) tiene 9 imp en pos 4,2. La página de la solución, `/en/solutions/edtech-and-learning-platforms/`, tiene 1. Es el riesgo de canibalización que anotó la corrida 1, pero las queries están anonimizadas y son 9 impresiones. No se fusiona sin ver la query. Si llega a 20 impresiones, o si aparece una query visible compartida, se evalúa un 301 del índice a la solución o un índice con contenido propio.

### GEO
- "cómo evitar que compartan la cuenta de un curso online y descarguen los videos" (buscador de la sesión): vdocipher (2 resultados), SendPulse, VideoShield, foros de HP Academy y el Brightspace de Vanderbilt. La respuesta generada propone sesión única, streaming sin URL directa y marca de agua con el nombre del alumno. Ninguna fuente da datos de una academia real. Nuestra página es la única con cifras (1.248 alertas, falsos positivos, PDFs cifrados), pero ese índice no tiene el sitio.
- La misma búsqueda en inglés trae Vanderbilt, Knorish, Learnyst, Inkrypt, foros de Moodle y Canvas y una patente. Es el mismo patrón, y explica por qué la EN no despega en Google.

### Cambios
- **Ninguno en el sitio.** La revisión de hoy (protección ES) pedía consolidar. Las páginas con más señal tienen revisión pendiente: nota de costo (mañana), evaluación y nota de corrección (11-12), migración EN (11-16), cobros (11-17). Las páginas sin bloqueo tienen menos de 10 impresiones y queries anonimizadas. Hoy no se gastó cupo de indexación en páginas sin cambios, para guardarlo para el cambio de la nota de costo.

### Envíos
- Sin deploy, sin IndexNow y sin reenvío del sitemap (no cambió nada).
- Pedido de indexación: migración EN y nota de corrección ES/EN, las tres "requested".

### Pendientes / hipótesis para próximas corridas
- **11-05: nota de costo EN (#35/#36), con el criterio de la corrida 20.** Dato para la decisión: con datos hasta el 11-03, las impresiones en pos ≤ 3 son ~15 (10-25 2 en pos 2, 10-28 1 en 3, 10-29 8 en 2,5 y 10-31 4 en 3, más 10-27 con 2 en 3,5, en el límite), todas sin clics. El umbral es 20. Las últimas tres fechas salieron en pos 5, 8 y 4,6. Si no llega a 20, hay que decidir si el criterio de "pos ≤ 3" sigue siendo el correcto con 40 impresiones en pos 5 y 0 clics, o si alcanza con eso para probar el title de ≤ 60 caracteres (hoy tiene 77 y Google lo corta).
- **11-05**: confirmar que migración EN y la nota de corrección EN se rastrearon por el pedido de hoy.
- **11-09**: Bing (#39 y #40). Protección, migración, cobros y costo dependen de ese índice para GEO.
- **11-12**: páginas de servicio de evaluación (#41) y meta de la nota de corrección (#42), que ya está releída.
- **11-16**: migración EN (#43). **11-17**: cobros ES/EN (#32).
- `/en/solutions/` vs la página de la solución EdTech: mirar cuando pase 20 impresiones.
- Para el dueño, siguen abiertos: Bing Webmaster Tools; `sameAs` con perfiles reales; autor con nombre; links desde los sitios de los clientes; el commit `6ce459f` con atribución, y los montos de comisión de Hotmart en el pilar.
- No tocar: nota de costo y notas relacionadas (11-05), índice de casos (11-06), IndexNow y H1 de la home (11-09), páginas de servicio de evaluación y meta de la nota de corrección (11-12), migración EN (11-16), cobros (11-17), protección (consolidada; no se reabre sin un dato nuevo).

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 15 (10-23) | 09-25 → 10-22 | 7 | 108 | 10,0 |
| 16 (10-26) | 09-28 → 10-25 | 6 | 119 | 9,3 |
| 17 (10-27) | 09-29 → 10-26 | 7 | 125 | ~9,2 |
| 18 (10-28) | 09-30 → 10-27 | 7 | 137 | 8,6 |
| 19 (10-29) | 10-01 → 10-28 | 7 | 142 | 8,3 |
| 20 (10-30) | 10-02 → 10-29 | 7 | 158 | 7,9 |
| 21 (11-02) | 10-05 → 11-01 | 7 | 167 | ~6,9 |
| 22 (11-03) | 10-06 → 11-02 | 7 | 182 | ~7,0 |
| 23 (11-04) | 10-07 → 11-03 | 6 | 195 | ~6,8 |

---

## 2026-11-05 — Corrida 24

### Métricas generales (GSC, datos hasta 2026-11-04; el 11-04 es preliminar)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (10-08 → 11-04) | 6 | 214 | 2,8 % | 8,8 (6,9 sin el 11-04) |
| Últimos 7 d (10-29 → 11-04) | 0 | 91 | 0 % | 10,8 |
| 7 d anteriores (10-22 → 10-28) | 1 | 62 | 1,6 % | 7,1 |

- **Undécima semana seguida de récord en 28 d: 214 impresiones (195 ayer).** El 11-04 trae 22 impresiones aunque es preliminar, el mejor día del log.
- **La posición empeora solo por un dato raro:** el 11-04 la nota de corrección EN salió 5 veces en pos 87,6. Son 5 impresiones de Brasil desktop en pos ~81, con una query anonimizada. Sin ese día, los 28 d están en pos 6,9, igual que ayer. No es una caída: son impresiones nuevas en posiciones profundas que antes no aparecían.
- **Clics: 6 en 28 d, y 10 días seguidos sin clics** (el último fue migración ES el 10-26). Todos los clics de la ventana son de Argentina.
- **Nota de costo EN: 47 imp en pos 4,9, 0 clics** (40 ayer). La query de universidad tiene 11 imp en pos 2,5, y el 11-04 salió 2 veces **en pos 1** (Emiratos e Irlanda), sin clic. La ES tiene 5 imp en pos 6.
- Corrección ES 24 imp en pos 8,1. Corrección EN 26 imp en pos 25,7 (el promedio lo arrastra el 11-04). Migración ES 17 en pos 7,7 con 1 clic, EN 11 en pos 5,4. Protección ES 15 en pos 6,4 con 1 clic. `/en/` 26 en pos 3,8.
- Queries visibles (9), las mismas de siempre: universidad 11, "apoyo escolar rv" 8 + 2, "luapuntes" 3, "automatic grading" 2 (pos 45,5), "sied" 2, y tres con 1.
- Países (7 d): USA desktop 15 imp en pos 7,3, Argentina mobile 10 en pos 7,9, Brasil desktop 5 en pos 81 (el dato raro), Canadá 4 y España 4. Ninguno tiene clics.

### Indexación
- **Migración EN se rastreó el 11-04 a las 12:02**, por el pedido de ayer. Ya tiene el title y la meta del #43, así que la revisión del 11-16 cuenta desde el 11-04.
- La nota de corrección EN sigue con el rastreo del 11-02. Ya tenía la meta del #42, así que no hay nada pendiente.
- La inspección en lote cortó la conexión (como en corridas anteriores). Se inspeccionaron de a una las dos URLs pendientes: las dos "Submitted and indexed" con Breadcrumbs válidos.
- Sitemap: 48 URLs válidas, 0 errores. Se reenvió después del deploy (12:04).

### Evaluación de cambios anteriores (revisión 11-05)
- **#35 (4 notas relacionadas) y #36 (link contextual desde tutor o búsqueda): cumplieron. Se consolidan.** Desde el 10-22 la nota de costo EN pasó de 17 a 47 impresiones en 28 d, con la posición entre 4 y 5. La query de universidad pasó de pos ~4,7 a 2,5, con pos 1 el 11-04. La ES pasó de 1 a 5 impresiones. No se puede separar el efecto de los links del de la antigüedad de la página, pero ninguna señal es negativa y el objetivo era sostener el top 5.
- **Criterio del title (corrida 20): el umbral literal no se alcanzó, pero se cambia igual.** Hay ~17 impresiones en pos ≤ 3 (10-25 2, 10-27 2 en 3,5, 10-28 1, 10-29 8, 10-31 4, y 11-04 2 en pos 1 por la query), menos que las 20 fijadas. Pero el total es de 47 impresiones en pos 4,9 sin un clic. Con un CTR esperado conservador del 4–5 % en pos 5, saldrían ~2 clics, y la probabilidad de 0 por azar baja a ~10 %. Además, el title de 77 caracteres sale cortado. Seguir esperando no da más información; cambiarlo sí.

### Auditoría técnica (crawl de producción, después del deploy)
- 48/48 URLs del sitemap con 200, todas con `lastmod`, canonical self, un H1, JSON-LD que parsea y sin `noindex`. 49 destinos de links internos, 0 rotos y 0 redirigidos. robots.txt permite los 8 bots de IA y llms.txt responde 200.

### GEO
- "how much does it cost to add ai tutoring to our university? per student active vs enrolled" (buscador de la sesión): citan 4 posts de ibl.ai ("AI cost math for higher education: per seat vs usage", "what AI tutoring actually costs 2026"), quadc, liveinthefuture y otros. La respuesta generada se arma sobre dos ideas: un inscripto no es un usuario activo, y la licencia por asiento cobra por matrícula mientras que el costo por uso sigue a los activos. Todas las fuentes son de vendedores, con montos en USD, y la respuesta lo marca como debilidad ("sources have a commercial interest"). Cierra con que hay que medir la proporción de activos con un piloto. Esa es justo la recomendación de nuestra nota (búsqueda semántica primero), así que la sección nueva la conecta.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 44 | `/en/blog/how-much-does-an-ai-tutor-cost-per-student/` + `/blog/cuanto-cuesta-un-tutor-de-ia-por-alumno/` | **Title EN** de 77 a 59 caracteres: "AI tutoring cost per student for a university — Vantalogics". Usa las palabras de la query ("AI tutoring", "cost", "university"). **Meta EN** de 175 a 153: "Model cost follows active students, not enrolled ones. How to estimate it before building, why architecture can multiply it 126×, and 4 levers to cut it." **Title ES** de 71 a 55: "¿Cuánto cuesta un tutor de IA por alumno? — Vantalogics". No lleva "universidad" porque la ES no tiene ninguna query de universidad, y su público es de academias. **Meta ES** de 178 a 151, con la misma idea. **Sección nueva en las dos**, después de "La unidad correcta…": "En una universidad: inscriptos no es lo mismo que activos". Trae la proporción de activos variable por materia y por momento del cuatrimestre, el cálculo con el mes pico, una tabla de licencia por asiento contra costo por uso (qué se paga, previsibilidad, inactivos, qué la protege), y cuándo conviene cada una. Cierra con cómo medir los activos con la búsqueda semántica. **Sin montos y sin cifras de terceros**: la sección es método y comparación. `updated` → 2026-11-05, porque cambia el contenido. AR no se toca (noindex). | 47 imp en pos 4,9 y 0 clics en 28 d. La única query visible es de universidad, con 11 imp en pos 2,5 y pos 1 el 11-04. El title salía cortado y no decía "university"; la página solo trataba universidades en una FAQ. La respuesta generada para esa query cita a otros justo por "active vs enrolled" y "per seat vs usage" (corrida 20 y hoy). Title y sección van juntos a propósito: un title que promete "for a university" tiene que tener contenido que lo cumpla. | El snippet con title completo y la palabra de la query lleva el CTR de 0 a algún clic, sin perder posición. La sección hace la nota citable para la intención de universidades en motores de IA cuando el sitio entre en ese índice. | CTR y clics de la nota EN y de la query de universidad (28 d); posición, que no debería caer de ~5; rastreo de la versión nueva; impresiones de queries con "enrolled", "per seat" o "university". | 2026-11-19 |

### Envíos
- Deploy por push a `main` (commit `af5a3b4`, run 42023979265, ok en 36 s). En producción ya salen los titles, las metas y la sección nuevos.
- IndexNow desde CI: 200 para 6 URLs (las dos notas, los índices del blog y las páginas que las listan, por el `lastmod`).
- Sitemap reenviado a GSC (12:04).
- Pedido de indexación: nota de costo EN y ES, las dos "requested" (la ES ya tenía un pedido anterior).
- Ningún commit de esta corrida lleva atribución.

### Pendientes / hipótesis para próximas corridas
- **11-06**: confirmar el rastreo de la nota de costo ES/EN. Índice de casos (revisión pendiente).
- **11-09**: Bing (#39 y #40). Es el bloqueo común de GEO para costo, protección, migración y cobros: las respuestas generadas citan a otros con menos evidencia, porque ese índice no tiene el sitio.
- **11-12**: páginas de servicio de evaluación (#41) y meta de la nota de corrección (#42).
- **11-16**: migración EN (#43), con rastreo del 11-04. **11-17**: cobros ES/EN (#32).
- **11-19**: nota de costo (#44). Si sigue en 0 clics con 30 o más impresiones nuevas en pos ≤ 5, la intención es informacional de AI Overviews/AI Mode (preguntas largas con "our university"), y la palanca deja de ser el snippet: el valor de la página pasa a ser la cita en IA, no el clic.
- Seguir el dato raro de corrección EN (5 imp en pos ~81 desde Brasil el 11-04). Si se repite, mirar la query cuando salga del anonimato.
- `/en/solutions/` vs la solución EdTech: mirar cuando pase 20 impresiones (hoy 9).
- Para el dueño, siguen abiertos: Bing Webmaster Tools; `sameAs` con perfiles reales; autor con nombre; links desde los sitios de los clientes; el commit `6ce459f` con atribución, y los montos de comisión de Hotmart en el pilar.
- No tocar: índice de casos (11-06), IndexNow y H1 de la home (11-09), páginas de servicio de evaluación y meta de la nota de corrección (11-12), migración EN (11-16), cobros (11-17), nota de costo ES/EN y notas relacionadas (11-19), protección (consolidada).

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 15 (10-23) | 09-25 → 10-22 | 7 | 108 | 10,0 |
| 16 (10-26) | 09-28 → 10-25 | 6 | 119 | 9,3 |
| 17 (10-27) | 09-29 → 10-26 | 7 | 125 | ~9,2 |
| 18 (10-28) | 09-30 → 10-27 | 7 | 137 | 8,6 |
| 19 (10-29) | 10-01 → 10-28 | 7 | 142 | 8,3 |
| 20 (10-30) | 10-02 → 10-29 | 7 | 158 | 7,9 |
| 21 (11-02) | 10-05 → 11-01 | 7 | 167 | ~6,9 |
| 22 (11-03) | 10-06 → 11-02 | 7 | 182 | ~7,0 |
| 23 (11-04) | 10-07 → 11-03 | 6 | 195 | ~6,8 |
| 24 (11-05) | 10-08 → 11-04 | 6 | 214 | 8,8 (6,9 sin el 11-04) |

---

## 2026-11-06 — Corrida 25

### Métricas generales (GSC, datos hasta 2026-11-05; el 11-05 es preliminar)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (10-09 → 11-05) | 6 | 228 | 2,6 % | 8,8 (7,1 sin el 11-04) |
| Últimos 7 d (10-30 → 11-05) | 0 | 91 | 0 % | 11,6 (7,3 sin el 11-04) |
| 7 d anteriores (10-23 → 10-29) | 1 | 72 | 1,4 % | 6,1 |

- **Duodécima semana seguida de récord en 28 d: 228 impresiones (214 ayer).** El 11-04 cerró en 23, el mejor día del log, y el 11-05 ya trae 18 siendo preliminar.
- La posición sigue arrastrada por el dato raro del 11-04 (corrección EN, 5 imp en pos ~88 desde Brasil). **No se repitió:** el 11-05 la misma nota salió 1 vez en pos 2.
- **Clics: 6 en 28 d, todos de Argentina, y 11 días seguidos sin clics** (el último fue migración ES el 10-26).
- **Nota de costo EN: 54 imp en pos 4,7, 0 clics.** El 11-05 salió 6 veces en pos 2,5, con 4 impresiones en pos 1 (Francia, India, y el 11-04 Emiratos e Irlanda). La query de universidad tiene 13 imp en pos 2,3. Todo eso es con el title viejo (ver Indexación).
- Corrección ES 28 imp en pos 8,2 y EN 27 (pos 24,8 por el 11-04). Migración ES 17 en pos 7,7 con 1 clic, EN 12. Protección ES 15 en pos 6,4 con 1 clic. Nota de costo ES 7 en pos 7.
- `/en/` bajó a 24 imp en 28 d y 1 en la última semana. No es una caída: por día siempre fue 0–2, salvo un pico de 9 el 10-27 que sostenía el promedio.
- Queries visibles (10): universidad 13, "apoyo escolar rv" 8 + 2, "luapuntes" 4 + "lu apuntes" 1, "automatic grading" 2 (pos 45,5), "sied" 2, **"migrate from engrade pro" 2 en pos 33,5 (nueva, migración EN)**, "graded quiz: model development" 1 y "proviamo" 1. Engrade era un gradebook escolar. No es el público de academias y está en pos 33: no se actúa.
- Países (28 d): USA 47 imp en pos 8,2 y 0 clics, Argentina 41 con los 6 clics, España 16, Brasil 10 (pos 45 por el dato raro), Canadá 9 y Reino Unido 9.

### Indexación
- **La nota de costo EN se releyó el 11-05 a las 21:46**, unas 10 horas después del deploy y del pedido de indexación. Google ya tiene el title de 59 caracteres, la meta nueva y la sección de universidades. Las impresiones del 11-05 son anteriores o casi simultáneas, así que la revisión del 11-19 cuenta desde el 11-06.
- **La nota de costo ES sigue con el rastreo del 10-29.** Se volvió a pedir indexación y respondió `requested` con `again: false`, o sea que el pedido de ayer no había quedado registrado para esa URL. Se mira mañana.
- Índice de casos ES/EN: "Submitted and indexed", rastreados el 10-23 (día de publicación), Breadcrumbs válidos.
- Sitemap: 48 URLs válidas, 0 errores, último download 11-05 12:04.

### Evaluación de cambios anteriores (revisión 11-06)
- **#37 (índice de casos ES/EN): indexó en 0 días, tiene poca demanda propia y se consolida sin cambios.** En 14 días suma 4 impresiones: `/casos/` 2 en pos 4 y `/en/cases/` 2 en pos 9, con queries anonimizadas. Los 8 casos pasaron de 22 impresiones en 28 d (10-26) a 35 hoy: Lu Apuntes ES 10 (pos 8,1, sube con "luapuntes" desde Argentina mobile), Apoyo Escolar RV ES 9 (pos 16), SIED EN 6, Apoyo Escolar RV EN 4, Dr. La Rosa ES 3 y EN 2, SIED ES 1. Casos más índice son el 17 % de las impresiones (39 de 228), casi lo mismo que el 18 % del 10-23. Todas las queries visibles son de la marca del cliente, lo que confirma el aprendizaje del 11-02: los casos no traen clics desde Google, y su papel es ser evidencia para guías y notas. No hay ningún dato para cambiar el índice. Queda como página citable para motores de IA.
- GEO del #37: el buscador de la sesión, para "casos de plataformas educativas a medida academias online", responde que **"no encontró casos detallados de academias online a medida con métricas de resultados de estudiantes"** y cita un caso de DataArt y una consultora. Es exactamente lo que publica `/casos/` (4 academias, alumnos por caso, qué se resolvió). Es el mismo bloqueo de siempre: ese índice no tiene el sitio ("vantalogics" sigue sin devolver nada propio). Se revisa el 11-09 con Bing.

### Auditoría técnica (crawl de producción)
- 48/48 URLs del sitemap con 200, todas con `lastmod`, canonical self, un H1, JSON-LD que parsea y sin `noindex`. 49 destinos de links internos, 0 rotos y 0 redirigidos. robots.txt permite los 8 bots de IA y llms.txt responde 200.

### Cambios
- **Ninguno en el sitio.** La revisión de hoy (índice de casos) pide consolidar. La nota de costo recién se releyó con el cambio de ayer, y tocarla ahora mezclaría señales. Las otras páginas con impresiones tienen revisión pendiente (evaluación y corrección 11-12, migración EN 11-16, cobros 11-17). Las demás tienen menos de 10 impresiones o queries de marca de clientes. La única query nueva ("migrate from engrade pro") no es del público.

### Envíos
- Sin deploy, sin IndexNow y sin reenvío del sitemap (no cambió nada).
- Pedido de indexación: nota de costo ES, `requested`.

### Pendientes / hipótesis para próximas corridas
- **11-07**: confirmar el rastreo de la nota de costo ES. Ver si la nota EN ya muestra el title nuevo en las impresiones del 11-06 en adelante (posición y CTR por día).
- **11-09**: Bing (#39 y #40). Es el bloqueo común de GEO: el buscador de la sesión no tiene el sitio y responde que falta justo lo que publicamos (casos con métricas, migración, cobros, protección, costo por activos).
- **11-12**: páginas de servicio de evaluación (#41) y meta de la nota de corrección (#42).
- **11-16**: migración EN (#43). **11-17**: cobros ES/EN (#32). **11-19**: nota de costo (#44), contando desde el rastreo del 11-05.
- Lu Apuntes ES sube (10 imp, 7 en la última semana) por la búsqueda de la marca. Si aparece una query no de marca, mirarla.
- `/en/solutions/` vs la solución EdTech: mirar cuando pase 20 impresiones (hoy 7).
- Para el dueño, siguen abiertos: Bing Webmaster Tools; `sameAs` con perfiles reales; autor con nombre; links desde los sitios de los clientes; el commit `6ce459f` con atribución, y los montos de comisión de Hotmart en el pilar.
- No tocar: IndexNow y H1 de la home (11-09), páginas de servicio de evaluación y meta de la nota de corrección (11-12), migración EN (11-16), cobros (11-17), nota de costo ES/EN y notas relacionadas (11-19), protección e índice de casos (consolidados; no se reabren sin un dato nuevo).

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 15 (10-23) | 09-25 → 10-22 | 7 | 108 | 10,0 |
| 16 (10-26) | 09-28 → 10-25 | 6 | 119 | 9,3 |
| 17 (10-27) | 09-29 → 10-26 | 7 | 125 | ~9,2 |
| 18 (10-28) | 09-30 → 10-27 | 7 | 137 | 8,6 |
| 19 (10-29) | 10-01 → 10-28 | 7 | 142 | 8,3 |
| 20 (10-30) | 10-02 → 10-29 | 7 | 158 | 7,9 |
| 21 (11-02) | 10-05 → 11-01 | 7 | 167 | ~6,9 |
| 22 (11-03) | 10-06 → 11-02 | 7 | 182 | ~7,0 |
| 23 (11-04) | 10-07 → 11-03 | 6 | 195 | ~6,8 |
| 24 (11-05) | 10-08 → 11-04 | 6 | 214 | 8,8 (6,9 sin el 11-04) |
| 25 (11-06) | 10-09 → 11-05 | 6 | 228 | 8,8 (7,1 sin el 11-04) |

---

## 2026-11-09 — Corrida 26

### Métricas generales (GSC, datos hasta 2026-11-08; el 11-08 es preliminar)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (10-12 → 11-08) | 5 | 248 | 2,0 % | 8,4 (6,8 sin el 11-04) |
| Últimos 7 d (11-02 → 11-08) | 0 | 102 | 0 % | 10,4 (~6,2 sin el 11-04) |
| 7 d anteriores (10-26 → 11-01) | 1 | 70 | 1,4 % | 5,3 |

- **Decimotercera semana seguida de récord en 28 d: 248 impresiones (228 el 11-06).** La semana pasó de 70 a 102 impresiones (+46 %).
- **Clics: 5 en 28 d (se fue de la ventana un clic del 10-11) y 14 días seguidos sin clics.** Los 5 son de Argentina. USA suma 51 impresiones en pos 7,9 sin ningún clic desde el inicio del log.
- **Nota de costo EN: 63 imp en pos 4,2, 0 clics.** Con el title nuevo (Google la releyó el 11-05 a las 21:46) suma 10 impresiones en pos ~1,8 (11-06: 5 en 1,6; 11-07: 3 en 2,7; 11-08: 2 en 1). La query de universidad tiene 18 imp en pos 1,4 en 28 d. Una página en pos 1–2 con 18 impresiones y 0 clics es la señal de que la respuesta se da arriba del resultado (AI Overview o AI Mode). Se evalúa el 11-19 con el criterio de la corrida 24.
- Corrección EN 29 imp (pos 23,2 por el dato raro del 11-04, que no se repitió) y ES 28 en pos 8,2. Migración ES 17 en pos 7,7 con 1 clic, EN 12 en 9,9. Protección ES 17 en pos 6,8 con 1 clic. `/en/` 24 en pos 3,8.
- Queries visibles (12): universidad 18, "apoyo escolar rv" 9 + 2 + "app apoyo escolar rv" 1, "luapuntes" 5 + 1, "lu apuntes" 1, "automatic grading" 2 (pos 45,5), "migrate from engrade pro" 2 (pos 33,5), "sied" 2, y **"vender apuntes digitales" 1 en pos 15 hacia el caso Lu Apuntes: es la primera query no de marca de ese caso**. Una impresión no alcanza para actuar. Se anota.

### Indexación
- Nota de costo ES: **rastreada el 11-07 a las 00:13**, con el title y la sección nuevos. El pedido del 11-06 funcionó. "Submitted and indexed", Breadcrumbs válidos.
- Caso Lu Apuntes ES: rastreado el 11-06, indexado.
- Sitemap: 48 URLs, todas con `lastmod`. No cambió nada en el sitemap hoy, así que no se reenvió.

### Evaluación de cambios anteriores (revisión 11-09: #39 IndexNow diferencial y #40 H1 de la home)

**Fuente nueva: los logs de Cloudflare.** Bing y DuckDuckGo devuelven captcha o resultados basura a cualquier búsqueda automática, también desde el Chromium de Agora (las dos corridas anteriores tampoco pudieron leer `site:`). En lugar de adivinar qué tiene Bing, hoy se miró quién pide qué página, con la API GraphQL de Cloudflare (`httpRequestsAdaptiveGroups` por user agent). Queda como `bun run crawlers [días] [bot]` (`scripts/crawler-hits.mjs`). Los conteos de 30 días vienen muestreados (múltiplos de 10). Los de 7 días son casi exactos.

- **#39: Bing rastrea el cluster. Se consolida a nivel de rastreo.** En 7 días bingbot hizo 124 pedidos sobre ~50 rutas: protección ES/EN, hub EN, migración EN, nota de costo ES (3 veces después del aviso del 11-05), nota de corrección ES y EN (13 veces la EN), evaluar un tutor, RAG, casos y soluciones. En 30 días son ~820 pedidos sobre 41 páginas. Antes se creía que Bing solo tenía una foto vieja de 10 URLs. Eso era lo que mostraba `site:`, no lo que rastrea. Qué indexa y con qué título sigue sin poder verse sin Bing Webmaster Tools (tarea del dueño, abierta desde el 10-05).
- **#40 (H1 de la home):** bingbot pidió `/` 4 veces en 7 días, después del cambio. `/en/` no aparece en esos 7 días. El HTML crudo dice bien "detrás de" y "behind education". Sin más señal posible. Se cierra como corrección hecha.
- **GEO, el dato más importante del log hasta hoy: ChatGPT ya trae nuestras páginas.**
  - **OAI-SearchBot** (el índice de búsqueda de ChatGPT) relee **protección ES y EN todos los días** a las 04:15 y 04:38 UTC. En 30 días solo pidió esas dos y `/en/cases/`. Ninguna otra página del sitio está en su ciclo.
  - **ChatGPT-User** (un usuario de ChatGPT que hace que el modelo abra la página en vivo): 8 pedidos en 7 días y ~70 en 30. Pidió `/` (10-25, 11-02, 11-04, 11-05), protección ES el 11-03 y EN el 10-30, el hub `/plataformas-educativas` el 10-29 y una sesión el 11-08 a las 17:50 que abrió `/`, `/plataformas-educativas/`, `/casos/apoyo-escolar-rv/` y `/privacidad/` en el mismo minuto. Eso parece alguien investigando a Vantalogics desde ChatGPT.
  - **PerplexityBot**: nota de corrección ES (11-06) y evals EN (11-02). **GPTBot** solo baja el sitemap todos los días. **ClaudeBot**: 160 pedidos en 30 d pero ninguno a una página (todos `robots.txt` o rutas que no existen). Claude-User y Claude-SearchBot: 0. Bot Management de Cloudflare tiene todo en `disabled`: no se bloquea a ningún bot de IA.
  - Aprendizaje: **la página de protección es la única del sitio en el ciclo diario del índice de ChatGPT**. Es la primera página del cluster (10-06) y la de mejor evidencia propia. Las notas de costo, corrección, migración y cobros, que son las que más impresiones tienen en Google, no aparecen en OAI-SearchBot.
- Los "404 en `/`" y "301 en `/blog/`" que aparecen con user agent de Googlebot o GPTBot no son del sitio: son otros hostnames de la zona (`www` redirige con 301; `portal`, `agent` y `tracing` no son el sitio) o escáneres que se hacen pasar por Googlebot (`/wp/`, `/wp-json/`, `/serverless.yml`). El script filtra ahora por `vantalogics.com`.

### Auditoría técnica (crawl de producción)
- 48/48 URLs del sitemap con 200, `lastmod`, canonical self, un H1, JSON-LD que parsea, sin `noindex`. 48 destinos de links internos, 0 rotos y 0 redirigidos. robots.txt permite los 8 bots de IA. llms.txt 200. hreflang es/en/x-default, sin alternativos a `/ar/`.
- **Error encontrado: las redirecciones canónicas eran temporales o no existían.**
  1. Toda URL sin barra final respondía **307** (temporal) hacia la versión con barra. Es el `auto-trailing-slash` de Workers Assets. Google y Bing tratan un 307 como temporal: no consolidan del todo las señales en la URL de destino.
  2. `http://vantalogics.com/*` respondía **200** con la página entera, sin redirigir a https. Eran dos versiones de cada página. El canonical apuntaba bien a https, pero la redirección es la señal fuerte.
  - El dato que lo hace relevante: ChatGPT-User pidió `/plataformas-educativas` **sin barra** (10-29). O sea, ChatGPT tiene o arma la URL sin barra y la va a citar así.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 45 | Todo el sitio (`worker/index.ts`) | `http://vantalogics.com/*` → **301** a https (antes 200). URL sin barra final → **301** a la versión con barra, conservando la query (antes 307). Solo se convierte el 307 cuyo destino es la misma ruta con barra. `www` y los retirados siguen con 301 como antes. El contenido no cambia, y tampoco el sitemap ni el `lastmod`: IndexNow respondió "no URL changed, nothing sent". Probado en `wrangler dev` (127.0.0.1) y en producción: `/plataformas-educativas` 301, `/en/blog?x=1` 301 con la query, `http://…/` 301, 404 sigue en 404, robots, llms y sitemap en 200. | Logs de Cloudflare: ChatGPT-User pidió `/plataformas-educativas` sin barra y recibió un 307. Producción: http servía 200 en todas las páginas. | Las menciones y los links sin barra o con http (los que arman ChatGPT y otros) consolidan en la URL canónica. No debería moverse nada en GSC: es higiene de canonicalización, no un cambio de ranking. | En los logs (`bun run crawlers`): que ya no aparezcan 307 de páginas. En GSC, que no aparezcan URLs sin barra o con http en "Page with redirect" como canónicas. | 2026-11-23 |
| 46 | Herramienta (`scripts/crawler-hits.mjs`, `bun run crawlers`) | Script que lee la API GraphQL de Cloudflare con la sesión de `cf` (o `CLOUDFLARE_API_TOKEN`) y lista, por bot (bingbot, OAI-SearchBot, ChatGPT-User, GPTBot, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User, DuckAssistBot y Googlebot), qué páginas pidió, cuántas veces, con qué código y la última fecha. Filtra por el host `vantalogics.com`. No corre en CI. | Bing y DuckDuckGo bloquean la lectura automática de `site:` desde el 10-28. No había manera de medir el #39 ni nada de GEO. | Cada corrida puede medir el GEO con un dato real: si una página nueva o cambiada entra en el ciclo de OAI-SearchBot o recibe visitas de ChatGPT-User o Perplexity. | Correrlo en cada corrida. La API tiene un presupuesto chico: una consulta de 30 días agota el cupo por ~5 minutos. | — |

### Envíos
- Deploy por push a `main` (commit `ebd40cb`, run 42614421462, ok).
- IndexNow desde CI: "no URL changed, nothing sent" (correcto: no cambió ninguna página).
- Sin reenvío del sitemap y sin pedidos de indexación: no cambió el contenido de ninguna URL.
- Ningún commit de esta corrida lleva atribución.

### Pendientes / hipótesis para próximas corridas
- **Cada corrida:** `bun run crawlers 7`. Mirar si alguna otra página entra al ciclo diario de OAI-SearchBot (hoy solo protección ES/EN) y qué abre ChatGPT-User.
- **Hipótesis GEO a validar:** protección entró al índice de ChatGPT y las notas no. Puede ser por antigüedad (es del 10-06), por los links externos que tenga, o porque Bing la indexó antes. Si en 2 semanas ninguna otra página entra, comparar qué tiene protección que no tengan las otras (respuesta arriba, tabla, datos propios) antes de tocar contenido.
- **11-12**: páginas de servicio de evaluación (#41) y meta de la nota de corrección (#42).
- **11-16**: migración EN (#43). **11-17**: cobros ES/EN (#32). **11-19**: nota de costo (#44), contando desde el rastreo del 11-05 (EN) y del 11-07 (ES).
- **11-23**: redirecciones 301 (#45).
- "vender apuntes digitales" (caso Lu Apuntes, pos 15): si suma más impresiones de queries no de marca, hay un hueco de intención ("plataforma para vender apuntes o PDFs") que el caso cubre a medias. No actuar con 1 impresión.
- `/en/solutions/` vs la solución EdTech: mirar cuando pase 20 impresiones (hoy 6).
- Para el dueño, siguen abiertos: **Bing Webmaster Tools** (ahora se sabe que Bing rastrea; falta ver qué indexa y con qué título), `sameAs` con perfiles reales, autor con nombre, links desde los sitios de los clientes, el commit `6ce459f` con atribución y los montos de comisión de Hotmart en el pilar.
- No tocar: páginas de servicio de evaluación y meta de la nota de corrección (11-12), migración EN (11-16), cobros (11-17), nota de costo ES/EN y notas relacionadas (11-19), redirecciones (11-23), protección e índice de casos (consolidados; protección menos que nunca, porque es la página que ChatGPT relee todos los días).

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 15 (10-23) | 09-25 → 10-22 | 7 | 108 | 10,0 |
| 16 (10-26) | 09-28 → 10-25 | 6 | 119 | 9,3 |
| 17 (10-27) | 09-29 → 10-26 | 7 | 125 | ~9,2 |
| 18 (10-28) | 09-30 → 10-27 | 7 | 137 | 8,6 |
| 19 (10-29) | 10-01 → 10-28 | 7 | 142 | 8,3 |
| 20 (10-30) | 10-02 → 10-29 | 7 | 158 | 7,9 |
| 21 (11-02) | 10-05 → 11-01 | 7 | 167 | ~6,9 |
| 22 (11-03) | 10-06 → 11-02 | 7 | 182 | ~7,0 |
| 23 (11-04) | 10-07 → 11-03 | 6 | 195 | ~6,8 |
| 24 (11-05) | 10-08 → 11-04 | 6 | 214 | 8,8 (6,9 sin el 11-04) |
| 25 (11-06) | 10-09 → 11-05 | 6 | 228 | 8,8 (7,1 sin el 11-04) |
| 26 (11-09) | 10-12 → 11-08 | 5 | 248 | 8,4 (6,8 sin el 11-04) |

---

## 2026-11-10 — Corrida 27

### Métricas generales (GSC, datos hasta 2026-11-09; el 11-09 es preliminar)

| Ventana | Clics | Impresiones | CTR | Posición |
|---|---|---|---|---|
| Últimos 28 d (10-13 → 11-09) | 5 | 263 | 1,9 % | 8,4 (6,8 sin el 11-04) |
| Últimos 7 d (11-03 → 11-09) | 0 | 100 | 0 % | 10,5 (6,4 sin el 11-04) |
| 7 d anteriores (10-27 → 11-02) | 0 | 82 | 0 % | 5,7 |

- **Decimocuarta semana seguida de récord en 28 d: 263 impresiones (248 ayer).** La semana pasa de 82 a 100 (+22 %). El 11-09 ya trae 16 siendo preliminar.
- **Clics: 5 en 28 d, todos de Argentina, y 15 días seguidos sin clics** (el último fue migración ES el 10-26). USA suma 57 impresiones en pos 8,1 sin clics; Reino Unido 14 en pos 5,9; Italia 7 en pos 2,9.
- **Nota de costo EN: 68 imp en pos 4,6, 0 clics.** Con el title nuevo (rastreo del 11-05) suma 15 impresiones del 11-06 al 11-09, casi todas en pos 1–2 y todas de la query de universidad (USA, Reino Unido, Canadá, Italia; 100 % desktop). La query tiene 21 imp en pos 1,5 en 28 d. El 11-09 aparece una query nueva, "ai tuition management", en pos 45 (no es la intención de la nota). La revisión sigue el 11-19.
- Corrección EN 33 imp (pos 20,9 por el 11-04); **el 11-09 salió 4 veces en pos 4,2**, la mejor posición diaria de esa nota con más de una impresión. Corrección ES 28 en pos 8,2. Protección ES 18 en pos 7,3 con 1 clic. Migración ES 17 en pos 7,7 con 1 clic, EN 14 en 9,8. `/en/` 27 en pos 3,7. `/en/solutions/` 8 en pos 3,4 (2 en pos 1 el 11-09).
- Queries visibles (14), las mismas de ayer más "ai tuition management" y "plataforma sied". Ninguna query nueva con intención del público.

### Indexación
- `/en/solutions/`: "Submitted and indexed", rastreada el 11-03, Breadcrumbs válidos. Entre las URLs que la refieren, Google todavía lista una nota retirada de inmobiliarias (`/en/blog/mistakes-an-ai-agent-makes-at-a-real-estate-developer/`, que ya redirige).
- La inspección en lote volvió a cortar la conexión; se inspeccionó de a una.
- Sitemap reenviado después del deploy (12:05).
- **`request_indexing` no funciona desde la mudanza a heaven (11-06):** dependía del Chrome con CDP en `127.0.0.1:9222` del escritorio noVNC, que se dio de baja. Respuesta de hoy: "Chrome is not reachable". No se reconfiguró nada; queda para el dueño (ver Pendientes). Mientras tanto: sitemap + IndexNow.

### Crawlers (`bun run crawlers 7`, 11-03 → 11-10)
- El script falló primero con "Authentication error": el token OAuth de `cf` había vencido. `cf auth whoami` lo refrescó y volvió a andar.
- **OAI-SearchBot (índice de ChatGPT): 40 pedidos.** Sigue releyendo protección ES y EN todos los días. **Nuevo: el 11-07 pidió `/en/solutions/` (2) y `/en/solutions/law-firms/` (2, 301 a `/en/solutions/`).** O sea, el índice de ChatGPT todavía guarda URLs de los sectores retirados (pre-pivot) y, al seguirlas, aterriza en el índice de soluciones.
- ChatGPT-User: 7 pedidos, la misma sesión del 11-08 (home, hub, caso Apoyo Escolar RV, privacidad) y protección ES el 11-03.
- bingbot: 127 pedidos sobre 40 rutas. La más pedida es corrección EN (14, la última hoy). También relee las URLs retiradas (agente de WhatsApp, coordinación de visitas, nota de costo de automatización) y recibe 301.
- Googlebot: 114 pedidos; también relee las URLs de sectores retirados (`/en/solutions/accounting-firms/`, `/ecommerce/`, `/law-firms/`, `/soluciones/inmobiliarias/`, `/estudios-contables/`), todas con 301 al índice de soluciones.
- PerplexityBot: nota de corrección ES (11-06). ClaudeBot, Claude-User y Claude-SearchBot: 0.
- **#45 (301 en vez de 307): ya no aparece ningún 307 de páginas en 7 días.** Los únicos 301 sobre rutas con barra son pedidos por http, que ahora redirigen como corresponde.

### Auditoría técnica (crawl de producción)
- 48/48 URLs del sitemap con 200, `lastmod`, canonical self, un H1, JSON-LD que parsea, sin `noindex`. 49 destinos de links internos, 0 rotos y 0 redirigidos.
- Hallazgo de contenido: **el índice de soluciones (`/soluciones/`, `/en/solutions/`) es el destino de todos los 301 de los sectores retirados** (13 grupos de URLs × 3 idiomas en `worker/index.ts`), y era una página fina: un título, una línea y 5 tarjetas. No decía en ningún lado que el estudio trabaja solo en educación ni explicaba por qué alguien que venía de "law firms" llegaba ahí.

### GEO
- "vantalogics" en el buscador de la sesión: sigue sin devolver nada propio (VortalLogic, Avantalytics, Vanteon, Vanta).
- "automatic quiz grading with AI open-ended answers rubric teacher review": citan arXiv, Universidad de Zúrich, CustomGPT, Formswrite, Inquisitive, ExperQuiz y 8allocate. El consenso es "borrador de IA + revisión docente", que es lo que publica nuestra nota con datos medidos. Mismo bloqueo de siempre: ese índice no tiene el sitio.

### Cambios

| # | URL | Qué cambió | Por qué (dato) | Hipótesis | Métrica a mirar | Revisión |
|---|---|---|---|---|---|---|
| 47 | `/soluciones/` + `/en/solutions/` (AR igual, en noindex) | **Párrafo de alcance** debajo de la intro: "Vantalogics trabaja solo en educación: academias online, instituciones y empresas de educación. Construimos la plataforma propia, o la migramos desde Hotmart, Tiendup o WordPress, y la IA que va encima. Las páginas que teníamos sobre otros sectores (estudios jurídicos y contables, inmobiliarias, clínicas, distribuidoras y e-commerce) se retiraron en septiembre de 2026 y redirigen a esta página." (EN espejo; la fecha sale del commit `3e1580f` del 2026-09-23). **Sección nueva "Antes de la IA, la plataforma propia"** con tarjetas al hub de plataformas, migración, protección, cobros y el índice de casos (solo ES/EN; AR no tiene esas páginas). **ItemList** de 1 a 10 elementos (solución, 4 casos de uso, 4 páginas de plataforma, casos). `SOLUTIONS_INDEX_UPDATED` = 2026-11-10 en `src/data/solutions.ts`, usado en el `lastmod` del sitemap. Title y meta sin cambios. | OAI-SearchBot pidió `/en/solutions/` y `/en/solutions/law-firms/` (301 ahí) el 11-07: el índice de ChatGPT sigue asociando el dominio a sectores pre-pivot. Googlebot y bingbot también releen esas URLs viejas. `/en/solutions/` tiene 8 imp en pos 3,4. El 10-09 una herramienta de research describió a Vantalogics como agencia de chatbots/WhatsApp por una foto vieja (ver memoria de precios). | Cuando ChatGPT, Bing o Google siguen una URL vieja, aterrizan en una página que dice explícitamente a qué se dedica el estudio y enlaza la evidencia. Las descripciones de la marca en motores de IA pasan de "automatización para varios sectores" a "educación". El índice deja de ser fino y reparte links al cluster de plataformas. No se espera movimiento en GSC: es entidad y GEO. | `bun run crawlers 7 OAI-SearchBot`: que siga pidiendo `/en/solutions/` y si después pide alguna página del cluster de plataformas. Rastreo de las dos URLs en URL Inspection. Impresiones de `/en/solutions/` y `/soluciones/` (no deberían caer). Riesgo de canibalización con la página de la solución EdTech: mirar si aparecen queries compartidas. | 2026-11-24 |

### Envíos
- Deploy por push a `main` (commit del índice de soluciones, run 42812682271, ok). En producción ya salen el párrafo, la sección y la ItemList de 10; `/soluciones` y `/en/solutions/law-firms/` siguen con 301 al índice.
- IndexNow desde CI: 200 para 2 URLs (`/soluciones/` y `/en/solutions/`, por el `lastmod` nuevo).
- Sitemap reenviado a GSC (12:05).
- Pedido de indexación: **no se pudo** (Chrome de CDP no existe en heaven). Quedan para pedir a mano: `/en/solutions/` y `/soluciones/`.
- Render verificado con Agora (árbol de accesibilidad: H2 y 5 tarjetas nuevas). Las capturas salen negras debajo del primer bloque por las animaciones `reveal`, que no corren en la pestaña de fondo; pasa igual con las tarjetas que ya existían.
- Ningún commit de esta corrida lleva atribución.

### Pendientes / hipótesis para próximas corridas
- **Para el dueño, nuevo: devolverle a la MCP de GSC un Chrome con CDP** (el perfil con las sesiones de Google quedó en `/root/.browser/chrome-profile`), o aceptar que los pedidos de indexación se hacen a mano. Sin eso, cada cambio depende del sitemap y del rastreo natural.
- **Cada corrida:** `bun run crawlers 7` (si da "Authentication error", correr antes `cf auth whoami`).
- **11-12**: páginas de servicio de evaluación (#41) y meta de la nota de corrección (#42). Dato a favor: corrección EN salió en pos 4,2 el 11-09 y bingbot la pide más que a ninguna otra.
- **11-16**: migración EN (#43). **11-17**: cobros ES/EN (#32). **11-19**: nota de costo (#44): ya van 15 impresiones en pos 1–2 con el title nuevo y 0 clics; si llega a 30 sin clics se aplica el criterio de la corrida 24 (el valor de la nota es la cita en IA, no el clic).
- **11-23**: redirecciones 301 (#45); en los logs ya no hay 307. **11-24**: índice de soluciones (#47).
- "vender apuntes digitales" (caso Lu Apuntes): sin impresiones nuevas.
- Siguen abiertos para el dueño: Bing Webmaster Tools, `sameAs` con perfiles reales, autor con nombre, links desde los sitios de los clientes, el commit `6ce459f` con atribución y los montos de comisión de Hotmart en el pilar.
- No tocar: páginas de servicio de evaluación y meta de la nota de corrección (11-12), migración EN (11-16), cobros (11-17), nota de costo ES/EN y notas relacionadas (11-19), redirecciones (11-23), índice de soluciones (11-24), protección e índice de casos (consolidados).

### Evolución desde el inicio del log

| Corrida | Ventana 28 d | Clics | Impresiones | Posición |
|---|---|---|---|---|
| 1 (10-05) | 09-07 → 10-05 | 4 | ~85 | ~7 (90 d: 29,5) |
| 2 (10-06) | 09-08 → 10-05 | 4 | 77 | 15,1 |
| 5 (10-09) | 09-11 → 10-08 | 4 | 82 | 14,7 |
| 6 (10-12) | 09-14 → 10-11 | 5 | 89 | 12,3 |
| 8 (10-14) | 09-16 → 10-13 | 5 | 93 | 12,1 |
| 10 (10-16) | 09-18 → 10-15 | 5 | 95 | 11,9 |
| 11 (10-19) | 09-21 → 10-18 | 6 | 103 | 8,6 |
| 13 (10-21) | 09-23 → 10-20 | 8 | 107 | 8,8 |
| 15 (10-23) | 09-25 → 10-22 | 7 | 108 | 10,0 |
| 16 (10-26) | 09-28 → 10-25 | 6 | 119 | 9,3 |
| 17 (10-27) | 09-29 → 10-26 | 7 | 125 | ~9,2 |
| 18 (10-28) | 09-30 → 10-27 | 7 | 137 | 8,6 |
| 19 (10-29) | 10-01 → 10-28 | 7 | 142 | 8,3 |
| 20 (10-30) | 10-02 → 10-29 | 7 | 158 | 7,9 |
| 21 (11-02) | 10-05 → 11-01 | 7 | 167 | ~6,9 |
| 22 (11-03) | 10-06 → 11-02 | 7 | 182 | ~7,0 |
| 23 (11-04) | 10-07 → 11-03 | 6 | 195 | ~6,8 |
| 24 (11-05) | 10-08 → 11-04 | 6 | 214 | 8,8 (6,9 sin el 11-04) |
| 25 (11-06) | 10-09 → 11-05 | 6 | 228 | 8,8 (7,1 sin el 11-04) |
| 26 (11-09) | 10-12 → 11-08 | 5 | 248 | 8,4 (6,8 sin el 11-04) |
| 27 (11-10) | 10-13 → 11-09 | 5 | 263 | 8,4 (6,8 sin el 11-04) |
