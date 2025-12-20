import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { getOrders } from '@/lib/db';
import ShareOrderBtn from '@/components/ShareOrderBtn';

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
    const orders = getOrders();
    const order = orders.find((o: any) => o.id === params.id);

    if (!order) {
        return <div>Order not found</div>;
    }

    return (
        <main>
            <Navbar />
            <div className="container flex flex-col items-center justify-center" style={{ minHeight: '80vh', textAlign: 'center' }}>
                <div style={{ color: 'var(--success)', marginBottom: '1rem' }}>
                    <CheckCircle size={64} />
                </div>
                <h1 className="mb-2">Order Confirmed!</h1>
                <p className="mb-8 text-gray-600">
                    Thank you for your order. Your order ID is <span className="font-bold">#{order.id}</span>.
                </p>

                <div className="card text-left" style={{ width: '100%', maxWidth: '500px', marginBottom: '2rem' }}>
                    <h2 className="text-lg mb-4">Order Details</h2>
                    <div className="mb-4">
                        <p className="font-bold">Shipping to:</p>
                        <p>{order.shippingDetails.name}</p>
                        <p>{order.shippingDetails.address}</p>
                        <p>{order.shippingDetails.city}, {order.shippingDetails.zip}</p>
                        <p>{order.shippingDetails.phone}</p>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total Amount</span>
                            <span>₹{order.total}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Payment Status: <span style={{ color: 'var(--warning)' }}>Pending Confirmation</span>
                        </p>
                        <ShareOrderBtn order={order} />
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link href="/shop" className="btn btn-primary">
                        Continue Shopping
                    </Link>
                    <Link href="/dashboard" className="btn btn-outline">
                        View My Orders
                    </Link>
                </div>
            </div>
        </main>
    );
}
