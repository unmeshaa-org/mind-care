import { supabase } from './supabaseClient';

const TABLE = 'contact_messages';

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
};

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (!supabase) return [];

  const { data, error } = await supabase.from(TABLE).select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Supabase getContactMessages error', error);
    return [];
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    createdAt: row.created_at,
  }));
}

export async function createContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>) {
  if (!supabase) throw new Error('Supabase is not available');

  const { data, error } = await supabase.from(TABLE).insert({
    name: message.name,
    email: message.email,
    phone: message.phone,
    message: message.message,
  })
  .select();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error('Insert failed');
  }

  const inserted = data?.[0];
  return {
    id: inserted.id,
    name: inserted.name,
    email: inserted.email,
    message: inserted.message,
    createdAt: inserted.created_at,
  };
}
