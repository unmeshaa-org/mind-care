import { workRealms } from '../../lib/content/home';
import Card from '../ui/Card';
import Heading from '../ui/Heading';
import Section from '../ui/Section';

export default function FocusAreasSection() {
  return (
    <Section className="bg-[var(--surface)]">
      <Heading as="h2" align="center" subtitle="A snapshot of themes we often work with — always adapted to you.">
        Areas of focus
      </Heading>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workRealms.map(({ title, text }) => (
          <Card key={title}>
            <h3 className="font-heading text-xl font-semibold text-[var(--foreground)]">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
