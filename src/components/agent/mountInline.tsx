import { createRoot } from "react-dom/client"

import type { Lang } from "@/i18n"
import AgentInline from "./AgentInline"

/**
 * Punto de entrada del agente embebido, con efecto al importarse.
 *
 * Igual que el panel flotante (ver mount.tsx): la sección se dibuja en Astro y
 * no cuesta JavaScript. El campo de esa maqueta es un textarea de verdad, y
 * recién cuando alguien lo toca el script de la sección importa este módulo,
 * que reemplaza la maqueta por el chat vivo llevándose lo que ya estaba escrito.
 *
 * Quien pasa de largo la sección no descarga React, ni el cliente del agente,
 * ni Turnstile.
 */

const HOST_ID = "vl-agent-inline"

function mount() {
  const host = document.getElementById(HOST_ID)
  if (!host || host.dataset.mounted) return
  host.dataset.mounted = ""

  const lang = (host.dataset.agentLang as Lang) ?? "es"
  const agentHost = host.dataset.agentHost ?? ""
  const sitekey = host.dataset.agentSitekey ?? ""
  // El shell estático deja acá lo que se llegó a escribir: `sent` cuando la
  // persona ya apretó enviar, `draft` cuando sólo estaba tipeando.
  const openingMessage = host.dataset.agentSent || undefined
  const initialDraft = host.dataset.agentDraft || undefined

  host.replaceChildren()

  createRoot(host).render(
    <AgentInline
      lang={lang}
      host={agentHost}
      sitekey={sitekey}
      initialDraft={initialDraft}
      openingMessage={openingMessage}
    />
  )
}

mount()
