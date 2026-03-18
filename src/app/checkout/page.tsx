'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { getCartShippingDiscount, getCartWeightGrams } from '@/data/products';
import { ChevronDown, Loader2, ShieldCheck, Lock } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface ShippingResult {
  chargedShipping: number;
  actualShipping: number;
  shippingDiscount: number;
  serviceable: boolean;
}

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

// ── Indian states ─────────────────────────────────────────────────────────────
const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
  'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu',
  'Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry',
];

// ── Razorpay types ────────────────────────────────────────────────────────────
declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open(): void;
      on(event: string, handler: (response: Record<string, unknown>) => void): void;
    };
  }
}

// ── Field component — defined OUTSIDE CheckoutPage to prevent remount on every render ──
// This is the root cause of the cursor bug: defining a component inside another
// component causes React to treat it as a new component type on every render,
// unmounting and remounting the input, which loses focus.
interface FieldProps {
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  form: FormData;
  errors: Partial<FormData>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  children?: React.ReactNode;
}

function Field({ label, name, type = 'text', placeholder, required = false, hint, form, errors, onChange, children }: FieldProps) {
  return (
    <div>
      <label className="block text-[11px] tracking-[2px] uppercase text-charcoal font-medium mb-2">
        {label}{required && <span className="text-kitaya-red ml-1">*</span>}
      </label>
      {children || (
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="on"
          className={`w-full px-4 py-3 bg-white border text-charcoal text-[14px] font-light outline-none transition-colors duration-200 ${
            errors[name]
              ? 'border-kitaya-red focus:border-kitaya-red'
              : 'border-charcoal/15 focus:border-gold hover:border-charcoal/30'
          }`}
        />
      )}
      {hint && !errors[name] && (
        <p className="text-[11px] text-warm-gray mt-1.5 font-light">{hint}</p>
      )}
      {errors[name] && (
        <p className="text-[11px] text-kitaya-red mt-1.5 font-light">{errors[name]}</p>
      )}
    </div>
  );
}

