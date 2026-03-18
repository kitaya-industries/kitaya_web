// src/app/api/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { products } from '@/data/products';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// ── Types ─────────────────────────────────────────────────────────────────────
interface CartItem {
  slug: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { items, currency = 'INR', receipt, shippingAmount } = await req.json();

    // ── Step 1: Validate items array is present ───────────────────────────────
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    if (typeof shippingAmount !== 'number' || shippingAmount < 0) {
      return NextResponse.json({ error: 'Invalid shipping amount' }, { status: 400 });
    }

    // ── Step 2: Recalculate subtotal SERVER-SIDE from product slugs ───────────
    // Never trust the client's price. We look up prices from our own data file.
    let serverSubtotal = 0;
    for (const item of items as CartItem[]) {
      const product = products.find((p) => p.slug === item.slug && p.isActive);
      if (!product) {
        return NextResponse.json(
          { error: `Invalid or inactive product: ${item.slug}` },
          { status: 400 }
        );
      }
      if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
        return NextResponse.json(
          { error: `Invalid quantity for ${item.slug}` },
          { status: 400 }
        );
      }
      serverSubtotal += product.price * item.quantity;
    }

    const serverTotal = serverSubtotal + shippingAmount;

    if (serverTotal < 1) {
      return NextResponse.json({ error: 'Invalid total amount' }, { status: 400 });
    }

    // ── Step 3: Create Razorpay order with server-calculated amount ───────────
    // Store expected total in notes — verify-payment will cross-check this.
    const order = await razorpay.orders.create({
      amount: Math.round(serverTotal * 100), // paise — server-calculated, not client
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: {
        // Store the authoritative total so verify-payment can confirm it
        expected_total: String(serverTotal),
        expected_subtotal: String(serverSubtotal),
        expected_shipping: String(shippingAmount),
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      // Return server-verified total back to client for display
      verifiedTotal: serverTotal,
      verifiedSubtotal: serverSubtotal,
    });

  } catch (err) {
    console.error('[create-order] Razorpay error:', err);
    return NextResponse.json(
      { error: 'Could not create payment order. Please try again.' },
      { status: 500 }
    );
  }
}