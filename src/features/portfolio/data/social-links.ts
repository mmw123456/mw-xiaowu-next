import type { SocialProfile } from "@/features/portfolio/types/social-links"

/**
 * Keyed registry of social profiles — the single source of truth. Icons are
 * bound separately in `social-link-icons.tsx` (keyed by the same `SocialName`),
 * so adding a profile here forces the icon map to stay in sync at compile time.
 *
 * Profiles without an account yet stay commented out — uncomment both here and
 * in `social-link-icons.tsx` together, and add the icon to `@/components/icons`
 * if it is not there already.
 */
export const SOCIAL = {
  github: {
    title: "GitHub",
    handle: "mmw123456",
    href: "https://github.com/mmw123456",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
