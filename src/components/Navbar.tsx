'use client';

import Link from 'next/link';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="navbar" style={{ padding: 0 }}>
      <div style={{ background: 'black', color: 'white', textAlign: 'center', padding: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
        🚚 {t('hero.shipping')}
      </div>
      <div className="container flex justify-between items-center" style={{ padding: '1rem' }}>
        <Link href="/" className="flex items-center gap-2">
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)', textDecoration: 'underline' }}>
            {t('hero.title')}
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/shop" className="nav-link">{t('nav.shop')}</Link>
          <Link href="/#about" className="nav-link">{t('nav.about')}</Link>
          <Link href="/#contact" className="nav-link">{t('nav.contact')}</Link>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
}
