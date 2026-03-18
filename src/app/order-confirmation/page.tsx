'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Suspense } from 'react';

function ConfirmationContent() {
  const params = useSearchParams();
  const orderNumber = params.get('order') || '';
  const name = params.get('name') || 'there';

  return (
    <section className="pt-32 pb-20 px-6 lg:px-[60px] bg-bg min-h-screen">
      <div className="max-w-[600px] mx-auto text-center">

        {/* Gold check icon */}
        <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center border border-gold/30">
          <CheckCircle size={32} strokeWidth={1} className="text-gold" />
        </div>

        {/* Heading */}
        <div className="section-label mb-4">Order Confirmed</div>
        <h1 className="font-display text-3xl md:text-4xl font-normal text-charcoal mb-4">
          Thank you, {decodeURIComponent(name).split(' ')[0]}
        </h1>
        <p className="text-warm-gray text-base font-light leading-7 mb-8 max-w-[440px] mx-auto">
          Your order has been placed successfully. A confirmation email with your order details
          and tracking link has been sent to your email address.
        </p>

        {/* Order number */}
        {orderNumber && (
          <div className="bg-bg-warm border border-charcoal/8 px-8 py-5 inline-block mb-8">
            <div className="text-[10px] tracking-[3px] uppercase text-warm-gray mb-2">Order Number</div>
            <div className="font-display text-2xl text-charcoal">{orderNumber}</div>
          </div>
        )}

        {/* What happens next */}
        <div className="bg-bg-warm p-8 text-left mb-10">
          <h3 className="font-display text-base text-charcoal mb-5">What happens next</h3>
          <div className="space-y-4">
            {[
              { num: '01', text: 'You\'ll receive a confirmation email shortly with your order summary.' },
              { num: '02', text: 'We\'ll pack and hand your order to Delhivery within 1–2 business days.' },
              { num: '03', text: 'You\'ll get a tracking number via email once shipped.' },
              { num: '04', text: 'Track your order anytime at kitaya.in/track-order.' },
            ].map(step => (
              <div key={step.num} className="flex gap-4 items-start">
                <span className="font-display text-sm text-gold/50 shrink-0 mt-0.5">{step.num}</span>
                <p className="text-warm-gray text-[14px] font-light leading-6">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/track-order${orderNumber ? `?order=${orderNumber}` : ''}`}
            className="btn-primary text-center"
          >
            Track Order
          </Link>
          <Link href="/shop" className="btn-secondary text-center">
            Continue Shopping
          </Link>
        </div>

        {/* Help */}
        <p className="text-[12px] text-warm-gray mt-8 font-light">
          Questions? WhatsApp{' '}
          <a href="https://wa.me/919079720031" className="text-gold hover:text-gold-light transition-colors">
            +91 90797 20031
          </a>
          {' '}or email{' '}
          <a href="mailto:kitayaind@gmail.com" className="text-gold hover:text-gold-light transition-colors">
            kitayaind@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <section className="pt-32 pb-20 px-6 bg-bg min-h-screen flex items-center justify-center">
        <div className="text-warm-gray text-sm">Loading...</div>
      </section>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}