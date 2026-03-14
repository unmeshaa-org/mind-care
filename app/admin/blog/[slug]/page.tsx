'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import type { BlogPost } from '../../../types/blog';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const slug = (params as any)?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/admin/blog?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load post.');
        setLoading(false);
      });
  }, [slug]);

  async function handleSave() {
    if (!post) return;

    const res = await fetch('/api/admin/blog', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, updates: post }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || 'Unable to update post');
      return;
    }

    router.push('/admin/blog');
  }

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-16">
        <p className="text-sm text-slate-600">Loading…</p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="container mx-auto px-4 py-16">
        <p className="text-sm text-rose-600">{error || 'Post not found.'}</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <header>
        <h1 className="text-4xl font-semibold text-slate-900">Edit post</h1>
        <p className="mt-2 text-sm text-slate-600">Update the post content, metadata, or publish state.</p>
      </header>

      <div className="mt-10 space-y-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            Title
            <input
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Slug
            <input
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            Meta description
            <textarea
              value={post.metaDescription}
              onChange={(e) => setPost({ ...post, metaDescription: e.target.value })}
              rows={3}
              className="resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Cover image URL
            <input
              value={post.coverImage}
              onChange={(e) => setPost({ ...post, coverImage: e.target.value })}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            Publish date
            <input
              type="datetime-local"
              value={post.publishDate}
              onChange={(e) => setPost({ ...post, publishDate: e.target.value })}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Published
            <input
              type="checkbox"
              checked={post.published ?? false}
              onChange={(e) => setPost({ ...post, published: e.target.checked })}
              className="h-5 w-5"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm">
          Content (JSON array)
          <textarea
            value={JSON.stringify(post.content, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                setPost({ ...post, content: parsed });
              } catch {
                // ignore invalid JSON while editing
              }
            }}
            rows={10}
            className="resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Save changes
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>

        {message ? <p className="text-sm text-rose-600">{message}</p> : null}
      </div>
    </main>
  );
}
