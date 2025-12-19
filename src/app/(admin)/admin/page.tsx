'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function AdminPage() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });
    const [message, setMessage] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch orders
        fetch('/api/orders/all') // We'll create this endpoint
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock)
                })
            });

            if (res.ok) {
                setMessage('Product added successfully!');
                setFormData({ name: '', description: '', price: '', stock: '' });
            } else {
                setMessage('Failed to add product');
            }
        } catch (err) {
            setMessage('Error adding product');
        }
    };

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <h1>Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="card h-fit">
                        <h2>Add New Pickle</h2>
                        {message && <p style={{ color: message.includes('success') ? 'var(--success)' : 'var(--error)' }}>{message}</p>}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label>Name</label>
                                <input
                                    className="input"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea
                                    className="input"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label>Price (₹)</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Stock</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Product</button>
                        </form>
                    </div>

                    <div className="card">
                        <h2>Recent Orders</h2>
                        {orders.length === 0 ? (
                            <p>No orders yet.</p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {orders.map((order: any) => (
                                    <div key={order.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold">#{order.id}</span>
                                            <span className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-sm mb-1">Customer: {order.shippingDetails.name}</p>
                                        <p className="text-sm mb-1">Total: ₹{order.total}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.5rem',
                                                fontSize: '0.75rem',
                                                background: '#fef9c3',
                                                color: '#854d0e'
                                            }}>
                                                {order.status}
                                            </span>
                                            <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
                                                Manage
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
