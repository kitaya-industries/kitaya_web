'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; icon: typeof Package; color: string }> = {
  placed:    { label: 'Order Placed',    icon: Package,     color: 'text-blue-500' },
  confirmed: { label: 'Confirmed',       icon: CheckCircle, color: 'text-green-500' },
  shipped:   { label: 'Shipped',         icon: Truck,       color: 'text-gold' },
  delivered: { label: 'Delivered',       icon: CheckCircle, color: 'text-green-600' },
  cancelled: { label: 'Cancelled',       icon: Clock,       color: 'text-kitaya-red' },
};

const STATUS_STEPS = ['placed', 'confirmed', 'shipped', 'delivered'];

interface OrderResult {
  orderNumber: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  shippedAt?: string;
  deliveredAt?: string;
  items: Array<{ name: string; weight: string; quantity: number; price: number; brand: string }>;
  subtotal: number;
  shipping: number;
  total: number;
  customerName: string;
  city: string;
  state: string;
  pincode: string;
  trackingNumber?: string;
  trackingUrl?: string;
}

interface TrackingInfo {
  status: string;
  statusDetail: string;
  location: string;
  updatedAt: string;
  expectedDate: string;
  scans: Array<{ time: string; status: string; location: string; instructions: string }>;
}

function TrackOrderContent() {
  const params = useSearchParams();

  const [orderNumber, setOrderNumber] = useState(params.get('order') || '');
  const [email, setEmail] = useState(params.get('email') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState<OrderResult | null>(null);
  const [tracking, setTracking] = useState<TrackingInfo | null>(null);

  // Auto-fetch if params are pre-filled (from confirmation email link)
  const [autoFetched, setAutoFetched] = useState(false);
  if (!autoFetched && params.get('order') && params.get('email')) {
    setAutoFetched(true);
    setTimeout(() => handleSearch(), 100);
  }

  async function handleSearch() {
    if (!orderNumber.trim() || !email.trim()) {
      setError('Please enter both your order number and email address.');
      return;
    }
    setLoading(true);
    setError('');
    setOrder(null);
    setTracking(null);

    try {
      const res = await fetch('/api/track-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber: orderNumber.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Order not found.');
      } else {
        setOrder(data.order);
        setTracking(data.tracking);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const currentStep = order ? STATUS_STEPS.indexOf(order.status) : -1;

  return (
    <section className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-[60px] bg-bg min-h-screen">
      <div className="max-w-[700px] mx-auto">

        {/* Breadcrumb */}
        <div className="text-[12px] text-warm-gray tracking-[1px] mb-8">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">Track Order</span>
        </div>

        <div className="section-label mb-4">Order Tracking</div>
        <h1 className="font-display text-3xl md:text-4xl font-normal text-charcoal mb-3">
          Track Your Order
        </h1>
        <p className="text-warm-gray text-[15px] font-light mb-10">
          Enter your order number and email address to see the latest status.
        </p>

        {/* Search form */}
        <div className="bg-bg-warm p-6 md:p-8 mb-10">
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] tracking-[2px] uppercase text-charcoal font-medium mb-2">
                Order Number
              </label>
              <input
                type="text"
                value={orderNumber}
                onChange={e => setOrderNumber(e.target.value.toUpperCase())}
                placeholder="e.g. KTY-20260317-1234"
                className="w-full px-4 py-3 bg-white border border-charcoal/15 text-charcoal text-[14px] font-light outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[2px] uppercase text-charcoal font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email used at checkout"
                className="w-full px-4 py-3 bg-white border border-charcoal/15 text-charcoal text-[14px] font-light outline-none focus:border-gold transition-colors"
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
            </div>

            {error && (
              <p className="text-[13px] text-kitaya-red font-light">{error}</p>
            )}

            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full py-3.5 bg-gold text-bg-dark text-[12px] tracking-[2.5px] uppercase font-medium hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Searching...
                </span>
              ) : (
                'Track Order →'
              )}
            </button>
          </div>
        </div>

        {/* Order results */}
        {order && (
          <div className="space-y-6">

            {/* Status progress */}
            {order.status !== 'cancelled' && (
              <div className="bg-bg-warm p-6 md:p-8">
                <div className="text-[10px] tracking-[3px] uppercase text-warm-gray mb-6">Delivery Progress</div>
                <div className="flex items-center justify-between relative">
                  {/* Progress line */}
                  <div className="absolute top-4 left-0 right-0 h-px bg-charcoal/10 z-0" />
                  <div
                    className="absolute top-4 left-0 h-px bg-gold z-0 transition-all duration-700"
                    style={{ width: `${Math.max(0, (currentStep / (STATUS_STEPS.length - 1)) * 100)}%` }}
                  />

                  {STATUS_STEPS.map((step, i) => {
                    const config = STATUS_CONFIG[step];
                    const Icon = config.icon;
                    const isComplete = i <= currentStep;
                    const isCurrent = i === currentStep;
                    return (
                      <div key={step} className="flex flex-col items-center z-10 gap-2">
                        <div className={`w-8 h-8 flex items-center justify-center border-2 transition-all duration-500 ${
                          isComplete
                            ? 'border-gold bg-gold'
                            : 'border-charcoal/15 bg-bg-warm'
                        } ${isCurrent ? 'scale-110' : ''}`}>
                          <Icon size={14} className={isComplete ? 'text-bg-dark' : 'text-warm-gray'} strokeWidth={2} />
                        </div>
                        <span className={`text-[9px] tracking-[1px] uppercase font-medium text-center max-w-[60px] leading-3 ${
                          isCurrent ? 'text-gold' : isComplete ? 'text-charcoal' : 'text-warm-gray'
                        }`}>
                          {config.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Live tracking from Delhivery */}
            {tracking && (
              <div className="bg-bg-warm p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-[10px] tracking-[3px] uppercase text-warm-gray">Live Tracking</div>
                  {order.trackingNumber && (
                    <span className="text-[11px] text-warm-gray font-light">#{order.trackingNumber}</span>
                  )}
                </div>

                {/* Latest status */}
                <div className="flex items-start gap-3 mb-5 p-4 bg-white border-l-2 border-gold">
                  <Truck size={16} className="text-gold mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[13px] font-medium text-charcoal">{tracking.status}</div>
                    {tracking.statusDetail && (
                      <div className="text-[12px] text-warm-gray font-light mt-0.5">{tracking.statusDetail}</div>
                    )}
                    {tracking.location && (
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin size={10} className="text-warm-gray" />
                        <span className="text-[11px] text-warm-gray">{tracking.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Scan history */}
                {tracking.scans.length > 0 && (
                  <div className="space-y-3">
                    {tracking.scans.map((scan, i) => (
                      <div key={i} className="flex gap-3 text-[12px]">
                        <div className="text-warm-gray font-light w-32 shrink-0">{scan.time}</div>
                        <div>
                          <span className="text-charcoal">{scan.status}</span>
                          {scan.location && <span className="text-warm-gray"> · {scan.location}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {order.trackingUrl && (
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-[11px] tracking-[2px] uppercase text-gold hover:text-gold-light transition-colors"
                  >
                    View on Delhivery →
                  </a>
                )}
              </div>
            )}

            {/* No tracking yet */}
            {!tracking && order.status === 'confirmed' && (
              <div className="bg-bg-warm p-6 text-center">
                <Clock size={20} className="text-warm-gray mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-[13px] text-warm-gray font-light">
                  Your order is confirmed and being prepared for dispatch.
                  Tracking details will appear here once shipped.
                </p>
              </div>
            )}

            {/* Order details */}
            <div className="bg-bg-warm p-6 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <div className="text-[10px] tracking-[3px] uppercase text-warm-gray">Order Details</div>
                <div className="font-display text-sm text-charcoal">{order.orderNumber}</div>
              </div>

              <div className="space-y-3 mb-5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-[13px]">
                    <span className="text-warm-gray font-light">
                      {item.name} ({item.weight}) × {item.quantity}
                    </span>
                    <span className="text-charcoal">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-charcoal/8 pt-4 space-y-2">
                <div className="flex justify-between text-[13px]">
                  <span className="text-warm-gray font-light">Subtotal</span>
                  <span className="text-charcoal">₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-warm-gray font-light">Shipping</span>
                  <span className="text-charcoal">₹{order.shipping}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-charcoal/8">
                  <span className="font-display text-base text-charcoal">Total Paid</span>
                  <span className="font-display text-base text-charcoal">₹{order.total}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-charcoal/8 text-[12px] text-warm-gray font-light leading-6">
                <div className="flex items-start gap-1.5">
                  <MapPin size={12} className="mt-0.5 shrink-0" />
                  <span>{order.customerName} · {order.city}, {order.state} - {order.pincode}</span>
                </div>
                <div className="mt-1 text-[11px]">
                  Ordered {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </div>
              </div>
            </div>

            {/* Help */}
            <p className="text-[12px] text-warm-gray text-center font-light pb-4">
              Need help with your order? WhatsApp{' '}
              <a href="https://wa.me/919079720031" className="text-gold hover:text-gold-light transition-colors">
                +91 90797 20031
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <section className="pt-32 pb-20 px-6 bg-bg min-h-screen flex items-center justify-center">
        <Loader2 size={20} className="animate-spin text-warm-gray" />
      </section>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}