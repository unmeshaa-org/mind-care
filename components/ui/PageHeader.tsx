'use client';

import Heading from './Heading';
import SectionContainer from './SectionContainer';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export default function PageHeader({ eyebrow, title, description, className = '' }: PageHeaderProps) {
  return (
    <section
      className={`border-b border-[color:var(--border)] bg-[var(--primary-soft)] py-14 md:py-20 ${className}`.trim()}
    >
      <SectionContainer>
        <Heading as="h1" eyebrow={eyebrow} subtitle={description}>
          {title}
        </Heading>
      </SectionContainer>
    </section>
  );
}
