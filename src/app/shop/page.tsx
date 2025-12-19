import Navbar from '@/components/Navbar';
import { getProducts } from '@/lib/db';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function ShopPage() {
    const products = getProducts();

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <h1 className="mb-4">Shop Pickles</h1>

                <div className="grid grid-cols-3">
                    {products.map((product: any) => (
                        <div key={product.id} className="card flex flex-col justify-between">
                            <div>
                                <div style={{
                                    height: '200px',
                                    background: '#f5f5f5',
                                    borderRadius: 'var(--radius)',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    {/* Placeholder for image */}
                                    <span style={{ color: 'var(--muted)' }}>{product.name}</span>
                                </div>
                                <h3>{product.name}</h3>
                                <p style={{ fontSize: '0.875rem' }}>{product.description}</p>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>₹{product.price}</span>
                                <Link href={`/shop/${product.id}`} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
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
