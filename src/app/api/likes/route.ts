import { NextResponse } from 'next/server';
import { connect, ProductModel } from '@/lib/db';

const LIKE_ID = 'mimos-music-like';

export async function GET() {
  const db = await connect();
  if (!db) return NextResponse.json({ count: 0 });
  let doc = await ProductModel.findOne({ id: LIKE_ID }).lean<Record<string, unknown>>();
  return NextResponse.json({ count: (doc?.likes as number) || 0 });
}

export async function POST(req: Request) {
  const db = await connect();
  if (!db) return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 });
  const { liked } = await req.json();
  let doc = await ProductModel.findOne({ id: LIKE_ID });
  if (!doc) {
    doc = new ProductModel({ id: LIKE_ID, likes: liked ? 1 : 0, name: 'Música Curtidas', price: 0, category: 'mimos' });
  } else {
    doc.likes = (doc.likes || 0) + (liked ? 1 : -1);
  }
  await doc.save();
  return NextResponse.json({ count: doc.likes });
}
