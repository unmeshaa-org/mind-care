import React from 'react';
import { buildBreadcrumbSchema } from '../../lib/seo';

export type BreadcrumbItem = {
  name: string;
  url: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumbs({ items, className }: Props) {
  if (items.length === 0) return null;

  const schema = buildBreadcrumbSchema(items);

  return (
    <nav className={className} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        {items.map((item, index) => (
          <li key={item.url} className="inline-flex items-center gap-2">
            <a href={item.url} className="hover:text-slate-900 hover:underline">
              {item.name}
            </a>
            {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </nav>
  );
}
