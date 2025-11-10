import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'health.json');

async function readDB() {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    // if missing, initialize
    const init = { pets: [] };
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(init, null, 2), 'utf8');
    return init;
  }
}

async function writeDB(db: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

export async function GET() {
  try {
    const db = await readDB();
    // return list of pets (id,name,species)
    const list = (db.pets || []).map((p: any) => ({
      petId: p.petId,
      name: p.name,
      species: p.species,
    }));
    return NextResponse.json(list);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read pets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, species } = body;
    if (!name) {
      return NextResponse.json({ error: 'Missing name' }, { status: 400 });
    }

    const db = await readDB();
    const petId = (global as any).crypto?.randomUUID?.() ?? Date.now().toString();
    const newPet = {
      petId,
      name,
      species: species || 'unknown',
      // initialize structure for this pet
      vitalStats: {},
      vaccinations: [],
      appointments: [],
      healthRecords: [],
    };
    db.pets = db.pets || [];
    db.pets.push(newPet);
    await writeDB(db);
    return NextResponse.json(newPet, { status: 201 });
  } catch (err) {
    console.error('POST /api/health/pets error', err);
    return NextResponse.json({ error: 'Failed to create pet' }, { status: 500 });
  }
}