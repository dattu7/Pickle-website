'use client';

import Link from 'next/link';


export default function Navbar() {


  return (
    <nav className="navbar" style={{ padding: 0 }}>
      <div style={{ background: 'var(--primary)', color: 'white', textAlign: 'center', padding: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
        🚚 We Deliver All Over India | భారతదేశం అంతటా డెలివరీ కలదు
      </div>
      <div className="container flex justify-between items-center" style={{ padding: '1rem' }}>
        <Link href="/" className="flex items-center gap-2">
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            Godavari Pickles
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/shop" className="nav-link">Shop</Link>
          <Link href="/#about" className="nav-link">About</Link>
          <Link href="/#contact" className="nav-link">Contact</Link>
        </div>


      </div>
    </nav>
  );
}
