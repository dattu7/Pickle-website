import { NextResponse } from 'next/server';
import { getUsers, saveUser } from '@/lib/db';
import { sendWelcomeEmail } from '@/lib/mail';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
        }

        const users = getUsers();
        const existingUser = users.find((u: any) => u.email === email);

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // In a real app, hash this!
            role: 'USER', // Default role
            createdAt: new Date().toISOString()
        };

        // First user becomes ADMIN for demo purposes
        if (users.length === 0) {
            newUser.role = 'ADMIN';
        }

        saveUser(newUser);

        // Send welcome email (fire and forget)
        sendWelcomeEmail(email, name);

        return NextResponse.json({ message: 'User created', user: { id: newUser.id, email: newUser.email, role: newUser.role } });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
