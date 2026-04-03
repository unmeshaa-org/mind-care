import type { HTMLAttributes, ReactNode } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export default function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] ${className}`}
      style={{ borderColor: 'var(--border)' }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 [&_svg]:h-9 [&_svg]:w-9 [&_svg]:shrink-0 [&_svg]:text-[var(--primary)] ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h3 className={`font-heading text-xl font-semibold text-[var(--foreground)] ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm leading-relaxed text-[var(--muted)] ${className}`}>{children}</p>;
}
