import { useEffect, useRef, useState } from "react"
import { useAgent } from "agents/react"
import { useAgentChat } from "@cloudflare/ai-chat/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BubbleChatIcon,
  Calendar03Icon,
  Sent02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

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
  /**
   * Lo que la persona ya había escrito antes de que esto existiera.
   *
   * La demostración de la landing es HTML estático con un campo de verdad: el
   * chat recién se descarga cuando alguien lo toca. Lo que llegó a tipear en el
   * campo estático entra por acá, así no tiene que escribirlo de nuevo.
   */
  initialDraft?: string
  /** Idem, pero ya lo había mandado: se envía solo al abrir el socket. */
  openingMessage?: string
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
type CtaData = { channel: "booking" | "whatsapp"; url: string }

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

/**
 * URLs, mails y teléfonos sueltos en el texto.
 *
 * El agente cierra pasando un enlace de agenda o de WhatsApp, así que el enlace
 * es la última cosa que hace en toda la conversación: dejarlo como texto plano
 * obliga a copiarlo a mano y ahí se termina el embudo. No es markdown —el
 * validador prohíbe markdown en las respuestas— así que se detecta sobre el
 * texto crudo.
 *
 * El paréntesis y el punto finales quedan afuera a propósito: "escribime a
 * wa.me/54… (o por mail)" cerraría el enlace con el paréntesis adentro.
 */
const LINKISH =
  /(https?:\/\/[^\s<>()]+[^\s<>().,;:!?]|(?:www\.|wa\.me\/|cal\.com\/)[^\s<>()]+[^\s<>().,;:!?]|[\w.+-]+@[\w-]+\.[\w.]*[\w])/g

function href(match: string): string {
  if (match.includes("@") && !match.startsWith("http")) return `mailto:${match}`
  return match.startsWith("http") ? match : `https://${match}`
}

function withLinks(text: string) {
  return text.split(LINKISH).map((piece, index) =>
    // split() con un grupo de captura intercala los separadores en los índices
    // impares, así que la paridad alcanza para saber qué es enlace y qué no.
    index % 2 === 1 ? (
      <a
        key={index}
        href={href(piece)}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-current/40 underline-offset-[3px] transition-[text-decoration-color] duration-(--duration-state) hover:decoration-current"
      >
        {piece}
      </a>
    ) : (
      piece
    )
  )
}

export default function AgentChat({
  host,
  pass,
  copy,
  initialDraft = "",
  openingMessage,
}: Props) {
  const [id] = useState(sessionId)
  const [draft, setDraft] = useState(initialDraft)
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

  // El mensaje que la persona mandó desde el campo estático, apenas el socket
  // esté listo. Va contra el evento y no contra un `status` porque en el
  // instante del montaje el socket todavía se está abriendo, y un envío ahí se
  // pierde sin que nadie se entere.
  const opened = useRef(false)
  useEffect(() => {
    if (!openingMessage || opened.current) return

    const send = () => {
      if (opened.current) return
      opened.current = true
      void sendMessage({ text: openingMessage })
    }

    const socket = agent as unknown as WebSocket
    if (socket.readyState === WebSocket.OPEN) {
      send()
      return
    }

    socket.addEventListener("open", send)
    return () => socket.removeEventListener("open", send)
  }, [agent, openingMessage, sendMessage])

  // El campo crece con lo que se escribe. Va en un efecto y no en el onChange
  // porque también tiene que encogerse cuando el borrador se vacía al enviar,
  // que no pasa por el teclado. El tope lo pone max-height en CSS: pasado ese
  // punto el textarea scrollea en vez de comerse la conversación.
  useEffect(() => {
    const field = inputRef.current
    if (!field) return
    field.style.height = "auto"
    field.style.height = `${field.scrollHeight}px`
  }, [draft])

  const busy = isStreaming || status === "submitted"
  const ready = !busy && draft.trim().length > 0

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
                    : part.type === "data-step" ||
                      part.type === "data-approval" ||
                      part.type === "data-cta"
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
                                  {withLinks(part.text)}
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

                          // El cierre. Llega como dato y no dentro del texto:
                          // la URL de la agenda va prefilleada con el caso y es
                          // demasiado larga para que el modelo la copie sin
                          // romperla. Acá es un botón, y como tal no se puede
                          // escribir mal.
                          if (part.type === "data-cta") {
                            const data = part.data as CtaData
                            return (
                              <a
                                key={key}
                                href={data.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-fit items-center gap-[7px] rounded-pill bg-bone px-[15px] py-[9px] label-untitled text-canvas transition-opacity duration-(--duration-state) hover:opacity-80"
                              >
                                <HugeiconsIcon
                                  icon={
                                    data.channel === "booking"
                                      ? Calendar03Icon
                                      : BubbleChatIcon
                                  }
                                  size={15}
                                  strokeWidth={1.8}
                                />
                                {copy.cta[data.channel]}
                              </a>
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
        <div
          data-ready={ready ? "" : undefined}
          className={cn(
            "group/prompt flex items-end gap-[7px] rounded-[22px] border border-hairline bg-surface py-[7px] ps-[15px] pe-[7px] pb-[7px]",
            "transition-[border-color,box-shadow] duration-(--duration-state) ease-(--ease-opx)",
            "focus-within:border-bone focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-bone)_8%,transparent)]"
          )}
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
            className="max-h-[132px] min-h-[30px] flex-1 resize-none overflow-y-auto bg-transparent py-[4px] font-untitled text-[15px] leading-[1.5] text-bone outline-none placeholder:text-ash focus-visible:outline-none"
          />
          {/* El botón nace chico y apagado y crece cuando hay algo que mandar:
              el estado del formulario se ve antes de leer nada. */}
          <button
            type="submit"
            disabled={!ready}
            aria-label={copy.send}
            className={cn(
              "grid size-[32px] shrink-0 place-items-center rounded-pill bg-bone text-canvas",
              "transition-[opacity,scale] duration-(--duration-state) ease-(--ease-opx)",
              "scale-90 opacity-30 group-data-ready/prompt:scale-100 group-data-ready/prompt:opacity-100",
              "hover:opacity-80 disabled:pointer-events-none"
            )}
          >
            <HugeiconsIcon icon={Sent02Icon} size={16} strokeWidth={1.8} />
          </button>
        </div>
      </form>
    </div>
  )
}
