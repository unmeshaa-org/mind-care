'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '../../../types/blog';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/blog')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load blog posts.');
        setLoading(false);
      });
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/admin/blog?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    });
    setPosts((prev) => prev.filter((post) => post.slug !== slug));
  }

  async function togglePublish(post: BlogPost) {
    await fetch('/api/admin/blog', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: post.slug,
        updates: { published: !post.published },
      }),
    });

    setPosts((prev) =>
      prev.map((p) => (p.slug === post.slug ? { ...p, published: !p.published } : p)),
    );
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-slate-900">Blog management</h1>
          <p className="mt-2 text-sm text-slate-600">Create, edit, publish, and delete blog posts.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        >
          New post
        </Link>
      </header>

      <div className="mt-10">
        {loading ? (
          <p className="text-sm text-slate-600">Loading…</p>
        ) : error ? (
          <p className="text-sm text-rose-600">{error}</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-lg font-semibold text-slate-900">{post.title}</p>
                  <p className="text-sm text-slate-500">
                    {post.slug} • {post.published ? 'Published' : 'Draft'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublish(post)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                  >
                    {post.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <Link
                    href={`/admin/blog/${post.slug}`}
                    className="rounded-full border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.slug)}
                    className="rounded-full border border-rose-600 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
