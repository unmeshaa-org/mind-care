'use client';

import { useEffect, useState } from 'react';
import type { ContactMessage } from '../../../services/contact';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/messages')
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load messages.');
        setLoading(false);
      });
  }, []);

  return (
    <main className="container mx-auto px-4 py-16">
      <header>
        <h1 className="text-4xl font-semibold text-slate-900">Contact messages</h1>
        <p className="mt-2 text-sm text-slate-600">View messages submitted through the contact form.</p>
      </header>

      {loading ? (
        <p className="mt-8 text-sm text-slate-600">Loading…</p>
      ) : error ? (
        <p className="mt-8 text-sm text-rose-600">{error}</p>
      ) : (
        <div className="mt-8 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-900">{msg.name}</p>
              <p className="text-sm text-slate-500">{msg.email}</p>
              {msg.phone ? <p className="text-sm text-slate-500">{msg.phone}</p> : null}
              <p className="mt-4 text-sm text-slate-600">{msg.message}</p>
              <p className="mt-3 text-xs text-slate-500">Sent: {new Date(msg.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
