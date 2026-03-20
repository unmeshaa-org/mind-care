'use client';

import { useEffect, useMemo, useState } from 'react';
import type { AppointmentSlot } from '../../types/appointment';

type Props = {
  slots: AppointmentSlot[];
  selectedSlotId?: string;
  onSelect: (slot: AppointmentSlot) => void;
};

export default function AppointmentCalendar({ slots, selectedSlotId, onSelect }: Props) {
  const now = useMemo(() => new Date(), []);
  const futureSlots = useMemo(() => {
    return slots
      .filter((slot) => new Date(`${slot.date}T${slot.endTime}`).getTime() > now.getTime())
      .sort(
        (a, b) =>
          new Date(`${a.date}T${a.startTime}`).getTime() -
          new Date(`${b.date}T${b.startTime}`).getTime(),
      );
  }, [slots, now]);

  const groupedByIsoDate = useMemo(() => {
    return futureSlots.reduce<Record<string, AppointmentSlot[]>>((acc, slot) => {
      const isoDate = slot.date;
      if (!acc[isoDate]) acc[isoDate] = [];
      acc[isoDate].push(slot);
      return acc;
    }, {});
  }, [futureSlots]);

  const dateOptions = useMemo(() => {
    return Object.keys(groupedByIsoDate).map((isoDate) => ({
      isoDate,
      label: new Date(isoDate).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }),
      slots: groupedByIsoDate[isoDate],
    }));
  }, [groupedByIsoDate]);

  const [selectedDate, setSelectedDate] = useState(dateOptions[0]?.isoDate ?? '');
  const [selectedSlotIdLocal, setSelectedSlotIdLocal] = useState<string | undefined>(selectedSlotId);

  useEffect(() => {
    if (!selectedDate && dateOptions.length > 0) {
      setSelectedDate(dateOptions[0].isoDate);
    } else if (selectedDate && !dateOptions.find((option) => option.isoDate === selectedDate)) {
      setSelectedDate(dateOptions[0]?.isoDate ?? '');
    }
  }, [dateOptions, selectedDate]);

  useEffect(() => {
    setSelectedSlotIdLocal(selectedSlotId);
  }, [selectedSlotId]);

  const selectedDateGroup = dateOptions.find((option) => option.isoDate === selectedDate);

  if (!selectedDateGroup) {
    return <p className="text-sm text-slate-600">No available future slots. Admin will add more soon.</p>;
  }

  const todayIso = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="flex items-center gap-2 font-medium">📅 Date</span>
          <input
            type="date"
            value={selectedDate}
            min={todayIso}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="flex items-center gap-2 font-medium">🕒 Time</span>
          <select
            value={selectedSlotIdLocal ?? ''}
            onChange={(e) => {
              const id = e.target.value;
              setSelectedSlotIdLocal(id);
              const slot = selectedDateGroup.slots.find((s) => s.id === id);
              if (slot && !slot.isBooked) {
                onSelect(slot);
              }
            }}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
          >
            <option value="" disabled>
              Select time slot
            </option>
            {selectedDateGroup.slots.map((slot) => {
              const start = new Date(`${slot.date}T${slot.startTime}`);
              const end = new Date(`${slot.date}T${slot.endTime}`);
              const isFull = slot.isBooked;
              return (
                <option key={slot.id} value={slot.id} disabled={isFull}>
                  {start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} - {end.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                  {isFull ? ' (Full)' : ' (Available)'}
                </option>
              );
            })}
          </select>
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        {selectedSlotIdLocal ? (
          <p className="text-sm text-slate-700">Selected slot: {new Date(`${selectedDateGroup.slots.find((s) => s.id === selectedSlotIdLocal)?.date}T${selectedDateGroup.slots.find((s) => s.id === selectedSlotIdLocal)?.startTime}`).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</p>
        ) : (
          <p className="text-sm text-slate-600">Choose a date and a time to proceed with booking.</p>
        )}
      </div>
    </div>
  );
}
