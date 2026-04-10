'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { VirtusLogo } from '@/components/ui/VirtusLogo';

const LABELS: Record<string, Record<string, string>> = {
  en: { football: 'Football', basketball: 'Basketball', mma: 'MMA' },
  de: { football: 'Fussball', basketball: 'Basketball', mma: 'MMA' },
  fr: { football: 'Football', basketball: 'Basketball', mma: 'MMA' },
  es: { football: 'Fútbol',   basketball: 'Baloncesto', mma: 'MMA' },
};

export function Navbar({ lang }: { lang: string }) {
  const pathname = usePathname();
  const labels = LABELS[lang] ?? LABELS.en;

  return (
    <header style={{ backgroundColor:'#0D0D0D', borderBottom:'1px solid #1E1E1E', position:'sticky', top:0, zIndex:50 }}>
      <div className="vr-container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'60px', gap:'2rem' }}>
        <Link href={`/${lang}`} style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
          <VirtusLogo size={28} />
          <span style={{ fontFamily:'var(--vr-font-display)', fontSize:'1.2rem', fontWeight:700, color:'#F5F0E8', letterSpacing:'-0.02em' }}>
            Virtus<span style={{ color:'#C8102E' }}>Report</span>
          </span>
        </Link>
        <nav style={{ display:'flex', alignItems:'center', gap:'1.75rem' }}>
          {(['football','basketball','mma'] as const).map((cat) => (
            <Link key={cat} href={`/${lang}/${cat}`} style={{ fontFamily:'var(--vr-font-ui)', fontSize:'0.75rem', fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', color: pathname.includes(`/${cat}`) ? '#F5F0E8' : '#6B6760', textDecoration:'none' }}>
              {labels[cat]}
            </Link>
          ))}
        </nav>
        <div style={{ display:'flex', gap:'0.5rem' }}>
          {['en','de','fr','es'].map((locale) => (
            <Link key={locale} href={pathname.replace(`/${lang}`, `/${locale}`)} style={{ fontFamily:'var(--vr-font-ui)', fontSize:'0.65rem', fontWeight:500, letterSpacing:'0.06em', textTransform:'uppercase', color: locale === lang ? '#C8102E' : '#6B6760', border: locale === lang ? '1px solid #C8102E' : '1px solid transparent', padding:'2px 6px', borderRadius:'3px', textDecoration:'none' }}>
              {locale}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
