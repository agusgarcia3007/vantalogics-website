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
