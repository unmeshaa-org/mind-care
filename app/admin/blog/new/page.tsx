'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().slice(0, 16));
  const [published, setPublished] = useState(false);
  const [content, setContent] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const body = {
      title,
      slug,
      metaDescription,
      coverImage,
      publishDate,
      published,
      content: JSON.parse(content),
      author: {
        name: 'Admin',
        bio: '',
      },
    };

    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || 'Unable to create post.');
      return;
    }

    router.push('/admin/blog');
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <header>
        <h1 className="text-4xl font-semibold text-slate-900">Create blog post</h1>
        <p className="mt-2 text-sm text-slate-600">Create a new post and publish it to your blog.</p>
      </header>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Slug
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            Meta description
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              className="resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Cover image URL
            <input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            Publish date
            <input
              type="datetime-local"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Published
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-5 w-5"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm">
          Content (JSON array)
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='[ { "type": "paragraph", "text": "Hello" } ]'
            rows={8}
            className="resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
        </label>

        <button
          type="submit"
          className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        >
          Create post
        </button>

        {message ? <p className="text-sm text-rose-600">{message}</p> : null}
      </form>
    </main>
  );
}
