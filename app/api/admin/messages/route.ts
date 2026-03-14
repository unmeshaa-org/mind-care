import { NextResponse } from 'next/server';
import { getContactMessages } from '../../../../services/contact';

export async function GET() {
  const messages = await getContactMessages();
  return NextResponse.json(messages);
}
