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

export const OPEN_EVENT = "vl:agent-open"

interface Props {
  lang: Lang
  host: string
  sitekey: string
  initialOpen?: boolean
}

const DESKTOP = "(min-width: 768px)"

function useIsDesktop(): boolean {
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
  const [open, setOpen] = useState(initialOpen)
  const { pass, blocked } = usePass(host, sitekey)
  const isDesktop = useIsDesktop()
  const copy = agentCopy(lang)
  const side = langDir(lang) === "rtl" ? "left" : "right"

  useEffect(() => {
    const openPanel = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, openPanel)
    return () => window.removeEventListener(OPEN_EVENT, openPanel)
  }, [])

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
