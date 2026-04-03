import type { HTMLAttributes, ReactNode } from 'react';
import SectionContainer from './SectionContainer';

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'id' | 'children'>;

export default function Section({ children, className = '', id, ...rest }: SectionProps) {
  return (
    <section id={id} className={`py-[var(--section-py)] md:py-[calc(var(--section-py)+1.25rem)] ${className}`.trim()} {...rest}>
      <SectionContainer>{children}</SectionContainer>
    </section>
  );
}
