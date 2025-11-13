import { NextRequest, NextResponse } from "next/server";

// Health route
export async function GET(request: NextRequest) {
  return NextResponse.json({ status: "ok" });
}
