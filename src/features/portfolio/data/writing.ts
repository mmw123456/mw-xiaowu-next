/**
 * 站外文章 / 教程。博客没有内置，这里只做外链索引。
 *
 * 每条都要真实可访问的地址和标题 —— 不写占位链接。列表为空时整块不渲染
 * （`writing.tsx` 里提前 return null），所以补内容之前页面上看不到它。
 */
export type Writing = {
  key: string
  title: string
  href: string
  /** 一句话说明，写这一篇解决了什么问题。 */
  description: string
}

export const WRITING: Writing[] = [
  {
    key: "deepseek-context-handoff",
    // 标题按抖音分享文案填，视频页完整标题末尾可能还多一截。
    title: "聊了三个月的对话，放几天不聊就接不上了 DeepSeek",
    href: "https://v.douyin.com/e-Euj18MrF4/",
    description: "把断掉的上下文整理成能贴进新窗口的续聊包。",
  },
]
