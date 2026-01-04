'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowRight, Star, Leaf, Award, Heart, Truck } from 'lucide-react';
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
        <div className="container animate-fade-in">
          <h1 style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            color: '#ffffff',
            fontFamily: 'serif'
          }}>
            {t('hero.title')}
          </h1>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '2rem',
            color: 'var(--secondary)',
            fontWeight: '400'
          }}>
            {t('hero.subtitle')}
          </h2>
          <p style={{
            fontSize: '1.25rem',
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
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/shop" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}>
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Leaf size={32} />, title: t('whyChoose.farmFresh.title'), desc: t('whyChoose.farmFresh.desc') },
              { icon: <Heart size={32} />, title: t('whyChoose.traditional.title'), desc: t('whyChoose.traditional.desc') },
              { icon: <Award size={32} />, title: t('whyChoose.noPreservatives.title'), desc: t('whyChoose.noPreservatives.desc') },
              { icon: <Truck size={32} />, title: t('whyChoose.villageToCity.title'), desc: t('whyChoose.villageToCity.desc') }
            ].map((feature, i) => (
              <div key={i} className="card text-center hover:scale-105 transition-all duration-300" style={{
                padding: '2.5rem 1.5rem',
                border: '1px solid rgba(0,0,0,0.05)',
                background: 'linear-gradient(145deg, var(--surface), var(--surface-hover))',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                borderRadius: '1.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: 'linear-gradient(90deg, var(--primary), var(--secondary))'
                }}></div>
                <div style={{
                  background: 'rgba(0, 101, 54, 0.1)', // Updated green
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'var(--primary)'
                }}>
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
            <Link href="/shop" className="btn btn-outline" style={{ padding: '0.25rem 0.8rem', fontSize: '0.85rem' }}>{t('special.viewAll')}</Link>
          </div>

          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '1.5rem',
            paddingBottom: '1rem',
            scrollSnapType: 'x mandatory'
          }} className="no-scrollbar">
            {[
              { name: t('special.items.avakaya'), telugu: "ఆవకాయ", price: 250, rating: 5, reviews: 150, img: "🥭", category: 'Veg' },
              { name: t('special.items.chicken'), telugu: "కోడి పచ్చడి", price: 450, rating: 5, reviews: 98, img: "🍗", category: 'Non-veg' },
              { name: t('special.items.gongura'), telugu: "గోంగూర", price: 280, rating: 4, reviews: 112, img: "🍃", category: 'Veg' },
              { name: t('special.items.ginger'), telugu: "అల్లం పచ్చడి", price: 220, rating: 5, reviews: 80, img: "🫚", category: 'Veg' },
              { name: t('special.items.prawns'), telugu: "రొయ్యల పచ్చడి", price: 550, rating: 5, reviews: 105, img: "🦐", category: 'Non-veg' }
            ].map((item, i) => (
              <div key={i} className="card group" style={{
                minWidth: '280px',
                maxWidth: '280px',
                scrollSnapAlign: 'start',
                flexShrink: 0
              }}>
                <div style={{
                  height: '160px',
                  background: '#fdfcf8',
                  borderRadius: 'var(--radius)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  transition: 'transform 0.3s ease',
                  border: '1px solid var(--border)',
                  position: 'relative'
                }} className="group-hover:scale-[1.02]">
                  <span style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: item.category === 'Veg' ? '#4caf50' : '#f44336',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}>
                    {item.category === 'Veg' ? 'VEG' : 'NON-VEG'}
                  </span>
                  {item.img}
                </div>
                <div>
                  <h3 style={{ marginBottom: '0.2rem', fontSize: '1.1rem' }}>{item.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600' }}>{item.telugu}</p>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex" style={{ color: 'var(--secondary)' }}>
                    {[...Array(item.rating)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>({item.reviews} reviews)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--primary)' }}>₹{item.price}</span>
                  {/* Removed Add to Cart button */}
                </div>
              </div>
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

          <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Rama Lakshmi</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 'bold' }}>+91 90144 75499</p>
            </div>

            <div className="flex justify-center gap-6 mt-8">
              {/* Instagram Placeholder */}
              <a href="#" className="btn btn-outline" style={{ borderRadius: '50%', width: '50px', height: '50px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>

              {/* Facebook Placeholder */}
              <a href="#" className="btn btn-outline" style={{ borderRadius: '50%', width: '50px', height: '50px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--muted)' }}>{t('contact.follow')}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
