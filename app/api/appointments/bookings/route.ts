import { NextResponse } from 'next/server';
import { createAppointment } from '../../../../services/appointment';

export async function POST(request: Request) {
  const payload = await request.json();
  const { slotId, name, email, phone } = payload;

  if (!slotId || !name || !email || !phone) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const booking = await createAppointment({ slotId, name, email, phone });
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
