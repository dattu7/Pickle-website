import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/db';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export async function GET() {
    const products = getProducts();
    return NextResponse.json(products);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const products = getProducts();

        const newProduct = {
            id: Date.now().toString(),
            ...body,
            image: '/images/placeholder.jpg' // Default image
        };

        products.push(newProduct);
        fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2));

        return NextResponse.json(newProduct);
    } catch (error) {
        return NextResponse.json({ message: 'Error saving product' }, { status: 500 });
    }
}
