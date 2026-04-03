import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type BaseButtonProps = {
  variant?: 'primary' | 'secondary' | 'inverse' | 'inverseOutline' | 'whatsapp';
  className?: string;
  children: React.ReactNode;
  /** Force render as external <a> (e.g. mailto:, https://) */
  external?: boolean;
};

type ButtonAsButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsLinkProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const baseStyles =
  'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60';

const variantStyles = {
  primary:
    'bg-[var(--primary)] text-white hover:brightness-110 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--background)]',
  secondary:
    'border-2 border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary-soft)] focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--background)]',
  inverse:
    'bg-white text-[var(--foreground)] hover:bg-slate-50 focus-visible:ring-white focus-visible:ring-offset-transparent',
  inverseOutline:
    'border border-white/70 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/80 focus-visible:ring-offset-transparent',
  whatsapp:
    'bg-[#25D366] text-white hover:brightness-105 focus-visible:ring-[#128C7E] focus-visible:ring-offset-[var(--background)]',
};

function isAbsoluteUrl(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:');
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  href,
  external,
  ...rest
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant] ?? variantStyles.primary} ${className}`.trim();

  if (href) {
    const useNativeAnchor = external === true || isAbsoluteUrl(href);
    if (useNativeAnchor) {
      return (
        <a
          href={href}
          className={classes}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
