import Image from 'next/image';
import type { BlogAuthor } from '../../types/blog';

type Props = {
  author: BlogAuthor;
};

export default function AuthorBio({ author }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex gap-4">
        {author.avatarUrl ? (
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              src={author.avatarUrl}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-xl font-semibold text-slate-700">
            {author.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-slate-900">{author.name}</p>
          <p className="mt-1 text-sm text-slate-600">{author.bio}</p>
          {author.twitterHandle ? (
            <p className="mt-2 text-sm text-slate-500">
              <a
                href={`https://twitter.com/${author.twitterHandle}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-800"
              >
                @{author.twitterHandle}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
