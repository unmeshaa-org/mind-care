'use client';

import Link from 'next/link';
import { Suspense, useEffect, useMemo, useState } from 'react';
import type { AppointmentSlot } from '../../types/appointment';
import AppointmentCalendar from '../../components/appointment/AppointmentCalendar';
import BookingForm from '../../components/appointment/BookingForm';
import PageHeader from '../../components/ui/PageHeader';
import SectionContainer from '../../components/ui/SectionContainer';

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
    <Suspense
      fallback={
        <SectionContainer className="py-20 text-center text-[var(--muted)]">Loading…</SectionContainer>
      }
    >
      <main>
        <PageHeader
          eyebrow="Appointments"
          title="Book a session"
          description="Choose an available time, then confirm your details. We will follow up by email to finalize your appointment."
        />

        <SectionContainer className="py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-semibold text-[var(--foreground)]">Available slots</h2>
              {loading ? (
                <p className="text-sm text-[var(--muted)]">Loading available slots…</p>
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

            <div className="space-y-6">
              {selectedSlot ? (
                <BookingForm slot={selectedSlot} onSuccess={() => setSelectedSlot(null)} />
              ) : (
                <div
                  className="rounded-2xl border bg-[var(--surface)] p-10 shadow-[var(--shadow-sm)]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <h2 className="font-heading text-2xl font-semibold text-[var(--foreground)]">
                    Pick a slot to book
                  </h2>
                  <p className="mt-4 leading-relaxed text-[var(--muted)]">
                    Select a date and time from the calendar. Your booking form will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div
            className="mt-16 rounded-2xl border bg-[var(--primary-soft)] p-10"
            style={{ borderColor: 'var(--border)' }}
          >
            <h2 className="font-heading text-2xl font-semibold text-[var(--foreground)]">Need help?</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-[var(--muted)]">
              Questions about fees, format, or finding the right time? We are happy to help before you book.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex text-sm font-semibold text-[var(--primary)] underline-offset-4 hover:underline"
            >
              Go to contact →
            </Link>
          </div>
        </SectionContainer>
      </main>
    </Suspense>
  );
}
