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

### Pendientes / hipótesis para próximas corridas
- Siguen abiertos los pendientes de la corrida 1: decisión del dueño sobre la nota de costos con rangos en USD, autor con nombre para E-E-A-T y las dos notas solo en ES.
- **Las dos notas solo-ES** (`agente-de-ia-para-whatsapp-que-carga-pedidos`, `n8n-make-o-agente-a-medida`) están indexadas y sin impresiones en 28 d. Son temas fuera del foco EdTech y violan la regla EN = ES. Opciones a decidir con el dueño: traducirlas o despublicarlas con 301 a `/blog/`. No se tocan sin esa decisión.
- Próximos huecos del cluster de plataformas con evidencia propia: cobro y acceso (Mercado Pago, transferencias vía Talo y acceso por permisos, en el repo de `luapuntes`) y certificados/evaluaciones. Solo hacerlos si la página de protección indexa y muestra impresiones.
- 2026-10-19: revisar CTR de casos, entidad y Bing (`site:vantalogics.com`).
