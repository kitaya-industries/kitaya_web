'use client';

import Link from 'next/link';
import { getProductsByBrand } from '@/data/products';
import { teagateBrandFaqs } from '@/data/faqs';
import ProductCard from '@/components/ProductCard';
import FAQAccordion from '@/components/FAQAccordion';
import CertificationsStrip from '@/components/CertificationsStrip';
import BrewGuide from '@/components/BrewGuide';
import JsonLd, { faqSchema, breadcrumbSchema } from '@/components/JsonLd';
import { useState, useRef } from 'react';

export default function TeaGateBrandPage() {
  const products = getProductsByBrand('teagate');
  const [storyOpen, setStoryOpen] = useState(false);
  const extraRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleReadMore = () => {
    setStoryOpen(true);
    setTimeout(() => { extraRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
  };

  const handleReadLess = () => {
    setStoryOpen(false);
    setTimeout(() => { btnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50);
  };

  return (
    <>
      <JsonLd data={faqSchema(teagateBrandFaqs)} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: 'https://kitaya.in' },
        { name: 'TeaGate', url: 'https://kitaya.in/teagate' },
      ])} />

      {/* Hero */}
      <section data-nav-theme="dark" className="min-h-[70vh] flex items-center relative overflow-hidden" style={{ zIndex: 0 }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" poster="/images/brands/teagate-hero.png">
          <source src="/videos/teagate-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'rgba(26,26,24,0.55)' }} />
        <div className="absolute inset-0" style={{ background: 'rgba(26,37,126,0.28)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(26,26,24,0.65) 0%, rgba(26,26,24,0.2) 60%, transparent 100%)' }} />
        <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 lg:px-[60px] pt-32 pb-20">
          <div className="text-[12px] text-white/50 tracking-[1px] mb-10">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">TeaGate</span>
          </div>
          <div className="max-w-[600px]">
            <div className="text-[11px] tracking-[4px] uppercase text-white/50 mb-4 font-light">Premium Assam Black Tea · Handpicked Quality · 100% Indian Origin</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[72px] font-medium text-white leading-[1.1] mb-4">TeaGate</h1>
            <p className="font-accent text-2xl text-gold italic mb-8">Premium Assam Black Tea, Handpicked</p>
            <p className="text-white/70 text-lg font-light leading-8 mb-10 max-w-[500px]">
              Handpicked from the finest Assam tea gardens for those who appreciate high quality black tea. Rich colour, robust flavour, and a refined taste that puts TeaGate among the best premium tea brands in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="btn-primary inline-block text-center">Shop TeaGate Tea</Link>
              <Link href="#teagate-story" className="btn-secondary inline-block text-center">The Premium Difference</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="teagate-story" className="section-padding bg-bg">
        <div className="max-w-[800px] mx-auto">
          <div className="section-label">The TeaGate Story</div>
          <h2 className="section-title mb-8">Premium Assam Black Tea for the Discerning Tea Lover</h2>
          <div className="space-y-5 text-warm-gray text-base font-light leading-8">
            <p>India has a rich tea heritage, but finding genuinely premium Assam tea at an accessible price has always been a challenge. Most mass-market tea brands blend Assam tea with inferior teas from other regions to keep costs low, which dilutes the bold, malty character that makes Assam black tea the finest Indian tea variety. TeaGate was created to solve this problem: to offer 100% pure Assam black tea with a premium taste profile at a price that does not require a luxury budget.</p>
            <p>The name TeaGate represents a gateway to a superior tea experience. Every leaf that goes into a TeaGate pack is carefully selected from premium Assam tea gardens known for producing teas with exceptional colour, aroma, and strength. These are not randomly sourced leaves. They come from gardens that have earned a reputation for consistent excellence, located in the prime tea-growing belt of upper Assam where the terroir produces the most flavourful black tea in the world.</p>
            <p>What separates premium Assam black tea from regular tea is a combination of origin, selection, and processing. TeaGate teas come from gardens where the Camellia sinensis var. assamica plant benefits from Assam's unique climate: warm temperatures, heavy monsoon rainfall, and rich alluvial soil. The result is a distinctly malty, brisk character with notes of caramel and earthiness that orthodox and premium black tea lovers genuinely appreciate.</p>
            {storyOpen && (
              <div ref={extraRef} className="space-y-5">
                <p>Every batch of TeaGate undergoes a dual quality check that is rare in the Indian retail tea market. First, our NABL accredited laboratory tests the tea for technical parameters including moisture content, dust percentage, and food safety compliance. Then our master tea tasters evaluate the batch for cup quality: the colour of the liquor, the aroma, the strength, the body, and the overall flavour profile.</p>
                <p>Only batches that pass both the lab test and the taster's evaluation earn the TeaGate name. This is the kind of quality assurance typically reserved for export-grade Indian tea, and it is what makes TeaGate one of the best premium tea brands in India for quality-conscious buyers.</p>
              </div>
            )}
            <button ref={btnRef} onClick={storyOpen ? handleReadLess : handleReadMore}
              className="inline-flex items-center gap-2 text-gold text-[13px] tracking-[2px] uppercase font-body transition-all duration-300 hover:text-gold-light">
              {storyOpen ? <>Read Less <span className="inline-block rotate-180">↓</span></> : <>Read More <span>↓</span></>}
            </button>
          </div>
        </div>
      </section>

      {/* What Makes TeaGate Premium */}
      <section className="section-padding bg-bg-warm">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="section-label">Why TeaGate</div>
            <h2 className="section-title">The Premium Quality Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Handpicked from Select Gardens', desc: 'Not all Assam tea is equal. TeaGate is sourced only from premium gardens in upper Assam known for producing high quality black tea with superior colour, aroma, and taste.' },
              { num: '02', title: 'Rich Assam Black Tea Flavour', desc: 'A deeper colour, a more complex malty flavour profile, and an aroma that lingers. TeaGate delivers the full potential of premium Assam black tea in every cup.' },
              { num: '03', title: 'Dual Quality Assurance', desc: 'NABL accredited lab testing for technical parameters, followed by master tea taster evaluation for cup quality. Export-grade quality control for every retail batch.' },
              { num: '04', title: 'Premium Yet Accessible', desc: 'Genuinely premium Assam black tea quality that competes with brands charging two to three times more. The best Indian tea experience without the luxury price tag.' },
            ].map((item) => (
              <div key={item.num} className="bg-white p-8">
                <div className="font-display text-2xl text-teagate-blue/30 mb-4">{item.num}</div>
                <h3 className="font-display text-lg text-charcoal mb-3">{item.title}</h3>
                <p className="text-warm-gray text-sm font-light leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BrewGuide />

      {/* Two Ways to Enjoy */}
      <section className="section-padding bg-bg-warm">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-12">
            <div className="section-label">Serving Suggestions</div>
            <h2 className="section-title">Two Ways to Enjoy TeaGate</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bg p-8 border-t-2 border-gold">
              <h3 className="font-display text-lg text-charcoal mb-3">As Premium Black Tea</h3>
              <p className="text-warm-gray text-sm font-light leading-7">Skip the milk. Brew TeaGate in hot water for 3 to 4 minutes and enjoy with a touch of honey. This lets you taste the full malty, brisk character of premium Assam black tea.</p>
            </div>
            <div className="bg-bg p-8 border-t-2 border-gold">
              <h3 className="font-display text-lg text-charcoal mb-3">As Rich Chai</h3>
              <p className="text-warm-gray text-sm font-light leading-7">Add milk and sugar as per your preference. TeaGate's strength ensures a deep colour and robust flavour even with full-fat milk. Perfect for those who want premium quality in their daily chai.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products — 4 packs */}
      <section className="pt-20 pb-0 px-6 lg:px-[60px] bg-bg">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="section-label">Shop TeaGate</div>
            <h2 className="section-title">Choose Your Pack</h2>
            <p className="text-warm-gray text-base font-light max-w-[520px] mx-auto mt-4 leading-7">
              Available in 250g, 1 Kg, and value Twin Packs — the finest Assam tea in the size that suits you.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} size="large" />
            ))}
          </div>
        </div>
      </section>

      <CertificationsStrip />

      {/* SEO */}
      <section className="section-padding bg-bg">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-normal text-charcoal mb-6">TeaGate — Buy Premium Assam Black Tea Online in India</h2>
          <div className="space-y-5 text-warm-gray text-[15px] leading-8 font-light">
            <p>TeaGate is a premium Assam black tea brand from Kitaya Industries, built for the discerning Indian tea drinker who wants something genuinely better than mass-market brands. With 100% Assam origin, NABL lab testing, and master tea taster approval on every batch, TeaGate delivers the kind of quality that has traditionally been available only in export-grade or specialty tea at significantly higher prices.</p>
            <p>For those searching for the best black tea in India, the best Assam tea brand, or a high quality premium tea that delivers genuine flavour and character, TeaGate is worth experiencing. The bold, malty, full-bodied character of handpicked Assam black tea, tested and approved before every pack is sealed. Order TeaGate premium Assam tea online at kitaya.in.</p>
            <p>TeaGate is available in 250g, 1 Kg, and value Twin Packs (2 x 250g and 2 x 1 Kg). FSSAI licensed and NABL accredited — one of the few Indian tea brands that applies export-grade quality assurance to every retail pack.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/shop" className="btn-primary inline-block">Buy TeaGate Tea Online</Link>
            <Link href="/buy-assam-tea-online" className="text-gold text-[13px] tracking-[2px] uppercase self-center hover:text-gold-light transition-colors">Explore All Teas</Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 px-6 lg:px-[60px] bg-bg-warm">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kitaya" className="text-sm text-warm-gray border border-charcoal/10 px-5 py-2.5 hover:border-gold hover:text-gold transition-colors">Kitaya Everyday Tea</Link>
            <Link href="/buy-assam-tea-online" className="text-sm text-warm-gray border border-charcoal/10 px-5 py-2.5 hover:border-gold hover:text-gold transition-colors">Buy Assam Tea Online</Link>
            <Link href="/blog/health-benefits-of-assam-black-tea" className="text-sm text-warm-gray border border-charcoal/10 px-5 py-2.5 hover:border-gold hover:text-gold transition-colors">Health Benefits of Black Tea</Link>
            <Link href="/about" className="text-sm text-warm-gray border border-charcoal/10 px-5 py-2.5 hover:border-gold hover:text-gold transition-colors">Our Quality Process</Link>
          </div>
        </div>
      </section>

      <FAQAccordion faqs={teagateBrandFaqs} sectionLabel="TeaGate Premium Assam Black Tea" sectionTitle="Frequently Asked Questions About TeaGate" />
    </>
  );
}