import { useEffect, useState } from "react"

import { getPass } from "./turnstile"

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
