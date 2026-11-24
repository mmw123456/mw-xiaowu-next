import type { Route } from "next"

import type { NavItem } from "@/types/nav"

type SiteNavItem = NavItem<Route> & {
  shortcut: string
}

// No Blog / Now / Bookmarks pages on this site, so the desktop nav stays empty
// and the header keeps just the mark, search, GitHub and theme controls.
const PAGES: SiteNavItem[] = []

// Navigation, search and keyboard shortcuts share the same published pages.
export const MAIN_NAV: SiteNavItem[] = PAGES

export const MOBILE_NAV: SiteNavItem[] = [
  { title: "Home", href: "/", shortcut: "GH" },
  ...MAIN_NAV,
]
