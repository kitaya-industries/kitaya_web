'use client';

import Link from 'next/link';
import { getProductsByBrand } from '@/data/products';
import { kitayaBrandFaqs } from '@/data/faqs';
import ProductCard from '@/components/ProductCard';
import FAQAccordion from '@/components/FAQAccordion';
import CertificationsStrip from '@/components/CertificationsStrip';
import BrewGuide from '@/components/BrewGuide';
import JsonLd, { faqSchema, breadcrumbSchema } from '@/components/JsonLd';
import { useState, useRef } from 'react';

export default function KitayaBrandPage() {
  const products = getProductsByBrand('kitaya');
  const [storyOpen, setStoryOpen] = useState(false);
  const extraRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleReadMore = () => {
    setStoryOpen(true);
    setTimeout(() => {
      extraRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleReadLess = () => {
    setStoryOpen(false);
    setTimeout(() => {
      btnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  return (
    <>
      <JsonLd data={faqSchema(kitayaBrandFaqs)} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: 'https://kitaya.in' },
        { name: 'Kitaya', url: 'https://kitaya.in/kitaya' },
      ])} />

      {/* ── Hero ── */}
      <section
        data-nav-theme="dark"
        className="min-h-[70vh] flex items-center relative overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/brands/kitaya-hero.png"
        >
          <source src="/videos/kitaya-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'rgba(26,26,24,0.55)' }} />
        <div className="absolute inset-0" style={{ background: 'rgba(198,40,40,0.25)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(26,26,24,0.6) 0%, rgba(26,26,24,0.2) 60%, transparent 100%)' }} />

        <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 lg:px-[60px] pt-32 pb-20">
          <div className="text-[12px] text-white/50 tracking-[1px] mb-10">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Kitaya</span>
          </div>
          <div className="max-w-[600px]">
            <div className="text-[11px] tracking-[4px] uppercase text-white/50 mb-4 font-light">
              Assam Black Tea · Direct from the Gardens · 100% Indian Origin
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[72px] font-medium text-white leading-[1.1] mb-4">
              Kitaya
            </h1>
            <p className="font-accent text-2xl text-gold italic mb-8">
              Bold Assam Tea for Kadak Chai
            </p>
            <p className="text-white/70 text-lg font-light leading-8 mb-10 max-w-[500px]">
              Made from 100% Assam black tea for those who love their chai strong, bold, and full of flavour. Deep colour, rich aroma, and a taste that makes every cup magical.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="btn-primary inline-block text-center">Shop Kitaya Tea</Link>
              <Link href="#kitaya-story" className="btn-secondary inline-block text-center">Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section id="kitaya-story" className="section-padding bg-bg">
        <div className="max-w-[800px] mx-auto">
          <div className="section-label">The Kitaya Story</div>
          <h2 className="section-title mb-8">Crafted for India's Kadak Chai Lovers</h2>
          <div className="space-y-5 text-warm-gray text-base font-light leading-8">
            <p>
              Kitaya was created for one purpose: to be the best everyday Assam black tea you can brew at home. Not a compromise, not an ordinary tea, but a genuinely premium blend that delivers rich colour, strong flavour, and an aroma that fills the room, all at a price that makes sense for daily use.
            </p>
            <p>
              Every batch of Kitaya is sourced directly from select gardens in upper Assam, where the tea plant thrives in rich alluvial soil, heavy rainfall, and warm humid conditions. These gardens produce tea with a distinctly bold and malty character that you simply cannot get from tea grown elsewhere. When you brew a cup of Kitaya, you are tasting the terroir of Assam in its purest form.
            </p>
            <p>
              Kitaya is a complete blend designed for the regular everyday tea drinker, crafted with passion, handled with strict hygiene at every step, and blended to deliver a consistent, satisfying cup every single time. Whether it is your first cup in the morning or your fifth of the day, Kitaya is made to be that reliable companion.
            </p>
            {storyOpen && (
              <div ref={extraRef} className="space-y-5">
                <p>
                  Quality is not a buzzword for us, it is a process. Every batch is tested in our NABL accredited laboratory for moisture content, granule consistency, cup quality, and food safety parameters. Our master tea tasters then evaluate the batch for aroma, colour, strength, and overall taste. Only when a batch passes both the lab test and the taster's approval does it get packed as Kitaya.
                </p>
                <p>
                  This dual quality check, typically reserved for export-grade Assam tea, is what makes Kitaya consistently good, cup after cup, pack after pack. It is the Kitaya promise.
                </p>
              </div>
            )}
            <button
              ref={btnRef}
              onClick={storyOpen ? handleReadLess : handleReadMore}
              className="inline-flex items-center gap-2 text-gold text-[13px] tracking-[2px] uppercase font-body transition-all duration-300 hover:text-gold-light"
            >
              {storyOpen ? <>Read Less <span className="inline-block rotate-180">↓</span></> : <>Read More <span>↓</span></>}
            </button>
          </div>
        </div>
      </section>

      {/* ── What Makes Kitaya Special ── */}
      <section className="section-padding bg-bg-warm">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="section-label">Why Choose Kitaya</div>
            <h2 className="section-title">What Makes Kitaya Special</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', title: '100% Assam Origin', desc: 'Sourced directly from select tea gardens in upper Assam. No blending with teas from other regions. Genuine Assam black tea character in every cup.' },
              { num: '02', title: 'Perfect for Kadak Chai', desc: 'A deep colour and strong flavour that cuts through milk beautifully. Makes the perfect kadak chai, masala chai, or cutting chai every single time.' },
              { num: '03', title: 'NABL Lab Tested', desc: 'Every batch tested in our NABL accredited laboratory and approved by master tea tasters. FSSAI licensed. Quality you can trust in every cup.' },
              { num: '04', title: 'Honest Everyday Price', desc: 'Genuine Assam tea at an honest price, designed to be your everyday kadak chai companion without compromise on quality or origin.' },
            ].map((item) => (
              <div key={item.num} className="bg-white p-8">
                <div className="font-display text-2xl text-kitaya-red/30 mb-4">{item.num}</div>
                <h3 className="font-display text-lg text-charcoal mb-3">{item.title}</h3>
                <p className="text-warm-gray text-sm font-light leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brew Guide ── */}
      <BrewGuide />

      {/* ── Products ── */}
      <section className="pt-20 pb-0 px-6 lg:px-[60px] bg-bg-warm">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="section-label">Shop Kitaya</div>
            <h2 className="section-title">Choose Your Pack</h2>
            <p className="text-warm-gray text-base font-light max-w-[520px] mx-auto mt-4 leading-7">
              Available in 250g, 1 Kg, and value Twin Packs — pick the size that suits your daily chai habit.
            </p>
          </div>
          {/* 4 products: 2 cols on mobile, 4 cols on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} size="large" />
            ))}
          </div>
        </div>
      </section>

      <CertificationsStrip />

      {/* ── SEO Content ── */}
      <section className="section-padding bg-bg">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-normal text-charcoal mb-6">
            Kitaya — Buy Assam Black Tea Online in India
          </h2>
          <div className="space-y-5 text-warm-gray text-[15px] leading-8 font-light">
            <p>
              Kitaya is one of India's emerging tea brands built entirely around a single origin: Assam. Our Assam black tea is sourced 100% directly from select tea gardens in upper Assam and tested in our NABL accredited lab before every pack is sealed. Whether you want a strong cup of kadak chai in the morning, a spiced masala chai with ginger and cardamom, or a simple everyday black tea that always delivers, Kitaya is made for you.
            </p>
            <p>
              Among Indian tea brands, Kitaya stands apart by doing one thing and doing it exceptionally well. Unlike brands that blend teas from multiple regions, every gram of Kitaya is pure Assam black tea. The result is the bold, malty, full-bodied character that Assam is world-famous for, in every single pack. Buy Assam black tea online at kitaya.in and experience the difference that direct sourcing makes.
            </p>
            <p>
              Kitaya is available in 250g for daily use, 1 Kg for families, and value Twin Packs (2 x 250g and 2 x 1 Kg) for those who want to stock up and save. FSSAI licensed, NABL lab tested, and approved by master tea tasters — export-grade quality assurance in every retail pack.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/shop" className="btn-primary inline-block">Buy Kitaya Tea Online</Link>
            <Link href="/buy-assam-tea-online" className="text-gold text-[13px] tracking-[2px] uppercase self-center hover:text-gold-light transition-colors">Explore All Teas</Link>
          </div>
        </div>
      </section>

      {/* ── Internal Links ── */}
      <section className="py-12 px-6 lg:px-[60px] bg-bg-warm">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/teagate" className="text-sm text-warm-gray border border-charcoal/10 px-5 py-2.5 hover:border-gold hover:text-gold transition-colors">TeaGate Premium Tea</Link>
            <Link href="/buy-assam-tea-online" className="text-sm text-warm-gray border border-charcoal/10 px-5 py-2.5 hover:border-gold hover:text-gold transition-colors">Buy Assam Tea Online</Link>
            <Link href="/blog/what-is-ctc-tea-complete-guide" className="text-sm text-warm-gray border border-charcoal/10 px-5 py-2.5 hover:border-gold hover:text-gold transition-colors">What Is CTC Tea?</Link>
            <Link href="/blog/how-to-make-perfect-indian-chai" className="text-sm text-warm-gray border border-charcoal/10 px-5 py-2.5 hover:border-gold hover:text-gold transition-colors">How to Make Perfect Chai</Link>
          </div>
        </div>
      </section>

      <FAQAccordion
        faqs={kitayaBrandFaqs}
        sectionLabel="Kitaya Assam Black Tea"
        sectionTitle="Frequently Asked Questions About Kitaya Tea"
      />
    </>
  );
}