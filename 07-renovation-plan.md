# TOWK-Modern 网站改造计划

> 文档版本：v1.1
> 创建日期：2026-03-25
> 更新日期：2026-03-26
> 状态：📋 规划确定

---

## 一、改造背景与目标

### 现状痛点（基于 towk.sg 现网分析）

| 维度 | 问题描述 |
|------|----------|
| 内容停更 | 最后更新停留于 2019 年，近 6 年活动记录空白 |
| 无会员系统 | 入会、活动报名仍依赖纸质表格，无线上闭环 |
| CMS 门槛高 | WordPress 后台使非技术人员望而却步，是停更根因 |
| 图片外链 | 部分图片托管于第三方域名（vivian.diyfi.xyz），存在失效风险 |
| SEO 混乱 | 页面 `<title>` 显示的是文章标题而非会馆名称 |
| 移动端差 | 三级深度导航菜单，无响应式优化 |
| 无社交整合 | 缺少 Facebook、微信等社交媒体入口 |
| 双语缺失 | 英文内容严重不足，无法服务国际访客 |

### 改造目标

1. **视觉现代化** — 重塑品牌形象，符合百年老馆的历史底蕴与当代审美
2. **内容持续化** — 通过低门槛 CMS，让非技术人员能独立维护内容
3. **功能数字化** — 会员注册、活动报名、公告推送全部线上化
4. **多语言支持** — 中英双语，面向本地华人社区与国际访客
5. **移动优先** — 完美适配手机、平板、桌面三端

---

## 二、技术架构选型

### 整体架构图

```
用户浏览器
    │
    ▼
Vercel CDN（全球边缘节点）
    │
    ▼
Next.js 15 前端（App Router + RSC）
    │        │
    │        └──► Cloudflare Images（图片 CDN）
    │
    ▼ REST API / GraphQL
Strapi 5 CMS（Headless）
    │
    ├──► PostgreSQL 数据库（Railway）
    ├──► Redis 缓存（Railway）
    └──► MinIO / Cloudflare R2（媒体存储）
```

### 技术栈明细

| 层级 | 技术选型 | 版本 | 选型理由 |
|------|----------|------|----------|
| 前端框架 | Next.js | 15 (App Router) | RSC、ISR、Edge Runtime，SEO 友好 |
| UI 框架 | React | 19 | 并发模式、Server Actions |
| 语言 | TypeScript | 5.x | 类型安全，降低维护成本 |
| 样式 | Tailwind CSS | 4.x | 原子化 CSS，快速迭代 |
| 组件库 | shadcn/ui | latest | 无依赖侵入，高度可定制 |
| 动画 | Framer Motion | 11.x | 流畅页面过渡与微交互 |
| 状态管理 | Zustand | 5.x | 轻量，适合中小型应用 |
| 表单 | React Hook Form + Zod | latest | 性能优秀，验证声明式 |
| 国际化 | next-intl | 3.x | App Router 原生集成 |
| CMS 后台 | Strapi | 5.x | 开源 Headless CMS，权限分级 |
| 数据库 | PostgreSQL | 16 | 稳定，Strapi 首选 |
| 缓存 | Redis | 7.x | API 响应缓存，会话管理 |
| 媒体存储 | Cloudflare R2 | — | 免出流量费，全球 CDN |
| 前端部署 | Vercel | — | Next.js 原生平台，零配置 |
| 后端部署 | Railway | — | 简单托管，支持 PostgreSQL |
| CDN | Cloudflare | — | 全球加速 + DDoS 防护 |
| 包管理 | pnpm | 9.x | Monorepo 友好，速度快 |
| 构建工具 | Turborepo | 2.x | Monorepo 增量构建 |

### Monorepo 项目结构

