'use client';

import { Suspense } from "react";
import { useEffect, useState } from 'react';
import type { AppointmentSlot } from '../../../types/appointment';

export const dynamic = 'force-dynamic';

export default function AdminAppointmentsPage() {
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [capacity, setCapacity] = useState(3);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadSlots() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/slots', {
        cache: 'no-store'
      });
      const data = await res.json();
      setSlots(data);
    } catch {
      setError('Unable to load slots.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSlots();
  }, []);

  async function handleCreateSlot(event: React.FormEvent) {
    event.preventDefault();

    try {
      const res = await fetch('/api/admin/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start, end, capacity }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'Unable to create slot.');
        return;
      }

      setMessage(`Created slot on ${new Date(data.start).toLocaleString()}`);
      setStart('');
      setEnd('');
      setCapacity(3);
      loadSlots();
    } catch (err) {
      setMessage('Unable to create slot.');
    }
  }

  return (
    <main className="container mx-auto px-4 py-16">
    <h1 className="text-4xl font-semibold text-slate-900">Admin / Appointments</h1>
    <p className="mt-4 text-slate-600">
        Create and manage appointment slots. Slots are stored in memory and reset when the server restarts.
    </p>

    <section className="mt-10 grid gap-10 lg:grid-cols-2">
        <form
        onSubmit={handleCreateSlot}
        className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm"
        >
        <h2 className="text-2xl font-semibold text-slate-900">Create a new slot</h2>
        <div className="mt-6 grid gap-4">
            <label className="flex flex-col gap-2 text-sm">
            Start (ISO format)
            <input
                value={start}
                onChange={(e) => setStart(e.target.value)}
                placeholder="2026-03-15T14:00:00"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
            </label>
            <label className="flex flex-col gap-2 text-sm">
            End (ISO format)
            <input
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                placeholder="2026-03-15T15:00:00"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
            </label>
            <label className="flex flex-col gap-2 text-sm">
            Capacity
            <input
                type="number"
                value={capacity}
                min={1}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
            </label>

            <button
            type="submit"
            className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
            Create slot
            </button>

            {message ? <p className="text-sm text-slate-600">{message}</p> : null}
        </div>
        </form>

        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Existing slots</h2>
        <ul className="mt-6 space-y-4">
            {slots.map((slot) => (
            <li key={slot.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                {new Date(slot.start).toLocaleString()} - {new Date(slot.end).toLocaleTimeString()}
                </p>
                <p className="text-sm text-slate-600">
                {slot.booked ?? 0} / {slot.capacity} booked
                </p>
            </li>
            ))}
        </ul>
        </div>
    </section>
    </main>
  );
}

