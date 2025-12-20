'use client';

import Link from 'next/link';


export default function Navbar() {


  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            PicklePerfect
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/shop" className="nav-link">Shop</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>


      </div>
    </nav>
  );
}
