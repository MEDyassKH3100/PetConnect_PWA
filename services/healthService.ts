import { promises as fs } from "fs";
import path from "path";
import type {
  PetHealth,
  HealthRecord,
  MedicalAppointment,
  Vaccination,
  VitalStats,
} from "../types/health";

const DB_PATH = path.join(process.cwd(), "data", "health.json");

class HTTPError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
    this.name = "HTTPError";
  }
}

async function ensureDB() {
  try {
    await fs.access(DB_PATH);
  } catch (e) {
    const init = { pets: [] };
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(init, null, 2), "utf8");
  }
}

async function readDB(): Promise<{ pets: PetHealth[] }> {
  await ensureDB();
  const raw = await fs.readFile(DB_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw);
    parsed.pets = parsed.pets || [];
    return parsed;
  } catch (e) {
    // If DB is corrupted, reinitialize
    const init = { pets: [] };
    await writeDB(init);
    return init;
  }
}

async function writeDB(db: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

function makeId() {
  return (global as any).crypto?.randomUUID?.() ?? Date.now().toString();
}

function requirePetId(petId?: string) {
  if (!petId) throw new HTTPError("Missing petId", 400);
}

function sanitizeString(input?: any) {
  if (input === undefined || input === null) return "";
  return String(input).trim();
}

export async function listPets(): Promise<
  Array<{ petId: string; name?: string; species?: string }>
> {
  const db = await readDB();
  return (db.pets || []).map((p: any) => ({
    petId: p.petId,
    name: p.name,
    species: p.species,
  }));
}

/**
 * Keep createPet for compatibility but note that pet creation should be centralized.
 */
export async function createPet(
  name: string,
  species?: string,
  customPetId?: string
): Promise<PetHealth> {
  const n = sanitizeString(name);
  if (!n) throw new HTTPError("Missing name", 400);
  const db = await readDB();
  const petId = customPetId || makeId();
  const newPet: PetHealth = {
    petId,
    name: n,
    species: sanitizeString(species) || "unknown",
    vitalStats: {},
    vaccinations: [],
    appointments: [],
    healthRecords: [],
  };
  db.pets = db.pets || [];
  db.pets.push(newPet);
  await writeDB(db);
  return newPet;
}

export async function getPetById(petId?: string): Promise<PetHealth> {
  requirePetId(petId);
  const db = await readDB();
  const pet = (db.pets || []).find((p: any) => p.petId === petId);
  if (!pet) throw new HTTPError("Pet not found", 404);
  return pet as PetHealth;
}

export async function addRecord(
  petId: string,
  payload: Partial<HealthRecord>
): Promise<HealthRecord> {
  requirePetId(petId);
  const db = await readDB();
  const idx = (db.pets || []).findIndex((p: any) => p.petId === petId);
  if (idx === -1) throw new HTTPError("Pet not found", 404);
  const record: HealthRecord = {
    id: makeId(),
    date:
      sanitizeString(payload.date) || new Date().toISOString().split("T")[0],
    type: sanitizeString(payload.type) || "note",
    practitioner: sanitizeString(payload.practitioner),
    notes: sanitizeString(payload.notes),
  };
  db.pets[idx].healthRecords = db.pets[idx].healthRecords || [];
  db.pets[idx].healthRecords.unshift(record);
  await writeDB(db);
  return record;
}

export async function addAppointment(
  petId: string,
  payload: Partial<MedicalAppointment>
): Promise<MedicalAppointment> {
  requirePetId(petId);
  const db = await readDB();
  const idx = (db.pets || []).findIndex((p: any) => p.petId === petId);
  if (idx === -1) throw new HTTPError("Pet not found", 404);
  const appointment: MedicalAppointment = {
    id: makeId(),
    date: sanitizeString(payload.date),
    time: sanitizeString(payload.time),
    type: sanitizeString(payload.type) || "consultation",
    practitioner: sanitizeString(payload.practitioner),
    notes: sanitizeString(payload.notes),
  };
  db.pets[idx].appointments = db.pets[idx].appointments || [];
  db.pets[idx].appointments.unshift(appointment);
  await writeDB(db);
  return appointment;
}

export async function addVaccination(
  petId: string,
  payload: Partial<Vaccination>
): Promise<Vaccination> {
  requirePetId(petId);
  const db = await readDB();
  const idx = (db.pets || []).findIndex((p: any) => p.petId === petId);
  if (idx === -1) throw new HTTPError("Pet not found", 404);
  const vaccination: Vaccination = {
    id: makeId(),
    name: sanitizeString(payload.name),
    date: sanitizeString(payload.date),
    nextDueDate: sanitizeString(payload.nextDueDate) || undefined,
    status: (payload?.status as any) || "up-to-date",
  };
  db.pets[idx].vaccinations = db.pets[idx].vaccinations || [];
  db.pets[idx].vaccinations.unshift(vaccination);
  await writeDB(db);
  return vaccination;
}

export async function deleteRecord(
  petId: string,
  recordId: string
): Promise<HealthRecord> {
  requirePetId(petId);
  if (!recordId) throw new HTTPError("Missing recordId", 400);
  const db = await readDB();
  const idx = (db.pets || []).findIndex((p: any) => p.petId === petId);
  if (idx === -1) throw new HTTPError("Pet not found", 404);
  db.pets[idx].healthRecords = db.pets[idx].healthRecords || [];
  const recIdx = db.pets[idx].healthRecords.findIndex(
    (r: any) => r.id === recordId
  );
  if (recIdx === -1) throw new HTTPError("Record not found", 404);
  const [deleted] = db.pets[idx].healthRecords.splice(recIdx, 1);
  await writeDB(db);
  return deleted as HealthRecord;
}

export async function deleteAppointment(
  petId: string,
  appointmentId: string
): Promise<MedicalAppointment> {
  requirePetId(petId);
  if (!appointmentId) throw new HTTPError("Missing appointmentId", 400);
  const db = await readDB();
  const idx = (db.pets || []).findIndex((p: any) => p.petId === petId);
  if (idx === -1) throw new HTTPError("Pet not found", 404);
  db.pets[idx].appointments = db.pets[idx].appointments || [];
  const aIdx = db.pets[idx].appointments.findIndex(
    (a: any) => a.id === appointmentId
  );
  if (aIdx === -1) throw new HTTPError("Appointment not found", 404);
  const [deleted] = db.pets[idx].appointments.splice(aIdx, 1);
  await writeDB(db);
  return deleted as MedicalAppointment;
}

export async function deleteVaccination(
  petId: string,
  vaccinationId: string
): Promise<Vaccination> {
  requirePetId(petId);
  if (!vaccinationId) throw new HTTPError("Missing vaccinationId", 400);
  const db = await readDB();
  const idx = (db.pets || []).findIndex((p: any) => p.petId === petId);
  if (idx === -1) throw new HTTPError("Pet not found", 404);
  db.pets[idx].vaccinations = db.pets[idx].vaccinations || [];
  const vIdx = db.pets[idx].vaccinations.findIndex(
    (v: any) => v.id === vaccinationId
  );
  if (vIdx === -1) throw new HTTPError("Vaccination not found", 404);
  const [deleted] = db.pets[idx].vaccinations.splice(vIdx, 1);
  await writeDB(db);
  return deleted as Vaccination;
}

export async function updateVital(
  petId: string,
  payload: Partial<VitalStats>
): Promise<VitalStats> {
  requirePetId(petId);
  const db = await readDB();
  const idx = (db.pets || []).findIndex((p: any) => p.petId === petId);
  if (idx === -1) throw new HTTPError("Pet not found", 404);
  const existing = db.pets[idx].vitalStats || {};
  const updated: VitalStats = Object.assign({}, existing, payload || {});
  db.pets[idx].vitalStats = updated;
  await writeDB(db);
  return updated;
}

export { HTTPError };
