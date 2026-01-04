'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function ShopPage() {
    const { t } = useLanguage();
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const vegProducts = products.filter(p => p.category === 'Veg');
    const nonVegProducts = products.filter(p => p.category === 'Non-veg');
    const podiProducts = products.filter(p => p.category === 'Podi');

    const ProductSection = ({ title, items }: { title: string, items: any[] }) => (
        <div className="mb-12">
            <h2 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--primary)', borderLeft: '4px solid var(--secondary)', paddingLeft: '1rem' }}>
                {title}
            </h2>
            <div style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '1.5rem',
                paddingBottom: '1rem',
                scrollSnapType: 'x mandatory'
            }} className="no-scrollbar">
                {items.map((product: any) => (
                    <div key={product.id} className="card flex flex-col justify-between group" style={{
                        minWidth: '280px', // Reduced width
                        maxWidth: '280px',
                        scrollSnapAlign: 'start',
                        flexShrink: 0
                    }}>
                        <div>
                            <div style={{
                                height: '160px', // Reduced height
                                background: '#f5f5f5',
                                borderRadius: 'var(--radius)',
                                marginBottom: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    background: product.category === 'Non-veg' ? '#f44336' : (product.category === 'Podi' ? '#ed6c02' : '#4caf50'),
                                    color: 'white',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold'
                                }}>
                                    {product.category === 'Non-veg' ? 'NON-VEG' : (product.category === 'Podi' ? 'PODI' : 'VEG')}
                                </span>
                                <span style={{ fontSize: '3rem' }}>
                                    {product.category === 'Non-veg' ? '🍗' : (product.category === 'Podi' ? '🌶️' : '🥒')}
                                </span>
                            </div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {product.description}
                            </p>
                        </div>

                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--primary)' }}>₹{product.price}</span>
                            <Link href={`/shop/${product.id}`} className="btn btn-outline hover:bg-primary hover:text-white" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
                                {t('shop.view')}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="mb-0" style={{ fontSize: '2rem' }}>{t('shop.title')}</h1>
                </div>

                <ProductSection title={t('shop.veg')} items={vegProducts} />
                <ProductSection title={t('shop.nonVeg')} items={nonVegProducts} />
                <ProductSection title={t('shop.podis')} items={podiProducts} />
            </div>
        </main>
    );
}
