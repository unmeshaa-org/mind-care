'use client';

import { useEffect, useMemo, useState } from 'react';
import type { AppointmentSlot } from '../../types/appointment';

type Props = {
  onSelect: (slot: AppointmentSlot) => void;
  selectedSlotId?: string;
};

export default function SlotSelector({ onSelect, selectedSlotId }: Props) {
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
      .catch((err) => {
        setError('Unable to load available slots.');
        setLoading(false);
      });
  }, []);

  const availableSlots = useMemo(() => {
    const now = new Date();
    return slots
      .filter((slot) => !slot.isBooked)
      .filter((slot) => new Date(`${slot.date}T${slot.startTime}`).getTime() > now.getTime());
  }, [slots]);

  if (loading) {
    return <p className="text-sm text-[var(--muted)]">Loading available slots...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (availableSlots.length === 0) {
    return <p className="text-sm text-slate-600">No slots available at the moment.</p>;
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-[var(--foreground)]">Choose an available slot</p>
      <ul className="space-y-2">
        {availableSlots.map((slot) => {
          const start = new Date(`${slot.date}T${slot.startTime}`);
          const end = new Date(`${slot.date}T${slot.endTime}`);
          const label = `${start.toLocaleString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })} • ${start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString(
            undefined,
            {
              hour: '2-digit',
              minute: '2-digit',
            },
          )}`;

          return (
            <li key={slot.id}>
              <button
                type="button"
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  selectedSlotId === slot.id
                    ? 'border-[var(--primary)] bg-[var(--primary-soft)]'
                    : 'border-[color:var(--border)] bg-[var(--surface)] hover:bg-[var(--primary-soft)]'
                }`}
                onClick={() => onSelect(slot)}
              >
                <div className="flex items-center justify-between">
                          <span className="font-medium text-[var(--foreground)]">{label}</span>
                  <span className="text-xs text-[var(--muted)]">
                    {slot.isBooked ? 'Full' : 'Available'}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
