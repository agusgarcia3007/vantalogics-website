import type { Lang } from "@/i18n"

/**
 * Páginas de solución por sector (la capa programática del sitio).
 *
 * La búsqueda de palabras clave devolvió el mismo patrón en todos los rubros
 * probados: el volumen no está en «automatización de procesos» —término que
 * además compite con automatización de portones y persianas— sino en la
 * combinación sector + tarea: «IA para clínicas dentales», «agente IA para
 * inmobiliarias», «IA para estudios contables». Son consultas de intención
 * comercial alta y casi nadie las responde con contenido específico: se
 * resuelven con una landing genérica a la que le cambiaron el sustantivo.
 *
 * De ahí la forma de este archivo. Cada sector declara procesos reales,
 * sistemas reales del rubro y una lista explícita de cuándo NO conviene. Esa
 * última sección es la que separa una página programática útil de una granja
 * de contenido: dice algo que sólo puede decir alguien que hizo el trabajo, y
 * es lo que hace que la página sea citable por un motor de respuesta.
 *
 * La regla para agregar sectores: si no podés escribir la sección «cuándo no
 * conviene» con algo concreto, todavía no sabés lo suficiente de ese rubro
 * como para publicar la página.
 */

interface Localized {
  es: string
  en: string
}

interface LocalizedList {
  es: string[]
  en: string[]
}

interface Item {
  title: Localized
  detail: Localized
}

export interface Solution {
  slug: Localized
  sector: Localized
  /** H1 de la página. */
  title: Localized
  /** Meta description, 140–160 caracteres. */
  description: Localized
  /** Respuesta corta y citable, 40–60 palabras. */
  answer: Localized
  /** Dos párrafos de contexto del rubro. */
  intro: LocalizedList
  /** Procesos que se atacan primero. */
  processes: Item[]
  /** Sistemas del rubro con los que se integra. */
  stack: LocalizedList
  /** Lo que queda con aprobación humana. */
  human: LocalizedList
  /** Por dónde se empieza, en orden. */
  start: LocalizedList
  /** Cuándo no conviene. La sección que hace honesta a la página. */
  notThis: LocalizedList
  faq: { question: Localized; answer: Localized }[]
}

