// src/app/api/payment-config/route.ts
// Server-side route — reads env vars, sends only what the client needs
// Key ID is intentionally shared (Razorpay docs confirm this is public-safe)
// Key SECRET never leaves this server
import { NextResponse } from 'next/server';

export async function GET() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!keyId) {
    return NextResponse.json({ error: 'Payment not configured' }, { status: 500 });
  }
  return NextResponse.json({ keyId });
}