import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowRight, Star, Leaf, Award, Heart, Truck } from 'lucide-react';

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("/images/background1.png")', // Changed to a more rustic/village looking image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
            fontFamily: 'serif' // More traditional feel
          }}>
            Godavari Pickles
          </h1>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '2rem',
            color: 'var(--secondary)',
            fontWeight: '400'
          }}>
            గోదావరి రుచులు - Authentic West Godavari Tastes
          </h2>
          <p style={{
            fontSize: '1.25rem',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            color: '#f0f0f0',
            lineHeight: '1.6'
          }}>
            Experience the nostalgia of our village. Handcrafted in the heart of West Godavari using generations-old recipes.
            <br />
            <span style={{ fontStyle: 'italic', marginTop: '0.5rem', display: 'block' }}>"మా ఊరి రుచి, మీ ఇంటికి" (Our village taste, to your home)</span>
          </p>

          <div style={{ marginBottom: '2rem', display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', padding: '0.5rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.4)' }}>
            <span style={{ color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={20} /> Shipping All Over India 🇮🇳
            </span>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/shop" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}>
              Order Now <ArrowRight size={24} />
            </Link>
            <Link href="/about" className="btn" style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(5px)',
              border: '2px solid white',
              color: 'white',
              padding: '1rem 2.5rem',
              fontSize: '1.2rem'
            }}>
              Our Village Story
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Godavari Pickles? */}
      <section style={{ padding: '6rem 0', background: 'var(--background)' }}>
        <div className="container">
          <h2 className="text-center mb-2" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Why Godavari Pickles?</h2>
          <p className="text-center mb-12" style={{ fontSize: '1.2rem' }}>Pure, Authentic, and Made with Love</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Leaf size={40} />, title: "Farm Fresh", desc: "Ingredients sourced directly from Godavari farmers." },
              { icon: <Heart size={40} />, title: "Traditional Recipe", desc: "Made just like Ammamma (Grandma) used to." },
              { icon: <Award size={40} />, title: "No Preservatives", desc: "100% Natural sun-dried spices and oils." },
              { icon: <Truck size={40} />, title: "Village to City", desc: "Delivering the taste of home everywhere." }
            ].map((feature, i) => (
              <div key={i} className="card text-center hover:scale-105 transition-transform duration-300" style={{ padding: '2rem', borderTop: '4px solid var(--secondary)' }}>
                <div style={{
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p>{feature.desc}</p>
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
              <h2 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>Mana Special Pickles</h2>
              <p>Our most loved varieties from the Godavari region</p>
            </div>
            <Link href="/shop" className="btn btn-outline" style={{ padding: '0.25rem 0.8rem', fontSize: '0.85rem' }}>View All Varieties</Link>
          </div>

          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '1.5rem',
            paddingBottom: '1rem',
            scrollSnapType: 'x mandatory'
          }} className="no-scrollbar">
            {[
              { name: "Avakaya (Mango)", telugu: "ఆవకాయ", price: 250, rating: 5, reviews: 150, img: "🥭", category: 'Veg' },
              { name: "Kodi Pachadi (Chicken)", telugu: "కోడి పచ్చడి", price: 450, rating: 5, reviews: 98, img: "🍗", category: 'Non-veg' },
              { name: "Gongura Pachadi", telugu: "గోంగూర", price: 280, rating: 4, reviews: 112, img: "🍃", category: 'Veg' },
              { name: "Allam Pachadi (Ginger)", telugu: "అల్లం పచ్చడి", price: 220, rating: 5, reviews: 80, img: "🫚", category: 'Veg' },
              { name: "Royyala Pachadi (Prawns)", telugu: "రొయ్యల పచ్చడి", price: 550, rating: 5, reviews: 105, img: "🦐", category: 'Non-veg' }
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
                  <Link href="/shop" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Add to Cart</Link>
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
              <span style={{ color: 'var(--secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Roots</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>From West Godavari to Your Plate</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Born in the lush green fields of West Godavari, our pickles carry the essence of our village.
                We still follow the age-old tradition of selecting the raw mangoes from our own orchards and sun-drying our spices on the terraces.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                Every jar of <strong>Godavari Pickles</strong> is a tribute to the culinary heritage of Andhra Pradesh.
                We don't just sell pickles; we share a piece of our home with you.
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
                <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--primary)' }}>Authentic Preparation</p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Traditional stone grinding</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '6rem 0', background: 'var(--surface-hover)' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Contact Us</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '3rem', color: 'var(--muted)' }}>We'd love to hear from you!</p>

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
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Follow us for updates and offers!</p>
          </div>
        </div>
      </section>
    </main>
  );
}
