# TOWK-Modern 变更记录

> 本文档记录项目从初始化到当前状态的所有变更、决策背景与技术细节。
> 目标读者：接手本项目的下一位开发者或 AI 助手。
> 最后更新：2026-03-27

---

## 项目背景

**新加坡东安会馆**（Tung On Wui Kun）成立于 1876 年，是新加坡历史最悠久的华人宗乡社团之一。旧官网 towk.sg 基于 WordPress，内容停更于 2019 年，存在移动端体验差、CMS 门槛高、无双语支持等问题。

本项目 TOWK-Modern 旨在用 **Next.js 14 + Strapi 5** 完全重建官网，实现现代化、双语化、可持续维护的目标。

---

## 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 前端框架 | Next.js (App Router) | 14.2.x |
| UI | React + Tailwind CSS + Framer Motion | 18 / 3.4 / 12 |
| 国际化 | next-intl | 4.8.x |
| CMS | Strapi 5 (Headless) | 5.40.x |
| 数据库 | PostgreSQL (Docker) | 15 |
| 构建工具 | Turborepo | 2.x |
| 包管理 | npm workspaces | — |
| 部署 | Docker Compose (本地) / Vercel (前端) | — |

---

## 目录结构

```
towk-modern/
├── apps/
│   ├── web/                         # Next.js 前端
│   │   ├── app/
│   │   │   ├── [locale]/            # 多语言路由（zh/en）
│   │   │   │   ├── page.tsx         # 首页
│   │   │   │   ├── about/           # 关于（含 board/ structure/ 子页面）
│   │   │   │   ├── news/            # 新闻列表 + [slug] 详情
│   │   │   │   ├── activities/      # 活动列表 + [slug] 详情
│   │   │   │   ├── gallery/         # 影相库
│   │   │   │   ├── conference/      # 恳亲大会
│   │   │   │   ├── contact/         # 联系我们
│   │   │   │   └── history/         # 历史传承
│   │   │   ├── admin/               # 管理后台（不走 locale 路由）
│   │   │   ├── login/               # 登录页
│   │   │   ├── api/                 # API Routes (cms, auth, upload)
│   │   │   ├── components/          # 共享组件
│   │   │   ├── layout.tsx           # 根 layout（字体、全局样式）
│   │   │   └── globals.css          # CSS 变量、品牌色、移动端适配
│   │   ├── lib/                     # 工具库
│   │   │   ├── cms.ts               # JSON 文件读写（旧 CMS）
│   │   │   ├── strapi.ts            # Strapi API client（新 CMS）
│   │   │   ├── newsData.ts          # 新闻硬编码数据
│   │   │   └── activitiesData.ts    # 活动硬编码数据
│   │   ├── messages/                # i18n 翻译文件
│   │   │   ├── zh.json
│   │   │   └── en.json
│   │   ├── i18n/                    # next-intl 配置
│   │   │   ├── config.ts            # locales, defaultLocale
│   │   │   └── request.ts           # getRequestConfig
│   │   ├── middleware.ts            # next-intl 中间件（locale 路由）
│   │   ├── data/content.json        # 旧 CMS 数据文件
│   │   └── next.config.mjs          # Next.js + next-intl 插件配置
│   └── cms/                         # Strapi 5 CMS
│       ├── config/                  # 服务器、数据库、中间件、插件配置
│       ├── src/api/                 # Content Types（article, activity, album, page-content, site-config）
│       ├── Dockerfile               # 生产部署
│       ├── Dockerfile.dev           # 开发环境（Node 22，因 Strapi 不支持 Node 25）
│       └── .env.example             # 环境变量模板
├── docs/                            # 项目文档
├── 07-renovation-plan.md            # 改造计划与进度跟踪
├── docker-compose.yml               # PostgreSQL + Redis + MinIO + Strapi + Web
└── CLAUDE.md                        # AI 助手指南
```

---

## 变更历史（按时间顺序）

### 1. 项目初始化 `f9525bd`

**做了什么**：Turborepo monorepo 脚手架、Next.js 14 项目、基础配置。
**为什么**：从零搭建现代化前端项目，替代 WordPress。

### 2. 前端整体重建 `3085432`

**做了什么**：
- 首页全部组件：Navigation、Hero（轮播 + 触摸滑动）、About、News、History（时间轴）、Conference、Activities、Footer
- 品牌设计系统：传统红 `#C0392B` + 金色 `#D4A017` + 米白背景 `#F8F6F0`
- 四套字体：思源宋体（中文标题）、思源黑体（中文正文）、Playfair Display（英文标题）、Inter（英文正文）
- 暗色模式支持
- 简易 CMS（JSON 文件 + /admin 编辑界面）

