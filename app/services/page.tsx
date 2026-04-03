import Link from 'next/link';
import Button from '../../components/ui/Button';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';

const offerings = [
  {
    title: 'Individual counseling',
    body: 'One-on-one sessions for anxiety, mood, stress, grief, self-esteem, and major life changes — structured around your priorities.',
  },
  {
    title: 'Stress & emotional regulation',
    body: 'Skills for overwhelm, irritability, and burnout: grounding, mindfulness, and cognitive strategies you can use between sessions.',
  },
  {
    title: 'Relationships & communication',
    body: 'Support for couples and individuals dealing with conflict, boundaries, or life-stage shifts (where clinically appropriate).',
  },
  {
    title: 'Growth & performance',
    body: 'Focus, motivation, and confidence for study, work, or sport — without losing sight of rest and balance.',
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="border-b border-[color:var(--border)] bg-[var(--primary-soft)] py-14 md:py-20">
        <div className="container mx-auto max-w-[var(--container-max)] px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--primary)]">Services</p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-[var(--foreground)] md:text-5xl">
            How we can work together
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
            Every plan is tailored. Below is an overview of common ways we support clients — we will refine
            focus and frequency in your first conversations.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {offerings.map((item) => (
            <Card key={item.title}>
              <h2 className="font-heading text-xl font-semibold text-[var(--foreground)]">{item.title}</h2>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">{item.body}</p>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-center text-[var(--muted)]">
          Not sure where to start?{' '}
          <Link href="/contact" className="font-semibold text-[var(--primary)] underline-offset-4 hover:underline">
            Send a message
          </Link>{' '}
          or book an introductory session.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/appointments">Book a session</Button>
          <Button href="/contact" variant="secondary">
            Ask a question
          </Button>
        </div>
      </Section>
    </main>
  );
}
