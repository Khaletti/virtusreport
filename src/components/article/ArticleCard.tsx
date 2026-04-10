import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { format } from 'date-fns';

const READ_TIME: Record<string, string> = { en: 'min read', de: 'Min.', fr: 'min de lecture', es: 'min de lectura' };

export function ArticleCard({ article, lang, variant = 'default' }: { article: any; lang: string; variant?: 'default' | 'compact' }) {
  const title   = article.translations?.find((t: any) => t.language === lang)?.title   ?? article.title;
  const excerpt = article.translations?.find((t: any) => t.language === lang)?.excerpt ?? article.excerpt;
  const slug    = article.translations?.find((t: any) => t.language === lang)?.slug    ?? article.slug;
  const href    = `/${lang}/${article.category}/${slug}`;

  return (
    <article style={{ backgroundColor:'#161616', borderRadius:'8px', overflow:'hidden', border:'1px solid #1E1E1E', display:'flex', flexDirection:'column' }}>
      {article.mainImage?.asset && variant === 'default' && (
        <Link href={href} style={{ display:'block', position:'relative', aspectRatio:'16/9', overflow:'hidden' }}>
          <Image src={urlFor(article.mainImage).width(600).height(338).url()} alt={article.mainImage.alt ?? title} fill style={{ objectFit:'cover' }} />
        </Link>
      )}
      <div style={{ padding:'1.25rem', flex:1, display:'flex', flexDirection:'column', gap:'0.75rem' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <CategoryBadge category={article.category} />
          <span style={{ fontFamily:'var(--vr-font-ui)', fontSize:'0.65rem', color:'#6B6760' }}>
            {article.publishedAt && format(new Date(article.publishedAt), 'dd MMM yyyy')}
          </span>
        </div>
        <Link href={href} style={{ textDecoration:'none' }}>
          <h3 style={{ fontFamily:'var(--vr-font-display)', fontSize: variant === 'compact' ? '1rem' : '1.15rem', fontWeight:700, color:'#F5F0E8', lineHeight:1.3, letterSpacing:'-0.01em' }}>
            {title}
          </h3>
        </Link>
        {excerpt && variant === 'default' && (
          <p style={{ fontFamily:'var(--vr-font-body)', fontSize:'0.875rem', color:'#6B6760', lineHeight:1.65, flex:1, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
            {excerpt}
          </p>
        )}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto' }}>
          {article.author?.name && <span style={{ fontFamily:'var(--vr-font-ui)', fontSize:'0.7rem', color:'#6B6760' }}>{article.author.name}</span>}
          {article.readTime && <span style={{ fontFamily:'var(--vr-font-ui)', fontSize:'0.7rem', color:'#6B6760' }}>{article.readTime} {READ_TIME[lang] ?? 'min'}</span>}
        </div>
      </div>
    </article>
  );
}
