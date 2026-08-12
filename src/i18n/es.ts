export const es = {
  htmlLang: "es",
  ogLocale: "es_ES",

  meta: {
    title: "Vantalogics — Agencia de sistemas de IA para automatizar procesos",
    description:
      "Automatizamos procesos de empresas y construimos agentes de IA a medida: evaluados, monitoreados y con control humano. Sistemas que aguantan producción, no demos.",
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
      { href: "#servicios", label: "Servicios" },
      { href: "#proceso", label: "Proceso" },
      { href: "#resultados", label: "Resultados" },
      { href: "#faq", label: "FAQ" },
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

  language: {
    label: "Idioma",
    switchTo: "Switch to English",
  },

  hero: {
    eyebrow: "Agencia de sistemas de IA",
    tagline: "Automatización · Agentes · AI Solutions",
    title: "Diseñamos sistemas que hacen más con menos.",
    lead: "Automatizamos procesos y construimos agentes de IA que aguantan producción: medidos, monitoreados y con control humano donde importa.",
    ctaPrimary: "Agendar diagnóstico gratuito",
    ctaSecondary: "Ver qué construimos",
    note: "30 minutos, sin costo. Salís con un plan.",
    trace: {
      caption: "Un reclamo de un cliente, resuelto paso a paso",
      runLabel: "Caso",
      runId: "Reclamo de facturación",
      agent: "Atención al cliente",
      status: "Trabajando ahora",
      columns: { time: "Tiempo", step: "Paso", detail: "Detalle" },
      steps: [
        {
          time: "0,4 s",
          kind: "Escribe un cliente",
          detail: "«No me llegó la factura de marzo»",
          meta: "",
        },
        {
          time: "1,1 s",
          kind: "Lo reconoce",
          detail: "Lo encuentra en tu sistema, con su historial",
          meta: "",
        },
        {
          time: "2,0 s",
          kind: "Busca la factura",
          detail: "Marzo, emitida el día 3",
          meta: "",
        },
        {
          time: "3,2 s",
          kind: "Revisa que esté bien",
          detail: "Los datos coinciden con lo que compró",
          meta: "",
        },
        {
          time: "4,9 s",
          kind: "Te pide permiso",
          detail: "El monto pasa el límite · lo aprobás vos",
          meta: "",
        },
        {
          time: "5,6 s",
          kind: "Resuelve",
          detail: "Factura enviada y caso cerrado",
          meta: "",
        },
      ],
      summary: [
        { value: "6", label: "pasos, todos a la vista" },
        { value: "5,6 s", label: "en resolver el caso" },
        { value: "1", label: "decisión que sigue siendo tuya" },
      ],
    },
    stats: [
      { value: "24/7", label: "Monitoreo de agentes" },
      { value: "100%", label: "Código y datos en tus cuentas" },
      { value: "0", label: "Dependencia del proveedor" },
      { value: "ES · EN", label: "Equipo bilingüe" },
    ],
  },

  services: {
    label: "Servicios",
    title: "Cuatro formas de poner IA a trabajar",
    items: [
      {
        index: "01",
        title: "Automatización de procesos",
        summary:
          "El trabajo repetitivo pasa a un sistema que corre solo y deja traza de cada paso.",
        items: [
          "Onboarding de clientes y alta de proveedores",
          "Extracción y validación de documentos",
          "Conciliaciones y cargas entre sistemas",
          "Triage y respuesta de tickets",
        ],
      },
      {
        index: "02",
        title: "Agentes de IA a medida",
        summary:
          "Agentes que usan tus herramientas reales, con permisos acotados y un humano donde el error sale caro.",
        items: [
          "Soporte y ventas con contexto propio",
          "Copilotos internos sobre tus datos",
          "Orquestación multi-paso con aprobaciones",
          "Slack, WhatsApp, correo o tu producto",
        ],
      },
      {
        index: "03",
        title: "Agentes robustos y medibles",
        summary:
          "Definimos qué significa que el agente funcione bien y lo medimos en cada release.",
        items: [
          "Evaluación con casos reales de tu operación",
          "Guardrails, límites y planes de fallback",
          "Trazas, costos y latencia por ejecución",
          "Alertas cuando la calidad se degrada",
        ],
      },
      {
        index: "04",
        title: "AI Solutions e integración",
        summary:
          "Cuando la IA vive dentro de tu producto, nos hacemos cargo de la arquitectura completa.",
        items: [
          "Búsqueda semántica y RAG sobre datos propios",
          "Features de IA embebidas en tu producto",
          "Selección de modelos y control de costos",
          "Traspaso al equipo interno",
        ],
      },
    ],
    principlesTitle: "Ingeniería, no entusiasmo",
    principles: [
      {
        title: "Se mide o no se entrega",
        body: "Cada automatización arranca con una métrica: horas, tiempo de respuesta o tasa de error.",
      },
      {
        title: "Primero el proceso, después el modelo",
        body: "La mayor parte de la ganancia está en rediseñar el flujo. El modelo es una pieza más.",
      },
      {
        title: "Humano en el loop donde importa",
        body: "Los casos de alto riesgo pasan por aprobación explícita y quedan registrados.",
      },
      {
        title: "Sin dependencia del proveedor",
        body: "El código, los prompts y la infraestructura quedan en tus repos y tus cuentas.",
      },
    ],
  },

  process: {
    label: "Proceso",
    title: "De la conversación al sistema funcionando",
    steps: [
      {
        step: "Fase 01",
        title: "Diagnóstico",
        body: "Media hora con quien conoce el proceso. Salís con el mapa del flujo y qué conviene automatizar.",
      },
      {
        step: "Fase 02",
        title: "Diseño y prueba",
        body: "Definimos la métrica de éxito y construimos la versión más chica que resuelve el problema completo.",
      },
      {
        step: "Fase 03",
        title: "Producción",
        body: "Integración, permisos, guardrails y observabilidad. Se abre a más usuarios cuando los números aguantan.",
      },
      {
        step: "Continuo",
        title: "Operación y traspaso",
        body: "Monitoreo y control de costos. Documentamos y capacitamos para que tu equipo siga sin nosotros.",
      },
    ],
  },

  proof: {
    clientsLabel: "Ya operan con nuestros sistemas",
    clientsAria: "Clientes de Vantalogics",
    label: "Resultados",
    title: "Lo que cambia en producción",
    intro:
      "En los tres casos la métrica se acordó antes de empezar y se midió sobre la operación real.",
    results: [
      {
        metric: "−72%",
        metricLabel: "Tiempo de respuesta",
        sector: "SaaS B2B",
        body: "Triage automático y borradores que un humano aprueba, en un equipo de soporte de 9 personas.",
      },
      {
        metric: "310 h/mes",
        metricLabel: "Trabajo manual eliminado",
        sector: "Logística",
        body: "Extracción y validación de remitos contra el ERP, con revisión sólo en los casos dudosos.",
      },
      {
        metric: "3×",
        metricLabel: "Capacidad de onboarding",
        sector: "Servicios financieros",
        body: "Alta de clientes con verificación documental, sin sumar headcount y con auditoría de cada decisión.",
      },
    ],
    testimonialsTitle: "Testimonios",
    testimonials: [
      {
        quote:
          "Vinieron a mirar el proceso antes de hablar de tecnología. Esa conversación nos ahorró meses de construir lo equivocado.",
        name: "María Fernanda Ruiz",
        role: "Directora de Operaciones",
        company: "Altamar Logística",
      },
      {
        quote:
          "Es el primer proyecto de IA que llegamos a producción. La diferencia fueron las métricas desde el arranque.",
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
  },

  /**
   * Seis preguntas, respuestas de 40–60 palabras. Los rich results de FAQ
   * quedaron deprecados en mayo de 2026, así que el largo ya no se optimiza
   * para el SERP sino para la extracción: ese rango entra completo en un
   * chunk de retrieval y es el que citan los motores de respuesta.
   */
  faq: {
    label: "Preguntas frecuentes",
    title: "Lo que preguntan antes de contratarnos",
    indexLabel: "Índice",
    entries: [
      {
        question: "¿Qué hace exactamente Vantalogics?",
        answer:
          "Vantalogics es una agencia de sistemas de IA. Automatizamos procesos repetitivos de empresas y construimos agentes de IA conectados a tus sistemas —CRM, ERP, bases de datos y APIs internas—, con evaluación y observabilidad para que funcionen de forma confiable en producción y no sólo en una demo.",
      },
      {
        question: "¿Cuánto tarda un proyecto de automatización con IA?",
        answer:
          "Depende del proceso y de las integraciones que involucre, así que el plazo se cierra durante el diagnóstico. Trabajamos en ciclos cortos: en lugar de un único entregable al final, hay algo usable y medible en cada entrega, normalmente desde las primeras semanas.",
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
        question: "¿Qué pasa si el agente de IA se equivoca?",
        answer:
          "Cada agente se despliega con límites explícitos de qué puede hacer solo y qué requiere aprobación de una persona. Las acciones de alto impacto pasan siempre por revisión humana, todo queda registrado con su traza completa, y hay alertas automáticas cuando la calidad baja del umbral acordado.",
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
    mode: "Remoto · LATAM, España y Estados Unidos",
    languagesLabel: "Idiomas",
    languages: "Español e inglés",
  },

  footer: {
    tagline:
      "Automatizamos procesos y construimos agentes de IA que aguantan producción.",
    columns: [
      {
        title: "Servicios",
        links: [
          { href: "#servicios", label: "Automatización de procesos" },
          { href: "#servicios", label: "Agentes de IA a medida" },
          { href: "#servicios", label: "Evaluación y observabilidad" },
          { href: "#servicios", label: "AI Solutions" },
        ],
      },
      {
        title: "Empresa",
        links: [
          { href: "#proceso", label: "Proceso" },
          { href: "#resultados", label: "Resultados" },
          { href: "#faq", label: "Preguntas frecuentes" },
          { href: "#contacto", label: "Contacto" },
        ],
      },
    ],
    tags: "Automatización · Agentes de IA · AI Solutions",
  },

  agent: {
    open: "Probá el agente",
  },

  whatsapp: {
    label: "Escribinos por WhatsApp",
    aria: "Escribinos por WhatsApp, abre en una pestaña nueva",
    prefill:
      "Hola Vantalogics, quiero automatizar un proceso de mi empresa. ¿Podemos hablar?",
  },
}

export type Dictionary = typeof es
