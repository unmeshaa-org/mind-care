import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '../../types/blog';
import { estimateReadingTime } from '../../lib/blog';
import Card from '../ui/Card';

type Props = {
  post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[var(--muted)]">Image placeholder</div>
        )}
      </div>

      <div className="p-6">
        <div className="text-xs text-[var(--muted)]">
          <span>{new Date(post.publishDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className="mx-2">•</span>
          <span>{estimateReadingTime(post)}</span>
        </div>

        <h3 className="mt-3 font-heading text-xl font-semibold text-[var(--foreground)]">{post.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{post.metaDescription}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition"
          style={{
            borderColor: 'var(--primary-soft-strong)',
            background: 'var(--primary-soft)',
            color: 'var(--primary)',
          }}
        >
          Read more
        </Link>
      </div>
    </Card>
  );
}
