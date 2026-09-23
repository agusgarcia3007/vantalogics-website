import { type Lang } from "@/i18n"
import {
  SOLUTIONS,
  solutionPath,
  type Item,
  type Localized,
  type LocalizedList,
  type Solution,
} from "@/data/solutions"

export interface UseCase {
  solution: string
  slug: Localized
  title: Localized
  description: Localized
  answer: Localized
  intro: LocalizedList
  steps: Item[]
  measures: LocalizedList
  requires: LocalizedList
  notThis: LocalizedList
  faq: { question: Localized; answer: Localized }[]
}

export const USE_CASES: UseCase[] = [
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
