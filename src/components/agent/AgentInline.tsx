import type { Lang } from "@/i18n"
import { agentCopy } from "./copy"
import AgentChat from "./AgentChat"
import { usePass } from "./usePass"

/**
 * El agente embebido en la sección "Probalo ahora".
 *
 * Es el mismo chat que el del panel flotante, sin sheet ni drawer alrededor:
 * acá no hay nada que abrir, la conversación ya está en la página. Comparte la
 * sesión con el panel —el id vive en sessionStorage—, así que quien empieza acá
 * y después abre el botón flotante encuentra la misma conversación.
 *
 * La caja tiene alto fijo a propósito. Si creciera con la conversación, la
 * sección entera saltaría con cada respuesta y empujaría hacia abajo lo que la
 * persona está leyendo.
 */

interface Props {
  lang: Lang
  host: string
  sitekey: string
  initialDraft?: string
  openingMessage?: string
}

export default function AgentInline({
  lang,
  host,
  sitekey,
  initialDraft,
  openingMessage,
}: Props) {
  const { pass, blocked } = usePass(host, sitekey)
  const copy = agentCopy(lang)

  return (
    <div className="flex h-[clamp(420px,58svh,560px)] flex-col overflow-hidden rounded-[20px] border border-hairline bg-surface">
      <div className="flex flex-col gap-[3px] border-b border-hairline px-[18px] py-[13px]">
        <p className="font-untitled text-[15px] leading-tight text-bone">
          {copy.title}
        </p>
        <p className="label-untitled text-[12px] text-ash">{copy.subtitle}</p>
      </div>

      {blocked ? (
        <p className="px-[18px] py-[18px] label-untitled text-ash">
          {copy.blocked}
        </p>
      ) : pass ? (
        <AgentChat
          host={host}
          pass={pass}
          copy={copy}
          initialDraft={initialDraft}
          openingMessage={openingMessage}
        />
      ) : (
        <p className="px-[18px] py-[18px] label-untitled text-ash">
          <span className="animate-pulse">···</span>
        </p>
      )}
    </div>
  )
}
