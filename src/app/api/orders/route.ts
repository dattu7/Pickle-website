import { NextResponse } from 'next/server';
import { saveOrder } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const cookieStore = cookies();
        const userSession = cookieStore.get('user_session');

        let userId = 'guest';
        if (userSession) {
            const session = JSON.parse(userSession.value);
            userId = session.id;
        }

        const newOrder = {
            id: Date.now().toString(),
            userId,
            ...body,
            status: 'PENDING',
            paymentStatus: 'PENDING'
        };

        saveOrder(newOrder);

        return NextResponse.json(newOrder);
    } catch (error) {
        return NextResponse.json({ message: 'Error creating order' }, { status: 500 });
    }
}
