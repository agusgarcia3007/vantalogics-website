export const SITE_URL = "https://vantalogics.com"

export const SCHEDULE_URL = "https://cal.com/vantalogics"

export const CONTACT_EMAIL = "hello@vantalogics.com"

export const AGENT_HOST = "agent.vantalogics.com"

export const TURNSTILE_SITEKEY = "0x4AAAAAAEOBkPwvwXeWiT-L"

export const GITHUB_URL = "https://github.com/vantalogics"
export const INSTAGRAM_URL = "https://www.instagram.com/vanta.logics/"

export const WHATSAPP_NUMBER = "541178296140"

export const WHATSAPP_DISPLAY = "+54 11 7829 6140"

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
