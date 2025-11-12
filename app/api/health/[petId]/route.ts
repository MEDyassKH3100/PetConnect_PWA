import { NextRequest, NextResponse } from 'next/server';
import {
  getPetById,
  addRecord,
  addAppointment,
  addVaccination,
  deleteRecord,
  deleteAppointment,
  deleteVaccination,
  updateVital,
  HTTPError,
} from '../../../../services/healthService';

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    // `params` may be a promise in Next.js route handlers; await it before accessing properties
    const petId = (await params)?.petId;
    if (!petId) return NextResponse.json({ error: 'Missing petId' }, { status: 400 });
    const pet = await getPetById(petId);
    return NextResponse.json(pet);
  } catch (err: any) {
    console.error('GET /api/health/[petId] error', err);
    if (err instanceof HTTPError) return NextResponse.json({ error: err.message }, { status: err.status });
    return NextResponse.json({ error: 'Failed to fetch pet' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: any }) {
  try {
    const petId = (await params)?.petId;
    if (!petId) return NextResponse.json({ error: 'Missing petId' }, { status: 400 });

    const body = await request.json();
    const { action, payload } = body || {};
    if (!action || payload === undefined) return NextResponse.json({ error: 'Missing action or payload' }, { status: 400 });

    if (action === 'addRecord') {
      const rec = await addRecord(petId, payload);
      return NextResponse.json(rec, { status: 201 });
    }

    if (action === 'addAppointment') {
      const appt = await addAppointment(petId, payload);
      return NextResponse.json(appt, { status: 201 });
    }

    if (action === 'addVaccination') {
      const vac = await addVaccination(petId, payload);
      return NextResponse.json(vac, { status: 201 });
    }

      if (action === 'deleteRecord') {
        const deleted = await deleteRecord(petId, payload?.id || payload?.recordId);
        return NextResponse.json(deleted, { status: 200 });
      }

      if (action === 'deleteAppointment') {
        const deleted = await deleteAppointment(petId, payload?.id || payload?.appointmentId);
        return NextResponse.json(deleted, { status: 200 });
      }

      if (action === 'deleteVaccination') {
        const deleted = await deleteVaccination(petId, payload?.id || payload?.vaccinationId);
        return NextResponse.json(deleted, { status: 200 });
      }

    if (action === 'updateVital') {
      const vit = await updateVital(petId, payload);
      return NextResponse.json(vit, { status: 200 });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err: any) {
    console.error('POST /api/health/[petId] error', err);
    if (err instanceof HTTPError) return NextResponse.json({ error: err.message }, { status: err.status });
    return NextResponse.json({ error: 'Failed to update pet' }, { status: 500 });
  }
}