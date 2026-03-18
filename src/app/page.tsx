import Link from 'next/link';
import { getAllActiveProducts } from '@/data/products';
import { homepageFaqs } from '@/data/faqs';
import BrandCard from '@/components/BrandCard';
import ProductCard from '@/components/ProductCard';
import CertificationsStrip from '@/components/CertificationsStrip';
import FAQAccordion from '@/components/FAQAccordion';
import HeroSection from '@/components/HeroSection';
import StorySection from '@/components/StorySection';
import ExportCTA from '@/components/ExportCTA';
import JsonLd, { faqSchema } from '@/components/JsonLd';

export default function HomePage() {
  const products = getAllActiveProducts();

  return (
    <>
      <JsonLd data={faqSchema(homepageFaqs)} />
      {/* Hero */}
      <HeroSection />

      {/* Brand Cards */}
      <section className="section-padding bg-bg">
        <div className="text-center mb-16 md:mb-20">
          <div className="section-label">Our Brands</div>
          <h2 className="section-title">Two Worlds of Tea</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-[1200px] mx-auto">
          <BrandCard
            brand="kitaya"
            tag="Everyday Excellence"
            name="Kitaya"
            description="Bold Assam CTC tea for the perfect daily chai. Rich colour, strong flavour, magical in every cup."
            href="/kitaya"
          />
          <BrandCard
            brand="teagate"
            tag="Premium Collection"
            name="TeaGate"
            description="Handpicked from select Assam tea gardens. A premium experience for the discerning tea lover."
            href="/teagate"
          />
        </div>
      </section>

         
      {/* Products Grid */}
      <section className="section-padding bg-bg-warm">
        <div className="text-center mb-16 md:mb-20">
          <div className="section-label">Our Collection</div>
          <h2 className="section-title">Shop All Teas</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-[1200px] mx-auto">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

   {/* Our Story */}
      <StorySection />


      {/* Export CTA */}
      <ExportCTA />

      {/* Certifications */}
      <CertificationsStrip />

      {/* FAQ */}
      <FAQAccordion
        faqs={homepageFaqs}
        sectionLabel="Common Questions"
        sectionTitle="Frequently Asked Questions"
      />
    </>
  );
}