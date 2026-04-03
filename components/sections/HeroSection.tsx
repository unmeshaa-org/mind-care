import Button from '../ui/Button';
import Heading from '../ui/Heading';
import SectionContainer from '../ui/SectionContainer';
import { getWhatsAppHref } from '../../lib/site';

const heroPattern =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

export default function HeroSection() {
  const whatsappHref = getWhatsAppHref();

  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(27, 94, 74, 0.1) 0%, rgba(139, 124, 182, 0.14) 52%, rgba(27, 94, 74, 0.08) 100%), ${heroPattern}`,
        }}
        aria-hidden
      />
      <div className="relative py-16 md:py-24">
        <SectionContainer>
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
            <div className="text-center md:text-left">
            <Heading
              as="h1"
              align="left"
              eyebrow="Psychology & counseling"
              subtitle="Evidence-informed, client-centered sessions for stress, anxiety, relationships, and personal growth - with respect for your pace and story."
            >
              Clarity, calm, and confidence through guided care
            </Heading>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap md:justify-start">
              <Button href="/appointments" variant="primary">
                Book a session
              </Button>
              <Button href="/contact" variant="secondary">
                Contact us
              </Button>
              {whatsappHref ? (
                <Button href={whatsappHref} variant="whatsapp" external>
                  WhatsApp
                </Button>
              ) : null}
            </div>
            </div>
            <div className="rounded-3xl border border-[color:var(--border)] bg-[var(--surface)]/95 p-8 shadow-[var(--shadow-md)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">Our Services</p>
              <h2 className="mt-4 font-heading text-3xl text-[var(--foreground)]">A journey to a happier you</h2>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                Individual, family, and relationship counselling tailored to your life stage and goals.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-[var(--foreground)]">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
                  Anxiety, stress, and emotional resilience support
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
                  Family, parent-child, and relationship guidance
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
                  Career clarity, life transitions, and growth
                </li>
              </ul>
            </div>
          </div>
        </SectionContainer>
      </div>
    </section>
  );
}
