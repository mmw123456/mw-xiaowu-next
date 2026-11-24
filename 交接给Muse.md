# MW小屋 Next.js 版 · 交接说明

写给接手的人 / AI。看完这份 + `项目日志.md` 就能继续干活，不需要问原作者。

## 1. 这是什么

个人主页 `MW小屋` 的 Next.js 重做版。底子是 `https://github.com/AnxForever/anx-portfolio`（MIT，原 fork 自 ncdai/chanhdai.com），视觉与动效对齐 `anxforever.cn`，内容全部是 MW 的真实信息。

- 技术栈：Next.js 16（App Router，Turbopack）+ React 19 + Tailwind v4 + shadcn/ui + motion
- 仓库：`https://github.com/mmw123456/mw-xiaowu-next`（branch `main`）
- 线上（海外，Vercel）：`https://mw-xiaowu-next.vercel.app` —— 服务器正常返回 200，但 `vercel.app` 在中国大陆 DNS + IP 双封，本地打不开，属正常现象，不是站点坏了
- 线上（国内可达，WorkBuddy 托管）：`https://mw-xiaowu.app.workbuddy.host/?sharecode=OURL5YTUOC` —— `?sharecode=` 必须带，去掉返回 403

## 2. 怎么跑起来

```bash
# 装依赖（注意：npm 会 ERESOLVE，必须加 --legacy-peer-deps；pnpm 不需要）
pnpm install
# 或者
npm install --legacy-peer-deps

# 开发
pnpm dev            # http://localhost:3000

# 类型检查 / 构建
pnpm check-types    # tsc --noEmit
pnpm build          # next build，应输出 21 条路由
```

`.env.local` 已随包附带，只有一项：

```
NEXT_PUBLIC_GITHUB_CONTRIBUTIONS_API_URL=https://github-contributions-api.jogruber.de/v4
```

**不配这一项，首页热力图整块不渲染**（`getCachedContributions` 返回空数组，静默消失，不报错）。

`next.config.ts` 里开了 `output: "standalone"`。要按生产模式跑：

```bash
HOSTNAME=0.0.0.0 node .next/standalone/server.js   # 不设 HOSTNAME 会 getaddrinfo ENOTFOUND
```

`pnpm start` 也能跑，但会提示 standalone 警告。

## 3. 目录里值得先看的东西

| 文件 | 作用 |
| --- | --- |
| `src/app/(app)/page.tsx` | 首页区块顺序：Overview → Social → Contributions → About → Stack → Education → Projects → Tools |
| `src/features/portfolio/data/*.ts(x)` | 全部内容：`user.ts`（名字/About 原话/轮换三行/城市/邮箱 base64）、`projects.tsx`（4 个）、`tech-stack.tsx`、`education.ts`、`tools.ts`、`social-links.ts` |
| `src/features/portfolio/components/anx-mark-solid-geometry.ts` | hero 砖块字 3D 挤出，`GLYPH_PATH` + `VIEW_WIDTH = 704` |
| `src/components/anx-mark.tsx` | 顶栏 monogram，同一份 path |
| `src/components/site-footer-brand.tsx` | 页脚大字水印，同一份 path |
| `src/components/site-footer-cad.tsx` | 页脚 colophon（CRAFTED BY / DATE / DEPLOYED ON / SOURCE CODE / LICENSE / TYPEFACE / STACK / INSPIRED BY） |
| `src/config/site.ts` | `SITE_DOMAIN` 等站点常量 |
| `src/registry/components/github-contributions/lib/get-cached-contributions.ts` | 热力图数据获取，含超时兜底 |
| `src/features/portfolio/data/github-contributions-last-year.json` | 热力图本地快照（740 格，23 Nov 2025 – 24 Nov 2026），API 挂了就用它 |
| `public/images/mw-avatar.webp` | 头像，1024 原图居中裁方后 640×640 |
| `public/favicon*.svg`、`icon-*.png` | M 字母图标 |
| `项目日志.md` | 决策记录、踩坑、验收数据，比本文件细 |

砖块字的做法：32 单位网格，M 占 x=0 起 10 格宽、W 占 x=384 起 10 格宽，笔画 2 格，8 行高，总宽 704、高 256。改字形只需改那份 path 字符串，三个组件自动同步。

## 4. 现在的状态

已通过：`tsc --noEmit` 0 错误；`next build` 21 条路由；320/360/390/414/768/1280 六档 `scrollWidth === clientWidth` 无横向滚动；深色切换、Ctrl+K 搜索、Projects 手风琴、邮箱滑块、外链全部可用；页面无 `AnxForever` 残留（页脚 `anxforever.cn` 署名是有意保留）。

已删除：Blog / Now / Bookmarks / Craft / Insights / Sponsors / Testimonials / Recognition / Experience / Timeline 各路由，以及 RSS。

## 5. 已知问题（需要人动手的）

1. **页脚 MW 大字水印被容器裁切**，只露出砖块上半截，读不出字母。Vercel 版同样。组件已改成 `max-w-3xl` 不裁切，仍被裁，怀疑父容器 `overflow-hidden` 或固定高度，未定位到。
2. 深色模式下砖块大字对比度是 20/14/26%（浅色 12/9/16% 的提亮版），偏弱，需确认是否再提亮。
3. 时钟后面 `// same time` 文案是 anx 原设计，留删待定。
4. `package.json` 的 `homepage` 仍写 `https://mw-xiaowu.vercel.app`（旧的单文件 HTML 版地址），与 `next` 版不一致，要不要改待定。
5. 热力图快照是 2026-11-24 抓的静态 JSON，时间往前走会过期，建议每次部署前刷新：
   ```bash
   curl "https://github-contributions-api.jogruber.de/v4/mmw123456?y=last" > src/features/portfolio/data/github-contributions-last-year.json
   ```

## 6. 硬约束（别破坏）

1. 保留 MIT `LICENSE`、原作者署名、页脚 `INSPIRED BY anxforever.cn`。
2. 不动线上单文件 HTML 版（`mw-xiaowu` 仓库 + GitHub Pages）。那是在跑的旧版，新版验好之前不替换。
3. 文案不编。About、项目描述都是 MW 自己的原话，改内容要拿他给的原话换，不要润色出新事实。
4. 社交只留 GitHub（`mmw123456`）。不要加宠物、不要 Hello 渐变问候标题。

## 7. 部署

走 GitHub Actions，不用本地 CLI（这台机器的代理按域名拦 `api.vercel.com`，`vercel` CLI 和 curl 都不通；`git push` 也因 `git-receive-pack` 被挡而失败，历史提交是用 GitHub Contents API 逐文件推的）。

```bash
gh workflow run deploy-vercel.yml --repo mmw123456/mw-xiaowu-next --ref main
```

workflow 在产品部署后会自动 `curl` 首页断言：200 + 含「MW小屋」+ 含「中国矿业大学」+ 不含 `AnxForever`。token 存在 repo secret `VERCEL_TOKEN`。

## 8. 环境

Node 22 / 24 均可，pnpm 12.4.2（`corepack enable pnpm`）；husky pre-commit 需要 pnpm 在 PATH，否则提交失败。截图自验用 Playwright + 系统 Chrome `C:\Program Files\Google\Chrome\Application\chrome.exe`。

包内不含 `node_modules`、`.next`、`.git`。git 历史请从远端仓库拉：

```bash
git clone https://github.com/mmw123456/mw-xiaowu-next.git
```
