'use client';

import Link from 'next/link';
import Image from 'next/image';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Download, Menu as MenuIcon, X, FileText, Home, ShoppingBag, Phone, Leaf, Sparkles } from 'lucide-react';

export default function Navbar() {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        setScrolled(latest > 40);
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    useEffect(() => {
        if (isMobileNavOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isMobileNavOpen]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStartX) return;
        const diff = e.targetTouches[0].clientX - touchStartX;
        if (diff > 75) {
            setIsMobileNavOpen(false);
            setTouchStartX(null);
        }
    };

    const navLinks = [
        { href: '/', label: t('nav.home'), icon: <Home size={18} /> },
        { href: '/shop', label: t('nav.shop'), icon: <ShoppingBag size={18} /> },
        { href: '/#about', label: t('nav.about'), icon: <Leaf size={18} /> },
        { href: '/#contact', label: t('nav.contact'), icon: <Phone size={18} /> },
    ];

    return (
        <>
            <motion.nav
                className="navbar"
                style={{
                    padding: 0,
                    background: scrolled
                        ? 'rgba(4, 13, 7, 0.92)'
                        : 'rgba(4, 13, 7, 0.6)',
                    boxShadow: scrolled
                        ? '0 4px 30px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06)'
                        : 'none',
                    borderBottom: scrolled ? '1px solid rgba(0, 200, 83, 0.12)' : '1px solid transparent',
                    transition: 'all 0.35s ease',
                }}
                variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
                animate={hidden ? 'hidden' : 'visible'}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
                {/* Marquee Banner */}
                <AnimatePresence>
                    {!scrolled && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                background: 'linear-gradient(90deg, #061510, #003d20, #061510)',
                                borderBottom: '1px solid rgba(0,200,83,0.15)',
                                overflow: 'hidden',
                            }}
                        >
                            <div className="marquee-container" style={{ padding: '0.45rem 0', overflow: 'hidden' }}>
                                <div className="marquee-track" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
                                    {[0, 1].map(i => (
                                        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '2rem', padding: '0 2rem', fontSize: '0.82rem', fontWeight: 600, color: 'rgba(0,200,83,0.9)', letterSpacing: '0.06em' }}>
                                            <Sparkles size={12} style={{ color: '#d93025' }} />
                                            {t('nav.marquee')}
                                            <span style={{ color: '#ffd600', marginLeft: '1rem' }}>✦</span>
                                            {t('nav.marquee')}
                                            <span style={{ color: '#ffd600', marginLeft: '1rem' }}>✦</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Nav Bar */}
                <div className="container flex justify-between items-center" style={{ padding: '0.9rem 1.5rem' }}>
                    {/* Logo */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', zIndex: 50 }} onClick={() => setIsMobileNavOpen(false)}>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                inset: '-3px',
                                borderRadius: '50%',
                                background: 'conic-gradient(from 0deg, #00c853, #ffd600, #00c853)',
                                animation: 'spin 4s linear infinite',
                            }} />
                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                            <div style={{ position: 'relative', borderRadius: '50%', overflow: 'hidden', width: 44, height: 44, border: '2px solid #040d07' }}>
                                <Image
                                    src="/Round_logo.png"
                                    alt="Godavari Pickles"
                                    width={44}
                                    height={44}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f2ede8', letterSpacing: '-0.01em' }}>
                                Godavari
                            </span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e8a020', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                Pickles
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="desktop-nav">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className="nav-link">
                                {link.label}
                            </Link>
                        ))}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="nav-link"
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            {t('nav.menu')}
                        </button>
                        <LanguageSelector />
                        <Link href="/shop" className="btn btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem', borderRadius: '9999px' }}>
                            {t('hero.orderNow')}
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="mobile-toggle-btn"
                        onClick={() => setIsMobileNavOpen(true)}
                        aria-label="Open navigation"
                        style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            cursor: 'pointer',
                            borderRadius: '0.75rem',
                            padding: '0.55rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <MenuIcon size={22} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Backdrop */}
            <div
                className={`mobile-nav-backdrop ${isMobileNavOpen ? 'open' : ''}`}
                onClick={() => setIsMobileNavOpen(false)}
            />

            {/* Mobile Drawer */}
            <div
                className={`mobile-nav-drawer ${isMobileNavOpen ? 'open' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                <div className="mobile-drawer-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Image src="/Round_logo.png" alt="Godavari Pickles" width={40} height={40} style={{ borderRadius: '50%', border: '2px solid rgba(0,200,83,0.4)' }} />
                        <div>
                            <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem', lineHeight: 1.1 }}>Godavari</div>
                            <div style={{ color: '#00c853', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Pickles</div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsMobileNavOpen(false)}
                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', borderRadius: '50%', padding: '0.45rem', display: 'flex', transition: 'all 0.2s' }}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="mobile-drawer-content">
                    <div style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.5rem' }}>
                        <LanguageSelector />
                    </div>
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} className="mobile-nav-link" onClick={() => setIsMobileNavOpen(false)}>
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                    <button
                        onClick={() => { setIsMobileNavOpen(false); setIsMenuOpen(true); }}
                        className="mobile-nav-link"
                    >
                        <FileText size={18} />
                        {t('nav.menu')}
                    </button>

                    <div style={{ marginTop: 'auto', padding: '1.5rem 0.5rem 0.5rem' }}>
                        <Link href="/shop" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setIsMobileNavOpen(false)}>
                            {t('hero.orderNow')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Menu Modal */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0,
                            background: 'rgba(0,0,0,0.85)',
                            zIndex: 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem',
                            backdropFilter: 'blur(12px)',
                        }}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                            style={{
                                background: 'rgba(6, 21, 16, 0.96)',
                                backdropFilter: 'blur(30px)',
                                border: '1px solid rgba(0,200,83,0.2)',
                                borderRadius: '1.5rem',
                                overflow: 'hidden',
                                maxHeight: '90vh',
                                width: '100%',
                                maxWidth: '560px',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{
                                padding: '1.25rem 1.5rem',
                                borderBottom: '1px solid rgba(255,255,255,0.06)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'rgba(0,200,83,0.04)',
                            }}>
                                <div>
                                    <h3 style={{ margin: 0, color: '#00c853', fontWeight: 800, fontSize: '1.2rem' }}>{t('nav.menu')}</h3>
                                    <p style={{ margin: 0, color: 'rgba(240,248,243,0.5)', fontSize: '0.8rem', marginTop: '0.1rem' }}>Godavari Pickles</p>
                                </div>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', borderRadius: '50%', padding: '0.45rem', display: 'flex' }}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', padding: '1.25rem' }}>
                                <div style={{ width: '100%', position: 'relative', minHeight: '300px' }}>
                                    <Image
                                        src="/images/menu-card.jpg"
                                        alt="Godavari Pickles Menu"
                                        fill
                                        style={{ objectFit: 'contain', borderRadius: '0.75rem' }}
                                        sizes="(max-width: 768px) 100vw, 560px"
                                    />
                                </div>
                            </div>

                            <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,200,83,0.04)' }}>
                                <a
                                    href="/images/menu-card.jpg"
                                    download="Godavari-Pickles-Menu.jpg"
                                    className="btn btn-primary"
                                    style={{ width: '100%', justifyContent: 'center', fontSize: '1rem' }}
                                >
                                    <Download size={20} /> {t('nav.downloadMenu')}
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Bottom Nav */}
            <div className="mobile-bottom-nav">
                <Link href="/" className="bottom-nav-item active">
                    <Home size={20} />
                    <span>{t('nav.home')}</span>
                </Link>
                <Link href="/shop" className="bottom-nav-item">
                    <ShoppingBag size={20} />
                    <span>{t('nav.shop')}</span>
                </Link>

                {/* Center Elevated Button */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={() => {
                            if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
                            setIsMenuOpen(true);
                        }}
                        className="bottom-nav-item"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
                    >
                        <div style={{
                            background: 'linear-gradient(135deg, #e8a020, #b87a10)',
                            color: '#1a0e00',
                            padding: '13px',
                            borderRadius: '50%',
                            marginTop: '-32px',
                            boxShadow: '0 8px 24px rgba(232,160,32,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                            border: '4px solid #040d07',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'transform 0.2s ease',
                        }}>
                            <FileText size={20} />
                        </div>
                        <span style={{ color: '#e8a020', marginTop: '3px' }}>{t('nav.menu')}</span>
                    </button>
                </div>

                <Link href="/#about" className="bottom-nav-item">
                    <Leaf size={20} />
                    <span>{t('nav.about')}</span>
                </Link>
                <Link href="/#contact" className="bottom-nav-item">
                    <Phone size={20} />
                    <span>{t('nav.contact')}</span>
                </Link>
            </div>
        </>
    );
}
