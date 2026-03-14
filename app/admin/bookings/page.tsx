'use client';

import { useEffect, useState } from 'react';
import type { AppointmentBooking } from '../../../types/appointment';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AppointmentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/bookings')
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load bookings.');
        setLoading(false);
      });
  }, []);

  return (
    <main className="container mx-auto px-4 py-16">
      <header>
        <h1 className="text-4xl font-semibold text-slate-900">Bookings</h1>
        <p className="mt-2 text-sm text-slate-600">View all appointment bookings.</p>
      </header>

      {loading ? (
        <p className="mt-8 text-sm text-slate-600">Loading…</p>
      ) : error ? (
        <p className="mt-8 text-sm text-rose-600">{error}</p>
      ) : (
        <div className="mt-8 space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-900">{booking.name}</p>
              <p className="text-sm text-slate-500">{booking.email} • {booking.phone}</p>
              <p className="mt-2 text-sm text-slate-600">Slot: {booking.slotId}</p>
              <p className="text-xs text-slate-500">Booked: {new Date(booking.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
