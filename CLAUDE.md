# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TOWK-Modern is a website modernization project for 新加坡东安会馆 (Tung On Wui Kun), a Singapore Chinese community association founded in 1876. It's a bilingual (Chinese/English) Next.js web application with a file-based CMS system.

## Commands

### Development (run from repo root)
```bash
npm install          # Install all workspace dependencies
npm run dev          # Start all apps via Turborepo
npm run build        # Build all apps
npm run lint         # Lint all apps
npm run format       # Run Prettier on all files
```

### Running the web app only
```bash
cd apps/web
npm run dev          # Start Next.js dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Infrastructure (optional, for local dev with database/storage)
```bash
docker-compose up -d   # Start PostgreSQL, Redis, MinIO containers
```

## Architecture

This is a **Turborepo monorepo** with npm workspaces:

```
apps/web/      — Next.js 14 frontend (the only active app currently)
docs/          — Project documentation (Chinese)
wordpress/     — WordPress theme files (legacy/reference only)
```

The `packages/` directory (ui, config, utils) is planned but not yet implemented.

### Frontend (`apps/web/`)

**Next.js 14 App Router** with TypeScript and Tailwind CSS. Key structure:

- `app/page.tsx` — Home page, fetches content from `/api/cms` on client side
- `app/components/` — Page section components: `Navigation`, `Hero`, `About`, `History`, `Conference`, `Activities`, `Footer`
- `app/admin/page.tsx` — Password-protected admin CMS UI
- `app/login/page.tsx` — Login page for admin access
- `app/api/cms/route.ts` — GET/POST API for reading and writing content
- `app/api/auth/route.ts` — POST (login) / DELETE (logout) using httpOnly cookies
- `app/api/auth/check/route.ts` — Auth verification endpoint
- `app/api/upload/` — File upload handling
- `lib/cms.ts` — Server-side file read/write helpers for `data/content.json`
- `data/content.json` — The flat-file content store (all site content)

### Content Management

Content is stored as JSON in `apps/web/data/content.json`. The admin panel at `/admin` allows editing content in the browser. Auth uses a hardcoded cookie (`admin`/`admin123` — development only). The `/api/cms` route reads and writes this file directly via the filesystem.

### Data Flow

```
Browser → /api/cms (GET) → lib/cms.ts → data/content.json
Admin UI → /api/cms (POST) → lib/cms.ts → data/content.json
```

### Planned Stack (not yet implemented)

Per the architecture docs, the intended full stack is:
- **CMS**: Strapi 5 (`apps/cms/`) replacing the file-based CMS
- **Database**: PostgreSQL (via Docker)
- **Cache**: Redis
- **Storage**: MinIO / AWS S3
- **Deploy**: Vercel (frontend) + Railway (backend/DB)

### Key Dependencies

- `next` 14.2.x, `react` 18, `typescript` 5
- `tailwindcss` 3.4, `framer-motion` 12 (animations), `lucide-react` (icons)
- `turbo` 2.x (monorepo build), `prettier` 3.x (formatting)

### Next.js Image Config

Allowed remote image hostnames: `images.unsplash.com`, `cdn.singaporeccc.org.sg`. External images from other domains (e.g., `towk.sg`) are loaded via `<img>` tags, not `next/image`.
