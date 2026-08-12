import { useEffect, useRef, useState } from "react"
import { useAgent } from "agents/react"
import { useAgentChat } from "@cloudflare/ai-chat/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Sent02Icon, Tick02Icon } from "@hugeicons/core-free-icons"

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
  /** Pase firmado del desafío de Turnstile; sin él el worker rechaza el socket. */
  pass: string
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

/**
 * La burbuja.
 *
 * El sistema tiene `--radius: 0`, que es correcto para la página —tarjetas y
 * reglas a escuadra— y equivocado para un chat: una conversación en cajas
 * rectas se lee como una tabla, no como alguien hablando. Acá, y sólo acá, se
 * usa un radio explícito, con la esquina del lado de quien habla recortada
 * para que la burbuja apunte a su emisor sin dibujar una colita.
 */
const BUBBLE_BASE =
  "rounded-[20px] px-[15px] py-[10px] font-untitled text-[15px] leading-[1.55] font-normal"
const BUBBLE_MINE = `${BUBBLE_BASE} rounded-br-[6px]`
const BUBBLE_THEIRS = `${BUBBLE_BASE} rounded-bl-[6px]`

/**
 * El color va en el envoltorio, no en el contenido: las variantes de `Bubble`
 * pintan al hijo con `*:data-[slot=bubble-content]:…`, que gana por
 * especificidad a cualquier clase suelta puesta en `BubbleContent`. Escrito
 * con el mismo prefijo, tailwind-merge lo reconoce como el mismo grupo y se
 * queda con el nuestro — que además usa los tokens del sistema, así que el
 * tema claro es un cambio de valor y no otra regla.
 *
 * Van escritas enteras, sin interpolar: Tailwind escanea texto y una clase
 * armada por concatenación no existe para el compilador.
 */
const SKIN_MINE =
  "*:data-[slot=bubble-content]:border-transparent *:data-[slot=bubble-content]:bg-bone *:data-[slot=bubble-content]:text-canvas"
const SKIN_THEIRS =
  "*:data-[slot=bubble-content]:border-hairline *:data-[slot=bubble-content]:bg-canvas *:data-[slot=bubble-content]:text-bone"

export default function AgentChat({ host, pass, copy }: Props) {
  const [id] = useState(sessionId)
  const [draft, setDraft] = useState("")
  const [resolved, setResolved] = useState<
    Record<string, "sent" | "dismissed">
  >({})
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const agent = useAgent({
    agent: "VantaAgent",
    name: id,
    host,
    query: { pass },
  })
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
            {/* justify-end apoya la conversación abajo cuando todavía es
                corta; spacerClassName le pone techo al colchón que el
                scroller deja debajo del último turno para poder anclarlo
                arriba —sin tope, en un panel alto queda medio vacío. */}
            <MessageScrollerContent
              className="flex flex-col justify-end gap-[15px] py-[21px]"
              spacerClassName="max-h-[14svh]"
            >
              {/* Cada turno es un item del scroller: así el scroller puede
                  anclarlo y seguir el streaming pegado al fondo. */}
              <MessageScrollerItem>
                <Message align="start">
                  <MessageContent>
                    <Bubble variant="outline" className={SKIN_THEIRS}>
                      <BubbleContent className={BUBBLE_THEIRS}>
                        {copy.greeting}
                      </BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>

              {messages.map((message, messageIndex) => {
                const mine = message.role === "user"
                const last = messageIndex === messages.length - 1

                // Un turno sin nada visible —sólo partes internas del
                // protocolo— no lleva item: el scroller le reserva alto
                // intrínseco y deja un hueco muerto en medio del hilo.
                const visible = message.parts.filter((part) =>
                  part.type === "text"
                    ? part.text.trim().length > 0
                    : part.type === "data-step" || part.type === "data-approval"
                )
                if (visible.length === 0) return null

                return (
                  <MessageScrollerItem key={message.id} scrollAnchor={last}>
                    <Message align={mine ? "end" : "start"}>
                      <MessageContent className="gap-[7px]">
                        {visible.map((part, index) => {
                          const key = `${message.id}-${index}`

                          if (part.type === "text") {
                            if (!part.text.trim()) return null
                            return (
                              <Bubble
                                key={key}
                                variant={mine ? "default" : "outline"}
                                align={mine ? "end" : "start"}
                                className={mine ? SKIN_MINE : SKIN_THEIRS}
                              >
                                <BubbleContent
                                  className={cn(
                                    "whitespace-pre-wrap",
                                    mine ? BUBBLE_MINE : BUBBLE_THEIRS
                                  )}
                                >
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
                                className={cn("max-w-full", SKIN_THEIRS)}
                              >
                                <BubbleContent
                                  className={cn(
                                    BUBBLE_THEIRS,
                                    "flex flex-col gap-[11px] py-[15px]"
                                  )}
                                >
                                  <span>{copy.approval.question}</span>
                                  <span className="text-ash">
                                    {data.contact}
                                  </span>

                                  {state ? (
                                    <span className="label-untitled text-ash">
                                      {state === "sent"
                                        ? copy.approval.sent
                                        : copy.approval.dismissed}
                                    </span>
                                  ) : (
                                    <span className="flex gap-[7px] label-untitled">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          void approve(key, data, true)
                                        }
                                        className="inline-flex items-center gap-[7px] rounded-pill bg-bone px-[15px] py-[7px] text-canvas transition-opacity duration-(--duration-state) hover:opacity-80"
                                      >
                                        <HugeiconsIcon
                                          icon={Tick02Icon}
                                          size={15}
                                          strokeWidth={2}
                                        />
                                        {copy.approval.approve}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          void approve(key, data, false)
                                        }
                                        className="rounded-pill border border-hairline px-[15px] py-[7px] text-ash transition-colors duration-(--duration-state) hover:border-bone hover:text-bone"
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

      {/* El campo es un solo objeto redondeado —caja y botón adentro del mismo
          contorno— en vez de un rectángulo y un pill sueltos peleándose la
          línea. El foco se dibuja en el contorno, no en el textarea. */}
      <form
        className="border-t border-hairline px-[21px] py-[15px]"
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
      >
        <div className="flex items-end gap-[7px] rounded-[22px] border border-hairline bg-surface py-[7px] pr-[7px] pl-[15px] transition-colors duration-(--duration-state) focus-within:border-bone">
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
            className="max-h-[120px] min-h-[30px] flex-1 resize-none bg-transparent py-[4px] font-untitled text-[15px] leading-[1.5] text-bone outline-none placeholder:text-ash focus-visible:outline-none"
          />
          <button
            type="submit"
            disabled={busy || draft.trim().length === 0}
            aria-label={copy.send}
            className={cn(
              "grid size-[32px] shrink-0 place-items-center rounded-pill bg-bone text-canvas transition-opacity duration-(--duration-state)",
              "hover:opacity-80 disabled:pointer-events-none disabled:opacity-30"
            )}
          >
            <HugeiconsIcon icon={Sent02Icon} size={16} strokeWidth={1.8} />
          </button>
        </div>
      </form>
    </div>
  )
}
