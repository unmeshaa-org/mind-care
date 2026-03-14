import type { BlogPostSection } from '../../types/blog';

type Props = {
  sections: BlogPostSection[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default function BlogContent({ sections }: Props) {
  return (
    <article className="prose prose-slate max-w-none">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'heading':
            if (section.level === 2) {
              return (
                <h2 key={index} id={slugify(section.text)}>
                  {section.text}
                </h2>
              );
            }
            return (
              <h3 key={index} id={slugify(section.text)}>
                {section.text}
              </h3>
            );
          case 'paragraph':
            return <p key={index}>{section.text}</p>;
          case 'list':
            return (
              <ul key={index} className="list-disc pl-6">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case 'blockquote':
            return (
              <blockquote key={index} className="border-l-4 border-slate-200 pl-4 italic text-slate-600">
                {section.text}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </article>
  );
}
