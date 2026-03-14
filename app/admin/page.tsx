'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminHomePage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-slate-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">Manage blog posts, appointments, and messages.</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
        >
          Log out
        </button>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link
          href="/admin/blog"
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-slate-900">Blog</h2>
          <p className="mt-2 text-sm text-slate-600">Create, edit, publish, and delete blog posts.</p>
        </Link>

        <Link
          href="/admin/appointments"
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-slate-900">Appointment slots</h2>
          <p className="mt-2 text-sm text-slate-600">Create slots and manage available booking times.</p>
        </Link>

        <Link
          href="/admin/bookings"
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-slate-900">Bookings</h2>
          <p className="mt-2 text-sm text-slate-600">View all bookings received from clients.</p>
        </Link>

        <Link
          href="/admin/messages"
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-slate-900">Contact messages</h2>
          <p className="mt-2 text-sm text-slate-600">Read and manage messages sent from the contact form.</p>
        </Link>
      </div>
    </main>
  );
}
