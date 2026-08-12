/**
 * Turnstile invisible + canje por un pase firmado.
 *
 * El desafío se resuelve solo, sin pedirle nada a la persona, y lo que se
 * guarda no es el token de Turnstile sino el pase que devuelve el worker: el
 * token sirve una sola vez, el pase abre el socket durante una hora.
 *
 * Falla cerrado a propósito. Si el desafío no pasa, el chat no se conecta y el
 * widget ofrece los canales de siempre. Dejarlo pasar convertiría todo esto en
 * un adorno, que es exactamente lo que se estaba tratando de evitar.
 */

const SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
const PASS_KEY = "vl-agent-pass"

interface Turnstile {
  render(
    container: HTMLElement,
    options: {
      sitekey: string
      size?: "invisible" | "normal" | "compact"
      callback(token: string): void
      "error-callback"(): void
    }
  ): string
  remove(id: string): void
}

declare global {
  interface Window {
    turnstile?: Turnstile
    onloadTurnstileCallback?: () => void
  }
}

let scriptPromise: Promise<void> | null = null

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = SCRIPT_URL
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("no se pudo cargar Turnstile"))
    document.head.appendChild(script)
  })

  return scriptPromise
}

/** Resuelve el desafío y devuelve el token, o falla. */
function solve(sitekey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const container = document.createElement("div")
    container.style.display = "none"
    document.body.appendChild(container)

    // Turnstile invisible resuelve en cientos de milisegundos, pero si algo lo
    // bloquea (una extensión, una red rara) el callback nunca llega y el widget
    // se quedaría colgado esperando para siempre.
    const timeout = setTimeout(() => {
      cleanup()
      reject(new Error("Turnstile no respondió"))
    }, 12000)

    let id: string | undefined
    function cleanup() {
      clearTimeout(timeout)
      if (id) window.turnstile?.remove(id)
      container.remove()
    }

    id = window.turnstile!.render(container, {
      sitekey,
      size: "invisible",
      callback: (token) => {
        cleanup()
        resolve(token)
      },
      "error-callback": () => {
        cleanup()
        reject(new Error("Turnstile rechazó el desafío"))
      },
    })
  })
}

/**
 * Devuelve el pase que habilita el socket. Reusa el de la pestaña si sigue
 * vigente, para no repetir el desafío en cada apertura del panel.
 */
export async function getPass(host: string, sitekey: string): Promise<string> {
  const cached = sessionStorage.getItem(PASS_KEY)
  if (cached && Number(cached.split(".")[0]) > Date.now() + 60_000) {
    return cached
  }

  await loadScript()
  const token = await solve(sitekey)

  const response = await fetch(`https://${host}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  })

  if (!response.ok) throw new Error("la verificación fue rechazada")

  const data = (await response.json()) as { pass?: string }
  if (!data.pass) throw new Error("la verificación no devolvió un pase")

  sessionStorage.setItem(PASS_KEY, data.pass)
  return data.pass
}
