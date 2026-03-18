'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, FlaskRound, MapPin, Minus, Plus, AlertCircle } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useStock } from '@/hooks/useStock';
import type { Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { getAllActiveProducts, getProductsByBrand } from '@/data/products';

interface Props {
  product: Product;
  siblingProduct: Product | null;
}

type Tab = 'description' | 'brewing' | 'nutrition' | 'storage';

function SpoonIcon() {
  return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="16" cy="9" rx="5" ry="7" /><line x1="16" y1="16" x2="16" y2="28" /></svg>;
}
function WaterIcon() {
  return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4 C16 4 8 14 8 20 a8 8 0 0 0 16 0 C24 14 16 4 16 4Z" /><path d="M11 22 Q13 19 16 21" opacity="0.5" /></svg>;
}
function TempIcon() {
  return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><line x1="16" y1="4" x2="16" y2="19" /><circle cx="16" cy="23" r="4" /><line x1="20" y1="8" x2="22" y2="8" opacity="0.5" /><line x1="20" y1="12" x2="22" y2="12" opacity="0.5" /><line x1="20" y1="16" x2="22" y2="16" opacity="0.5" /></svg>;
}
function TimerIcon() {
  return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="18" r="10" /><line x1="16" y1="18" x2="16" y2="12" /><line x1="16" y1="18" x2="20" y2="18" /><line x1="13" y1="4" x2="19" y2="4" /><line x1="16" y1="4" x2="16" y2="8" /></svg>;
}

const brewIcons = [SpoonIcon, WaterIcon, TempIcon, TimerIcon];

export default function ProductDetailClient({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const { addItem } = useCart();
  const router = useRouter();

  const { isOutOfStock, quantity: stockQty, loading: stockLoading } = useStock(product.slug);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const brandProducts = getProductsByBrand(product.brand).sort((a, b) => a.sortOrder - b.sortOrder);
  const otherBrandProducts = getAllActiveProducts().filter((p) => p.brand !== product.brand).slice(0, 2);
  const isLowStock = !stockLoading && !isOutOfStock && stockQty !== null && stockQty <= 5 && stockQty > 0;

  const tabs: { key: Tab; label: string }[] = [
    { key: 'description', label: 'Description' },
    { key: 'brewing', label: 'Brewing' },
    { key: 'nutrition', label: 'Nutrition' },
    { key: 'storage', label: 'Storage' },
  ];

  const brewSteps = [
    { Icon: brewIcons[0], value: `${product.brewingInstructions.teaspoons} tsp`, label: 'Per cup' },
    { Icon: brewIcons[1], value: product.brewingInstructions.water, label: 'Hot water' },
    { Icon: brewIcons[2], value: product.brewingInstructions.temp, label: 'Temperature' },
    { Icon: brewIcons[3], value: product.brewingInstructions.time, label: 'Steep time' },
  ];

  return (
    <section className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-[60px] bg-bg">
      <div className="max-w-[1200px] mx-auto">

        <div className="text-[12px] text-warm-gray tracking-[1px] mb-8 sm:mb-10">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{product.name} {product.weight}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Image */}
          <div className="space-y-3 sm:space-y-4">
            <div className={`bg-bg-warm aspect-square relative overflow-hidden p-4 sm:p-6 ${isOutOfStock ? 'opacity-60' : ''}`}>
              <Image src={activeImage} alt={`${product.name} ${product.weight}`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" priority />
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-charcoal text-white text-[11px] tracking-[3px] uppercase px-5 py-2 font-medium">Sold Out</div>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(img)}
                    className={`bg-bg-warm aspect-square relative overflow-hidden p-2 border-2 transition-all duration-200 ${activeImage === img ? 'border-gold' : 'border-transparent hover:border-charcoal/20'}`}>
                    <Image src={img} alt={`${product.name} view ${i + 1}`} fill sizes="100px" className="object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mt-2 lg:mt-0">
            <div className={`text-[11px] tracking-[3px] uppercase font-medium mb-3 sm:mb-4 ${product.brand === 'kitaya' ? 'text-kitaya-red' : 'text-teagate-blue'}`}>
              {product.brand === 'kitaya' ? 'Kitaya' : 'TeaGate'}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-charcoal mb-2">{product.name}</h1>
            <p className="text-warm-gray text-sm mb-4 sm:mb-5">{product.weight} · {product.tagline}</p>

            {/* Stock status indicator */}
            {!stockLoading && (
              <div className="mb-5">
                {isOutOfStock ? (
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-red-500 font-medium">
                    <AlertCircle size={13} strokeWidth={2} /> Currently out of stock
                  </span>
                ) : isLowStock ? (
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-amber-600 font-medium">
                    <AlertCircle size={13} strokeWidth={2} /> Only {stockQty} left — order soon
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-green-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> In stock
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 sm:mb-8">
              <span className={`text-2xl font-medium ${isOutOfStock ? 'text-charcoal/40' : 'text-charcoal'}`}>₹{product.price}</span>
              <span className="text-base text-warm-gray line-through font-light">₹{product.mrp}</span>
              {!isOutOfStock && (
                <span className="text-sm text-green-600 font-normal">{Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off</span>
              )}
            </div>

            <p className="text-warm-gray text-[15px] leading-7 font-light mb-6 sm:mb-8">{product.description}</p>

            {/* Weight selector */}
            <div className="mb-6 sm:mb-8">
              <div className="text-[11px] tracking-[2px] uppercase text-warm-gray mb-3">Pack Size</div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {brandProducts.map((p) => (
                  <button key={p.slug}
                    onClick={() => p.slug !== product.slug && router.push(`/shop/${p.slug}`)}
                    className={`px-4 sm:px-5 py-2 text-[12px] sm:text-[13px] tracking-[1px] transition-colors duration-200 ${
                      p.slug === product.slug ? 'bg-charcoal text-white cursor-default' : 'border border-charcoal/15 text-charcoal hover:border-charcoal/40'
                    }`}>
                    {p.weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3 sm:gap-4 mb-4">
              {!isOutOfStock && (
                <div className="flex items-center border border-charcoal/15 shrink-0">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-bg-warm transition-colors"><Minus size={15} /></button>
                  <span className="w-10 sm:w-12 text-center text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-bg-warm transition-colors"><Plus size={15} /></button>
                </div>
              )}
              <button onClick={handleAddToCart} disabled={isOutOfStock}
                className={`flex-1 py-3.5 text-[12px] sm:text-[13px] tracking-[2px] uppercase font-medium transition-all duration-300 ${
                  isOutOfStock ? 'bg-charcoal/10 text-charcoal/30 cursor-not-allowed'
                  : addedToCart ? 'bg-green-600 text-white'
                  : 'bg-gold text-bg-dark hover:bg-gold-light'
                }`}>
                {isOutOfStock ? 'Out of Stock' : addedToCart ? 'Added to Bag ✓' : 'Add to Bag'}
              </button>
            </div>

            {isOutOfStock && (
              <p className="text-[12px] text-warm-gray font-light mb-6">
                This product is unavailable. Check back soon or{' '}
                <a href="https://wa.me/919079720031" className="text-gold hover:text-gold-light transition-colors">WhatsApp us</a> to be notified.
              </p>
            )}

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 sm:gap-6 pt-5 sm:pt-6 border-t border-charcoal/8">
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[1px] uppercase text-warm-gray"><ShieldCheck size={15} strokeWidth={1.5} /> FSSAI</div>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[1px] uppercase text-warm-gray"><MapPin size={15} strokeWidth={1.5} /> 100% Assam</div>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[1px] uppercase text-warm-gray"><FlaskRound size={15} strokeWidth={1.5} /> Lab Tested</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 sm:mt-20">
          <div className="flex border-b border-charcoal/10 overflow-x-auto scrollbar-hide gap-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`px-4 sm:px-6 py-4 text-[11px] sm:text-[12px] tracking-[2px] uppercase transition-all duration-300 border-b-2 whitespace-nowrap shrink-0 ${
                  activeTab === tab.key ? 'border-gold text-charcoal font-medium' : 'border-transparent text-warm-gray hover:text-charcoal'
                }`}>{tab.label}
              </button>
            ))}
          </div>
          <div className="py-8 sm:py-10 max-w-[700px]">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <p className="text-warm-gray text-[15px] leading-8 font-light">{product.longDescription}</p>
                <div className="pt-4 border-t border-charcoal/8">
                  <div className="text-[11px] tracking-[2px] uppercase text-charcoal font-medium mb-2">Ingredients</div>
                  <p className="text-warm-gray text-[15px] leading-7 font-light">{product.ingredients}</p>
                </div>
              </div>
            )}
            {activeTab === 'brewing' && (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8">
                  {brewSteps.map(({ Icon, value, label }, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-4 sm:p-5 border border-charcoal/8 hover:border-gold/30 transition-colors duration-300">
                      <div className="mb-3 sm:mb-4"><Icon /></div>
                      <div className="font-display text-base sm:text-lg text-charcoal mb-1">{value}</div>
                      <div className="text-[10px] sm:text-[11px] tracking-[1.5px] uppercase text-warm-gray">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-px flex-1 bg-gold/20" />
                  <div className="text-[9px] tracking-[3px] uppercase text-gold/60">Note</div>
                  <div className="h-px flex-1 bg-gold/20" />
                </div>
                <p className="text-warm-gray text-sm font-light leading-7">{product.brewingInstructions.note}</p>
              </div>
            )}
            {activeTab === 'nutrition' && (
              <div>
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.nutritionFacts).filter(([key]) => key !== 'note').map(([key, val]) => (
                      <tr key={key} className="border-b border-charcoal/5">
                        <td className="py-3 text-warm-gray capitalize font-light">{key.replace(/([A-Z])/g, ' $1')}</td>
                        <td className="py-3 text-charcoal font-medium text-right">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[12px] text-warm-gray font-light mt-4">{product.nutritionFacts.note}</p>
              </div>
            )}
            {activeTab === 'storage' && (
              <p className="text-warm-gray text-[15px] leading-8 font-light">
                <strong className="text-charcoal font-medium">Storage:</strong>{' '}{product.storageInstructions}
              </p>
            )}
          </div>
        </div>

        {otherBrandProducts.length > 0 && (
          <div className="mt-8 sm:mt-10">
            <h3 className="font-display text-xl sm:text-2xl text-charcoal mb-6 sm:mb-8">You May Also Like</h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {otherBrandProducts.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}