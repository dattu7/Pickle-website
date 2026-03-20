'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MessageCircle, Star } from 'lucide-react';
// import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

export default function ProductPage({ params }: { params: { id: string } }) {
    // const { addToCart } = useCart();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch product data from API since this is now a client component
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                const found = data.find((p: any) => p.id === params.id);
                setProduct(found);
                setLoading(false);
            });
    }, [params.id]);

    if (loading) {
        return (
            <main>
                <Navbar />
                <div className="container" style={{ padding: '2rem 1rem' }}>
                    <div className="card" style={{ padding: '2rem' }}>
                        <p style={{ margin: 0, color: 'var(--muted)' }}>Loading product details...</p>
                    </div>
                </div>
            </main>
        );
    }

    if (!product) {
        return (
            <main>
                <Navbar />
                <div className="container" style={{ padding: '2rem 1rem' }}>
                    <Link href="/shop" className="flex items-center gap-2 mb-4" style={{ color: 'var(--muted)' }}>
                        <ArrowLeft size={20} /> Back to Shop
                    </Link>
                    <div className="card" style={{ padding: '2rem' }}>
                        <h2 style={{ marginBottom: '0.5rem' }}>Product not found</h2>
                        <p style={{ marginBottom: 0 }}>The product you are trying to open is unavailable.</p>
                    </div>
                </div>
            </main>
        );
    }

    const rating = 5;
    const reviews = product.category === 'Veg' ? 112 : product.category === 'Non-veg' ? 98 : 74;
    const whatsappText = encodeURIComponent(`Hi! I want to buy ${product.name} for ₹${product.price}. Please share details.`);
    const categoryBadgeColor = product.category === 'Non-veg' ? '#f44336' : product.category === 'Podi' ? '#ed6c02' : '#4caf50';
    const categoryLabel = product.category === 'Non-veg' ? 'NON-VEG' : product.category === 'Podi' ? 'PODI' : 'VEG';

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <Link href="/shop" className="flex items-center gap-2 mb-4" style={{ color: 'var(--muted)' }}>
                    <ArrowLeft size={20} /> Back to Shop
                </Link>

                <div className="grid grid-cols-2" style={{ gap: '1.75rem', alignItems: 'stretch' }}>
                    <div className="card" style={{ padding: '1rem', background: 'linear-gradient(180deg, #ffffff 0%, #fbfcf8 100%)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            position: 'relative',
                            background: 'radial-gradient(circle at top, rgba(230, 184, 0, 0.12) 0%, rgba(255,255,255,1) 38%, rgba(0,101,54,0.06) 100%)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            padding: '0.75rem',
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -24px 40px rgba(0,0,0,0.05), 0 18px 40px rgba(0,0,0,0.06)'
                        }}>
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={1400}
                                    height={1100}
                                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '0.9rem', filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.18))' }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            ) : (
                                <div style={{ minHeight: '480px', display: 'grid', placeItems: 'center' }}>
                                    <span style={{ fontSize: '2rem', color: 'var(--muted)' }}>{product.name} Image</span>
                                </div>
                            )}
                            <span style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: categoryBadgeColor,
                                color: '#fff',
                                padding: '6px 12px',
                                borderRadius: '999px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                zIndex: 2,
                                boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
                            }}>
                                {categoryLabel}
                            </span>
                        </div>
                        <div style={{ padding: '1rem 0.35rem 0.15rem', marginTop: 'auto' }}>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--muted)' }}>Authentic Godavari preparation with premium ingredients and traditional spice blends.</p>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '2rem', background: 'linear-gradient(180deg, #ffffff 0%, #fcfdf9 100%)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="flex gap-2 flex-wrap" style={{ marginBottom: '1rem' }}>
                            <span style={{ border: '1px solid var(--border)', borderRadius: '999px', padding: '0.3rem 0.7rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                                {product.category}
                            </span>
                            <span style={{ border: '1px solid var(--border)', borderRadius: '999px', padding: '0.3rem 0.7rem', fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>
                                {product.type}
                            </span>
                            <span style={{ border: '1px solid var(--border)', borderRadius: '999px', padding: '0.3rem 0.7rem', fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>
                                In stock: {product.stock}
                            </span>
                        </div>

                        <h1 style={{ marginBottom: '0.6rem', fontSize: '3rem', lineHeight: 1.05 }}>{product.name}</h1>

                        <div className="flex items-center gap-2" style={{ marginBottom: '1.35rem' }}>
                            <div className="flex" style={{ color: 'var(--secondary)' }}>
                                {[...Array(rating)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                            </div>
                            <span style={{ color: 'var(--muted)' }}>({reviews} reviews)</span>
                        </div>

                        <p style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.4rem' }}>
                            ₹{product.price}
                        </p>

                        <p style={{ marginBottom: '1.5rem', lineHeight: 1.7, fontSize: '1.08rem' }}>
                            {product.description}
                        </p>

                        <div style={{
                            background: 'var(--surface-hover)',
                            border: '1px solid var(--border)',
                            borderRadius: '1rem',
                            padding: '1rem 1rem 1.05rem',
                            marginBottom: '1.5rem',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)'
                        }}>
                            <p style={{ margin: 0, color: 'var(--foreground)', fontWeight: 600 }}>Freshly prepared with traditional Godavari spices.</p>
                            <p style={{ margin: '0.35rem 0 0', fontSize: '0.9rem' }}>For bulk orders and gifting packs, contact us on WhatsApp.</p>
                        </div>

                        <button
                            className="btn btn-primary w-full"
                            style={{ fontSize: '1.1rem', padding: '0.9rem 1.25rem', marginTop: 'auto' }}
                            onClick={() => window.open(`https://wa.me/9014475499?text=${whatsappText}`, '_blank')}
                        >
                            <MessageCircle size={20} /> Order on WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
