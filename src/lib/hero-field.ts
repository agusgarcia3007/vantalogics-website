import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  OrthographicCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three"

/**
 * El campo de puntos del hero.
 *
 * Es la hoja cuadriculada de la marca, dibujada en WebGL para que reaccione al
 * cursor: los puntos se apartan apenas cuando el puntero pasa cerca y, si el
 * movimiento es franco, se desprenden unas pocas chispas que se apagan en el
 * aire. El radio de influencia es chico a propósito —90 px, poco más que el
 * ancho de un dedo— porque la gracia es que parezca papel que se mueve bajo la
 * mano, no un efecto que persigue al mouse por toda la pantalla.
 *
 * El módulo es el único dueño de todo lo que crea: renderer, geometrías,
 * materiales, el bucle de animación y sus escuchas. `create()` devuelve el
 * `dispose` que lo deshace entero.
 *
 * Contrato visual y de rendimiento:
 * - Una unidad de mundo = un píxel CSS. Origen en el centro del lienzo, `y`
 *   hacia arriba. Eso permite expresar el radio del cursor y el paso de la
 *   grilla en las mismas unidades que el CSS.
 * - La grilla comparte paso (26 px) y color con la utilidad `paper-grid`, que
 *   es lo que se ve mientras el módulo todavía no cargó.
 * - Capacidad fija: los buffers se reservan una vez, al montar. Un cambio de
 *   tamaño recalcula posiciones dentro de esa capacidad y ajusta el rango de
 *   dibujo; nunca crece un buffer ni se recompila un material en caliente.
 * - No hay bucle cuando la sección está fuera de pantalla o la pestaña oculta.
 */

/** Paso de la grilla, en píxeles CSS. El mismo que `paper-grid`. */
const SPACING = 26

/** Radio de influencia del cursor, en píxeles CSS. */
const RADIUS = 92

/** Desplazamiento máximo de un punto, en píxeles CSS. */
const PUSH = 9

/** Muestras de la estela del cursor. El wake es lo que da la sensación de mano. */
const TRAIL = 6

/** Capacidad del campo. Alcanza para 1600 × 900 con el paso de 26 px. */
const MAX_DOTS = 2600

/** Chispas simultáneas. Es un pool: nunca se asigna una nueva en caliente. */
const MAX_SPARKS = 96

/** Distancia que tiene que recorrer el cursor para soltar una chispa. */
const SPARK_EVERY = 26

const DOT_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uRadius;
  uniform float uPush;
  uniform vec3 uTrail[${TRAIL}];

  attribute float aPhase;

  varying float vLift;

  void main() {
    vec2 p = position.xy;

    // Respiración: un desplazamiento mínimo y desfasado por punto. Sin esto la
    // grilla parece impresa; con más de un píxel, parece agua.
    p.y += sin(uTime * 0.6 + aPhase) * 0.7;
    p.x += cos(uTime * 0.45 + aPhase * 1.3) * 0.5;

    // La estela: cada muestra empuja el punto en dirección contraria a sí
    // misma, con caída suave. \`uTrail[i].z\` es el peso de la muestra, que
    // decae con la antigüedad.
    float lift = 0.0;
    vec2 push = vec2(0.0);

    for (int i = 0; i < ${TRAIL}; i++) {
      vec2 delta = p - uTrail[i].xy;
      float dist = length(delta);
      float fall = smoothstep(uRadius, 0.0, dist) * uTrail[i].z;
      push += normalize(delta + vec2(0.0001)) * fall * uPush;
      lift = max(lift, fall);
    }

    p += push;
    vLift = lift;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 0.0, 1.0);
    gl_PointSize = (uSize + lift * 2.4) * uPixelRatio;
  }
`

const DOT_FRAGMENT = /* glsl */ `
  precision mediump float;

  uniform vec3 uInk;
  uniform vec3 uPen;
  uniform float uOpacity;

  varying float vLift;

  void main() {
    // Disco con borde suave: un cuadrado de punto se nota en pantallas densas.
    float d = length(gl_PointCoord - vec2(0.5));
    float mask = 1.0 - smoothstep(0.34, 0.5, d);
    if (mask <= 0.001) discard;

    // El punto se entinta de rojo sólo en el corazón de la estela.
    vec3 color = mix(uInk, uPen, smoothstep(0.55, 1.0, vLift));
    gl_FragColor = vec4(color, mask * uOpacity * (0.75 + vLift * 0.45));
  }
`

const SPARK_VERTEX = /* glsl */ `
  uniform float uPixelRatio;

  attribute float aAlpha;
  attribute float aSize;
  attribute float aTint;

  varying float vAlpha;
  varying float vTint;

  void main() {
    vAlpha = aAlpha;
    vTint = aTint;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio;
  }
