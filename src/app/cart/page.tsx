'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, Loader2 } from 'lucide-react';
import { useCart } from '@/lib/cart';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems, hydrated } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Wait for cart to load from localStorage before rendering
  if (!mounted || !hydrated) {
    return (
      <section className="pt-32 pb-20 px-6 bg-bg min-h-screen flex items-center justify-center">
        <Loader2 size={20} className="animate-spin text-warm-gray" />
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 px-6 lg:px-[60px] bg-bg min-h-screen">
      <div className="max-w-[1000px] mx-auto">
        {/* Breadcrumb */}
        <div className="text-[12px] text-warm-gray tracking-[1px] mb-10">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">Cart</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-medium text-charcoal mb-10">
          Your Bag {totalItems > 0 && <span className="text-warm-gray font-light text-2xl">({totalItems})</span>}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-6 opacity-20">
              <svg viewBox="0 0 64 64" fill="none" stroke="#2D2D2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 8h6l8 32h28l6-24H18"/>
                <circle cx="26" cy="52" r="3"/>
                <circle cx="46" cy="52" r="3"/>
              </svg>
            </div>
            <h2 className="font-display text-2xl text-charcoal mb-3">Your bag is empty</h2>
            <p className="text-warm-gray text-sm font-light mb-8">
              Explore our collection of premium Assam tea and add something to your bag.
            </p>
            <Link href="/shop" className="btn-primary inline-block">
              Shop Our Teas
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="border-b border-charcoal/10 pb-3 mb-6 hidden md:grid grid-cols-12 gap-4">
                <div className="col-span-6 text-[11px] tracking-[2px] uppercase text-warm-gray">Product</div>
                <div className="col-span-3 text-[11px] tracking-[2px] uppercase text-warm-gray text-center">Quantity</div>
                <div className="col-span-3 text-[11px] tracking-[2px] uppercase text-warm-gray text-right">Total</div>
              </div>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.product.slug} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pb-6 border-b border-charcoal/5">
                    {/* Product */}
                    <div className="md:col-span-6 flex gap-4 items-center">
                      <div className="w-20 h-20 bg-bg-warm flex-shrink-0 relative overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={`${item.product.name} ${item.product.weight}`}
                          fill
                          sizes="80px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <div className={`text-[10px] tracking-[2px] uppercase font-medium mb-1 ${
                          item.product.brand === 'kitaya' ? 'text-kitaya-red' : 'text-teagate-blue'
                        }`}>
                          {item.product.brand === 'kitaya' ? 'Kitaya' : 'TeaGate'}
                        </div>
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="font-display text-base text-charcoal hover:text-gold transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-[12px] text-warm-gray mt-0.5">{item.product.weight}</div>
                        <div className="text-sm text-charcoal mt-1 md:hidden">
                          ₹{item.product.price} each
                        </div>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-3 flex items-center justify-center gap-2">
                      <div className="flex items-center border border-charcoal/15">
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                          className="p-2 hover:bg-bg-warm transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                          className="p-2 hover:bg-bg-warm transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.slug)}
                        className="p-2 text-warm-gray hover:text-kitaya-red transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-3 text-right">
                      <span className="font-medium text-charcoal">
                        ₹{item.product.price * item.quantity}
                      </span>
                      {item.quantity > 1 && (
                        <div className="text-[11px] text-warm-gray">
                          ₹{item.product.price} x {item.quantity}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/shop"
                  className="text-gold text-sm hover:text-gold-light transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-bg-warm p-8 sticky top-28">
                <h3 className="font-display text-lg text-charcoal mb-6">Order Summary</h3>

                <div className="space-y-3 pb-6 border-b border-charcoal/8">
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-gray font-light">Subtotal</span>
                    <span className="text-charcoal font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-gray font-light">Shipping</span>
                    <span className="text-warm-gray text-[12px]">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between pt-6 mb-8">
                  <span className="font-display text-lg text-charcoal">Total</span>
                  <span className="font-display text-lg text-charcoal">₹{subtotal}</span>
                </div>

                <Link
                  href="/checkout"
                  className="btn-primary block text-center w-full"
                >
                  Proceed to Checkout
                </Link>

                <p className="text-[11px] text-warm-gray text-center mt-4 font-light">
                  Shipping and taxes calculated at checkout. Secure payment via Razorpay.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}