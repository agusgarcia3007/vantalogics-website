import type { Lang } from "@/i18n"
import { agentCopy } from "./copy"
import AgentChat from "./AgentChat"
import { usePass } from "./usePass"

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
