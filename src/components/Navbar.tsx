'use client';

import Link from 'next/link';
import Image from 'next/image';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import { Download, Menu as MenuIcon, X, FileText } from 'lucide-react';

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
                        width: 80vw;
                        max-width: 380px;
                        height: 100vh;
                        background: rgba(0, 61, 34, 0.98);
                        backdrop-filter: blur(12px);
                        border-left: 1px solid rgba(255, 255, 255, 0.05);
                        box-shadow: -15px 0 50px rgba(0,0,0,0.6);
                        z-index: 70;
                        transform: translateX(100%);
                        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                        overflow-y: auto;
                    }
                    .mobile-nav-drawer.open {
                        transform: translateX(0);
                    }
                    .mobile-drawer-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1.5rem;
                        border-bottom: 1px solid rgba(255,255,255,0.08);
                    }
                    .mobile-drawer-content {
                        display: flex;
                        flex-direction: column;
                        padding: 1.5rem 1rem;
                        gap: 0.5rem;
                    }
                    .mobile-nav-link {
                        font-size: 1.25rem;
                        font-weight: 500;
                        color: rgba(255, 255, 255, 0.9) !important;
                        text-decoration: none;
                        padding: 1rem 1.2rem;
                        border-radius: 12px;
                        transition: all 0.2s ease;
                        letter-spacing: 0.5px;
                        display: flex;
                        align-items: center;
                        width: 100%;
                    }
                    .mobile-nav-link:hover, .mobile-nav-link:active {
                        background: rgba(255, 255, 255, 0.1);
                        color: white !important;
                        transform: translateX(6px);
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
                        <Link href="/" className="nav-link" style={{ fontSize: '1rem' }}>Home</Link>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Image
                            src="/Round_logo.png"
                            alt="Godavari Pickles Logo"
                            width={44}
                            height={44}
                            style={{
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                padding: '2px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                border: '1px solid #f0fdf4'
                            }}
                        />
                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '0.5px' }}>
                            {t('hero.title')}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsMobileNavOpen(false)}
                        aria-label="Close navigation menu"
                        style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '50%', padding: '0.5rem', display: 'flex', transition: 'background 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    >
                        <X size={22} />
                    </button>
                </div>
                <div className="mobile-drawer-content">
                    <div style={{ padding: '0.5rem 1.2rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1.5rem', width: '100%' }}>
                        <LanguageSelector />
                    </div>
                    <Link href="/" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>Home</Link>
                    <Link href="/shop" className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>{t('nav.shop')}</Link>
                    <button
                        onClick={() => { setIsMobileNavOpen(false); setIsMenuOpen(true); }}
                        className="mobile-nav-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
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
                            padding: '1.2rem 1.5rem',
                            borderBottom: '1px solid #f1f5f9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: '#ffffff'
                        }}>
                            <h3 style={{ margin: 0, color: 'var(--primary)', fontWeight: '800', fontSize: '1.25rem' }}>{t('nav.menu')}</h3>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                style={{ background: 'rgba(241, 245, 249, 0.8)', border: 'none', cursor: 'pointer', color: '#64748b', borderRadius: '50%', padding: '0.4rem', display: 'flex' }}
                            >
                                <X size={20} />
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
                            padding: '1.2rem',
                            borderTop: '1px solid #f1f5f9',
                            display: 'flex',
                            justifyContent: 'center',
                            background: '#ffffff'
                        }}>
                            <a
                                href="/images/menu-card.jpg"
                                download="Godavari-Pickles-Menu.jpg"
                                className="btn btn-primary"
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.8rem', fontSize: '1.1rem', borderRadius: '50px' }}
                            >
                                <Download size={22} /> Download Menu
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Floating Menu Button */}
            <style>{`
                @media (min-width: 851px) {
                    .mobile-floating-menu {
                        display: none !important;
                    }
                }
                @keyframes pulse-soft {
                    0% { transform: translateX(-50%) scale(1); box-shadow: 0 4px 15px rgba(0,61,34,0.3); }
                    50% { transform: translateX(-50%) scale(1.03); box-shadow: 0 8px 25px rgba(0,61,34,0.5); }
                    100% { transform: translateX(-50%) scale(1); box-shadow: 0 4px 15px rgba(0,61,34,0.3); }
                }
            `}</style>
            
            <div className="mobile-floating-menu" style={{
                position: 'fixed',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 45,
                display: 'flex',
                animation: 'pulse-soft 3s infinite ease-in-out'
            }}>
                <button
                    onClick={() => setIsMenuOpen(true)}
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '12px 28px',
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '1.05rem',
                        border: '2px solid rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(5px)',
                        letterSpacing: '0.5px',
                        cursor: 'pointer'
                    }}
                >
                    <FileText size={20} />
                    {t('nav.menu')}
                </button>
            </div>
        </>
    );
}
