import { type Lang } from "@/i18n"
import {
  SOLUTIONS,
  solutionPath,
  type Item,
  type Localized,
  type LocalizedList,
  type Solution,
} from "@/data/solutions"

/**
 * Casos de uso: el segundo nivel de la capa programática.
 *
 * La página de sector responde «cómo se automatiza con IA en mi rubro». Es una
 * consulta de investigación. Pero el volumen comercial no está ahí: está un
 * escalón más abajo, en sector + tarea concreta —«agente de WhatsApp para
 * inmobiliarias», «corrección automática de exámenes con IA»—, que es lo que
 * escribe alguien que ya decidió que quiere resolver eso y está eligiendo a
 * quién le compra.
 *
 * De ahí que estas páginas tengan otra forma que las de sector. No explican el
 * rubro: explican una implementación. Los cuatro bloques que las diferencian de
 * una landing de agencia son `steps` (cómo funciona de punta a punta, sin
 * abstracciones), `measures` (qué número se mueve y cómo se lo mide),
 * `requires` (qué tiene que existir del lado del cliente antes de empezar) y
 * `notThis`. Los cuatro se pueden verificar; una landing genérica no puede
 * escribir ninguno.
 *
 * Sólo las industrias foco tienen casos de uso. Multiplicar sector × tarea en
 * los seis rubros da treinta y seis páginas que nadie puede escribir con
 * sustancia, y treinta y seis páginas flojas valen menos que ocho buenas: los
 * motores de respuesta no premian la cobertura, premian la página que puede ser
 * citada sin agregarle nada.
 */

export interface UseCase {
  /** Slug español de la solución a la que pertenece. */
  solution: string
  slug: Localized
  /** H1 de la página. */
  title: Localized
  /** Meta description, 140–160 caracteres. */
  description: Localized
  /** Respuesta corta y citable, 40–60 palabras. */
  answer: Localized
  /** Dos párrafos: el problema tal como se vive, no tal como se vende. */
  intro: LocalizedList
  /** Cómo funciona de punta a punta. */
  steps: Item[]
  /** Qué número se mueve y cómo se mide. */
  measures: LocalizedList
  /** Qué tiene que existir del lado del cliente antes de empezar. */
  requires: LocalizedList
  /** Cuándo no conviene. */
  notThis: LocalizedList
  faq: { question: Localized; answer: Localized }[]
}