**为什么**：一次性交付完整的首页视觉，让用户能看到成品效果。品牌色系基于华人社团的传统审美（红+金），同时保持现代感。

### 3. 活动详情页 `60688d3`

**做了什么**：
- `/activities/[slug]` 动态路由
- 4 个活动组详情页（粤剧组、妇女组、青年团、交际组），每个约 500 字真实内容
- `lib/activitiesData.ts` 活动数据

**为什么**：会馆有多个常设活动组，需要独立的详情展示页。内容参考了旧站实际信息。

### 4. 关于会馆子页面 `fe332ee`

**做了什么**：
- `/about` 主页：会馆简介 + 价值观 + 历史里程碑 + 子页面链接
- `/about/structure`：组织架构（5 层级，从最高领导到顾问）
- `/about/board`：历届董事会（第 138、139 届完整名单，可折叠展开）
- 新闻列表页（含分类筛选 + 搜索）
- 新闻详情页 `/news/[slug]`

**为什么**：会馆有复杂的组织架构和悠久的董事会历史，这些是核心内容页面。董事名单来自旧站真实数据。

### 5. SEO 全站覆盖 `63862e7`

**做了什么**：
- 为所有页面添加 `layout.tsx` 提供独立的 `<title>` 和 `<meta description>`
- 根 layout 使用 title template `"%s | 新加坡东安会馆"`
- sitemap 扩展覆盖 about 子页面和 activity 详情页
- 修复 gallery 页面 TypeScript 类型错误

**为什么**：所有页面都是 `"use client"` 组件，无法直接 export metadata，所以用 layout.tsx 方式注入。SEO 对于社团组织的线上可发现性至关重要。

**技术决策**：因为页面都是客户端组件（需要 framer-motion 动画和 CMS 数据 fetch），无法转为 Server Component。通过 layout.tsx 中间层注入 metadata 是 Next.js 推荐方案。

### 6. 联系页面 + 计划更新 `1a06e16`

**做了什么**：
- 联系页面地图占位符替换为 Google Maps iframe 嵌入
- 更新 `07-renovation-plan.md` 进度清单

**为什么**：真实地图嵌入比占位符更专业，会馆地址 21 Bukit Pasoh Road 是公开信息。

### 7. Strapi 5 CMS 搭建 `e4deb4c`

**做了什么**：
- `apps/cms/` 完整 Strapi 5 项目（TypeScript）
- 5 个 Content Types：
  - **Article**（集合类型）：新闻文章，含 title/slug/excerpt/content/category/cover/date，支持 i18n
  - **Activity**（集合类型）：活动组别，含 title/slug/subtitle/description/content/highlights，支持 i18n
  - **Album**（集合类型）：相册，含 title/category/date/cover/photos
  - **PageContent**（单一类型）：首页/关于等静态页面的可编辑内容，支持 i18n
  - **SiteConfig**（单一类型）：全局配置（站名、地址、电话、社交媒体）
- Docker 配置：Dockerfile.dev 使用 Node 22（Strapi 5 要求 Node <=24，本地是 Node 25）
- `docker-compose.yml` 加入 Strapi 服务，连接已有 PostgreSQL
- CORS 配置允许 localhost:3000 和 towk.sg
- 前端 `lib/strapi.ts` API client，支持 ISR（60 秒 revalidate）

**为什么**：旧的 JSON 文件 CMS 无法满足多人协作和非技术人员编辑需求。Strapi 5 提供可视化后台、权限分级、i18n 内置支持。

**技术决策**：
- 选择 Docker 而非本地安装 Strapi，因为 Node 版本不兼容
- Content Type 的 i18n 通过 Strapi 内置的 `pluginOptions.i18n.localized` 配置
- 前端保留 JSON 数据作为 fallback，Strapi 不可用时仍能正常展示
- `@strapi/plugin-i18n` 在 Strapi 5 中已内置，不需要单独安装（npm 上只有 beta 版）

### 8. 移动端 UI 大改造 `9aa5045`

**做了什么**：
- **MobileNav 组件**：固定底部导航栏，5 个 tab（首页、关于、动态、影相、更多）
  - "更多" tab 弹出滑动面板，包含活动、恳亲大会、历史、联系
  - 当前页面 tab 高亮 + 圆点指示器
  - 支持 iOS safe area（刘海屏 / Home Indicator）
  - `lg:hidden` — 桌面端隐藏
  - admin/login 页面不显示
