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
import { langDir, type Lang } from "@/i18n"
import { agentCopy } from "./copy"
import AgentChat from "./AgentChat"
import { usePass } from "./usePass"

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
  const { pass, blocked } = usePass(host, sitekey)
  const isDesktop = useIsDesktop()
  const copy = agentCopy(lang)
  // En árabe el panel entra por el lado del botón flotante, que en RTL es el
  // izquierdo. El primitivo posiciona con propiedades físicas, así que el lado
  // se elige acá y los ajustes de md quedan en lógicas (`end-`).
  const side = langDir(lang) === "rtl" ? "left" : "right"

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
        {/* El sheet base se pega a los cuatro bordes; desde md se despega y
            queda como una tarjeta flotante con esquinas redondeadas. Los `!`
            son necesarios: las clases del primitivo llevan el selector
            [data-side=right] y ganan por especificidad. */}
        <SheetContent
          side={side}
          className="flex w-full flex-col gap-0 overflow-hidden border-hairline bg-canvas p-0 sm:max-w-[420px] md:end-[16px]! md:top-[16px]! md:bottom-[16px]! md:h-[calc(100svh-32px)]! md:rounded-[24px] md:border"
        >
          <SheetHeader className="flex flex-col gap-[3px] border-b border-hairline px-[21px] py-[15px] pe-[52px]">
            <SheetTitle className="font-untitled text-[16px] leading-tight text-bone">
              {copy.title}
            </SheetTitle>
            <SheetDescription className="label-untitled text-[13px] text-ash">
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
      <DrawerContent className="flex h-[82svh] flex-col gap-0 overflow-hidden rounded-t-[24px] border-hairline bg-canvas p-0">
        <DrawerHeader className="flex flex-col gap-[3px] border-b border-hairline px-[21px] py-[15px] pe-[52px]">
          <DrawerTitle className="font-untitled text-[16px] leading-tight text-bone">
            {copy.title}
          </DrawerTitle>
          <DrawerDescription className="label-untitled text-[13px] text-ash">
            {copy.subtitle}
          </DrawerDescription>
        </DrawerHeader>
        {chat}
      </DrawerContent>
    </Drawer>
  )
}
