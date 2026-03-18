// src/app/api/admin/create-shipment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DELHIVERY_TOKEN = process.env.DELHIVERY_TOKEN!;
const PICKUP_NAME = 'Kitaya Industries Private Limited'; // must match exactly in Delhivery ONE

interface OrderItem {
  name: string;
  weight: string;
  quantity: number;
  price: number;
}

function getShipWeightGrams(items: OrderItem[]): number {
  const productWeight = items.reduce((sum, item) => {
    // Parse weight string like "250g", "1 Kg", "2 × 250g", "2 × 1 Kg"
    const w = item.weight.toLowerCase();
    let grams = 0;
    if (w.includes('kg')) {
      const num = parseFloat(w.replace(/[^\d.]/g, ''));
      grams = num * 1000;
    } else {
      grams = parseInt(w.replace(/\D/g, ''));
    }
    // Handle twin packs (2 × ...)
    const multiplier = w.includes('2 ×') || w.includes('2x') ? 2 : 1;
    return sum + (grams * multiplier * item.quantity);
  }, 0);
  return productWeight + 150; // +150g packaging
}

export async function POST(req: NextRequest) {
  try {
    const { orderNumber, pin } = await req.json();

    // PIN check
    if (!pin || pin !== process.env.ADMIN_PIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch order from Supabase
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .single();

    if (dbError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.tracking_number) {
      return NextResponse.json({ error: 'Shipment already created for this order' }, { status: 400 });
    }

    const shipWeightGrams = getShipWeightGrams(order.items as OrderItem[]);
    const shipWeightKg = Math.max(0.5, Math.ceil((shipWeightGrams / 1000) * 2) / 2); // round up to nearest 0.5kg, min 0.5kg

    // Product description for invoice
    const productDesc = (order.items as OrderItem[])
      .map(i => `${i.name} ${i.weight} x${i.quantity}`)
      .join(', ');

    // ── Step 1: Create Delhivery shipment ──────────────────────────────────────
    const shipmentPayload = {
      shipments: [{
        name: order.customer_name,
        add: `${order.address_line1}${order.address_line2 ? ', ' + order.address_line2 : ''}`,
        city: order.city,
        state: order.state,
        country: 'India',
        pin: order.pincode,
        phone: order.customer_phone,
        order: order.order_number,
        payment_mode: 'Prepaid',
        return_pin: '301001',
        return_city: 'Alwar',
        return_phone: '9799360999',
        return_add: '1, Old Industrial Area, Alwar',
        return_state: 'Rajasthan',
        return_country: 'India',
        products_desc: productDesc,
        hsn_code: '09024090', // HSN for black tea
        cod_amount: '0',
        order_date: new Date(order.created_at).toISOString().split('T')[0],
        total_amount: String(order.total),
        seller_add: '1, Old Industrial Area, Alwar',
        seller_name: 'Kitaya Industries Private Limited',
        seller_inv: order.order_number,
        quantity: String((order.items as OrderItem[]).reduce((s, i) => s + i.quantity, 0)),
        waybill: '',  // empty = auto-assign waybill
        shipment_width: '15',
        shipment_height: '15',
        weight: String(shipWeightKg),
        shipment_length: '20',
        seller_gst_tin: '',
        shipping_mode: 'Surface',
        address_type: 'home',
      }],
      pickup_location: {
        name: PICKUP_NAME,
      },
    };

    // Delhivery requires both 'format' and 'data' keys in form-encoded body
    const formBody = new URLSearchParams();
    formBody.append('format', 'json');
    formBody.append('data', JSON.stringify(shipmentPayload));

    const createRes = await fetch('https://track.delhivery.com/api/cmu/create.json', {
      method: 'POST',
      headers: {
        Authorization: `Token ${DELHIVERY_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody.toString(),
    });

    const createData = await createRes.json();
    console.log('[create-shipment] Delhivery response:', JSON.stringify(createData));

    if (!createRes.ok) {
      return NextResponse.json(
        { error: `Delhivery error: ${createData.rmk || createData.error || 'Unknown error'}` },
        { status: 502 }
      );
    }

    // Check for insufficient balance or other hard errors
    if (createData.success === false && createData.rmk) {
      const remarks = createData.packages?.[0]?.remarks || [];
      const isBalanceError = remarks.some((r: string) => r.toLowerCase().includes('insufficient balance'));
      if (isBalanceError) {
        return NextResponse.json(
          { error: 'Delhivery wallet balance is insufficient. Please top up your Delhivery account and try again.' },
          { status: 402 }
        );
      }
      return NextResponse.json(
        { error: `Delhivery error: ${createData.rmk}` },
        { status: 502 }
      );
    }

    // Extract waybill — Delhivery returns upload_wbn as the manifest number
    // and packages[0].waybill as the actual waybill (may be empty on partial save)
    const waybill = createData?.packages?.[0]?.waybill
      || createData?.upload_wbn
      || createData?.waybill;

    if (!waybill) {
      console.error('[create-shipment] No waybill in response:', createData);
      return NextResponse.json(
        { error: 'Shipment created but waybill not returned. Check Delhivery ONE dashboard.' },
        { status: 502 }
      );
    }

    // Check if package was actually saved successfully
    const pkgStatus = createData?.packages?.[0]?.status;
    if (pkgStatus === 'Fail') {
      const remarks = createData?.packages?.[0]?.remarks?.join('. ') || '';
      return NextResponse.json(
        { error: `Shipment failed: ${remarks}` },
        { status: 502 }
      );
    }

    // ── Step 2: Fetch shipping label ───────────────────────────────────────────
    let labelUrl = null;
    try {
      const labelRes = await fetch(
        `https://track.delhivery.com/api/p/packing_slip?wbns=${waybill}&pdf=true`,
        { headers: { Authorization: `Token ${DELHIVERY_TOKEN}` } }
      );
      if (labelRes.ok) {
        // Returns PDF — we'll give the URL directly for download
        labelUrl = `https://track.delhivery.com/api/p/packing_slip?wbns=${waybill}&pdf=true`;
      }
    } catch {
      console.warn('[create-shipment] Label fetch failed, continuing without label');
    }

    // ── Step 3: Update Supabase order ─────────────────────────────────────────
    const trackingUrl = `https://www.delhivery.com/track/package/${waybill}`;

    await supabase
      .from('orders')
      .update({
        tracking_number: waybill,
        tracking_url: trackingUrl,
        order_status: 'shipped',
        shipped_at: new Date().toISOString(),
      })
      .eq('order_number', orderNumber);

    return NextResponse.json({
      success: true,
      waybill,
      labelUrl,
      trackingUrl,
    });

  } catch (err) {
    console.error('[create-shipment] Error:', err);
    return NextResponse.json(
      { error: 'Shipment creation failed. Please try again.' },
      { status: 500 }
    );
  }
}