// /app/api/pets/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Pet from "@/models/Pet";
import jwt from "jsonwebtoken";

// Middleware to verify token
async function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch {
    return null;
  }
}


export async function GET(request: NextRequest) {
  await connectDB();
  const decoded: any = await verifyToken(request); // verify the user
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Fetch only pets belonging to this user
    const pets = await Pet.find({ owner: decoded.userId });
    return NextResponse.json({ pets });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  await connectDB();
  const decoded: any = await verifyToken(request);
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    console.log("Decoded user:", decoded);
    console.log("Received body:", body);

    const newPet = new Pet({ ...body, owner: decoded.userId }); // ✅ fix here
    await newPet.save();
    return NextResponse.json({ pet: newPet }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/pets error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



export async function PATCH(request: NextRequest) {
  await connectDB();
  const decoded: any = await verifyToken(request);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const updates = await request.json();
    const id = updates.id;
    if (!id) return NextResponse.json({ error: "Pet ID missing" }, { status: 400 });
    delete updates.id;

    const pet = await Pet.findById(id);
    if (!pet) return NextResponse.json({ error: "Pet not found" }, { status: 404 });

    if (pet.owner.toString() !== decoded.userId)
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });

    Object.assign(pet, updates);
    await pet.save();

    return NextResponse.json({ pet });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  await connectDB();
  const decoded: any = await verifyToken(request);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Pet ID missing" }, { status: 400 });

    const pet = await Pet.findById(id);
    if (!pet) return NextResponse.json({ error: "Pet not found" }, { status: 404 });

    if (pet.owner.toString() !== decoded.userId)
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });

    await pet.deleteOne();
    return NextResponse.json({ message: "Pet deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

