import { NextResponse } from 'next/server';
import { createSlot, getAvailableSlots } from '../../../../services/appointment';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const slots = await getAvailableSlots();
    return NextResponse.json(slots ?? []);
  } catch (error) {
    console.error("GET /slots error:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { start, end, capacity } = body;

    if (!start || !end || !capacity) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const slot = await createSlot({ start, end, capacity });
    return NextResponse.json(slot);
  } catch (error) {
    console.error("POST /slots error:", error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
  }
}