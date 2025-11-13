import { NextRequest, NextResponse } from "next/server";
import {
  listPets,
  createPet,
  HTTPError,
} from "../../../../services/healthService";

export async function GET() {
  try {
    const list = await listPets();
    return NextResponse.json(list);
  } catch (err: any) {
    console.error("GET /api/health/pets error", err);
    if (err instanceof HTTPError)
      return NextResponse.json({ error: err.message }, { status: err.status });
    return NextResponse.json({ error: "Failed to read pets" }, { status: 500 });
  }
}
// Pet creation should be handled by the main pets module (/api/pets).
// Disable creation here to avoid duplicated responsibilities.
export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      error: "Pet creation is handled by /api/pets. This endpoint is disabled.",
    },
    { status: 405 }
  );
}
