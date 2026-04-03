import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Section from '../ui/Section';
import { getWhatsAppHref } from '../../lib/site';

export default function CTASection() {
  const whatsappHref = getWhatsAppHref();

  return (
    <Section className="border-t border-[color:var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[#5c4d7a] px-8 py-14 text-center text-white shadow-[var(--shadow-md)] md:px-12">
        <Heading
          as="h2"
          align="center"
          inverted
          subtitle="Take the first step - book a session or send us a message. We respond within one business day."
        >
          Together, let's unlock sustainable calm and confidence
        </Heading>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
          <Button href="/appointments" variant="inverse">
            Book a session
          </Button>
          <Button href="/contact" variant="inverseOutline">
            Get in touch
          </Button>
          {whatsappHref ? (
            <Button href={whatsappHref} variant="whatsapp" external>
              WhatsApp
            </Button>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
