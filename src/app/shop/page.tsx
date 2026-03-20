'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Star } from 'lucide-react';

export default function ShopPage() {
    const { t } = useLanguage();
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const specialItems = [
        { id: '1', name: t('special.items.avakaya'), telugu: 'ఆవకాయ', price: 250, rating: 5, reviews: 150, image: '/images/mango.png', category: 'Veg' },
        { id: '12', name: t('special.items.chicken'), telugu: 'కోడి పచ్చడి', price: 450, rating: 5, reviews: 98, image: '/images/chicken.png', category: 'Non-veg' },
        { id: '4', name: t('special.items.gongura'), telugu: 'గోంగూర', price: 280, rating: 4, reviews: 112, image: '/images/Gongura.png', category: 'Veg' },
        { id: '7', name: t('special.items.ginger'), telugu: 'అల్లం పచ్చడి', price: 220, rating: 5, reviews: 80, image: '/images/Ginger.png', category: 'Veg' },
        { id: '16', name: t('special.items.prawns'), telugu: 'రొయ్యల పచ్చడి', price: 550, rating: 5, reviews: 105, image: '/images/prawns.png', category: 'Non-veg' }
    ];

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
                        minWidth: '280px',
                        maxWidth: '280px',
                        scrollSnapAlign: 'start',
                        flexShrink: 0
                    }}>
                        <div>
                            <Link href={`/shop/${product.id}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
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
                                        background: product.category === 'Non-veg' ? '#f44336' : (product.category === 'Podi' ? '#ed6c02' : '#4caf50'),
                                        color: 'white',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontSize: '0.7rem',
                                        fontWeight: 'bold',
                                        zIndex: 2
                                    }}>
                                        {product.category === 'Non-veg' ? 'NON-VEG' : (product.category === 'Podi' ? 'PODI' : 'VEG')}
                                    </span>
                                    {product.image ? (
                                        <>
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width: 768px) 100vw, 280px"
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '0',
                                                left: '0',
                                                right: '0',
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))',
                                                padding: '0.35rem 0.5rem',
                                                color: 'white',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                                                zIndex: 2
                                            }}>
                                                {product.name}
                                            </div>
                                        </>
                                    ) : (
                                        <span style={{ fontSize: '3rem' }}>
                                            {product.category === 'Non-veg' ? '🍗' : (product.category === 'Podi' ? '🌶️' : '🥒')}
                                        </span>
                                    )}
                                </div>
                            </Link>
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

                {/* Mana Special Pickles Section */}
                <div style={{ marginBottom: '4rem' }}>
                    <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
                        <div>
                            <h2 style={{ marginBottom: '0.5rem', color: 'var(--primary)', fontSize: '2rem', fontWeight: 'bold' }}>{t('special.title')}</h2>
                            <p style={{ fontSize: '1rem', color: 'var(--muted)' }}>{t('special.subtitle')}</p>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '1.5rem',
                        paddingBottom: '1rem',
                        scrollSnapType: 'x mandatory'
                    }} className="no-scrollbar">
                        {specialItems.map((item, i) => (
                            <div key={i} className="card group" style={{
                                minWidth: '280px',
                                maxWidth: '280px',
                                scrollSnapAlign: 'start',
                                flexShrink: 0
                            }}>
                                <Link href={`/shop/${item.id}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
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
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            fontSize: '0.7rem',
                                            fontWeight: 'bold',
                                            zIndex: 2
                                        }}>
                                            {item.category === 'Veg' ? 'VEG' : 'NON-VEG'}
                                        </span>

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
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))',
                                                padding: '0.35rem 0.5rem',
                                                color: 'white',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                                                zIndex: 2
                                            }}>
                                                {item.name}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <ProductSection title={t('shop.veg')} items={vegProducts} />
                <ProductSection title={t('shop.nonVeg')} items={nonVegProducts} />
                <ProductSection title={t('shop.podis')} items={podiProducts} />
            </div>
        </main>
    );
}
