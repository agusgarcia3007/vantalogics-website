import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LineLoop,
  LineSegments,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
  type Material,
} from "three"

import {
  arcsFragment,
  arcsVertex,
  dustFragment,
  dustVertex,
  haloFragment,
  haloVertex,
  moonFragment,
  moonVertex,
  nodesFragment,
  nodesVertex,
  orbitFragment,
  orbitVertex,
  sparkFragment,
  sparkVertex,
} from "./shaders"

/**
 * La luna del hero.
 *
 * Una sola dueña para todo: este módulo crea el canvas, el renderer, la
 * cámara, el loop, los observers y los listeners, y `dispose()` los suelta en
 * orden inverso. El resto de la página sólo le pasa un contenedor y le avisa
 * cuánto se scrolleó (`setScroll`), sin que la escena lea el DOM por cuadro.
 *
 * Unidades: la esfera tiene radio 1 en su espacio local; `world` la ubica y la
 * escala para que caiga en la fracción de pantalla que pide el layout.
 */

const ACCENT = new Color("#6798ff")
const FOV = 30
const CAMERA_Z = 10
const NODE_COUNT = 1400
const HUB_RATIO = 0.07
const DUST_COUNT = 520
const ORBIT_SEGMENTS = 512
const INTRO_SECONDS = 2.8
const TAU = Math.PI * 2

export interface MoonOptions {
  /** Sin animación continua: se dibuja el estado final y se detiene. */
  reducedMotion: boolean
  /** Se llama cuando el primer cuadro ya está en pantalla. */
  onReady?: () => void
  /** Se llama si el contexto WebGL se pierde. */
  onFail?: () => void
}

export interface MoonScene {
  setScroll: (progress: number) => void
  dispose: () => void
}

interface Layout {
  /** Centro en fracciones del canvas. */
  x: number
  y: number
  /** Radio en píxeles CSS. */
  radius: number
}

function layoutFor(width: number, height: number): Layout {
  if (width >= 1024) {
    return { x: 0.76, y: 0.43, radius: Math.min(height * 0.32, width * 0.22) }
  }
  if (width >= 640) {
    return { x: 0.76, y: 0.2, radius: width * 0.26 }
  }
  return { x: 0.8, y: 0.12, radius: width * 0.36 }
}

/** Puntos repartidos de forma pareja sobre la esfera (espiral de Fibonacci). */
function fibonacciSphere(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    out[i * 3] = Math.cos(theta) * r * radius
    out[i * 3 + 1] = y * radius
    out[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return out
}

/** PRNG determinístico: la red se ve igual en cada visita. */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildNodes(random: () => number) {
  const positions = fibonacciSphere(NODE_COUNT, 1.004)
  const seeds = new Float32Array(NODE_COUNT)
  const hubs = new Float32Array(NODE_COUNT)
  const hubIndices: number[] = []
  for (let i = 0; i < NODE_COUNT; i++) {
    seeds[i] = random()
    if (random() < HUB_RATIO) {
      hubs[i] = 1
      hubIndices.push(i)
    }
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute("position", new BufferAttribute(positions, 3))
  geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1))
  geometry.setAttribute("aHub", new BufferAttribute(hubs, 1))
  return { geometry, positions, hubIndices }
}

/**
 * Arcos de círculo máximo entre hubs cercanos, levantados apenas sobre la
 * superficie. Cada vértice lleva su posición relativa en el arco (`aT`) para
 * que el shader haga viajar un pulso.
 */
