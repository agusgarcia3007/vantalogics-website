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
 * real estate developers», «corrección automática de exámenes con IA»—, que es lo que
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
  // Real estate developers
  // ────────────────────────────────────────────────────────────────────────
  {
    solution: "real-estate-developers",
    slug: {
      es: "agente-de-whatsapp",
      en: "whatsapp-agent",
      ar: "whatsapp-agent",
    },
    title: {
      es: "Agente de WhatsApp para real estate developers",
      en: "WhatsApp agent for real estate developers",
      ar: "وكيل واتساب للمطوّرين العقاريين",
    },
    description: {
      es: "Cómo funciona un agente de IA en el WhatsApp de un real estate developer: responde en minutos, califica por capacidad de pago y agenda la visita al showroom.",
      en: "How an AI agent works on a real estate developer's WhatsApp: replies in minutes, qualifies by payment capacity against live unit availability and books the showroom visit.",
      ar: "كيف يعمل وكيل ذكاء اصطناعي على واتساب مطوّر عقاري: يردّ خلال دقائق، ويصفّي بحسب القدرة على السداد مقابل التوافر الفعلي، ويحجز زيارة صالة العرض.",
    },
    answer: {
      es: "Un agente de WhatsApp para un real estate developer contesta cada consulta en menos de dos minutos, a cualquier hora, averigua capacidad de pago, anticipo, plazo y si es usuario final o inversor, cruza eso contra las unidades disponibles del proyecto y ofrece horario de visita al showroom. Precio final y reserva no los toca.",
      en: "A WhatsApp agent for a real estate developer answers every enquiry in under two minutes, at any hour, establishes payment capacity, down payment, timeline and whether the lead is an end user or an investor, matches that against available units in the project and offers showroom visit times. It never touches final price or reservation.",
      ar: "وكيل واتساب لمطوّر عقاري يردّ على كل استفسار في أقل من دقيقتين وفي أي ساعة، ويحدّد القدرة على السداد والدفعة الأولى والمهلة وما إذا كان العميل مستخدمًا نهائيًا أم مستثمرًا، ويطابق ذلك مع الوحدات المتاحة في المشروع، ويعرض مواعيد لزيارة صالة العرض. ولا يقترب من السعر النهائي ولا من الحجز.",
    },
    intro: {
      es: [
        "El WhatsApp de un developer no es un canal de atención: es donde cae la mayor parte de la campaña de lanzamiento, y cae a las once de la noche, el domingo y en el medio de una visita al showroom. El asesor contesta cuando puede, que suele ser varias horas después, y para entonces la persona ya escribió a otros tres proyectos.",
        "El problema no es la falta de ganas de contestar. Es que responder bien exige mirar qué unidades quedan, cruzarlas con lo que la persona puede pagar y abrir la agenda del showroom, y eso son tres pantallas que nadie abre desde el teléfono a las once de la noche. El agente hace exactamente esas tres cosas y deja al asesor el trabajo que sí requiere estar presente.",
      ],
      en: [
        "A developer's WhatsApp isn't a support channel: it's where most of the launch campaign lands, and it lands at eleven at night, on Sundays, and in the middle of a showroom visit. The salesperson replies when they can — usually several hours later — and by then the person has messaged three other projects.",
        "The problem isn't unwillingness to reply. It's that replying well means checking which units are left, matching them against what the person can pay and opening the showroom calendar — three screens nobody opens from a phone at eleven at night. The agent does exactly those three things and leaves the human the work that actually requires being there.",
      ],
      ar: [
        "واتساب المطوّر ليس قناة خدمة عملاء، بل هو المكان الذي يصبّ فيه معظم حملة الإطلاق، ويصبّ عند الحادية عشرة ليلًا، وفي عطلة نهاية الأسبوع، وفي منتصف زيارة لصالة العرض. يردّ البائع حين يستطيع، وغالبًا بعد ساعات، ويكون العميل حينها قد راسل ثلاثة مشاريع أخرى.",
        "والمشكلة ليست في عدم الرغبة في الرد، بل في أن الرد الجيد يستلزم مراجعة الوحدات المتبقية ومطابقتها بما يستطيع العميل دفعه وفتح مفكرة صالة العرض، وهي ثلاث شاشات لا يفتحها أحد من هاتفه عند الحادية عشرة ليلًا. الوكيل يؤدّي هذه الثلاثة بالضبط، ويترك للإنسان العملَ الذي يتطلب حضوره فعلًا.",
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
          es: "Sobre WhatsApp Business API, declarando en el primer mensaje que es un asistente. Si la consulta viene del aviso de un proyecto, arranca sabiendo cuál y en qué etapa está.",
          en: "Over the WhatsApp Business API, stating in the first message that it's an assistant. If the enquiry comes from a project ad, it starts knowing which project and what stage it's in.",
          ar: "عبر واجهة واتساب للأعمال، مع الإعلان في الرسالة الأولى أنه مساعد آلي. وإن جاء الاستفسار من إعلان مشروع، يبدأ وهو يعرف أي مشروع وفي أي مرحلة.",
        },
      },
      {
        title: {
          es: "Califica en la conversación, no con un formulario",
          en: "Qualifies in conversation, not with a form",
          ar: "يصفّي داخل المحادثة لا عبر نموذج",
        },
        detail: {
          es: "Capacidad de pago, anticipo disponible, plazo, si necesita crédito y si compra para vivir o para invertir. Pregunta de a una y se adapta a lo que la persona ya dijo sin repetirlo.",
          en: "Payment capacity, available down payment, timeline, whether they need a mortgage and whether they're buying to live in or to invest. It asks one at a time and adapts to what the person already said instead of repeating it.",
          ar: "القدرة على السداد والدفعة الأولى المتاحة والمهلة وهل يحتاج تمويلًا وهل يشتري للسكن أم للاستثمار. يسأل سؤالًا في كل مرة ويتكيّف مع ما قاله العميل دون تكراره.",
        },
      },
      {
        title: {
          es: "Cruza contra las unidades disponibles",
          en: "Matches against available units",
          ar: "يطابق مع الوحدات المتاحة",
        },
        detail: {
          es: "Consulta la disponibilidad en el momento y ofrece dos o tres tipologías que existen y están libres hoy, con el plan de pago publicado. Nunca una unidad reservada ni vendida.",
          en: "Queries availability in real time and offers two or three layouts that exist and are free today, with the published payment plan. Never a reserved or sold unit.",
          ar: "يستعلم عن التوافر لحظيًا ويعرض نموذجين أو ثلاثة موجودة ومتاحة اليوم، مع خطة السداد المنشورة. ولا يعرض أبدًا وحدة محجوزة أو مباعة.",
        },
      },
      {
        title: {
          es: "Agenda la visita al showroom o entrega el caso",
          en: "Books the showroom visit or hands the case over",
          ar: "يحجز زيارة صالة العرض أو يسلّم الحالة",
        },
        detail: {
          es: "Propone horarios de la agenda real del asesor y del showroom, confirma y recuerda. Si el interesado pide hablar con una persona, pide un descuento o empieza a negociar condiciones, el traspaso es inmediato y con el resumen de todo lo hablado.",
          en: "Proposes slots from the salesperson's and the showroom's real calendars, confirms and reminds. If the lead asks for a person, requests a discount or starts negotiating terms, the handoff is immediate and carries a summary of everything discussed.",
          ar: "يقترح مواعيد من المفكرة الحقيقية للبائع ولصالة العرض، ثم يؤكّد ويذكّر. وإن طلب المهتم التحدث إلى شخص، أو طلب خصمًا، أو بدأ التفاوض على الشروط، يتم التحويل فورًا ومعه ملخّص لكل ما دار.",
        },
      },
    ],
    measures: {
      es: [
        "Tiempo medio hasta la primera respuesta, por canal y por franja horaria.",
        "Porcentaje de consultas que terminan en visita al showroom agendada.",
        "Visitas a las que el interesado no se presenta.",
        "Consultas que el asesor tuvo que retomar porque el agente no alcanzó.",
      ],
      en: [
        "Median time to first response, by channel and time of day.",
        "Share of enquiries that end in a booked showroom visit.",
        "Visits the lead doesn't show up to.",
        "Enquiries a human had to pick up because the agent fell short.",
      ],
      ar: [
        "الوسيط الزمني للرد الأول، بحسب القناة والفترة من اليوم.",
        "نسبة الاستفسارات التي تنتهي بزيارة محجوزة لصالة العرض.",
        "الزيارات التي لا يحضرها المهتم.",
        "الاستفسارات التي اضطر بائع لاستلامها لأن الوكيل لم يكفِ.",
      ],
    },
    requires: {
      es: [
        "Una línea de WhatsApp Business API. La app de WhatsApp Business común no sirve para esto.",
        "La disponibilidad de unidades y la lista de precios en un sistema consultable, no en la planilla que alguien actualiza los viernes.",
        "La agenda del showroom y la de cada asesor accesibles, aunque sea sólo la disponibilidad.",
        "Una persona que reciba los traspasos en horario y sepa que van a llegar.",
      ],
      en: [
        "A WhatsApp Business API line. The regular WhatsApp Business app can't do this.",
        "Unit availability and the price list in a queryable system, not in the spreadsheet someone updates on Fridays.",
        "The showroom calendar and each salesperson's calendar accessible, even if only free/busy.",
        "A person who receives handoffs during business hours and knows they're coming.",
      ],
      ar: [
        "خط على واجهة واتساب للأعمال. تطبيق WhatsApp Business العادي لا يصلح لهذا.",
        "توافر الوحدات وقائمة الأسعار في نظام قابل للاستعلام، لا في جدول يحدّثه أحدهم أيام الجمعة.",
        "إتاحة مفكرة صالة العرض ومفكرة كل بائع، ولو بحالة المتاح/المشغول فقط.",
        "شخص يستلم التحويلات ضمن ساعات العمل ويعلم أنها ستصل.",
      ],
    },
    notThis: {
      es: [
        "Si la disponibilidad está desactualizada, el agente va a ofrecer unidades ya reservadas y va a quemar consultas más rápido de lo que las recupera. Primero se ordena eso.",
        "Fuera de un lanzamiento, el volumen de un solo proyecto chico no paga el proyecto: el asesor contesta más rápido que cualquier sistema.",
        "En productos de altísimo ticket con veinte unidades y venta por referidos, el vínculo desde el primer mensaje es el producto. Automatizarlo resta.",
      ],
      en: [
        "If availability is stale, the agent will offer units already reserved and burn enquiries faster than it recovers them. Fix that first.",
        "Outside a launch, the volume of a single small project doesn't pay for the build: a human replies faster than any system.",
        "In ultra-high-ticket products with twenty units sold through referrals, the relationship from the first message is the product. Automating it subtracts.",
      ],
      ar: [
        "إذا كان التوافر غير محدَّث، فسيعرض الوكيل وحدات محجوزة أصلًا ويحرق الاستفسارات أسرع مما يستعيدها. رتّب ذلك أولًا.",
        "خارج فترة الإطلاق، لا يسدّد حجم مشروع صغير واحد كلفة البناء: البائع يردّ أسرع من أي نظام.",
        "في المنتجات فائقة القيمة بعشرين وحدة تُباع بالإحالات، تكون العلاقة منذ الرسالة الأولى هي المنتج. وأتمتتها تنتقص منه.",
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
          en: "Yes, but it has to migrate to the WhatsApp Business API, and that migration disconnects the number from the app. If three salespeople currently reply from that number on their phones, the project includes moving them to a shared inbox. It's the operational change that draws the most resistance and it's worth planning from day one.",
          ar: "نعم، لكن ينبغي ترحيله إلى واجهة واتساب للأعمال، وهذا الترحيل يفصل الرقم عن التطبيق. فإن كان ثلاثة بائعين يردّون اليوم من ذلك الرقم عبر هواتفهم، فالمشروع يشمل نقلهم إلى صندوق وارد مشترك. وهو التغيير التشغيلي الأكثر إثارة للمقاومة، ويُستحسن التخطيط له من البداية.",
        },
      },
      {
        question: {
          es: "¿Qué pasa si el interesado pregunta algo que el agente no sabe?",
          en: "What if the lead asks something the agent doesn't know?",
          ar: "ماذا لو سأل المهتم عمّا لا يعرفه الوكيل؟",
        },
        answer: {
          es: "Lo dice y deriva. Un agente que inventa la fecha de entrega, la expensa estimada o los metros de un balcón genera un problema más caro que el que resuelve, así que está configurado para responder sólo con datos de la ficha oficial del proyecto y escalar todo lo demás con el contexto de la conversación.",
          en: "It says so and escalates. An agent that invents the delivery date, the estimated service charge or a balcony's square footage creates a more expensive problem than it solves, so it's configured to answer only from the official project record and route everything else with the conversation context attached.",
          ar: "يقولها ويحيل الأمر. فالوكيل الذي يختلق موعد التسليم أو رسوم الخدمات المقدّرة أو مساحة شرفة يصنع مشكلة أغلى مما يحلّ، لذلك يُضبط ليجيب فقط من البيانات الواردة في البطاقة الرسمية للمشروع، ويصعّد ما عدا ذلك مع سياق المحادثة.",
        },
      },
      {
        question: {
          es: "¿Baja la conversión decir que es un asistente?",
          en: "Does saying it's an assistant hurt conversion?",
          ar: "هل يضرّ الإفصاح بأنه مساعد آلي بمعدل التحويل؟",
        },
        answer: {
          es: "No, en la medida que resuelva. Lo que baja la conversión es tardar cuatro horas, ofrecer una unidad que ya se reservó o hacer diez preguntas antes de dar una sola respuesta útil. Además, en varias jurisdicciones declararlo es obligatorio, así que no es una decisión de marketing.",
          en: "Not as long as it resolves things. What hurts conversion is taking four hours, offering a unit that's already reserved, or asking ten questions before giving one useful answer. In several jurisdictions disclosure is also mandatory, so it isn't a marketing decision.",
          ar: "لا، ما دام يحلّ المسألة. الذي يضرّ التحويل هو التأخر أربع ساعات، أو عرض وحدة محجوزة أصلًا، أو طرح عشرة أسئلة قبل إعطاء إجابة مفيدة واحدة. كما أن الإفصاح إلزامي في عدة ولايات قضائية، فهو ليس قرارًا تسويقيًا.",
        },
      },
    ],
  },

  {
    solution: "real-estate-developers",
    slug: {
      es: "calificacion-de-leads",
      en: "lead-qualification",
      ar: "lead-qualification",
    },
    title: {
      es: "Calificación automática de leads con IA para real estate developers",
      en: "Automated lead qualification with AI for real estate developers",
      ar: "التصفية الآلية للعملاء المحتملين بالذكاء الاصطناعي للمطوّرين العقاريين",
    },
    description: {
      es: "Cómo se califica automáticamente un lead de un real estate developer: qué se pregunta, cómo se contrasta contra las unidades disponibles y qué hacer con el resto.",
      en: "How a real estate developer's lead gets qualified automatically: what to ask, how to contrast it against available units, and what to do with the 70% who won't buy now.",
      ar: "كيف يُصفّى العميل المحتمل لدى مطوّر عقاري آليًا: ماذا نسأل، وكيف نقارنه بالوحدات المتاحة، وماذا نفعل بنسبة 70% ممن لن يشتروا الآن.",
    },
    answer: {
      es: "Calificar un lead de un developer con IA es establecer cuatro cosas en conversación —capacidad de pago real, anticipo disponible, plazo y si compra para vivir o para invertir— y contrastarlas con las unidades que quedan. El resultado no es un puntaje: es una decisión de ruteo. Al asesor le llega sólo lo que puede reservar este mes.",
      en: "Qualifying a developer's lead with AI means establishing four things in conversation — real payment capacity, available down payment, timeline and whether they're buying to live in or to invest — and contrasting them with the units still available. The output isn't a score: it's a routing decision. The salesperson only gets what they can reserve this month.",
      ar: "تصفية عميل محتمل لدى مطوّر عقاري بالذكاء الاصطناعي تعني تحديد أربعة أمور داخل المحادثة — القدرة الفعلية على السداد، والدفعة الأولى المتاحة، والمهلة، وهل يشتري للسكن أم للاستثمار — ومقارنتها بالوحدات المتبقية. والنتيجة ليست درجة رقمية بل قرار توجيه: لا يصل البائع إلا ما يمكنه حجزه هذا الشهر.",
    },
    intro: {
      es: [
        "En un lanzamiento con volumen, entre seis y ocho de cada diez consultas no van a comprar en los próximos meses. El problema es que averiguar cuáles son cuesta una conversación completa, y esa conversación la está teniendo la persona que debería estar cerrando reservas en el showroom.",
        "La consecuencia visible es un CRM lleno de contactos sin dato, con etiquetas que cada asesor puso a su criterio, sobre el cual no se puede decidir ni el mix de tipologías del próximo proyecto. La calificación automática existe para que ese dato entre completo y con el mismo formato desde la primera conversación, no para reemplazar el criterio del asesor.",
      ],
      en: [
        "In a high-volume launch, six to eight of every ten enquiries won't buy in the coming months. The problem is that finding out which ones costs a full conversation — and that conversation is being had by the person who should be closing reservations in the showroom.",
        "The visible consequence is a CRM full of contacts with no data, tagged however each salesperson felt like tagging them, on which you can't even decide the unit mix for the next project. Automated qualification exists so that data arrives complete and in the same shape from the first conversation, not to replace the salesperson's judgement.",
      ],
      ar: [
        "في إطلاق ذي حجم استفسارات كبير، ستة إلى ثمانية من كل عشرة استفسارات لن تُفضي إلى شراء في الأشهر القادمة. والمشكلة أن معرفة أيّها يكلّف محادثة كاملة، وهذه المحادثة يجريها الشخص الذي يُفترض أن يُغلق الحجوزات في صالة العرض.",
        "والنتيجة الظاهرة نظام CRM مملوء بجهات اتصال بلا بيانات، بوسوم وضعها كل بائع على هواه، ولا يمكن أن يُبنى عليها حتى قرار مزيج الوحدات في المشروع القادم. والتصفية الآلية موجودة كي تدخل هذه البيانات كاملة وبالشكل نفسه منذ المحادثة الأولى، لا لتحلّ محل خبرة البائع.",
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
          es: "Portales, formulario del sitio, WhatsApp, Instagram, campañas de lanzamiento y llamadas perdidas caen en el mismo flujo con la misma ficha. Sin esto, cada canal califica distinto y no se puede comparar qué campaña trae compradores.",
          en: "Portals, the site form, WhatsApp, Instagram, launch campaigns and missed calls land in the same flow with the same record. Without this, each channel qualifies differently and you can't compare which campaign brings actual buyers.",
          ar: "تصبّ البوابات العقارية ونموذج الموقع وواتساب وإنستغرام وحملات الإطلاق والمكالمات الفائتة في المسار نفسه وببطاقة موحّدة. من دون ذلك تختلف التصفية بين قناة وأخرى ويتعذّر معرفة أي حملة تجلب مشترين فعليين.",
        },
      },
      {
        title: {
          es: "Se establecen los cuatro datos que deciden",
          en: "The four deciding facts get established",
          ar: "تحديد البيانات الأربعة الحاسمة",
        },
        detail: {
          es: "Capacidad de pago —y si es con crédito, en qué etapa está—, anticipo disponible, plazo de mudanza o de inversión, y si compra para vivir o para alquilar. Preguntados en el orden que la conversación permite, no en el orden del formulario.",
          en: "Payment capacity — and if it's mortgage-backed, what stage it's at — available down payment, moving or investment horizon, and whether they're buying to live in or to rent out. Asked in the order the conversation allows, not the order of the form.",
          ar: "القدرة على السداد — وإن كانت بتمويل عقاري ففي أي مرحلة — والدفعة الأولى المتاحة ومهلة الانتقال أو الاستثمار، وهل يشتري للسكن أم للتأجير. تُطرح بالترتيب الذي تسمح به المحادثة لا بترتيب النموذج.",
        },
      },
      {
        title: {
          es: "Se contrasta contra las unidades, no contra una tabla",
          en: "It's contrasted against the units, not a table",
          ar: "المقارنة تتم مع الوحدات لا مع جدول",
        },
        detail: {
          es: "Un lead con capacidad para una tipología agotada vale menos que uno más modesto para lo que sobra en los pisos altos. La calificación mira lo que el developer puede efectivamente vender hoy.",
          en: "A lead who can afford a sold-out layout is worth less than a more modest one for what's sitting unsold on the upper floors. Qualification looks at what the developer can actually sell today.",
          ar: "عميل يقدر على نموذج نفدت وحداته يساوي أقل من عميل أكثر تواضعًا لما يفيض في الطوابق العليا. التصفية تنظر إلى ما يستطيع المطوّر بيعه اليوم فعلًا.",
        },
      },
      {
        title: {
          es: "Se rutea, y el resto no se descarta",
          en: "It's routed, and the rest isn't discarded",
          ar: "التوجيه، ولا يُهمل الباقي",
        },
        detail: {
          es: "Lo caliente va al asesor con el resumen. Lo tibio entra a una secuencia de seguimiento con avisos de avance de obra y cambio de etapa de precio. Lo frío queda en la base con sus criterios guardados, que es de donde sale el próximo lanzamiento.",
          en: "Hot goes to a salesperson with a summary. Warm enters a follow-up sequence with construction-milestone and price-step alerts. Cold stays in the database with its criteria stored — which is where the next launch comes from.",
          ar: "الساخن يذهب إلى بائع مع الملخّص. والفاتر يدخل تسلسل متابعة مع تنبيهات بتقدّم البناء وبتغيّر مرحلة السعر. والبارد يبقى في القاعدة بمعاييره المحفوظة، ومنه يخرج الإطلاق القادم.",
        },
      },
    ],
    measures: {
      es: [
        "Porcentaje de leads con los cuatro datos completos, contra el histórico.",
        "Visitas al showroom agendadas por cada cien consultas entrantes.",
        "Horas de asesor dedicadas a leads que no calificaban.",
        "Reservas que salieron de un lead calificado como tibio meses antes.",
      ],
      en: [
        "Share of leads with all four facts complete, against the baseline.",
        "Showroom visits booked per hundred incoming enquiries.",
        "Sales hours spent on leads that didn't qualify.",
        "Reservations that came from a lead marked warm months earlier.",
      ],
      ar: [
        "نسبة العملاء المحتملين المكتملي البيانات الأربعة، مقارنةً بالخط الأساس.",
        "زيارات صالة العرض المحجوزة لكل مئة استفسار وارد.",
        "ساعات البائعين المصروفة على عملاء لم يجتازوا التصفية.",
        "الحجوزات التي جاءت من عميل صُنّف فاترًا قبل أشهر.",
      ],
    },
    requires: {
      es: [
        "Un CRM único. Si cada asesor tiene su propia planilla, el proyecto empieza por ahí.",
        "Criterios de calificación escritos y acordados por el equipo comercial.",
        "Acceso a la disponibilidad de unidades en tiempo real, con estado y precio actualizados.",
        "Definición de qué pasa con el lead tibio: sin secuencia de seguimiento, la calificación sólo sirve para descartar.",
      ],
      en: [
        "A single CRM. If each salesperson keeps their own spreadsheet, the project starts there.",
        "Qualification criteria written down and agreed by the sales team.",
        "Real-time access to unit availability, with status and price current.",
        "A defined path for warm leads: without a follow-up sequence, qualification only serves to discard.",
      ],
      ar: [
        "نظام CRM واحد. فإن كان لكل بائع جدوله الخاص، فالمشروع يبدأ من هناك.",
        "معايير تصفية مكتوبة ومتفق عليها من الفريق التجاري.",
        "الوصول إلى توافر الوحدات لحظيًا، بحالة وسعر محدَّثين.",
        "تحديد مصير العميل الفاتر: بلا تسلسل متابعة، لا تصلح التصفية إلا للاستبعاد.",
      ],
    },
    notThis: {
      es: [
        "Si el equipo comercial no está de acuerdo en qué es un lead bueno, ningún sistema lo va a resolver. La discusión es de negocio y va antes.",
        "Si el developer vende todo por referidos y red de brokers, y recibe pocas consultas frías, calificar automáticamente agrega fricción a relaciones que ya venían calificadas.",
        "Si nadie va a trabajar la cola de leads tibios entre un lanzamiento y el siguiente, la calificación sólo va a producir un informe más que nadie mira.",
      ],
      en: [
        "If the sales team doesn't agree on what a good lead is, no system will settle it. That discussion is a business one and comes first.",
        "If the developer sells entirely through referrals and a broker network and gets few cold enquiries, automated qualification adds friction to relationships that arrived qualified.",
        "If nobody is going to work the warm-lead queue between one launch and the next, qualification will only produce one more report nobody reads.",
      ],
      ar: [
        "إذا لم يتفق الفريق التجاري على ما هو العميل الجيد، فلن يحسم ذلك أي نظام. هذا نقاش تجاري ويأتي أولًا.",
        "إذا كان المطوّر يبيع بالكامل عبر الإحالات وشبكة الوسطاء ويتلقى استفسارات باردة قليلة، فالتصفية الآلية تضيف احتكاكًا إلى علاقات وصلت مُصفّاة أصلًا.",
        "إذا لم يعمل أحد على طابور العملاء الفاترين بين إطلاق وآخر، فلن تنتج التصفية سوى تقرير إضافي لا يقرأه أحد.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿No molesta al interesado que le pregunten la capacidad de pago de entrada?",
          en: "Doesn't asking about payment capacity up front annoy the lead?",
          ar: "ألا يزعج السؤالُ عن القدرة على السداد مبكرًا العميلَ المهتم؟",
        },
        answer: {
          es: "Molesta si se pregunta primero y en seco. Funciona cuando se pregunta después de haber dado algo útil —una tipología concreta, el plan de pago publicado— y en términos de rango, no de cifra exacta. En la práctica la mayoría lo contesta si entiende para qué sirve.",
          en: "It annoys people if it's the first thing asked, flat. It works when it's asked after giving something useful — a specific layout, the published payment plan — and framed as a range rather than an exact figure. In practice most people answer once they see what it's for.",
          ar: "يزعج إن كان أول ما يُسأل وبصيغة جافة. ويصلح حين يُطرح بعد تقديم شيء مفيد — نموذج وحدة محدّد أو خطة السداد المنشورة — وبصيغة نطاق لا رقم دقيق. وعمليًا يجيب معظم الناس متى فهموا الغرض منه.",
        },
      },
      {
        question: {
          es: "¿El puntaje reemplaza el criterio del asesor?",
          en: "Does the score replace the salesperson's judgement?",
          ar: "هل تحلّ الدرجة محل خبرة البائع؟",
        },
        answer: {
          es: "No, y no entregamos un puntaje suelto. Lo que llega al asesor son los cuatro datos con la frase textual del interesado que los respalda, para que pueda no estar de acuerdo. Un número del uno al diez sin evidencia es imposible de auditar y el equipo deja de confiar en él a la tercera semana.",
          en: "No, and we don't hand over a bare score. What reaches the salesperson is the four facts, each with the lead's own words backing it, so they can disagree. A one-to-ten number with no evidence can't be audited and the team stops trusting it by week three.",
          ar: "لا، ولا نسلّم درجة مجرّدة. ما يصل إلى البائع هو البيانات الأربعة، ومع كل منها العبارة الحرفية للعميل التي تسندها، ليتمكّن من الاعتراض. فرقمٌ من واحد إلى عشرة بلا شواهد لا يمكن تدقيقه، ويكفّ الفريق عن الثقة به في الأسبوع الثالث.",
        },
      },
      {
        question: {
          es: "¿Cuánto tarda en verse el efecto?",
          en: "How long before the effect shows?",
          ar: "متى يظهر الأثر؟",
        },
        answer: {
          es: "El dato completo se ve en la primera semana: es el porcentaje de fichas con los cuatro campos. El efecto sobre reservas tarda un ciclo de venta entero, que en preventa son entre tres y nueve meses, y conviene decirlo antes de empezar para no medir demasiado pronto.",
          en: "Complete data shows in week one: it's the share of records with all four fields. The effect on reservations takes a full sales cycle — three to nine months in pre-construction — and it's worth saying so up front so nobody measures too early.",
          ar: "اكتمال البيانات يظهر في الأسبوع الأول: وهو نسبة البطاقات المستوفية للحقول الأربعة. أما الأثر في الحجوزات فيستغرق دورة بيع كاملة، أي ثلاثة إلى تسعة أشهر في البيع على الخارطة، ويُستحسن قول ذلك مسبقًا كي لا يقيس أحدٌ مبكرًا أكثر من اللازم.",
        },
      },
    ],
  },

  {
    solution: "real-estate-developers",
    slug: {
      es: "coordinacion-de-visitas",
      en: "unit-visit-coordination",
      ar: "unit-visit-coordination",
    },
    title: {
      es: "Coordinación de visitas a las unidades con IA",
      en: "AI unit visit coordination for real estate developers",
      ar: "تنسيق زيارات الوحدات بالذكاء الاصطناعي للمطوّرين العقاريين",
    },
    description: {
      es: "Cómo se automatiza la coordinación de visitas de un real estate developer: showroom, departamento modelo y obra, con agenda real, confirmación y recordatorio, sin sobreturnos.",
      en: "How a real estate developer's visit coordination gets automated: showroom, model unit and site, against the real calendar, with confirmation and reminders and no double-bookings.",
      ar: "كيف يُؤتمت تنسيق زيارات مطوّر عقاري: صالة العرض والوحدة النموذجية والموقع، وفق مفكرة حقيقية، مع التأكيد والتذكير ودون حجوزات متضاربة.",
    },
    answer: {
      es: "Coordinar visitas a las unidades con IA es cruzar tres calendarios que hoy nadie cruza: la agenda del asesor, la disponibilidad del showroom o de la unidad —obra, permisos de ingreso, llaves— y el tiempo de traslado entre visitas. El agente propone horarios viables, confirma el día anterior y reofrece el hueco cuando alguien cancela.",
      en: "Coordinating unit visits with AI means crossing three calendars nobody crosses today: the salesperson's schedule, the showroom's or unit's availability — site works, access permits, keys — and travel time between visits. The agent proposes workable slots, confirms the day before and re-offers the gap when someone cancels.",
      ar: "تنسيق زيارات الوحدات بالذكاء الاصطناعي هو تقاطع ثلاثة تقاويم لا يقاطعها أحد اليوم: مفكرة البائع، وتوافر صالة العرض أو الوحدة — أعمال الموقع وتصاريح الدخول والمفاتيح — وزمن التنقل بين الزيارات. يقترح الوكيل مواعيد قابلة للتنفيذ، ويؤكّد قبل يوم، ويعيد عرض الفراغ حين يلغي أحدهم.",
    },
    intro: {
      es: [
        "Agendar una visita parece trivial hasta que se cuenta cuántas condiciones tiene que cumplir: que el asesor esté libre, que el showroom no esté tomado por otra tanda, que la obra permita el ingreso ese día y que quede tiempo de llegar desde la visita anterior. Por eso se resuelve con seis mensajes, dos llamadas y una planilla que alguien edita a mano.",
        "El costo real no es el tiempo de coordinar: es la visita a la que el interesado no se presenta —entre el 20% y el 40% en la mayoría de los proyectos— y el hueco de una hora en la agenda del asesor que ya no se llena con nadie.",
      ],
      en: [
        "Booking a visit looks trivial until you count the conditions it has to satisfy: the salesperson free, the showroom not taken by another group, the site allowing access that day, and enough time to get there from the previous visit. That's why it takes six messages, two phone calls and a spreadsheet somebody edits by hand.",
        "The real cost isn't coordination time: it's the visit the lead doesn't show up to — 20–40% in most projects — and the resulting hour-long hole in the salesperson's day that now gets filled by nobody.",
      ],
      ar: [
        "يبدو حجز الزيارة أمرًا بسيطًا حتى تُحصى الشروط التي عليه استيفاؤها: أن يكون البائع متفرغًا، وألّا تكون صالة العرض مشغولة بمجموعة أخرى، وأن يسمح الموقع بالدخول ذلك اليوم، وأن يتبقّى وقت للوصول من الزيارة السابقة. ولهذا يستغرق ست رسائل ومكالمتين وجدولًا يحرّره أحدهم يدويًا.",
        "والتكلفة الحقيقية ليست وقت التنسيق، بل الزيارة التي لا يحضرها المهتم — بين 20% و40% في معظم المشاريع — والفراغ الناتج بساعة كاملة في يوم البائع لا يملؤه أحد بعد ذلك.",
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
          es: "Se resuelven las condiciones de acceso",
          en: "Access conditions get resolved",
          ar: "تُحلّ شروط الدخول",
        },
        detail: {
          es: "Aviso a obra con la antelación pactada, permiso de ingreso, casco y calzado si hace falta, y control de dónde están las llaves de la unidad. Es la parte que se olvida y la que hace fracasar la visita en la puerta.",
          en: "Notice to the site with the agreed lead time, the access permit, hard hat and footwear if required, and a check on where the unit keys are. It's the part that gets forgotten and the one that kills the visit at the door.",
          ar: "إشعار الموقع بالمهلة المتفق عليها، وتصريح الدخول، والخوذة والحذاء إن لزما، والتحقق من مكان مفاتيح الوحدة. وهو الجزء الذي يُنسى، والذي يُفشل الزيارة عند الباب.",
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
          es: "El horario liberado se ofrece a los interesados que pidieron esa tipología o una parecida, por orden. Es el único paso que convierte una cancelación en una visita.",
          en: "The freed slot is offered, in order, to leads who asked about that layout or a similar one. It's the only step that turns a cancellation into a visit.",
          ar: "يُعرض الموعد المتحرّر بالترتيب على المهتمين الذين سألوا عن ذلك النموذج أو ما يشبهه. وهي الخطوة الوحيدة التي تحوّل الإلغاء إلى زيارة.",
        },
      },
    ],
    measures: {
      es: [
        "Tasa de ausencia a visitas, antes y después.",
        "Mensajes necesarios para cerrar una visita, de punta a punta.",
        "Huecos por cancelación que se volvieron a llenar.",
        "Visitas fallidas por causa del acceso: llaves, permiso de obra, showroom ocupado.",
      ],
      en: [
        "Visit no-show rate, before and after.",
        "Messages needed to close a visit, end to end.",
        "Cancellation gaps that got refilled.",
        "Failed visits caused by access: keys, site permit, showroom taken.",
      ],
      ar: [
        "نسبة عدم الحضور للزيارات، قبل وبعد.",
        "عدد الرسائل اللازمة لإتمام حجز زيارة، من البداية إلى النهاية.",
        "فراغات الإلغاء التي أُعيد ملؤها.",
        "الزيارات الفاشلة بسبب الدخول: المفاتيح أو تصريح الموقع أو انشغال صالة العرض.",
      ],
    },
    requires: {
      es: [
        "La agenda de los asesores y la del showroom en un calendario compartido, aunque sólo se exponga la disponibilidad.",
        "Escrito en algún lado: quién autoriza el ingreso a obra y con cuánta antelación.",
        "Una regla de tiempo mínimo entre visitas, acordada con el equipo.",
        "La lista de interesados por tipología, para poder reofrecer los huecos.",
      ],
      en: [
        "Salesperson and showroom calendars in a shared system, even if only free/busy is exposed.",
        "Written down somewhere: who authorizes site access and with how much notice.",
        "A minimum-time-between-visits rule, agreed with the team.",
        "The interested-lead list per layout, so gaps can be re-offered.",
      ],
      ar: [
        "مفكرات البائعين ومفكرة صالة العرض في تقويم مشترك، ولو بإظهار حالة المتاح/المشغول فقط.",
        "مكتوبًا في مكان ما: من يأذن بدخول الموقع وبأي مهلة.",
        "قاعدة حدّ أدنى للوقت بين الزيارات، متفق عليها مع الفريق.",
        "قائمة المهتمين بكل نموذج وحدة، لإتاحة إعادة عرض الفراغات.",
      ],
    },
    notThis: {
      es: [
        "Si los asesores no usan calendario, esto no se puede construir. Un agente que agenda sobre una agenda inventada genera sobreturnos y pierde la confianza del equipo en la primera semana.",
        "Si todas las visitas son al mismo showroom con horario fijo y sin cupo, la coordinación ya es simple y el retorno está en otro lado.",
        "En proyectos de veinte unidades donde el asesor sabe de memoria toda la disponibilidad, el sistema agrega un paso sin quitar ninguno.",
      ],
      en: [
        "If salespeople don't use a calendar, this can't be built. An agent booking against an imaginary calendar creates double-bookings and loses the team's trust in week one.",
        "If every visit is to the same showroom on fixed hours with no capacity limit, coordination is already simple and the return is elsewhere.",
        "In twenty-unit projects where the salesperson knows all availability by heart, the system adds a step without removing one.",
      ],
      ar: [
        "إذا لم يستخدم البائعون تقويمًا، فلا يمكن بناء هذا. ووكيلٌ يحجز على مفكرة متخيَّلة يُنتج تضاربًا ويفقد ثقة الفريق في الأسبوع الأول.",
        "إذا كانت كل الزيارات إلى صالة العرض نفسها بمواعيد ثابتة وبلا سقف للسعة، فالتنسيق بسيط أصلًا والعائد في مكان آخر.",
        "في مشاريع من عشرين وحدة حيث يحفظ البائع كل التوافر عن ظهر قلب، يضيف النظام خطوة دون أن يحذف أخرى.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Puede reprogramar sin consultar al asesor?",
          en: "Can it reschedule without asking the salesperson?",
          ar: "هل يستطيع إعادة الجدولة دون مراجعة البائع؟",
        },
        answer: {
          es: "Dentro de los límites que el asesor definió: horarios propios, tiempo mínimo entre visitas y proyectos compatibles el mismo día. Fuera de eso pregunta. La regla es que el agente puede llenar el calendario pero no puede romperlo, y ese límite se prueba antes de salir a producción.",
          en: "Within the limits the salesperson set: their own hours, minimum time between visits and projects that are compatible on the same day. Outside those, it asks. The rule is the agent can fill the calendar but can't break it, and that boundary is tested before going live.",
          ar: "ضمن الحدود التي وضعها البائع: ساعاته الخاصة، والحد الأدنى للوقت بين الزيارات، والمشاريع المتوافقة في اليوم نفسه. وخارج ذلك يسأل. والقاعدة أن الوكيل يستطيع ملء التقويم لا كسره، ويُختبر هذا الحدّ قبل الإطلاق.",
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
          es: "¿Sirve para un fin de semana de lanzamiento con muchos interesados a la vez?",
          en: "Does it work for a launch weekend with many leads at once?",
          ar: "هل يصلح لعطلة إطلاق بعدد كبير من المهتمين في وقت واحد؟",
        },
        answer: {
          es: "Sí, y ahí el uso es distinto: en vez de agendar uno a uno, arma tandas por franja y controla el cupo del showroom. Es el caso donde más se nota, porque la alternativa manual es una planilla que dos personas editan al mismo tiempo.",
          en: "Yes, and the use is different there: instead of booking one by one, it forms batches per time slot and manages showroom capacity. It's the case where the difference is most visible, because the manual alternative is a spreadsheet two people edit simultaneously.",
          ar: "نعم، والاستخدام هناك مختلف: بدل الحجز فردًا فردًا، يشكّل مجموعات لكل فترة زمنية ويضبط سعة صالة العرض. وهي الحالة التي يظهر فيها الفرق أوضح، لأن البديل اليدوي جدول بيانات يحرّره شخصان في آن واحد.",
        },
      },
    ],
  },

  {
    solution: "real-estate-developers",
    slug: {
      es: "centralizacion-de-datos",
      en: "data-centralization",
      ar: "data-centralization",
    },
    title: {
      es: "Centralización de planillas y sistemas para real estate developers",
      en: "Spreadsheet and systems centralization for real estate developers",
      ar: "مركزة الجداول والأنظمة للمطوّرين العقاريين",
    },
    description: {
      es: "Cómo se centralizan las planillas de unidades, el CRM, el sistema de obra y el correo de un real estate developer para que el dato entre una sola vez.",
      en: "How a real estate developer's unit spreadsheets, CRM, construction system and inbox get centralized so data is entered once and nobody copies it by hand.",
      ar: "كيف تُمركَز جداول الوحدات ونظام CRM ونظام الإنشاء وبريد المطوّر العقاري لتُدخل البيانات مرة واحدة ولا ينسخها أحد يدويًا.",
    },
    answer: {
      es: "Centralizar los datos de un developer es dejar de tener tres versiones del mismo número. Disponibilidad, precios, estados de reserva y avance de obra se consolidan en una fuente única, el CRM y el sistema de obra se integran, y los correos de rutina se arman con ese dato. El resultado es que nadie vuelve a copiar y pegar.",
      en: "Centralizing a developer's data means no longer having three versions of the same number. Availability, pricing, reservation statuses and construction progress consolidate into a single source, the CRM and the construction system get integrated, and routine emails are drafted from that data. The result is that nobody copy-pastes again.",
      ar: "مركزة بيانات المطوّر تعني ألّا تبقى ثلاث نسخ من الرقم نفسه. يُدمج التوافر والأسعار وحالات الحجز وتقدّم البناء في مصدر واحد، ويُربط نظام CRM بنظام الإنشاء، وتُصاغ رسائل البريد الروتينية من تلك البيانات. والنتيجة أن أحدًا لا يعود إلى النسخ واللصق.",
    },
    intro: {
      es: [
        "En un developer el mismo número vive en tres lugares: la planilla de unidades que actualiza administración, el CRM donde el asesor anota lo que se acordó, y el sistema de la constructora. Cuando los tres no coinciden —y nunca coinciden del todo— la discusión no es técnica: es un asesor que ofreció una unidad que ya estaba reservada.",
        "El trabajo de mantener eso alineado es real y no aparece en ningún organigrama. Alguien exporta, alguien pega, alguien manda el correo con el estado semanal, alguien rehace el reporte para la reunión de directorio. Son horas de gente cara haciendo copy-paste, y cada paso manual es un lugar donde el dato se rompe.",
      ],
      en: [
        "At a developer the same number lives in three places: the unit spreadsheet admin updates, the CRM where the salesperson records what was agreed, and the builder's system. When the three don't match — and they never fully match — the argument isn't technical: it's a salesperson who offered a unit that was already reserved.",
        "The work of keeping that aligned is real and appears on no org chart. Someone exports, someone pastes, someone sends the weekly status email, someone rebuilds the report for the board meeting. Those are hours of expensive people copy-pasting, and every manual step is a place where the data breaks.",
      ],
      ar: [
        "لدى المطوّر يعيش الرقم نفسه في ثلاثة أماكن: جدول الوحدات الذي تحدّثه الإدارة، ونظام CRM حيث يدوّن البائع ما اتُّفق عليه، ونظام المقاول. وحين لا تتطابق الثلاثة — وهي لا تتطابق تمامًا أبدًا — لا يكون الخلاف تقنيًا، بل بائعًا عرض وحدة كانت محجوزة أصلًا.",
        "والعمل اللازم لإبقائها متسقة عمل حقيقي لا يظهر في أي هيكل تنظيمي. أحدهم يصدّر، وآخر يلصق، وثالث يرسل بريد الحالة الأسبوعية، ورابع يعيد بناء التقرير لاجتماع مجلس الإدارة. ساعات من أشخاص باهظي الكلفة يمارسون النسخ واللصق، وكل خطوة يدوية موضعٌ تنكسر فيه البيانات.",
      ],
    },
    steps: [
      {
        title: {
          es: "Se mapea dónde vive cada dato",
          en: "Where each piece of data lives gets mapped",
          ar: "رسم خريطة لمكان كل بيانات",
        },
        detail: {
          es: "Qué planilla, qué sistema, qué casilla, quién lo actualiza y con qué frecuencia. Medio día de trabajo que casi siempre encuentra dos fuentes que nadie sabía que competían.",
          en: "Which spreadsheet, which system, which inbox, who updates it and how often. Half a day of work that almost always turns up two sources nobody knew were competing.",
          ar: "أي جدول، وأي نظام، وأي صندوق بريد، ومن يحدّثه وبأي وتيرة. نصف يوم عمل يكشف غالبًا مصدرين لم يعلم أحد أنهما يتنافسان.",
        },
      },
      {
        title: {
          es: "Se elige una fuente de verdad por dato",
          en: "One source of truth is chosen per field",
          ar: "اختيار مصدر حقيقة واحد لكل بيان",
        },
        detail: {
          es: "Una sola, y explícita: la disponibilidad manda desde acá, el precio desde allá. Las demás pasan a ser copias de lectura. Es una decisión de negocio y va antes de escribir una línea de código.",
          en: "One, and explicit: availability is authoritative here, pricing there. The rest become read-only copies. It's a business decision and it comes before writing a line of code.",
          ar: "واحد فقط ومعلن: التوافر مرجعه هنا، والسعر مرجعه هناك. وما عداهما يصبح نسخًا للقراءة فقط. قرار تجاري يسبق كتابة أي سطر برمجي.",
        },
      },
      {
        title: {
          es: "Se integra lo que tiene API y se lee lo que no",
          en: "What has an API gets integrated, what doesn't gets read",
          ar: "ما له واجهة برمجية يُدمج، وما ليس له يُقرأ",
        },
        detail: {
          es: "El CRM se conecta; la planilla de Google o el Excel que exporta el sistema de obra se leen con un lector propio. No hace falta que todo tenga API para que el dato deje de copiarse a mano.",
          en: "The CRM gets connected; the Google Sheet or the Excel the construction system exports gets read by a purpose-built reader. Not everything needs an API for the data to stop being copied by hand.",
          ar: "يُربط نظام CRM؛ ويُقرأ جدول Google أو ملف Excel الذي يصدّره نظام الإنشاء عبر قارئ مخصّص. فليس ضروريًا أن يكون لكل شيء واجهة برمجية كي تتوقف البيانات عن النسخ اليدوي.",
        },
      },
      {
        title: {
          es: "Los correos y reportes de rutina se arman solos",
          en: "Routine emails and reports draft themselves",
          ar: "رسائل البريد والتقارير الروتينية تُصاغ ذاتيًا",
        },
        detail: {
          es: "Estado semanal a dirección, actualización a brokers, pedido de documentación al comprador, recordatorio de cuota. Se generan del dato consolidado; los que tienen consecuencia se aprueban antes de salir.",
          en: "Weekly status to management, broker updates, document requests to the buyer, instalment reminders. They're generated from the consolidated data; the ones with consequences get approved before sending.",
          ar: "الحالة الأسبوعية للإدارة، وتحديثات الوسطاء، وطلب المستندات من المشتري، وتذكير الأقساط. تُولَّد من البيانات المدمجة؛ وما له تبعات يُعتمد قبل الإرسال.",
        },
      },
    ],
    measures: {
      es: [
        "Horas por semana dedicadas a exportar, pegar y rehacer reportes.",
        "Discrepancias detectadas entre la planilla y el CRM, por mes.",
        "Unidades ofrecidas que ya estaban reservadas.",
        "Tiempo desde que cambia un estado hasta que el equipo comercial lo ve.",
      ],
      en: [
        "Hours per week spent exporting, pasting and rebuilding reports.",
        "Discrepancies found between the spreadsheet and the CRM, per month.",
        "Units offered that were already reserved.",
        "Time from a status changing to the sales team seeing it.",
      ],
      ar: [
        "الساعات الأسبوعية المصروفة على التصدير واللصق وإعادة بناء التقارير.",
        "التعارضات المرصودة بين الجدول ونظام CRM، شهريًا.",
        "الوحدات المعروضة وهي محجوزة أصلًا.",
        "الزمن من تغيّر الحالة حتى يراه الفريق التجاري.",
      ],
    },
    requires: {
      es: [
        "Una decisión tomada sobre qué sistema manda para cada dato. Sin eso el proyecto se traba en la primera semana.",
        "Acceso de lectura a las planillas, al CRM y al sistema de obra o ERP.",
        "Un dueño del dato del lado del cliente: alguien que pueda decir «este número es el correcto».",
        "Definición de qué correos salen solos y cuáles necesitan aprobación.",
      ],
      en: [
        "A decision already made about which system is authoritative for each field. Without it the project stalls in week one.",
        "Read access to the spreadsheets, the CRM and the construction system or ERP.",
        'A data owner on the client side: someone who can say "this is the correct number".',
        "A definition of which emails go out on their own and which need approval.",
      ],
      ar: [
        "قرار متّخذ بشأن أي نظام هو المرجع لكل بيان. بدونه يتعثّر المشروع في الأسبوع الأول.",
        "صلاحية قراءة للجداول ولنظام CRM ولنظام الإنشاء أو ERP.",
        "مالك للبيانات لدى العميل: شخص يستطيع أن يقول «هذا هو الرقم الصحيح».",
        "تحديد أي رسائل تُرسل تلقائيًا وأيها تحتاج اعتمادًا.",
      ],
    },
    notThis: {
      es: [
        "Si nadie del lado del cliente puede decidir cuál es la fuente de verdad, esto no arranca. La discusión es política y no la resuelve un integrador.",
        "Si los datos están mal en el origen, centralizar sólo los distribuye más rápido. Primero hay un trabajo de limpieza y hay que pagarlo como lo que es.",
        "Si son dos planillas y un CRM que ya se sincroniza solo, el retorno está en otro lado: casi siempre en la precalificación de prospectos.",
      ],
      en: [
        "If nobody on the client side can decide which source is authoritative, this doesn't start. That argument is political and no integrator settles it.",
        "If the data is wrong at the source, centralizing only distributes it faster. There's a cleanup job first and it has to be paid for as what it is.",
        "If it's two spreadsheets and a CRM that already syncs itself, the return is elsewhere — almost always in prospect pre-qualification.",
      ],
      ar: [
        "إذا لم يستطع أحد لدى العميل تحديد المصدر المرجعي، فلا ينطلق هذا. النقاش سياسي داخليًا ولا يحسمه مُكامِل أنظمة.",
        "إذا كانت البيانات خاطئة في المنبع، فالمركزة توزّع الخطأ أسرع لا غير. هناك عمل تنظيف أولًا، وينبغي دفع ثمنه على حقيقته.",
        "إذا كان الأمر جدولين ونظام CRM يتزامن ذاتيًا أصلًا، فالعائد في مكان آخر — غالبًا في التصفية المسبقة للعملاء المحتملين.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Hay que reemplazar los sistemas que ya usamos?",
          en: "Do we have to replace the systems we already use?",
          ar: "هل يجب استبدال الأنظمة التي نستخدمها أصلًا؟",
        },
        answer: {
          es: "No. La mayoría de estos proyectos termina con exactamente las mismas herramientas y una capa de integración en el medio. Reemplazar el CRM es un proyecto propio, con su propio riesgo y su propia resistencia interna, y mezclarlo con este duplica las dos cosas.",
          en: "No. Most of these projects end with exactly the same tools and an integration layer in between. Replacing the CRM is its own project, with its own risk and its own internal resistance, and mixing it into this one doubles both.",
          ar: "لا. تنتهي معظم هذه المشاريع بالأدوات نفسها تمامًا وبطبقة تكامل بينها. أما استبدال نظام CRM فمشروع قائم بذاته، بمخاطره ومقاومته الداخلية، ودمجه بهذا يضاعف الاثنين.",
        },
      },
      {
        question: {
          es: "¿Perdemos las planillas?",
          en: "Do we lose the spreadsheets?",
          ar: "هل نفقد الجداول؟",
        },
        answer: {
          es: "No, y en general conviene que sigan existiendo: quien trabaja rápido en Excel trabaja mal en cualquier otra cosa. Lo que cambia es que la planilla pasa a ser una entrada o una vista del dato central, no una tercera versión que compite con las otras dos.",
          en: "No, and it's usually better that they keep existing: someone who works fast in Excel works badly in anything else. What changes is that the spreadsheet becomes an input or a view of the central data, not a third version competing with the other two.",
          ar: "لا، ويُستحسن عادةً بقاؤها: فمن يعمل بسرعة في Excel يعمل بصعوبة في غيره. ما يتغيّر أن الجدول يصير مدخلًا أو عرضًا للبيانات المركزية، لا نسخة ثالثة تنافس الأخريين.",
        },
      },
      {
        question: {
          es: "¿Cuánto tarda?",
          en: "How long does it take?",
          ar: "كم يستغرق؟",
        },
        answer: {
          es: "El mapeo es medio día. Una integración contra un CRM con API documentada y una planilla ordenada son semanas, no meses. Lo que estira los plazos casi nunca es técnico: es cuánto tarda la organización en acordar qué número es el correcto.",
          en: "The mapping is half a day. An integration against a CRM with a documented API and a tidy spreadsheet is weeks, not months. What stretches timelines is almost never technical: it's how long the organization takes to agree on which number is correct.",
          ar: "الخريطة نصف يوم. والتكامل مع نظام CRM ذي واجهة برمجية موثَّقة وجدول مرتّب أسابيع لا أشهر. وما يطيل المدد نادرًا ما يكون تقنيًا، بل المدة التي تحتاجها المؤسسة للاتفاق على الرقم الصحيح.",
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
