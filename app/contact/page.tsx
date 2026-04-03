'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import PageHeader from '../../components/ui/PageHeader';
import SectionContainer from '../../components/ui/SectionContainer';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('submitting');
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setError((err as Error).message);
    }
  };

  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Ask a question or tell us how we can help. We aim to respond within one business day."
      />

      <div className="py-14 md:py-20">
        <SectionContainer>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
            <section
              className="rounded-2xl border bg-[var(--surface)] p-8 shadow-[var(--shadow-sm)] md:p-10"
              style={{ borderColor: 'var(--border)' }}
            >
              <h2 className="font-heading text-xl font-semibold text-[var(--foreground)]">Send a message</h2>
              <p className="mt-2 text-[var(--muted)]">Fill out the form below and we will respond as soon as possible.</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <Input id="name" name="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <Textarea
                  id="message"
                  name="message"
                  label="Message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />

                {status === 'error' && (
                  <p className="text-sm text-red-600">{error || 'Something went wrong. Please try again.'}</p>
                )}

                {status === 'success' && (
                  <p className="text-sm text-[var(--primary)]">Thanks for reaching out! We will reply soon.</p>
                )}

                <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
                  {status === 'submitting' ? 'Sending…' : 'Send message'}
                </Button>
              </form>
            </section>

            <aside className="space-y-8">
              <div
                className="rounded-2xl border bg-[var(--surface)] p-8 shadow-[var(--shadow-sm)] md:p-10"
                style={{ borderColor: 'var(--border)' }}
              >
                <h2 className="font-heading text-xl font-semibold text-[var(--foreground)]">Direct contact</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  Email:{' '}
                  <Link
                    href="mailto:hello@mindcare.example.com"
                    className="font-semibold text-[var(--primary)] hover:underline"
                  >
                    hello@mindcare.example.com
                  </Link>
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Phone: <span className="font-semibold text-[var(--foreground)]">(555) 123-4567</span>
                </p>
                <Link
                  href="/appointments"
                  className="mt-6 inline-flex text-sm font-semibold text-[var(--primary)] underline-offset-4 hover:underline"
                >
                  Prefer to book online? → Appointments
                </Link>
              </div>

              <div
                className="rounded-2xl border bg-[var(--secondary-soft)] p-8 md:p-10"
                style={{ borderColor: 'var(--border)' }}
              >
                <h2 className="font-heading text-xl font-semibold text-[var(--foreground)]">Location</h2>
                <address className="mt-3 not-italic text-sm leading-relaxed text-[var(--muted)]">
                  123 Wellness Way
                  <br />
                  Suite 100
                  <br />
                  City, State 00000
                </address>
              </div>
            </aside>
          </div>
        </SectionContainer>
      </div>
    </main>
  );
}
