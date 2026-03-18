// src/app/api/admin/stock/route.ts
//
// SECURITY FIX: Stock reads and writes now go through this PIN-protected
// server route using the service role key, instead of directly from the
// browser using the public anon key.
//
// This means:
// - Stock data is protected even if Supabase RLS is misconfigured
// - The service role key never reaches the browser
// - All stock mutations are authenticated server-side

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── GET — fetch all stock ─────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const pin = req.nextUrl.searchParams.get('pin');

  if (!pin || pin !== process.env.ADMIN_PIN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('product_stock')
    .select('slug, stock_quantity, is_active, updated_at')
    .order('slug', { ascending: true });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch stock' }, { status: 500 });
  }

  return NextResponse.json({ stock: data });
}

// ── POST — update one or all stock rows ───────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { pin, updates } = await req.json();

    if (!pin || pin !== process.env.ADMIN_PIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // updates is an array: [{ slug, stock_quantity, is_active }, ...]
    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
    }

    // Validate each update entry
    for (const u of updates) {
      if (typeof u.slug !== 'string' || u.slug.trim() === '') {
        return NextResponse.json({ error: 'Invalid slug in update' }, { status: 400 });
      }
      if (!Number.isFinite(u.stock_quantity) || u.stock_quantity < 0) {
        return NextResponse.json(
          { error: `Invalid stock_quantity for ${u.slug}` },
          { status: 400 }
        );
      }
      if (typeof u.is_active !== 'boolean') {
        return NextResponse.json(
          { error: `Invalid is_active for ${u.slug}` },
          { status: 400 }
        );
      }
    }

    // Run all updates in parallel
    const results = await Promise.all(
      updates.map((u: { slug: string; stock_quantity: number; is_active: boolean }) =>
        supabase
          .from('product_stock')
          .update({
            stock_quantity: Math.max(0, Math.round(u.stock_quantity)),
            is_active: u.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq('slug', u.slug)
      )
    );

    const failed = results.find((r) => r.error);
    if (failed?.error) {
      console.error('[admin/stock] Update error:', failed.error);
      return NextResponse.json({ error: 'Failed to update stock' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}