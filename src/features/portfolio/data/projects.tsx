import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "xuliao-bao",
    title: "续聊包生成器",
    summary:
      "DeepSeek 长对话整理/迁移工具，一键把超长对话压成可续聊的摘要包",
    status: "live",
    group: "ai",
    link: "https://mmw123456.github.io/xuliao-bao/",
    skills: ["DeepSeek API", "JavaScript"],
    titleEffect: "shimmer",
  },
  {
    id: "mw-english",
    title: "MW English",
    summary: "背单词 App（Flutter，820 词，六箱 Leitner，液态玻璃）",
    status: "live",
    group: "ai",
    link: "https://github.com/mmw123456/mw-english",
    skills: ["Flutter", "Dart", "SQLite"],
    description: `已上线，持续更新。`,
  },
  {
    id: "ronin",
    title: "Ronin",
    summary:
      "装在自己电脑上的个人 agent（本地运行、数据不出本机、第二大脑）",
    status: "wip",
    group: "ai",
    skills: ["Python", "Ollama", "LangChain", "ChromaDB"],
  },
  {
    id: "xuanji-ge",
    title: "玄机阁",
    summary:
      "单文件命理程序：八字、紫微、称骨、配对、塔罗，打开即用（真太阳时校准）",
    status: "live",
    group: "other",
    link: "https://mmw123456.github.io/xuanji-ge/",
    skills: ["HTML", "JavaScript"],
    description: `免费 + 打赏；Pro 版待上架。`,
  },
]
