import type { BlogPostSection } from '../../types/blog';

type Props = {
  sections: BlogPostSection[];
  className?: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default function BlogToc({ sections, className }: Props) {
  const headings = sections
    .filter((section) => section.type === 'heading')
    .map((heading) => ({
      ...heading,
      id: slugify(heading.text),
    }));

  if (headings.length === 0) return null;

  return (
    <nav className={className} aria-label="Table of contents">
      <h2 className="text-sm font-semibold text-slate-700">On this page</h2>
      <ol className="mt-3 space-y-2 text-sm text-slate-600">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
            <a
              href={`#${heading.id}`}
              className="hover:text-slate-900 hover:underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
