import { NextResponse } from 'next/server';
import { getBookings } from '../../../../services/appointment';

export async function GET() {
  const bookings = await getBookings();
  return NextResponse.json(bookings);
}
