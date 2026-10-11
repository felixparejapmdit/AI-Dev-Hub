import { NextResponse } from "next/server";
import { generateConfig } from "@/lib/config-generator";
import { WorkspaceCartItem, TargetPlatform } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, platform }: { items: WorkspaceCartItem[]; platform: TargetPlatform } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: "items must be an array" }, { status: 400 });
    }

    if (!platform || !["antigravity", "cursor", "claude"].includes(platform)) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }

    const config = generateConfig(items, platform);
    return NextResponse.json(config);
  } catch {
    return NextResponse.json({ error: "Failed to generate config" }, { status: 500 });
  }
}
