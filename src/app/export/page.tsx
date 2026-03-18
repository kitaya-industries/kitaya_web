import Link from 'next/link';
import { Package, Tag, Globe, FlaskRound, ShieldCheck, FileCheck, MapPin, Truck, Users, CheckCircle } from 'lucide-react';
import { exportFaqs } from '@/data/faqs';
import FAQAccordion from '@/components/FAQAccordion';
import { createMeta, pageMeta } from '@/data/seo';
import type { Metadata } from 'next';
import ExportInquiryForm from './ExportInquiryForm';
import JsonLd, { faqSchema, breadcrumbSchema } from '@/components/JsonLd';

export const metadata: Metadata = createMeta(
  pageMeta.export.title,
  pageMeta.export.description,
  '/export'
);

const services = [
  {
    icon: Package,
    title: 'Bulk Tea Supply',
    desc: 'Premium Assam CTC and black tea in quantities ranging from 100 Kg to full container loads. Consistent quality across every shipment, sourced directly from Assam tea gardens.',
  },
  {
    icon: Tag,
    title: 'Private Label Tea',
    desc: 'Launch your own tea brand with our private labeling service. We handle sourcing, blending, packaging design support, printing, and filling under your brand name.',
  },
  {
    icon: Globe,
    title: 'International Shipping',
    desc: 'Export-ready documentation including FSSAI certificates, lab reports, Certificate of Origin, and health certificates. We ship to the Middle East, Europe, Africa, Southeast Asia, and North America.',
  },
  {
    icon: FlaskRound,
    title: 'Custom Tea Blends',
    desc: 'Our master tea tasters can develop custom blends tailored to specific market preferences. Share your requirements and we will create the perfect blend for your region.',
  },
];

const certifications = [
  { icon: ShieldCheck, label: 'FSSAI Licensed', detail: 'Food Safety and Standards Authority of India' },
  { icon: FlaskRound, label: 'NABL Lab Tested', detail: 'National Accreditation Board for Testing and Calibration' },
  { icon: FileCheck, label: 'GST Registered', detail: 'Goods and Services Tax compliant' },
  { icon: MapPin, label: '100% Assam Origin', detail: 'Sourced directly from Assam tea estates' },
];

const whyPartner = [
  'Direct sourcing from Assam tea gardens with no middlemen',
  'NABL accredited in-house laboratory for quality assurance',
  'Master tea tasters verify every batch before dispatch',
  'Flexible MOQ starting from 100 Kg for packed products',
  'Complete export documentation and compliance support',
  'Competitive pricing with consistent supply chain',
  'Two established brands with proven market acceptance',
  'Custom packaging options for different market needs',
];

const exportMarkets = [
  { region: 'Middle East', countries: 'UAE, Saudi Arabia, Oman, Qatar, Kuwait, Bahrain' },
  { region: 'Africa', countries: 'Kenya, Nigeria, South Africa, Egypt, Morocco' },
  { region: 'Europe', countries: 'UK, Germany, France, Netherlands, Poland' },
  { region: 'Southeast Asia', countries: 'Malaysia, Singapore, Thailand, Indonesia' },
  { region: 'North America', countries: 'USA, Canada' },
  { region: 'Central Asia', countries: 'Kazakhstan, Uzbekistan, Afghanistan' },
];

