'use client';

import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        zip: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                items: cart,
                total: cartTotal,
                shippingDetails: formData,
                paymentMethod: 'UPI',
                status: 'PENDING',
                createdAt: new Date().toISOString()
            };

            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                const data = await res.json();
                clearCart();
                router.push(`/order-confirmation/${data.id}`);
            } else {
                alert('Failed to place order');
            }
        } catch (error) {
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <main>
                <Navbar />
                <div className="container text-center py-8">
                    <p>Your cart is empty. Please add items to checkout.</p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <h1 className="mb-4">Checkout</h1>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <div className="card">
                            <h2 className="mb-4">Shipping Details</h2>
                            <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label>Full Name</label>
                                    <input
                                        className="input"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label>Address</label>
                                    <textarea
                                        className="input"
                                        required
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label>City</label>
                                        <input
                                            className="input"
                                            required
                                            value={formData.city}
                                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label>ZIP Code</label>
                                        <input
                                            className="input"
                                            required
                                            value={formData.zip}
                                            onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label>Phone Number</label>
                                    <input
                                        className="input"
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    <div>
                        <div className="card mb-4">
                            <h2 className="mb-4">Order Summary</h2>
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between mb-2 text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                            <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 font-bold text-lg">
                                <span>Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </div>

                        <div className="card">
                            <h2 className="mb-4">Payment</h2>
                            <p className="mb-4 text-sm text-gray-600">
                                Please scan the QR code or use the UPI ID below to pay.
                                Your order will be confirmed after payment verification.
                            </p>

                            <div style={{
                                background: '#f5f5f5',
                                padding: '1rem',
                                borderRadius: 'var(--radius)',
                                textAlign: 'center',
                                marginBottom: '1rem'
                            }}>
                                <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>UPI ID: pickle@upi</p>
                                <p className="text-sm">Merchant Name: PicklePerfect</p>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                className="btn btn-primary w-full"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
