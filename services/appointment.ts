import { supabase } from './supabaseClient';
import type { AppointmentBooking, AppointmentSlot } from '../types/appointment';

const SLOTS_TABLE = 'slots';
const APPOINTMENTS_TABLE = 'appointments';

export async function getAvailableSlots(): Promise<AppointmentSlot[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from(SLOTS_TABLE)
    .select('*')
    .gte('capacity', 1)
    .order('start', { ascending: true });

  if (error) {
    console.error('Supabase getAvailableSlots error', error);
    return [];
  }

  return (data || []) as AppointmentSlot[];
}

export async function createSlot(slot: Omit<AppointmentSlot, 'id' | 'booked'>) {
  if (!supabase) throw new Error('Supabase is not available');

  const { data, error } = await supabase.from(SLOTS_TABLE).insert({
    start: slot.start,
    end: slot.end,
    capacity: slot.capacity,
    booked: 0,
  });

  if (error) {
    throw new Error(error.message);
  }

  return (data && data[0]) as AppointmentSlot;
}

export async function getBookings(): Promise<AppointmentBooking[]> {
  if (!supabase) return [];

  const { data, error } = await supabase.from(APPOINTMENTS_TABLE).select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Supabase getBookings error', error);
    return [];
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    slotId: row.slot_id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    createdAt: row.created_at,
  }));
}

export async function createAppointment(booking: Omit<AppointmentBooking, 'id' | 'createdAt'>) {
  if (!supabase) throw new Error('Supabase is not available');

  // Simple implementation: create booking and increment slot booked count.
  const { data: currentSlot, error: slotError } = await supabase
    .from(SLOTS_TABLE)
    .select('*')
    .eq('id', booking.slotId)
    .limit(1)
    .single();

  if (slotError || !currentSlot) {
    throw new Error('Slot not found');
  }

  if (currentSlot.booked >= currentSlot.capacity) {
    throw new Error('Slot is full');
  }

  const { data: bookingData, error: bookingError } = await supabase
    .from(APPOINTMENTS_TABLE)
    .insert({
      slot_id: booking.slotId,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
    })
    .single();

  if (bookingError) {
    throw new Error(bookingError.message);
  }

  const { error: updateError } = await supabase
    .from(SLOTS_TABLE)
    .update({ booked: (currentSlot.booked ?? 0) + 1 })
    .eq('id', booking.slotId);

  if (updateError) {
    console.error('Failed to update slot booked count', updateError);
  }

  return {
    id: bookingData.id,
    slotId: booking.slotId,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    createdAt: bookingData.created_at,
  } as AppointmentBooking;
}
