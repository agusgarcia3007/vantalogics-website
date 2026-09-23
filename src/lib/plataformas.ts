import { getCollection, type CollectionEntry } from "astro:content"

export type PlatformPage = CollectionEntry<"plataformas">

export const PLATFORMS_ROOT = "/plataformas-educativas/"

export function platformPath(page: PlatformPage): string {
  return page.id === "index" ? PLATFORMS_ROOT : `${PLATFORMS_ROOT}${page.id}/`
}

export async function getPlatformPages(): Promise<PlatformPage[]> {
  const pages = await getCollection("plataformas")
  return pages.sort((a, b) => a.data.order - b.data.order)
}
