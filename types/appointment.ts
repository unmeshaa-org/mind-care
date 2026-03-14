export type AppointmentSlot = {
  id: string;
  start: string; // ISO timestamp
  end: string; // ISO timestamp
  capacity: number;
  booked?: number;
};

export type AppointmentBooking = {
  id: string;
  slotId: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};
