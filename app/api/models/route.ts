import { NextResponse } from "next/server";
import { MOCK_MODELS } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const search = searchParams.get("q")?.toLowerCase();

  let models = MOCK_MODELS;

  if (type) {
    models = models.filter((m) => m.type === type.toUpperCase());
  }

  if (search) {
    models = models.filter(
      (m) =>
        m.name.toLowerCase().includes(search) ||
        m.provider.toLowerCase().includes(search) ||
        m.tags.some((t) => t.toLowerCase().includes(search)) ||
        m.description?.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ data: models, total: models.length });
}
