'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Users, Megaphone, MapPin, Send } from 'lucide-react';
import { distributorFaqs } from '@/data/faqs';
import FAQAccordion from '@/components/FAQAccordion';

export default function DistributorPage() {
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    businessType: '',
    currentProducts: '',
    expectedVolume: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // TODO: Connect to Supabase inquiries table
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-[60px] bg-bg min-h-[50vh] flex items-center">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="text-[12px] text-warm-gray tracking-[1px] mb-10">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">Become a Distributor</span>
          </div>

          <div className="max-w-[700px]">
            <div className="section-label">Partner With Us</div>
            <h1 className="font-display text-4xl md:text-5xl font-normal text-charcoal leading-[1.15] mb-6">
              Become a
              <br />
              <em className="text-gold">Kitaya Distributor</em>
            </h1>
            <p className="text-warm-gray text-lg font-light leading-8 max-w-[560px]">
              Carry two premium Assam tea brands in your retail network. Competitive margins, 
              growing consumer demand, and a product that sells itself with every cup.
            </p>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="section-padding bg-bg-warm">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="section-label">Why Partner With Kitaya Industries</div>
            <h2 className="section-title">A Partnership Built to Grow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Growing Market',
                desc: 'India is the world\'s largest tea-consuming nation. Assam tea demand is growing steadily across all tiers of cities and towns.',
              },
              {
                icon: Users,
                title: 'Two Brands, Two Segments',
                desc: 'Kitaya for the everyday buyer, TeaGate for the premium customer. One partnership covers two market segments.',
              },
              {
                icon: Megaphone,
                title: 'Marketing Support',
                desc: 'We provide POS materials, product displays, digital marketing assets, and promotional support to help you sell.',
              },
              {
                icon: MapPin,
                title: 'Open Territories',
                desc: 'We are actively expanding across India. Check if your territory is available and be the first to bring Kitaya and TeaGate to your market.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8">
                <div className="w-[50px] h-[50px] mb-5 border border-gold/20 flex items-center justify-center">
                  <item.icon size={22} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-charcoal mb-3">{item.title}</h3>
                <p className="text-warm-gray text-sm font-light leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-bg">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="section-label">How It Works</div>
          <h2 className="section-title mb-14">Simple Steps to Get Started</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: '01',
                title: 'Submit Your Inquiry',
                desc: 'Fill out the form below with your business details, location, and interest. It takes less than 2 minutes.',
              },
              {
                step: '02',
                title: 'We Connect',
                desc: 'Our distribution team will reach out within 48 hours to discuss territory availability, pricing, and terms.',
              },
              {
                step: '03',
                title: 'Start Selling',
                desc: 'Once the terms are agreed, we ship your initial stock and provide marketing materials to kickstart sales in your market.',
              },
            ].map((item) => (
              <div key={item.step}>
                <div className="font-display text-4xl text-gold/30 mb-4">{item.step}</div>
                <h3 className="font-display text-lg text-charcoal mb-3">{item.title}</h3>
                <p className="text-warm-gray text-sm font-light leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="section-padding bg-bg-warm" id="apply">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-14">
            <div className="section-label">Apply Now</div>
            <h2 className="section-title">Distributor Inquiry Form</h2>
            <p className="text-warm-gray text-base font-light max-w-[500px] mx-auto mt-4 leading-7">
              Share your business details and we will get in touch to discuss partnership opportunities.
            </p>
          </div>

          {submitted ? (
            <div className="text-center p-12 bg-white">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-display text-2xl text-charcoal mb-3">Application Submitted</h3>
              <p className="text-warm-gray text-sm font-light leading-7 mb-6">
                Thank you for your interest in distributing Kitaya and TeaGate products. Our team 
                will review your application and reach out within 48 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: '', businessName: '', email: '', phone: '', city: '', state: '',
                    businessType: '', currentProducts: '', expectedVolume: '', message: '',
                  });
                }}
                className="text-gold text-sm hover:text-gold-light transition-colors"
              >
                Submit another application →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange} required
                    className="w-full bg-bg border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text" name="businessName" value={form.businessName}
                    onChange={handleChange} required
                    className="w-full bg-bg border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all"
                    placeholder="Company or shop name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                    Email *
                  </label>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange} required
                    className="w-full bg-bg border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel" name="phone" value={form.phone}
                    onChange={handleChange} required
                    className="w-full bg-bg border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                    City *
                  </label>
                  <input
                    type="text" name="city" value={form.city}
                    onChange={handleChange} required
                    className="w-full bg-bg border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all"
                    placeholder="Your city"
                  />
                </div>
                <div>
                  <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                    State *
                  </label>
                  <input
                    type="text" name="state" value={form.state}
                    onChange={handleChange} required
                    className="w-full bg-bg border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all"
                    placeholder="Your state"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                    Business Type
                  </label>
                  <select
                    name="businessType" value={form.businessType}
                    onChange={handleChange}
                    className="w-full bg-bg border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all appearance-none"
                  >
                    <option value="">Select type</option>
                    <option value="wholesale">Wholesale Distributor</option>
                    <option value="retail">Retail Shop / Store</option>
                    <option value="supermarket">Supermarket / Chain</option>
                    <option value="horeca">HoReCa (Hotels, Restaurants, Cafes)</option>
                    <option value="online">Online Seller</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                    Expected Monthly Volume
                  </label>
                  <select
                    name="expectedVolume" value={form.expectedVolume}
                    onChange={handleChange}
                    className="w-full bg-bg border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all appearance-none"
                  >
                    <option value="">Select volume</option>
                    <option value="small">Under 50 Kg</option>
                    <option value="medium">50 - 200 Kg</option>
                    <option value="large">200 - 500 Kg</option>
                    <option value="xlarge">500+ Kg</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                  Current Tea Products You Carry
                </label>
                <input
                  type="text" name="currentProducts" value={form.currentProducts}
                  onChange={handleChange}
                  className="w-full bg-bg border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all"
                  placeholder="E.g. Tata Tea, Brooke Bond, local brands, etc."
                />
              </div>

              <div>
                <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                  Additional Message
                </label>
                <textarea
                  name="message" value={form.message}
                  onChange={handleChange} rows={4}
                  className="w-full bg-bg border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all resize-none"
                  placeholder="Anything else you would like us to know..."
                />
              </div>

              <button
                type="submit" disabled={sending}
                className="btn-primary inline-flex items-center gap-3 disabled:opacity-50"
              >
                {sending ? 'Submitting...' : 'Submit Application'}
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        faqs={distributorFaqs}
        sectionLabel="Distribution"
        sectionTitle="Frequently Asked Questions"
      />
    </>
  );
}
