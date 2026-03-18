'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

export default function ExportInquiryForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    products: '',
    volume: '',
    privateLabel: 'no',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      type: 'export',
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone || null,
      country: form.country,
      products: form.products,
      volume: form.volume || null,
      private_label: form.privateLabel === 'yes',
      message: form.message || null,
    };

    try {
      // console.log('Submitting to Supabase:', payload);
      const { data, error: dbError } = await supabase.from('inquiries').insert(payload).select();

      if (dbError) {
        // console.error('Supabase error:', dbError.message, dbError.details, dbError.hint, dbError.code);
        setError(`Error: ${dbError.message}. Please email us at kitayaind@gmail.com`);
        return;
      }

      // console.log('Supabase success:', data);
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      // console.error('Catch error:', message);
      setError(`Something went wrong: ${message}. Please email us at kitayaind@gmail.com`);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 border-2 border-gold flex items-center justify-center rounded-full">
          <span className="text-gold text-2xl">&#10003;</span>
        </div>
        <h3 className="font-display text-2xl text-bg-warm mb-3">Inquiry Received</h3>
        <p className="text-bg-warm/70 text-base font-light mb-8">
          Thank you for your interest. Our team will review your requirements and get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: '', company: '', email: '', phone: '', country: '', products: '', volume: '', privateLabel: 'no', message: '' });
          }}
          className="text-gold text-sm hover:text-gold-light transition-colors"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  const inputClasses = 'w-full bg-white/[0.06] border border-white/[0.1] text-bg-warm px-5 py-3.5 text-sm font-light placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-colors';
  const labelClasses = 'text-[11px] tracking-[2px] uppercase text-bg-warm/60 mb-2 block';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Full Name *</label>
          <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Company Name *</label>
          <input type="text" name="company" required value={form.company} onChange={handleChange} placeholder="Company or business name" className={inputClasses} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Email *</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="business@example.com" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Phone</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9876543210" className={inputClasses} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Country *</label>
          <input type="text" name="country" required value={form.country} onChange={handleChange} placeholder="Your country" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Products Interested In *</label>
          <select name="products" required value={form.products} onChange={handleChange} className={inputClasses}>
            <option value="">Select product</option>
            <option value="kitaya-ctc">Kitaya - Assam CTC Tea</option>
            <option value="teagate-premium">TeaGate - Premium Assam Tea</option>
            <option value="both">Both Brands</option>
            <option value="custom-blend">Custom Blend</option>
            <option value="private-label">Private Label</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Estimated Volume</label>
          <select name="volume" value={form.volume} onChange={handleChange} className={inputClasses}>
            <option value="">Select volume</option>
            <option value="100-500kg">100 - 500 Kg</option>
            <option value="500-1000kg">500 Kg - 1 Ton</option>
            <option value="1-5ton">1 - 5 Tons</option>
            <option value="5-10ton">5 - 10 Tons</option>
            <option value="container">Container Load (20+ Tons)</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>Private Label Required?</label>
          <div className="flex gap-4 mt-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="privateLabel" value="yes" checked={form.privateLabel === 'yes'} onChange={handleChange} className="accent-gold" />
              <span className="text-bg-warm text-sm font-light">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="privateLabel" value="no" checked={form.privateLabel === 'no'} onChange={handleChange} className="accent-gold" />
              <span className="text-bg-warm text-sm font-light">No</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className={labelClasses}>Additional Details</label>
        <textarea name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us about your specific requirements, target market, packaging preferences, etc." className={inputClasses + ' resize-none'} />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? 'Submitting...' : 'Submit Inquiry'}
      </button>
    </form>
  );
}