# Anx 的个人网站

个人网站。首页展示个人介绍、GitHub 贡献热力图与最近的内容入口，另有项目、文章、收藏、作品、经历等页面。

> **已上线。** 两处地址：Vercel 源站 <https://mw-xiaowu-next.vercel.app>（国内打不开）和国内镜像 <https://mw-xiaowu.app.workbuddy.host/?sharecode=OURL5YTUOC>（给国内访客）。`sharecode` 必须带，去掉返回 403。更新流程见下面的「部署」。

## 技术栈

- **Next.js 16**（App Router、Turbopack）
- **React 19** + **TypeScript**（strict）
- **Tailwind CSS v4** + **shadcn/ui**
- **MDX** —— 文章与文档
- **Motion** —— 动效；**Vitest** —— 测试
- **pnpm** —— 包管理

## 本地运行

```bash
pnpm install
cp .env.example .env.local   # 按需填写，见下
pnpm dev
```

打开 <https://anx.localhost>（`next.config.ts` 的 `allowedDevOrigins` 里配的就是这个域名，`.env.local` 的 `NEXT_PUBLIC_APP_URL` 也应指向它 —— 用裸端口会让生成的绝对链接对不上）。

常用命令：

```bash
pnpm build          # 生产构建
pnpm start          # 起生产服务
pnpm test:run       # 跑一次测试
pnpm check-types    # 类型检查
pnpm lint           # ESLint
pnpm format:write   # Prettier
```

推代码前 CI 会跑 `lint` / `format:check` / `build` / `check-types`，本地先过一遍。

## 页面

| 地址            | 内容                                                          |
| --------------- | ------------------------------------------------------------- |
| `/`             | 个人介绍、GitHub 贡献热力图、About、Blog、Education、Projects |
| `/blog`         | 文章列表（含搜索）                                            |
| `/blog/<slug>`  | 文章正文                                                      |
| `/bookmarks`    | 收藏，按分类筛选                                              |
| `/craft`        | 作品展示                                                      |
| `/timeline`     | 时间线                                                        |
| `/testimonials` | 评价                                                          |
| `/sponsors`     | 赞助                                                          |

AI 与爬虫可读的纯文本入口：`/llms.txt`、`/index.md`，以及每篇文章和每个栏目的 `.md` 版本（如 `/blog/a-place-of-my-own.md`）。发 `Accept: text/markdown` 请求网页地址也会返回 markdown。

## 内容维护

内容和页面组件分开，改内容不用动组件。

| 内容                                     | 位置                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------ |
| 个人信息（名字、简介、头像、位置、时区） | `src/features/portfolio/data/user.ts`                                          |
| 社交账号                                 | `src/features/portfolio/data/social-links.ts`                                  |
| 站点配置（域名、导航、许可）             | `src/config/site.ts`                                                           |
| 项目                                     | `src/features/portfolio/data/projects.tsx`                                     |
| 经历 / 教育 / 技能栈                     | `src/features/portfolio/data/{experiences,education,tech-stack}.tsx`           |
| 奖项、认证、知识产权                     | `src/features/portfolio/data/{awards,certifications,intellectual-property}.ts` |
| 时间线                                   | `src/features/portfolio/data/timeline.ts`                                      |
| 评价                                     | `src/features/portfolio/data/testimonials.tsx`                                 |
| 赞助商                                   | `src/features/sponsor/data.tsx`                                                |
| 收藏                                     | `src/features/bookmark/data.tsx`                                               |
| 作品                                     | `src/features/craft/data.ts`                                                   |
| 文章                                     | `src/features/doc/content/blog/*.mdx`                                          |
| 站外文章 / 教程外链                      | `src/features/portfolio/data/writing.ts`                                       |
| 头像与图标                               | `public/images/`、`public/*`                                                   |

几个约定：