// ── Main checkout page ────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, hydrated } = useCart();

  // Show spinner until cart has loaded from localStorage
  // Without this, items.length === 0 on first render even if cart has items
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [form, setForm] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [shipping, setShipping] = useState<ShippingResult | null>(null);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [razorpayKeyId, setRazorpayKeyId] = useState('');

  const pincodeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cart computed values
  const cartWeight = getCartWeightGrams(items);
  const cartDiscount = getCartShippingDiscount(items);
  const total = subtotal + (shipping?.chargedShipping ?? 0);

  // ── Load Razorpay script + fetch key from server ───────────────────────────
  useEffect(() => {
    fetch('/api/payment-config')
      .then(r => r.json())
      .then(d => { if (d.keyId) setRazorpayKeyId(d.keyId); })
      .catch(() => {});

    if (typeof window !== 'undefined' && window.Razorpay) {
      setRazorpayLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    document.head.appendChild(script);
  }, []);

  // ── Fetch shipping rate ────────────────────────────────────────────────────
  const fetchShipping = useCallback(async (pincode: string) => {
    if (!/^\d{6}$/.test(pincode)) return;
    setShippingLoading(true);
    setShippingError('');
    setShipping(null);
    try {
      const res = await fetch('/api/shipping-rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pincode, weightGrams: cartWeight, shippingDiscount: cartDiscount }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setShippingError(data.error || 'Could not calculate shipping for this pincode.');
      } else {
        setShipping(data);
      }
    } catch {
      setShippingError('Network error. Please check your connection and try again.');
    } finally {
      setShippingLoading(false);
    }
  }, [cartWeight, cartDiscount]);

  // ── Handle form change ─────────────────────────────────────────────────────
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));

    if (name === 'pincode') {
      if (pincodeTimer.current) clearTimeout(pincodeTimer.current);
      if (value.length === 6) {
        pincodeTimer.current = setTimeout(() => fetchShipping(value), 400);
      } else {
        setShipping(null);
        setShippingError('');
      }
    }
  }, [fetchShipping]);

  // ── Validate ───────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.customerName.trim()) e.customerName = 'Full name is required';
    if (!form.customerEmail.trim()) e.customerEmail = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)) e.customerEmail = 'Enter a valid email address';
    if (!form.customerPhone.trim()) e.customerPhone = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(form.customerPhone.replace(/\s/g, ''))) e.customerPhone = 'Enter a valid 10-digit mobile number';
    if (!form.addressLine1.trim()) e.addressLine1 = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state) e.state = 'Select your state';
    if (!form.pincode.trim()) e.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter a valid 6-digit pincode';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Handle payment ─────────────────────────────────────────────────────────
  const handlePayment = async () => {
    if (!validate()) {
      document.querySelector('[data-error="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!shipping) { setShippingError('Please wait for shipping to be calculated.'); return; }
    if (!razorpayLoaded || !razorpayKeyId) { alert('Payment gateway is loading. Please try again in a moment.'); return; }

    setPaymentLoading(true);
    try {
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, receipt: `rcpt_${Date.now()}` }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.orderId) throw new Error(orderData.error || 'Failed to create payment order');

      const razorpay = new window.Razorpay({
        key: razorpayKeyId,
        order_id: orderData.orderId,
        amount: orderData.amount,
        currency: 'INR',
        name: 'Kitaya Industries',
        description: `${items.length} item${items.length > 1 ? 's' : ''} — ${items.map(i => i.product.name).join(', ')}`,
        prefill: { name: form.customerName, email: form.customerEmail, contact: form.customerPhone },
        theme: { color: '#C5A55A', backdrop_color: 'rgba(26,26,24,0.85)' },
        modal: { ondismiss: () => { setPaymentLoading(false); } },
        handler: async (response: Record<string, string>) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: {
                  ...form,
                  items: items.map(item => ({
                    slug: item.product.slug,
                    name: item.product.name,
                    brand: item.product.brand,
                    weight: item.product.weight,
                    quantity: item.quantity,
                    price: item.product.price,
                  })),
                  subtotal,
                  chargedShipping: shipping.chargedShipping,
                  actualShipping: shipping.actualShipping,
                  total,
                },
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) throw new Error(verifyData.error || 'Order verification failed');
            clearCart();
            router.push(`/order-confirmation?order=${verifyData.orderNumber}&name=${encodeURIComponent(form.customerName)}`);
          } catch (err) {
            console.error('[checkout] verify error:', err);
            alert('Your payment was received but we had trouble saving your order. Please contact us at +91 90797 20031 with your payment ID: ' + response.razorpay_payment_id);
            setPaymentLoading(false);
          }
        },
      });

      razorpay.on('payment.failed', () => {
        alert('Payment failed. Please try again or use a different payment method.');
        setPaymentLoading(false);
      });

      razorpay.open();
    } catch (err) {
      console.error('[checkout] error:', err);
      alert('Something went wrong. Please try again.');
      setPaymentLoading(false);
    }
  };

  // ── Before mount OR before cart loads from localStorage — show spinner ──────
  if (!mounted || !hydrated) {
    return (
      <section className="pt-32 pb-20 px-6 bg-bg min-h-screen flex items-center justify-center">
        <Loader2 size={20} className="animate-spin text-warm-gray" />
      </section>
    );
  }

  // ── Empty cart ─────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <section className="pt-32 pb-20 px-6 lg:px-[60px] bg-bg min-h-screen">
        <div className="max-w-[600px] mx-auto text-center py-20">
          <h1 className="font-display text-3xl text-charcoal mb-4">Nothing to Checkout</h1>
          <p className="text-warm-gray text-sm font-light mb-8">Your bag is empty. Add some tea to get started.</p>
          <Link href="/shop" className="btn-primary inline-block">Shop Our Teas</Link>
        </div>
      </section>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-[60px] bg-bg min-h-screen">
      <div className="max-w-[1100px] mx-auto">

        {/* Breadcrumb */}
        <div className="text-[12px] text-warm-gray tracking-[1px] mb-8">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-gold transition-colors">Cart</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">Checkout</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-medium text-charcoal mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-14">

          {/* ── LEFT: Form ──────────────────────────────────────────────────── */}
          <div className="space-y-10">

            {/* Contact details */}
            <div>
              <h2 className="font-display text-lg text-charcoal mb-6 pb-3 border-b border-charcoal/10">Contact Details</h2>
              <div className="space-y-5">
                <Field label="Full Name" name="customerName" placeholder="As on your ID" required form={form} errors={errors} onChange={handleChange} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Email Address" name="customerEmail" type="email" placeholder="you@email.com" required
                    hint="Order confirmation will be sent here" form={form} errors={errors} onChange={handleChange} />
                  <Field label="Mobile Number" name="customerPhone" type="tel" placeholder="10-digit mobile" required
                    hint="For delivery updates from Delhivery" form={form} errors={errors} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Delivery address */}
            <div>
              <h2 className="font-display text-lg text-charcoal mb-6 pb-3 border-b border-charcoal/10">Delivery Address</h2>
              <div className="space-y-5">
                <Field label="Address Line 1" name="addressLine1" placeholder="House / Flat no., Street, Area" required form={form} errors={errors} onChange={handleChange} />
                <Field label="Address Line 2" name="addressLine2" placeholder="Landmark, Colony (optional)" form={form} errors={errors} onChange={handleChange} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="City" name="city" placeholder="Your city" required form={form} errors={errors} onChange={handleChange} />

                  {/* State dropdown */}
                  <div>
                    <label className="block text-[11px] tracking-[2px] uppercase text-charcoal font-medium mb-2">
                      State <span className="text-kitaya-red">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white border text-[14px] font-light outline-none appearance-none transition-colors duration-200 ${
                          errors.state
                            ? 'border-kitaya-red text-charcoal'
                            : 'border-charcoal/15 focus:border-gold hover:border-charcoal/30 text-charcoal'
                        } ${!form.state ? 'text-warm-gray' : ''}`}
                      >
                        <option value="" disabled>Select state</option>
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none" />
                    </div>
                    {errors.state && <p className="text-[11px] text-kitaya-red mt-1.5 font-light">{errors.state}</p>}
                  </div>
                </div>

                {/* Pincode */}
                <div className="max-w-[200px]">
                  <label className="block text-[11px] tracking-[2px] uppercase text-charcoal font-medium mb-2">
                    Pincode <span className="text-kitaya-red">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="6-digit pincode"
                      maxLength={6}
                      className={`w-full px-4 py-3 bg-white border text-charcoal text-[14px] font-light outline-none transition-colors duration-200 ${
                        errors.pincode ? 'border-kitaya-red' : 'border-charcoal/15 focus:border-gold hover:border-charcoal/30'
                      }`}
                    />
                    {shippingLoading && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 size={14} className="animate-spin text-gold" />
                      </div>
                    )}
                  </div>
                  {errors.pincode && <p className="text-[11px] text-kitaya-red mt-1.5 font-light">{errors.pincode}</p>}
                  {shippingError && !errors.pincode && <p className="text-[11px] text-kitaya-red mt-1.5 font-light">{shippingError}</p>}
                  {shipping && !shippingLoading && <p className="text-[11px] text-green-600 mt-1.5 font-light">✓ Delivery available — shipping calculated</p>}
                  {form.pincode.length > 0 && form.pincode.length < 6 && !errors.pincode && (
                    <p className="text-[11px] text-warm-gray mt-1.5 font-light">Shipping calculated after full pincode</p>
                  )}
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-start gap-3 bg-bg-warm p-4 border-l-2 border-gold/40">
              <Lock size={14} className="text-gold mt-0.5 shrink-0" />
              <p className="text-[12px] text-warm-gray font-light leading-6">
                Payments are processed securely by Razorpay. We accept UPI, GPay, PhonePe, all credit/debit cards, and NetBanking. Your card details are never stored on our servers.
              </p>
            </div>
          </div>

          {/* ── RIGHT: Order summary ─────────────────────────────────────────── */}
          <div>
            <div className="bg-bg-warm p-6 md:p-8 sticky top-28">
              <h2 className="font-display text-lg text-charcoal mb-6 pb-3 border-b border-charcoal/10">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.product.slug} className="flex gap-3 items-center">
                    <div className="w-14 h-14 bg-white relative overflow-hidden shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill sizes="56px" className="object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[9px] tracking-[2px] uppercase font-medium mb-0.5 ${item.product.brand === 'kitaya' ? 'text-kitaya-red' : 'text-teagate-blue'}`}>
                        {item.product.brand === 'kitaya' ? 'Kitaya' : 'TeaGate'}
                      </div>
                      <div className="text-[13px] text-charcoal font-display truncate">{item.product.name}</div>
                      <div className="text-[11px] text-warm-gray">{item.product.weight} × {item.quantity}</div>
                    </div>
                    <div className="text-[13px] text-charcoal font-medium shrink-0">₹{item.product.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-charcoal/10 pt-4 space-y-2.5">
                <div className="flex justify-between text-[13px]">
                  <span className="text-warm-gray font-light">Subtotal</span>
                  <span className="text-charcoal">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-warm-gray font-light">Shipping</span>
                  <span className={shippingLoading || !shipping ? 'text-warm-gray' : 'text-charcoal'}>
                    {shippingLoading ? (
                      <span className="flex items-center gap-1.5"><Loader2 size={12} className="animate-spin" /> Calculating...</span>
                    ) : shipping ? (
                      <span>
                        {shipping.shippingDiscount > 0 && (
                          <span className="line-through text-warm-gray mr-2 text-[11px]">₹{shipping.actualShipping}</span>
                        )}
                        ₹{shipping.chargedShipping}
                      </span>
                    ) : (
                      <span className="text-[11px]">Enter pincode</span>
                    )}
                  </span>
                </div>
                {shipping && shipping.shippingDiscount > 0 && (
                  <div className="flex justify-between text-[12px]">
                    <span className="text-green-600 font-light">Shipping discount</span>
                    <span className="text-green-600">−₹{shipping.shippingDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-charcoal/10">
                  <span className="font-display text-base text-charcoal">Total</span>
                  <span className="font-display text-base text-charcoal">{shipping ? `₹${total}` : '—'}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-charcoal/8">
                <div className="flex items-center gap-1.5 text-[10px] tracking-[1px] uppercase text-warm-gray">
                  <ShieldCheck size={13} strokeWidth={1.5} /> FSSAI
                </div>
                <div className="flex items-center gap-1.5 text-[10px] tracking-[1px] uppercase text-warm-gray">
                  <Lock size={12} strokeWidth={1.5} /> Secure Pay
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handlePayment}
                disabled={paymentLoading || shippingLoading || !shipping || !!shippingError}
                className={`w-full mt-6 py-4 text-[12px] tracking-[2.5px] uppercase font-medium transition-all duration-300 ${
                  paymentLoading || shippingLoading || !shipping || shippingError
                    ? 'bg-charcoal/30 text-white cursor-not-allowed'
                    : 'bg-gold text-bg-dark hover:bg-gold-light cursor-pointer'
                }`}
              >
                {paymentLoading ? (
                  <span className="flex items-center justify-center gap-2"><Loader2 size={14} className="animate-spin" /> Processing...</span>
                ) : shippingLoading ? (
                  <span className="flex items-center justify-center gap-2"><Loader2 size={14} className="animate-spin" /> Calculating Shipping...</span>
                ) : !shipping ? (
                  'Enter Pincode to Continue'
                ) : (
                  `Pay ₹${total} Securely →`
                )}
              </button>

              <p className="text-[10px] text-warm-gray text-center mt-3 font-light">Prepaid orders only · No COD</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}