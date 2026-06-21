import { NextResponse } from 'next/server';
import { connect, ProductModel } from '@/lib/db';
import type { Product } from '@/lib/products';

export async function GET() {
  const db = await connect();
  if (!db) return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 });
  const products = await ProductModel.find().sort({ createdAt: -1 }).lean();
  const slim = products.map((p: Record<string, unknown>) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    oldPrice: p.oldPrice || undefined,
    image: typeof p.image === 'string' && (p.image as string).startsWith('data:') ? `/api/products/${p.id}/image` : (p.image || ''),
    category: p.category,
    subcategory: p.subcategory || '',
    isOffer: p.isOffer || false,
    createdAt: p.createdAt,
  }));
  return NextResponse.json(slim);
}

export async function POST(req: Request) {
  const db = await connect();
  if (!db) return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 });
  const body = await req.json();
  const product = { ...body, id: Date.now().toString(), createdAt: Date.now() };
  await ProductModel.create(product);
  return NextResponse.json(product, { status: 201 });
}

export async function PUT(req: Request) {
  const db = await connect();
  if (!db) return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 });
  const { id, ...updates } = await req.json();
  if (updates.image && (updates.image as string).startsWith('/api/')) {
    delete updates.image;
  }
  await ProductModel.findOneAndUpdate({ id }, { $set: updates });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const db = await connect();
  if (!db) return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 });
  const body = await req.json().catch(() => ({}));
  if (body.all) {
    await ProductModel.deleteMany({});
    return NextResponse.json({ ok: true, deleted: true });
  }
  const { id } = body;
  await ProductModel.deleteOne({ id });
  return NextResponse.json({ ok: true });
}
