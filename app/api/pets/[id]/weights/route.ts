import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import jwt from "jsonwebtoken";
import WeightLog from "@/models/WeightLog";

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const decoded: any = verifyToken(request);
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params; // ✅ await params

  try {
    const weights = await WeightLog.find({ petId: id }).sort({ date: 1 });
    return NextResponse.json({ weights });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const decoded: any = verifyToken(request);
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const { weight } = await request.json();
    if (!weight)
      return NextResponse.json({ error: "Weight required" }, { status: 400 });

    const newLog = new WeightLog({ petId: id, weight, date: new Date() });
    await newLog.save();

    return NextResponse.json({ weightLog: newLog }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const decoded: any = verifyToken(request);
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { weightId } = await request.json();
    if (!weightId)
      return NextResponse.json(
        { error: "Weight ID required" },
        { status: 400 }
      );

    const deleted = await WeightLog.findByIdAndDelete(weightId);
    if (!deleted)
      return NextResponse.json({ error: "Weight not found" }, { status: 404 });

    return NextResponse.json({
      message: "Weight deleted successfully",
      weight: deleted,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