- **顶部导航精简**：移动端只保留 logo + settings + 主题切换，移除汉堡菜单
- **首页卡片横向滚动**：News 和 Activities 组件在移动端使用 `overflow-x-auto` + `snap-x`，桌面端仍是 grid
- **全站间距调整**：所有 section `py-12 md:py-24 lg:py-32`，所有子页面 hero `pt-20 md:pt-32`
- **标题缩放**：移动端 `text-3xl`，桌面端 `text-5xl`
- **Footer 优化**：移动端 2 列 grid，紧凑间距
- **CSS 工具类**：`scrollbar-hide`（隐藏滚动条但保留滚动功能）
- body 自动添加底部 padding 适配底部导航栏

**为什么**：会馆成员（尤其年长者）主要使用手机访问。底部导航栏是移动端最自然的交互模式，比汉堡菜单的可发现性高得多。横向滚动卡片减少垂直滚动量，适合手机单手操作。

**技术决策**：
- 使用 `max-md:` 前缀（Tailwind 移动端优先）而非独立的移动端组件
- MobileNav 放在 root layout 而非每个页面，避免重复渲染
- 底部导航使用 `z-[98]`，"更多"面板 `z-[100]`，确保层级正确

### 9. 中英双语支持 `34be70d`

**做了什么**：
- 安装 `next-intl` 4.8.x
- 页面路由重构：所有公开页面移入 `app/[locale]/`
- `middleware.ts`：locale 检测与路由，`localePrefix: "as-needed"`
- `i18n/config.ts`：`locales = ["zh", "en"]`，`defaultLocale = "zh"`
- `i18n/request.ts`：`getRequestConfig` 动态加载翻译文件
- `messages/zh.json` 和 `messages/en.json`：完整的 UI 文本翻译
- `LanguageSwitcher` 组件：EN/中文 切换按钮
- Navigation 组件使用 `useTranslations("nav")` 替代硬编码文本
- `next.config.mjs` 集成 `next-intl/plugin`
- admin 和 login 页面保留在 locale 路由之外

**为什么**：会馆面向新加坡多元种族社会，需要中英双语支持。中文是默认语言（无 URL 前缀），英文通过 `/en/` 前缀访问。

**技术决策**：
- 选择 `next-intl` 而非 `next-i18next`，因为前者对 App Router 支持更原生
- `localePrefix: "as-needed"`：中文 URL 无前缀（`/about`），英文有前缀（`/en/about`），对 SEO 友好且不破坏已有链接
- admin/login/api 路由不走 locale 路由，通过 middleware matcher 排除
- 翻译文件目前覆盖导航和页面标题，页面正文的翻译需后续逐步完成
- import 路径调整：移入 `[locale]/` 后所有组件引用多加一层 `../`

---

## 当前状态与已知问题

### 已完成（P0：9/10）

- [x] 首页、关于、新闻、活动、影相、联系、恳亲大会、历史 — 全部页面
- [x] Strapi 5 CMS（待录入数据，前端仍使用 JSON fallback）
- [x] 中英双语路由框架
- [x] 移动端底部导航 + 响应式布局
- [x] SEO（metadata + sitemap + robots.txt）

### 未完成

| 任务 | 优先级 | 备注 |
|------|--------|------|
| 媒体迁移到 Cloudflare R2 | P0 | 当前使用 Unsplash 占位图 |
| 会员注册/登录系统 | P1 | 需要 Strapi Users + JWT |
| 个人中心 | P1 | 依赖会员系统 |
| 会员审核流程 | P1 | 依赖会员系统 |
| 页面正文内容翻译 | P0 | 框架已就绪，需补充 en.json 中各页面正文 |
| 前端页面使用 useTranslations | P0 | 目前只有 Navigation 组件使用了翻译，其他页面正文仍是硬编码中文 |
| Strapi 数据录入 | P0 | CMS 结构已定义，需录入真实内容并将前端切换为 Strapi 数据源 |
| 微信/社交媒体分享 | P2 | — |
| 全站搜索 | P2 | — |
| Analytics | P2 | 推荐 Umami（隐私友好） |

### 已知技术限制

1. **Node 版本**：本地 Node v25.8.0，Strapi 5 要求 <=24。Strapi 必须通过 Docker 运行（Dockerfile.dev 使用 Node 22）
2. **Strapi i18n 插件**：Strapi 5 内置 i18n，不需要单独安装 `@strapi/plugin-i18n`（npm 上只有 beta 版会导致安装失败）
3. **所有页面组件都是 `"use client"`**：因为使用了 framer-motion 动画和 useEffect 获取 CMS 数据。SEO metadata 通过 layout.tsx 注入
4. **翻译覆盖度**：✅ 已完成！所有 21 个文件（10 组件 + 11 页面）均已接入 `useTranslations()`，中英文完整翻译
5. **图片资源**：全部使用 Unsplash 占位图，需要替换为会馆真实照片

