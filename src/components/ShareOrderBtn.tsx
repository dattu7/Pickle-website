'use client';

import { MessageCircle } from 'lucide-react';

export default function ShareOrderBtn({ order }: { order: any }) {
    const phoneNumber = '919876543210'; // Replace with actual business number

    const handleShare = () => {
        const message = `*New Order #${order.id}*
    
Name: ${order.shippingDetails.name}
Total: ₹${order.total}
Payment: ${order.paymentMethod}

*Items:*
${order.items.map((item: any) => `- ${item.name} (${item.quantity})`).join('\n')}

Please confirm my order.`;

        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <button
            onClick={handleShare}
            className="btn"
            style={{
                background: '#25D366',
                color: 'white',
                width: '100%',
                marginTop: '1rem'
            }}
        >
            <MessageCircle size={20} /> Send Order to WhatsApp
        </button>
    );
}
