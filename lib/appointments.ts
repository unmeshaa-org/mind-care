import { AppointmentBooking, AppointmentSlot } from '../types/appointment';

// In-memory storage. Reset on server restart.
let slots: AppointmentSlot[] = [
  {
    id: 'slot-1',
    start: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    end: new Date(Date.now() + 1000 * 60 * 60 * 25).toISOString(),
    capacity: 3,
    booked: 0,
  },
  {
    id: 'slot-2',
    start: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
    end: new Date(Date.now() + 1000 * 60 * 60 * 27).toISOString(),
    capacity: 3,
    booked: 1,
  },
];

let bookings: AppointmentBooking[] = [];

export function getSlots() {
  return slots;
}

export function getSlotById(id: string) {
  return slots.find((slot) => slot.id === id);
}

export function createSlot(slot: Omit<AppointmentSlot, 'id' | 'booked'>) {
  const newSlot: AppointmentSlot = {
    ...slot,
    id: `slot-${crypto.randomUUID()}`,
    booked: 0,
  };
  slots = [...slots, newSlot];
  return newSlot;
}

export function getBookings() {
  return bookings;
}

export function createBooking(booking: Omit<AppointmentBooking, 'id' | 'createdAt'>) {
  const slot = getSlotById(booking.slotId);
  if (!slot) {
    throw new Error('Slot not found');
  }

  if (typeof slot.booked === 'number' && slot.booked >= slot.capacity) {
    throw new Error('Slot is full');
  }

  const createdBooking: AppointmentBooking = {
    ...booking,
    id: `booking-${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
  };

  bookings = [...bookings, createdBooking];
  slots = slots.map((s) =>
    s.id === slot.id ? { ...s, booked: (s.booked ?? 0) + 1 } : s,
  );

  return createdBooking;
}
