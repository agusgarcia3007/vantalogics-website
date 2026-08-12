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
    title: "Sistemas de IA que hacen el trabajo, no la demo.",
    lead: "Automatizamos procesos de punta a punta y construimos agentes de IA a medida para empresas. Medidos, monitoreados y con control humano donde importa — para que la IA deje de ser un experimento y pase a ser infraestructura.",
    ctaPrimary: "Agendar diagnóstico gratuito",
    ctaSecondary: "Ver qué construimos",
    note: "Diagnóstico de 30 minutos · Sin costo · Salís con un plan, no con una propuesta",
    diagramLabel: "Cómo se ve en la práctica",
    diagram: {
      title: "Arquitectura de un agente de IA de Vantalogics",
      desc: "Las entradas de la empresa —correo, CRM y documentos— alimentan un agente con evaluación y registro de cada paso. El agente ejecuta acciones en los sistemas, deriva los casos dudosos a revisión humana y envía todas sus trazas a una capa de observabilidad.",
      email: "Email",
      crm: "CRM / ERP",
      docs: "Documentos",
      agent: "Agente",
      agentSub: "Eval + guardrails",
      action: "Acción",
      review: "Revisión humana",
      observability: "Observabilidad",
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
    intro:
      "Empezamos por el proceso, no por el modelo. Primero medimos dónde se pierde tiempo y dinero; después construimos lo mínimo que resuelve eso y lo dejamos corriendo en producción.",
    items: [
      {
        index: "01",
        title: "Automatización de procesos",
        summary:
          "Identificamos el trabajo repetitivo que consume horas de tu equipo y lo movemos a un sistema que corre solo, con reglas claras y trazabilidad de cada paso.",
        items: [
          "Onboarding de clientes y alta de proveedores",
          "Extracción y validación de documentos",
          "Conciliaciones, reportes y cargas entre sistemas",
          "Triage y respuesta de tickets o correos",
        ],
      },
      {
        index: "02",
        title: "Agentes de IA a medida",
        summary:
          "Agentes que usan tus herramientas reales — CRM, ERP, base de datos, APIs internas — con permisos acotados y un humano en el loop donde el error sale caro.",
        items: [
          "Agentes de soporte y de ventas con contexto propio",
          "Copilotos internos sobre documentación y datos",
          "Orquestación multi-paso con herramientas y aprobaciones",
          "Integración con Slack, WhatsApp, correo o tu producto",
        ],
      },
      {
        index: "03",
        title: "Agentes robustos y medibles",
        summary:
          "La diferencia entre una demo y un sistema productivo es la evaluación. Definimos qué significa que el agente funcione bien y lo medimos en cada release.",
        items: [
          "Sets de evaluación con casos reales de tu operación",
          "Guardrails, límites de acción y planes de fallback",
          "Trazas, costos y latencia por ejecución",
          "Alertas cuando la calidad se degrada",
        ],
      },
      {
        index: "04",
        title: "AI Solutions e integración",
        summary:
          "Cuando la IA tiene que vivir dentro de tu producto o tu stack, nos hacemos cargo de la arquitectura completa y la dejamos documentada y transferible.",
        items: [
          "Búsqueda semántica y RAG sobre datos propios",
          "Features de IA embebidas en tu producto",
          "Selección de modelos y control de costos",
          "Traspaso al equipo interno, sin dependencia",
        ],
      },
    ],
  },

  benefits: {
    label: "Por qué Vantalogics",
    title: "Ingeniería, no entusiasmo",
    intro:
      "Casi todos los pilotos de IA mueren en la demo: funcionan con cinco ejemplos y se rompen con los mil casos raros de la operación real. Trabajamos al revés.",
    items: [
      {
        title: "Se mide o no se entrega",
        body: "Cada automatización se define con una métrica antes de escribir código: horas ahorradas, tiempo de respuesta o tasa de error. Si no mueve el número, no se lanza.",
      },
      {
        title: "Primero el proceso, después el modelo",
        body: "La mayor parte de la ganancia está en rediseñar el flujo. El modelo es una pieza más — y la elegimos por costo y precisión, no por moda.",
      },
      {
        title: "Humano en el loop donde importa",
        body: "Definimos qué decide el agente solo y qué pasa por una persona. Los casos de alto riesgo siempre tienen aprobación explícita y registro.",
      },
      {
        title: "Observabilidad desde el día uno",
        body: "Trazas, costos y calidad por ejecución. Sabés qué hizo el agente, cuánto costó y por qué falló, sin abrir un ticket con nosotros.",
      },
      {
        title: "Sin dependencia del proveedor",
        body: "El código, los prompts y la infraestructura quedan en tus repos y tus cuentas. Documentamos y capacitamos para que tu equipo pueda seguir solo.",
      },
      {
        title: "Entregas cortas y funcionando",
        body: "Trabajamos en ciclos cortos con algo usable en cada entrega. El alcance y el ritmo se acuerdan con cada cliente, según su operación.",
      },
    ],
  },

  process: {
    label: "Proceso",
    title: "De la conversación al sistema funcionando",
    intro:
      "Un solo equipo de punta a punta: quien diagnostica es quien construye y quien te lo entrega funcionando. El alcance y los plazos se definen con cada cliente en el diagnóstico.",
    steps: [
      {
        step: "Fase 01",
        title: "Diagnóstico",
        body: "Media hora con quien conoce el proceso. Salimos con el mapa del flujo actual, los puntos de fricción y una estimación honesta de qué conviene automatizar y qué no.",
      },
      {
        step: "Fase 02",
        title: "Diseño y prueba",
        body: "Definimos la métrica de éxito, armamos el set de evaluación con casos reales y construimos la versión más chica que resuelve el problema completo.",
      },
      {
        step: "Fase 03",
        title: "Producción",
        body: "Integración con tus sistemas, permisos, guardrails y observabilidad. Sale a producción con un grupo acotado y se abre a medida que los números aguantan.",
      },
      {
        step: "Continuo",
        title: "Operación y traspaso",
        body: "Monitoreo, ajuste de calidad y control de costos. Documentamos y capacitamos a tu equipo para que pueda operar y extender el sistema sin nosotros.",
      },
    ],
  },

  proof: {
    clientsLabel: "Equipos que ya operan con nuestros sistemas",
    clientsAria: "Clientes de Vantalogics",
    label: "Resultados",
    title: "Lo que cambia cuando el sistema entra en producción",
    intro:
      "Tres proyectos representativos. En todos, la métrica se acordó antes de empezar y se midió sobre la operación real, no sobre un test de laboratorio.",
    results: [
      {
        metric: "−72%",
        metricLabel: "Tiempo de respuesta",
        sector: "SaaS B2B",
        body: "Un equipo de soporte de 9 personas redujo su tiempo de primera respuesta con triage automático y borradores redactados por un agente que un humano aprueba.",
      },
      {
        metric: "310 h/mes",
        metricLabel: "Trabajo manual eliminado",
        sector: "Logística",
        body: "Extracción y validación de remitos y facturas contra el ERP. Lo que hacían tres personas cargando a mano hoy corre solo, con revisión sólo en los casos dudosos.",
      },
      {
        metric: "3×",
        metricLabel: "Capacidad de onboarding",
        sector: "Servicios financieros",
        body: "El alta de clientes con verificación documental triplicó su capacidad sin sumar headcount y con auditoría completa de cada decisión.",
      },
    ],
    testimonialsTitle: "Testimonios",
    testimonials: [
      {
        quote:
          "Vinieron a mirar el proceso antes de hablar de tecnología. Esa sola conversación nos ahorró meses de construir la cosa equivocada.",
        name: "María Fernanda Ruiz",
        role: "Directora de Operaciones",
        company: "Altamar Logística",
      },
      {
        quote:
          "Es el primer proyecto de IA que llegamos a producción. La diferencia fue tener métricas de calidad desde el arranque en lugar de opiniones.",
        name: "Diego Salgado",
        role: "CTO",
        company: "Quantia Seguros",
      },
      {
        quote:
          "Nos dejaron todo documentado y en nuestros repos. Hoy mi equipo agrega funcionalidad al agente sin depender de nadie externo.",
        name: "Laura Benítez",
        role: "Head of Engineering",
        company: "Belfor Retail",
      },
    ],
  },

  faq: {
    label: "Preguntas frecuentes",
    title: "Lo que preguntan antes de contratarnos",
    intro:
      "Respuestas directas sobre alcance, plazos, precios y manejo de datos. Si falta la tuya, escribinos y la agregamos.",
    indexLabel: "Índice",
    entries: [
      {
        question: "¿Qué hace exactamente Vantalogics?",
        answer:
          "Vantalogics es una agencia de sistemas de IA que automatiza procesos de empresas y construye agentes de IA a medida. Trabajamos en cuatro frentes: automatización de tareas repetitivas, agentes conectados a tus sistemas, evaluación y observabilidad para que esos agentes sean confiables en producción, e integración de funcionalidades de IA dentro de tu producto o tu stack.",
      },
      {
        question: "¿Cuánto tarda un proyecto?",
        answer:
          "Depende del proceso y de las integraciones que involucre, así que el plazo se define con cada cliente durante el diagnóstico. Trabajamos en ciclos cortos: en lugar de un único entregable al final, hay algo usable y medible en cada entrega.",
      },
      {
        question: "¿Cuánto cuesta automatizar un proceso con IA?",
        answer:
          "El presupuesto se arma después del diagnóstico, con alcance cerrado y precio por proyecto en lugar de horas abiertas. El diagnóstico inicial de 30 minutos es gratuito y termina con un alcance y un rango de inversión por escrito, antes de que te comprometas a nada.",
      },
      {
        question: "¿Qué pasa con los datos de mi empresa?",
        answer:
          "Los datos quedan en tu infraestructura y tus cuentas de proveedor: desplegamos en tu nube o en la que definas, con acuerdos de confidencialidad y acceso mínimo necesario. No usamos información de clientes para entrenar modelos y trabajamos con proveedores que ofrecen retención cero de datos cuando el caso lo exige.",
      },
      {
        question: "¿Qué pasa si el agente se equivoca?",
        answer:
          "Cada agente se despliega con límites explícitos de qué puede hacer solo y qué requiere aprobación de una persona. Las acciones de alto impacto pasan siempre por revisión humana, todo queda registrado con su traza completa, y hay planes de fallback y alertas automáticas cuando la calidad baja del umbral acordado.",
      },
      {
        question: "¿Necesito un equipo técnico interno para trabajar con ustedes?",
        answer:
          "No. Nos hacemos cargo de la arquitectura, el desarrollo y el despliegue completo. Sí necesitamos una persona del lado del negocio que conozca el proceso a fondo y pueda validar los resultados. Si tenés equipo técnico, lo capacitamos y le transferimos el sistema para que pueda operarlo y extenderlo sin nosotros.",
      },
      {
        question: "¿Con qué modelos y herramientas trabajan?",
        answer:
          "Somos agnósticos de proveedor: elegimos el modelo por costo, latencia y precisión en tu caso concreto, y diseñamos el sistema para poder cambiarlo sin reescribirlo. Integramos con las herramientas que ya usás —CRM, ERP, bases de datos, Slack, WhatsApp, correo y APIs internas— en lugar de pedirte migrar a una plataforma nueva.",
      },
      {
        question: "¿Trabajan con empresas pequeñas o solo con grandes cuentas?",
        answer:
          "Trabajamos con empresas desde 10 personas hasta corporaciones. Lo que define si un proyecto tiene sentido no es el tamaño, sino que exista un proceso repetitivo con volumen suficiente y un responsable claro dispuesto a cambiarlo. Eso lo determinamos en el diagnóstico inicial, sin costo.",
      },
    ],
  },

  cta: {
    label: "Próximo paso",
    title: "Contanos qué proceso te está comiendo el mes.",
    body: "Treinta minutos, sin compromiso. Salís con un mapa del proceso, una estimación de cuánto se puede automatizar y qué conviene dejar como está. Si no vemos caso, te lo decimos en la misma llamada.",
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
      "Agencia de sistemas de IA. Automatizamos procesos y construimos agentes que aguantan producción.",
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
}

export type Dictionary = typeof es
