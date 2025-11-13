import { NextRequest, NextResponse } from "next/server";
import {
  getPetById,
  createPet,
  addRecord,
  addAppointment,
  addVaccination,
  deleteRecord,
  deleteAppointment,
  deleteVaccination,
  updateVital,
  HTTPError,
} from "../../../../services/healthService";
import Pet from "../../../../models/Pet";
import connectDB from "@/lib/db";
// Fonction pour créer une entrée Health à partir des données MongoDB
async function createHealthEntryFromMongo(petId: string) {
  try {
    await connectDB();
    const mongoPet = await Pet.findById(petId);
    if (!mongoPet) {
      throw new HTTPError("Pet not found in MongoDB", 404);
    }
    // Créer l'entrée Health avec les vraies informations de l'animal
    const healthPet = await createPet(
      mongoPet.name || `Animal-${petId.slice(0, 8)}`,
      mongoPet.type || mongoPet.breed || "Unknown",
      petId // Utiliser l'ID MongoDB comme petId
    );
    return healthPet;
  } catch (error: any) {
    console.error("Error creating health entry from MongoDB:", error);
    throw new HTTPError("Failed to create health entry", 500);
  }
}

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    // `params` may be a promise in Next.js route handlers; await it before accessing properties
    const petId = (await params)?.petId;
    if (!petId)
      return NextResponse.json({ error: "Missing petId" }, { status: 400 });

    try {
      const pet = await getPetById(petId);
      return NextResponse.json(pet);
    } catch (err: any) {
      // Si l'animal n'existe pas dans la base Health, le créer automatiquement depuis MongoDB
      if (err.message === "Pet not found") {
        console.log(`Creating health entry for pet: ${petId}`);
        const newPet = await createHealthEntryFromMongo(petId);
        return NextResponse.json(newPet);
      }
      throw err;
    }
  } catch (err: any) {
    console.error("GET /api/health/[petId] error", err);
    if (err instanceof HTTPError)
      return NextResponse.json({ error: err.message }, { status: err.status });
    return NextResponse.json({ error: "Failed to fetch pet" }, { status: 500 });
  }
}

// Fonction helper pour s'assurer que l'animal existe dans la base Health
async function ensurePetExists(petId: string) {
  try {
    return await getPetById(petId);
  } catch (err: any) {
    if (err.message === "Pet not found") {
      console.log(`Auto-creating health entry for pet: ${petId}`);
      return await createHealthEntryFromMongo(petId);
    }
    throw err;
  }
}
export async function POST(request: NextRequest, { params }: { params: any }) {
  try {
    const petId = (await params)?.petId;
    if (!petId)
      return NextResponse.json({ error: "Missing petId" }, { status: 400 });
    // S'assurer que l'animal existe dans la base Health avant toute opération
    await ensurePetExists(petId);
    const body = await request.json();
    const { action, payload } = body || {};
    if (!action || payload === undefined)
      return NextResponse.json(
        { error: "Missing action or payload" },
        { status: 400 }
      );

    if (action === "addRecord") {
      const rec = await addRecord(petId, payload);
      return NextResponse.json(rec, { status: 201 });
    }

    if (action === "addAppointment") {
      const appt = await addAppointment(petId, payload);
      return NextResponse.json(appt, { status: 201 });
    }

    if (action === "addVaccination") {
      const vac = await addVaccination(petId, payload);
      return NextResponse.json(vac, { status: 201 });
    }

    if (action === "deleteRecord") {
      const deleted = await deleteRecord(
        petId,
        payload?.id || payload?.recordId
      );
      return NextResponse.json(deleted, { status: 200 });
    }

    if (action === "deleteAppointment") {
      const deleted = await deleteAppointment(
        petId,
        payload?.id || payload?.appointmentId
      );
      return NextResponse.json(deleted, { status: 200 });
    }

    if (action === "deleteVaccination") {
      const deleted = await deleteVaccination(
        petId,
        payload?.id || payload?.vaccinationId
      );
      return NextResponse.json(deleted, { status: 200 });
    }

    if (action === "updateVital") {
      const vit = await updateVital(petId, payload);
      return NextResponse.json(vit, { status: 200 });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: any) {
    console.error("POST /api/health/[petId] error", err);
    if (err instanceof HTTPError)
      return NextResponse.json({ error: err.message }, { status: err.status });
    return NextResponse.json(
      { error: "Failed to update pet" },
      { status: 500 }
    );
  }
}
