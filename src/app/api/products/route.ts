import { NextResponse } from 'next/server';
import { connect, ProductModel } from '@/lib/db';
import type { Product } from '@/lib/products';

export async function GET() {
  const db = await connect();
  if (!db) return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 });
  const products = await ProductModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(products);
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
  await ProductModel.findOneAndUpdate({ id }, { $set: updates });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const db = await connect();
  if (!db) return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 });
  const { id } = await req.json();
  await ProductModel.deleteOne({ id });
  return NextResponse.json({ ok: true });
}
