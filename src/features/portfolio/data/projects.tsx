import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "xuliao-bao",
    title: "续聊包生成器",
    summary: "51,997 字 → 8,022 字。",
    link: "https://mmw123456.github.io/xuliao-bao/",
    skills: [],
    isExpanded: true,
    titleEffect: "shimmer",
    description: `一次生成结果：5 次调用；79,481 token；约 ¥1.03。

[打开网站](https://mmw123456.github.io/xuliao-bao/)`,
  },
  {
    id: "xuanji-ge",
    title: "玄机阁",
    summary: "v1.9.0 支持真太阳时，Pro 定价 5 元以内，等上架。",
    link: "https://mmw123456.github.io/xuanji-ge/",
    skills: [],
    description: `v1.9.0 支持真太阳时。Pro 定价 5 元以内，等上架。

[打开网站](https://mmw123456.github.io/xuanji-ge/)`,
  },
  {
    id: "word-article",
    title: "单词文章",
    summary: "网站改版中，旧链接暂时打不开。",
    skills: [],
    description: `网站改版中，旧链接暂时打不开。`,
  },
  {
    id: "tutorial-videos",
    title: "教程视频",
    summary: "AI 项目中文教程，每周一、三、五更新。",
    skills: [],
    description: `把做过的 AI 项目写成中文教程和短视频：续聊包、周报事实分拣器，先验证有没有人需要再写代码。选题看评论区用户原话，痛点优先；简历、JD 相关内容不引用没有出处的数字，不承诺通过率。`,
  },
]
