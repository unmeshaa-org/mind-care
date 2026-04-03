'use client';

import { useState } from 'react';
import type { AppointmentSlot } from '../../types/appointment';
import Button from '../ui/Button';
import Input from '../ui/Input';

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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <h3 className="font-heading text-lg font-semibold text-[var(--foreground)]">Book your appointment</h3>
      <p className="text-sm text-[var(--muted)]">
        You’re booking the slot on{' '}
        <span className="font-medium">
          {new Date(`${slot.date}T${slot.startTime}`).toLocaleString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          -{' '}
          {new Date(`${slot.date}T${slot.endTime}`).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        .
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="booking-name"
          name="name"
          label="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          id="booking-email"
          name="email"
          type="email"
          label="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="booking-phone"
          name="phone"
          type="tel"
          label="Phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          containerClassName="sm:col-span-2"
        />
      </div>

      <Button type="submit" className="w-full" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Booking…' : 'Confirm booking'}
      </Button>

      {message ? (
        <p className={`text-sm ${status === 'success' ? 'text-[var(--primary)]' : 'text-red-600'}`}>{message}</p>
      ) : null}
    </form>
  );
}
