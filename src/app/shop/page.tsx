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
        { id: '1', name: t('special.items.avakaya'), telugu: 'ఆవకాయ', price: 300, price1kg: 600, rating: 5, reviews: 150, image: '/images/mango.png', category: 'Veg' },
        { id: '12', name: t('special.items.chicken'), telugu: 'కోడి పచ్చడి', price: 400, price1kg: 800, rating: 5, reviews: 98, image: '/images/chicken.png', category: 'Non-veg' },
        { id: '4', name: t('special.items.gongura'), telugu: 'గోంగూర', price: 275, price1kg: 550, rating: 4, reviews: 112, image: '/images/Gongura.png', category: 'Veg' },
        { id: '7', name: t('special.items.ginger'), telugu: 'అల్లం పచ్చడి', price: 250, price1kg: 500, rating: 5, reviews: 80, image: '/images/Ginger.png', category: 'Veg' },
        { id: '16', name: t('special.items.prawns'), telugu: 'రొయ్యల పచ్చడి', price: 500, price1kg: 1000, rating: 5, reviews: 105, image: '/images/prawns.png', category: 'Non-veg' }
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
                        <div style={{ padding: '0 0 1rem 0', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <Link href={`/shop/${product.id}`} style={{ cursor: 'pointer', textDecoration: 'none', display: 'flex', flexDirection: 'column', flex: 1 }}>
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
                                        padding: '2px 8px',
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        zIndex: 2,
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
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
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                                                padding: '1rem 0.5rem 0.5rem',
                                                color: 'white',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                zIndex: 2
                                            }}>
                                                {product.name}
                                            </div>
                                        </>
                                    ) : (
                                        <span style={{ fontSize: '3rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                            {product.category === 'Non-veg' ? '🍗' : (product.category === 'Podi' ? '🌶️' : '🥒')}
                                        </span>
                                    )}
                                </div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--foreground)' }}>{product.name}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem', flex: 1 }}>
                                    {product.description}
                                </p>
                            </Link>
                        </div>

                        <div style={{ 
                            background: '#f8fafc', 
                            padding: '0.75rem', 
                            borderRadius: '0.75rem', 
                            border: '1px solid #e2e8f0',
                            marginTop: 'auto'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: product.category === 'Podi' ? '0' : '6px' }}>
                                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>{product.category === 'Podi' ? '250g' : '500g'}</span>
                                <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary)' }}>₹{product.price}</span>
                            </div>
                            {product.category !== 'Podi' && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #cbd5e1', paddingTop: '6px' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>1kg</span>
                                    <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary)' }}>₹{product.price1kg || product.price * 2}</span>
                                </div>
                            )}
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
                                <Link href={`/shop/${item.id}`} style={{ cursor: 'pointer', textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
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
                                            padding: '2px 8px',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            zIndex: 2,
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
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
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                                                padding: '1rem 0.5rem 0.5rem',
                                                color: 'white',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                zIndex: 2
                                            }}>
                                                {item.name}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 style={{ marginBottom: '0.2rem', fontSize: '1.1rem', color: 'var(--foreground)' }}>{item.name}</h3>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '1rem' }}>{item.telugu}</p>
                                    </div>
                                    <div style={{ 
                                        background: '#f8fafc', 
                                        padding: '0.75rem', 
                                        borderRadius: '0.75rem', 
                                        border: '1px solid #e2e8f0',
                                        marginTop: 'auto'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>500g</span>
                                            <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary)' }}>₹{item.price}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #cbd5e1', paddingTop: '6px' }}>
                                            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>1kg</span>
                                            <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary)' }}>₹{item.price1kg}</span>
                                        </div>
                                    </div>
                                </Link>
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
