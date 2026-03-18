import Link from 'next/link';
import { masterFaqCategories } from '@/data/faqs';
import { createMeta } from '@/data/seo';
import JsonLd, { faqSchema, breadcrumbSchema } from '@/components/JsonLd';
import type { Metadata } from 'next';
import FAQPageClient from './FAQPageClient';

const allFaqs = masterFaqCategories.flatMap((cat) => cat.faqs);

export const metadata: Metadata = createMeta(
  'Frequently Asked Questions - Assam Tea, CTC Tea, Orders, Export | Kitaya Industries',
  'Find answers about Assam CTC tea, premium black tea, Kitaya and TeaGate brands, online ordering, shipping across India, FSSAI certifications, bulk orders, private label tea, and export from Kitaya Industries.',
  '/faq'
);

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema(allFaqs)} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: 'https://kitaya.in' },
        { name: 'FAQ', url: 'https://kitaya.in/faq' },
      ])} />

      <FAQPageClient categories={masterFaqCategories} />

      {/* SEO Content - server rendered */}
      <section className="section-padding bg-bg">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-normal text-charcoal mb-6">
            About Kitaya Industries Assam Tea
          </h2>
          <div className="space-y-5 text-warm-gray text-[15px] leading-8 font-light">
            <p>
              Kitaya Industries Private Limited is a tea manufacturer and exporter based in Alwar, Rajasthan, India. We source, process, and sell premium Assam CTC tea and Assam black tea under two brands. Kitaya is our bold everyday CTC tea for daily chai lovers, available from Rs 70 for 250g. TeaGate is our premium Assam black tea for connoisseurs, available from Rs 100 for 250g. Both brands are sourced 100% from Assam tea gardens, tested in our NABL accredited laboratory, and approved by master tea tasters.
            </p>
            <p>
              We also serve businesses through wholesale tea supply, private label tea packaging, distribution partnerships, and international export. All our products are FSSAI licensed, GST registered, and meet the quality standards required for both domestic sale and international export. If you cannot find the answer to your question above, please contact us directly.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/shop" className="btn-primary inline-block">Shop Assam Tea</Link>
            <Link href="/contact" className="text-gold text-[13px] tracking-[2px] uppercase self-center hover:text-gold-light transition-colors">Contact Us</Link>
            <Link href="/export" className="text-gold text-[13px] tracking-[2px] uppercase self-center hover:text-gold-light transition-colors">Export & Bulk</Link>
          </div>
        </div>
      </section>
    </>
  );
}