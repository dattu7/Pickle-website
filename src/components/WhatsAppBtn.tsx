'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppBtn() {
    const phoneNumber = '9014475499'; // Replace with actual business number
    const message = 'Hello! I would like to know more about your pickles.';

    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                background: '#25D366',
                color: 'white',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                zIndex: 100,
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            title="Chat with us on WhatsApp"
        >
            <MessageCircle size={32} />
        </button>
    );
}
