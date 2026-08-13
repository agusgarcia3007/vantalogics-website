import type { Lang } from "@/i18n"

/**
 * Textos del widget y etiquetas de la traza.
 *
 * Los nombres de herramienta llegan crudos desde el worker (search, qualify,
 * hand_off…). Se traducen acá y no allá: el agente no tiene por qué saber cómo
 * se muestra, y así se puede cambiar la redacción sin volver a desplegarlo.
 */

export interface AgentCopy {
  title: string
  subtitle: string
  close: string
  placeholder: string
  send: string
  greeting: string
  thinking: string
  error: string
  blocked: string
  retry: string
  approval: {
    question: string
    approve: string
    reject: string
    sent: string
    dismissed: string
  }
  /** Botón de cierre. El agente manda el enlace; el rótulo lo pone el sitio. */
  cta: {
    booking: string
    whatsapp: string
  }
  steps: Record<string, string>
}

const ES: AgentCopy = {
  title: "Agente de ejemplo",
  subtitle: "Es de verdad: preguntale lo que quieras",
  close: "Cerrar",
  placeholder: "Escribí tu mensaje",
  send: "Enviar",
  greeting:
    "Soy el agente de Vantalogics. Contame qué proceso te está comiendo el mes y vemos si tiene sentido automatizarlo.",
  thinking: "pensando",
  error: "Se cortó la conexión. Probá de nuevo o escribinos por WhatsApp.",
  blocked:
    "No pude verificar el navegador, así que no abro el chat. Escribinos por WhatsApp o a hello@vantalogics.com.",
  retry: "Reintentar",
  approval: {
    question: "¿Le paso este contacto al equipo?",
    approve: "Dale",
    reject: "Todavía no",
    sent: "Listo, se lo pasé al equipo",
    dismissed: "No se envió nada",
  },
  cta: {
    booking: "Agendar los 30 minutos",
    whatsapp: "Escribir por WhatsApp",
  },
  steps: {
    search: "buscando en la base de conocimiento",
    qualify: "anotando el caso",
    next_step: "preparando el siguiente paso",
    hand_off: "pidiendo permiso para pasar el contacto",
    recover: "reintentando la generación",
  },
}

const EN: AgentCopy = {
  title: "Sample agent",
  subtitle: "It is the real thing: ask it anything",
  close: "Close",
  placeholder: "Type your message",
  send: "Send",
  greeting:
    "I'm the Vantalogics agent. Tell me which process is eating your month and we'll see whether automating it makes sense.",
  thinking: "thinking",
  error: "The connection dropped. Try again or reach us on WhatsApp.",
  blocked:
    "I could not verify this browser, so I am not opening the chat. Reach us on WhatsApp or at hello@vantalogics.com.",
  retry: "Retry",
  approval: {
    question: "Should I pass this contact to the team?",
    approve: "Go ahead",
    reject: "Not yet",
    sent: "Done, passed to the team",
    dismissed: "Nothing was sent",
  },
  cta: {
    booking: "Book the 30 minutes",
    whatsapp: "Message on WhatsApp",
  },
  steps: {
    search: "searching the knowledge base",
    qualify: "noting the case",
    next_step: "preparing the next step",
    hand_off: "asking permission to pass the contact",
    recover: "retrying generation",
  },
}

export function agentCopy(lang: Lang): AgentCopy {
  return lang === "en" ? EN : ES
}

/** Nombre legible de una herramienta; si es una desconocida, se muestra cruda. */
export function stepLabel(copy: AgentCopy, name: string): string {
  return copy.steps[name] ?? name
}