`

const SPARK_FRAGMENT = /* glsl */ `
  precision mediump float;

  uniform vec3 uInk;
  uniform vec3 uPen;

  varying float vAlpha;
  varying float vTint;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float mask = 1.0 - smoothstep(0.28, 0.5, d);
    if (mask <= 0.001) discard;

    gl_FragColor = vec4(mix(uInk, uPen, vTint), mask * vAlpha);
  }
`

interface Options {
  /** El lienzo. Lo crea el componente; este módulo no toca el DOM alrededor. */
  canvas: HTMLCanvasElement
  /** El elemento que define el área de dibujo y escucha el puntero. */
  host: HTMLElement
}

export interface HeroField {
  dispose(): void
}

/** Lee un color del tema y lo convierte al espacio de trabajo del renderer. */
function themeColor(styles: CSSStyleDeclaration, name: string, into: Color) {
  const value = styles.getPropertyValue(name).trim()
  if (value) into.set(value)
  return into
}

export function createHeroField({ canvas, host }: Options): HeroField {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    // Los puntos ya salen con borde suave desde el fragment: el multisampling
    // no aporta nada y en móviles cuesta memoria.
    antialias: false,
    powerPreference: "low-power",
  })
  renderer.setClearAlpha(0)

  const scene = new Scene()
  // Cámara ortográfica en píxeles CSS. Los bordes se fijan en el primer
  // `resize`, que corre antes del primer cuadro.
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 10)
  camera.position.z = 1

  // ─── Estado estable ──────────────────────────────────────────────────────
  const ink = new Color()
  const pen = new Color()

  const trail = new Float32Array(TRAIL * 3)
  const dotUniforms = {
    uTime: { value: 0 },
    uPixelRatio: { value: 1 },
    uSize: { value: 2.1 },
    uRadius: { value: RADIUS },
    uPush: { value: PUSH },
    uOpacity: { value: 1 },
    uInk: { value: ink },
    uPen: { value: pen },
    // El mismo Float32Array que actualiza el bucle: three lo sube tal cual
    // como `vec3[]`, así que no hay copia por cuadro.
    uTrail: { value: trail },
  }

  const dotGeometry = new BufferGeometry()
  const dotPositions = new Float32Array(MAX_DOTS * 3)
  const dotPhases = new Float32Array(MAX_DOTS)
  for (let i = 0; i < MAX_DOTS; i++) dotPhases[i] = Math.random() * Math.PI * 2
  const dotPositionAttribute = new BufferAttribute(dotPositions, 3)
  dotPositionAttribute.setUsage(DynamicDrawUsage)
  dotGeometry.setAttribute("position", dotPositionAttribute)
  dotGeometry.setAttribute("aPhase", new BufferAttribute(dotPhases, 1))
  dotGeometry.setDrawRange(0, 0)

  const dotMaterial = new ShaderMaterial({
    uniforms: dotUniforms,
    vertexShader: DOT_VERTEX,
    fragmentShader: DOT_FRAGMENT,
    transparent: true,
    depthWrite: false,
  })

  const dots = new Points(dotGeometry, dotMaterial)
  dots.name = "hero-field-dots"
  dots.frustumCulled = false
  scene.add(dots)

  // ─── Chispas: pool de tamaño fijo ────────────────────────────────────────
  const sparkPositions = new Float32Array(MAX_SPARKS * 3)
  const sparkAlpha = new Float32Array(MAX_SPARKS)
  const sparkSize = new Float32Array(MAX_SPARKS)
  const sparkTint = new Float32Array(MAX_SPARKS)
  const sparkVelocity = new Float32Array(MAX_SPARKS * 2)
  const sparkLife = new Float32Array(MAX_SPARKS)
  const sparkMaxLife = new Float32Array(MAX_SPARKS)
  let sparkCursor = 0
  let liveSparks = 0

  const sparkGeometry = new BufferGeometry()
  const sparkPositionAttribute = new BufferAttribute(sparkPositions, 3)
  const sparkAlphaAttribute = new BufferAttribute(sparkAlpha, 1)
  const sparkSizeAttribute = new BufferAttribute(sparkSize, 1)
  const sparkTintAttribute = new BufferAttribute(sparkTint, 1)
  for (const attribute of [
    sparkPositionAttribute,
    sparkAlphaAttribute,
    sparkSizeAttribute,
    sparkTintAttribute,
  ]) {
    attribute.setUsage(DynamicDrawUsage)
  }
  sparkGeometry.setAttribute("position", sparkPositionAttribute)
  sparkGeometry.setAttribute("aAlpha", sparkAlphaAttribute)
  sparkGeometry.setAttribute("aSize", sparkSizeAttribute)
  sparkGeometry.setAttribute("aTint", sparkTintAttribute)

  const sparkMaterial = new ShaderMaterial({
    uniforms: {
      uPixelRatio: dotUniforms.uPixelRatio,
      uInk: dotUniforms.uInk,
      uPen: dotUniforms.uPen,
    },
    vertexShader: SPARK_VERTEX,
    fragmentShader: SPARK_FRAGMENT,
    transparent: true,
    depthWrite: false,
  })

  const sparks = new Points(sparkGeometry, sparkMaterial)
  sparks.name = "hero-field-sparks"
  sparks.frustumCulled = false
  scene.add(sparks)

  // ─── Estado de cuadro ────────────────────────────────────────────────────
  const pointer = new Vector2()
  const lastSpawn = new Vector2()
  let pointerInside = false
  /** Se apaga sola cuando el puntero se va: la estela se desvanece, no salta. */
  let pointerEnergy = 0
  let width = 0
  let height = 0
  let pixelRatio = 1
  let frame = 0
  let running = false
  let visible = true
  let onScreen = true
  let elapsed = 0
  let previous = 0

  function readTheme() {
    const styles = getComputedStyle(document.documentElement)
    themeColor(styles, "--bone", ink)
    themeColor(styles, "--pen", pen)
    // La grilla se lee apenas: es fondo, no contenido. El valor sale del mismo
    // lugar que el alfa de `--grid-dot` en el CSS.
    dotUniforms.uOpacity.value =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? 0.15
        : 0.16
  }

  /** Recalcula la grilla para el tamaño actual. Sólo en cambios de tamaño. */
  function layoutDots() {
    const columns = Math.floor(width / SPACING) + 1
    const rows = Math.floor(height / SPACING) + 1
    const total = Math.min(columns * rows, MAX_DOTS)

    const originX = -((columns - 1) * SPACING) / 2
    const originY = -((rows - 1) * SPACING) / 2

    for (let i = 0; i < total; i++) {
      const column = i % columns
      const row = Math.floor(i / columns)
      dotPositions[i * 3] = originX + column * SPACING
      dotPositions[i * 3 + 1] = originY + row * SPACING
      dotPositions[i * 3 + 2] = 0
    }

    dotPositionAttribute.needsUpdate = true
    dotGeometry.setDrawRange(0, total)
  }

  function resize() {
    const rect = host.getBoundingClientRect()
    const nextWidth = Math.max(1, Math.round(rect.width))
    const nextHeight = Math.max(1, Math.round(rect.height))
    // Tope de densidad: por encima de 2 el campo no se ve mejor y en un
    // portátil de retina duplica el coste de relleno sin motivo.
    const nextRatio = Math.min(window.devicePixelRatio || 1, 2)

    if (
      nextWidth === width &&
      nextHeight === height &&
      nextRatio === pixelRatio
    ) {
      return
    }

    width = nextWidth
    height = nextHeight
    pixelRatio = nextRatio

    renderer.setPixelRatio(pixelRatio)
    renderer.setSize(width, height, false)
    dotUniforms.uPixelRatio.value = pixelRatio

    camera.left = -width / 2
    camera.right = width / 2
    camera.top = height / 2
    camera.bottom = -height / 2
    camera.updateProjectionMatrix()

    layoutDots()
  }

  function spawnSpark(x: number, y: number, dirX: number, dirY: number) {
    const i = sparkCursor
    sparkCursor = (sparkCursor + 1) % MAX_SPARKS
    if (sparkLife[i] <= 0) liveSparks++

    // Sale del punto donde pasó el cursor, empujada por el movimiento y con
    // una componente perpendicular: así se abre en abanico en vez de formar
    // una fila detrás del mouse.
    const spread = (Math.random() - 0.5) * 1.6
    sparkPositions[i * 3] = x + (Math.random() - 0.5) * 10
    sparkPositions[i * 3 + 1] = y + (Math.random() - 0.5) * 10
    sparkPositions[i * 3 + 2] = 0
    sparkVelocity[i * 2] = dirX * 26 + -dirY * spread * 30
    sparkVelocity[i * 2 + 1] = dirY * 26 + dirX * spread * 30 + 14
    sparkSize[i] = 1.6 + Math.random() * 1.8
    // Una de cada cinco sale en rojo: la marca del lápiz, no una lluvia roja.
    sparkTint[i] = Math.random() < 0.2 ? 1 : 0
    sparkMaxLife[i] = 0.75 + Math.random() * 0.6
    sparkLife[i] = sparkMaxLife[i]
    sparkAlpha[i] = 0
  }

  function updateSparks(delta: number) {
    if (liveSparks === 0) return

    liveSparks = 0
    for (let i = 0; i < MAX_SPARKS; i++) {
      if (sparkLife[i] <= 0) continue

      sparkLife[i] -= delta
      if (sparkLife[i] <= 0) {
        sparkAlpha[i] = 0
        continue
      }

      liveSparks++
      const drag = Math.exp(-2.6 * delta)
      sparkVelocity[i * 2] *= drag
      sparkVelocity[i * 2 + 1] = sparkVelocity[i * 2 + 1] * drag + 8 * delta
      sparkPositions[i * 3] += sparkVelocity[i * 2] * delta
      sparkPositions[i * 3 + 1] += sparkVelocity[i * 2 + 1] * delta

      // Entra rápido y se apaga lento: una chispa que aparece a plena opacidad
      // se lee como un glitch.
      const t = sparkLife[i] / sparkMaxLife[i]
      sparkAlpha[i] = Math.min(1, (1 - t) * 6) * t * 0.85
    }

    sparkPositionAttribute.needsUpdate = true
    sparkAlphaAttribute.needsUpdate = true
    sparkSizeAttribute.needsUpdate = true
    sparkTintAttribute.needsUpdate = true
  }

  function updateTrail() {
    // La muestra 0 es la actual; las demás la siguen con retardo, que es lo
    // que dibuja el wake. El peso decae con la antigüedad y con la energía del
    // puntero, así que al salir del área la estela se apaga sola.
    for (let i = TRAIL - 1; i > 0; i--) {
      trail[i * 3] += (trail[(i - 1) * 3] - trail[i * 3]) * 0.35
      trail[i * 3 + 1] += (trail[(i - 1) * 3 + 1] - trail[i * 3 + 1]) * 0.35
      trail[i * 3 + 2] = pointerEnergy * (1 - i / TRAIL) * 0.75
    }
    trail[0] = pointer.x
    trail[1] = pointer.y
    trail[2] = pointerEnergy
  }

  function tick(now: number) {
    frame = requestAnimationFrame(tick)

    // Un cuadro después de volver de una pestaña oculta trae un delta de
    // segundos: se acota para que la simulación no dé un salto.
    const delta = Math.min((now - previous) / 1000, 1 / 30)
    previous = now
    elapsed += delta

    pointerEnergy += ((pointerInside ? 1 : 0) - pointerEnergy) * (delta * 6)
    if (pointerEnergy < 0.002) pointerEnergy = 0

    dotUniforms.uTime.value = elapsed
    updateTrail()
    updateSparks(delta)

    renderer.render(scene, camera)
  }

  function start() {
    if (running || !visible || !onScreen) return
    running = true
    previous = performance.now()
    frame = requestAnimationFrame(tick)
  }

  function stop() {
    if (!running) return
    running = false
    cancelAnimationFrame(frame)
  }

  // ─── Escuchas ────────────────────────────────────────────────────────────
  function onPointerMove(event: PointerEvent) {
    // Sólo puntero fino. En una pantalla táctil el dedo tapa el efecto y el
    // `pointermove` llega sólo mientras se arrastra, que es scroll.
    if (event.pointerType === "touch") return

    const rect = host.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = rect.height / 2 - (event.clientY - rect.top)

    const moved = Math.hypot(x - lastSpawn.x, y - lastSpawn.y)
    if (pointerInside && moved > SPARK_EVERY) {
      const dirX = (x - lastSpawn.x) / moved
      const dirY = (y - lastSpawn.y) / moved
      spawnSpark(x, y, dirX, dirY)
      lastSpawn.set(x, y)
    } else if (!pointerInside) {
      lastSpawn.set(x, y)
    }

    pointer.set(x, y)
    pointerInside = true
  }

  function onPointerLeave() {
    pointerInside = false
  }

  function onVisibility() {
    visible = document.visibilityState === "visible"
    if (visible) start()
    else stop()
  }

  const resizeObserver = new ResizeObserver(() => resize())
  resizeObserver.observe(host)

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting)
      if (onScreen) start()
      else stop()
    },
    { rootMargin: "120px" }
  )
  intersectionObserver.observe(host)

  // El tema se cambia desde el encabezado escribiendo un atributo en <html>.
  const themeObserver = new MutationObserver(() => readTheme())
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  })

  host.addEventListener("pointermove", onPointerMove, { passive: true })
  host.addEventListener("pointerleave", onPointerLeave, { passive: true })
  document.addEventListener("visibilitychange", onVisibility)

  readTheme()
  resize()
  visible = document.visibilityState === "visible"
  start()

  return {
    dispose() {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      host.removeEventListener("pointermove", onPointerMove)
      host.removeEventListener("pointerleave", onPointerLeave)
      document.removeEventListener("visibilitychange", onVisibility)

      scene.remove(dots)
      scene.remove(sparks)
      dotGeometry.dispose()
      dotMaterial.dispose()
      sparkGeometry.dispose()
      sparkMaterial.dispose()
      renderer.dispose()
    },
  }
}
