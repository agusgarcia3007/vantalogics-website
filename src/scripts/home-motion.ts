import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

/**
 * Movimiento de la portada ligado al scroll.
 *
 * GSAP es el único reloj de esta capa: Lenis avanza desde `gsap.ticker` y le
 * avisa a ScrollTrigger en cada paso. Las entradas simples siguen siendo CSS
 * (`data-reveal`) y la luna tiene su propio loop, apagado fuera de pantalla.
 * Con reduced motion no se instala nada: la página queda como documento.
 */

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

function smoothScroll() {
  const headerHeight =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-h")
    ) || 68

  const lenis = new Lenis({
    autoRaf: false,
    lerp: 0.11,
    anchors: { offset: -(headerHeight + 16) },
    // Paneles con scroll propio (menú móvil, panel del agente).
    prevent: (node) =>
      node.closest("[data-menu], [role='dialog'], [data-lenis-prevent]") !==
      null,
  })

  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}

function heroExit() {
  const copy = document.querySelector("[data-hero-copy]")
  if (!copy) return
  gsap.to(copy, {
    yPercent: -10,
    opacity: 0.25,
    ease: "none",
    scrollTrigger: {
      trigger: "#inicio",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  })
}

function thesisWords() {
  const title = document.querySelector("[data-scrub-title]")
  const words = gsap.utils.toArray<HTMLElement>("[data-scrub-word]")
  if (!title || !words.length) return
  gsap.fromTo(
    words,
    { opacity: 0.14 },
    {
      opacity: 1,
      ease: "none",
      stagger: 0.12,
      scrollTrigger: {
        trigger: title,
        start: "top 82%",
        end: "bottom 42%",
        scrub: true,
      },
    }
  )
}

function processTrack() {
  const section = document.querySelector<HTMLElement>("[data-process]")
  const pin = section?.querySelector<HTMLElement>("[data-process-pin]")
  const track = section?.querySelector<HTMLElement>("[data-process-track]")
  const bar = section?.querySelector<HTMLElement>("[data-process-bar]")
  const count = section?.querySelector<HTMLElement>("[data-process-count]")
  if (!section || !pin || !track || !bar) return

  const steps = Array.from(
    track.querySelectorAll<HTMLElement>("[data-process-step]")
  )

  const mm = gsap.matchMedia()
  mm.add("(min-width: 1024px)", () => {
    section.setAttribute("data-horizontal", "")
    // En horizontal, los pasos no esperan al observer para aparecer.
    steps.forEach((step) => step.setAttribute("data-revealed", ""))

    const distance = () => Math.max(0, track.scrollWidth - track.clientWidth)
    let active = -1

    const setActive = (index: number) => {
      if (index === active) return
      active = index
      steps.forEach((step, i) => {
        if (i <= index) step.setAttribute("data-active", "")
        else step.removeAttribute("data-active")
      })
      if (count) count.textContent = String(index + 1).padStart(2, "0")
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        pin: true,
        start: "top top",
        end: () => `+=${distance() + window.innerHeight * 0.6}`,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setActive(
            Math.min(steps.length - 1, Math.floor(self.progress * steps.length))
          )
        },
      },
    })

    timeline
      .to(track, { x: () => -distance(), ease: "none" }, 0)
      .fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0)

    setActive(0)

    return () => {
      section.removeAttribute("data-horizontal")
      steps.forEach((step) => step.removeAttribute("data-active"))
    }
  })
}

if (!reduced) {
  gsap.registerPlugin(ScrollTrigger)
  smoothScroll()
  heroExit()
  thesisWords()
  processTrack()

  // Las posiciones dependen de la tipografía final.
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
}
