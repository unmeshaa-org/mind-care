'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Login failed.');
      return;
    }

    router.push('/admin');
  }

  return (
    <main className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Admin login</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to manage content and bookings.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="flex flex-col gap-2 text-sm">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        </form>
      </div>
    </main>
  );
}
