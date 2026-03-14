import Link from 'next/link';
import type { BlogPost } from '../../types/blog';

type Props = {
  posts: BlogPost[];
};

export default function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">Related articles</h2>
      <ul className="mt-4 space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-lg p-4 hover:bg-slate-50"
            >
              <h3 className="text-sm font-semibold text-slate-900">{post.title}</h3>
              <p className="mt-1 text-sm text-slate-600 line-clamp-2">{post.metaDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
