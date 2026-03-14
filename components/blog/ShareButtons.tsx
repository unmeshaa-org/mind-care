import { useCallback } from 'react';

type Props = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: Props) {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(url);
  }, [url]);

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="text-slate-500">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(
          url,
        )}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm hover:bg-slate-50"
      >
        Twitter
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(
          title,
        )}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm hover:bg-slate-50"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={onCopy}
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm hover:bg-slate-50"
      >
        Copy link
      </button>
    </div>
  );
}
