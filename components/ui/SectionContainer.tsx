import type { HTMLAttributes, ReactNode } from 'react';

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>;

export default function SectionContainer({ children, className = '', ...rest }: SectionContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[var(--container-max)] px-4 ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
