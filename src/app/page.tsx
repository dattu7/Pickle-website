import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowRight, Star, Leaf, Award, Heart, Truck } from 'lucide-react';

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1623687398236-40742d410268?q=80&w=1920&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '8rem 1rem',
        textAlign: 'center',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="container animate-fade-in">
          <h1 style={{
            fontSize: '3.5rem',
            marginBottom: '1.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            color: 'white'
          }}>
            Taste the Tradition of <br />
            <span style={{ color: 'var(--secondary)' }}>Authentic Homemade Pickles</span>
          </h1>
          <p style={{
            fontSize: '1.5rem',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            color: '#f0f0f0'
          }}>
            Handcrafted with love, using secret family recipes and the finest organic ingredients.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/shop" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
              Shop Now <ArrowRight size={24} />
            </Link>
            <Link href="/about" className="btn" style={{
              background: 'white',
              color: 'var(--foreground)',
              padding: '1rem 2rem',
              fontSize: '1.2rem'
            }}>
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: '6rem 0', background: 'var(--background)' }}>
        <div className="container">
          <h2 className="text-center mb-8" style={{ fontSize: '2.5rem' }}>Why PicklePerfect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Leaf size={40} />, title: "100% Natural", desc: "No preservatives or artificial colors." },
              { icon: <Heart size={40} />, title: "Homemade", desc: "Made in small batches with love." },
              { icon: <Award size={40} />, title: "Premium Quality", desc: "Finest spices and oils used." },
              { icon: <Truck size={40} />, title: "Fast Delivery", desc: "Fresh to your doorstep." }
            ].map((feature, i) => (
              <div key={i} className="card text-center hover:scale-105 transition-transform duration-300" style={{ padding: '2rem' }}>
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

      {/* Featured Section */}
      <section style={{ background: 'var(--surface-hover)', padding: '6rem 0' }}>
        <div className="container">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 style={{ marginBottom: '0.5rem' }}>Best Sellers</h2>
              <p>Our most loved pickles by customers</p>
            </div>
            <Link href="/shop" className="btn btn-outline">View All</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Spicy Mango", price: 250, rating: 5, reviews: 120, img: "🥭" },
              { name: "Chicken Pickle", price: 450, rating: 5, reviews: 85, img: "🍗" },
              { name: "Gongura", price: 280, rating: 4, reviews: 95, img: "🍃" }
            ].map((item, i) => (
              <div key={i} className="card group">
                <div style={{
                  height: '250px',
                  background: '#e0e0e0',
                  borderRadius: 'var(--radius)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  transition: 'transform 0.3s ease'
                }} className="group-hover:scale-[1.02]">
                  {item.img}
                </div>
                <h3>{item.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex" style={{ color: 'var(--secondary)' }}>
                    {[...Array(item.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>({item.reviews} reviews)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)' }}>₹{item.price}</span>
                  <Link href="/shop" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Shop Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our Secret Recipe</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                It all started in my grandmother's kitchen, where the aroma of freshly ground spices and roasting mustard seeds filled the air.
                For generations, we have preserved the art of pickle making, ensuring every jar captures the authentic taste of home.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                We use only sun-dried spices, cold-pressed oils, and locally sourced vegetables to bring you a pickle that tastes just like Nani used to make.
              </p>
              <Link href="/about" className="btn btn-outline">Read Our Full Story</Link>
            </div>
            <div style={{
              height: '400px',
              background: '#f5f5f5',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'var(--muted)'
            }}>
              Family Photo Placeholder
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
