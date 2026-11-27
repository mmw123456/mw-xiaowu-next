/** A profile's identity is its key in the `SOCIAL` registry, not a field here. */
export type SocialProfile = {
  title: string
  /** Omitted when the profile has no public handle (e.g. short-link only). */
  handle?: string
  href: string
  /** Opt-in: include this profile in JSON-LD `sameAs` (public profile page). */
  sameAs?: boolean
}
