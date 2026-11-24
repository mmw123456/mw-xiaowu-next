import { unstable_cache } from "next/cache"

import type { Activity } from "@/registry/components/contribution-graph"
import FALLBACK_RESPONSE from "@/features/portfolio/data/github-contributions-last-year.json"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

/**
 * Snapshot of the graph, committed to the repo and refreshed by the deploy
 * workflow. Used whenever the live API is unreachable — build hosts behind a
 * firewall (offline CI, some self-hosted boxes) would otherwise fail the whole
 * `next build` while prerendering the home page.
 */
const FALLBACK = FALLBACK_RESPONSE as GitHubContributionsResponse

export const getCachedContributions = unstable_cache(
  async (username: string) => {
    // Default to the public jogruber API so a fresh deployment shows the graph
    // without extra configuration; set the variable to point elsewhere.
    const apiUrl =
      process.env.NEXT_PUBLIC_GITHUB_CONTRIBUTIONS_API_URL ??
      "https://github-contributions-api.jogruber.de/v4"
    if (!apiUrl) {
      return FALLBACK.contributions ?? []
    }

    try {
      const res = await fetch(`${apiUrl}/${username}?y=last`, {
        signal: AbortSignal.timeout(10_000),
      })
      if (!res.ok) {
        return FALLBACK.contributions ?? []
      }
      const data = (await res.json()) as GitHubContributionsResponse
      return data.contributions ?? FALLBACK.contributions ?? []
    } catch {
      // Network unavailable at build time — the snapshot keeps the section
      // rendering instead of failing the page.
      return FALLBACK.contributions ?? []
    }
  },
  ["github-contributions"],
  { revalidate: 86400 } // Cache for 1 day (86400 seconds)
)
