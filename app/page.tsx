import Link from "next/link";
import { Brain, ShieldCheck, UserCheck } from "lucide-react";
import Button from "../components/ui/Button";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";
import Section from "../components/ui/Section";
import { getBlogs } from "../services/blog";
import BlogCard from "../components/blog/BlogCard";
import ServiceStructuredData from "../components/seo/ServiceStructuredData";
import { buildMetadata, getSiteUrl } from "../lib/seo";

export const dynamic = "force-static";

export const metadata = buildMetadata({
  title: "Mind Care Counseling | Psychology Counseling & Support",
  description:
    "Mind Care Counseling offers personalized therapy, stress management, and mindfulness coaching.",
  url: getSiteUrl(),
  canonicalUrl: getSiteUrl(),
});

export default async function HomePage() {
  const allPosts = await getBlogs();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <>
      <ServiceStructuredData baseUrl={getSiteUrl()} />

      <main>

        {/* HERO */}
        <Section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-600 to-purple-700 text-white">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div className="space-y-6">
              <p className="text-sm uppercase tracking-widest text-cyan-100">
                Heart-centered therapy
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                Clarity, calm, and confidence through guided counseling
              </h1>

              <p className="text-lg text-white/90">
                Work with a caring psychologist who helps you reduce stress,
                build emotional strength, and rediscover balance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/appointments">
                  <Button className="w-full sm:w-auto">Book a Session</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary">Talk to Us</Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-white/10 rounded-xl py-2">⭐ 4.9 rating</div>
                <div className="bg-white/10 rounded-xl py-2">🔒 Privacy</div>
                <div className="bg-white/10 rounded-xl py-2">💬 500+ sessions</div>
              </div>
            </div>

            <div className="relative">
              <div className="h-72 rounded-2xl bg-white/10 flex items-center justify-center">
                Illustration
              </div>
            </div>

          </div>
        </Section>

        {/* SERVICES */}
        <Section className="bg-slate-50">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold">Our Services</h2>
            <p className="text-slate-600 mt-2">
              Designed for sustainable mental wellness
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <UserCheck />
                <CardTitle>Individual Therapy</CardTitle>
                <CardDescription>
                  One-on-one sessions tailored to your growth.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <ShieldCheck />
                <CardTitle>Stress & Anxiety</CardTitle>
                <CardDescription>
                  Practical techniques to manage stress.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Brain />
                <CardTitle>Mindfulness</CardTitle>
                <CardDescription>
                  Build awareness and emotional balance.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </Section>

        {/* HOW IT WORKS */}
        <Section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold">How it works</h2>
            <p className="text-slate-600 mt-2">
              A simple 3-step process
            </p>
          </div>

          <div className="space-y-10 max-w-3xl mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex gap-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-xl">
                    {step === 1 && "Initial consultation"}
                    {step === 2 && "Personalized sessions"}
                    {step === 3 && "Sustained growth"}
                  </h3>
                  <p className="text-slate-600 mt-2">
                    Guided support tailored to your journey.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* WHY */}
        <Section className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold">Why counseling matters</h2>
            <p className="mt-4 text-slate-600">
              Gain clarity, resilience, and emotional strength.
            </p>
          </div>
        </Section>

        {/* CTA */}
        <Section className="bg-slate-50">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-semibold">
              Ready to take the next step?
            </h2>
            <Link href="/appointments">
              <Button>Book a Session</Button>
            </Link>
          </div>
        </Section>

        {/* BLOG */}
        <Section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">Latest Blogs</h2>
            <Link href="/blog">View all</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section className="bg-slate-50">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Get in touch</h2>
            <p className="mt-3 text-slate-600">
              We respond within 1 business day.
            </p>

            <Link href="/contact">
              <Button className="mt-6">Contact Us</Button>
            </Link>
          </div>
        </Section>

      </main>
    </>
  );
}