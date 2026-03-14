import Link from 'next/link';
import BlogCard from '../../components/blog/BlogCard';
import Breadcrumbs from '../../components/seo/Breadcrumbs';
import { getBlogs } from '../../services/blog';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Blog | Mind Care Counseling',
  description: 'Explore journal posts and practical mental health tips from Mind Care Counseling.',
};

export default async function BlogPage() {
  const posts = await getBlogs();

  return (
    <main className="container mx-auto px-4 py-16">
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
        className="mb-8"
      />

      <header className="mx-auto max-w-3xl space-y-4 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Mind Care blog</h1>
        <p className="text-lg leading-relaxed text-slate-600">
          Insightful articles and tools to support your emotional wellbeing and personal growth.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/appointments"
            className="rounded-full border border-indigo-600 bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Book a session
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Contact us
          </Link>
        </div>
      </header>

      <section className="mt-14 grid gap-8 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}
