import type { Bookmark } from "./types"

/**
 * No bookmark list on this site. Kept as an empty array so the bookmark route
 * and the command menu degrade to an empty state instead of inheriting someone
 * else's collection.
 */
export const BOOKMARKS: Bookmark[] = []
