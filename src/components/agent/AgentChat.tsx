import { useEffect, useRef, useState } from "react"
import { useAgent } from "agents/react"
import { useAgentChat } from "@cloudflare/ai-chat/react"

import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { Message, MessageContent } from "@/components/ui/message"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Marker, MarkerContent } from "@/components/ui/marker"
import { cn } from "@/lib/utils"
import type { AgentCopy } from "./copy"
import { stepLabel } from "./copy"

/**
 * La conversación.
 *
 * Este módulo es el que trae `ai` y `agents`, así que se carga en diferido: el
 * botón flotante no arrastra el bundle del chat hasta que alguien lo abre.
 *
 * La decisión de diseño que importa: los pasos del agente se dibujan en el hilo
 * como marcadores, en el mismo lugar donde ocurrieron. No es decoración. El
 * sitio promete trazas y control humano, y acá se ven las dos cosas sin tener
 * que creer en la promesa.
 */

interface Props {
  host: string
  copy: AgentCopy
}

/** Una conversación por pestaña, estable entre recargas. */
function sessionId(): string {
  const KEY = "vl-agent-session"
  try {
    const stored = sessionStorage.getItem(KEY)
    if (stored) return stored
    const fresh = crypto.randomUUID()
    sessionStorage.setItem(KEY, fresh)
    return fresh
  } catch {
    return crypto.randomUUID()
  }
}

type StepData = { name: string }
type ApprovalData = { contact: string; name?: string }

export default function AgentChat({ host, copy }: Props) {
  const [id] = useState(sessionId)
  const [draft, setDraft] = useState("")
  const [resolved, setResolved] = useState<
    Record<string, "sent" | "dismissed">
  >({})
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const agent = useAgent({ agent: "VantaAgent", name: id, host })
  const { messages, sendMessage, status, isStreaming, error } = useAgentChat({
    agent,
  })

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const busy = isStreaming || status === "submitted"

  function submit() {
    const text = draft.trim()
    if (!text || busy) return
    setDraft("")
    void sendMessage({ text })
  }

  async function approve(key: string, data: ApprovalData, ok: boolean) {
    setResolved((prev) => ({ ...prev, [key]: ok ? "sent" : "dismissed" }))
    try {
      await agent.stub.approveHandOff(ok, data.contact, data.name)
    } catch {
      // El lead ya quedó registrado del lado del agente; si falla la
      // confirmación no hay nada que la persona pueda hacer al respecto.
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <MessageScrollerProvider>
        <MessageScroller className="min-h-0 flex-1">
          <MessageScrollerViewport className="px-[21px]">
            <MessageScrollerContent className="flex flex-col gap-[15px] py-[21px]">
              {/* Cada turno es un item del scroller: así el scroller puede
                  anclarlo y seguir el streaming pegado al fondo. */}
              <MessageScrollerItem>
                <Message align="start">
                  <MessageContent>
                    <Bubble variant="outline">
                      <BubbleContent className="label-untitled leading-relaxed">
                        {copy.greeting}
                      </BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>

              {messages.map((message, messageIndex) => {
                const mine = message.role === "user"
                const last = messageIndex === messages.length - 1

                return (
                  <MessageScrollerItem key={message.id} scrollAnchor={last}>
                    <Message align={mine ? "end" : "start"}>
                      <MessageContent className="gap-[7px]">
                        {message.parts.map((part, index) => {
                          const key = `${message.id}-${index}`

                          if (part.type === "text") {
                            if (!part.text.trim()) return null
                            return (
                              <Bubble
                                key={key}
                                variant={mine ? "default" : "outline"}
                                align={mine ? "end" : "start"}
                              >
                                <BubbleContent className="label-untitled leading-relaxed whitespace-pre-wrap">
                                  {part.text}
                                </BubbleContent>
                              </Bubble>
                            )
                          }

                          // Un paso de la traza, en el punto exacto en que ocurrió.
                          if (part.type === "data-step") {
                            const data = part.data as StepData
                            return (
                              <Marker
                                key={key}
                                variant="separator"
                                className="label-untitled text-[12px] text-ash"
                              >
                                <MarkerContent>
                                  {stepLabel(copy, data.name)}
                                </MarkerContent>
                              </Marker>
                            )
                          }

                          // El control humano: nada sale sin que alguien toque acá.
                          if (part.type === "data-approval") {
                            const data = part.data as ApprovalData
                            const state = resolved[key]

                            return (
                              <Bubble
                                key={key}
                                variant="outline"
                                className="max-w-full"
                              >
                                <BubbleContent className="flex flex-col gap-[11px] label-untitled">
                                  <span>{copy.approval.question}</span>
                                  <span className="text-ash">
                                    {data.contact}
                                  </span>

                                  {state ? (
                                    <span className="text-ash">
                                      {state === "sent"
                                        ? copy.approval.sent
                                        : copy.approval.dismissed}
                                    </span>
                                  ) : (
                                    <span className="flex gap-[7px]">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          void approve(key, data, true)
                                        }
                                        className="rounded-pill border border-bone px-[15px] py-[5px] transition-opacity duration-(--duration-state) hover:opacity-70"
                                      >
                                        {copy.approval.approve}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          void approve(key, data, false)
                                        }
                                        className="rounded-pill border border-hairline px-[15px] py-[5px] text-ash transition-colors duration-(--duration-state) hover:border-bone hover:text-bone"
                                      >
                                        {copy.approval.reject}
                                      </button>
                                    </span>
                                  )}
                                </BubbleContent>
                              </Bubble>
                            )
                          }

                          return null
                        })}
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                )
              })}

              {busy && (
                <Marker
                  variant="separator"
                  className="animate-pulse label-untitled text-[12px] text-ash"
                >
                  <MarkerContent>{copy.thinking}</MarkerContent>
                </Marker>
              )}

              {error && (
                <Marker className="label-untitled text-[12px] text-ash">
                  <MarkerContent>{copy.error}</MarkerContent>
                </Marker>
              )}
            </MessageScrollerContent>
          </MessageScrollerViewport>
        </MessageScroller>
      </MessageScrollerProvider>

      <form
        className="flex items-end gap-[11px] border-t border-hairline px-[21px] py-[15px]"
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
      >
        <textarea
          ref={inputRef}
          rows={1}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            // Enter manda, Shift+Enter salta de línea. Es un chat, no un form.
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault()
              submit()
            }
          }}
          placeholder={copy.placeholder}
          aria-label={copy.placeholder}
          className="max-h-[120px] min-h-[24px] flex-1 resize-none bg-transparent label-untitled text-bone outline-none placeholder:text-ash"
        />
        <button
          type="submit"
          disabled={busy || draft.trim().length === 0}
          aria-label={copy.send}
          className={cn(
            "shrink-0 rounded-pill border border-hairline px-[15px] py-[5px] text-bone transition-colors duration-(--duration-state)",
            "hover:border-bone disabled:pointer-events-none disabled:opacity-40"
          )}
        >
          {copy.send}
        </button>
      </form>
    </div>
  )
}
