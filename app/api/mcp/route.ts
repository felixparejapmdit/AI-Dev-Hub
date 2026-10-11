import { NextResponse } from "next/server";
import { MOCK_MCP_SERVERS } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("q")?.toLowerCase();

  let servers = MOCK_MCP_SERVERS;

  if (category) {
    servers = servers.filter((s) => s.category === category.toUpperCase());
  }

  if (search) {
    servers = servers.filter(
      (s) =>
        s.name.toLowerCase().includes(search) ||
        s.description?.toLowerCase().includes(search) ||
        s.tags.some((t) => t.toLowerCase().includes(search)) ||
        s.category.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ data: servers, total: servers.length });
}
