import { notFound }    from 'next/navigation';
import Image            from 'next/image';
import { PortableText } from '@portabletext/react';
import { sanityClient, queries, urlFor } from '@/lib/sanity';
import { Navbar }        from '@/components/layout/Navbar';
import { Footer }        from '@/components/layout/Footer';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { format }        from 'date-fns';
import type { Metadata } from 'next';

export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: string; category: string; slug: string };
}): Promise<Metadata> {
  const article = await sanityClient.fetch(queries.bySlug, { slug });
  if (!article) return {};

  const title   = article.translations?.find((t: any) => t.language === lang)?.title   ?? article.title;
  const excerpt = article.translations?.find((t: any) => t.language === lang)?.excerpt ?? article.excerpt;

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      images: article.mainImage?.asset
        ? [{ url: urlFor(article.mainImage).width(1200).height(630).url() }]
        : [],
    },
  };
}

export default async function ArticlePage({
  params: { lang, category, slug },
}: {
  params: { lang: string; category: string; slug: string };
}) {
  const article = await sanityClient.fetch(queries.bySlug, { slug });
  if (!article) notFound();

  const title   = article.translations?.find((t: any) => t.language === lang)?.title   ?? article.title;
  const body    = article.translations?.find((t: any) => t.language === lang)?.body     ?? article.body;

  const ptComponents = {
    types: {
      image: ({ value }: any) => (
        <figure style={{ margin: '2rem 0' }}>
          <Image
            src={urlFor(value).width(900).url()}
            alt={value.alt ?? ''}
            width={900}
            height={506}
            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
          />
          {value.alt && (
            <figcaption style={{ fontFamily: 'var(--vr-font-ui)', fontSize: '0.75rem', color: 'var(--vr-steel)', marginTop: '0.5rem', textAlign: 'center' }}>
              {value.alt}
            </figcaption>
          )}
        </figure>
      ),
    },
  };

  return (
    <>
      <Navbar lang={lang} />
      <main>
        {/* Header */}
        <div style={{ backgroundColor: 'var(--vr-onyx)', borderBottom: '1px solid var(--vr-carbon)', padding: '3rem 0' }}>
          <div className="vr-container" style={{ maxWidth: '760px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <CategoryBadge category={article.category} />
              {article.publishedAt && (
                <span style={{ fontFamily: 'var(--vr-font-ui)', fontSize: '0.7rem', color: 'var(--vr-steel)' }}>
                  {format(new Date(article.publishedAt), 'dd MMMM yyyy')}
                </span>
              )}
              {article.readTime && (
                <span style={{ fontFamily: 'var(--vr-font-ui)', fontSize: '0.7rem', color: 'var(--vr-steel)' }}>
                  · {article.readTime} min
                </span>
              )}
            </div>

            <div className="vr-accent-line">
              <h1 style={{
                fontFamily:    'var(--vr-font-display)',
                fontSize:      'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight:    700,
                color:         'var(--vr-parchment)',
                lineHeight:    1.2,
                letterSpacing: '-0.02em',
              }}>
                {title}
              </h1>
            </div>

            {article.author?.name && (
              <p style={{ fontFamily: 'var(--vr-font-ui)', fontSize: '0.8rem', color: 'var(--vr-steel)', marginTop: '1.25rem' }}>
                By {article.author.name}
              </p>
            )}
          </div>
        </div>

        {/* Main image */}
        {article.mainImage?.asset && (
          <div style={{ position: 'relative', maxHeight: '500px', overflow: 'hidden' }}>
            <Image
              src={urlFor(article.mainImage).width(1200).height(630).url()}
              alt={article.mainImage.alt ?? title}
              width={1200}
              height={630}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </div>
        )}

        {/* Body */}
        <div className="vr-container" style={{ maxWidth: '760px', padding: '3rem 1.5rem' }}>
          <div className="vr-article-body">
            {body && <PortableText value={body} components={ptComponents} />}
          </div>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
