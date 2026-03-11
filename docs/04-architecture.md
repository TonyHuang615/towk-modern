# 技术架构

## 整体架构

```
Frontend (Next.js)  ←→  API  ←→  CMS (Strapi)  ←→  Database (PostgreSQL)
```

## 技术栈

| 层级 | 技术 |
|-----|------|
| 前端 | Next.js 14 + React 18 + TypeScript |
| 样式 | Tailwind CSS + shadcn/ui |
| 动画 | Framer Motion |
| 状态 | Zustand |
| 后端 | Strapi 5 |
| 数据库 | PostgreSQL |
| 缓存 | Redis |
| 存储 | MinIO / AWS S3 |

## 项目结构

```
towk-modern/
├── apps/
│   ├── web/           # Next.js frontend
│   └── cms/           # Strapi backend
├── packages/
│   ├── ui/            # Shared UI components
│   ├── config/        # Shared config
│   └── utils/         # Shared utilities
└── docs/              # Documentation
```

## 部署方案

- **前端**: Vercel
- **后端**: Railway
- **数据库**: Railway PostgreSQL
- **CDN**: Cloudflare
