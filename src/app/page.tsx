import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <div className="animate-fade-in">
          <h1 style={{ maxWidth: '800px', margin: '0 auto 1.5rem' }}>
            Authentic Homemade Pickles, <br />
            <span style={{ color: 'var(--primary)' }}>Delivered to Your Doorstep</span>
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Experience the taste of tradition with our handcrafted pickles made from secret family recipes.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/shop" className="btn btn-primary">
              Shop Now <ArrowRight size={20} />
            </Link>
            <Link href="/about" className="btn btn-outline">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section style={{ background: 'var(--surface-hover)', padding: '4rem 0' }}>
        <div className="container">
          <h2 className="text-center mb-4">Best Sellers</h2>
          <div className="grid grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card">
                <div style={{
                  height: '200px',
                  background: '#e0e0e0',
                  borderRadius: 'var(--radius)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted)'
                }}>
                  Pickle Image {i}
                </div>
                <h3>Spicy Mango Pickle</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex" style={{ color: 'var(--secondary)' }}>
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>(120 reviews)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>₹250</span>
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