export const SOLUTIONS: Solution[] = [
  {
    slug: { es: "clinicas-y-consultorios", en: "clinics-and-medical-practices" },
    sector: { es: "Clínicas y consultorios", en: "Clinics and practices" },
    title: {
      es: "Automatización con IA para clínicas y consultorios",
      en: "AI automation for clinics and medical practices",
    },
    description: {
      es: "Cómo se automatiza con IA la agenda, la confirmación de turnos y el recupero de ausentes en una clínica, sin que un sistema tome decisiones clínicas.",
      en: "How AI automates scheduling, appointment confirmation and no-show recovery at a clinic, without a system making clinical decisions.",
    },
    answer: {
      es: "En una clínica, la automatización con IA que paga sola es la de la agenda: confirmar turnos, reprogramar cancelaciones y llenar los huecos con la lista de espera. La documentación clínica se puede asistir, pero siempre la firma un profesional. Ninguna decisión clínica se automatiza.",
      en: "At a clinic, the AI automation that pays for itself is scheduling: confirming appointments, rescheduling cancellations and filling gaps from the waiting list. Clinical documentation can be assisted, but a clinician always signs it. No clinical decision is automated.",
    },
    intro: {
      es: [
        "El problema de una clínica casi nunca es la demanda: es que entre el 15% y el 30% de los turnos se pierde por ausencias y cancelaciones tardías, y que el hueco que deja una cancelación de la mañana rara vez se llena a tiempo. Eso es capacidad instalada facturando cero.",
        "La otra pérdida está en la recepción. Una persona que atiende el teléfono, contesta WhatsApp, agenda, cobra y recibe pacientes hace cinco trabajos a la vez, y el que primero se cae es el seguimiento: confirmar, recordar, recuperar al que no vino.",
      ],
      en: [
        "A clinic's problem is rarely demand: it's that 15–30% of appointments are lost to no-shows and late cancellations, and the gap a morning cancellation leaves is rarely filled in time. That's installed capacity billing zero.",
        "The other loss is at the front desk. One person answering the phone, replying on WhatsApp, scheduling, taking payment and receiving patients is doing five jobs at once, and the first to slip is follow-up: confirming, reminding, recovering the patient who didn't show.",
      ],
    },
    processes: [
      {
        title: {
          es: "Confirmación y recordatorio de turnos",
          en: "Appointment confirmation and reminders",
        },
        detail: {
          es: "Por WhatsApp, con respuesta libre: el paciente contesta «no puedo el martes, ¿hay algo el jueves?» y el agente reprograma sobre la disponibilidad real de la agenda.",
          en: "Over WhatsApp, with free-text replies: the patient says \"I can't make Tuesday, anything Thursday?\" and the agent reschedules against real calendar availability.",
        },
      },
      {
        title: {
          es: "Recupero de huecos por cancelación",
          en: "Filling cancellation gaps",
        },
        detail: {
          es: "Cuando se libera un turno, se ofrece por orden a la lista de espera y se cierra con el primero que acepta. Es el proceso con mejor retorno directo de todos.",
          en: "When a slot frees up, it's offered down the waiting list in order and closed with the first to accept. This is the single highest direct-return process here.",
        },
      },
      {
        title: {
          es: "Triage administrativo de consultas",
          en: "Administrative triage of enquiries",
        },
        detail: {
          es: "Separar lo que es agenda, cobertura, precio o indicación previa, y responder lo administrativo. Lo clínico va a una persona sin excepción.",
          en: "Separating scheduling, coverage, pricing and pre-visit instructions, and answering the administrative ones. Anything clinical goes to a person, no exceptions.",
        },
      },
      {
        title: {
          es: "Autorizaciones y obras sociales",
          en: "Authorizations and insurance",
        },
        detail: {
          es: "Armado del pedido, control de datos y seguimiento del estado. Reduce el ida y vuelta que hoy consume la mañana entera de administración.",
          en: "Assembling the request, checking data and following up on status. Cuts the back-and-forth that currently consumes an entire admin morning.",
        },
      },
    ],
    stack: {
      es: [
        "Software de gestión clínica y agenda",
        "WhatsApp Business API",
        "Sistemas de obras sociales y prepagas",
        "Facturación electrónica",
        "Google Calendar",
      ],
      en: [
        "Practice management and scheduling software",
        "WhatsApp Business API",
        "Insurance and payer portals",
        "Electronic invoicing",
        "Google Calendar",
      ],
    },
    human: {
      es: [
        "Cualquier contenido clínico: síntomas, indicaciones, interpretación de estudios.",
        "Cambios en la agenda de un profesional que impliquen sobreturno.",
        "Comunicación de resultados, siempre.",
        "Reclamos y pacientes molestos, de inmediato.",
      ],
      en: [
        "Any clinical content: symptoms, instructions, interpreting results.",
        "Schedule changes for a clinician that mean overbooking.",
        "Communicating results, always.",
        "Complaints and upset patients, immediately.",
      ],
    },
    start: {
      es: [
        "Medir la tasa de ausencias real de los últimos tres meses, por profesional y por franja horaria.",
        "Automatizar confirmación y recordatorio. Es el cambio más chico con el efecto más medible.",
        "Sumar el recupero de huecos con lista de espera una vez que la agenda es confiable.",
        "Recién después, el triage de consultas entrantes.",
      ],
      en: [
        "Measure the real no-show rate over the last three months, by clinician and time slot.",
        "Automate confirmation and reminders. Smallest change, most measurable effect.",
        "Add cancellation-gap recovery from the waiting list once the calendar is trustworthy.",
        "Only then, triage of incoming enquiries.",
      ],
    },
    notThis: {
      es: [
        "Si la agenda no está digitalizada o vive en papel y en la cabeza de la recepcionista, primero va eso. Un agente sobre una agenda que no refleja la realidad genera sobreturnos.",
        "Si sos un consultorio de un solo profesional con menos de 40 turnos semanales, el ahorro no paga el proyecto. Un recordatorio automático del software de agenda alcanza.",
        "Si el volumen de consultas entrantes es bajo pero muy clínico, casi todo va a escalar a una persona y el agente no agrega nada.",
      ],
      en: [
        "If the calendar isn't digital — living on paper and in the receptionist's head — fix that first. An agent on a calendar that doesn't reflect reality creates double-bookings.",
        "If you're a single-clinician practice under 40 appointments a week, the savings won't cover the project. Your scheduling software's automatic reminder is enough.",
        "If enquiry volume is low but heavily clinical, nearly everything escalates to a person and the agent adds nothing.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Un agente de IA puede dar indicaciones médicas?",
          en: "Can an AI agent give medical advice?",
        },
        answer: {
          es: "No, y no lo implementamos así. El agente resuelve lo administrativo —agenda, cobertura, precios, requisitos previos— y deriva a un profesional todo lo que sea clínico. La frontera se define por escrito antes de empezar y se prueba explícitamente en el set de evaluación.",
          en: "No, and we don't implement it that way. The agent handles administrative matters — scheduling, coverage, pricing, prerequisites — and routes anything clinical to a professional. That boundary is defined in writing before we start and tested explicitly in the evaluation set.",
        },
      },
      {
        question: {
          es: "¿Qué pasa con los datos de los pacientes?",
          en: "What happens to patient data?",
        },
        answer: {
          es: "Quedan en la infraestructura de la clínica o en la nube que la clínica defina, con acceso mínimo necesario y registro de cada consulta. No se usan para entrenar modelos y se trabaja con retención cero del lado del proveedor de modelos cuando el caso lo exige.",
          en: "It stays in the clinic's infrastructure or the cloud the clinic designates, with least-privilege access and a log of every query. It is never used to train models, and we run zero-retention with the model provider when the case requires it.",
        },
      },
    ],
  },

  {
    slug: { es: "inmobiliarias", en: "real-estate-agencies" },
    sector: { es: "Inmobiliarias", en: "Real estate" },
    title: {
      es: "Automatización con IA para inmobiliarias",
      en: "AI automation for real estate agencies",
    },
    description: {
      es: "Cómo se automatiza con IA la calificación de consultas, la coordinación de visitas y el seguimiento de interesados en una inmobiliaria, sin perder el contacto humano donde decide la venta.",
      en: "How AI automates lead qualification, viewing coordination and follow-up at a real estate agency, without losing the human contact where the deal is decided.",
    },
    answer: {
      es: "En una inmobiliaria lo que se automatiza primero es la respuesta y calificación de consultas: contestar en minutos, entender qué busca la persona, cruzarlo con la cartera y coordinar la visita. El seguimiento posterior también. La negociación y el cierre quedan íntegramente del lado del asesor.",
      en: "At a real estate agency, the first thing to automate is responding to and qualifying enquiries: replying within minutes, understanding what the person wants, matching it against inventory and booking the viewing. Follow-up too. Negotiation and closing stay entirely with the agent.",
    },
    intro: {
      es: [
        "El dato que ordena todo el rubro es el tiempo de respuesta. Una consulta contestada en los primeros cinco minutos tiene varias veces más probabilidad de convertirse en visita que la misma consulta contestada a las cuatro horas, y las consultas entran a toda hora y por cinco canales distintos.",
        "El segundo problema es de volumen y de calidad de datos: la mayoría de las consultas no califican, pero averiguarlo consume el tiempo del asesor que debería estar mostrando propiedades. Y lo que sí calificó se pierde en un seguimiento que nadie sostiene después de la segunda semana.",
      ],
      en: [
        "The number that organizes this whole industry is response time. An enquiry answered within five minutes is several times more likely to become a viewing than the same enquiry answered four hours later — and enquiries arrive at all hours through five different channels.",
        "The second problem is volume and data quality: most enquiries don't qualify, but finding that out consumes the time of the agent who should be showing properties. And the ones that do qualify get lost in a follow-up nobody sustains past week two.",
      ],
    },
    processes: [
      {
        title: {
          es: "Respuesta y calificación de consultas",
          en: "Enquiry response and qualification",
        },
        detail: {
          es: "Responde en minutos por el canal por el que entró, entiende presupuesto, zona, plazo y forma de pago, y cruza contra la cartera disponible.",
          en: "Replies within minutes on the channel it arrived on, establishes budget, area, timeline and payment method, and matches against available inventory.",
        },
      },
      {
        title: {
          es: "Coordinación de visitas",
          en: "Viewing coordination",
        },
        detail: {
          es: "Propone horarios sobre la agenda real del asesor y la disponibilidad del inmueble, confirma y recuerda. Las visitas fallidas caen fuerte.",
          en: "Proposes times against the agent's real calendar and property availability, confirms and reminds. No-show viewings drop sharply.",
        },
      },
      {
        title: {
          es: "Seguimiento de interesados",
          en: "Lead follow-up",
        },
        detail: {
          es: "Retoma al que visitó y no volvió a escribir, y avisa cuando entra a la cartera algo que encaja con lo que había pedido meses atrás.",
          en: "Re-engages someone who viewed and went quiet, and pings them when something matching what they asked for months ago comes into inventory.",
        },
      },
      {
        title: {
          es: "Carga y enriquecimiento de fichas",
          en: "Listing creation and enrichment",
        },
        detail: {
          es: "Toma fotos, medidas y notas del asesor y arma la ficha completa para los portales, con el texto adaptado a cada uno.",
          en: "Takes photos, measurements and the agent's notes and builds the full listing for each portal, with copy adapted to each.",
        },
      },
    ],
    stack: {
      es: [
        "CRM inmobiliario",
        "Portales de publicación",
        "WhatsApp Business API",
        "Google Calendar",
        "Formularios del sitio web",
      ],
      en: [
        "Real estate CRM",
        "Listing portals",
        "WhatsApp Business API",
        "Google Calendar",
        "Website forms",
      ],
    },
    human: {
      es: [
        "Toda negociación de precio y condiciones.",
        "La visita en sí y todo lo que se conversa en ella.",
        "Documentación, reserva y firma.",
        "Cualquier consulta de un propietario sobre su propia propiedad.",
      ],
      en: [
        "All price and terms negotiation.",
        "The viewing itself and everything discussed in it.",
        "Paperwork, reservation and signing.",
        "Any owner enquiry about their own property.",
      ],
    },
    start: {
      es: [
        "Medir el tiempo de respuesta real por canal durante dos semanas. Suele ser peor de lo que el equipo cree.",
        "Automatizar la primera respuesta y la calificación. Es el cambio con el efecto más inmediato sobre visitas agendadas.",
        "Sumar la coordinación de visitas contra la agenda real.",
        "Al final, el seguimiento de la base histórica, que es donde está el volumen dormido.",
      ],
      en: [
        "Measure real response time by channel for two weeks. It's usually worse than the team believes.",
        "Automate first response and qualification. Biggest immediate effect on viewings booked.",
        "Add viewing coordination against the real calendar.",
        "Last, follow-up on the historical database, where the dormant volume sits.",
      ],
    },
    notThis: {
      es: [
        "Si la cartera no está actualizada en el CRM, el agente va a ofrecer propiedades ya vendidas. Eso quema más consultas de las que recupera.",
        "Si operás menos de treinta consultas por mes, el asesor contesta más rápido y mejor que cualquier sistema.",
        "En operaciones de alto ticket con cartera muy chica, la relación personal desde el primer mensaje es el producto. Automatizar ahí resta.",
      ],
      en: [
        "If inventory isn't current in the CRM, the agent will offer properties already sold. That burns more enquiries than it recovers.",
        "If you handle fewer than thirty enquiries a month, an agent answers faster and better than any system.",
        "In high-ticket operations with a small portfolio, the personal relationship from the first message is the product. Automating there subtracts.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿El interesado se da cuenta de que le contesta un sistema?",
          en: "Do leads realize a system is answering them?",
        },
        answer: {
          es: "Sí, y lo declaramos en el primer mensaje. En la práctica no baja la conversión: lo que la baja es tardar cuatro horas en contestar. El interesado que quiere hablar con una persona lo pide, y el traspaso es inmediato y con todo el contexto.",
          en: "Yes, and we say so in the first message. In practice it doesn't hurt conversion — what hurts conversion is taking four hours to reply. A lead who wants a person asks for one, and the handoff is immediate and carries full context.",
        },
      },
      {
        question: {
          es: "¿Puede publicar en los portales por su cuenta?",
          en: "Can it publish to portals on its own?",
        },
        answer: {
          es: "Puede armar la ficha completa y dejarla lista, pero la publicación la aprueba una persona. Un error de precio o de metros publicado en cinco portales es caro de corregir y afecta la reputación de la inmobiliaria, así que ese paso queda con revisión humana.",
          en: "It can build the complete listing and stage it, but a person approves publication. A price or square-footage error published across five portals is expensive to correct and damages the agency's reputation, so that step stays under human review.",
        },
      },
    ],
  },

  {
    slug: { es: "estudios-contables", en: "accounting-firms" },
    sector: { es: "Estudios contables", en: "Accounting firms" },
    title: {
      es: "Automatización con IA para estudios contables",
      en: "AI automation for accounting firms",
    },
    description: {
      es: "Cómo se automatiza con IA la recepción de documentación, la carga de comprobantes y el seguimiento de clientes en un estudio contable, con revisión profesional en cada cierre.",
      en: "How AI automates document intake, voucher entry and client follow-up at an accounting firm, with professional review at every close.",
    },
    answer: {
      es: "En un estudio contable lo que se automatiza es la entrada: pedir la documentación mes a mes, recibirla por los canales por los que llega, clasificar los comprobantes y precargarlos. La imputación final y todo lo que se presenta ante el fisco lo revisa y firma un profesional.",
      en: "At an accounting firm, what gets automated is intake: chasing documentation month after month, receiving it through whatever channels it arrives on, classifying vouchers and pre-loading them. Final classification and anything filed with the tax authority is reviewed and signed by a professional.",
    },
    intro: {
      es: [
        "El cuello de botella de un estudio no está en la contabilidad: está en conseguir la documentación. Cada mes, alguien persigue por WhatsApp a cuarenta clientes para que manden facturas que llegan en PDF, en foto, en un ZIP mal armado o reenviadas desde el correo del proveedor.",
        "Después viene la carga, que es trabajo mecánico de alto volumen y baja tolerancia al error, y que compite por las mismas horas que el trabajo que el cliente efectivamente valora: el asesoramiento.",
      ],
      en: [
        "An accounting firm's bottleneck isn't the accounting: it's getting the documentation. Every month, somebody chases forty clients over WhatsApp for invoices that arrive as PDFs, as photos, in a badly built ZIP, or forwarded from a supplier's inbox.",
        "Then comes data entry — high-volume mechanical work with low error tolerance, competing for the same hours as the work clients actually value: advice.",
      ],
    },
    processes: [
      {
        title: {
          es: "Pedido y recepción de documentación",
          en: "Requesting and receiving documentation",
        },
        detail: {
          es: "El agente pide lo que falta a cada cliente por su canal habitual, con el detalle de qué falta exactamente, e insiste hasta recibirlo. Es el proceso que más horas libera.",
          en: "The agent asks each client for what's missing on their usual channel, itemized, and follows up until it arrives. This is the process that frees the most hours.",
        },
      },
      {
        title: {
          es: "Clasificación y extracción de comprobantes",
          en: "Voucher classification and extraction",
        },
        detail: {
          es: "Lee facturas, recibos y extractos en cualquier formato, extrae los campos y detecta duplicados y faltantes de numeración.",
          en: "Reads invoices, receipts and statements in any format, extracts the fields and flags duplicates and gaps in numbering.",
        },
      },
      {
        title: {
          es: "Precarga en el sistema contable",
          en: "Pre-loading into the accounting system",
        },
        detail: {
          es: "Deja el asiento propuesto con la imputación sugerida a partir del histórico de ese cliente. El profesional revisa y confirma.",
          en: "Stages the proposed entry with a suggested classification drawn from that client's history. The professional reviews and confirms.",
        },
      },
      {
        title: {
          es: "Conciliación bancaria",
          en: "Bank reconciliation",
        },
        detail: {
          es: "Cruza extractos contra comprobantes y deja para revisión sólo lo que no cerró, que suele ser entre el 5% y el 15%.",
          en: "Matches statements against vouchers and surfaces only what didn't reconcile — usually 5–15%.",
        },
      },
    ],
    stack: {
      es: [
        "Sistema contable e impositivo",
        "WhatsApp Business API y correo",
        "Bancos y extractos",
        "Facturación electrónica",
        "Almacenamiento documental",
      ],
      en: [
        "Accounting and tax software",
        "WhatsApp Business API and email",
        "Banks and statements",
        "Electronic invoicing",
        "Document storage",
      ],
    },
    human: {
      es: [
        "Toda presentación ante el fisco, sin excepción.",
        "La imputación final de cualquier comprobante dudoso.",
        "Criterio impositivo y asesoramiento, que es el producto del estudio.",
        "Comunicación de deuda, multas o intimaciones.",
      ],
      en: [
        "Every filing with the tax authority, no exceptions.",
        "Final classification of any ambiguous voucher.",
        "Tax judgement and advice — the firm's actual product.",
        "Communicating debt, penalties or notices.",
      ],
    },
    start: {
      es: [
        "Medir cuántas horas por mes se van en perseguir documentación. Es el número que justifica el proyecto solo.",
        "Automatizar el pedido y la recepción, que no toca el sistema contable y por eso se implementa rápido.",
        "Sumar la extracción y clasificación de comprobantes.",
        "Al final, la precarga contra el sistema contable, que es la integración más delicada.",
      ],
      en: [
        "Measure how many hours a month go into chasing documentation. That number justifies the project on its own.",
        "Automate requesting and receiving — it doesn't touch the accounting system, so it ships fast.",
        "Add voucher extraction and classification.",
        "Last, pre-loading into the accounting system, which is the most delicate integration.",
      ],
    },
    notThis: {
      es: [
        "Si el estudio tiene menos de quince clientes activos, la persecución de documentación se resuelve con una planilla y un recordatorio.",
        "Si cada cliente tiene un criterio de imputación distinto y sin documentar, primero hay que escribir esos criterios. El agente no los puede inferir de la nada.",
        "Si el sistema contable es cerrado y sin forma de importar, la precarga no es viable y el proyecto se limita a la entrada de documentación.",
      ],
      en: [
        "If the firm has fewer than fifteen active clients, chasing documentation is solved with a spreadsheet and a reminder.",
        "If every client has a different, undocumented classification convention, those conventions have to be written down first. The agent can't infer them from nothing.",
        "If the accounting software is closed with no import path, pre-loading isn't viable and the project is limited to document intake.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Puede presentar declaraciones juradas?",
          en: "Can it file tax returns?",
        },
        answer: {
          es: "No. Toda presentación ante el fisco la hace y firma un profesional matriculado. El agente prepara, ordena y precarga, que es donde están las horas; la responsabilidad profesional no es delegable a un sistema y no lo planteamos así en ninguna propuesta.",
          en: "No. Every filing is made and signed by a licensed professional. The agent prepares, organizes and pre-loads — that's where the hours are. Professional liability can't be delegated to a system, and we never propose it that way.",
        },
      },
      {
        question: {
          es: "¿Qué tan preciso es leyendo una factura fotografiada?",
          en: "How accurate is it reading a photographed invoice?",
        },
        answer: {
          es: "Alto en los campos estructurados —número, fecha, CUIT, totales— y menor en el detalle de ítems cuando la foto está torcida o con poca luz. Por eso el resultado va a revisión y el sistema marca explícitamente su nivel de confianza en vez de entregar todo como si fuera igual de seguro.",
          en: "High on structured fields — number, date, tax ID, totals — and lower on line-item detail when the photo is skewed or badly lit. That's why output goes to review and the system flags its confidence explicitly instead of presenting everything as equally certain.",
        },
      },
    ],
  },

  {
    slug: { es: "distribuidoras-y-mayoristas", en: "distributors-and-wholesalers" },
    sector: { es: "Distribuidoras y mayoristas", en: "Distributors and wholesalers" },
    title: {
      es: "Automatización con IA para distribuidoras y mayoristas",
      en: "AI automation for distributors and wholesalers",
    },
    description: {
      es: "Cómo se automatiza con IA la toma de pedidos por WhatsApp, la carga al ERP y el seguimiento de entregas en una distribuidora, sin perder el control de precios y stock.",
      en: "How AI automates order taking over WhatsApp, ERP entry and delivery tracking at a distributor, without losing control of pricing and stock.",
    },
    answer: {
      es: "En una distribuidora el proceso que más paga es la toma de pedidos: entender el pedido que llega por WhatsApp, verificar stock y precio del cliente, y cargarlo al ERP en el momento. Entre el 60% y el 85% se resuelve solo; el descuento fuera de política y el cliente con deuda escalan siempre.",
      en: "At a distributor, the process that pays most is order taking: understanding an order that arrives over WhatsApp, checking stock and customer-specific pricing, and posting it to the ERP immediately. 60–85% resolves on its own; out-of-policy discounts and customers with overdue balances always escalate.",
    },
    intro: {
      es: [
        "En una distribuidora los pedidos entran por WhatsApp, a cualquier hora, en texto, en audio y en fotos de listas escritas a mano. Después alguien los transcribe al sistema, casi siempre a la tarde, y cada tanto uno se pierde entre los mensajes.",
        "El costo no es sólo la hora de transcripción: es el pedido que entró un viernes a las nueve de la noche y se cargó el lunes, el error de tipeo que generó una devolución, y el historial de pedidos que vive en el teléfono personal de tres vendedores.",
      ],
      en: [
        "At a distributor, orders arrive over WhatsApp at all hours — as text, as voice notes, as photos of handwritten lists. Then somebody transcribes them into the system, usually in the afternoon, and occasionally one gets lost in the thread.",
        "The cost isn't only the transcription hour: it's the order that came in Friday at nine at night and got entered Monday, the typo that caused a return, and the order history living on three sales reps' personal phones.",
      ],
    },
    processes: [
      {
        title: {
          es: "Toma de pedidos por WhatsApp",
          en: "Order taking over WhatsApp",
        },
        detail: {
          es: "Interpreta texto, audio y fotos, resuelve «las de siempre» contra el historial del cliente y confirma antes de cargar.",
          en: "Interprets text, voice notes and photos, resolves \"the usual ones\" against that customer's history, and confirms before posting.",
        },
      },
      {
        title: {
          es: "Verificación de stock y precio",
          en: "Stock and price verification",
        },
        detail: {
          es: "Contra el ERP y la lista de precios de ese cliente, incluyendo condición de pago y estado de cuenta.",
          en: "Against the ERP and that customer's price list, including payment terms and account status.",
        },
      },
      {
        title: {
          es: "Carga al ERP",
          en: "ERP entry",
        },
        detail: {
          es: "Con todos los campos que el ERP exige y que el cliente nunca menciona: depósito, lista, condición, centro de costos.",
          en: "With every field the ERP demands and the customer never mentions: warehouse, price list, terms, cost center.",
        },
      },
      {
        title: {
          es: "Seguimiento de entregas y reclamos",
          en: "Delivery tracking and claims",
        },
        detail: {
          es: "Responde estado de pedido y fecha de entrega, y arma el reclamo con la información completa cuando algo llegó mal.",
          en: "Answers order status and delivery dates, and assembles a complete claim when something arrived wrong.",
        },
      },
    ],
    stack: {
      es: [
        "ERP",
        "WhatsApp Business API",
        "Sistema de stock y depósito",
        "Listas de precios por cliente",
        "Logística y transporte",
      ],
      en: [
        "ERP",
        "WhatsApp Business API",
        "Warehouse and stock system",
        "Customer-specific price lists",
        "Logistics and shipping",
      ],
    },
    human: {
      es: [
        "Cualquier descuento fuera de la política vigente.",
        "Clientes con deuda vencida o cuenta bloqueada.",
        "Altas de clientes nuevos sin cuenta.",
        "Reclamos y clientes molestos, de inmediato.",
      ],
      en: [
        "Any discount outside current policy.",
        "Customers with overdue balances or blocked accounts.",
        "Onboarding new customers without an account.",
        "Claims and upset customers, immediately.",
      ],
    },
    start: {
      es: [
        "Averiguar si el ERP tiene API y ambiente de prueba. Es el dato que más mueve el presupuesto.",
        "Exportar tres meses de conversaciones reales para armar el set de evaluación con pedidos de verdad.",
        "Arrancar en modo asistido: el agente arma el pedido y una persona lo confirma antes de cargar.",
        "Pasar a carga automática por tipo de pedido, a medida que los números lo respalden.",
      ],
      en: [
        "Find out whether the ERP has an API and a sandbox. It's the single fact that moves the budget most.",
        "Export three months of real conversations to build the evaluation set from actual orders.",
        "Start assisted: the agent builds the order and a person confirms before posting.",
        "Move to automatic posting by order type, as the numbers support it.",
      ],
    },
    notThis: {
      es: [
        "Si el catálogo no está normalizado y el mismo producto aparece con tres códigos distintos, primero va eso. El agente amplifica el desorden del maestro de artículos.",
        "Si vendés menos de cincuenta pedidos por semana, el vendedor los carga más rápido de lo que cuesta el proyecto.",
        "Si cada pedido requiere ingeniería o cotización a medida, no es toma de pedidos: es venta consultiva y no se automatiza.",
      ],
      en: [
        "If the catalogue isn't normalized and the same product appears under three different codes, fix that first. The agent amplifies whatever mess is in the item master.",
        "If you sell fewer than fifty orders a week, a rep enters them faster than the project costs.",
        "If every order needs engineering or a custom quote, that isn't order taking — it's consultative selling, and it doesn't automate.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Qué pasa si entiende mal un pedido?",
          en: "What if it misreads an order?",
        },
        answer: {
          es: "Confirma siempre con el cliente antes de cargar, en los términos del cliente y no en códigos internos. Cuando hay dos productos candidatos con probabilidad parecida, pregunta en vez de elegir: una devolución cuesta mucho más que veinte preguntas.",
          en: "It always confirms with the customer before posting, in the customer's terms rather than internal codes. When two products are similarly likely, it asks instead of choosing: a return costs far more than twenty questions.",
        },
      },
      {
        question: {
          es: "¿Funciona con pedidos por audio?",
          en: "Does it work with voice-note orders?",
        },
        answer: {
          es: "Sí, y es una parte grande del volumen real. La transcripción se corrige contra el catálogo, porque los nombres propios de producto se transcriben mal. Las cantidades sacadas de un audio se confirman siempre con el cliente antes de cargar, sin excepción.",
          en: "Yes, and it's a large share of real volume. Transcription is corrected against the catalogue, because product names specific to the business transcribe poorly. Quantities taken from a voice note are always confirmed with the customer before posting, without exception.",
        },
      },
    ],
  },

  {
    slug: { es: "ecommerce", en: "ecommerce" },
    sector: { es: "Ecommerce", en: "Ecommerce" },
    title: {
      es: "Automatización con IA para ecommerce",
      en: "AI automation for ecommerce",
    },
    description: {
      es: "Cómo se automatiza con IA la atención posventa, el estado de pedidos y las devoluciones en un ecommerce, sin que un sistema decida solo sobre reembolsos.",
      en: "How AI automates post-purchase support, order status and returns in ecommerce, without a system deciding refunds on its own.",
    },
    answer: {
      es: "En un ecommerce la mayor parte del volumen de atención es posventa y repetitiva: dónde está mi pedido, cómo cambio un talle, cómo devuelvo. Eso se automatiza bien y resuelve entre el 60% y el 80% de los tickets. El reembolso y la excepción de política quedan con aprobación humana.",
      en: "In ecommerce, most support volume is post-purchase and repetitive: where's my order, how do I change a size, how do I return it. That automates well and resolves 60–80% of tickets. Refunds and policy exceptions stay under human approval.",
    },
    intro: {
      es: [
        "En un ecommerce mediano, entre el 60% y el 80% de los tickets son cuatro preguntas: dónde está mi pedido, cuándo llega, cómo lo cambio, cómo lo devuelvo. Todas tienen respuesta en un sistema y ninguna requiere criterio.",
        "El problema es que esas cuatro preguntas llegan por Instagram, WhatsApp, mail y el chat del sitio, y el equipo de atención pasa el día copiando números de seguimiento de una pestaña a otra en vez de atender los casos que sí necesitan a una persona.",
      ],
      en: [
        "In a mid-sized ecommerce operation, 60–80% of tickets are four questions: where's my order, when does it arrive, how do I exchange it, how do I return it. All four have answers sitting in a system and none require judgement.",
        "The problem is those four questions arrive via Instagram, WhatsApp, email and site chat, and the support team spends the day copying tracking numbers between tabs instead of handling the cases that genuinely need a person.",
      ],
    },
    processes: [
      {
        title: {
          es: "Estado de pedido y seguimiento",
          en: "Order status and tracking",
        },
        detail: {
          es: "Identifica al cliente, encuentra el pedido y responde con el estado real del transporte, no con el estado de la plataforma.",
          en: "Identifies the customer, finds the order and answers with the carrier's real status, not the platform's.",
        },
      },
      {
        title: {
          es: "Cambios y devoluciones",
          en: "Exchanges and returns",
        },
        detail: {
          es: "Verifica que el caso entre en política, genera la etiqueta y explica los pasos. Lo que no entra en política escala.",
          en: "Checks the case against policy, generates the label and explains the steps. Anything outside policy escalates.",
        },
      },
      {
        title: {
          es: "Consultas de producto y talle",
          en: "Product and sizing questions",
        },
        detail: {
          es: "Responde sobre la ficha real del producto y el historial de compras del cliente, no sobre generalidades.",
          en: "Answers from the actual product data and the customer's purchase history, not from generalities.",
        },
      },
      {
        title: {
          es: "Recupero de carrito y posventa",
          en: "Cart recovery and post-purchase",
        },
        detail: {
          es: "Retoma el carrito abandonado con un mensaje que responde la duda concreta, en vez de un descuento automático.",
          en: "Re-engages an abandoned cart by answering the specific hesitation, rather than firing off an automatic discount.",
        },
      },
    ],
    stack: {
      es: [
        "Plataforma de ecommerce",
        "Transporte y logística",
        "WhatsApp Business API e Instagram",
        "Pasarela de pagos",
        "Mesa de ayuda",
      ],
      en: [
        "Ecommerce platform",
        "Shipping and logistics",
        "WhatsApp Business API and Instagram",
        "Payment gateway",
        "Helpdesk",
      ],
    },
    human: {
      es: [
        "Reembolsos y notas de crédito.",
        "Excepciones a la política de cambios.",
        "Reclamos por producto dañado o pedido no recibido.",
        "Cualquier cliente que pida hablar con una persona.",
      ],
      en: [
        "Refunds and credit notes.",
        "Exceptions to the returns policy.",
        "Claims for damaged or undelivered orders.",
        "Any customer who asks for a person.",
      ],
    },
    start: {
      es: [
        "Clasificar los últimos mil tickets por tipo. El orden de ataque sale solo de ahí.",
        "Automatizar estado de pedido, que suele ser el 40% del volumen y es puro dato.",
        "Sumar cambios y devoluciones dentro de política.",
        "Recién al final, las consultas de producto, que dependen de la calidad de la ficha.",
      ],
      en: [
        "Classify the last thousand tickets by type. The order of attack falls out of that.",
        "Automate order status — usually 40% of volume and pure data lookup.",
        "Add in-policy exchanges and returns.",
        "Only at the end, product questions, which depend on the quality of your product data.",
      ],
    },
    notThis: {
      es: [
        "Si el problema real es logístico —los pedidos llegan tarde—, automatizar la atención sólo hace que el cliente reciba más rápido una mala noticia.",
        "Si vendés pocos pedidos de ticket muy alto, la atención personalizada es parte del producto.",
        "Si la ficha de producto es pobre, el agente no puede responder consultas de producto y va a escalar casi todo.",
      ],
      en: [
        "If the real problem is logistics — orders arrive late — automating support just delivers bad news faster.",
        "If you sell few, very high-ticket orders, personal service is part of the product.",
        "If your product data is thin, the agent can't answer product questions and will escalate nearly everything.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Puede procesar un reembolso solo?",
          en: "Can it process a refund on its own?",
        },
        answer: {
          es: "Técnicamente sí, y en la primera versión recomendamos que no. Un reembolso es irreversible y mueve plata: el agente arma el caso completo con la verificación ya hecha y una persona aprueba con un clic. Después de tres meses de datos se puede automatizar por tramos de monto.",
          en: "Technically yes, and in the first version we recommend against it. A refund is irreversible and moves money: the agent assembles the complete case with verification done, and a person approves in one click. After three months of data you can automate it by amount tier.",
        },
      },
      {
        question: {
          es: "¿Sirve para atender por Instagram?",
          en: "Does it work for Instagram support?",
        },
        answer: {
          es: "Sí, y en varios rubros es el canal con más volumen. La diferencia con WhatsApp es que muchas consultas llegan como respuesta a una historia y sin contexto, así que la identificación del cliente y del pedido requiere más ida y vuelta antes de poder responder algo concreto.",
          en: "Yes, and in several categories it's the highest-volume channel. The difference from WhatsApp is that many enquiries arrive as story replies with no context, so identifying the customer and the order takes more back-and-forth before anything concrete can be answered.",
        },
      },
    ],
  },

  {
    slug: { es: "estudios-juridicos", en: "law-firms" },
    sector: { es: "Estudios jurídicos", en: "Law firms" },
    title: {
      es: "Automatización con IA para estudios jurídicos",
      en: "AI automation for law firms",
    },
    description: {
      es: "Cómo se automatiza con IA la admisión de casos, la revisión documental y el seguimiento de expedientes en un estudio jurídico, con criterio profesional en cada salida.",
      en: "How AI automates intake, document review and case tracking at a law firm, with professional judgement on every output.",
    },
    answer: {
      es: "En un estudio jurídico se automatiza la admisión —calificar la consulta, reunir la documentación y armar el legajo— y la revisión documental de alto volumen. El criterio jurídico, la estrategia y todo lo que se presenta lleva revisión y firma profesional, sin excepción.",
      en: "At a law firm, what gets automated is intake — qualifying the enquiry, gathering documentation and assembling the file — plus high-volume document review. Legal judgement, strategy and anything filed carries professional review and signature, without exception.",
    },
    intro: {
      es: [
        "Un estudio pierde horas facturables en dos lugares que no se parecen entre sí. El primero es la admisión: consultas que no califican, documentación que llega incompleta, seguimiento del cliente que prometió mandar algo y no lo mandó.",
        "El segundo es la revisión de volumen: leer trescientos contratos parecidos buscando tres cláusulas, o cruzar un expediente de mil fojas buscando fechas. Es trabajo que requiere criterio para decidir, pero no para encontrar.",
      ],
      en: [
        "A firm loses billable hours in two places that look nothing alike. The first is intake: enquiries that don't qualify, incomplete documentation, chasing a client who promised to send something and didn't.",
        "The second is volume review: reading three hundred similar contracts looking for three clauses, or combing a thousand-page file for dates. It's work that needs judgement to decide, but not to find.",
      ],
    },
    processes: [
      {
        title: {
          es: "Admisión y calificación de consultas",
          en: "Intake and enquiry qualification",
        },
        detail: {
          es: "Reúne los hechos, la documentación y los plazos, y arma el legajo antes de que el abogado dedique la primera hora.",
          en: "Gathers facts, documentation and deadlines, and assembles the file before a lawyer spends the first hour.",
        },
      },
      {
        title: {
          es: "Recolección de documentación",
          en: "Document collection",
        },
        detail: {
          es: "Pide lo que falta, insiste, verifica que lo recibido sea legible y completo, y avisa cuando está listo para revisión.",
          en: "Requests what's missing, follows up, verifies that what arrived is legible and complete, and flags when it's ready for review.",
        },
      },
      {
        title: {
          es: "Revisión documental de volumen",
          en: "High-volume document review",
        },
        detail: {
          es: "Localiza cláusulas, fechas, montos y partes en corpus grandes, y devuelve cada hallazgo con la cita al documento de origen.",
          en: "Locates clauses, dates, amounts and parties across large corpora, returning each finding with a citation to the source document.",
        },
      },
      {
        title: {
          es: "Seguimiento de expedientes y plazos",
          en: "Case and deadline tracking",
        },
        detail: {
          es: "Monitorea movimientos, calcula vencimientos y avisa con anticipación al responsable de cada causa.",
          en: "Monitors filings, computes deadlines and alerts the lawyer responsible for each matter in advance.",
        },
      },
    ],
    stack: {
      es: [
        "Sistema de gestión de estudios",
        "Sistemas de consulta de expedientes",
        "Almacenamiento documental",
        "Correo y WhatsApp Business API",
        "Facturación y control de horas",
      ],
      en: [
        "Practice management software",
        "Court docket systems",
        "Document storage",
        "Email and WhatsApp Business API",
        "Billing and time tracking",
      ],
    },
    human: {
      es: [
        "Todo criterio y estrategia jurídica.",
        "Cualquier escrito que se presente, revisado y firmado.",
        "Asesoramiento al cliente sobre su caso.",
        "La decisión de tomar o rechazar un caso.",
      ],
      en: [
        "All legal judgement and strategy.",
        "Any filing, reviewed and signed.",
        "Advising the client on their matter.",
        "The decision to take or decline a case.",
      ],
    },
    start: {
      es: [
        "Medir cuántas horas no facturables se van en admisión y en perseguir documentación.",
        "Automatizar la recolección de documentación, que es puro seguimiento y no toca criterio.",
        "Sumar la admisión estructurada de consultas nuevas.",
        "La revisión documental de volumen va al final, y siempre con cita al documento fuente.",
      ],
      en: [
        "Measure how many non-billable hours go into intake and chasing documents.",
        "Automate document collection — pure follow-up, no judgement involved.",
        "Add structured intake for new enquiries.",
        "High-volume document review comes last, and always with source citations.",
      ],
    },
    notThis: {
      es: [
        "Si el estudio es chico y de casos únicos de alta complejidad, no hay volumen que automatizar y el proyecto no se paga.",
        "Ninguna salida de un sistema puede ir a un expediente sin revisión profesional. Si la propuesta de un proveedor sugiere lo contrario, esa es la señal para no seguir.",
        "Si la documentación del estudio vive en papel o en carpetas sin criterio, la digitalización va primero.",
      ],
      en: [
        "If the firm is small and handles unique, high-complexity matters, there's no volume to automate and the project doesn't pay for itself.",
        "No system output goes into a filing without professional review. If a vendor's proposal suggests otherwise, that's the signal to walk away.",
        "If the firm's documents live on paper or in folders without convention, digitization comes first.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Puede redactar escritos?",
          en: "Can it draft filings?",
        },
        answer: {
          es: "Puede producir borradores a partir de los modelos del estudio y del legajo, lo que ahorra tiempo real. Pero es un borrador: la revisión profesional no es opcional y el sistema está construido para que cada afirmación sea rastreable hasta el documento del que salió.",
          en: "It can produce drafts from the firm's own templates and the case file, which saves real time. But it's a draft: professional review isn't optional, and the system is built so every assertion traces back to the document it came from.",
        },
      },
      {
        question: {
          es: "¿Cómo se maneja la confidencialidad?",
          en: "How is confidentiality handled?",
        },
        answer: {
          es: "Todo corre en la infraestructura del estudio o en la nube que el estudio defina, con acceso acotado por causa y registro de cada consulta. No se usan datos para entrenar modelos y se trabaja con retención cero del lado del proveedor cuando el caso lo exige.",
          en: "Everything runs in the firm's infrastructure or the cloud the firm designates, with per-matter access scoping and a log of every query. Data is never used to train models, and we run zero-retention with the provider when the matter requires it.",
        },
      },
    ],
  },
]

/** Segmento de la ruta por idioma. */
const SEGMENT: Record<Lang, string> = { es: "soluciones", en: "solutions" }

export function solutionsIndexPath(lang: Lang): string {
  return lang === "es" ? `/${SEGMENT.es}/` : `/en/${SEGMENT.en}/`
}

export function solutionPath(lang: Lang, solution: Solution): string {
  return `${solutionsIndexPath(lang)}${solution.slug[lang]}/`
}

export function findSolution(lang: Lang, slug: string): Solution | undefined {
  return SOLUTIONS.find((solution) => solution.slug[lang] === slug)
}
