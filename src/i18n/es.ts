/**
 * Todo el texto del sitio, en un solo lugar.
 *
 * Dos convenciones que vienen del diseño:
 *
 * 1. Los titulares de sección vienen partidos en `titleMuted` + `titleBright`.
 *    Es una sola frase —se lee de corrido y el lector de pantalla la anuncia
 *    entera—, pero el remate se imprime en tinta plena y con el trazo de lápiz
 *    rojo debajo, así que el ojo lo agarra antes de terminar de leer.
 * 2. `annotation` es la letra al margen: una línea corta, en cursiva y en rojo,
 *    que comenta lo que dice el bloque en vez de repetirlo. Si no aporta algo
 *    que el bloque no dice, se deja vacía.
 */
export const es = {
  htmlLang: "es",
  ogLocale: "es_ES",

  meta: {
    title: "Vantalogics — La agencia de IA para EdTech",
    description:
      "Construimos tutores, corrección asistida y búsqueda con citas adentro de plataformas educativas. Evaluados con tus casos reales y con el costo por alumno calculado antes de construir.",
    imageAlt: "Vantalogics — agencia de IA para EdTech",
  },

  a11y: {
    skip: "Saltar al contenido",
    home: "Vantalogics, ir al inicio",
    mainNav: "Principal",
    mobileNav: "Principal, móvil",
    logoAlt: "Logotipo de Vantalogics",
  },

  nav: {
    items: [
      { href: "#capacidades", label: "Qué construimos" },
      { href: "#proceso", label: "Cómo trabajamos" },
      { href: "/soluciones/edtech-y-plataformas-educativas/", label: "EdTech" },
      { href: "/blog/", label: "Notas" },
    ],
    cta: "Agendar diagnóstico",
    menu: "Menú",
    close: "Cerrar",
    tagline: "IA para plataformas educativas",
  },

  theme: {
    label: "Tema",
    toDark: "Activar modo oscuro",
    toLight: "Activar modo claro",
  },

  language: {
    label: "Idioma",
    name: "Español",
    switchTo: "Ver en español",
  },

  hero: {
    eyebrow: "Agencia de IA para EdTech",
    /** El titular se imprime en dos partes: la segunda lleva el trazo rojo. */
    title: "Ponemos IA adentro de tu plataforma educativa",
    titleMark: "sin que invente.",
    lead: "Tutores acotados al curso, corrección con rúbrica y búsqueda que cita el módulo y el minuto del video. Probados contra tus propios casos antes de que los vea un alumno.",
    ctaPrimary: "Agendar diagnóstico",
    ctaSecondary: "Probar el agente",
    note: "30 minutos, sin costo. Salís con el inventario de tu contenido, el alcance del primer sistema y el costo estimado por alumno activo.",
    annotation: "Una sola vertical: educación.",
    /** Rótulos de la ficha que acompaña al campo de puntos del hero. */
    field: {
      label: "Consulta de un alumno",
      question: "«¿Por qué me dio 0,84 el R² del ejercicio 3?»",
      steps: [
        {
          title: "Busca en el material del curso",
          detail: "Unidad 4, video 2 — minuto 12:40",
        },
        {
          title: "Responde citando el pasaje",
          detail: "Con enlace al momento exacto de la clase",
        },
        {
          title: "Se detiene antes de la entrega",
          detail: "No resuelve el ejercicio evaluado: acompaña hasta el paso anterior",
        },
      ],
      footnote:
        "Si el material no cubre la pregunta, lo dice. Esa respuesta también se evalúa.",
    },
  },

  /**
   * La franja de confianza.
   *
   * En vez de logos de clientes —que a esta altura serían prestados— dice
   * dónde vive el sistema. Los estándares del rubro hacen el mismo trabajo que
   * un muro de logos («esto se enchufa a tu mundo real») y son verificables.
   */
  signals: {
    title: "Se integra con lo que ya tenés",
    note: "Por API o por estándar del rubro. Si tu plataforma es propia, se integra igual: es el caso más común.",
    items: [
      "Moodle",
      "Canvas",
      "Open edX",
      "Google Classroom",
      "LTI 1.3",
      "xAPI y SCORM",
      "Tu SIS",
      "Tu propia app",
    ],
  },

  thesis: {
    label: "El problema",
    titleMuted: "Un chatbot sobre tu contenido",
    titleBright: "no es un tutor.",
    body: [
      "Poner un modelo genérico encima de un curso es media tarde de trabajo, y por eso ya lo probó casi todo el sector. Lo que aparece después es siempre lo mismo: responde bien sobre el mundo y mal sobre la materia, y nadie puede decir si mejoró o empeoró con el último cambio.",
      "Lo que construimos empieza por el otro lado: qué tiene que recuperar, qué no puede contestar nunca, cuánto sale cada respuesta y cómo se prueba todo eso antes de abrirlo. Recién ahí se elige el modelo.",
    ],
    annotation: "Lo caro no es el modelo: es lo que el modelo dice mal.",
    items: [
      {
        title: "Contesta lo que no está en el curso.",
        detail:
          "Cuando el material no cubre la pregunta, el modelo completa con lo que recuerda de internet. En un curso pago, eso es un reclamo.",
      },
      {
        title: "Resuelve la entrega evaluada.",
        detail:
          "El alumno le pega la consigna y la hace. La plataforma terminó automatizando la trampa que dice combatir.",
      },
      {
        title: "Cuesta más de lo que cobra.",
        detail:
          "Uso alto e ingreso por alumno bajo: sin costo por alumno activo calculado antes, la función se come el margen del plan que la vende.",
      },
      {
        title: "Nadie puede probar que mejoró.",
        detail:
          "Sin un set de evaluación propio no hay forma de comparar dos versiones del tutor. Cada cambio pasa a ser una apuesta.",
      },
    ],
  },

  capabilities: {
    label: "Qué construimos",
    titleMuted: "Cuatro sistemas.",
    titleBright: "Los cuatro terminan en producción.",
    intro:
      "No entregamos un informe ni un prototipo para demo. Cada uno de estos se despliega con tus datos, se mide contra casos reales y queda operando en tu infraestructura.",
    items: [
      {
        index: "01",
        title: "Tutor acotado al curso",
        summary:
          "Responde con el material de la unidad, dice «esto no está en el curso» en vez de completar y no resuelve la entrega evaluada: acompaña hasta el paso anterior y ahí se detiene.",
        items: [
          "Alcance atado a lo que el alumno tiene habilitado",
          "Límite explícito frente a la evaluación",
          "Voz y nivel del curso, no del modelo",
          "Escalado a un docente cuando hace falta",
        ],
      },
      {
        index: "02",
        title: "Corrección asistida con rúbrica",
        summary:
          "Borrador de nota y devolución criterio por criterio, con la evidencia citada del propio texto del alumno. El docente ajusta y firma. Ahí están las horas que hoy se pierden.",
        items: [
          "La rúbrica se vuelve explícita y comprobable",
          "Un criterio por vez, no una nota de golpe",
          "Interfaz de revisión con la diferencia a la vista",
          "Distancia entre borrador y nota final, medida",
        ],
      },
      {
        index: "03",
        title: "Búsqueda con cita sobre tu contenido",
        summary:
          "Recuperación sobre tus cursos, transcripciones y materiales, con la cita al módulo y al minuto del video. Es la base de todo lo demás: sin esto, cualquier tutor responde de memoria.",
        items: [
          "Transcripción e indexado del video existente",
          "Vocabulario del dominio, no genérico",
          "Devuelve el pasaje, no el curso entero",
          "Respeta permisos y matriculación",
        ],
      },
      {
        index: "04",
        title: "Evaluación, costo y operación",
        summary:
          "Un set de evaluación con tus casos reales —incluidas las preguntas cuya respuesta correcta es «no está en el material»— y el costo por alumno activo bajo control desde el primer día.",
        items: [
          "Evals que corren en cada cambio, no una vez",
          "Alerta cuando la calidad baja del umbral",
          "Costo y latencia por respuesta, a la vista",
          "Traza completa de qué citó y por qué",
        ],
      },
    ],
  },

  /**
   * Casos.
   *
   * La sección se imprime sola desde `src/data/cases.ts` y desaparece entera
   * mientras no haya ninguno publicado: una grilla de «próximamente» es peor
   * que no tener la sección.
   */
  cases: {
    label: "Casos",
    titleMuted: "Lo que dejamos",
    titleBright: "corriendo.",
    intro:
      "Cada caso dice qué se construyó, contra qué número se midió y qué había que resolver antes de empezar. Los números son los del cliente, publicados con su permiso.",
    contextLabel: "Punto de partida",
    workLabel: "Qué construimos",
    resultLabel: "Qué se movió",
    stackLabel: "Con qué se integró",
  },

  agentDemo: {
    label: "Probalo ahora",
    titleMuted: "Este sitio tiene",
    titleBright: "un agente adentro.",
    body: "Es el mismo tipo de sistema que construimos para plataformas educativas, corriendo en producción: consulta información real, anota lo que le contás y pide permiso antes de pasarle tu contacto a una persona. No es un video ni una demo grabada.",
    annotation: "Preguntale algo que no esté en el sitio y mirá qué contesta.",
    points: [
      "Cada paso que da queda escrito en el chat",
      "No manda nada sin que vos lo apruebes",
      "Si no sabe, lo dice en vez de inventar",
    ],
  },

  process: {
    label: "Cómo trabajamos",
    titleMuted: "De tu contenido",
    titleBright: "a un sistema con alumnos adentro.",
    steps: [
      {
        step: "01",
        title: "Diagnóstico",
        body: "Media hora con quien conoce el contenido y el producto. Salís con el inventario del material, el primer sistema recomendado y el costo estimado por alumno activo.",
        meta: "30 minutos · sin costo",
      },
      {
        step: "02",
        title: "Evidencia antes que código",
        body: "Armamos el set de evaluación con tus casos reales y la métrica que tiene que moverse. Es lo que después permite decir si el sistema mejoró, y lo que casi nadie construye.",
        meta: "Primeras semanas",
      },
      {
        step: "03",
        title: "Producción acotada",
        body: "Sale con alumnos de verdad, pero en un alcance chico: una materia, un curso, una cohorte. Se abre al resto cuando los números aguantan, no antes.",
        meta: "Con alumnos reales",
      },
      {
        step: "04",
        title: "Operación y traspaso",
        body: "Monitoreo de calidad, control de costo por alumno y documentación. Si tenés equipo técnico, queda en condiciones de seguir sin nosotros.",
        meta: "Continuo",
      },
    ],
  },

  /**
   * Lo que se puede verificar, en lugar de casos de éxito ajenos.
   *
   * Son las mismas cuatro cosas que después aparecen en el contrato.
   */
  principles: {
    label: "Compromisos",
    titleMuted: "No te pedimos que nos creas.",
    titleBright: "Te dejamos con qué comprobarlo.",
    intro:
      "Cualquiera puede mostrarte una demo que sale bien. Preferimos que nos midas por lo que podés controlar vos, desde la primera semana.",
    items: [
      {
        title: "La nota la firma un docente",
        body: "La corrección propone y una persona decide. Ninguna calificación que quede en el legajo, ningún caso de integridad académica y ninguna baja se resuelven solos.",
      },
      {
        title: "Los datos de los alumnos no se mueven",
        body: "Desplegamos en tu nube y tus cuentas de proveedor. No usamos datos de alumnos para entrenar modelos y, si tu audiencia son menores, el marco legal define la arquitectura antes que el modelo.",
      },
      {
        title: "La métrica se acuerda antes",
        body: "Antes de escribir una línea definimos qué número tiene que moverse y cómo se mide. Si no se mueve, quedó por escrito que no se movió.",
      },
      {
        title: "El sistema queda a tu nombre",
        body: "Repositorios, cuentas e infraestructura tuyos desde el primer día, y cada respuesta con su cita, su costo y su traza. Si nos querés echar, sigue funcionando sin nosotros.",
      },
    ],
  },

  /** Las notas, en la portada. Tres, las más recientes. */
  insights: {
    label: "Notas",
    titleMuted: "Lo que aprendimos",
    titleBright: "poniendo esto en producción.",
    cta: "Ver todas las notas",
  },

  faq: {
    label: "Preguntas",
    titleMuted: "Lo que preguntan",
    titleBright: "antes de contratarnos.",
    indexLabel: "Índice",
    entries: [
      {
        question: "¿Cómo evitan que el tutor invente contenido?",
        answer:
          "Acotando la recuperación al material del curso y exigiendo cita: si ningún pasaje respalda la respuesta, el tutor lo dice en vez de completar. Se prueba con un set de preguntas cuya respuesta correcta es «no está en el material», que es justo el caso que casi nadie evalúa.",
      },
      {
        question: "¿Cuánto cuesta la función por alumno activo?",
        answer:
          "Depende del volumen de mensajes y del largo del contexto, y se estima antes de construir contra el tráfico real de la plataforma. En producción se controla con caché, recuperación acotada y un modelo chico para la mayoría de las consultas, reservando el grande para lo que lo necesita.",
      },
      {
        question: "Nuestro contenido está en video sin transcribir y PDF escaneado. ¿Sirve igual?",
        answer:
          "Sirve, pero el primer proyecto es de normalización, no de IA: transcripción, corte por unidad y metadatos. Lo decimos en el diagnóstico porque cambia el plazo y el presupuesto, y porque un tutor sobre material desordenado responde mal por más bueno que sea el modelo.",
      },
      {
        question: "¿Trabajan sobre nuestro LMS o sobre nuestro producto propio?",
        answer:
          "Sobre los dos. Con Moodle, Canvas, Open edX o Google Classroom entramos por LTI 1.3, xAPI o su API; con un producto propio integramos contra tu backend y tu modelo de permisos. El caso más frecuente es una plataforma propia con un LMS al lado.",
      },
      {
        question: "¿El tutor no termina ayudando a hacer trampa?",
        answer:
          "Es la primera restricción que se escribe: el tutor conoce qué entregas están evaluadas y se detiene en el paso anterior, explica el método pero no produce la respuesta entregable. Esa frontera se define con tu equipo docente y se prueba con intentos reales de cruzarla.",
      },
      {
        question: "¿Cuánto tarda en estar con alumnos adentro?",
        answer:
          "El plazo se cierra en el diagnóstico porque depende del estado del contenido y de las integraciones. Trabajamos en ciclos cortos: primero el set de evaluación y la búsqueda con citas, que ya cambian la experiencia, y después el tutor o la corrección sobre un alcance acotado.",
      },
    ],
  },

  cta: {
    label: "Próximo paso",
    title: "Mostranos tu contenido y te decimos qué se puede hacer con él.",
    body: "Treinta minutos con quien va a construirlo, no con un comercial. Salís con el inventario del material, el primer sistema recomendado y una estimación de costo por alumno. Si no vemos caso, te lo decimos en la misma llamada.",
    primary: "Agendar diagnóstico",
    secondary: "Escribirnos por correo",
    emailLabel: "Correo",
    responseLabel: "Respuesta",
    response: "En menos de 24 horas hábiles",
  },

  footer: {
    tagline:
      "Agencia de IA para EdTech. Tutores, corrección asistida y búsqueda con citas que aguantan producción.",
    columns: [
      {
        title: "Qué construimos",
        links: [
          {
            href: "/soluciones/edtech-y-plataformas-educativas/tutor-de-ia/",
            label: "Tutor de IA",
          },
          {
            href: "/soluciones/edtech-y-plataformas-educativas/correccion-asistida/",
            label: "Corrección asistida",
          },
          {
            href: "/soluciones/edtech-y-plataformas-educativas/generacion-de-evaluaciones/",
            label: "Generación de evaluaciones",
          },
          {
            href: "/soluciones/edtech-y-plataformas-educativas/busqueda-semantica/",
            label: "Búsqueda semántica",
          },
        ],
      },
      {
        title: "La agencia",
        links: [
          { href: "/soluciones/", label: "IA para EdTech" },
          { href: "/blog/", label: "Notas" },
          { href: "#proceso", label: "Cómo trabajamos" },
          { href: "#contacto", label: "Contacto" },
        ],
      },
    ],
    socialTitle: "Seguinos",
    tags: "Tutores de IA · Corrección asistida · RAG educativo",
  },

  /**
   * El blog.
   *
   * Se llama «Notas» y no «Blog» a propósito: lo que se publica son apuntes de
   * trabajo —costos reales, fallas que vemos, criterios de decisión—, no
   * artículos de captación. La diferencia importa porque es exactamente lo que
   * las otras agencias no pueden copiar sin haberlo hecho.
   */
  blog: {
    label: "Notas",
    rssTitle: "Notas",
    meta: {
      title: "Notas — Vantalogics",
      description:
        "Costo por alumno, criterios de decisión y fallas de producción en proyectos de IA para plataformas educativas. Apuntes de trabajo, no artículos de captación.",
    },
    titleMuted: "Lo que aprendimos",
    titleBright: "poniendo IA en plataformas educativas.",
    intro:
      "Costos reales por alumno, criterios para decidir y las fallas que aparecen recién cuando el tutor atiende a una cohorte entera. Publicamos lo que nos hubiera servido leer antes de empezar.",
    empty: "Todavía no hay notas publicadas.",
    readMore: "Leer la nota",
    backToIndex: "Todas las notas",
    updatedOn: "Actualizado el",
    publishedOn: "Publicado el",
    readingTime: "min de lectura",
    tocLabel: "En esta nota",
    answerLabel: "Respuesta corta",
    faqLabel: "Preguntas relacionadas",
    relatedLabel: "Seguí por acá",
    shareLabel: "Compartir",
    authorLabel: "Escrito por",
    author: "Equipo Vantalogics",
    authorBio:
      "Agencia de IA para EdTech. Construimos tutores, corrección asistida y búsqueda con citas, evaluados y monitoreados, adentro de plataformas educativas.",
    ctaTitle: "¿Te suena a tu plataforma?",
    ctaBody:
      "Treinta minutos, sin costo. Salís con el inventario de tu contenido y una estimación de qué conviene construir primero.",
    ctaButton: "Agendar diagnóstico",
    clusters: {
      costos: "Costos",
      decision: "Cómo decidir",
      confiabilidad: "Confiabilidad",
      casos: "Casos de uso",
    },
  },

  /** Páginas de sector y de caso de uso. Ver `src/data/solutions.ts`. */
  solutions: {
    label: "EdTech",
    breadcrumb: "IA para EdTech",
    indexTitle: "IA para plataformas educativas",
    indexDescription:
      "Cómo se integra IA en una plataforma educativa: búsqueda con citas sobre el contenido propio, tutor acotado al curso y corrección asistida, con la nota firmada por un docente.",
    indexIntro:
      "Esta es la página madre del sector: qué se integra primero, con qué sistemas hablamos, qué queda siempre con un docente decidiendo y en qué casos conviene no hacerlo. Abajo, cada implementación por separado.",
    focusLabel: "Casos de uso",
    othersLabel: "Notas del sector",
    processesLabel: "Qué integramos primero",
    stackLabel: "Con qué se integra",
    humanLabel: "Qué queda con aprobación humana",
    startLabel: "Por dónde se empieza",
    notThisLabel: "Cuándo no conviene",
    useCasesLabel: "Casos de uso",
    useCasesIntro:
      "Cada uno explica una implementación concreta: cómo funciona de punta a punta, qué número se mueve y qué tiene que existir de tu lado antes de empezar.",
    stepsLabel: "Cómo funciona",
    measuresLabel: "Qué se mide",
    requiresLabel: "Qué hace falta de tu lado",
    backToSector: "Ver todo el sector",
    notesLabel: "Notas sobre esto",
  },

  agent: {
    open: "Probá el agente",
  },

  whatsapp: {
    label: "Escribinos por WhatsApp",
    aria: "Escribinos por WhatsApp, abre en una pestaña nueva",
    prefill:
      "Hola Vantalogics, tenemos una plataforma educativa y queremos integrar IA. ¿Podemos hablar?",
  },
}

export type Dictionary = typeof es
