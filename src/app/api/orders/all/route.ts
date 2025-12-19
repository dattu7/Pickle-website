import { NextResponse } from 'next/server';
import { getOrders } from '@/lib/db';

export async function GET() {
    const orders = getOrders();
    // Sort by newest first
    const sortedOrders = orders.sort((a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json(sortedOrders);
}
