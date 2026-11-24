import { unstable_cache } from "next/cache"

import type { Activity } from "@/registry/components/contribution-graph"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

export const getCachedContributions = unstable_cache(
  async (username: string) => {
    // Default to the public jogruber API so a fresh deployment shows the graph
    // without extra configuration; set the variable to point elsewhere.
    const apiUrl =
      process.env.NEXT_PUBLIC_GITHUB_CONTRIBUTIONS_API_URL ??
      "https://github-contributions-api.jogruber.de/v4"
    // No contributions API configured — callers treat an empty list as
    // "nothing to show" rather than an error worth failing the page over.
    if (!apiUrl) {
      return []
    }

    const res = await fetch(`${apiUrl}/${username}?y=last`)
    if (!res.ok) {
      return []
    }
    const data = (await res.json()) as GitHubContributionsResponse
    return data.contributions ?? []
  },
  ["github-contributions"],
  { revalidate: 86400 } // Cache for 1 day (86400 seconds)
)
