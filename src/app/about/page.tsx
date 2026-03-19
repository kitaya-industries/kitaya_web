import { createMeta } from '@/data/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { aboutFaqs } from '@/data/faqs';
import FAQAccordion from '@/components/FAQAccordion';
import CertificationsStrip from '@/components/CertificationsStrip';
import JsonLd, { faqSchema, breadcrumbSchema } from '@/components/JsonLd';

export const metadata: Metadata = createMeta(
  'About Kitaya Industries - Assam Tea Manufacturer & Indian Tea Brand | Our Story',
  'Kitaya Industries is an Assam tea manufacturer and one of the emerging tea brands in India. We source premium CTC and black tea directly from Assam tea gardens. FSSAI licensed, NABL lab tested. Two brands - Kitaya and TeaGate.',
  '/about'
);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={faqSchema(aboutFaqs)} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: 'https://kitaya.in' },
        { name: 'About', url: 'https://kitaya.in/about' },
      ])} />

      {/* ── HERO — video background ── */}
      {/*
        VIDEO SETUP:
        Place your video at /public/videos/assam-garden.mp4
        Place a poster (first frame screenshot) at /public/images/about/hero-poster.jpg

        FREE 4K SOURCES:
        • Pexels: https://www.pexels.com/search/videos/tea%20garden/
          Search "tea garden" or "assam tea" · filter Free + 4K · no attribution needed
        • Pixabay: https://pixabay.com/videos/search/tea%20plantation/
        • Coverr: https://coverr.co — search "tea"
        • AI (free): https://runwayml.com or https://www.luma.ai
          Prompt: "Aerial drone shot over lush green Assam tea garden rows,
          misty morning light, workers plucking tea leaves, cinematic 4K"
      */}
      <section
        data-nav-theme="dark"
        className="relative min-h-[90vh] flex items-center bg-bg-dark"
        style={{ zIndex: 0 }}
      >
        {/* Video — sits at absolute bottom of stack */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/about/hero-poster.jpg"
        >
          <source src="/images/brands/about-video.mp4" type="video/mp4" />
        </video>

        {/*
          Single solid dark overlay — simpler and more reliable than stacking
          multiple gradients. bg-bg-dark is #1A1A18. At /75 opacity this
          heavily darkens the video while keeping it visible behind the text.
          Using inline style with rgba so it never depends on Tailwind opacity
          utilities which can sometimes compile unexpectedly.
        */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(26,26,24,0.82)' }}
        />

        {/* Page content — all white/light text */}
        <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 lg:px-[60px] pt-36 pb-28">
          {/* Breadcrumb */}
          <div className="text-[12px] tracking-[1px] mb-10" style={{ color: 'rgba(155,151,143,0.8)' }}>
            <Link href="/" className="hover:text-gold transition-colors" style={{ color: 'rgba(155,151,143,0.8)' }}>
              Home
            </Link>
            <span className="mx-2" style={{ color: 'rgba(155,151,143,0.3)' }}>/</span>
            <span style={{ color: '#F5F3EE' }}>Our Story</span>
          </div>

          <div className="max-w-[680px]">
            {/* Tag pill */}
            <div
              className="inline-block text-[11px] tracking-[4px] uppercase px-7 py-2.5 mb-8 font-light"
              style={{
                border: '1px solid rgba(197,165,90,0.35)',
                color: '#D4BC7C',
              }}
            >
              Assam Tea Manufacturer & Exporter
            </div>

            {/* Headline — force white, never inherit body text-charcoal */}
            <h1
              className="font-display text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.12] mb-6"
              style={{ color: '#F5F3EE' }}
            >
              From the Gardens of Assam,
              <br />
              <em style={{ color: '#C5A55A' }}>to Your Cup.</em>
            </h1>

            {/* Body — force light gray, never inherit body text */}
            <p
              className="text-lg font-light leading-8 max-w-[540px]"
              style={{ color: 'rgba(155,151,143,0.9)' }}
            >
              Kitaya Industries Private Limited is an Indian tea company dedicated
              to bringing premium Assam CTC tea and black tea to homes across India
              and the world. Direct from Assam tea gardens, tested in our NABL lab,
              approved by master tea tasters.
            </p>
          </div>
        </div>
      </section>

      {/* ── OUR JOURNEY ── */}
<section className="section-padding bg-bg relative">
  <div
    className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
    style={{ background: 'linear-gradient(to bottom, #FAFAF7, transparent)' }}
  />
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">


          <div className="relative pb-6 pr-6">
            {/* Decorative offset border behind image */}
            <div
              className="absolute top-4 left-4 right-0 bottom-0 pointer-events-none"
              style={{ border: '1px solid rgba(197,165,90,0.2)' }}
            />

            {/* Image — overflow-hidden clips image, NOT the badge */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/brands/journey-product.png"
                alt="Kitaya and TeaGate premium Assam tea products"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Bottom blend */}
              {/* <div
                className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(250,250,247,0.5), transparent)' }}
              /> */}
            </div>

            {/* 100% Assam badge — overflows bottom-right corner of image */}
            <div
              className="absolute bottom-0 right-0 z-20 w-[112px] h-[112px] md:w-[128px] md:h-[128px] flex flex-col items-center justify-center"
              style={{
                background: '#C5A55A',
                boxShadow: '0 8px 32px rgba(197,165,90,0.45)',
              }}
            >
              <div
                className="font-display font-semibold leading-none"
                style={{ fontSize: '32px', color: '#ffffff' }}
              >
                100%
              </div>
              <div
                className="uppercase text-center mt-1.5 px-2"
                style={{ fontSize: '8px', letterSpacing: '2px', color: 'rgba(255,255,255,0.88)' }}
              >
                Assam Tea
              </div>
            </div>
          </div>

          {/* Right — journey copy */}
          <div>
            <div className="section-label">Our Journey</div>
            <h2 className="font-display text-3xl md:text-[40px] font-normal leading-tight mb-8 text-charcoal">
              An Indian Tea Brand Built on
              <br />
              <em className="text-gold">Authentic Assam Quality</em>
            </h2>
            <p className="text-base text-warm-gray leading-8 font-light mb-5">
              Kitaya Industries was founded with a clear mission: to become one of
              the most trusted tea brands in India by focusing entirely on Assam
              tea and doing it exceptionally well. Based in Alwar, Rajasthan, we
              source our tea directly from select gardens in upper Assam,
              India&apos;s largest and most celebrated tea-producing region known
              worldwide for bold, malty, and full-bodied black teas.
            </p>
            <p className="text-base text-warm-gray leading-8 font-light mb-5">
              Assam produces over 50% of India&apos;s tea and is the world&apos;s
              largest CTC tea producing region. The rich alluvial soil of the
              Brahmaputra valley, warm tropical climate, and heavy monsoon rainfall
              create ideal conditions for growing the tea plant variety that
              produces the strongest and most flavourful black tea in the world.
            </p>
            <p className="text-base text-warm-gray leading-8 font-light">
              What sets Kitaya Industries apart is our quality process. Every batch
              is tested in our NABL accredited laboratory, then evaluated by our
              master tea tasters for colour, aroma, strength, body, and taste. This
              dual quality assurance, typically reserved for export-grade Indian
              tea, is applied to every retail pack we sell.
            </p>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="section-padding bg-bg-warm">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="section-label">What We Stand For</div>
            <h2 className="section-title">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative p-10 bg-bg hover:shadow-[0_4px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300">
              <div className="absolute top-0 left-10 w-8 h-[2px] bg-gold" />
              <div className="font-display text-5xl font-normal mb-6 transition-colors duration-300"
                style={{ color: 'rgba(197,165,90,0.18)' }}>
                01
              </div>
              <h3 className="font-display text-xl text-charcoal mb-4">Hygiene First</h3>
              <p className="text-warm-gray text-sm font-light leading-7">
                Every step of our sourcing, processing, and packaging follows strict
                hygiene standards. Our FSSAI licensed facility undergoes regular
                audits to ensure the tea that reaches you is clean, safe, and free
                from any contamination.
              </p>
            </div>

            <div className="group relative p-10 bg-bg hover:shadow-[0_4px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300">
              <div className="absolute top-0 left-10 w-8 h-[2px] bg-gold" />
              <div className="font-display text-5xl font-normal mb-6 transition-colors duration-300"
                style={{ color: 'rgba(197,165,90,0.18)' }}>
                02
              </div>
              <h3 className="font-display text-xl text-charcoal mb-4">100% Direct from Assam</h3>
              <p className="text-warm-gray text-sm font-light leading-7">
                We source exclusively and directly from trusted tea gardens in upper
                Assam, with no middlemen and no blending with teas from other regions.
                Every gram of Kitaya and TeaGate tea is 100% Assam origin.
              </p>
            </div>

            <div className="group relative p-10 bg-bg hover:shadow-[0_4px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300">
              <div className="absolute top-0 left-10 w-8 h-[2px] bg-gold" />
              <div className="font-display text-5xl font-normal mb-6 transition-colors duration-300"
                style={{ color: 'rgba(197,165,90,0.18)' }}>
                03
              </div>
              <h3 className="font-display text-xl text-charcoal mb-4">Optimum Quality, Always</h3>
              <p className="text-warm-gray text-sm font-light leading-7">
                Every batch passes a dual check: NABL accredited lab testing for
                food safety parameters, then master tea taster evaluation for aroma,
                colour, strength, and flavour. Only approved batches are packed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TWO BRANDS ── */}
      <section className="section-padding bg-bg">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="section-label">Our Tea Brands</div>
            <h2 className="section-title">Two Brands, One Commitment to Quality</h2>
            <p className="text-warm-gray text-base font-light max-w-[600px] mx-auto mt-4 leading-7">
              We created two distinct brands to serve different tea preferences,
              whether you are a daily kadak chai lover or a premium tea connoisseur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-kitaya-red to-kitaya-red-dark p-10 md:p-14 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 30px, white 30px, white 31px)' }} />
              <div className="absolute top-5 left-5 right-5 bottom-5 border border-gold/25 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-[11px] tracking-[3px] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>Bold Assam CTC Tea</div>
                <div className="font-display text-4xl text-white font-medium mb-4">Kitaya</div>
                <div className="font-accent text-lg italic mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>Magical Taste - Kadak Chai</div>
                <p className="text-[15px] leading-7 font-light mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Bold Assam CTC tea for those who love a strong cup of chai. Deep rich
                  colour, robust flavour, and an unmistakable aroma. Available in 250g and 1 Kg packs.
                </p>
                <Link href="/kitaya" className="inline-flex items-center gap-2.5 text-gold text-[13px] tracking-[2px] uppercase transition-all duration-300 hover:gap-4">
                  Explore Kitaya <span>→</span>
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teagate-blue to-teagate-blue-mid p-10 md:p-14 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 30px, white 30px, white 31px)' }} />
              <div className="absolute top-5 left-5 right-5 bottom-5 border border-gold/25 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-[11px] tracking-[3px] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>Premium Assam Black Tea</div>
                <div className="font-display text-4xl text-white font-medium mb-4">TeaGate</div>
                <div className="font-accent text-lg italic mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>Premium Selection</div>
                <p className="text-[15px] leading-7 font-light mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Handpicked from select Assam gardens for the discerning tea lover. A
                  refined experience honouring the finest Assam has to offer. Available in 250g and 1 Kg packs.
                </p>
                <Link href="/teagate" className="inline-flex items-center gap-2.5 text-gold text-[13px] tracking-[2px] uppercase transition-all duration-300 hover:gap-4">
                  Explore TeaGate <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY WE ARE DIFFERENT ── */}
      <section className="section-padding bg-bg-warm">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="section-label">Our Standards</div>
            <h2 className="section-title">Why We Are Different</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { n: '01', title: 'Direct Sourcing from Assam', body: 'We source Assam CTC and black tea directly from trusted tea gardens in upper Assam, cutting out middlemen. Direct relationships with growers ensure freshness, fair pricing, and consistent supply.' },
              { n: '02', title: 'NABL Accredited Lab Testing', body: 'Every batch is tested in our NABL accredited laboratory for moisture content, dust levels, cup quality, and FSSAI food safety compliance. Standard for exporters but rare among domestic brands.' },
              { n: '03', title: 'Master Tea Taster Approval', body: 'Our master tea tasters evaluate every batch for aroma, colour, strength, body, and flavour. Only batches that meet our exacting standards are approved for Kitaya and TeaGate packaging.' },
            ].map(({ n, title, body }) => (
              <div key={n} className="text-center">
                <div className="w-[70px] h-[70px] mx-auto mb-5 border border-gold/20 flex items-center justify-center bg-bg">
                  <span className="font-display text-2xl text-gold">{n}</span>
                </div>
                <h3 className="font-display text-lg text-charcoal mb-3">{title}</h3>
                <p className="text-warm-gray text-sm font-light leading-7">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANY DETAILS ── */}
      <section className="section-padding bg-bg-dark">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="section-label !text-gold-dark">Company Details</div>
          <h2 className="section-title !text-bg-warm mb-10">Kitaya Industries Private Limited</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              { label: 'Registered Office', content: '1, Old Industrial Area\nAlwar - 301001\nRajasthan, India' },
              { label: 'Contact', content: 'Phone: +91 9079720031\nEmail: kitayaind@gmail.com\nWebsite: www.kitaya.in' },
              { label: 'Registration', content: 'CIN: U10791RJ2025PTC103405\nGST: 08AALCK9243K1ZX\nFSSAI: 12225010000228' },
              { label: 'Certifications', content: 'FSSAI Licensed\nNABL Lab Accredited\nGST Registered\n100% Assam Origin' },
            ].map(({ label, content }) => (
              <div key={label} className="border border-white/[0.06] p-8">
                <div className="text-[11px] tracking-[3px] uppercase text-gold font-medium mb-4">{label}</div>
                <p className="text-warm-gray text-sm font-light leading-7 whitespace-pre-line">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CertificationsStrip />

      {/* ── SEO CONTENT ── */}
      <section className="section-padding bg-bg">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-normal text-charcoal mb-6">
            Kitaya Industries - An Emerging Tea Brand in India
          </h2>
          <div className="space-y-5 text-warm-gray text-[15px] leading-8 font-light">
            <p>
              Kitaya Industries Private Limited is a registered Indian tea company based in Alwar,
              Rajasthan, operating as a tea manufacturer, tea supplier, and tea exporter. We specialize
              exclusively in Assam tea, sourcing premium CTC and black tea directly from tea gardens in
              Assam, India&apos;s largest tea producing region.
            </p>
            <p>
              In a market where many Indian tea brands blend teas from multiple regions to reduce costs,
              Kitaya Industries takes a different approach. We use only Assam-origin tea across both
              brands, ensuring customers get the authentic bold, malty, full-bodied character that makes
              Assam tea the most popular tea variety in India.
            </p>
            <p>
              Beyond retail, we serve businesses through wholesale tea supply, private label tea
              packaging, domestic distribution partnerships, and international export. Whether you are
              a consumer, distributor, or international buyer, Kitaya Industries has a solution for you.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-bg-warm text-center">
        <div className="max-w-[560px] mx-auto">
          <h2 className="font-display text-3xl md:text-[36px] font-normal text-charcoal leading-tight mb-6">
            Ready to Taste the Difference?
          </h2>
          <p className="text-warm-gray text-base font-light leading-7 mb-10">
            Explore our collection of premium Assam tea and find your perfect cup.
            Buy Assam tea online at kitaya.in with delivery across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary text-center">Shop Our Teas</Link>
            <Link href="/export" className="btn-dark text-center">Export & Bulk Orders</Link>
          </div>
        </div>
      </section>

      <FAQAccordion
        faqs={aboutFaqs}
        sectionLabel="About Kitaya Industries"
        sectionTitle="Frequently Asked Questions"
      />
    </>
  );
}