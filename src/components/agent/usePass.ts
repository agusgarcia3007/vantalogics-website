import { useEffect, useState } from "react"

import { getPass } from "./turnstile"

/**
 * El pase que habilita el socket, pedido apenas monta quien lo use.
 *
 * Arranca junto con el chat y no cuando la persona escribe: para cuando termine
 * de leer el saludo, el desafío ya se resolvió y el socket está habilitado.
 *
 * Falla cerrado. `blocked` no es un error a reintentar en silencio: es la señal
 * de que hay que ofrecer los canales de siempre en vez del chat.
 */
export function usePass(
  host: string,
  sitekey: string
): { pass: string | null; blocked: boolean } {
  const [pass, setPass] = useState<string | null>(null)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    let cancelled = false
    getPass(host, sitekey)
      .then((value) => {
        if (!cancelled) setPass(value)
      })
      .catch(() => {
        if (!cancelled) setBlocked(true)
      })
    return () => {
      cancelled = true
    }
  }, [host, sitekey])

  return { pass, blocked }
}
