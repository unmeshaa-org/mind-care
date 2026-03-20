'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

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
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-semibold text-slate-900">Contact</h1>
      <p className="mt-6 text-lg text-slate-600">
        Need to ask a question or schedule a session? Send us a message and we’ll respond within 1 business day.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Send a message</h2>
          <p className="mt-2 text-slate-600">Fill out the form below and we’ll respond as soon as possible.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-rose-600">{error || 'Something went wrong. Please try again.'}</p>
            )}

            {status === 'success' && (
              <p className="text-sm text-emerald-600">Thanks for reaching out! We’ll reply soon.</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-indigo-300"
            >
              {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </section>

        <aside className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Reach out</h2>
            <p className="mt-2 text-slate-600">
              Email: <Link href="mailto:hello@mindcare.example.com" className="font-medium text-indigo-600 hover:underline">
                hello@mindcare.example.com
              </Link>
            </p>
            <p className="mt-1 text-slate-600">Phone: <span className="font-medium">(555) 123-4567</span></p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Location</h2>
            <p className="mt-2 text-slate-600">
              123 Wellness Way
              <br />
              Suite 100
              <br />
              City, State 00000
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
