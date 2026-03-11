# TOWK-Modern

> 新加坡东安会馆网站现代化改造项目

现代化、功能完善的数字化平台，为百年会馆打造全新网络形象。

## 🎯 项目目标

- 🎨 **视觉升级** — 现代化设计，提升品牌形象
- 📱 **移动优先** — 完美适配手机、平板、桌面
- 🔐 **会员系统** — 在线注册、活动报名
- 📝 **CMS后台** — 可视化内容管理
- 🌐 **多语言** — 中文、英文双语支持

## 🏗️ 技术栈

| 层级 | 技术 |
|-----|------|
| 前端 | Next.js 14 + React 18 + Tailwind CSS |
| 后端 | Strapi 5 (Headless CMS) |
| 数据库 | PostgreSQL |
| 部署 | Vercel + Railway |

## 📁 项目结构

```
towk-modern/
├── apps/
│   ├── web/              # Next.js 前端
│   └── cms/              # Strapi 后端
├── packages/
│   ├── ui/               # 共享UI组件
│   ├── config/           # 共享配置
│   └── utils/            # 共享工具
├── docs/                 # 项目文档
└── infra/                # 基础设施配置
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- PostgreSQL 15+

### 安装

```bash
# 克隆项目
git clone https://github.com/TonyHuang615/towk-modern.git
cd towk-modern

# 安装依赖
npm install

# 启动开发环境
docker-compose up -d
npm run dev
```

## 📚 项目文档

- [项目概述](./docs/01-overview.md)
- [现状分析](./docs/02-analysis.md)
- [设计方案](./docs/03-design.md)
- [技术架构](./docs/04-architecture.md)
- [功能规划](./docs/05-features.md)
- [实施计划](./docs/06-roadmap.md)

## 📄 License

MIT License

---

*Copyright © 2026 新加坡东安会馆*
