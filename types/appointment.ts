export type AppointmentSlot = {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM:SS
  endTime: string; // HH:MM:SS
  isBooked?: boolean;
};

export type AppointmentBooking = {
  id: string;
  slotId: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};
