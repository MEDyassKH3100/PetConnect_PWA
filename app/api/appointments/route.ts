// app/api/appointments/route.ts
import { NextResponse } from 'next/server';
import { Appointment } from '@/types/Appointement';

let appointments: Appointment[] = []; // in-memory store

// GET all appointments
export async function GET() {
  return NextResponse.json(appointments);
}

// POST add new appointment
export async function POST(req: Request) {
  const newAppointment: Appointment = await req.json();

  const appointment: Appointment = {
    ...newAppointment,
    _id: Date.now().toString(),
    id: Date.now().toString(),
    status: 'upcoming',
  };

  appointments.push(appointment);

  return NextResponse.json({ message: 'Appointment added', appointment });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  console.log('DELETE ID:', id);
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  appointments = appointments.filter(a => a.id !== id && a._id !== id);
  console.log('Appointments after delete:', appointments);
  return NextResponse.json({ message: 'Appointment deleted' });
}


export async function PATCH(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  const updateData: Partial<Appointment> = await req.json();
  const index = appointments.findIndex(a => a.id === id || a._id === id);
  if (index === -1) return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });

  appointments[index] = { ...appointments[index], ...updateData };
  console.log('Appointments after update:', appointments);
  return NextResponse.json({ message: 'Appointment updated', appointment: appointments[index] });
}
