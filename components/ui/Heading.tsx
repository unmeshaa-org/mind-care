import type { ReactNode } from 'react';

type Level = 'h1' | 'h2' | 'h3';

const levelStyles: Record<Level, string> = {
  h1: 'text-4xl font-bold leading-tight sm:text-5xl md:text-6xl',
  h2: 'text-3xl font-semibold leading-tight sm:text-4xl',
  h3: 'text-xl font-semibold leading-snug sm:text-2xl',
};

type HeadingProps = {
  as: Level;
  children: ReactNode;
  className?: string;
  eyebrow?: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center' | 'right';
  /** Light text on dark backgrounds (e.g. hero) */
  inverted?: boolean;
};

export default function Heading({
  as,
  children,
  className = '',
  eyebrow,
  subtitle,
  align = 'left',
  inverted = false,
}: HeadingProps) {
  const Tag = as;
  const alignClass =
    align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

  const subtitleWidth =
    align === 'center' ? 'mx-auto max-w-3xl' : as === 'h1' ? 'max-w-3xl' : 'max-w-2xl';

  const eyebrowTone = inverted ? 'text-sky-100/90' : 'text-[var(--primary)]';
  const titleTone = inverted ? 'text-white' : 'text-[var(--foreground)]';
  const subtitleTone = inverted ? 'text-slate-100/95' : 'text-[var(--muted)]';

  return (
    <div className={alignClass}>
      {eyebrow != null && eyebrow !== false && (
        <p className={`text-sm font-semibold uppercase tracking-widest ${eyebrowTone}`}>{eyebrow}</p>
      )}
      <Tag
        className={`font-heading ${titleTone} ${levelStyles[as]} ${eyebrow ? 'mt-3' : ''} ${className}`.trim()}
      >
        {children}
      </Tag>
      {subtitle != null && subtitle !== false && (
        <p className={`mt-4 text-lg leading-relaxed ${subtitleTone} md:text-xl ${subtitleWidth}`.trim()}>{subtitle}</p>
      )}
    </div>
  );
}
