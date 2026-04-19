'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Leaf, Award, Heart, Truck, Share2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { motion, Variants } from 'framer-motion';

// Animation variants
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const itemVariantLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const itemVariantRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  const { t } = useLanguage();
  const [doubleTapItem, setDoubleTapItem] = useState<string | null>(null);

  const handleDoubleTap = (id: string, e: React.MouseEvent) => {
      e.preventDefault();
      setDoubleTapItem(id);
      setTimeout(() => setDoubleTapItem(null), 1000);
      
      if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate([50, 50, 50]);
  };

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section" style={{
        color: 'white',
        padding: '10rem 1rem',
        textAlign: 'center',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div 
          className="container" style={{ padding: '0 10px', position: 'relative', zIndex: 10 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 4rem)',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              color: '#ffffff',
              fontFamily: 'serif'
          }}>
            {t('hero.title')}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: 'clamp(1.4rem, 6vw, 2rem)',
              marginBottom: '2rem',
              color: 'var(--secondary)',
              fontWeight: '400'
          }}>
            {t('hero.subtitle')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{
              fontSize: 'clamp(1rem, 5vw, 1.25rem)',
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              color: '#f0f0f0',
              lineHeight: '1.6'
          }}>
            {t('hero.description')}
            <br />
            <span style={{ fontStyle: 'italic', marginTop: '0.5rem', display: 'block' }}>{t('hero.quote')}</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
            style={{ marginBottom: '2rem', display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', padding: '0.5rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.4)' }}
          >
            <span style={{ color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={20} /> {t('hero.shipping')}
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex justify-center gap-4 flex-wrap hero-buttons" style={{ maxWidth: '500px', margin: '0 auto' }}
          >
            <Link href="/shop" className="btn btn-primary btn-pulse" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}>
              {t('hero.orderNow')} <ArrowRight size={24} />
            </Link>
            <button className="btn" style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(5px)',
              border: '2px solid white',
              color: 'white',
              padding: '1rem 2.5rem',
              fontSize: '1.2rem'
            }}>
              {t('hero.watchProcess')}
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Godavari Pickles? */}
      <section style={{ padding: '6rem 0', background: 'var(--background)', overflow: 'hidden' }}>
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={itemVariant} className="text-center mb-2" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>{t('whyChoose.title')}</motion.h2>
          <motion.p variants={itemVariant} className="text-center mb-12" style={{ fontSize: '1.2rem' }}>{t('whyChoose.subtitle')}</motion.p>

          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '1.5rem',
            paddingBottom: '2rem', 
            scrollSnapType: 'x mandatory',
            justifyContent: 'flex-start'
          }} className="no-scrollbar">
            {[
              {
                icon: <Leaf size={32} />,
                title: t('whyChoose.farmFresh.title'),
                desc: t('whyChoose.farmFresh.desc'),
                color: '#4caf50', 
                bg: '#e8f5e9'
              },
              {
                icon: <Heart size={32} />,
                title: t('whyChoose.traditional.title'),
                desc: t('whyChoose.traditional.desc'),
                color: '#ff9800', 
                bg: '#fff3e0'
              },
              {
                icon: <Award size={32} />,
                title: t('whyChoose.noPreservatives.title'),
                desc: t('whyChoose.noPreservatives.desc'),
                color: '#f44336', 
                bg: '#ffebee'
              },
              {
                icon: <Truck size={32} />,
                title: t('whyChoose.villageToCity.title'),
                desc: t('whyChoose.villageToCity.desc'),
                color: '#2196f3', 
                bg: '#e3f2fd'
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariant} whileHover={{ y: -10, scale: 1.02 }} className="card text-center transition-all duration-300" style={{
                minWidth: '300px',
                flex: '0 0 auto',
                scrollSnapAlign: 'center',
                padding: '2.5rem 1.5rem',
                border: `1px solid ${feature.color}20`,
                background: 'var(--surface)',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                borderRadius: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: feature.color
                }}></div>
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  style={{
                    background: feature.bg,
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: feature.color,
                    boxShadow: `0 4px 10px ${feature.color}30`
                  }} className="floating-icon"
                >
                  {feature.icon}
                </motion.div>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '800', color: 'var(--foreground)' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--muted)' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Section - Telugu Names */}
      <section style={{ background: 'var(--surface-hover)', padding: '6rem 0', overflow: 'hidden' }}>
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
            <motion.div variants={itemVariantLeft}>
              <h2 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>{t('special.title')}</h2>
              <p>{t('special.subtitle')}</p>
            </motion.div>
            <motion.div variants={itemVariantRight}>
              <Link href="/shop?section=special" className="btn btn-outline" style={{ padding: '0.25rem 0.8rem', fontSize: '0.85rem' }}>{t('special.viewAll')}</Link>
            </motion.div>
          </div>

          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '1.5rem',
            paddingBottom: '1rem',
            scrollSnapType: 'x mandatory'
          }} className="no-scrollbar">
            {[
              { id: '1', name: t('special.items.avakaya'), telugu: "ఆవకాయ", price: 300, price1kg: 600, rating: 5, reviews: 150, image: "/images/mango.png", category: 'Veg' },
              { id: '12', name: t('special.items.chicken'), telugu: "కోడి పచ్చడి", price: 400, price1kg: 800, rating: 5, reviews: 98, image: "/images/chicken.png", category: 'Non-veg' },
              { id: '4', name: t('special.items.gongura'), telugu: "గోంగూర", price: 275, price1kg: 550, rating: 4, reviews: 112, image: "/images/Gongura.png", category: 'Veg' },
              { id: '7', name: t('special.items.ginger'), telugu: "అల్లం పచ్చడి", price: 250, price1kg: 500, rating: 5, reviews: 80, image: "/images/Ginger.png", category: 'Veg' },
              { id: '16', name: t('special.items.prawns'), telugu: "రొయ్యల పచ్చడి", price: 500, price1kg: 1000, rating: 5, reviews: 105, image: "/images/prawns.png", category: 'Non-veg' }
            ].map((item, i) => (
              <motion.div variants={itemVariant} key={i}>
                <Link href={`/shop/${item.id}`} className="card group" style={{
                  minWidth: '280px',
                  maxWidth: '280px',
                  scrollSnapAlign: 'start',
                  flexShrink: 0,
                  textDecoration: 'none',
                  display: 'block'
                }}>
                  <div style={{
                    height: '200px',
                    background: '#fff',
                    borderRadius: '1rem',
                    marginBottom: '0.75rem',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }} className="group-hover:scale-[1.02] group-hover:shadow-lg">
                    <span style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: item.category === 'Veg' ? '#4caf50' : '#f44336',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      zIndex: 2,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      {item.category === 'Veg' ? t('special.veg') : t('special.nonVeg')}
                    </span>

                    {item.image ? (
                      <div 
                          style={{ width: '100%', height: '100%', position: 'relative' }}
                          onDoubleClick={(e) => handleDoubleTap(item.id, e)}
                      >
                        <div style={{
                              position: 'absolute',
                              top: 0, left: 0, right: 0, bottom: 0,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              zIndex: 5, pointerEvents: 'none',
                              opacity: doubleTapItem === item.id ? 1 : 0,
                              transform: doubleTapItem === item.id ? 'scale(1)' : 'scale(0.5)',
                              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                          }}>
                              <Heart size={80} color="white" fill="#ef4444" style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }} />
                        </div>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, 280px"
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: '0',
                          left: '0',
                          right: '0',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                          padding: '1rem 0.5rem 0.5rem',
                          color: 'white',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          zIndex: 2,
                          pointerEvents: 'none'
                        }}>
                          {item.name}
                        </div>

                        {/* Native Mobile Share Button */}
                        <button
                          onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (typeof navigator !== 'undefined' && navigator.share) {
                                  navigator.share({
                                      title: item.name,
                                      text: t('special.shareText').replace('{item}', item.name),
                                      url: window.location.origin + `/shop/${item.id}`,
                                  }).catch(() => {});
                              } else {
                                  navigator.clipboard.writeText(window.location.origin + `/shop/${item.id}`);
                                  alert(t('special.copied'));
                              }
                          }}
                          style={{
                              position: 'absolute',
                              bottom: '10px',
                              right: '10px',
                              background: 'rgba(255, 255, 255, 0.9)',
                              backdropFilter: 'blur(4px)',
                              padding: '8px',
                              borderRadius: '50%',
                              zIndex: 10,
                              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                              color: 'var(--primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: 'none',
                              cursor: 'pointer'
                          }}
                          className="mobile-share-btn"
                          aria-label="Share product"
                      >
                          <Share2 size={18} />
                      </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '4rem' }}>🥒</span>
                    )}
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.2rem', fontSize: '1.1rem', color: 'var(--foreground)' }}>{item.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '1rem' }}>{item.telugu}</p>
                  </div>
                  <div style={{ 
                      background: '#f8fafc', 
                      padding: '0.75rem', 
                      borderRadius: '0.75rem', 
                      border: '1px solid #e2e8f0',
                      marginTop: 'auto'
                  }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>500g</span>
                          <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary)' }}>₹{item.price}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #cbd5e1', paddingTop: '6px' }}>
                          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>1kg</span>
                          <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary)' }}>₹{item.price1kg}</span>
                      </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About Preview - Village Story */}
      <section id="about" style={{ padding: '6rem 0', overflow: 'hidden' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariantLeft}
            >
              <span style={{ color: 'var(--secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('about.roots')}</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>{t('about.title')}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                {t('about.p1')}
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                {t('about.p2')}
              </p>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariantRight}
              style={{
                height: '400px',
                background: 'url("https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?q=80&w=1000&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative'
              }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '2rem',
                  background: 'rgba(255,255,255,0.9)',
                  padding: '1rem',
                  borderRadius: 'var(--radius)',
                  maxWidth: '80%',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--primary)' }}>{t('about.authentic')}</p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{t('about.grinding')}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '6rem 0', background: 'var(--surface-hover)', overflow: 'hidden' }}>
        <motion.div 
          className="container text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={itemVariant} style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>{t('contact.title')}</motion.h2>
          <motion.p variants={itemVariant} style={{ fontSize: '1.2rem', marginBottom: '3rem', color: 'var(--muted)' }}>{t('contact.subtitle')}</motion.p>

          <motion.div variants={itemVariant} className="card text-center" style={{ 
            maxWidth: '650px', 
            width: '95%',
            margin: '0 auto', 
            padding: '4rem 2rem', 
            background: 'linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)',
            border: '1px solid rgba(0, 101, 54, 0.1)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.06), 0 0 0 8px rgba(255,255,255,0.6) inset',
            borderRadius: '2rem'
          }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ 
                  fontSize: 'clamp(2rem, 5vw, 2.5rem)', 
                  marginBottom: '1.25rem', 
                  color: 'var(--primary)', 
                  fontWeight: '800',
                  letterSpacing: '-0.5px' 
              }}>
                Godavari Pickles
              </h3>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.85rem', 
                  background: 'white', 
                  padding: '0.85rem 1.75rem', 
                  borderRadius: '50px', 
                  boxShadow: '0 8px 25px rgba(0,101,54,0.08)',
                  border: '1px solid rgba(0,101,54,0.05)',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '1.5rem', display: 'flex' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#25D366' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </span>
                <p style={{ fontSize: '1.25rem', color: 'var(--foreground)', fontWeight: '700', margin: 0, letterSpacing: '0.5px' }}>+91 90144 75499</p>
              </motion.div>
            </div>

            <div style={{ width: '80px', height: '4px', background: 'var(--secondary)', margin: '0 auto 2.5rem', borderRadius: '4px', opacity: 0.8 }}></div>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
                {t('contact.follow')}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
              <motion.a 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.instagram.com/godavaripickles_?igsh=YmdocnlsZ3V4YzAy" target="_blank" rel="noopener noreferrer" style={{ 
                  borderRadius: '1rem', 
                  width: '50px', 
                  height: '50px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', 
                  color: 'white',
                  boxShadow: '0 8px 16px rgba(225, 48, 108, 0.25)'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </motion.a>

              <motion.a 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.facebook.com/share/1AnrSFb9w8/" target="_blank" rel="noopener noreferrer" style={{ 
                  borderRadius: '1rem', 
                  width: '50px', 
                  height: '50px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  background: '#1877F2', 
                  color: 'white',
                  boxShadow: '0 8px 16px rgba(24, 119, 242, 0.25)'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round"><path fill="currentColor" fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
