import { NextResponse } from 'next/server';
import { createSlot, getAvailableSlots } from '../../../../services/appointment';

export async function GET() {
  const slots = await getAvailableSlots();
  return NextResponse.json(slots);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { start, end, capacity } = body;

  if (!start || !end || !capacity) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const slot = await createSlot({ start, end, capacity });
    return NextResponse.json(slot);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
