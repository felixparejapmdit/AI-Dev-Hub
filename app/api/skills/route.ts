import { NextResponse } from "next/server";
import { MOCK_SKILLS } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("q")?.toLowerCase();

  let skills = MOCK_SKILLS;

  if (category) {
    skills = skills.filter((s) => s.category === category.toUpperCase());
  }

  if (search) {
    skills = skills.filter(
      (s) =>
        s.title.toLowerCase().includes(search) ||
        s.description?.toLowerCase().includes(search) ||
        s.tags.some((t) => t.toLowerCase().includes(search)) ||
        s.category.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ data: skills, total: skills.length });
}
