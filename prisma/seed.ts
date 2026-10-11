// prisma/seed.ts — Seed the Supabase database with initial data
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Seed AI Models
  await prisma.aIModel.createMany({
    data: [
      {
        name: "Claude 3.5 Sonnet",
        provider: "Anthropic",
        type: "CLOUD",
        contextWindow: 200000,
        description: "Anthropic's most intelligent model, blending top-tier performance with speed.",
        apiSlug: "claude-3-5-sonnet-20241022",
        tags: ["reasoning", "coding", "vision", "fast"],
      },
      {
        name: "GPT-4o",
        provider: "OpenAI",
        type: "CLOUD",
        contextWindow: 128000,
        description: "OpenAI's flagship multimodal model — fast, smart, and affordable.",
        apiSlug: "gpt-4o",
        tags: ["multimodal", "reasoning", "coding", "fast"],
      },
      {
        name: "Gemini 2.5 Pro",
        provider: "Google",
        type: "CLOUD",
        contextWindow: 1000000,
        description: "Google's most powerful model with a 1M token context window.",
        apiSlug: "gemini-2.5-pro-preview",
        tags: ["long-context", "reasoning", "multimodal"],
      },
      {
        name: "DeepSeek R1",
        provider: "DeepSeek",
        type: "LOCAL",
        contextWindow: 128000,
        description: "Open-source reasoning model rivaling o1, free to run locally.",
        apiSlug: "deepseek-r1",
        tags: ["open-source", "reasoning", "local", "free"],
      },
    ],
    skipDuplicates: true,
  });

  // Seed MCP Servers
  await prisma.mCPServer.createMany({
    data: [
      {
        name: "PostgreSQL MCP",
        repoUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
        installCommand: "npx @modelcontextprotocol/server-postgres",
        description: "Connect your AI to any PostgreSQL database for schema introspection and queries.",
        category: "DATABASE",
        author: "Anthropic",
        stars: 8420,
        npmPackage: "@modelcontextprotocol/server-postgres",
        tags: ["database", "sql", "postgres"],
      },
      {
        name: "Filesystem MCP",
        repoUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem",
        installCommand: "npx @modelcontextprotocol/server-filesystem",
        description: "Give AI direct read/write access to your local or remote file systems.",
        category: "FILESYSTEM",
        author: "Anthropic",
        stars: 11200,
        npmPackage: "@modelcontextprotocol/server-filesystem",
        tags: ["files", "local", "read", "write"],
      },
    ],
    skipDuplicates: true,
  });

  // Seed Skills
  await prisma.skill.createMany({
    data: [
      {
        title: "Senior Full-Stack Developer",
        description: "Elite coding assistant with deep expertise across the full stack.",
        category: "CODING",
        systemPrompt: `You are an elite senior full-stack developer with 15+ years of experience. You write clean, performant, production-ready code with comprehensive error handling. You proactively identify edge cases, suggest optimizations, and follow best practices (SOLID, DRY, KISS).`,
        tags: ["coding", "full-stack", "senior", "best-practices"],
        author: "VibeLaunch",
        useCount: 2840,
      },
      {
        title: "Code Review Expert",
        description: "Deep, constructive code reviews with security and performance analysis.",
        category: "CODING",
        systemPrompt: `You are an expert code reviewer specializing in identifying bugs, security vulnerabilities, performance bottlenecks, and code quality issues.`,
        tags: ["review", "security", "performance", "quality"],
        author: "VibeLaunch",
        useCount: 1920,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
