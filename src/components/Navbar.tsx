'use client';

import Link from 'next/link';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { Download } from 'lucide-react';

export default function Navbar() {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="navbar" style={{ padding: 0 }}>
                <div style={{ background: 'black', color: 'white', textAlign: 'center', padding: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
                    🚚 {t('hero.shipping')}
                </div>
                <div className="container flex justify-between items-center" style={{ padding: '1rem' }}>
                    <Link href="/" className="flex items-center gap-2">
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--secondary)', textDecoration: 'underline' }}>
                            {t('hero.title')}
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 md:gap-4">
                        <Link href="/shop" className="nav-link">{t('nav.shop')}</Link>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="nav-link"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                        >
                            {t('nav.menu')}
                        </button>
                        <Link href="/#about" className="nav-link">{t('nav.about')}</Link>
                        <Link href="/#contact" className="nav-link">{t('nav.contact')}</Link>
                        <LanguageSelector />
                    </div>
                </div>
            </nav>

            {/* Menu Modal */}
            {isMenuOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    backdropFilter: 'blur(5px)'
                }} onClick={() => setIsMenuOpen(false)}>
                    <div style={{
                        background: 'white',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        maxWidth: '90vh', // Constrain by height to fit image better
                        maxHeight: '90vh',
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column'
                    }} onClick={e => e.stopPropagation()}>

                        {/* Header */}
                        <div style={{
                            padding: '1rem',
                            borderBottom: '1px solid #eee',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h3 style={{ margin: 0, color: 'var(--primary)' }}>{t('nav.menu')}</h3>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#666' }}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Image Container */}
                        <div style={{
                            flex: 1,
                            overflow: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            background: '#f9f9f9',
                            padding: '1rem'
                        }}>
                            <img
                                src="/images/menu-card.jpg"
                                alt="Godavari Pickles Menu"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}
                            />
                        </div>

                        {/* Footer with Download */}
                        <div style={{
                            padding: '1rem',
                            borderTop: '1px solid #eee',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <a
                                href="/images/menu-card.jpg"
                                download="Godavari-Pickles-Menu.jpg"
                                className="btn btn-primary"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <Download size={20} /> Download Menu
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
