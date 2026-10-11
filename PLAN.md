# PLAN.md: AI Developer & Vibe Coder Hub

## 1. PRD (Product Requirements Document)
**Project Name:** AI Dev Hub (Code name: VibeLaunch)
**Objective:** Build a public, centralized web application that automatically aggregates and stores the latest updates for LLM models, MCP (Model Context Protocol) servers, and AI skills.
**Target Audience:** Software Engineers and Vibe Coders using AI IDEs who need rapid, friction-free environment setups.
**Key Features:**
*   **Public Access (No Login):** The platform is entirely open. Developers can generate and download configurations without authentication or user accounts.
*   **Best-in-Class UI/UX:** Focused on a hyper-smooth, modern experience with fluid animations and clear visual hierarchy.
*   **GitHub Integration:** Codebase architecture is structured for seamless version control (repository link to be attached later).
*   **Vercel Deployment:** Optimized for fast, serverless deployment via Vercel Edge functions.

## 2. TDD (Technical Design Document)
**Tech Stack:**
*   **Frontend & API:** Next.js (App Router), React, Tailwind CSS, TypeScript, Framer Motion (for smooth UI transitions).
*   **Database:** Supabase (Serverless PostgreSQL) to pair perfectly with Vercel's serverless architecture, eliminating the need for always-on containers.
*   **Deployment:** Vercel (hosting both the frontend and serverless API routes).

**System Architecture & Agent Patterns:**
The backend logic for aggregating and organizing data is based on these core agent architectures[cite: 1]:
*   **Orchestrator Pattern:** The primary API controller that schedules background data ingestion tasks[cite: 1].
*   **DeepSearch (Tool & Skills Pattern):** Utilizes the GitHub REST API to automatically crawl and index `mcp-server` and `ai-agent` repositories[cite: 1].
*   **Router Pattern:** Categorizes incoming data as a Tool, Skill, or MCP before storing it in the database[cite: 1].

## 3. App Flow
1.  **Ingestion:** Vercel Cron Jobs run in the background to fetch new MCP and Skills data from GitHub/NPM and sync it to Supabase.
2.  **Discovery (Public UI):** A user lands on the Vercel-hosted URL and immediately sees the "Dashboard Catalog."
3.  **Selection & Feedback:** The user clicks on modern, interactive cards to add tools to their "Workspace Cart." Each interaction features snappy, haptic-style visual feedback.
4.  **Configuration (Launchpad):** The user navigates to the Launchpad panel and selects their target platform (Antigravity, Cursor, or Claude).
5.  **Instant Export:** The user clicks "Generate" and instantly downloads their `.cursorrules` or configuration file without encountering any login walls.

## 4. Design Brief
**Visual Identity:** Premium, developer-focused, and frictionless.
*   **Theme:** Deep Dark Mode (true black and deep slate grays) accented with neon highlights (Electric Blue, Emerald Green).
*   **Aesthetics (Premium Glassmorphism):** macOS-inspired "Liquid Glass" effects (`backdrop-blur-2xl`, ultra-thin semi-transparent borders) to give the web app a native desktop feel.
*   **Typography:** Monospaced fonts for code snippets and commands (e.g., JetBrains Mono) paired with clean sans-serif fonts (e.g., Inter or Geist) for headings.
*   **Layout:** Elastic, responsive grid layout utilizing Notion-style blocks. Zero cluttered traditional tables; everything operates as an interactive card.

## 5. Backend Schema (Prisma/Supabase)
Core tables managed via Prisma ORM on Supabase:
*   **`AIModel`:** ID, Name (e.g., Claude 3.5), Type (Cloud/Local), and Context Window limitations.
*   **`MCPServer`:** ID, Repository URL, Install Commands (e.g., `npx @modelcontextprotocol/server-postgres`), Category, and Last Synced Date.
*   **`Skill`:** ID, Title, System Prompt Templates, and Category.

## 6. Engineering Plan
*   **Phase 1: Repository & Vercel Initialization**
    *   Set up the Next.js App Router with TypeScript and Tailwind CSS.
    *   Link the repository to Vercel for automated CI/CD pipeline deployments.
*   **Phase 2: Serverless Database (Supabase)**
    *   Deploy the PostgreSQL database on Supabase and configure the Prisma ORM schema.
*   **Phase 3: Premium UI/UX Implementation**
    *   Build reusable frontend components (Glassmorphism Cards, Search Bar, Command Palette) incorporating Framer Motion for premium transitions.
*   **Phase 4: Public Catalog & Launchpad**
    *   Develop the core views where developers can freely browse, select, and download their configuration setups.
*   **Phase 5: Background Ingestion Setup**
    *   Configure Vercel Cron Jobs to handle daily automated database updates from external APIs (GitHub, NPM).