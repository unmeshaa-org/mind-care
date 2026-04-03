import { Quote } from 'lucide-react';
import { testimonials } from '../../lib/content/home';
import Heading from '../ui/Heading';
import Section from '../ui/Section';

export default function TestimonialsSection() {
  return (
    <Section className="bg-[var(--primary-soft)]">
      <Heading as="h2" align="center" subtitle="Reflections from people we have had the privilege to support.">
        Testimonials
      </Heading>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {testimonials.map(({ quote, name }) => (
          <figure
            key={name}
            className="relative rounded-2xl border bg-[var(--surface)] p-8 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
            style={{ borderColor: 'var(--border)' }}
          >
            <Quote
              className="absolute right-6 top-6 h-10 w-10 text-[var(--primary-soft-strong)]"
              strokeWidth={1}
              aria-hidden
            />
            <blockquote className="relative text-lg leading-relaxed text-[var(--foreground)]">&ldquo;{quote}&rdquo;</blockquote>
            <figcaption className="mt-6 text-sm font-medium text-[var(--primary)]">— {name}</figcaption>
            <div className="mt-3 flex gap-1 text-amber-500" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} aria-hidden>
                  ★
                </span>
              ))}
            </div>
          </figure>
        ))}
      </div>
    </Section>
  );
}
