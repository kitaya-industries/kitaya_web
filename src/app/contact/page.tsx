'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { contactFaqs } from '@/data/faqs';
import FAQAccordion from '@/components/FAQAccordion';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    const payload = {
      type: 'contact',
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: `[${form.subject}] ${form.message}`,
    };

    try {
      
      const { data, error: dbError } = await supabase.from('inquiries').insert(payload).select();

      if (dbError) {
        // console.error('Supabase error:', dbError.message, dbError.details, dbError.hint, dbError.code);
        setError(`Error: ${dbError.message}. Please email us at kitayaind@gmail.com`);
        setSending(false);
        return;
      }

      // console.log('Supabase success:', data);
      setSending(false);
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      // console.error('Catch error:', message);
      setError(`Something went wrong: ${message}. Please email us at kitayaind@gmail.com`);
      setSending(false);
    }
  };

  return (
    <>
      <section className="pt-32 pb-20 px-6 lg:px-[60px] bg-bg min-h-screen">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <div className="text-[12px] text-warm-gray tracking-[1px] mb-10">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">Contact</span>
          </div>

          <div className="text-center mb-16">
            <div className="section-label">Get in Touch</div>
            <h1 className="section-title">Contact Us</h1>
            <p className="text-warm-gray text-base font-light max-w-[500px] mx-auto mt-4 leading-7">
              Whether you have a question about our Assam tea products, need help with an order, or
              want to discuss export and distribution opportunities, we are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-charcoal mb-1">Our Office</h3>
                  <p className="text-warm-gray text-sm font-light leading-7">
                    Kitaya Industries Private Limited<br />
                    1, Old Industrial Area<br />
                    Alwar - 301001, Rajasthan, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-charcoal mb-1">Phone</h3>
                  <p className="text-warm-gray text-sm font-light leading-7">
                    <a href="tel:+919079720031" className="hover:text-gold transition-colors">
                      +91 9079720031
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-charcoal mb-1">Email</h3>
                  <p className="text-warm-gray text-sm font-light leading-7">
                    <a href="mailto:kitayaind@gmail.com" className="hover:text-gold transition-colors">
                      kitayaind@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-charcoal mb-1">Business Hours</h3>
                  <p className="text-warm-gray text-sm font-light leading-7">
                    Monday to Saturday<br />
                    9:00 AM to 6:00 PM IST
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="pt-6 border-t border-charcoal/8">
                <h3 className="font-display text-lg text-charcoal mb-4">Looking for something specific?</h3>
                <div className="flex flex-col gap-2">
                  <Link href="/export" className="text-gold text-sm hover:text-gold-light transition-colors">
                    Export and Bulk Orders
                  </Link>
                  <Link href="/distributor" className="text-gold text-sm hover:text-gold-light transition-colors">
                    Become a Distributor
                  </Link>
                  <Link href="/faq" className="text-gold text-sm hover:text-gold-light transition-colors">
                    Frequently Asked Questions
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-bg-warm p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-5 border-2 border-gold flex items-center justify-center rounded-full">
                    <span className="text-gold text-2xl">&#10003;</span>
                  </div>
                  <h3 className="font-display text-2xl text-charcoal mb-3">
                    Message Sent
                  </h3>
                  <p className="text-warm-gray text-sm font-light leading-7 mb-6">
                    Thank you for reaching out. We will get back to you within 24 to 48 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setError('');
                      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="text-gold text-sm hover:text-gold-light transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-bg-warm border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-bg-warm border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-bg-warm border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-bg-warm border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all appearance-none"
                      >
                        <option value="">Select a topic</option>
                        <option value="Order Related">Order Related</option>
                        <option value="Product Question">Product Question</option>
                        <option value="Export Inquiry">Export Inquiry</option>
                        <option value="Distribution Partnership">Distribution Partnership</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] tracking-[2px] uppercase text-warm-gray block mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-bg-warm border-none px-5 py-4 text-sm text-charcoal font-light outline-none focus:ring-1 focus:ring-gold/40 transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 px-4 py-3 text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary inline-flex items-center gap-3 disabled:opacity-50"
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        faqs={contactFaqs}
        sectionLabel="Need Help?"
        sectionTitle="Frequently Asked Questions"
      />
    </>
  );
}