function buildArcs(
  positions: Float32Array,
  hubIndices: number[],
  random: () => number
) {
  const SEGMENTS = 18
  const MAX_ANGLE = 0.62
  const pairs: [number, number][] = []
  const a = new Vector3()
  const b = new Vector3()

  for (let i = 0; i < hubIndices.length; i++) {
    a.fromArray(positions, hubIndices[i] * 3).normalize()
    let links = 0
    for (let j = i + 1; j < hubIndices.length && links < 2; j++) {
      b.fromArray(positions, hubIndices[j] * 3).normalize()
      if (a.angleTo(b) < MAX_ANGLE) {
        pairs.push([hubIndices[i], hubIndices[j]])
        links++
      }
    }
  }

  const vertexCount = pairs.length * SEGMENTS * 2
  const position = new Float32Array(vertexCount * 3)
  const t = new Float32Array(vertexCount)
  const seed = new Float32Array(vertexCount)
  const p = new Vector3()
  let v = 0

  const pointAt = (from: Vector3, to: Vector3, s: number, out: Vector3) => {
    const angle = from.angleTo(to)
    const sin = Math.sin(angle) || 1
    const wa = Math.sin((1 - s) * angle) / sin
    const wb = Math.sin(s * angle) / sin
    out
      .copy(from)
      .multiplyScalar(wa)
      .addScaledVector(to, wb)
      .normalize()
      .multiplyScalar(1.008 + Math.sin(s * Math.PI) * angle * 0.09)
  }

  for (const [ia, ib] of pairs) {
    a.fromArray(positions, ia * 3).normalize()
    b.fromArray(positions, ib * 3).normalize()
    const s = random()
    for (let k = 0; k < SEGMENTS; k++) {
      for (const step of [k, k + 1]) {
        const u = step / SEGMENTS
        pointAt(a, b, u, p)
        p.toArray(position, v * 3)
        t[v] = u
        seed[v] = s
        v++
      }
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute("position", new BufferAttribute(position, 3))
  geometry.setAttribute("aT", new BufferAttribute(t, 1))
  geometry.setAttribute("aSeed", new BufferAttribute(seed, 1))
  return geometry
}

function buildOrbit(radius: number) {
  const position = new Float32Array(ORBIT_SEGMENTS * 3)
  const angle = new Float32Array(ORBIT_SEGMENTS)
  for (let i = 0; i < ORBIT_SEGMENTS; i++) {
    const theta = (i / ORBIT_SEGMENTS) * TAU
    position[i * 3] = Math.cos(theta) * radius
    position[i * 3 + 1] = 0
    position[i * 3 + 2] = Math.sin(theta) * radius
    angle[i] = theta
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute("position", new BufferAttribute(position, 3))
  geometry.setAttribute("aAngle", new BufferAttribute(angle, 1))
  return geometry
}

function buildDust(random: () => number) {
  const position = new Float32Array(DUST_COUNT * 3)
  const seed = new Float32Array(DUST_COUNT)
  for (let i = 0; i < DUST_COUNT; i++) {
    const r = 2.2 + random() * 5
    const theta = random() * TAU
    const phi = Math.acos(2 * random() - 1)
    position[i * 3] = Math.sin(phi) * Math.cos(theta) * r * 1.6
    position[i * 3 + 1] = Math.cos(phi) * r
    position[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r - 2
    seed[i] = random()
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute("position", new BufferAttribute(position, 3))
  geometry.setAttribute("aSeed", new BufferAttribute(seed, 1))
  return geometry
}

const easeOutExpo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x))
const damp = (from: number, to: number, lambda: number, dt: number) =>
  from + (to - from) * (1 - Math.exp(-lambda * dt))

export function createMoonScene(
  container: HTMLElement,
  options: MoonOptions
): MoonScene {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  })
  renderer.setClearColor(0x000000, 0)
  const canvas = renderer.domElement
  canvas.setAttribute("aria-hidden", "true")
  canvas.style.display = "block"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  container.appendChild(canvas)

  const isSmall = window.matchMedia("(max-width: 767px)").matches
  const octaves = isSmall ? 2 : 3
  const random = mulberry32(20260916)

  const scene = new Scene()
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100)
  camera.position.set(0, 0, CAMERA_Z)

  const world = new Group()
  world.name = "moon-world"
  scene.add(world)

  // El cuerpo gira; la órbita y el halo quedan fijos respecto de la cámara.
  const body = new Group()
  body.name = "moon-body"
  body.rotation.set(0.32, -0.6, 0.18)
  world.add(body)

  const light = new Vector3(0.82, 0.5, -0.28).normalize()
  const lightBase = light.clone()

  const time = { value: 0 }
  const reveal = { value: 0 }
  const pixelRatio = { value: 1 }
  const accent = { value: ACCENT }

  // --- Halo (detrás) -------------------------------------------------------
  const HALO_SCALE = 3.2
  const haloMaterial = new ShaderMaterial({
    vertexShader: haloVertex,
    fragmentShader: haloFragment,
    uniforms: {
      uAccent: accent,
      uReveal: reveal,
      uScale: { value: HALO_SCALE * 2 },
      uLight2D: { value: new Vector2(light.x, light.y).normalize() },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  const haloGeometry = new PlaneGeometry(HALO_SCALE * 2, HALO_SCALE * 2)
  const halo = new Mesh(haloGeometry, haloMaterial)
  halo.name = "moon-halo"
  halo.renderOrder = 0
  world.add(halo)

  // --- Luna ---------------------------------------------------------------
  const moonGeometry = new SphereGeometry(1, 144, 96)
  const moonMaterial = new ShaderMaterial({
    vertexShader: moonVertex,
    fragmentShader: moonFragment,
    defines: { OCTAVES: octaves },
    uniforms: {
      uTime: time,
      uReveal: reveal,
      uLight: { value: light },
      uAccent: accent,
    },
  })
  const moon = new Mesh(moonGeometry, moonMaterial)
  moon.name = "moon-surface"
  moon.renderOrder = 1
  body.add(moon)

  // --- Red de nodos y arcos ------------------------------------------------
  const nodes = buildNodes(random)
  const nodesMaterial = new ShaderMaterial({
    vertexShader: nodesVertex,
    fragmentShader: nodesFragment,
    uniforms: {
      uTime: time,
      uReveal: reveal,
      uAccent: accent,
      uPixelRatio: pixelRatio,
      uSize: { value: 22 },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  const nodePoints = new Points(nodes.geometry, nodesMaterial)
  nodePoints.name = "moon-nodes"
  nodePoints.renderOrder = 2
  body.add(nodePoints)

  const arcsGeometry = buildArcs(nodes.positions, nodes.hubIndices, random)
  const arcsMaterial = new ShaderMaterial({
    vertexShader: arcsVertex,
    fragmentShader: arcsFragment,
    uniforms: { uTime: time, uReveal: reveal, uAccent: accent },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  const arcs = new LineSegments(arcsGeometry, arcsMaterial)
  arcs.name = "moon-arcs"
  arcs.renderOrder = 2
  body.add(arcs)

  // --- Órbita y chispa -----------------------------------------------------
  const orbitPlane = new Group()
  orbitPlane.name = "moon-orbit-plane"
  orbitPlane.rotation.set(0.32, 0, -0.42)
  world.add(orbitPlane)

  const ORBIT_RADIUS = 1.62
  const orbitGeometry = buildOrbit(ORBIT_RADIUS)
  const sparkAngle = { value: 0 }
  const orbitMaterial = new ShaderMaterial({
    vertexShader: orbitVertex,
    fragmentShader: orbitFragment,
    uniforms: { uSpark: sparkAngle, uReveal: reveal, uAccent: accent },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  const orbit = new LineLoop(orbitGeometry, orbitMaterial)
  orbit.name = "moon-orbit"
  orbit.renderOrder = 3
  orbitPlane.add(orbit)

  const sparkGeometry = new BufferGeometry()
  const sparkPosition = new Float32Array(3)
  sparkGeometry.setAttribute("position", new BufferAttribute(sparkPosition, 3))
  const sparkMaterial = new ShaderMaterial({
    vertexShader: sparkVertex,
    fragmentShader: sparkFragment,
    uniforms: {
      uAccent: accent,
      uReveal: reveal,
      uTime: time,
      uPixelRatio: pixelRatio,
      uSize: { value: 900 },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  const spark = new Points(sparkGeometry, sparkMaterial)
  spark.name = "moon-spark"
  spark.renderOrder = 4
  spark.frustumCulled = false
  orbitPlane.add(spark)

  // --- Polvo ---------------------------------------------------------------
  const dustGeometry = buildDust(random)
  const dustMaterial = new ShaderMaterial({
    vertexShader: dustVertex,
    fragmentShader: dustFragment,
    uniforms: { uTime: time, uReveal: reveal, uPixelRatio: pixelRatio },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  const dust = new Points(dustGeometry, dustMaterial)
  dust.name = "moon-dust"
  dust.renderOrder = 0
  world.add(dust)

  // --- Estado --------------------------------------------------------------
  const size = { width: 0, height: 0 }
  const placement = { x: 0, y: 0, scale: 1 }
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  const scroll = { current: 0, target: 0 }
  let elapsed = 0
  let last = 0
  let introStart = -1
  let running = false
  let visible = true
  let disposed = false
  let readySent = false

  const resize = (width: number, height: number) => {
    if (width === 0 || height === 0) return
    const dprCap = width < 768 ? 1.5 : 1.75
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap)
    if (
      width === size.width &&
      height === size.height &&
      dpr === pixelRatio.value
    ) {
      return
    }
    size.width = width
    size.height = height
    pixelRatio.value = dpr
    renderer.setPixelRatio(dpr)
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    // Píxeles CSS → unidades de mundo en el plano z = 0.
    const viewHeight = 2 * CAMERA_Z * Math.tan((FOV * Math.PI) / 360)
    const perPixel = viewHeight / height
    const layout = layoutFor(width, height)
    placement.x = (layout.x * width - width / 2) * perPixel
    placement.y = -(layout.y * height - height / 2) * perPixel
    placement.scale = layout.radius * perPixel

    if (!running) renderFrame(0)
  }

  const renderFrame = (dt: number) => {
    // 1. Entrada y reloj.
    if (options.reducedMotion) {
      reveal.value = 1
    } else if (introStart >= 0) {
      reveal.value = easeOutExpo(
        Math.min((elapsed - introStart) / INTRO_SECONDS, 1)
      )
    }
    time.value = elapsed

    // 2. Entradas amortiguadas.
    pointer.x = damp(pointer.x, pointer.tx, 2.6, dt)
    pointer.y = damp(pointer.y, pointer.ty, 2.6, dt)
    scroll.current = options.reducedMotion
      ? scroll.target
      : damp(scroll.current, scroll.target, 6, dt)

    // 3. Transformaciones.
    const rise = (1 - reveal.value) * -0.9
    world.position.set(
      placement.x,
      placement.y + (rise + scroll.current * 0.9) * placement.scale,
      0
    )
    world.scale.setScalar(placement.scale * (1 + scroll.current * 0.12))

    body.rotation.y = -0.6 + elapsed * 0.035 + pointer.x * 0.22
    body.rotation.x = 0.32 + pointer.y * 0.12 + scroll.current * 0.35

    sparkAngle.value = (elapsed * 0.42 + 2.2) % TAU
    sparkPosition[0] = Math.cos(sparkAngle.value) * ORBIT_RADIUS
    sparkPosition[1] = 0
    sparkPosition[2] = Math.sin(sparkAngle.value) * ORBIT_RADIUS
    sparkGeometry.attributes.position.needsUpdate = true

    dust.rotation.y = elapsed * 0.01 + pointer.x * 0.05

    // La luz sigue apenas al puntero: el usuario mueve el terminador.
    light
      .set(
        lightBase.x + pointer.x * 0.35,
        lightBase.y - pointer.y * 0.25,
        lightBase.z
      )
      .normalize()

    camera.position.x = pointer.x * 0.18
    camera.position.y = -pointer.y * 0.12
    camera.lookAt(0, 0, 0)

    // 4. Render.
    renderer.render(scene, camera)

    if (!readySent) {
      readySent = true
      options.onReady?.()
    }
  }

  const tick = (now: number) => {
    const seconds = now / 1000
    // Pestaña oculta o pausa larga: no se simula el tiempo perdido.
    const dt = last === 0 ? 0 : Math.min(seconds - last, 1 / 20)
    last = seconds
    elapsed += dt
    if (introStart < 0) introStart = elapsed
    renderFrame(dt)
  }

  const start = () => {
    if (running || disposed || options.reducedMotion) return
    running = true
    last = 0
    renderer.setAnimationLoop(tick)
  }

  const stop = () => {
    if (!running) return
    running = false
    renderer.setAnimationLoop(null)
  }

  const syncRunning = () => {
    if (visible && document.visibilityState === "visible") start()
    else stop()
  }

  // --- Suscripciones -------------------------------------------------------
  const resizeObserver = new ResizeObserver((entries) => {
    const box = entries[0]?.contentRect
    if (box) resize(Math.round(box.width), Math.round(box.height))
  })
  resizeObserver.observe(container)

  const intersection = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
      syncRunning()
    },
    { rootMargin: "80px" }
  )
  intersection.observe(container)

  const onVisibility = () => syncRunning()
  document.addEventListener("visibilitychange", onVisibility)

  const finePointer = window.matchMedia("(pointer: fine)").matches
  const onPointer = (event: PointerEvent) => {
    pointer.tx = (event.clientX / window.innerWidth) * 2 - 1
    pointer.ty = (event.clientY / window.innerHeight) * 2 - 1
  }
  if (finePointer && !options.reducedMotion) {
    window.addEventListener("pointermove", onPointer, { passive: true })
  }

  const onContextLost = (event: Event) => {
    event.preventDefault()
    stop()
    options.onFail?.()
  }
  canvas.addEventListener("webglcontextlost", onContextLost)

  // Primer tamaño sincrónico: el primer cuadro sale con la composición final.
  const rect = container.getBoundingClientRect()
  resize(Math.round(rect.width), Math.round(rect.height))

  // Compilar antes del primer cuadro visible evita el tirón de la entrada.
  renderer.compile(scene, camera)
  if (options.reducedMotion) {
    renderFrame(0)
  } else {
    syncRunning()
  }

  return {
    setScroll(progress) {
      scroll.target = Math.min(Math.max(progress, 0), 1)
      // Con el loop corriendo, el próximo cuadro ya lo toma. Sin loop (reduced
      // motion) se redibuja acá; fuera de pantalla no hace falta dibujar.
      if (!running && !disposed && options.reducedMotion) renderFrame(0)
    },
    dispose() {
      if (disposed) return
      disposed = true
      stop()
      resizeObserver.disconnect()
      intersection.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pointermove", onPointer)
      canvas.removeEventListener("webglcontextlost", onContextLost)

      const geometries: BufferGeometry[] = [
        haloGeometry,
        moonGeometry,
        nodes.geometry,
        arcsGeometry,
        orbitGeometry,
        sparkGeometry,
        dustGeometry,
      ]
      const materials: Material[] = [
        haloMaterial,
        moonMaterial,
        nodesMaterial,
        arcsMaterial,
        orbitMaterial,
        sparkMaterial,
        dustMaterial,
      ]
      scene.clear()
      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())
      renderer.dispose()
      canvas.remove()
    },
  }
}
