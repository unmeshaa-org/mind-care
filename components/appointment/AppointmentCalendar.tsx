'use client';

import { useMemo, useState } from 'react';
import type { AppointmentSlot } from '../../types/appointment';

type Props = {
  slots: AppointmentSlot[];
  selectedSlotId?: string;
  onSelect: (slot: AppointmentSlot) => void;
};

export default function AppointmentCalendar({ slots, selectedSlotId, onSelect }: Props) {
  const sortedSlots = useMemo(() => {
    return [...slots].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }, [slots]);

  const groupedByDay = useMemo(() => {
    return sortedSlots.reduce<Record<string, AppointmentSlot[]>>((acc, slot) => {
      const date = new Date(slot.start).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
      if (!acc[date]) acc[date] = [];
      acc[date].push(slot);
      return acc;
    }, {});
  }, [sortedSlots]);

  const days = Object.keys(groupedByDay);
  const [activeDay, setActiveDay] = useState(days[0] ?? '');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {days.map((day) => (
          <button
            key={day}
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              day === activeDay
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            onClick={() => setActiveDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {(groupedByDay[activeDay] || []).map((slot) => {
          const start = new Date(slot.start);
          const end = new Date(slot.end);
          const isSelected = slot.id === selectedSlotId;
          const isFull = (slot.booked ?? 0) >= slot.capacity;

          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => onSelect(slot)}
              disabled={isFull}
              className={`w-full rounded-xl border px-4 py-4 text-left transition ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              } ${isFull ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} -
                    {end.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-xs text-slate-500">
                    {slot.capacity - (slot.booked ?? 0)} spots available
                  </p>
                </div>
                {isFull ? (
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600">
                    Full
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
