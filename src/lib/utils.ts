import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const fontSizes = [
  "caption",
  "body",
  "subheading",
  "heading-sm",
  "heading",
  "heading-lg",
  "display",
  "display-xl",
]

const colors = [
  "canvas",
  "surface",
  "hairline",
  "bone",
  "ash",
  "void-black",
  "surface-black",
  "charcoal-hairline",
  "bone-white",
  "ash-gray",
]

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: fontSizes }],
      "text-color": [{ text: colors }],
      "bg-color": [{ bg: colors }],
      "border-color": [{ border: colors }],
      "font-family": [{ font: ["opx", "open-sans", "untitled", "helvetica"] }],
      rounded: [{ rounded: ["pill"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
