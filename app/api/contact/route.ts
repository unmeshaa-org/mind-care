import { NextResponse } from 'next/server';
import { createContactMessage } from '../../../services/contact';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, message } = body;

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const saved = await createContactMessage({ name, email, phone, message });
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