---

## 2026-03-27 第二阶段更新

### P0: 全站翻译集成

**所有页面和组件已接入 `useTranslations()`**，实现完整中英双语切换。

**更新的组件（10个）：**
- `Hero.tsx` — 轮播图标题/描述/按钮
- `About.tsx` — 简介/统计数字/格言
- `News.tsx` — 分类/标题/阅读全文
- `History.tsx` — 里程碑标题/描述
- `Conference.tsx` — 大会特点/历届信息
- `Activities.tsx` — 活动标题/描述/了解更多
- `Footer.tsx` — 链接/联系信息/版权
- `Announcements.tsx` — 公告内容/标签
- `MobileNav.tsx` — 底部导航标签
- `Navigation.tsx` — Logo/站名/管理员标签

**更新的页面（11个）：**
- `about/page.tsx`, `about/board/page.tsx`, `about/structure/page.tsx`
- `news/page.tsx`, `news/[slug]/page.tsx`
- `activities/page.tsx`, `activities/[slug]/page.tsx`
- `gallery/page.tsx`, `history/page.tsx`, `conference/page.tsx`, `contact/page.tsx`

**翻译文件：** `messages/zh.json`（~300 keys）和 `messages/en.json`

**架构决策：**
- MobileNav 从根 layout 移至 `[locale]/layout.tsx`，避免 admin/login 页面缺少 NextIntlClientProvider 导致的构建错误
- Gallery/News 分类筛选使用 key-based 方式（`categoryKey`），而非直接比对翻译字符串

### P0: Strapi 数据录入

**`apps/cms/src/index.ts` bootstrap 脚本：**
- 首次启动自动创建管理员账户：`admin@towk.sg` / `TowkAdmin2026!`
- 自动填充 site-config（站名/地址/电话/社交链接）
- 自动填充 3 篇新闻文章（春茗晚宴/粤剧演出/青年交流）
- 自动填充 4 项活动（粤剧组/商务交流/青年活动/传统节庆）
- 自动填充 4 个相册
- 所有种子数据仅在对应表为空时执行

### P1: 会员系统（Google OAuth）

**技术栈：** NextAuth.js v4 + JWT session

**新增文件：**
- `lib/auth.ts` — NextAuth 配置（Google + Credentials providers）
- `app/api/auth/[...nextauth]/route.ts` — NextAuth API 路由
- `app/components/AuthProvider.tsx` — SessionProvider 包装组件
- `app/[locale]/member/login/page.tsx` — 会员登录页（Google OAuth + 邮箱登录）
- `app/[locale]/member/page.tsx` — 会员个人中心（头像/信息/状态/活动记录）
- `app/[locale]/member/layout.tsx` — SEO metadata

**集成：**
- Navigation 导航栏新增会员头像/登录入口
- `[locale]/layout.tsx` 包裹 `<AuthProvider>` 提供全局 session
- 环境变量：`NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

### P2: 社交分享 + 站内搜索 + 数据分析

**社交分享 `ShareButtons.tsx`：**
- Facebook / WhatsApp / Telegram 分享按钮
- 复制链接功能
- 已集成到新闻文章详情页底部

**站内搜索 `SearchModal.tsx`：**
- 全局搜索弹窗，点击导航栏搜索图标打开
- 搜索范围：新闻文章 + 活动 + 静态页面
- 即时匹配，最多显示 8 条结果
- ESC 键关闭

**Google Analytics `Analytics.tsx`：**
- 基于 `next/script` 的 gtag.js 集成
- 通过 `NEXT_PUBLIC_GA_ID` 环境变量配置
- 仅在设置了 GA ID 时加载

### 待完成事项

1. **媒体迁移** — 所有图片仍是 Unsplash 占位图，需替换为会馆真实照片
2. **Google OAuth 配置** — 需要在 Google Cloud Console 创建 OAuth 凭据
3. **GA 跟踪 ID** — 需要创建 Google Analytics 4 property
4. **Strapi 启动** — 需要 Docker 运行 PostgreSQL 和 Strapi（`docker-compose up postgres cms`）
5. **会员数据持久化** — 当前使用 JWT session，生产环境需接入数据库存储会员信息

### 开发环境启动

```bash
# 前端
cd apps/web && npm run dev

# Strapi CMS（需要 Docker）
docker-compose up postgres cms

# 全部服务
docker-compose up
```

### 关键端口

| 服务 | 端口 |
|------|------|
| Next.js 前端 | 3000 |
| Strapi CMS 后台 | 1337 |
| PostgreSQL | 5432 |
| Redis | 6379 |
| MinIO 控制台 | 9001 |
