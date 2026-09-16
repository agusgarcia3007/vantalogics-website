/**
 * Todo el texto del sitio, en un solo lugar.
 *
 * Los titulares vienen partidos en dos: `muted` es la premisa y `bright` el
 * remate. La sección los imprime en dos tonos —gris y bone— para que el ojo
 * agarre la idea completa antes de leerla entera. Es la única concesión
 * tipográfica del sistema y sólo aplica a los h2.
 */
export const es = {
  htmlLang: "es",
  ogLocale: "es_ES",

  meta: {
    title: "Vantalogics — Producto e ingeniería de IA para educación",
    description:
      "Diseñamos agentes especializados, sistemas de evaluación y plataformas educativas completas. Estrategia de producto, IA y software en un mismo equipo.",
    imageAlt:
      "Vantalogics — estudio de producto e ingeniería de IA para educación",
  },

  a11y: {
    skip: "Saltar al contenido",
    home: "Vantalogics, ir al inicio",
    mainNav: "Principal",
    mobileNav: "Principal, móvil",
    logoAlt: "Logotipo de Vantalogics",
  },

  /**
   * `section` marca los ítems que apuntan a un bloque que puede no existir:
   * mientras no haya casos publicables, «Casos» no se muestra.
   */
  nav: {
    items: [
      { href: "#casos", label: "Casos", section: "cases" },
      { href: "#capacidades", label: "Qué construimos" },
      { href: "#proceso", label: "Cómo trabajamos" },
      { href: "#perspectivas", label: "Perspectivas" },
    ],
    cta: "Hablar de tu producto",
    menu: "Menú",
    close: "Cerrar",
    tagline: "Producto e ingeniería de IA para educación",
  },

  /**
   * El selector de idioma.
   *
   * `switchTo` es la invitación a ver el sitio *en este* idioma, escrita en
   * este idioma: es la etiqueta que muestran los otros idiomas cuando enlazan
   * acá. Con dos idiomas alcanzaba con guardar la del contrario; con tres, cada
   * diccionario tiene que traer la suya.
   */
  language: {
    label: "Idioma",
    name: "Español",
    switchTo: "Ver en español",
  },

  hero: {
    eyebrow: "Vantalogics · Producto e ingeniería de IA para educación",
    title: "Construimos la inteligencia detrás de los productos educativos.",
    lead: "Diseñamos agentes especializados, sistemas de evaluación y plataformas de aprendizaje completas. Desde la experiencia de usuario hasta los modelos, las integraciones y la infraestructura que los mantiene funcionando.",
    ctaPrimary: "Hablar de tu producto",
    ctaSecondary: "Ver nuestro trabajo",
    /** Sin casos publicados, el secundario lleva a las capacidades. */
    ctaSecondaryFallback: "Ver qué construimos",
    note: "Estrategia de producto, IA e ingeniería de software en un mismo equipo.",
    /**
     * La tarjeta del hero: una traza de agente dibujada como interfaz real.
     * Es un ejemplo y lo dice; no describe a ningún cliente.
     */
    trace: {
      badge: "Ejemplo ilustrativo",
      title: "Agente de tutoría",
      context: "Física II · Unidad 4",
      tabs: ["Traza", "Fuentes"],
      status: "En producción",
      askLabel: "Alumno",
      question:
        "¿Por qué el trabajo de una fuerza conservativa no depende del camino?",
      steps: [
        {
          label: "Contexto",
          detail: "Cohorte 2026-B · Unidad 4 habilitada",
        },
        {
          label: "Búsqueda",
          detail: "3 fuentes del curso · Energía y trabajo",
        },
        {
          label: "Regla",
          detail: "Evaluación abierta: guía sin resolver el ejercicio 7",
        },
        {
          label: "Respuesta",
          detail: "Cita U4 §2.3 y propone un ejercicio de práctica",
        },
      ],
      metrics: [
        { label: "Fuente", value: "Validada" },
        { label: "Latencia", value: "1,4 s" },
        { label: "Revisión", value: "No requerida" },
      ],
    },
  },

  ecosystem: {
    title: "Hecho para el ecosistema educativo.",
    body: "Trabajamos sobre plataformas propias, LMS y operaciones educativas. Entendemos que una buena respuesta no alcanza: el producto también tiene que respetar permisos, secuencias de aprendizaje, evaluaciones, privacidad y costos por alumno.",
    label: "Integraciones y estándares",
    items: [
      "Moodle",
      "Canvas",
      "Open edX",
      "Google Classroom",
      "LTI 1.3",
      "xAPI",
      "SCORM",
      "SIS",
      "Plataformas propias",
    ],
  },

  cases: {
    eyebrow: "Trabajo seleccionado",
    title: "Productos que ya están generando resultados.",
    intro:
      "Cada caso muestra el punto de partida, lo que construimos y el resultado que produjo. Sin métricas decorativas ni proyectos presentados como éxitos antes de llegar a producción.",
    labels: {
      client: "Cliente",
      start: "Punto de partida",
      built: "Qué construimos",
      impact: "Impacto",
      integrations: "Integraciones",
      read: "Leer el caso completo",
    },
  },

  thesis: {
    eyebrow: "Nuestra perspectiva",
    title: "Agregar IA es fácil. Construir un producto confiable no.",
    body: [
      "Una demostración puede responder diez preguntas perfectas. Un producto educativo tiene que responder miles, respetar el contenido, reconocer lo que no sabe, proteger los datos del alumno y mantener un costo sostenible.",
      "Por eso no empezamos eligiendo un modelo. Empezamos definiendo el producto: qué problema resuelve, qué puede hacer, dónde debe detenerse y cómo vamos a medirlo. Después diseñamos la experiencia y construimos la tecnología que la sostiene.",
    ],
    contrast: {
      demo: "Una demo",
      demoValue: "10 preguntas perfectas",
      product: "Un producto",
      productValue: "Miles, todos los días",
    },
  },

  capabilities: {
    eyebrow: "Qué construimos",
    title: "Del concepto al producto en producción.",
    items: [
      {
        index: "01",
        title: "Agentes especializados",
        summary:
          "No son chats genéricos con acceso a documentos. Son agentes integrados al producto, capaces de interpretar contexto, consultar fuentes, utilizar herramientas y ejecutar acciones con límites explícitos.",
        points: [
          "Trabajan sobre contenido y datos propios.",
          "Respetan usuarios, permisos y etapas.",
          "Se conectan con APIs y herramientas internas.",
          "Escalan decisiones sensibles a una persona.",
          "Dejan registro de sus fuentes y acciones.",
        ],
      },
      {
        index: "02",
        title: "Experiencias de aprendizaje con IA",
        summary:
          "Diseñamos nuevas maneras de buscar, practicar, recibir feedback y avanzar dentro de un producto educativo.",
        points: [
          "Acompañamiento contextual.",
          "Búsqueda con fuentes y referencias.",
          "Práctica y simulaciones interactivas.",
          "Recomendaciones según progreso.",
          "Feedback inmediato y personalizado.",
        ],
      },
      {
        index: "03",
        title: "Evaluación y operaciones académicas",
        summary:
          "Construimos sistemas que asisten el trabajo académico sin ocultar el criterio ni reemplazar decisiones sensibles.",
        points: [
          "Corrección asistida con rúbricas.",
          "Generación y validación de evaluaciones.",
          "Análisis de respuestas y dificultades.",
          "Herramientas para docentes y equipos académicos.",
          "Revisión humana y trazabilidad.",
        ],
      },
      {
        index: "04",
        title: "Plataformas y software educativo",
        summary:
          "Cuando el producto necesita algo más que una función de IA, construimos también el software que la rodea.",
        points: [
          "Plataformas educativas completas.",
          "Portales para alumnos y docentes.",
          "Herramientas de autor y administración.",
          "Integraciones con LMS, SIS y sistemas propios.",
          "Infraestructura, observabilidad y operación.",
        ],
      },
    ],
    /** Textos de las interfaces de ejemplo que acompañan cada capacidad. */
    visuals: {
      example: "Ejemplo",
      agents: {
        title: "Sistema de agentes",
        request: "Consulta de un alumno",
        orchestrator: "Agente del curso",
        tools: ["Contenido del curso", "Calendario académico", "SIS · legajo"],
        guard: "Cambio de fecha de examen",
        human: "Aprobación de coordinación",
        log: [
          "permiso: alumno · lectura",
          "fuente: calendario 2026-B",
          "acción: solicitud creada",
          "escalado: coordinación",
        ],
      },
      learning: {
        title: "Estudio guiado",
        question: "No entiendo cuándo usar integración por partes.",
        answer:
          "Conviene cuando el integrando es un producto y uno de los factores se simplifica al derivarlo. En tu apunte hay un criterio para elegirlo.",
        sources: ["Unidad 3 · p. 42", "Clase 11 · 18:20"],
        practice: "Practicar con 3 ejercicios",
        progress: "Progreso de la unidad",
      },
      assessment: {
        title: "Corrección asistida",
        submission: "Entrega 14 de 62 · Informe de laboratorio",
        criteria: [
          { name: "Planteo del problema", score: 4, max: 4 },
          { name: "Análisis de datos", score: 2, max: 4 },
          { name: "Conclusiones", score: 3, max: 4 },
        ],
        note: "El análisis omite la incertidumbre de la medición (rúbrica 2.b).",
        suggested: "Sugerencia",
        decision: "Decide el docente",
        approve: "Aprobar",
        adjust: "Ajustar",
      },
      platform: {
        title: "Arquitectura del producto",
        layers: [
          {
            name: "Experiencia",
            items: ["Portal de alumnos", "Portal docente", "Autoría"],
          },
          {
            name: "Inteligencia",
            items: ["Agentes", "Evaluación", "Búsqueda"],
          },
          {
            name: "Plataforma",
            items: ["APIs", "Permisos", "Datos"],
          },
          {
            name: "Integraciones",
            items: ["LTI 1.3", "xAPI", "SIS"],
          },
          {
            name: "Operación",
            items: ["Observabilidad", "Costos", "Evals"],
          },
        ],
      },
    },
  },

  difference: {
    eyebrow: "Un solo equipo",
    title: "No somos una software factory con una API de IA.",
    body: [
      "El producto educativo, la experiencia y la arquitectura se diseñan juntos. El mismo equipo que define cómo debe comportarse el sistema construye la interfaz, las integraciones, las evaluaciones y la infraestructura necesaria para operarlo.",
      "Eso reduce traspasos, evita decisiones desconectadas y permite llegar antes a una versión que puede probarse con usuarios reales.",
    ],
    usual: {
      label: "Lo habitual",
      steps: ["Consultora", "Diseño", "Software factory", "Proveedor de IA"],
      handoff: "traspaso",
    },
    ours: {
      label: "Vantalogics",
      disciplines: [
        "Producto",
        "Experiencia",
        "IA aplicada",
        "Ingeniería",
        "Infraestructura",
      ],
      caption: "Mismo equipo, del criterio a la operación",
    },
  },

  process: {
    eyebrow: "Nuestro proceso",
    title: "De una oportunidad concreta a un producto que puede escalar.",
    steps: [
      {
        step: "01",
        title: "Definimos la oportunidad",
        body: "Entendemos el producto, los usuarios, el contenido y la operación. Elegimos un problema capaz de producir un resultado observable.",
      },
      {
        step: "02",
        title: "Diseñamos el sistema",
        body: "Definimos la experiencia, las restricciones, la arquitectura y las métricas antes de desarrollar.",
      },
      {
        step: "03",
        title: "Construimos una versión real",
        body: "La primera versión funciona con contenido e integraciones reales. No es una maqueta descartable.",
      },
      {
        step: "04",
        title: "Probamos con usuarios",
        body: "Lanzamos sobre un alcance controlado: una cohorte, una materia, un equipo o una parte del catálogo.",
      },
      {
        step: "05",
        title: "Medimos y escalamos",
        body: "Abrimos el producto cuando la calidad, la adopción y la economía unitaria justifican hacerlo.",
      },
    ],
  },

  principles: {
    eyebrow: "Principios",
    title: "Software educativo en el que se puede confiar.",
    items: [
      {
        title: "El contenido manda",
        body: "El sistema responde desde el material y las reglas de la institución, no desde la memoria general del modelo.",
      },
      {
        title: "Las decisiones sensibles siguen siendo humanas",
        body: "Las calificaciones definitivas, los casos de integridad académica y las decisiones con impacto sobre un alumno quedan bajo responsabilidad de una persona.",
      },
      {
        title: "Todo se puede medir",
        body: "Calidad, adopción, costo, latencia y correcciones humanas quedan registrados.",
      },
      {
        title: "El producto queda en manos del cliente",
        body: "Código, infraestructura, cuentas y documentación se entregan preparados para que el producto pueda crecer con o sin nosotros.",
      },
    ],
    measures: ["Calidad", "Adopción", "Costo", "Latencia", "Correcciones"],
  },

  insights: {
    eyebrow: "Lo que estamos aprendiendo",
    title: "Notas desde la intersección entre educación, producto e IA.",
    body: "Publicamos criterios de diseño, costos reales y problemas que aparecen cuando una función de IA deja la demo y empieza a ser utilizada por una cohorte completa.",
    cta: "Leer nuestras notas",
  },

  cta: {
    label: "Próximo paso",
    title: "¿Qué producto educativo querés que exista?",
    body: "Contanos qué estás construyendo, qué parte todavía no funciona o qué oportunidad de IA querés evaluar. En la primera conversación te diremos por dónde empezar, qué hace falta y qué no construiríamos.",
    primary: "Hablar con el equipo",
    secondary: "Escribir a hello@vantalogics.com",
    emailLabel: "Correo",
    responseLabel: "Respuesta",
    response: "En menos de 24 horas hábiles",
  },

  footer: {
    tagline:
      "Vantalogics es un estudio de producto e ingeniería de IA para educación. Construimos agentes especializados y el software necesario para convertirlos en productos reales.",
    columns: [
      {
        title: "Estudio",
        links: [
          { href: "#capacidades", label: "Qué construimos" },
          { href: "#proceso", label: "Cómo trabajamos" },
          { href: "#principios", label: "Principios" },
          { href: "#contacto", label: "Contacto" },
        ],
      },
      {
        title: "Recursos",
        links: [
          { href: "/blog/", label: "Notas" },
          { href: "/soluciones/", label: "Soluciones por sector" },
          { href: "/rss.xml", label: "RSS" },
        ],
      },
    ],
    contactTitle: "Contacto",
    socialTitle: "Seguinos",
    tags: "Producto · IA aplicada · Ingeniería de software",
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
        "Costos reales, criterios de decisión y fallas de producción en proyectos de automatización con IA. Apuntes de trabajo, no artículos de captación.",
    },
    titleMuted: "Lo que aprendimos",
    titleBright: "poniendo agentes en producción.",
    intro:
      "Costos reales, criterios para decidir y las fallas que aparecen recién cuando el agente atiende clientes de verdad. Publicamos lo que nos hubiera servido leer antes de empezar.",
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
      "Estudio de producto e ingeniería de IA para educación. Construimos agentes especializados y el software necesario para convertirlos en productos reales.",
    ctaTitle: "¿Te suena a tu operación?",
    ctaBody:
      "Treinta minutos, sin costo. Salís con el mapa de tu proceso y una estimación de qué conviene automatizar primero.",
    ctaButton: "Agendar diagnóstico gratuito",
    clusters: {
      costos: "Costos",
      decision: "Cómo decidir",
      confiabilidad: "Confiabilidad",
      casos: "Casos de uso",
    },
  },

  /** Páginas de solución por sector. Ver `src/data/solutions.ts`. */
  solutions: {
    label: "Soluciones",
    breadcrumb: "Soluciones",
    indexTitle: "Automatización con IA, por sector",
    indexDescription:
      "Cómo se automatiza con IA en cada sector: qué procesos conviene atacar primero, qué se integra y qué queda con aprobación humana.",
    indexIntro:
      "El proceso cambia según el rubro. Estas páginas son el punto de partida por sector: qué automatizamos primero, con qué sistemas hablamos y dónde dejamos a una persona decidiendo.",
    focusLabel: "Industrias foco",
    othersLabel: "Otros sectores",
    processesLabel: "Qué automatizamos primero",
    stackLabel: "Con qué se integra",
    humanLabel: "Qué queda con aprobación humana",
    startLabel: "Por dónde se empieza",
    notThisLabel: "Cuándo no conviene",
    useCasesLabel: "Casos de uso en este sector",
    useCasesIntro:
      "Cada uno explica una implementación concreta: cómo funciona de punta a punta, qué número se mueve y qué tiene que existir de tu lado antes de empezar.",
    stepsLabel: "Cómo funciona",
    measuresLabel: "Qué se mide",
    requiresLabel: "Qué hace falta de tu lado",
    backToSector: "Ver todo el sector",
    notesLabel: "Notas sobre este sector",
  },

  agent: {
    open: "Probá un agente de ejemplo",
  },

  whatsapp: {
    label: "Escribinos por WhatsApp",
    aria: "Escribinos por WhatsApp, abre en una pestaña nueva",
    prefill: "Hola Vantalogics, quiero hablar sobre un producto educativo.",
  },
}

export type Dictionary = typeof es
