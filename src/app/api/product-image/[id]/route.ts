import { NextResponse } from 'next/server';
import { connect, ProductModel } from '@/lib/db';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await connect();
  if (!db) return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 });
  const product = await ProductModel.findOne({ id }).lean<Record<string, unknown>>();
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const image = product.image as string;
  if (!image) return NextResponse.json({ error: 'No image' }, { status: 404 });
  if (image.startsWith('data:')) {
    const parts = image.split(',');
    const mime = parts[0].match(/data:(.*?);/)?.[1] || 'image/png';
    const data = parts[1];
    const buf = Buffer.from(data, 'base64');
    return new NextResponse(buf, { headers: { 'Content-Type': mime, 'Cache-Control': 'public, max-age=86400' } });
  }
  if (image.startsWith('http')) {
    return NextResponse.redirect(image);
  }
  return NextResponse.json({ error: 'No image' }, { status: 404 });
}
