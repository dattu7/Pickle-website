'use client';

import Link from 'next/link';
import Image from 'next/image';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import { Download, Menu as MenuIcon, X } from 'lucide-react';

export default function Navbar() {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    // Prevent scrolling when mobile nav is open
    useEffect(() => {
        if (isMobileNavOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isMobileNavOpen]);

    return (
        <>
            <style>{`
                .desktop-nav {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }
                .mobile-toggle-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    z-index: 50;
                }
                .mobile-nav-backdrop {
                    display: none;
                }
                .mobile-nav-drawer {
                    display: none;
                }
                
                @media (max-width: 850px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    .mobile-toggle-btn {
                        display: block;
                    }
                    .mobile-nav-backdrop {
                        display: block;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                        background: rgba(0, 0, 0, 0.5);
                        backdrop-filter: blur(3px);
                        z-index: 60;
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.3s ease;
                    }
                    .mobile-nav-backdrop.open {
                        opacity: 1;
                        visibility: visible;
                    }
                    .mobile-nav-drawer {
                        display: flex;
                        flex-direction: column;
                        position: fixed;
                        top: 0;
                        right: 0;
                        width: 70vw;
                        max-width: 320px;
                        height: 100vh;
                        background: #003d22; /* Deep elegant green */
                        box-shadow: -10px 0 40px rgba(0,0,0,0.5);
                        z-index: 70;
                        transform: translateX(100%);
                        transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
                        overflow-y: auto;
                    }
                    .mobile-nav-drawer.open {
                        transform: translateX(0);
                    }
                    .mobile-drawer-header {
                        display: flex;
                        justify-content: flex-end;
                        padding: 1.5rem;
                        border-bottom: 1px solid rgba(255,255,255,0.1);
                    }
                    .mobile-drawer-content {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: flex-start;
                        padding: 2.5rem 2rem;
                        gap: 2.2rem;
                    }
                    .mobile-nav-link {
                        font-size: 1.3rem;
                        font-weight: 500;
                        color: white !important;
                        text-decoration: none;
                        transition: color 0.2s;
                        letter-spacing: 0.5px;
                    }
                    .mobile-nav-link:hover {
                        color: var(--secondary) !important;
                    }
                }

                @keyframes marqueeScroll {
                    0% { transform: translateX(100vw); }
                    100% { transform: translateX(-100%); }
                }

                .marquee-container {
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    background: black;
                    color: white;
                    padding: 0.5rem 0;
                    font-size: 0.95rem;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                }

                .marquee-content {
                    display: inline-block;
                    animation: marqueeScroll 30s linear infinite;
                    padding-right: 2rem;
                }
                
                .marquee-container:hover .marquee-content {
                    animation-play-state: paused;
                }
            `}</style>
            <nav className="navbar" style={{ padding: 0 }}>
                <div className="marquee-container">
                    <div className="marquee-content">
                        🚚 Shipping All Over India 🇮🇳 &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; ✈️ Premium Leak-Proof Packaging Available For International Export
                    </div>
                </div>
                <div className="container flex justify-between items-center" style={{ padding: '1rem', position: 'relative' }}>
                    <Link href="/" className="flex items-center gap-2" style={{ zIndex: 50, textDecoration: 'none' }} onClick={() => setIsMobileNavOpen(false)}>
                        <Image
                            src="/Round_logo.png"
                            alt="Godavari Pickles Logo"
                            width={44}
                            height={44}
                            style={{
                                borderRadius: '50%',
                                objectFit: 'cover',
                                backgroundColor: 'white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                border: '2px solid #f0fdf4'
                            }}
                        />
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--secondary)', textDecoration: 'underline', textDecorationColor: 'var(--secondary)', textUnderlineOffset: '4px', marginLeft: '4px' }}>
                            {t('hero.title')}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="desktop-nav">
                        <Link href="/shop" className="nav-link" style={{ fontSize: '1rem' }}>{t('nav.shop')}</Link>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="nav-link"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                        >
                            {t('nav.menu')}
                        </button>
                        <Link href="/#about" className="nav-link" style={{ fontSize: '1rem' }}>{t('nav.about')}</Link>
                        <Link href="/#contact" className="nav-link" style={{ fontSize: '1rem' }}>{t('nav.contact')}</Link>
                        <LanguageSelector />
                    </div>

                    {/* Mobile Toggle Button */}
                    <button
                        className="mobile-toggle-btn"
                        onClick={() => setIsMobileNavOpen(true)}
                        aria-label="Open navigation menu"
                    >
                        <MenuIcon size={28} />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Backdrop */}
            <div
                className={`mobile-nav-backdrop ${isMobileNavOpen ? 'open' : ''}`}
                onClick={() => setIsMobileNavOpen(false)}
            />

            {/* Mobile Navigation Side Drawer */}
            <div className={`mobile-nav-drawer ${isMobileNavOpen ? 'open' : ''}`}>
                <div className="mobile-drawer-header">
                    <button
                        onClick={() => setIsMobileNavOpen(false)}
                        aria-label="Close navigation menu"
                        style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '50%', padding: '0.4rem', display: 'flex' }}
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="mobile-drawer-content">
                    <LanguageSelector />
                    <Link href="/shop" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>{t('nav.shop')}</Link>
                    <button
                        onClick={() => { setIsMobileNavOpen(false); setIsMenuOpen(true); }}
                        className="mobile-nav-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                        {t('nav.menu')}
                    </button>
                    <Link href="/#about" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>{t('nav.about')}</Link>
                    <Link href="/#contact" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>{t('nav.contact')}</Link>
                </div>
            </div>

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
                            <div style={{ width: '100%', position: 'relative', minHeight: '300px' }}>
                                <Image
                                    src="/images/menu-card.jpg"
                                    alt="Godavari Pickles Menu"
                                    fill
                                    style={{ objectFit: 'contain', borderRadius: '0.5rem' }}
                                    sizes="(max-width: 768px) 100vw, 80vw"
                                />
                            </div>
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