```
towk-modern/
├── apps/
│   ├── web/                    # Next.js 15 前端
│   │   ├── app/
│   │   │   ├── [locale]/       # 多语言路由（zh/en）
│   │   │   │   ├── page.tsx    # 首页
│   │   │   │   ├── about/      # 关于会馆
│   │   │   │   ├── news/       # 新闻资讯
│   │   │   │   ├── events/     # 活动中心
│   │   │   │   ├── gallery/    # 影相库
│   │   │   │   ├── members/    # 会员中心
│   │   │   │   └── contact/    # 联络我们
│   │   │   └── api/            # API Routes
│   │   ├── components/
│   │   ├── lib/
│   │   └── messages/           # i18n 翻译文件（zh.json / en.json）
│   └── cms/                    # Strapi 5 后台
│       ├── src/
│       │   ├── api/            # Content Types
│       │   ├── extensions/
│       │   └── plugins/
│       └── config/
├── packages/
│   ├── ui/                     # 共享 UI 组件
│   ├── config/                 # 共享配置（ESLint、TypeScript、Tailwind）
│   └── utils/                  # 共享工具函数
├── docs/                       # 项目文档
├── infra/                      # 基础设施（Docker、CI/CD）
│   └── docker-compose.yml
├── turbo.json
└── package.json
```

---

## 三、内容架构规划

### 页面地图

```
首页（/）
├── 关于会馆
│   ├── 会馆简介（/about）
│   ├── 组织架构（/about/structure）
│   ├── 历届董事会（/about/board）
│   └── 会馆历史时间轴（/about/history）
├── 新闻资讯（/news）
│   ├── 新闻列表
│   └── 新闻详情
├── 活动中心（/events）
│   ├── 活动列表
│   ├── 活动详情 + 在线报名
│   └── 历届恳亲大会（/events/dawc）
├── 会馆活动
│   ├── 粤剧组（/activities/cantonese-opera）
│   ├── 商务交流（/activities/business）
│   ├── 青年活动（/activities/youth）
│   └── 其他活动（/activities/others）
├── 影相库（/gallery）
├── 会员中心（/members）
│   ├── 登录（/members/login）
│   ├── 注册（/members/register）
│   └── 个人中心（/members/profile）
└── 联络我们（/contact）
```

### CMS Content Types（Strapi）

| Content Type | 字段说明 |
|---|---|
| Article（文章） | 标题、内容、封面图、标签、发布日期、中英双语 |
| Event（活动） | 名称、描述、日期、地点、封面图（仅展示，不含报名） |
| Member（会员） | 姓名、联系方式、入会日期、会员等级、头像 |
| BoardMember（董事） | 姓名、职衔、届别、照片 |
| Gallery（相册） | 标题、活动分类、图片集、日期 |
| Page（静态页面） | 标题、内容块、SEO 信息 |

---

## 四、功能模块规划

### P0 — 核心功能（第一阶段必须交付）

- [x] 首页设计与实现（Hero、最新动态、活动预告、关于我们简介）
- [x] 关于会馆页面（简介、历史时间轴、组织架构、历届董事会）
- [x] 新闻/活动列表与详情页
- [x] 影相库（瀑布流相册 + 灯箱预览）
- [x] 联络我们（Google Maps 嵌入 + 联系表单）
- [ ] Strapi CMS 搭建（文章、活动、相册管理）
- [ ] 中英双语切换
- [x] 响应式布局（移动端优先）
- [x] SEO 基础配置（meta、sitemap、robots.txt）
- [ ] 媒体迁移（将现有图片迁移至 Cloudflare R2）

### P1 — 重要功能（第二阶段）

- [ ] 会员注册与登录系统（邮箱 + 密码）
- [ ] 个人中心（资料查看与修改）
- [ ] 会员审核流程（后台人工审核）
- [x] 历届董事会展示页
- [x] 世界东安恳亲大会专题页

> **已移除**：活动在线报名与管理（需求取消）

### P2 — 增强功能（第三阶段）

- [ ] 微信/社交媒体分享集成
- [ ] 活动日历视图
- [ ] 全站搜索
- [ ] 历史内容归档（补录 2019-2025 年活动）
- [ ] Analytics 数据追踪（Umami 或 Plausible，隐私友好）

---

## 五、设计规范

### 品牌色系

```
主色（传统红）: #C0392B  — 呼应华人文化与会馆历史
辅色（金色）:   #D4A017  — 体现尊贵与百年底蕴
中性深色:       #1A1A2E  — 文字主色
中性浅色:       #F8F6F0  — 米白背景，传统纸张质感
强调色:         #2C5F8A  — 链接、按钮次要色
```

### 设计原则

