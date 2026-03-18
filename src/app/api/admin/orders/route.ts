// src/app/api/admin/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── SECURITY FIX ──────────────────────────────────────────────────────────────
// Changed from GET with ?pin=xxx (exposed in server logs, browser history,
// Vercel dashboard) to POST with PIN in the request body.
// Also update admin/page.tsx to use POST — see comment at bottom of this file.
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();

    // PIN check
    if (!pin || pin !== process.env.ADMIN_PIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    return NextResponse.json({ orders: data });

  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

/*
  ── UPDATE REQUIRED IN admin/page.tsx ────────────────────────────────────────

  Find the fetchOrders function and change GET → POST:

  BEFORE:
    const res = await fetch(`/api/admin/orders?pin=${adminPin}`);

  AFTER:
    const res = await fetch('/api/admin/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: adminPin }),
    });

  ─────────────────────────────────────────────────────────────────────────────
*/