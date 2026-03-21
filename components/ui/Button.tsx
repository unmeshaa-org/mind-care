import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type BaseButtonProps = {
  variant?: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsLinkProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const baseStyles = 'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
const variantStyles = {
  primary: 'bg-white text-slate-900 hover:bg-slate-100 focus-visible:ring-white/70',
  secondary: 'border border-white/60 bg-white/20 text-white hover:bg-white/30 focus-visible:ring-white/70',
};

export default function Button({ variant = 'primary', className = '', children, href, ...rest }: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant] ?? variantStyles.primary} ${className}`.trim();

  if (href) {
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
