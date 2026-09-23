import { createRoot } from "react-dom/client"

import type { Lang } from "@/i18n"
import AgentInline from "./AgentInline"

const HOST_ID = "vl-agent-inline"

function mount() {
  const host = document.getElementById(HOST_ID)
  if (!host || host.dataset.mounted) return
  host.dataset.mounted = ""

  const lang = (host.dataset.agentLang as Lang) ?? "es"
  const agentHost = host.dataset.agentHost ?? ""
  const sitekey = host.dataset.agentSitekey ?? ""
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
