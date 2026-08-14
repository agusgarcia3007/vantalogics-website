import type { APIRoute } from "astro"

import { renderFeed } from "@/lib/rss"

export const GET: APIRoute = () => renderFeed("ar")
