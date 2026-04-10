import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn:    process.env.NODE_ENV === 'production',
  token:     process.env.SANITY_API_READ_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── GROQ Queries ──────────────────────────────────────────────────────────

export const ARTICLE_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  category,
  publishedAt,
  excerpt,
  readTime,
  "author": author->{ name, "slug": slug.current },
  mainImage { asset, alt },
  "translations": translations[] {
    language,
    title,
    excerpt,
    "slug": slug.current
  }
`;

export const queries = {
  // All articles, newest first
  allArticles: `
    *[_type == "article"] | order(publishedAt desc) {
      ${ARTICLE_FIELDS}
    }
  `,

  // Featured article (most recent with featured flag)
  featuredArticle: `
    *[_type == "article" && featured == true] | order(publishedAt desc)[0] {
      ${ARTICLE_FIELDS},
      body
    }
  `,

  // Articles by category
  byCategory: `
    *[_type == "article" && category == $category] | order(publishedAt desc) {
      ${ARTICLE_FIELDS}
    }
  `,

  // Single article by slug
  bySlug: `
    *[_type == "article" && slug.current == $slug][0] {
      ${ARTICLE_FIELDS},
      body,
      seo
    }
  `,

  // Latest N articles
  latest: `
    *[_type == "article"] | order(publishedAt desc)[0...$limit] {
      ${ARTICLE_FIELDS}
    }
  `,
};
