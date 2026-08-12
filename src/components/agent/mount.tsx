import { createRoot } from "react-dom/client"

import type { Lang } from "@/i18n"
import AgentPanel from "./AgentPanel"

/**
 * Punto de entrada del agente, con efecto al importarse.
 *
 * El botón flotante es HTML de Astro y no cuesta JavaScript. Recién cuando
 * alguien lo toca, el script del layout hace `import()` de este módulo, que
 * monta React una sola vez y abre el panel. Quien nunca abre el chat no
 * descarga React, ni el sheet, ni el cliente del agente.
 *
 * La configuración viaja en data-attributes del propio botón, así que el idioma
 * y el host siguen saliendo de Astro y no hay que duplicarlos acá.
 */

const CONTAINER_ID = "vl-agent-root"

function mount() {
  if (document.getElementById(CONTAINER_ID)) return

  const trigger = document.querySelector<HTMLElement>("[data-agent-open]")
  const lang = (trigger?.dataset.agentLang as Lang) ?? "es"
  const host = trigger?.dataset.agentHost ?? ""
  const sitekey = trigger?.dataset.agentSitekey ?? ""

  const container = document.createElement("div")
  container.id = CONTAINER_ID
  document.body.appendChild(container)

  createRoot(container).render(
    <AgentPanel lang={lang} host={host} sitekey={sitekey} initialOpen />
  )
}

mount()
