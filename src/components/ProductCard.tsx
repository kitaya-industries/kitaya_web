'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useStock } from '@/hooks/useStock';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  size?: 'default' | 'large';
}

export default function ProductCard({ product, size = 'default' }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const { isOutOfStock, loading: stockLoading } = useStock(product.slug);

  const cartItem = items.find((item) => item.product.slug === product.slug);
  const quantity = cartItem?.quantity || 0;

  void size;

  return (
    <div className="bg-white p-4 md:p-8 relative group transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

      {/* Sold Out badge */}
      {!stockLoading && isOutOfStock && (
        <div className="absolute top-4 left-4 z-10 bg-charcoal/80 text-white text-[9px] tracking-[2px] uppercase px-2.5 py-1 font-medium">
          Sold Out
        </div>
      )}

      {/* Brand Tag */}
      <div className={`text-[10px] tracking-[3px] uppercase font-medium mb-3 md:mb-5 ${
        product.brand === 'kitaya' ? 'text-kitaya-red' : 'text-teagate-blue'
      }`}>
        {product.brand === 'kitaya' ? 'Kitaya' : 'TeaGate'}
      </div>

      {/* Product Image */}
      <Link href={`/shop/${product.slug}`}>
        <div className={`w-full bg-bg aspect-square flex items-center justify-center mb-4 md:mb-6 overflow-hidden p-3 md:p-4 transition-opacity duration-300 ${isOutOfStock ? 'opacity-50' : ''}`}>
          <div className="relative w-full h-full">
            <Image
              src={product.images[0]}
              alt={`${product.brand === 'kitaya' ? 'Kitaya' : 'TeaGate'} ${product.name} ${product.weight}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 300px"
              className="object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <Link href={`/shop/${product.slug}`}>
        <h3 className="font-display text-base md:text-lg font-medium text-charcoal mb-1 leading-tight">
          {product.name}
        </h3>
      </Link>
      <p className="text-[11px] md:text-[13px] text-warm-gray mb-3 md:mb-4 leading-tight">
        {product.weight} · {product.tagline}
      </p>

      {/* Price + Cart — side by side on mobile, no overlap */}
      <div className="flex items-center justify-between gap-2 min-h-[40px]">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-base md:text-lg font-medium text-charcoal">
            ₹{product.price}
          </span>
          <span className="text-[11px] md:text-[13px] text-warm-gray line-through font-light">
            ₹{product.mrp}
          </span>
        </div>

        {/* Cart Controls — inline on mobile, no longer absolute */}
        <div className="flex-shrink-0">
          {isOutOfStock ? (
            <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border border-charcoal/8 bg-charcoal/5 cursor-not-allowed" title="Out of stock">
              <Plus size={18} className="text-charcoal/20" />
            </div>
          ) : quantity === 0 ? (
            <button
              onClick={() => addItem(product)}
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border border-charcoal/10 bg-transparent text-charcoal transition-all duration-300 hover:bg-gold hover:border-gold hover:text-white"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus size={18} />
            </button>
          ) : (
            <div className="flex items-center border border-gold bg-white shadow-sm">
              <button
                onClick={() => updateQuantity(product.slug, quantity - 1)}
                className="w-7 h-8 md:w-9 md:h-9 flex items-center justify-center text-charcoal hover:bg-gold/10 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={12} />
              </button>
              <span className="w-6 md:w-8 text-center text-xs md:text-sm font-medium text-charcoal">
                {quantity}
              </span>
              <button
                onClick={() => addItem(product)}
                className="w-7 h-8 md:w-9 md:h-9 flex items-center justify-center text-charcoal hover:bg-gold/10 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}