1. **传统与现代并重** — 使用传统纹样作为装饰元素，搭配现代排版与留白
2. **内容优先** — 大量文字内容优先，排版清晰可读
3. **渐进增强** — 核心内容无 JavaScript 可访问，动画为锦上添花
4. **无障碍设计** — 符合 WCAG 2.1 AA 标准，颜色对比度达标

### 字体方案

```
中文标题：思源宋体（Noto Serif SC）— 传统感
中文正文：思源黑体（Noto Sans SC）— 可读性
英文标题：Playfair Display — 优雅感
英文正文：Inter — 现代清晰
```

---

## 六、实施路线图

### 阶段一：基础建设（第 1-4 周）

| 周次 | 任务 |
|------|------|
| Week 1 | 搭建 Monorepo 脚手架、配置开发环境、Docker Compose |
| Week 2 | Strapi CMS 初始化、Content Type 定义、管理员账号 |
| Week 3 | Next.js 项目初始化、路由设计、i18n 配置、全局样式 |
| Week 4 | 共享组件库（Header、Footer、Button、Card 等）|

### 阶段二：核心页面开发（第 5-8 周）

| 周次 | 任务 |
|------|------|
| Week 5 | 首页开发（Hero 区块、动态内容、活动预告） |
| Week 6 | 关于会馆、历史时间轴、董事会页面 |
| Week 7 | 新闻列表/详情、影相库（含图片迁移） |
| Week 8 | 活动列表/详情、联络页面、SEO 配置 |

### 阶段三：会员系统（第 9-11 周）

| 周次 | 任务 |
|------|------|
| Week 9 | 会员注册/登录流程、JWT 认证、Strapi Users 配置 |
| Week 10 | 个人中心（资料修改）、会员审核后台流程 |
| Week 11 | 权限测试、会员系统端到端验收 |

### 阶段四：优化与上线（第 12-14 周）

| 周次 | 任务 |
|------|------|
| Week 12 | 性能优化（LCP、CLS、FID）、图片懒加载、代码分割 |
| Week 13 | 测试（功能测试、跨浏览器、移动端）、内容录入 |
| Week 14 | 正式上线、DNS 切换、旧站数据迁移、监控配置 |

---

## 七、部署架构

### 环境划分

| 环境 | 前端 | 后端 | 数据库 | 用途 |
|------|------|------|--------|------|
| Development | localhost:3000 | localhost:1337 | Docker PostgreSQL | 本地开发 |
| Staging | preview.vercel.app | Railway staging | Railway PostgreSQL | 测试验收 |
| Production | towk.sg | Railway prod | Railway PostgreSQL | 正式上线 |

### CI/CD 流程

```
git push → GitHub Actions
    │
    ├── Lint + TypeScript 检查
    ├── 单元测试
    │
    ├── main 分支 → 自动部署 Production
    └── PR 分支   → 自动部署 Preview（Vercel）
```

### 性能目标

| 指标 | 目标值 |
|------|--------|
| LCP（最大内容绘制） | < 2.5s |
| CLS（累积布局偏移） | < 0.1 |
| FID/INP（交互延迟） | < 200ms |
| Lighthouse 评分 | Performance > 90 |
| Lighthouse 评分 | Accessibility > 95 |

---

## 八、风险与应对

| 风险 | 概率 | 影响 | 应对措施 |
|------|------|------|----------|
| 现有会员数据迁移困难 | 中 | 高 | 提前与会馆沟通获取会员名单，设计导入脚本 |
| 非技术人员 CMS 培训周期长 | 中 | 中 | 录制操作教程视频，设计简化后台视图 |
| 旧图片链接失效 | 高 | 中 | 尽早抓取现有图片存档，迁移至 R2 |
| 双语内容翻译工作量大 | 高 | 低 | P0 阶段中文优先，英文内容逐步补充 |
| Railway 服务不稳定 | 低 | 高 | 配置健康检查 + 告警，准备迁移至 Render 预案 |

---

## 九、相关文档

- [01-overview.md](./01-overview.md) — 项目概述
- [02-analysis.md](./02-analysis.md) — 现状分析
- [03-design.md](./03-design.md) — 设计方案
- [04-architecture.md](./04-architecture.md) — 技术架构
- [05-features.md](./05-features.md) — 功能规划
- [06-roadmap.md](./06-roadmap.md) — 实施计划

---

*Copyright © 2026 新加坡东安会馆 · TOWK-Modern Project*
