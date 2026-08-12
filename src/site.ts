/** Datos de contacto del sitio, en un solo lugar. */
export const SITE_URL = "https://vantalogics.com"

/** Agenda pública para el diagnóstico / demo. */
export const SCHEDULE_URL = "https://cal.com/vantalogics"

export const CONTACT_EMAIL = "hello@vantalogics.com"

/** Worker del agente conversacional (repo vantalogics/agent). */
export const AGENT_HOST = "agent.vantalogics.com"

/** WhatsApp de contacto, en formato E.164 sin signos ni espacios. */
export const WHATSAPP_NUMBER = "541178296140"

/** Número tal como se muestra a una persona. */
export const WHATSAPP_DISPLAY = "+54 11 7829 6140"

/** Enlace a wa.me con mensaje inicial opcional. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
