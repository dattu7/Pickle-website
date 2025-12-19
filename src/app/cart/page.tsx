'use client';

import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <h1 className="mb-4">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="mb-4" style={{ fontSize: '1.25rem' }}>Your cart is empty</p>
                        <Link href="/shop" className="btn btn-primary">
                            Browse Pickles
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-2" style={{ gridColumn: 'span 2' }}>
                            <div className="card">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                                        <div style={{
                                            width: '80px',
                                            height: '80px',
                                            background: '#f5f5f5',
                                            borderRadius: 'var(--radius)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem'
                                        }}>
                                            {item.name}
                                        </div>

                                        <div className="flex-1">
                                            <h3>{item.name}</h3>
                                            <p>₹{item.price}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                className="btn btn-outline"
                                                style={{ padding: '0.25rem' }}
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span style={{ width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                            <button
                                                className="btn btn-outline"
                                                style={{ padding: '0.25rem' }}
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        <button
                                            className="btn"
                                            style={{ color: 'var(--error)' }}
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="card">
                                <h2 className="mb-4">Order Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between mb-4" style={{ fontWeight: 'bold', fontSize: '1.25rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                    <span>Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>

                                <button className="btn btn-primary w-full mb-2">
                                    Proceed to Checkout
                                </button>
                                <button className="btn btn-outline w-full" onClick={clearCart}>
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