export const USE_CASES: UseCase[] = [
  // ────────────────────────────────────────────────────────────────────────
  // Inmobiliarias
  // ────────────────────────────────────────────────────────────────────────
  {
    solution: "inmobiliarias",
    slug: {
      es: "agente-de-whatsapp",
      en: "whatsapp-agent",
      ar: "whatsapp-agent",
    },
    title: {
      es: "Agente de WhatsApp para inmobiliarias",
      en: "WhatsApp agent for real estate agencies",
      ar: "وكيل واتساب للشركات العقارية",
    },
    description: {
      es: "Cómo funciona un agente de IA en el WhatsApp de una inmobiliaria: responde en minutos, califica al interesado contra la cartera real y agenda la visita.",
      en: "How an AI agent works on a real estate agency's WhatsApp: replies in minutes, qualifies the lead against live inventory and books the viewing.",
      ar: "كيف يعمل وكيل ذكاء اصطناعي على واتساب شركة عقارية: يردّ خلال دقائق، ويصفّي المهتم مقابل المحفظة الفعلية، ويحجز المعاينة.",
    },
    answer: {
      es: "Un agente de WhatsApp para una inmobiliaria contesta cada consulta en menos de dos minutos, a cualquier hora, averigua presupuesto, zona, plazo y forma de pago, cruza eso contra la cartera viva del CRM y ofrece horario de visita sobre la agenda real del asesor. Negociación y cierre no los toca.",
      en: "A WhatsApp agent for a real estate agency answers every enquiry in under two minutes, at any hour, establishes budget, area, timeline and payment method, matches that against live CRM inventory and offers viewing times from the agent's real calendar. It never touches negotiation or closing.",
      ar: "وكيل واتساب لشركة عقارية يردّ على كل استفسار في أقل من دقيقتين وفي أي ساعة، ويحدّد الميزانية والمنطقة والمهلة وطريقة السداد، ويطابقها مع المحفظة الحيّة في نظام CRM، ويعرض مواعيد معاينة من مفكرة المستشار الحقيقية. ولا يقترب من التفاوض ولا الإغلاق.",
    },
    intro: {
      es: [
        "El WhatsApp de una inmobiliaria no es un canal de atención: es donde entra la mayor parte de las consultas, y entra a las once de la noche, el domingo y en el medio de una visita. El asesor contesta cuando puede, que suele ser varias horas después, y para entonces la persona ya escribió a otras tres.",
        "El problema no es la falta de ganas de contestar. Es que responder bien exige mirar la cartera, cruzar con lo que la persona pidió y abrir la agenda, y eso son tres pantallas que nadie abre desde el teléfono a las once de la noche. El agente hace exactamente esas tres cosas y deja al asesor el trabajo que sí requiere estar presente.",
      ],
      en: [
        "A real estate agency's WhatsApp isn't a support channel: it's where most enquiries land, and they land at eleven at night, on Sundays, and in the middle of a viewing. The agent replies when they can — usually several hours later — and by then the person has messaged three other agencies.",
        "The problem isn't unwillingness to reply. It's that replying well means checking inventory, matching it to what the person asked for and opening the calendar — three screens nobody opens from a phone at eleven at night. The agent does exactly those three things and leaves the human the work that actually requires being there.",
      ],
      ar: [
        "واتساب الشركة العقارية ليس قناة خدمة عملاء، بل هو المكان الذي يصل إليه معظم الاستفسارات، وتصل عند الحادية عشرة ليلًا، وفي عطلة نهاية الأسبوع، وفي منتصف معاينة. يردّ المستشار حين يستطيع، وغالبًا بعد ساعات، ويكون العميل حينها قد راسل ثلاث شركات أخرى.",
        "والمشكلة ليست في عدم الرغبة في الرد، بل في أن الرد الجيد يستلزم مراجعة المحفظة ومطابقتها بما طلبه العميل وفتح المفكرة، وهي ثلاث شاشات لا يفتحها أحد من هاتفه عند الحادية عشرة ليلًا. الوكيل يؤدّي هذه الثلاثة بالضبط، ويترك للإنسان العملَ الذي يتطلب حضوره فعلًا.",
      ],
    },
    steps: [
      {
        title: {
          es: "Entra el mensaje y se responde de inmediato",
          en: "The message arrives and gets an immediate reply",
          ar: "تصل الرسالة ويأتي الرد فورًا",
        },
        detail: {
          es: "Sobre WhatsApp Business API, declarando en el primer mensaje que es un asistente. Si la consulta viene del aviso de una propiedad, arranca sabiendo cuál.",
          en: "Over the WhatsApp Business API, stating in the first message that it's an assistant. If the enquiry comes from a listing ad, it starts knowing which property.",
          ar: "عبر واجهة واتساب للأعمال، مع الإعلان في الرسالة الأولى أنه مساعد آلي. وإن جاء الاستفسار من إعلان عقار، يبدأ وهو يعرف أي عقار.",
        },
      },
      {
        title: {
          es: "Califica en la conversación, no con un formulario",
          en: "Qualifies in conversation, not with a form",
          ar: "يصفّي داخل المحادثة لا عبر نموذج",
        },
        detail: {
          es: "Presupuesto, zona, plazo, forma de pago y si tiene algo que vender primero. Pregunta de a una y se adapta a lo que la persona ya dijo sin repetirlo.",
          en: "Budget, area, timeline, payment method and whether they have something to sell first. It asks one at a time and adapts to what the person already said instead of repeating it.",
          ar: "الميزانية والمنطقة والمهلة وطريقة السداد وهل لديه ما يبيعه أولًا. يسأل سؤالًا في كل مرة ويتكيّف مع ما قاله العميل دون تكراره.",
        },
      },
      {
        title: {
          es: "Cruza contra la cartera viva",
          en: "Matches against live inventory",
          ar: "يطابق مع المحفظة الحيّة",
        },
        detail: {
          es: "Consulta el CRM en el momento y ofrece dos o tres opciones que existen y están disponibles hoy. Nunca una propiedad reservada ni vendida.",
          en: "Queries the CRM in real time and offers two or three options that exist and are available today. Never a reserved or sold property.",
          ar: "يستعلم من نظام CRM لحظيًا ويعرض خيارين أو ثلاثة موجودة ومتاحة اليوم. ولا يعرض أبدًا عقارًا محجوزًا أو مباعًا.",
        },
      },
      {
        title: {
          es: "Agenda la visita o entrega el caso",
          en: "Books the viewing or hands the case over",
          ar: "يحجز المعاينة أو يسلّم الحالة",
        },
        detail: {
          es: "Propone horarios de la agenda real del asesor, confirma y recuerda. Si el interesado pide hablar con una persona, o hay negociación, el traspaso es inmediato y con el resumen de todo lo hablado.",
          en: "Proposes slots from the agent's real calendar, confirms and reminds. If the lead asks for a person, or negotiation starts, the handoff is immediate and carries a summary of everything discussed.",
          ar: "يقترح مواعيد من مفكرة المستشار الحقيقية ثم يؤكّد ويذكّر. وإن طلب المهتم التحدث إلى شخص، أو بدأ التفاوض، يتم التحويل فورًا ومعه ملخّص لكل ما دار.",
        },
      },
    ],
    measures: {
      es: [
        "Tiempo medio hasta la primera respuesta, por canal y por franja horaria.",
        "Porcentaje de consultas que terminan en visita agendada.",
        "Visitas a las que el interesado no se presenta.",
        "Consultas que el asesor tuvo que retomar porque el agente no alcanzó.",
      ],
      en: [
        "Median time to first response, by channel and time of day.",
        "Share of enquiries that end in a booked viewing.",
        "Viewings the lead doesn't show up to.",
        "Enquiries a human had to pick up because the agent fell short.",
      ],
      ar: [
        "الوسيط الزمني للرد الأول، بحسب القناة والفترة من اليوم.",
        "نسبة الاستفسارات التي تنتهي بمعاينة محجوزة.",
        "المعاينات التي لا يحضرها المهتم.",
        "الاستفسارات التي اضطر مستشار لاستلامها لأن الوكيل لم يكفِ.",
      ],
    },
    requires: {
      es: [
        "Una línea de WhatsApp Business API. La app de WhatsApp Business común no sirve para esto.",
        "El CRM con la cartera actualizada y con API o exportación automática.",
        "La agenda de cada asesor accesible, aunque sea sólo la disponibilidad.",
        "Una persona que reciba los traspasos en horario y sepa que van a llegar.",
      ],
      en: [
        "A WhatsApp Business API line. The regular WhatsApp Business app can't do this.",
        "The CRM with current inventory and an API or automatic export.",
        "Each agent's calendar accessible, even if only free/busy.",
        "A person who receives handoffs during business hours and knows they're coming.",
      ],
      ar: [
        "خط على واجهة واتساب للأعمال. تطبيق WhatsApp Business العادي لا يصلح لهذا.",
        "نظام CRM بمحفظة محدَّثة وبواجهة برمجية أو تصدير تلقائي.",
        "إتاحة مفكرة كل مستشار، ولو بحالة المتاح/المشغول فقط.",
        "شخص يستلم التحويلات ضمن ساعات العمل ويعلم أنها ستصل.",
      ],
    },
    notThis: {
      es: [
        "Si la cartera del CRM está desactualizada, el agente va a ofrecer propiedades vendidas y va a quemar consultas más rápido de lo que las recupera. Primero se ordena eso.",
        "Con menos de treinta consultas por mes el asesor contesta más rápido que cualquier sistema, y el proyecto no se paga.",
        "En operaciones premium con cartera de diez propiedades, el vínculo desde el primer mensaje es el producto. Automatizarlo resta.",
      ],
      en: [
        "If CRM inventory is stale, the agent will offer sold properties and burn enquiries faster than it recovers them. Fix that first.",
        "Under thirty enquiries a month, a human replies faster than any system and the project doesn't pay for itself.",
        "In premium operations with a ten-property portfolio, the relationship from the first message is the product. Automating it subtracts.",
      ],
      ar: [
        "إذا كانت المحفظة في نظام CRM غير محدَّثة، فسيعرض الوكيل عقارات مباعة ويحرق الاستفسارات أسرع مما يستعيدها. رتّب ذلك أولًا.",
        "بأقل من ثلاثين استفسارًا شهريًا، يردّ المستشار أسرع من أي نظام ولا يسدّد المشروع كلفته.",
        "في الصفقات الفاخرة بمحفظة من عشرة عقارات، تكون العلاقة منذ الرسالة الأولى هي المنتج. وأتمتتها تنتقص منه.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Se puede usar el número de WhatsApp que ya tenemos?",
          en: "Can we use the WhatsApp number we already have?",
          ar: "هل يمكن استخدام رقم واتساب الذي لدينا أصلًا؟",
        },
        answer: {
          es: "Sí, pero hay que migrarlo a WhatsApp Business API, y esa migración desconecta el número de la app. Si hoy tres asesores contestan desde ese número con el teléfono, el proyecto incluye moverlos a una bandeja compartida. Es el cambio operativo que más resistencia genera y conviene planificarlo desde el principio.",
          en: "Yes, but it has to migrate to the WhatsApp Business API, and that migration disconnects the number from the app. If three agents currently reply from that number on their phones, the project includes moving them to a shared inbox. It's the operational change that draws the most resistance and it's worth planning from day one.",
          ar: "نعم، لكن ينبغي ترحيله إلى واجهة واتساب للأعمال، وهذا الترحيل يفصل الرقم عن التطبيق. فإن كان ثلاثة مستشارين يردّون اليوم من ذلك الرقم عبر هواتفهم، فالمشروع يشمل نقلهم إلى صندوق وارد مشترك. وهو التغيير التشغيلي الأكثر إثارة للمقاومة، ويُستحسن التخطيط له من البداية.",
        },
      },
      {
        question: {
          es: "¿Qué pasa si el interesado pregunta algo que el agente no sabe?",
          en: "What if the lead asks something the agent doesn't know?",
          ar: "ماذا لو سأل المهتم عمّا لا يعرفه الوكيل؟",
        },
        answer: {
          es: "Lo dice y deriva. Un agente que inventa el año de construcción o los gastos de expensas genera un problema más caro que el que resuelve, así que está configurado para responder sólo con datos que estén en la ficha del CRM y escalar todo lo demás con el contexto de la conversación.",
          en: "It says so and escalates. An agent that invents the year of construction or the service charges creates a more expensive problem than it solves, so it's configured to answer only from data on the CRM record and route everything else with the conversation context attached.",
          ar: "يقولها ويحيل الأمر. فالوكيل الذي يختلق سنة البناء أو رسوم الخدمات يصنع مشكلة أغلى مما يحلّ، لذلك يُضبط ليجيب فقط من البيانات الواردة في بطاقة العقار داخل نظام CRM، ويصعّد ما عدا ذلك مع سياق المحادثة.",
        },
      },
      {
        question: {
          es: "¿Baja la conversión decir que es un asistente?",
          en: "Does saying it's an assistant hurt conversion?",
          ar: "هل يضرّ الإفصاح بأنه مساعد آلي بمعدل التحويل؟",
        },
        answer: {
          es: "No, en la medida que resuelva. Lo que baja la conversión es tardar cuatro horas, ofrecer una propiedad que ya se vendió o hacer diez preguntas antes de dar una sola respuesta útil. Además, en varias jurisdicciones declararlo es obligatorio, así que no es una decisión de marketing.",
          en: "Not as long as it resolves things. What hurts conversion is taking four hours, offering a property that's already sold, or asking ten questions before giving one useful answer. In several jurisdictions disclosure is also mandatory, so it isn't a marketing decision.",
          ar: "لا، ما دام يحلّ المسألة. الذي يضرّ التحويل هو التأخر أربع ساعات، أو عرض عقار مباع أصلًا، أو طرح عشرة أسئلة قبل إعطاء إجابة مفيدة واحدة. كما أن الإفصاح إلزامي في عدة ولايات قضائية، فهو ليس قرارًا تسويقيًا.",
        },
      },
    ],
  },

  {
    solution: "inmobiliarias",
    slug: {
      es: "calificacion-de-leads",
      en: "lead-qualification",
      ar: "lead-qualification",
    },
    title: {
      es: "Calificación automática de leads inmobiliarios con IA",
      en: "Automated real estate lead qualification with AI",
      ar: "تصفية العملاء المحتملين في العقارات آليًا بالذكاء الاصطناعي",
    },
    description: {
      es: "Cómo se califica automáticamente un lead inmobiliario: qué se pregunta, cómo se puntúa contra la cartera y qué se hace con el 70% que no compra ahora.",
      en: "How a real estate lead gets qualified automatically: what to ask, how to score against inventory, and what to do with the 70% who won't buy now.",
      ar: "كيف يُصفّى العميل المحتمل عقاريًا آليًا: ماذا نسأل، وكيف نمنح النقاط مقابل المحفظة، وماذا نفعل بنسبة 70% ممن لن يشتروا الآن.",
    },
    answer: {
      es: "Calificar un lead inmobiliario con IA es establecer cuatro cosas en conversación —presupuesto real, zona, plazo y forma de pago— y contrastarlas con la cartera disponible. El resultado no es un puntaje: es una decisión de ruteo. Al asesor le llega sólo lo que puede cerrar este mes; el resto entra a seguimiento automático.",
      en: "Qualifying a real estate lead with AI means establishing four things in conversation — real budget, area, timeline and payment method — and contrasting them with available inventory. The output isn't a score: it's a routing decision. The agent only receives what they can close this month; the rest goes into automated follow-up.",
      ar: "تصفية عميل عقاري محتمل بالذكاء الاصطناعي تعني تحديد أربعة أمور داخل المحادثة — الميزانية الحقيقية والمنطقة والمهلة وطريقة السداد — ومقارنتها بالمعروض المتاح. والنتيجة ليست درجة رقمية بل قرار توجيه: لا يصل المستشار إلا ما يمكنه إغلاقه هذا الشهر، وما تبقّى يدخل متابعة آلية.",
    },
    intro: {
      es: [
        "En una inmobiliaria con volumen, entre seis y ocho de cada diez consultas no van a comprar en los próximos meses. El problema es que averiguar cuáles son cuesta una conversación completa, y esa conversación la está teniendo la persona que debería estar mostrando propiedades.",
        "La consecuencia visible es un CRM lleno de contactos sin dato, con etiquetas que cada asesor puso a su criterio, sobre el cual no se puede tomar ninguna decisión. La calificación automática existe para que ese dato entre completo y con el mismo formato desde la primera conversación, no para reemplazar el criterio del asesor.",
      ],
      en: [
        "At a high-volume agency, six to eight of every ten enquiries won't buy in the coming months. The problem is that finding out which ones costs a full conversation — and that conversation is being had by the person who should be showing properties.",
        "The visible consequence is a CRM full of contacts with no data, tagged however each agent felt like tagging them, on which no decision can be based. Automated qualification exists so that data arrives complete and in the same shape from the first conversation, not to replace the agent's judgement.",
      ],
      ar: [
        "في شركة عقارية ذات حجم استفسارات كبير، ستة إلى ثمانية من كل عشرة استفسارات لن تُفضي إلى شراء في الأشهر القادمة. والمشكلة أن معرفة أيّها يكلّف محادثة كاملة، وهذه المحادثة يجريها الشخص الذي يُفترض أن يكون في المعاينات.",
        "والنتيجة الظاهرة نظام CRM مملوء بجهات اتصال بلا بيانات، بوسوم وضعها كل مستشار على هواه، ولا يمكن بناء أي قرار عليها. والتصفية الآلية موجودة كي تدخل هذه البيانات كاملة وبالشكل نفسه منذ المحادثة الأولى، لا لتحلّ محل خبرة المستشار.",
      ],
    },
    steps: [
      {
        title: {
          es: "Se unifican los canales de entrada",
          en: "Intake channels are unified",
          ar: "توحيد قنوات الاستقبال",
        },
        detail: {
          es: "Portales, formulario del sitio, WhatsApp, Instagram y llamadas perdidas caen en el mismo flujo con la misma ficha. Sin esto, cada canal califica distinto y los números no se pueden comparar.",
          en: "Portals, the site form, WhatsApp, Instagram and missed calls land in the same flow with the same record. Without this, each channel qualifies differently and the numbers can't be compared.",
          ar: "تصبّ البوابات العقارية ونموذج الموقع وواتساب وإنستغرام والمكالمات الفائتة في المسار نفسه وببطاقة موحّدة. من دون ذلك تختلف التصفية بين قناة وأخرى ويتعذّر مقارنة الأرقام.",
        },
      },
      {
        title: {
          es: "Se establecen los cuatro datos que deciden",
          en: "The four deciding facts get established",
          ar: "تحديد البيانات الأربعة الحاسمة",
        },
        detail: {
          es: "Presupuesto —y si es con crédito, en qué etapa está—, zona, plazo de mudanza y si necesita vender algo antes. Preguntados en el orden que la conversación permite, no en el orden del formulario.",
          en: "Budget — and if it's mortgage-backed, what stage it's at — area, moving timeline, and whether they need to sell something first. Asked in the order the conversation allows, not the order of the form.",
          ar: "الميزانية — وإن كانت بتمويل عقاري ففي أي مرحلة — والمنطقة وموعد الانتقال وهل يحتاج إلى بيع عقار أولًا. تُطرح بالترتيب الذي تسمح به المحادثة لا بترتيب النموذج.",
        },
      },
      {
        title: {
          es: "Se contrasta contra la cartera, no contra una tabla",
          en: "It's contrasted against inventory, not a table",
          ar: "المقارنة تتم مع المحفظة لا مع جدول",
        },
        detail: {
          es: "Un lead con presupuesto alto para una zona donde no hay stock vale menos que uno modesto para lo que sobra. La calificación mira lo que la inmobiliaria puede efectivamente vender hoy.",
          en: "A lead with a big budget for an area with no stock is worth less than a modest one for what's sitting unsold. Qualification looks at what the agency can actually sell today.",
          ar: "عميل بميزانية كبيرة في منطقة بلا معروض يساوي أقل من عميل بميزانية متواضعة لما يفيض في المخزون. التصفية تنظر إلى ما تستطيع الشركة بيعه اليوم فعلًا.",
        },
      },
      {
        title: {
          es: "Se rutea, y el resto no se descarta",
          en: "It's routed, and the rest isn't discarded",
          ar: "التوجيه، ولا يُهمل الباقي",
        },
        detail: {
          es: "Lo caliente va al asesor con el resumen. Lo tibio entra a una secuencia de seguimiento con avisos cuando aparece algo que encaja. Lo frío queda en la base con sus criterios guardados, que es donde vale.",
          en: "Hot goes to an agent with a summary. Warm enters a follow-up sequence with alerts when something matching appears. Cold stays in the database with its criteria stored — which is where its value is.",
          ar: "الساخن يذهب إلى مستشار مع الملخّص. والفاتر يدخل تسلسل متابعة مع تنبيهات حين يظهر ما يطابقه. والبارد يبقى في القاعدة بمعاييره المحفوظة، وهنا تكمن قيمته.",
        },
      },
    ],
    measures: {
      es: [
        "Porcentaje de leads con los cuatro datos completos, contra el histórico.",
        "Visitas agendadas por cada cien consultas entrantes.",
        "Horas de asesor dedicadas a leads que no calificaban.",
        "Operaciones que salieron de un lead calificado como tibio meses antes.",
      ],
      en: [
        "Share of leads with all four facts complete, against the baseline.",
        "Viewings booked per hundred incoming enquiries.",
        "Agent hours spent on leads that didn't qualify.",
        "Deals that came from a lead marked warm months earlier.",
      ],
      ar: [
        "نسبة العملاء المحتملين المكتملي البيانات الأربعة، مقارنةً بالخط الأساس.",
        "المعاينات المحجوزة لكل مئة استفسار وارد.",
        "ساعات المستشارين المصروفة على عملاء لم يجتازوا التصفية.",
        "الصفقات التي جاءت من عميل صُنّف فاترًا قبل أشهر.",
      ],
    },
    requires: {
      es: [
        "Un CRM único. Si cada asesor tiene su propia planilla, el proyecto empieza por ahí.",
        "Criterios de calificación escritos y acordados por el equipo comercial.",
        "Acceso a la cartera en tiempo real, con estado y precio actualizados.",
        "Definición de qué pasa con el lead tibio: sin secuencia de seguimiento, la calificación sólo sirve para descartar.",
      ],
      en: [
        "A single CRM. If each agent keeps their own spreadsheet, the project starts there.",
        "Qualification criteria written down and agreed by the sales team.",
        "Real-time inventory access, with status and price current.",
        "A defined path for warm leads: without a follow-up sequence, qualification only serves to discard.",
      ],
      ar: [
        "نظام CRM واحد. فإن كان لكل مستشار جدوله الخاص، فالمشروع يبدأ من هناك.",
        "معايير تصفية مكتوبة ومتفق عليها من الفريق التجاري.",
        "الوصول إلى المحفظة لحظيًا، بحالة وسعر محدَّثين.",
        "تحديد مصير العميل الفاتر: بلا تسلسل متابعة، لا تصلح التصفية إلا للاستبعاد.",
      ],
    },
    notThis: {
      es: [
        "Si el equipo comercial no está de acuerdo en qué es un lead bueno, ningún sistema lo va a resolver. La discusión es de negocio y va antes.",
        "Si la inmobiliaria vive de referidos y recibe pocas consultas frías, calificar automáticamente agrega fricción a relaciones que ya venían calificadas.",
        "Si nadie va a trabajar la cola de leads tibios, la calificación sólo va a producir un informe más que nadie mira.",
      ],
      en: [
        "If the sales team doesn't agree on what a good lead is, no system will settle it. That discussion is a business one and comes first.",
        "If the agency lives on referrals and gets few cold enquiries, automated qualification adds friction to relationships that arrived qualified.",
        "If nobody is going to work the warm-lead queue, qualification will only produce one more report nobody reads.",
      ],
      ar: [
        "إذا لم يتفق الفريق التجاري على ما هو العميل الجيد، فلن يحسم ذلك أي نظام. هذا نقاش تجاري ويأتي أولًا.",
        "إذا كانت الشركة تعيش على الإحالات وتتلقى استفسارات باردة قليلة، فالتصفية الآلية تضيف احتكاكًا إلى علاقات وصلت مُصفّاة أصلًا.",
        "إذا لم يعمل أحد على طابور العملاء الفاترين، فلن تنتج التصفية سوى تقرير إضافي لا يقرأه أحد.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿No molesta al interesado que le pregunten el presupuesto de entrada?",
          en: "Doesn't asking about budget up front annoy the lead?",
          ar: "ألا يزعج السؤالُ عن الميزانية مبكرًا العميلَ المهتم؟",
        },
        answer: {
          es: "Molesta si se pregunta primero y en seco. Funciona cuando se pregunta después de haber dado algo útil —una propiedad concreta, un dato del barrio— y en términos de rango, no de cifra exacta. En la práctica la mayoría lo contesta si entiende para qué sirve.",
          en: "It annoys people if it's the first thing asked, flat. It works when it's asked after giving something useful — a specific property, a fact about the neighbourhood — and framed as a range rather than an exact figure. In practice most people answer once they see what it's for.",
          ar: "يزعج إن كان أول ما يُسأل وبصيغة جافة. ويصلح حين يُطرح بعد تقديم شيء مفيد — عقار محدّد أو معلومة عن الحيّ — وبصيغة نطاق لا رقم دقيق. وعمليًا يجيب معظم الناس متى فهموا الغرض منه.",
        },
      },
      {
        question: {
          es: "¿El puntaje reemplaza el criterio del asesor?",
          en: "Does the score replace the agent's judgement?",
          ar: "هل تحلّ الدرجة محل خبرة المستشار؟",
        },
        answer: {
          es: "No, y no entregamos un puntaje suelto. Lo que llega al asesor son los cuatro datos con la frase textual del interesado que los respalda, para que pueda no estar de acuerdo. Un número del uno al diez sin evidencia es imposible de auditar y el equipo deja de confiar en él a la tercera semana.",
          en: "No, and we don't hand over a bare score. What reaches the agent is the four facts, each with the lead's own words backing it, so they can disagree. A one-to-ten number with no evidence can't be audited and the team stops trusting it by week three.",
          ar: "لا، ولا نسلّم درجة مجرّدة. ما يصل إلى المستشار هو البيانات الأربعة، ومع كل منها العبارة الحرفية للعميل التي تسندها، ليتمكّن من الاعتراض. فرقمٌ من واحد إلى عشرة بلا شواهد لا يمكن تدقيقه، ويكفّ الفريق عن الثقة به في الأسبوع الثالث.",
        },
      },
      {
        question: {
          es: "¿Cuánto tarda en verse el efecto?",
          en: "How long before the effect shows?",
          ar: "متى يظهر الأثر؟",
        },
        answer: {
          es: "El dato completo se ve en la primera semana: es el porcentaje de fichas con los cuatro campos. El efecto sobre operaciones cerradas tarda un ciclo de venta entero, que en la mayoría de los mercados son entre dos y cinco meses, y conviene decirlo antes de empezar para no medir demasiado pronto.",
          en: "Complete data shows in week one: it's the share of records with all four fields. The effect on closed deals takes a full sales cycle — two to five months in most markets — and it's worth saying so up front so nobody measures too early.",
          ar: "اكتمال البيانات يظهر في الأسبوع الأول: وهو نسبة البطاقات المستوفية للحقول الأربعة. أما الأثر في الصفقات المغلقة فيستغرق دورة بيع كاملة، أي شهرين إلى خمسة في معظم الأسواق، ويُستحسن قول ذلك مسبقًا كي لا يقيس أحدٌ مبكرًا أكثر من اللازم.",
        },
      },
    ],
  },

  {
    solution: "inmobiliarias",
    slug: {
      es: "coordinacion-de-visitas",
      en: "viewing-coordination",
      ar: "viewing-coordination",
    },
    title: {
      es: "Coordinación de visitas a propiedades con IA",
      en: "AI property viewing coordination",
      ar: "تنسيق معاينات العقارات بالذكاء الاصطناعي",
    },
    description: {
      es: "Cómo se automatiza la coordinación de visitas en una inmobiliaria: agenda real del asesor, disponibilidad del inmueble, confirmación y recordatorio, sin sobreturnos.",
      en: "How viewing coordination is automated at a real estate agency: the agent's real calendar, property availability, confirmation and reminders, without double-bookings.",
      ar: "كيف يُؤتمت تنسيق المعاينات في شركة عقارية: مفكرة المستشار الحقيقية، وتوافر العقار، والتأكيد والتذكير، دون حجوزات متضاربة.",
    },
    answer: {
      es: "Coordinar visitas con IA es cruzar tres calendarios que hoy nadie cruza: la agenda del asesor, la disponibilidad del inmueble —inquilino, portería, llaves— y el tiempo de traslado entre visitas. El agente propone horarios viables, confirma el día anterior y reofrece el hueco cuando alguien cancela.",
      en: "Coordinating viewings with AI means crossing three calendars nobody crosses today: the agent's schedule, the property's availability — tenant, concierge, keys — and travel time between viewings. The agent proposes workable slots, confirms the day before and re-offers the gap when someone cancels.",
      ar: "تنسيق المعاينات بالذكاء الاصطناعي هو تقاطع ثلاثة تقاويم لا يقاطعها أحد اليوم: مفكرة المستشار، وتوافر العقار — مستأجر أو حارس أو مفاتيح — وزمن التنقل بين المعاينات. يقترح الوكيل مواعيد قابلة للتنفيذ، ويؤكّد قبل يوم، ويعيد عرض الفراغ حين يلغي أحدهم.",
    },
    intro: {
      es: [
        "Agendar una visita parece trivial hasta que se cuenta cuántas condiciones tiene que cumplir: que el asesor esté libre, que el inquilino deje entrar, que las llaves no estén en la otra sucursal y que quede tiempo de llegar desde la visita anterior. Por eso se resuelve con seis mensajes y dos llamadas.",
        "El costo real no es el tiempo de coordinar: es la visita a la que el interesado no se presenta —entre el 20% y el 40% en la mayoría de las carteras— y el hueco de una hora en la agenda del asesor que ya no se llena con nadie.",
      ],
      en: [
        "Booking a viewing looks trivial until you count the conditions it has to satisfy: the agent free, the tenant willing to let people in, the keys not at the other branch, and enough time to get there from the previous viewing. That's why it takes six messages and two phone calls.",
        "The real cost isn't coordination time: it's the viewing the lead doesn't show up to — 20–40% in most portfolios — and the resulting hour-long hole in the agent's day that now gets filled by nobody.",
      ],
      ar: [
        "يبدو حجز معاينة أمرًا بسيطًا حتى تُحصى الشروط التي عليه استيفاؤها: أن يكون المستشار متفرغًا، وأن يسمح المستأجر بالدخول، وألّا تكون المفاتيح في الفرع الآخر، وأن يتبقّى وقت للوصول من المعاينة السابقة. ولهذا يستغرق ست رسائل ومكالمتين.",
        "والتكلفة الحقيقية ليست وقت التنسيق، بل المعاينة التي لا يحضرها المهتم — بين 20% و40% في معظم المحافظ — والفراغ الناتج بساعة كاملة في يوم المستشار لا يملؤه أحد بعد ذلك.",
      ],
    },
    steps: [
      {
        title: {
          es: "Se propone sobre disponibilidad real",
          en: "Slots are proposed from real availability",
          ar: "تُقترح المواعيد من توافر حقيقي",
        },
        detail: {
          es: "Dos o tres horarios concretos, no «¿cuándo te queda cómodo?». La pregunta abierta agrega un ida y vuelta que se puede evitar y baja la tasa de cierre.",
          en: 'Two or three concrete times, not "when suits you?". The open question adds an avoidable round trip and lowers the booking rate.',
          ar: "موعدان أو ثلاثة محدّدة، لا «متى يناسبك؟». فالسؤال المفتوح يضيف تبادلًا يمكن تفاديه ويخفض معدل الحجز.",
        },
      },
      {
        title: {
          es: "Se resuelven las condiciones del inmueble",
          en: "Property conditions get resolved",
          ar: "تُحلّ شروط العقار",
        },
        detail: {
          es: "Aviso al inquilino con la antelación pactada, coordinación con portería y control de dónde están las llaves. Es la parte que se olvida y la que hace fracasar la visita en la puerta.",
          en: "Notice to the tenant with the agreed lead time, coordination with the concierge, and a check on where the keys are. It's the part that gets forgotten and the one that kills the viewing at the door.",
          ar: "إشعار المستأجر بالمهلة المتفق عليها، والتنسيق مع الحارس، والتحقق من مكان المفاتيح. وهو الجزء الذي يُنسى، والذي يُفشل المعاينة عند الباب.",
        },
      },
      {
        title: {
          es: "Se confirma el día anterior",
          en: "Confirmation goes out the day before",
          ar: "التأكيد قبل يوم",
        },
        detail: {
          es: "Con dirección, cómo llegar y qué llevar. Si la respuesta es que no puede, reprograma en el mismo mensaje en vez de cancelar y perder al interesado.",
          en: "With the address, how to get there and what to bring. If the answer is they can't make it, it reschedules in the same message instead of cancelling and losing the lead.",
          ar: "مع العنوان وكيفية الوصول وما يلزم إحضاره. وإن جاء الجواب بعدم الاستطاعة، أعاد الجدولة في الرسالة نفسها بدل الإلغاء وفقدان المهتم.",
        },
      },
      {
        title: {
          es: "Se recupera el hueco de la cancelación",
          en: "The cancellation gap gets recovered",
          ar: "استعادة الفراغ الناتج عن الإلغاء",
        },
        detail: {
          es: "El horario liberado se ofrece a los interesados que pidieron esa propiedad o una parecida, por orden. Es el único paso que convierte una cancelación en una visita.",
          en: "The freed slot is offered, in order, to leads who asked about that property or a similar one. It's the only step that turns a cancellation into a viewing.",
          ar: "يُعرض الموعد المتحرّر بالترتيب على المهتمين الذين سألوا عن ذلك العقار أو ما يشبهه. وهي الخطوة الوحيدة التي تحوّل الإلغاء إلى معاينة.",
        },
      },
    ],
    measures: {
      es: [
        "Tasa de ausencia a visitas, antes y después.",
        "Mensajes necesarios para cerrar una visita, de punta a punta.",
        "Huecos por cancelación que se volvieron a llenar.",
        "Visitas fallidas por causa del inmueble: llaves, inquilino, acceso.",
      ],
      en: [
        "Viewing no-show rate, before and after.",
        "Messages needed to close a viewing, end to end.",
        "Cancellation gaps that got refilled.",
        "Failed viewings caused by the property: keys, tenant, access.",
      ],
      ar: [
        "نسبة عدم الحضور للمعاينات، قبل وبعد.",
        "عدد الرسائل اللازمة لإتمام حجز معاينة، من البداية إلى النهاية.",
        "فراغات الإلغاء التي أُعيد ملؤها.",
        "المعاينات الفاشلة بسبب العقار: المفاتيح أو المستأجر أو الوصول.",
      ],
    },
    requires: {
      es: [
        "La agenda de los asesores en un calendario compartido, aunque sólo se exponga la disponibilidad.",
        "En el CRM, quién autoriza el acceso a cada inmueble y con cuánta antelación.",
        "Una regla de tiempo mínimo entre visitas, acordada con el equipo.",
        "La lista de interesados por propiedad, para poder reofrecer los huecos.",
      ],
      en: [
        "Agent calendars in a shared system, even if only free/busy is exposed.",
        "In the CRM, who authorizes access to each property and with how much notice.",
        "A minimum-time-between-viewings rule, agreed with the team.",
        "The interested-lead list per property, so gaps can be re-offered.",
      ],
      ar: [
        "مفكرات المستشارين في تقويم مشترك، ولو بإظهار حالة المتاح/المشغول فقط.",
        "في نظام CRM: من يأذن بالدخول إلى كل عقار وبأي مهلة.",
        "قاعدة حدّ أدنى للوقت بين المعاينات، متفق عليها مع الفريق.",
        "قائمة المهتمين بكل عقار، لإتاحة إعادة عرض الفراغات.",
      ],
    },
    notThis: {
      es: [
        "Si los asesores no usan calendario, esto no se puede construir. Un agente que agenda sobre una agenda inventada genera sobreturnos y pierde la confianza del equipo en la primera semana.",
        "Si la mayoría de las visitas son a inmuebles vacíos con llave en la oficina, la coordinación ya es simple y el retorno está en otro lado.",
        "En carteras muy chicas donde el asesor sabe de memoria la disponibilidad de todo, el sistema agrega un paso sin quitar ninguno.",
      ],
      en: [
        "If agents don't use a calendar, this can't be built. An agent booking against an imaginary calendar creates double-bookings and loses the team's trust in week one.",
        "If most viewings are to empty properties with keys at the office, coordination is already simple and the return is elsewhere.",
        "In very small portfolios where the agent knows every property's availability by heart, the system adds a step without removing one.",
      ],
      ar: [
        "إذا لم يستخدم المستشارون تقويمًا، فلا يمكن بناء هذا. ووكيلٌ يحجز على مفكرة متخيَّلة يُنتج تضاربًا ويفقد ثقة الفريق في الأسبوع الأول.",
        "إذا كانت معظم المعاينات لعقارات فارغة ومفاتيحها في المكتب، فالتنسيق بسيط أصلًا والعائد في مكان آخر.",
        "في المحافظ الصغيرة جدًا حيث يحفظ المستشار توافر كل عقار عن ظهر قلب، يضيف النظام خطوة دون أن يحذف أخرى.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Puede reprogramar sin consultar al asesor?",
          en: "Can it reschedule without asking the agent?",
          ar: "هل يستطيع إعادة الجدولة دون مراجعة المستشار؟",
        },
        answer: {
          es: "Dentro de los límites que el asesor definió: horarios propios, tiempo mínimo entre visitas y zonas compatibles el mismo día. Fuera de eso pregunta. La regla es que el agente puede llenar el calendario pero no puede romperlo, y ese límite se prueba antes de salir a producción.",
          en: "Within the limits the agent set: their own hours, minimum time between viewings and areas that are compatible on the same day. Outside those, it asks. The rule is the agent can fill the calendar but can't break it, and that boundary is tested before going live.",
          ar: "ضمن الحدود التي وضعها المستشار: ساعاته الخاصة، والحد الأدنى للوقت بين المعاينات، والمناطق المتوافقة في اليوم نفسه. وخارج ذلك يسأل. والقاعدة أن الوكيل يستطيع ملء التقويم لا كسره، ويُختبر هذا الحدّ قبل الإطلاق.",
        },
      },
      {
        question: {
          es: "¿Cuánto baja la tasa de ausencias?",
          en: "How much does the no-show rate drop?",
          ar: "كم تنخفض نسبة عدم الحضور؟",
        },
        answer: {
          es: "Depende del punto de partida y del canal, así que no damos un número antes de medir el tuyo. Lo que sí es consistente es de dónde sale la mejora: de la confirmación del día anterior con posibilidad de reprogramar en el mismo mensaje, no del recordatorio a secas.",
          en: "It depends on your starting point and channel, so we don't quote a number before measuring yours. What is consistent is where the improvement comes from: the day-before confirmation with the option to reschedule in the same message, not the bare reminder.",
          ar: "يتوقف على نقطة انطلاقك وعلى القناة، لذلك لا نعطي رقمًا قبل قياس رقمك. لكن الثابت هو مصدر التحسّن: تأكيد اليوم السابق مع إمكانية إعادة الجدولة في الرسالة نفسها، لا التذكير المجرّد.",
        },
      },
      {
        question: {
          es: "¿Sirve para visitas a estrenar con muchos interesados a la vez?",
          en: "Does it work for new-build viewings with many leads at once?",
          ar: "هل يصلح لمعاينات المشاريع الجديدة بعدد كبير من المهتمين؟",
        },
        answer: {
          es: "Sí, y ahí el uso es distinto: en vez de agendar uno a uno, arma tandas por franja y controla el cupo. Es el caso donde más se nota, porque la alternativa manual es una planilla que dos personas editan al mismo tiempo.",
          en: "Yes, and the use is different there: instead of booking one by one, it forms batches per time slot and manages capacity. It's the case where the difference is most visible, because the manual alternative is a spreadsheet two people edit simultaneously.",
          ar: "نعم، والاستخدام هناك مختلف: بدل الحجز فردًا فردًا، يشكّل مجموعات لكل فترة زمنية ويضبط السعة. وهي الحالة التي يظهر فيها الفرق أوضح، لأن البديل اليدوي جدول بيانات يحرّره شخصان في آن واحد.",
        },
      },
    ],
  },

  {
    solution: "inmobiliarias",
    slug: {
      es: "reactivacion-de-base-de-datos",
      en: "database-reactivation",
      ar: "database-reactivation",
    },
    title: {
      es: "Reactivación de la base de datos de una inmobiliaria con IA",
      en: "Reactivating a real estate agency's database with AI",
      ar: "إعادة تنشيط قاعدة بيانات شركة عقارية بالذكاء الاصطناعي",
    },
    description: {
      es: "Cómo se reactiva con IA la base de interesados de una inmobiliaria: qué contacto vale la pena retomar, con qué excusa y sin quemar la base entera.",
      en: "How to reactivate a real estate agency's lead database with AI: which contacts are worth revisiting, with what pretext, and without burning the whole list.",
      ar: "كيف تُعاد تنشيط قاعدة المهتمين لدى شركة عقارية بالذكاء الاصطناعي: أي جهة اتصال تستحق العودة إليها، وبأي مبرر، ودون حرق القاعدة كلها.",
    },
    answer: {
      es: "Reactivar la base con IA no es mandar un mensaje masivo: es detectar qué contacto viejo pidió algo que hoy existe en la cartera y escribirle por eso. El disparador es la propiedad nueva, no el calendario. Lo que no tiene disparador concreto no se toca, porque quemar la base cuesta más que el negocio que se busca.",
      en: "Reactivating the database with AI isn't a mass send: it's detecting which old contact asked for something that now exists in inventory, and writing to them about that. The trigger is the new listing, not the calendar. Anything without a concrete trigger goes untouched, because burning the list costs more than the deal you're chasing.",
      ar: "إعادة تنشيط القاعدة بالذكاء الاصطناعي ليست إرسالًا جماعيًا، بل رصد جهة الاتصال القديمة التي طلبت شيئًا صار متاحًا اليوم في المحفظة والكتابة إليها بشأنه. المحفّز هو العقار الجديد لا التقويم. وما لا محفّز محدّد له لا يُمسّ، لأن حرق القاعدة أغلى من الصفقة المنشودة.",
    },
    intro: {
      es: [
        "Toda inmobiliaria con algunos años tiene miles de contactos que consultaron, visitaron y no compraron. Casi nadie los trabaja, porque hacerlo bien significa releer qué había pedido cada uno y cruzarlo contra la cartera de hoy, y eso es un trabajo que no cabe en la semana de nadie.",
        "Lo que se hace en cambio es el envío masivo: la misma promoción a los cuatro mil, dos veces por año. Rinde poco, molesta a los que sí eran clientes potenciales y entrena a la base a ignorar los mensajes de la inmobiliaria. La reactivación seria funciona al revés: pocos mensajes, cada uno con un motivo verificable.",
      ],
      en: [
        "Any agency with a few years behind it has thousands of contacts who enquired, viewed and didn't buy. Almost nobody works them, because doing it properly means rereading what each one asked for and matching it against today's inventory — work that doesn't fit in anyone's week.",
        "What happens instead is the mass send: the same promotion to all four thousand, twice a year. It converts poorly, irritates the people who were genuine prospects and trains the list to ignore the agency's messages. Serious reactivation works the other way round: few messages, each with a verifiable reason.",
      ],
      ar: [
        "أي شركة عقارية مضى عليها بضع سنوات لديها آلاف جهات الاتصال ممن استفسروا وعاينوا ولم يشتروا. ولا يكاد أحد يعمل عليهم، لأن العمل الصحيح يعني إعادة قراءة ما طلبه كل واحد ومطابقته مع محفظة اليوم، وهو عمل لا يتّسع له أسبوع أحد.",
        "وما يحدث بدلًا من ذلك هو الإرسال الجماعي: العرض نفسه إلى الأربعة آلاف، مرتين في السنة. عائده ضعيف، ويضايق من كانوا عملاء محتملين فعلًا، ويدرّب القاعدة على تجاهل رسائل الشركة. أما إعادة التنشيط الجادة فتعمل بالعكس: رسائل قليلة، لكل واحدة سبب يمكن التحقق منه.",
      ],
    },
    steps: [
      {
        title: {
          es: "Se reconstruye qué pidió cada contacto",
          en: "What each contact asked for is reconstructed",
          ar: "إعادة بناء ما طلبه كل جهة اتصال",
        },
        detail: {
          es: "A partir de conversaciones viejas, notas del asesor y propiedades que visitó. La mayoría de las fichas no tienen los criterios en un campo; están escritos en el hilo de WhatsApp.",
          en: "From old conversations, agent notes and properties they viewed. Most records don't have the criteria in a field; they're written in the WhatsApp thread.",
          ar: "من المحادثات القديمة وملاحظات المستشار والعقارات التي عاينها. فمعظم البطاقات لا تحمل المعايير في حقل مخصّص، بل هي مكتوبة داخل محادثة واتساب.",
        },
      },
      {
        title: {
          es: "Se descarta lo que no corresponde tocar",
          en: "What shouldn't be touched is discarded",
          ar: "استبعاد ما لا يجوز المساس به",
        },
        detail: {
          es: "Quien ya compró, quien pidió no ser contactado, quien está trabajando con un asesor del equipo y quien tiene un reclamo abierto. Este filtro va primero, no al final.",
          en: "Anyone who already bought, asked not to be contacted, is working with a team member, or has an open complaint. This filter comes first, not last.",
          ar: "من اشترى فعلًا، ومن طلب عدم التواصل، ومن يعمل مع أحد أعضاء الفريق، ومن لديه شكوى مفتوحة. هذا المرشّح يأتي أولًا لا أخيرًا.",
        },
      },
      {
        title: {
          es: "El disparador es una propiedad concreta",
          en: "The trigger is a specific property",
          ar: "المحفّز عقار محدّد",
        },
        detail: {
          es: "Cuando entra a la cartera algo que encaja con lo que ese contacto pidió, se le escribe con esa propiedad y recordando qué había buscado. Sin coincidencia, no hay mensaje.",
          en: "When something matching what that contact asked for enters inventory, they get a message about that property, recalling what they were looking for. No match, no message.",
          ar: "حين يدخل المحفظةَ عقارٌ يطابق ما طلبه ذلك الشخص، تصله رسالة عن ذلك العقار مع تذكيره بما كان يبحث عنه. وبلا تطابق، لا رسالة.",
        },
      },
      {
        title: {
          es: "Se vuelve al flujo normal",
          en: "It returns to the normal flow",
          ar: "العودة إلى المسار المعتاد",
        },
        detail: {
          es: "Si contesta, entra a calificación y coordinación de visita como cualquier consulta nueva. Si no contesta dos veces seguidas, el contacto se enfría y no recibe nada por un período largo.",
          en: "If they reply, they enter qualification and viewing coordination like any new enquiry. If they don't reply twice running, the contact cools off and receives nothing for a long stretch.",
          ar: "إن ردّ، دخل التصفية وتنسيق المعاينة كأي استفسار جديد. وإن لم يردّ مرتين متتاليتين، بَرُدَت جهة الاتصال ولم تتلقَّ شيئًا لفترة طويلة.",
        },
      },
    ],
    measures: {
      es: [
        "Contactos con criterios reconstruidos, sobre el total de la base.",
        "Tasa de respuesta del mensaje con disparador, contra el envío masivo anterior.",
        "Visitas y operaciones originadas en la base histórica.",
        "Bajas y pedidos de no contacto, que es el indicador de que se está quemando.",
      ],
      en: [
        "Contacts with reconstructed criteria, over the total list.",
        "Reply rate of the triggered message, against the previous mass send.",
        "Viewings and deals originating in the historical database.",
        "Opt-outs and do-not-contact requests — the signal that the list is being burned.",
      ],
      ar: [
        "جهات الاتصال التي أُعيد بناء معاييرها، من إجمالي القاعدة.",
        "معدل الرد على الرسالة المحفَّزة، مقارنةً بالإرسال الجماعي السابق.",
        "المعاينات والصفقات التي نشأت من القاعدة التاريخية.",
        "طلبات إلغاء الاشتراك وعدم التواصل، وهي مؤشّر أن القاعدة تُحرَق.",
      ],
    },
    requires: {
      es: [
        "Acceso al histórico: conversaciones, notas y registro de visitas, no sólo la ficha del contacto.",
        "Base legal para contactar, con el consentimiento registrado y una salida clara en cada mensaje.",
        "Cartera en tiempo real, para que el disparador sea cierto.",
        "Capacidad del equipo para atender las respuestas. Reactivar y no contestar es peor que no reactivar.",
      ],
      en: [
        "Access to the history: conversations, notes and viewing records, not just the contact card.",
        "A legal basis to contact, with consent on record and a clear opt-out in every message.",
        "Real-time inventory, so the trigger is actually true.",
        "Team capacity to handle replies. Reactivating and not answering is worse than not reactivating.",
      ],
      ar: [
        "الوصول إلى السجل التاريخي: المحادثات والملاحظات وسجلّ المعاينات، لا بطاقة جهة الاتصال وحدها.",
        "أساس قانوني للتواصل، بموافقة مسجَّلة وخيار إلغاء واضح في كل رسالة.",
        "محفظة لحظية، ليكون المحفّز صحيحًا فعلًا.",
        "قدرة الفريق على استقبال الردود. فإعادة التنشيط دون رد أسوأ من عدم التنشيط.",
      ],
    },
    notThis: {
      es: [
        "Si el histórico son fichas con nombre y teléfono y nada más, no hay con qué reconstruir criterios y el proyecto se convierte en un envío masivo con otro nombre.",
        "Si no hay consentimiento registrado, esto no se hace. El riesgo regulatorio supera cualquier operación que salga.",
        "Si el equipo ya no da abasto con las consultas nuevas, sumar volumen desde la base empeora el tiempo de respuesta que se estaba tratando de mejorar.",
      ],
      en: [
        "If the history is records with a name and a phone number and nothing else, there's nothing to reconstruct criteria from and the project becomes a mass send under another name.",
        "If there's no consent on record, this doesn't happen. The regulatory risk outweighs any deal that comes out of it.",
        "If the team is already underwater with new enquiries, adding volume from the database worsens the very response time you were trying to improve.",
      ],
      ar: [
        "إذا كان السجل بطاقات باسم ورقم هاتف ولا شيء غير ذلك، فلا مادة لإعادة بناء المعايير، ويتحول المشروع إلى إرسال جماعي باسم آخر.",
        "إذا لم تكن الموافقة مسجَّلة، فلا يُنفَّذ هذا. المخاطرة التنظيمية تفوق أي صفقة قد تنتج عنه.",
        "إذا كان الفريق عاجزًا أصلًا عن استيعاب الاستفسارات الجديدة، فإضافة حجم من القاعدة تزيد سوء زمن الاستجابة الذي كنت تحاول تحسينه.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Cuántos mensajes se mandan por contacto?",
          en: "How many messages go out per contact?",
          ar: "كم رسالة تُرسَل لكل جهة اتصال؟",
        },
        answer: {
          es: "Uno por disparador real, con un tope mensual bajo por persona, y freno total después de dos silencios seguidos. La base de una inmobiliaria es un activo que se puede gastar una sola vez: la regla de diseño es que cada mensaje tiene que justificar su propio envío ante el que lo recibe.",
          en: "One per real trigger, with a low monthly cap per person, and a full stop after two consecutive silences. An agency's list is an asset you can only spend once: the design rule is that each message has to justify its own existence to the person receiving it.",
          ar: "رسالة واحدة لكل محفّز حقيقي، بسقف شهري منخفض لكل شخص، ووقف كامل بعد صمتين متتاليين. قاعدة الشركة أصلٌ لا يُنفَق إلا مرة واحدة: وقاعدة التصميم أن على كل رسالة أن تبرّر إرسالها أمام من يتلقّاها.",
        },
      },
      {
        question: {
          es: "¿Un contacto de hace tres años sigue sirviendo?",
          en: "Is a three-year-old contact still useful?",
          ar: "هل ما تزال جهة اتصال عمرها ثلاث سنوات مفيدة؟",
        },
        answer: {
          es: "Depende de qué buscaba. Quien buscaba para mudarse ya se mudó, pero quien buscaba para invertir sigue invirtiendo, y quien no compró porque no encontró la zona sigue queriendo esa zona. Esa distinción se puede hacer con el histórico y es la que separa una reactivación útil de un envío molesto.",
          en: "It depends what they were after. Someone looking to move has moved by now, but someone looking to invest is still investing, and someone who didn't buy because they couldn't find the right area still wants that area. That distinction can be drawn from the history, and it's what separates useful reactivation from an annoying blast.",
          ar: "يتوقف على ما كان يبحث عنه. من كان يبحث لينتقل فقد انتقل، أما من كان يبحث للاستثمار فما زال يستثمر، ومن لم يشترِ لأنه لم يجد المنطقة المناسبة ما زال يريد تلك المنطقة. وهذا التمييز يمكن استخلاصه من السجل، وهو ما يفصل إعادة تنشيط مفيدة عن إرسال مزعج.",
        },
      },
      {
        question: {
          es: "¿Se puede hacer sin cambiar el CRM?",
          en: "Can it be done without changing the CRM?",
          ar: "هل يمكن تنفيذه دون تغيير نظام CRM؟",
        },
        answer: {
          es: "Casi siempre sí. La reconstrucción de criterios se hace sobre una copia del histórico y el resultado vuelve al CRM como campos nuevos o como etiquetas. Cambiar de CRM en el medio de un proyecto de reactivación duplica el riesgo y no mejora el resultado.",
          en: "Almost always. Criteria reconstruction runs on a copy of the history and the result goes back into the CRM as new fields or tags. Changing CRM in the middle of a reactivation project doubles the risk and doesn't improve the outcome.",
          ar: "في الغالب نعم. تجري إعادة بناء المعايير على نسخة من السجل، وتعود النتيجة إلى نظام CRM كحقول جديدة أو كوسوم. أما تغيير النظام في منتصف مشروع إعادة تنشيط فيضاعف المخاطرة ولا يحسّن النتيجة.",
        },
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // EdTech y plataformas educativas
  // ────────────────────────────────────────────────────────────────────────
  {
    solution: "edtech-y-plataformas-educativas",
    slug: { es: "tutor-de-ia", en: "ai-tutor", ar: "ai-tutor" },
    title: {
      es: "Tutor de IA sobre el contenido de tu propia plataforma",
      en: "An AI tutor over your own platform's content",
      ar: "مرشد ذكي يعمل على محتوى منصتك أنت",
    },
    description: {
      es: "Cómo se construye un tutor de IA que responde con el material del curso, cita la fuente, dice cuando algo no está y no resuelve la entrega evaluada.",
      en: "How to build an AI tutor that answers from the course material, cites the source, admits when something isn't there and won't do the graded assignment.",
      ar: "كيف يُبنى مرشد ذكي يجيب من مادة المقرر، ويحيل إلى المصدر، ويعترف حين لا يكون الأمر واردًا، ولا يحلّ التكليف المُقيَّم.",
    },
    answer: {
      es: "Un tutor de IA útil no es un chat general con el nombre del curso: es un sistema que recupera pasajes del material propio, responde citando el módulo y el minuto, dice «esto no está en la unidad» cuando no está, y frente a una entrega evaluada guía hasta el paso anterior sin resolverla.",
      en: "A useful AI tutor isn't a general chat with the course's name on it: it's a system that retrieves passages from your own material, answers citing the module and the timestamp, says \"that isn't in this unit\" when it isn't, and when facing a graded assignment guides to the step before without solving it.",
      ar: "المرشد الذكي المفيد ليس محادثة عامة تحمل اسم المقرر، بل نظام يسترجع مقاطع من مادتك الخاصة، ويجيب محيلًا إلى الوحدة وإلى الدقيقة، ويقول «هذا غير وارد في الوحدة» حين لا يكون واردًا، وأمام تكليف مُقيَّم يرشد حتى الخطوة السابقة دون أن يحلّه.",
    },
    intro: {
      es: [
        "La versión que casi todas las plataformas construyen primero es un modelo general con un mensaje de sistema que dice «sos un tutor de este curso». Funciona en la demo y falla en la clase, porque el alumno pregunta por la notación que usa ese profesor, por el ejemplo de la unidad tres, por el criterio de la rúbrica. Nada de eso está en el modelo.",
        "La versión que sí sirve empieza por el contenido: transcribir el video, partir el material en pasajes con su referencia, y construir la recuperación antes que la conversación. El tutor es la última capa, no la primera, y es la más barata de las dos.",
      ],
      en: [
        'The version almost every platform builds first is a general model with a system prompt saying "you are a tutor for this course". It works in the demo and fails in class, because the student asks about the notation that instructor uses, the example in unit three, the rubric criterion. None of that is in the model.',
        "The version that actually works starts with the content: transcribe the video, split the material into passages with their references, and build retrieval before conversation. The tutor is the last layer, not the first — and the cheaper of the two.",
      ],
      ar: [
        "النسخة التي تبنيها أغلب المنصات أولًا هي نموذج عام مع تعليمة نظام تقول «أنت مرشد لهذا المقرر». تعمل في العرض التوضيحي وتفشل في الصف، لأن المتعلّم يسأل عن الترميز الذي يستعمله ذلك المدرّس، وعن مثال الوحدة الثالثة، وعن معيار سلّم التقييم. ولا شيء من ذلك موجود في النموذج.",
        "أما النسخة التي تنفع فتبدأ من المحتوى: تفريغ الفيديو نصًا، وتقسيم المادة إلى مقاطع مع مراجعها، وبناء الاسترجاع قبل المحادثة. المرشد هو الطبقة الأخيرة لا الأولى، وهو الأرخص بين الاثنتين.",
      ],
    },
    steps: [
      {
        title: {
          es: "Se prepara el contenido",
          en: "The content gets prepared",
          ar: "تجهيز المحتوى",
        },
        detail: {
          es: "Transcripción de video con marca de tiempo, partición del material en pasajes y metadatos de curso, unidad y objetivo de aprendizaje. Es la mitad del trabajo del proyecto.",
          en: "Timestamped video transcription, splitting material into passages, and metadata for course, unit and learning objective. This is half the project's work.",
          ar: "تفريغ الفيديو نصًا مع طوابع زمنية، وتقسيم المادة إلى مقاطع، وبيانات وصفية للمقرر والوحدة وهدف التعلّم. وهذا نصف عمل المشروع.",
        },
      },
      {
        title: {
          es: "La recuperación se acota al alcance del alumno",
          en: "Retrieval is scoped to the student",
          ar: "حصر الاسترجاع في نطاق المتعلّم",
        },
        detail: {
          es: "Sólo los cursos en los que está inscripto y las unidades que ya abrió. Un tutor que responde con material de la unidad siete arruina la secuencia pedagógica del curso.",
          en: "Only the courses they're enrolled in and the units they've already unlocked. A tutor that answers with unit seven's material wrecks the course's pedagogical sequence.",
          ar: "فقط المقررات المسجَّل فيها والوحدات التي فتحها بالفعل. فمرشدٌ يجيب من مادة الوحدة السابعة يفسد التسلسل التربوي للمقرر.",
        },
      },
      {
        title: {
          es: "La respuesta se ata a la cita",
          en: "The answer is tied to a citation",
          ar: "ربط الإجابة بالإحالة",
        },
        detail: {
          es: "Cada afirmación viene con el pasaje que la respalda y un enlace al minuto del video o a la página. Si no hay pasaje, no hay afirmación: el tutor dice que no está en el material.",
          en: "Every claim comes with the passage supporting it and a link to the video timestamp or the page. No passage, no claim: the tutor says it isn't in the material.",
          ar: "كل عبارة مصحوبة بالمقطع الذي يسندها ورابط إلى دقيقة الفيديو أو إلى الصفحة. وبلا مقطع لا عبارة: يقول المرشد إن الأمر غير وارد في المادة.",
        },
      },
      {
        title: {
          es: "Se define el límite frente a la evaluación",
          en: "The assessment boundary gets defined",
          ar: "تحديد الحدّ عند التقييم",
        },
        detail: {
          es: "El tutor reconoce cuándo la pregunta es literalmente la consigna evaluada y cambia de modo: explica el concepto, propone un ejercicio análogo, no entrega la respuesta. Esa frontera se prueba con los enunciados reales del curso.",
          en: "The tutor recognizes when a question is literally the graded prompt and switches mode: it explains the concept, offers an analogous exercise, and withholds the answer. That boundary is tested against the course's real assignment texts.",
          ar: "يميّز المرشد متى يكون السؤال هو نصّ التكليف المُقيَّم حرفيًا فيبدّل وضعه: يشرح المفهوم، ويقترح تمرينًا مماثلًا، ولا يعطي الإجابة. ويُختبر هذا الحدّ على نصوص التكاليف الحقيقية للمقرر.",
        },
      },
    ],
    measures: {
      es: [
        "Porcentaje de respuestas con cita verificable al material.",
        "Tasa de abstención correcta: preguntas fuera del material que el tutor rechaza en vez de contestar.",
        "Consultas al foro o al docente que dejaron de hacerse, y cuáles siguen.",
        "Costo de modelo por alumno activo por mes.",
      ],
      en: [
        "Share of answers with a verifiable citation to the material.",
        "Correct-abstention rate: out-of-material questions the tutor declines instead of answering.",
        "Forum or instructor questions that stopped being asked — and which ones remain.",
        "Model cost per active student per month.",
      ],
      ar: [
        "نسبة الإجابات المصحوبة بإحالة قابلة للتحقق إلى المادة.",
        "معدل الامتناع الصحيح: الأسئلة الخارجة عن المادة التي يرفض المرشد الإجابة عنها.",
        "أسئلة المنتدى أو المدرّس التي توقّفت، وأيّها ما زال قائمًا.",
        "تكلفة النموذج لكل متعلّم نشط شهريًا.",
      ],
    },
    requires: {
      es: [
        "El contenido accesible por API o exportable, y el video con transcripción o presupuesto para transcribirlo.",
        "Saber, por alumno, qué cursos y unidades tiene habilitados.",
        "Los enunciados de las evaluaciones, para poder definir el límite.",
        "Un techo de costo por alumno definido por producto antes de construir.",
      ],
      en: [
        "Content accessible via API or exportable, and video with transcripts or a budget to produce them.",
        "Knowing, per student, which courses and units are unlocked.",
        "The assignment texts, so the boundary can be defined.",
        "A per-student cost ceiling set by product before building.",
      ],
      ar: [
        "محتوى متاح عبر واجهة برمجية أو قابل للتصدير، وفيديو مفرَّغ نصًا أو ميزانية لتفريغه.",
        "معرفة المقررات والوحدات المتاحة لكل متعلّم.",
        "نصوص التكاليف والاختبارات، ليتسنّى تحديد الحدّ.",
        "سقف تكلفة لكل متعلّم يحدّده فريق المنتج قبل البناء.",
      ],
    },
    notThis: {
      es: [
        "Si el contenido es mayormente video sin transcribir y no hay presupuesto para transcribirlo, el tutor va a responder sobre la fracción escrita y el alumno lo va a notar en el primer día.",
        "Si el curso enseña criterio y no información —diseño, escritura, negociación—, el valor de recuperar pasajes es bajo y el proyecto se parece más a corrección asistida que a tutoría.",
        "Si el plan del alumno cuesta menos por mes que el costo de modelo estimado, no hay producto. Ese cálculo va antes del prototipo, no después.",
      ],
      en: [
        "If the content is mostly untranscribed video with no budget to transcribe it, the tutor will answer from the written fraction and the student will notice on day one.",
        "If the course teaches judgement rather than information — design, writing, negotiation — the value of retrieving passages is low and the project looks more like assisted grading than tutoring.",
        "If the student's plan costs less per month than the estimated model cost, there's no product. That calculation comes before the prototype, not after.",
      ],
      ar: [
        "إذا كان المحتوى في معظمه فيديو غير مفرَّغ ولا ميزانية لتفريغه، فسيجيب المرشد من الجزء المكتوب وحده، وسيلاحظ المتعلّم ذلك من اليوم الأول.",
        "إذا كان المقرر يعلّم الاجتهاد لا المعلومة — تصميم أو كتابة أو تفاوض — فقيمة استرجاع المقاطع منخفضة، ويصبح المشروع أقرب إلى التصحيح المُعان منه إلى الإرشاد.",
        "إذا كان اشتراك المتعلّم يكلّف شهريًا أقل من التكلفة المقدَّرة للنموذج، فلا يوجد منتج. وهذا الحساب يسبق النموذج الأولي لا يتبعه.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿No se convierte en una forma de hacer trampa?",
          en: "Doesn't it just become a way to cheat?",
          ar: "ألا يتحوّل إلى وسيلة للغش؟",
        },
        answer: {
          es: "Se convierte si se construye sin el límite. Con el límite definido y probado contra los enunciados reales, el tutor explica el concepto y propone un ejercicio análogo en vez de resolver la consigna. Además queda registro de la conversación, que es más de lo que hay hoy cuando el alumno usa un modelo general por su cuenta.",
          en: "It does if it's built without the boundary. With the boundary defined and tested against the real assignment texts, the tutor explains the concept and offers an analogous exercise instead of solving the prompt. It also leaves a conversation log, which is more than exists today when the student uses a general model on their own.",
          ar: "يتحوّل إن بُني بلا الحدّ. أما مع حدٍّ محدَّد ومختبَر على نصوص التكاليف الحقيقية، فيشرح المرشد المفهوم ويقترح تمرينًا مماثلًا بدل حلّ التكليف. كما يبقى سجلّ للمحادثة، وهو أكثر مما هو متاح اليوم حين يستخدم المتعلّم نموذجًا عامًا بنفسه.",
        },
      },
      {
        question: {
          es: "¿Qué pasa cuando el material del curso está desactualizado o tiene un error?",
          en: "What happens when the course material is outdated or has an error?",
          ar: "ماذا يحدث حين تكون مادة المقرر قديمة أو فيها خطأ؟",
        },
        answer: {
          es: "El tutor lo repite, porque responde con la fuente. Eso suena a defecto y es una función: la cita hace visible el error y lo vuelve corregible, mientras que un modelo que responde de memoria lo tapa con una respuesta correcta que contradice al material sin que nadie se entere.",
          en: "The tutor repeats it, because it answers from the source. That sounds like a defect and is a feature: the citation makes the error visible and therefore fixable, whereas a model answering from memory papers over it with a correct answer that contradicts the material without anyone noticing.",
          ar: "يكرّره المرشد، لأنه يجيب من المصدر. يبدو ذلك عيبًا وهو ميزة: فالإحالة تُظهر الخطأ وتجعله قابلًا للتصحيح، بينما النموذج المجيب من ذاكرته يغطّيه بإجابة صحيحة تناقض المادة دون أن ينتبه أحد.",
        },
      },
      {
        question: {
          es: "¿Se puede lanzar a toda la base de una?",
          en: "Can it launch to the whole user base at once?",
          ar: "هل يمكن إطلاقه لكامل قاعدة المستخدمين دفعة واحدة؟",
        },
        answer: {
          es: "Se puede, pero conviene no hacerlo. El costo por alumno se comporta distinto con tráfico real que en la estimación, y el patrón de preguntas de un curso no se parece al de otro. Un curso primero, con techo de gasto y medición de abstención correcta, ordena la decisión mucho mejor que un lanzamiento general.",
          en: "You can, but it's better not to. Cost per student behaves differently under real traffic than in the estimate, and one course's question pattern doesn't resemble another's. One course first, with a spend ceiling and correct-abstention measurement, informs the decision far better than a general launch.",
          ar: "يمكن، لكن الأفضل ألّا تفعل. فتكلفة كل متعلّم تسلك سلوكًا مختلفًا تحت الاستخدام الحقيقي عمّا في التقدير، ونمط أسئلة مقرر لا يشبه نمط آخر. مقرر واحد أولًا، بسقف إنفاق وقياس للامتناع الصحيح، ينير القرار أكثر بكثير من إطلاق عام.",
        },
      },
    ],
  },

  {
    solution: "edtech-y-plataformas-educativas",
    slug: {
      es: "correccion-asistida",
      en: "assisted-grading",
      ar: "assisted-grading",
    },
    title: {
      es: "Corrección asistida por IA con rúbrica",
      en: "Rubric-based AI assisted grading",
      ar: "التصحيح المُعان بالذكاء الاصطناعي وفق سلّم تقييم",
    },
    description: {
      es: "Cómo se implementa la corrección asistida por IA en una plataforma educativa: borrador de nota por criterio, evidencia citada del alumno y firma del docente.",
      en: "How to implement AI assisted grading in a learning platform: a draft grade per criterion, evidence quoted from the student, and the teacher's signature.",
      ar: "كيف يُنفَّذ التصحيح المُعان بالذكاء الاصطناعي في منصة تعليمية: مسودة درجة لكل معيار، وشواهد مقتبسة من المتعلّم، وتوقيع المعلّم.",
    },
    answer: {
      es: "La corrección asistida por IA produce un borrador: nota tentativa por criterio de la rúbrica y devolución con la cita textual del trabajo que la justifica. El docente revisa, ajusta y firma. La nota que llega al legajo es siempre la del docente, y el sistema registra cuánto tuvo que corregirla.",
      en: "AI assisted grading produces a draft: a tentative grade per rubric criterion and feedback quoting the passage of the work that justifies it. The teacher reviews, adjusts and signs. The grade that reaches the record is always the teacher's, and the system logs how much they had to change it.",
      ar: "ينتج التصحيح المُعان مسودةً: درجة مبدئية لكل معيار في سلّم التقييم، وتغذية راجعة تقتبس من نص العمل ما يبرّرها. ثم يراجع المعلّم ويعدّل ويوقّع. والدرجة التي تصل إلى السجل هي درجة المعلّم دائمًا، ويسجّل النظام مقدار ما اضطر إلى تعديله.",
    },
    intro: {
      es: [
        "Corregir es donde se va el tiempo del docente y también donde se pierde la calidad: la devolución de la entrega número cuarenta no se parece a la de la número tres, y el alumno que entregó último recibe menos. Es un problema de fatiga, no de criterio.",
        "El error de implementación más común es pedirle al modelo la nota final. Eso desplaza la responsabilidad a un sistema que no puede sostenerla, y además desperdicia lo que la IA sí hace bien: leer entero, aplicar el mismo criterio a las cuarenta entregas y señalar dónde en el texto está la evidencia. La nota sigue siendo del docente.",
      ],
      en: [
        "Grading is where the teacher's time goes and also where quality degrades: the feedback on submission forty doesn't resemble the one on submission three, and the student who handed in last gets less. That's a fatigue problem, not a judgement one.",
        "The most common implementation mistake is asking the model for the final grade. That shifts responsibility to a system that can't carry it, and it wastes what AI actually does well: read everything, apply the same criterion across all forty submissions, and point to where the evidence sits in the text. The grade stays the teacher's.",
      ],
      ar: [
        "التصحيح هو حيث يذهب وقت المعلّم، وحيث تتراجع الجودة أيضًا: فالتغذية الراجعة على التسليم الأربعين لا تشبه تلك على الثالث، ومن سلّم أخيرًا يحصل على أقل. وهذه مشكلة إجهاد لا مشكلة اجتهاد.",
        "وأشيع أخطاء التنفيذ هو طلب الدرجة النهائية من النموذج. فذلك ينقل المسؤولية إلى نظام لا يقوى على حملها، ويهدر ما يجيده الذكاء الاصطناعي فعلًا: القراءة الكاملة، وتطبيق المعيار نفسه على التسليمات الأربعين، والإشارة إلى موضع الشاهد في النص. أما الدرجة فتبقى للمعلّم.",
      ],
    },
    steps: [
      {
        title: {
          es: "La rúbrica se vuelve explícita",
          en: "The rubric is made explicit",
          ar: "جعل سلّم التقييم صريحًا",
        },
        detail: {
          es: "Criterios, niveles y qué evidencia corresponde a cada nivel, escrito. Si la rúbrica vive en la cabeza del docente, el proyecto empieza por escribirla y ese trabajo ya mejora la corrección humana.",
          en: "Criteria, levels, and what evidence maps to each level, written down. If the rubric lives in the teacher's head, the project starts by writing it — and that work already improves human grading.",
          ar: "المعايير والمستويات وما يقابل كل مستوى من شواهد، مكتوبةً. فإن كان سلّم التقييم في ذهن المعلّم، بدأ المشروع بكتابته، وهذا العمل وحده يحسّن التصحيح البشري.",
        },
      },
      {
        title: {
          es: "Se evalúa criterio por criterio, no de golpe",
          en: "It's assessed criterion by criterion, not all at once",
          ar: "التقييم معيارًا بمعيار لا دفعة واحدة",
        },
        detail: {
          es: "Una pasada por criterio, cada una con su evidencia. Pedir la nota global de una vez produce un número plausible y una devolución vaga, que es exactamente lo que no sirve.",
          en: "One pass per criterion, each with its evidence. Asking for the overall grade in one go produces a plausible number and vague feedback — precisely what's useless.",
          ar: "تمريرة لكل معيار، ولكل منها شاهدها. أما طلب الدرجة الكلية دفعة واحدة فينتج رقمًا معقولًا وتغذية راجعة غامضة، وهو بالضبط ما لا ينفع.",
        },
      },
      {
        title: {
          es: "El docente revisa en una interfaz de diferencia",
          en: "The teacher reviews in a diff-style interface",
          ar: "يراجع المعلّم في واجهة تُظهر الفروق",
        },
        detail: {
          es: "Ve el borrador, la evidencia citada y puede cambiar la nota de un criterio en un clic. Revisar tiene que ser más rápido que corregir de cero, o el docente deja de usarlo.",
          en: "They see the draft, the quoted evidence, and can change a criterion's grade in one click. Reviewing has to be faster than grading from scratch, or the teacher stops using it.",
          ar: "يرى المسودة والشاهد المقتبس، ويستطيع تغيير درجة معيار بنقرة واحدة. فالمراجعة يجب أن تكون أسرع من التصحيح من الصفر، وإلا كفّ المعلّم عن استخدامها.",
        },
      },
      {
        title: {
          es: "Se mide la distancia entre el borrador y la nota final",
          en: "The gap between draft and final grade is measured",
          ar: "قياس المسافة بين المسودة والدرجة النهائية",
        },
        detail: {
          es: "Por criterio y por docente. Es la métrica que dice si el sistema está calibrado, y la que decide si se puede ampliar a otra materia o hay que revisar la rúbrica.",
          en: "Per criterion and per teacher. It's the metric that tells you whether the system is calibrated, and the one that decides whether to extend to another subject or revisit the rubric.",
          ar: "لكل معيار ولكل معلّم. وهي المقياس الذي يخبرك إن كان النظام معايَرًا، وهي التي تقرّر التوسّع إلى مادة أخرى أو مراجعة سلّم التقييم.",
        },
      },
    ],
    measures: {
      es: [
        "Minutos por entrega corregida, antes y después.",
        "Diferencia media entre nota sugerida y nota final, por criterio.",
        "Consistencia: misma entrega evaluada dos veces, ¿misma nota?",
        "Reclamos de alumnos por la devolución recibida.",
      ],
      en: [
        "Minutes per graded submission, before and after.",
        "Mean gap between suggested and final grade, per criterion.",
        "Consistency: the same submission graded twice — same grade?",
        "Student appeals about the feedback received.",
      ],
      ar: [
        "الدقائق لكل تسليم مُصحَّح، قبل وبعد.",
        "متوسط الفارق بين الدرجة المقترحة والنهائية، لكل معيار.",
        "الاتساق: التسليم نفسه يُقيَّم مرتين — هل الدرجة واحدة؟",
        "تظلّمات المتعلّمين بشأن التغذية الراجعة.",
      ],
    },
    requires: {
      es: [
        "Rúbricas escritas y estables. Sin rúbrica, no hay corrección asistida: hay una opinión generada.",
        "Un conjunto de entregas ya corregidas por docentes, para calibrar y medir la diferencia.",
        "Interfaz de revisión dentro del flujo que el docente ya usa, no en otra herramienta.",
        "Política clara y comunicada a los alumnos de que hay asistencia de IA en la corrección.",
      ],
      en: [
        "Written, stable rubrics. Without a rubric there's no assisted grading — there's a generated opinion.",
        "A set of teacher-graded submissions, to calibrate and measure the gap.",
        "A review interface inside the flow the teacher already uses, not in another tool.",
        "A clear policy, communicated to students, that AI assists in grading.",
      ],
      ar: [
        "سلالم تقييم مكتوبة ومستقرة. فبلا سلّم لا يوجد تصحيح مُعان، بل رأي مولَّد.",
        "مجموعة تسليمات صحّحها معلّمون، للمعايرة وقياس الفارق.",
        "واجهة مراجعة داخل المسار الذي يستخدمه المعلّم أصلًا، لا في أداة أخرى.",
        "سياسة واضحة ومبلَّغة للمتعلّمين بأن الذكاء الاصطناعي يساعد في التصحيح.",
      ],
    },
    notThis: {
      es: [
        "Si la evaluación es de opción múltiple, ya está automatizada y no hace falta un modelo. Esto es para producción escrita, código, casos y proyectos.",
        "Si cada docente corrige con un criterio distinto y la institución no quiere unificarlo, el sistema va a exponer esa inconsistencia y el conflicto es político, no técnico.",
        "Si la evaluación es de alto impacto —ingreso, certificación oficial, título—, el borrador automático agrega riesgo reputacional sin ahorrar lo suficiente. Ahí la corrección es doble y humana.",
      ],
      en: [
        "If assessment is multiple choice, it's already automated and needs no model. This is for written work, code, cases and projects.",
        "If every teacher grades by a different standard and the institution doesn't want to unify it, the system will expose that inconsistency and the conflict is political, not technical.",
        "If the assessment is high-stakes — admissions, official certification, a degree — an automatic draft adds reputational risk without saving enough. There, grading stays double and human.",
      ],
      ar: [
        "إذا كان التقييم اختيارًا من متعدّد، فهو مؤتمت أصلًا ولا يحتاج نموذجًا. هذا للإنتاج الكتابي والبرمجة ودراسات الحالة والمشاريع.",
        "إذا كان كل معلّم يصحّح بمعيار مختلف ولا ترغب المؤسسة في التوحيد، فسيكشف النظام هذا التفاوت، والنزاع حينها سياسي لا تقني.",
        "إذا كان التقييم عالي المخاطر — قبول أو شهادة رسمية أو درجة علمية — فالمسودة الآلية تضيف مخاطرة سمعة دون توفير كافٍ. وهناك يبقى التصحيح مزدوجًا وبشريًا.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿El alumno sabe que lo corrigió una IA?",
          en: "Does the student know AI graded them?",
          ar: "هل يعلم المتعلّم أن الذكاء الاصطناعي صحّح له؟",
        },
        answer: {
          es: "Sabe que hay asistencia de IA y que la nota la firma un docente, porque se declara en la política del curso. Ocultarlo es insostenible: aparece en el primer reclamo, y en varias jurisdicciones la decisión automatizada sobre una persona tiene obligaciones de transparencia y de revisión humana.",
          en: "They know AI assists and that a teacher signs the grade, because it's stated in the course policy. Hiding it is untenable: it surfaces at the first appeal, and in several jurisdictions automated decisions about a person carry transparency and human-review obligations.",
          ar: "يعلم أن هناك مساعدة من الذكاء الاصطناعي وأن المعلّم يوقّع الدرجة، لأن ذلك معلن في سياسة المقرر. وإخفاؤه غير قابل للاستمرار: يظهر عند أول تظلّم، وفي عدة ولايات قضائية تترتب على القرار الآلي بشأن شخص التزاماتُ شفافية ومراجعة بشرية.",
        },
      },
      {
        question: {
          es: "¿Cuánto tiempo ahorra de verdad?",
          en: "How much time does it really save?",
          ar: "كم توفّر من الوقت فعلًا؟",
        },
        answer: {
          es: "Depende de cuánto tarde la revisión, no de cuánto tarde el modelo. Si la interfaz obliga al docente a leer la entrega completa igual, el ahorro es casi nulo. El ahorro aparece cuando la evidencia citada le permite verificar el criterio sin releer todo, y eso es una decisión de producto más que de modelo.",
          en: "It depends on how long review takes, not how long the model takes. If the interface still forces the teacher to read the whole submission, the saving is near zero. The saving appears when the quoted evidence lets them verify the criterion without rereading everything — and that's a product decision more than a model one.",
          ar: "يتوقف على مدة المراجعة لا على مدة عمل النموذج. فإن أجبرت الواجهة المعلّمَ على قراءة التسليم كاملًا مع ذلك، كان التوفير شبه معدوم. ويظهر التوفير حين يتيح له الشاهد المقتبس التحقق من المعيار دون إعادة قراءة كل شيء، وهذا قرار منتج أكثر منه قرار نموذج.",
        },
      },
      {
        question: {
          es: "¿Detecta si el trabajo lo escribió una IA?",
          en: "Does it detect whether the work was written by AI?",
          ar: "هل يكشف ما إذا كان العمل مكتوبًا بذكاء اصطناعي؟",
        },
        answer: {
          es: "No lo hacemos, porque los detectores actuales tienen una tasa de falsos positivos que no es aceptable cuando la consecuencia es una acusación de deshonestidad académica. Lo que sí se puede hacer es rediseñar la consigna para que pida proceso, iteración y contexto propio, que es lo que un modelo no puede fabricar.",
          en: "We don't, because current detectors have a false-positive rate that isn't acceptable when the consequence is an academic dishonesty accusation. What can be done is redesigning the prompt to require process, iteration and personal context — which is what a model can't fabricate.",
          ar: "لا نفعل، لأن كواشف اليوم لديها معدل إيجابيات كاذبة غير مقبول حين تكون النتيجة اتهامًا بعدم النزاهة الأكاديمية. أما ما يمكن فعله فهو إعادة تصميم التكليف ليطلب عمليةً وتكرارًا وسياقًا شخصيًا، وهو ما لا يستطيع نموذج اختلاقه.",
        },
      },
    ],
  },

  {
    solution: "edtech-y-plataformas-educativas",
    slug: {
      es: "generacion-de-evaluaciones",
      en: "assessment-generation",
      ar: "assessment-generation",
    },
    title: {
      es: "Generación de evaluaciones y bancos de preguntas con IA",
      en: "AI assessment and question bank generation",
      ar: "توليد التقييمات وبنوك الأسئلة بالذكاء الاصطناعي",
    },
    description: {
      es: "Cómo se generan ítems de evaluación con IA a partir del material propio: alineados al objetivo de aprendizaje, con distractores plausibles y revisión antes de publicar.",
      en: "How to generate assessment items with AI from your own material: aligned to the learning objective, with plausible distractors and review before publishing.",
      ar: "كيف تُولَّد أسئلة التقييم بالذكاء الاصطناعي من مادتك الخاصة: متوائمة مع هدف التعلّم، بخيارات تشتيت معقولة ومراجعة قبل النشر.",
    },
    answer: {
      es: "Generar evaluaciones con IA sirve cuando el ítem sale del material propio, declara qué objetivo de aprendizaje mide y trae distractores que corresponden a errores conceptuales reales. Sin esas tres condiciones sale un cuestionario de superficie que mide lectura reciente, no aprendizaje. Todo ítem se revisa antes de publicarse.",
      en: "Generating assessments with AI works when the item comes from your own material, declares which learning objective it measures, and carries distractors that correspond to real conceptual errors. Without those three conditions you get a surface quiz that measures recent reading, not learning. Every item is reviewed before publishing.",
      ar: "توليد التقييمات بالذكاء الاصطناعي ينفع حين يخرج السؤال من مادتك الخاصة، ويعلن أي هدف تعلّم يقيس، ويحمل خيارات تشتيت تقابل أخطاءً مفاهيمية حقيقية. وبلا هذه الشروط الثلاثة ينتج اختبار سطحي يقيس القراءة الحديثة لا التعلّم. وكل سؤال يُراجَع قبل النشر.",
    },
    intro: {
      es: [
        "Escribir buenas preguntas es caro y es la tarea que más se posterga en una plataforma educativa: por eso los cursos tienen la misma evaluación desde hace tres años, la respuesta circula por WhatsApp entre cohortes y el banco de ítems nunca crece.",
        "La IA resuelve bien el volumen y mal la calidad si se la deja sola. Un modelo que lee una unidad produce veinte preguntas en un minuto, y quince miden si el alumno leyó el párrafo. La diferencia entre un banco útil y uno decorativo está en el proceso alrededor de la generación, no en el modelo.",
      ],
      en: [
        "Writing good questions is expensive and is the most-postponed task on a learning platform: that's why courses have had the same assessment for three years, the answers circulate over WhatsApp between cohorts, and the item bank never grows.",
        "AI handles volume well and quality badly if left alone. A model that reads a unit produces twenty questions in a minute, and fifteen of them measure whether the student read the paragraph. The difference between a useful bank and a decorative one lies in the process around generation, not in the model.",
      ],
      ar: [
        "كتابة أسئلة جيدة مكلفة، وهي أكثر المهام تأجيلًا في منصة تعليمية: ولهذا تبقى المقررات بالتقييم نفسه منذ ثلاث سنوات، وتنتقل الإجابات عبر واتساب بين الدفعات، ولا ينمو بنك الأسئلة أبدًا.",
        "الذكاء الاصطناعي يجيد الحجم ويسيء الجودة إن تُرك وحده. فنموذج يقرأ وحدة يُنتج عشرين سؤالًا في دقيقة، خمسة عشر منها تقيس ما إذا كان المتعلّم قد قرأ الفقرة. والفرق بين بنك مفيد وآخر شكلي يكمن في العملية المحيطة بالتوليد لا في النموذج.",
      ],
    },
    steps: [
      {
        title: {
          es: "Cada ítem se ata a un objetivo de aprendizaje",
          en: "Each item is tied to a learning objective",
          ar: "ربط كل سؤال بهدف تعلّم",
        },
        detail: {
          es: "La generación parte del objetivo declarado del curso y del nivel cognitivo que se quiere medir, no del texto suelto. Sin esto no se puede saber qué cubre la evaluación ni qué le falta.",
          en: "Generation starts from the course's declared objective and the cognitive level being measured, not from loose text. Without this you can't know what the assessment covers or what it misses.",
          ar: "ينطلق التوليد من هدف المقرر المعلن ومن المستوى المعرفي المراد قياسه، لا من نص سائب. وبدون ذلك لا يمكن معرفة ما يغطيه التقييم ولا ما ينقصه.",
        },
      },
      {
        title: {
          es: "Los distractores salen de errores reales",
          en: "Distractors come from real errors",
          ar: "خيارات التشتيت تأتي من أخطاء حقيقية",
        },
        detail: {
          es: "Se alimentan con las respuestas incorrectas que los alumnos ya dieron en cohortes anteriores. Un distractor inventado se descarta a simple vista y convierte la pregunta en trivial.",
          en: "They're fed by the wrong answers students already gave in previous cohorts. An invented distractor is dismissed at a glance and turns the question trivial.",
          ar: "تُغذّى بالإجابات الخاطئة التي قدّمها المتعلّمون في دفعات سابقة. فخيار تشتيت مُختلق يُستبعد من النظرة الأولى ويحوّل السؤال إلى بديهي.",
        },
      },
      {
        title: {
          es: "Se filtra antes de que lo vea una persona",
          en: "It's filtered before a person sees it",
          ar: "الترشيح قبل أن يراه إنسان",
        },
        detail: {
          es: "Duplicados semánticos contra el banco existente, ítems con más de una respuesta defendible y preguntas cuya respuesta está literal en el enunciado. Es un filtro automático, y saca la mitad.",
          en: "Semantic duplicates against the existing bank, items with more than one defensible answer, and questions whose answer is literally in the stem. It's an automatic filter, and it removes half.",
          ar: "التكرارات الدلالية مقابل البنك القائم، والأسئلة ذات أكثر من إجابة قابلة للدفاع، والأسئلة التي إجابتها حرفيًا في نصّ السؤال. مرشّح آلي، ويستبعد النصف.",
        },
      },
      {
        title: {
          es: "Un docente aprueba y el ítem se calibra con uso",
          en: "A teacher approves and the item calibrates through use",
          ar: "يعتمد المعلّم والسؤال يُعايَر بالاستخدام",
        },
        detail: {
          es: "Después de publicado, el porcentaje de acierto y el poder discriminativo dicen si el ítem sirve. Los que todos aciertan o todos fallan salen del banco.",
          en: "Once published, success rate and discrimination index say whether the item works. Ones everybody gets right or everybody gets wrong leave the bank.",
          ar: "بعد النشر، تخبرك نسبة الإجابة الصحيحة ومعامل التمييز إن كان السؤال نافعًا. وما يصيبه الجميع أو يخطئه الجميع يخرج من البنك.",
        },
      },
    ],
    measures: {
      es: [
        "Ítems generados que sobreviven la revisión docente, sobre el total generado.",
        "Cobertura del banco por objetivo de aprendizaje: qué objetivos quedaron sin ítems.",
        "Poder discriminativo de los ítems nuevos contra los existentes.",
        "Horas de docente por evaluación nueva publicada.",
      ],
      en: [
        "Generated items that survive teacher review, over total generated.",
        "Bank coverage per learning objective: which objectives have no items.",
        "Discrimination index of new items against existing ones.",
        "Teacher hours per newly published assessment.",
      ],
      ar: [
        "الأسئلة المولَّدة التي تجتاز مراجعة المعلّم، من إجمالي المولَّد.",
        "تغطية البنك لكل هدف تعلّم: أي الأهداف بقيت بلا أسئلة.",
        "معامل التمييز للأسئلة الجديدة مقابل القائمة.",
        "ساعات المعلّم لكل تقييم جديد منشور.",
      ],
    },
    requires: {
      es: [
        "Objetivos de aprendizaje declarados por unidad. Si no existen, ese es el primer entregable del proyecto.",
        "El histórico de respuestas incorrectas, que es lo que hace buenos a los distractores.",
        "Un docente con tiempo asignado para aprobar. La revisión es el cuello de botella, no la generación.",
        "Estadísticas de ítem en la plataforma: acierto y discriminación por pregunta.",
      ],
      en: [
        "Learning objectives declared per unit. If they don't exist, that's the project's first deliverable.",
        "The history of wrong answers — what makes distractors good.",
        "A teacher with allocated time to approve. Review is the bottleneck, not generation.",
        "Item statistics in the platform: success rate and discrimination per question.",
      ],
      ar: [
        "أهداف تعلّم معلنة لكل وحدة. فإن لم توجد، فهي أول مُخرَج للمشروع.",
        "سجلّ الإجابات الخاطئة، وهو ما يجعل خيارات التشتيت جيدة.",
        "معلّم مخصَّص له وقت للاعتماد. فالمراجعة هي عنق الزجاجة لا التوليد.",
        "إحصاءات الأسئلة في المنصة: نسبة الإصابة ومعامل التمييز لكل سؤال.",
      ],
    },
    notThis: {
      es: [
        "Si nadie va a revisar los ítems, no se hace. Un banco de preguntas sin revisar es peor que un banco chico: mide mal y nadie se entera hasta el reclamo de una cohorte entera.",
        "Si la evaluación es certificante o de ingreso, la generación puede proponer pero el proceso de validación es el que ya exige la norma, y ese no se acorta.",
        "Si el curso tiene diez alumnos por cohorte, no hay estadística de ítem con la que calibrar y el banco no mejora con el uso.",
      ],
      en: [
        "If nobody is going to review the items, don't do it. An unreviewed question bank is worse than a small one: it measures badly and nobody finds out until an entire cohort appeals.",
        "If the assessment is certifying or for admissions, generation can propose but the validation process is the one the regulation already demands, and that doesn't get shortened.",
        "If the course has ten students per cohort, there's no item statistics to calibrate against and the bank doesn't improve with use.",
      ],
      ar: [
        "إذا لم يراجع أحد الأسئلة، فلا تفعل. بنك أسئلة غير مراجَع أسوأ من بنك صغير: يقيس بشكل رديء ولا يكتشف أحد ذلك حتى تتظلّم دفعة كاملة.",
        "إذا كان التقييم للشهادة أو للقبول، فالتوليد قد يقترح، لكن عملية الاعتماد هي التي تفرضها اللائحة أصلًا، وهذه لا تُختصر.",
        "إذا كان في المقرر عشرة متعلّمين لكل دفعة، فلا إحصاءات أسئلة للمعايرة ولا يتحسّن البنك بالاستخدام.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Sirve para preguntas abiertas o sólo para opción múltiple?",
          en: "Does it work for open questions or only multiple choice?",
          ar: "هل يصلح للأسئلة المفتوحة أم للاختيار من متعدّد فقط؟",
        },
        answer: {
          es: "Sirve para las dos, pero el valor está en lugares distintos. En opción múltiple el trabajo difícil son los distractores. En pregunta abierta es la rúbrica que la acompaña, sin la cual la pregunta no se puede corregir de forma consistente ni por una persona ni por un sistema.",
          en: "Both, but the value sits in different places. In multiple choice the hard work is the distractors. In open questions it's the accompanying rubric, without which the question can't be graded consistently by a person or a system.",
          ar: "يصلح للاثنين، لكن القيمة في موضعين مختلفين. في الاختيار من متعدّد يكمن العمل الصعب في خيارات التشتيت. وفي السؤال المفتوح في سلّم التقييم المرافق، وبدونه لا يمكن تصحيح السؤال باتساق لا من شخص ولا من نظام.",
        },
      },
      {
        question: {
          es: "¿Cuántos ítems se descartan en la revisión?",
          en: "How many items get discarded in review?",
          ar: "كم سؤالًا يُستبعد في المراجعة؟",
        },
        answer: {
          es: "En los primeros lotes, la mayoría, y eso es información útil: dice qué le falta al prompt, al material o a los objetivos declarados. La tasa de supervivencia sube cuando la generación empieza a alimentarse de los ítems que el docente ya aprobó, no cuando se cambia de modelo.",
          en: "In the first batches, most of them — and that's useful information: it tells you what's missing from the prompt, the material or the declared objectives. Survival rate rises when generation starts feeding on the items the teacher already approved, not when you change models.",
          ar: "في الدفعات الأولى، معظمها، وهذه معلومة مفيدة: تخبرك بما ينقص التعليمة أو المادة أو الأهداف المعلنة. وترتفع نسبة البقاء حين يبدأ التوليد بالتغذّي من الأسئلة التي اعتمدها المعلّم فعلًا، لا حين تغيّر النموذج.",
        },
      },
      {
        question: {
          es: "¿Puede generar una evaluación distinta por alumno?",
          en: "Can it generate a different assessment per student?",
          ar: "هل يستطيع توليد تقييم مختلف لكل متعلّم؟",
        },
        answer: {
          es: "Técnicamente sí, y hay que pensarlo dos veces. Si cada alumno recibe ítems distintos, las notas dejan de ser comparables salvo que todos los ítems estén calibrados al mismo nivel de dificultad, y eso requiere un banco maduro. La ruta razonable es variantes de ítems ya calibrados, no generación al vuelo.",
          en: "Technically yes, and it deserves a second thought. If each student gets different items, grades stop being comparable unless every item is calibrated to the same difficulty — which requires a mature bank. The reasonable route is variants of already-calibrated items, not generation on the fly.",
          ar: "تقنيًا نعم، ويستحق الأمر تفكيرًا ثانيًا. فإن حصل كل متعلّم على أسئلة مختلفة، لم تعد الدرجات قابلة للمقارنة إلا إذا عُوير كل سؤال على مستوى الصعوبة نفسه، وهذا يستلزم بنكًا ناضجًا. والطريق المعقول هو صياغات بديلة لأسئلة مُعايَرة سلفًا، لا توليد لحظي.",
        },
      },
    ],
  },

  {
    solution: "edtech-y-plataformas-educativas",
    slug: {
      es: "busqueda-semantica",
      en: "semantic-search",
      ar: "semantic-search",
    },
    title: {
      es: "Búsqueda semántica sobre contenidos educativos",
      en: "Semantic search over learning content",
      ar: "البحث الدلالي في المحتوى التعليمي",
    },
    description: {
      es: "Cómo se implementa búsqueda semántica en una plataforma educativa: sobre video transcripto y material propio, con cita al minuto y respetando el alcance del alumno.",
      en: "How to implement semantic search in a learning platform: over transcribed video and your own material, citing the timestamp and respecting the student's scope.",
      ar: "كيف يُنفَّذ البحث الدلالي في منصة تعليمية: داخل الفيديو المفرَّغ والمادة الخاصة، مع الإحالة إلى الدقيقة واحترام نطاق المتعلّم.",
    },
    answer: {
      es: "La búsqueda semántica sobre contenido educativo devuelve el pasaje del material que responde a la pregunta —con el módulo, la página o el minuto del video— en vez de una lista de cursos que contienen la palabra. Es la primera función de IA que conviene lanzar: se mide sin tocar la evaluación y es la base del tutor.",
      en: "Semantic search over learning content returns the passage of material that answers the question — with the module, page or video timestamp — instead of a list of courses containing the word. It's the first AI feature worth shipping: measurable without touching assessment, and the foundation for the tutor.",
      ar: "البحث الدلالي في المحتوى التعليمي يعيد المقطع الذي يجيب عن السؤال — مع الوحدة أو الصفحة أو دقيقة الفيديو — بدل قائمة مقررات تحوي الكلمة. وهي أول ميزة ذكاء اصطناعي يُستحسن إطلاقها: قابلة للقياس دون المساس بالتقييم، وهي أساس المرشد.",
    },
    intro: {
      es: [
        "El buscador de casi todas las plataformas educativas busca en títulos y descripciones. El alumno escribe la duda con sus palabras y recibe una lista de cursos, cuando lo que necesitaba era el minuto once del video de la unidad cuatro donde el profesor explica exactamente eso.",
        "El contenido de esa plataforma ya contiene la respuesta. Lo que falta no es más contenido: es poder encontrarlo. Y encontrarlo es el paso previo a cualquier otra función de IA, porque un tutor sin recuperación es un modelo general con otro nombre.",
      ],
      en: [
        "The search box on almost every learning platform searches titles and descriptions. The student types their doubt in their own words and gets a list of courses, when what they needed was minute eleven of the unit four video where the instructor explains exactly that.",
        "That platform's content already contains the answer. What's missing isn't more content: it's being able to find it. And finding it is the step before any other AI feature, because a tutor without retrieval is a general model under another name.",
      ],
      ar: [
        "مربّع البحث في معظم المنصات التعليمية يبحث في العناوين والأوصاف. يكتب المتعلّم سؤاله بكلماته فيتلقّى قائمة مقررات، بينما كان يحتاج إلى الدقيقة الحادية عشرة من فيديو الوحدة الرابعة حيث يشرح المدرّس ذلك بالضبط.",
        "محتوى تلك المنصة يتضمن الإجابة أصلًا. والناقص ليس مزيدًا من المحتوى، بل القدرة على إيجاده. وإيجاده هو الخطوة السابقة لأي ميزة ذكاء اصطناعي أخرى، لأن مرشدًا بلا استرجاع هو نموذج عام باسم آخر.",
      ],
    },
    steps: [
      {
        title: {
          es: "Se transcribe y se parte el material",
          en: "Material is transcribed and chunked",
          ar: "تفريغ المادة وتقسيمها",
        },
        detail: {
          es: "Video a texto con marca de tiempo, PDF a texto, y partición por unidad conceptual en vez de por cantidad de caracteres. La partición ciega corta ejemplos por la mitad y arruina la recuperación.",
          en: "Video to timestamped text, PDF to text, and chunking by conceptual unit rather than character count. Blind chunking cuts examples in half and wrecks retrieval.",
          ar: "تحويل الفيديو إلى نص بطوابع زمنية، والـPDF إلى نص، والتقسيم بحسب الوحدة المفاهيمية لا بعدد الأحرف. فالتقسيم الأعمى يشطر الأمثلة نصفين ويفسد الاسترجاع.",
        },
      },
      {
        title: {
          es: "Se indexa con el vocabulario del dominio",
          en: "Indexing uses the domain's vocabulary",
          ar: "الفهرسة بمفردات المجال",
        },
        detail: {
          es: "Búsqueda por significado combinada con búsqueda por término exacto, porque en material técnico el nombre de una función o una fórmula tiene que coincidir literal.",
          en: "Meaning-based search combined with exact-term search, because in technical material a function name or a formula has to match literally.",
          ar: "بحث بالمعنى مقترن ببحث بالمصطلح الحرفي، لأن اسم دالة أو صيغة في مادة تقنية يجب أن يتطابق حرفيًا.",
        },
      },
      {
        title: {
          es: "El resultado respeta lo que el alumno tiene habilitado",
          en: "Results respect what the student has unlocked",
          ar: "النتائج تحترم ما أُتيح للمتعلّم",
        },
        detail: {
          es: "Cursos en los que está inscripto y unidades ya abiertas. Es un requisito de producto además de pedagógico: la búsqueda no puede filtrar contenido de un plan que el alumno no pagó.",
          en: "Courses they're enrolled in and units already unlocked. It's a product requirement as much as a pedagogical one: search can't leak content from a plan the student didn't pay for.",
          ar: "المقررات المسجَّل فيها والوحدات المفتوحة بالفعل. وهو شرط منتج بقدر ما هو تربوي: لا يجوز أن يسرّب البحث محتوى خطة لم يدفعها المتعلّم.",
        },
      },
      {
        title: {
          es: "Se devuelve el pasaje, no el curso",
          en: "The passage is returned, not the course",
          ar: "يُعاد المقطع لا المقرر",
        },
        detail: {
          es: "Con el enlace que abre el video en el segundo exacto o el documento en la página. Es lo que convierte la búsqueda en una respuesta y no en el principio de otra búsqueda.",
          en: "With a link that opens the video at the exact second or the document at the page. It's what turns a search into an answer rather than the start of another search.",
          ar: "مع رابط يفتح الفيديو عند الثانية المحدّدة أو المستند عند الصفحة. وهذا ما يحوّل البحث إلى إجابة بدل أن يكون بداية بحث آخر.",
        },
      },
    ],
    measures: {
      es: [
        "Búsquedas sin resultado útil, que es el número que más rápido baja.",
        "Clics en el primer resultado y tiempo hasta encontrar la respuesta.",
        "Consultas al soporte o al foro sobre contenido que ya existía.",
        "Cobertura del índice: qué porcentaje del material está transcripto e indexado.",
      ],
      en: [
        "Searches with no useful result — the number that drops fastest.",
        "Clicks on the first result and time to find the answer.",
        "Support or forum questions about content that already existed.",
        "Index coverage: what share of the material is transcribed and indexed.",
      ],
      ar: [
        "عمليات البحث بلا نتيجة مفيدة، وهو الرقم الأسرع انخفاضًا.",
        "النقرات على النتيجة الأولى والزمن حتى إيجاد الإجابة.",
        "أسئلة الدعم أو المنتدى عن محتوى موجود أصلًا.",
        "تغطية الفهرس: نسبة المادة المفرَّغة والمفهرسة.",
      ],
    },
    requires: {
      es: [
        "Acceso al contenido: archivos, transcripciones y metadatos de curso y unidad.",
        "El modelo de permisos de la plataforma, para poder filtrar por alcance del alumno.",
        "Presupuesto de transcripción si hay video sin transcribir, que suele ser el costo más grande del proyecto.",
        "Un lugar en la interfaz donde la búsqueda sea visible. Si queda escondida, no se usa y no se puede medir.",
      ],
      en: [
        "Content access: files, transcripts and course/unit metadata.",
        "The platform's permission model, so results can be filtered by student scope.",
        "A transcription budget if there's untranscribed video — usually the project's largest cost.",
        "A place in the interface where search is visible. Hidden, it goes unused and unmeasurable.",
      ],
      ar: [
        "الوصول إلى المحتوى: الملفات والنصوص المفرَّغة وبيانات المقرر والوحدة الوصفية.",
        "نموذج الصلاحيات في المنصة، لترشيح النتائج بحسب نطاق المتعلّم.",
        "ميزانية تفريغ إن وُجد فيديو غير مفرَّغ، وهي غالبًا أكبر تكلفة في المشروع.",
        "موضع ظاهر للبحث في الواجهة. فإن خُبّئ، لم يُستخدم ولم يمكن قياسه.",
      ],
    },
    notThis: {
      es: [
        "Si el catálogo es de veinte cursos cortos, el buscador por título ya alcanza y el proyecto no se justifica.",
        "Si el contenido cambia todas las semanas y no hay proceso para reindexar, la búsqueda va a devolver material retirado, que en educación es peor que no devolver nada.",
        "Si el material está mayormente en video y transcribirlo no entra en el presupuesto, conviene decirlo ahora: sin transcripción no hay búsqueda semántica sobre ese contenido.",
      ],
      en: [
        "If the catalogue is twenty short courses, title search is already enough and the project isn't justified.",
        "If content changes weekly with no reindexing process, search will return withdrawn material — which in education is worse than returning nothing.",
        "If the material is mostly video and transcription isn't in the budget, say so now: without transcripts there's no semantic search over that content.",
      ],
      ar: [
        "إذا كان الكتالوج عشرين مقررًا قصيرًا، فالبحث بالعنوان كافٍ ولا يبرَّر المشروع.",
        "إذا تغيّر المحتوى أسبوعيًا بلا عملية لإعادة الفهرسة، فسيعيد البحث موادَّ مسحوبة، وهذا في التعليم أسوأ من ألّا يعيد شيئًا.",
        "إذا كانت المادة في معظمها فيديو ولا يتّسع لها بند التفريغ في الميزانية، فقُل ذلك الآن: بلا تفريغ لا بحث دلالي في ذلك المحتوى.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Reemplaza al buscador que ya tiene la plataforma?",
          en: "Does it replace the platform's existing search?",
          ar: "هل يحلّ محل البحث الموجود في المنصة؟",
        },
        answer: {
          es: "Lo complementa. El buscador por término sigue siendo mejor para encontrar un curso por su nombre o un archivo por su título. La búsqueda semántica resuelve la otra mitad: la pregunta escrita con las palabras del alumno, que es donde el buscador clásico devuelve cero resultados.",
          en: "It complements it. Keyword search remains better for finding a course by name or a file by title. Semantic search solves the other half: the question written in the student's own words, which is exactly where classic search returns zero results.",
          ar: "يكمّله. فالبحث بالكلمة المفتاحية يبقى أفضل لإيجاد مقرر باسمه أو ملف بعنوانه. أما البحث الدلالي فيحلّ النصف الآخر: السؤال المكتوب بكلمات المتعلّم، وهو بالضبط حيث يعيد البحث التقليدي صفر نتائج.",
        },
      },
      {
        question: {
          es: "¿Cuánto cuesta transcribir un catálogo de video?",
          en: "How much does transcribing a video catalogue cost?",
          ar: "كم يكلّف تفريغ كتالوج فيديو؟",
        },
        answer: {
          es: "Se calcula por hora de video y hoy es el orden de magnitud más bajo de todo el proyecto, pero se multiplica por un catálogo grande. Lo que conviene es transcribir primero los cursos con más alumnos activos y medir el uso de la búsqueda ahí antes de cubrir el catálogo entero.",
          en: "It's priced per hour of video and is today the cheapest order of magnitude in the whole project — but it multiplies across a large catalogue. The sensible move is transcribing the courses with the most active students first and measuring search usage there before covering the whole catalogue.",
          ar: "تُحسب بالساعة من الفيديو، وهي اليوم أدنى رتبة كلفة في المشروع كله، لكنها تتضاعف مع كتالوج كبير. والتصرف الرشيد هو تفريغ المقررات الأكثر متعلّمين نشطين أولًا وقياس استخدام البحث فيها قبل تغطية الكتالوج بأكمله.",
        },
      },
      {
        question: {
          es: "¿Es el primer paso antes del tutor?",
          en: "Is it the first step before the tutor?",
          ar: "هل هي الخطوة الأولى قبل المرشد؟",
        },
        answer: {
          es: "Sí, y es la recomendación que damos casi siempre. La búsqueda expone la calidad real del contenido y del índice sin el riesgo de que un tutor afirme algo incorrecto. Si la búsqueda no encuentra el pasaje correcto, el tutor tampoco lo va a encontrar: sólo lo va a disimular mejor.",
          en: "Yes, and it's what we recommend almost every time. Search exposes the real quality of the content and the index without the risk of a tutor asserting something wrong. If search can't find the right passage, neither will the tutor — it will just hide it better.",
          ar: "نعم، وهذا ما نوصي به في أغلب الأحيان. فالبحث يكشف الجودة الحقيقية للمحتوى وللفهرس دون مخاطرة أن يجزم مرشد بشيء خاطئ. وإن عجز البحث عن إيجاد المقطع الصحيح، فلن يجده المرشد أيضًا، بل سيخفي ذلك بمهارة أكبر.",
        },
      },
    ],
  },
]

/** Segmento de la ruta por idioma, heredado del índice de soluciones. */
export function casePath(
  lang: Lang,
  solution: Solution,
  useCase: UseCase
): string {
  return `${solutionPath(lang, solution)}${useCase.slug[lang]}/`
}

export function casesFor(solution: Solution): UseCase[] {
  return USE_CASES.filter((useCase) => useCase.solution === solution.slug.es)
}

export function findCase(
  lang: Lang,
  solution: Solution,
  slug: string
): UseCase | undefined {
  return casesFor(solution).find((useCase) => useCase.slug[lang] === slug)
}

/** Todos los pares sector + caso, para rutas, sitemap y `llms.txt`. */
export const USE_CASE_ROUTES: { solution: Solution; useCase: UseCase }[] =
  USE_CASES.map((useCase) => {
    const solution = SOLUTIONS.find((s) => s.slug.es === useCase.solution)
    if (!solution) {
      throw new Error(
        `El caso de uso «${useCase.slug.es}» apunta al sector «${useCase.solution}», que no existe en SOLUTIONS.`
      )
    }
    return { solution, useCase }
  })
