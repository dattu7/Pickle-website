import Navbar from '@/components/Navbar';
import { getOrders } from '@/lib/db';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default function DashboardPage() {
    const cookieStore = cookies();
    const userSession = cookieStore.get('user_session');

    if (!userSession) {
        return (
            <main>
                <Navbar />
                <div className="container py-8 text-center">
                    <p>Please login to view your dashboard.</p>
                    <Link href="/login" className="btn btn-primary mt-4">Login</Link>
                </div>
            </main>
        );
    }

    const session = JSON.parse(userSession.value);
    const allOrders = getOrders();
    const myOrders = allOrders.filter((o: any) => o.userId === session.id);

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <h1 className="mb-8">My Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card h-fit">
                        <h2 className="text-xl mb-4">Profile</h2>
                        <p><strong>Name:</strong> {session.name || 'User'}</p>
                        <p><strong>Email:</strong> {session.email || 'user@example.com'}</p>
                    </div>

                    <div className="col-span-2">
                        <h2 className="text-xl mb-4">Order History</h2>
                        {myOrders.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {myOrders.map((order: any) => (
                                    <div key={order.id} className="card">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="font-bold">Order #{order.id}</p>
                                                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '1rem',
                                                fontSize: '0.875rem',
                                                background: order.status === 'DELIVERED' ? '#dcfce7' : '#fef9c3',
                                                color: order.status === 'DELIVERED' ? '#166534' : '#854d0e'
                                            }}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="border-t border-b py-4 my-4">
                                            {order.items.map((item: any) => (
                                                <div key={item.id} className="flex justify-between text-sm mb-1">
                                                    <span>{item.name} x {item.quantity}</span>
                                                    <span>₹{item.price * item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between font-bold">
                                            <span>Total</span>
                                            <span>₹{order.total}</span>
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
