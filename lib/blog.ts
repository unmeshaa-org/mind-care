import type { BlogPost } from '../types/blog';

const author = {
  name: 'Chetana Adawadkar',
  bio: 'Clinical psychologist specializing in cognitive-behavioral therapy and mindfulness-based approaches. Passionate about helping clients build resilience and find balance.',
};

const posts: BlogPost[] = [
  {
    title: '5 Signs You Might Benefit from Counseling',
    slug: 'signs-you-might-benefit-from-counseling',
    coverImage: '/images/blog/counseling-signs.jpg',
    metaDescription:
      'Learn the common emotional and behavioral signs that indicate it may be time to seek professional counseling.',
    publishDate: '2026-02-18',
    author,
    tags: ['mental health', 'self-care', 'counseling'],
    content: [
      { type: 'heading', level: 2, text: 'How to Know When it’s Time' },
      {
        type: 'paragraph',
        text: 'Many people hesitate to seek counseling until a crisis. The truth is that early support can prevent stress and anxiety from becoming overwhelming.',
      },
      {
        type: 'list',
        items: [
          'Persistent feelings of sadness or hopelessness',
          'Difficulty sleeping or concentrating',
          'Increased irritability or anger',
          'Avoidance of people or activities you used to enjoy',
          'Feeling stuck in patterns that no longer serve you',
        ],
      },
      { type: 'heading', level: 2, text: 'What to Expect' },
      {
        type: 'paragraph',
        text: 'Counseling is a collaborative process. In the first sessions, we explore your goals, build trust, and design a plan that feels safe and individualized.',
      },
      {
        type: 'blockquote',
        text: 'Reaching out is a sign of strength, not weakness.',
      },
      { type: 'heading', level: 2, text: 'Next Steps' },
      {
        type: 'paragraph',
        text: 'If you recognize any of these signs in yourself, consider scheduling a free consultation to learn more about how therapy can support you.',
      },
    ],
  },
  {
    title: 'How Mindfulness Helps Reduce Stress',
    slug: 'how-mindfulness-helps-reduce-stress',
    coverImage: '/images/blog/mindfulness-stress.jpg',
    metaDescription:
      'Discover simple mindfulness tools that help reduce stress, improve focus, and support emotional balance.',
    publishDate: '2026-01-10',
    author,
    tags: ['mindfulness', 'stress management', 'wellbeing'],
    content: [
      { type: 'heading', level: 2, text: 'What is Mindfulness?' },
      {
        type: 'paragraph',
        text: 'Mindfulness means paying attention to what is happening right now, without judgment. It can be practiced through breathing, body awareness, and gentle curiosity.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Simple Mindfulness Exercises',
      },
      {
        type: 'list',
        items: [
          '5–4–3–2–1 grounding exercise to return to the present',
          'Brief mindful breathing break during work',
          'Mindful walking to reconnect with your body',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Why It Works',
      },
      {
        type: 'paragraph',
        text: 'Mindfulness supports emotion regulation by giving you space to observe thoughts and feelings, rather than reacting automatically.',
      },
      {
        type: 'blockquote',
        text: 'You can’t stop the waves, but you can learn to surf.',
      },
    ],
  },
];

export function getAllPosts() {
  return posts.sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, max = 3) {
  const post = getPostBySlug(slug);
  if (!post) return [];

  const sharedTagScore = (other: typeof post) => {
    const shared = (other.tags || []).filter((tag) => post.tags?.includes(tag)).length;
    return shared;
  };

  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const scoreDiff = sharedTagScore(b) - sharedTagScore(a);
      if (scoreDiff !== 0) return scoreDiff;
      return a.publishDate < b.publishDate ? 1 : -1;
    })
    .slice(0, max);
}

export function estimateReadingTime(post: BlogPost) {
  const text = post.content
    .map((section) => {
      if (section.type === 'list') return section.items.join(' ');
      return section.text;
    })
    .join(' ');

  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
