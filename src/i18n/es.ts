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
    title: "Vantalogics — Automatizamos el trabajo repetitivo de tu empresa",
    description:
      "Construimos agentes de IA que atienden, cargan datos y resuelven casos dentro de las herramientas que ya usás. Con control humano donde hay plata en juego.",
    imageAlt: "Vantalogics — agencia de sistemas de IA",
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
      { href: "#que-hacemos", label: "Qué hacemos" },
      { href: "#industrias", label: "Industrias" },
      { href: "#proceso", label: "Cómo trabajamos" },
      { href: "/blog/", label: "Notas" },
    ],
    cta: "Agendar diagnóstico",
    menu: "Menú",
    close: "Cerrar",
    tagline: "Sistemas de IA en producción",
  },

  theme: {
    label: "Tema",
    toDark: "Activar modo oscuro",
    toLight: "Activar modo claro",
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
    eyebrow: "Agencia de sistemas de IA",
    title: "Que el trabajo repetitivo lo haga un sistema.",
    lead: "Construimos agentes de IA que atienden clientes, cargan datos y resuelven casos dentro de las herramientas que ya usás. Vos seguís decidiendo donde hay plata en juego.",
    ctaPrimary: "Agendar diagnóstico gratuito",
    ctaSecondary: "Probar un agente ahora",
    note: "30 minutos, sin costo. Salís con el mapa de tu proceso y una estimación.",
    flow: {
      caption: "Un pedido que entra por WhatsApp, resuelto solo",
      label: "Ejemplo de flujo",
      status: "Trabajando ahora",
      trigger: {
        title: "Entra un mensaje",
        detail: "«Hola, quiero pedir 20 cajas para el jueves»",
      },
      agent: {
        title: "Tu agente",
        detail: "Lee, entiende y decide qué hacer",
      },
      outputs: [
        {
          title: "Le contesta al cliente",
          detail: "Confirma stock y fecha de entrega",
        },
        {
          title: "Carga el pedido",
          detail: "Queda en tu sistema, sin que nadie lo tipee",
        },
        {
          title: "Te avisa si hay que decidir",
          detail: "Descuento fuera de lo normal: lo aprobás vos",
        },
      ],
      footnote: "Seis segundos de punta a punta. Cada paso queda registrado.",
    },
  },

  tools: {
    title: "Trabaja adentro de lo que ya usás",
    note: "Y de cualquier otra cosa que tenga API. No cambiás de sistema: le sumamos manos.",
    items: [
      "WhatsApp",
      "Correo",
      "Planillas",
      "Slack",
      "Notion",
      "Tu ERP",
      "Tu CRM",
      "Tu web",
    ],
  },

  problem: {
    label: "El problema",
    titleMuted: "Tu equipo no odia el trabajo.",
    titleBright: "Odia hacerlo dos veces.",
    body: [
      "La mayoría de las empresas no tiene un problema de gente: tiene tareas que se hacen a mano tres veces por semana porque nadie las sistematizó nunca.",
      "Eso es exactamente lo que hacemos. Miramos el proceso real, no la presentación del proceso, y automatizamos la parte que se repite.",
    ],
    items: [
      {
        title: "Pedidos por mensaje.",
        detail:
          "Alguien los copia al sistema a mano, y cada tanto se pierde uno.",
      },
      {
        title: "Facturas y remitos.",
        detail: "Se leen, se cargan y se revisan de a uno, todos los días.",
      },
      {
        title: "Las mismas preguntas.",
        detail: "El mismo mensaje contestado veinte veces, todos los días.",
      },
      {
        title: "El reporte del lunes.",
        detail: "Media mañana armando lo mismo que la semana pasada.",
      },
    ],
  },

  services: {
    label: "Qué hacemos",
    titleMuted: "Cuatro formas de poner IA a trabajar.",
    titleBright: "Todas terminan en algo funcionando.",
    items: [
      {
        index: "01",
        title: "Automatizar un proceso",
        summary:
          "El trabajo que hoy hace una persona copiando y pegando pasa a un sistema que corre solo y deja registro de cada paso.",
        items: [
          "Alta de clientes y proveedores",
          "Lectura y carga de documentos",
          "Cruces entre sistemas que hoy son manuales",
          "Triage y respuesta de tickets",
        ],
      },
      {
        index: "02",
        title: "Un agente a medida",
        summary:
          "Atiende, consulta tus datos reales y ejecuta acciones concretas. Con permisos acotados y un humano donde el error sale caro.",
        items: [
          "Soporte y ventas con tu información",
          "Copilotos internos para tu equipo",
          "Tareas de varios pasos con aprobación",
          "En WhatsApp, correo, Slack o tu producto",
        ],
      },
      {
        index: "03",
        title: "Que funcione siempre igual",
        summary:
          "Acordamos qué significa que el agente ande bien y lo medimos en cada cambio. Si baja la calidad, salta una alerta antes de que te enteres por un cliente.",
        items: [
          "Pruebas con casos reales de tu operación",
          "Límites explícitos de qué puede hacer solo",
          "Registro, costo y tiempo de cada ejecución",
          "Alertas cuando algo se degrada",
        ],
      },
      {
        index: "04",
        title: "IA adentro de tu producto",
        summary:
          "Si vendés software y la IA tiene que vivir adentro, nos hacemos cargo de la arquitectura completa y se la dejamos andando a tu equipo.",
        items: [
          "Búsqueda sobre tus propios datos",
          "Funciones de IA embebidas en tu producto",
          "Elección de modelos y control de costos",
          "Traspaso documentado al equipo interno",
        ],
      },
    ],
  },

  agentDemo: {
    label: "Probalo ahora",
    titleMuted: "Este sitio tiene un agente adentro.",
    titleBright: "Contale tu caso y respondé dos preguntas.",
    body: "Es el mismo tipo de agente que construimos para clientes: consulta información real, anota lo que le contás y pide permiso antes de pasarle tu contacto a una persona. No es un video, no es una demo grabada.",
    points: [
      "Cada paso que da queda escrito en el chat",
      "No manda nada sin que vos lo apruebes",
      "Si no entiende, lo dice en vez de inventar",
    ],
  },

  process: {
    label: "Cómo trabajamos",
    titleMuted: "De la primera charla",
    titleBright: "a un sistema andando.",
    steps: [
      {
        step: "01",
        title: "Diagnóstico",
        body: "Media hora con quien conoce el proceso de verdad. Salís con el mapa del flujo y qué conviene automatizar primero.",
        meta: "30 minutos · gratis",
      },
      {
        step: "02",
        title: "Diseño y prueba",
        body: "Definimos la métrica de éxito y construimos la versión más chica que resuelve el problema completo, no una maqueta.",
        meta: "Primeras semanas",
      },
      {
        step: "03",
        title: "Producción",
        body: "Integración, permisos, límites y monitoreo. Se abre a más gente cuando los números aguantan, no antes.",
        meta: "Con tus datos reales",
      },
      {
        step: "04",
        title: "Operación y traspaso",
        body: "Monitoreamos, controlamos el costo y documentamos. Si tenés equipo técnico, queda en condiciones de seguir sin nosotros.",
        meta: "Continuo",
      },
    ],
  },

  proof: {
    label: "Resultados",
    titleMuted: "Lo que cambia",
    titleBright: "cuando el sistema entra en producción.",
    intro:
      "En los tres casos la métrica se acordó antes de empezar y se midió sobre la operación real, no sobre una prueba de laboratorio.",
    headline: {
      value: "310 h",
      unit: "por mes",
      title: "de trabajo manual que dejó de hacerse",
      body: "Una distribuidora con tres personas cargando remitos a mano. Hoy el sistema los lee, los carga y sólo levanta los casos dudosos.",
      chartLabel: "Horas manuales por mes",
      chartFrom: "Antes",
      chartTo: "Hoy",
    },
    results: [
      {
        metric: "−72%",
        metricLabel: "Tiempo de respuesta",
        sector: "Software B2B",
        body: "Triage automático y borradores que una persona aprueba, en un equipo de soporte de nueve.",
      },
      {
        metric: "310 h/mes",
        metricLabel: "Trabajo manual eliminado",
        sector: "Logística",
        body: "Lectura y validación de remitos contra el ERP, con revisión sólo en los casos dudosos.",
      },
      {
        metric: "3×",
        metricLabel: "Capacidad de alta de clientes",
        sector: "Servicios financieros",
        body: "Verificación de documentación sin sumar gente y con registro de cada decisión.",
      },
    ],
    testimonialsTitle: "Lo que dicen",
    testimonials: [
      {
        quote:
          "Vinieron a mirar el proceso antes de hablar de tecnología. Esa conversación nos ahorró meses de construir lo equivocado.",
        name: "María Fernanda Ruiz",
        role: "Head of Operations",
        company: "Altamar Logística",
      },
      {
        quote:
          "Es el primer proyecto de IA que llevamos a producción. La diferencia fue tener métricas desde el arranque.",
        name: "Diego Salgado",
        role: "CTO",
        company: "Quantia Seguros",
      },
      {
        quote:
          "Nos dejaron todo en nuestros repos. Hoy mi equipo extiende el agente sin depender de nadie.",
        name: "Laura Benítez",
        role: "Head of Engineering",
        company: "Belfor Retail",
      },
    ],
    stats: [
      { value: "24/7", label: "Trabaja también de noche" },
      { value: "100%", label: "El sistema queda a tu nombre" },
      { value: "0", label: "Nada te ata a nosotros" },
      { value: "ES · EN · AR", label: "Atendemos en tres idiomas" },
    ],
  },

  /**
   * Seis preguntas, respuestas de 40–60 palabras. Los rich results de FAQ
   * quedaron deprecados en mayo de 2026, así que el largo ya no se optimiza
   * para el SERP sino para la extracción: ese rango entra completo en un
   * chunk de retrieval y es el que citan los motores de respuesta.
   */
  faq: {
    label: "Preguntas",
    titleMuted: "Lo que preguntan",
    titleBright: "antes de contratarnos.",
    indexLabel: "Índice",
    entries: [
      {
        question: "¿Qué hace exactamente Vantalogics?",
        answer:
          "Automatizamos trabajo repetitivo de empresas y construimos agentes de IA conectados a tus sistemas —CRM, ERP, bases de datos y APIs internas—. Los medimos con casos reales de tu operación para que funcionen todos los días en producción, y no sólo el día de la demo.",
      },
      {
        question: "¿Cuánto tarda un proyecto de automatización con IA?",
        answer:
          "Depende del proceso y de con qué sistemas hay que hablar, así que el plazo se cierra durante el diagnóstico. Trabajamos en ciclos cortos: en lugar de un único entregable al final, hay algo usable y medible en cada entrega, normalmente desde las primeras semanas.",
      },
      {
        question: "¿Cuánto cuesta automatizar un proceso con IA?",
        answer:
          "El presupuesto se arma después del diagnóstico, con alcance cerrado y precio por proyecto en lugar de horas abiertas. El diagnóstico inicial de 30 minutos es gratuito y termina con un alcance y un rango de inversión por escrito, antes de que te comprometas a nada.",
      },
      {
        question: "¿Qué pasa con los datos de mi empresa?",
        answer:
          "Los datos quedan en tu infraestructura y tus cuentas de proveedor: desplegamos en tu nube o en la que definas, con acuerdo de confidencialidad y acceso mínimo necesario. No usamos información de clientes para entrenar modelos y trabajamos con retención cero cuando el caso lo exige.",
      },
      {
        question: "¿Qué pasa si el agente se equivoca?",
        answer:
          "Cada agente se despliega con límites explícitos de qué puede hacer solo y qué requiere aprobación de una persona. Las acciones de alto impacto pasan siempre por revisión humana, todo queda registrado paso por paso, y hay alertas automáticas cuando la calidad baja del umbral acordado.",
      },
      {
        question:
          "¿Necesito un equipo técnico interno para trabajar con ustedes?",
        answer:
          "No. Nos hacemos cargo de la arquitectura, el desarrollo y el despliegue completo. Sí necesitamos una persona del lado del negocio que conozca el proceso a fondo y pueda validar los resultados. Si tenés equipo técnico, le transferimos el sistema documentado para que pueda operarlo y extenderlo.",
      },
    ],
  },

  cta: {
    label: "Próximo paso",
    title: "Contanos qué proceso te está comiendo el mes.",
    body: "Treinta minutos, sin compromiso. Salís con un mapa del proceso y una estimación de cuánto se puede automatizar. Si no vemos caso, te lo decimos en la misma llamada.",
    primary: "Agendar diagnóstico gratuito",
    secondary: "Escribirnos por correo",
    emailLabel: "Correo",
    responseLabel: "Respuesta",
    response: "En menos de 24 horas hábiles",
    modeLabel: "Modalidad",
    mode: "Remoto · LATAM, España, Estados Unidos y Golfo",
    languagesLabel: "Idiomas",
    languages: "Español, inglés y árabe",
  },

  footer: {
    tagline:
      "Automatizamos trabajo repetitivo y construimos agentes de IA que aguantan producción.",
    columns: [
      {
        title: "Industrias",
        links: [
          { href: "/soluciones/inmobiliarias/", label: "Inmobiliarias" },
          {
            href: "/soluciones/edtech-y-plataformas-educativas/",
            label: "EdTech y educación",
          },
          { href: "/soluciones/", label: "Todos los sectores" },
          { href: "#que-hacemos", label: "Qué hacemos" },
        ],
      },
      {
        title: "La agencia",
        links: [
          { href: "/blog/", label: "Notas" },
          { href: "#proceso", label: "Cómo trabajamos" },
          { href: "#faq", label: "Preguntas frecuentes" },
          { href: "#contacto", label: "Contacto" },
        ],
      },
    ],
    socialTitle: "Seguinos",
    tags: "Automatización · Agentes de IA · AI Solutions",
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
      "Agencia de sistemas de IA. Automatizamos procesos y construimos agentes evaluados y monitoreados para empresas de LATAM, España, Estados Unidos y el Golfo.",
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

  /**
   * Las dos industrias foco, en la portada.
   *
   * El bloque existe para resolver una tensión de posicionamiento: la agencia
   * atiende cualquier rubro, pero una agencia que dice «atendemos cualquier
   * rubro» no es la primera opción de nadie. El titular admite las dos cosas en
   * la misma frase y el bloque entero es, en la práctica, el enlace más fuerte
   * de la home hacia las dos landings de industria y sus casos de uso.
   */
  industries: {
    label: "Industrias foco",
    titleMuted: "Automatizamos en cualquier rubro.",
    titleBright: "Estos dos los conocemos por dentro.",
    body: "En inmobiliarias y en plataformas educativas ya sabemos qué proceso paga primero, con qué sistemas hay que hablar y en qué casos conviene decir que no. Eso acorta el diagnóstico y evita construir lo que ya sabemos que no funciona.",
    casesLabel: "Casos de uso",
    cta: "Ver el sector completo",
    moreLabel: "¿Otro rubro?",
    more: "Ver los seis sectores",
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
    prefill:
      "Hola Vantalogics, quiero automatizar un proceso de mi empresa. ¿Podemos hablar?",
  },
}

export type Dictionary = typeof es
