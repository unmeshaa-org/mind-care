import { Brain } from 'lucide-react';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Section from '../ui/Section';

export default function AboutSection() {
  return (
    <Section className="bg-[var(--primary-soft)]">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Heading
            as="h2"
            eyebrow="About Mind Care"
            subtitle={
              <>
                <span className="block">
                  Mind Care Counseling offers thoughtful psychological support grounded in research and human warmth. We
                  work with adults and young people navigating anxiety, low mood, life transitions, relationship strain,
                  and the pressure to &ldquo;have it all together.&rdquo;
                </span>
                <span className="mt-4 block">
                  Our approach is collaborative: you set the direction, and we bring clinical skill, practical tools, and
                  steady encouragement.
                </span>
              </>
            }
          >
            Welcome — we are glad you are here
          </Heading>
          <Button href="/about" variant="secondary" className="mt-8">
            Read more about us
          </Button>
        </div>
        <div
          className="relative min-h-[280px] overflow-hidden rounded-2xl border shadow-[var(--shadow-md)] lg:min-h-[360px]"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
        >
          <div className="absolute inset-0 flex flex-col justify-center gap-4 p-10">
            <div className="flex items-center gap-3 text-[var(--primary)]">
              <Brain className="h-10 w-10 shrink-0" strokeWidth={1.25} aria-hidden />
              <span className="font-heading text-2xl font-semibold text-[var(--foreground)]">Holistic & practical</span>
            </div>
            <p className="leading-relaxed text-[var(--muted)]">
              We balance depth of understanding with skills you can use between sessions — so progress continues in real
              life, not only in the therapy room.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
