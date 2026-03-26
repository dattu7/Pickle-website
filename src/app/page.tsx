'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Leaf, Award, Heart, Truck, Share2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

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
        flexDirection: 'column'
      }}>
        <div className="container animate-fade-in" style={{ padding: '0 10px' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 10vw, 4rem)',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            color: '#ffffff',
            fontFamily: 'serif'
          }}>
            {t('hero.title')}
          </h1>
          <h2 style={{
            fontSize: 'clamp(1.4rem, 6vw, 2rem)',
            marginBottom: '2rem',
            color: 'var(--secondary)',
            fontWeight: '400'
          }}>
            {t('hero.subtitle')}
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 5vw, 1.25rem)',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            color: '#f0f0f0',
            lineHeight: '1.6'
          }}>
            {t('hero.description')}
            <br />
            <span style={{ fontStyle: 'italic', marginTop: '0.5rem', display: 'block' }}>{t('hero.quote')}</span>
          </p>

          <div style={{ marginBottom: '2rem', display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', padding: '0.5rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.4)' }}>
            <span style={{ color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={20} /> {t('hero.shipping')}
            </span>
          </div>
          <div className="flex justify-center gap-4 flex-wrap hero-buttons" style={{ maxWidth: '500px', margin: '0 auto' }}>
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
          </div>
        </div>
      </section>

      {/* Why Choose Godavari Pickles? */}
      <section style={{ padding: '6rem 0', background: 'var(--background)' }}>
        <div className="container">
          <h2 className="text-center mb-2" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>{t('whyChoose.title')}</h2>
          <p className="text-center mb-12" style={{ fontSize: '1.2rem' }}>{t('whyChoose.subtitle')}</p>

          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '1.5rem',
            paddingBottom: '2rem', // Increased padding for shadow
            scrollSnapType: 'x mandatory',
            justifyContent: 'flex-start'
          }} className="no-scrollbar">
            {[
              {
                icon: <Leaf size={32} />,
                title: t('whyChoose.farmFresh.title'),
                desc: t('whyChoose.farmFresh.desc'),
                color: '#4caf50', // Green
                bg: '#e8f5e9'
              },
              {
                icon: <Heart size={32} />,
                title: t('whyChoose.traditional.title'),
                desc: t('whyChoose.traditional.desc'),
                color: '#ff9800', // Orange/Gold
                bg: '#fff3e0'
              },
              {
                icon: <Award size={32} />,
                title: t('whyChoose.noPreservatives.title'),
                desc: t('whyChoose.noPreservatives.desc'),
                color: '#f44336', // Red
                bg: '#ffebee'
              },
              {
                icon: <Truck size={32} />,
                title: t('whyChoose.villageToCity.title'),
                desc: t('whyChoose.villageToCity.desc'),
                color: '#2196f3', // Blue
                bg: '#e3f2fd'
              }
            ].map((feature, i) => (
              <div key={i} className="card text-center hover:scale-105 transition-all duration-300 animate-slide-in-right" style={{
                minWidth: '300px', // Wider cards
                flex: '0 0 auto', // Don't grow or shrink, fixed width based on minWidth
                scrollSnapAlign: 'center', // Center alignment for carousel feel
                padding: '2.5rem 1.5rem',
                border: `1px solid ${feature.color}20`, // Subtle colored border
                background: 'var(--surface)',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                borderRadius: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                animationDelay: `${i * 0.2}s`
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: feature.color
                }}></div>
                <div style={{
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
                }} className="floating-icon">
                  {feature.icon}
                </div>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '800', color: 'var(--foreground)' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--muted)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section - Telugu Names */}
      <section style={{ background: 'var(--surface-hover)', padding: '6rem 0' }}>
        <div className="container">
          <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
            <div>
              <h2 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>{t('special.title')}</h2>
              <p>{t('special.subtitle')}</p>
            </div>
            <Link href="/shop?section=special" className="btn btn-outline" style={{ padding: '0.25rem 0.8rem', fontSize: '0.85rem' }}>{t('special.viewAll')}</Link>
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
              <Link key={i} href={`/shop/${item.id}`} className="card group" style={{
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
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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
            ))}
          </div>
        </div>
      </section>

      {/* About Preview - Village Story */}
      <section id="about" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span style={{ color: 'var(--secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('about.roots')}</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>{t('about.title')}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                {t('about.p1')}
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                {t('about.p2')}
              </p>

            </div>
            <div style={{
              height: '400px',
              background: 'url("https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?q=80&w=1000&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '2rem',
                background: 'rgba(255,255,255,0.9)',
                padding: '1rem',
                borderRadius: 'var(--radius)',
                maxWidth: '80%'
              }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--primary)' }}>{t('about.authentic')}</p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{t('about.grinding')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '6rem 0', background: 'var(--surface-hover)' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>{t('contact.title')}</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '3rem', color: 'var(--muted)' }}>{t('contact.subtitle')}</p>

          <div className="card text-center" style={{ 
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
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.85rem', 
                background: 'white', 
                padding: '0.85rem 1.75rem', 
                borderRadius: '50px', 
                boxShadow: '0 8px 25px rgba(0,101,54,0.08)',
                border: '1px solid rgba(0,101,54,0.05)' 
              }}>
                <span style={{ fontSize: '1.5rem', display: 'flex' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#25D366' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </span>
                <p style={{ fontSize: '1.25rem', color: 'var(--foreground)', fontWeight: '700', margin: 0, letterSpacing: '0.5px' }}>+91 90144 75499</p>
              </div>
            </div>

            <div style={{ width: '80px', height: '4px', background: 'var(--secondary)', margin: '0 auto 2.5rem', borderRadius: '4px', opacity: 0.8 }}></div>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
                {t('contact.follow')}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
              <a href="https://www.instagram.com/godavaripickles_?igsh=YmdocnlsZ3V4YzAy" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" style={{ 
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
              </a>

              <a href="https://www.facebook.com/share/1AnrSFb9w8/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" style={{ 
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
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
