# VibeLaunch — AI Dev Hub

> **The premier public catalog for AI developers.** Discover LLM models, MCP servers, and AI skills. Build your perfect dev stack and export a config file in seconds — no login, no friction.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?logo=supabase)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

---

## ✨ Features

- **🔍 Catalog Dashboard** — Browse AI models, MCP servers, and skills with search & filters
- **🛒 Workspace Cart** — Click cards to build your personalized AI dev environment
- **🚀 Launchpad** — Select Antigravity, Cursor, or Claude and generate a config instantly
- **⬇️ Instant Export** — Download `.cursorrules`, `antigravity.config.yaml`, or `claude_config.md`
- **🔓 No Login Required** — Completely public, zero authentication
- **🌙 Dark Glassmorphism UI** — macOS-inspired liquid glass design with neon accents
- **🔄 Cron Sync** — Daily background jobs to ingest latest repos from GitHub/NPM

---

## 🗂️ Project Structure

```
vibelaunch/
├── app/
│   ├── api/
│   │   ├── models/route.ts      # AI Models API
│   │   ├── mcp/route.ts         # MCP Servers API
│   │   ├── skills/route.ts      # Skills API
│   │   ├── generate/route.ts    # Config generation API
│   │   └── cron/sync/route.ts   # Vercel Cron Job
│   ├── globals.css              # Design system & tokens
│   ├── layout.tsx               # Root layout + SEO
│   └── page.tsx                 # Main catalog page
├── components/
│   ├── Navbar.tsx               # Sticky glassmorphism navbar
│   ├── Hero.tsx                 # Landing hero section
│   ├── ModelCard.tsx            # AI model card component
│   ├── MCPCard.tsx              # MCP server card component
│   ├── SkillCard.tsx            # Skill card component
│   ├── LaunchpadPanel.tsx       # Workspace + config generation panel
│   └── SearchBar.tsx            # Reusable search input
├── lib/
│   ├── mock-data.ts             # Development/demo data
│   ├── config-generator.ts      # Multi-platform config generator
│   ├── prisma.ts                # Prisma singleton
│   └── supabase.ts              # Supabase client
├── prisma/
│   └── schema.prisma            # Database schema (AIModel, MCPServer, Skill)
├── types/
│   └── index.ts                 # TypeScript types
├── vercel.json                  # Vercel + Cron config
└── .env.example                 # Environment variables template
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Fill in your Supabase and GitHub credentials
```

### 3. Set up the database
```bash
npm run db:push      # Push schema to Supabase
npm run db:generate  # Generate Prisma client
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🗄️ Database Schema

| Table | Fields |
|-------|--------|
| `ai_models` | id, name, provider, type (CLOUD/LOCAL/HYBRID), contextWindow, tags |
| `mcp_servers` | id, name, repoUrl, installCommand, category, stars, npmPackage, tags |
| `skills` | id, title, category, systemPrompt, tags, useCount |

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy — Vercel automatically handles the Cron Job from `vercel.json`

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 App Router, React 19, TypeScript |
| Styling | Tailwind CSS v4, Glassmorphism design |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma |
| Deployment | Vercel (Edge Functions + Cron) |
| Fonts | Inter + JetBrains Mono (Google Fonts) |

---

## 📋 Roadmap

- [ ] Connect live Supabase database
- [ ] GitHub ingestion cron job (live repo crawling)
- [ ] NPM package discovery
- [ ] User-submitted MCP servers & skills
- [ ] Ratings and community reviews
- [ ] Framer Motion page transitions
- [ ] AI-powered search and recommendations

---

*Built with ❤️ for the vibe coding community.*
