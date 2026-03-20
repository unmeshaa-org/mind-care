import { NextResponse } from 'next/server';
import { createSlot, getAvailableSlots } from '../../../../services/appointment';

export async function GET() {
  const slots = await getAvailableSlots();
  return NextResponse.json(slots);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const { date, startTime, endTime } = payload;

  if (!date || !startTime || !endTime) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const slot = await createSlot({ date, startTime, endTime });
    return NextResponse.json(slot);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
