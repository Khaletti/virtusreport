import { notFound } from 'next/navigation';
import { sanityClient, queries } from '@/lib/sanity';
import { Navbar }        from '@/components/layout/Navbar';
import { Footer }        from '@/components/layout/Footer';
import { ArticleGrid }   from '@/components/article/CategoryRow';
import { CategoryBadge } from '@/components/ui/CategoryBadge';

const VALID = ['football', 'basketball', 'mma'];
const LABELS: Record<string, Record<string, string>> = {
  en: { football: 'Football', basketball: 'Basketball', mma: 'MMA' },
  de: { football: 'Fussball', basketball: 'Basketball', mma: 'MMA' },
  fr: { football: 'Football', basketball: 'Basketball', mma: 'MMA' },
  es: { football: 'Fútbol',   basketball: 'Baloncesto', mma: 'MMA' },
};

export default async function CategoryPage({ params: { lang, category } }: { params: { lang: string; category: string } }) {
  if (!VALID.includes(category)) notFound();
  let articles: any[] = [];
  try { articles = await sanityClient.fetch(queries.byCategory, { category }); } catch {}

  return (
    <>
      <Navbar lang={lang} />
      <main>
        <div style={{ backgroundColor:'#161616', borderBottom:'1px solid #1E1E1E', padding:'3rem 0' }}>
          <div className="vr-container">
            <CategoryBadge category={category} />
            <h1 style={{ fontFamily:'var(--vr-font-display)', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:700, color:'#F5F0E8', letterSpacing:'-0.03em', marginTop:'1rem' }}>
              {LABELS[lang]?.[category] ?? category}
            </h1>
          </div>
        </div>
        <div className="vr-container" style={{ padding:'3rem 1.5rem' }}>
          {articles?.length > 0 ? (
            <ArticleGrid articles={articles} lang={lang} />
          ) : (
            <p style={{ color:'#6B6760', fontFamily:'var(--vr-font-ui)', textAlign:'center', padding:'4rem 0' }}>
              No articles yet — check back soon.
            </p>
          )}
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}

export function generateStaticParams() {
  return VALID.map((category) => ({ category }));
}
