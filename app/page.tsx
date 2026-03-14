import Link from 'next/link';
import { getBlogs } from '../services/blog';
import BlogCard from '../components/blog/BlogCard';
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
    <main className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-sky-600 to-emerald-500 px-6 py-16 text-white shadow-lg">
        <div className="container mx-auto flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Psychology Counseling That Meets You Where You Are
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/85">
              Personalized support to help you manage stress, build resilience, and move forward with confidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/appointments"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
              >
                Book an appointment
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/20"
              >
                Read our latest posts
              </Link>
            </div>
          </div>
          <div className="max-w-lg">
            <div className="relative overflow-hidden rounded-3xl bg-white/10 p-6 backdrop-blur">
              <p className="text-sm text-white/80">
                “Taking the first step is often the hardest part. We’re here to make it easier — one conversation at a time.”
              </p>
              <p className="mt-4 text-sm font-semibold text-white">— Dr. Maya Perez</p>
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
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                Personalized treatment plans built around your goals.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                A safe, non-judgmental space to explore what matters most.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                Tools for stress, anxiety, relationships, and life transitions.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl bg-slate-50 p-10 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">Our services</h3>
            <p className="mt-4 text-slate-600">
              We support individuals with a focus on practical skills and meaningful progress.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold text-slate-900">Individual therapy</p>
                <p className="mt-1 text-sm text-slate-600">One-on-one support for personal growth and emotional balance.</p>
              </li>
              <li className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold text-slate-900">Stress & anxiety management</p>
                <p className="mt-1 text-sm text-slate-600">Skills and pacing to feel calmer and more in control.</p>
              </li>
              <li className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold text-slate-900">Mindfulness coaching</p>
                <p className="mt-1 text-sm text-slate-600">Simple daily practices to support focus, resilience, and presence.</p>
              </li>
            </ul>
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
  );
}
