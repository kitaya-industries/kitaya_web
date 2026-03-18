'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getAllActiveProducts } from '@/data/products';
import { shopFaqs } from '@/data/faqs';
import ProductCard from '@/components/ProductCard';
import FAQAccordion from '@/components/FAQAccordion';

type FilterType = 'all' | 'kitaya' | 'teagate';

export default function ShopPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const allProducts = getAllActiveProducts();

  const filtered =
    filter === 'all'
      ? allProducts
      : allProducts.filter((p) => p.brand === filter);

  const filters: { label: string; value: FilterType; count: number }[] = [
    { label: 'All', value: 'all', count: allProducts.length },
    { label: 'Kitaya', value: 'kitaya', count: allProducts.filter((p) => p.brand === 'kitaya').length },
    { label: 'TeaGate', value: 'teagate', count: allProducts.filter((p) => p.brand === 'teagate').length },
  ];

  return (
    <>
      <section className="pt-32 pb-20 px-6 lg:px-[60px] bg-bg min-h-screen">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <div className="text-[12px] text-warm-gray tracking-[1px] mb-10">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">Shop</span>
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <div className="section-label">Our Collection</div>
            <h1 className="section-title">Shop All Teas</h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-2 mb-14">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-6 py-2.5 text-[12px] tracking-[2px] uppercase font-body transition-all duration-300 ${
                  filter === f.value
                    ? 'bg-charcoal text-white'
                    : 'bg-transparent text-warm-gray border border-charcoal/10 hover:border-charcoal/30'
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} size="large" />
            ))}
          </div>

          {/* Bulk Orders Banner */}
          <div className="mt-16 bg-bg-dark p-10 md:p-14 text-center">
            <h3 className="font-display text-2xl text-bg-warm mb-3">Looking for Bulk Orders?</h3>
            <p className="text-warm-gray text-sm font-light mb-6">
              We offer wholesale pricing, private labeling, and export services for businesses.
            </p>
            <Link href="/export" className="btn-primary inline-block">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion faqs={shopFaqs} sectionLabel="Shopping Help" sectionTitle="Common Questions" />
    </>
  );
}
