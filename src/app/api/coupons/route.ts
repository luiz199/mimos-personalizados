import { NextResponse } from 'next/server';
import { connect, CouponModel } from '@/lib/db';

export async function GET() {
  const db = await connect();
  if (!db) return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 });
  const coupons = await CouponModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(coupons);
}

export async function POST(req: Request) {
  const db = await connect();
  if (!db) return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 });
  const body = await req.json();
  const coupon = { ...body, code: body.code.toUpperCase(), createdAt: Date.now() };
  await CouponModel.create(coupon);
  return NextResponse.json(coupon, { status: 201 });
}

export async function PUT(req: Request) {
  const db = await connect();
  if (!db) return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 });
  const { code } = await req.json();
  const coupon = await CouponModel.findOne({ code: code.toUpperCase(), active: true });
  if (!coupon) return NextResponse.json({ error: 'Cupom inválido' }, { status: 400 });
  if (coupon.expiresAt && Date.now() > coupon.expiresAt) return NextResponse.json({ error: 'Cupom expirado' }, { status: 400 });
  if (coupon.usesLeft !== undefined && coupon.usesLeft <= 0) return NextResponse.json({ error: 'Cupom esgotado' }, { status: 400 });
  return NextResponse.json({ valid: true, discount: coupon.discount, code: coupon.code });
}

export async function DELETE(req: Request) {
  const db = await connect();
  if (!db) return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 });
  const { id } = await req.json();
  await CouponModel.deleteOne({ _id: id });
  return NextResponse.json({ ok: true });
}
