import { supabase } from './supabaseClient';
import type { AppointmentBooking, AppointmentSlot } from '../types/appointment';

const SLOTS_TABLE = 'slots';
const APPOINTMENTS_TABLE = 'appointments';

/* ---------- Database Row Types ---------- */

type SlotRow = {
  id: string;
  date: string; // date only
  start_time: string; // time only
  end_time: string; // time only
  is_booked: boolean;
};

type AppointmentRow = {
  id: string;
  slot_id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
};

/* ---------- Get Available Slots ---------- */

export async function getAvailableSlots(): Promise<AppointmentSlot[]> {
  try {
    if (!supabase) return [];

    const now = new Date();
    const { data, error } = await supabase
      .from(SLOTS_TABLE)
      .select('*')
      .eq('is_booked', false)
      .order('date', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Supabase getAvailableSlots error', error);
      return [];
    }

    return (data ?? [])
      .map((slot: SlotRow) => ({
        id: slot.id,
        date: slot.date,
        startTime: slot.start_time,
        endTime: slot.end_time,
        isBooked: slot.is_booked,
      }))
      .filter((slot) => {
        const slotStart = new Date(`${slot.date}T${slot.startTime}`);
        return slotStart.getTime() > now.getTime();
      });
  } catch (error) {
    console.error('getAvailableSlots error', error);
    return [];
  }
}

/* ---------- Create Slot ---------- */

export async function createSlot(
  slot: Omit<AppointmentSlot, 'id' | 'isBooked'>
): Promise<AppointmentSlot> {
  if (!supabase) {
    console.error('Supabase is not available');
    return {
      id: 'temp-id',
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: false,
    };
  }

  const { data, error } = await supabase
    .from(SLOTS_TABLE)
    .insert({
      date: slot.date,
      start_time: slot.startTime,
      end_time: slot.endTime,
      is_booked: false,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || 'Failed to create slot');
  }

  const row = data as SlotRow;

  return {
    id: row.id,
    date: row.date,
    startTime: row.start_time,
    endTime: row.end_time,
    isBooked: row.is_booked,
  };
}

/* ---------- Get Bookings ---------- */

export async function getBookings(): Promise<AppointmentBooking[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from(APPOINTMENTS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase getBookings error', error);
    return [];
  }

  return (data ?? []).map((row: AppointmentRow) => ({
    id: row.id,
    slotId: row.slot_id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    createdAt: row.created_at,
  }));
}

/* ---------- Create Appointment ---------- */

export async function createAppointment(
  booking: Omit<AppointmentBooking, 'id' | 'createdAt'>
): Promise<AppointmentBooking> {
  if (!supabase) {
    console.error('Supabase is not available');
    return {
      id: 'temp-id',
      slotId: booking.slotId,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      createdAt: new Date().toISOString(),
    };
  }

  /* Get slot */
  const { data: currentSlot, error: slotError } = await supabase
    .from(SLOTS_TABLE)
    .select('*')
    .eq('id', booking.slotId)
    .single();

  if (slotError || !currentSlot) {
    throw new Error('Slot not found');
  }

  const slot = currentSlot as SlotRow;

  if (slot.is_booked) {
    throw new Error('Slot is full');
  }

  /* Insert booking */
  const { data: bookingData, error: bookingError } = await supabase
    .from(APPOINTMENTS_TABLE)
    .insert({
      slot_id: booking.slotId,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
    })
    .select()
    .single();

  if (bookingError || !bookingData) {
    throw new Error(bookingError?.message || 'Failed to create booking');
  }

  const bookingRow = bookingData as AppointmentRow;

  /* Update slot count */
  const { error: updateError } = await supabase
    .from(SLOTS_TABLE)
    .update({ is_booked: true })
    .eq('id', booking.slotId);

  if (updateError) {
    console.error('Failed to update slot booked count', updateError);
  }

  return {
    id: bookingRow.id,
    slotId: bookingRow.slot_id,
    name: bookingRow.name,
    email: bookingRow.email,
    phone: bookingRow.phone,
    createdAt: bookingRow.created_at,
  };
}