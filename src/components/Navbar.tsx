'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();

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

        <div className="flex items-center gap-4">
          <Link href="/cart" className="btn btn-outline relative" style={{ padding: '0.5rem' }}>
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'var(--accent)',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
