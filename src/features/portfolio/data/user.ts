import type { User } from "@/features/portfolio/types/user"

const BIO = "非科班大一，边学边做能用的 AI 小东西。"

export const USER: User = {
  firstName: "MW",
  lastName: "",
  displayName: "MW小屋",
  // 头像旁显示的名字，与站名（页脚 / PWA / OG 图）分开，站名仍是 MW小屋。
  nickname: "腼腆小美",
  username: "mmw123456",
  bio: BIO,
  // Rendered as plain text, not markdown — keep these free of link syntax.
  flipSentences: [
    BIO,
    "平时没事搞点 AI 有关的项目。",
    "2026级中国矿业大学学生。",
  ],
  // 头像 / About 上方那行「现在在做什么」。为空时对应条目自动跳过。
  status: "目前在开发个人Agent，英语学习APP",
  // 来自 About 原话；不想公开的话删掉这一行即可。
  address: "徐州，中国",
  // 邮箱是 base64 编码的，避免被爬虫直接抓走。
  emailB64: "MzQ2MDQ0MDE0NUBxcS5jb20=",
  // phoneNumberB64 暂未公开 —— 留空即可，对应的 overview 条目会自动跳过。
  jobs: [],
  about: `2026级中国矿业大学矿物加工工程在读。主线是 AI，做能用的小东西（MW English、Ronin、续聊包），偶尔写教程。`,
  avatar: "/images/mw-avatar.webp",
  avatarSketch: "/images/mw-avatar.webp",
  ogImage: `/og/simple?title=MW小屋&description=${encodeURIComponent(BIO)}`,
  keywords: [
    "mw",
    "mw小屋",
    "mmw123456",
    "AI",
    "DeepSeek",
    "Flutter",
    "背单词",
    "个人 agent",
    "中国矿业大学",
    "矿物加工工程",
    "个人网站",
  ],
  timeZone: "Asia/Shanghai",
  dateCreated: "2026-11-24",
}
