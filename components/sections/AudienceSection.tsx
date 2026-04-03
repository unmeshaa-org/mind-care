import { benefitItems } from '../../lib/content/home';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Heading from '../ui/Heading';
import Section from '../ui/Section';

export default function AudienceSection() {
  return (
    <Section id="benefits" className="bg-[var(--surface)]">
      <Heading
        as="h2"
        align="center"
        subtitle="Support tailored to your context — from everyday stress to deeper change."
      >
        Who can benefit?
      </Heading>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefitItems.map(({ title, text, icon: Icon }) => (
          <Card key={title} className="border-[color:var(--border)] shadow-[var(--shadow-sm)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
            <CardHeader>
              <Icon strokeWidth={1.5} aria-hidden />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Section>
  );
}
