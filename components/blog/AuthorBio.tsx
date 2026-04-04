import Image from 'next/image';
import type { BlogAuthor } from '../../types/blog';

type Props = {
  author: BlogAuthor;
};

export default function AuthorBio({ author }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">{author.name}</p>
        </div>
      </div>
    </section>
  );
}
