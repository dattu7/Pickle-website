'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

export default function ProductPage({ params }: { params: { id: string } }) {
    const { addToCart } = useCart();
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

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <Link href="/shop" className="flex items-center gap-2 mb-4" style={{ color: 'var(--muted)' }}>
                    <ArrowLeft size={20} /> Back to Shop
                </Link>

                <div className="grid grid-cols-2" style={{ gap: '4rem' }}>
                    <div style={{
                        background: '#f5f5f5',
                        borderRadius: 'var(--radius)',
                        height: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Image Placeholder */}
                        <span style={{ fontSize: '2rem', color: 'var(--muted)' }}>{product.name} Image</span>
                    </div>

                    <div>
                        <h1 style={{ marginBottom: '0.5rem' }}>{product.name}</h1>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex" style={{ color: 'var(--secondary)' }}>
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                            </div>
                            <span style={{ color: 'var(--muted)' }}>(50 reviews)</span>
                        </div>

                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                            ₹{product.price}
                        </p>

                        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
                            {product.description}
                        </p>

                        <div className="flex gap-4">
                            <button
                                className="btn btn-primary flex-1"
                                onClick={() => addToCart(product)}
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                            <button className="btn btn-outline">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
