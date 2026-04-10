import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { format } from 'date-fns';

export function HeroArticle({ article, lang }: { article: any; lang: string }) {
  const title   = article.translations?.find((t: any) => t.language === lang)?.title   ?? article.title;
  const excerpt = article.translations?.find((t: any) => t.language === lang)?.excerpt ?? article.excerpt;
  const slug    = article.translations?.find((t: any) => t.language === lang)?.slug    ?? article.slug;

  return (
    <section style={{ borderBottom:'1px solid #1E1E1E', backgroundColor:'#161616' }}>
      <div className="vr-container">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'480px' }}>
          <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'3rem 3rem 3rem 0', borderRight:'1px solid #1E1E1E' }}>
            <div style={{ marginBottom:'1rem', display:'flex', gap:'0.75rem', alignItems:'center' }}>
              <CategoryBadge category={article.category} />
              <span style={{ fontFamily:'var(--vr-font-ui)', fontSize:'0.7rem', color:'#6B6760' }}>
                {article.publishedAt && format(new Date(article.publishedAt), 'dd MMM yyyy')}
              </span>
            </div>
            <div style={{ borderLeft:'3px solid #C8102E', paddingLeft:'1rem', marginBottom:'1.5rem' }}>
              <Link href={`/${lang}/${article.category}/${slug}`} style={{ textDecoration:'none' }}>
                <h1 style={{ fontFamily:'var(--vr-font-display)', fontSize:'clamp(1.75rem,3vw,2.5rem)', fontWeight:700, color:'#F5F0E8', lineHeight:1.2, letterSpacing:'-0.02em' }}>
                  {title}
                </h1>
              </Link>
            </div>
            {excerpt && <p style={{ fontFamily:'var(--vr-font-body)', fontSize:'1rem', lineHeight:1.7, color:'#6B6760', marginBottom:'2rem' }}>{excerpt}</p>}
            <Link href={`/${lang}/${article.category}/${slug}`} style={{ fontFamily:'var(--vr-font-ui)', fontSize:'0.75rem', fontWeight:500, color:'#C8102E', textDecoration:'none', borderBottom:'1px solid #C8102E', paddingBottom:'1px', alignSelf:'flex-start' }}>
              Read →
            </Link>
          </div>
          <div style={{ position:'relative', minHeight:'400px' }}>
            {article.mainImage?.asset ? (
              <Image src={urlFor(article.mainImage).width(800).height(600).url()} alt={article.mainImage.alt ?? title} fill style={{ objectFit:'cover' }} priority />
            ) : (
              <div style={{ width:'100%', height:'100%', backgroundColor:'#1E1E1E', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ color:'#6B6760', fontFamily:'var(--vr-font-ui)', fontSize:'0.8rem' }}>No image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
