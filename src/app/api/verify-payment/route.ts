// src/app/api/verify-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import Razorpay from 'razorpay';
import { products } from '@/data/products';

// Use service role key for server-side writes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_EMAIL = process.env.FROM_EMAIL || 'orders@kitaya.in';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// ── Types ─────────────────────────────────────────────────────────────────────
interface ClientItem {
  slug: string;
  name: string;
  brand: string;
  weight: string;
  quantity: number;
  price: number; // client-sent price — used for display only, NOT for totals
}

function generateOrderNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `KTY-${date}-${rand}`;
}

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData, // customer details + item slugs from client
    } = body;

    // ── Step 1: Verify Razorpay signature ────────────────────────────────────
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Payment verification failed. Please contact support.' },
        { status: 400 }
      );
    }

    // ── Step 2: SERVER-SIDE price recalculation ───────────────────────────────
    // SECURITY: Never trust prices from the client. Recalculate from our own
    // product data using only the slugs and quantities the client sent.
    if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      return NextResponse.json({ error: 'Invalid order items.' }, { status: 400 });
    }

    let serverSubtotal = 0;
    const verifiedItems: ClientItem[] = [];

    for (const item of orderData.items as ClientItem[]) {
      const product = products.find((p) => p.slug === item.slug && p.isActive);
      if (!product) {
        return NextResponse.json(
          { error: `Invalid product: ${item.slug}` },
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
      // Use server's authoritative price for the saved record, not client's
      verifiedItems.push({
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        weight: product.weight,
        quantity: item.quantity,
        price: product.price, // ← server price, not client price
      });
    }

    // ── Step 3: Validate amount against the Razorpay order ───────────────────
    // Fetch the actual Razorpay order to get the amount we set in create-order.
    // This is the ground truth — it was calculated server-side and cannot be
    // tampered with by the client.
    let razorpayOrder;
    try {
      razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
    } catch {
      console.error('[verify-payment] Could not fetch Razorpay order:', razorpay_order_id);
      return NextResponse.json(
        { error: 'Could not verify order amount. Please contact support.' },
        { status: 400 }
      );
    }

    // Amount from Razorpay is in paise — convert to rupees
    const razorpayAmountRupees = Number(razorpayOrder.amount) / 100;

    // Cross-check: shipping = razorpay total - our server subtotal
    const serverShipping = Math.round((razorpayAmountRupees - serverSubtotal) * 100) / 100;

    if (serverShipping < 0) {
      // Subtotal alone exceeds what Razorpay charged — something is wrong
      console.error('[verify-payment] Price mismatch — subtotal exceeds Razorpay amount', {
        razorpayAmountRupees,
        serverSubtotal,
      });
      return NextResponse.json(
        { error: 'Order amount mismatch. Please contact support.' },
        { status: 400 }
      );
    }

    const serverTotal = razorpayAmountRupees; // what was actually charged

    // ── Step 4: Generate order number ────────────────────────────────────────
    const orderNumber = generateOrderNumber();

    // ── Step 5: Save order to Supabase (server-verified values only) ─────────
    const { error: dbError } = await supabase.from('orders').insert({
      order_number: orderNumber,
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail,
      customer_phone: orderData.customerPhone,
      address_line1: orderData.addressLine1,
      address_line2: orderData.addressLine2 || null,
      city: orderData.city,
      state: orderData.state,
      pincode: orderData.pincode,
      items: verifiedItems,          // server-verified items with correct prices
      subtotal: serverSubtotal,       // server-calculated
      shipping: serverShipping,       // derived from Razorpay amount
      total: serverTotal,             // actual Razorpay charge — ground truth
      payment_method: 'razorpay',
      payment_status: 'paid',
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_status: 'confirmed',
    });

    if (dbError) {
      console.error('[verify-payment] Supabase error:', dbError);
      // Payment is verified — still return success, log for manual follow-up
    }

    // ── Step 6: Send confirmation email ──────────────────────────────────────
    const itemsHtml = verifiedItems
      .map((item) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #F0EDE8;">
            <div style="font-family:Georgia,serif;font-size:15px;color:#2D2D2A;margin-bottom:2px;">${item.name}</div>
            <div style="font-family:Arial,sans-serif;font-size:11px;color:#C5A55A;letter-spacing:2px;text-transform:uppercase;">${item.brand === 'kitaya' ? 'Kitaya' : 'TeaGate'} · ${item.weight}</div>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #F0EDE8;text-align:center;font-family:Arial,sans-serif;font-size:13px;color:#7A7A72;">× ${item.quantity}</td>
          <td style="padding:14px 0;border-bottom:1px solid #F0EDE8;text-align:right;font-family:Georgia,serif;font-size:15px;color:#2D2D2A;">${formatINR(item.price * item.quantity)}</td>
        </tr>`)
      .join('');

    const trackUrl = `${process.env.SITE_URL}/track-order?order=${orderNumber}&email=${encodeURIComponent(orderData.customerEmail)}`;
    const firstName = orderData.customerName.split(' ')[0];

    const emailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>Order Confirmed — ${orderNumber}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F3EE;font-family:Georgia,serif;-webkit-font-smoothing:antialiased;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F3EE;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background-color:#1A1A18;padding:0;">
              <!-- Top gold line -->
              <div style="height:3px;background:linear-gradient(to right,#C5A55A,#E8D5A3,#C5A55A);"></div>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:36px 48px;text-align:center;">
                    <!-- Logo wordmark -->
                    <div style="font-family:Georgia,serif;font-size:36px;font-weight:normal;color:#FAFAF7;letter-spacing:4px;margin-bottom:8px;">Kitaya</div>
                    <div style="font-family:Arial,sans-serif;font-size:10px;color:#C5A55A;letter-spacing:5px;text-transform:uppercase;">Crafted in Assam &nbsp;·&nbsp; Loved Everywhere</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── CONFIRMATION BANNER ── -->
          <tr>
            <td style="background-color:#C5A55A;padding:18px 48px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right:10px;vertical-align:middle;">
                          <div style="width:22px;height:22px;border:1.5px solid #1A1A18;border-radius:50%;display:inline-block;text-align:center;line-height:22px;font-size:12px;color:#1A1A18;">✓</div>
                        </td>
                        <td style="vertical-align:middle;">
                          <span style="font-family:Arial,sans-serif;font-size:11px;font-weight:bold;color:#1A1A18;letter-spacing:4px;text-transform:uppercase;">Order Confirmed</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="background-color:#FAFAF7;padding:48px;">

              <!-- Greeting -->
              <p style="font-family:Georgia,serif;font-size:22px;font-weight:normal;color:#2D2D2A;margin:0 0 8px;">Dear ${firstName},</p>
              <p style="font-family:Arial,sans-serif;font-size:14px;color:#7A7A72;line-height:1.7;margin:0 0 40px;font-style:italic;">
                Thank you for your order. Your Assam tea is being prepared with care and will be on its way to you shortly.
              </p>

              <!-- Order number box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:40px;">
                <tr>
                  <td style="background-color:#F5F3EE;border-left:3px solid #C5A55A;padding:16px 20px;">
                    <div style="font-family:Arial,sans-serif;font-size:10px;color:#7A7A72;letter-spacing:3px;text-transform:uppercase;margin-bottom:6px;">Order Number</div>
                    <div style="font-family:Georgia,serif;font-size:22px;color:#2D2D2A;">${orderNumber}</div>
                    <div style="font-family:Arial,sans-serif;font-size:11px;color:#7A7A72;margin-top:4px;">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </td>
                </tr>
              </table>

              <!-- Section label -->
              <div style="font-family:Arial,sans-serif;font-size:10px;color:#7A7A72;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid #2D2D2A;">Order Summary</div>

              <!-- Items table -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:0;">
                <thead>
                  <tr>
                    <th style="text-align:left;font-family:Arial,sans-serif;font-size:10px;color:#7A7A72;letter-spacing:2px;text-transform:uppercase;padding-bottom:10px;border-bottom:1px solid #E8E4DE;font-weight:normal;">Product</th>
                    <th style="text-align:center;font-family:Arial,sans-serif;font-size:10px;color:#7A7A72;letter-spacing:2px;text-transform:uppercase;padding-bottom:10px;border-bottom:1px solid #E8E4DE;font-weight:normal;">Qty</th>
                    <th style="text-align:right;font-family:Arial,sans-serif;font-size:10px;color:#7A7A72;letter-spacing:2px;text-transform:uppercase;padding-bottom:10px;border-bottom:1px solid #E8E4DE;font-weight:normal;">Amount</th>
                  </tr>
                </thead>
                <tbody>${itemsHtml}</tbody>
              </table>

              <!-- Totals -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:4px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #F0EDE8;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#7A7A72;">Subtotal</td>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#2D2D2A;text-align:right;">${formatINR(serverSubtotal)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #E8E4DE;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#7A7A72;">Shipping</td>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#2D2D2A;text-align:right;">${formatINR(serverShipping)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-family:Georgia,serif;font-size:17px;color:#2D2D2A;">Total Paid</td>
                        <td style="font-family:Georgia,serif;font-size:17px;color:#2D2D2A;text-align:right;font-weight:bold;">${formatINR(serverTotal)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background-color:#E8E4DE;margin:40px 0;"></div>

              <!-- Delivery address -->
              <div style="font-family:Arial,sans-serif;font-size:10px;color:#7A7A72;letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;">Delivering To</div>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#F5F3EE;padding:20px 24px;">
                    <div style="font-family:Georgia,serif;font-size:15px;color:#2D2D2A;margin-bottom:6px;">${orderData.customerName}</div>
                    <div style="font-family:Arial,sans-serif;font-size:13px;color:#7A7A72;line-height:1.8;">
                      ${orderData.addressLine1}${orderData.addressLine2 ? ', ' + orderData.addressLine2 : ''}<br>
                      ${orderData.city}, ${orderData.state} &mdash; ${orderData.pincode}<br>
                      ${orderData.customerPhone}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background-color:#E8E4DE;margin:40px 0;"></div>

              <!-- What happens next -->
              <div style="font-family:Arial,sans-serif;font-size:10px;color:#7A7A72;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;">What Happens Next</div>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                ${[
                  ['01', 'We pack your order within 1–2 business days.'],
                  ['02', 'Your order is handed to Delhivery for delivery.'],
                  ['03', 'You receive a tracking update via email once shipped.'],
                  ['04', 'Track your order anytime using the button below.'],
                ].map(([num, text]) => `
                <tr>
                  <td style="padding:8px 0;vertical-align:top;width:32px;">
                    <span style="font-family:Georgia,serif;font-size:13px;color:#C5A55A;">${num}</span>
                  </td>
                  <td style="padding:8px 0;vertical-align:top;">
                    <span style="font-family:Arial,sans-serif;font-size:13px;color:#7A7A72;line-height:1.6;">${text}</span>
                  </td>
                </tr>`).join('')}
              </table>

              <!-- Track order CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:8px 0 40px;">
                    <a href="${trackUrl}" style="display:inline-block;background-color:#1A1A18;color:#FAFAF7;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:16px 40px;">
                      Track My Order &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Help -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #E8E4DE;">
                <tr>
                  <td style="padding:28px 0 0;text-align:center;">
                    <p style="font-family:Arial,sans-serif;font-size:13px;color:#7A7A72;line-height:1.8;margin:0;">
                      Questions? WhatsApp us at <strong style="color:#2D2D2A;">+91 90797 20031</strong><br>
                      or reply to this email — we respond within 24 hours.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background-color:#1A1A18;padding:28px 48px;text-align:center;">
              <div style="font-family:Arial,sans-serif;font-size:10px;color:#7A7A72;letter-spacing:2px;text-transform:uppercase;line-height:1.9;">
                Kitaya Industries Private Limited<br>
                <span style="font-size:10px;letter-spacing:1px;">1, Old Industrial Area, Alwar &mdash; 301001, Rajasthan, India</span>
              </div>
              <div style="margin-top:14px;">
                <a href="${process.env.SITE_URL}" style="font-family:Arial,sans-serif;font-size:10px;color:#C5A55A;letter-spacing:2px;text-decoration:none;text-transform:uppercase;">kitaya.in</a>
              </div>
            </td>
          </tr>

          <!-- Bottom gold line -->
          <tr>
            <td style="height:3px;background:linear-gradient(to right,#C5A55A,#E8D5A3,#C5A55A);"></td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

    await resend.emails.send({
      from: `Kitaya Industries <${FROM_EMAIL}>`,
      replyTo: 'kitayaind@gmail.com',
      to: orderData.customerEmail,
      subject: `Your order is confirmed — #${orderNumber} | Kitaya`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      orderNumber,
    });

  } catch (err) {
    console.error('[verify-payment] Error:', err);
    return NextResponse.json(
      { error: 'Order processing failed. Please contact support with your payment ID.' },
      { status: 500 }
    );
  }
}