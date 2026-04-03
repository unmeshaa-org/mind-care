import { serviceBullets } from '../../lib/content/home';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Section from '../ui/Section';

export default function ServicesSection() {
  return (
    <Section className="bg-[var(--primary-soft)]/60">
      <Heading
        as="h2"
        align="center"
        subtitle="Mental strength and emotional well-being matter as much as physical health. We offer a supportive, confidential space to build insight, regulation, and resilience — alongside focused work on goals that matter to you."
      >
        What we provide
      </Heading>
      <ul className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
        {serviceBullets.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-2xl border bg-[var(--surface)] px-5 py-5 text-[var(--foreground)] shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
            style={{ borderColor: 'var(--border)' }}
          >
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-12 text-center">
        <Button href="/services">Explore services</Button>
      </div>
    </Section>
  );
}
