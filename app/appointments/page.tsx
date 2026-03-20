'use client'

import { Suspense } from "react";
import { useEffect, useMemo, useState } from 'react';
import type { AppointmentSlot } from '../../types/appointment';
import AppointmentCalendar from '../../components/appointment/AppointmentCalendar';
import BookingForm from '../../components/appointment/BookingForm';

export const dynamic = 'force-dynamic';

export default function AppointmentsPage() {
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null);
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/appointments/slots')
      .then((res) => res.json())
      .then((data) => {
        setSlots(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load available slots.');
        setLoading(false);
      });
  }, []);

  const sortedSlots = useMemo(() => {
    return [...slots].sort((a, b) => {
      const aDate = new Date(`${a.date}T${a.startTime}`);
      const bDate = new Date(`${b.date}T${b.startTime}`);
      return aDate.getTime() - bDate.getTime();
    });
  }, [slots]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
        <main className="container mx-auto px-4 py-16">
        <header className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-semibold text-slate-900">Appointments</h1>
            <p className="mt-6 text-lg text-slate-600">
            View available time slots and book a session with our counselor. Fill in your contact details to reserve a spot.
            </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-slate-900">Available slots</h2>
            {loading ? (
                <p className="text-sm text-slate-600">Loading available slots…</p>
            ) : error ? (
                <p className="text-sm text-red-600">{error}</p>
            ) : (
                <AppointmentCalendar
                slots={sortedSlots}
                selectedSlotId={selectedSlot?.id}
                onSelect={setSelectedSlot}
                />
            )}
            </div>

            <div className="space-y-8">
            {selectedSlot ? (
                <BookingForm
                slot={selectedSlot}
                onSuccess={() => setSelectedSlot(null)}
                />
            ) : (
                <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900">Pick a slot to book</h2>
                <p className="mt-4 text-slate-600">
                    Select a time slot from the calendar to complete your appointment booking.
                </p>
                </div>
            )}
            </div>
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-10">
            <h2 className="text-2xl font-semibold text-slate-900">Need help?</h2>
            <p className="mt-4 text-slate-600">
            If you have any questions about scheduling, please reach out via the contact page.
            </p>
        </div>
        </main>
    </Suspense>
  );
}
