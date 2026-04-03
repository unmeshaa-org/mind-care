import Link from 'next/link';
import Button from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
import Section from '../../components/ui/Section';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About us"
        title="About Mind Care Counseling"
        description="A private psychology practice focused on compassionate, evidence-informed care for real life — stress, transitions, relationships, and the wish to feel more like yourself again."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-[var(--muted)]">
          <p>
            Mind Care Counseling supports individuals navigating life transitions, stress, and emotional
            challenges. Our work is grounded in established therapeutic approaches and a collaborative style:
            you are the expert on your life, and we bring clinical training, careful listening, and practical
            tools.
          </p>
          <p>
            Sessions move at a pace that respects your history and goals. Whether you are looking for short-term
            skills or longer exploratory work, we will clarify expectations together from the start.
          </p>
          <p>
            If you are unsure whether counseling is the right fit, you are welcome to reach out — we are happy
            to answer questions and, when needed, suggest other resources.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/appointments">Book a session</Button>
          <Button href="/services" variant="secondary">
            View services
          </Button>
          <Link
            href="/contact"
            className="inline-flex items-center px-2 text-sm font-semibold text-[var(--primary)] underline-offset-4 hover:underline"
          >
            Contact us
          </Link>
        </div>
      </Section>
    </main>
  );
}
