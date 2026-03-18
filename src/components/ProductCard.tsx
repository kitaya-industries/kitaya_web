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

  // Suppress unused var warning — size kept for API compatibility
  void size;

  return (
    <div className="bg-white p-6 md:p-8 relative group transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

      {/* Sold Out badge */}
      {!stockLoading && isOutOfStock && (
        <div className="absolute top-4 left-4 z-10 bg-charcoal/80 text-white text-[9px] tracking-[2px] uppercase px-2.5 py-1 font-medium">
          Sold Out
        </div>
      )}

      {/* Brand Tag */}
      <div className={`text-[10px] tracking-[3px] uppercase font-medium mb-5 ${
        product.brand === 'kitaya' ? 'text-kitaya-red' : 'text-teagate-blue'
      }`}>
        {product.brand === 'kitaya' ? 'Kitaya' : 'TeaGate'}
      </div>

      {/* Product Image */}
      <Link href={`/shop/${product.slug}`}>
        <div className={`w-full bg-bg aspect-square flex items-center justify-center mb-6 overflow-hidden p-4 transition-opacity duration-300 ${isOutOfStock ? 'opacity-50' : ''}`}>
          <div className="relative w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <Link href={`/shop/${product.slug}`}>
        <h3 className="font-display text-lg font-medium text-charcoal mb-1.5">{product.name}</h3>
      </Link>
      <p className="text-[13px] text-warm-gray mb-4">{product.weight} · {product.tagline}</p>
      <div className="text-lg font-medium text-charcoal">
        ₹{product.price}
        <span className="text-[13px] text-warm-gray line-through ml-2 font-light">₹{product.mrp}</span>
      </div>

      {/* Cart Controls */}
      <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8">
        {isOutOfStock ? (
          <div className="w-10 h-10 flex items-center justify-center border border-charcoal/8 bg-charcoal/5 cursor-not-allowed" title="Out of stock">
            <Plus size={20} className="text-charcoal/20" />
          </div>
        ) : quantity === 0 ? (
          <button
            onClick={() => addItem(product)}
            className="w-10 h-10 flex items-center justify-center border border-charcoal/10 bg-transparent text-charcoal transition-all duration-300 hover:bg-gold hover:border-gold hover:text-white"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={20} />
          </button>
        ) : (
          <div className="flex items-center border border-gold bg-white shadow-sm">
            <button onClick={() => updateQuantity(product.slug, quantity - 1)}
              className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-gold/10 transition-colors" aria-label="Decrease quantity">
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-medium text-charcoal">{quantity}</span>
            <button onClick={() => addItem(product)}
              className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-gold/10 transition-colors" aria-label="Increase quantity">
              <Plus size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}