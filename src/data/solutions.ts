import { localizePath, type Lang } from "@/i18n"

/**
 * La página de sector (la capa programática del sitio).
 *
 * Vantalogics es una agencia de IA para EdTech, así que hay un solo sector. El
 * archivo conserva la forma de lista porque la ruta, el sitemap y los casos de
 * uso se generan desde acá, y porque un día puede partirse en subsectores
 * —universidades, K-12, formación corporativa— sin rehacer las plantillas.
 *
 * Cada sector declara procesos reales, sistemas reales del rubro y una lista
 * explícita de cuándo NO conviene. Esa última sección es la que separa una
 * página útil de una granja de contenido: dice algo que sólo puede decir
 * alguien que hizo el trabajo, y es lo que la vuelve citable por un motor de
 * respuesta.
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
]

/** Segmento de la ruta por idioma. */
const SEGMENT: Record<Lang, string> = {
  es: "soluciones",
  en: "solutions",
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

/** Los sectores, en el orden en que se declaran. */
export const ORDERED_SOLUTIONS: Solution[] = SOLUTIONS

/** El sector principal: el que protagoniza la portada y el índice. */
export const EDTECH: Solution = SOLUTIONS[0]
