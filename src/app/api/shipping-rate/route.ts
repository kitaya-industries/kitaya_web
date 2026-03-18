// src/app/api/shipping-rate/route.ts
import { NextRequest, NextResponse } from 'next/server';

const DELHIVERY_TOKEN = process.env.DELHIVERY_TOKEN!;
const PICKUP_PINCODE = process.env.DELHIVERY_PICKUP_PINCODE || '301001';

export async function POST(req: NextRequest) {
  try {
    const { pincode, weightGrams, shippingDiscount } = await req.json();

    if (!pincode || !weightGrams) {
      return NextResponse.json({ error: 'Missing pincode or weight' }, { status: 400 });
    }

    // Validate pincode format
    if (!/^\d{6}$/.test(pincode)) {
      return NextResponse.json({ error: 'Invalid pincode' }, { status: 400 });
    }

    // Convert grams to kg, round up to nearest 500g slab for Delhivery
    const weightKg = Math.ceil((weightGrams / 1000) * 2) / 2; // nearest 0.5kg

    // Call Delhivery rate calculator API
    const url = new URL('https://track.delhivery.com/api/kinko/v1/invoice/charges/.json');
    url.searchParams.set('md', 'S');               // Surface mode
    url.searchParams.set('ss', 'Delivered');        // shipment status
    url.searchParams.set('d_pin', pincode);         // delivery pincode
    url.searchParams.set('o_pin', PICKUP_PINCODE);  // origin pincode
    url.searchParams.set('cgm', String(weightGrams)); // weight in grams
    url.searchParams.set('pt', 'Pre-paid');         // prepaid
    url.searchParams.set('cod', '0');               // no COD

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Token ${DELHIVERY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      // 8 second timeout
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error('[shipping-rate] Delhivery API error:', response.status);
      return NextResponse.json(
        { error: 'Shipping calculation failed. Please try again.' },
        { status: 502 }
      );
    }

    const data = await response.json();

    // Delhivery returns array of rate objects
    // Pick surface rate
    const rates = Array.isArray(data) ? data : [data];
    const surfaceRate = rates.find((r: Record<string, unknown>) =>
      String(r.transport_mode || '').toLowerCase().includes('surface') ||
      String(r.mode || '').toLowerCase() === 's'
    ) || rates[0];

    if (!surfaceRate) {
      return NextResponse.json(
        { error: 'This pincode is not serviceable by Delhivery.' },
        { status: 422 }
      );
    }

    // Total charge from Delhivery (inclusive of GST)
    const actualShipping = Math.ceil(
      Number(surfaceRate.total_amount || surfaceRate.charge_amt || surfaceRate.rate || 0)
    );

    if (actualShipping === 0) {
      return NextResponse.json(
        { error: 'Could not calculate shipping for this pincode.' },
        { status: 422 }
      );
    }

    // Apply shipping discount baked into product prices
    const discount = Math.min(shippingDiscount || 0, actualShipping);
    const chargedShipping = Math.max(0, actualShipping - discount);

    return NextResponse.json({
      success: true,
      actualShipping,       // what Delhivery will charge you
      shippingDiscount: discount,  // what you absorb
      chargedShipping,      // what customer pays
      serviceable: true,
    });

  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      return NextResponse.json(
        { error: 'Shipping calculation timed out. Please try again.' },
        { status: 504 }
      );
    }
    console.error('[shipping-rate] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Could not calculate shipping. Please try again.' },
      { status: 500 }
    );
  }
}