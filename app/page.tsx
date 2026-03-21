import Link from 'next/link';
import Button from '../components/ui/Button';
import { getBlogs } from '../services/blog';
import BlogCard from '../components/blog/BlogCard';
import ServiceStructuredData from '../components/seo/ServiceStructuredData';
import { buildMetadata, getSiteUrl } from '../lib/seo';

export const dynamic = 'force-static';

export const metadata = buildMetadata({
  title: 'Mind Care Counseling | Psychology Counseling & Support',
  description:
    'Mind Care Counseling offers personalized therapy, stress management, and mindfulness coaching to help you build resilience and emotional balance.',
  url: getSiteUrl(),
  canonicalUrl: getSiteUrl(),
  images: [{ url: '/images/seo/home-hero.jpg', alt: 'Mind Care Counseling' }],
});

export default async function HomePage() {
  const allPosts = await getBlogs();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <>
      <ServiceStructuredData baseUrl={getSiteUrl()} />
      <main className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-violet-600 to-purple-700 px-6 py-16 text-white shadow-2xl sm:py-24">
        <div className="absolute inset-0 -z-10 opacity-30 [mask-image:linear-gradient(to_bottom,rgba(255,255,255,1),rgba(255,255,255,0))]" />
        <div className="container mx-auto grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 lg:max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-100/80">Heart-centered therapy</p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Clarity, calm, and confidence through guided counseling
            </h1>
            <p className="text-lg leading-relaxed text-white/90 sm:text-xl">
              Work with a caring psychologist in Pune who helps you reduce stress, build emotional strength, and rediscover balance.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/appointments" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto">Book a Session</Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto">Talk to Us</Button>
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-white/15 px-3 py-2 text-center text-xs font-medium text-white/95">
                ⭐ 4.9 rating
              </div>
              <div className="rounded-xl bg-white/15 px-3 py-2 text-center text-xs font-medium text-white/95">
                🔒 HIPAA-aligned privacy
              </div>
              <div className="rounded-xl bg-white/15 px-3 py-2 text-center text-xs font-medium text-white/95">
                💬 500+ sessions delivered
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-cyan-400/40 blur-3xl" aria-hidden="true" />
            <div className="absolute right-0 top-10 h-48 w-48 rounded-full bg-purple-300/40 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500/80 p-6 text-center text-white">
                <p className="text-lg font-semibold sm:text-xl">
                  Illustration placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Meet your counselor</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Dr. Maya Perez is a licensed psychologist with over a decade of experience helping people in all stages of life.
              Her approach blends evidence-based therapy with practical tools you can apply between sessions.
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                Personalized treatment plans built around your goals.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                A safe, non-judgmental space to explore what matters most.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                Tools for stress, anxiety, relationships, and life transitions.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-10 shadow-sm border border-slate-200">
            <h3 className="text-2xl font-semibold text-slate-900">Our services</h3>
            <p className="mt-4 text-slate-600">
              We support individuals with a focus on practical skills and meaningful progress.
            </p>
            <div className="mt-6 grid gap-4">
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">🧘</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Individual therapy</p>
                  <p className="mt-1 text-sm text-slate-600">One-on-one support for personal growth and emotional balance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">💆</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Stress & anxiety management</p>
                  <p className="mt-1 text-sm text-slate-600">Skills and pacing to feel calmer and more in control.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">🧘‍♂️</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Mindfulness coaching</p>
                  <p className="mt-1 text-sm text-slate-600">Simple daily practices to support focus, resilience, and presence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">How it works</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            A clear path to change with supportive guidance in every step.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">1</div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Initial consultation</h3>
              <p className="mt-2 text-sm text-slate-600">We listen deeply to your goals and co-create a plan that fits your needs.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">2</div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Personalized sessions</h3>
              <p className="mt-2 text-sm text-slate-600">Weekly sessions with practical tools and gentle accountability.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">3</div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Sustained growth</h3>
              <p className="mt-2 text-sm text-slate-600">Build lasting skills so you can manage stress, build resilience, and feel more confident.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Why counseling matters</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Talking with a trained therapist gives you a dedicated space to process emotions, find clarity, and build sustainable habits.
            </p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <h3 className="text-xl font-semibold text-slate-900">Gain perspective</h3>
              <p className="mt-3 text-sm text-slate-600">
                Speak openly, reflect deeply, and discover new ways of viewing challenges.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <h3 className="text-xl font-semibold text-slate-900">Build healthy skills</h3>
              <p className="mt-3 text-sm text-slate-600">
                Learn tools for managing stress, setting boundaries, and navigating relationships.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <h3 className="text-xl font-semibold text-slate-900">Feel less alone</h3>
              <p className="mt-3 text-sm text-slate-600">
                A consistent therapeutic relationship provides support when life feels uncertain.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Ready to take the next step?</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Book a consultation call to see how counseling can support your goals, whether you’re navigating change, anxiety, or simply want more balance.
              </p>
              <Link
                href="/appointments"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
              >
                Schedule a session
              </Link>
            </div>
            <div className="rounded-2xl bg-slate-50 p-8">
              <h3 className="text-xl font-semibold text-slate-900">What to expect</h3>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                  A warm, confidential environment.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                  Practical strategies matched to your needs.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                  Tools you can use between sessions.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Latest from the blog</h2>
              <p className="mt-2 text-sm text-slate-600">
                Insights, tools, and reflections to support your mental wellness journey.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              View all posts
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Get in touch</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Have questions or want to learn more? Reach out and we’ll respond within 1 business day.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  </>
  );
}
