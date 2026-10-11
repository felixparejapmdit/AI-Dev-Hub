import { NextResponse } from "next/server";

// Vercel Cron Job: runs daily to sync data from GitHub/NPM
// Configure in vercel.json:
// { "crons": [{ "path": "/api/cron/sync", "schedule": "0 6 * * *" }] }

export async function GET(request: Request) {
  // Validate Vercel Cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = {
    models: { synced: 0, errors: 0 },
    mcp: { synced: 0, errors: 0 },
    skills: { synced: 0, errors: 0 },
    timestamp: new Date().toISOString(),
  };

  try {
    // Phase 1: Sync MCP servers from GitHub
    const mcpResponse = await fetch(
      "https://api.github.com/search/repositories?q=topic:mcp-server&sort=stars&order=desc&per_page=50",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (mcpResponse.ok) {
      const mcpData = await mcpResponse.json();
      results.mcp.synced = mcpData.items?.length ?? 0;
      // In production: upsert each repo into DB via Prisma
    }
  } catch {
    results.mcp.errors++;
  }

  try {
    // Phase 2: Sync AI models from public sources
    // In production: fetch from Hugging Face, OpenAI, Anthropic model lists
    results.models.synced = 6; // placeholder
  } catch {
    results.models.errors++;
  }

  return NextResponse.json({
    success: true,
    message: "Sync completed",
    results,
  });
}
