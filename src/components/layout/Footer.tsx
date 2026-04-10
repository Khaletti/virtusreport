import Link from 'next/link';
import { VirtusLogo } from '@/components/ui/VirtusLogo';

export function Footer({ lang }: { lang: string }) {
  return (
    <footer style={{ backgroundColor:'#161616', borderTop:'1px solid #1E1E1E', marginTop:'4rem', padding:'3rem 0 2rem' }}>
      <div className="vr-container">
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'0.75rem' }}>
          <VirtusLogo size={24} />
          <span style={{ fontFamily:'var(--vr-font-display)', fontSize:'1.1rem', fontWeight:700, color:'#F5F0E8', letterSpacing:'-0.02em' }}>
            Virtus<span style={{ color:'#C8102E' }}>Report</span>
          </span>
        </div>
        <p style={{ fontFamily:'var(--vr-font-ui)', fontSize:'0.8rem', color:'#6B6760', fontStyle:'italic', marginBottom:'2rem' }}>Beyond the final score.</p>
        <div style={{ borderTop:'1px solid #1E1E1E', paddingTop:'1.5rem', display:'flex', justifyContent:'space-between' }}>
          <p style={{ fontFamily:'var(--vr-font-ui)', fontSize:'0.7rem', color:'#6B6760' }}>© {new Date().getFullYear()} VirtusReport.</p>
          <p style={{ fontFamily:'var(--vr-font-ui)', fontSize:'0.65rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#1E1E1E' }}>Virtus in certamine</p>
        </div>
      </div>
    </footer>
  );
}
