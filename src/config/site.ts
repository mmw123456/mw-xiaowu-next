import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

export { MAIN_NAV, MOBILE_NAV } from "./navigation"

/**
 * The published origin, without protocol. Single place to change when the
 * deployment target is settled; `.env.local` overrides the dev origin through
 * `NEXT_PUBLIC_APP_URL`, and production should set that variable too.
 *
 * Change this when a custom domain is attached — the Vercel project URL is
 * only the default.
 */
export const SITE_DOMAIN = "mw-xiaowu.vercel.app"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.NEXT_PUBLIC_APP_URL || `https://${SITE_DOMAIN}`,
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const LICENSE = {
  name: "MIT License",
  url: "https://github.com/mmw123456/mw-xiaowu-next/blob/main/LICENSE",
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

/**
 * No X account, so the `twitter.site` / `twitter.creator` metadata fields stay
 * undefined and Next simply omits them.
 */
export const X_HANDLE: string | undefined = undefined

export const GITHUB_USERNAME = SOCIAL.github.handle
export const SOURCE_CODE_GITHUB_REPO = "mmw123456/mw-xiaowu-next"
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/mmw123456/mw-xiaowu-next"

export const SPONSORSHIP_URL = "https://github.com/sponsors/mmw123456"

export const UTM_PARAMS = {
  utm_source: SITE_DOMAIN,
}
