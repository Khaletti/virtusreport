import { sanityClient, queries } from '@/lib/sanity';
import { Navbar }      from '@/components/layout/Navbar';
import { Footer }      from '@/components/layout/Footer';
import { HeroArticle } from '@/components/article/HeroArticle';
import { CategoryRow } from '@/components/article/CategoryRow';

export default async function HomePage({ params: { lang } }: { params: { lang: string } }) {
  let featured = null;
  let latest: any[] = [];
  try {
    [featured, latest] = await Promise.all([
      sanityClient.fetch(queries.featuredArticle),
      sanityClient.fetch(queries.latest, { limit: 9 }),
    ]);
  } catch {}

  return (
    <>
      <Navbar lang={lang} />
      <main>
        {featured && <HeroArticle article={featured} lang={lang} />}
        <div className="vr-container" style={{ padding: '3rem 1.5rem' }}>
          <CategoryRow title="Latest" articles={latest ?? []} lang={lang} />
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
