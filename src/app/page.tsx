'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Leaf, Award, Heart, Truck, Share2, Sparkles, ChefHat, Globe2, ShieldCheck, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, Variants, useMotionValue, useTransform, useSpring } from 'framer-motion';

// ─── Animation Variants ───────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springRotX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...style, rotateX: springRotX, rotateY: springRotY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Interactive Mouse Background ──────────────────────────────────────────────
function MouseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; opacity: number; hue: number; life: number;
  }>>([]);
  const animFrame = useRef<number>(0);

  const initParticles = useCallback(() => {
    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0004,
        vy: (Math.random() - 0.5) * 0.0004,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.35 + 0.05,
        hue: Math.random() > 0.6 ? 36 : Math.random() > 0.3 ? 25 : 8,
        life: Math.random() * 100,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    initParticles();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouse);

    const draw = () => {
      if (!ctx || !canvas) return;
      const { width: w, height: h } = canvas;
      const m = mouseRef.current;

      // Smooth lerp mouse position
      m.x += (m.targetX - m.x) * 0.04;
      m.y += (m.targetY - m.y) * 0.04;

      ctx.clearRect(0, 0, w, h);

      // === Main mouse-following glow ===
      const grd1 = ctx.createRadialGradient(
        m.x * w, m.y * h, 0,
        m.x * w, m.y * h, w * 0.4
      );
      grd1.addColorStop(0, 'rgba(232, 160, 32, 0.10)');
      grd1.addColorStop(0.4, 'rgba(232, 160, 32, 0.04)');
      grd1.addColorStop(1, 'transparent');
      ctx.fillStyle = grd1;
      ctx.fillRect(0, 0, w, h);

      // === Secondary warm accent (opposite corner) ===
      const grd2 = ctx.createRadialGradient(
        (1 - m.x) * w * 0.8, (1 - m.y) * h * 0.8, 0,
        (1 - m.x) * w * 0.8, (1 - m.y) * h * 0.8, w * 0.35
      );
      grd2.addColorStop(0, 'rgba(217, 48, 37, 0.06)');
      grd2.addColorStop(0.5, 'rgba(217, 48, 37, 0.02)');
      grd2.addColorStop(1, 'transparent');
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, w, h);

      // === Third accent ===
      const t = Date.now() / 8000;
      const ax = 0.5 + Math.sin(t) * 0.3;
      const ay = 0.5 + Math.cos(t * 0.7) * 0.3;
      const grd3 = ctx.createRadialGradient(
        ax * w, ay * h, 0,
        ax * w, ay * h, w * 0.25
      );
      grd3.addColorStop(0, 'rgba(245, 200, 66, 0.05)');
      grd3.addColorStop(1, 'transparent');
      ctx.fillStyle = grd3;
      ctx.fillRect(0, 0, w, h);

      // === Particles ===
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life += 0.15;

        // Attract towards mouse slightly
        const dx = m.x - p.x;
        const dy = m.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0.01) {
          p.vx += dx * 0.000015;
          p.vy += dy * 0.000015;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.y > 1.05) p.y = -0.05;

        // Fade near mouse
        const mouseDist = Math.sqrt((p.x - m.x) ** 2 + (p.y - m.y) ** 2);
        const brightness = mouseDist < 0.2 ? p.opacity * (1 + (0.2 - mouseDist) * 5) : p.opacity;

        const px = p.x * w;
        const py = p.y * h;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        const alpha = Math.min(brightness, 0.6) * (0.7 + 0.3 * Math.sin(p.life * 0.05));
        ctx.fillStyle = `hsla(${p.hue}, 85%, 60%, ${alpha})`;
        ctx.fill();
      }

      // === Connect nearby particles with lines ===
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const lineDist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (lineDist < 0.12) {
            const lineAlpha = (1 - lineDist / 0.12) * 0.08;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.strokeStyle = `rgba(232, 160, 32, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrame.current = requestAnimationFrame(draw);
    };

    animFrame.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrame.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const { t } = useLanguage();
  const [doubleTapItem, setDoubleTapItem] = useState<string | null>(null);

  const handleDoubleTap = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setDoubleTapItem(id);
    setTimeout(() => setDoubleTapItem(null), 1000);
    if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate([50, 50, 50]);
  };

  const features = [
    {
      icon: <Leaf size={28} />,
      title: t('whyChoose.farmFresh.title'),
      desc: t('whyChoose.farmFresh.desc'),
      color: '#e8a020',
      gradient: 'linear-gradient(135deg, rgba(232,160,32,0.18), rgba(232,160,32,0.04))',
      glow: 'rgba(232,160,32,0.35)',
    },
    {
      icon: <Heart size={28} />,
      title: t('whyChoose.traditional.title'),
      desc: t('whyChoose.traditional.desc'),
      color: '#d93025',
      gradient: 'linear-gradient(135deg, rgba(217,48,37,0.18), rgba(217,48,37,0.04))',
      glow: 'rgba(217,48,37,0.32)',
    },
    {
      icon: <ShieldCheck size={28} />,
      title: t('whyChoose.noPreservatives.title'),
      desc: t('whyChoose.noPreservatives.desc'),
      color: '#f5c842',
      gradient: 'linear-gradient(135deg, rgba(245,200,66,0.18), rgba(245,200,66,0.04))',
      glow: 'rgba(245,200,66,0.3)',
    },
    {
      icon: <Truck size={28} />,
      title: t('whyChoose.villageToCity.title'),
      desc: t('whyChoose.villageToCity.desc'),
      color: '#ff8c42',
      gradient: 'linear-gradient(135deg, rgba(255,140,66,0.18), rgba(255,140,66,0.04))',
      glow: 'rgba(255,140,66,0.3)',
    },
  ];

  const featuredItems = [
    { id: '1', name: t('special.items.avakaya'), telugu: 'ఆవకాయ', price: 300, price1kg: 600, rating: 5, reviews: 150, image: '/images/mango.png', category: 'Veg' },
    { id: '12', name: t('special.items.chicken'), telugu: 'కోడి పచ్చడి', price: 400, price1kg: 800, rating: 5, reviews: 98, image: '/images/chicken.png', category: 'Non-veg' },
    { id: '4', name: t('special.items.gongura'), telugu: 'గోంగూర', price: 275, price1kg: 550, rating: 4, reviews: 112, image: '/images/Gongura.png', category: 'Veg' },
    { id: '7', name: t('special.items.ginger'), telugu: 'అల్లం పచ్చడి', price: 250, price1kg: 500, rating: 5, reviews: 80, image: '/images/Ginger.png', category: 'Veg' },
    { id: '16', name: t('special.items.prawns'), telugu: 'రొయ్యల పచ్చడి', price: 500, price1kg: 1000, rating: 5, reviews: 105, image: '/images/prawns.png', category: 'Non-veg' },
  ];

  return (
    <main style={{ background: 'var(--bg-950)', minHeight: '100vh' }}>
      {/* Interactive mouse-following background */}
      <MouseBackground />

      <Navbar />

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="hero-section" style={{ padding: '8rem 1rem 6rem', textAlign: 'center', flexDirection: 'column' }}>
        {/* Floating orbs */}
        <div className="hero-orb" style={{ width: 600, height: 600, top: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(232,160,32,0.14) 0%, transparent 70%)' }} />
        <div className="hero-orb" style={{ width: 420, height: 420, bottom: '5%', left: '-5%', background: 'radial-gradient(circle, rgba(217,48,37,0.1) 0%, transparent 70%)', animationDelay: '3.5s' }} />
        <div className="hero-orb" style={{ width: 280, height: 280, top: '30%', left: '60%', background: 'radial-gradient(circle, rgba(245,200,66,0.07) 0%, transparent 70%)', animationDelay: '6s' }} />

        <motion.div
          className="container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(232,160,32,0.1)', border: '1px solid rgba(232,160,32,0.28)', color: '#e8a020', padding: '0.45rem 1.25rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.75rem' }}
          >
            <Sparkles size={13} /> Authentic · Traditional · Village-Made
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{
              fontSize: 'clamp(2.8rem, 9vw, 5.5rem)',
              marginBottom: '1.25rem',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: '#f2ede8' }}>{t('hero.title').split(' ')[0]} </span>
            <span style={{
              background: 'linear-gradient(135deg, #e8a020 0%, #f5c842 45%, #d93025 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {t('hero.title').split(' ').slice(1).join(' ')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ fontSize: 'clamp(1.2rem, 4vw, 1.7rem)', marginBottom: '1.5rem', color: '#f5c842', fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}
          >
            {t('hero.subtitle')}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', maxWidth: '640px', margin: '0 auto 2rem', color: 'rgba(242,237,232,0.6)', lineHeight: '1.75' }}
          >
            {t('hero.description')}
            <br />
            <em style={{ color: 'rgba(242,237,232,0.4)', display: 'block', marginTop: '0.5rem', fontSize: '0.95em' }}>{t('hero.quote')}</em>
          </motion.p>

          {/* Shipping badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: 'spring' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(232,160,32,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(232,160,32,0.2)', padding: '0.55rem 1.5rem', borderRadius: '9999px', marginBottom: '2.25rem' }}
          >
            <Truck size={17} style={{ color: '#e8a020' }} />
            <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{t('hero.shipping')}</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex justify-center gap-4 flex-wrap hero-buttons"
            style={{ maxWidth: '480px', margin: '0 auto' }}
          >
            <Link href="/shop" className="btn btn-primary btn-pulse" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              {t('hero.orderNow')} <ArrowRight size={22} />
            </Link>
            <button className="btn btn-ghost" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              {t('hero.watchProcess')}
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '3.5rem' }}
          >
            {[
              { value: '500+', label: 'Happy Customers' },
              { value: '25+', label: 'Pickle Varieties' },
              { value: '100%', label: 'Natural' },
              { value: '3 Gen', label: 'Family Recipe' },
            ].map((stat, i) => (
              <div key={i} className="stat-chip">
                <span style={{ color: '#e8a020', fontWeight: 800, fontSize: '1.1rem' }}>{stat.value}</span>
                <span style={{ color: 'rgba(242,237,232,0.45)', fontSize: '0.8rem', fontWeight: 500 }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════ WHY CHOOSE US ══════════════════ */}
      <section style={{ padding: '7rem 0', overflow: 'hidden' }}>
        <motion.div
          className="container"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(232,160,32,0.08)', border: '1px solid rgba(232,160,32,0.22)', color: '#e8a020', padding: '0.4rem 1.1rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              <Award size={13} /> Why Choose Us
            </div>
            <h2 style={{ color: '#f2ede8', marginBottom: '0.75rem' }}>{t('whyChoose.title')}</h2>
            <p style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>{t('whyChoose.subtitle')}</p>
          </motion.div>

          <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1.5rem', scrollSnapType: 'x mandatory' }} className="no-scrollbar">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <TiltCard style={{ minWidth: 280, scrollSnapAlign: 'center' }}>
                  <div className="card" style={{
                    textAlign: 'center',
                    border: `1px solid ${f.color}22`,
                    background: f.gradient,
                    backdropFilter: 'blur(20px)',
                    minHeight: '260px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }} />
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className="feature-icon-wrap floating-icon"
                      style={{ background: `${f.color}18`, color: f.color, boxShadow: `0 8px 24px ${f.glow}` }}
                    >
                      {f.icon}
                    </motion.div>
                    <h3 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.65rem', fontWeight: 700 }}>{f.title}</h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.65', color: 'rgba(242,237,232,0.55)', margin: 0 }}>{f.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════ FEATURED PRODUCTS ══════════════════ */}
      <section style={{ padding: '7rem 0', overflow: 'hidden' }}>
        <motion.div
          className="container"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <motion.div variants={fadeLeft}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(217,48,37,0.08)', border: '1px solid rgba(217,48,37,0.22)', color: '#d93025', padding: '0.4rem 1.1rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                <Star size={12} fill="#d93025" /> {t('special.title')}
              </div>
              <h2 style={{ color: '#f2ede8', margin: 0 }}>{t('special.subtitle')}</h2>
            </motion.div>
            <motion.div variants={fadeRight}>
              <Link href="/shop?section=special" className="btn btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                {t('special.viewAll')} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Product Scroll */}
          <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1.5rem', scrollSnapType: 'x mandatory' }} className="no-scrollbar">
            {featuredItems.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }} style={{ minWidth: 280, scrollSnapAlign: 'start', flexShrink: 0 }}>
                <Link href={`/shop/${item.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="card" style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.07)' }}>
                    {/* Image */}
                    <div className="product-card-img">
                      <span style={{
                        position: 'absolute', top: 10, left: 10, zIndex: 3,
                        background: item.category === 'Veg'
                          ? 'linear-gradient(135deg, #e8a020, #b87a10)'
                          : 'linear-gradient(135deg, #d93025, #8b0000)',
                        color: '#fff',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                      }}>
                        {item.category === 'Veg' ? '● VEG' : '● NON-VEG'}
                      </span>

                      <div style={{
                        position: 'absolute', inset: 0, zIndex: 5,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        pointerEvents: 'none',
                        opacity: doubleTapItem === item.id ? 1 : 0,
                        transform: doubleTapItem === item.id ? 'scale(1)' : 'scale(0.4)',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      }}>
                        <Heart size={80} fill="#ef4444" color="transparent" style={{ filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.8))' }} />
                      </div>

                      <div style={{ width: '100%', height: '100%', position: 'relative' }} onDoubleClick={e => handleDoubleTap(item.id, e)}>
                        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} sizes="280px" />
                      </div>

                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(8,7,10,0.95), transparent)', zIndex: 2, pointerEvents: 'none' }} />

                      <button
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (typeof navigator !== 'undefined' && navigator.share) {
                            navigator.share({ title: item.name, text: t('special.shareText').replace('{item}', item.name), url: window.location.origin + `/shop/${item.id}` }).catch(() => {});
                          } else {
                            navigator.clipboard.writeText(window.location.origin + `/shop/${item.id}`);
                            alert(t('special.copied'));
                          }
                        }}
                        style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 4, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '7px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                        aria-label="Share product"
                      >
                        <Share2 size={15} />
                      </button>
                    </div>

                    {/* Info */}
                    <div style={{ padding: '0.25rem 0.25rem 0' }}>
                      <h3 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '0.2rem', fontWeight: 700 }}>{item.name}</h3>
                      <p style={{ color: '#e8a020', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.9rem' }}>{item.telugu}</p>

                      <div style={{ display: 'flex', gap: '2px', marginBottom: '0.9rem' }}>
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star key={si} size={13} fill={si < item.rating ? '#f5c842' : 'transparent'} color={si < item.rating ? '#f5c842' : 'rgba(245,200,66,0.25)'} />
                        ))}
                        <span style={{ fontSize: '0.75rem', color: 'rgba(242,237,232,0.4)', marginLeft: '4px' }}>({item.reviews})</span>
                      </div>

                      <div className="price-box">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.8rem', color: 'rgba(242,237,232,0.45)', fontWeight: 600 }}>500g</span>
                          <span style={{ fontWeight: 800, color: '#e8a020', fontSize: '1.05rem' }}>₹{item.price}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed rgba(232,160,32,0.2)', paddingTop: '6px' }}>
                          <span style={{ fontSize: '0.8rem', color: 'rgba(242,237,232,0.45)', fontWeight: 600 }}>1 kg</span>
                          <span style={{ fontWeight: 800, color: '#e8a020', fontSize: '1.05rem' }}>₹{item.price1kg}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════ ABOUT / STORY ══════════════════ */}
      <section style={{ padding: '7rem 0', overflow: 'hidden' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeLeft}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(217,48,37,0.08)', border: '1px solid rgba(217,48,37,0.22)', color: '#d93025', padding: '0.4rem 1.1rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                <ChefHat size={13} /> {t('about.roots')}
              </div>
              <h2 style={{ color: '#f2ede8', marginBottom: '1.5rem', lineHeight: 1.15 }}>
                {t('about.title').split(' ').slice(0, 3).join(' ')}{' '}
                <span style={{ background: 'linear-gradient(135deg, #e8a020, #f5c842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {t('about.title').split(' ').slice(3).join(' ')}
                </span>
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem', color: 'rgba(242,237,232,0.6)' }}>{t('about.p1')}</p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem', color: 'rgba(242,237,232,0.6)' }}>{t('about.p2')}</p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[
                  { icon: <Leaf size={14} />, label: 'Farm Fresh', color: '#e8a020' },
                  { icon: <Globe2 size={14} />, label: 'Pan India Delivery', color: '#ff8c42' },
                  { icon: <ShieldCheck size={14} />, label: 'No Preservatives', color: '#f5c842' },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: `${c.color}12`, border: `1px solid ${c.color}25`, color: c.color, padding: '0.4rem 0.9rem', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 600 }}>
                    {c.icon} {c.label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeRight}
            >
              <TiltCard>
                <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', height: 420, border: '1px solid rgba(232,160,32,0.15)', boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(232,160,32,0.06)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?q=80&w=1000&auto=format&fit=crop"
                    alt="Traditional pickle making"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,7,10,0.9) 0%, rgba(8,7,10,0.2) 50%, transparent 100%)' }} />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    viewport={{ once: true }}
                    style={{
                      position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem',
                      background: 'rgba(10,7,12,0.9)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(232,160,32,0.2)',
                      borderRadius: '1rem',
                      padding: '1rem 1.25rem',
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: 800, color: '#e8a020', fontSize: '1rem' }}>{t('about.authentic')}</p>
                    <p style={{ margin: 0, color: 'rgba(242,237,232,0.55)', fontSize: '0.85rem', marginTop: '0.2rem' }}>{t('about.grinding')}</p>
                  </motion.div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CONTACT ══════════════════ */}
      <section id="contact" style={{ padding: '7rem 0', overflow: 'hidden' }}>
        <motion.div
          className="container text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(232,160,32,0.08)', border: '1px solid rgba(232,160,32,0.22)', color: '#e8a020', padding: '0.4rem 1.1rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              <Phone size={13} /> {t('contact.title')}
            </div>
          </motion.div>
          <motion.h2 variants={fadeUp} style={{ color: '#f2ede8', marginBottom: '0.75rem' }}>{t('contact.title')}</motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '1.1rem', marginBottom: '3.5rem', maxWidth: 480, margin: '0 auto 3.5rem' }}>{t('contact.subtitle')}</motion.p>

          <motion.div variants={fadeUp}>
            <TiltCard style={{ maxWidth: 600, margin: '0 auto' }}>
              <div className="card" style={{ padding: '3rem 2.5rem', border: '1px solid rgba(232,160,32,0.15)', background: 'linear-gradient(135deg, rgba(232,160,32,0.06) 0%, rgba(217,48,37,0.03) 100%)' }}>
                <h3 style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  marginBottom: '1.5rem',
                  color: '#f2ede8',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 800,
                }}>
                  Godavari <span style={{ background: 'linear-gradient(135deg, #e8a020, #f5c842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pickles</span>
                </h3>

                <motion.a
                  href="tel:+919014475499"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.9rem',
                    background: 'rgba(232,160,32,0.09)',
                    border: '1px solid rgba(232,160,32,0.25)',
                    padding: '0.9rem 2rem',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    marginBottom: '2.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e8a020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.81 12.7 19.79 19.79 0 0 1 1.74 4.11 2 2 0 0 1 3.72 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  <span style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, letterSpacing: '0.05em' }}>+91 90144 75499</span>
                </motion.a>

                <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, transparent, rgba(232,160,32,0.5), transparent)', margin: '0 auto 2rem', borderRadius: 9999 }} />

                <p style={{ fontSize: '0.8rem', color: 'rgba(242,237,232,0.35)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>
                  {t('contact.follow')}
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem' }}>
                  <motion.a href="https://www.instagram.com/godavaripickles_?igsh=YmdocnlsZ3V4YzAy" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.12, y: -4 }} whileTap={{ scale: 0.92 }} style={{ width: 52, height: 52, borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', color: 'white', boxShadow: '0 8px 20px rgba(220,39,67,0.3)', textDecoration: 'none' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                  </motion.a>

                  <motion.a href="https://www.facebook.com/share/1AnrSFb9w8/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.12, y: -4 }} whileTap={{ scale: 0.92 }} style={{ width: 52, height: 52, borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1877F2', color: 'white', boxShadow: '0 8px 20px rgba(24,119,242,0.3)', textDecoration: 'none' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0"><path fill="currentColor" fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  </motion.a>

                  <motion.a href="https://wa.me/919014475499" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.12, y: -4 }} whileTap={{ scale: 0.92 }} style={{ width: 52, height: 52, borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #25d366, #128c7e)', color: 'white', boxShadow: '0 8px 20px rgba(37,211,102,0.35)', textDecoration: 'none' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.549 4.12 1.51 5.855L0 24l6.335-1.48A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.511-5.17-1.402l-.37-.22-3.763.879.937-3.66-.242-.383C2.535 15.59 2 13.857 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" fill="currentColor" /></svg>
                  </motion.a>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{ background: 'rgba(8,7,10,0.8)', borderTop: '1px solid rgba(232,160,32,0.08)', padding: '2.5rem 0 1.5rem', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <Image src="/Round_logo.png" alt="Godavari Pickles" width={32} height={32} style={{ borderRadius: '50%', border: '1px solid rgba(232,160,32,0.35)' }} />
            <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem' }}>Godavari Pickles</span>
          </div>
          <p style={{ color: 'rgba(242,237,232,0.25)', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
            Authentic pickles from the heart of West Godavari · Made with love & tradition
          </p>
          <p style={{ color: 'rgba(242,237,232,0.15)', fontSize: '0.75rem', margin: 0 }}>
            © {new Date().getFullYear()} Godavari Pickles. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
