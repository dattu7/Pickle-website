import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const users = getUsers();
        const user = users.find((u: any) => u.email === email && u.password === password);

        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Set a simple cookie
        cookies().set('user_session', JSON.stringify({ id: user.id, role: user.role }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return NextResponse.json({
            message: 'Login successful',
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
