import { useTranslations } from 'next-intl';
import { notFound }         from 'next/navigation';
import { sanityClient, queries } from '@/lib/sanity';
import { Navbar }     from '@/components/layout/Navbar';
import { Footer }     from '@/components/layout/Footer';
import { ArticleGrid }  from '@/components/article/ArticleGrid';
import { CategoryBadge } from '@/components/ui/CategoryBadge';

const VALID_CATEGORIES = ['football', 'basketball', 'mma'];

export default async function CategoryPage({
  params: { lang, category },
}: {
  params: { lang: string; category: string };
}) {
  if (!VALID_CATEGORIES.includes(category)) notFound();

  const articles = await sanityClient.fetch(queries.byCategory, { category });
  const t = useTranslations();

  return (
    <>
      <Navbar lang={lang} />
      <main>
        <div style={{
          backgroundColor: 'var(--vr-onyx)',
          borderBottom:    '1px solid var(--vr-carbon)',
          padding:         '3rem 0',
        }}>
          <div className="vr-container">
            <CategoryBadge category={category} />
            <h1 style={{
              fontFamily:    'var(--vr-font-display)',
              fontSize:      'clamp(2rem, 5vw, 3.5rem)',
              fontWeight:    700,
              color:         'var(--vr-parchment)',
              letterSpacing: '-0.03em',
              marginTop:     '1rem',
            }}>
              {t(`categories.${category}`)}
            </h1>
          </div>
        </div>

        <div className="vr-container" style={{ padding: '3rem 1.5rem' }}>
          {articles?.length > 0 ? (
            <ArticleGrid articles={articles} lang={lang} />
          ) : (
            <p style={{ color: 'var(--vr-steel)', fontFamily: 'var(--vr-font-ui)', textAlign: 'center', padding: '4rem 0' }}>
              No articles yet — check back soon.
            </p>
          )}
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((cat) => ({ category: cat }));
}
