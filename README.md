# TOWK-Modern

> Modern website for **Tung On Wui Kun** (新加坡东安会馆), one of Singapore's oldest Chinese clan associations, founded in 1876.

A bilingual (Chinese/English) web application built with Next.js 14, featuring i18n support, member authentication, and a headless CMS architecture.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + Framer Motion |
| i18n | next-intl (Chinese / English) |
| Auth | NextAuth.js (Google OAuth + Credentials) |
| CMS | Strapi 5 (headless) + file-based fallback |
| Monorepo | Turborepo + npm workspaces |
| Deploy | Vercel (frontend) + Docker (CMS) |

## Project Structure

```
towk-modern/
├── apps/
│   ├── web/           # Next.js frontend
│   │   ├── app/
│   │   │   ├── [locale]/    # i18n routes (zh/en)
│   │   │   ├── components/  # Shared UI components
│   │   │   ├── api/         # API routes (CMS, auth, upload)
│   │   │   └── admin/       # Admin CMS panel
│   │   ├── lib/             # Utilities (auth, CMS, Strapi client)
│   │   ├── messages/        # Translation files (zh.json, en.json)
│   │   └── data/            # Content store (content.json)
│   └── cms/           # Strapi 5 backend
├── docs/              # Project documentation (Chinese)
└── wordpress/         # Legacy WordPress theme (reference)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone
git clone https://github.com/TonyHuang615/towk-modern.git
cd towk-modern

# Install dependencies
npm install

# Start development server
npm run dev
```

The web app runs at `http://localhost:3000`.

### Environment Variables

Copy the example and fill in your values:

```bash
cp apps/web/.env.example apps/web/.env.local
```

See [`apps/web/.env.example`](apps/web/.env.example) for all available variables.

### Running Strapi CMS (optional)

Strapi requires Node.js <= 24. Use Docker for local development:

```bash
cd apps/cms
docker-compose up -d
```

Default admin: `admin@towk.sg` / `TowkAdmin2026!`

## Features

- **Bilingual**: Full Chinese/English support with `next-intl`, locale-aware routing
- **Modern UI**: Responsive design with Framer Motion animations, mobile-first
- **Member System**: Google OAuth + email login via NextAuth.js
- **Content Management**: Admin panel with file-based CMS, Strapi 5 integration ready
- **Search**: Global search across pages, news, and activities
- **Social Sharing**: Facebook, WhatsApp, Telegram share buttons
- **Analytics**: Google Analytics integration

## Pages

| Route | Description |
|-------|------------|
| `/` | Home (hero, about, news, history, conference, activities) |
| `/about` | About the association + sub-pages (board, structure) |
| `/news` | News & announcements with detail pages |
| `/activities` | Events & activities with detail pages |
| `/gallery` | Photo albums by category |
| `/conference` | World Tung On Convention history |
| `/history` | Timeline of milestones since 1876 |
| `/contact` | Contact information & map |
| `/member` | Member login & profile |

## Scripts

```bash
npm run dev       # Start dev server (Turborepo)
npm run build     # Production build
npm run lint      # ESLint
npm run format    # Prettier
```

## Documentation

Detailed project documentation (in Chinese) is available in the [`docs/`](docs/) directory.

## License

MIT

---

*Copyright 2026 Tung On Wui Kun (新加坡东安会馆)*
