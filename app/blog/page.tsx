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
    <main>
      <section className="border-b border-[color:var(--border)] bg-[var(--primary-soft)] py-14 md:py-20">
        <div className="container mx-auto max-w-[var(--container-max)] px-4">
          <Breadcrumbs
            items={[
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
            ]}
            className="mb-6"
          />
          <h1 className="font-heading text-4xl font-semibold text-[var(--foreground)] md:text-5xl">Blog & resources</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            Articles and ideas to support emotional wellbeing and personal growth.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/appointments"
              className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition hover:brightness-110"
            >
              Book a session
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border bg-[var(--surface)] px-6 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-[var(--shadow-sm)] transition hover:bg-[var(--primary-soft)]"
              style={{ borderColor: 'var(--border)' }}
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-[var(--container-max)] px-4 py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
