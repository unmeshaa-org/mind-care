import ServiceStructuredData from '../components/seo/ServiceStructuredData';
import HeroSection from '../components/sections/HeroSection';
import AudienceSection from '../components/sections/AudienceSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import FocusAreasSection from '../components/sections/FocusAreasSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import BlogPreviewSection from '../components/sections/BlogPreviewSection';
import CTASection from '../components/sections/CTASection';
import { getBlogs } from '../services/blog';
import { buildMetadata, getSiteUrl } from '../lib/seo';

export const dynamic = 'force-static';

export const metadata = buildMetadata({
  title: 'Mind Care Counseling | Psychology Counseling & Support',
  description:
    'Mind Care Counseling offers personalized therapy, stress management, and mindfulness coaching.',
  url: getSiteUrl(),
  canonicalUrl: getSiteUrl(),
});

export default async function HomePage() {
  const allPosts = await getBlogs();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <>
      <ServiceStructuredData baseUrl={getSiteUrl()} />

      <HeroSection />
      <AudienceSection />
      <AboutSection />
      <ServicesSection />
      <FocusAreasSection />
      <TestimonialsSection />
      <BlogPreviewSection posts={latestPosts} />
      <CTASection />
    </>
  );
}
