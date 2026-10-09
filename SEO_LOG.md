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