export default function ExportPage() {
  return (
    <>
      <JsonLd data={faqSchema(exportFaqs)} />
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: 'https://kitaya.in' },
        { name: 'Export & B2B', url: 'https://kitaya.in/export' },
      ])} />
      {/* Hero */}
      <section  data-nav-theme="dark" className="pt-32 pb-20 md:pb-28 bg-bg-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, #C5A55A 40px, #C5A55A 41px)',
        }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-[60px]">
          <div className="text-[12px] text-warm-gray tracking-[1px] mb-10">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-bg-warm">Export & B2B</span>
          </div>

          <div className="max-w-[750px]">
            <div className="inline-block border border-gold/25 text-gold-light text-[11px] tracking-[4px] uppercase px-7 py-2.5 mb-8 font-light">
              Trusted Tea Supplier from India
            </div>
            <h1 className="font-display text-3xl md:text-5xl lg:text-[56px] font-normal text-bg-warm leading-tight mb-6">
              Premium Assam Tea for <em className="text-gold">Global Markets</em>
            </h1>
            <p className="text-warm-gray text-base md:text-lg leading-8 font-light mb-10 max-w-[600px]">
              Kitaya Industries is a leading tea manufacturer and exporter from India, supplying premium Assam CTC and black tea to businesses worldwide. From bulk tea supply to private label solutions, we are your trusted partner for quality Indian tea.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#inquiry-form" className="btn-primary text-center">Request a Quote</a>
              <Link href="/shop" className="btn-secondary text-center">View Our Products</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-bg">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <div className="section-label">What We Offer</div>
            <h2 className="section-title">Export & B2B Services</h2>
            <p className="text-warm-gray text-base font-light max-w-[600px] mx-auto mt-4 leading-7">
              Whether you need bulk Assam tea for your brand or want to start a private label tea business, Kitaya Industries offers end-to-end solutions for tea suppliers, distributors, and international buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((s) => (
              <div key={s.title} className="bg-white p-8 md:p-10 group hover:-translate-y-1 transition-all duration-400 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                <div className="w-14 h-14 border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/5 transition-colors">
                  <s.icon size={24} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-medium text-charcoal mb-3">{s.title}</h3>
                <p className="text-warm-gray text-[15px] leading-7 font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Range for Export */}
      <section className="section-padding bg-bg-warm">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="section-label">Our Tea Range</div>
            <h2 className="section-title">Products Available for Export</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kitaya Range */}
            <div className="bg-gradient-to-br from-kitaya-red to-kitaya-red-dark p-8 md:p-10 relative">
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-gold/20 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-[11px] tracking-[3px] uppercase text-white/60 mb-3">Everyday Range</div>
                <h3 className="font-display text-3xl text-white font-medium mb-4">Kitaya</h3>
                <p className="text-white/70 text-[15px] leading-7 font-light mb-6">
                  Bold Assam CTC tea with strong liquor and rich colour. Ideal for markets that prefer strong, full-bodied tea for daily consumption. Available in 250g, 1 Kg, and bulk packaging.
                </p>
                <div className="text-gold text-[13px] tracking-[2px] uppercase">Assam CTC Black Tea</div>
              </div>
            </div>

            {/* TeaGate Range */}
            <div className="bg-gradient-to-br from-teagate-blue-mid to-teagate-blue p-8 md:p-10 relative">
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-gold/20 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-[11px] tracking-[3px] uppercase text-white/60 mb-3">Premium Range</div>
                <h3 className="font-display text-3xl text-white font-medium mb-4">TeaGate</h3>
                <p className="text-white/70 text-[15px] leading-7 font-light mb-6">
                  Handpicked premium Assam tea with refined taste and robust flavour. Positioned for premium markets and specialty tea segments. Available in 250g, 1 Kg, and custom packaging.
                </p>
                <div className="text-gold text-[13px] tracking-[2px] uppercase">Premium Assam Black Tea</div>
              </div>
            </div>
          </div>

          <p className="text-center text-warm-gray text-sm font-light mt-8">
            Both brands are available in retail packaging (250g and 1 Kg) as well as bulk packaging (5 Kg, 10 Kg, 25 Kg, and custom sizes). Private label packaging is also available.
          </p>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="section-padding bg-bg">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div>
            <div className="section-label">Why Choose Us</div>
            <h2 className="section-title mb-8">Why Partner with Kitaya Industries</h2>
            <p className="text-warm-gray text-base leading-7 font-light mb-10">
              As an established Assam tea manufacturer and wholesale tea supplier based in India, Kitaya Industries combines direct sourcing from tea gardens with rigorous quality testing in our NABL accredited laboratory. Every batch is tasted by our master tea tasters before dispatch, ensuring consistent quality for your customers.
            </p>
            <div className="space-y-4">
              {whyPartner.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-charcoal text-[15px] leading-7">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-bg-dark p-8 md:p-10">
            <h3 className="font-display text-2xl text-bg-warm mb-8">Certifications & Compliance</h3>
            <div className="space-y-6">
              {certifications.map((cert) => (
                <div key={cert.label} className="flex items-start gap-4 pb-6 border-b border-white/[0.06] last:border-0 last:pb-0">
                  <div className="w-12 h-12 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <cert.icon size={20} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-bg-warm font-medium text-base mb-1">{cert.label}</div>
                    <div className="text-warm-gray text-[13px] font-light">{cert.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-warm-gray text-[13px] font-light mt-8 leading-6">
              All export shipments include FSSAI certificates, NABL lab test reports, Certificate of Origin, phytosanitary certificates, and any additional documentation required by the importing country.
            </p>
          </div>
        </div>
      </section>

      {/* Export Markets */}
      <section className="section-padding bg-bg-warm">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="section-label">Global Reach</div>
            <h2 className="section-title">Markets We Serve</h2>
            <p className="text-warm-gray text-base font-light max-w-[600px] mx-auto mt-4 leading-7">
              Kitaya Industries is equipped to export premium Indian tea to all major international markets. Our documentation and certifications are export-ready for the following regions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exportMarkets.map((market) => (
              <div key={market.region} className="bg-white p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                <h3 className="font-display text-lg font-medium text-charcoal mb-2">{market.region}</h3>
                <p className="text-warm-gray text-[13px] leading-6 font-light">{market.countries}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="section-padding bg-bg-dark">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-14">
            <div className="section-label !text-gold-dark">Get in Touch</div>
            <h2 className="section-title !text-bg-warm">Request an Export Quote</h2>
            <p className="text-warm-gray text-base font-light max-w-[500px] mx-auto mt-4 leading-7">
              Tell us about your tea requirements and we will get back to you within 24-48 hours with pricing, samples, and documentation details.
            </p>
          </div>

          <ExportInquiryForm />
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="section-padding bg-bg">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-normal text-charcoal mb-6">
            About Kitaya Industries - Your Trusted Tea Exporter from India
          </h2>
          <div className="space-y-5 text-warm-gray text-[15px] leading-8 font-light">
            <p>
              Kitaya Industries Private Limited is a registered tea manufacturer and exporter based in Alwar, Rajasthan, India. We specialize in sourcing, processing, and supplying premium Assam tea to domestic and international markets. Our product range includes Assam CTC tea, premium black tea, and custom tea blends designed for different regional tastes and preferences.
            </p>
            <p>
              As a wholesale tea supplier with direct relationships with Assam tea gardens, we offer competitive pricing without compromising on quality. Every batch of tea that leaves our facility has been tested in our NABL accredited laboratory and approved by our master tea tasters. This rigorous quality assurance process makes Kitaya Industries a preferred tea supplier for businesses looking for consistent, reliable supply of Indian tea.
            </p>
            <p>
              Whether you are a tea importer looking for a bulk tea supplier in India, a retailer wanting to start a private label tea brand, or a distributor seeking wholesale tea at competitive prices, Kitaya Industries has the products, certifications, and supply chain to serve your needs. Contact us today to discuss your requirements.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        faqs={exportFaqs}
        sectionLabel="Export Questions"
        sectionTitle="Frequently Asked Questions"
      />
    </>
  );
}