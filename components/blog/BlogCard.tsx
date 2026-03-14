import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '../../types/blog';
import { estimateReadingTime } from '../../lib/blog';

type Props = {
  post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="group">
        <div className="relative h-44 w-full overflow-hidden rounded-lg">
          <Image
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="mt-5">
          <div className="text-xs text-slate-500">
            <span>{new Date(post.publishDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="mx-2">•</span>
            <span>{estimateReadingTime(post)}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">{post.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{post.metaDescription}</p>
        </div>
      </Link>
    </article>
  );
}
