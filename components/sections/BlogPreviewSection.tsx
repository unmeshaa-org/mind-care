import Link from 'next/link';
import type { BlogPost } from '../../types/blog';
import BlogCard from '../blog/BlogCard';
import Section from '../ui/Section';

type Props = {
  posts: BlogPost[];
};

export default function BlogPreviewSection({ posts }: Props) {
  return (
    <Section className="bg-[var(--background)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-[var(--muted)]">Ideas and resources for your mental well-being.</p>
        </div>
        <Link
          href="/blog"
          className="text-sm font-semibold text-[var(--primary)] underline-offset-4 transition hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
