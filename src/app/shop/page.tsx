'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ShopPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.category === filter);

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="mb-0">Shop Pickles</h1>

                    <div className="flex gap-2">
                        {['All', 'Veg', 'Non-veg'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                                style={{ padding: '0.5rem 1rem' }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredProducts.map((product: any) => (
                        <div key={product.id} className="card flex flex-col justify-between group">
                            <div>
                                <div style={{
                                    height: '200px',
                                    background: '#f5f5f5',
                                    borderRadius: 'var(--radius)',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        background: product.category === 'Veg' ? '#4caf50' : '#f44336',
                                        color: 'white',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {product.category === 'Veg' ? 'VEG' : 'NON-VEG'}
                                    </span>
                                    <span style={{ fontSize: '3rem' }}>
                                        {product.category === 'Veg' ? '🥒' : '🍗'}
                                    </span>
                                </div>
                                <h3>{product.name}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>{product.description}</p>
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)' }}>₹{product.price}</span>
                                <Link href={`/shop/${product.id}`} className="btn btn-outline hover:bg-primary hover:text-white" style={{ padding: '0.5rem 1rem' }}>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
