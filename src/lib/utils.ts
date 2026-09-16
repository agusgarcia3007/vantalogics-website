import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * El sistema define su propia escala tipográfica (text-body, text-label, …) y
 * su propia paleta (canvas, bone, ash, pen…). Sin declararlas, tailwind-merge
 * confunde `text-label` con un color y descarta `text-bone`, dejando texto del
 * color heredado sobre el papel.
 */
const fontSizes = ["micro", "label", "caption", "body", "lead"]

const colors = [
  "canvas",
  "surface",
  "sunken",
  "hairline",
  "bone",
  "ash",
  "faint",
  "pen",
  "pen-ink",
]

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: fontSizes }],
      "text-color": [{ text: colors }],
      "bg-color": [{ bg: colors }],
      "border-color": [{ border: colors }],
      "font-family": [{ font: ["display", "sans", "mono"] }],
      rounded: [{ rounded: ["edge", "pill"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
