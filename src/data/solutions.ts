import { localizePath, type Lang } from "@/i18n"

/**
 * Páginas de solución por sector (la capa programática del sitio).
 *
 * La búsqueda de palabras clave devolvió el mismo patrón en todos los rubros
 * probados: el volumen no está en «automatización de procesos» —término que
 * además compite con automatización de portones y persianas— sino en la
 * combinación sector + tarea: «IA para clínicas dentales», «agente IA para
 * real estate developers», «IA para estudios contables». Son consultas de intención
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

export interface Localized {
  es: string
  en: string
  ar: string
}

export interface LocalizedList {
  es: string[]
  en: string[]
  ar: string[]
}

export interface Item {
  title: Localized
  detail: Localized
}

export interface Solution {
  /**
   * Industria foco de la agencia.
   *
   * Las dos industrias foco —real estate developers y EdTech— son las que reciben
   * tratamiento distinto: entran a la portada con su propio bloque, tienen
   * casos de uso propios (`src/data/use-cases.ts`) y son el destino de los
   * silos del blog. El resto de los sectores sigue existiendo porque captan
   * búsquedas reales, pero no se promocionan desde la home.
   *
   * Enfocarse es elegir a qué no se le da superficie. Si esta bandera termina
   * en cuatro sectores, dejó de significar algo.
   */
  focus?: true
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
    slug: {
      es: "clinicas-y-consultorios",
      en: "clinics-and-medical-practices",
      ar: "clinics-and-medical-practices",
    },
    sector: {
      es: "Clínicas y consultorios",
      en: "Clinics and practices",
      ar: "العيادات والمراكز الطبية",
    },
    title: {
      es: "Automatización con IA para clínicas y consultorios",
      en: "AI automation for clinics and medical practices",
      ar: "الأتمتة بالذكاء الاصطناعي للعيادات والمراكز الطبية",
    },
    description: {
      es: "Cómo se automatiza con IA la agenda, la confirmación de turnos y el recupero de ausentes en una clínica, sin que un sistema tome decisiones clínicas.",
      en: "How AI automates scheduling, appointment confirmation and no-show recovery at a clinic, without a system making clinical decisions.",
      ar: "كيف تُؤتمت بالذكاء الاصطناعي المواعيد وتأكيدها واستعادة المواعيد الفائتة في عيادة، دون أن يتخذ أي نظام قرارًا طبيًا.",
    },
    answer: {
      es: "En una clínica, la automatización con IA que paga sola es la de la agenda: confirmar turnos, reprogramar cancelaciones y llenar los huecos con la lista de espera. La documentación clínica se puede asistir, pero siempre la firma un profesional. Ninguna decisión clínica se automatiza.",
      en: "At a clinic, the AI automation that pays for itself is scheduling: confirming appointments, rescheduling cancellations and filling gaps from the waiting list. Clinical documentation can be assisted, but a clinician always signs it. No clinical decision is automated.",
      ar: "في العيادة، الأتمتة التي تسدّد كلفتها بنفسها هي أتمتة المواعيد: تأكيد الحجوزات، وإعادة جدولة الإلغاءات، وملء الفراغات من قائمة الانتظار. أما التوثيق الطبي فيمكن مساعدته، لكن يوقّعه دائمًا طبيب. ولا يُؤتمت أي قرار سريري.",
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
      ar: [
        "مشكلة العيادة نادرًا ما تكون في الطلب، بل في أن ما بين 15% و30% من المواعيد يضيع بسبب عدم الحضور والإلغاء المتأخر، وأن الفراغ الذي يتركه إلغاء صباحي قلّما يُملأ في وقته. هذه طاقة استيعابية قائمة تُفوتر صفرًا.",
        "والخسارة الأخرى عند الاستقبال. شخص واحد يردّ على الهاتف ويجيب على واتساب ويحجز المواعيد ويحصّل الرسوم ويستقبل المراجعين يؤدّي خمس وظائف في آن واحد، وأول ما يسقط منها هو المتابعة: التأكيد والتذكير واستعادة من لم يحضر.",
      ],
    },
    processes: [
      {
        title: {
          es: "Confirmación y recordatorio de turnos",
          en: "Appointment confirmation and reminders",
          ar: "تأكيد المواعيد والتذكير بها",
        },
        detail: {
          es: "Por WhatsApp, con respuesta libre: el paciente contesta «no puedo el martes, ¿hay algo el jueves?» y el agente reprograma sobre la disponibilidad real de la agenda.",
          en: 'Over WhatsApp, with free-text replies: the patient says "I can\'t make Tuesday, anything Thursday?" and the agent reschedules against real calendar availability.',
          ar: "عبر واتساب، بردود حرة: يكتب المراجع «لا أستطيع الثلاثاء، هل يوجد شيء الخميس؟» فيعيد الوكيل الجدولة وفق التوافر الحقيقي في المفكرة.",
        },
      },
      {
        title: {
          es: "Recupero de huecos por cancelación",
          en: "Filling cancellation gaps",
          ar: "ملء الفراغات الناتجة عن الإلغاء",
        },
        detail: {
          es: "Cuando se libera un turno, se ofrece por orden a la lista de espera y se cierra con el primero que acepta. Es el proceso con mejor retorno directo de todos.",
          en: "When a slot frees up, it's offered down the waiting list in order and closed with the first to accept. This is the single highest direct-return process here.",
          ar: "حين يتحرّر موعد، يُعرَض بالترتيب على قائمة الانتظار ويُغلق مع أول من يوافق. وهذه أعلى العمليات هنا عائدًا مباشرًا.",
        },
      },
      {
        title: {
          es: "Triage administrativo de consultas",
          en: "Administrative triage of enquiries",
          ar: "الفرز الإداري للاستفسارات",
        },
        detail: {
          es: "Separar lo que es agenda, cobertura, precio o indicación previa, y responder lo administrativo. Lo clínico va a una persona sin excepción.",
          en: "Separating scheduling, coverage, pricing and pre-visit instructions, and answering the administrative ones. Anything clinical goes to a person, no exceptions.",
          ar: "فصل ما يخص المواعيد والتغطية التأمينية والأسعار وتعليمات ما قبل الزيارة، والرد على الإداري منها. وكل ما هو سريري يذهب إلى شخص، دون استثناء.",
        },
      },
      {
        title: {
          es: "Autorizaciones y obras sociales",
          en: "Authorizations and insurance",
          ar: "الموافقات وشركات التأمين",
        },
        detail: {
          es: "Armado del pedido, control de datos y seguimiento del estado. Reduce el ida y vuelta que hoy consume la mañana entera de administración.",
          en: "Assembling the request, checking data and following up on status. Cuts the back-and-forth that currently consumes an entire admin morning.",
          ar: "إعداد الطلب والتحقق من البيانات ومتابعة حالته. يقلّص التراسل المتبادل الذي يلتهم اليوم صباحًا إداريًا كاملًا.",
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
      ar: [
        "نظام إدارة العيادات وجدولة المواعيد",
        "واجهة واتساب للأعمال (WhatsApp Business API)",
        "أنظمة وبوابات شركات التأمين",
        "الفوترة الإلكترونية",
        "تقويم Google",
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
      ar: [
        "أي محتوى سريري: الأعراض والتعليمات وتفسير الفحوصات.",
        "أي تعديل على مفكرة طبيب يترتب عليه حجز فوق الطاقة.",
        "إبلاغ نتائج الفحوصات، دائمًا.",
        "الشكاوى والمراجعون الغاضبون، فورًا.",
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
      ar: [
        "قياس نسبة عدم الحضور الحقيقية خلال الأشهر الثلاثة الماضية، لكل طبيب ولكل فترة زمنية.",
        "أتمتة التأكيد والتذكير. أصغر تغيير وأكثره قابلية للقياس.",
        "إضافة استعادة الفراغات من قائمة الانتظار بعد أن تصبح المفكرة موثوقة.",
        "وبعد ذلك فقط، فرز الاستفسارات الواردة.",
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
      ar: [
        "إذا لم تكن المفكرة مرقمنة وكانت تعيش على الورق وفي ذاكرة موظف الاستقبال، فابدأ بذلك. وكيل يعمل فوق مفكرة لا تعكس الواقع يُنتج حجوزات مزدوجة.",
        "إذا كنت عيادة طبيب واحد بأقل من 40 موعدًا أسبوعيًا، فالتوفير لن يغطي كلفة المشروع. يكفي التذكير التلقائي في برنامج المواعيد لديك.",
        "إذا كان حجم الاستفسارات منخفضًا لكنه سريري في معظمه، فسيُحال كل شيء تقريبًا إلى شخص ولن يضيف الوكيل شيئًا.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Un agente de IA puede dar indicaciones médicas?",
          en: "Can an AI agent give medical advice?",
          ar: "هل يمكن لوكيل ذكاء اصطناعي أن يعطي إرشادات طبية؟",
        },
        answer: {
          es: "No, y no lo implementamos así. El agente resuelve lo administrativo —agenda, cobertura, precios, requisitos previos— y deriva a un profesional todo lo que sea clínico. La frontera se define por escrito antes de empezar y se prueba explícitamente en el set de evaluación.",
          en: "No, and we don't implement it that way. The agent handles administrative matters — scheduling, coverage, pricing, prerequisites — and routes anything clinical to a professional. That boundary is defined in writing before we start and tested explicitly in the evaluation set.",
          ar: "لا، ولا ننفّذه بهذه الصورة. يتولّى الوكيل الجانب الإداري — المواعيد والتغطية والأسعار ومتطلبات ما قبل الزيارة — ويحيل كل ما هو سريري إلى طبيب. وهذا الحدّ يُكتب قبل البدء ويُختبر صراحةً ضمن مجموعة التقييم.",
        },
      },
      {
        question: {
          es: "¿Qué pasa con los datos de los pacientes?",
          en: "What happens to patient data?",
          ar: "ماذا يحدث لبيانات المرضى؟",
        },
        answer: {
          es: "Quedan en la infraestructura de la clínica o en la nube que la clínica defina, con acceso mínimo necesario y registro de cada consulta. No se usan para entrenar modelos y se trabaja con retención cero del lado del proveedor de modelos cuando el caso lo exige.",
          en: "It stays in the clinic's infrastructure or the cloud the clinic designates, with least-privilege access and a log of every query. It is never used to train models, and we run zero-retention with the model provider when the case requires it.",
          ar: "تبقى في البنية التحتية للعيادة أو في السحابة التي تحدّدها العيادة، بأقل صلاحية لازمة وبسجل لكل استعلام. ولا تُستخدم لتدريب النماذج، ونعمل بسياسة عدم الاحتفاظ بالبيانات لدى مزوّد النموذج حين يتطلب الأمر ذلك.",
        },
      },
    ],
  },

  {
    focus: true,
    slug: {
      es: "real-estate-developers",
      en: "real-estate-developers",
      ar: "real-estate-developers",
    },
    sector: {
      es: "Real estate developers",
      en: "Real estate developers",
      ar: "المطوّرون العقاريون",
    },
    title: {
      es: "Automatización con IA para real estate developers",
      en: "AI automation for real estate developers",
      ar: "الأتمتة بالذكاء الاصطناعي للمطوّرين العقاريين",
    },
    description: {
      es: "Cómo se centralizan los procesos de un real estate developer y se automatiza lo tedioso: precalificación de prospectos, planillas, integraciones, correos y visitas a las unidades.",
      en: "How a real estate developer's processes get centralized and the tedious parts automated: prospect pre-qualification, spreadsheets, integrations, emails and unit visits.",
      ar: "كيف تُمركَز عمليات المطوّر العقاري ويُؤتمت الجزء الممل منها: التصفية المسبقة للعملاء المحتملين، والجداول، والتكاملات، والرسائل، وزيارات الوحدات.",
    },
    answer: {
      es: "Un real estate developer corre veinte procesos en paralelo —prospectos por cinco canales, planillas de disponibilidad, cadenas de correo con brokers y estudios, avance de obra— y ninguno se habla con el otro. Lo que hacemos es centralizarlos en un solo lugar y automatizar la parte tediosa: precalificación, carga de datos, correos de rutina y coordinación de visitas a las unidades.",
      en: "A real estate developer runs twenty processes in parallel — prospects across five channels, availability spreadsheets, email threads with brokers and law firms, construction progress — and none of them talk to each other. We centralize them in one place and automate the tedious part: pre-qualification, data entry, routine emails and unit visit coordination.",
      ar: "يدير المطوّر العقاري عشرين عملية بالتوازي — عملاء محتملون عبر خمس قنوات، وجداول توافر، وسلاسل بريد مع الوسطاء والمكاتب القانونية، وتقدّم البناء — ولا تتحدث أي منها مع الأخرى. وما نفعله هو تجميعها في مكان واحد وأتمتة الجزء الممل: التصفية المسبقة، وإدخال البيانات، ورسائل البريد الروتينية، وتنسيق زيارات الوحدات.",
    },
    intro: {
      es: [
        "El problema de un developer no es que le falte software: es que tiene demasiado y ninguno se habla. Los prospectos entran por cinco canales, la disponibilidad vive en una planilla que actualiza una persona, el precio en otra, el avance de obra en el sistema de la constructora y el resto en cadenas de correo. Nadie tiene la foto completa, y armarla a mano lleva medio día.",
        "Lo que se automatiza no es «la venta»: es lo tedioso que hay alrededor. Precalificar al prospecto antes de que le llegue al asesor, copiar el mismo dato de la planilla al CRM y del CRM al correo, coordinar la visita a la unidad, perseguir al que no contestó. Es trabajo que nadie defiende y que igual se come la semana del equipo comercial.",
      ],
      en: [
        "A developer's problem isn't a lack of software: it's having too much of it and none of it talking. Prospects arrive through five channels, availability lives in a spreadsheet one person updates, pricing in another, construction progress in the builder's system, and the rest in email threads. Nobody has the full picture, and assembling it by hand takes half a day.",
        "What gets automated isn't \"the sale\": it's the tedium around it. Pre-qualifying the prospect before it reaches a salesperson, copying the same figure from spreadsheet to CRM and from CRM to email, coordinating the unit visit, chasing whoever didn't reply. It's work nobody defends and it still eats the sales team's week.",
      ],
      ar: [
        "مشكلة المطوّر ليست نقص البرمجيات، بل كثرتها وعدم تحدّث أي منها مع الأخرى. العملاء المحتملون يصلون عبر خمس قنوات، والتوافر يعيش في جدول يحدّثه شخص واحد، والأسعار في جدول آخر، وتقدّم البناء في نظام المقاول، والباقي في سلاسل بريد. لا أحد لديه الصورة الكاملة، وتجميعها يدويًا يستغرق نصف يوم.",
        "وما يُؤتمت ليس «البيع» بل الممل الذي حوله: تصفية العميل المحتمل قبل أن يصل إلى البائع، ونسخ الرقم نفسه من الجدول إلى نظام CRM ومن CRM إلى البريد، وتنسيق زيارة الوحدة، وملاحقة من لم يردّ. عمل لا يدافع عنه أحد، ومع ذلك يلتهم أسبوع الفريق التجاري.",
      ],
    },
    processes: [
      {
        title: {
          es: "Precalificación de prospectos",
          en: "Prospect pre-qualification",
          ar: "التصفية المسبقة للعملاء المحتملين",
        },
        detail: {
          es: "Responde en minutos por el canal por el que entró, establece capacidad de pago, anticipo, plazo y si es usuario final o inversor, y lo cruza contra las unidades que quedan. Al asesor le llega el prospecto con la ficha ya completa.",
          en: "Replies within minutes on the channel it arrived on, establishes payment capacity, down payment, timeline and whether it's an end user or an investor, and matches it against the units still available. The salesperson gets the prospect with the record already complete.",
          ar: "يردّ خلال دقائق على القناة التي وصل منها، ويحدّد القدرة على السداد والدفعة الأولى والمهلة وما إذا كان مستخدمًا نهائيًا أم مستثمرًا، ويطابقه مع الوحدات المتبقية. فيصل العميل إلى البائع ببطاقة مكتملة.",
        },
      },
      {
        title: {
          es: "Una sola fuente de disponibilidad y precios",
          en: "A single source for availability and pricing",
          ar: "مصدر واحد للتوافر والأسعار",
        },
        detail: {
          es: "Las planillas de unidades, la lista de precios y los estados de reserva se consolidan en un lugar consultable. Deja de haber dos versiones del stock y el equipo deja de ofrecer lo que ya está reservado.",
          en: "Unit spreadsheets, the price list and reservation statuses get consolidated into one queryable place. There stop being two versions of the stock, and the team stops offering what's already reserved.",
          ar: "تُدمج جداول الوحدات وقائمة الأسعار وحالات الحجز في مكان واحد قابل للاستعلام. فتنتهي النسختان المتضاربتان للمخزون، ويكفّ الفريق عن عرض ما هو محجوز أصلًا.",
        },
      },
      {
        title: {
          es: "Integraciones y correo entre sistemas",
          en: "Integrations and cross-system email",
          ar: "التكاملات والبريد بين الأنظمة",
        },
        detail: {
          es: "El CRM, el ERP o el sistema de obra, la planilla y la casilla dejan de sincronizarse a mano: el dato entra una vez, y los correos de rutina —confirmaciones, actualizaciones a brokers, pedidos de documentación— se arman y se mandan solos.",
          en: "The CRM, the ERP or construction system, the spreadsheet and the inbox stop being synced by hand: data is entered once, and routine emails — confirmations, broker updates, document requests — get drafted and sent on their own.",
          ar: "يتوقف المزامنة اليدوية بين نظام CRM ونظام ERP أو نظام الإنشاء والجدول وصندوق البريد: تُدخل البيانات مرة واحدة، وتُصاغ رسائل البريد الروتينية — التأكيدات، وتحديثات الوسطاء، وطلبات المستندات — وتُرسل من تلقائها.",
        },
      },
      {
        title: {
          es: "Coordinación de visitas a las unidades",
          en: "Unit visit coordination",
          ar: "تنسيق زيارات الوحدات",
        },
        detail: {
          es: "Showroom, departamento modelo y obra: propone horarios sobre la agenda real, resuelve los requisitos de ingreso, confirma el día anterior y reofrece el hueco cuando alguien cancela.",
          en: "Showroom, model unit and site: it proposes times against the real calendar, resolves access requirements, confirms the day before and re-offers the slot when someone cancels.",
          ar: "صالة العرض والوحدة النموذجية والموقع: يقترح مواعيد وفق المفكرة الحقيقية، ويحلّ اشتراطات الدخول، ويؤكّد قبل يوم، ويعيد عرض الفراغ حين يلغي أحدهم.",
        },
      },
    ],
    stack: {
      es: [
        "CRM del developer",
        "Planillas de unidades y lista de precios",
        "Sistema de gestión de obra o ERP",
        "Casilla de correo del equipo comercial",
        "WhatsApp Business API",
        "Portales, campañas de lanzamiento y Google Calendar",
      ],
      en: [
        "Developer CRM",
        "Unit spreadsheets and price list",
        "Construction management system or ERP",
        "The sales team's shared inbox",
        "WhatsApp Business API",
        "Listing portals, launch campaigns and Google Calendar",
      ],
      ar: [
        "نظام CRM الخاص بالمطوّر",
        "جداول الوحدات وقائمة الأسعار",
        "نظام إدارة الإنشاء أو ERP",
        "صندوق بريد الفريق التجاري",
        "واجهة واتساب للأعمال (WhatsApp Business API)",
        "البوابات العقارية وحملات الإطلاق وتقويم Google",
      ],
    },
    human: {
      es: [
        "Todo precio final, descuento y condición del plan de pago.",
        "Cualquier compromiso sobre fecha de entrega o avance de obra.",
        "La reserva, el boleto y la escrituración.",
        "La visita en sí y todo lo que se conversa en ella.",
      ],
      en: [
        "Every final price, discount and payment-plan term.",
        "Any commitment about delivery date or construction progress.",
        "Reservation, purchase agreement and deed.",
        "The visit itself and everything discussed in it.",
      ],
      ar: [
        "كل سعر نهائي وخصم وشرط في خطة السداد.",
        "أي التزام بشأن موعد التسليم أو نسبة الإنجاز.",
        "الحجز وعقد البيع والتسجيل العقاري.",
        "الزيارة نفسها وكل ما يُبحث فيها.",
      ],
    },
    start: {
      es: [
        "Mapear dónde vive hoy cada dato: qué planilla, qué sistema, qué casilla y quién lo actualiza. Es medio día de trabajo y define el resto del proyecto.",
        "Unificar disponibilidad y precios en una única fuente consultable. Sin esto no se automatiza el proceso: se automatiza el error.",
        "Automatizar la precalificación de prospectos y la carga al CRM. Es el cambio con el efecto más inmediato sobre visitas agendadas.",
        "Al final, los correos de rutina y el seguimiento del ciclo largo, que es donde está el volumen dormido.",
      ],
      en: [
        "Map where each piece of data lives today: which spreadsheet, which system, which inbox, and who updates it. It's half a day of work and it defines the rest of the project.",
        "Unify availability and pricing into a single queryable source. Without it you don't automate the process — you automate the error.",
        "Automate prospect pre-qualification and the write into the CRM. Biggest immediate effect on visits booked.",
        "Last, the routine emails and long-cycle follow-up, where the dormant volume sits.",
      ],
      ar: [
        "رسم خريطة لمكان كل بيانات اليوم: أي جدول، وأي نظام، وأي صندوق بريد، ومن يحدّثه. نصف يوم عمل، وهو ما يحدّد بقية المشروع.",
        "توحيد التوافر والأسعار في مصدر واحد قابل للاستعلام. بدونه لا تُؤتمت العملية، بل يُؤتمت الخطأ.",
        "أتمتة التصفية المسبقة للعملاء المحتملين وإدخالهم إلى نظام CRM. وهو التغيير الأسرع أثرًا في عدد الزيارات المحجوزة.",
        "وأخيرًا، رسائل البريد الروتينية ومتابعة الدورة الطويلة، وفيها الحجم النائم.",
      ],
    },
    notThis: {
      es: [
        "Si la disponibilidad y el precio vigente no están en ningún lado más que en la cabeza de una persona, primero hay un trabajo de ordenar datos que no es automatización y hay que pagarlo como lo que es.",
        "Si lanzás un proyecto cada tres años y son veinte unidades, el equipo comercial resuelve a mano más rápido y mejor que cualquier sistema.",
        "Si vendés todo a través de una red de brokers exclusiva, el cuello de botella está en el broker y no en tu proceso interno. Centralizar de tu lado no lo mueve.",
      ],
      en: [
        "If availability and current pricing exist nowhere but in one person's head, there's a data cleanup job first. That isn't automation and it has to be paid for as what it is.",
        "If you launch one project every three years and it's twenty units, the sales team handles it by hand faster and better than any system.",
        "If you sell entirely through an exclusive broker network, the bottleneck is the broker, not your internal process. Centralizing on your side doesn't move it.",
      ],
      ar: [
        "إذا لم يكن التوافر والسعر الساري موجودين إلا في رأس شخص واحد، فهناك أولًا عمل ترتيب بيانات ليس أتمتةً، وينبغي دفع ثمنه على حقيقته.",
        "إذا كنت تطلق مشروعًا كل ثلاث سنوات وبعشرين وحدة، فالفريق التجاري يتدبّرها يدويًا أسرع وأفضل من أي نظام.",
        "إذا كنت تبيع بالكامل عبر شبكة وسطاء حصرية، فالاختناق عند الوسيط لا في عمليتك الداخلية. والمركزة من جهتك لا تحرّكه.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Hay que cambiar el CRM y las planillas que ya usamos?",
          en: "Do we have to replace the CRM and spreadsheets we already use?",
          ar: "هل يجب استبدال نظام CRM والجداول التي نستخدمها أصلًا؟",
        },
        answer: {
          es: "No. Centralizar no es migrar todo a un sistema nuevo: es que los que ya tenés se hablen y que el dato entre una sola vez. Si el CRM tiene API, se integra; si la disponibilidad vive en una planilla, se lee de ahí. Cambiar de herramienta es una decisión aparte, y casi nunca es la primera.",
          en: "No. Centralizing isn't migrating everything to a new system: it's making the ones you already have talk to each other, and entering data once. If the CRM has an API, we integrate it; if availability lives in a spreadsheet, we read it from there. Switching tools is a separate decision, and it's almost never the first one.",
          ar: "لا. المركزة ليست ترحيل كل شيء إلى نظام جديد، بل جعل ما لديك أصلًا يتحدث بعضه إلى بعض وإدخال البيانات مرة واحدة. فإن كان لنظام CRM واجهة برمجية دمجناه، وإن كان التوافر في جدول قرأناه منه. أما تغيير الأدوات فقرار منفصل، ونادرًا ما يكون الأول.",
        },
      },
      {
        question: {
          es: "¿Puede dar precios y armar el plan de pago?",
          en: "Can it quote prices and build the payment plan?",
          ar: "هل يستطيع إعطاء الأسعار وبناء خطة السداد؟",
        },
        answer: {
          es: "Puede leer y explicar la lista de precios vigente y el plan publicado, con la unidad concreta. Lo que no hace es cotizar fuera de esa lista, aplicar un descuento ni comprometer una condición de financiación: eso lo decide una persona, porque un número mal dado en preventa se termina discutiendo en la reserva.",
          en: "It can read and explain the current price list and the published plan for a specific unit. What it won't do is quote outside that list, apply a discount or commit to a financing term: a person decides that, because a wrong figure quoted pre-construction ends up being argued about at reservation.",
          ar: "يستطيع قراءة وشرح قائمة الأسعار السارية والخطة المنشورة لوحدة بعينها. أما ما لا يفعله فهو التسعير خارج تلك القائمة، أو منح خصم، أو الالتزام بشرط تمويلي: هذا يقرّره شخص، لأن رقمًا خاطئًا يُعطى في مرحلة البيع على الخارطة ينتهي بنقاش عند الحجز.",
        },
      },
      {
        question: {
          es: "¿Qué contesta sobre la fecha de entrega?",
          en: "What does it say about the delivery date?",
          ar: "بماذا يجيب عن موعد التسليم؟",
        },
        answer: {
          es: "Lo que esté publicado, y nada más. La fecha de entrega es la afirmación con más consecuencia legal de todo el proceso comercial, así que el agente repite el dato oficial —no lo estima ni lo ajusta— y deriva al equipo cualquier pregunta sobre atrasos o avance de obra.",
          en: "Whatever is published, and nothing more. The delivery date is the statement with the most legal consequence in the entire sales process, so the agent repeats the official figure — it doesn't estimate or adjust it — and routes any question about delays or construction progress to the team.",
          ar: "ما هو منشور، لا أكثر. فموعد التسليم هو أكثر التصريحات أثرًا قانونيًا في العملية التجارية كلها، لذلك يكرّر الوكيل البيان الرسمي — لا يقدّره ولا يعدّله — ويحيل إلى الفريق أي سؤال عن التأخير أو نسبة الإنجاز.",
        },
      },
    ],
  },

  {
    focus: true,
    slug: {
      es: "edtech-y-plataformas-educativas",
      en: "edtech-and-learning-platforms",
      ar: "edtech-and-learning-platforms",
    },
    sector: {
      es: "EdTech y plataformas educativas",
      en: "EdTech and learning platforms",
      ar: "التقنيات التعليمية ومنصات التعلّم",
    },
    title: {
      es: "Integración de IA en plataformas educativas y EdTech",
      en: "AI integration for EdTech and learning platforms",
      ar: "دمج الذكاء الاصطناعي في منصات التعلّم وشركات التقنيات التعليمية",
    },
    description: {
      es: "Cómo se integra IA en una plataforma educativa: búsqueda con citas sobre el contenido propio, tutor acotado al curso y corrección asistida, con la nota firmada por un docente.",
      en: "How AI is integrated into a learning platform: cited search over your own content, a tutor scoped to the course and assisted grading, with the grade signed by a teacher.",
      ar: "كيف يُدمج الذكاء الاصطناعي في منصة تعليمية: بحث مُوثَّق بالمصادر داخل محتواك، ومرشد محصور بنطاق المقرر، وتصحيح مُعان، مع بقاء الدرجة بتوقيع المعلّم.",
    },
    answer: {
      es: "En EdTech lo primero que se integra no es un tutor: es la búsqueda sobre el contenido propio, con cita a la fuente. Después vienen el tutor acotado al curso, la corrección asistida y la generación de ítems. La nota del legajo y cualquier caso de integridad académica los firma siempre un docente.",
      en: "In EdTech the first thing to integrate isn't a tutor: it's search over your own content, with a citation to the source. Then come the course-scoped tutor, assisted grading and item generation. The grade on the record and any academic-integrity case are always signed by a teacher.",
      ar: "في التقنيات التعليمية، أول ما يُدمج ليس المرشد الذكي، بل البحث داخل محتواك الخاص مع الإحالة إلى المصدر. ثم يأتي المرشد المحصور بنطاق المقرر، والتصحيح المُعان، وتوليد أسئلة التقييم. أما الدرجة المسجّلة وأي قضية نزاهة أكاديمية فيوقّعهما المعلّم دائمًا.",
    },
    intro: {
      es: [
        "Una plataforma educativa tiene un activo que casi ningún competidor puede copiar: años de contenido propio, entregas ya corregidas y el rastro de qué le costó a cada alumno. El error más caro del sector es enchufar un modelo genérico encima de eso y terminar con un chat que responde bien sobre el mundo y mal sobre el curso.",
        "El segundo error es de unidad económica. En EdTech el uso es alto y el ingreso por alumno es bajo, así que una función de IA sin costo por alumno activo calculado de antemano se come el margen del plan que la vende. Las dos decisiones que ordenan el proyecto —qué contenido recupera y cuánto cuesta cada respuesta— se toman antes de elegir el modelo.",
      ],
      en: [
        "A learning platform owns an asset almost no competitor can copy: years of proprietary content, already-graded submissions, and a trace of what each student struggled with. The sector's most expensive mistake is bolting a generic model on top of that and ending up with a chat that answers well about the world and badly about the course.",
        "The second mistake is unit economics. In EdTech usage is high and revenue per student is low, so an AI feature without a cost-per-active-student figure calculated up front eats the margin of the plan that sells it. The two decisions that shape the project — what content it retrieves and what each answer costs — are made before choosing a model.",
      ],
      ar: [
        "تملك المنصة التعليمية أصلًا لا يكاد أي منافس يستطيع نسخه: سنوات من المحتوى الخاص، وتسليمات مُصحَّحة سلفًا، وأثرٌ لما تعثّر فيه كل متعلّم. وأغلى أخطاء القطاع هو تركيب نموذج عام فوق ذلك، لينتهي الأمر بمحادثة تجيب جيدًا عن العالم ورديئًا عن المقرر.",
        "والخطأ الثاني في اقتصاديات الوحدة. في هذا القطاع يكون الاستخدام مرتفعًا والإيراد لكل متعلّم منخفضًا، فأي ميزة ذكاء اصطناعي بلا تكلفة محسوبة مسبقًا لكل متعلّم نشط تلتهم هامش الاشتراك الذي يبيعها. والقراران اللذان يحكمان المشروع — أي محتوى يُسترجع وكم تكلّف كل إجابة — يُتخذان قبل اختيار النموذج.",
      ],
    },
    processes: [
      {
        title: {
          es: "Búsqueda con citas sobre el contenido propio",
          en: "Cited search over your own content",
          ar: "بحث مُوثَّق بالمصادر داخل محتواك",
        },
        detail: {
          es: "Recuperación sobre tus cursos, transcripciones y materiales, con la cita al módulo y al minuto del video. Es la base de todo lo demás: sin esto, cualquier tutor responde con la memoria del modelo.",
          en: "Retrieval over your courses, transcripts and materials, citing the module and the timestamp in the video. It's the foundation for everything else: without it, any tutor answers from the model's memory.",
          ar: "استرجاع داخل مقرراتك ونصوصها المفرَّغة وموادها، مع الإحالة إلى الوحدة وإلى الدقيقة في الفيديو. وهذا أساس كل ما عداه: من دونه يجيب أي مرشد من ذاكرة النموذج.",
        },
      },
      {
        title: {
          es: "Tutor acotado al curso",
          en: "Course-scoped tutor",
          ar: "مرشد محصور بنطاق المقرر",
        },
        detail: {
          es: "Responde con el material de la unidad, dice «esto no está en el curso» en vez de completar, y no resuelve la entrega evaluada: acompaña hasta el paso anterior y ahí se detiene.",
          en: "Answers from the unit's material, says \"that isn't in this course\" instead of filling in the blank, and won't do the graded assignment: it walks the student to the step before and stops there.",
          ar: "يجيب من مادة الوحدة، ويقول «هذا غير وارد في المقرر» بدل أن يُكمل من عنده، ولا يحلّ التكليف المُقيَّم: يرافق المتعلّم حتى الخطوة السابقة ثم يتوقف.",
        },
      },
      {
        title: {
          es: "Corrección asistida con rúbrica",
          en: "Rubric-based assisted grading",
          ar: "تصحيح مُعان وفق سلّم تقييم",
        },
        detail: {
          es: "Devuelve borrador de nota y devolución criterio por criterio, con la evidencia citada del propio texto del alumno. El docente ajusta y firma. Es donde está la hora que hoy se pierde.",
          en: "Returns a draft grade and criterion-by-criterion feedback, quoting evidence from the student's own text. The teacher adjusts and signs. This is where the lost hours actually are.",
          ar: "يعيد مسودة درجة وتغذية راجعة معيارًا بمعيار، مع اقتباس الشواهد من نص المتعلّم نفسه. ثم يعدّل المعلّم ويوقّع. وهنا تكمن الساعات الضائعة فعلًا.",
        },
      },
      {
        title: {
          es: "Generación de ítems y bancos de preguntas",
          en: "Item generation and question banks",
          ar: "توليد الأسئلة وبنوك الأسئلة",
        },
        detail: {
          es: "Arma preguntas nuevas a partir del material, alineadas al objetivo de aprendizaje declarado y con distractores plausibles. Pasan por revisión antes de publicarse.",
          en: "Builds new questions from the material, aligned to the stated learning objective and with plausible distractors. They go through review before publishing.",
          ar: "يبني أسئلة جديدة من المادة، متوائمة مع هدف التعلّم المعلن وبخيارات تشتيت معقولة. وتمرّ على المراجعة قبل النشر.",
        },
      },
    ],
    stack: {
      es: [
        "LMS: Moodle, Canvas, Google Classroom",
        "LTI 1.3, xAPI y SCORM",
        "Sistema de gestión académica (SIS)",
        "Tu propia aplicación y su API",
        "Almacenamiento de contenido y transcripción de video",
        "Base vectorial y proveedores de modelos",
      ],
      en: [
        "LMS: Moodle, Canvas, Google Classroom",
        "LTI 1.3, xAPI and SCORM",
        "Student information system (SIS)",
        "Your own application and its API",
        "Content storage and video transcription",
        "Vector store and model providers",
      ],
      ar: [
        "أنظمة إدارة التعلّم: Moodle وCanvas وGoogle Classroom",
        "معايير LTI 1.3 وxAPI وSCORM",
        "نظام معلومات الطلبة (SIS)",
        "تطبيقك الخاص وواجهته البرمجية",
        "تخزين المحتوى وتفريغ الفيديو نصًا",
        "قاعدة بيانات متجهية ومزوّدو النماذج",
      ],
    },
    human: {
      es: [
        "La nota que queda en el legajo, siempre.",
        "Cualquier caso de plagio o integridad académica.",
        "Contenido que se publica a alumnos menores de edad.",
        "Decisiones de promoción, certificación o baja.",
      ],
      en: [
        "The grade that goes on the record, always.",
        "Any plagiarism or academic-integrity case.",
        "Content published to underage students.",
        "Progression, certification or withdrawal decisions.",
      ],
      ar: [
        "الدرجة التي تُثبَّت في السجل، دائمًا.",
        "أي قضية انتحال أو نزاهة أكاديمية.",
        "المحتوى الذي يُنشر لمتعلّمين قاصرين.",
        "قرارات الترفيع أو منح الشهادة أو الفصل.",
      ],
    },
    start: {
      es: [
        "Inventariar el contenido: qué está en texto, qué en video sin transcribir y qué no tiene metadatos. Ese inventario define el alcance real del proyecto.",
        "Empezar por la búsqueda con citas, que se mide sin tocar la evaluación y ya cambia la experiencia del alumno.",
        "Calcular el costo por alumno activo con tráfico real antes de abrir la función a toda la base.",
        "Sumar corrección asistida en una sola materia, con el docente firmando, y extender recién cuando la nota sugerida y la final convergen.",
      ],
      en: [
        "Inventory the content: what's text, what's untranscribed video, what has no metadata. That inventory defines the project's real scope.",
        "Start with cited search — it's measurable without touching assessment and already changes the student experience.",
        "Calculate cost per active student against real traffic before opening the feature to the whole base.",
        "Add assisted grading in a single subject, with the teacher signing, and extend only once suggested and final grades converge.",
      ],
      ar: [
        "جرد المحتوى: ما هو نصّي، وما هو فيديو غير مفرَّغ، وما لا يحمل بيانات وصفية. هذا الجرد يحدّد النطاق الحقيقي للمشروع.",
        "البدء بالبحث المُوثَّق بالمصادر، فهو قابل للقياس دون المساس بالتقييم ويغيّر تجربة المتعلّم من الآن.",
        "حساب التكلفة لكل متعلّم نشط على حركة استخدام حقيقية قبل فتح الميزة لكامل القاعدة.",
        "إضافة التصحيح المُعان في مادة واحدة، بتوقيع المعلّم، ثم التوسّع فقط حين تتقارب الدرجة المقترحة مع النهائية.",
      ],
    },
    notThis: {
      es: [
        "Si el producto todavía no retiene, un tutor de IA no lo arregla. La IA amplifica un contenido que funciona; no reemplaza uno que no.",
        "Si el material vive en PDF escaneado y video sin transcribir, el primer proyecto es de normalización de contenido, no de IA. Ese trabajo no lo hace un modelo.",
        "Si el plan que vende la función cuesta por mes menos que el costo estimado de modelo por alumno activo, no hay producto: hay una promoción con pérdida. Ese número se calcula antes de construir.",
        "Si tu audiencia son menores, el marco legal —COPPA, FERPA, GDPR— define la arquitectura antes que el modelo. Agregarlo después es rehacer el proyecto.",
      ],
      en: [
        "If the product doesn't retain yet, an AI tutor won't fix it. AI amplifies content that works; it doesn't replace content that doesn't.",
        "If the material lives in scanned PDFs and untranscribed video, the first project is content normalization, not AI. A model doesn't do that work.",
        "If the plan selling the feature costs less per month than the estimated model cost per active student, there's no product — there's a loss-making promotion. That number gets calculated before building.",
        "If your audience is minors, the legal framework — COPPA, FERPA, GDPR — defines the architecture before the model does. Adding it afterwards means rebuilding.",
      ],
      ar: [
        "إذا كان المنتج لا يحقّق بقاءً للمستخدمين بعد، فلن يصلح ذلك مرشدٌ ذكي. الذكاء الاصطناعي يضاعف أثر محتوى ناجح، ولا يعوّض محتوى فاشلًا.",
        "إذا كانت المواد تعيش في ملفات PDF ممسوحة ضوئيًا وفيديو غير مفرَّغ، فالمشروع الأول هو تنظيم المحتوى لا الذكاء الاصطناعي. وهذا عمل لا يؤدّيه نموذج.",
        "إذا كان الاشتراك الذي يبيع الميزة يكلّف شهريًا أقل من التكلفة المقدَّرة للنموذج لكل متعلّم نشط، فلا يوجد منتج بل عرض خاسر. وهذا الرقم يُحسب قبل البناء.",
        "إذا كان جمهورك من القاصرين، فالإطار القانوني — COPPA وFERPA وGDPR — هو ما يحدّد البنية قبل النموذج. وإضافته لاحقًا تعني إعادة البناء.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Cómo evitan que el tutor invente contenido?",
          en: "How do you keep the tutor from making things up?",
          ar: "كيف تمنعون المرشد من اختلاق المحتوى؟",
        },
        answer: {
          es: "Acotando la recuperación al material del curso y exigiendo cita: si ningún pasaje respalda la respuesta, el tutor lo dice en vez de completar. Eso se prueba con un set de preguntas cuya respuesta correcta es «no está en el material», que es justamente el caso que casi nadie evalúa.",
          en: 'By scoping retrieval to the course material and requiring a citation: if no passage supports the answer, the tutor says so instead of filling in. We test that with a set of questions whose correct answer is "it isn\'t in the material" — precisely the case almost nobody evaluates.',
          ar: "بحصر الاسترجاع في مادة المقرر واشتراط الإحالة: فإن لم يسند الإجابةَ مقطعٌ من المادة، قال المرشد ذلك بدل أن يُكمل من عنده. ونختبر هذا بمجموعة أسئلة إجابتها الصحيحة هي «غير وارد في المادة»، وهي بالضبط الحالة التي لا يكاد أحد يقيسها.",
        },
      },
      {
        question: {
          es: "¿Cuánto cuesta la función por alumno?",
          en: "What does the feature cost per student?",
          ar: "كم تكلّف الميزة لكل متعلّم؟",
        },
        answer: {
          es: "Depende del volumen de mensajes y del largo del contexto, pero se estima antes de construir con el tráfico real de la plataforma. En producción el costo se controla con caché, recuperación acotada y un modelo chico para la mayoría de las consultas, reservando el grande para lo que de verdad lo necesita.",
          en: "It depends on message volume and context length, but it's estimated before building, against the platform's real traffic. In production the cost is controlled with caching, tight retrieval and a small model for most queries, reserving the large one for what genuinely needs it.",
          ar: "تتوقف على حجم الرسائل وطول السياق، لكنها تُقدَّر قبل البناء اعتمادًا على حركة الاستخدام الحقيقية للمنصة. وفي الإنتاج تُضبط التكلفة بالتخزين المؤقت وحصر الاسترجاع واستخدام نموذج صغير لمعظم الاستفسارات، مع حجز النموذج الكبير لما يحتاجه فعلًا.",
        },
      },
    ],
  },

  {
    slug: {
      es: "estudios-contables",
      en: "accounting-firms",
      ar: "accounting-firms",
    },
    sector: {
      es: "Estudios contables",
      en: "Accounting firms",
      ar: "مكاتب المحاسبة",
    },
    title: {
      es: "Automatización con IA para estudios contables",
      en: "AI automation for accounting firms",
      ar: "الأتمتة بالذكاء الاصطناعي لمكاتب المحاسبة",
    },
    description: {
      es: "Cómo se automatiza con IA la recepción de documentación, la carga de comprobantes y el seguimiento de clientes en un estudio contable, con revisión profesional en cada cierre.",
      en: "How AI automates document intake, voucher entry and client follow-up at an accounting firm, with professional review at every close.",
      ar: "كيف تُؤتمت بالذكاء الاصطناعي استلام المستندات وإدخال القيود ومتابعة العملاء في مكتب محاسبة، مع مراجعة مهنية عند كل إقفال.",
    },
    answer: {
      es: "En un estudio contable lo que se automatiza es la entrada: pedir la documentación mes a mes, recibirla por los canales por los que llega, clasificar los comprobantes y precargarlos. La imputación final y todo lo que se presenta ante el fisco lo revisa y firma un profesional.",
      en: "At an accounting firm, what gets automated is intake: chasing documentation month after month, receiving it through whatever channels it arrives on, classifying vouchers and pre-loading them. Final classification and anything filed with the tax authority is reviewed and signed by a professional.",
      ar: "في مكتب المحاسبة، ما يُؤتمت هو المدخلات: طلب المستندات شهرًا بعد شهر، واستلامها من القنوات التي تصل عبرها، وتصنيف المستندات وتحميلها مسبقًا. أما التصنيف النهائي وكل ما يُقدَّم إلى الجهة الضريبية فيراجعه ويوقّعه محاسب مرخّص.",
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
      ar: [
        "عنق الزجاجة في مكتب المحاسبة ليس في المحاسبة، بل في الحصول على المستندات. كل شهر يلاحق أحدهم أربعين عميلًا عبر واتساب للحصول على فواتير تصل بصيغة PDF أو صورة أو ملف مضغوط سيّئ الترتيب أو محوَّلة من بريد المورّد.",
        "ثم يأتي الإدخال، وهو عمل آلي كبير الحجم لا يحتمل الخطأ، ويزاحم على الساعات نفسها العملَ الذي يقدّره العميل فعلًا: الاستشارة.",
      ],
    },
    processes: [
      {
        title: {
          es: "Pedido y recepción de documentación",
          en: "Requesting and receiving documentation",
          ar: "طلب المستندات واستلامها",
        },
        detail: {
          es: "El agente pide lo que falta a cada cliente por su canal habitual, con el detalle de qué falta exactamente, e insiste hasta recibirlo. Es el proceso que más horas libera.",
          en: "The agent asks each client for what's missing on their usual channel, itemized, and follows up until it arrives. This is the process that frees the most hours.",
          ar: "يطلب الوكيل من كل عميل ما ينقصه على قناته المعتادة، مفصَّلًا بندًا بندًا، ويتابع حتى يصل. وهي العملية التي تحرّر أكبر عدد من الساعات.",
        },
      },
      {
        title: {
          es: "Clasificación y extracción de comprobantes",
          en: "Voucher classification and extraction",
          ar: "تصنيف المستندات واستخراج بياناتها",
        },
        detail: {
          es: "Lee facturas, recibos y extractos en cualquier formato, extrae los campos y detecta duplicados y faltantes de numeración.",
          en: "Reads invoices, receipts and statements in any format, extracts the fields and flags duplicates and gaps in numbering.",
          ar: "يقرأ الفواتير والإيصالات وكشوف الحسابات بأي صيغة، ويستخرج الحقول، ويرصد التكرار والانقطاع في التسلسل الرقمي.",
        },
      },
      {
        title: {
          es: "Precarga en el sistema contable",
          en: "Pre-loading into the accounting system",
          ar: "التحميل المسبق في النظام المحاسبي",
        },
        detail: {
          es: "Deja el asiento propuesto con la imputación sugerida a partir del histórico de ese cliente. El profesional revisa y confirma.",
          en: "Stages the proposed entry with a suggested classification drawn from that client's history. The professional reviews and confirms.",
          ar: "يجهّز القيد المقترح مع تصنيف مستنتج من سجل ذلك العميل. ثم يراجعه المحاسب ويؤكّده.",
        },
      },
      {
        title: {
          es: "Conciliación bancaria",
          en: "Bank reconciliation",
          ar: "التسوية البنكية",
        },
        detail: {
          es: "Cruza extractos contra comprobantes y deja para revisión sólo lo que no cerró, que suele ser entre el 5% y el 15%.",
          en: "Matches statements against vouchers and surfaces only what didn't reconcile — usually 5–15%.",
          ar: "يطابق كشوف الحسابات مع المستندات ولا يرفع للمراجعة سوى ما لم يُطابَق، وهو عادةً بين 5% و15%.",
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
      ar: [
        "النظام المحاسبي والضريبي",
        "واجهة واتساب للأعمال والبريد الإلكتروني",
        "البنوك وكشوف الحسابات",
        "الفوترة الإلكترونية",
        "أنظمة حفظ المستندات",
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
      ar: [
        "كل إقرار يُقدَّم إلى الجهة الضريبية، دون استثناء.",
        "التصنيف النهائي لأي مستند غير واضح.",
        "الاجتهاد الضريبي والاستشارة، وهما منتج المكتب الحقيقي.",
        "إبلاغ العميل بالمديونية أو الغرامات أو الإشعارات.",
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
      ar: [
        "قياس عدد الساعات الشهرية التي تذهب في ملاحقة المستندات. هذا الرقم وحده يبرّر المشروع.",
        "أتمتة الطلب والاستلام، فهي لا تمسّ النظام المحاسبي ولذلك تُنفَّذ سريعًا.",
        "إضافة استخراج بيانات المستندات وتصنيفها.",
        "وأخيرًا التحميل المسبق في النظام المحاسبي، وهو أدقّ الربطات وأكثرها حساسية.",
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
      ar: [
        "إذا كان لدى المكتب أقل من خمسة عشر عميلًا نشطًا، فملاحقة المستندات تُحلّ بجدول بيانات وتذكير.",
        "إذا كان لكل عميل عرف تصنيف مختلف وغير موثَّق، فلا بد من كتابة هذه الأعراف أولًا. الوكيل لا يستنتجها من العدم.",
        "إذا كان النظام المحاسبي مغلقًا ولا يتيح الاستيراد، فالتحميل المسبق غير ممكن ويقتصر المشروع على استلام المستندات.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Puede presentar declaraciones juradas?",
          en: "Can it file tax returns?",
          ar: "هل يستطيع تقديم الإقرارات الضريبية؟",
        },
        answer: {
          es: "No. Toda presentación ante el fisco la hace y firma un profesional matriculado. El agente prepara, ordena y precarga, que es donde están las horas; la responsabilidad profesional no es delegable a un sistema y no lo planteamos así en ninguna propuesta.",
          en: "No. Every filing is made and signed by a licensed professional. The agent prepares, organizes and pre-loads — that's where the hours are. Professional liability can't be delegated to a system, and we never propose it that way.",
          ar: "لا. كل إقرار يقدّمه ويوقّعه محاسب قانوني مرخّص. الوكيل يُعدّ ويرتّب ويحمّل مسبقًا، وهناك تكمن الساعات؛ أما المسؤولية المهنية فلا تُفوَّض إلى نظام، ولا نطرحها بهذه الصورة في أي عرض.",
        },
      },
      {
        question: {
          es: "¿Qué tan preciso es leyendo una factura fotografiada?",
          en: "How accurate is it reading a photographed invoice?",
          ar: "ما مدى دقّته في قراءة فاتورة مصوَّرة؟",
        },
        answer: {
          es: "Alto en los campos estructurados —número, fecha, CUIT, totales— y menor en el detalle de ítems cuando la foto está torcida o con poca luz. Por eso el resultado va a revisión y el sistema marca explícitamente su nivel de confianza en vez de entregar todo como si fuera igual de seguro.",
          en: "High on structured fields — number, date, tax ID, totals — and lower on line-item detail when the photo is skewed or badly lit. That's why output goes to review and the system flags its confidence explicitly instead of presenting everything as equally certain.",
          ar: "عالية في الحقول المهيكلة — الرقم والتاريخ والرقم الضريبي والإجماليات — وأقل في تفاصيل البنود حين تكون الصورة مائلة أو رديئة الإضاءة. لذلك تذهب المخرجات إلى المراجعة، ويعلن النظام مستوى ثقته صراحةً بدل تقديم كل شيء وكأنه بالدرجة نفسها من اليقين.",
        },
      },
    ],
  },

  {
    slug: {
      es: "distribuidoras-y-mayoristas",
      en: "distributors-and-wholesalers",
      ar: "distributors-and-wholesalers",
    },
    sector: {
      es: "Distribuidoras y mayoristas",
      en: "Distributors and wholesalers",
      ar: "شركات التوزيع والجملة",
    },
    title: {
      es: "Automatización con IA para distribuidoras y mayoristas",
      en: "AI automation for distributors and wholesalers",
      ar: "الأتمتة بالذكاء الاصطناعي لشركات التوزيع والبيع بالجملة",
    },
    description: {
      es: "Cómo se automatiza con IA la toma de pedidos por WhatsApp, la carga al ERP y el seguimiento de entregas en una distribuidora, sin perder el control de precios y stock.",
      en: "How AI automates order taking over WhatsApp, ERP entry and delivery tracking at a distributor, without losing control of pricing and stock.",
      ar: "كيف تُؤتمت بالذكاء الاصطناعي استقبال الطلبات عبر واتساب وإدخالها في نظام ERP ومتابعة التسليم في شركة توزيع، دون فقدان السيطرة على الأسعار والمخزون.",
    },
    answer: {
      es: "En una distribuidora el proceso que más paga es la toma de pedidos: entender el pedido que llega por WhatsApp, verificar stock y precio del cliente, y cargarlo al ERP en el momento. Entre el 60% y el 85% se resuelve solo; el descuento fuera de política y el cliente con deuda escalan siempre.",
      en: "At a distributor, the process that pays most is order taking: understanding an order that arrives over WhatsApp, checking stock and customer-specific pricing, and posting it to the ERP immediately. 60–85% resolves on its own; out-of-policy discounts and customers with overdue balances always escalate.",
      ar: "في شركة التوزيع، أكثر العمليات عائدًا هي استقبال الطلبات: فهم الطلب الوارد عبر واتساب، والتحقق من المخزون ومن سعر ذلك العميل تحديدًا، وإدخاله إلى نظام ERP فورًا. ما بين 60% و85% يُحلّ ذاتيًا؛ أما الخصم خارج السياسة والعميل المتأخر في السداد فيُحالان دائمًا إلى شخص.",
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
      ar: [
        "في شركة التوزيع تصل الطلبات عبر واتساب في كل ساعة: نصًا ورسائل صوتية وصورًا لقوائم مكتوبة بخط اليد. ثم ينسخها أحدهم إلى النظام، في فترة ما بعد الظهر غالبًا، ومن حين لآخر يضيع طلب بين الرسائل.",
        "والتكلفة ليست ساعة النسخ فحسب: بل الطلب الذي وصل مساء الخميس وأُدخل يوم الأحد، وخطأ الكتابة الذي تسبّب في مرتجع، وسجل الطلبات الذي يعيش على الهواتف الشخصية لثلاثة مندوبين.",
      ],
    },
    processes: [
      {
        title: {
          es: "Toma de pedidos por WhatsApp",
          en: "Order taking over WhatsApp",
          ar: "استقبال الطلبات عبر واتساب",
        },
        detail: {
          es: "Interpreta texto, audio y fotos, resuelve «las de siempre» contra el historial del cliente y confirma antes de cargar.",
          en: 'Interprets text, voice notes and photos, resolves "the usual ones" against that customer\'s history, and confirms before posting.',
          ar: "يفسّر النص والرسائل الصوتية والصور، ويحلّ عبارة «الأصناف المعتادة» بالرجوع إلى سجل ذلك العميل، ويؤكّد قبل الإدخال.",
        },
      },
      {
        title: {
          es: "Verificación de stock y precio",
          en: "Stock and price verification",
          ar: "التحقق من المخزون والسعر",
        },
        detail: {
          es: "Contra el ERP y la lista de precios de ese cliente, incluyendo condición de pago y estado de cuenta.",
          en: "Against the ERP and that customer's price list, including payment terms and account status.",
          ar: "مقابل نظام ERP وقائمة أسعار ذلك العميل، بما في ذلك شروط السداد وحالة الحساب.",
        },
      },
      {
        title: {
          es: "Carga al ERP",
          en: "ERP entry",
          ar: "الإدخال في نظام ERP",
        },
        detail: {
          es: "Con todos los campos que el ERP exige y que el cliente nunca menciona: depósito, lista, condición, centro de costos.",
          en: "With every field the ERP demands and the customer never mentions: warehouse, price list, terms, cost center.",
          ar: "بكل الحقول التي يطلبها النظام ولا يذكرها العميل أبدًا: المستودع وقائمة الأسعار والشروط ومركز التكلفة.",
        },
      },
      {
        title: {
          es: "Seguimiento de entregas y reclamos",
          en: "Delivery tracking and claims",
          ar: "متابعة التسليم والشكاوى",
        },
        detail: {
          es: "Responde estado de pedido y fecha de entrega, y arma el reclamo con la información completa cuando algo llegó mal.",
          en: "Answers order status and delivery dates, and assembles a complete claim when something arrived wrong.",
          ar: "يجيب عن حالة الطلب وموعد التسليم، ويجهّز شكوى مكتملة المعلومات حين يصل شيء على غير ما ينبغي.",
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
      ar: [
        "نظام ERP",
        "واجهة واتساب للأعمال (WhatsApp Business API)",
        "نظام المخزون والمستودعات",
        "قوائم الأسعار الخاصة بكل عميل",
        "النقل والخدمات اللوجستية",
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
      ar: [
        "أي خصم خارج السياسة السارية.",
        "العملاء المتأخرون في السداد أو أصحاب الحسابات الموقوفة.",
        "فتح ملفات عملاء جدد بلا حساب.",
        "الشكاوى والعملاء الغاضبون، فورًا.",
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
      ar: [
        "التأكد مما إذا كان نظام ERP يتيح واجهة برمجية وبيئة اختبار. وهي المعلومة الأكثر تأثيرًا في الميزانية.",
        "تصدير ثلاثة أشهر من المحادثات الحقيقية لبناء مجموعة التقييم من طلبات فعلية.",
        "البدء بوضع مساعِد: الوكيل يجهّز الطلب ويؤكده شخص قبل الإدخال.",
        "الانتقال إلى الإدخال التلقائي حسب نوع الطلب، بقدر ما تدعمه الأرقام.",
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
      ar: [
        "إذا لم يكن الكتالوج موحّدًا وظهر المنتج نفسه بثلاثة أكواد مختلفة، فابدأ بذلك. الوكيل يضخّم أي فوضى في ملف الأصناف.",
        "إذا كنت تبيع أقل من خمسين طلبًا أسبوعيًا، فالمندوب يُدخلها أسرع مما يكلّفه المشروع.",
        "إذا كان كل طلب يحتاج إلى دراسة هندسية أو تسعيرة خاصة، فهذا ليس استقبال طلبات بل بيعًا استشاريًا، وهو لا يُؤتمت.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Qué pasa si entiende mal un pedido?",
          en: "What if it misreads an order?",
          ar: "ماذا لو أساء فهم طلب؟",
        },
        answer: {
          es: "Confirma siempre con el cliente antes de cargar, en los términos del cliente y no en códigos internos. Cuando hay dos productos candidatos con probabilidad parecida, pregunta en vez de elegir: una devolución cuesta mucho más que veinte preguntas.",
          en: "It always confirms with the customer before posting, in the customer's terms rather than internal codes. When two products are similarly likely, it asks instead of choosing: a return costs far more than twenty questions.",
          ar: "يؤكّد دائمًا مع العميل قبل الإدخال، وبمصطلحات العميل لا بالأكواد الداخلية. وحين يتساوى احتمال منتجَين، يسأل بدل أن يختار: فالمرتجع أغلى بكثير من عشرين سؤالًا.",
        },
      },
      {
        question: {
          es: "¿Funciona con pedidos por audio?",
          en: "Does it work with voice-note orders?",
          ar: "هل يعمل مع الطلبات الصوتية؟",
        },
        answer: {
          es: "Sí, y es una parte grande del volumen real. La transcripción se corrige contra el catálogo, porque los nombres propios de producto se transcriben mal. Las cantidades sacadas de un audio se confirman siempre con el cliente antes de cargar, sin excepción.",
          en: "Yes, and it's a large share of real volume. Transcription is corrected against the catalogue, because product names specific to the business transcribe poorly. Quantities taken from a voice note are always confirmed with the customer before posting, without exception.",
          ar: "نعم، وهي حصة كبيرة من الحجم الحقيقي. ويُصحَّح التفريغ النصي بالرجوع إلى الكتالوج، لأن أسماء المنتجات الخاصة بالشركة تُفرَّغ بصورة رديئة. أما الكميات المأخوذة من رسالة صوتية فتُؤكَّد دائمًا مع العميل قبل الإدخال، دون استثناء.",
        },
      },
    ],
  },

  {
    slug: { es: "ecommerce", en: "ecommerce", ar: "ecommerce" },
    sector: { es: "Ecommerce", en: "Ecommerce", ar: "التجارة الإلكترونية" },
    title: {
      es: "Automatización con IA para ecommerce",
      en: "AI automation for ecommerce",
      ar: "الأتمتة بالذكاء الاصطناعي للتجارة الإلكترونية",
    },
    description: {
      es: "Cómo se automatiza con IA la atención posventa, el estado de pedidos y las devoluciones en un ecommerce, sin que un sistema decida solo sobre reembolsos.",
      en: "How AI automates post-purchase support, order status and returns in ecommerce, without a system deciding refunds on its own.",
      ar: "كيف تُؤتمت بالذكاء الاصطناعي خدمة ما بعد الشراء وحالة الطلبات والمرتجعات في متجر إلكتروني، دون أن يقرّر نظام استرداد الأموال وحده.",
    },
    answer: {
      es: "En un ecommerce la mayor parte del volumen de atención es posventa y repetitiva: dónde está mi pedido, cómo cambio un talle, cómo devuelvo. Eso se automatiza bien y resuelve entre el 60% y el 80% de los tickets. El reembolso y la excepción de política quedan con aprobación humana.",
      en: "In ecommerce, most support volume is post-purchase and repetitive: where's my order, how do I change a size, how do I return it. That automates well and resolves 60–80% of tickets. Refunds and policy exceptions stay under human approval.",
      ar: "في التجارة الإلكترونية، معظم حجم خدمة العملاء يقع بعد الشراء ويتكرر: أين طلبي، كيف أبدّل المقاس، كيف أرجع المنتج. هذا يُؤتمت جيدًا ويحلّ ما بين 60% و80% من التذاكر. أما استرداد الأموال والاستثناء من السياسة فيبقيان باعتماد بشري.",
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
      ar: [
        "في متجر إلكتروني متوسط، ما بين 60% و80% من التذاكر هي أربعة أسئلة: أين طلبي، ومتى يصل، وكيف أبدّله، وكيف أرجعه. لكلها إجابة موجودة في نظام ما، ولا يحتاج أي منها إلى اجتهاد.",
        "والمشكلة أن هذه الأسئلة الأربعة تصل عبر إنستغرام وواتساب والبريد ومحادثة الموقع، فيقضي فريق الخدمة يومه في نسخ أرقام التتبع من نافذة إلى أخرى بدل معالجة الحالات التي تحتاج فعلًا إلى إنسان.",
      ],
    },
    processes: [
      {
        title: {
          es: "Estado de pedido y seguimiento",
          en: "Order status and tracking",
          ar: "حالة الطلب وتتبّعه",
        },
        detail: {
          es: "Identifica al cliente, encuentra el pedido y responde con el estado real del transporte, no con el estado de la plataforma.",
          en: "Identifies the customer, finds the order and answers with the carrier's real status, not the platform's.",
          ar: "يتعرّف على العميل ويجد الطلب ويجيب بالحالة الحقيقية لدى شركة الشحن، لا بحالة المنصة.",
        },
      },
      {
        title: {
          es: "Cambios y devoluciones",
          en: "Exchanges and returns",
          ar: "الاستبدال والمرتجعات",
        },
        detail: {
          es: "Verifica que el caso entre en política, genera la etiqueta y explica los pasos. Lo que no entra en política escala.",
          en: "Checks the case against policy, generates the label and explains the steps. Anything outside policy escalates.",
          ar: "يتحقق من مطابقة الحالة للسياسة، ويصدر بطاقة الإرجاع، ويشرح الخطوات. وما يخرج عن السياسة يُحال إلى شخص.",
        },
      },
      {
        title: {
          es: "Consultas de producto y talle",
          en: "Product and sizing questions",
          ar: "أسئلة المنتج والمقاسات",
        },
        detail: {
          es: "Responde sobre la ficha real del producto y el historial de compras del cliente, no sobre generalidades.",
          en: "Answers from the actual product data and the customer's purchase history, not from generalities.",
          ar: "يجيب من بيانات المنتج الفعلية ومن سجل مشتريات العميل، لا من عموميات.",
        },
      },
      {
        title: {
          es: "Recupero de carrito y posventa",
          en: "Cart recovery and post-purchase",
          ar: "استعادة السلة وما بعد الشراء",
        },
        detail: {
          es: "Retoma el carrito abandonado con un mensaje que responde la duda concreta, en vez de un descuento automático.",
          en: "Re-engages an abandoned cart by answering the specific hesitation, rather than firing off an automatic discount.",
          ar: "يعاود التواصل بشأن السلة المتروكة بالإجابة عن التردّد المحدّد، بدل إطلاق خصم تلقائي.",
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
      ar: [
        "منصة التجارة الإلكترونية",
        "الشحن والخدمات اللوجستية",
        "واجهة واتساب للأعمال وإنستغرام",
        "بوابة الدفع",
        "نظام مكتب المساعدة",
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
      ar: [
        "استرداد الأموال والإشعارات الدائنة.",
        "الاستثناءات من سياسة الاستبدال.",
        "الشكاوى بشأن منتج تالف أو طلب لم يصل.",
        "أي عميل يطلب التحدث إلى شخص.",
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
      ar: [
        "تصنيف آخر ألف تذكرة حسب النوع. ترتيب الأولويات يخرج من هذا وحده.",
        "أتمتة حالة الطلب، وهي عادةً 40% من الحجم وبيانات صرفة.",
        "إضافة الاستبدال والمرتجعات ضمن السياسة.",
        "وفي النهاية فقط، أسئلة المنتج، لأنها تعتمد على جودة بطاقة المنتج.",
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
      ar: [
        "إذا كانت المشكلة الحقيقية لوجستية — أي أن الطلبات تصل متأخرة — فأتمتة الخدمة تعني فقط إيصال الخبر السيّئ أسرع.",
        "إذا كنت تبيع طلبات قليلة مرتفعة القيمة، فالخدمة الشخصية جزء من المنتج.",
        "إذا كانت بطاقة المنتج فقيرة المحتوى، فلن يستطيع الوكيل الإجابة عن أسئلة المنتج وسيحيل كل شيء تقريبًا.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Puede procesar un reembolso solo?",
          en: "Can it process a refund on its own?",
          ar: "هل يستطيع تنفيذ استرداد مالي وحده؟",
        },
        answer: {
          es: "Técnicamente sí, y en la primera versión recomendamos que no. Un reembolso es irreversible y mueve plata: el agente arma el caso completo con la verificación ya hecha y una persona aprueba con un clic. Después de tres meses de datos se puede automatizar por tramos de monto.",
          en: "Technically yes, and in the first version we recommend against it. A refund is irreversible and moves money: the agent assembles the complete case with verification done, and a person approves in one click. After three months of data you can automate it by amount tier.",
          ar: "تقنيًا نعم، وفي النسخة الأولى ننصح بعكس ذلك. الاسترداد إجراء لا رجعة فيه ويحرّك أموالًا: يجهّز الوكيل الحالة كاملة والتحقق منجَز، ويعتمدها شخص بنقرة واحدة. وبعد ثلاثة أشهر من البيانات يمكن أتمتتها حسب شرائح المبالغ.",
        },
      },
      {
        question: {
          es: "¿Sirve para atender por Instagram?",
          en: "Does it work for Instagram support?",
          ar: "هل يصلح للخدمة عبر إنستغرام؟",
        },
        answer: {
          es: "Sí, y en varios rubros es el canal con más volumen. La diferencia con WhatsApp es que muchas consultas llegan como respuesta a una historia y sin contexto, así que la identificación del cliente y del pedido requiere más ida y vuelta antes de poder responder algo concreto.",
          en: "Yes, and in several categories it's the highest-volume channel. The difference from WhatsApp is that many enquiries arrive as story replies with no context, so identifying the customer and the order takes more back-and-forth before anything concrete can be answered.",
          ar: "نعم، وفي قطاعات عدة هو القناة الأكبر حجمًا. والفرق عن واتساب أن كثيرًا من الاستفسارات تصل كردّ على قصة وبلا سياق، فيتطلب تحديد العميل والطلب مزيدًا من التراسل قبل الوصول إلى إجابة محددة.",
        },
      },
    ],
  },

  {
    slug: { es: "estudios-juridicos", en: "law-firms", ar: "law-firms" },
    sector: { es: "Estudios jurídicos", en: "Law firms", ar: "مكاتب المحاماة" },
    title: {
      es: "Automatización con IA para estudios jurídicos",
      en: "AI automation for law firms",
      ar: "الأتمتة بالذكاء الاصطناعي لمكاتب المحاماة",
    },
    description: {
      es: "Cómo se automatiza con IA la admisión de casos, la revisión documental y el seguimiento de expedientes en un estudio jurídico, con criterio profesional en cada salida.",
      en: "How AI automates intake, document review and case tracking at a law firm, with professional judgement on every output.",
      ar: "كيف تُؤتمت بالذكاء الاصطناعي قبول القضايا ومراجعة المستندات ومتابعة الملفات في مكتب محاماة، مع اجتهاد مهني في كل مخرج.",
    },
    answer: {
      es: "En un estudio jurídico se automatiza la admisión —calificar la consulta, reunir la documentación y armar el legajo— y la revisión documental de alto volumen. El criterio jurídico, la estrategia y todo lo que se presenta lleva revisión y firma profesional, sin excepción.",
      en: "At a law firm, what gets automated is intake — qualifying the enquiry, gathering documentation and assembling the file — plus high-volume document review. Legal judgement, strategy and anything filed carries professional review and signature, without exception.",
      ar: "في مكتب المحاماة يُؤتمت القبول — تصفية الاستشارة وجمع المستندات وتجهيز الملف — إضافة إلى مراجعة المستندات كبيرة الحجم. أما الاجتهاد القانوني والاستراتيجية وكل ما يُقدَّم فيمرّ بمراجعة وتوقيع مهني، دون استثناء.",
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
      ar: [
        "يخسر المكتب ساعات قابلة للفوترة في موضعين لا يشبه أحدهما الآخر. الأول هو القبول: استشارات لا تجتاز التصفية، ومستندات تصل ناقصة، وملاحقة عميل وعد بإرسال شيء ولم يرسله.",
        "والثاني هو المراجعة كبيرة الحجم: قراءة ثلاثمئة عقد متشابه بحثًا عن ثلاثة بنود، أو تمشيط ملف من ألف صفحة بحثًا عن تواريخ. عمل يحتاج إلى اجتهاد ليقرّر، لا ليجد.",
      ],
    },
    processes: [
      {
        title: {
          es: "Admisión y calificación de consultas",
          en: "Intake and enquiry qualification",
          ar: "القبول وتصفية الاستشارات",
        },
        detail: {
          es: "Reúne los hechos, la documentación y los plazos, y arma el legajo antes de que el abogado dedique la primera hora.",
          en: "Gathers facts, documentation and deadlines, and assembles the file before a lawyer spends the first hour.",
          ar: "يجمع الوقائع والمستندات والمواعيد، ويجهّز الملف قبل أن ينفق المحامي ساعته الأولى.",
        },
      },
      {
        title: {
          es: "Recolección de documentación",
          en: "Document collection",
          ar: "جمع المستندات",
        },
        detail: {
          es: "Pide lo que falta, insiste, verifica que lo recibido sea legible y completo, y avisa cuando está listo para revisión.",
          en: "Requests what's missing, follows up, verifies that what arrived is legible and complete, and flags when it's ready for review.",
          ar: "يطلب ما ينقص ويتابع، ويتحقق من أن ما وصل مقروء ومكتمل، وينبّه حين يصبح جاهزًا للمراجعة.",
        },
      },
      {
        title: {
          es: "Revisión documental de volumen",
          en: "High-volume document review",
          ar: "مراجعة المستندات كبيرة الحجم",
        },
        detail: {
          es: "Localiza cláusulas, fechas, montos y partes en corpus grandes, y devuelve cada hallazgo con la cita al documento de origen.",
          en: "Locates clauses, dates, amounts and parties across large corpora, returning each finding with a citation to the source document.",
          ar: "يحدّد البنود والتواريخ والمبالغ والأطراف في مجموعات ضخمة من المستندات، ويعيد كل نتيجة مع إحالة إلى المستند المصدر.",
        },
      },
      {
        title: {
          es: "Seguimiento de expedientes y plazos",
          en: "Case and deadline tracking",
          ar: "متابعة الملفات والمواعيد",
        },
        detail: {
          es: "Monitorea movimientos, calcula vencimientos y avisa con anticipación al responsable de cada causa.",
          en: "Monitors filings, computes deadlines and alerts the lawyer responsible for each matter in advance.",
          ar: "يراقب حركة الملفات، ويحتسب المواعيد النهائية، وينبّه المحامي المسؤول عن كل قضية مسبقًا.",
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
      ar: [
        "نظام إدارة مكاتب المحاماة",
        "أنظمة الاستعلام عن القضايا لدى المحاكم",
        "أنظمة حفظ المستندات",
        "البريد الإلكتروني وواجهة واتساب للأعمال",
        "الفوترة وضبط ساعات العمل",
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
      ar: [
        "كل اجتهاد واستراتيجية قانونية.",
        "أي مذكرة تُقدَّم، مراجَعة وموقَّعة.",
        "تقديم المشورة للعميل في قضيته.",
        "قرار قبول القضية أو رفضها.",
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
      ar: [
        "قياس عدد الساعات غير القابلة للفوترة التي تذهب في القبول وفي ملاحقة المستندات.",
        "أتمتة جمع المستندات، فهي متابعة صرفة ولا تمسّ الاجتهاد.",
        "إضافة القبول المهيكل للاستشارات الجديدة.",
        "أما مراجعة المستندات كبيرة الحجم فتأتي أخيرًا، ودائمًا مع الإحالة إلى المستند المصدر.",
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
      ar: [
        "إذا كان المكتب صغيرًا ويتولّى قضايا فريدة عالية التعقيد، فلا يوجد حجم يُؤتمت ولن يسدّد المشروع كلفته.",
        "لا يذهب أي مخرج من نظام إلى ملف قضية دون مراجعة مهنية. وإذا أوحى عرض أي مورّد بغير ذلك، فتلك إشارة إلى الانسحاب.",
        "إذا كانت مستندات المكتب تعيش على الورق أو في مجلدات بلا نظام، فالرقمنة تأتي أولًا.",
      ],
    },
    faq: [
      {
        question: {
          es: "¿Puede redactar escritos?",
          en: "Can it draft filings?",
          ar: "هل يستطيع صياغة المذكرات؟",
        },
        answer: {
          es: "Puede producir borradores a partir de los modelos del estudio y del legajo, lo que ahorra tiempo real. Pero es un borrador: la revisión profesional no es opcional y el sistema está construido para que cada afirmación sea rastreable hasta el documento del que salió.",
          en: "It can produce drafts from the firm's own templates and the case file, which saves real time. But it's a draft: professional review isn't optional, and the system is built so every assertion traces back to the document it came from.",
          ar: "يستطيع إنتاج مسوّدات انطلاقًا من نماذج المكتب ومن ملف القضية، وهذا يوفّر وقتًا حقيقيًا. لكنها مسوّدة: المراجعة المهنية ليست اختيارية، والنظام مبني بحيث يمكن تتبّع كل عبارة إلى المستند الذي جاءت منه.",
        },
      },
      {
        question: {
          es: "¿Cómo se maneja la confidencialidad?",
          en: "How is confidentiality handled?",
          ar: "كيف تُدار السرية؟",
        },
        answer: {
          es: "Todo corre en la infraestructura del estudio o en la nube que el estudio defina, con acceso acotado por causa y registro de cada consulta. No se usan datos para entrenar modelos y se trabaja con retención cero del lado del proveedor cuando el caso lo exige.",
          en: "Everything runs in the firm's infrastructure or the cloud the firm designates, with per-matter access scoping and a log of every query. Data is never used to train models, and we run zero-retention with the provider when the matter requires it.",
          ar: "يعمل كل شيء في البنية التحتية للمكتب أو في السحابة التي يحدّدها المكتب، بصلاحيات محصورة بكل قضية وبسجل لكل استعلام. ولا تُستخدم البيانات لتدريب النماذج، ونعمل بسياسة عدم الاحتفاظ بالبيانات لدى المزوّد حين تتطلب القضية ذلك.",
        },
      },
    ],
  },
]

/** Segmento de la ruta por idioma. */
const SEGMENT: Record<Lang, string> = {
  es: "soluciones",
  en: "solutions",
  // El slug árabe se mantiene en ASCII: una URL en árabe se percent-encodea
  // y queda ilegible al copiarla, compartirla o leerla en un informe.
  ar: "solutions",
}

export function solutionsIndexPath(lang: Lang): string {
  return localizePath(lang, `/${SEGMENT[lang]}/`)
}

export function solutionPath(lang: Lang, solution: Solution): string {
  return `${solutionsIndexPath(lang)}${solution.slug[lang]}/`
}

export function findSolution(lang: Lang, slug: string): Solution | undefined {
  return SOLUTIONS.find((solution) => solution.slug[lang] === slug)
}

/**
 * Las industrias foco, en el orden en que se declaran.
 *
 * Es la lista que consume la portada. Se deriva de la bandera en vez de
 * mantenerse aparte para que no puedan desincronizarse: agregar `focus: true`
 * a un sector lo pone en la home, en el índice arriba de todo y en `llms.txt`
 * con tratamiento propio, en un solo movimiento.
 */
export const FOCUS_SOLUTIONS: Solution[] = SOLUTIONS.filter((s) => s.focus)

/** El resto de los sectores. Siguen indexados; no se promocionan. */
export const OTHER_SOLUTIONS: Solution[] = SOLUTIONS.filter((s) => !s.focus)

/** Todos, con las industrias foco primero. Para el índice de soluciones. */
export const ORDERED_SOLUTIONS: Solution[] = [
  ...FOCUS_SOLUTIONS,
  ...OTHER_SOLUTIONS,
]
