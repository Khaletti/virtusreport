import type { Metadata } from 'next';
import { Playfair_Display, Lora, DM_Sans } from 'next/font/google';
import '@/styles/globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
const lora     = Lora({             subsets: ['latin'], variable: '--font-lora',     display: 'swap' });
const dmSans   = DM_Sans({          subsets: ['latin'], variable: '--font-dm-sans',  display: 'swap' });

export const metadata: Metadata = {
  title: 'VirtusReport — Sport · Stories · Analysis',
  description: 'Beyond the final score.',
};

export default function RootLayout({ children, params: { lang } }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={lang} className={`${playfair.variable} ${lora.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
