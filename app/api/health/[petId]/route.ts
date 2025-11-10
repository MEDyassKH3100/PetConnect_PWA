import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'health.json');

async function readDB() {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    const init = { pets: [] };
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(init, null, 2), 'utf8');
    return init;
  }
}

async function writeDB(db: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

export async function GET(request: NextRequest, context: { params?: any }) {
  try {
    // Important: await context.params before using it (Next.js requirement)
    const routeParams = await context.params;
    const petId = routeParams?.petId;
    if (!petId) return NextResponse.json({ error: 'Missing petId' }, { status: 400 });

    const db = await readDB();
    const pet = (db.pets || []).find((p: any) => p.petId === petId);
    if (!pet) return NextResponse.json({ error: 'Pet not found' }, { status: 404 });
    return NextResponse.json(pet);
  } catch (err) {
    console.error('GET /api/health/[petId] error', err);
    return NextResponse.json({ error: 'Failed to fetch pet' }, { status: 500 });
  }
}

/*
POST behavior: accept JSON with shape:
{ action: 'addRecord'|'addAppointment'|'addVaccination'|'updateVital', payload: {...} }
*/
export async function POST(request: NextRequest, context: { params?: any }) {
  try {
    const routeParams = await context.params;
    const petId = routeParams?.petId;
    if (!petId) return NextResponse.json({ error: 'Missing petId' }, { status: 400 });

    const body = await request.json();
    const { action, payload } = body || {};
    if (!action || !payload) {
      return NextResponse.json({ error: 'Missing action or payload' }, { status: 400 });
    }

    const db = await readDB();
    const idx = (db.pets || []).findIndex((p: any) => p.petId === petId);
    if (idx === -1) return NextResponse.json({ error: 'Pet not found' }, { status: 404 });

    const pet = db.pets[idx];
    const makeId = () => (global as any).crypto?.randomUUID?.() ?? Date.now().toString();

    if (action === 'addRecord') {
      const record = {
        id: makeId(),
        date: payload.date || new Date().toISOString().split('T')[0],
        type: payload.type || 'note',
        practitioner: payload.practitioner || '',
        notes: payload.notes || '',
      };
      pet.healthRecords = pet.healthRecords || [];
      pet.healthRecords.unshift(record);
      db.pets[idx] = pet;
      await writeDB(db);
      return NextResponse.json(record, { status: 201 });
    }

    if (action === 'addAppointment') {
      const appointment = {
        id: makeId(),
        date: payload.date,
        time: payload.time,
        type: payload.type || 'consultation',
        practitioner: payload.practitioner || '',
        notes: payload.notes || '',
      };
      pet.appointments = pet.appointments || [];
      pet.appointments.unshift(appointment);
      db.pets[idx] = pet;
      await writeDB(db);
      return NextResponse.json(appointment, { status: 201 });
    }

    if (action === 'addVaccination') {
      const vaccination = {
        id: makeId(),
        name: payload.name,
        date: payload.date,
        nextDueDate: payload.nextDueDate,
        status: payload.status || 'up-to-date',
      };
      pet.vaccinations = pet.vaccinations || [];
      pet.vaccinations.unshift(vaccination);
      db.pets[idx] = pet;
      await writeDB(db);
      return NextResponse.json(vaccination, { status: 201 });
    }

    if (action === 'updateVital') {
      const stats = payload; // partial VitalStats
      pet.vitalStats = Object.assign({}, pet.vitalStats || {}, stats);
      db.pets[idx] = pet;
      await writeDB(db);
      return NextResponse.json(pet.vitalStats, { status: 200 });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err) {
    console.error('POST /api/health/[petId] error', err);
    return NextResponse.json({ error: 'Failed to update pet' }, { status: 500 });
  }
}