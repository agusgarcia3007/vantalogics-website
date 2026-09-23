import { createRoot } from "react-dom/client"

import type { Lang } from "@/i18n"
import AgentPanel from "./AgentPanel"

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
