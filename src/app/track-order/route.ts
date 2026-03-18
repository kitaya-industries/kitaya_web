// src/app/api/track-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DELHIVERY_TOKEN = process.env.DELHIVERY_TOKEN!;

export async function POST(req: NextRequest) {
  try {
    const { orderNumber, email } = await req.json();

    if (!orderNumber || !email) {
      return NextResponse.json({ error: 'Order number and email are required.' }, { status: 400 });
    }

    // ── Fetch order from Supabase ─────────────────────────────────────────────
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber.trim().toUpperCase())
      .eq('customer_email', email.trim().toLowerCase())
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: 'No order found. Please check your order number and email.' },
        { status: 404 }
      );
    }

    // ── Fetch live tracking from Delhivery (if shipped) ───────────────────────
    let trackingInfo = null;
    if (order.tracking_number && DELHIVERY_TOKEN) {
      try {
        const trackRes = await fetch(
          `https://track.delhivery.com/api/v1/packages/json/?waybill=${order.tracking_number}`,
          {
            headers: { Authorization: `Token ${DELHIVERY_TOKEN}` },
            signal: AbortSignal.timeout(5000),
          }
        );
        if (trackRes.ok) {
          const trackData = await trackRes.json();
          const shipment = trackData?.ShipmentData?.[0]?.Shipment;
          if (shipment) {
            trackingInfo = {
              status: shipment.Status?.Status || order.order_status,
              statusDetail: shipment.Status?.Instructions || '',
              location: shipment.Status?.StatusLocation || '',
              updatedAt: shipment.Status?.StatusDateTime || '',
              expectedDate: shipment.ExpectedDeliveryDate || '',
              scans: (shipment.Scans || []).slice(0, 5).map((s: Record<string, string>) => ({
                time: s.ScanDetail?.ScanDateTime || '',
                status: s.ScanDetail?.Scan || '',
                location: s.ScanDetail?.ScannedLocation || '',
                instructions: s.ScanDetail?.Instructions || '',
              })),
            };
          }
        }
      } catch {
        // Tracking fetch failed — still return order details
        console.warn('[track-order] Delhivery tracking fetch failed');
      }
    }

    return NextResponse.json({
      success: true,
      order: {
        orderNumber: order.order_number,
        status: order.order_status,
        paymentStatus: order.payment_status,
        createdAt: order.created_at,
        shippedAt: order.shipped_at,
        deliveredAt: order.delivered_at,
        items: order.items,
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        customerName: order.customer_name,
        city: order.city,
        state: order.state,
        pincode: order.pincode,
        trackingNumber: order.tracking_number,
        trackingUrl: order.tracking_url,
      },
      tracking: trackingInfo,
    });

  } catch (err) {
    console.error('[track-order] Error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}