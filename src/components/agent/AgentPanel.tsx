import { useEffect, useState } from "react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import type { Lang } from "@/i18n"
import { agentCopy } from "./copy"
import AgentChat from "./AgentChat"
import { getPass } from "./turnstile"

/**
 * El panel del agente: sheet lateral en desktop, drawer desde abajo en mobile.
 * Es el mismo contenido; cambia sólo por dónde entra.
 *
 * No dibuja el botón. El botón vive en Astro y no cuesta JavaScript, así que un
 * visitante que nunca lo toca no paga nada de esto — ver mount.tsx.
 */

export const OPEN_EVENT = "vl:agent-open"

interface Props {
  lang: Lang
  host: string
  sitekey: string
  /** El módulo se carga en el primer clic, así que nace abierto. */
  initialOpen?: boolean
}

const DESKTOP = "(min-width: 768px)"

function useIsDesktop(): boolean {
  // Se lee de entrada: este módulo sólo corre en el cliente, así que no hay
  // render de servidor con el que desincronizarse. Arrancar en false montaría
  // el drawer para después reemplazarlo por el sheet en el mismo tick.
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia(DESKTOP).matches
  )

  useEffect(() => {
    const query = window.matchMedia(DESKTOP)
    const sync = () => setIsDesktop(query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  return isDesktop
}

export default function AgentPanel({
  lang,
  host,
  sitekey,
  initialOpen = false,
}: Props) {
  // Nace abierto en el montaje inicial; los clics siguientes llegan por evento.
  // Esperar el evento para el primer clic sería una carrera contra el commit.
  const [open, setOpen] = useState(initialOpen)
  const [pass, setPass] = useState<string | null>(null)
  const [blocked, setBlocked] = useState(false)
  const isDesktop = useIsDesktop()
  const copy = agentCopy(lang)

  // El desafío arranca junto con el panel, no cuando la persona escribe: para
  // cuando termine de leer el saludo, el socket ya está habilitado.
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

  useEffect(() => {
    const openPanel = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, openPanel)
    return () => window.removeEventListener(OPEN_EVENT, openPanel)
  }, [])

  // Sin pase no se abre el socket. Falla cerrado: si el desafío no pasa, el
  // panel dice por dónde escribir en vez de intentar conectarse igual.
  const chat = blocked ? (
    <p className="px-[21px] py-[21px] label-untitled text-ash">
      {copy.blocked}
    </p>
  ) : pass ? (
    <AgentChat host={host} pass={pass} copy={copy} />
  ) : (
    <p className="px-[21px] py-[21px] label-untitled text-ash">
      <span className="animate-pulse">···</span>
    </p>
  )

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col gap-0 border-hairline bg-canvas p-0 sm:max-w-[420px]"
        >
          <SheetHeader className="flex flex-col gap-[3px] border-b border-hairline px-[21px] py-[15px]">
            <SheetTitle className="label-untitled text-bone">
              {copy.title}
            </SheetTitle>
            <SheetDescription className="label-untitled text-[12px] text-ash">
              {copy.subtitle}
            </SheetDescription>
          </SheetHeader>
          {chat}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="flex h-[82svh] flex-col gap-0 border-hairline bg-canvas p-0">
        <DrawerHeader className="flex flex-col gap-[3px] border-b border-hairline px-[21px] py-[15px]">
          <DrawerTitle className="label-untitled text-bone">
            {copy.title}
          </DrawerTitle>
          <DrawerDescription className="label-untitled text-[12px] text-ash">
            {copy.subtitle}
          </DrawerDescription>
        </DrawerHeader>
        {chat}
      </DrawerContent>
    </Drawer>
  )
}
