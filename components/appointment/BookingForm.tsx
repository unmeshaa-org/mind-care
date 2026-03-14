'use client';

import { useState } from 'react';
import type { AppointmentSlot } from '../../types/appointment';

type Props = {
  slot: AppointmentSlot;
  onSuccess?: () => void;
};

export default function BookingForm({ slot, onSuccess }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setStatus('submitting');
    setMessage(null);

    const response = await fetch('/api/appointments/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slotId: slot.id,
        name,
        email,
        phone,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setStatus('error');
      setMessage(result.error || 'Could not book this slot.');
      return;
    }

    setStatus('success');
    setMessage('Your appointment is confirmed! We’ll reach out via email soon.');
    setName('');
    setEmail('');
    setPhone('');
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Book your appointment</h3>
      <p className="text-sm text-slate-600">
        You’re booking the slot on{' '}
        <span className="font-medium">
          {new Date(slot.start).toLocaleString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        .
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          Phone
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Booking…' : 'Confirm booking'}
      </button>

      {message ? (
        <p className={`text-sm ${status === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>{message}</p>
      ) : null}
    </form>
  );
}
