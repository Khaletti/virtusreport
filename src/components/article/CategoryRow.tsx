import { ArticleCard } from './ArticleCard';

export function ArticleGrid({ articles, lang }: { articles: any[]; lang: string }) {
  if (!articles?.length) return null;
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'1.25rem' }}>
      {articles.map((a) => <ArticleCard key={a._id} article={a} lang={lang} />)}
    </div>
  );
}

export function CategoryRow({ title, articles, lang }: { title: string; articles: any[]; lang: string }) {
  if (!articles?.length) return null;
  return (
    <section style={{ marginBottom:'3rem' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem', paddingBottom:'0.75rem', borderBottom:'1px solid #1E1E1E' }}>
        <h2 style={{ fontFamily:'var(--vr-font-ui)', fontSize:'0.7rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'#6B6760' }}>{title}</h2>
        <div style={{ width:'24px', height:'1px', backgroundColor:'#C8102E' }} />
      </div>
      <ArticleGrid articles={articles} lang={lang} />
    </section>
  );
}