- **列表为空时整个区块不渲染。** 不想展示某个栏目，把对应数组清空即可，不会留下只有标题的空壳。
- **日期、链接这类字段是选填的。** 项目没有公开链接、或不知道开始时间时，整个 `period` / `link` 字段省略即可，卡片会自动不显示那一项 —— 不要为了填满而编造。
- **文章**用 MDX，frontmatter 需要 `title`、`description`、`createdAt`、`updatedAt`（`YYYY-MM-DD`）。分类由目录名决定，放在 `content/blog/` 下就是文章。

## 部署

两处线上地址，别混用：

| 位置                | 地址                                                       | 怎么更新                                                                   |
| ------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| Vercel（源站）      | <https://mw-xiaowu-next.vercel.app>                        | 推 `main` 后手动跑 `deploy-vercel.yml`（只配了 `workflow_dispatch`，push 不触发） |
| 国内镜像（给国内访客） | <https://mw-xiaowu.app.workbuddy.host/?sharecode=OURL5YTUOC> | 独立发布，**不跟 GitHub 自动同步**，见下                                   |

`SITE_DOMAIN` 保持 Vercel 域名不动：镜像只是访问入口，不是 canonical，改它会把 sitemap、JSON-LD、OG 里的绝对链接全指到镜像上。

镜像的三条硬约束（都是踩过的）：

1. **发布按工作区绑定。** 只有从 `D:\ai-projects` 工作区发布才能覆盖上面那个 sharecode；从别的工作区发布会新建一个空应用，旧站不受影响，看起来像「部署成功但线上没变」。
2. **构建期不联网拉字体。** 沙箱里拉 Google Fonts 会让 install 阶段超时失败（`SITES_INSTALL_FAILED`）。新增 Google 字体前先本地化（`next/font/local` + 自托管 woff2）。
3. **`installCmd` 里的两个 `cp` 不能省。** `output: "standalone"` 的产物不带 `static` 和 `public`，漏了启动即 404：

```sh
npm install --legacy-peer-deps --no-audit --no-fund \
  && npm run build \
  && cp -r .next/static .next/standalone/.next/static \
  && (cp -r public/. .next/standalone/public/ || true)
```

启动命令：`HOSTNAME=0.0.0.0 node .next/standalone/server.js`，端口 3000。

## 环境变量

全部可选，不配也能跑；只有需要对应功能时才填。详见 `.env.example`。

| 变量                                       | 作用                                                                                                      |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`                      | 站点绝对地址，影响 JSON-LD、sitemap、OG 图                                                                |
| `NEXT_PUBLIC_GITHUB_CONTRIBUTIONS_API_URL` | 首页贡献热力图的接口，默认用公开的 [jogruber API](https://github.com/grubersjoe/github-contributions-api) |
| `GITHUB_API_TOKEN`                         | 头部仓库 star 数。不填走匿名请求（有限流），也能用                                                        |
| `OPENPANEL_*`                              | OpenPanel 分析                                                                                            |
| `NEXT_PUBLIC_GTM_ID`                       | Google Tag Manager                                                                                        |
| `DISCORD_FEEDBACK_WEBHOOK_URL`             | 文档页「这篇有用吗」的回调；不填则打到本地控制台                                                          |
| `NEXT_PUBLIC_CARBON_ADS_*`                 | Carbon 广告；两个都留空则完全不渲染广告位                                                                 |

## 来源与许可

本项目改造自 [ncdai/chanhdai.com](https://github.com/ncdai/chanhdai.com)，MIT 许可。原作者的版权声明保留在 [LICENSE](LICENSE) 中（MIT 要求），品牌相关的限制见 [TRADEMARK.md](TRADEMARK.md) —— 也就是说，代码可以随便用，但 `chanhdai` / `ncdai` 这些名字和他的头像、标识不是。

界面基础控件来自 [shadcn/ui](https://ui.shadcn.com/docs)，部分组件取自 [Cult UI](https://cult-ui.com/) 和 [Kibo UI](https://www.kibo-ui.com/)；图标用 [Lucide](https://lucide.dev/)；动效用 [Motion](https://motion.dev/)。
