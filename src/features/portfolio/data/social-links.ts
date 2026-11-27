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
  // 两个平台给的都是 App「分享主页」生成短链，没有可读的 handle，所以不填。
  // sameAs 也不开：短链会失效，写进 JSON-LD 一旦过期就是坏链接。
  xiaohongshu: {
    title: "小红书",
    href: "https://xhslink.cn/o/825L8bGp9ZZ",
  },
  douyin: {
    title: "抖音",
    href: "https://v.douyin.com/MdYGw6I05jo/",
  },

  // X（Twitter）暂不挂 —— 用户 2026-11-26 明确「先不挂」。补齐时在这里加：
  // x: { title: "X", handle: "<账号名>", href: "https://x.com/<账号名>" },
  // 并同步 social-link-icons.tsx 和 config/site.ts 的 X_HANDLE。
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
