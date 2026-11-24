import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"

export const revalidate = false
export const dynamic = "force-static"

// Stamped once per build, matching the value inlined by next.config.ts.
const BUILD_DATE = new Date(
  process.env.BUILD_TIMESTAMP ?? Date.now()
).toISOString()

const PAGES: {
  href: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}[] = [{ href: "/", changeFrequency: "weekly", priority: 1 }]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return PAGES.map(({ href, changeFrequency, priority }) => ({
    url: `${SITE_INFO.url}${href === "/" ? "" : href}`,
    lastModified: BUILD_DATE,
    changeFrequency,
    priority,
  }))
}
